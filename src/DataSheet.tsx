import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import DataCell from './DataCell';
import DataEditor from './DataEditor';
import Row from './Row';
import Sheet from './Sheet';
import ValueViewer from './ValueViewer';
import {
  BACKSPACE_KEY,
  DELETE_KEY,
  DOWN_KEY,
  ENTER_KEY,
  ESCAPE_KEY,
  LEFT_KEY,
  RIGHT_KEY,
  TAB_KEY,
  UP_KEY,
} from './keys';

// Type definitions
type CellLocation = { i: number; j: number };

type Selection = {
  start: CellLocation;
  end: CellLocation;
};

interface DataSheetState {
  start: CellLocation;
  end: CellLocation;
  selecting: boolean;
  forceEdit: boolean;
  editing: CellLocation;
  clear: CellLocation;
}

// Utility function types
const isEmpty = (obj: CellLocation | {} | null | undefined): boolean =>
  !obj || Object.keys(obj).length === 0;

const range = (start: number, end: number): number[] => {
  const array: number[] = [];
  const inc = end - start > 0;
  for (let i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
    inc ? array.push(i) : array.unshift(i);
  }
  return array;
};

const defaultParsePaste = (str: string): string[][] => {
  return str.split(/\r\n|\n|\r/).map(row => row.split('\t'));
};

const defaultState: DataSheetState = {
  start: { i: -1, j: -1 }, // Use initial invalid state
  end: { i: -1, j: -1 },
  selecting: false,
  forceEdit: false,
  editing: { i: -1, j: -1 },
  clear: { i: -1, j: -1 },
};

// Component Prop Types
interface DataSheetProps<T = any> {
  // Generic type T for cell data
  data: T[][];
  className?: string;
  overflow?: 'wrap' | 'nowrap' | 'clip';
  valueRenderer: (cell: T, row: number, col: number) => React.ReactNode;
  dataRenderer?: (
    cell: T,
    row: number,
    col: number,
  ) => string | number | boolean | null | undefined;
  sheetRenderer?: React.ComponentType<any>; // Use specific props if known
  rowRenderer?: React.ComponentType<any>; // Use specific props if known
  cellRenderer?: React.ComponentType<any>; // Use specific props if known (e.g., CellProps from Cell.tsx)
  valueViewer?: React.ComponentType<any>; // Use specific props if known
  dataEditor?: React.ComponentType<any>; // Use specific props if known
  parsePaste?: (str: string) => string[][];
  handleCopy?: (args: {
    event: ClipboardEvent | React.ClipboardEvent;
    dataRenderer?: DataSheetProps<T>['dataRenderer'];
    valueRenderer: DataSheetProps<T>['valueRenderer'];
    data: T[][];
    start: CellLocation;
    end: CellLocation;
    range: typeof range;
  }) => void;
  onPaste?: (changes: { cell: T | undefined; data: string }[][]) => void;
  attributesRenderer?: (
    cell: T,
    row: number,
    col: number,
  ) => React.HTMLAttributes<HTMLTableCellElement>;
  keyFn?: (row: number) => string | number;
  onCellsChanged?: (
    changes: { cell: T; row: number; col: number; value: any }[],
    additions?: { row: number; col: number; value: any }[],
  ) => void;
  onChange?: (cell: T, row: number, col: number, value: any) => void;
  onContextMenu?: (
    e: React.MouseEvent<HTMLTableCellElement>,
    cell: T,
    row: number,
    col: number,
  ) => void;
  selected?: Selection; // Controlled selection prop
  onSelect?: (selection: Selection) => void;
  isCellNavigable?: (cell: T, row: number, col: number) => boolean;
  disablePageClick?: boolean;
  editModeChanged?: (isEditing: boolean) => void;
}

// Helper to check if selection is controlled
const isSelectionControlled = <T,>(props: DataSheetProps<T>) =>
  'selected' in props;

// Helper to get state, merging controlled selection if necessary
const getCurrentState = <T,>(
  internalState: DataSheetState,
  props: DataSheetProps<T>,
): DataSheetState => {
  let state = { ...internalState };
  if (isSelectionControlled(props)) {
    let { start, end } = props.selected || {
      start: defaultState.start,
      end: defaultState.end,
    };
    state = { ...state, start, end };
  }
  return state;
};

// --- Main Component --- //
const DataSheet: React.FC<DataSheetProps> = memo(props => {
  const {
    data,
    className,
    overflow,
    valueRenderer,
    dataRenderer,
    sheetRenderer: SheetRenderer = Sheet,
    rowRenderer: RowRenderer = Row,
    cellRenderer: CellRenderer = Cell,
    valueViewer: ValueViewerComponent = ValueViewer,
    dataEditor: DataEditorComponent = DataEditor,
    parsePaste = defaultParsePaste,
    isCellNavigable = () => true,
    disablePageClick = false,
    attributesRenderer,
    keyFn,
    handleCopy: handleCopyProp,
    onCellsChanged,
    onChange,
    onContextMenu,
    onSelect,
    onPaste,
    selected: selectedProp,
    editModeChanged,
  } = props;

  const [internalState, setInternalState] =
    useState<DataSheetState>(defaultState);
  const dgDomRef = useRef<HTMLSpanElement>(null);

  const currentState = getCurrentState(internalState, props);
  const { start, end, selecting, forceEdit, editing, clear } = currentState;

  // --- Refs for potentially cycling callbacks --- //
  const pageClickRef = useRef<(e: MouseEvent) => void>(() => {});
  const handleMouseUpRef = useRef<() => void>(() => {});
  const handleCutInternalRef = useRef<
    (e: ClipboardEvent | React.ClipboardEvent) => void
  >(() => {});
  const handleCopyInternalRef = useRef<
    (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => void
  >(() => {});
  const handlePasteInternalRef = useRef<
    (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => Promise<void>
  >(async () => {});
  const handleIEClipboardEventsRef = useRef<(e: KeyboardEvent) => void>(
    () => {},
  );

  // --- State Update Proxy (Put before handlers that use it) --- //
  const setStateProxy = useCallback(
    (newState: Partial<DataSheetState>) => {
      setInternalState(prevState => {
        const nextInternalState = { ...prevState, ...newState };

        if (editModeChanged && newState.editing !== undefined) {
          const wasEditing = !isEmpty(prevState.editing);
          const willBeEditing = !isEmpty(newState.editing);
          if (wasEditing !== willBeEditing) {
            editModeChanged(willBeEditing);
          }
        }

        if (isSelectionControlled(props)) {
          const selectionUpdate: Partial<Selection> = {};
          if (newState.start !== undefined)
            selectionUpdate.start = newState.start;
          if (newState.end !== undefined) selectionUpdate.end = newState.end;

          if (Object.keys(selectionUpdate).length > 0 && onSelect) {
            const currentSelection = props.selected || {
              start: defaultState.start,
              end: defaultState.end,
            };
            const nextSelection = { ...currentSelection, ...selectionUpdate };
            onSelect(nextSelection);
          }

          // Return previous state merged only with non-selection updates
          const nonSelectionUpdates: Partial<DataSheetState> = { ...newState };
          delete nonSelectionUpdates.start;
          delete nonSelectionUpdates.end;
          return { ...prevState, ...nonSelectionUpdates };
        } else {
          // Uncontrolled: update internal state fully
          if (onSelect && (newState.start || newState.end)) {
            const nextSelection = {
              start: newState.start || prevState.start,
              end: newState.end || prevState.end,
            };
            if (
              nextSelection.start !== prevState.start ||
              nextSelection.end !== prevState.end
            ) {
              onSelect(nextSelection);
            }
          }
          return nextInternalState;
        }
      });
    },
    [props, editModeChanged, onSelect],
  );

  // --- Render Helpers (Put before handlers that use them) --- //
  const isSelected = useCallback(
    (i: number, j: number): boolean => {
      const { start: cs, end: ce } = getCurrentState(internalState, props);
      if (isEmpty(cs) || isEmpty(ce)) return false;
      const posX = j >= cs.j && j <= ce.j;
      const negX = j <= cs.j && j >= ce.j;
      const posY = i >= cs.i && i <= ce.i;
      const negY = i <= cs.i && i >= ce.i;
      return (
        (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY)
      );
    },
    [internalState, props],
  );

  const isSelectedRow = useCallback(
    (rowIndex: number): boolean => {
      const { start: cs, end: ce } = getCurrentState(internalState, props);
      if (isEmpty(cs) || isEmpty(ce)) return false;
      return cs.i <= ce.i
        ? rowIndex >= cs.i && rowIndex <= ce.i
        : rowIndex <= cs.i && rowIndex >= ce.i;
    },
    [internalState, props],
  );

  const isCellEditing = useCallback(
    (i: number, j: number): boolean => {
      return internalState.editing.i === i && internalState.editing.j === j;
    },
    [internalState.editing],
  );

  const isCellClearing = useCallback(
    (i: number, j: number): boolean => {
      return internalState.clear.i === i && internalState.clear.j === j;
    },
    [internalState.clear],
  );

  const getSelectedCells = useCallback(
    (currentData: any[][], startCell: CellLocation, endCell: CellLocation) => {
      let selected: { cell: any; row: number; col: number }[] = [];
      range(startCell.i, endCell.i).forEach(row => {
        range(startCell.j, endCell.j).forEach(col => {
          if (currentData[row]?.[col]) {
            selected.push({ cell: currentData[row][col], row, col });
          }
        });
      });
      return selected;
    },
    [],
  );

  // --- Define removeAllListeners FIRST, using refs for handlers --- //
  const removeAllListeners = useCallback((): void => {
    // Use refs to access the latest versions of handlers
    document.removeEventListener('mousedown', pageClickRef.current);
    document.removeEventListener('mouseup', handleMouseUpRef.current);
    document.removeEventListener('cut', handleCutInternalRef.current);
    document.removeEventListener('copy', handleCopyInternalRef.current);
    document.removeEventListener('paste', handlePasteInternalRef.current);
    document.removeEventListener('keydown', handleIEClipboardEventsRef.current);
  }, []); // Empty deps because refs are stable

  // --- Define handlers and assign to refs --- //
  // Define pageClick and handleMouseUp *after* removeAllListeners
  const pageClick = useCallback(
    (e: MouseEvent): void => {
      if (disablePageClick) return;
      const element = dgDomRef.current;
      if (element && !element.contains(e.target as Node)) {
        setStateProxy({ ...defaultState });
        removeAllListeners(); // Now defined and stable
      }
    },
    [disablePageClick, setStateProxy, removeAllListeners],
  ); // Add removeAllListeners here
  // Update ref in effect
  useEffect(() => {
    pageClickRef.current = pageClick;
  }, [pageClick]);

  const handleMouseUp = useCallback((): void => {
    setStateProxy({ selecting: false });
    document.removeEventListener('mouseup', handleMouseUpRef.current); // Use ref for removal
  }, [setStateProxy]);
  // Update ref in effect
  useEffect(() => {
    handleMouseUpRef.current = handleMouseUp;
  }, [handleMouseUp]);

  // --- Clipboard Handlers (Define and update refs) --- //
  const handleCopyInternal = useCallback(
    (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => {
      if (isEmpty(editing)) {
        e.preventDefault();
        const { start: cs, end: ce } = getCurrentState(internalState, props);

        if (handleCopyProp) {
          handleCopyProp({
            event: e as ClipboardEvent,
            dataRenderer,
            valueRenderer,
            data,
            start: cs,
            end: ce,
            range,
          });
        } else {
          const text = range(cs.i, ce.i)
            .map(i =>
              range(cs.j, ce.j)
                .map(j => {
                  const cell = data[i]?.[j];
                  if (!cell) return '';
                  const value = dataRenderer ? dataRenderer(cell, i, j) : null;
                  if (
                    value === '' ||
                    value === null ||
                    typeof value === 'undefined'
                  ) {
                    // Safely convert ReactNode to string if necessary
                    const renderedValue = valueRenderer(cell, i, j);
                    return typeof renderedValue === 'string' ||
                      typeof renderedValue === 'number'
                      ? String(renderedValue)
                      : '';
                  }
                  return String(value);
                })
                .join('\t'),
            )
            .join('\n');

          try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard
                .writeText(text)
                .catch(err =>
                  console.error('Async clipboard write failed:', err),
                );
            } else if ((e as ClipboardEvent).clipboardData?.setData) {
              (e as ClipboardEvent).clipboardData?.setData('text/plain', text);
            } else if ((window as any).clipboardData?.setData) {
              (window as any).clipboardData?.setData('Text', text);
            }
          } catch (err) {
            console.error('Clipboard API failed:', err);
          }
        }
      }
    },
    [
      editing,
      internalState,
      props,
      handleCopyProp,
      dataRenderer,
      valueRenderer,
      data,
    ],
  );
  useEffect(() => {
    handleCopyInternalRef.current = handleCopyInternal;
  }, [handleCopyInternal]);

  const clearSelectedCells = useCallback(
    (startCell: CellLocation, endCell: CellLocation) => {
      const cellsToClear = getSelectedCells(data, startCell, endCell)
        .filter(({ cell }) => !cell.readOnly)
        .map(({ cell, row, col }) => ({ cell, row, col, value: '' }));

      if (onCellsChanged) {
        onCellsChanged(cellsToClear);
      } else if (onChange) {
        setTimeout(() => {
          cellsToClear.forEach(({ cell, row, col, value }) => {
            onChange(cell, row, col, value);
          });
        }, 0);
      }
      setStateProxy({ editing: { i: -1, j: -1 } }); // Exit edit mode after clearing
    },
    [data, onCellsChanged, onChange, setStateProxy, getSelectedCells],
  );

  const handleCutInternal = useCallback(
    (e: ClipboardEvent | React.ClipboardEvent) => {
      if (isEmpty(editing)) {
        e.preventDefault();
        handleCopyInternal(e);
        const { start: cs, end: ce } = getCurrentState(internalState, props);
        clearSelectedCells(cs, ce);
      }
    },
    [editing, internalState, props, clearSelectedCells, handleCopyInternal],
  );
  useEffect(() => {
    handleCutInternalRef.current = handleCutInternal;
  }, [handleCutInternal]);

  const handlePasteInternal = useCallback(
    async (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => {
      if (isEmpty(editing)) {
        e.preventDefault();
        let { start: cs } = getCurrentState(internalState, props);
        let pastedText = '';
        try {
          if (navigator.clipboard && navigator.clipboard.readText) {
            pastedText = await navigator.clipboard.readText();
          } else if ((e as ClipboardEvent).clipboardData?.getData) {
            pastedText =
              (e as ClipboardEvent).clipboardData?.getData('text/plain') || '';
          } else if ((window as any).clipboardData?.getData) {
            pastedText = (window as any).clipboardData?.getData('Text');
          }
        } catch (err) {
          console.error('Clipboard read failed:', err);
          return;
        }

        const pasteData = parsePaste(pastedText || '');
        let newEnd = { ...cs };

        if (onCellsChanged) {
          const changes: {
            cell: any;
            row: number;
            col: number;
            value: string;
          }[] = [];
          const additions: { row: number; col: number; value: string }[] = [];
          pasteData.forEach((row, i) => {
            row.forEach((value, j) => {
              const targetRow = cs.i + i;
              const targetCol = cs.j + j;
              newEnd = { i: targetRow, j: targetCol };
              const cell = data[targetRow]?.[targetCol];
              if (!cell) {
                additions.push({ row: targetRow, col: targetCol, value });
              } else if (!cell.readOnly) {
                changes.push({ cell, row: targetRow, col: targetCol, value });
              }
            });
          });
          onCellsChanged(changes, additions.length ? additions : undefined);
        } else if (onPaste) {
          const structuredChanges: { cell: any | undefined; data: string }[][] =
            [];
          pasteData.forEach((row, i) => {
            const rowData: { cell: any | undefined; data: string }[] = [];
            row.forEach((pastedValue, j) => {
              const targetRow = cs.i + i;
              const targetCol = cs.j + j;
              newEnd = { i: targetRow, j: targetCol };
              const cell = data[targetRow]?.[targetCol];
              rowData.push({ cell: cell, data: pastedValue });
            });
            structuredChanges.push(rowData);
          });
          onPaste(structuredChanges);
        } else if (onChange) {
          pasteData.forEach((row, i) => {
            row.forEach((value, j) => {
              const targetRow = cs.i + i;
              const targetCol = cs.j + j;
              newEnd = { i: targetRow, j: targetCol };
              const cell = data[targetRow]?.[targetCol];
              if (cell && !cell.readOnly) {
                onChange(cell, targetRow, targetCol, value);
              }
            });
          });
        }
        setStateProxy({ start: cs, end: newEnd });
      }
    },
    [
      editing,
      internalState,
      props,
      parsePaste,
      onCellsChanged,
      onPaste,
      onChange,
      data,
      setStateProxy,
    ],
  );
  useEffect(() => {
    handlePasteInternalRef.current = handlePasteInternal;
  }, [handlePasteInternal]);

  const handleIEClipboardEvents = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === 'c' || e.key === 'C') {
          handleCopyInternal(e as any);
        } else if (e.key === 'x' || e.key === 'X') {
          handleCutInternal(e as any);
        } else if (e.key === 'v' || e.key === 'V') {
          handlePasteInternal(e as any);
        }
      }
    },
    [handleCopyInternal, handleCutInternal, handlePasteInternal],
  );
  useEffect(() => {
    handleIEClipboardEventsRef.current = handleIEClipboardEvents;
  }, [handleIEClipboardEvents]);

  // --- Navigation and Cell Interaction Handlers --- //
  const searchForNextSelectablePos = useCallback(
    (
      currentStart: CellLocation,
      offsets: { i: number; j: number },
      jumpRow: boolean,
    ): CellLocation | null => {
      const isCellDefined = ({ i, j }: CellLocation) =>
        data[i]?.[j] !== undefined;
      const previousRow = (loc: CellLocation) => ({
        i: loc.i - 1,
        j: data[0] ? data[0].length - 1 : 0,
      });
      const nextRow = (loc: CellLocation) => ({ i: loc.i + 1, j: 0 });
      const advanceOffset = (loc: CellLocation) => ({
        i: loc.i + offsets.i,
        j: loc.j + offsets.j,
      });

      let newLocation = advanceOffset(currentStart);

      while (isCellDefined(newLocation)) {
        const cell = data[newLocation.i][newLocation.j];
        if (isCellNavigable(cell, newLocation.i, newLocation.j)) {
          break;
        }
        newLocation = advanceOffset(newLocation);
      }

      if (!isCellDefined(newLocation)) {
        if (!jumpRow) return null;
        newLocation =
          offsets.j < 0 ? previousRow(newLocation) : nextRow(newLocation);
      }

      if (!isCellDefined(newLocation)) return null;

      const finalCell = data[newLocation.i][newLocation.j];
      if (!isCellNavigable(finalCell, newLocation.i, newLocation.j)) {
        return searchForNextSelectablePos(newLocation, offsets, jumpRow);
      }

      return newLocation;
    },
    [data, isCellNavigable],
  );

  const updateLocationSingleCell = useCallback(
    (location: CellLocation) => {
      setStateProxy({
        start: location,
        end: location,
        editing: { i: -1, j: -1 },
      });
    },
    [setStateProxy],
  );

  const updateLocationMultipleCells = useCallback(
    (offsets: { i: number; j: number }) => {
      const { start: cs, end: ce } = getCurrentState(internalState, props);
      const rowCount = data.length;
      const colCount = data[0] ? data[0].length : 0;
      const newEndLocation = {
        i: Math.min(rowCount - 1, Math.max(0, ce.i + offsets.i)),
        j: Math.min(colCount - 1, Math.max(0, ce.j + offsets.j)),
      };
      setStateProxy({
        start: cs,
        end: newEndLocation,
        editing: { i: -1, j: -1 },
      });
    },
    [internalState, props, data, setStateProxy],
  );

  const handleNavigate = useCallback(
    (
      e: React.KeyboardEvent | KeyboardEvent,
      offsets: { i: number; j: number },
      jumpRow = false,
    ) => {
      if (offsets && (offsets.i || offsets.j)) {
        const { start: cs } = getCurrentState(internalState, props);
        const multiSelect = e.shiftKey && !jumpRow;

        if (multiSelect) {
          updateLocationMultipleCells(offsets);
        } else {
          const newLocation = searchForNextSelectablePos(cs, offsets, jumpRow);
          if (newLocation) {
            updateLocationSingleCell(newLocation);
          }
        }
        e.preventDefault();
      }
    },
    [
      internalState,
      props,
      updateLocationMultipleCells,
      searchForNextSelectablePos,
      updateLocationSingleCell,
    ],
  );

  const handleKeyboardCellMovement = useCallback(
    (e: React.KeyboardEvent, commit = false) => {
      const { start: cs, editing: ed } = getCurrentState(internalState, props);
      const isCurrentlyEditing = !isEmpty(ed);
      const currentCell = data[cs.i]?.[cs.j];

      if (isCurrentlyEditing && !commit) {
        return;
      }

      const keyCode = e.which || e.keyCode;
      const hasComponent = currentCell?.component;

      if (hasComponent && isCurrentlyEditing && !commit) {
        e.preventDefault();
        return;
      }

      const offsets = { i: 0, j: 0 };
      let shouldJumpRow = false;

      switch (keyCode) {
        case TAB_KEY:
          offsets.j = e.shiftKey ? -1 : 1;
          shouldJumpRow = true;
          break;
        case RIGHT_KEY:
          offsets.j = 1;
          break;
        case LEFT_KEY:
          offsets.j = -1;
          break;
        case UP_KEY:
          offsets.i = -1;
          break;
        case DOWN_KEY:
          offsets.i = 1;
          break;
        case ENTER_KEY:
          if (commit) {
            offsets.i = e.shiftKey ? -1 : 1;
          }
          break;
        default:
          return;
      }

      if (offsets.i || offsets.j) {
        handleNavigate(e, offsets, shouldJumpRow);
      }
    },
    [internalState, props, data, handleNavigate],
  );

  const handleCellMouseDown = useCallback(
    (i: number, j: number, e: React.MouseEvent<HTMLTableCellElement>) => {
      const currentSelState = getCurrentState(internalState, props);
      const isEditingSameCell =
        !isEmpty(currentSelState.editing) &&
        currentSelState.editing.i === i &&
        currentSelState.editing.j === j;
      const newEditingState =
        isEmpty(currentSelState.editing) ||
        currentSelState.editing.i !== i ||
        currentSelState.editing.j !== j
          ? { i: -1, j: -1 }
          : currentSelState.editing;

      setStateProxy({
        selecting: !isEditingSameCell,
        start: e.shiftKey ? currentSelState.start : { i, j },
        end: { i, j },
        editing: newEditingState,
        forceEdit: !!isEditingSameCell,
      });

      document.addEventListener('mouseup', handleMouseUpRef.current);
      document.addEventListener('mousedown', pageClickRef.current);
      document.addEventListener('cut', handleCutInternalRef.current);
      document.addEventListener('copy', handleCopyInternalRef.current);
      document.addEventListener('paste', handlePasteInternalRef.current);
      if (/MSIE|Trident/.test(window.navigator.userAgent)) {
        document.addEventListener(
          'keydown',
          handleIEClipboardEventsRef.current,
        );
      }
    },
    [
      internalState,
      props,
      setStateProxy,
      pageClickRef,
      handleMouseUpRef,
      handleCutInternalRef,
      handleCopyInternalRef,
      handlePasteInternalRef,
      handleIEClipboardEventsRef,
    ],
  );

  const handleCellMouseOver = useCallback(
    (i: number, j: number) => {
      if (internalState.selecting && isEmpty(internalState.editing)) {
        setStateProxy({ end: { i, j } });
      }
    },
    [internalState.selecting, internalState.editing, setStateProxy],
  );

  const handleCellDoubleClick = useCallback(
    (i: number, j: number) => {
      const cell = data[i]?.[j];
      if (cell && !cell.readOnly) {
        setStateProxy({
          editing: { i, j },
          forceEdit: true,
          clear: { i: -1, j: -1 },
        });
      }
    },
    [data, setStateProxy],
  );

  const handleCellContextMenu = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>, i: number, j: number) => {
      const cell = data[i]?.[j];
      if (onContextMenu && cell) {
        onContextMenu(e, cell, i, j);
      }
    },
    [data, onContextMenu],
  );

  const handleCellChange = useCallback(
    (row: number, col: number, value: any) => {
      const cell = data[row]?.[col];
      if (!cell) return;
      if (onCellsChanged) {
        onCellsChanged([{ cell, row, col, value }]);
      } else if (onChange) {
        onChange(cell, row, col, value);
      }
      setStateProxy({ editing: { i: -1, j: -1 } });
    },
    [data, onChange, onCellsChanged, setStateProxy],
  );

  // --- Grid Container KeyDown Handler (Depends on many handlers above) --- //
  const handleGridKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.isPropagationStopped && e.isPropagationStopped()) return;

      const {
        start: cs,
        end: ce,
        editing: ed,
      } = getCurrentState(internalState, props);
      const isCurrentlyEditing = !isEmpty(ed);
      const noCellsSelected = isEmpty(cs);
      const ctrlKeyPressed = e.ctrlKey || e.metaKey;
      const keyCode = e.which || e.keyCode;

      if (noCellsSelected || ctrlKeyPressed) {
        // Use React KeyboardEvent type for broader compatibility check
        const reactKeyEvent = e as unknown as React.KeyboardEvent;
        if (
          ctrlKeyPressed &&
          (reactKeyEvent.key === 'c' || reactKeyEvent.key === 'C')
        ) {
          handleCopyInternal(e as any);
          return;
        }
        if (
          ctrlKeyPressed &&
          (reactKeyEvent.key === 'x' || reactKeyEvent.key === 'X')
        ) {
          handleCutInternal(e as any);
          return;
        }
        if (
          ctrlKeyPressed &&
          (reactKeyEvent.key === 'v' || reactKeyEvent.key === 'V')
        ) {
          handlePasteInternal(e as any);
          return;
        }
        if (ctrlKeyPressed) return;
        if (noCellsSelected) return;
      }

      if (!isCurrentlyEditing) {
        handleKeyboardCellMovement(e);
        const deleteKeysPressed =
          keyCode === DELETE_KEY || keyCode === BACKSPACE_KEY;
        if (deleteKeysPressed) {
          e.preventDefault();
          clearSelectedCells(cs, ce);
        }

        const currentCell = data[cs.i]?.[cs.j];
        if (currentCell && !currentCell.readOnly) {
          if (keyCode === ENTER_KEY) {
            setStateProxy({
              editing: cs,
              clear: { i: -1, j: -1 },
              forceEdit: true,
            });
            e.preventDefault();
          } else {
            const isCharKey =
              (keyCode >= 48 && keyCode <= 90) ||
              (keyCode >= 96 && keyCode <= 105) ||
              (keyCode >= 186 && keyCode <= 222);
            if (isCharKey && !ctrlKeyPressed) {
              setStateProxy({ editing: cs, clear: cs, forceEdit: false });
            }
          }
        }
      } else {
        const currentCell = data[ed.i]?.[ed.j];
        if (currentCell?.component) {
          const offset = e.shiftKey ? -1 : 1;
          let func: (() => void) | null = null;

          if (keyCode === ESCAPE_KEY) {
            func = () => setStateProxy({ editing: { i: -1, j: -1 } });
          } else if (keyCode === ENTER_KEY) {
            func = () => handleNavigate(e, { i: offset, j: 0 });
          } else if (keyCode === TAB_KEY) {
            func = () => handleNavigate(e, { i: 0, j: offset }, true);
          }

          if (func) {
            e.preventDefault();
            setTimeout(() => {
              func?.();
              dgDomRef.current?.focus({ preventScroll: true });
            }, 1);
          }
        }
      }
    },
    [
      internalState,
      props,
      data,
      handleKeyboardCellMovement,
      clearSelectedCells,
      setStateProxy,
      handleNavigate,
      handleCopyInternal,
      handleCutInternal,
      handlePasteInternal,
    ],
  );

  // --- Effects --- //
  useEffect(() => {
    return () => {
      removeAllListeners(); // Call the stable function directly
    };
  }, [removeAllListeners]);

  // --- Render --- //
  return (
    <span
      ref={dgDomRef}
      tabIndex={0}
      className="data-grid-container"
      onKeyDown={handleGridKeyDown}
    >
      <SheetRenderer
        data={data}
        className={['data-grid', className, overflow].filter(Boolean).join(' ')}
      >
        {data.map((row, i) => (
          <RowRenderer
            key={keyFn ? keyFn(i) : i}
            row={i}
            cells={row}
            selected={isSelectedRow(i)}
          >
            {row.map((cell, j) => {
              const editingStatus = isCellEditing(i, j);
              const clearingStatus = isCellClearing(i, j);
              const selectionStatus = isSelected(i, j);
              const cellKey = cell?.key ?? `${i}-${j}`;

              return (
                <DataCell
                  key={cellKey}
                  row={i}
                  col={j}
                  cell={cell}
                  selected={selectionStatus}
                  editing={editingStatus}
                  clearing={clearingStatus}
                  onMouseDown={handleCellMouseDown}
                  onMouseOver={handleCellMouseOver}
                  onDoubleClick={handleCellDoubleClick}
                  onContextMenu={handleCellContextMenu}
                  onChange={handleCellChange}
                  onRevert={() => setStateProxy({ editing: { i: -1, j: -1 } })}
                  onNavigate={handleKeyboardCellMovement}
                  attributesRenderer={attributesRenderer}
                  cellRenderer={CellRenderer}
                  valueRenderer={valueRenderer}
                  dataRenderer={dataRenderer}
                  valueViewer={ValueViewerComponent}
                  dataEditor={DataEditorComponent}
                  forceEdit={editingStatus && forceEdit}
                />
              );
            })}
          </RowRenderer>
        ))}
      </SheetRenderer>
    </span>
  );
});

// Remove PropTypes
// DataSheet.propTypes = { ... };

DataSheet.displayName = 'DataSheet';

export default DataSheet;

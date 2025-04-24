import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import { CellShape } from './CellShape'; // Ensure CellShape is imported if used in handlers
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
export interface DataSheetProps<T = any> {
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

// Check for Internet Explorer (Simplified)
const IS_IE =
  typeof window !== 'undefined' && /Edge\//.test(navigator.userAgent);

// --- Main Component --- //
const DataSheet: React.FC<DataSheetProps> = memo(props => {
  // --- Props Destructuring --- //
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

  // --- State & Refs --- //
  const [internalState, setInternalState] =
    useState<DataSheetState>(defaultState);
  const dgDomRef = useRef<HTMLSpanElement>(null);

  const currentState = getCurrentState(internalState, props);
  const { start, end, selecting, forceEdit, editing, clear } = currentState;

  // --- State Update Proxy --- //
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
            // Prevent calling onSelect if selection hasn't changed
            if (
              nextSelection.start !== currentSelection.start ||
              nextSelection.end !== currentSelection.end
            ) {
              onSelect(nextSelection);
            }
          }

          const nonSelectionUpdates: Partial<DataSheetState> = { ...newState };
          delete nonSelectionUpdates.start;
          delete nonSelectionUpdates.end;
          return { ...prevState, ...nonSelectionUpdates };
        } else {
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
    // Dependencies updated based on usage within the function
    [props, editModeChanged, onSelect, props.selected], // Added props.selected
  );

  // --- Cell Navigation & Validation Helpers --- //
  const columns = data.length > 0 ? data[0].length : 0;
  const dataShape = { i: data.length, j: columns };

  const isCellWithinBounds = useCallback(
    ({ i, j }: CellLocation): boolean => {
      return i >= 0 && i < dataShape.i && j >= 0 && j < dataShape.j;
    },
    [dataShape],
  );

  const isCellEditable = useCallback(
    ({ i, j }: CellLocation): boolean => {
      if (!isCellWithinBounds({ i, j })) return false;
      const cell = data[i]?.[j];
      return !cell?.readOnly;
    },
    [data, isCellWithinBounds],
  );

  const findNextNavigableCell = useCallback(
    (
      startLoc: CellLocation,
      direction: 'up' | 'down' | 'left' | 'right',
      wrap: boolean = false,
    ): CellLocation => {
      let currentLoc = { ...startLoc };
      const move = {
        up: () => (currentLoc.i -= 1),
        down: () => (currentLoc.i += 1),
        left: () => (currentLoc.j -= 1),
        right: () => (currentLoc.j += 1),
      };

      let initialDirection = true;
      const maxAttempts = dataShape.i * dataShape.j + 1; // Prevent infinite loops in weird cases
      let attempts = 0;

      do {
        // Prevent infinite loop if stuck
        if (attempts++ > maxAttempts) return startLoc;

        // Don't move on first iteration if checking current cell viability
        if (!initialDirection) {
          move[direction]();
        }
        initialDirection = false;

        if (!isCellWithinBounds(currentLoc)) {
          if (!wrap) return startLoc; // Stop if wrapping is disabled

          // Wrap around logic
          if (direction === 'right')
            currentLoc = { i: startLoc.i, j: 0 }; // Wrap row first
          else if (direction === 'left')
            currentLoc = { i: startLoc.i, j: dataShape.j - 1 }; // Wrap row first
          else if (direction === 'down')
            currentLoc = { i: 0, j: startLoc.j }; // Wrap column first
          else if (direction === 'up')
            currentLoc = { i: dataShape.i - 1, j: startLoc.j }; // Wrap column first

          // If wrapped cell is still out of bounds (e.g., 1x1 grid), return start
          if (!isCellWithinBounds(currentLoc)) return startLoc;

          // If after wrapping we land on the start cell again, and it's not navigable, maybe try next row/col?
          // This gets complex, basic wrap might be sufficient for most cases.
          // For now, if wrap lands on start and start is not navigable, we might be stuck - return start.
          if (
            currentLoc.i === startLoc.i &&
            currentLoc.j === startLoc.j &&
            !isCellNavigable(
              data[currentLoc.i]?.[currentLoc.j],
              currentLoc.i,
              currentLoc.j,
            )
          ) {
            return startLoc;
          }
        }
      } while (
        !isCellNavigable(
          data[currentLoc.i]?.[currentLoc.j],
          currentLoc.i,
          currentLoc.j,
        )
      );

      return currentLoc;
    },
    [data, dataShape, isCellWithinBounds, isCellNavigable],
  );

  // --- Event Handlers defined with useCallback --- //

  // Define Copy/Cut first as Keydown depends on them for IE logic
  const handleCopyInternal = useCallback(
    (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => {
      if (!isEmpty(editing)) return;

      if (handleCopyProp) {
        handleCopyProp({
          event: e as ClipboardEvent,
          dataRenderer,
          valueRenderer,
          data,
          start: currentState.start, // Use current state from helper
          end: currentState.end,
          range,
        });
      } else {
        e.preventDefault();
        const { start: cs, end: ce } = currentState;
        const text = range(cs.i, ce.i)
          .map(i =>
            range(cs.j, ce.j)
              .map(j => {
                const cell = data[i]?.[j];
                if (!cell) return '';
                const value = dataRenderer
                  ? dataRenderer(cell, i, j)
                  : cell.value;
                return value !== null && value !== undefined
                  ? String(value)
                  : String(valueRenderer(cell, i, j));
              })
              .join('\t'),
          )
          .join('\n');

        try {
          const clipboardData = (e as ClipboardEvent).clipboardData;
          if (clipboardData) {
            clipboardData.setData('text/plain', text);
          } else if (
            typeof window !== 'undefined' &&
            (window as any).clipboardData
          ) {
            (window as any).clipboardData.setData('Text', text);
          } else {
            console.warn('Clipboard API fallback needed for copy.');
          }
        } catch (err) {
          console.error('Failed to copy data to clipboard:', err);
        }
      }
    },
    [
      handleCopyProp,
      editing,
      data,
      dataRenderer,
      valueRenderer,
      currentState,
      props,
    ],
  );

  const handleCellsChanged = useCallback(
    (
      changes: {
        cell: CellShape | undefined;
        row: number;
        col: number;
        value: any;
      }[],
      additions?: { row: number; col: number; value: any }[],
    ) => {
      // This function should ideally just call the prop
      if (onCellsChanged) {
        // Map cell to expected type T if necessary, assuming T=CellShape for now
        const mappedChanges = changes.map(c => ({
          ...c,
          cell: c.cell as CellShape,
        }));
        onCellsChanged(mappedChanges, additions);
      } else {
        console.warn('Cells changed but no onCellsChanged handler provided.');
        // Avoid direct mutation or state updates here if data is controlled via props
      }
    },
    [onCellsChanged],
  );

  const handleCutInternal = useCallback(
    (e: ClipboardEvent | React.ClipboardEvent) => {
      if (!isEmpty(editing)) return;
      handleCopyInternal(e);
      const { start: cs, end: ce } = getCurrentState(internalState, props);
      const changes = range(cs.i, ce.i).flatMap(i =>
        range(cs.j, ce.j).map(j => ({
          cell: data[i]?.[j],
          row: i,
          col: j,
          value: null,
        })),
      );
      const editableChanges = changes.filter(change =>
        isCellEditable({ i: change.row, j: change.col }),
      );
      if (editableChanges.length > 0 && handleCellsChanged) {
        handleCellsChanged(editableChanges);
        setStateProxy({ start: cs, end: cs, editing: defaultState.editing });
      }
    },
    [
      editing,
      props,
      data,
      handleCellsChanged,
      internalState,
      setStateProxy,
      handleCopyInternal,
      isCellEditable,
    ],
  );

  const handlePasteInternal = useCallback(
    async (e: ClipboardEvent | React.ClipboardEvent | KeyboardEvent) => {
      if (!isEmpty(editing)) return;
      e.preventDefault();
      const { start: cs } = currentState;
      let pastedText = '';
      try {
        const clipboardData = (e as ClipboardEvent).clipboardData;
        if (clipboardData?.getData) {
          pastedText = clipboardData.getData('text/plain');
        } else if (
          typeof window !== 'undefined' &&
          (window as any).clipboardData?.getData
        ) {
          pastedText = (window as any).clipboardData.getData('Text');
        } else if (navigator.clipboard?.readText) {
          pastedText = await navigator.clipboard.readText();
        } else {
          console.warn('Cannot read clipboard data.');
          return;
        }
      } catch (err) {
        console.error('Failed to read clipboard data:', err);
        return;
      }
      const pastedData = parsePaste(pastedText);

      if (pastedData.length > 0) {
        const changes: {
          cell: CellShape | undefined;
          row: number;
          col: number;
          value: any;
        }[] = [];
        let maxRow = cs.i;
        let maxCol = cs.j;

        pastedData.forEach((row, i) => {
          const rowIndex = cs.i + i;
          if (rowIndex < data.length) {
            // Only paste within existing row bounds (simple approach)
            row.forEach((value, j) => {
              const colIndex = cs.j + j;
              if (colIndex < data[rowIndex]?.length) {
                // Only paste within existing col bounds
                if (isCellEditable({ i: rowIndex, j: colIndex })) {
                  const cell = data[rowIndex]?.[colIndex];
                  changes.push({ cell, row: rowIndex, col: colIndex, value });
                  maxRow = Math.max(maxRow, rowIndex);
                  maxCol = Math.max(maxCol, colIndex);
                }
              } else {
                // Handle adding new columns - requires data structure change or onCellsChanged support
                console.warn(
                  `Paste extending beyond column bounds at [${rowIndex}, ${colIndex}] - not handled.`,
                );
              }
            });
          } else {
            // Handle adding new rows - requires data structure change or onCellsChanged support
            console.warn(
              `Paste extending beyond row bounds at [${rowIndex}] - not handled.`,
            );
          }
        });

        if (changes.length > 0) {
          if (handleCellsChanged) {
            handleCellsChanged(changes);
          }
          // Call dedicated onPaste prop (mapping might be needed)
          if (onPaste) {
            const mappedPastedData = pastedData.map((row, i) =>
              row.map((pastedValue, j) => ({
                cell: data[cs.i + i]?.[cs.j + j],
                data: pastedValue,
              })),
            );
            onPaste(mappedPastedData);
          }
          // Update selection to cover pasted area
          setStateProxy({
            start: cs,
            end: { i: maxRow, j: maxCol },
            editing: defaultState.editing,
          });
        }
      }
    },
    [
      editing,
      currentState,
      data,
      parsePaste,
      isCellEditable,
      handleCellsChanged,
      onPaste,
      setStateProxy,
      props,
    ],
  );

  const handleNavigate = useCallback(
    (e: React.KeyboardEvent, commit: boolean = false) => {
      if (!isCellWithinBounds(editing)) {
        return; // Should not happen if editing is valid
      }
      const cell = data[editing.i]?.[editing.j]; // Safe navigation
      if (cell && cell.component) {
        return; // Let component handle navigation
      }

      const stateUpdater: Partial<DataSheetState> = {
        editing: defaultState.editing, // Exit editing mode by default
        forceEdit: false,
      };

      const directionMap: { [key: number]: 'up' | 'down' | 'left' | 'right' } =
        {
          [LEFT_KEY]: 'left',
          [RIGHT_KEY]: 'right',
          [UP_KEY]: 'up',
          [DOWN_KEY]: 'down',
          [TAB_KEY]: e.shiftKey ? 'left' : 'right',
          [ENTER_KEY]: e.shiftKey ? 'up' : 'down',
        };
      const direction = directionMap[e.which || e.keyCode];

      if (direction) {
        e.preventDefault(); // Prevent default browser scroll/tab behavior
        const wrap =
          direction === 'left' ||
          direction === 'right' ||
          direction === 'up' ||
          direction === 'down'; // Simple wrap logic for now
        const nextLoc = findNextNavigableCell(editing, direction, wrap);

        if (nextLoc.i !== editing.i || nextLoc.j !== editing.j) {
          stateUpdater.start = nextLoc;
          stateUpdater.end = nextLoc;
          // Don't automatically enter edit mode on navigation, just select
          // User can press Enter or start typing to edit.
          stateUpdater.editing = defaultState.editing;
          stateUpdater.forceEdit = false;
        } else {
          // If navigation didn't change location (e.g., at edge, no wrap), just exit editing
          stateUpdater.editing = defaultState.editing;
        }
      } else if (e.which === ESCAPE_KEY) {
        // Revert is handled by DataCell calling onRevert
        // Ensure sheet state reflects exit from editing
        stateUpdater.editing = defaultState.editing;
      }
      // Commit is handled by DataCell calling onChange/onRevert which resets editing state

      setStateProxy(stateUpdater);
    },
    [editing, data, setStateProxy, findNextNavigableCell, isCellWithinBounds], // Removed isCellEditable dependency
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.defaultPrevented) {
        return;
      }

      // --- IE Ctrl+C/X/V Handling (Integrated) ---
      if (IS_IE && e.ctrlKey) {
        if (e.keyCode === 67) {
          // C
          handleCopyInternal(e as any);
          return; // Prevent further handling
        } else if (e.keyCode === 88) {
          // X
          handleCutInternal(e as any);
          return; // Prevent further handling
        } else if (e.keyCode === 86) {
          // V
          console.warn('IE paste via Ctrl+V needs specific handling.');
          return; // Prevent further handling for now
        }
      }

      // --- Regular Keydown Logic --- //
      const currentCellLoc = editing;
      if (isEmpty(currentCellLoc)) {
        // Handle keydown when not editing
        // ... (existing non-editing logic) ...
        if (isEmpty(start)) return;
        const navKeys = [
          UP_KEY,
          DOWN_KEY,
          LEFT_KEY,
          RIGHT_KEY,
          TAB_KEY,
          ENTER_KEY,
        ];
        const editTriggerKeys = [BACKSPACE_KEY, DELETE_KEY];
        if (navKeys.includes(e.which)) {
          e.preventDefault();
          const directionMap: {
            [key: number]: 'up' | 'down' | 'left' | 'right';
          } = {
            [LEFT_KEY]: 'left',
            [RIGHT_KEY]: 'right',
            [UP_KEY]: 'up',
            [DOWN_KEY]: 'down',
            [TAB_KEY]: e.shiftKey ? 'left' : 'right',
            [ENTER_KEY]: e.shiftKey ? 'up' : 'down',
          };
          const direction = directionMap[e.which];
          if (direction) {
            const nextLoc = findNextNavigableCell(start, direction, true);
            setStateProxy({ start: nextLoc, end: nextLoc });
          }
        } else if (e.which === ENTER_KEY) {
          e.preventDefault();
          if (isCellEditable(start)) {
            setStateProxy({
              editing: start,
              forceEdit: false,
              clear: defaultState.clear,
            });
          }
        } else if (editTriggerKeys.includes(e.which)) {
          e.preventDefault();
          if (isCellEditable(start)) {
            setStateProxy({ editing: start, forceEdit: false, clear: start });
          }
        } else if (!e.ctrlKey && !e.metaKey && e.key?.length === 1) {
          e.preventDefault();
          if (isCellEditable(start)) {
            setStateProxy({ editing: start, forceEdit: true, clear: start });
          }
        }
        return;
      }

      // Handle keydown when editing
      const cell = data[currentCellLoc.i]?.[currentCellLoc.j];
      if (cell && cell.component) {
        return; // Let component handle its keys
      }
      // Backspace/Delete handled by DataCell now
    },
    [
      start,
      editing,
      data,
      setStateProxy,
      findNextNavigableCell,
      isCellEditable,
      isCellWithinBounds,
      handleCopyInternal,
      handleCutInternal,
    ],
  );

  const pageClick = useCallback(
    (e: MouseEvent) => {
      if (disablePageClick) return;

      const element = dgDomRef.current;
      if (element && !element.contains(e.target as Node)) {
        setStateProxy({
          start: defaultState.start,
          end: defaultState.end,
          editing: defaultState.editing,
          selecting: false,
        });
      }
    },
    [disablePageClick, setStateProxy],
  );

  const handleMouseUp = useCallback(() => {
    if (selecting) {
      setStateProxy({ selecting: false });
    }
  }, [selecting, setStateProxy]);

  // --- Effect for Document Event Listeners --- //
  useEffect(() => {
    // Non-IE Clipboard Listeners
    document.addEventListener('cut', handleCutInternal);
    document.addEventListener('copy', handleCopyInternal);
    document.addEventListener('paste', handlePasteInternal);

    // Keydown Listener
    document.addEventListener('keydown', handleKeydown);

    // Global Mouse Listeners
    document.addEventListener('mouseup', handleMouseUp);

    // Page Click Listener (Conditional)
    let pageClickListenerAdded = false;
    if (!disablePageClick) {
      document.addEventListener('mousedown', pageClick, true);
      pageClickListenerAdded = true;
    }

    // Cleanup function
    return () => {
      document.removeEventListener('cut', handleCutInternal);
      document.removeEventListener('copy', handleCopyInternal);
      document.removeEventListener('paste', handlePasteInternal);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mouseup', handleMouseUp);

      if (pageClickListenerAdded) {
        document.removeEventListener('mousedown', pageClick, true);
      }
    };
  }, [
    handleCutInternal,
    handleCopyInternal,
    handlePasteInternal,
    handleKeydown,
    handleMouseUp,
    pageClick,
    disablePageClick,
  ]);

  // --- Cell Event Handlers (passed down to DataCell) --- //

  const handleCellMouseDown = useCallback(
    (row: number, col: number, e: React.MouseEvent<HTMLTableCellElement>) => {
      const cellLocation = { i: row, j: col };
      // Prevent action if cell events are disabled (check in DataCell now)
      // Allow selection start even if not editable, but prevent entering edit mode later

      const isEditingThisCell =
        !isEmpty(editing) && editing.i === row && editing.j === col;

      if (!isEditingThisCell) {
        setStateProxy({
          selecting: true,
          start: cellLocation,
          end: cellLocation,
          editing: defaultState.editing, // Exit previous edit mode
          forceEdit: false,
        });
      }
      // If clicking the cell being edited, do nothing on mousedown
    },
    [editing, setStateProxy],
  );

  const handleCellMouseOver = useCallback(
    (row: number, col: number) => {
      if (selecting) {
        setStateProxy({ end: { i: row, j: col } });
      }
    },
    [selecting, setStateProxy],
  );

  const handleCellDoubleClick = useCallback(
    (row: number, col: number) => {
      const cellLocation = { i: row, j: col };
      if (isCellEditable(cellLocation)) {
        setStateProxy({
          editing: cellLocation,
          forceEdit: true,
          clear: defaultState.clear,
        });
      }
    },
    [setStateProxy, isCellEditable],
  );

  const handleCellContextMenu = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>, row: number, col: number) => {
      const cell = data[row]?.[col];
      if (onContextMenu && cell !== undefined) {
        onContextMenu(e, cell, row, col);
      }
    },
    [onContextMenu, data],
  );

  const handleCellChange = useCallback(
    (row: number, col: number, value: any) => {
      // This change comes from DataCell (after edit completes)
      const cell = data[row]?.[col];
      let changed = false;
      // Check if value actually changed compared to original data
      // This check might be complex depending on dataRenderer etc.
      // For simplicity, assume change is valid if handler is called.

      if (onChange) {
        onChange(cell, row, col, value);
        changed = true;
      } else if (onCellsChanged) {
        onCellsChanged([{ cell, row, col, value }]);
        changed = true;
      } else {
        console.warn(
          'Cell change occurred but no onChange or onCellsChanged handler provided.',
        );
      }

      // Exit editing state after change is processed
      setStateProxy({
        editing: defaultState.editing,
        clear: defaultState.clear,
        forceEdit: false,
      });
    },
    [data, onChange, onCellsChanged, setStateProxy],
  );

  const handleCellRevert = useCallback(() => {
    setStateProxy({ editing: defaultState.editing, forceEdit: false });
  }, [setStateProxy]);

  // --- Render Logic --- //

  const isEditing = useCallback(
    (i: number, j: number): boolean =>
      !isEmpty(editing) && editing.i === i && editing.j === j,
    [editing],
  );

  const isClearing = useCallback(
    (i: number, j: number): boolean =>
      !isEmpty(clear) && clear.i === i && clear.j === j,
    [clear],
  );

  const isSelected = useCallback(
    (i: number, j: number): boolean => {
      const { start: cs, end: ce } = getCurrentState(internalState, props);
      if (isEmpty(cs) || isEmpty(ce) || cs.i === -1 || ce.i === -1)
        return false; // Check for default state
      const minRow = Math.min(cs.i, ce.i);
      const maxRow = Math.max(cs.i, ce.i);
      const minCol = Math.min(cs.j, ce.j);
      const maxCol = Math.max(cs.j, ce.j);
      return i >= minRow && i <= maxRow && j >= minCol && j <= maxCol;
    },
    [internalState, props],
  );

  return (
    <span ref={dgDomRef} tabIndex={0} className="data-grid-container">
      <SheetRenderer
        className={['data-grid', className, overflow].filter(Boolean).join(' ')}
        data={data}
      >
        {data.map((row, i) => (
          <RowRenderer key={keyFn ? keyFn(i) : i} row={i} cells={row}>
            {row.map((cell, j) => {
              const cellLocation = { i, j };
              const boundAttributesRenderer = attributesRenderer
                ? () => attributesRenderer(cell, i, j)
                : undefined;

              return (
                <DataCell
                  key={cell?.key || `${i}-${j}`}
                  row={i}
                  col={j}
                  cell={cell}
                  forceEdit={forceEdit && isEditing(i, j)}
                  selected={isSelected(i, j)}
                  editing={isEditing(i, j)}
                  clearing={isClearing(i, j)}
                  cellRenderer={CellRenderer}
                  valueRenderer={valueRenderer}
                  dataRenderer={dataRenderer}
                  valueViewer={ValueViewerComponent}
                  dataEditor={DataEditorComponent}
                  attributesRenderer={boundAttributesRenderer}
                  onNavigate={handleNavigate}
                  onMouseDown={handleCellMouseDown}
                  onMouseOver={handleCellMouseOver}
                  onDoubleClick={handleCellDoubleClick}
                  onContextMenu={handleCellContextMenu}
                  onChange={handleCellChange}
                  onRevert={handleCellRevert}
                />
              );
            })}
          </RowRenderer>
        ))}
      </SheetRenderer>
    </span>
  );
});

DataSheet.displayName = 'DataSheet';

export default DataSheet;

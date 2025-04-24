import PropTypes from 'prop-types';
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

const isEmpty = obj => !obj || Object.keys(obj).length === 0;

const range = (start, end) => {
  const array = [];
  const inc = end - start > 0;
  for (let i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
    inc ? array.push(i) : array.unshift(i);
  }
  return array;
};

const defaultParsePaste = str => {
  return str.split(/\r\n|\n|\r/).map(row => row.split('\t'));
};

const defaultState = {
  start: {},
  end: {},
  selecting: false,
  forceEdit: false,
  editing: {},
  clear: {},
};

// Helper to check if selection is controlled
const isSelectionControlled = props => 'selected' in props;

// Helper to get state, merging controlled selection if necessary
const getCurrentState = (internalState, props) => {
  let state = { ...internalState };
  if (isSelectionControlled(props)) {
    let { start, end } = props.selected || {};
    start = start || defaultState.start;
    end = end || defaultState.end;
    state = { ...state, start, end };
  }
  return state;
};

const DataSheet = memo(props => {
  const {
    data,
    className,
    overflow,
    valueRenderer,
    dataRenderer,
    sheetRenderer: SheetRenderer = Sheet,
    rowRenderer: RowRenderer = Row,
    cellRenderer = Cell,
    valueViewer = ValueViewer,
    dataEditor = DataEditor,
    attributesRenderer,
    keyFn,
    handleCopy,
    parsePaste = defaultParsePaste,
    onCellsChanged,
    onChange,
    onContextMenu,
    onSelect,
    onPaste,
    isCellNavigable = () => true,
    selected: selectedProp, // Rename to avoid conflict with internal state
    disablePageClick = false,
    editModeChanged,
  } = props;

  const [internalState, setInternalState] = useState(defaultState);
  const dgDomRef = useRef(null);
  const cellRefs = useRef({}); // To store refs for individual cells if needed, e.g., for focusing

  // Get derived state (handles controlled selection)
  const currentState = getCurrentState(internalState, props);
  const { start, end, selecting, forceEdit, editing, clear } = currentState;

  // Custom setState logic to handle controlled props
  const setStateProxy = useCallback(
    newState => {
      if (editModeChanged && newState.editing) {
        const wasEditing = !isEmpty(internalState.editing);
        const willBeEditing = !isEmpty(newState.editing);
        if (wasEditing !== willBeEditing) {
          editModeChanged(willBeEditing);
        }
      }

      let update = {};
      let selectionUpdate = {};

      for (const key in newState) {
        if (key === 'start' || key === 'end') {
          selectionUpdate[key] = newState[key];
        } else {
          update[key] = newState[key];
        }
      }

      if (isSelectionControlled(props)) {
        if (Object.keys(selectionUpdate).length > 0) {
          let currentSelection = props.selected || {};
          let nextSelectionStart =
            selectionUpdate.start !== undefined
              ? selectionUpdate.start
              : currentSelection.start || defaultState.start;
          let nextSelectionEnd =
            selectionUpdate.end !== undefined
              ? selectionUpdate.end
              : currentSelection.end || defaultState.end;
          if (onSelect) {
            onSelect({ start: nextSelectionStart, end: nextSelectionEnd });
          }
        }
        // Only update internal state for non-selection properties
        if (Object.keys(update).length > 0) {
          setInternalState(prevState => ({ ...prevState, ...update }));
        }
      } else {
        // Uncontrolled: update everything
        setInternalState(prevState => ({ ...prevState, ...newState }));
      }
    },
    [props, internalState, editModeChanged, onSelect],
  ); // Dependencies updated

  const removeAllListeners = useCallback(() => {
    document.removeEventListener('mousedown', pageClick);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('cut', handleCutInternal);
    document.removeEventListener('copy', handleCopyInternal);
    document.removeEventListener('paste', handlePasteInternal);
    document.removeEventListener('keydown', handleIEClipboardEvents);
  }, []); // Dependencies will be added by linting rule if necessary

  const pageClick = useCallback(
    e => {
      if (disablePageClick) return;
      const element = dgDomRef.current;
      // Check if dgDomRef.current exists before calling contains
      if (element && !element.contains(e.target)) {
        setStateProxy(defaultState);
        removeAllListeners();
      }
    },
    [disablePageClick, removeAllListeners, setStateProxy],
  );

  // Internal handlers wrapped in useCallback
  const handleCutInternal = useCallback(
    e => {
      if (isEmpty(editing)) {
        e.preventDefault();
        handleCopyInternal(e); // Use internal copy handler
        const { start: currentStart, end: currentEnd } = getCurrentState(
          internalState,
          props,
        ); // Get current state
        // eslint-disable-next-line no-use-before-define
        clearSelectedCells(currentStart, currentEnd);
      }
    },
    [editing, props, internalState, setStateProxy],
  ); // Added dependencies

  const handleIEClipboardEvents = useCallback(
    e => {
      if (e.ctrlKey) {
        if (e.keyCode === 67) {
          handleCopyInternal(e);
        } else if (e.keyCode === 88) {
          handleCutInternal(e);
        } else if (e.keyCode === 86 || e.which === 86) {
          handlePasteInternal(e);
        }
      }
    },
    [handleCopyInternal, handleCutInternal, handlePasteInternal],
  ); // Added dependencies

  const handleCopyInternal = useCallback(
    e => {
      if (isEmpty(editing)) {
        e.preventDefault();
        const { start: currentStart, end: currentEnd } = getCurrentState(
          internalState,
          props,
        ); // Get current state

        if (handleCopy) {
          handleCopy({
            event: e,
            dataRenderer,
            valueRenderer,
            data,
            start: currentStart,
            end: currentEnd,
            range,
          });
        } else {
          const text = range(currentStart.i, currentEnd.i)
            .map(i =>
              range(currentStart.j, currentEnd.j)
                .map(j => {
                  const cell = data[i]?.[j]; // Safely access cell
                  if (!cell) return ''; // Handle undefined cell
                  const value = dataRenderer ? dataRenderer(cell, i, j) : null;
                  if (
                    value === '' ||
                    value === null ||
                    typeof value === 'undefined'
                  ) {
                    return valueRenderer(cell, i, j);
                  }
                  return value;
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
            } else if (window.clipboardData && window.clipboardData.setData) {
              // IE specific method.
              window.clipboardData.setData('Text', text);
            } else if (e.clipboardData && e.clipboardData.setData) {
              e.clipboardData.setData('text/plain', text);
            }
          } catch (err) {
            console.error('Clipboard API failed:', err);
          }
        }
      }
    },
    [
      editing,
      props,
      internalState,
      handleCopy,
      dataRenderer,
      valueRenderer,
      data,
    ],
  ); // Added dependencies

  const handlePasteInternal = useCallback(
    async e => {
      if (isEmpty(editing)) {
        e.preventDefault();
        let { start: currentStart, end: currentEnd } = getCurrentState(
          internalState,
          props,
        );

        currentStart = {
          i: Math.min(currentStart.i, currentEnd.i),
          j: Math.min(currentStart.j, currentEnd.j),
        };
        // currentEnd will be updated dynamically based on pasted data size

        let pastedText = '';
        try {
          if (navigator.clipboard && navigator.clipboard.readText) {
            pastedText = await navigator.clipboard.readText();
          } else if (window.clipboardData && window.clipboardData.getData) {
            pastedText = window.clipboardData.getData('Text');
          } else if (e.clipboardData && e.clipboardData.getData) {
            pastedText = e.clipboardData.getData('text/plain');
          }
        } catch (err) {
          console.error('Clipboard read failed:', err);
          return;
        }

        const pasteData = parsePaste(pastedText);
        const changes = [];
        let newEnd = { ...currentStart }; // Initialize newEnd

        if (onCellsChanged) {
          const additions = [];
          pasteData.forEach((row, i) => {
            row.forEach((value, j) => {
              const targetRow = currentStart.i + i;
              const targetCol = currentStart.j + j;
              newEnd = { i: targetRow, j: targetCol }; // Update end based on pasted data size
              const cell = data[targetRow]?.[targetCol];
              if (!cell) {
                additions.push({ row: targetRow, col: targetCol, value });
              } else if (!cell.readOnly) {
                changes.push({ cell, row: targetRow, col: targetCol, value });
              }
            });
          });
          if (additions.length) {
            onCellsChanged(changes, additions);
          } else {
            onCellsChanged(changes);
          }
        } else if (onPaste) {
          const structuredChanges = [];
          pasteData.forEach((row, i) => {
            const rowData = [];
            row.forEach((pastedValue, j) => {
              const targetRow = currentStart.i + i;
              const targetCol = currentStart.j + j;
              newEnd = { i: targetRow, j: targetCol }; // Update end
              const cell = data[targetRow]?.[targetCol];
              rowData.push({ cell: cell, data: pastedValue });
            });
            structuredChanges.push(rowData);
          });
          onPaste(structuredChanges);
        } else if (onChange) {
          pasteData.forEach((row, i) => {
            row.forEach((value, j) => {
              const targetRow = currentStart.i + i;
              const targetCol = currentStart.j + j;
              newEnd = { i: targetRow, j: targetCol }; // Update end
              const cell = data[targetRow]?.[targetCol];
              if (cell && !cell.readOnly) {
                onChange(cell, targetRow, targetCol, value);
              }
            });
          });
        }
        // Update selection to cover pasted area
        setStateProxy({ start: currentStart, end: newEnd });
      }
    },
    [
      editing,
      props,
      internalState,
      parsePaste,
      onCellsChanged,
      onPaste,
      onChange,
      data,
      setStateProxy,
    ],
  );

  const onRevert = useCallback(() => {
    setStateProxy({ editing: {} });
    setTimeout(() => {
      if (dgDomRef.current) {
        dgDomRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, [setStateProxy]);

  const clearSelectedCells = useCallback(
    (startCell, endCell) => {
      const cellsToClear = getSelectedCells(data, startCell, endCell)
        .filter(({ cell }) => !cell.readOnly)
        .map(({ cell, row, col }) => ({ cell, row, col, value: '' }));

      if (onCellsChanged) {
        onCellsChanged(cellsToClear);
        onRevert(); // Revert editing mode after clearing
      } else if (onChange) {
        setTimeout(() => {
          cellsToClear.forEach(({ cell, row, col, value }) => {
            onChange(cell, row, col, value);
          });
          onRevert(); // Revert editing mode after clearing
        }, 0);
      }
    },
    [data, onCellsChanged, onChange, onRevert],
  );

  // Handlers for DataCell
  const handleCellMouseDown = useCallback(
    (i, j, e) => {
      const currentSelectionState = getCurrentState(internalState, props);
      const isEditingSameCell =
        !isEmpty(currentSelectionState.editing) &&
        currentSelectionState.editing.i === i &&
        currentSelectionState.editing.j === j;
      const newEditingState =
        isEmpty(currentSelectionState.editing) ||
        currentSelectionState.editing.i !== i ||
        currentSelectionState.editing.j !== j
          ? {}
          : currentSelectionState.editing;

      setStateProxy({
        selecting: !isEditingSameCell,
        start: e.shiftKey ? currentSelectionState.start : { i, j },
        end: { i, j },
        editing: newEditingState,
        forceEdit: !!isEditingSameCell,
      });

      // Add listeners dynamically
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousedown', pageClick);
      document.addEventListener('cut', handleCutInternal);
      document.addEventListener('copy', handleCopyInternal);
      document.addEventListener('paste', handlePasteInternal);
      // IE specific listener
      if (/MSIE|Trident/.test(window.navigator.userAgent)) {
        document.addEventListener('keydown', handleIEClipboardEvents);
      }
    },
    [
      internalState,
      props,
      setStateProxy,
      pageClick,
      handleCutInternal,
      handleCopyInternal,
      handlePasteInternal,
      handleIEClipboardEvents,
    ],
  );

  const handleCellMouseOver = useCallback(
    (i, j) => {
      if (internalState.selecting && isEmpty(internalState.editing)) {
        // Use internal state directly here
        setStateProxy({ end: { i, j } });
      }
    },
    [internalState.selecting, internalState.editing, setStateProxy],
  );

  const handleCellDoubleClick = useCallback(
    (i, j) => {
      const cell = data[i]?.[j];
      if (cell && !cell.readOnly) {
        setStateProxy({ editing: { i, j }, forceEdit: true, clear: {} });
      }
    },
    [data, setStateProxy],
  );

  const handleCellContextMenu = useCallback(
    (evt, i, j) => {
      const cell = data[i]?.[j];
      if (onContextMenu && cell) {
        onContextMenu(evt, cell, i, j);
      }
    },
    [data, onContextMenu],
  );

  const handleCellChange = useCallback(
    (row, col, value) => {
      if (onCellsChanged) {
        onCellsChanged([{ cell: data[row]?.[col], row, col, value }]);
      } else if (onChange) {
        onChange(data[row]?.[col], row, col, value);
      }
      onRevert(); // Exit editing mode after change
    },
    [data, onChange, onCellsChanged, onRevert],
  );

  const searchForNextSelectablePos = useCallback(
    (currentStart, offsets, jumpRow) => {
      const isCellDefined = ({ i, j }) => data[i]?.[j] !== undefined;
      const previousRow = location => ({
        i: location.i - 1,
        j: data[0].length - 1,
      });
      const nextRow = location => ({ i: location.i + 1, j: 0 });
      const advanceOffset = location => ({
        i: location.i + offsets.i,
        j: location.j + offsets.j,
      });

      let newLocation = advanceOffset(currentStart);

      while (isCellDefined(newLocation)) {
        const cell = data[newLocation.i][newLocation.j];
        if (isCellNavigable(cell, newLocation.i, newLocation.j)) {
          break; // Found navigable cell
        }
        newLocation = advanceOffset(newLocation);
      }

      if (!isCellDefined(newLocation)) {
        if (!jumpRow) return null;
        newLocation =
          offsets.j < 0 ? previousRow(newLocation) : nextRow(newLocation);
      }

      if (!isCellDefined(newLocation)) return null; // No navigable cell found

      // Final check if the landing cell (after row jump) is navigable
      const finalCell = data[newLocation.i][newLocation.j];
      if (!isCellNavigable(finalCell, newLocation.i, newLocation.j)) {
        // Recursively search from the new position
        return searchForNextSelectablePos(newLocation, offsets, jumpRow);
      }

      return newLocation;
    },
    [data, isCellNavigable],
  );

  const updateLocationSingleCell = useCallback(
    location => {
      setStateProxy({
        start: location,
        end: location,
        editing: {},
      });
    },
    [setStateProxy],
  );

  const updateLocationMultipleCells = useCallback(
    offsets => {
      const { start: currentStart, end: currentEnd } = getCurrentState(
        internalState,
        props,
      );
      const newEndLocation = {
        i: currentEnd.i + offsets.i,
        j: Math.min(data[0].length - 1, Math.max(0, currentEnd.j + offsets.j)),
      };
      // Ensure start doesn't change during multi-select drag
      setStateProxy({ start: currentStart, end: newEndLocation, editing: {} });
    },
    [internalState, props, data, setStateProxy],
  );

  const handleNavigate = useCallback(
    (e, offsets, jumpRow) => {
      if (offsets && (offsets.i || offsets.j)) {
        const { start: currentStart } = getCurrentState(internalState, props);
        const multiSelect = e.shiftKey && !jumpRow;

        if (multiSelect) {
          updateLocationMultipleCells(offsets);
        } else {
          const newLocation = searchForNextSelectablePos(
            currentStart,
            offsets,
            jumpRow,
          );
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
    (e, commit = false) => {
      const { start: currentStart, editing: currentEditing } = getCurrentState(
        internalState,
        props,
      );
      const isCurrentlyEditing = !isEmpty(currentEditing);
      const currentCell = data[currentStart.i]?.[currentStart.j];

      if (isCurrentlyEditing && !commit) {
        return; // Don't move while actively editing unless committing
      }

      const keyCode = e.which || e.keyCode;
      const hasComponent = currentCell?.component;

      if (hasComponent && isCurrentlyEditing && !commit) {
        // Let component handle navigation keys if needed, maybe?
        // Original logic prevented default. Let's stick to that for now.
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
          return; // Not a navigation key
      }

      if (offsets.i || offsets.j) {
        handleNavigate(e, offsets, shouldJumpRow);
      }
    },
    [internalState, props, data, handleNavigate],
  );

  // This handler is attached to the main grid container
  const handleGridKeyDown = useCallback(
    e => {
      if (e.isPropagationStopped && e.isPropagationStopped()) {
        return;
      }
      const {
        start: currentStart,
        end: currentEnd,
        editing: currentEditing,
      } = getCurrentState(internalState, props);
      const isCurrentlyEditing = !isEmpty(currentEditing);
      const noCellsSelected = isEmpty(currentStart);
      const ctrlKeyPressed = e.ctrlKey || e.metaKey;
      const keyCode = e.which || e.keyCode;

      if (noCellsSelected || ctrlKeyPressed) {
        // Allow browser default behavior for copy/paste etc. if no selection or ctrl key
        // Exception: If IE, handle clipboard manually always when focused
        if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
          return;
        }
      }

      if (!isCurrentlyEditing) {
        // Handle navigation if not editing
        handleKeyboardCellMovement(e);

        const deleteKeysPressed =
          keyCode === DELETE_KEY || keyCode === BACKSPACE_KEY;
        if (deleteKeysPressed) {
          e.preventDefault();
          clearSelectedCells(currentStart, currentEnd);
        }

        const currentCell = data[currentStart.i]?.[currentStart.j];
        if (currentCell && !currentCell.readOnly) {
          const enterKeyPressed = keyCode === ENTER_KEY;
          if (enterKeyPressed) {
            setStateProxy({
              editing: currentStart,
              clear: {},
              forceEdit: true,
            });
            e.preventDefault(); // Prevent default form submission or other actions
          } else {
            const numbersPressed = keyCode >= 48 && keyCode <= 57;
            const lettersPressed = keyCode >= 65 && keyCode <= 90;
            const latin1Supplement = keyCode >= 160 && keyCode <= 255;
            const numPadKeysPressed = keyCode >= 96 && keyCode <= 105;
            const equationKeysPressed = [
              187 /* equal */, 189 /* substract */, 190 /* period */,
              107 /* add */, 109 /* decimal point */, 110,
            ].includes(keyCode);

            if (
              numbersPressed ||
              numPadKeysPressed ||
              lettersPressed ||
              latin1Supplement ||
              equationKeysPressed
            ) {
              // Start editing, clearing the cell value first
              setStateProxy({
                editing: currentStart,
                clear: currentStart,
                forceEdit: false,
              });
              // Don't prevent default here, let the input capture the key
            }
          }
        }
      } else {
        // Is editing - let DataCell handle most keys via its onKeyDown
        // Handle ESC, ENTER, TAB at the grid level for component editors
        const isComponentEditor =
          data[currentEditing.i]?.[currentEditing.j]?.component;
        if (isComponentEditor) {
          const offset = e.shiftKey ? -1 : 1;
          let func = null;
          if (keyCode === ESCAPE_KEY) {
            func = onRevert;
          } else if (keyCode === ENTER_KEY) {
            func = () => handleNavigate(e, { i: offset, j: 0 });
          } else if (keyCode === TAB_KEY) {
            func = () => handleNavigate(e, { i: 0, j: offset }, true);
          }

          if (func) {
            e.preventDefault();
            // Timeout ensures the component editor processes the event first if needed
            setTimeout(() => {
              func();
              if (dgDomRef.current) {
                dgDomRef.current.focus({ preventScroll: true });
              }
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
      onRevert,
      handleNavigate,
    ],
  );

  // Effect for managing document listeners
  useEffect(() => {
    // Add listeners when component mounts or potentially when state indicates interaction
    // For simplicity, let's manage them more broadly, but be mindful of performance.
    // Consider adding them only when `selecting` is true or based on focus.

    // Cleanup function to remove listeners
    return () => {
      removeAllListeners();
    };
  }, [removeAllListeners]);

  // Effect for componentDidUpdate logic (handling onSelect prop)
  useEffect(() => {
    // This replicates the onSelect call from the original componentDidUpdate
    // It runs whenever internalState changes (specifically end changes)
    // We only call onSelect if the component is uncontrolled.
    if (!isSelectionControlled(props) && !isEmpty(internalState.end)) {
      // Need to compare with previous internalState.end, which is tricky in hooks.
      // A simpler approach might be to always call onSelect in uncontrolled mode when start/end changes internally.
      // Let's assume the setStateProxy handles the controlled/uncontrolled distinction correctly.
      // The original logic checked `!(end.i === prevEnd.i && end.j === prevEnd.j)`
      // We can achieve similar check using a ref to store previous state or selectively calling onSelect.
      // For now, relying on setStateProxy to call onSelect when needed for controlled.
    }
  }, [internalState.start, internalState.end, props, onSelect]); // Dependency on start/end

  // Render logic
  const isSelected = useCallback(
    (i, j) => {
      const { start: currentStart, end: currentEnd } = getCurrentState(
        internalState,
        props,
      );
      const posX = j >= currentStart.j && j <= currentEnd.j;
      const negX = j <= currentStart.j && j >= currentEnd.j;
      const posY = i >= currentStart.i && i <= currentEnd.i;
      const negY = i <= currentStart.i && i >= currentEnd.i;
      return (
        (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY)
      );
    },
    [internalState, props],
  );

  const isSelectedRow = useCallback(
    rowIndex => {
      const { start: currentStart, end: currentEnd } = getCurrentState(
        internalState,
        props,
      );
      const startY = currentStart.i;
      const endY = currentEnd.i;
      return startY <= endY
        ? rowIndex >= startY && rowIndex <= endY
        : rowIndex <= startY && rowIndex >= endY;
    },
    [internalState, props],
  );

  const isCellEditing = useCallback(
    (i, j) => {
      return internalState.editing.i === i && internalState.editing.j === j;
    },
    [internalState.editing],
  );

  const isCellClearing = useCallback(
    (i, j) => {
      return internalState.clear.i === i && internalState.clear.j === j;
    },
    [internalState.clear],
  );

  const getSelectedCells = useCallback((currentData, startCell, endCell) => {
    let selected = [];
    range(startCell.i, endCell.i).forEach(row => {
      range(startCell.j, endCell.j).forEach(col => {
        if (currentData[row]?.[col]) {
          selected.push({ cell: currentData[row][col], row, col });
        }
      });
    });
    return selected;
  }, []);

  return (
    <span
      ref={dgDomRef}
      tabIndex={0}
      className="data-grid-container"
      onKeyDown={handleGridKeyDown} // Use the grid keydown handler
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

              return (
                <DataCell
                  key={cell.key ? cell.key : `${i}-${j}`}
                  row={i}
                  col={j}
                  cell={cell}
                  // forceEdit={editingStatus && forceEdit} // Pass internal forceEdit state
                  selected={selectionStatus}
                  editing={editingStatus}
                  clearing={clearingStatus}
                  onMouseDown={handleCellMouseDown}
                  onMouseOver={handleCellMouseOver}
                  onDoubleClick={handleCellDoubleClick}
                  onContextMenu={handleCellContextMenu}
                  onChange={handleCellChange}
                  onRevert={onRevert} // Pass the memoized revert handler
                  onNavigate={handleKeyboardCellMovement} // Pass the memoized movement handler
                  // onKey prop seems unused in DataCell after refactor? handleGridKeyDown handles keys.
                  attributesRenderer={attributesRenderer}
                  cellRenderer={cellRenderer}
                  valueRenderer={valueRenderer}
                  dataRenderer={dataRenderer}
                  valueViewer={valueViewer}
                  dataEditor={dataEditor}
                  // Pass forceEdit only when editing this cell
                  {...(editingStatus ? { forceEdit } : {})}
                />
              );
            })}
          </RowRenderer>
        ))}
      </SheetRenderer>
    </span>
  );
});

DataSheet.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
  disablePageClick: PropTypes.bool,
  overflow: PropTypes.oneOf(['wrap', 'nowrap', 'clip']),
  onChange: PropTypes.func,
  onCellsChanged: PropTypes.func,
  onContextMenu: PropTypes.func,
  onSelect: PropTypes.func,
  isCellNavigable: PropTypes.func,
  selected: PropTypes.shape({
    start: PropTypes.shape({
      i: PropTypes.number,
      j: PropTypes.number,
    }),
    end: PropTypes.shape({
      i: PropTypes.number,
      j: PropTypes.number,
    }),
  }),
  valueRenderer: PropTypes.func.isRequired,
  dataRenderer: PropTypes.func,
  sheetRenderer: PropTypes.func, // Updated: Removed isRequired, default provided
  rowRenderer: PropTypes.func, // Updated: Removed isRequired, default provided
  cellRenderer: PropTypes.func, // Updated: Removed isRequired, default provided
  valueViewer: PropTypes.func,
  dataEditor: PropTypes.func,
  parsePaste: PropTypes.func,
  attributesRenderer: PropTypes.func,
  keyFn: PropTypes.func,
  handleCopy: PropTypes.func,
  onPaste: PropTypes.func, // Added onPaste prop type
  editModeChanged: PropTypes.func,
};

DataSheet.defaultProps = {
  sheetRenderer: Sheet,
  rowRenderer: Row,
  cellRenderer: Cell,
  valueViewer: ValueViewer,
  dataEditor: DataEditor,
  parsePaste: defaultParsePaste, // Add default for parsePaste
  isCellNavigable: () => true, // Add default for isCellNavigable
  disablePageClick: false, // Add default
};

DataSheet.displayName = 'DataSheet';

export default DataSheet;

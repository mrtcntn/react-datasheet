import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';

import {
  DOWN_KEY,
  ENTER_KEY,
  ESCAPE_KEY,
  LEFT_KEY,
  RIGHT_KEY,
  TAB_KEY,
  UP_KEY,
} from './keys';

import Cell from './Cell';
import CellShape from './CellShape';
import DataEditor from './DataEditor';
import ValueViewer from './ValueViewer';
import { renderData, renderValue } from './renderHelpers';

function initialData({ cell, row, col, valueRenderer, dataRenderer }) {
  return renderData(cell, row, col, valueRenderer, dataRenderer);
}

function initialValue({ cell, row, col, valueRenderer }) {
  return renderValue(cell, row, col, valueRenderer);
}

function widthStyle(cell) {
  const width = typeof cell.width === 'number' ? `${cell.width}px` : cell.width;
  return width ? { width } : null;
}

const DataCell = memo(props => {
  const {
    row,
    col,
    cell,
    cellRenderer: CellRenderer = Cell,
    valueRenderer,
    dataRenderer,
    dataEditor,
    valueViewer,
    attributesRenderer,
    selected = false,
    editing = false,
    forceEdit = false,
    clearing = false,
    onNavigate,
    onMouseDown,
    onMouseOver,
    onDoubleClick,
    onContextMenu,
    onChange,
    onRevert,
    onKeyUp,
  } = props;

  const [value, setValue] = useState('');
  const [updated, setUpdated] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [committing, setCommitting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (editing) {
      const initialEditValue = clearing ? '' : initialData(props);
      setValue(initialEditValue);
      setReverting(false);
      setCommitting(false);
    }
  }, [editing, clearing, props]);

  useEffect(() => {
    if (!editing && !reverting && !committing && value !== initialData(props)) {
      onChange(row, col, value);
    }
  }, [editing, reverting, committing, value, onChange, row, col, props]);

  useEffect(() => {
    // This is a placeholder for the original logic that was removed
  }, [props]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = newValue => {
    setValue(newValue);
    setCommitting(false);
  };

  const handleCommit = (commitValue, e) => {
    if (commitValue !== initialData(props)) {
      setValue(commitValue);
      setCommitting(true);
      onChange(row, col, commitValue);
    } else {
      handleRevert();
    }
    if (e) {
      e.preventDefault();
      onNavigate(e, true);
    }
  };

  const handleRevert = () => {
    setReverting(true);
    onRevert();
  };

  const handleMouseDown = e => {
    if (!cell.disableEvents) {
      onMouseDown(row, col, e);
    }
  };

  const handleMouseOver = e => {
    if (!cell.disableEvents) {
      onMouseOver(row, col);
    }
  };

  const handleDoubleClick = e => {
    if (!cell.disableEvents) {
      onDoubleClick(row, col);
    }
  };

  const handleContextMenu = e => {
    if (!cell.disableEvents) {
      onContextMenu(e, row, col);
    }
  };

  const handleKey = e => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === ESCAPE_KEY) {
      handleRevert();
      return;
    }
    const { component } = cell;
    const eatKeys = forceEdit || !!component;
    const shouldCommit =
      keyCode === ENTER_KEY ||
      keyCode === TAB_KEY ||
      (!eatKeys && [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY].includes(keyCode));

    if (shouldCommit) {
      handleCommit(value, e);
    }
  };

  const renderComponent = () => {
    const { component, readOnly, forceComponent } = cell;
    if ((editing && !readOnly) || forceComponent) {
      return component;
    }
    return null;
  };

  const renderEditor = () => {
    if (editing) {
      const Editor = cell.dataEditor || dataEditor || DataEditor;
      return (
        <Editor
          cell={cell}
          row={row}
          col={col}
          value={value}
          onChange={handleChange}
          onCommit={handleCommit}
          onRevert={handleRevert}
          onKeyDown={handleKey}
        />
      );
    }
    return null;
  };

  const renderViewer = () => {
    const Viewer = cell.valueViewer || valueViewer || ValueViewer;
    const viewValue = renderValue(cell, row, col, valueRenderer);
    return <Viewer cell={cell} row={row} col={col} value={viewValue} />;
  };

  const content = renderComponent() || renderEditor() || renderViewer();

  const className = [
    cell.className,
    'cell',
    cell.overflow,
    selected && 'selected',
    editing && 'editing',
    cell.readOnly && 'read-only',
    updated && 'updated',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CellRenderer
      row={row}
      col={col}
      cell={cell}
      selected={selected}
      editing={editing}
      updated={updated}
      attributesRenderer={attributesRenderer}
      className={className}
      style={widthStyle(cell)}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onKeyUp={onKeyUp}
    >
      {content}
    </CellRenderer>
  );
});

DataCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  forceEdit: PropTypes.bool,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  clearing: PropTypes.bool,
  cellRenderer: PropTypes.func,
  valueRenderer: PropTypes.func.isRequired,
  dataRenderer: PropTypes.func,
  valueViewer: PropTypes.func,
  dataEditor: PropTypes.func,
  attributesRenderer: PropTypes.func,
  onNavigate: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
};

DataCell.defaultProps = {
  forceEdit: false,
  selected: false,
  editing: false,
  clearing: false,
  cellRenderer: Cell,
};

DataCell.displayName = 'DataCell';

export default DataCell;

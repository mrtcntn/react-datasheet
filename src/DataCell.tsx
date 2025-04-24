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
import { CellShape } from './CellShape';
import DataEditor from './DataEditor';
import ValueViewer from './ValueViewer';
import { renderData, renderValue } from './renderHelpers';

type InitialDataProps = {
  cell: CellShape;
  row: number;
  col: number;
  valueRenderer: DataCellProps['valueRenderer'];
  dataRenderer?: DataCellProps['dataRenderer'];
};

type InitialValueProps = {
  cell: CellShape;
  row: number;
  col: number;
  valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode;
};

function initialData({
  cell,
  row,
  col,
  valueRenderer,
  dataRenderer,
}: InitialDataProps): any {
  return renderData(cell, row, col, valueRenderer, dataRenderer);
}

function initialValue({
  cell,
  row,
  col,
  valueRenderer,
}: InitialValueProps): React.ReactNode {
  return renderValue(cell, row, col, valueRenderer);
}

function widthStyle(cell: CellShape): React.CSSProperties | undefined {
  const width = typeof cell.width === 'number' ? `${cell.width}px` : cell.width;
  return width ? { width } : undefined;
}

interface DataCellProps {
  row: number;
  col: number;
  cell: CellShape;
  forceEdit?: boolean;
  selected?: boolean;
  editing?: boolean;
  clearing?: boolean;
  cellRenderer?: React.ComponentType<any>;
  valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode;
  dataRenderer?: (
    cell: CellShape,
    row: number,
    col: number,
  ) => string | number | boolean | null | undefined;
  valueViewer?: React.ComponentType<{
    value: React.ReactNode;
    row: number;
    col: number;
    cell: CellShape;
  }>;
  dataEditor?: React.ComponentType<any>;
  attributesRenderer?: (
    cell: CellShape,
    row: number,
    col: number,
  ) => React.HTMLAttributes<HTMLTableCellElement>;
  onNavigate: (e: React.KeyboardEvent, commit: boolean) => void;
  onMouseDown: (
    row: number,
    col: number,
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => void;
  onMouseOver: (
    row: number,
    col: number,
    e?: React.MouseEvent<HTMLTableCellElement>,
  ) => void;
  onDoubleClick: (
    row: number,
    col: number,
    e?: React.MouseEvent<HTMLTableCellElement>,
  ) => void;
  onContextMenu: (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number,
  ) => void;
  onChange: (row: number, col: number, value: any) => void;
  onRevert: () => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
}

const DataCell: React.FC<DataCellProps> = memo(props => {
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

  const [value, setValue] = useState<any>('');
  const [updated, setUpdated] = useState<boolean>(false);
  const [reverting, setReverting] = useState<boolean>(false);
  const [committing, setCommitting] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (editing) {
      const initialEditValue = clearing
        ? ''
        : initialData(props as InitialDataProps);
      setValue(initialEditValue);
      setReverting(false);
      setCommitting(false);
    }
  }, [editing, clearing, props]);

  useEffect(() => {
    if (
      !editing &&
      !reverting &&
      !committing &&
      value !== initialData(props as InitialDataProps)
    ) {
      onChange(row, col, value);
    }
  }, [editing, reverting, committing, value, onChange, row, col, props]);

  useEffect(() => {
    // This is a placeholder for the original logic that was removed
  }, [props]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (newValue: any) => {
    setValue(newValue);
    setCommitting(false);
  };

  const handleCommit = (commitValue: any, e?: React.KeyboardEvent) => {
    if (commitValue !== initialData(props as InitialDataProps)) {
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

  const handleKey = (e: React.KeyboardEvent) => {
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

  const renderComponent = (): React.ReactNode => {
    const Comp = cell.component;
    const { readOnly, forceComponent } = cell;
    if ((editing && !readOnly) || forceComponent) {
      if (React.isValidElement(Comp)) {
        return Comp;
      }
      if (typeof Comp === 'function') {
        return (
          <Comp
            cell={cell}
            row={row}
            col={col}
            value={value}
            onChange={handleChange}
          />
        );
      }
    }
    return null;
  };

  const renderEditor = (): React.ReactNode => {
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

  const renderViewer = (): React.ReactNode => {
    const Viewer = cell.valueViewer || valueViewer || ValueViewer;
    const viewValue = renderValue(cell, row, col, valueRenderer);
    return <Viewer value={viewValue} row={row} col={col} cell={cell} />;
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
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onKeyUp={onKeyUp}
    >
      {content}
    </CellRenderer>
  );
});

DataCell.displayName = 'DataCell';

export default DataCell;

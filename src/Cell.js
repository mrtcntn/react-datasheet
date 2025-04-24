import PropTypes from 'prop-types';
import React, { memo } from 'react';
import CellShape from './CellShape';

const Cell = memo(props => {
  const {
    cell,
    row,
    col,
    attributesRenderer = () => {},
    className,
    style,
    selected,
    editing,
    updated,
    onMouseDown,
    onMouseOver,
    onDoubleClick,
    onContextMenu,
    children,
  } = props;

  const { colSpan, rowSpan } = cell;
  const attributes = attributesRenderer(cell, row, col) || {};

  return (
    <td
      className={className}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onTouchEnd={onDoubleClick}
      onContextMenu={onContextMenu}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={style}
      {...attributes}
    >
      {children}
    </td>
  );
});

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

Cell.defaultProps = {
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: () => {},
};

Cell.displayName = 'Cell';

export default Cell;

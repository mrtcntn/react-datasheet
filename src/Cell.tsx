import React, { memo } from 'react';
import { CellShape } from './CellShape';

// Define Prop Types using TypeScript interface
interface CellProps {
  row: number;
  col: number;
  cell: CellShape; // Use the interface
  selected?: boolean;
  editing?: boolean;
  updated?: boolean;
  attributesRenderer?: (
    cell: CellShape,
    row: number,
    col: number,
  ) => React.HTMLAttributes<HTMLTableCellElement>; // More specific type
  className?: string;
  style?: React.CSSProperties; // Use React's CSSProperties type
  onMouseDown: (
    row: number,
    col: number,
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => void; // Add event type
  onMouseOver: (
    row: number,
    col: number,
    e?: React.MouseEvent<HTMLTableCellElement>,
  ) => void; // Add event type, make optional if needed
  onDoubleClick: (
    row: number,
    col: number,
    e?: React.MouseEvent<HTMLTableCellElement>,
  ) => void; // Add event type, make optional if needed
  onContextMenu: (
    e: React.MouseEvent<HTMLTableCellElement>,
    row: number,
    col: number,
  ) => void; // Adjust signature based on usage
  children?: React.ReactNode; // Use React.ReactNode for children
  onKeyUp?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void; // Add onKeyUp prop type
}

// Apply the interface to the component props
const Cell: React.FC<CellProps> = memo(props => {
  const {
    cell,
    row,
    col,
    attributesRenderer = () => ({}),
    className,
    style,
    selected = false,
    editing = false,
    updated = false,
    onMouseDown,
    onMouseOver,
    onDoubleClick,
    onContextMenu,
    children,
    onKeyUp,
  } = props;

  const { colSpan, rowSpan } = cell;
  const attributes = attributesRenderer(cell, row, col) || {};

  // Define event handlers with explicit types
  const handleMouseDown = (e: React.MouseEvent<HTMLTableCellElement>) => {
    onMouseDown(row, col, e);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLTableCellElement>) => {
    onMouseOver(row, col, e);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    onDoubleClick(row, col, e);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLTableCellElement>) => {
    // Assuming touch end should trigger double click logic
    // Note: React.TouchEvent doesn't directly map to MouseEvent props.
    // If specific touch handling is needed beyond mimicking dblclick, adjust logic.
    onDoubleClick(row, col);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault(); // Prevent default context menu
    onContextMenu(e, row, col);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  return (
    <td
      className={className}
      onMouseDown={handleMouseDown} // Use wrapped handler
      onMouseOver={handleMouseOver} // Use wrapped handler
      onDoubleClick={handleDoubleClick} // Use wrapped handler
      onTouchEnd={handleTouchEnd} // Use wrapped handler
      onContextMenu={handleContextMenu} // Use wrapped handler
      onKeyUp={handleKeyUp} // Pass keyup handler
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={style}
      {...attributes}
    >
      {children}
    </td>
  );
});

// Remove PropTypes, as types are handled by TypeScript
// Cell.propTypes = { ... };

Cell.displayName = 'Cell';

export default Cell;

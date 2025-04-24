import React from 'react';
import { CellShape } from './CellShape'; // Assuming CellShape is the type for cell

export function renderValue(
  cell: CellShape,
  row: number,
  col: number,
  valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode
): React.ReactNode {
  const value = valueRenderer(cell, row, col);
  return value === null || typeof value === 'undefined' ? '' : value;
}

export function renderData(
  cell: CellShape,
  row: number,
  col: number,
  valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode,
  dataRenderer?: (cell: CellShape, row: number, col: number) => string | number | boolean | null | undefined // Specify possible return types
): React.ReactNode | string | number | boolean {
  const value = dataRenderer ? dataRenderer(cell, row, col) : null;
  // Ensure return type matches declared type
  const renderedValue = renderValue(cell, row, col, valueRenderer);
  const finalValue = value === null || typeof value === 'undefined' ? renderedValue : value;
  // The final value could be ReactNode or primitive, adjust return type if necessary or handle casting.
  // For now, assuming the combined type is acceptable.
  return finalValue;
}

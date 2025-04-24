import React from 'react';
import { CellShape } from './CellShape';
export declare function renderValue(cell: CellShape, row: number, col: number, valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode): React.ReactNode;
export declare function renderData(cell: CellShape, row: number, col: number, valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode, dataRenderer?: (cell: CellShape, row: number, col: number) => string | number | boolean | null | undefined): React.ReactNode | string | number | boolean;

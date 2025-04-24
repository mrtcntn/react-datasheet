import React from 'react';
import { CellShape } from './CellShape';
interface CellProps {
    row: number;
    col: number;
    cell: CellShape;
    selected?: boolean;
    editing?: boolean;
    updated?: boolean;
    attributesRenderer?: (cell: CellShape, row: number, col: number) => React.HTMLAttributes<HTMLTableCellElement>;
    className?: string;
    style?: React.CSSProperties;
    onMouseDown: (row: number, col: number, e: React.MouseEvent<HTMLTableCellElement>) => void;
    onMouseOver: (row: number, col: number, e?: React.MouseEvent<HTMLTableCellElement>) => void;
    onDoubleClick: (row: number, col: number, e?: React.MouseEvent<HTMLTableCellElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLTableCellElement>, row: number, col: number) => void;
    children?: React.ReactNode;
    onKeyUp?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
}
declare const Cell: React.FC<CellProps>;
export default Cell;

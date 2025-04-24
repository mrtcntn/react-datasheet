import React from 'react';
import { CellShape } from './CellShape';
export interface DataCellProps {
    row: number;
    col: number;
    cell: CellShape;
    forceEdit?: boolean;
    selected?: boolean;
    editing?: boolean;
    clearing?: boolean;
    cellRenderer?: React.ComponentType<any>;
    valueRenderer: (cell: CellShape, row: number, col: number) => React.ReactNode;
    dataRenderer?: (cell: CellShape, row: number, col: number) => string | number | boolean | null | undefined;
    valueViewer?: React.ComponentType<{
        value: React.ReactNode;
        row: number;
        col: number;
        cell: CellShape;
    }>;
    dataEditor?: React.ComponentType<any>;
    attributesRenderer?: (cell: CellShape, row: number, col: number) => React.HTMLAttributes<HTMLTableCellElement>;
    onNavigate: (e: React.KeyboardEvent, commit: boolean) => void;
    onMouseDown: (row: number, col: number, e: React.MouseEvent<HTMLTableCellElement>) => void;
    onMouseOver: (row: number, col: number, e?: React.MouseEvent<HTMLTableCellElement>) => void;
    onDoubleClick: (row: number, col: number, e?: React.MouseEvent<HTMLTableCellElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLTableCellElement>, row: number, col: number) => void;
    onChange: (row: number, col: number, value: any) => void;
    onRevert: () => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
}
declare const DataCell: React.FC<DataCellProps>;
export default DataCell;

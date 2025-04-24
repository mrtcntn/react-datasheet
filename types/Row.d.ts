import React from 'react';
import { CellShape } from './CellShape';
interface RowProps {
    row: number;
    cells: CellShape[];
    selected?: boolean;
    children?: React.ReactNode;
}
declare const Row: React.FC<RowProps>;
export default Row;

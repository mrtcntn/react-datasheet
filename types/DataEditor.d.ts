import React from 'react';
import { CellShape } from './CellShape';
interface DataEditorProps {
    value: React.ReactNode;
    row: number;
    col: number;
    cell?: CellShape;
    onChange: (value: string) => void;
    onCommit: (value: string, e?: React.KeyboardEvent<HTMLInputElement>) => void;
    onRevert: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
declare const DataEditor: React.FC<DataEditorProps>;
export default DataEditor;

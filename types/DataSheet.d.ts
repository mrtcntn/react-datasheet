import React from 'react';
type CellLocation = {
    i: number;
    j: number;
};
type Selection = {
    start: CellLocation;
    end: CellLocation;
};
declare const range: (start: number, end: number) => number[];
export interface DataSheetProps<T = any> {
    data: T[][];
    className?: string;
    overflow?: 'wrap' | 'nowrap' | 'clip';
    valueRenderer: (cell: T, row: number, col: number) => React.ReactNode;
    dataRenderer?: (cell: T, row: number, col: number) => string | number | boolean | null | undefined;
    sheetRenderer?: React.ComponentType<any>;
    rowRenderer?: React.ComponentType<any>;
    cellRenderer?: React.ComponentType<any>;
    valueViewer?: React.ComponentType<any>;
    dataEditor?: React.ComponentType<any>;
    parsePaste?: (str: string) => string[][];
    handleCopy?: (args: {
        event: ClipboardEvent | React.ClipboardEvent;
        dataRenderer?: DataSheetProps<T>['dataRenderer'];
        valueRenderer: DataSheetProps<T>['valueRenderer'];
        data: T[][];
        start: CellLocation;
        end: CellLocation;
        range: typeof range;
    }) => void;
    onPaste?: (changes: {
        cell: T | undefined;
        data: string;
    }[][]) => void;
    attributesRenderer?: (cell: T, row: number, col: number) => React.HTMLAttributes<HTMLTableCellElement>;
    keyFn?: (row: number) => string | number;
    onCellsChanged?: (changes: {
        cell: T;
        row: number;
        col: number;
        value: any;
    }[], additions?: {
        row: number;
        col: number;
        value: any;
    }[]) => void;
    onChange?: (cell: T, row: number, col: number, value: any) => void;
    onContextMenu?: (e: React.MouseEvent<HTMLTableCellElement>, cell: T, row: number, col: number) => void;
    selected?: Selection;
    onSelect?: (selection: Selection) => void;
    isCellNavigable?: (cell: T, row: number, col: number) => boolean;
    disablePageClick?: boolean;
    editModeChanged?: (isEditing: boolean) => void;
}
declare const DataSheet: React.FC<DataSheetProps>;
export default DataSheet;

declare class DataSheet extends React.PureComponent<any, any, any> {
    constructor(props: any);
    onMouseDown(i: any, j: any, e: any): void;
    onMouseUp(): void;
    onMouseOver(i: any, j: any): void;
    onDoubleClick(i: any, j: any): void;
    onContextMenu(evt: any, i: any, j: any): void;
    handleNavigate(e: any, offsets: any, jumpRow: any): void;
    handleKey(e: any): true | undefined;
    handleCut(e: any): void;
    handleCopy(e: any): void;
    handlePaste(e: any): void;
    pageClick(e: any): void;
    onChange(row: any, col: any, value: any): void;
    onRevert(): void;
    isSelected(i: any, j: any): boolean;
    isEditing(i: any, j: any): boolean;
    isClearing(i: any, j: any): boolean;
    handleComponentKey(e: any): void;
    handleKeyboardCellMovement(e: any, commit?: boolean): false | undefined;
    defaultState: {
        start: {};
        end: {};
        selecting: boolean;
        forceEdit: boolean;
        editing: {};
        clear: {};
    };
    state: {
        start: {};
        end: {};
        selecting: boolean;
        forceEdit: boolean;
        editing: {};
        clear: {};
    };
    removeAllListeners(): void;
    handleIEClipboardEvents(e: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    isSelectionControlled(): boolean;
    getState(): {
        start: {};
        end: {};
        selecting: boolean;
        forceEdit: boolean;
        editing: {};
        clear: {};
    };
    _setState(state: any): void;
    getSelectedCells(data: any, start: any, end: any): any[];
    clearSelectedCells(start: any, end: any): void;
    updateLocationSingleCell(location: any): void;
    updateLocationMultipleCells(offsets: any): void;
    searchForNextSelectablePos(isCellNavigable: any, data: any, start: any, offsets: any, jumpRow: any): any;
    componentDidUpdate(prevProps: any, prevState: any): void;
    isSelectedRow(rowIndex: any): boolean;
    render(): React.JSX.Element;
    dgDom: HTMLSpanElement | null | undefined;
}
declare namespace DataSheet {
    namespace propTypes {
        let data: PropTypes.Validator<any[]>;
        let className: PropTypes.Requireable<string>;
        let disablePageClick: PropTypes.Requireable<boolean>;
        let overflow: PropTypes.Requireable<string>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let onCellsChanged: PropTypes.Requireable<(...args: any[]) => any>;
        let onContextMenu: PropTypes.Requireable<(...args: any[]) => any>;
        let onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        let isCellNavigable: PropTypes.Requireable<(...args: any[]) => any>;
        let selected: PropTypes.Requireable<PropTypes.InferProps<{
            start: PropTypes.Requireable<PropTypes.InferProps<{
                i: PropTypes.Requireable<number>;
                j: PropTypes.Requireable<number>;
            }>>;
            end: PropTypes.Requireable<PropTypes.InferProps<{
                i: PropTypes.Requireable<number>;
                j: PropTypes.Requireable<number>;
            }>>;
        }>>;
        let valueRenderer: PropTypes.Validator<(...args: any[]) => any>;
        let dataRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let sheetRenderer: PropTypes.Validator<(...args: any[]) => any>;
        let rowRenderer: PropTypes.Validator<(...args: any[]) => any>;
        let cellRenderer: PropTypes.Validator<(...args: any[]) => any>;
        let valueViewer: PropTypes.Requireable<(...args: any[]) => any>;
        let dataEditor: PropTypes.Requireable<(...args: any[]) => any>;
        let parsePaste: PropTypes.Requireable<(...args: any[]) => any>;
        let attributesRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let keyFn: PropTypes.Requireable<(...args: any[]) => any>;
        let handleCopy: PropTypes.Requireable<(...args: any[]) => any>;
        let editModeChanged: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export { Sheet as sheetRenderer };
        export { Row as rowRenderer };
        export { Cell as cellRenderer };
        export { ValueViewer as valueViewer };
        export { DataEditor as dataEditor };
    }
}
export default DataSheet;
import React from 'react';
import PropTypes from 'prop-types';
import Sheet from './Sheet';
import Row from './Row';
import Cell from './Cell';
import ValueViewer from './ValueViewer';
import DataEditor from './DataEditor';

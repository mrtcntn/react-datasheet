declare class DataCell extends React.PureComponent<any, any, any> {
    constructor(props: any);
    handleChange(value: any): void;
    handleCommit(value: any, e: any): void;
    handleRevert(): void;
    handleKey(e: any): void;
    handleMouseDown(e: any): void;
    handleMouseOver(e: any): void;
    handleContextMenu(e: any): void;
    handleDoubleClick(e: any): void;
    state: {
        updated: boolean;
        reverting: boolean;
        committing: boolean;
        value: string;
    };
    componentDidUpdate(prevProps: any): void;
    timeout: NodeJS.Timeout | undefined;
    componentWillUnmount(): void;
    renderComponent(editing: any, cell: any): any;
    renderEditor(editing: any, cell: any, row: any, col: any, dataEditor: any): React.JSX.Element | undefined;
    renderViewer(cell: any, row: any, col: any, valueRenderer: any, valueViewer: any): React.JSX.Element;
    render(): React.JSX.Element;
}
declare namespace DataCell {
    namespace propTypes {
        let row: PropTypes.Validator<number>;
        let col: PropTypes.Validator<number>;
        let cell: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            readOnly: PropTypes.Requireable<boolean>;
            key: PropTypes.Requireable<string>;
            className: PropTypes.Requireable<string>;
            component: PropTypes.Requireable<NonNullable<PropTypes.ReactElementLike | ((...args: any[]) => any) | null | undefined>>;
            forceComponent: PropTypes.Requireable<boolean>;
            disableEvents: PropTypes.Requireable<boolean>;
            disableUpdatedFlag: PropTypes.Requireable<boolean>;
            colSpan: PropTypes.Requireable<number>;
            rowSpan: PropTypes.Requireable<number>;
            width: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
            overflow: PropTypes.Requireable<string>;
            dataEditor: PropTypes.Requireable<(...args: any[]) => any>;
            valueViewer: PropTypes.Requireable<(...args: any[]) => any>;
        }>>>;
        let forceEdit: PropTypes.Requireable<boolean>;
        let selected: PropTypes.Requireable<boolean>;
        let editing: PropTypes.Requireable<boolean>;
        let editValue: PropTypes.Requireable<any>;
        let clearing: PropTypes.Requireable<boolean>;
        let cellRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let valueRenderer: PropTypes.Validator<(...args: any[]) => any>;
        let dataRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let valueViewer: PropTypes.Requireable<(...args: any[]) => any>;
        let dataEditor: PropTypes.Requireable<(...args: any[]) => any>;
        let attributesRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let onNavigate: PropTypes.Validator<(...args: any[]) => any>;
        let onMouseDown: PropTypes.Validator<(...args: any[]) => any>;
        let onMouseOver: PropTypes.Validator<(...args: any[]) => any>;
        let onDoubleClick: PropTypes.Validator<(...args: any[]) => any>;
        let onContextMenu: PropTypes.Validator<(...args: any[]) => any>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let onRevert: PropTypes.Validator<(...args: any[]) => any>;
        let onEdit: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        let forceEdit_1: boolean;
        export { forceEdit_1 as forceEdit };
        let selected_1: boolean;
        export { selected_1 as selected };
        let editing_1: boolean;
        export { editing_1 as editing };
        let clearing_1: boolean;
        export { clearing_1 as clearing };
        export { Cell as cellRenderer };
    }
}
export default DataCell;
import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

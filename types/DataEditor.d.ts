declare class DataEditor extends React.PureComponent<any, any, any> {
    constructor(props: any);
    handleChange(e: any): void;
    componentDidMount(): void;
    render(): React.JSX.Element;
    _input: HTMLInputElement | null | undefined;
}
declare namespace DataEditor {
    namespace propTypes {
        let value: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let row: PropTypes.Validator<number>;
        let col: PropTypes.Validator<number>;
        let cell: PropTypes.Requireable<PropTypes.InferProps<{
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
        }>>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let onCommit: PropTypes.Validator<(...args: any[]) => any>;
        let onRevert: PropTypes.Validator<(...args: any[]) => any>;
        let onKeyDown: PropTypes.Validator<(...args: any[]) => any>;
    }
}
export default DataEditor;
import React from 'react';
import PropTypes from 'prop-types';

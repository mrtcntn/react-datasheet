declare class Cell extends React.PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
}
declare namespace Cell {
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
        let selected: PropTypes.Requireable<boolean>;
        let editing: PropTypes.Requireable<boolean>;
        let updated: PropTypes.Requireable<boolean>;
        let attributesRenderer: PropTypes.Requireable<(...args: any[]) => any>;
        let onMouseDown: PropTypes.Validator<(...args: any[]) => any>;
        let onMouseOver: PropTypes.Validator<(...args: any[]) => any>;
        let onDoubleClick: PropTypes.Validator<(...args: any[]) => any>;
        let onContextMenu: PropTypes.Validator<(...args: any[]) => any>;
        let className: PropTypes.Requireable<string>;
        let style: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        let selected_1: boolean;
        export { selected_1 as selected };
        let editing_1: boolean;
        export { editing_1 as editing };
        let updated_1: boolean;
        export { updated_1 as updated };
        export function attributesRenderer_1(): void;
        export { attributesRenderer_1 as attributesRenderer };
    }
}
export default Cell;
import React from 'react';
import PropTypes from 'prop-types';

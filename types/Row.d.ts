export default Row;
declare class Row extends React.PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
}
declare namespace Row {
    namespace propTypes {
        let row: PropTypes.Validator<number>;
        let cells: PropTypes.Validator<(PropTypes.InferProps<{
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
        }> | null | undefined)[]>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';

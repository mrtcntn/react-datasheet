export default CellShape;
declare namespace CellShape {
    let readOnly: PropTypes.Requireable<boolean>;
    let key: PropTypes.Requireable<string>;
    let className: PropTypes.Requireable<string>;
    let component: PropTypes.Requireable<NonNullable<PropTypes.ReactElementLike | ((...args: any[]) => any) | null | undefined>>;
    let forceComponent: PropTypes.Requireable<boolean>;
    let disableEvents: PropTypes.Requireable<boolean>;
    let disableUpdatedFlag: PropTypes.Requireable<boolean>;
    let colSpan: PropTypes.Requireable<number>;
    let rowSpan: PropTypes.Requireable<number>;
    let width: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
    let overflow: PropTypes.Requireable<string>;
    let dataEditor: PropTypes.Requireable<(...args: any[]) => any>;
    let valueViewer: PropTypes.Requireable<(...args: any[]) => any>;
}
import PropTypes from 'prop-types';

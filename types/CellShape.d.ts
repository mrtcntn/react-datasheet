import React from 'react';
export interface CellShape {
    readOnly?: boolean;
    key?: string;
    className?: string;
    component?: React.ReactElement | React.ComponentType<any>;
    forceComponent?: boolean;
    disableEvents?: boolean;
    disableUpdatedFlag?: boolean;
    colSpan?: number;
    rowSpan?: number;
    width?: number | string;
    overflow?: 'wrap' | 'nowrap' | 'clip';
    dataEditor?: React.ComponentType<any>;
    valueViewer?: React.ComponentType<any>;
    value?: any;
    data?: any;
}
declare const CellShapeType: {};
export default CellShapeType;

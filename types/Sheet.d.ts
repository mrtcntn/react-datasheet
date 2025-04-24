export default Sheet;
declare class Sheet extends React.PureComponent<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    render(): React.JSX.Element;
}
declare namespace Sheet {
    namespace propTypes {
        let className: PropTypes.Requireable<string>;
        let data: PropTypes.Validator<any[]>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';

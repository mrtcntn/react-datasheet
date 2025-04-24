import PropTypes from 'prop-types';
import React, { memo } from 'react';

import CellShape from './CellShape';

// Convert to simple functional component, use memo
const Row = memo(({ children }) => {
  return <tr>{children}</tr>;
});

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.shape(CellShape)).isRequired,
  children: PropTypes.node, // Add prop type for children
};

Row.displayName = 'Row'; // Add display name

export default Row;

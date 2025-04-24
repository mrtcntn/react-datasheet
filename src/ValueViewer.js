import PropTypes from 'prop-types';
import React, { memo } from 'react';

import CellShape from './CellShape';

// Convert to simple functional component, use memo
const ValueViewer = memo(({ value }) => {
  return <span className="value-viewer">{value}</span>;
});

ValueViewer.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape),
  value: PropTypes.node.isRequired,
};

ValueViewer.displayName = 'ValueViewer'; // Add display name

export default ValueViewer;

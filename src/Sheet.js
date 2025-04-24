import PropTypes from 'prop-types';
import React, { memo } from 'react';

// Convert to simple functional component, use memo
const Sheet = memo(({ className, children }) => {
  return (
    <table className={className}>
      <tbody>{children}</tbody>
    </table>
  );
});

Sheet.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  children: PropTypes.node, // Add prop type for children
};

Sheet.displayName = 'Sheet'; // Add display name

export default Sheet;

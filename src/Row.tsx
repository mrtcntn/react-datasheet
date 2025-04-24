import React, { memo } from 'react';

import { CellShape } from './CellShape'; // Import the interface

// Define Prop Types using TypeScript interface
interface RowProps {
  row: number;
  cells: CellShape[]; // Use the CellShape interface
  selected?: boolean; // Add selected prop as it's passed by DataSheet
  children?: React.ReactNode;
}

// Apply the interface to the component props
const Row: React.FC<RowProps> = memo(({ children }) => {
  // Destructure row and cells if needed, otherwise props are just passed down via children
  return <tr>{children}</tr>;
});

// Remove PropTypes
// Row.propTypes = {
//   row: PropTypes.number.isRequired,
//   cells: PropTypes.arrayOf(PropTypes.shape(CellShape)).isRequired,
//   children: PropTypes.node,
// };

Row.displayName = 'Row';

export default Row;

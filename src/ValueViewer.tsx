import React, { memo } from 'react';

// Assuming CellShape might be relevant for context, though not directly used for props
// import { CellShape } from './CellShape';

// Define Prop Types using TypeScript interface
interface ValueViewerProps {
  // row: number; // Prop exists but is unused in component
  // col: number; // Prop exists but is unused in component
  // cell?: CellShape; // Prop exists but is unused in component
  value: React.ReactNode; // Use React.ReactNode
}

// Apply the interface to the component props
const ValueViewer: React.FC<ValueViewerProps> = memo(({ value }) => {
  return <span className="value-viewer">{value}</span>;
});

// Remove PropTypes
// ValueViewer.propTypes = {
//   row: PropTypes.number.isRequired,
//   col: PropTypes.number.isRequired,
//   cell: PropTypes.shape(CellShape),
//   value: PropTypes.node.isRequired,
// };

ValueViewer.displayName = 'ValueViewer';

export default ValueViewer;

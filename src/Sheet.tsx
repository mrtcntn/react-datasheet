import React, { memo } from 'react';

// Define Prop Types using TypeScript interface
interface SheetProps {
  className?: string;
  data: any[][]; // Add data prop as it's passed by DataSheet
  children?: React.ReactNode;
}

// Apply the interface to the component props
const Sheet: React.FC<SheetProps> = memo(({ className, children }) => {
  return (
    <table className={className}>
      <tbody>{children}</tbody>
    </table>
  );
});

// Remove PropTypes
// Sheet.propTypes = {
//   className: PropTypes.string,
//   data: PropTypes.array.isRequired, // Keep for documentation if needed, but TS handles types
//   children: PropTypes.node,
// };

Sheet.displayName = 'Sheet';

export default Sheet;

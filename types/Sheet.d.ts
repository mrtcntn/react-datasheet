import React from 'react';
interface SheetProps {
    className?: string;
    data: any[][];
    children?: React.ReactNode;
}
declare const Sheet: React.FC<SheetProps>;
export default Sheet;

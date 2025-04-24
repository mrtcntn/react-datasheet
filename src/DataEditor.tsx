import React, { memo, useEffect, useRef } from 'react';

import { CellShape } from './CellShape';

// Define Prop Types using TypeScript interface
interface DataEditorProps {
  value: React.ReactNode;
  row: number;
  col: number;
  cell?: CellShape;
  onChange: (value: string) => void;
  onCommit: (value: string, e?: React.KeyboardEvent<HTMLInputElement>) => void;
  onRevert: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Apply the interface to the component props
const DataEditor: React.FC<DataEditorProps> = memo(props => {
  const { value, onChange, onKeyDown } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="data-editor"
      type="text"
      value={value === null || value === undefined ? '' : String(value)}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
});

DataEditor.displayName = 'DataEditor';

export default DataEditor;

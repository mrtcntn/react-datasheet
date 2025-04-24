import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef } from 'react';

import CellShape from './CellShape';

const DataEditor = memo(props => {
  const { value, onChange, onKeyDown } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="data-editor"
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
});

DataEditor.propTypes = {
  value: PropTypes.node.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape),
  onChange: PropTypes.func.isRequired,
  onCommit: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

DataEditor.displayName = 'DataEditor';

export default DataEditor;

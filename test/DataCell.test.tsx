/// <reference types="@testing-library/jest-dom" />
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { CellShape } from '../src/CellShape'; // Assuming types are defined
import DataCell, { DataCellProps } from '../src/DataCell'; // Adjust import path based on your structure
import DataEditor from '../src/DataEditor'; // Assuming the DataEditor component exists

// Mock initial props for DataCell
const initialProps = {
  row: 2,
  col: 3,
  cell: {
    value: 5,
    data: 5, // Add data property if used by DataEditor
    rowSpan: 4,
    colSpan: 5,
    width: '200px',
    className: 'test-cell-class',
  } as CellShape,
  editing: false,
  selected: false,
  updated: false, // Add updated prop if needed
  onMouseDown: jest.fn(),
  onMouseOver: jest.fn(),
  onDoubleClick: jest.fn(),
  onContextMenu: jest.fn(),
  onChange: jest.fn(), // Add onChange prop
  onRevert: jest.fn(), // Add onRevert prop
  onNavigate: jest.fn(), // Add onNavigate prop
  valueRenderer: jest.fn(cell => cell.value), // Mock valueRenderer
  dataRenderer: jest.fn(cell => cell.data), // Mock dataRenderer if DataEditor uses it
};

describe('<DataCell /> with DataEditor', () => {
  describe('rendering', () => {
    it('should properly render in read mode', () => {
      render(
        <table>
          <tbody>
            <tr>
              <DataCell {...initialProps} />
            </tr>
          </tbody>
        </table>,
      );

      const cellElement = screen.getByRole('cell');
      expect(cellElement).toBeInTheDocument();
      expect(cellElement).toHaveClass('test-cell-class');
      expect(cellElement).toHaveAttribute('colSpan', '5');
      expect(cellElement).toHaveAttribute('rowSpan', '4');
      expect(cellElement).toHaveStyle('width: 200px');
      expect(screen.getByText('5')).toBeInTheDocument(); // Value rendered
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument(); // No input in read mode

      // Test event handlers
      fireEvent.mouseDown(cellElement);
      fireEvent.mouseOver(cellElement);
      fireEvent.doubleClick(cellElement);
      fireEvent.contextMenu(cellElement);

      expect(initialProps.onMouseDown).toHaveBeenCalledWith(
        initialProps.row,
        initialProps.col,
        expect.anything(),
      );
      expect(initialProps.onMouseOver).toHaveBeenCalledWith(
        initialProps.row,
        initialProps.col,
        expect.anything(),
      );
      expect(initialProps.onDoubleClick).toHaveBeenCalledWith(
        initialProps.row,
        initialProps.col,
        expect.anything(),
      );
      expect(initialProps.onContextMenu).toHaveBeenCalledWith(
        expect.anything(),
        initialProps.row,
        initialProps.col,
      );
      expect(initialProps.valueRenderer).toHaveBeenCalledWith(
        initialProps.cell,
        initialProps.row,
        initialProps.col,
      );
    });

    it('should transition from read mode to editing mode', () => {
      const { rerender } = render(
        <table>
          <tbody>
            <tr>
              <DataCell {...initialProps} editing={false} selected={false} />
            </tr>
          </tbody>
        </table>,
      );

      // Initial read mode check
      let cellElement = screen.getByRole('cell');
      expect(cellElement).not.toHaveClass('editing');
      expect(cellElement).not.toHaveClass('selected');
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

      // Rerender with editing and selected set to true
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...initialProps} editing={true} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      // Check editing mode
      cellElement = screen.getByRole('cell');
      expect(cellElement).toHaveClass('editing');
      expect(cellElement).toHaveClass('selected');
      expect(screen.queryByText('5')).not.toBeInTheDocument(); // Value viewer hidden
      const editorInput = screen.getByRole('textbox');
      expect(editorInput).toBeInTheDocument();
      // Check if dataRenderer was called and input has the rendered value
      expect(initialProps.dataRenderer).toHaveBeenCalledWith(
        initialProps.cell,
        initialProps.row,
        initialProps.col,
      );
      expect(editorInput).toHaveValue(String(initialProps.cell.data)); // Input has data value
    });

    it('should render a flash class when value changes', async () => {
      const initialCellValue = 5;
      const updatedCellValue = 6;
      const cellData = { ...initialProps.cell, value: initialCellValue };

      const { rerender } = render(
        <table>
          <tbody>
            <tr>
              <DataCell
                {...initialProps}
                cell={cellData}
                valueRenderer={cell => cell.value}
              />
            </tr>
          </tbody>
        </table>,
      );

      let cellElement = screen.getByRole('cell');
      expect(cellElement).not.toHaveClass('updated');
      expect(screen.getByText(String(initialCellValue))).toBeInTheDocument();

      // Rerender with updated value
      const updatedCellData = { ...cellData, value: updatedCellValue };
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell
                {...initialProps}
                cell={updatedCellData}
                valueRenderer={cell => cell.value}
              />
            </tr>
          </tbody>
        </table>,
      );

      cellElement = screen.getByRole('cell');
      // Check for the 'updated' class immediately after rerender
      expect(cellElement).toHaveClass('updated');
      expect(screen.getByText(String(updatedCellValue))).toBeInTheDocument();

      // Check that the 'updated' class is removed after the timeout (default 700ms)
      // Need to advance timers if using fake timers, or wait if using real timers
      await waitFor(
        () => {
          expect(cellElement).not.toHaveClass('updated');
        },
        { timeout: 800 }, // Wait slightly longer than the flash duration
      );
    });
  });

  describe('editing', () => {
    // Define common props for editing tests
    const editingProps = {
      ...initialProps,
      row: 1,
      col: 2,
      cell: {
        ...initialProps.cell,
        value: '2', // Initial display value
        data: '5', // Initial data/edit value
      },
      onChange: jest.fn(),
      onRevert: jest.fn(),
    };

    // Clear mocks before each test in this suite
    beforeEach(() => {
      editingProps.onChange.mockClear();
      editingProps.onRevert.mockClear();
      // Clear any other relevant mocks if needed
      initialProps.dataRenderer.mockClear(); // Might be relevant
      initialProps.valueRenderer.mockClear(); // Might be relevant
    });

    it('should not call onChange if value is the same', () => {
      const { rerender } = render(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={false} selected={false} />
            </tr>
          </tbody>
        </table>,
      );

      // Switch to editing mode
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={true} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      const editorInput = screen.getByRole('textbox');
      expect(editorInput).toHaveValue('5'); // Should use dataRenderer value

      // Simulate user typing the same value
      fireEvent.change(editorInput, { target: { value: '5' } });

      // Switch back to non-editing mode (simulates blur/enter)
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={false} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      expect(editingProps.onChange).not.toHaveBeenCalled();
    });

    it('should properly call onChange with the new value', () => {
      const { rerender } = render(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={false} selected={false} />
            </tr>
          </tbody>
        </table>,
      );

      // Switch to editing mode
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={true} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      const editorInput = screen.getByRole('textbox');
      expect(editorInput).toHaveValue('5');

      // Simulate user typing a new value
      fireEvent.change(editorInput, { target: { value: '6' } });
      expect(editorInput).toHaveValue('6'); // Input value changes immediately

      // Switch back to non-editing mode
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...editingProps} editing={false} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      // onChange should be called upon exiting edit mode
      expect(editingProps.onChange).toHaveBeenCalledTimes(1);
      expect(editingProps.onChange).toHaveBeenCalledWith(
        editingProps.row,
        editingProps.col,
        '6', // The new value entered by the user
      );
    });

    it('input value should be cleared if entering editing mode with clearing flag', () => {
      render(
        <table>
          <tbody>
            <tr>
              {/* Enter editing mode directly with clearing prop */}
              <DataCell
                {...editingProps}
                editing={true}
                selected={true}
                clearing={true}
              />
            </tr>
          </tbody>
        </table>,
      );

      const editorInput = screen.getByRole('textbox');
      expect(editorInput).toHaveValue(''); // Value should be cleared
    });

    it('input value should be set to cell.value if cell.data is null', () => {
      const cellWithNullData = {
        ...editingProps,
        cell: { ...editingProps.cell, data: null, value: '2' },
      };

      const { rerender } = render(
        <table>
          <tbody>
            <tr>
              <DataCell {...cellWithNullData} editing={false} />
            </tr>
          </tbody>
        </table>,
      );

      // Switch to editing mode
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...cellWithNullData} editing={true} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      const editorInput = screen.getByRole('textbox');
      // If data is null, editor should fall back to value
      expect(editorInput).toHaveValue('2');

      // Change value back to '2' (no actual change)
      fireEvent.change(editorInput, { target: { value: '2' } });

      // Exit editing mode
      rerender(
        <table>
          <tbody>
            <tr>
              <DataCell {...cellWithNullData} editing={false} selected={true} />
            </tr>
          </tbody>
        </table>,
      );

      expect(cellWithNullData.onChange).not.toHaveBeenCalled();
    });
  });
});

describe('DataCell with ValueViewer', () => {
  // Define common props for ValueViewer tests
  const viewerProps: DataCellProps = {
    // Update type annotation
    ...initialProps, // Reuse some initial props
    row: 2,
    col: 3,
    cell: {
      value: 'Display Value',
      // No component/editor/viewer explicitly defined, defaults should apply
    },
    valueViewer: props => <span>{props.value}</span>, // Mock ValueViewer component
    dataEditor: undefined, // Ensure default editor isn't used
    editing: false, // Viewer is only shown in read mode
    selected: false,
  };

  it('should render using valueViewer when not editing', () => {
    render(
      <table>
        <tbody>
          <tr>
            <DataCell {...viewerProps} />
          </tr>
        </tbody>
      </table>,
    );

    const cellElement = screen.getByRole('cell');
    expect(cellElement).toHaveClass('cell');
    expect(cellElement).not.toHaveClass('editing');
    expect(cellElement).not.toHaveClass('selected');

    // Check if the custom ValueViewer is rendered (matching the mock)
    expect(screen.getByText('Display Value')).toBeInTheDocument(); // CORRECTED: Removed 'Viewer: '
    // Ensure the default input/editor is not rendered
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('should render default value if valueViewer is not provided', () => {
    render(
      <table>
        <tbody>
          <tr>
            {/* CORRECTED: Removed the valueViewer prop override to test default */}
            <DataCell
              {...viewerProps}
              valueViewer={undefined} // Explicitly undefined or remove line
              cell={{ value: 'Raw Value' }}
            />
          </tr>
        </tbody>
      </table>,
    );
    // The default ValueViewer should render the raw value
    expect(screen.getByText('Raw Value')).toBeInTheDocument();
  });

  it('should still render DataEditor when editing, even if valueViewer is provided', () => {
    const { rerender } = render(
      <table>
        <tbody>
          <tr>
            <DataCell {...viewerProps} editing={false} />
          </tr>
        </tbody>
      </table>,
    );

    // Initial render check (matching the mock)
    expect(screen.getByText('Display Value')).toBeInTheDocument(); // CORRECTED: Removed 'Viewer: '

    // Switch to editing mode
    rerender(
      <table>
        <tbody>
          <tr>
            <DataCell
              {...viewerProps}
              dataEditor={DataEditor} // Explicitly add back default editor for this test
              editing={true}
              selected={true}
              cell={{ value: 'Display Value', data: 'Edit Data' }}
            />
          </tr>
        </tbody>
      </table>,
    );

    // ValueViewer should no longer be rendered
    expect(screen.queryByText('Display Value')).not.toBeInTheDocument(); // CORRECTED: Removed 'Viewer: '
    // Default DataEditor (input) should be rendered
    const editorInput = screen.getByRole('textbox');
    expect(editorInput).toBeInTheDocument();
    expect(editorInput).toHaveValue('Edit Data');
  });
});

describe('DataCell with component', () => {
  // Define common props for component tests
  const componentPropsBase: Omit<DataCellProps, 'cell'> = {
    row: 2,
    col: 3,
    editing: false,
    selected: false,
    onMouseDown: jest.fn(),
    onMouseOver: jest.fn(),
    onDoubleClick: jest.fn(),
    onContextMenu: jest.fn(),
    onChange: jest.fn(),
    onRevert: jest.fn(),
    onNavigate: jest.fn(),
    valueRenderer: jest.fn((cell: CellShape) => cell.value),
  };

  const TestComponent = () => <div data-testid="custom-component">HELLO</div>;

  it('should properly render component when forceComponent is true', () => {
    const cell: CellShape = {
      value: 5,
      forceComponent: true,
      rowSpan: 4,
      colSpan: 5,
      width: '200px',
      className: 'test-component-class',
      component: <TestComponent />,
    };

    render(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={cell} />
          </tr>
        </tbody>
      </table>,
    );

    const cellElement = screen.getByRole('cell');
    expect(cellElement).toHaveClass('test-component-class', 'cell');
    expect(cellElement).toHaveAttribute('colSpan', '5');
    expect(cellElement).toHaveAttribute('rowSpan', '4');
    expect(cellElement).toHaveStyle('width: 200px');
    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
    expect(screen.getByText('HELLO')).toBeInTheDocument();
    // ValueViewer should not be rendered when component is forced
    expect(componentPropsBase.valueRenderer).not.toHaveBeenCalled();
    expect(screen.queryByText('5')).not.toBeInTheDocument();

    // Test event handlers
    fireEvent.mouseDown(cellElement);
    fireEvent.mouseOver(cellElement);
    fireEvent.doubleClick(cellElement);
    fireEvent.contextMenu(cellElement);

    expect(componentPropsBase.onMouseDown).toHaveBeenCalledWith(
      2,
      3,
      expect.anything(),
    );
    expect(componentPropsBase.onMouseOver).toHaveBeenCalledWith(
      2,
      3,
      expect.anything(),
    );
    expect(componentPropsBase.onDoubleClick).toHaveBeenCalledWith(
      2,
      3,
      expect.anything(),
    );
    expect(componentPropsBase.onContextMenu).toHaveBeenCalledWith(
      expect.anything(),
      2,
      3,
    );
  });

  it('should render ValueViewer when forceComponent is false', () => {
    const cell: CellShape = {
      value: 5,
      forceComponent: false, // Key difference
      className: 'test-value-class',
      component: <TestComponent />,
    };

    render(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={cell} />
          </tr>
        </tbody>
      </table>,
    );

    const cellElement = screen.getByRole('cell');
    expect(cellElement).toHaveClass('test-value-class', 'cell');
    // Component should not be rendered
    expect(screen.queryByTestId('custom-component')).not.toBeInTheDocument();
    // ValueViewer should be rendered
    expect(componentPropsBase.valueRenderer).toHaveBeenCalledWith(cell, 2, 3);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render ValueViewer with updated value and flash class', async () => {
    const initialCell: CellShape = {
      value: 5,
      forceComponent: false,
      className: 'test-update-class',
      component: <TestComponent />,
    };

    const { rerender } = render(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={initialCell} />
          </tr>
        </tbody>
      </table>,
    );

    let cellElement = screen.getByRole('cell');
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(cellElement).not.toHaveClass('updated');

    // Rerender with updated value
    const updatedCell: CellShape = { ...initialCell, value: 7 };
    rerender(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={updatedCell} />
          </tr>
        </tbody>
      </table>,
    );

    cellElement = screen.getByRole('cell');
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(cellElement).toHaveClass('updated');

    // Wait for flash to disappear
    await waitFor(
      () => {
        expect(cellElement).not.toHaveClass('updated');
      },
      { timeout: 800 },
    );
  });

  it('should render component with flash class when value changes and forceComponent is true', async () => {
    const initialCell: CellShape = {
      value: 5,
      forceComponent: true,
      className: 'test-component-flash',
      component: <TestComponent />,
    };

    const { rerender } = render(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={initialCell} />
          </tr>
        </tbody>
      </table>,
    );

    let cellElement = screen.getByRole('cell');
    expect(screen.getByTestId('custom-component')).toBeInTheDocument();
    expect(cellElement).not.toHaveClass('updated');

    // Rerender with updated value (props change, component itself doesn't)
    const updatedCell: CellShape = { ...initialCell, value: 7 };
    rerender(
      <table>
        <tbody>
          <tr>
            <DataCell {...componentPropsBase} cell={updatedCell} />
          </tr>
        </tbody>
      </table>,
    );

    cellElement = screen.getByRole('cell');
    expect(screen.getByTestId('custom-component')).toBeInTheDocument(); // Still the component
    expect(cellElement).toHaveClass('updated');

    // Wait for flash to disappear
    await waitFor(
      () => {
        expect(cellElement).not.toHaveClass('updated');
      },
      { timeout: 800 },
    );
  });
});

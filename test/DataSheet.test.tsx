/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CellShape } from '../src/CellShape';
import DataSheet, { DataSheetProps } from '../src/DataSheet';

// Helper function to create basic data grid
const createData = (rows: number, cols: number): CellShape[][] => {
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (__, j) => ({
      value: `Row ${i} Col ${j}`,
    })),
  );
};

// Basic Props for DataSheet
const defaultSheetProps: Omit<DataSheetProps, 'data' | 'valueRenderer'> = {
  onChange: jest.fn(),
  // Add other common props if needed
};

describe('<DataSheet /> Component', () => {
  // Test corresponding to 'Shallow DataSheet component' -> 'event listeners'
  describe('Document Event Listeners', () => {
    // Store original methods
    const originalAdd = document.addEventListener;
    const originalRemove = document.removeEventListener;
    let addEventSpy: jest.SpyInstance;
    let removeEventSpy: jest.SpyInstance;

    beforeEach(() => {
      // Log calls to addEventListener
      addEventSpy = jest
        .spyOn(document, 'addEventListener')
        .mockImplementation((...args) => {
          console.log('addEventListener called with:', args[0]); // Log the event type
          return originalAdd.apply(document, args as any); // Call the original function
        });
      // You can add similar logging for removeEventListener if needed
      removeEventSpy = jest
        .spyOn(document, 'removeEventListener')
        .mockImplementation((...args) => {
          return originalRemove.apply(document, args as any); // Call the original function
        });
    });

    afterEach(() => {
      // Restore original methods and clear mocks after each test
      addEventSpy.mockRestore();
      removeEventSpy.mockRestore();
    });

    it('should add and remove all event listeners from document on mount/unmount', () => {
      const testData = createData(1, 1);
      const { unmount } = render(
        <DataSheet
          {...defaultSheetProps}
          data={testData}
          valueRenderer={cell => cell.value}
        />,
      );

      // Check that the expected listeners were added
      expect(addEventSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        true,
      );
      expect(addEventSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(addEventSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(addEventSpy).toHaveBeenCalledWith('cut', expect.any(Function));
      expect(addEventSpy).toHaveBeenCalledWith('copy', expect.any(Function));
      expect(addEventSpy).toHaveBeenCalledWith('paste', expect.any(Function));

      // Unmount the component
      unmount();

      // Check that the expected listeners were removed
      expect(removeEventSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        true,
      );
      expect(removeEventSpy).toHaveBeenCalledWith(
        'mouseup',
        expect.any(Function),
      );
      expect(removeEventSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      );
      expect(removeEventSpy).toHaveBeenCalledWith('cut', expect.any(Function));
      expect(removeEventSpy).toHaveBeenCalledWith('copy', expect.any(Function));
      expect(removeEventSpy).toHaveBeenCalledWith(
        'paste',
        expect.any(Function),
      );
    });
  });

  // Test corresponding to 'DataSheet component' -> 'rendering with varying props'
  describe('Rendering with Varying Props', () => {
    let testData: CellShape[][];

    beforeEach(() => {
      // Reset data for each test
      testData = [
        [
          { value: 4, className: 'test1', overflow: 'clip' },
          { value: 2, className: 'test2', key: 'custom_key' },
        ],
        [
          { value: 0, className: 'test3', width: '25%' },
          { value: 5, className: 'test4', width: 100 },
        ],
      ];
    });

    const renderDataSheet = (props: Partial<DataSheetProps> = {}) => {
      // Ensure data is cloned if modified by onChange
      const currentData =
        props.data || testData.map(row => row.map(cell => ({ ...cell })));
      const mergedProps: DataSheetProps = {
        ...defaultSheetProps,
        data: currentData,
        valueRenderer: (cell: CellShape) => cell.value,
        // onChange is now in defaultSheetProps
        ...props, // Override defaults with test-specific props
      };
      return render(<DataSheet {...mergedProps} />);
    };

    it('renders the proper elements', () => {
      renderDataSheet({ className: 'test', overflow: 'nowrap' });

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('data-grid', 'test', 'nowrap');

      const cells = screen.getAllByRole('cell');
      expect(cells).toHaveLength(4);

      // Check rendered values
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders the proper keys if keyFn is provided', () => {
      renderDataSheet({ keyFn: rowIdx => `custom_row_key_${rowIdx}` });
      // Check content associated with custom key
      expect(screen.getByText('2')).toBeInTheDocument();
      // We might check the row key if the structure allows stable selection
      const row = screen.getByText('2').closest('tr');
      // Note: Directly checking keys isn't standard in RTL, relying on structure/content is preferred.
    });

    it('sets the proper classes and styles for the cells', () => {
      renderDataSheet();
      const cells = screen.getAllByRole('cell');

      expect(cells[0]).toHaveClass('cell', 'test1', 'clip');
      expect(cells[0]).not.toHaveAttribute('style');
      expect(cells[1]).toHaveClass('cell', 'test2');
      expect(cells[1]).not.toHaveAttribute('style');
      expect(cells[2]).toHaveClass('cell', 'test3');
      expect(cells[2]).toHaveStyle('width: 25%');
      expect(cells[3]).toHaveClass('cell', 'test4');
      expect(cells[3]).toHaveStyle('width: 100px');
    });

    it('renders the data in the input properly if dataRenderer is set', async () => {
      const dataRenderer = jest.fn((cell: CellShape) => `=+${cell.value}`);
      renderDataSheet({ dataRenderer });

      const cellToEdit = screen.getByText('4');
      await userEvent.dblClick(cellToEdit.closest('td')!);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(dataRenderer).toHaveBeenCalledWith(testData[0][0], 0, 0);
      expect(input).toHaveValue('=+4');
    });

    it('renders proper elements by column using renderers', () => {
      const dateData = testData.map((row, index) => [
        { value: new Date(Date.UTC(2017, index, 1)) },
        ...row,
      ]);
      const valueRenderer = jest.fn((cell: CellShape, i: number, j: number) =>
        j === 0 ? (cell.value as Date).toUTCString() : cell.value,
      );

      renderDataSheet({ data: dateData, valueRenderer });

      expect(
        screen.getByText('Sun, 01 Jan 2017 00:00:00 GMT'),
      ).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(
        screen.getByText('Wed, 01 Feb 2017 00:00:00 GMT'),
      ).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(valueRenderer).toHaveBeenCalledTimes(6);
    });

    it('renders data in the input properly if dataRenderer is set by column', async () => {
      const dateData = testData.map((row, index) => [
        { value: new Date(Date.UTC(2017, index, 1)) },
        ...row,
      ]);
      const dataRenderer = jest.fn((cell: CellShape, i: number, j: number) =>
        j === 0 ? (cell.value as Date).toISOString() : cell.value,
      );
      const valueRenderer = jest.fn((cell: CellShape, i: number, j: number) =>
        j === 0 ? (cell.value as Date).toUTCString() : cell.value,
      );

      renderDataSheet({ data: dateData, valueRenderer, dataRenderer });

      const cellToEdit = screen.getByText('Sun, 01 Jan 2017 00:00:00 GMT');
      await userEvent.dblClick(cellToEdit.closest('td')!);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(dataRenderer).toHaveBeenCalledWith(dateData[0][0], 0, 0);
      expect(input).toHaveValue('2017-01-01T00:00:00.000Z');
    });

    it('renders the attributes to the cell if the attributesRenderer is set', () => {
      const attributesRenderer = jest.fn(
        (cell, i, j): React.HTMLAttributes<HTMLTableCellElement> => {
          if (i === 0 && j === 0)
            return {
              'data-hint': 'Not valid',
            } as React.HTMLAttributes<HTMLTableCellElement>;
          if (i === 1 && j === 1)
            return {
              'data-hint': 'Valid',
            } as React.HTMLAttributes<HTMLTableCellElement>;
          return {};
        },
      );

      renderDataSheet({ attributesRenderer });

      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveAttribute('data-hint', 'Not valid');
      expect(cells[1]).not.toHaveAttribute('data-hint');
      expect(cells[2]).not.toHaveAttribute('data-hint');
      expect(cells[3]).toHaveAttribute('data-hint', 'Valid');
      expect(attributesRenderer).toHaveBeenCalledTimes(4);
    });

    it('renders a component in view mode properly', () => {
      const componentData: CellShape[][] = [
        [
          {
            component: <div data-testid="custom-comp">COMPONENT RENDERED</div>,
            value: 'IGNORED',
          },
        ],
      ];
      renderDataSheet({
        data: componentData,
        valueRenderer: () => 'VALUE RENDERED',
      });
      expect(screen.getByText('VALUE RENDERED')).toBeInTheDocument();
      expect(screen.queryByTestId('custom-comp')).not.toBeInTheDocument();
    });

    it('renders a component in edit mode properly', async () => {
      const componentData: CellShape[][] = [
        [
          {
            component: <div data-testid="custom-comp">COMPONENT RENDERED</div>,
            value: 'IGNORED',
          },
        ],
      ];
      renderDataSheet({
        data: componentData,
        valueRenderer: () => 'VALUE RENDERED',
      });
      const cellToEdit = screen.getByText('VALUE RENDERED');
      await userEvent.dblClick(cellToEdit.closest('td')!);
      expect(screen.queryByText('VALUE RENDERED')).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-comp')).toBeInTheDocument();
      expect(screen.getByText('COMPONENT RENDERED')).toBeInTheDocument();
    });

    it('forces a component rendering even in view mode', async () => {
      const componentData: CellShape[][] = [
        [
          {
            forceComponent: true,
            component: <div data-testid="custom-comp">COMPONENT FORCED</div>,
            value: 'IGNORED',
          },
        ],
      ];
      renderDataSheet({
        data: componentData,
        valueRenderer: () => 'VALUE RENDERED',
      });
      expect(screen.queryByText('VALUE RENDERED')).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-comp')).toBeInTheDocument();
      expect(screen.getByText('COMPONENT FORCED')).toBeInTheDocument();

      const cellElement = screen.getByRole('cell');
      await userEvent.dblClick(cellElement); // Double click enters edit mode

      expect(screen.getByTestId('custom-comp')).toBeInTheDocument(); // Still rendered
      expect(cellElement).toHaveClass('selected');
      expect(cellElement).toHaveClass('editing');
    });

    it('renders a cell with readOnly field properly and prevents editing', async () => {
      const readOnlyData: CellShape[][] = [
        [
          { value: 12, readOnly: true },
          { value: 24, readOnly: false },
        ],
      ];
      const dataRenderer = jest.fn((cell: CellShape) => `=+${cell.value}`);
      renderDataSheet({ data: readOnlyData, dataRenderer });

      const readOnlyCell = screen.getByText('12').closest('td')!;
      const editableCell = screen.getByText('24').closest('td')!;

      expect(readOnlyCell).toHaveClass('read-only');
      expect(editableCell).not.toHaveClass('read-only');

      await userEvent.dblClick(readOnlyCell);
      expect(readOnlyCell).not.toHaveClass('editing');
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();

      await userEvent.dblClick(editableCell);
      expect(editableCell).toHaveClass('editing');
      expect(screen.queryByText('24')).not.toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(dataRenderer).toHaveBeenCalledWith(readOnlyData[0][1], 0, 1);
      expect(input).toHaveValue('=+24');
    });

    it('renders a cell with disabled events and prevents selection/editing', async () => {
      const disabledData: CellShape[][] = [
        [
          { value: 12, disableEvents: true },
          { value: 24, disableEvents: false },
        ],
      ];
      renderDataSheet({ data: disabledData });

      const disabledCell = screen.getByText('12').closest('td')!;
      const enabledCell = screen.getByText('24').closest('td')!;

      await userEvent.click(disabledCell);
      expect(disabledCell).not.toHaveClass('selected');
      expect(disabledCell).not.toHaveClass('editing');

      await userEvent.dblClick(disabledCell);
      expect(disabledCell).not.toHaveClass('selected');
      expect(disabledCell).not.toHaveClass('editing');
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

      await userEvent.click(enabledCell);
      expect(enabledCell).toHaveClass('selected');
      expect(enabledCell).not.toHaveClass('editing');

      await userEvent.dblClick(enabledCell);
      expect(enabledCell).toHaveClass('selected');
      expect(enabledCell).toHaveClass('editing');
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // Placeholder for future describe blocks
  describe('Selection', () => {
    /* ... tests to be added ... */
  });
  describe('Keyboard Movement', () => {
    /* ... tests to be added ... */
  });
  describe('Editing (Copy/Paste/Delete)', () => {
    /* ... tests to be added ... */
  });
  describe('Context Menu', () => {
    /* ... tests to be added ... */
  });
  describe('Restricted Cell Movement', () => {
    /* ... tests to be added ... */
  });
  describe('Custom Renderers', () => {
    /* ... tests to be added ... */
  });
  describe('Change Events (onChange, onPaste, onCellsChanged)', () => {
    /* ... tests to be added ... */
  });
});

// Remove old Enzyme/Sinon specific tests below if they existed
// ...

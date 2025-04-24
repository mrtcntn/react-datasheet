/// <reference types="@testing-library/jest-dom" />
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
// No need to import jest-dom here, setup file handles it for runtime

import Cell from '../src/Cell'; // Adjust import path based on your structure
import { CellShape } from '../src/CellShape';

describe('<Cell />', () => {
  it('should render correctly with given props and handle events', () => {
    const mockCell: CellShape = {
      value: 5,
      // Note: width is not directly used by Cell, pass via style
      // width: '200px', // Example: Remove or comment out if not used
      rowSpan: 4,
      colSpan: 5,
      className: 'test-cell-class', // Add className if needed by Cell
    };

    const mockMouseDown = jest.fn();
    const mockMouseOver = jest.fn();
    const mockDoubleClick = jest.fn();
    const mockContextMenu = jest.fn();
    const mockKeyUp = jest.fn();

    render(
      <table>
        <tbody>
          <tr>
            <Cell
              row={2}
              col={3}
              cell={mockCell}
              selected={false}
              editing={false}
              updated={false}
              onMouseDown={mockMouseDown}
              onMouseOver={mockMouseOver}
              onDoubleClick={mockDoubleClick}
              onContextMenu={mockContextMenu}
              onKeyUp={mockKeyUp}
              className={mockCell.className} // Pass className to Cell
              style={{ border: '1px solid red', width: '200px' }} // Combine styles here
            >
              {mockCell.value} {/* Render children */}
            </Cell>
          </tr>
        </tbody>
      </table>,
    );

    const cellElement = screen.getByRole('cell');
    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveClass('test-cell-class'); // Check className
    expect(cellElement).toHaveAttribute('colSpan', '5'); // Test colSpan
    // expect(cellElement).toHaveAttribute('rowspan', '4'); // Test rowSpan - corrected attribute name
    expect(cellElement).toHaveStyle('border: 1px solid red'); // Check for custom style
    expect(cellElement).toHaveStyle('width: 200px'); // Check for width from style prop
    expect(screen.getByText('5')).toBeInTheDocument(); // Check for rendered children

    // Simulate events
    fireEvent.mouseDown(cellElement);
    expect(mockMouseDown).toHaveBeenCalledWith(2, 3, expect.anything());

    fireEvent.mouseOver(cellElement);
    expect(mockMouseOver).toHaveBeenCalledWith(2, 3, expect.anything());

    fireEvent.doubleClick(cellElement);
    expect(mockDoubleClick).toHaveBeenCalledWith(2, 3, expect.anything());

    fireEvent.contextMenu(cellElement);
    expect(mockContextMenu).toHaveBeenCalledWith(expect.anything(), 2, 3);
    expect(mockContextMenu.mock.calls[0][0].defaultPrevented).toBe(true); // Check preventDefault

    fireEvent.keyUp(cellElement, { key: 'Enter', code: 'Enter' });
    expect(mockKeyUp).toHaveBeenCalledWith(expect.anything());
  });
});

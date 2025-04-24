"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderData = renderData;
exports.renderValue = renderValue;
// Assuming CellShape is the type for cell

function renderValue(cell, row, col, valueRenderer) {
  var value = valueRenderer(cell, row, col);
  return value === null || typeof value === 'undefined' ? '' : value;
}
function renderData(cell, row, col, valueRenderer, dataRenderer) {
  var value = dataRenderer ? dataRenderer(cell, row, col) : null;
  // Ensure return type matches declared type
  var renderedValue = renderValue(cell, row, col, valueRenderer);
  var finalValue = value === null || typeof value === 'undefined' ? renderedValue : value;
  // The final value could be ReactNode or primitive, adjust return type if necessary or handle casting.
  // For now, assuming the combined type is acceptable.
  return finalValue;
}
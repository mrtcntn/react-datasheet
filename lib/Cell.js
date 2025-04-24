"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Define Prop Types using TypeScript interface

// Apply the interface to the component props
var Cell = /*#__PURE__*/(0, _react.memo)(function (props) {
  var cell = props.cell,
    row = props.row,
    col = props.col,
    _props$attributesRend = props.attributesRenderer,
    attributesRenderer = _props$attributesRend === void 0 ? function () {
      return {};
    } : _props$attributesRend,
    className = props.className,
    style = props.style,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$editing = props.editing,
    editing = _props$editing === void 0 ? false : _props$editing,
    _props$updated = props.updated,
    updated = _props$updated === void 0 ? false : _props$updated,
    onMouseDown = props.onMouseDown,
    onMouseOver = props.onMouseOver,
    onDoubleClick = props.onDoubleClick,
    onContextMenu = props.onContextMenu,
    children = props.children,
    onKeyUp = props.onKeyUp;
  var colSpan = cell.colSpan,
    rowSpan = cell.rowSpan;
  var attributes = attributesRenderer(cell, row, col) || {};

  // Define event handlers with explicit types
  var handleMouseDown = function handleMouseDown(e) {
    onMouseDown(row, col, e);
  };
  var handleMouseOver = function handleMouseOver(e) {
    onMouseOver(row, col, e);
  };
  var handleDoubleClick = function handleDoubleClick(e) {
    onDoubleClick(row, col, e);
  };
  var handleTouchEnd = function handleTouchEnd(e) {
    // Assuming touch end should trigger double click logic
    // Note: React.TouchEvent doesn't directly map to MouseEvent props.
    // If specific touch handling is needed beyond mimicking dblclick, adjust logic.
    onDoubleClick(row, col);
  };
  var handleContextMenu = function handleContextMenu(e) {
    e.preventDefault(); // Prevent default context menu
    onContextMenu(e, row, col);
  };
  var handleKeyUp = function handleKeyUp(e) {
    if (onKeyUp) {
      onKeyUp(e);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("td", _extends({
    className: className,
    onMouseDown: handleMouseDown // Use wrapped handler
    ,
    onMouseOver: handleMouseOver // Use wrapped handler
    ,
    onDoubleClick: handleDoubleClick // Use wrapped handler
    ,
    onTouchEnd: handleTouchEnd // Use wrapped handler
    ,
    onContextMenu: handleContextMenu // Use wrapped handler
    ,
    onKeyUp: handleKeyUp // Pass keyup handler
    ,
    colSpan: colSpan,
    rowSpan: rowSpan,
    style: style
  }, attributes), children);
});

// Remove PropTypes, as types are handled by TypeScript
// Cell.propTypes = { ... };

Cell.displayName = 'Cell';
var _default = exports["default"] = Cell;
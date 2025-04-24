"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _CellShape = _interopRequireDefault(require("./CellShape"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Cell = /*#__PURE__*/(0, _react.memo)(function (props) {
  var cell = props.cell,
    row = props.row,
    col = props.col,
    _props$attributesRend = props.attributesRenderer,
    attributesRenderer = _props$attributesRend === void 0 ? function () {} : _props$attributesRend,
    className = props.className,
    style = props.style,
    selected = props.selected,
    editing = props.editing,
    updated = props.updated,
    onMouseDown = props.onMouseDown,
    onMouseOver = props.onMouseOver,
    onDoubleClick = props.onDoubleClick,
    onContextMenu = props.onContextMenu,
    children = props.children;
  var colSpan = cell.colSpan,
    rowSpan = cell.rowSpan;
  var attributes = attributesRenderer(cell, row, col) || {};
  return /*#__PURE__*/_react["default"].createElement("td", _extends({
    className: className,
    onMouseDown: onMouseDown,
    onMouseOver: onMouseOver,
    onDoubleClick: onDoubleClick,
    onTouchEnd: onDoubleClick,
    onContextMenu: onContextMenu,
    colSpan: colSpan,
    rowSpan: rowSpan,
    style: style
  }, attributes), children);
});
Cell.propTypes = {
  row: _propTypes["default"].number.isRequired,
  col: _propTypes["default"].number.isRequired,
  cell: _propTypes["default"].shape(_CellShape["default"]).isRequired,
  selected: _propTypes["default"].bool,
  editing: _propTypes["default"].bool,
  updated: _propTypes["default"].bool,
  attributesRenderer: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func.isRequired,
  onMouseOver: _propTypes["default"].func.isRequired,
  onDoubleClick: _propTypes["default"].func.isRequired,
  onContextMenu: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node
};
Cell.defaultProps = {
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: function attributesRenderer() {}
};
Cell.displayName = 'Cell';
var _default = exports["default"] = Cell;
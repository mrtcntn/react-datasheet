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
var DataEditor = /*#__PURE__*/(0, _react.memo)(function (props) {
  var value = props.value,
    onChange = props.onChange,
    onKeyDown = props.onKeyDown;
  var inputRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  var handleChange = function handleChange(e) {
    onChange(e.target.value);
  };
  return /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputRef,
    className: "data-editor",
    value: value,
    onChange: handleChange,
    onKeyDown: onKeyDown
  });
});
DataEditor.propTypes = {
  value: _propTypes["default"].node.isRequired,
  row: _propTypes["default"].number.isRequired,
  col: _propTypes["default"].number.isRequired,
  cell: _propTypes["default"].shape(_CellShape["default"]),
  onChange: _propTypes["default"].func.isRequired,
  onCommit: _propTypes["default"].func.isRequired,
  onRevert: _propTypes["default"].func.isRequired,
  onKeyDown: _propTypes["default"].func.isRequired
};
DataEditor.displayName = 'DataEditor';
var _default = exports["default"] = DataEditor;
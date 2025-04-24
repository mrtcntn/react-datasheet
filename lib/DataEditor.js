"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Define Prop Types using TypeScript interface

// Apply the interface to the component props
var DataEditor = /*#__PURE__*/(0, _react.memo)(function (props) {
  var value = props.value,
    onChange = props.onChange,
    onKeyDown = props.onKeyDown;
  var inputRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
  }, []);
  var handleChange = function handleChange(e) {
    onChange(e.target.value);
  };
  return /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputRef,
    className: "data-editor",
    type: "text",
    value: value === null || value === undefined ? '' : String(value),
    onChange: handleChange,
    onKeyDown: onKeyDown
  });
});
DataEditor.displayName = 'DataEditor';
var _default = exports["default"] = DataEditor;
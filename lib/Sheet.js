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
var Sheet = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, children));
});

// Remove PropTypes
// Sheet.propTypes = {
//   className: PropTypes.string,
//   data: PropTypes.array.isRequired, // Keep for documentation if needed, but TS handles types
//   children: PropTypes.node,
// };

Sheet.displayName = 'Sheet';
var _default = exports["default"] = Sheet;
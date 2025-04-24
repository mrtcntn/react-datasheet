"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _keys = require("./keys");
var _Cell = _interopRequireDefault(require("./Cell"));
var _CellShape = _interopRequireDefault(require("./CellShape"));
var _DataEditor = _interopRequireDefault(require("./DataEditor"));
var _ValueViewer = _interopRequireDefault(require("./ValueViewer"));
var _renderHelpers = require("./renderHelpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function initialData(_ref) {
  var cell = _ref.cell,
    row = _ref.row,
    col = _ref.col,
    valueRenderer = _ref.valueRenderer,
    dataRenderer = _ref.dataRenderer;
  return (0, _renderHelpers.renderData)(cell, row, col, valueRenderer, dataRenderer);
}
function initialValue(_ref2) {
  var cell = _ref2.cell,
    row = _ref2.row,
    col = _ref2.col,
    valueRenderer = _ref2.valueRenderer;
  return (0, _renderHelpers.renderValue)(cell, row, col, valueRenderer);
}
function widthStyle(cell) {
  var width = typeof cell.width === 'number' ? "".concat(cell.width, "px") : cell.width;
  return width ? {
    width: width
  } : null;
}
var DataCell = /*#__PURE__*/(0, _react.memo)(function (props) {
  var row = props.row,
    col = props.col,
    cell = props.cell,
    _props$cellRenderer = props.cellRenderer,
    CellRenderer = _props$cellRenderer === void 0 ? _Cell["default"] : _props$cellRenderer,
    valueRenderer = props.valueRenderer,
    dataRenderer = props.dataRenderer,
    dataEditor = props.dataEditor,
    valueViewer = props.valueViewer,
    attributesRenderer = props.attributesRenderer,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$editing = props.editing,
    editing = _props$editing === void 0 ? false : _props$editing,
    _props$forceEdit = props.forceEdit,
    forceEdit = _props$forceEdit === void 0 ? false : _props$forceEdit,
    _props$clearing = props.clearing,
    clearing = _props$clearing === void 0 ? false : _props$clearing,
    onNavigate = props.onNavigate,
    onMouseDown = props.onMouseDown,
    onMouseOver = props.onMouseOver,
    onDoubleClick = props.onDoubleClick,
    onContextMenu = props.onContextMenu,
    onChange = props.onChange,
    onRevert = props.onRevert,
    onKeyUp = props.onKeyUp;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    updated = _useState4[0],
    setUpdated = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    reverting = _useState6[0],
    setReverting = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    committing = _useState8[0],
    setCommitting = _useState8[1];
  var timeoutRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (editing) {
      var initialEditValue = clearing ? '' : initialData(props);
      setValue(initialEditValue);
      setReverting(false);
      setCommitting(false);
    }
  }, [editing, clearing, props]);
  (0, _react.useEffect)(function () {
    if (!editing && !reverting && !committing && value !== initialData(props)) {
      onChange(row, col, value);
    }
  }, [editing, reverting, committing, value, onChange, row, col, props]);
  (0, _react.useEffect)(function () {
    // This is a placeholder for the original logic that was removed
  }, [props]);
  (0, _react.useEffect)(function () {
    return function () {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  var handleChange = function handleChange(newValue) {
    setValue(newValue);
    setCommitting(false);
  };
  var handleCommit = function handleCommit(commitValue, e) {
    if (commitValue !== initialData(props)) {
      setValue(commitValue);
      setCommitting(true);
      onChange(row, col, commitValue);
    } else {
      handleRevert();
    }
    if (e) {
      e.preventDefault();
      onNavigate(e, true);
    }
  };
  var handleRevert = function handleRevert() {
    setReverting(true);
    onRevert();
  };
  var handleMouseDown = function handleMouseDown(e) {
    if (!cell.disableEvents) {
      onMouseDown(row, col, e);
    }
  };
  var handleMouseOver = function handleMouseOver(e) {
    if (!cell.disableEvents) {
      onMouseOver(row, col);
    }
  };
  var handleDoubleClick = function handleDoubleClick(e) {
    if (!cell.disableEvents) {
      onDoubleClick(row, col);
    }
  };
  var handleContextMenu = function handleContextMenu(e) {
    if (!cell.disableEvents) {
      onContextMenu(e, row, col);
    }
  };
  var handleKey = function handleKey(e) {
    var keyCode = e.which || e.keyCode;
    if (keyCode === _keys.ESCAPE_KEY) {
      handleRevert();
      return;
    }
    var component = cell.component;
    var eatKeys = forceEdit || !!component;
    var shouldCommit = keyCode === _keys.ENTER_KEY || keyCode === _keys.TAB_KEY || !eatKeys && [_keys.LEFT_KEY, _keys.RIGHT_KEY, _keys.UP_KEY, _keys.DOWN_KEY].includes(keyCode);
    if (shouldCommit) {
      handleCommit(value, e);
    }
  };
  var renderComponent = function renderComponent() {
    var component = cell.component,
      readOnly = cell.readOnly,
      forceComponent = cell.forceComponent;
    if (editing && !readOnly || forceComponent) {
      return component;
    }
    return null;
  };
  var renderEditor = function renderEditor() {
    if (editing) {
      var Editor = cell.dataEditor || dataEditor || _DataEditor["default"];
      return /*#__PURE__*/_react["default"].createElement(Editor, {
        cell: cell,
        row: row,
        col: col,
        value: value,
        onChange: handleChange,
        onCommit: handleCommit,
        onRevert: handleRevert,
        onKeyDown: handleKey
      });
    }
    return null;
  };
  var renderViewer = function renderViewer() {
    var Viewer = cell.valueViewer || valueViewer || _ValueViewer["default"];
    var viewValue = (0, _renderHelpers.renderValue)(cell, row, col, valueRenderer);
    return /*#__PURE__*/_react["default"].createElement(Viewer, {
      cell: cell,
      row: row,
      col: col,
      value: viewValue
    });
  };
  var content = renderComponent() || renderEditor() || renderViewer();
  var className = [cell.className, 'cell', cell.overflow, selected && 'selected', editing && 'editing', cell.readOnly && 'read-only', updated && 'updated'].filter(Boolean).join(' ');
  return /*#__PURE__*/_react["default"].createElement(CellRenderer, {
    row: row,
    col: col,
    cell: cell,
    selected: selected,
    editing: editing,
    updated: updated,
    attributesRenderer: attributesRenderer,
    className: className,
    style: widthStyle(cell),
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onDoubleClick: handleDoubleClick,
    onContextMenu: handleContextMenu,
    onKeyUp: onKeyUp
  }, content);
});
DataCell.propTypes = {
  row: _propTypes["default"].number.isRequired,
  col: _propTypes["default"].number.isRequired,
  cell: _propTypes["default"].shape(_CellShape["default"]).isRequired,
  forceEdit: _propTypes["default"].bool,
  selected: _propTypes["default"].bool,
  editing: _propTypes["default"].bool,
  clearing: _propTypes["default"].bool,
  cellRenderer: _propTypes["default"].func,
  valueRenderer: _propTypes["default"].func.isRequired,
  dataRenderer: _propTypes["default"].func,
  valueViewer: _propTypes["default"].func,
  dataEditor: _propTypes["default"].func,
  attributesRenderer: _propTypes["default"].func,
  onNavigate: _propTypes["default"].func.isRequired,
  onMouseDown: _propTypes["default"].func.isRequired,
  onMouseOver: _propTypes["default"].func.isRequired,
  onDoubleClick: _propTypes["default"].func.isRequired,
  onContextMenu: _propTypes["default"].func.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onRevert: _propTypes["default"].func.isRequired,
  onKeyUp: _propTypes["default"].func
};
DataCell.defaultProps = {
  forceEdit: false,
  selected: false,
  editing: false,
  clearing: false,
  cellRenderer: _Cell["default"]
};
DataCell.displayName = 'DataCell';
var _default = exports["default"] = DataCell;
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _keys = require("./keys");
var _Cell = _interopRequireDefault(require("./Cell"));
var _CellShape = _interopRequireDefault(require("./CellShape"));
var _DataEditor = _interopRequireDefault(require("./DataEditor"));
var _ValueViewer = _interopRequireDefault(require("./ValueViewer"));
var _renderHelpers = require("./renderHelpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
  var width = typeof cell.width === 'number' ? cell.width + 'px' : cell.width;
  return width ? {
    width: width
  } : null;
}
var DataCell = exports["default"] = /*#__PURE__*/function (_PureComponent) {
  function DataCell(props) {
    var _this;
    _classCallCheck(this, DataCell);
    _this = _callSuper(this, DataCell, [props]);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleCommit = _this.handleCommit.bind(_this);
    _this.handleRevert = _this.handleRevert.bind(_this);
    _this.handleKey = _this.handleKey.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.handleContextMenu = _this.handleContextMenu.bind(_this);
    _this.handleDoubleClick = _this.handleDoubleClick.bind(_this);
    _this.state = {
      updated: false,
      reverting: false,
      committing: false,
      value: ''
    };
    return _this;
  }
  _inherits(DataCell, _PureComponent);
  return _createClass(DataCell, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      if (!this.props.cell.disableUpdatedFlag && initialValue(prevProps) !== initialValue(this.props)) {
        this.setState({
          updated: true
        });
        this.timeout = setTimeout(function () {
          return _this2.setState({
            updated: false
          });
        }, 700);
      }
      if (this.props.editing === true && prevProps.editing === false) {
        var value = this.props.clearing ? '' : initialData(this.props);
        this.setState({
          value: value,
          reverting: false
        });
      }
      if (prevProps.editing === true && this.props.editing === false && !this.state.reverting && !this.state.committing && this.state.value !== initialData(this.props)) {
        this.props.onChange(this.props.row, this.props.col, this.state.value);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({
        value: value,
        committing: false
      });
    }
  }, {
    key: "handleCommit",
    value: function handleCommit(value, e) {
      var _this$props = this.props,
        onChange = _this$props.onChange,
        onNavigate = _this$props.onNavigate;
      if (value !== initialData(this.props)) {
        this.setState({
          value: value,
          committing: true
        });
        onChange(this.props.row, this.props.col, value);
      } else {
        this.handleRevert();
      }
      if (e) {
        e.preventDefault();
        onNavigate(e, true);
      }
    }
  }, {
    key: "handleRevert",
    value: function handleRevert() {
      this.setState({
        reverting: true
      });
      this.props.onRevert();
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      var _this$props2 = this.props,
        row = _this$props2.row,
        col = _this$props2.col,
        onMouseDown = _this$props2.onMouseDown,
        cell = _this$props2.cell;
      if (!cell.disableEvents) {
        onMouseDown(row, col, e);
      }
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver(e) {
      var _this$props3 = this.props,
        row = _this$props3.row,
        col = _this$props3.col,
        onMouseOver = _this$props3.onMouseOver,
        cell = _this$props3.cell;
      if (!cell.disableEvents) {
        onMouseOver(row, col);
      }
    }
  }, {
    key: "handleDoubleClick",
    value: function handleDoubleClick(e) {
      var _this$props4 = this.props,
        row = _this$props4.row,
        col = _this$props4.col,
        onDoubleClick = _this$props4.onDoubleClick,
        cell = _this$props4.cell;
      if (!cell.disableEvents) {
        onDoubleClick(row, col);
      }
    }
  }, {
    key: "handleContextMenu",
    value: function handleContextMenu(e) {
      var _this$props5 = this.props,
        row = _this$props5.row,
        col = _this$props5.col,
        onContextMenu = _this$props5.onContextMenu,
        cell = _this$props5.cell;
      if (!cell.disableEvents) {
        onContextMenu(e, row, col);
      }
    }
  }, {
    key: "handleKey",
    value: function handleKey(e) {
      var keyCode = e.which || e.keyCode;
      if (keyCode === _keys.ESCAPE_KEY) {
        return this.handleRevert();
      }
      var _this$props6 = this.props,
        component = _this$props6.cell.component,
        forceEdit = _this$props6.forceEdit;
      var eatKeys = forceEdit || !!component;
      var commit = keyCode === _keys.ENTER_KEY || keyCode === _keys.TAB_KEY || !eatKeys && [_keys.LEFT_KEY, _keys.RIGHT_KEY, _keys.UP_KEY, _keys.DOWN_KEY].includes(keyCode);
      if (commit) {
        this.handleCommit(this.state.value, e);
      }
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(editing, cell) {
      var component = cell.component,
        readOnly = cell.readOnly,
        forceComponent = cell.forceComponent;
      if (editing && !readOnly || forceComponent) {
        return component;
      }
    }
  }, {
    key: "renderEditor",
    value: function renderEditor(editing, cell, row, col, dataEditor) {
      if (editing) {
        var Editor = cell.dataEditor || dataEditor || _DataEditor["default"];
        return /*#__PURE__*/_react["default"].createElement(Editor, {
          cell: cell,
          row: row,
          col: col,
          value: this.state.value,
          onChange: this.handleChange,
          onCommit: this.handleCommit,
          onRevert: this.handleRevert,
          onKeyDown: this.handleKey
        });
      }
    }
  }, {
    key: "renderViewer",
    value: function renderViewer(cell, row, col, valueRenderer, valueViewer) {
      var Viewer = cell.valueViewer || valueViewer || _ValueViewer["default"];
      var value = (0, _renderHelpers.renderValue)(cell, row, col, valueRenderer);
      return /*#__PURE__*/_react["default"].createElement(Viewer, {
        cell: cell,
        row: row,
        col: col,
        value: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
        row = _this$props7.row,
        col = _this$props7.col,
        cell = _this$props7.cell,
        CellRenderer = _this$props7.cellRenderer,
        valueRenderer = _this$props7.valueRenderer,
        dataEditor = _this$props7.dataEditor,
        valueViewer = _this$props7.valueViewer,
        attributesRenderer = _this$props7.attributesRenderer,
        selected = _this$props7.selected,
        editing = _this$props7.editing,
        onKeyUp = _this$props7.onKeyUp;
      var updated = this.state.updated;
      var content = this.renderComponent(editing, cell) || this.renderEditor(editing, cell, row, col, dataEditor) || this.renderViewer(cell, row, col, valueRenderer, valueViewer);
      var className = [cell.className, 'cell', cell.overflow, selected && 'selected', editing && 'editing', cell.readOnly && 'read-only', updated && 'updated'].filter(function (a) {
        return a;
      }).join(' ');
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
        onMouseDown: this.handleMouseDown,
        onMouseOver: this.handleMouseOver,
        onDoubleClick: this.handleDoubleClick,
        onContextMenu: this.handleContextMenu,
        onKeyUp: onKeyUp
      }, content);
    }
  }]);
}(_react.PureComponent);
DataCell.propTypes = {
  row: _propTypes["default"].number.isRequired,
  col: _propTypes["default"].number.isRequired,
  cell: _propTypes["default"].shape(_CellShape["default"]).isRequired,
  forceEdit: _propTypes["default"].bool,
  selected: _propTypes["default"].bool,
  editing: _propTypes["default"].bool,
  editValue: _propTypes["default"].any,
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
  onEdit: _propTypes["default"].func
};
DataCell.defaultProps = {
  forceEdit: false,
  selected: false,
  editing: false,
  clearing: false,
  cellRenderer: _Cell["default"]
};
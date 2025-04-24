"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Sheet = _interopRequireDefault(require("./Sheet"));
var _Row = _interopRequireDefault(require("./Row"));
var _Cell = _interopRequireDefault(require("./Cell"));
var _DataCell = _interopRequireDefault(require("./DataCell"));
var _DataEditor = _interopRequireDefault(require("./DataEditor"));
var _ValueViewer = _interopRequireDefault(require("./ValueViewer"));
var _keys = require("./keys");
var _excluded = ["start", "end"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var isEmpty = function isEmpty(obj) {
  return Object.keys(obj).length === 0;
};
var range = function range(start, end) {
  var array = [];
  var inc = end - start > 0;
  for (var i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
    inc ? array.push(i) : array.unshift(i);
  }
  return array;
};
var defaultParsePaste = function defaultParsePaste(str) {
  return str.split(/\r\n|\n|\r/).map(function (row) {
    return row.split('\t');
  });
};
var DataSheet = exports["default"] = /*#__PURE__*/function (_PureComponent) {
  function DataSheet(props) {
    var _this;
    _classCallCheck(this, DataSheet);
    _this = _callSuper(this, DataSheet, [props]);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onMouseOver = _this.onMouseOver.bind(_this);
    _this.onDoubleClick = _this.onDoubleClick.bind(_this);
    _this.onContextMenu = _this.onContextMenu.bind(_this);
    _this.handleNavigate = _this.handleNavigate.bind(_this);
    _this.handleKey = _this.handleKey.bind(_this).bind(_this);
    _this.handleCut = _this.handleCut.bind(_this);
    _this.handleCopy = _this.handleCopy.bind(_this);
    _this.handlePaste = _this.handlePaste.bind(_this);
    _this.pageClick = _this.pageClick.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onRevert = _this.onRevert.bind(_this);
    _this.isSelected = _this.isSelected.bind(_this);
    _this.isEditing = _this.isEditing.bind(_this);
    _this.isClearing = _this.isClearing.bind(_this);
    _this.handleComponentKey = _this.handleComponentKey.bind(_this);
    _this.handleKeyboardCellMovement = _this.handleKeyboardCellMovement.bind(_this);
    _this.defaultState = {
      start: {},
      end: {},
      selecting: false,
      forceEdit: false,
      editing: {},
      clear: {}
    };
    _this.state = _this.defaultState;
    _this.removeAllListeners = _this.removeAllListeners.bind(_this);
    _this.handleIEClipboardEvents = _this.handleIEClipboardEvents.bind(_this);
    return _this;
  }
  _inherits(DataSheet, _PureComponent);
  return _createClass(DataSheet, [{
    key: "removeAllListeners",
    value: function removeAllListeners() {
      document.removeEventListener('mousedown', this.pageClick);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('cut', this.handleCut);
      document.removeEventListener('copy', this.handleCopy);
      document.removeEventListener('paste', this.handlePaste);
      document.removeEventListener('keydown', this.handleIEClipboardEvents);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Add listener scoped to the DataSheet that catches otherwise unhandled
      // keyboard events when displaying components
      this.dgDom && this.dgDom.addEventListener('keydown', this.handleComponentKey);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.dgDom && this.dgDom.removeEventListener('keydown', this.handleComponentKey);
      this.removeAllListeners();
    }
  }, {
    key: "isSelectionControlled",
    value: function isSelectionControlled() {
      return 'selected' in this.props;
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = this.state;
      if (this.isSelectionControlled()) {
        var _ref = this.props.selected || {},
          start = _ref.start,
          end = _ref.end;
        start = start || this.defaultState.start;
        end = end || this.defaultState.end;
        state = _objectSpread(_objectSpread({}, state), {}, {
          start: start,
          end: end
        });
      }
      return state;
    }
  }, {
    key: "_setState",
    value: function _setState(state) {
      var editModeChanged = this.props.editModeChanged;
      if (editModeChanged && state.editing) {
        var wasEditing = !isEmpty(this.state.editing);
        var wilBeEditing = !isEmpty(state.editing);
        if (wasEditing != wilBeEditing) {
          editModeChanged(wilBeEditing);
        }
      }
      if (this.isSelectionControlled() && ('start' in state || 'end' in state)) {
        var start = state.start,
          end = state.end,
          rest = _objectWithoutProperties(state, _excluded);
        var _this$props = this.props,
          selected = _this$props.selected,
          onSelect = _this$props.onSelect;
        selected = selected || {};
        if (!start) {
          start = 'start' in selected ? selected.start : this.defaultState.start;
        }
        if (!end) {
          end = 'end' in selected ? selected.end : this.defaultState.end;
        }
        onSelect && onSelect({
          start: start,
          end: end
        });
        this.setState(rest);
      } else {
        this.setState(state);
      }
    }
  }, {
    key: "pageClick",
    value: function pageClick(e) {
      if (this.props.disablePageClick) return;
      var element = this.dgDom;
      if (!element.contains(e.target)) {
        this.setState(this.defaultState);
        this.removeAllListeners();
      }
    }
  }, {
    key: "handleCut",
    value: function handleCut(e) {
      if (isEmpty(this.state.editing)) {
        e.preventDefault();
        this.handleCopy(e);
        var _this$getState = this.getState(),
          start = _this$getState.start,
          end = _this$getState.end;
        this.clearSelectedCells(start, end);
      }
    }
  }, {
    key: "handleIEClipboardEvents",
    value: function handleIEClipboardEvents(e) {
      if (e.ctrlKey) {
        if (e.keyCode === 67) {
          // C - copy
          this.handleCopy(e);
        } else if (e.keyCode === 88) {
          // X - cut
          this.handleCut(e);
        } else if (e.keyCode === 86 || e.which === 86) {
          // P - patse
          this.handlePaste(e);
        }
      }
    }
  }, {
    key: "handleCopy",
    value: function handleCopy(e) {
      if (isEmpty(this.state.editing)) {
        e.preventDefault();
        var _this$props2 = this.props,
          dataRenderer = _this$props2.dataRenderer,
          valueRenderer = _this$props2.valueRenderer,
          data = _this$props2.data;
        var _this$getState2 = this.getState(),
          start = _this$getState2.start,
          end = _this$getState2.end;
        if (this.props.handleCopy) {
          this.props.handleCopy({
            event: e,
            dataRenderer: dataRenderer,
            valueRenderer: valueRenderer,
            data: data,
            start: start,
            end: end,
            range: range
          });
        } else {
          var text = range(start.i, end.i).map(function (i) {
            return range(start.j, end.j).map(function (j) {
              var cell = data[i][j];
              var value = dataRenderer ? dataRenderer(cell, i, j) : null;
              if (value === '' || value === null || typeof value === 'undefined') {
                return valueRenderer(cell, i, j);
              }
              return value;
            }).join('\t');
          }).join('\n');
          if (window.clipboardData && window.clipboardData.setData) {
            window.clipboardData.setData('Text', text);
          } else {
            e.clipboardData.setData('text/plain', text);
          }
        }
      }
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(e) {
      if (isEmpty(this.state.editing)) {
        var _this$getState3 = this.getState(),
          start = _this$getState3.start,
          end = _this$getState3.end;
        start = {
          i: Math.min(start.i, end.i),
          j: Math.min(start.j, end.j)
        };
        end = {
          i: Math.max(start.i, end.i),
          j: Math.max(start.j, end.j)
        };
        var parse = this.props.parsePaste || defaultParsePaste;
        var changes = [];
        var pasteData = [];
        if (window.clipboardData && window.clipboardData.getData) {
          // IE
          pasteData = parse(window.clipboardData.getData('Text'));
        } else if (e.clipboardData && e.clipboardData.getData) {
          pasteData = parse(e.clipboardData.getData('text/plain'));
        }

        // in order of preference
        var _this$props3 = this.props,
          data = _this$props3.data,
          onCellsChanged = _this$props3.onCellsChanged,
          onPaste = _this$props3.onPaste,
          onChange = _this$props3.onChange;
        if (onCellsChanged) {
          var additions = [];
          pasteData.forEach(function (row, i) {
            row.forEach(function (value, j) {
              end = {
                i: start.i + i,
                j: start.j + j
              };
              var cell = data[end.i] && data[end.i][end.j];
              if (!cell) {
                additions.push({
                  row: end.i,
                  col: end.j,
                  value: value
                });
              } else if (!cell.readOnly) {
                changes.push({
                  cell: cell,
                  row: end.i,
                  col: end.j,
                  value: value
                });
              }
            });
          });
          if (additions.length) {
            onCellsChanged(changes, additions);
          } else {
            onCellsChanged(changes);
          }
        } else if (onPaste) {
          pasteData.forEach(function (row, i) {
            var rowData = [];
            row.forEach(function (pastedData, j) {
              end = {
                i: start.i + i,
                j: start.j + j
              };
              var cell = data[end.i] && data[end.i][end.j];
              rowData.push({
                cell: cell,
                data: pastedData
              });
            });
            changes.push(rowData);
          });
          onPaste(changes);
        } else if (onChange) {
          pasteData.forEach(function (row, i) {
            row.forEach(function (value, j) {
              end = {
                i: start.i + i,
                j: start.j + j
              };
              var cell = data[end.i] && data[end.i][end.j];
              if (cell && !cell.readOnly) {
                onChange(cell, end.i, end.j, value);
              }
            });
          });
        }
        this._setState({
          end: end
        });
      }
    }
  }, {
    key: "handleKeyboardCellMovement",
    value: function handleKeyboardCellMovement(e) {
      var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$getState4 = this.getState(),
        start = _this$getState4.start,
        editing = _this$getState4.editing;
      var data = this.props.data;
      var isEditing = editing && !isEmpty(editing);
      var currentCell = data[start.i] && data[start.i][start.j];
      if (isEditing && !commit) {
        return false;
      }
      var hasComponent = currentCell && currentCell.component;
      var keyCode = e.which || e.keyCode;
      if (hasComponent && isEditing) {
        e.preventDefault();
        return;
      }
      if (keyCode === _keys.TAB_KEY) {
        this.handleNavigate(e, {
          i: 0,
          j: e.shiftKey ? -1 : 1
        }, true);
      } else if (keyCode === _keys.RIGHT_KEY) {
        this.handleNavigate(e, {
          i: 0,
          j: 1
        });
      } else if (keyCode === _keys.LEFT_KEY) {
        this.handleNavigate(e, {
          i: 0,
          j: -1
        });
      } else if (keyCode === _keys.UP_KEY) {
        this.handleNavigate(e, {
          i: -1,
          j: 0
        });
      } else if (keyCode === _keys.DOWN_KEY) {
        this.handleNavigate(e, {
          i: 1,
          j: 0
        });
      } else if (commit && keyCode === _keys.ENTER_KEY) {
        this.handleNavigate(e, {
          i: e.shiftKey ? -1 : 1,
          j: 0
        });
      }
    }
  }, {
    key: "handleKey",
    value: function handleKey(e) {
      if (e.isPropagationStopped && e.isPropagationStopped()) {
        return;
      }
      var keyCode = e.which || e.keyCode;
      var _this$getState5 = this.getState(),
        start = _this$getState5.start,
        end = _this$getState5.end,
        editing = _this$getState5.editing;
      var isEditing = editing && !isEmpty(editing);
      var noCellsSelected = !start || isEmpty(start);
      var ctrlKeyPressed = e.ctrlKey || e.metaKey;
      var deleteKeysPressed = keyCode === _keys.DELETE_KEY || keyCode === _keys.BACKSPACE_KEY;
      var enterKeyPressed = keyCode === _keys.ENTER_KEY;
      var numbersPressed = keyCode >= 48 && keyCode <= 57;
      var lettersPressed = keyCode >= 65 && keyCode <= 90;
      var latin1Supplement = keyCode >= 160 && keyCode <= 255;
      var numPadKeysPressed = keyCode >= 96 && keyCode <= 105;
      var currentCell = !noCellsSelected && this.props.data[start.i][start.j];
      var equationKeysPressed = [187 /* equal */, 189 /* substract */, 190 /* period */, 107 /* add */, 109 /* decimal point */, 110].indexOf(keyCode) > -1;
      if (noCellsSelected || ctrlKeyPressed) {
        return true;
      }
      if (!isEditing) {
        this.handleKeyboardCellMovement(e);
        if (deleteKeysPressed) {
          e.preventDefault();
          this.clearSelectedCells(start, end);
        } else if (currentCell && !currentCell.readOnly) {
          if (enterKeyPressed) {
            this._setState({
              editing: start,
              clear: {},
              forceEdit: true
            });
            e.preventDefault();
          } else if (numbersPressed || numPadKeysPressed || lettersPressed || latin1Supplement || equationKeysPressed) {
            // empty out cell if user starts typing without pressing enter
            this._setState({
              editing: start,
              clear: start,
              forceEdit: false
            });
          }
        }
      }
    }
  }, {
    key: "getSelectedCells",
    value: function getSelectedCells(data, start, end) {
      var selected = [];
      range(start.i, end.i).map(function (row) {
        range(start.j, end.j).map(function (col) {
          if (data[row] && data[row][col]) {
            selected.push({
              cell: data[row][col],
              row: row,
              col: col
            });
          }
        });
      });
      return selected;
    }
  }, {
    key: "clearSelectedCells",
    value: function clearSelectedCells(start, end) {
      var _this2 = this;
      var _this$props4 = this.props,
        data = _this$props4.data,
        onCellsChanged = _this$props4.onCellsChanged,
        onChange = _this$props4.onChange;
      var cells = this.getSelectedCells(data, start, end).filter(function (cell) {
        return !cell.cell.readOnly;
      }).map(function (cell) {
        return _objectSpread(_objectSpread({}, cell), {}, {
          value: ''
        });
      });
      if (onCellsChanged) {
        onCellsChanged(cells);
        this.onRevert();
      } else if (onChange) {
        // ugly solution brought to you by https://reactjs.org/docs/react-component.html#setstate
        // setState in a loop is unreliable
        setTimeout(function () {
          cells.forEach(function (_ref2) {
            var cell = _ref2.cell,
              row = _ref2.row,
              col = _ref2.col,
              value = _ref2.value;
            onChange(cell, row, col, value);
          });
          _this2.onRevert();
        }, 0);
      }
    }
  }, {
    key: "updateLocationSingleCell",
    value: function updateLocationSingleCell(location) {
      this._setState({
        start: location,
        end: location,
        editing: {}
      });
    }
  }, {
    key: "updateLocationMultipleCells",
    value: function updateLocationMultipleCells(offsets) {
      var _this$getState6 = this.getState(),
        start = _this$getState6.start,
        end = _this$getState6.end;
      var data = this.props.data;
      var oldStartLocation = {
        i: start.i,
        j: start.j
      };
      var newEndLocation = {
        i: end.i + offsets.i,
        j: Math.min(data[0].length - 1, Math.max(0, end.j + offsets.j))
      };
      this._setState({
        start: oldStartLocation,
        end: newEndLocation,
        editing: {}
      });
    }
  }, {
    key: "searchForNextSelectablePos",
    value: function searchForNextSelectablePos(isCellNavigable, data, start, offsets, jumpRow) {
      var previousRow = function previousRow(location) {
        return {
          i: location.i - 1,
          j: data[0].length - 1
        };
      };
      var nextRow = function nextRow(location) {
        return {
          i: location.i + 1,
          j: 0
        };
      };
      var advanceOffset = function advanceOffset(location) {
        return {
          i: location.i + offsets.i,
          j: location.j + offsets.j
        };
      };
      var isCellDefined = function isCellDefined(_ref3) {
        var i = _ref3.i,
          j = _ref3.j;
        return data[i] && typeof data[i][j] !== 'undefined';
      };
      var newLocation = advanceOffset(start);
      while (isCellDefined(newLocation) && !isCellNavigable(data[newLocation.i][newLocation.j], newLocation.i, newLocation.j)) {
        newLocation = advanceOffset(newLocation);
      }
      if (!isCellDefined(newLocation)) {
        if (!jumpRow) {
          return null;
        }
        if (offsets.j < 0) {
          newLocation = previousRow(newLocation);
        } else {
          newLocation = nextRow(newLocation);
        }
      }
      if (isCellDefined(newLocation) && !isCellNavigable(data[newLocation.i][newLocation.j], newLocation.i, newLocation.j)) {
        return this.searchForNextSelectablePos(isCellNavigable, data, newLocation, offsets, jumpRow);
      } else if (isCellDefined(newLocation)) {
        return newLocation;
      } else {
        return null;
      }
    }
  }, {
    key: "handleNavigate",
    value: function handleNavigate(e, offsets, jumpRow) {
      if (offsets && (offsets.i || offsets.j)) {
        var data = this.props.data;
        var _this$getState7 = this.getState(),
          start = _this$getState7.start;
        var multiSelect = e.shiftKey && !jumpRow;
        var isCellNavigable = this.props.isCellNavigable ? this.props.isCellNavigable : function () {
          return true;
        };
        if (multiSelect) {
          this.updateLocationMultipleCells(offsets);
        } else {
          var newLocation = this.searchForNextSelectablePos(isCellNavigable, data, start, offsets, jumpRow);
          if (newLocation) {
            this.updateLocationSingleCell(newLocation);
          }
        }
        e.preventDefault();
      }
    }
  }, {
    key: "handleComponentKey",
    value: function handleComponentKey(e) {
      var _this3 = this;
      // handles keyboard events when editing components
      var keyCode = e.which || e.keyCode;
      if (![_keys.ENTER_KEY, _keys.ESCAPE_KEY, _keys.TAB_KEY].includes(keyCode)) {
        return;
      }
      var editing = this.state.editing;
      var data = this.props.data;
      var isEditing = !isEmpty(editing);
      if (isEditing) {
        var currentCell = data[editing.i][editing.j];
        var offset = e.shiftKey ? -1 : 1;
        if (currentCell && currentCell.component && !currentCell.forceComponent) {
          e.preventDefault();
          var func = this.onRevert; // ESCAPE_KEY
          if (keyCode === _keys.ENTER_KEY) {
            func = function func() {
              return _this3.handleNavigate(e, {
                i: offset,
                j: 0
              });
            };
          } else if (keyCode === _keys.TAB_KEY) {
            func = function func() {
              return _this3.handleNavigate(e, {
                i: 0,
                j: offset
              }, true);
            };
          }
          // setTimeout makes sure that component is done handling the event before we take over
          setTimeout(function () {
            func();
            _this3.dgDom && _this3.dgDom.focus({
              preventScroll: true
            });
          }, 1);
        }
      }
    }
  }, {
    key: "onContextMenu",
    value: function onContextMenu(evt, i, j) {
      var cell = this.props.data[i][j];
      if (this.props.onContextMenu) {
        this.props.onContextMenu(evt, cell, i, j);
      }
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(i, j) {
      var cell = this.props.data[i][j];
      if (!cell.readOnly) {
        this._setState({
          editing: {
            i: i,
            j: j
          },
          forceEdit: true,
          clear: {}
        });
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(i, j, e) {
      var isNowEditingSameCell = !isEmpty(this.state.editing) && this.state.editing.i === i && this.state.editing.j === j;
      var editing = isEmpty(this.state.editing) || this.state.editing.i !== i || this.state.editing.j !== j ? {} : this.state.editing;
      this._setState({
        selecting: !isNowEditingSameCell,
        start: e.shiftKey ? this.getState().start : {
          i: i,
          j: j
        },
        end: {
          i: i,
          j: j
        },
        editing: editing,
        forceEdit: !!isNowEditingSameCell
      });
      var ua = window.navigator.userAgent;
      var isIE = /MSIE|Trident/.test(ua);
      // Listen for Ctrl + V in case of IE
      if (isIE) {
        document.addEventListener('keydown', this.handleIEClipboardEvents);
      }

      // Keep listening to mouse if user releases the mouse (dragging outside)
      document.addEventListener('mouseup', this.onMouseUp);
      // Listen for any outside mouse clicks
      document.addEventListener('mousedown', this.pageClick);

      // Cut, copy and paste event handlers
      document.addEventListener('cut', this.handleCut);
      document.addEventListener('copy', this.handleCopy);
      document.addEventListener('paste', this.handlePaste);
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(i, j) {
      if (this.state.selecting && isEmpty(this.state.editing)) {
        this._setState({
          end: {
            i: i,
            j: j
          }
        });
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      this._setState({
        selecting: false
      });
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: "onChange",
    value: function onChange(row, col, value) {
      var _this$props5 = this.props,
        onChange = _this$props5.onChange,
        onCellsChanged = _this$props5.onCellsChanged,
        data = _this$props5.data;
      if (onCellsChanged) {
        onCellsChanged([{
          cell: data[row][col],
          row: row,
          col: col,
          value: value
        }]);
      } else if (onChange) {
        onChange(data[row][col], row, col, value);
      }
      this.onRevert();
    }
  }, {
    key: "onRevert",
    value: function onRevert() {
      var _this4 = this;
      this._setState({
        editing: {}
      });
      // setTimeout makes sure that component is done handling the new state before we take over
      setTimeout(function () {
        _this4.dgDom && _this4.dgDom.focus({
          preventScroll: true
        });
      }, 1);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
        start = _this$state.start,
        end = _this$state.end;
      var prevEnd = prevState.end;
      if (!isEmpty(end) && !(end.i === prevEnd.i && end.j === prevEnd.j) && !this.isSelectionControlled()) {
        this.props.onSelect && this.props.onSelect({
          start: start,
          end: end
        });
      }
    }
  }, {
    key: "isSelectedRow",
    value: function isSelectedRow(rowIndex) {
      var _this$getState8 = this.getState(),
        start = _this$getState8.start,
        end = _this$getState8.end;
      var startY = start.i;
      var endY = end.i;
      if (startY <= endY) {
        return rowIndex >= startY && rowIndex <= endY;
      } else {
        return rowIndex <= startY && rowIndex >= endY;
      }
    }
  }, {
    key: "isSelected",
    value: function isSelected(i, j) {
      var _this$getState9 = this.getState(),
        start = _this$getState9.start,
        end = _this$getState9.end;
      var posX = j >= start.j && j <= end.j;
      var negX = j <= start.j && j >= end.j;
      var posY = i >= start.i && i <= end.i;
      var negY = i <= start.i && i >= end.i;
      return posX && posY || negX && posY || negX && negY || posX && negY;
    }
  }, {
    key: "isEditing",
    value: function isEditing(i, j) {
      return this.state.editing.i === i && this.state.editing.j === j;
    }
  }, {
    key: "isClearing",
    value: function isClearing(i, j) {
      return this.state.clear.i === i && this.state.clear.j === j;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props6 = this.props,
        SheetRenderer = _this$props6.sheetRenderer,
        RowRenderer = _this$props6.rowRenderer,
        cellRenderer = _this$props6.cellRenderer,
        dataRenderer = _this$props6.dataRenderer,
        valueRenderer = _this$props6.valueRenderer,
        dataEditor = _this$props6.dataEditor,
        valueViewer = _this$props6.valueViewer,
        attributesRenderer = _this$props6.attributesRenderer,
        className = _this$props6.className,
        overflow = _this$props6.overflow,
        data = _this$props6.data,
        keyFn = _this$props6.keyFn;
      var forceEdit = this.state.forceEdit;
      return /*#__PURE__*/_react["default"].createElement("span", {
        ref: function ref(r) {
          _this5.dgDom = r;
        },
        tabIndex: "0",
        className: "data-grid-container",
        onKeyDown: this.handleKey
      }, /*#__PURE__*/_react["default"].createElement(SheetRenderer, {
        data: data,
        className: ['data-grid', className, overflow].filter(function (a) {
          return a;
        }).join(' ')
      }, data.map(function (row, i) {
        return /*#__PURE__*/_react["default"].createElement(RowRenderer, {
          key: keyFn ? keyFn(i) : i,
          row: i,
          cells: row,
          selected: _this5.isSelectedRow(i)
        }, row.map(function (cell, j) {
          var isEditing = _this5.isEditing(i, j);
          return /*#__PURE__*/_react["default"].createElement(_DataCell["default"], _extends({
            key: cell.key ? cell.key : "".concat(i, "-").concat(j),
            row: i,
            col: j,
            cell: cell,
            forceEdit: false,
            onMouseDown: _this5.onMouseDown,
            onMouseOver: _this5.onMouseOver,
            onDoubleClick: _this5.onDoubleClick,
            onContextMenu: _this5.onContextMenu,
            onChange: _this5.onChange,
            onRevert: _this5.onRevert,
            onNavigate: _this5.handleKeyboardCellMovement,
            onKey: _this5.handleKey,
            selected: _this5.isSelected(i, j),
            editing: isEditing,
            clearing: _this5.isClearing(i, j),
            attributesRenderer: attributesRenderer,
            cellRenderer: cellRenderer,
            valueRenderer: valueRenderer,
            dataRenderer: dataRenderer,
            valueViewer: valueViewer,
            dataEditor: dataEditor
          }, isEditing ? {
            forceEdit: forceEdit
          } : {}));
        }));
      })));
    }
  }]);
}(_react.PureComponent);
DataSheet.propTypes = {
  data: _propTypes["default"].array.isRequired,
  className: _propTypes["default"].string,
  disablePageClick: _propTypes["default"].bool,
  overflow: _propTypes["default"].oneOf(['wrap', 'nowrap', 'clip']),
  onChange: _propTypes["default"].func,
  onCellsChanged: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  onSelect: _propTypes["default"].func,
  isCellNavigable: _propTypes["default"].func,
  selected: _propTypes["default"].shape({
    start: _propTypes["default"].shape({
      i: _propTypes["default"].number,
      j: _propTypes["default"].number
    }),
    end: _propTypes["default"].shape({
      i: _propTypes["default"].number,
      j: _propTypes["default"].number
    })
  }),
  valueRenderer: _propTypes["default"].func.isRequired,
  dataRenderer: _propTypes["default"].func,
  sheetRenderer: _propTypes["default"].func.isRequired,
  rowRenderer: _propTypes["default"].func.isRequired,
  cellRenderer: _propTypes["default"].func.isRequired,
  valueViewer: _propTypes["default"].func,
  dataEditor: _propTypes["default"].func,
  parsePaste: _propTypes["default"].func,
  attributesRenderer: _propTypes["default"].func,
  keyFn: _propTypes["default"].func,
  handleCopy: _propTypes["default"].func,
  editModeChanged: _propTypes["default"].func
};
DataSheet.defaultProps = {
  sheetRenderer: _Sheet["default"],
  rowRenderer: _Row["default"],
  cellRenderer: _Cell["default"],
  valueViewer: _ValueViewer["default"],
  dataEditor: _DataEditor["default"]
};
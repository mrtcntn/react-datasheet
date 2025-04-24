"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Cell = _interopRequireDefault(require("./Cell"));
var _DataCell = _interopRequireDefault(require("./DataCell"));
var _DataEditor = _interopRequireDefault(require("./DataEditor"));
var _Row = _interopRequireDefault(require("./Row"));
var _Sheet = _interopRequireDefault(require("./Sheet"));
var _ValueViewer = _interopRequireDefault(require("./ValueViewer"));
var _keys = require("./keys");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Type definitions

// Utility function types
var isEmpty = function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
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
var defaultState = {
  start: {
    i: -1,
    j: -1
  },
  // Use initial invalid state
  end: {
    i: -1,
    j: -1
  },
  selecting: false,
  forceEdit: false,
  editing: {
    i: -1,
    j: -1
  },
  clear: {
    i: -1,
    j: -1
  }
};

// Component Prop Types

// Helper to check if selection is controlled
var isSelectionControlled = function isSelectionControlled(props) {
  return 'selected' in props;
};

// Helper to get state, merging controlled selection if necessary
var getCurrentState = function getCurrentState(internalState, props) {
  var state = _objectSpread({}, internalState);
  if (isSelectionControlled(props)) {
    var _ref = props.selected || {
        start: defaultState.start,
        end: defaultState.end
      },
      start = _ref.start,
      end = _ref.end;
    state = _objectSpread(_objectSpread({}, state), {}, {
      start: start,
      end: end
    });
  }
  return state;
};

// --- Main Component --- //
var DataSheet = /*#__PURE__*/(0, _react.memo)(function (props) {
  var data = props.data,
    className = props.className,
    overflow = props.overflow,
    valueRenderer = props.valueRenderer,
    dataRenderer = props.dataRenderer,
    _props$sheetRenderer = props.sheetRenderer,
    SheetRenderer = _props$sheetRenderer === void 0 ? _Sheet["default"] : _props$sheetRenderer,
    _props$rowRenderer = props.rowRenderer,
    RowRenderer = _props$rowRenderer === void 0 ? _Row["default"] : _props$rowRenderer,
    _props$cellRenderer = props.cellRenderer,
    CellRenderer = _props$cellRenderer === void 0 ? _Cell["default"] : _props$cellRenderer,
    _props$valueViewer = props.valueViewer,
    ValueViewerComponent = _props$valueViewer === void 0 ? _ValueViewer["default"] : _props$valueViewer,
    _props$dataEditor = props.dataEditor,
    DataEditorComponent = _props$dataEditor === void 0 ? _DataEditor["default"] : _props$dataEditor,
    _props$parsePaste = props.parsePaste,
    parsePaste = _props$parsePaste === void 0 ? defaultParsePaste : _props$parsePaste,
    _props$isCellNavigabl = props.isCellNavigable,
    isCellNavigable = _props$isCellNavigabl === void 0 ? function () {
      return true;
    } : _props$isCellNavigabl,
    _props$disablePageCli = props.disablePageClick,
    disablePageClick = _props$disablePageCli === void 0 ? false : _props$disablePageCli,
    attributesRenderer = props.attributesRenderer,
    keyFn = props.keyFn,
    handleCopyProp = props.handleCopy,
    onCellsChanged = props.onCellsChanged,
    onChange = props.onChange,
    onContextMenu = props.onContextMenu,
    onSelect = props.onSelect,
    onPaste = props.onPaste,
    selectedProp = props.selected,
    editModeChanged = props.editModeChanged;
  var _useState = (0, _react.useState)(defaultState),
    _useState2 = _slicedToArray(_useState, 2),
    internalState = _useState2[0],
    setInternalState = _useState2[1];
  var dgDomRef = (0, _react.useRef)(null);
  var currentState = getCurrentState(internalState, props);
  var start = currentState.start,
    end = currentState.end,
    selecting = currentState.selecting,
    forceEdit = currentState.forceEdit,
    editing = currentState.editing,
    clear = currentState.clear;

  // --- Refs for potentially cycling callbacks --- //
  var pageClickRef = (0, _react.useRef)(function () {});
  var handleMouseUpRef = (0, _react.useRef)(function () {});
  var handleCutInternalRef = (0, _react.useRef)(function () {});
  var handleCopyInternalRef = (0, _react.useRef)(function () {});
  var handlePasteInternalRef = (0, _react.useRef)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  var handleIEClipboardEventsRef = (0, _react.useRef)(function () {});

  // --- State Update Proxy (Put before handlers that use it) --- //
  var setStateProxy = (0, _react.useCallback)(function (newState) {
    setInternalState(function (prevState) {
      var nextInternalState = _objectSpread(_objectSpread({}, prevState), newState);
      if (editModeChanged && newState.editing !== undefined) {
        var wasEditing = !isEmpty(prevState.editing);
        var willBeEditing = !isEmpty(newState.editing);
        if (wasEditing !== willBeEditing) {
          editModeChanged(willBeEditing);
        }
      }
      if (isSelectionControlled(props)) {
        var selectionUpdate = {};
        if (newState.start !== undefined) selectionUpdate.start = newState.start;
        if (newState.end !== undefined) selectionUpdate.end = newState.end;
        if (Object.keys(selectionUpdate).length > 0 && onSelect) {
          var currentSelection = props.selected || {
            start: defaultState.start,
            end: defaultState.end
          };
          var nextSelection = _objectSpread(_objectSpread({}, currentSelection), selectionUpdate);
          onSelect(nextSelection);
        }

        // Return previous state merged only with non-selection updates
        var nonSelectionUpdates = _objectSpread({}, newState);
        delete nonSelectionUpdates.start;
        delete nonSelectionUpdates.end;
        return _objectSpread(_objectSpread({}, prevState), nonSelectionUpdates);
      } else {
        // Uncontrolled: update internal state fully
        if (onSelect && (newState.start || newState.end)) {
          var _nextSelection = {
            start: newState.start || prevState.start,
            end: newState.end || prevState.end
          };
          if (_nextSelection.start !== prevState.start || _nextSelection.end !== prevState.end) {
            onSelect(_nextSelection);
          }
        }
        return nextInternalState;
      }
    });
  }, [props, editModeChanged, onSelect]);

  // --- Render Helpers (Put before handlers that use them) --- //
  var isSelected = (0, _react.useCallback)(function (i, j) {
    var _getCurrentState = getCurrentState(internalState, props),
      cs = _getCurrentState.start,
      ce = _getCurrentState.end;
    if (isEmpty(cs) || isEmpty(ce)) return false;
    var posX = j >= cs.j && j <= ce.j;
    var negX = j <= cs.j && j >= ce.j;
    var posY = i >= cs.i && i <= ce.i;
    var negY = i <= cs.i && i >= ce.i;
    return posX && posY || negX && posY || negX && negY || posX && negY;
  }, [internalState, props]);
  var isSelectedRow = (0, _react.useCallback)(function (rowIndex) {
    var _getCurrentState2 = getCurrentState(internalState, props),
      cs = _getCurrentState2.start,
      ce = _getCurrentState2.end;
    if (isEmpty(cs) || isEmpty(ce)) return false;
    return cs.i <= ce.i ? rowIndex >= cs.i && rowIndex <= ce.i : rowIndex <= cs.i && rowIndex >= ce.i;
  }, [internalState, props]);
  var isCellEditing = (0, _react.useCallback)(function (i, j) {
    return internalState.editing.i === i && internalState.editing.j === j;
  }, [internalState.editing]);
  var isCellClearing = (0, _react.useCallback)(function (i, j) {
    return internalState.clear.i === i && internalState.clear.j === j;
  }, [internalState.clear]);
  var getSelectedCells = (0, _react.useCallback)(function (currentData, startCell, endCell) {
    var selected = [];
    range(startCell.i, endCell.i).forEach(function (row) {
      range(startCell.j, endCell.j).forEach(function (col) {
        var _currentData$row;
        if ((_currentData$row = currentData[row]) !== null && _currentData$row !== void 0 && _currentData$row[col]) {
          selected.push({
            cell: currentData[row][col],
            row: row,
            col: col
          });
        }
      });
    });
    return selected;
  }, []);

  // --- Define removeAllListeners FIRST, using refs for handlers --- //
  var removeAllListeners = (0, _react.useCallback)(function () {
    // Use refs to access the latest versions of handlers
    document.removeEventListener('mousedown', pageClickRef.current);
    document.removeEventListener('mouseup', handleMouseUpRef.current);
    document.removeEventListener('cut', handleCutInternalRef.current);
    document.removeEventListener('copy', handleCopyInternalRef.current);
    document.removeEventListener('paste', handlePasteInternalRef.current);
    document.removeEventListener('keydown', handleIEClipboardEventsRef.current);
  }, []); // Empty deps because refs are stable

  // --- Define handlers and assign to refs --- //
  // Define pageClick and handleMouseUp *after* removeAllListeners
  var pageClick = (0, _react.useCallback)(function (e) {
    if (disablePageClick) return;
    var element = dgDomRef.current;
    if (element && !element.contains(e.target)) {
      setStateProxy(_objectSpread({}, defaultState));
      removeAllListeners(); // Now defined and stable
    }
  }, [disablePageClick, setStateProxy, removeAllListeners]); // Add removeAllListeners here
  // Update ref in effect
  (0, _react.useEffect)(function () {
    pageClickRef.current = pageClick;
  }, [pageClick]);
  var handleMouseUp = (0, _react.useCallback)(function () {
    setStateProxy({
      selecting: false
    });
    document.removeEventListener('mouseup', handleMouseUpRef.current); // Use ref for removal
  }, [setStateProxy]);
  // Update ref in effect
  (0, _react.useEffect)(function () {
    handleMouseUpRef.current = handleMouseUp;
  }, [handleMouseUp]);

  // --- Clipboard Handlers (Define and update refs) --- //
  var handleCopyInternal = (0, _react.useCallback)(function (e) {
    if (isEmpty(editing)) {
      e.preventDefault();
      var _getCurrentState3 = getCurrentState(internalState, props),
        cs = _getCurrentState3.start,
        ce = _getCurrentState3.end;
      if (handleCopyProp) {
        handleCopyProp({
          event: e,
          dataRenderer: dataRenderer,
          valueRenderer: valueRenderer,
          data: data,
          start: cs,
          end: ce,
          range: range
        });
      } else {
        var text = range(cs.i, ce.i).map(function (i) {
          return range(cs.j, ce.j).map(function (j) {
            var _data$i;
            var cell = (_data$i = data[i]) === null || _data$i === void 0 ? void 0 : _data$i[j];
            if (!cell) return '';
            var value = dataRenderer ? dataRenderer(cell, i, j) : null;
            if (value === '' || value === null || typeof value === 'undefined') {
              // Safely convert ReactNode to string if necessary
              var renderedValue = valueRenderer(cell, i, j);
              return typeof renderedValue === 'string' || typeof renderedValue === 'number' ? String(renderedValue) : '';
            }
            return String(value);
          }).join('\t');
        }).join('\n');
        try {
          var _clipboardData, _clipboardData3;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)["catch"](function (err) {
              return console.error('Async clipboard write failed:', err);
            });
          } else if ((_clipboardData = e.clipboardData) !== null && _clipboardData !== void 0 && _clipboardData.setData) {
            var _clipboardData2;
            (_clipboardData2 = e.clipboardData) === null || _clipboardData2 === void 0 || _clipboardData2.setData('text/plain', text);
          } else if ((_clipboardData3 = window.clipboardData) !== null && _clipboardData3 !== void 0 && _clipboardData3.setData) {
            var _clipboardData4;
            (_clipboardData4 = window.clipboardData) === null || _clipboardData4 === void 0 || _clipboardData4.setData('Text', text);
          }
        } catch (err) {
          console.error('Clipboard API failed:', err);
        }
      }
    }
  }, [editing, internalState, props, handleCopyProp, dataRenderer, valueRenderer, data]);
  (0, _react.useEffect)(function () {
    handleCopyInternalRef.current = handleCopyInternal;
  }, [handleCopyInternal]);
  var clearSelectedCells = (0, _react.useCallback)(function (startCell, endCell) {
    var cellsToClear = getSelectedCells(data, startCell, endCell).filter(function (_ref3) {
      var cell = _ref3.cell;
      return !cell.readOnly;
    }).map(function (_ref4) {
      var cell = _ref4.cell,
        row = _ref4.row,
        col = _ref4.col;
      return {
        cell: cell,
        row: row,
        col: col,
        value: ''
      };
    });
    if (onCellsChanged) {
      onCellsChanged(cellsToClear);
    } else if (onChange) {
      setTimeout(function () {
        cellsToClear.forEach(function (_ref5) {
          var cell = _ref5.cell,
            row = _ref5.row,
            col = _ref5.col,
            value = _ref5.value;
          onChange(cell, row, col, value);
        });
      }, 0);
    }
    setStateProxy({
      editing: {
        i: -1,
        j: -1
      }
    }); // Exit edit mode after clearing
  }, [data, onCellsChanged, onChange, setStateProxy, getSelectedCells]);
  var handleCutInternal = (0, _react.useCallback)(function (e) {
    if (isEmpty(editing)) {
      e.preventDefault();
      handleCopyInternal(e);
      var _getCurrentState4 = getCurrentState(internalState, props),
        cs = _getCurrentState4.start,
        ce = _getCurrentState4.end;
      clearSelectedCells(cs, ce);
    }
  }, [editing, internalState, props, clearSelectedCells, handleCopyInternal]);
  (0, _react.useEffect)(function () {
    handleCutInternalRef.current = handleCutInternal;
  }, [handleCutInternal]);
  var handlePasteInternal = (0, _react.useCallback)(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var _getCurrentState5, cs, pastedText, _clipboardData5, _clipboardData7, _clipboardData6, _clipboardData8, pasteData, newEnd, changes, additions, structuredChanges;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!isEmpty(editing)) {
              _context2.next = 22;
              break;
            }
            e.preventDefault();
            _getCurrentState5 = getCurrentState(internalState, props), cs = _getCurrentState5.start;
            pastedText = '';
            _context2.prev = 4;
            if (!(navigator.clipboard && navigator.clipboard.readText)) {
              _context2.next = 11;
              break;
            }
            _context2.next = 8;
            return navigator.clipboard.readText();
          case 8:
            pastedText = _context2.sent;
            _context2.next = 12;
            break;
          case 11:
            if ((_clipboardData5 = e.clipboardData) !== null && _clipboardData5 !== void 0 && _clipboardData5.getData) {
              pastedText = ((_clipboardData6 = e.clipboardData) === null || _clipboardData6 === void 0 ? void 0 : _clipboardData6.getData('text/plain')) || '';
            } else if ((_clipboardData7 = window.clipboardData) !== null && _clipboardData7 !== void 0 && _clipboardData7.getData) {
              pastedText = (_clipboardData8 = window.clipboardData) === null || _clipboardData8 === void 0 ? void 0 : _clipboardData8.getData('Text');
            }
          case 12:
            _context2.next = 18;
            break;
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](4);
            console.error('Clipboard read failed:', _context2.t0);
            return _context2.abrupt("return");
          case 18:
            pasteData = parsePaste(pastedText || '');
            newEnd = _objectSpread({}, cs);
            if (onCellsChanged) {
              changes = [];
              additions = [];
              pasteData.forEach(function (row, i) {
                row.forEach(function (value, j) {
                  var _data$targetRow;
                  var targetRow = cs.i + i;
                  var targetCol = cs.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  };
                  var cell = (_data$targetRow = data[targetRow]) === null || _data$targetRow === void 0 ? void 0 : _data$targetRow[targetCol];
                  if (!cell) {
                    additions.push({
                      row: targetRow,
                      col: targetCol,
                      value: value
                    });
                  } else if (!cell.readOnly) {
                    changes.push({
                      cell: cell,
                      row: targetRow,
                      col: targetCol,
                      value: value
                    });
                  }
                });
              });
              onCellsChanged(changes, additions.length ? additions : undefined);
            } else if (onPaste) {
              structuredChanges = [];
              pasteData.forEach(function (row, i) {
                var rowData = [];
                row.forEach(function (pastedValue, j) {
                  var _data$targetRow2;
                  var targetRow = cs.i + i;
                  var targetCol = cs.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  };
                  var cell = (_data$targetRow2 = data[targetRow]) === null || _data$targetRow2 === void 0 ? void 0 : _data$targetRow2[targetCol];
                  rowData.push({
                    cell: cell,
                    data: pastedValue
                  });
                });
                structuredChanges.push(rowData);
              });
              onPaste(structuredChanges);
            } else if (onChange) {
              pasteData.forEach(function (row, i) {
                row.forEach(function (value, j) {
                  var _data$targetRow3;
                  var targetRow = cs.i + i;
                  var targetCol = cs.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  };
                  var cell = (_data$targetRow3 = data[targetRow]) === null || _data$targetRow3 === void 0 ? void 0 : _data$targetRow3[targetCol];
                  if (cell && !cell.readOnly) {
                    onChange(cell, targetRow, targetCol, value);
                  }
                });
              });
            }
            setStateProxy({
              start: cs,
              end: newEnd
            });
          case 22:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 14]]);
    }));
    return function (_x) {
      return _ref6.apply(this, arguments);
    };
  }(), [editing, internalState, props, parsePaste, onCellsChanged, onPaste, onChange, data, setStateProxy]);
  (0, _react.useEffect)(function () {
    handlePasteInternalRef.current = handlePasteInternal;
  }, [handlePasteInternal]);
  var handleIEClipboardEvents = (0, _react.useCallback)(function (e) {
    if (e.ctrlKey) {
      if (e.key === 'c' || e.key === 'C') {
        handleCopyInternal(e);
      } else if (e.key === 'x' || e.key === 'X') {
        handleCutInternal(e);
      } else if (e.key === 'v' || e.key === 'V') {
        handlePasteInternal(e);
      }
    }
  }, [handleCopyInternal, handleCutInternal, handlePasteInternal]);
  (0, _react.useEffect)(function () {
    handleIEClipboardEventsRef.current = handleIEClipboardEvents;
  }, [handleIEClipboardEvents]);

  // --- Navigation and Cell Interaction Handlers --- //
  var searchForNextSelectablePos = (0, _react.useCallback)(function (currentStart, offsets, jumpRow) {
    var isCellDefined = function isCellDefined(_ref7) {
      var _data$i2;
      var i = _ref7.i,
        j = _ref7.j;
      return ((_data$i2 = data[i]) === null || _data$i2 === void 0 ? void 0 : _data$i2[j]) !== undefined;
    };
    var previousRow = function previousRow(loc) {
      return {
        i: loc.i - 1,
        j: data[0] ? data[0].length - 1 : 0
      };
    };
    var nextRow = function nextRow(loc) {
      return {
        i: loc.i + 1,
        j: 0
      };
    };
    var advanceOffset = function advanceOffset(loc) {
      return {
        i: loc.i + offsets.i,
        j: loc.j + offsets.j
      };
    };
    var newLocation = advanceOffset(currentStart);
    while (isCellDefined(newLocation)) {
      var cell = data[newLocation.i][newLocation.j];
      if (isCellNavigable(cell, newLocation.i, newLocation.j)) {
        break;
      }
      newLocation = advanceOffset(newLocation);
    }
    if (!isCellDefined(newLocation)) {
      if (!jumpRow) return null;
      newLocation = offsets.j < 0 ? previousRow(newLocation) : nextRow(newLocation);
    }
    if (!isCellDefined(newLocation)) return null;
    var finalCell = data[newLocation.i][newLocation.j];
    if (!isCellNavigable(finalCell, newLocation.i, newLocation.j)) {
      return searchForNextSelectablePos(newLocation, offsets, jumpRow);
    }
    return newLocation;
  }, [data, isCellNavigable]);
  var updateLocationSingleCell = (0, _react.useCallback)(function (location) {
    setStateProxy({
      start: location,
      end: location,
      editing: {
        i: -1,
        j: -1
      }
    });
  }, [setStateProxy]);
  var updateLocationMultipleCells = (0, _react.useCallback)(function (offsets) {
    var _getCurrentState6 = getCurrentState(internalState, props),
      cs = _getCurrentState6.start,
      ce = _getCurrentState6.end;
    var rowCount = data.length;
    var colCount = data[0] ? data[0].length : 0;
    var newEndLocation = {
      i: Math.min(rowCount - 1, Math.max(0, ce.i + offsets.i)),
      j: Math.min(colCount - 1, Math.max(0, ce.j + offsets.j))
    };
    setStateProxy({
      start: cs,
      end: newEndLocation,
      editing: {
        i: -1,
        j: -1
      }
    });
  }, [internalState, props, data, setStateProxy]);
  var handleNavigate = (0, _react.useCallback)(function (e, offsets) {
    var jumpRow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (offsets && (offsets.i || offsets.j)) {
      var _getCurrentState7 = getCurrentState(internalState, props),
        cs = _getCurrentState7.start;
      var multiSelect = e.shiftKey && !jumpRow;
      if (multiSelect) {
        updateLocationMultipleCells(offsets);
      } else {
        var newLocation = searchForNextSelectablePos(cs, offsets, jumpRow);
        if (newLocation) {
          updateLocationSingleCell(newLocation);
        }
      }
      e.preventDefault();
    }
  }, [internalState, props, updateLocationMultipleCells, searchForNextSelectablePos, updateLocationSingleCell]);
  var handleKeyboardCellMovement = (0, _react.useCallback)(function (e) {
    var _data$cs$i;
    var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var _getCurrentState8 = getCurrentState(internalState, props),
      cs = _getCurrentState8.start,
      ed = _getCurrentState8.editing;
    var isCurrentlyEditing = !isEmpty(ed);
    var currentCell = (_data$cs$i = data[cs.i]) === null || _data$cs$i === void 0 ? void 0 : _data$cs$i[cs.j];
    if (isCurrentlyEditing && !commit) {
      return;
    }
    var keyCode = e.which || e.keyCode;
    var hasComponent = currentCell === null || currentCell === void 0 ? void 0 : currentCell.component;
    if (hasComponent && isCurrentlyEditing && !commit) {
      e.preventDefault();
      return;
    }
    var offsets = {
      i: 0,
      j: 0
    };
    var shouldJumpRow = false;
    switch (keyCode) {
      case _keys.TAB_KEY:
        offsets.j = e.shiftKey ? -1 : 1;
        shouldJumpRow = true;
        break;
      case _keys.RIGHT_KEY:
        offsets.j = 1;
        break;
      case _keys.LEFT_KEY:
        offsets.j = -1;
        break;
      case _keys.UP_KEY:
        offsets.i = -1;
        break;
      case _keys.DOWN_KEY:
        offsets.i = 1;
        break;
      case _keys.ENTER_KEY:
        if (commit) {
          offsets.i = e.shiftKey ? -1 : 1;
        }
        break;
      default:
        return;
    }
    if (offsets.i || offsets.j) {
      handleNavigate(e, offsets, shouldJumpRow);
    }
  }, [internalState, props, data, handleNavigate]);
  var handleCellMouseDown = (0, _react.useCallback)(function (i, j, e) {
    var currentSelState = getCurrentState(internalState, props);
    var isEditingSameCell = !isEmpty(currentSelState.editing) && currentSelState.editing.i === i && currentSelState.editing.j === j;
    var newEditingState = isEmpty(currentSelState.editing) || currentSelState.editing.i !== i || currentSelState.editing.j !== j ? {
      i: -1,
      j: -1
    } : currentSelState.editing;
    setStateProxy({
      selecting: !isEditingSameCell,
      start: e.shiftKey ? currentSelState.start : {
        i: i,
        j: j
      },
      end: {
        i: i,
        j: j
      },
      editing: newEditingState,
      forceEdit: !!isEditingSameCell
    });
    document.addEventListener('mouseup', handleMouseUpRef.current);
    document.addEventListener('mousedown', pageClickRef.current);
    document.addEventListener('cut', handleCutInternalRef.current);
    document.addEventListener('copy', handleCopyInternalRef.current);
    document.addEventListener('paste', handlePasteInternalRef.current);
    if (/MSIE|Trident/.test(window.navigator.userAgent)) {
      document.addEventListener('keydown', handleIEClipboardEventsRef.current);
    }
  }, [internalState, props, setStateProxy, pageClickRef, handleMouseUpRef, handleCutInternalRef, handleCopyInternalRef, handlePasteInternalRef, handleIEClipboardEventsRef]);
  var handleCellMouseOver = (0, _react.useCallback)(function (i, j) {
    if (internalState.selecting && isEmpty(internalState.editing)) {
      setStateProxy({
        end: {
          i: i,
          j: j
        }
      });
    }
  }, [internalState.selecting, internalState.editing, setStateProxy]);
  var handleCellDoubleClick = (0, _react.useCallback)(function (i, j) {
    var _data$i3;
    var cell = (_data$i3 = data[i]) === null || _data$i3 === void 0 ? void 0 : _data$i3[j];
    if (cell && !cell.readOnly) {
      setStateProxy({
        editing: {
          i: i,
          j: j
        },
        forceEdit: true,
        clear: {
          i: -1,
          j: -1
        }
      });
    }
  }, [data, setStateProxy]);
  var handleCellContextMenu = (0, _react.useCallback)(function (e, i, j) {
    var _data$i4;
    var cell = (_data$i4 = data[i]) === null || _data$i4 === void 0 ? void 0 : _data$i4[j];
    if (onContextMenu && cell) {
      onContextMenu(e, cell, i, j);
    }
  }, [data, onContextMenu]);
  var handleCellChange = (0, _react.useCallback)(function (row, col, value) {
    var _data$row;
    var cell = (_data$row = data[row]) === null || _data$row === void 0 ? void 0 : _data$row[col];
    if (!cell) return;
    if (onCellsChanged) {
      onCellsChanged([{
        cell: cell,
        row: row,
        col: col,
        value: value
      }]);
    } else if (onChange) {
      onChange(cell, row, col, value);
    }
    setStateProxy({
      editing: {
        i: -1,
        j: -1
      }
    });
  }, [data, onChange, onCellsChanged, setStateProxy]);

  // --- Grid Container KeyDown Handler (Depends on many handlers above) --- //
  var handleGridKeyDown = (0, _react.useCallback)(function (e) {
    if (e.isPropagationStopped && e.isPropagationStopped()) return;
    var _getCurrentState9 = getCurrentState(internalState, props),
      cs = _getCurrentState9.start,
      ce = _getCurrentState9.end,
      ed = _getCurrentState9.editing;
    var isCurrentlyEditing = !isEmpty(ed);
    var noCellsSelected = isEmpty(cs);
    var ctrlKeyPressed = e.ctrlKey || e.metaKey;
    var keyCode = e.which || e.keyCode;
    if (noCellsSelected || ctrlKeyPressed) {
      // Use React KeyboardEvent type for broader compatibility check
      var reactKeyEvent = e;
      if (ctrlKeyPressed && (reactKeyEvent.key === 'c' || reactKeyEvent.key === 'C')) {
        handleCopyInternal(e);
        return;
      }
      if (ctrlKeyPressed && (reactKeyEvent.key === 'x' || reactKeyEvent.key === 'X')) {
        handleCutInternal(e);
        return;
      }
      if (ctrlKeyPressed && (reactKeyEvent.key === 'v' || reactKeyEvent.key === 'V')) {
        handlePasteInternal(e);
        return;
      }
      if (ctrlKeyPressed) return;
      if (noCellsSelected) return;
    }
    if (!isCurrentlyEditing) {
      var _data$cs$i2;
      handleKeyboardCellMovement(e);
      var deleteKeysPressed = keyCode === _keys.DELETE_KEY || keyCode === _keys.BACKSPACE_KEY;
      if (deleteKeysPressed) {
        e.preventDefault();
        clearSelectedCells(cs, ce);
      }
      var currentCell = (_data$cs$i2 = data[cs.i]) === null || _data$cs$i2 === void 0 ? void 0 : _data$cs$i2[cs.j];
      if (currentCell && !currentCell.readOnly) {
        if (keyCode === _keys.ENTER_KEY) {
          setStateProxy({
            editing: cs,
            clear: {
              i: -1,
              j: -1
            },
            forceEdit: true
          });
          e.preventDefault();
        } else {
          var isCharKey = keyCode >= 48 && keyCode <= 90 || keyCode >= 96 && keyCode <= 105 || keyCode >= 186 && keyCode <= 222;
          if (isCharKey && !ctrlKeyPressed) {
            setStateProxy({
              editing: cs,
              clear: cs,
              forceEdit: false
            });
          }
        }
      }
    } else {
      var _data$ed$i;
      var _currentCell = (_data$ed$i = data[ed.i]) === null || _data$ed$i === void 0 ? void 0 : _data$ed$i[ed.j];
      if (_currentCell !== null && _currentCell !== void 0 && _currentCell.component) {
        var offset = e.shiftKey ? -1 : 1;
        var func = null;
        if (keyCode === _keys.ESCAPE_KEY) {
          func = function func() {
            return setStateProxy({
              editing: {
                i: -1,
                j: -1
              }
            });
          };
        } else if (keyCode === _keys.ENTER_KEY) {
          func = function func() {
            return handleNavigate(e, {
              i: offset,
              j: 0
            });
          };
        } else if (keyCode === _keys.TAB_KEY) {
          func = function func() {
            return handleNavigate(e, {
              i: 0,
              j: offset
            }, true);
          };
        }
        if (func) {
          e.preventDefault();
          setTimeout(function () {
            var _func, _dgDomRef$current;
            (_func = func) === null || _func === void 0 || _func();
            (_dgDomRef$current = dgDomRef.current) === null || _dgDomRef$current === void 0 || _dgDomRef$current.focus({
              preventScroll: true
            });
          }, 1);
        }
      }
    }
  }, [internalState, props, data, handleKeyboardCellMovement, clearSelectedCells, setStateProxy, handleNavigate, handleCopyInternal, handleCutInternal, handlePasteInternal]);

  // --- Effects --- //
  (0, _react.useEffect)(function () {
    return function () {
      removeAllListeners(); // Call the stable function directly
    };
  }, [removeAllListeners]);

  // --- Render --- //
  return /*#__PURE__*/_react["default"].createElement("span", {
    ref: dgDomRef,
    tabIndex: 0,
    className: "data-grid-container",
    onKeyDown: handleGridKeyDown
  }, /*#__PURE__*/_react["default"].createElement(SheetRenderer, {
    data: data,
    className: ['data-grid', className, overflow].filter(Boolean).join(' ')
  }, data.map(function (row, i) {
    return /*#__PURE__*/_react["default"].createElement(RowRenderer, {
      key: keyFn ? keyFn(i) : i,
      row: i,
      cells: row,
      selected: isSelectedRow(i)
    }, row.map(function (cell, j) {
      var _cell$key;
      var editingStatus = isCellEditing(i, j);
      var clearingStatus = isCellClearing(i, j);
      var selectionStatus = isSelected(i, j);
      var cellKey = (_cell$key = cell === null || cell === void 0 ? void 0 : cell.key) !== null && _cell$key !== void 0 ? _cell$key : "".concat(i, "-").concat(j);
      return /*#__PURE__*/_react["default"].createElement(_DataCell["default"], {
        key: cellKey,
        row: i,
        col: j,
        cell: cell,
        selected: selectionStatus,
        editing: editingStatus,
        clearing: clearingStatus,
        onMouseDown: handleCellMouseDown,
        onMouseOver: handleCellMouseOver,
        onDoubleClick: handleCellDoubleClick,
        onContextMenu: handleCellContextMenu,
        onChange: handleCellChange,
        onRevert: function onRevert() {
          return setStateProxy({
            editing: {
              i: -1,
              j: -1
            }
          });
        },
        onNavigate: handleKeyboardCellMovement,
        attributesRenderer: attributesRenderer,
        cellRenderer: CellRenderer,
        valueRenderer: valueRenderer,
        dataRenderer: dataRenderer,
        valueViewer: ValueViewerComponent,
        dataEditor: DataEditorComponent,
        forceEdit: editingStatus && forceEdit
      });
    }));
  })));
});

// Remove PropTypes
// DataSheet.propTypes = { ... };

DataSheet.displayName = 'DataSheet';
var _default = exports["default"] = DataSheet;
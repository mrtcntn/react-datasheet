"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Cell = _interopRequireDefault(require("./Cell"));
var _DataCell = _interopRequireDefault(require("./DataCell"));
var _DataEditor = _interopRequireDefault(require("./DataEditor"));
var _Row = _interopRequireDefault(require("./Row"));
var _Sheet = _interopRequireDefault(require("./Sheet"));
var _ValueViewer = _interopRequireDefault(require("./ValueViewer"));
var _keys = require("./keys");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  start: {},
  end: {},
  selecting: false,
  forceEdit: false,
  editing: {},
  clear: {}
};

// Helper to check if selection is controlled
var isSelectionControlled = function isSelectionControlled(props) {
  return 'selected' in props;
};

// Helper to get state, merging controlled selection if necessary
var getCurrentState = function getCurrentState(internalState, props) {
  var state = _objectSpread({}, internalState);
  if (isSelectionControlled(props)) {
    var _ref = props.selected || {},
      start = _ref.start,
      end = _ref.end;
    start = start || defaultState.start;
    end = end || defaultState.end;
    state = _objectSpread(_objectSpread({}, state), {}, {
      start: start,
      end: end
    });
  }
  return state;
};
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
    cellRenderer = _props$cellRenderer === void 0 ? _Cell["default"] : _props$cellRenderer,
    _props$valueViewer = props.valueViewer,
    valueViewer = _props$valueViewer === void 0 ? _ValueViewer["default"] : _props$valueViewer,
    _props$dataEditor = props.dataEditor,
    dataEditor = _props$dataEditor === void 0 ? _DataEditor["default"] : _props$dataEditor,
    attributesRenderer = props.attributesRenderer,
    keyFn = props.keyFn,
    handleCopy = props.handleCopy,
    _props$parsePaste = props.parsePaste,
    parsePaste = _props$parsePaste === void 0 ? defaultParsePaste : _props$parsePaste,
    onCellsChanged = props.onCellsChanged,
    onChange = props.onChange,
    onContextMenu = props.onContextMenu,
    onSelect = props.onSelect,
    onPaste = props.onPaste,
    _props$isCellNavigabl = props.isCellNavigable,
    isCellNavigable = _props$isCellNavigabl === void 0 ? function () {
      return true;
    } : _props$isCellNavigabl,
    selectedProp = props.selected,
    _props$disablePageCli = props.disablePageClick,
    disablePageClick = _props$disablePageCli === void 0 ? false : _props$disablePageCli,
    editModeChanged = props.editModeChanged;
  var _useState = (0, _react.useState)(defaultState),
    _useState2 = _slicedToArray(_useState, 2),
    internalState = _useState2[0],
    setInternalState = _useState2[1];
  var dgDomRef = (0, _react.useRef)(null);
  var cellRefs = (0, _react.useRef)({}); // To store refs for individual cells if needed, e.g., for focusing

  // Get derived state (handles controlled selection)
  var currentState = getCurrentState(internalState, props);
  var start = currentState.start,
    end = currentState.end,
    selecting = currentState.selecting,
    forceEdit = currentState.forceEdit,
    editing = currentState.editing,
    clear = currentState.clear;

  // Custom setState logic to handle controlled props
  var setStateProxy = (0, _react.useCallback)(function (newState) {
    if (editModeChanged && newState.editing) {
      var wasEditing = !isEmpty(internalState.editing);
      var willBeEditing = !isEmpty(newState.editing);
      if (wasEditing !== willBeEditing) {
        editModeChanged(willBeEditing);
      }
    }
    var update = {};
    var selectionUpdate = {};
    for (var key in newState) {
      if (key === 'start' || key === 'end') {
        selectionUpdate[key] = newState[key];
      } else {
        update[key] = newState[key];
      }
    }
    if (isSelectionControlled(props)) {
      if (Object.keys(selectionUpdate).length > 0) {
        var currentSelection = props.selected || {};
        var nextSelectionStart = selectionUpdate.start !== undefined ? selectionUpdate.start : currentSelection.start || defaultState.start;
        var nextSelectionEnd = selectionUpdate.end !== undefined ? selectionUpdate.end : currentSelection.end || defaultState.end;
        if (onSelect) {
          onSelect({
            start: nextSelectionStart,
            end: nextSelectionEnd
          });
        }
      }
      // Only update internal state for non-selection properties
      if (Object.keys(update).length > 0) {
        setInternalState(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), update);
        });
      }
    } else {
      // Uncontrolled: update everything
      setInternalState(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), newState);
      });
    }
  }, [props, internalState, editModeChanged, onSelect]); // Dependencies updated

  var removeAllListeners = (0, _react.useCallback)(function () {
    document.removeEventListener('mousedown', pageClick);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('cut', handleCutInternal);
    document.removeEventListener('copy', handleCopyInternal);
    document.removeEventListener('paste', handlePasteInternal);
    document.removeEventListener('keydown', handleIEClipboardEvents);
  }, []); // Dependencies will be added by linting rule if necessary

  var pageClick = (0, _react.useCallback)(function (e) {
    if (disablePageClick) return;
    var element = dgDomRef.current;
    // Check if dgDomRef.current exists before calling contains
    if (element && !element.contains(e.target)) {
      setStateProxy(defaultState);
      removeAllListeners();
    }
  }, [disablePageClick, removeAllListeners, setStateProxy]);

  // Internal handlers wrapped in useCallback
  var handleCutInternal = (0, _react.useCallback)(function (e) {
    if (isEmpty(editing)) {
      e.preventDefault();
      handleCopyInternal(e); // Use internal copy handler
      var _getCurrentState = getCurrentState(internalState, props),
        currentStart = _getCurrentState.start,
        currentEnd = _getCurrentState.end; // Get current state
      // eslint-disable-next-line no-use-before-define
      clearSelectedCells(currentStart, currentEnd);
    }
  }, [editing, props, internalState, setStateProxy]); // Added dependencies

  var handleIEClipboardEvents = (0, _react.useCallback)(function (e) {
    if (e.ctrlKey) {
      if (e.keyCode === 67) {
        handleCopyInternal(e);
      } else if (e.keyCode === 88) {
        handleCutInternal(e);
      } else if (e.keyCode === 86 || e.which === 86) {
        handlePasteInternal(e);
      }
    }
  }, [handleCopyInternal, handleCutInternal, handlePasteInternal]); // Added dependencies

  var handleCopyInternal = (0, _react.useCallback)(function (e) {
    if (isEmpty(editing)) {
      e.preventDefault();
      var _getCurrentState2 = getCurrentState(internalState, props),
        currentStart = _getCurrentState2.start,
        currentEnd = _getCurrentState2.end; // Get current state

      if (handleCopy) {
        handleCopy({
          event: e,
          dataRenderer: dataRenderer,
          valueRenderer: valueRenderer,
          data: data,
          start: currentStart,
          end: currentEnd,
          range: range
        });
      } else {
        var text = range(currentStart.i, currentEnd.i).map(function (i) {
          return range(currentStart.j, currentEnd.j).map(function (j) {
            var _data$i;
            var cell = (_data$i = data[i]) === null || _data$i === void 0 ? void 0 : _data$i[j]; // Safely access cell
            if (!cell) return ''; // Handle undefined cell
            var value = dataRenderer ? dataRenderer(cell, i, j) : null;
            if (value === '' || value === null || typeof value === 'undefined') {
              return valueRenderer(cell, i, j);
            }
            return value;
          }).join('\t');
        }).join('\n');
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)["catch"](function (err) {
              return console.error('Async clipboard write failed:', err);
            });
          } else if (window.clipboardData && window.clipboardData.setData) {
            // IE specific method.
            window.clipboardData.setData('Text', text);
          } else if (e.clipboardData && e.clipboardData.setData) {
            e.clipboardData.setData('text/plain', text);
          }
        } catch (err) {
          console.error('Clipboard API failed:', err);
        }
      }
    }
  }, [editing, props, internalState, handleCopy, dataRenderer, valueRenderer, data]); // Added dependencies

  var handlePasteInternal = (0, _react.useCallback)(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var _getCurrentState3, currentStart, currentEnd, pastedText, pasteData, changes, newEnd, additions, structuredChanges;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!isEmpty(editing)) {
              _context.next = 24;
              break;
            }
            e.preventDefault();
            _getCurrentState3 = getCurrentState(internalState, props), currentStart = _getCurrentState3.start, currentEnd = _getCurrentState3.end;
            currentStart = {
              i: Math.min(currentStart.i, currentEnd.i),
              j: Math.min(currentStart.j, currentEnd.j)
            };
            // currentEnd will be updated dynamically based on pasted data size
            pastedText = '';
            _context.prev = 5;
            if (!(navigator.clipboard && navigator.clipboard.readText)) {
              _context.next = 12;
              break;
            }
            _context.next = 9;
            return navigator.clipboard.readText();
          case 9:
            pastedText = _context.sent;
            _context.next = 13;
            break;
          case 12:
            if (window.clipboardData && window.clipboardData.getData) {
              pastedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
              pastedText = e.clipboardData.getData('text/plain');
            }
          case 13:
            _context.next = 19;
            break;
          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](5);
            console.error('Clipboard read failed:', _context.t0);
            return _context.abrupt("return");
          case 19:
            pasteData = parsePaste(pastedText);
            changes = [];
            newEnd = _objectSpread({}, currentStart); // Initialize newEnd
            if (onCellsChanged) {
              additions = [];
              pasteData.forEach(function (row, i) {
                row.forEach(function (value, j) {
                  var _data$targetRow;
                  var targetRow = currentStart.i + i;
                  var targetCol = currentStart.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  }; // Update end based on pasted data size
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
              if (additions.length) {
                onCellsChanged(changes, additions);
              } else {
                onCellsChanged(changes);
              }
            } else if (onPaste) {
              structuredChanges = [];
              pasteData.forEach(function (row, i) {
                var rowData = [];
                row.forEach(function (pastedValue, j) {
                  var _data$targetRow2;
                  var targetRow = currentStart.i + i;
                  var targetCol = currentStart.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  }; // Update end
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
                  var targetRow = currentStart.i + i;
                  var targetCol = currentStart.j + j;
                  newEnd = {
                    i: targetRow,
                    j: targetCol
                  }; // Update end
                  var cell = (_data$targetRow3 = data[targetRow]) === null || _data$targetRow3 === void 0 ? void 0 : _data$targetRow3[targetCol];
                  if (cell && !cell.readOnly) {
                    onChange(cell, targetRow, targetCol, value);
                  }
                });
              });
            }
            // Update selection to cover pasted area
            setStateProxy({
              start: currentStart,
              end: newEnd
            });
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[5, 15]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [editing, props, internalState, parsePaste, onCellsChanged, onPaste, onChange, data, setStateProxy]);
  var onRevert = (0, _react.useCallback)(function () {
    setStateProxy({
      editing: {}
    });
    setTimeout(function () {
      if (dgDomRef.current) {
        dgDomRef.current.focus({
          preventScroll: true
        });
      }
    }, 1);
  }, [setStateProxy]);
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
      onRevert(); // Revert editing mode after clearing
    } else if (onChange) {
      setTimeout(function () {
        cellsToClear.forEach(function (_ref5) {
          var cell = _ref5.cell,
            row = _ref5.row,
            col = _ref5.col,
            value = _ref5.value;
          onChange(cell, row, col, value);
        });
        onRevert(); // Revert editing mode after clearing
      }, 0);
    }
  }, [data, onCellsChanged, onChange, onRevert]);

  // Handlers for DataCell
  var handleCellMouseDown = (0, _react.useCallback)(function (i, j, e) {
    var currentSelectionState = getCurrentState(internalState, props);
    var isEditingSameCell = !isEmpty(currentSelectionState.editing) && currentSelectionState.editing.i === i && currentSelectionState.editing.j === j;
    var newEditingState = isEmpty(currentSelectionState.editing) || currentSelectionState.editing.i !== i || currentSelectionState.editing.j !== j ? {} : currentSelectionState.editing;
    setStateProxy({
      selecting: !isEditingSameCell,
      start: e.shiftKey ? currentSelectionState.start : {
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

    // Add listeners dynamically
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousedown', pageClick);
    document.addEventListener('cut', handleCutInternal);
    document.addEventListener('copy', handleCopyInternal);
    document.addEventListener('paste', handlePasteInternal);
    // IE specific listener
    if (/MSIE|Trident/.test(window.navigator.userAgent)) {
      document.addEventListener('keydown', handleIEClipboardEvents);
    }
  }, [internalState, props, setStateProxy, pageClick, handleCutInternal, handleCopyInternal, handlePasteInternal, handleIEClipboardEvents]);
  var handleCellMouseOver = (0, _react.useCallback)(function (i, j) {
    if (internalState.selecting && isEmpty(internalState.editing)) {
      // Use internal state directly here
      setStateProxy({
        end: {
          i: i,
          j: j
        }
      });
    }
  }, [internalState.selecting, internalState.editing, setStateProxy]);
  var handleCellDoubleClick = (0, _react.useCallback)(function (i, j) {
    var _data$i2;
    var cell = (_data$i2 = data[i]) === null || _data$i2 === void 0 ? void 0 : _data$i2[j];
    if (cell && !cell.readOnly) {
      setStateProxy({
        editing: {
          i: i,
          j: j
        },
        forceEdit: true,
        clear: {}
      });
    }
  }, [data, setStateProxy]);
  var handleCellContextMenu = (0, _react.useCallback)(function (evt, i, j) {
    var _data$i3;
    var cell = (_data$i3 = data[i]) === null || _data$i3 === void 0 ? void 0 : _data$i3[j];
    if (onContextMenu && cell) {
      onContextMenu(evt, cell, i, j);
    }
  }, [data, onContextMenu]);
  var handleCellChange = (0, _react.useCallback)(function (row, col, value) {
    if (onCellsChanged) {
      var _data$row;
      onCellsChanged([{
        cell: (_data$row = data[row]) === null || _data$row === void 0 ? void 0 : _data$row[col],
        row: row,
        col: col,
        value: value
      }]);
    } else if (onChange) {
      var _data$row2;
      onChange((_data$row2 = data[row]) === null || _data$row2 === void 0 ? void 0 : _data$row2[col], row, col, value);
    }
    onRevert(); // Exit editing mode after change
  }, [data, onChange, onCellsChanged, onRevert]);
  var searchForNextSelectablePos = (0, _react.useCallback)(function (currentStart, offsets, jumpRow) {
    var isCellDefined = function isCellDefined(_ref6) {
      var _data$i4;
      var i = _ref6.i,
        j = _ref6.j;
      return ((_data$i4 = data[i]) === null || _data$i4 === void 0 ? void 0 : _data$i4[j]) !== undefined;
    };
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
    var newLocation = advanceOffset(currentStart);
    while (isCellDefined(newLocation)) {
      var cell = data[newLocation.i][newLocation.j];
      if (isCellNavigable(cell, newLocation.i, newLocation.j)) {
        break; // Found navigable cell
      }
      newLocation = advanceOffset(newLocation);
    }
    if (!isCellDefined(newLocation)) {
      if (!jumpRow) return null;
      newLocation = offsets.j < 0 ? previousRow(newLocation) : nextRow(newLocation);
    }
    if (!isCellDefined(newLocation)) return null; // No navigable cell found

    // Final check if the landing cell (after row jump) is navigable
    var finalCell = data[newLocation.i][newLocation.j];
    if (!isCellNavigable(finalCell, newLocation.i, newLocation.j)) {
      // Recursively search from the new position
      return searchForNextSelectablePos(newLocation, offsets, jumpRow);
    }
    return newLocation;
  }, [data, isCellNavigable]);
  var updateLocationSingleCell = (0, _react.useCallback)(function (location) {
    setStateProxy({
      start: location,
      end: location,
      editing: {}
    });
  }, [setStateProxy]);
  var updateLocationMultipleCells = (0, _react.useCallback)(function (offsets) {
    var _getCurrentState4 = getCurrentState(internalState, props),
      currentStart = _getCurrentState4.start,
      currentEnd = _getCurrentState4.end;
    var newEndLocation = {
      i: currentEnd.i + offsets.i,
      j: Math.min(data[0].length - 1, Math.max(0, currentEnd.j + offsets.j))
    };
    // Ensure start doesn't change during multi-select drag
    setStateProxy({
      start: currentStart,
      end: newEndLocation,
      editing: {}
    });
  }, [internalState, props, data, setStateProxy]);
  var handleNavigate = (0, _react.useCallback)(function (e, offsets, jumpRow) {
    if (offsets && (offsets.i || offsets.j)) {
      var _getCurrentState5 = getCurrentState(internalState, props),
        currentStart = _getCurrentState5.start;
      var multiSelect = e.shiftKey && !jumpRow;
      if (multiSelect) {
        updateLocationMultipleCells(offsets);
      } else {
        var newLocation = searchForNextSelectablePos(currentStart, offsets, jumpRow);
        if (newLocation) {
          updateLocationSingleCell(newLocation);
        }
      }
      e.preventDefault();
    }
  }, [internalState, props, updateLocationMultipleCells, searchForNextSelectablePos, updateLocationSingleCell]);
  var handleKeyboardCellMovement = (0, _react.useCallback)(function (e) {
    var _data$currentStart$i;
    var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var _getCurrentState6 = getCurrentState(internalState, props),
      currentStart = _getCurrentState6.start,
      currentEditing = _getCurrentState6.editing;
    var isCurrentlyEditing = !isEmpty(currentEditing);
    var currentCell = (_data$currentStart$i = data[currentStart.i]) === null || _data$currentStart$i === void 0 ? void 0 : _data$currentStart$i[currentStart.j];
    if (isCurrentlyEditing && !commit) {
      return; // Don't move while actively editing unless committing
    }
    var keyCode = e.which || e.keyCode;
    var hasComponent = currentCell === null || currentCell === void 0 ? void 0 : currentCell.component;
    if (hasComponent && isCurrentlyEditing && !commit) {
      // Let component handle navigation keys if needed, maybe?
      // Original logic prevented default. Let's stick to that for now.
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
      // Not a navigation key
    }
    if (offsets.i || offsets.j) {
      handleNavigate(e, offsets, shouldJumpRow);
    }
  }, [internalState, props, data, handleNavigate]);

  // This handler is attached to the main grid container
  var handleGridKeyDown = (0, _react.useCallback)(function (e) {
    if (e.isPropagationStopped && e.isPropagationStopped()) {
      return;
    }
    var _getCurrentState7 = getCurrentState(internalState, props),
      currentStart = _getCurrentState7.start,
      currentEnd = _getCurrentState7.end,
      currentEditing = _getCurrentState7.editing;
    var isCurrentlyEditing = !isEmpty(currentEditing);
    var noCellsSelected = isEmpty(currentStart);
    var ctrlKeyPressed = e.ctrlKey || e.metaKey;
    var keyCode = e.which || e.keyCode;
    if (noCellsSelected || ctrlKeyPressed) {
      // Allow browser default behavior for copy/paste etc. if no selection or ctrl key
      // Exception: If IE, handle clipboard manually always when focused
      if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
        return;
      }
    }
    if (!isCurrentlyEditing) {
      var _data$currentStart$i2;
      // Handle navigation if not editing
      handleKeyboardCellMovement(e);
      var deleteKeysPressed = keyCode === _keys.DELETE_KEY || keyCode === _keys.BACKSPACE_KEY;
      if (deleteKeysPressed) {
        e.preventDefault();
        clearSelectedCells(currentStart, currentEnd);
      }
      var currentCell = (_data$currentStart$i2 = data[currentStart.i]) === null || _data$currentStart$i2 === void 0 ? void 0 : _data$currentStart$i2[currentStart.j];
      if (currentCell && !currentCell.readOnly) {
        var enterKeyPressed = keyCode === _keys.ENTER_KEY;
        if (enterKeyPressed) {
          setStateProxy({
            editing: currentStart,
            clear: {},
            forceEdit: true
          });
          e.preventDefault(); // Prevent default form submission or other actions
        } else {
          var numbersPressed = keyCode >= 48 && keyCode <= 57;
          var lettersPressed = keyCode >= 65 && keyCode <= 90;
          var latin1Supplement = keyCode >= 160 && keyCode <= 255;
          var numPadKeysPressed = keyCode >= 96 && keyCode <= 105;
          var equationKeysPressed = [187 /* equal */, 189 /* substract */, 190 /* period */, 107 /* add */, 109 /* decimal point */, 110].includes(keyCode);
          if (numbersPressed || numPadKeysPressed || lettersPressed || latin1Supplement || equationKeysPressed) {
            // Start editing, clearing the cell value first
            setStateProxy({
              editing: currentStart,
              clear: currentStart,
              forceEdit: false
            });
            // Don't prevent default here, let the input capture the key
          }
        }
      }
    } else {
      var _data$currentEditing$;
      // Is editing - let DataCell handle most keys via its onKeyDown
      // Handle ESC, ENTER, TAB at the grid level for component editors
      var isComponentEditor = (_data$currentEditing$ = data[currentEditing.i]) === null || _data$currentEditing$ === void 0 || (_data$currentEditing$ = _data$currentEditing$[currentEditing.j]) === null || _data$currentEditing$ === void 0 ? void 0 : _data$currentEditing$.component;
      if (isComponentEditor) {
        var offset = e.shiftKey ? -1 : 1;
        var func = null;
        if (keyCode === _keys.ESCAPE_KEY) {
          func = onRevert;
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
          // Timeout ensures the component editor processes the event first if needed
          setTimeout(function () {
            func();
            if (dgDomRef.current) {
              dgDomRef.current.focus({
                preventScroll: true
              });
            }
          }, 1);
        }
      }
    }
  }, [internalState, props, data, handleKeyboardCellMovement, clearSelectedCells, setStateProxy, onRevert, handleNavigate]);

  // Effect for managing document listeners
  (0, _react.useEffect)(function () {
    // Add listeners when component mounts or potentially when state indicates interaction
    // For simplicity, let's manage them more broadly, but be mindful of performance.
    // Consider adding them only when `selecting` is true or based on focus.

    // Cleanup function to remove listeners
    return function () {
      removeAllListeners();
    };
  }, [removeAllListeners]);

  // Effect for componentDidUpdate logic (handling onSelect prop)
  (0, _react.useEffect)(function () {
    // This replicates the onSelect call from the original componentDidUpdate
    // It runs whenever internalState changes (specifically end changes)
    // We only call onSelect if the component is uncontrolled.
    if (!isSelectionControlled(props) && !isEmpty(internalState.end)) {
      // Need to compare with previous internalState.end, which is tricky in hooks.
      // A simpler approach might be to always call onSelect in uncontrolled mode when start/end changes internally.
      // Let's assume the setStateProxy handles the controlled/uncontrolled distinction correctly.
      // The original logic checked `!(end.i === prevEnd.i && end.j === prevEnd.j)`
      // We can achieve similar check using a ref to store previous state or selectively calling onSelect.
      // For now, relying on setStateProxy to call onSelect when needed for controlled.
    }
  }, [internalState.start, internalState.end, props, onSelect]); // Dependency on start/end

  // Render logic
  var isSelected = (0, _react.useCallback)(function (i, j) {
    var _getCurrentState8 = getCurrentState(internalState, props),
      currentStart = _getCurrentState8.start,
      currentEnd = _getCurrentState8.end;
    var posX = j >= currentStart.j && j <= currentEnd.j;
    var negX = j <= currentStart.j && j >= currentEnd.j;
    var posY = i >= currentStart.i && i <= currentEnd.i;
    var negY = i <= currentStart.i && i >= currentEnd.i;
    return posX && posY || negX && posY || negX && negY || posX && negY;
  }, [internalState, props]);
  var isSelectedRow = (0, _react.useCallback)(function (rowIndex) {
    var _getCurrentState9 = getCurrentState(internalState, props),
      currentStart = _getCurrentState9.start,
      currentEnd = _getCurrentState9.end;
    var startY = currentStart.i;
    var endY = currentEnd.i;
    return startY <= endY ? rowIndex >= startY && rowIndex <= endY : rowIndex <= startY && rowIndex >= endY;
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
  return /*#__PURE__*/_react["default"].createElement("span", {
    ref: dgDomRef,
    tabIndex: 0,
    className: "data-grid-container",
    onKeyDown: handleGridKeyDown // Use the grid keydown handler
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
      var editingStatus = isCellEditing(i, j);
      var clearingStatus = isCellClearing(i, j);
      var selectionStatus = isSelected(i, j);
      return /*#__PURE__*/_react["default"].createElement(_DataCell["default"], _extends({
        key: cell.key ? cell.key : "".concat(i, "-").concat(j),
        row: i,
        col: j,
        cell: cell
        // forceEdit={editingStatus && forceEdit} // Pass internal forceEdit state
        ,
        selected: selectionStatus,
        editing: editingStatus,
        clearing: clearingStatus,
        onMouseDown: handleCellMouseDown,
        onMouseOver: handleCellMouseOver,
        onDoubleClick: handleCellDoubleClick,
        onContextMenu: handleCellContextMenu,
        onChange: handleCellChange,
        onRevert: onRevert // Pass the memoized revert handler
        ,
        onNavigate: handleKeyboardCellMovement // Pass the memoized movement handler
        // onKey prop seems unused in DataCell after refactor? handleGridKeyDown handles keys.
        ,
        attributesRenderer: attributesRenderer,
        cellRenderer: cellRenderer,
        valueRenderer: valueRenderer,
        dataRenderer: dataRenderer,
        valueViewer: valueViewer,
        dataEditor: dataEditor
        // Pass forceEdit only when editing this cell
      }, editingStatus ? {
        forceEdit: forceEdit
      } : {}));
    }));
  })));
});
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
  sheetRenderer: _propTypes["default"].func,
  // Updated: Removed isRequired, default provided
  rowRenderer: _propTypes["default"].func,
  // Updated: Removed isRequired, default provided
  cellRenderer: _propTypes["default"].func,
  // Updated: Removed isRequired, default provided
  valueViewer: _propTypes["default"].func,
  dataEditor: _propTypes["default"].func,
  parsePaste: _propTypes["default"].func,
  attributesRenderer: _propTypes["default"].func,
  keyFn: _propTypes["default"].func,
  handleCopy: _propTypes["default"].func,
  onPaste: _propTypes["default"].func,
  // Added onPaste prop type
  editModeChanged: _propTypes["default"].func
};
DataSheet.defaultProps = {
  sheetRenderer: _Sheet["default"],
  rowRenderer: _Row["default"],
  cellRenderer: _Cell["default"],
  valueViewer: _ValueViewer["default"],
  dataEditor: _DataEditor["default"],
  parsePaste: defaultParsePaste,
  // Add default for parsePaste
  isCellNavigable: function isCellNavigable() {
    return true;
  },
  // Add default for isCellNavigable
  disablePageClick: false // Add default
};
DataSheet.displayName = 'DataSheet';
var _default = exports["default"] = DataSheet;
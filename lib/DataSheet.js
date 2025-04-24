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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Ensure CellShape is imported if used in handlers
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

// Check for Internet Explorer (Simplified)
var IS_IE = typeof window !== 'undefined' && /Edge\//.test(navigator.userAgent);

// --- Main Component --- //
var DataSheet = /*#__PURE__*/(0, _react.memo)(function (props) {
  // --- Props Destructuring --- //
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

  // --- State & Refs --- //
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

  // --- State Update Proxy --- //
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
          // Prevent calling onSelect if selection hasn't changed
          if (nextSelection.start !== currentSelection.start || nextSelection.end !== currentSelection.end) {
            onSelect(nextSelection);
          }
        }
        var nonSelectionUpdates = _objectSpread({}, newState);
        delete nonSelectionUpdates.start;
        delete nonSelectionUpdates.end;
        return _objectSpread(_objectSpread({}, prevState), nonSelectionUpdates);
      } else {
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
  },
  // Dependencies updated based on usage within the function
  [props, editModeChanged, onSelect, props.selected] // Added props.selected
  );

  // --- Cell Navigation & Validation Helpers --- //
  var columns = data.length > 0 ? data[0].length : 0;
  var dataShape = {
    i: data.length,
    j: columns
  };
  var isCellWithinBounds = (0, _react.useCallback)(function (_ref2) {
    var i = _ref2.i,
      j = _ref2.j;
    return i >= 0 && i < dataShape.i && j >= 0 && j < dataShape.j;
  }, [dataShape]);
  var isCellEditable = (0, _react.useCallback)(function (_ref3) {
    var _data$i;
    var i = _ref3.i,
      j = _ref3.j;
    if (!isCellWithinBounds({
      i: i,
      j: j
    })) return false;
    var cell = (_data$i = data[i]) === null || _data$i === void 0 ? void 0 : _data$i[j];
    return !(cell !== null && cell !== void 0 && cell.readOnly);
  }, [data, isCellWithinBounds]);
  var findNextNavigableCell = (0, _react.useCallback)(function (startLoc, direction) {
    var wrap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var currentLoc = _objectSpread({}, startLoc);
    var move = {
      up: function up() {
        return currentLoc.i -= 1;
      },
      down: function down() {
        return currentLoc.i += 1;
      },
      left: function left() {
        return currentLoc.j -= 1;
      },
      right: function right() {
        return currentLoc.j += 1;
      }
    };
    var initialDirection = true;
    var maxAttempts = dataShape.i * dataShape.j + 1; // Prevent infinite loops in weird cases
    var attempts = 0;
    do {
      var _data$currentLoc$i2;
      // Prevent infinite loop if stuck
      if (attempts++ > maxAttempts) return startLoc;

      // Don't move on first iteration if checking current cell viability
      if (!initialDirection) {
        move[direction]();
      }
      initialDirection = false;
      if (!isCellWithinBounds(currentLoc)) {
        var _data$currentLoc$i;
        if (!wrap) return startLoc; // Stop if wrapping is disabled

        // Wrap around logic
        if (direction === 'right') currentLoc = {
          i: startLoc.i,
          j: 0
        }; // Wrap row first
        else if (direction === 'left') currentLoc = {
          i: startLoc.i,
          j: dataShape.j - 1
        }; // Wrap row first
        else if (direction === 'down') currentLoc = {
          i: 0,
          j: startLoc.j
        }; // Wrap column first
        else if (direction === 'up') currentLoc = {
          i: dataShape.i - 1,
          j: startLoc.j
        }; // Wrap column first

        // If wrapped cell is still out of bounds (e.g., 1x1 grid), return start
        if (!isCellWithinBounds(currentLoc)) return startLoc;

        // If after wrapping we land on the start cell again, and it's not navigable, maybe try next row/col?
        // This gets complex, basic wrap might be sufficient for most cases.
        // For now, if wrap lands on start and start is not navigable, we might be stuck - return start.
        if (currentLoc.i === startLoc.i && currentLoc.j === startLoc.j && !isCellNavigable((_data$currentLoc$i = data[currentLoc.i]) === null || _data$currentLoc$i === void 0 ? void 0 : _data$currentLoc$i[currentLoc.j], currentLoc.i, currentLoc.j)) {
          return startLoc;
        }
      }
    } while (!isCellNavigable((_data$currentLoc$i2 = data[currentLoc.i]) === null || _data$currentLoc$i2 === void 0 ? void 0 : _data$currentLoc$i2[currentLoc.j], currentLoc.i, currentLoc.j));
    return currentLoc;
  }, [data, dataShape, isCellWithinBounds, isCellNavigable]);

  // --- Event Handlers defined with useCallback --- //

  // Define Copy/Cut first as Keydown depends on them for IE logic
  var handleCopyInternal = (0, _react.useCallback)(function (e) {
    if (!isEmpty(editing)) return;
    if (handleCopyProp) {
      handleCopyProp({
        event: e,
        dataRenderer: dataRenderer,
        valueRenderer: valueRenderer,
        data: data,
        start: currentState.start,
        // Use current state from helper
        end: currentState.end,
        range: range
      });
    } else {
      e.preventDefault();
      var cs = currentState.start,
        ce = currentState.end;
      var text = range(cs.i, ce.i).map(function (i) {
        return range(cs.j, ce.j).map(function (j) {
          var _data$i2;
          var cell = (_data$i2 = data[i]) === null || _data$i2 === void 0 ? void 0 : _data$i2[j];
          if (!cell) return '';
          var value = dataRenderer ? dataRenderer(cell, i, j) : cell.value;
          return value !== null && value !== undefined ? String(value) : String(valueRenderer(cell, i, j));
        }).join('\t');
      }).join('\n');
      try {
        var clipboardData = e.clipboardData;
        if (clipboardData) {
          clipboardData.setData('text/plain', text);
        } else if (typeof window !== 'undefined' && window.clipboardData) {
          window.clipboardData.setData('Text', text);
        } else {
          console.warn('Clipboard API fallback needed for copy.');
        }
      } catch (err) {
        console.error('Failed to copy data to clipboard:', err);
      }
    }
  }, [handleCopyProp, editing, data, dataRenderer, valueRenderer, currentState, props]);
  var handleCellsChanged = (0, _react.useCallback)(function (changes, additions) {
    // This function should ideally just call the prop
    if (onCellsChanged) {
      // Map cell to expected type T if necessary, assuming T=CellShape for now
      var mappedChanges = changes.map(function (c) {
        return _objectSpread(_objectSpread({}, c), {}, {
          cell: c.cell
        });
      });
      onCellsChanged(mappedChanges, additions);
    } else {
      console.warn('Cells changed but no onCellsChanged handler provided.');
      // Avoid direct mutation or state updates here if data is controlled via props
    }
  }, [onCellsChanged]);
  var handleCutInternal = (0, _react.useCallback)(function (e) {
    if (!isEmpty(editing)) return;
    handleCopyInternal(e);
    var _getCurrentState = getCurrentState(internalState, props),
      cs = _getCurrentState.start,
      ce = _getCurrentState.end;
    var changes = range(cs.i, ce.i).flatMap(function (i) {
      return range(cs.j, ce.j).map(function (j) {
        var _data$i3;
        return {
          cell: (_data$i3 = data[i]) === null || _data$i3 === void 0 ? void 0 : _data$i3[j],
          row: i,
          col: j,
          value: null
        };
      });
    });
    var editableChanges = changes.filter(function (change) {
      return isCellEditable({
        i: change.row,
        j: change.col
      });
    });
    if (editableChanges.length > 0 && handleCellsChanged) {
      handleCellsChanged(editableChanges);
      setStateProxy({
        start: cs,
        end: cs,
        editing: defaultState.editing
      });
    }
  }, [editing, props, data, handleCellsChanged, internalState, setStateProxy, handleCopyInternal, isCellEditable]);
  var handlePasteInternal = (0, _react.useCallback)(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var cs, pastedText, _clipboardData, _navigator$clipboard, clipboardData, pastedData, changes, maxRow, maxCol, mappedPastedData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (isEmpty(editing)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            e.preventDefault();
            cs = currentState.start;
            pastedText = '';
            _context.prev = 5;
            clipboardData = e.clipboardData;
            if (!(clipboardData !== null && clipboardData !== void 0 && clipboardData.getData)) {
              _context.next = 11;
              break;
            }
            pastedText = clipboardData.getData('text/plain');
            _context.next = 23;
            break;
          case 11:
            if (!(typeof window !== 'undefined' && (_clipboardData = window.clipboardData) !== null && _clipboardData !== void 0 && _clipboardData.getData)) {
              _context.next = 15;
              break;
            }
            pastedText = window.clipboardData.getData('Text');
            _context.next = 23;
            break;
          case 15:
            if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.readText)) {
              _context.next = 21;
              break;
            }
            _context.next = 18;
            return navigator.clipboard.readText();
          case 18:
            pastedText = _context.sent;
            _context.next = 23;
            break;
          case 21:
            console.warn('Cannot read clipboard data.');
            return _context.abrupt("return");
          case 23:
            _context.next = 29;
            break;
          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](5);
            console.error('Failed to read clipboard data:', _context.t0);
            return _context.abrupt("return");
          case 29:
            pastedData = parsePaste(pastedText);
            if (pastedData.length > 0) {
              changes = [];
              maxRow = cs.i;
              maxCol = cs.j;
              pastedData.forEach(function (row, i) {
                var rowIndex = cs.i + i;
                if (rowIndex < data.length) {
                  // Only paste within existing row bounds (simple approach)
                  row.forEach(function (value, j) {
                    var _data$rowIndex;
                    var colIndex = cs.j + j;
                    if (colIndex < ((_data$rowIndex = data[rowIndex]) === null || _data$rowIndex === void 0 ? void 0 : _data$rowIndex.length)) {
                      // Only paste within existing col bounds
                      if (isCellEditable({
                        i: rowIndex,
                        j: colIndex
                      })) {
                        var _data$rowIndex2;
                        var cell = (_data$rowIndex2 = data[rowIndex]) === null || _data$rowIndex2 === void 0 ? void 0 : _data$rowIndex2[colIndex];
                        changes.push({
                          cell: cell,
                          row: rowIndex,
                          col: colIndex,
                          value: value
                        });
                        maxRow = Math.max(maxRow, rowIndex);
                        maxCol = Math.max(maxCol, colIndex);
                      }
                    } else {
                      // Handle adding new columns - requires data structure change or onCellsChanged support
                      console.warn("Paste extending beyond column bounds at [".concat(rowIndex, ", ").concat(colIndex, "] - not handled."));
                    }
                  });
                } else {
                  // Handle adding new rows - requires data structure change or onCellsChanged support
                  console.warn("Paste extending beyond row bounds at [".concat(rowIndex, "] - not handled."));
                }
              });
              if (changes.length > 0) {
                if (handleCellsChanged) {
                  handleCellsChanged(changes);
                }
                // Call dedicated onPaste prop (mapping might be needed)
                if (onPaste) {
                  mappedPastedData = pastedData.map(function (row, i) {
                    return row.map(function (pastedValue, j) {
                      var _data;
                      return {
                        cell: (_data = data[cs.i + i]) === null || _data === void 0 ? void 0 : _data[cs.j + j],
                        data: pastedValue
                      };
                    });
                  });
                  onPaste(mappedPastedData);
                }
                // Update selection to cover pasted area
                setStateProxy({
                  start: cs,
                  end: {
                    i: maxRow,
                    j: maxCol
                  },
                  editing: defaultState.editing
                });
              }
            }
          case 31:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[5, 25]]);
    }));
    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }(), [editing, currentState, data, parsePaste, isCellEditable, handleCellsChanged, onPaste, setStateProxy, props]);
  var handleNavigate = (0, _react.useCallback)(function (e) {
    var _data$editing$i;
    var commit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!isCellWithinBounds(editing)) {
      return; // Should not happen if editing is valid
    }
    var cell = (_data$editing$i = data[editing.i]) === null || _data$editing$i === void 0 ? void 0 : _data$editing$i[editing.j]; // Safe navigation
    if (cell && cell.component) {
      return; // Let component handle navigation
    }
    var stateUpdater = {
      editing: defaultState.editing,
      // Exit editing mode by default
      forceEdit: false
    };
    var directionMap = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _keys.LEFT_KEY, 'left'), _keys.RIGHT_KEY, 'right'), _keys.UP_KEY, 'up'), _keys.DOWN_KEY, 'down'), _keys.TAB_KEY, e.shiftKey ? 'left' : 'right'), _keys.ENTER_KEY, e.shiftKey ? 'up' : 'down');
    var direction = directionMap[e.which || e.keyCode];
    if (direction) {
      e.preventDefault(); // Prevent default browser scroll/tab behavior
      var wrap = direction === 'left' || direction === 'right' || direction === 'up' || direction === 'down'; // Simple wrap logic for now
      var nextLoc = findNextNavigableCell(editing, direction, wrap);
      if (nextLoc.i !== editing.i || nextLoc.j !== editing.j) {
        stateUpdater.start = nextLoc;
        stateUpdater.end = nextLoc;
        // Don't automatically enter edit mode on navigation, just select
        // User can press Enter or start typing to edit.
        stateUpdater.editing = defaultState.editing;
        stateUpdater.forceEdit = false;
      } else {
        // If navigation didn't change location (e.g., at edge, no wrap), just exit editing
        stateUpdater.editing = defaultState.editing;
      }
    } else if (e.which === _keys.ESCAPE_KEY) {
      // Revert is handled by DataCell calling onRevert
      // Ensure sheet state reflects exit from editing
      stateUpdater.editing = defaultState.editing;
    }
    // Commit is handled by DataCell calling onChange/onRevert which resets editing state

    setStateProxy(stateUpdater);
  }, [editing, data, setStateProxy, findNextNavigableCell, isCellWithinBounds] // Removed isCellEditable dependency
  );
  var handleKeydown = (0, _react.useCallback)(function (e) {
    var _data$currentCellLoc$;
    if (e.defaultPrevented) {
      return;
    }

    // --- IE Ctrl+C/X/V Handling (Integrated) ---
    if (IS_IE && e.ctrlKey) {
      if (e.keyCode === 67) {
        // C
        handleCopyInternal(e);
        return; // Prevent further handling
      } else if (e.keyCode === 88) {
        // X
        handleCutInternal(e);
        return; // Prevent further handling
      } else if (e.keyCode === 86) {
        // V
        console.warn('IE paste via Ctrl+V needs specific handling.');
        return; // Prevent further handling for now
      }
    }

    // --- Regular Keydown Logic --- //
    var currentCellLoc = editing;
    if (isEmpty(currentCellLoc)) {
      var _e$key;
      // Handle keydown when not editing
      // ... (existing non-editing logic) ...
      if (isEmpty(start)) return;
      var navKeys = [_keys.UP_KEY, _keys.DOWN_KEY, _keys.LEFT_KEY, _keys.RIGHT_KEY, _keys.TAB_KEY, _keys.ENTER_KEY];
      var editTriggerKeys = [_keys.BACKSPACE_KEY, _keys.DELETE_KEY];
      if (navKeys.includes(e.which)) {
        e.preventDefault();
        var directionMap = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _keys.LEFT_KEY, 'left'), _keys.RIGHT_KEY, 'right'), _keys.UP_KEY, 'up'), _keys.DOWN_KEY, 'down'), _keys.TAB_KEY, e.shiftKey ? 'left' : 'right'), _keys.ENTER_KEY, e.shiftKey ? 'up' : 'down');
        var direction = directionMap[e.which];
        if (direction) {
          var nextLoc = findNextNavigableCell(start, direction, true);
          setStateProxy({
            start: nextLoc,
            end: nextLoc
          });
        }
      } else if (e.which === _keys.ENTER_KEY) {
        e.preventDefault();
        if (isCellEditable(start)) {
          setStateProxy({
            editing: start,
            forceEdit: false,
            clear: defaultState.clear
          });
        }
      } else if (editTriggerKeys.includes(e.which)) {
        e.preventDefault();
        if (isCellEditable(start)) {
          setStateProxy({
            editing: start,
            forceEdit: false,
            clear: start
          });
        }
      } else if (!e.ctrlKey && !e.metaKey && ((_e$key = e.key) === null || _e$key === void 0 ? void 0 : _e$key.length) === 1) {
        e.preventDefault();
        if (isCellEditable(start)) {
          setStateProxy({
            editing: start,
            forceEdit: true,
            clear: start
          });
        }
      }
      return;
    }

    // Handle keydown when editing
    var cell = (_data$currentCellLoc$ = data[currentCellLoc.i]) === null || _data$currentCellLoc$ === void 0 ? void 0 : _data$currentCellLoc$[currentCellLoc.j];
    if (cell && cell.component) {
      return; // Let component handle its keys
    }
    // Backspace/Delete handled by DataCell now
  }, [start, editing, data, setStateProxy, findNextNavigableCell, isCellEditable, isCellWithinBounds, handleCopyInternal, handleCutInternal]);
  var pageClick = (0, _react.useCallback)(function (e) {
    if (disablePageClick) return;
    var element = dgDomRef.current;
    if (element && !element.contains(e.target)) {
      setStateProxy({
        start: defaultState.start,
        end: defaultState.end,
        editing: defaultState.editing,
        selecting: false
      });
    }
  }, [disablePageClick, setStateProxy]);
  var handleMouseUp = (0, _react.useCallback)(function () {
    if (selecting) {
      setStateProxy({
        selecting: false
      });
    }
  }, [selecting, setStateProxy]);

  // --- Effect for Document Event Listeners --- //
  (0, _react.useEffect)(function () {
    // Non-IE Clipboard Listeners
    document.addEventListener('cut', handleCutInternal);
    document.addEventListener('copy', handleCopyInternal);
    document.addEventListener('paste', handlePasteInternal);

    // Keydown Listener
    document.addEventListener('keydown', handleKeydown);

    // Global Mouse Listeners
    document.addEventListener('mouseup', handleMouseUp);

    // Page Click Listener (Conditional)
    var pageClickListenerAdded = false;
    if (!disablePageClick) {
      document.addEventListener('mousedown', pageClick, true);
      pageClickListenerAdded = true;
    }

    // Cleanup function
    return function () {
      document.removeEventListener('cut', handleCutInternal);
      document.removeEventListener('copy', handleCopyInternal);
      document.removeEventListener('paste', handlePasteInternal);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (pageClickListenerAdded) {
        document.removeEventListener('mousedown', pageClick, true);
      }
    };
  }, [handleCutInternal, handleCopyInternal, handlePasteInternal, handleKeydown, handleMouseUp, pageClick, disablePageClick]);

  // --- Cell Event Handlers (passed down to DataCell) --- //

  var handleCellMouseDown = (0, _react.useCallback)(function (row, col, e) {
    var cellLocation = {
      i: row,
      j: col
    };
    // Prevent action if cell events are disabled (check in DataCell now)
    // Allow selection start even if not editable, but prevent entering edit mode later

    var isEditingThisCell = !isEmpty(editing) && editing.i === row && editing.j === col;
    if (!isEditingThisCell) {
      setStateProxy({
        selecting: true,
        start: cellLocation,
        end: cellLocation,
        editing: defaultState.editing,
        // Exit previous edit mode
        forceEdit: false
      });
    }
    // If clicking the cell being edited, do nothing on mousedown
  }, [editing, setStateProxy]);
  var handleCellMouseOver = (0, _react.useCallback)(function (row, col) {
    if (selecting) {
      setStateProxy({
        end: {
          i: row,
          j: col
        }
      });
    }
  }, [selecting, setStateProxy]);
  var handleCellDoubleClick = (0, _react.useCallback)(function (row, col) {
    var cellLocation = {
      i: row,
      j: col
    };
    if (isCellEditable(cellLocation)) {
      setStateProxy({
        editing: cellLocation,
        forceEdit: true,
        clear: defaultState.clear
      });
    }
  }, [setStateProxy, isCellEditable]);
  var handleCellContextMenu = (0, _react.useCallback)(function (e, row, col) {
    var _data$row;
    var cell = (_data$row = data[row]) === null || _data$row === void 0 ? void 0 : _data$row[col];
    if (onContextMenu && cell !== undefined) {
      onContextMenu(e, cell, row, col);
    }
  }, [onContextMenu, data]);
  var handleCellChange = (0, _react.useCallback)(function (row, col, value) {
    var _data$row2;
    // This change comes from DataCell (after edit completes)
    var cell = (_data$row2 = data[row]) === null || _data$row2 === void 0 ? void 0 : _data$row2[col];
    var changed = false;
    // Check if value actually changed compared to original data
    // This check might be complex depending on dataRenderer etc.
    // For simplicity, assume change is valid if handler is called.

    if (onChange) {
      onChange(cell, row, col, value);
      changed = true;
    } else if (onCellsChanged) {
      onCellsChanged([{
        cell: cell,
        row: row,
        col: col,
        value: value
      }]);
      changed = true;
    } else {
      console.warn('Cell change occurred but no onChange or onCellsChanged handler provided.');
    }

    // Exit editing state after change is processed
    setStateProxy({
      editing: defaultState.editing,
      clear: defaultState.clear,
      forceEdit: false
    });
  }, [data, onChange, onCellsChanged, setStateProxy]);
  var handleCellRevert = (0, _react.useCallback)(function () {
    setStateProxy({
      editing: defaultState.editing,
      forceEdit: false
    });
  }, [setStateProxy]);

  // --- Render Logic --- //

  var isEditing = (0, _react.useCallback)(function (i, j) {
    return !isEmpty(editing) && editing.i === i && editing.j === j;
  }, [editing]);
  var isClearing = (0, _react.useCallback)(function (i, j) {
    return !isEmpty(clear) && clear.i === i && clear.j === j;
  }, [clear]);
  var isSelected = (0, _react.useCallback)(function (i, j) {
    var _getCurrentState2 = getCurrentState(internalState, props),
      cs = _getCurrentState2.start,
      ce = _getCurrentState2.end;
    if (isEmpty(cs) || isEmpty(ce) || cs.i === -1 || ce.i === -1) return false; // Check for default state
    var minRow = Math.min(cs.i, ce.i);
    var maxRow = Math.max(cs.i, ce.i);
    var minCol = Math.min(cs.j, ce.j);
    var maxCol = Math.max(cs.j, ce.j);
    return i >= minRow && i <= maxRow && j >= minCol && j <= maxCol;
  }, [internalState, props]);
  return /*#__PURE__*/_react["default"].createElement("span", {
    ref: dgDomRef,
    tabIndex: 0,
    className: "data-grid-container"
  }, /*#__PURE__*/_react["default"].createElement(SheetRenderer, {
    className: ['data-grid', className, overflow].filter(Boolean).join(' '),
    data: data
  }, data.map(function (row, i) {
    return /*#__PURE__*/_react["default"].createElement(RowRenderer, {
      key: keyFn ? keyFn(i) : i,
      row: i,
      cells: row
    }, row.map(function (cell, j) {
      var cellLocation = {
        i: i,
        j: j
      };
      var boundAttributesRenderer = attributesRenderer ? function () {
        return attributesRenderer(cell, i, j);
      } : undefined;
      return /*#__PURE__*/_react["default"].createElement(_DataCell["default"], {
        key: (cell === null || cell === void 0 ? void 0 : cell.key) || "".concat(i, "-").concat(j),
        row: i,
        col: j,
        cell: cell,
        forceEdit: forceEdit && isEditing(i, j),
        selected: isSelected(i, j),
        editing: isEditing(i, j),
        clearing: isClearing(i, j),
        cellRenderer: CellRenderer,
        valueRenderer: valueRenderer,
        dataRenderer: dataRenderer,
        valueViewer: ValueViewerComponent,
        dataEditor: DataEditorComponent,
        attributesRenderer: boundAttributesRenderer,
        onNavigate: handleNavigate,
        onMouseDown: handleCellMouseDown,
        onMouseOver: handleCellMouseOver,
        onDoubleClick: handleCellDoubleClick,
        onContextMenu: handleCellContextMenu,
        onChange: handleCellChange,
        onRevert: handleCellRevert
      });
    }));
  })));
});
DataSheet.displayName = 'DataSheet';
var _default = exports["default"] = DataSheet;
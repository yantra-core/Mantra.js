(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).BabylonGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// GraphicsInterface.js - Marak Squires 2023
var GraphicInterface = /*#__PURE__*/function () {
  function GraphicInterface() {
    _classCallCheck(this, GraphicInterface);
  }
  _createClass(GraphicInterface, [{
    key: "init",
    value: function init() {
      throw new Error("init method not implemented.");
    }

    // called by the client as many times as possible using requestAnimationFrame
  }, {
    key: "render",
    value: function render(game) {
      throw new Error("render method not implemented.");
    }

    // called once per game tick, using fixed time step
  }, {
    key: "update",
    value: function update(entities) {
      // throw new Error("update method not implemented.");
    }

    // used to inflate entity data from the server
    // the entityData may represent an: update, create, or destroy event
  }, {
    key: "inflateGraphic",
    value: function inflateGraphic(entityData) {
      throw new Error("inflateGraphic method not implemented.");
    }

    // create a new graphic object
  }, {
    key: "createGraphic",
    value: function createGraphic(entity, data) {
      throw new Error("createGraphic method not implemented.");
    }

    // remove the graphic object
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      throw new Error("removeGraphic method not implemented.");
    }

    // remove the graphics object
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entity, data) {
      throw new Error("updateGraphic method not implemented.");
    }
  }]);
  return GraphicInterface;
}();
var _default = exports["default"] = GraphicInterface;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _BabylonCamera = _interopRequireDefault(require("./camera/BabylonCamera.js"));
var _inflateText = _interopRequireDefault(require("./lib/inflateText.js"));
var _createBox = _interopRequireDefault(require("./lib/createBox.js"));
var _getBlock = _interopRequireDefault(require("./lib/getBlock.js"));
var _updateGraphic = _interopRequireDefault(require("./lib/updateGraphic.js"));
var _apply2DTexture = _interopRequireDefault(require("./lib/apply2DTexture.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // BabylonGraphics.js - Marak Squires 2023
// import inflate3DText from './lib/inflate3DText.js';
var lastKnownStates = {};
var POOL_SIZE_BLOCK = 3000;
var POOL_SIZE_BULLET = 1000;

// You can create your own renderer by replacing this file with a Class that extends GraphicsInterface.js
var BabylonGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(BabylonGraphics, _GraphicsInterface);
  var _super = _createSuper(BabylonGraphics);
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  function BabylonGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$camera = _ref.camera,
      camera = _ref$camera === void 0 ? {} : _ref$camera;
    _classCallCheck(this, BabylonGraphics);
    _this = _super.call(this);
    _this.id = BabylonGraphics.id;
    _this.async = BabylonGraphics.async;
    _this.engine = null;
    _this.scene = null;
    _this.createBox = _createBox["default"].bind(_assertThisInitialized(_this));
    _this.getBlock = _getBlock["default"].bind(_assertThisInitialized(_this));
    _this.updateGraphic = _updateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.apply2DTexture = _apply2DTexture["default"].bind(_assertThisInitialized(_this));
    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      };
    }
    if (typeof camera.startingZoom !== 'number') {
      camera.startingZoom = 1;
    }
    if (typeof camera.follow === 'undefined') {
      camera.follow = true;
    }
    _this.camera = camera;
    _this.startingZoom = camera.startingZoom;
    _this.entityStates = {}; // Store application-specific entity data
    _this.debug = false; // Store debug flag for later usage
    _this.pendingLoad = []; // queue of pending Plugins that depend on this Babylon Graphics

    // this.inflate3DText = inflateText.bind(this);
    _this.inflateText = _inflateText["default"].bind(_assertThisInitialized(_this));

    // config scope for convenience
    var config = camera;
    _this.config = config;
    _this.mantraPools = {
      block: [],
      bullet: []
    };
    return _this;
  }
  _createClass(BabylonGraphics, [{
    key: "init",
    value: function init(game) {
      var _this2 = this;
      this.game = game;
      this.game.use('Graphics');
      // check to see if BABYLON scope is available, if not assume we need to inject it sequentially
      if (typeof BABYLON === 'undefined') {
        console.log('BABYLON is not defined, attempting to load it from vendor');
        game.loadScripts(['/vendor/babylon.js', '/vendor/babylon.gui.min.js', '/vendor/babylonjs.materials.min.js'
        //        '/vendor/babylonjs.loaders.min.js',
        ], function () {
          console.log('All BABYLON scripts loaded sequentially, proceeding with initialization');
          // All scripts are loaded, proceed with initialization
          _this2.babylonReady();
        });
      } else {
        this.babylonReady();
      }
    }
  }, {
    key: "babylonReady",
    value: function () {
      var _babylonReady = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this3 = this;
        var game, renderCanvas, light, reEmitEvent, assetsManager;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              reEmitEvent = function _reEmitEvent(babylonEvent) {
                var newEvent = new MouseEvent(babylonEvent.type, babylonEvent);
                document.dispatchEvent(newEvent);
              };
              game = this.game; // Access the renderCanvas element and set its size
              renderCanvas = document.getElementById('babylon-render-canvas');
              if (!renderCanvas) {
                // if the render canvas does not exist, create it
                renderCanvas = document.createElement('canvas');
                renderCanvas.id = 'babylon-render-canvas';
                renderCanvas.style.width = '100%';
                renderCanvas.style.height = '100%';
                // renderCanvas.style.position = 'absolute';
                renderCanvas.style.top = '0px';
                renderCanvas.style.left = '0px';
                // renderCanvas.style.background = '#007fff';
                // append the renderCanvas to the gameHolder

                // Setup the canvas dimensions
                if (typeof game.width === 'number') {
                  renderCanvas.width = game.width;
                }
                if (typeof game.height === 'number') {
                  renderCanvas.height = game.height;
                }

                // Ensure the canvas has a transparent background
                renderCanvas.style.background = 'transparent';
                document.getElementById('gameHolder').appendChild(renderCanvas);
              }
              if (renderCanvas) {
                _context.next = 6;
                break;
              }
              throw new Error('No div element found in DOM with id "renderCanvas". This is required for Babylon.js to render. Please try again after adding a div element with id "renderCanvas" to the DOM.');
            case 6:
              // TODO: config height and width from Game constructor
              if (typeof game.width === 'number') {
                renderCanvas.width = game.width; // Set canvas width in pixels
              }

              if (typeof game.height === 'number') {
                renderCanvas.height = game.height; // Set canvas height in pixels
              }

              // this.engine = new BABYLON.Engine(renderCanvas, true);

              // Create the engine with alpha (transparency) enabled
              this.engine = new BABYLON.Engine(renderCanvas, true, {
                preserveDrawingBuffer: true,
                stencil: true,
                alpha: true
              });

              // TODO: enabled WebGPU by default
              //this.engine = new BABYLON.WebGPUEngine(renderCanvas, true);
              // await this.engine.initAsync();
              this.scene = new BABYLON.Scene(this.engine);
              this.game.scene = this.scene; // Remark: We need a way for babylon components to access the scene
              game.scene = this.scene; // Remark: We need a way for babylon components to access the scene

              // Set the scene's clear color to transparent
              this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
              this.initializeObjectPools(3000);

              // TODO: move this into Systems for Babylon client
              // this.cameraSystem = new CameraSystem(this.game, this.engine, this.scene);

              // Only initialize DebugGUI if debug flag is set to true
              if (this.debug) {
                // this.debugGUI = new DebugGUI(this.scene);
              }

              // Add a hemispheric light to ensure everything is illuminated
              light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
              light.intensity = 0.7;

              // Remark: This has been removed, as we are using a custom game loop and RequestAnimationFrame
              // this.scene.render() is instead called in the render() method of this class
              // this.engine.runRenderLoop(() => this.scene.render());
              window.addEventListener('resize', function () {
                return _this3.engine.resize();
              });
              renderCanvas.addEventListener('wheel', this.handleZoom.bind(this), {
                passive: false
              });

              // remit all pointer events to the document
              this.scene.onPointerObservable.add(function (pointerInfo) {
                switch (pointerInfo.type) {
                  case BABYLON.PointerEventTypes.POINTERDOWN:
                  case BABYLON.PointerEventTypes.POINTERUP:
                  case BABYLON.PointerEventTypes.POINTERMOVE:
                    reEmitEvent(pointerInfo.event);
                    break;
                }
              });
              // TODO: Should we have generic Camera plugin scoped to graphics pipeline?
              //       see how StarField.js is implemented for reference
              game.use(new _BabylonCamera["default"]({
                camera: this.camera
              }));
              this.pendingLoad.forEach(function (pluginInstance) {
                game.use(pluginInstance);
              });

              // this.createCompass();

              // once the graphics system is ready, add it to the systemsManager
              this.game.systemsManager.addSystem('graphics-babylon', this);

              // register this graphics pipline with the game
              game.graphics.push(this);

              // Setup AssetsManager or similar loader
              assetsManager = new BABYLON.AssetsManager(this.scene); // Define your assets to be loaded here
              // Example: var meshTask = assetsManager.addMeshTask("mesh task", "", "path/", "file.babylon");
              // Check when all assets are loaded
              assetsManager.onFinish = function (tasks) {
                // All assets are loaded, now you can emit your ready event
                game.emit('plugin::ready::graphics-babylon', _this3);
                game.loadingPluginsCount--;
                document.body.style.cursor = 'default';
              };

              // Start loading the assets
              assetsManager.load();

              /* TODO load custom meshes from obj
              BABYLON.SceneLoader.ImportMesh("helloMesh", "textures/", "monu3.obj", this.scene, function (newMeshes) {
                // Set the target of the camera to the first imported mesh
                newMeshes[0].position = new BABYLON.Vector3(-100, 2, 2000);
                newMeshes[0].scaling = new BABYLON.Vector3(250, 250, 250);
                camera.target = newMeshes[0];
              });
              */
            case 27:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function babylonReady() {
        return _babylonReady.apply(this, arguments);
      }
      return babylonReady;
    }()
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      //console.log('this.game.entities', this.game.entities);
      //console.log('this.game.entities[entityId]', this.game.entities[entityId])
      var entity = this.game.getEntity(entityId);
      if (!entity || !entity.graphics || !entity.graphics['graphics-babylon']) {
        return;
      }
      if (entity.graphics['graphics-babylon'].mantraPools) {
        // TODO: delegate here instead of if / else
        if (entity.type === 'BULLET') {
          this.releaseBullet(entity.graphics['graphics-babylon']);
        }
        if (entity.type === 'BLOCK') {
          this.releaseBlock(entity.graphics['graphics-babylon']);
        }
      } else {
        entity.graphics['graphics-babylon'].dispose();
      }
    }
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      // console.log('Babylon.createGraphic', entityData)
      // throw new Error('line')
      // switch case based on entityData.type
      var graphic;
      switch (entityData.type) {
        case 'PLAYER':
          if (entityData.shape === 'rectangle') {
            graphic = this.createBox(entityData);
          } else {
            graphic = this.getBlock(entityData);
          }
          break;
        case 'BULLET':
          graphic = this.getBullet(entityData);
          break;
        case 'TEXT':
          graphic = this.inflateText(entityData);
          // TODO: add support for 3d text
          // graphic = this.inflateText(entityData);
          break;
        case 'BORDER':
          graphic = this.createBox(entityData);
          break;
        case 'BLOCK':
          graphic = this.getBlock(entityData);
          break;
        case 'TRIANGLE':
          graphic = this.createTriangle(entityData);
          break;
        default:
          graphic = this.createBox(entityData);
        // TODO: createDefault()
      }

      // TODO: allow for setting of z position in 2d mode, if z exists
      if (this.game.physics.dimension === 2) {
        if (typeof entityData.position.z === 'undefined') {
          // console.log("undefined Z", entityData.type, entityData.position)
          entityData.position.z = 1;
        }
        graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
      }
      if (this.game.physics.dimension === 3) {
        graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
      }
      if (typeof entityData.color === 'number') {
        if (!graphic.material) {
          graphic.material = new BABYLON.StandardMaterial("material", this.scene);
        }

        // console.log("setting color", entityData.color)
        // Extract RGB components from the hexadecimal color value
        var red = entityData.color >> 16 & 255;
        var green = entityData.color >> 8 & 255;
        var blue = entityData.color & 255;
        // Set tint of graphic using the extracted RGB values
        graphic.material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
        // console.log('updated graphic.diffuseColor', graphic.diffuseColor);
      }

      return graphic;
    }
  }, {
    key: "initializeObjectPools",
    value: function initializeObjectPools(size) {
      for (var i = 0; i < POOL_SIZE_BLOCK; i++) {
        var block = BABYLON.MeshBuilder.CreateBox('box', {
          width: 1,
          height: 1,
          depth: 1
        }, this.scene);
        block.isVisible = false; // Start with the box hidden
        block.mantraPools = true;
        this.mantraPools.block.push(block);
      }
      for (var _i = 0; _i < POOL_SIZE_BULLET; _i++) {
        var bullet = BABYLON.MeshBuilder.CreateSphere('box', {
          width: 1,
          height: 1,
          depth: 1
        }, this.scene);
        bullet.isVisible = false; // Start with the box hidden
        bullet.mantraPools = true;
        this.mantraPools.bullet.push(bullet);
      }
    }
  }, {
    key: "releaseBlock",
    value: function releaseBlock(block) {
      block.isVisible = false;
      // Reset block properties if necessary
    }
  }, {
    key: "getBullet",
    value: function getBullet(entityData) {
      var bullet = this.mantraPools.bullet.find(function (b) {
        return !b.isVisible;
      });
      if (bullet) {
        bullet.isVisible = true;

        // Assuming the original diameter of the bullet is known. 
        // Replace `originalDiameter` with the actual value.
        var originalDiameter = 4; // Example value
        var scale = entityData.radius * 2 / originalDiameter;
        bullet.scaling.x = scale;
        bullet.scaling.y = scale;
        bullet.scaling.z = scale;
        bullet.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);
        return bullet;
      }
      return this.createSphere(entityData);
    }
  }, {
    key: "releaseBullet",
    value: function releaseBullet(bullet) {
      bullet.isVisible = false;
      // Reset bullet properties if necessary
    }
  }, {
    key: "createSphere",
    value: function createSphere(entityData) {
      var sphere = BABYLON.MeshBuilder.CreateSphere('bullet', {
        diameter: entityData.radius * 2
      }, this.scene);
      return sphere;
    }
  }, {
    key: "createTriangle",
    value: function createTriangle(entityData) {
      var mesh = BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
        diameterTop: 0,
        diameterBottom: entityData.width,
        height: entityData.height,
        tessellation: 3
      }, this.scene);

      // rotate the triangle so it points "forward"
      // Remark: 11/25 this is no longer working? 
      mesh.rotation.z = Math.PI / 2;
      mesh.rotation.y += -Math.PI / 2;
      return mesh;
    }

    // called as much as the client requires in order to render
  }, {
    key: "render",
    value: function render(game, alpha) {
      var self = this;
      if (game.systems['graphics-babylon-camera']) {
        var cameraSystem = game.getSystem('graphics-babylon-camera');
        cameraSystem.render();
      }
      this.scene.render();
    }

    // called each time new gametick data arrives
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            state = _step$value[1];
          var ent = this.game.entities.get(eId);
          this.inflateGraphic(ent, 1);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (game.systems['graphics-babylon-camera']) {
        var cameraSystem = this.game.getSystem('graphics-babylon-camera');
        cameraSystem.update(); // is cameraSystem.update() required here?
      }
    }
  }, {
    key: "inflateGraphic",
    value: function inflateGraphic(entity, alpha) {
      if (entity.graphics && entity.graphics['graphics-babylon']) {
        var graphic = entity.graphics['graphics-babylon'];
        this.updateGraphic(entity, alpha);
      } else {
        if (entity.destroyed) {
          // shouldnt happen got destroy event for already removed ent
        } else {
          var _graphic = this.createGraphic(entity);
          this.game.components.graphics.set([entity.id, 'graphics-babylon'], _graphic);
        }
      }
    }
  }, {
    key: "handleZoom",
    value: function handleZoom(event) {
      // Logic for zoom handling
    }
  }, {
    key: "inflate",
    value: function inflate(snapshot) {} // not used?
  }, {
    key: "unload",
    value: function unload() {
      var _this4 = this;
      // TODO: consolidate graphics pipeline unloading into SystemsManager
      // TODO: remove duplicated unload() code in PhaserGraphics
      // iterate through all entities and remove existing babylon graphics
      var _iterator2 = _createForOfIteratorHelper(this.game.entities.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            eId = _step2$value[0],
            entity = _step2$value[1];
          if (entity.graphics && entity.graphics['graphics-babylon']) {
            this.removeGraphic(eId);
            delete entity.graphics['graphics-babylon'];
          }
        }

        // remove BabylonCamera as well
        // Remark: is this required? could we just leave it in memory?
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.game.systemsManager.removeSystem('graphics-babylon-camera');
      this.game.graphics = this.game.graphics.filter(function (g) {
        return g.id !== _this4.id;
      });
      delete this.game._plugins['BabylonGraphics'];

      // stop babylon, remove canvas
      this.engine.stopRenderLoop();
      this.engine.dispose();
      this.scene.dispose();
      // remove canvas

      var canvas = document.getElementById('babylon-render-canvas');
      if (canvas) {
        // hide canvas
        // canvas.style.display = 'none';
        canvas.remove();
      }
    }
  }]);
  return BabylonGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(BabylonGraphics, "id", 'graphics-babylon');
_defineProperty(BabylonGraphics, "removable", false);
_defineProperty(BabylonGraphics, "async", true);
var _default = exports["default"] = BabylonGraphics;

},{"../../lib/GraphicsInterface.js":1,"./camera/BabylonCamera.js":3,"./lib/apply2DTexture.js":4,"./lib/createBox.js":5,"./lib/getBlock.js":6,"./lib/inflateText.js":7,"./lib/updateGraphic.js":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var BabylonCamera = /*#__PURE__*/function () {
  function BabylonCamera(_ref) {
    var camera = _ref.camera;
    _classCallCheck(this, BabylonCamera);
    this.id = BabylonCamera.id;
    // this.startingZoom = camera.startingZoom;
    this.startingZoom = 0.25;
    // config scope for convenience
    var config = {
      camera: camera
    };
    this.config = config;
  }
  _createClass(BabylonCamera, [{
    key: "init",
    value: function init(game, engine, scene) {
      // hoist and override
      game.setZoom = this.setZoom.bind(this);
      this.scene = scene;
      this.game = game;
      this.engine = engine;

      // Store the initial values
      this.initialDistance = 2560;
      this.initialAlpha = 0;
      this.initialBeta = 0.35;

      // Set up the camera
      this.camera = new BABYLON.ArcRotateCamera("camera", this.initialAlpha, this.initialBeta, this.initialDistance, new BABYLON.Vector3(0, 0, 0), this.scene);
      game.camera = this.camera;
      this.game.systemsManager.addSystem(this.id, this);

      // this.camera.attachControl(document.getElementById('renderCanvas'), true);
      // Setup custom camera controls
      this.setupCameraControls();

      // Configuring full 360-degree rotation
      this.camera.upperBetaLimit = Math.PI;
      this.camera.lowerBetaLimit = 0;
      this.camera.upperAlphaLimit = null;
      this.camera.lowerAlphaLimit = null;

      // Camera zoom limits
      this.camera.minZ = 0.1;
      this.camera.maxZ = 20000;
      this.camera.lowerRadiusLimit = 50;
      this.camera.upperRadiusLimit = 2560 * 4 * 6; // 61440

      // Adjust wheelPrecision for more zoom per scroll
      this.camera.wheelPrecision = 0.5;

      //   Rotate the camera by -Math.PI / 2
      this.camera.alpha += Math.PI / 2;
      this.camera.radius = 2560 * this.startingZoom;
      //alert(this.camera.radius)
      //console.log('this.camera.radiusthis.camera.radiusthis.camera.radius', this.camera.radius)
    }
  }, {
    key: "setZoom",
    value: function setZoom(zoom) {
      this.camera.radius = 2560 * zoom;
    }
  }, {
    key: "setupCameraControls",
    value: function setupCameraControls() {
      // Detach default controls
      this.camera.attachControl(document.getElementById('gameHolder'), false);

      // Disable the keys for camera control
      this.camera.inputs.attached.keyboard.keysUp = []; // Disable UP arrow key
      this.camera.inputs.attached.keyboard.keysDown = []; // Disable DOWN arrow key
      this.camera.inputs.attached.keyboard.keysLeft = []; // Disable LEFT arrow key
      this.camera.inputs.attached.keyboard.keysRight = []; // Disable RIGHT arrow key

      // this.camera.inputs.attached.pointers.buttons = [1, -1, -1];
      this.camera._panningMouseButton = 0;
    }
  }, {
    key: "setupCameraControlsManual",
    value: function setupCameraControlsManual() {
      // Detach default controls from the canvas
      this.camera.detachControl(this.scene.getEngine().getRenderingCanvas());

      // Attach wheel event listener to gameHolder
      var gameHolder = document.getElementById('gameHolder');
      gameHolder.addEventListener('wheel', this.onMouseWheel.bind(this), {
        passive: false
      });

      // Prevent default handling of wheel event on canvas
      var canvas = this.scene.getEngine().getRenderingCanvas();
      canvas.addEventListener('wheel', function (e) {
        return e.stopPropagation();
      }, {
        passive: false
      });
    }
  }, {
    key: "onMouseWheel",
    value: function onMouseWheel(e) {
      // Adjust this scale factor as needed
      var scaleFactor = 0.1;
      this.camera.radius -= e.deltaY * scaleFactor;

      // Prevent page scrolling
      e.preventDefault();
    }
  }, {
    key: "resetToHome",
    value: function resetToHome() {
      // Reset to initial values
      this.camera.alpha = this.initialAlpha;
      this.camera.beta = this.initialBeta;
      this.camera.radius = this.initialDistance;
    }
  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
  }, {
    key: "render",
    value: function render() {
      var game = this.game;
      if (this.config.camera && this.config.camera.follow) {
        var currentPlayer = this.game.getEntity(game.currentPlayerId);
        if (currentPlayer && currentPlayer.graphics) {
          var graphic = currentPlayer.graphics['graphics-babylon'];
          if (graphic) {
            // Interpolating camera position
            var smoothness = 1; // Value between 0 and 1, where 1 is instant

            switch (game.physics.dimension) {
              case 2:
                this.camera.target.x += (graphic.position.x - this.camera.target.x) * smoothness;
                this.camera.target.z += (graphic.position.z - this.camera.target.z) * smoothness;
                break;
              case 3:
                this.camera.target = graphic.position;
                break;
              default:
                throw new Error('Unknown physics dimensions, cannot update camera');
                break;
            }
          }
        }
      }
    }
  }, {
    key: "renderLerp",
    value: function renderLerp() {
      // TODO: use this instead on render(), uses built in lerp
      var game = this.game;
      if (this.config.camera && this.config.camera.follow) {
        var currentPlayer = this.game.getEntity(game.currentPlayerId);
        if (currentPlayer && currentPlayer.graphics) {
          var graphic = currentPlayer.graphics['graphics-babylon'];
          var smoothness = 1; // Value between 0 and 1, where 1 is instant

          if (graphic) {
            // Smooth camera follow using Vector3.Lerp
            var targetPosition = new BABYLON.Vector3(graphic.position.x, this.camera.target.y, graphic.position.z);
            this.camera.target = BABYLON.Vector3.Lerp(this.camera.target, targetPosition, smoothness);
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      // console.log('camera update')
      /*  // TODO: use this instead of the camera target?
          this.position = new BABYLON.Vector3(0, 500, -500);
          this.target = BABYLON.Vector3.Zero();
      */
      //this.updatePlayerRotation(10);
    }
  }]);
  return BabylonCamera;
}();
_defineProperty(BabylonCamera, "id", 'graphics-babylon-camera');
_defineProperty(BabylonCamera, "removable", false);
var _default = exports["default"] = BabylonCamera;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = apply2DTexture;
function apply2DTexture(graphic, entityData) {
  var game = this.game;
  var material = new BABYLON.StandardMaterial("material", this.scene);
  var texture = game.getTexture(entityData.texture);
  if (!texture) {
    return material;
  }
  var spritePosition = texture.sprite;
  material.diffuseTexture = new BABYLON.Texture(texture.url, this.scene);
  if (typeof spritePosition !== 'undefined') {
    // Assuming you know the sprite size and the total size of the sprite sheet
    var spriteWidth = 16; // Width of one sprite in pixels
    var spriteHeight = 16; // Height of one sprite in pixels

    var sheetWidth = 672; // Total width of the sprite sheet in pixels
    var sheetHeight = 672; // Total height of the sprite sheet in pixels

    // ensures positive values on sheet such that sheet starts at top left with 0,0 and spritePosition is positive
    spritePosition.x = Math.abs(spritePosition.x);
    spritePosition.y = Math.abs(spritePosition.y);
    // console.log('spritePosition', spritePosition)
    // Calculate UV coordinates
    var u1 = spritePosition.x / sheetWidth;
    var v1 = 1 - (spritePosition.y + spriteHeight) / sheetHeight; // Inverting V
    var u2 = (spritePosition.x + spriteWidth) / sheetWidth;
    var v2 = 1 - spritePosition.y / sheetHeight; // Inverting V

    // console.log('u1', u1, 'v1', v1, 'u2', u2, 'v2', v2)
    // Set the UV coordinates for the texture
    material.diffuseTexture.uScale = u2 - u1; // scaling U
    material.diffuseTexture.vScale = v2 - v1; // scaling V
    material.diffuseTexture.uOffset = u1; // offsetting U
    material.diffuseTexture.vOffset = v1; // offsetting V
  }

  // ensure transparency is enabled
  material.diffuseTexture.hasAlpha = true;

  // rotate texture
  material.diffuseTexture.wAng = -Math.PI / 2;
  graphic.material = material;
  return graphic;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createBox;
function createBox(entityData) {
  var _this = this;
  var game = this.game;
  var box = BABYLON.MeshBuilder.CreateBox('default', {
    width: entityData.width,
    height: entityData.depth,
    depth: entityData.height
  }, this.scene);
  var material = new BABYLON.StandardMaterial("material", this.scene);

  // Add rotation if present
  if (entityData.rotation) {
    // Set rotation as needed
  }

  /*
  if (entityData.kind === 'BACKGROUND') {
    // set origin to bottom left
    entityData.position.x += entityData.width / 2;
    entityData.position.y += entityData.height / 2;
  }
  */

  if (typeof game.getTexture(entityData.texture) !== 'undefined') {
    var texture = game.getTexture(entityData.texture);
    var graphic = this.apply2DTexture(box, entityData);
    material = graphic.material;
    if (entityData.kind === 'building') {
      // Rotate the box by 30 degrees around the X-axis
      var rotationAngle = 30 * (Math.PI / 180); // Convert 30 degrees to radians
      box.rotation.x = rotationAngle;

      // Adjust the position of the box if needed
      var boxHeight = entityData.height;
      var adjustment = boxHeight / 2 - boxHeight / 2 * Math.cos(rotationAngle);
      entityData.position.z += adjustment;

      // TODO: Implement a method to tilt the texture by 30 degrees
      // This might require custom shaders or adjusting the mesh's UVs
    }
  } else if (entityData.color) {
    // Incoming color is int color value
    // Extract RGB components from the hexadecimal color value
    var red = entityData.color >> 16 & 255;
    var green = entityData.color >> 8 & 255;
    var blue = entityData.color & 255;
    // Set tint of graphic using the extracted RGB values
    // clear the existing material color
    material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
  }
  if (typeof entityData.style !== 'undefined') {
    if (typeof entityData.style.display !== 'undefined') {
      // console.log('entityData.style.display', entityData.style.display)
      if (entityData.style.display === 'none') {
        box.isVisible = false;
      }
    }
  }

  // set origin to bottom left
  // box.setPivotPoint(new BABYLON.Vector3(0, 0, 0));

  // Apply the material to the box
  box.material = material;

  // Ensure the box is actionable
  box.isPickable = true;

  // Create an action manager for the box
  box.actionManager = new BABYLON.ActionManager(this.scene);

  // Pointer over event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
    // console.log('pointerover', entityData.id, entityData.type, entityData);
    _this.scene.getEngine().getRenderingCanvas().style.cursor = 'pointer';
  }));

  // Pointer out event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
    // console.log('pointerout', entityData.id, entityData.type, entityData)
    _this.scene.getEngine().getRenderingCanvas().style.cursor = 'default';
    // Additional logic if needed
    // Get the full entity from the game and delegate based on part type
    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'MotionDetector') {
        ent.yCraft.part.onFn();
      }
    }
  }));

  // Pointer down event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, function () {
    // console.log('pointerdown', entityData.id, entityData.type, entityData);
    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'Button') {
        ent.yCraft.part.press();
      }
      if (ent.yCraft.part.toggle) {
        ent.yCraft.part.toggle();
      }
    }
    // Logic for pointer down
  }));

  // Pointer up event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
    // Logic for pointer up
    // console.log('pointerup', entityData.id, entityData.type, entityData)
    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'Button' && ent.yCraft.part.release) {
        ent.yCraft.part.release();
      }
    }
  }));
  return box;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBlock;
function getBlock(entityData) {
  var game = this.game;
  var block = this.mantraPools.block.find(function (b) {
    return !b.isVisible;
  });
  if (block) {
    block.isVisible = true;
    // set height and width
    block.scaling.x = entityData.width;
    block.scaling.z = entityData.height;
    block.scaling.y = entityData.width;
    // set position
    block.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);
    /* requires proper setOrigin()
    if (entityData.kind === 'BACKGROUND') {
      // set origin to bottom left
      entityData.position.x -= entityData.width / 2;
      entityData.position.y -= entityData.height / 2;
    }
    */

    // set material if game.getTexture(entityData.texture) is present
    if (game.getTexture(entityData.texture)) {
      this.apply2DTexture(block, entityData);
    } else {
      // console.log('missing block texture', entityData.texture)
    }
    return block;
  }
  return this.createBox(entityData);
  // Optional: Create new box if none are available
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateText;
function inflateText(entityData, scene) {
  var plane, texture;

  // Dispose of existing texture and plane if they exist
  if (entityData.graphics && entityData.graphics['graphics-babylon']) {
    entityData.graphics['graphics-babylon'].texture.dispose();
    entityData.graphics['graphics-babylon'].plane.dispose();
  }
  var text = entityData.text || '';
  var font = '48px monospace';
  if (typeof entityData.style !== 'undefined') {
    if (entityData.style.fontSize !== 'undefined') {
      // font = `${entityData.style.fontSize} monospace`;
    }
  }

  // Create a temporary canvas to measure text
  var tempCanvas = document.createElement('canvas');
  var context = tempCanvas.getContext('2d');
  context.font = font;
  var textSize = context.measureText(text);

  // Adjust texture size based on text size
  var textureWidth = Math.ceil(textSize.width) + 60;
  var textureHeight = 288; // Fixed height

  // Create new texture and plane with calculated dimensions
  texture = new BABYLON.DynamicTexture('dynamicTexture', {
    width: textureWidth,
    height: textureHeight
  }, scene, false);
  texture.hasAlpha = true;
  var material = new BABYLON.StandardMaterial('textMaterial', scene);
  material.diffuseTexture = texture;
  material.backFaceCulling = false;
  material.opacityTexture = texture; // Use the texture as an opacity map for transparency

  plane = new BABYLON.MeshBuilder.CreatePlane('signboard', {
    width: textureWidth / 10,
    height: textureHeight / 10
  }, scene);
  plane.material = material;
  plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  // Clear texture and draw new text
  texture.getContext().clearRect(0, 0, textureWidth, textureHeight);
  var xPosition = 30; // Horizontal padding
  var yPosition = textureHeight / 2 + textSize.actualBoundingBoxAscent / 2 - 40; // Adjusted for vertical centering

  // Draw text with transparent background
  // TODO: color config text
  texture.drawText(text, xPosition, yPosition, font, 'white', 'transparent', true, true);

  // Update entityData with new graphics
  entityData.graphics = {
    'graphics-babylon': {
      plane: plane,
      texture: texture
    }
  };

  // Adjust plane position
  plane.position = new BABYLON.Vector3(entityData.position.x, entityData.position.y, entityData.position.z);
  return plane;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateGraphic;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function updateGraphic(entityData /*, alpha*/) {
  // console.log('setting position', entityData.position)
  var previousEntity = this.game.getEntity(entityData.id);
  if (!previousEntity || !previousEntity.graphics) {
    return;
  }
  var graphic = previousEntity.graphics['graphics-babylon'];
  if (_typeof(entityData.position) === 'object') {
    // alpha value will be present if snapshot interpolation is enabled
    if (typeof alpha === 'number') {
      if (typeof previousEntity.position.z !== 'number') {
        previousEntity.position.z = 0;
      }
      if (typeof entityData.position.z !== 'number') {
        entityData.position.z = 0;
      }

      // Perform interpolation between the previous and current state
      var previousVector = new BABYLON.Vector3(previousEntity.position.x, previousEntity.position.y, previousEntity.position.z);
      var currentVector = new BABYLON.Vector3(entityData.position.x, entityData.position.y, entityData.position.z);
      var interpolatedPosition = BABYLON.Vector3.Lerp(previousVector, currentVector, alpha);
      // TODO: add rotation interpolation
      // const interpolatedRotation = BABYLON.Quaternion.Slerp(previousEntity.rotation, entityData.rotation, alpha);
      // console.log(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);
      // Update the entity's graphical representation with the interpolated state
      graphic.position = new BABYLON.Vector3(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);
    } else {
      //
      // Snapshot interpolation is not enabled, use exact position values from the snapshot
      //
      // console.log(-entityData.position.x, entityData.position.z, entityData.position.y);
      graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
    }
  }
  if (typeof entityData.color === 'number') {
    if (!graphic.material) {
      graphic.material = new BABYLON.StandardMaterial("material", this.scene);
    }

    // console.log("setting color", entityData.color)
    // Extract RGB components from the hexadecimal color value
    var red = entityData.color >> 16 & 255;
    var green = entityData.color >> 8 & 255;
    var blue = entityData.color & 255;
    // Set tint of graphic using the extracted RGB values
    graphic.material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
    // console.log('updated graphic.diffuseColor', graphic.diffuseColor);
  }

  if (entityData.rotation !== undefined && entityData.rotation !== null) {
    //graphic.rotation.y = -entityData.rotation;
    // in additon, adjust by -Math.PI / 2;
    // adjust cylinder rotation shape to point "forward"
    // TODO: put in switch here for dimensions
    switch (this.game.physics.dimension) {
      case 2:
        // graphic.rotation.y = entityData.rotation + -Math.PI / 2;
        graphic.rotation = new BABYLON.Vector3(0, entityData.rotation, 0);
        break;
      case 3:
        if (_typeof(entityData.rotation) !== 'object') {
          throw new Error('3D is activate but rotation is not an object. Did you make sure to use `physx` engine?');
        }
        var quaternion = new BABYLON.Quaternion(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z, entityData.rotation.w);

        // Apply the quaternion rotation to the graphic
        graphic.rotationQuaternion = quaternion;
        break;
      default:
        throw new Error('Unknown physics dimensions, cannot update graphic');
        break;
    }
  }
}

},{}]},{},[2])(2)
});

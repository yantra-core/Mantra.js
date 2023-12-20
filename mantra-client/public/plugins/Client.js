(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Client = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var lastTick = Date.now();
var hzMS = 16.666; // 60 FPS

function gameTick() {
  var _this = this;
  this.tick++;
  // Calculate deltaTime in milliseconds
  var now = Date.now();
  var deltaTimeMS = now - lastTick; // Delta time in milliseconds
  lastTick = now;

  // Clamp deltaTime to avoid time spiral and ensure stability
  deltaTimeMS = Math.min(deltaTimeMS, hzMS);

  // Clear changed entities
  this.changedEntities.clear();
  this.removedEntities.clear();
  if (this.isClient) {
    // TODO: move to localGameLoop?
    this.systems['entity'].cleanupDestroyedEntities();
  }

  // Update the physics engine
  this.physics.updateEngine(this.physics.engine, deltaTimeMS);

  // run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Loop through entities that have changed
  // TODO: move rendering logic out of gameTick to Graphics.js
  var _iterator = _createForOfIteratorHelper(this.changedEntities),
    _step;
  try {
    var _loop = function _loop() {
      var entityId = _step.value;
      // we need a way for the local game mode to know when to render entities
      if (_this.isClient && _this.isOnline === false) {
        var ent = _this.entities.get(entityId);
        // pendingRender is not a component property yet, just ad-hoc on client
        ent.pendingRender = {};
        // flag each graphics interface as needing to render this entity
        // remark: this is local game mode only
        _this.graphics.forEach(function (graphicsInterface) {
          ent.pendingRender[graphicsInterface.id] = true;
        });
      }

      // TODO: move this to Bullet plugin
      var entity = _this.getEntity(entityId);
      // kinematic bullet movements on client
      if (_this.isClient && entity.type === 'BULLET') {
        // console.log("kinematic", entity)
        if (entity.graphics) {
          for (var g in entity.graphics) {
            var graphicInterface = _this.systems[g];
            if (graphicInterface) {
              graphicInterface.updateGraphic(entity);
            }
          }
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }

    // Save the game snapshot
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);

  // TODO: THESE should / could all be hooks, after::gameTick
}
var _default = exports["default"] = gameTick;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _LocalClient = _interopRequireDefault(require("./LocalClient.js"));
var _WebSocketClient = _interopRequireDefault(require("./WebSocketClient.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Client.js - Marak Squires 2023
// Mantra Client, connects to either local instance or remote websocket server
var Client = exports["default"] = /*#__PURE__*/function () {
  function Client() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$protobuf = _ref.protobuf,
      protobuf = _ref$protobuf === void 0 ? false : _ref$protobuf,
      _ref$msgpack = _ref.msgpack,
      msgpack = _ref$msgpack === void 0 ? false : _ref$msgpack,
      _ref$deltaEncoding = _ref.deltaEncoding,
      deltaEncoding = _ref$deltaEncoding === void 0 ? true : _ref$deltaEncoding,
      _ref$deltaCompression = _ref.deltaCompression,
      deltaCompression = _ref$deltaCompression === void 0 ? false : _ref$deltaCompression;
    _classCallCheck(this, Client);
    this.id = Client.id;
    // for convenience, separate fro game.config scope
    this.config = {
      protobuf: protobuf,
      msgpack: msgpack,
      deltaEncoding: deltaEncoding,
      deltaCompression: deltaCompression
    };
  }
  _createClass(Client, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // Load all known client plugins
      // For now, this is just localClient and websocketClient
      // Remark: We load both of them to allow for switching of local / remote modes
      // We could change this to only load WebSocketClient if .connect() is called
      game.use(new _LocalClient["default"]());
      game.use(new _WebSocketClient["default"]({
        protobuf: this.config.protobuf,
        msgpack: this.config.msgpack,
        deltaCompression: this.config.deltaCompression,
        deltaEncoding: this.config.deltaEncoding
      }));
      game.systemsManager.addSystem('client', this);
    }
  }, {
    key: "start",
    value: function start(callback) {
      var localClient = this.game.getSystem('localClient');
      localClient.start(callback);
    }
  }, {
    key: "stop",
    value: function stop() {
      console.log('Client.js plugin stopping game', this.game);
      // this.game.localGameLoopRunning = false;
      var localClient = this.game.getSystem('localClient');
      localClient.stop();
    }
  }, {
    key: "connect",
    value: function connect(url) {
      var websocketClient = this.game.getSystem('websocketClient');
      websocketClient.connect(url);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var websocketClient = this.game.getSystem('websocketClient');
      websocketClient.disconnect();
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(action, data) {
      var localClient = this.game.getSystem('localClient');
      localClient.sendMessage(action, data);
    }
  }]);
  return Client;
}();
_defineProperty(Client, "id", 'client');
_defineProperty(Client, "removable", false);

},{"./LocalClient.js":3,"./WebSocketClient.js":4}],3:[function(require,module,exports){
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
// LocalClient.js - Marak Squires 2023
// LocalClient is a client that runs the game loop locally, without a server
var LocalClient = exports["default"] = /*#__PURE__*/function () {
  function LocalClient() {
    _classCallCheck(this, LocalClient);
    this.started = false; // TODO: This doesn't seem ideal, we may not know the player name at this point
    this.id = LocalClient.id;
  }
  _createClass(LocalClient, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.isClient = true; // We may be able to remove this? It's currently not being used anywhere
      game.localGameLoopRunning = false;
      this.game.systemsManager.addSystem('localClient', this);
    }
  }, {
    key: "start",
    value: function start(callback) {
      var game = this.game;
      if (typeof callback === 'undefined') {
        callback = function noop() {};
      }
      this.game.isOnline = false;
      var self = this;
      callback(null, true);
      this.game.emit('start');
      if (this.game.systems.xstate) {
        this.game.systems.xstate.sendEvent('START');
      }
      this.game.localGameLoopRunning = true;
      this.game.localGameLoop(this.game); // Start the local game loop when offline

      this.game.communicationClient = this;
      this.game.createPlayer({
        type: 'PLAYER'
      }).then(function (ent) {
        game.setPlayerId(ent.id);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.game.localGameLoopRunning = false;
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(action, data) {
      if (action === 'player_input') {
        if (!this.game.systems['entity-input']) {
          console.log('entity-input system not found, skipping player_input action to sendMessage');
          return;
        }
        var entityInput = this.game.getSystem('entity-input');
        entityInput.handleInputs(this.game.currentPlayerId, {
          controls: data.controls,
          mouse: data.mouse
        });
      }
    }
  }]);
  return LocalClient;
}();
_defineProperty(LocalClient, "id", 'client-local');

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _msgpack = require("@msgpack/msgpack");
var _deltaCompression = _interopRequireDefault(require("../snapshot-manager/SnapshotManager/deltaCompression.js"));
var _interpolateSnapshot = _interopRequireDefault(require("./lib/interpolateSnapshot.js"));
var _messageSchema = _interopRequireDefault(require("../server/messageSchema.js"));
var _gameTick = _interopRequireDefault(require("../../lib/gameTick.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // WebSocketClient.js - Marak Squires 2023
var encoder = new TextEncoder();
var hzMS = 16.666; // TODO: config with Game.fps
var config = {};
// default encoding is protobuf, turn this on to connect websocket server ( not cloudflare )
// cloudflare edge server requires msgpack due to: https://github.com/protobufjs/protobuf.js/pull/1941
// should be resolved soon, but for now we need to use msgpack
var WebSocketClient = exports["default"] = /*#__PURE__*/function () {
  function WebSocketClient(_ref) {
    var _ref$protobuf = _ref.protobuf,
      protobuf = _ref$protobuf === void 0 ? false : _ref$protobuf,
      _ref$msgpack = _ref.msgpack,
      msgpack = _ref$msgpack === void 0 ? false : _ref$msgpack,
      _ref$deltaCompression = _ref.deltaCompression,
      deltaCompression = _ref$deltaCompression === void 0 ? false : _ref$deltaCompression;
    _classCallCheck(this, WebSocketClient);
    this.id = WebSocketClient.id;

    // For convenience, separate from game.config scope
    this.config = {
      protobuf: protobuf,
      msgpack: msgpack,
      deltaCompression: deltaCompression
    };
    console.log("WebSocketClient is using ClientConfig", this.config);
    this.listeners = {};
    this.connected = false;
    this.pingIntervalId = null;
    this.rtt = undefined;
    this.rttMeasurements = [];
    this.snapshotSizeMeasurements = []; // Array to store snapshot sizes
    this.totalSnapshotSize = 0; // Total size of all snapshots
    this.snapshotCount = 0; // Number of snapshots received
    this.reportFrequency = 10; // for example, report every 10 game ticks
  }
  _createClass(WebSocketClient, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      //this.game.connect = this.connect.bind(this);
      //this.game.disconnect = this.disconnect.bind(this);
      this.game.systemsManager.addSystem('websocketClient', this);
    }
  }, {
    key: "wsConnectionStringFromWindow",
    value: function wsConnectionStringFromWindow() {
      var url;
      var host = window.location.hostname;
      var port = window.location.port;
      if (port == 7777) {
        // special case for dev mode, since we run separate client and server ports
        port = 8888;
      }
      // detect if browser is https or http
      var protocol = window.location.protocol;
      // create a new wsConnectionString using the host and port and protocol
      var wsConnectionString = "".concat(protocol === 'https:' ? 'wss' : 'ws', "://").concat(host, ":").concat(port, "/websocket");
      // assign the new url to the url variable
      url = wsConnectionString;
      return url;
    }
  }, {
    key: "connect",
    value: function connect(url) {
      // if no url is provided, construct a websocket connection string based on current url
      if (typeof url === 'undefined' && typeof window !== 'undefined') {
        url = this.wsConnectionStringFromWindow();
      }
      console.log('connecting to', url);
      var self = this;
      this.inputBuffer = {};
      this.inputSequenceNumber = 0;
      this.latestSnapshot = null;
      this.previousSnapshot = null;
      this.connected = true;
      this.game.communicationClient = this;
      this.game.onlineGameLoopRunning = true;
      this.socket = new WebSocket(url);
      this.socket.binaryType = 'arraybuffer';
      this.socket.onopen = this.handleOpen.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onerror = this.handleError.bind(this);
      this.game.onlineGameLoop(this.game);
      this.game.emit('connected');
      // Start measuring RTT
      this.startRttMeasurement();

      // start a clock for cloudflare edge games, if we haven't much forward in gamestate, send a gametick event
      // to server in attempt to restart paused game
      /* TODO: add this as part of edge server ticker election in case of lockup
      setTimeout(function(){
        // check to see the gameTick count is above 3
        if (self.game.tick > 120) {
          console.log("GOT TICKS")
          // alert('got 120 ticks')
        }
      }, 5000)
      */
    }
  }, {
    key: "startRttMeasurement",
    value: function startRttMeasurement() {
      var _this = this;
      this.pingIntervalId = setInterval(function () {
        var start = Date.now();
        _this.lastPingTime = Date.now();
        _this.socket.send(JSON.stringify({
          action: 'PING'
        }));
        _this.on('PONG', function () {
          var end = Date.now();
          var rtt = end - start;
          _this.rttMeasurements.push(rtt);
          if (_this.rttMeasurements.length > 10) {
            // Use the last 10 measurements to get an average
            _this.rttMeasurements.shift(); // Remove the oldest measurement
          }

          _this.rtt = _this.rttMeasurements.reduce(function (a, b) {
            return a + b;
          }, 0) / _this.rttMeasurements.length;
          // Emit the 'pingtime' event with the current RTT
          _this.game.emit('pingtime', _this.rtt);
        });
      }, 1000); // Send a ping every 5 seconds
    }

    // Call this method when the WebSocket is closed
  }, {
    key: "stopRttMeasurement",
    value: function stopRttMeasurement() {
      clearInterval(this.pingIntervalId);
    }
  }, {
    key: "startTicking",
    value: function startTicking() {
      var _this2 = this;
      // Calculate the interval to send ticks slightly faster than hzMS, accounting for RTT
      var tickInterval = Math.max(hzMS - (this.rtt || 100) / 2, 1); // Ensure the interval is never less than 1ms

      setInterval(function () {
        // Include the clientTickTime based on the current time and RTT
        var clientTickTime = Date.now() + _this2.rtt;
        var tickMessage = JSON.stringify({
          action: 'GAMETICK',
          clientTickTime: clientTickTime
        });
        _this2.socket.send(tickMessage);
      }, tickInterval);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.close();
      this.game.onlineGameLoopRunning = false;
      // clear snapshot size tracking
      this.totalSnapshotSize = 0;
      this.snapshotCount = 0;
      this.snapshotSizeMeasurements = [];
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(action) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.connected) {
        console.error('not connected will not attempt to send message', action, data);
        return;
      }
      if (action === 'player_input') {
        this.inputSequenceNumber++;
        this.inputBuffer[this.inputSequenceNumber] = data;
        var entityInput = this.game.getSystem('entity-input');
        //
        // TODO: switch flag config for isClientSidePredictionEnabled
        //
        // Remark: In order to enable client-side prediction we'll need to uncomment the following line:
        // Remark: Client-side prediction is close; however we were seeing some ghosting issues
        //         More unit tests and test coverage is required for: snapshots, interpolation, and prediction
        /*
          entityInput.handleInputs(this.playerId, {
          controls: data.controls,
          mouse: data.mouse
        }, this.inputSequenceNumber);
         */

        var message = JSON.stringify(Object.assign({
          action: action,
          sequenceNumber: this.inputSequenceNumber
        }, data));
        this.socket.send(message);
      } else {
        var message = JSON.stringify(Object.assign({
          action: action
        }, data));
        this.socket.send(message);
      }
    }
  }, {
    key: "handleOpen",
    value: function handleOpen(event) {
      console.log('WebSocket is connected:', event);
    }
  }, {
    key: "handleMessage",
    value: function () {
      var _handleMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
        var game, data, end, uint8Array, message, object, lastProcessedInput, i, input, entityInput, _i;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              game = this.game;
              data = event.data; // Track the size of the snapshot
              this.trackSnapshotSize(data);
              if (typeof event.data === 'string') {
                data = JSON.parse(event.data);
              }
              if (!(data.action === "ASSIGN_ID")) {
                _context.next = 8;
                break;
              }
              // in client mode will set the authorized player id
              game.setPlayerId(data.playerId);
              this.playerId = data.playerId;
              return _context.abrupt("return");
            case 8:
              if (!(data.action === 'BECOME_TICKER')) {
                _context.next = 11;
                break;
              }
              this.startTicking(this.socket);
              return _context.abrupt("return");
            case 11:
              if (!(data.action === 'PONG')) {
                _context.next = 16;
                break;
              }
              end = Date.now();
              this.rtt = end - this.lastPingTime;
              if (this.listeners['PONG']) {
                this.listeners['PONG'](this.rtt);
              }
              return _context.abrupt("return");
            case 16:
              if (this.config.msgpack) {
                data = (0, _msgpack.decode)(data);
              }

              /*
              if (config.bbb) {
                const byteArray = await decodeBlob(data);
                let receivedBuffer = new BitBuffer(byteArray.length * 8); // Create a new BitBuffer
                receivedBuffer.byteArray = byteArray; // Set the byteArray
                let bbbDecoded = bbb.decode(messageSchema, receivedBuffer);
                data = bbbDecoded;
              }
              */

              if (this.config.protobuf) {
                // data is current blog, needs to be converted to buffer?
                uint8Array = new Uint8Array(data);
                message = game.Message.decode(uint8Array); // Convert the message back to a plain object
                object = game.Message.toObject(message, {
                  longs: String,
                  enums: String,
                  bytes: String
                  // see ConversionOptions
                });

                data = object;
              }
              if (this.config.deltaCompression) {
                // "player1" can be any string, as long as its consistent on the local client
                data = _deltaCompression["default"].decompress('player1', data);
              }
              if (data.action === "GAMETICK") {
                this.game.previousSnapshot = this.game.latestSnapshot;
                this.game.latestSnapshot = data;
                game.snapshotQueue.push(data);
                // TODO: add config flag here for snapshot interpolation
                // let inter = interpolateSnapshot(1, this.game.previousSnapshot, this.game.latestSnapshot);
                // console.log(inter)
                if (this.isServerSideReconciliationEnabled && typeof data.lastProcessedInput !== 'undefined') {
                  lastProcessedInput = data.lastProcessedInput[this.playerId];
                  if (lastProcessedInput < this.inputSequenceNumber) {
                    for (i = lastProcessedInput + 1; i <= this.inputSequenceNumber; i++) {
                      input = this.inputBuffer[i];
                      entityInput = this.game.getSystem('entity-input');
                      entityInput.handleInputs(this.game.currentPlayerId, {
                        controls: input.controls,
                        mouse: input.controls
                      }, i);
                    }
                  }
                  // Clear the already processed inputs from the inputBuffer
                  for (_i = 0; _i <= lastProcessedInput; _i++) {
                    delete this.inputBuffer[_i];
                  }
                } else {
                  // If server-side Server Side Reconciliation is disabled
                  // do nothing
                }
                // Remark: we could have an update() function here to help manage snapshot state
                // We are currently using `previousSnapshot` and `latestSnapshot` in client.js loops
              }
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function handleMessage(_x) {
        return _handleMessage.apply(this, arguments);
      }
      return handleMessage;
    }()
  }, {
    key: "handleClose",
    value: function handleClose(event) {
      console.log('WebSocket is closed:', event);
      this.stopRttMeasurement();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      console.error('WebSocket error:', error);
    }
  }, {
    key: "on",
    value: function on(action, callback) {
      this.listeners[action] = callback;
    }
  }, {
    key: "getInterpolatedSnapshot",
    value: function getInterpolatedSnapshot(alpha) {
      // bind this scope to interpolateSnapshot
      return _interpolateSnapshot["default"].call(this, alpha);
    }

    // This method tracks the size of each snapshot and calculates the average
  }, {
    key: "trackSnapshotSize",
    value: function trackSnapshotSize(data) {
      // if data is string convert to blob
      // in most cases message with be binary blob already
      if (typeof data === 'string') {
        data = encoder.encode(data);
      }
      var uint8Array = new Uint8Array(data);
      var size = uint8Array.length;
      // console.log(dataString)
      // In a browser environment, create a new Blob and get its size

      this.totalSnapshotSize += size;
      this.snapshotCount++;
      this.snapshotSizeMeasurements.push(size);

      // Emit the 'snapshotsize' event with the current average size
      if (this.snapshotCount > 0 && this.snapshotCount % this.reportFrequency === 0) {
        var averageSize = this.totalSnapshotSize / this.snapshotCount;
        this.game.emit('snapshotsize', averageSize);
      }
    }
  }]);
  return WebSocketClient;
}();
_defineProperty(WebSocketClient, "id", 'websocket-client');
function decodeFromBlob(_x2) {
  return _decodeFromBlob.apply(this, arguments);
}
function _decodeFromBlob() {
  _decodeFromBlob = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(blob) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!blob.stream) {
            _context2.next = 6;
            break;
          }
          _context2.next = 3;
          return (0, _msgpack.decodeAsync)(blob.stream());
        case 3:
          return _context2.abrupt("return", _context2.sent);
        case 6:
          _context2.t0 = _msgpack.decode;
          _context2.next = 9;
          return blob.arrayBuffer();
        case 9:
          _context2.t1 = _context2.sent;
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _decodeFromBlob.apply(this, arguments);
}
function blobToArrayBuffer(blob) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onloadend = function () {
      return resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}
function decodeBlob(_x3) {
  return _decodeBlob.apply(this, arguments);
}
function _decodeBlob() {
  _decodeBlob = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(blob) {
    var arrayBuffer, byteArray;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return blobToArrayBuffer(blob);
        case 2:
          arrayBuffer = _context3.sent;
          byteArray = new Uint8Array(arrayBuffer); // Now you can use this byteArray to reconstruct your BitBuffer
          return _context3.abrupt("return", byteArray);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _decodeBlob.apply(this, arguments);
}

},{"../../lib/gameTick.js":1,"../server/messageSchema.js":22,"../snapshot-manager/SnapshotManager/deltaCompression.js":23,"./lib/interpolateSnapshot.js":5,"@msgpack/msgpack":15}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function iterpolateSnapshot(alpha, previousSnapshot, latestSnapshot) {
  alpha = 1;
  if (!previousSnapshot || !latestSnapshot) {
    return latestSnapshot;
  }

  // Assuming both snapshots are arrays of state objects
  var interpolatedSnapshot = [];
  var _loop = function _loop() {
    var currentState = latestSnapshot.state[i];

    // Find corresponding state in previousSnapshot by matching some unique identifier (e.g., id)
    var prevState = previousSnapshot.state.find(function (state) {
      return state.id === currentState.id;
    });
    if (!prevState) {
      // You might choose to handle this differently, e.g., by using currentState directly
      return 1; // continue
      // Skip this state if it wasn't present in the previous snapshot
    }
    var interpolatedState = {
      id: currentState.id,
      // or prevState.id, since they should be the same
      position: {
        x: 0,
        y: 0
      },
      rotation: 0
    };

    // Interpolate position.x and position.y
    if (prevState.position && currentState.position) {
      interpolatedState.position.x = prevState.position.x + (currentState.position.x - prevState.position.x) * alpha;
      interpolatedState.position.y = prevState.position.y + (currentState.position.y - prevState.position.y) * alpha;
    }

    // Interpolate rotation
    if (typeof prevState.rotation !== 'undefined' && typeof currentState.rotation !== 'undefined') {
      interpolatedState.rotation = prevState.rotation + (currentState.rotation - prevState.rotation) * alpha;
    }
    interpolatedSnapshot.push(interpolatedState);
  };
  for (var i = 0; i < latestSnapshot.state.length; i++) {
    if (_loop()) continue;
  }
  return {
    state: interpolatedSnapshot
  };
}
var _default = exports["default"] = iterpolateSnapshot;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedKeyDecoder = void 0;
const utf8_1 = require("./utils/utf8");
const DEFAULT_MAX_KEY_LENGTH = 16;
const DEFAULT_MAX_LENGTH_PER_KEY = 16;
class CachedKeyDecoder {
    constructor(maxKeyLength = DEFAULT_MAX_KEY_LENGTH, maxLengthPerKey = DEFAULT_MAX_LENGTH_PER_KEY) {
        this.maxKeyLength = maxKeyLength;
        this.maxLengthPerKey = maxLengthPerKey;
        this.hit = 0;
        this.miss = 0;
        // avoid `new Array(N)`, which makes a sparse array,
        // because a sparse array is typically slower than a non-sparse array.
        this.caches = [];
        for (let i = 0; i < this.maxKeyLength; i++) {
            this.caches.push([]);
        }
    }
    canBeCached(byteLength) {
        return byteLength > 0 && byteLength <= this.maxKeyLength;
    }
    find(bytes, inputOffset, byteLength) {
        const records = this.caches[byteLength - 1];
        FIND_CHUNK: for (const record of records) {
            const recordBytes = record.bytes;
            for (let j = 0; j < byteLength; j++) {
                if (recordBytes[j] !== bytes[inputOffset + j]) {
                    continue FIND_CHUNK;
                }
            }
            return record.str;
        }
        return null;
    }
    store(bytes, value) {
        const records = this.caches[bytes.length - 1];
        const record = { bytes, str: value };
        if (records.length >= this.maxLengthPerKey) {
            // `records` are full!
            // Set `record` to an arbitrary position.
            records[(Math.random() * records.length) | 0] = record;
        }
        else {
            records.push(record);
        }
    }
    decode(bytes, inputOffset, byteLength) {
        const cachedValue = this.find(bytes, inputOffset, byteLength);
        if (cachedValue != null) {
            this.hit++;
            return cachedValue;
        }
        this.miss++;
        const str = (0, utf8_1.utf8DecodeJs)(bytes, inputOffset, byteLength);
        // Ensure to copy a slice of bytes because the byte may be NodeJS Buffer and Buffer#slice() returns a reference to its internal ArrayBuffer.
        const slicedCopyOfBytes = Uint8Array.prototype.slice.call(bytes, inputOffset, inputOffset + byteLength);
        this.store(slicedCopyOfBytes, str);
        return str;
    }
}
exports.CachedKeyDecoder = CachedKeyDecoder;

},{"./utils/utf8":21}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeError = void 0;
class DecodeError extends Error {
    constructor(message) {
        super(message);
        // fix the prototype chain in a cross-platform way
        const proto = Object.create(DecodeError.prototype);
        Object.setPrototypeOf(this, proto);
        Object.defineProperty(this, "name", {
            configurable: true,
            enumerable: false,
            value: DecodeError.name,
        });
    }
}
exports.DecodeError = DecodeError;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = exports.DataViewIndexOutOfBoundsError = void 0;
const prettyByte_1 = require("./utils/prettyByte");
const ExtensionCodec_1 = require("./ExtensionCodec");
const int_1 = require("./utils/int");
const utf8_1 = require("./utils/utf8");
const typedArrays_1 = require("./utils/typedArrays");
const CachedKeyDecoder_1 = require("./CachedKeyDecoder");
const DecodeError_1 = require("./DecodeError");
const STATE_ARRAY = "array";
const STATE_MAP_KEY = "map_key";
const STATE_MAP_VALUE = "map_value";
const isValidMapKeyType = (key) => {
    return typeof key === "string" || typeof key === "number";
};
const HEAD_BYTE_REQUIRED = -1;
const EMPTY_VIEW = new DataView(new ArrayBuffer(0));
const EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
    // IE11: The spec says it should throw RangeError,
    // IE11: but in IE11 it throws TypeError.
    EMPTY_VIEW.getInt8(0);
}
catch (e) {
    if (!(e instanceof RangeError)) {
        throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
    }
}
exports.DataViewIndexOutOfBoundsError = RangeError;
const MORE_DATA = new exports.DataViewIndexOutOfBoundsError("Insufficient data");
const sharedCachedKeyDecoder = new CachedKeyDecoder_1.CachedKeyDecoder();
class Decoder {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.totalPos = 0;
        this.pos = 0;
        this.view = EMPTY_VIEW;
        this.bytes = EMPTY_BYTES;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack = [];
        this.extensionCodec = (_a = options === null || options === void 0 ? void 0 : options.extensionCodec) !== null && _a !== void 0 ? _a : ExtensionCodec_1.ExtensionCodec.defaultCodec;
        this.context = options === null || options === void 0 ? void 0 : options.context; // needs a type assertion because EncoderOptions has no context property when ContextType is undefined
        this.useBigInt64 = (_b = options === null || options === void 0 ? void 0 : options.useBigInt64) !== null && _b !== void 0 ? _b : false;
        this.maxStrLength = (_c = options === null || options === void 0 ? void 0 : options.maxStrLength) !== null && _c !== void 0 ? _c : int_1.UINT32_MAX;
        this.maxBinLength = (_d = options === null || options === void 0 ? void 0 : options.maxBinLength) !== null && _d !== void 0 ? _d : int_1.UINT32_MAX;
        this.maxArrayLength = (_e = options === null || options === void 0 ? void 0 : options.maxArrayLength) !== null && _e !== void 0 ? _e : int_1.UINT32_MAX;
        this.maxMapLength = (_f = options === null || options === void 0 ? void 0 : options.maxMapLength) !== null && _f !== void 0 ? _f : int_1.UINT32_MAX;
        this.maxExtLength = (_g = options === null || options === void 0 ? void 0 : options.maxExtLength) !== null && _g !== void 0 ? _g : int_1.UINT32_MAX;
        this.keyDecoder = ((options === null || options === void 0 ? void 0 : options.keyDecoder) !== undefined) ? options.keyDecoder : sharedCachedKeyDecoder;
    }
    reinitializeState() {
        this.totalPos = 0;
        this.headByte = HEAD_BYTE_REQUIRED;
        this.stack.length = 0;
        // view, bytes, and pos will be re-initialized in setBuffer()
    }
    setBuffer(buffer) {
        this.bytes = (0, typedArrays_1.ensureUint8Array)(buffer);
        this.view = (0, typedArrays_1.createDataView)(this.bytes);
        this.pos = 0;
    }
    appendBuffer(buffer) {
        if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1)) {
            this.setBuffer(buffer);
        }
        else {
            const remainingData = this.bytes.subarray(this.pos);
            const newData = (0, typedArrays_1.ensureUint8Array)(buffer);
            // concat remainingData + newData
            const newBuffer = new Uint8Array(remainingData.length + newData.length);
            newBuffer.set(remainingData);
            newBuffer.set(newData, remainingData.length);
            this.setBuffer(newBuffer);
        }
    }
    hasRemaining(size) {
        return this.view.byteLength - this.pos >= size;
    }
    createExtraByteError(posToShow) {
        const { view, pos } = this;
        return new RangeError(`Extra ${view.byteLength - pos} of ${view.byteLength} byte(s) found at buffer[${posToShow}]`);
    }
    /**
     * @throws {@link DecodeError}
     * @throws {@link RangeError}
     */
    decode(buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        const object = this.doDecodeSync();
        if (this.hasRemaining(1)) {
            throw this.createExtraByteError(this.pos);
        }
        return object;
    }
    *decodeMulti(buffer) {
        this.reinitializeState();
        this.setBuffer(buffer);
        while (this.hasRemaining(1)) {
            yield this.doDecodeSync();
        }
    }
    async decodeAsync(stream) {
        let decoded = false;
        let object;
        for await (const buffer of stream) {
            if (decoded) {
                throw this.createExtraByteError(this.totalPos);
            }
            this.appendBuffer(buffer);
            try {
                object = this.doDecodeSync();
                decoded = true;
            }
            catch (e) {
                if (!(e instanceof exports.DataViewIndexOutOfBoundsError)) {
                    throw e; // rethrow
                }
                // fallthrough
            }
            this.totalPos += this.pos;
        }
        if (decoded) {
            if (this.hasRemaining(1)) {
                throw this.createExtraByteError(this.totalPos);
            }
            return object;
        }
        const { headByte, pos, totalPos } = this;
        throw new RangeError(`Insufficient data in parsing ${(0, prettyByte_1.prettyByte)(headByte)} at ${totalPos} (${pos} in the current buffer)`);
    }
    decodeArrayStream(stream) {
        return this.decodeMultiAsync(stream, true);
    }
    decodeStream(stream) {
        return this.decodeMultiAsync(stream, false);
    }
    async *decodeMultiAsync(stream, isArray) {
        let isArrayHeaderRequired = isArray;
        let arrayItemsLeft = -1;
        for await (const buffer of stream) {
            if (isArray && arrayItemsLeft === 0) {
                throw this.createExtraByteError(this.totalPos);
            }
            this.appendBuffer(buffer);
            if (isArrayHeaderRequired) {
                arrayItemsLeft = this.readArraySize();
                isArrayHeaderRequired = false;
                this.complete();
            }
            try {
                while (true) {
                    yield this.doDecodeSync();
                    if (--arrayItemsLeft === 0) {
                        break;
                    }
                }
            }
            catch (e) {
                if (!(e instanceof exports.DataViewIndexOutOfBoundsError)) {
                    throw e; // rethrow
                }
                // fallthrough
            }
            this.totalPos += this.pos;
        }
    }
    doDecodeSync() {
        DECODE: while (true) {
            const headByte = this.readHeadByte();
            let object;
            if (headByte >= 0xe0) {
                // negative fixint (111x xxxx) 0xe0 - 0xff
                object = headByte - 0x100;
            }
            else if (headByte < 0xc0) {
                if (headByte < 0x80) {
                    // positive fixint (0xxx xxxx) 0x00 - 0x7f
                    object = headByte;
                }
                else if (headByte < 0x90) {
                    // fixmap (1000 xxxx) 0x80 - 0x8f
                    const size = headByte - 0x80;
                    if (size !== 0) {
                        this.pushMapState(size);
                        this.complete();
                        continue DECODE;
                    }
                    else {
                        object = {};
                    }
                }
                else if (headByte < 0xa0) {
                    // fixarray (1001 xxxx) 0x90 - 0x9f
                    const size = headByte - 0x90;
                    if (size !== 0) {
                        this.pushArrayState(size);
                        this.complete();
                        continue DECODE;
                    }
                    else {
                        object = [];
                    }
                }
                else {
                    // fixstr (101x xxxx) 0xa0 - 0xbf
                    const byteLength = headByte - 0xa0;
                    object = this.decodeUtf8String(byteLength, 0);
                }
            }
            else if (headByte === 0xc0) {
                // nil
                object = null;
            }
            else if (headByte === 0xc2) {
                // false
                object = false;
            }
            else if (headByte === 0xc3) {
                // true
                object = true;
            }
            else if (headByte === 0xca) {
                // float 32
                object = this.readF32();
            }
            else if (headByte === 0xcb) {
                // float 64
                object = this.readF64();
            }
            else if (headByte === 0xcc) {
                // uint 8
                object = this.readU8();
            }
            else if (headByte === 0xcd) {
                // uint 16
                object = this.readU16();
            }
            else if (headByte === 0xce) {
                // uint 32
                object = this.readU32();
            }
            else if (headByte === 0xcf) {
                // uint 64
                if (this.useBigInt64) {
                    object = this.readU64AsBigInt();
                }
                else {
                    object = this.readU64();
                }
            }
            else if (headByte === 0xd0) {
                // int 8
                object = this.readI8();
            }
            else if (headByte === 0xd1) {
                // int 16
                object = this.readI16();
            }
            else if (headByte === 0xd2) {
                // int 32
                object = this.readI32();
            }
            else if (headByte === 0xd3) {
                // int 64
                if (this.useBigInt64) {
                    object = this.readI64AsBigInt();
                }
                else {
                    object = this.readI64();
                }
            }
            else if (headByte === 0xd9) {
                // str 8
                const byteLength = this.lookU8();
                object = this.decodeUtf8String(byteLength, 1);
            }
            else if (headByte === 0xda) {
                // str 16
                const byteLength = this.lookU16();
                object = this.decodeUtf8String(byteLength, 2);
            }
            else if (headByte === 0xdb) {
                // str 32
                const byteLength = this.lookU32();
                object = this.decodeUtf8String(byteLength, 4);
            }
            else if (headByte === 0xdc) {
                // array 16
                const size = this.readU16();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = [];
                }
            }
            else if (headByte === 0xdd) {
                // array 32
                const size = this.readU32();
                if (size !== 0) {
                    this.pushArrayState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = [];
                }
            }
            else if (headByte === 0xde) {
                // map 16
                const size = this.readU16();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = {};
                }
            }
            else if (headByte === 0xdf) {
                // map 32
                const size = this.readU32();
                if (size !== 0) {
                    this.pushMapState(size);
                    this.complete();
                    continue DECODE;
                }
                else {
                    object = {};
                }
            }
            else if (headByte === 0xc4) {
                // bin 8
                const size = this.lookU8();
                object = this.decodeBinary(size, 1);
            }
            else if (headByte === 0xc5) {
                // bin 16
                const size = this.lookU16();
                object = this.decodeBinary(size, 2);
            }
            else if (headByte === 0xc6) {
                // bin 32
                const size = this.lookU32();
                object = this.decodeBinary(size, 4);
            }
            else if (headByte === 0xd4) {
                // fixext 1
                object = this.decodeExtension(1, 0);
            }
            else if (headByte === 0xd5) {
                // fixext 2
                object = this.decodeExtension(2, 0);
            }
            else if (headByte === 0xd6) {
                // fixext 4
                object = this.decodeExtension(4, 0);
            }
            else if (headByte === 0xd7) {
                // fixext 8
                object = this.decodeExtension(8, 0);
            }
            else if (headByte === 0xd8) {
                // fixext 16
                object = this.decodeExtension(16, 0);
            }
            else if (headByte === 0xc7) {
                // ext 8
                const size = this.lookU8();
                object = this.decodeExtension(size, 1);
            }
            else if (headByte === 0xc8) {
                // ext 16
                const size = this.lookU16();
                object = this.decodeExtension(size, 2);
            }
            else if (headByte === 0xc9) {
                // ext 32
                const size = this.lookU32();
                object = this.decodeExtension(size, 4);
            }
            else {
                throw new DecodeError_1.DecodeError(`Unrecognized type byte: ${(0, prettyByte_1.prettyByte)(headByte)}`);
            }
            this.complete();
            const stack = this.stack;
            while (stack.length > 0) {
                // arrays and maps
                const state = stack[stack.length - 1];
                if (state.type === STATE_ARRAY) {
                    state.array[state.position] = object;
                    state.position++;
                    if (state.position === state.size) {
                        stack.pop();
                        object = state.array;
                    }
                    else {
                        continue DECODE;
                    }
                }
                else if (state.type === STATE_MAP_KEY) {
                    if (!isValidMapKeyType(object)) {
                        throw new DecodeError_1.DecodeError("The type of key must be string or number but " + typeof object);
                    }
                    if (object === "__proto__") {
                        throw new DecodeError_1.DecodeError("The key __proto__ is not allowed");
                    }
                    state.key = object;
                    state.type = STATE_MAP_VALUE;
                    continue DECODE;
                }
                else {
                    // it must be `state.type === State.MAP_VALUE` here
                    state.map[state.key] = object;
                    state.readCount++;
                    if (state.readCount === state.size) {
                        stack.pop();
                        object = state.map;
                    }
                    else {
                        state.key = null;
                        state.type = STATE_MAP_KEY;
                        continue DECODE;
                    }
                }
            }
            return object;
        }
    }
    readHeadByte() {
        if (this.headByte === HEAD_BYTE_REQUIRED) {
            this.headByte = this.readU8();
            // console.log("headByte", prettyByte(this.headByte));
        }
        return this.headByte;
    }
    complete() {
        this.headByte = HEAD_BYTE_REQUIRED;
    }
    readArraySize() {
        const headByte = this.readHeadByte();
        switch (headByte) {
            case 0xdc:
                return this.readU16();
            case 0xdd:
                return this.readU32();
            default: {
                if (headByte < 0xa0) {
                    return headByte - 0x90;
                }
                else {
                    throw new DecodeError_1.DecodeError(`Unrecognized array type byte: ${(0, prettyByte_1.prettyByte)(headByte)}`);
                }
            }
        }
    }
    pushMapState(size) {
        if (size > this.maxMapLength) {
            throw new DecodeError_1.DecodeError(`Max length exceeded: map length (${size}) > maxMapLengthLength (${this.maxMapLength})`);
        }
        this.stack.push({
            type: STATE_MAP_KEY,
            size,
            key: null,
            readCount: 0,
            map: {},
        });
    }
    pushArrayState(size) {
        if (size > this.maxArrayLength) {
            throw new DecodeError_1.DecodeError(`Max length exceeded: array length (${size}) > maxArrayLength (${this.maxArrayLength})`);
        }
        this.stack.push({
            type: STATE_ARRAY,
            size,
            array: new Array(size),
            position: 0,
        });
    }
    decodeUtf8String(byteLength, headerOffset) {
        var _a;
        if (byteLength > this.maxStrLength) {
            throw new DecodeError_1.DecodeError(`Max length exceeded: UTF-8 byte length (${byteLength}) > maxStrLength (${this.maxStrLength})`);
        }
        if (this.bytes.byteLength < this.pos + headerOffset + byteLength) {
            throw MORE_DATA;
        }
        const offset = this.pos + headerOffset;
        let object;
        if (this.stateIsMapKey() && ((_a = this.keyDecoder) === null || _a === void 0 ? void 0 : _a.canBeCached(byteLength))) {
            object = this.keyDecoder.decode(this.bytes, offset, byteLength);
        }
        else {
            object = (0, utf8_1.utf8Decode)(this.bytes, offset, byteLength);
        }
        this.pos += headerOffset + byteLength;
        return object;
    }
    stateIsMapKey() {
        if (this.stack.length > 0) {
            const state = this.stack[this.stack.length - 1];
            return state.type === STATE_MAP_KEY;
        }
        return false;
    }
    decodeBinary(byteLength, headOffset) {
        if (byteLength > this.maxBinLength) {
            throw new DecodeError_1.DecodeError(`Max length exceeded: bin length (${byteLength}) > maxBinLength (${this.maxBinLength})`);
        }
        if (!this.hasRemaining(byteLength + headOffset)) {
            throw MORE_DATA;
        }
        const offset = this.pos + headOffset;
        const object = this.bytes.subarray(offset, offset + byteLength);
        this.pos += headOffset + byteLength;
        return object;
    }
    decodeExtension(size, headOffset) {
        if (size > this.maxExtLength) {
            throw new DecodeError_1.DecodeError(`Max length exceeded: ext length (${size}) > maxExtLength (${this.maxExtLength})`);
        }
        const extType = this.view.getInt8(this.pos + headOffset);
        const data = this.decodeBinary(size, headOffset + 1 /* extType */);
        return this.extensionCodec.decode(data, extType, this.context);
    }
    lookU8() {
        return this.view.getUint8(this.pos);
    }
    lookU16() {
        return this.view.getUint16(this.pos);
    }
    lookU32() {
        return this.view.getUint32(this.pos);
    }
    readU8() {
        const value = this.view.getUint8(this.pos);
        this.pos++;
        return value;
    }
    readI8() {
        const value = this.view.getInt8(this.pos);
        this.pos++;
        return value;
    }
    readU16() {
        const value = this.view.getUint16(this.pos);
        this.pos += 2;
        return value;
    }
    readI16() {
        const value = this.view.getInt16(this.pos);
        this.pos += 2;
        return value;
    }
    readU32() {
        const value = this.view.getUint32(this.pos);
        this.pos += 4;
        return value;
    }
    readI32() {
        const value = this.view.getInt32(this.pos);
        this.pos += 4;
        return value;
    }
    readU64() {
        const value = (0, int_1.getUint64)(this.view, this.pos);
        this.pos += 8;
        return value;
    }
    readI64() {
        const value = (0, int_1.getInt64)(this.view, this.pos);
        this.pos += 8;
        return value;
    }
    readU64AsBigInt() {
        const value = this.view.getBigUint64(this.pos);
        this.pos += 8;
        return value;
    }
    readI64AsBigInt() {
        const value = this.view.getBigInt64(this.pos);
        this.pos += 8;
        return value;
    }
    readF32() {
        const value = this.view.getFloat32(this.pos);
        this.pos += 4;
        return value;
    }
    readF64() {
        const value = this.view.getFloat64(this.pos);
        this.pos += 8;
        return value;
    }
}
exports.Decoder = Decoder;

},{"./CachedKeyDecoder":6,"./DecodeError":7,"./ExtensionCodec":11,"./utils/int":17,"./utils/prettyByte":18,"./utils/typedArrays":20,"./utils/utf8":21}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoder = exports.DEFAULT_INITIAL_BUFFER_SIZE = exports.DEFAULT_MAX_DEPTH = void 0;
const utf8_1 = require("./utils/utf8");
const ExtensionCodec_1 = require("./ExtensionCodec");
const int_1 = require("./utils/int");
const typedArrays_1 = require("./utils/typedArrays");
exports.DEFAULT_MAX_DEPTH = 100;
exports.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
class Encoder {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.extensionCodec = (_a = options === null || options === void 0 ? void 0 : options.extensionCodec) !== null && _a !== void 0 ? _a : ExtensionCodec_1.ExtensionCodec.defaultCodec;
        this.context = options === null || options === void 0 ? void 0 : options.context; // needs a type assertion because EncoderOptions has no context property when ContextType is undefined
        this.useBigInt64 = (_b = options === null || options === void 0 ? void 0 : options.useBigInt64) !== null && _b !== void 0 ? _b : false;
        this.maxDepth = (_c = options === null || options === void 0 ? void 0 : options.maxDepth) !== null && _c !== void 0 ? _c : exports.DEFAULT_MAX_DEPTH;
        this.initialBufferSize = (_d = options === null || options === void 0 ? void 0 : options.initialBufferSize) !== null && _d !== void 0 ? _d : exports.DEFAULT_INITIAL_BUFFER_SIZE;
        this.sortKeys = (_e = options === null || options === void 0 ? void 0 : options.sortKeys) !== null && _e !== void 0 ? _e : false;
        this.forceFloat32 = (_f = options === null || options === void 0 ? void 0 : options.forceFloat32) !== null && _f !== void 0 ? _f : false;
        this.ignoreUndefined = (_g = options === null || options === void 0 ? void 0 : options.ignoreUndefined) !== null && _g !== void 0 ? _g : false;
        this.forceIntegerToFloat = (_h = options === null || options === void 0 ? void 0 : options.forceIntegerToFloat) !== null && _h !== void 0 ? _h : false;
        this.pos = 0;
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize));
        this.bytes = new Uint8Array(this.view.buffer);
    }
    reinitializeState() {
        this.pos = 0;
    }
    /**
     * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
     *
     * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
     */
    encodeSharedRef(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.subarray(0, this.pos);
    }
    /**
     * @returns Encodes the object and returns a copy of the encoder's internal buffer.
     */
    encode(object) {
        this.reinitializeState();
        this.doEncode(object, 1);
        return this.bytes.slice(0, this.pos);
    }
    doEncode(object, depth) {
        if (depth > this.maxDepth) {
            throw new Error(`Too deep objects in depth ${depth}`);
        }
        if (object == null) {
            this.encodeNil();
        }
        else if (typeof object === "boolean") {
            this.encodeBoolean(object);
        }
        else if (typeof object === "number") {
            if (!this.forceIntegerToFloat) {
                this.encodeNumber(object);
            }
            else {
                this.encodeNumberAsFloat(object);
            }
        }
        else if (typeof object === "string") {
            this.encodeString(object);
        }
        else if (this.useBigInt64 && typeof object === "bigint") {
            this.encodeBigInt64(object);
        }
        else {
            this.encodeObject(object, depth);
        }
    }
    ensureBufferSizeToWrite(sizeToWrite) {
        const requiredSize = this.pos + sizeToWrite;
        if (this.view.byteLength < requiredSize) {
            this.resizeBuffer(requiredSize * 2);
        }
    }
    resizeBuffer(newSize) {
        const newBuffer = new ArrayBuffer(newSize);
        const newBytes = new Uint8Array(newBuffer);
        const newView = new DataView(newBuffer);
        newBytes.set(this.bytes);
        this.view = newView;
        this.bytes = newBytes;
    }
    encodeNil() {
        this.writeU8(0xc0);
    }
    encodeBoolean(object) {
        if (object === false) {
            this.writeU8(0xc2);
        }
        else {
            this.writeU8(0xc3);
        }
    }
    encodeNumber(object) {
        if (!this.forceIntegerToFloat && Number.isSafeInteger(object)) {
            if (object >= 0) {
                if (object < 0x80) {
                    // positive fixint
                    this.writeU8(object);
                }
                else if (object < 0x100) {
                    // uint 8
                    this.writeU8(0xcc);
                    this.writeU8(object);
                }
                else if (object < 0x10000) {
                    // uint 16
                    this.writeU8(0xcd);
                    this.writeU16(object);
                }
                else if (object < 0x100000000) {
                    // uint 32
                    this.writeU8(0xce);
                    this.writeU32(object);
                }
                else if (!this.useBigInt64) {
                    // uint 64
                    this.writeU8(0xcf);
                    this.writeU64(object);
                }
                else {
                    this.encodeNumberAsFloat(object);
                }
            }
            else {
                if (object >= -0x20) {
                    // negative fixint
                    this.writeU8(0xe0 | (object + 0x20));
                }
                else if (object >= -0x80) {
                    // int 8
                    this.writeU8(0xd0);
                    this.writeI8(object);
                }
                else if (object >= -0x8000) {
                    // int 16
                    this.writeU8(0xd1);
                    this.writeI16(object);
                }
                else if (object >= -0x80000000) {
                    // int 32
                    this.writeU8(0xd2);
                    this.writeI32(object);
                }
                else if (!this.useBigInt64) {
                    // int 64
                    this.writeU8(0xd3);
                    this.writeI64(object);
                }
                else {
                    this.encodeNumberAsFloat(object);
                }
            }
        }
        else {
            this.encodeNumberAsFloat(object);
        }
    }
    encodeNumberAsFloat(object) {
        if (this.forceFloat32) {
            // float 32
            this.writeU8(0xca);
            this.writeF32(object);
        }
        else {
            // float 64
            this.writeU8(0xcb);
            this.writeF64(object);
        }
    }
    encodeBigInt64(object) {
        if (object >= BigInt(0)) {
            // uint 64
            this.writeU8(0xcf);
            this.writeBigUint64(object);
        }
        else {
            // int 64
            this.writeU8(0xd3);
            this.writeBigInt64(object);
        }
    }
    writeStringHeader(byteLength) {
        if (byteLength < 32) {
            // fixstr
            this.writeU8(0xa0 + byteLength);
        }
        else if (byteLength < 0x100) {
            // str 8
            this.writeU8(0xd9);
            this.writeU8(byteLength);
        }
        else if (byteLength < 0x10000) {
            // str 16
            this.writeU8(0xda);
            this.writeU16(byteLength);
        }
        else if (byteLength < 0x100000000) {
            // str 32
            this.writeU8(0xdb);
            this.writeU32(byteLength);
        }
        else {
            throw new Error(`Too long string: ${byteLength} bytes in UTF-8`);
        }
    }
    encodeString(object) {
        const maxHeaderSize = 1 + 4;
        const byteLength = (0, utf8_1.utf8Count)(object);
        this.ensureBufferSizeToWrite(maxHeaderSize + byteLength);
        this.writeStringHeader(byteLength);
        (0, utf8_1.utf8Encode)(object, this.bytes, this.pos);
        this.pos += byteLength;
    }
    encodeObject(object, depth) {
        // try to encode objects with custom codec first of non-primitives
        const ext = this.extensionCodec.tryToEncode(object, this.context);
        if (ext != null) {
            this.encodeExtension(ext);
        }
        else if (Array.isArray(object)) {
            this.encodeArray(object, depth);
        }
        else if (ArrayBuffer.isView(object)) {
            this.encodeBinary(object);
        }
        else if (typeof object === "object") {
            this.encodeMap(object, depth);
        }
        else {
            // symbol, function and other special object come here unless extensionCodec handles them.
            throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(object)}`);
        }
    }
    encodeBinary(object) {
        const size = object.byteLength;
        if (size < 0x100) {
            // bin 8
            this.writeU8(0xc4);
            this.writeU8(size);
        }
        else if (size < 0x10000) {
            // bin 16
            this.writeU8(0xc5);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // bin 32
            this.writeU8(0xc6);
            this.writeU32(size);
        }
        else {
            throw new Error(`Too large binary: ${size}`);
        }
        const bytes = (0, typedArrays_1.ensureUint8Array)(object);
        this.writeU8a(bytes);
    }
    encodeArray(object, depth) {
        const size = object.length;
        if (size < 16) {
            // fixarray
            this.writeU8(0x90 + size);
        }
        else if (size < 0x10000) {
            // array 16
            this.writeU8(0xdc);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // array 32
            this.writeU8(0xdd);
            this.writeU32(size);
        }
        else {
            throw new Error(`Too large array: ${size}`);
        }
        for (const item of object) {
            this.doEncode(item, depth + 1);
        }
    }
    countWithoutUndefined(object, keys) {
        let count = 0;
        for (const key of keys) {
            if (object[key] !== undefined) {
                count++;
            }
        }
        return count;
    }
    encodeMap(object, depth) {
        const keys = Object.keys(object);
        if (this.sortKeys) {
            keys.sort();
        }
        const size = this.ignoreUndefined ? this.countWithoutUndefined(object, keys) : keys.length;
        if (size < 16) {
            // fixmap
            this.writeU8(0x80 + size);
        }
        else if (size < 0x10000) {
            // map 16
            this.writeU8(0xde);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // map 32
            this.writeU8(0xdf);
            this.writeU32(size);
        }
        else {
            throw new Error(`Too large map object: ${size}`);
        }
        for (const key of keys) {
            const value = object[key];
            if (!(this.ignoreUndefined && value === undefined)) {
                this.encodeString(key);
                this.doEncode(value, depth + 1);
            }
        }
    }
    encodeExtension(ext) {
        const size = ext.data.length;
        if (size === 1) {
            // fixext 1
            this.writeU8(0xd4);
        }
        else if (size === 2) {
            // fixext 2
            this.writeU8(0xd5);
        }
        else if (size === 4) {
            // fixext 4
            this.writeU8(0xd6);
        }
        else if (size === 8) {
            // fixext 8
            this.writeU8(0xd7);
        }
        else if (size === 16) {
            // fixext 16
            this.writeU8(0xd8);
        }
        else if (size < 0x100) {
            // ext 8
            this.writeU8(0xc7);
            this.writeU8(size);
        }
        else if (size < 0x10000) {
            // ext 16
            this.writeU8(0xc8);
            this.writeU16(size);
        }
        else if (size < 0x100000000) {
            // ext 32
            this.writeU8(0xc9);
            this.writeU32(size);
        }
        else {
            throw new Error(`Too large extension object: ${size}`);
        }
        this.writeI8(ext.type);
        this.writeU8a(ext.data);
    }
    writeU8(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setUint8(this.pos, value);
        this.pos++;
    }
    writeU8a(values) {
        const size = values.length;
        this.ensureBufferSizeToWrite(size);
        this.bytes.set(values, this.pos);
        this.pos += size;
    }
    writeI8(value) {
        this.ensureBufferSizeToWrite(1);
        this.view.setInt8(this.pos, value);
        this.pos++;
    }
    writeU16(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setUint16(this.pos, value);
        this.pos += 2;
    }
    writeI16(value) {
        this.ensureBufferSizeToWrite(2);
        this.view.setInt16(this.pos, value);
        this.pos += 2;
    }
    writeU32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setUint32(this.pos, value);
        this.pos += 4;
    }
    writeI32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setInt32(this.pos, value);
        this.pos += 4;
    }
    writeF32(value) {
        this.ensureBufferSizeToWrite(4);
        this.view.setFloat32(this.pos, value);
        this.pos += 4;
    }
    writeF64(value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setFloat64(this.pos, value);
        this.pos += 8;
    }
    writeU64(value) {
        this.ensureBufferSizeToWrite(8);
        (0, int_1.setUint64)(this.view, this.pos, value);
        this.pos += 8;
    }
    writeI64(value) {
        this.ensureBufferSizeToWrite(8);
        (0, int_1.setInt64)(this.view, this.pos, value);
        this.pos += 8;
    }
    writeBigUint64(value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setBigUint64(this.pos, value);
        this.pos += 8;
    }
    writeBigInt64(value) {
        this.ensureBufferSizeToWrite(8);
        this.view.setBigInt64(this.pos, value);
        this.pos += 8;
    }
}
exports.Encoder = Encoder;

},{"./ExtensionCodec":11,"./utils/int":17,"./utils/typedArrays":20,"./utils/utf8":21}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtData = void 0;
/**
 * ExtData is used to handle Extension Types that are not registered to ExtensionCodec.
 */
class ExtData {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}
exports.ExtData = ExtData;

},{}],11:[function(require,module,exports){
"use strict";
// ExtensionCodec to handle MessagePack extensions
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionCodec = void 0;
const ExtData_1 = require("./ExtData");
const timestamp_1 = require("./timestamp");
class ExtensionCodec {
    constructor() {
        // built-in extensions
        this.builtInEncoders = [];
        this.builtInDecoders = [];
        // custom extensions
        this.encoders = [];
        this.decoders = [];
        this.register(timestamp_1.timestampExtension);
    }
    register({ type, encode, decode, }) {
        if (type >= 0) {
            // custom extensions
            this.encoders[type] = encode;
            this.decoders[type] = decode;
        }
        else {
            // built-in extensions
            const index = 1 + type;
            this.builtInEncoders[index] = encode;
            this.builtInDecoders[index] = decode;
        }
    }
    tryToEncode(object, context) {
        // built-in extensions
        for (let i = 0; i < this.builtInEncoders.length; i++) {
            const encodeExt = this.builtInEncoders[i];
            if (encodeExt != null) {
                const data = encodeExt(object, context);
                if (data != null) {
                    const type = -1 - i;
                    return new ExtData_1.ExtData(type, data);
                }
            }
        }
        // custom extensions
        for (let i = 0; i < this.encoders.length; i++) {
            const encodeExt = this.encoders[i];
            if (encodeExt != null) {
                const data = encodeExt(object, context);
                if (data != null) {
                    const type = i;
                    return new ExtData_1.ExtData(type, data);
                }
            }
        }
        if (object instanceof ExtData_1.ExtData) {
            // to keep ExtData as is
            return object;
        }
        return null;
    }
    decode(data, type, context) {
        const decodeExt = type < 0 ? this.builtInDecoders[-1 - type] : this.decoders[type];
        if (decodeExt) {
            return decodeExt(data, type, context);
        }
        else {
            // decode() does not fail, returns ExtData instead.
            return new ExtData_1.ExtData(type, data);
        }
    }
}
ExtensionCodec.defaultCodec = new ExtensionCodec();
exports.ExtensionCodec = ExtensionCodec;

},{"./ExtData":10,"./timestamp":16}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeMulti = exports.decode = exports.defaultDecodeOptions = void 0;
const Decoder_1 = require("./Decoder");
/**
 * @deprecated No longer supported.
 */
exports.defaultDecodeOptions = undefined;
/**
 * It decodes a single MessagePack object in a buffer.
 *
 * This is a synchronous decoding function.
 * See other variants for asynchronous decoding: {@link decodeAsync()}, {@link decodeStream()}, or {@link decodeArrayStream()}.
 *
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
function decode(buffer, options) {
    const decoder = new Decoder_1.Decoder(options);
    return decoder.decode(buffer);
}
exports.decode = decode;
/**
 * It decodes multiple MessagePack objects in a buffer.
 * This is corresponding to {@link decodeMultiStream()}.
 *
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
function decodeMulti(buffer, options) {
    const decoder = new Decoder_1.Decoder(options);
    return decoder.decodeMulti(buffer);
}
exports.decodeMulti = decodeMulti;

},{"./Decoder":8}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeStream = exports.decodeMultiStream = exports.decodeArrayStream = exports.decodeAsync = void 0;
const Decoder_1 = require("./Decoder");
const stream_1 = require("./utils/stream");
/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
async function decodeAsync(streamLike, options) {
    const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
    const decoder = new Decoder_1.Decoder(options);
    return decoder.decodeAsync(stream);
}
exports.decodeAsync = decodeAsync;
/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
function decodeArrayStream(streamLike, options) {
    const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
    const decoder = new Decoder_1.Decoder(options);
    return decoder.decodeArrayStream(stream);
}
exports.decodeArrayStream = decodeArrayStream;
/**
 * @throws {@link RangeError} if the buffer is incomplete, including the case where the buffer is empty.
 * @throws {@link DecodeError} if the buffer contains invalid data.
 */
function decodeMultiStream(streamLike, options) {
    const stream = (0, stream_1.ensureAsyncIterable)(streamLike);
    const decoder = new Decoder_1.Decoder(options);
    return decoder.decodeStream(stream);
}
exports.decodeMultiStream = decodeMultiStream;
/**
 * @deprecated Use {@link decodeMultiStream()} instead.
 */
exports.decodeStream = undefined;

},{"./Decoder":8,"./utils/stream":19}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.defaultEncodeOptions = void 0;
const Encoder_1 = require("./Encoder");
/**
 * @deprecated No longer supported.
 */
exports.defaultEncodeOptions = undefined;
/**
 * It encodes `value` in the MessagePack format and
 * returns a byte buffer.
 *
 * The returned buffer is a slice of a larger `ArrayBuffer`, so you have to use its `#byteOffset` and `#byteLength` in order to convert it to another typed arrays including NodeJS `Buffer`.
 */
function encode(value, options) {
    const encoder = new Encoder_1.Encoder(options);
    return encoder.encodeSharedRef(value);
}
exports.encode = encode;

},{"./Encoder":9}],15:[function(require,module,exports){
"use strict";
// Main Functions:
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTimestampExtension = exports.encodeTimestampExtension = exports.decodeTimestampToTimeSpec = exports.encodeTimeSpecToTimestamp = exports.encodeDateToTimeSpec = exports.EXT_TIMESTAMP = exports.ExtData = exports.ExtensionCodec = exports.Encoder = exports.DecodeError = exports.DataViewIndexOutOfBoundsError = exports.Decoder = exports.decodeStream = exports.decodeMultiStream = exports.decodeArrayStream = exports.decodeAsync = exports.decodeMulti = exports.decode = exports.encode = void 0;
const encode_1 = require("./encode");
Object.defineProperty(exports, "encode", { enumerable: true, get: function () { return encode_1.encode; } });
const decode_1 = require("./decode");
Object.defineProperty(exports, "decode", { enumerable: true, get: function () { return decode_1.decode; } });
Object.defineProperty(exports, "decodeMulti", { enumerable: true, get: function () { return decode_1.decodeMulti; } });
const decodeAsync_1 = require("./decodeAsync");
Object.defineProperty(exports, "decodeAsync", { enumerable: true, get: function () { return decodeAsync_1.decodeAsync; } });
Object.defineProperty(exports, "decodeArrayStream", { enumerable: true, get: function () { return decodeAsync_1.decodeArrayStream; } });
Object.defineProperty(exports, "decodeMultiStream", { enumerable: true, get: function () { return decodeAsync_1.decodeMultiStream; } });
Object.defineProperty(exports, "decodeStream", { enumerable: true, get: function () { return decodeAsync_1.decodeStream; } });
const Decoder_1 = require("./Decoder");
Object.defineProperty(exports, "Decoder", { enumerable: true, get: function () { return Decoder_1.Decoder; } });
Object.defineProperty(exports, "DataViewIndexOutOfBoundsError", { enumerable: true, get: function () { return Decoder_1.DataViewIndexOutOfBoundsError; } });
const DecodeError_1 = require("./DecodeError");
Object.defineProperty(exports, "DecodeError", { enumerable: true, get: function () { return DecodeError_1.DecodeError; } });
const Encoder_1 = require("./Encoder");
Object.defineProperty(exports, "Encoder", { enumerable: true, get: function () { return Encoder_1.Encoder; } });
// Utilities for Extension Types:
const ExtensionCodec_1 = require("./ExtensionCodec");
Object.defineProperty(exports, "ExtensionCodec", { enumerable: true, get: function () { return ExtensionCodec_1.ExtensionCodec; } });
const ExtData_1 = require("./ExtData");
Object.defineProperty(exports, "ExtData", { enumerable: true, get: function () { return ExtData_1.ExtData; } });
const timestamp_1 = require("./timestamp");
Object.defineProperty(exports, "EXT_TIMESTAMP", { enumerable: true, get: function () { return timestamp_1.EXT_TIMESTAMP; } });
Object.defineProperty(exports, "encodeDateToTimeSpec", { enumerable: true, get: function () { return timestamp_1.encodeDateToTimeSpec; } });
Object.defineProperty(exports, "encodeTimeSpecToTimestamp", { enumerable: true, get: function () { return timestamp_1.encodeTimeSpecToTimestamp; } });
Object.defineProperty(exports, "decodeTimestampToTimeSpec", { enumerable: true, get: function () { return timestamp_1.decodeTimestampToTimeSpec; } });
Object.defineProperty(exports, "encodeTimestampExtension", { enumerable: true, get: function () { return timestamp_1.encodeTimestampExtension; } });
Object.defineProperty(exports, "decodeTimestampExtension", { enumerable: true, get: function () { return timestamp_1.decodeTimestampExtension; } });

},{"./DecodeError":7,"./Decoder":8,"./Encoder":9,"./ExtData":10,"./ExtensionCodec":11,"./decode":12,"./decodeAsync":13,"./encode":14,"./timestamp":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestampExtension = exports.decodeTimestampExtension = exports.decodeTimestampToTimeSpec = exports.encodeTimestampExtension = exports.encodeDateToTimeSpec = exports.encodeTimeSpecToTimestamp = exports.EXT_TIMESTAMP = void 0;
// https://github.com/msgpack/msgpack/blob/master/spec.md#timestamp-extension-type
const DecodeError_1 = require("./DecodeError");
const int_1 = require("./utils/int");
exports.EXT_TIMESTAMP = -1;
const TIMESTAMP32_MAX_SEC = 0x100000000 - 1; // 32-bit unsigned int
const TIMESTAMP64_MAX_SEC = 0x400000000 - 1; // 34-bit unsigned int
function encodeTimeSpecToTimestamp({ sec, nsec }) {
    if (sec >= 0 && nsec >= 0 && sec <= TIMESTAMP64_MAX_SEC) {
        // Here sec >= 0 && nsec >= 0
        if (nsec === 0 && sec <= TIMESTAMP32_MAX_SEC) {
            // timestamp 32 = { sec32 (unsigned) }
            const rv = new Uint8Array(4);
            const view = new DataView(rv.buffer);
            view.setUint32(0, sec);
            return rv;
        }
        else {
            // timestamp 64 = { nsec30 (unsigned), sec34 (unsigned) }
            const secHigh = sec / 0x100000000;
            const secLow = sec & 0xffffffff;
            const rv = new Uint8Array(8);
            const view = new DataView(rv.buffer);
            // nsec30 | secHigh2
            view.setUint32(0, (nsec << 2) | (secHigh & 0x3));
            // secLow32
            view.setUint32(4, secLow);
            return rv;
        }
    }
    else {
        // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
        const rv = new Uint8Array(12);
        const view = new DataView(rv.buffer);
        view.setUint32(0, nsec);
        (0, int_1.setInt64)(view, 4, sec);
        return rv;
    }
}
exports.encodeTimeSpecToTimestamp = encodeTimeSpecToTimestamp;
function encodeDateToTimeSpec(date) {
    const msec = date.getTime();
    const sec = Math.floor(msec / 1e3);
    const nsec = (msec - sec * 1e3) * 1e6;
    // Normalizes { sec, nsec } to ensure nsec is unsigned.
    const nsecInSec = Math.floor(nsec / 1e9);
    return {
        sec: sec + nsecInSec,
        nsec: nsec - nsecInSec * 1e9,
    };
}
exports.encodeDateToTimeSpec = encodeDateToTimeSpec;
function encodeTimestampExtension(object) {
    if (object instanceof Date) {
        const timeSpec = encodeDateToTimeSpec(object);
        return encodeTimeSpecToTimestamp(timeSpec);
    }
    else {
        return null;
    }
}
exports.encodeTimestampExtension = encodeTimestampExtension;
function decodeTimestampToTimeSpec(data) {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    // data may be 32, 64, or 96 bits
    switch (data.byteLength) {
        case 4: {
            // timestamp 32 = { sec32 }
            const sec = view.getUint32(0);
            const nsec = 0;
            return { sec, nsec };
        }
        case 8: {
            // timestamp 64 = { nsec30, sec34 }
            const nsec30AndSecHigh2 = view.getUint32(0);
            const secLow32 = view.getUint32(4);
            const sec = (nsec30AndSecHigh2 & 0x3) * 0x100000000 + secLow32;
            const nsec = nsec30AndSecHigh2 >>> 2;
            return { sec, nsec };
        }
        case 12: {
            // timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
            const sec = (0, int_1.getInt64)(view, 4);
            const nsec = view.getUint32(0);
            return { sec, nsec };
        }
        default:
            throw new DecodeError_1.DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${data.length}`);
    }
}
exports.decodeTimestampToTimeSpec = decodeTimestampToTimeSpec;
function decodeTimestampExtension(data) {
    const timeSpec = decodeTimestampToTimeSpec(data);
    return new Date(timeSpec.sec * 1e3 + timeSpec.nsec / 1e6);
}
exports.decodeTimestampExtension = decodeTimestampExtension;
exports.timestampExtension = {
    type: exports.EXT_TIMESTAMP,
    encode: encodeTimestampExtension,
    decode: decodeTimestampExtension,
};

},{"./DecodeError":7,"./utils/int":17}],17:[function(require,module,exports){
"use strict";
// Integer Utility
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUint64 = exports.getInt64 = exports.setInt64 = exports.setUint64 = exports.UINT32_MAX = void 0;
exports.UINT32_MAX = 4294967295;
// DataView extension to handle int64 / uint64,
// where the actual range is 53-bits integer (a.k.a. safe integer)
function setUint64(view, offset, value) {
    const high = value / 4294967296;
    const low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
exports.setUint64 = setUint64;
function setInt64(view, offset, value) {
    const high = Math.floor(value / 4294967296);
    const low = value; // high bits are truncated by DataView
    view.setUint32(offset, high);
    view.setUint32(offset + 4, low);
}
exports.setInt64 = setInt64;
function getInt64(view, offset) {
    const high = view.getInt32(offset);
    const low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}
exports.getInt64 = getInt64;
function getUint64(view, offset) {
    const high = view.getUint32(offset);
    const low = view.getUint32(offset + 4);
    return high * 4294967296 + low;
}
exports.getUint64 = getUint64;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyByte = void 0;
function prettyByte(byte) {
    return `${byte < 0 ? "-" : ""}0x${Math.abs(byte).toString(16).padStart(2, "0")}`;
}
exports.prettyByte = prettyByte;

},{}],19:[function(require,module,exports){
"use strict";
// utility for whatwg streams
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAsyncIterable = exports.asyncIterableFromStream = exports.isAsyncIterable = void 0;
function isAsyncIterable(object) {
    return object[Symbol.asyncIterator] != null;
}
exports.isAsyncIterable = isAsyncIterable;
function assertNonNull(value) {
    if (value == null) {
        throw new Error("Assertion Failure: value must not be null nor undefined");
    }
}
async function* asyncIterableFromStream(stream) {
    const reader = stream.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            assertNonNull(value);
            yield value;
        }
    }
    finally {
        reader.releaseLock();
    }
}
exports.asyncIterableFromStream = asyncIterableFromStream;
function ensureAsyncIterable(streamLike) {
    if (isAsyncIterable(streamLike)) {
        return streamLike;
    }
    else {
        return asyncIterableFromStream(streamLike);
    }
}
exports.ensureAsyncIterable = ensureAsyncIterable;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataView = exports.ensureUint8Array = void 0;
function ensureUint8Array(buffer) {
    if (buffer instanceof Uint8Array) {
        return buffer;
    }
    else if (ArrayBuffer.isView(buffer)) {
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    else if (buffer instanceof ArrayBuffer) {
        return new Uint8Array(buffer);
    }
    else {
        // ArrayLike<number>
        return Uint8Array.from(buffer);
    }
}
exports.ensureUint8Array = ensureUint8Array;
function createDataView(buffer) {
    if (buffer instanceof ArrayBuffer) {
        return new DataView(buffer);
    }
    const bufferView = ensureUint8Array(buffer);
    return new DataView(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength);
}
exports.createDataView = createDataView;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utf8Decode = exports.utf8DecodeTD = exports.utf8DecodeJs = exports.utf8Encode = exports.utf8EncodeTE = exports.utf8EncodeJs = exports.utf8Count = void 0;
function utf8Count(str) {
    const strLength = str.length;
    let byteLength = 0;
    let pos = 0;
    while (pos < strLength) {
        let value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            byteLength++;
            continue;
        }
        else if ((value & 0xfffff800) === 0) {
            // 2-bytes
            byteLength += 2;
        }
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) {
                // high surrogate
                if (pos < strLength) {
                    const extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) {
                // 3-byte
                byteLength += 3;
            }
            else {
                // 4-byte
                byteLength += 4;
            }
        }
    }
    return byteLength;
}
exports.utf8Count = utf8Count;
function utf8EncodeJs(str, output, outputOffset) {
    const strLength = str.length;
    let offset = outputOffset;
    let pos = 0;
    while (pos < strLength) {
        let value = str.charCodeAt(pos++);
        if ((value & 0xffffff80) === 0) {
            // 1-byte
            output[offset++] = value;
            continue;
        }
        else if ((value & 0xfffff800) === 0) {
            // 2-bytes
            output[offset++] = ((value >> 6) & 0x1f) | 0xc0;
        }
        else {
            // handle surrogate pair
            if (value >= 0xd800 && value <= 0xdbff) {
                // high surrogate
                if (pos < strLength) {
                    const extra = str.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
            }
            if ((value & 0xffff0000) === 0) {
                // 3-byte
                output[offset++] = ((value >> 12) & 0x0f) | 0xe0;
                output[offset++] = ((value >> 6) & 0x3f) | 0x80;
            }
            else {
                // 4-byte
                output[offset++] = ((value >> 18) & 0x07) | 0xf0;
                output[offset++] = ((value >> 12) & 0x3f) | 0x80;
                output[offset++] = ((value >> 6) & 0x3f) | 0x80;
            }
        }
        output[offset++] = (value & 0x3f) | 0x80;
    }
}
exports.utf8EncodeJs = utf8EncodeJs;
// TextEncoder and TextDecoder are standardized in whatwg encoding:
// https://encoding.spec.whatwg.org/
// and available in all the modern browsers:
// https://caniuse.com/textencoder
// They are available in Node.js since v12 LTS as well:
// https://nodejs.org/api/globals.html#textencoder
const sharedTextEncoder = new TextEncoder();
// This threshold should be determined by benchmarking, which might vary in engines and input data.
// Run `npx ts-node benchmark/encode-string.ts` for details.
const TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(str, output, outputOffset) {
    sharedTextEncoder.encodeInto(str, output.subarray(outputOffset));
}
exports.utf8EncodeTE = utf8EncodeTE;
function utf8Encode(str, output, outputOffset) {
    if (str.length > TEXT_ENCODER_THRESHOLD) {
        utf8EncodeTE(str, output, outputOffset);
    }
    else {
        utf8EncodeJs(str, output, outputOffset);
    }
}
exports.utf8Encode = utf8Encode;
const CHUNK_SIZE = 4096;
function utf8DecodeJs(bytes, inputOffset, byteLength) {
    let offset = inputOffset;
    const end = offset + byteLength;
    const units = [];
    let result = "";
    while (offset < end) {
        const byte1 = bytes[offset++];
        if ((byte1 & 0x80) === 0) {
            // 1 byte
            units.push(byte1);
        }
        else if ((byte1 & 0xe0) === 0xc0) {
            // 2 bytes
            const byte2 = bytes[offset++] & 0x3f;
            units.push(((byte1 & 0x1f) << 6) | byte2);
        }
        else if ((byte1 & 0xf0) === 0xe0) {
            // 3 bytes
            const byte2 = bytes[offset++] & 0x3f;
            const byte3 = bytes[offset++] & 0x3f;
            units.push(((byte1 & 0x1f) << 12) | (byte2 << 6) | byte3);
        }
        else if ((byte1 & 0xf8) === 0xf0) {
            // 4 bytes
            const byte2 = bytes[offset++] & 0x3f;
            const byte3 = bytes[offset++] & 0x3f;
            const byte4 = bytes[offset++] & 0x3f;
            let unit = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0c) | (byte3 << 0x06) | byte4;
            if (unit > 0xffff) {
                unit -= 0x10000;
                units.push(((unit >>> 10) & 0x3ff) | 0xd800);
                unit = 0xdc00 | (unit & 0x3ff);
            }
            units.push(unit);
        }
        else {
            units.push(byte1);
        }
        if (units.length >= CHUNK_SIZE) {
            result += String.fromCharCode(...units);
            units.length = 0;
        }
    }
    if (units.length > 0) {
        result += String.fromCharCode(...units);
    }
    return result;
}
exports.utf8DecodeJs = utf8DecodeJs;
const sharedTextDecoder = new TextDecoder();
// This threshold should be determined by benchmarking, which might vary in engines and input data.
// Run `npx ts-node benchmark/decode-string.ts` for details.
const TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(bytes, inputOffset, byteLength) {
    const stringBytes = bytes.subarray(inputOffset, inputOffset + byteLength);
    return sharedTextDecoder.decode(stringBytes);
}
exports.utf8DecodeTD = utf8DecodeTD;
function utf8Decode(bytes, inputOffset, byteLength) {
    if (byteLength > TEXT_DECODER_THRESHOLD) {
        return utf8DecodeTD(bytes, inputOffset, byteLength);
    }
    else {
        return utf8DecodeJs(bytes, inputOffset, byteLength);
    }
}
exports.utf8Decode = utf8Decode;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var actionTypes = {
  'gametick': 0,
  'assign_id': 1,
  'become_ticker': 2,
  'pong': 3
  // ... other action types
};

var entityTypes = {
  'PLAYER': 0,
  'BULLET': 1,
  'BLOCK': 2,
  'BORDER': 3,
  'BODY': 4
  // ... other types
};

var playerSchema = {
  id: {
    type: 'UInt16'
  },
  name: {
    type: 'UTF8String'
  },
  // can we put a size limit on UTF8String encoding?
  type: {
    type: 'Enum',
    "enum": entityTypes
  },
  position: {
    type: 'Record',
    schema: {
      x: {
        type: 'Int32'
      },
      y: {
        type: 'Int32'
      }
    }
  },
  velocity: {
    type: 'Record',
    schema: {
      x: {
        type: 'Int32'
      },
      y: {
        type: 'Int32'
      }
    }
  },
  width: {
    type: 'Int32'
  },
  height: {
    type: 'Int32'
  },
  rotation: {
    type: 'Int32'
  },
  // TODO: special case with radians->bytes optimization
  mass: {
    type: 'Int32'
  },
  health: {
    type: 'Int32'
  },
  depth: {
    type: 'Float64'
  },
  lifetime: {
    type: 'Int32'
  },
  radius: {
    type: 'Float64'
  },
  isSensor: {
    type: 'Boolean'
  },
  isStatic: {
    type: 'Boolean'
  },
  destroyed: {
    type: 'Boolean'
  },
  owner: {
    type: 'UInt16'
  },
  maxSpeed: {
    type: 'Int32'
  }
};
var messageSchema = {
  id: {
    type: 'UInt16'
  },
  action: {
    type: 'Enum',
    "enum": actionTypes
  },
  state: {
    type: 'Collection',
    schema: playerSchema
  },
  lastProcessedInput: {
    type: 'UInt16'
  }
};
var _default = exports["default"] = messageSchema;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _float2Int = _interopRequireDefault(require("./float2Int.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // deltaCompression.js - Marak Squires 2023
// Assuming float2Int.js is in the same directory

var DEFAULTS = {
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  rotation: 0,
  width: 0,
  height: 0,
  mass: 0,
  health: 0,
  lifetime: 0,
  maxSpeed: 0
};
var playerStateCache = {};
var localPlayerStateCache = {};
var deltaCompression = {}; // deltaCompression module scope

// this config could be part of instance scope in SnapshotManager
var config = deltaCompression.config = {
  // Remark: We are currently performing float2Int encoding in the deltaCompression pipeline, not the deltaEncoding pipeline
  //         This is because both the server and client are already iterating over the state in the deltaCompression pipeline
  //         Where as the deltaEncoding pipeline is only used on the server
  truncateFloats: true,
  // truncate float values to this precision
  truncateToPrecision: 3,
  // truncate float values to this precision
  floatProperties: ['width', 'height', 'mass', 'health', 'lifetime', 'maxSpeed'],
  // extend this array with other float property names
  float2Int: true // encode float values as integers
};

deltaCompression.resetState = function resetState(playerId) {
  if (playerStateCache[playerId]) {
    playerStateCache[playerId].stateCache = {};
    playerStateCache[playerId].accumulatedStateCache = {};
  }
  if (localPlayerStateCache[playerId]) {
    localPlayerStateCache[playerId].stateCache = {};
    localPlayerStateCache[playerId].accumulatedStateCache = {};
  }
};
deltaCompression.removeState = function removeState(playerId, id) {
  if (playerStateCache[playerId]) {
    delete playerStateCache[playerId].stateCache[id.toString()];
    delete playerStateCache[playerId].accumulatedStateCache[id.toString()];
  }
  if (localPlayerStateCache[playerId]) {
    delete localPlayerStateCache[playerId].stateCache[id.toString()];
    delete localPlayerStateCache[playerId].accumulatedStateCache[id.toString()];
  }
};
deltaCompression.compress = function compress(playerId, snapshot) {
  var _snapshot = null;
  if (!playerStateCache[playerId]) {
    playerStateCache[playerId] = {
      stateCache: {},
      accumulatedStateCache: {}
    };
  }
  if (snapshot && snapshot.state) {
    _snapshot = {
      id: snapshot.id,
      state: []
    };
    snapshot.state.forEach(function (state) {
      if (state.destroy) {
        delete playerStateCache[playerId].stateCache[state.id];
        return;
      }
      var lastKnownState = playerStateCache[playerId].stateCache[state.id] || DEFAULTS;
      var clonedState = _objectSpread({}, state);

      //
      // Position
      //
      if (typeof clonedState.position !== 'undefined') {
        var positionDelta = getPositionDelta(clonedState.position, lastKnownState.position);
        clonedState.position = {
          x: _float2Int["default"].encode(positionDelta.x),
          y: _float2Int["default"].encode(positionDelta.y)
        };
      }

      //
      // Velocity
      //
      if (typeof clonedState.velocity !== 'undefined') {
        var velocityDelta = getPositionDelta(clonedState.velocity, lastKnownState.velocity);
        clonedState.velocity = {
          x: _float2Int["default"].encode(velocityDelta.x),
          y: _float2Int["default"].encode(velocityDelta.y)
        };
      }
      if (typeof clonedState.rotation !== 'undefined') {
        var rotationDelta = getRotationDelta(clonedState.rotation, lastKnownState.rotation);
        clonedState.rotation = _float2Int["default"].encode(rotationDelta);
      }
      config.floatProperties.forEach(function (prop) {
        if (typeof clonedState[prop] !== 'undefined') {
          var delta = getDelta(clonedState[prop], lastKnownState[prop]);
          clonedState[prop] = _float2Int["default"].encode(delta);
        }
      });
      playerStateCache[playerId].stateCache[state.id] = _objectSpread({}, state);
      _snapshot.state.push(clonedState);
    });
  }
  return _snapshot;
};
deltaCompression.decompress = function decompress(playerId, snapshot) {
  if (!localPlayerStateCache[playerId]) {
    localPlayerStateCache[playerId] = {
      stateCache: {},
      accumulatedStateCache: {}
    };
  }
  if (snapshot && snapshot.state) {
    var states = [];
    snapshot.state.forEach(function (state) {
      var accumulatedState = localPlayerStateCache[playerId].accumulatedStateCache[state.id];

      // Initialize accumulatedState if it's a new state
      if (!accumulatedState) {
        accumulatedState = {
          id: state.id,
          velocity: {
            x: 0,
            y: 0
          },
          position: {
            x: 0,
            y: 0
          },
          rotation: 0,
          width: 0,
          height: 0,
          mass: 0,
          health: 0,
          lifetime: 0,
          maxSpeed: 0
        };
      }

      // Apply updates from the current state
      Object.keys(state).forEach(function (prop) {
        if (prop === 'position' && state.position) {
          var positionDeltaX = _float2Int["default"].decode(state.position.x);
          var positionDeltaY = _float2Int["default"].decode(state.position.y);
          accumulatedState.position.x += positionDeltaX;
          accumulatedState.position.y += positionDeltaY;
        } else if (prop === 'velocity' && state.velocity) {
          var velocityDeltaX = _float2Int["default"].decode(state.velocity.x);
          var velocityDeltaY = _float2Int["default"].decode(state.velocity.y);
          accumulatedState.velocity.x += velocityDeltaX;
          accumulatedState.velocity.y += velocityDeltaY;
        } else if (prop === 'rotation' && typeof state.rotation !== 'undefined') {
          var rotationDelta = _float2Int["default"].decode(state.rotation);
          accumulatedState.rotation += rotationDelta;
        } else {
          if (config.floatProperties.indexOf(prop) !== -1) {
            var delta;
            delta = _float2Int["default"].decode(state[prop]);
            accumulatedState[prop] += delta;
          } else {
            // For all other properties, just copy/update them as is
            accumulatedState[prop] = state[prop];
          }
        }
      });
      localPlayerStateCache[playerId].accumulatedStateCache[state.id] = accumulatedState;
      states.push(accumulatedState);
    });
    snapshot.state = states;
  }
  return snapshot;
};
var truncateToPrecision = function truncateToPrecision(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.truncateToPrecision;
  if (!config.truncateFloats) {
    return value;
  }
  return Number(value.toFixed(precision));
};
var getPositionDelta = function getPositionDelta(currentState, lastKnownState) {
  // If this is a new state, return zero deltas
  if (typeof lastKnownState === 'undefined') {
    return {
      x: 0,
      y: 0
    };
  }
  var deltaX = currentState.x - lastKnownState.x;
  var deltaY = currentState.y - lastKnownState.y;
  return {
    x: truncateToPrecision(deltaX),
    y: truncateToPrecision(deltaY)
  };
};
var getRotationDelta = function getRotationDelta(currentRotation, lastKnownRotation) {
  // If this is a new state, return zero delta
  if (typeof lastKnownRotation === 'undefined') {
    return 0;
  }
  var deltaRotation = currentRotation - lastKnownRotation;
  return truncateToPrecision(deltaRotation);
};
var getDelta = function getDelta(currentValue, lastKnownValue) {
  if (typeof lastKnownValue === 'undefined') {
    return currentValue;
  }
  var delta = currentValue - lastKnownValue;
  return truncateToPrecision(delta);
};
function initializeDefaultState(id) {
  var defaultState = {
    id: id
  };
  config.floatProperties.forEach(function (prop) {
    defaultState[prop] = 0; // Initialize all float properties with default value 0
  });

  return defaultState;
}
var _default = exports["default"] = deltaCompression;

},{"./float2Int.js":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var float2Int = {
  encode: function encode(value) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    if (value === null || typeof value === 'undefined') {
      return null;
    }
    if (value === 0) {
      return 0;
    }
    return Math.round(value * Math.pow(10, precision));
  },
  decode: function decode(value) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    return this.truncateToPrecision(value / 1000, precision);
  },
  truncateToPrecision: function truncateToPrecision(value, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
};
var _default = exports["default"] = float2Int;

},{}]},{},[2])(2)
});

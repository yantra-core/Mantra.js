(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MANTRA = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Component2 = _interopRequireDefault(require("./Component.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ActionRateLimiter = /*#__PURE__*/function (_Component) {
  _inherits(ActionRateLimiter, _Component);
  var _super = _createSuper(ActionRateLimiter);
  function ActionRateLimiter(name, owner) {
    var _this;
    _classCallCheck(this, ActionRateLimiter);
    _this = _super.call(this, name, owner);
    _this.entityActions = new Map(); // Store last action times per entity
    return _this;
  }

  // Record an action for a specific entity
  _createClass(ActionRateLimiter, [{
    key: "recordAction",
    value: function recordAction(entityId, actionName) {
      var actions = this.entityActions.get(entityId) || new Map();
      actions.set(actionName, Date.now());
      this.entityActions.set(entityId, actions);
    }

    // Get the last time an action was performed for a specific entity
  }, {
    key: "getLastActionTime",
    value: function getLastActionTime(entityId, actionName) {
      var actions = this.entityActions.get(entityId);
      return actions ? actions.get(actionName) || 0 : 0;
    }
  }]);
  return ActionRateLimiter;
}(_Component2["default"]);
var _default = exports["default"] = ActionRateLimiter;

},{"./Component.js":2}],2:[function(require,module,exports){
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
// Component.js - Marak Squires 2023
var Component = /*#__PURE__*/function () {
  function Component(name, game) {
    _classCallCheck(this, Component);
    this.name = name;
    this.data = {};
    this.game = game;
  }
  _createClass(Component, [{
    key: "set",
    value: function set(key, value) {
      var entityId = Array.isArray(key) ? key[0] : key;

      // Check if the property is locked
      if (this.game) {
        var lockedProps = this.game.components['lockedProperties'].get(entityId);
        if (this.isLocked(lockedProps, this.name)) {
          // console.log(`Property ${key} is locked and cannot be updated.`);
          return; // Do not update if the property is locked
        }
      }

      if (Array.isArray(key)) {
        // Ensure nested structure exists
        var current = this.data;
        for (var i = 0; i < key.length - 1; i++) {
          if (!current[key[i]]) {
            current[key[i]] = {};
          }
          current = current[key[i]];
        }
        current[key[key.length - 1]] = value;
      } else {
        this.data[key] = value;
      }

      // After setting the value, update the corresponding entity in the game.entities
      if (this.game && this.game.entities && this.game.entities.has(entityId)) {
        var existing = this.game.entities.get(entityId);
        existing[this.name] = this.get(entityId);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      if (Array.isArray(key)) {
        var current = this.data;
        for (var i = 0; i < key.length; i++) {
          if (current[key[i]] === undefined) {
            return null;
          }
          current = current[key[i]];
        }
        return current;
      }
      if (typeof this.data[key] === 'undefined' || this.data[key] === null) {
        return null;
      }
      return this.data[key];
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (Array.isArray(key)) {
        var current = this.data;
        for (var i = 0; i < key.length - 1; i++) {
          if (current[key[i]] === undefined) {
            return;
          }
          current = current[key[i]];
        }
        delete current[key[key.length - 1]];
      } else {
        delete this.data[key];
      }
    }

    // Helper method to check if a property or sub-property is locked
  }, {
    key: "isLocked",
    value: function isLocked(lockedProps, key) {
      if (!lockedProps) return false;
      if (Array.isArray(key)) {
        var current = lockedProps;
        for (var i = 0; i < key.length; i++) {
          if (current[key[i]] === undefined) {
            return false; // Property not locked
          }

          current = current[key[i]];
        }
        return true; // Property is locked
      }

      return lockedProps[key] !== undefined;
    }
  }]);
  return Component;
}();
var _default = exports["default"] = Component;

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Component2 = _interopRequireDefault(require("./Component.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var TimersComponent = /*#__PURE__*/function (_Component) {
  _inherits(TimersComponent, _Component);
  var _super = _createSuper(TimersComponent);
  function TimersComponent(name, owner) {
    var _this;
    _classCallCheck(this, TimersComponent);
    _this = _super.call(this, name, owner);
    _this.timers = {}; // Object to hold named timers
    return _this;
  }

  // Set a timer with a specific duration, with optional interval flag
  _createClass(TimersComponent, [{
    key: "setTimer",
    value: function setTimer(name, duration) {
      var isInterval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.timers[name] = {
        startTime: Date.now(),
        duration: duration * 1000,
        // Convert to milliseconds
        isInterval: isInterval,
        completed: false
      };
    }
  }, {
    key: "getTimer",
    value: function getTimer(name) {
      return this.timers[name];
    }
  }, {
    key: "checkTimer",
    value: function checkTimer(name) {
      if (!this.timers[name]) return false;
      var timer = this.timers[name];
      var now = Date.now();
      if (!timer.completed && now >= timer.startTime + timer.duration) {
        if (timer.isInterval) {
          this.resetTimer(name); // Reset for intervals
          return 'intervalCompleted'; // Indicate interval completion
        } else {
          timer.completed = true;
          return true; // Indicate one-time timer completion
        }
      }

      return false; // Timer has not completed yet
    }

    // Reset a timer
  }, {
    key: "resetTimer",
    value: function resetTimer(name) {
      if (this.timers[name]) {
        this.timers[name].startTime = Date.now();
        this.timers[name].completed = false;
      }
    }

    // Remove a timer
  }, {
    key: "removeTimer",
    value: function removeTimer(name) {
      delete this.timers[name];
    }
  }]);
  return TimersComponent;
}(_Component2["default"]);
var _default = exports["default"] = TimersComponent;

},{"./Component.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var _Component = _interopRequireDefault(require("./Component/Component.js"));
var _SystemsManager = _interopRequireDefault(require("./System/SystemsManager.js"));
var _eventEmitter = _interopRequireDefault(require("./lib/eventEmitter.js"));
var _storage = _interopRequireDefault(require("./lib/storage/storage.js"));
var _localGameLoop = _interopRequireDefault(require("./lib/localGameLoop.js"));
var _onlineGameLoop = _interopRequireDefault(require("./lib/onlineGameLoop.js"));
var _gameTick = _interopRequireDefault(require("./lib/gameTick.js"));
var _defaultGameStart = _interopRequireDefault(require("./lib/start/defaultGameStart.js"));
var _createDefaultPlayer = _interopRequireDefault(require("./lib/createDefaultPlayer.js"));
var _switchWorlds = _interopRequireDefault(require("./lib/switchWorlds.js"));
var _ActionRateLimiter = _interopRequireDefault(require("./Component/ActionRateLimiter.js"));
var _TimersComponent = _interopRequireDefault(require("./Component/TimersComponent.js"));
var _loadPluginsFromConfig = _interopRequireDefault(require("./lib/loadPluginsFromConfig.js"));
var _loadScripts = _interopRequireDefault(require("./lib/util/loadScripts.js"));
var _loadCSS = _interopRequireDefault(require("./lib/util/loadCSS.js"));
var _defaultPlayerMovement = _interopRequireDefault(require("./lib/defaultPlayerMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023
// Entity Component System
// Game instances are event emitters
// Game local data storage
// Game loops, TODO: make game loops plugins / configurable
// Local game loop is for single machine games ( no networking )
// Online game loop is for multiplayer games ( networking )
// Game tick, called once per tick from game loop
// Provides a default Game.start(fn) logic ( creates a single player and border )
// Bind to event `player::joined` to override default player creation logic
// Action Rate Limiter, suitable for any Systems action that should be rate limited
// Loads plugins from config, can be disabled with gameConfig.loadDefaultPlugins = false
// Utility function for loading external assets
// default player movement, this could be also be set in defaultGameStart.js
// The Game class is the main entry point for Mantra games
var Game = exports.Game = /*#__PURE__*/function () {
  function Game() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$isClient = _ref.isClient,
      isClient = _ref$isClient === void 0 ? true : _ref$isClient,
      _ref$isEdgeClient = _ref.isEdgeClient,
      isEdgeClient = _ref$isEdgeClient === void 0 ? false : _ref$isEdgeClient,
      _ref$isServer = _ref.isServer,
      isServer = _ref$isServer === void 0 ? false : _ref$isServer,
      isOfflineMode = _ref.isOfflineMode,
      _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === void 0 ? {} : _ref$plugins,
      _ref$showLoadingScree = _ref.showLoadingScreen,
      showLoadingScreen = _ref$showLoadingScree === void 0 ? true : _ref$showLoadingScree,
      _ref$minLoadTime = _ref.minLoadTime,
      minLoadTime = _ref$minLoadTime === void 0 ? 330 : _ref$minLoadTime,
      _ref$loadDefaultPlugi = _ref.loadDefaultPlugins,
      loadDefaultPlugins = _ref$loadDefaultPlugi === void 0 ? true : _ref$loadDefaultPlugi,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 800 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 600 : _ref$height,
      _ref$physics = _ref.physics,
      physics = _ref$physics === void 0 ? 'matter' : _ref$physics,
      _ref$graphics = _ref.graphics,
      graphics = _ref$graphics === void 0 ? ['css'] : _ref$graphics,
      _ref$collisions = _ref.collisions,
      collisions = _ref$collisions === void 0 ? true : _ref$collisions,
      _ref$camera = _ref.camera,
      camera = _ref$camera === void 0 ? {} : _ref$camera,
      _ref$gravity = _ref.gravity,
      gravity = _ref$gravity === void 0 ? {} : _ref$gravity,
      _ref$keyboard = _ref.keyboard,
      keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
      _ref$mouse = _ref.mouse,
      mouse = _ref$mouse === void 0 ? true : _ref$mouse,
      _ref$gamepad = _ref.gamepad,
      gamepad = _ref$gamepad === void 0 ? true : _ref$gamepad,
      _ref$editor = _ref.editor,
      editor = _ref$editor === void 0 ? true : _ref$editor,
      _ref$sutra = _ref.sutra,
      sutra = _ref$sutra === void 0 ? true : _ref$sutra,
      _ref$lifetime = _ref.lifetime,
      lifetime = _ref$lifetime === void 0 ? true : _ref$lifetime,
      _ref$protobuf = _ref.protobuf,
      protobuf = _ref$protobuf === void 0 ? false : _ref$protobuf,
      _ref$msgpack = _ref.msgpack,
      msgpack = _ref$msgpack === void 0 ? false : _ref$msgpack,
      _ref$deltaCompression = _ref.deltaCompression,
      deltaCompression = _ref$deltaCompression === void 0 ? false : _ref$deltaCompression,
      _ref$deltaEncoding = _ref.deltaEncoding,
      deltaEncoding = _ref$deltaEncoding === void 0 ? true : _ref$deltaEncoding,
      _ref$defaultPlayer = _ref.defaultPlayer,
      defaultPlayer = _ref$defaultPlayer === void 0 ? true : _ref$defaultPlayer,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
    _classCallCheck(this, Game);
    if (isServer) {
      // override default
      showLoadingScreen = false;
      isClient = false;
    }
    // config scope for convenience
    var config = {
      isClient: isClient,
      isEdgeClient: isEdgeClient,
      isServer: isServer,
      showLoadingScreen: showLoadingScreen,
      minLoadTime: minLoadTime,
      loadDefaultPlugins: loadDefaultPlugins,
      width: width,
      height: height,
      gravity: gravity,
      physics: physics,
      graphics: graphics,
      collisions: collisions,
      camera: camera,
      keyboard: keyboard,
      mouse: mouse,
      gamepad: gamepad,
      editor: editor,
      lifetime: lifetime,
      isOfflineMode: isOfflineMode,
      protobuf: protobuf,
      msgpack: msgpack,
      deltaCompression: deltaCompression,
      deltaEncoding: deltaEncoding,
      defaultPlayer: defaultPlayer,
      options: options,
      multiplexGraphicsHorizontally: true // default behavior is multiple graphics plugins will be horizontally stacked
    };

    this.config = config;

    // fetch the gameConfig from localStorage
    var localData = _storage["default"].getAllKeysWithData();

    // Remark: We could merge this data back into the config / game.data

    // set the last local start time
    _storage["default"].set('lastLocalStartTime', Date.now());

    // Keeps a clean copy of current game state
    // Game.data scope can be used for applying configuration settings while game is running
    // Game.config scope is expected to be "immutablish" and should not be modified while game is running
    this.data = {
      width: config.width,
      height: config.height,
      FPS: 60,
      camera: {
        follow: config.camera.follow,
        currentZoom: config.camera.startingZoom
      }
    };
    if (typeof this.data.camera.follow === 'undefined') {
      this.data.camera.follow = true;
    }
    if (typeof this.data.camera.currentZoom === 'undefined') {
      this.data.camera.currentZoom = 1;
    }
    console.log("Mantra starting...");

    // Define the scriptRoot variable for loading external scripts
    // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
    this.scriptRoot = 'https://yantra.gg/mantra';
    this.assetRoot = 'https://yantra.gg/mantra';

    // Could be another CDN or other remote location
    // For local development, try this.scriptRoot = './';
    if (options.scriptRoot) {
      console.log("Mantra is using the follow path as it's root:", options.scriptRoot);
      this.scriptRoot = options.scriptRoot;
    }
    if (options.assetRoot) {
      console.log("Mantra is using the follow path as it's asset root:", options.assetRoot);
      this.assetRoot = options.assetRoot;
    }
    console.log("new Game(".concat(JSON.stringify(config, true, 2), ")"));

    // Bind eventEmitter methods to maintain correct scope
    this.on = _eventEmitter["default"].on.bind(_eventEmitter["default"]);
    this.off = _eventEmitter["default"].off.bind(_eventEmitter["default"]);
    this.once = _eventEmitter["default"].once.bind(_eventEmitter["default"]);
    this.emit = _eventEmitter["default"].emit.bind(_eventEmitter["default"]);
    this.onAny = _eventEmitter["default"].onAny.bind(_eventEmitter["default"]);
    this.offAny = _eventEmitter["default"].offAny.bind(_eventEmitter["default"]);
    this.listenerCount = _eventEmitter["default"].listenerCount.bind(_eventEmitter["default"]);
    this.listeners = _eventEmitter["default"].listeners;
    this.emitters = _eventEmitter["default"].emitters;

    // Bind loadScripts from util
    this.loadScripts = _loadScripts["default"].bind(this);
    // Bind loadCSS from util
    this.loadCSS = _loadCSS["default"].bind(this);
    this.switchWorlds = _switchWorlds["default"].bind(this);

    // TODO: common helper mappings for all create / update / remove entities
    this.createPlayer = this.createPlayer.bind(this);
    this.bodyMap = {};
    this.systems = {};
    this.storage = _storage["default"];
    this.snapshotQueue = [];
    this.tick = 0;

    // Keeps track of array of worlds ( Plugins with type="world" )
    // Each world is a Plugin and will run in left-to-right order
    // The current default behavior is single world, so worlds[0] is always the current world
    // Game.use(worldInstance) will add a world to the worlds array, running worlds in left-to-right order
    // With multiple worlds running at once, worlds[0] will always be the root world in the traversal of the world tree
    // TODO: move to worldManager
    this.worlds = [];

    // Game settings
    this.width = width;
    this.height = height;

    // Remark: Currently, only (1) physics engine is supported at a time
    // If we want to run multiple physics engines, we'll want to make this array
    // this.physics = [];

    this.changedEntities = new Set();
    this.removedEntities = new Set();
    this.pendingRender = new Set();
    this.isClient = isClient;
    this.isEdgeClient = isEdgeClient;
    this.isServer = isServer;
    this.localGameLoopRunning = false;
    this.onlineGameLoopRunning = false;
    this.currentPlayerId = null;

    // ComponentManager.js? If so, what does it do and is it needed for our ECS?
    // Remark: I don't think we need to explicitly define components, we can just add them as needed
    this.components = {
      type: new _Component["default"]('type', this),
      // string type, name of Entity
      destroyed: new _Component["default"]('destroyed', this),
      // boolean, if true, entity is pending destroy and will be removed from game
      position: new _Component["default"]('position', this),
      // object, { x: 0, y: 0, z: 0 }
      velocity: new _Component["default"]('velocity', this),
      rotation: new _Component["default"]('rotation', this),
      mass: new _Component["default"]('mass', this),
      density: new _Component["default"]('density', this),
      width: new _Component["default"]('width', this),
      height: new _Component["default"]('height', this),
      depth: new _Component["default"]('depth', this),
      radius: new _Component["default"]('radius', this),
      isSensor: new _Component["default"]('isSensor', this),
      owner: new _Component["default"]('owner', this),
      inputs: new _Component["default"]('inputs', this),
      items: new _Component["default"]('items', this),
      sutra: new _Component["default"]('sutra', this)
    };

    // define additional components for the game
    this.components.color = new _Component["default"]('color', this);
    this.components.health = new _Component["default"]('health', this);
    this.components.target = new _Component["default"]('target', this);
    this.components.lifetime = new _Component["default"]('lifetime', this);
    this.components.creationTime = new _Component["default"]('creationTime', this);
    this.components.BulletComponent = new _Component["default"]('BulletComponent', this);
    this.components.graphics = new _Component["default"]('graphics', this);
    this.components.lockedProperties = new _Component["default"]('lockedProperties', this);
    this.components.actionRateLimiter = new _ActionRateLimiter["default"]('actionRateLimiter', this);

    // TODO: add body component and remove game.bodyMap[] API

    this.components.timers = new _TimersComponent["default"]('timers', this);
    this.components.yCraft = new _Component["default"]('yCraft', this);
    this.components.text = new _Component["default"]('text', this);
    this.components.style = new _Component["default"]('style', this);
    this.components.collisionActive = new _Component["default"]('collisionActive', this);
    this.components.collisionStart = new _Component["default"]('collisionStart', this);
    this.components.collisionEnd = new _Component["default"]('collisionEnd', this);

    // Systems Manager
    this.systemsManager = new _SystemsManager["default"](this);

    // Graphics rendering pipeline
    this.graphics = [];
    this.gameTick = _gameTick["default"].bind(this);
    this.localGameLoop = _localGameLoop["default"].bind(this);
    this.onlineGameLoop = _onlineGameLoop["default"].bind(this);
    this.loadPluginsFromConfig = _loadPluginsFromConfig["default"].bind(this);
    this.createDefaultPlayer = _createDefaultPlayer["default"].bind(this);

    // keeps track of game.use('PluginStringName') async loading
    // game.start() will wait for all plugins to be loaded before starting
    // this means any plugins which are game.use('PluginStringName') will "block" the game from starting
    this.loadingPluginsCount = 0;
    // this.plugins represents the initial plugins the Game wil have access to
    // subsequent plugins will be loaded dynamically with game.use()
    this.plugins = plugins;

    // this._plugins represents all plugin instances that have been loaded
    this._plugins = {};
    this.loadedPlugins = [];
    // load default plugins
    if (loadDefaultPlugins) {
      this.loadPluginsFromConfig({
        physics: physics,
        graphics: graphics,
        collisions: collisions,
        keyboard: keyboard,
        mouse: mouse,
        gamepad: gamepad,
        editor: editor,
        sutra: sutra,
        lifetime: lifetime
      });
    }
  }

  // TODO: hoist to systemsManager
  _createClass(Game, [{
    key: "update",
    value: function update(deltaTime) {
      // Call update method of SystemsManager, which delegate to all Systems which have an update method
      this.systemsManager.update(deltaTime);
    }
  }, {
    key: "render",
    value: function render() {
      // Call render method of SystemsManager, which will delegate to all Graphics systems
      // TODO: should we remove this and hoist it to the systemsManager?
      this.systemsManager.render();
    }
  }, {
    key: "start",
    value: function start(cb) {
      var game = this;
      if (typeof cb !== 'function') {
        console.log('No game.start() was callback provided. Using default callback.');
        console.log("You can provide a callback to game.start() to create your game's entities and systems.");
        // Default local game start function if none provided
        cb = function cb() {
          (0, _defaultGameStart["default"])(game);
        };
      }
      // Wait for all systems to be ready before starting the game loop
      if (game.loadingPluginsCount > 0 || game.physicsReady !== true) {
        // console.log('waiting for plugins to load...', game.physicsReady)
        setTimeout(function () {
          game.start(cb);
        }, 4);
        return;
      } else {
        // Remark: If multiple graphics plugins are used, default behavior is to,
        //         horizontally stack the graphics plugins so they all fit on the screen
        // TODO: move this to Graphics.js file
        if (game.config.multiplexGraphicsHorizontally) {
          // get the graphics count and sub-divide each canvas width to multiplex the graphics plugins
          var totalCount = game.graphics.length;
          var newWidth = 100 / totalCount;
          // find each canvas in the #gameHolder and apply the new width
          if (totalCount > 1) {
            if (document && document.querySelectorAll) {
              var canvasList = document.querySelectorAll('#gameHolder canvas');
              for (var i = 0; i < canvasList.length; i++) {
                // console.log('setting new width for', canvasList[i], 'to', newWidth + '%')
                canvasList[i].style.width = newWidth + '%';
              }
            }
          }
        }
        console.log('All Plugins are ready! Starting Mantra Game Client...');
        game.emit('game::ready');
        if (this.config.defaultPlayer) {
          this.createPlayer({
            type: 'PLAYER'
          }).then(function (ent) {
            game.setPlayerId(ent.id);
          });
          /*
          game.createBorder({
            height: 2000,
            width: 2000
          });
          */
        }

        if (game.systems.client) {
          var client = this.getSystem('client');
          client.start(cb);
        } else {
          console.log('Warning: No Client System found, will not start game loop.');
        }
      }
    }

    // TODO: move to client, let client hoist the connection logic to game
  }, {
    key: "stop",
    value: function stop() {
      var client = this.getSystem('client');
      client.stop();
    }
  }, {
    key: "connect",
    value: function connect(url) {
      var game = this;
      // Wait for all systems to be ready before starting the game loop
      if (game.loadingPluginsCount > 0) {
        setTimeout(function () {
          game.connect(url);
        }, 4);
        return;
      } else {
        console.log('All Plugins are ready! Starting Mantra Game Client...');
        var client = this.getSystem('client');
        client.connect(url);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var client = this.getSystem('client');
      client.disconnect();
    }

    // All Systems are Plugins, but not all Plugins are Systems
    // TODO: move to separate file
  }, {
    key: "use",
    value: function use(pluginInstanceOrId) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 ? arguments[2] : undefined;
      var game = this;
      if (typeof cb === 'undefined') {
        cb = function noop() {};
      }

      // TODO: make this configurable
      var basePath = '/plugins/'; // Base path for loading plugins
      basePath = this.scriptRoot + basePath;
      //console.log("FOUND SCRIPT ROOT", this.scriptRoot)
      //console.log("LOADING FROM BASEPATH", basePath)
      // Check if the argument is a string (plugin ID)
      if (typeof pluginInstanceOrId === 'string') {
        var _pluginId = pluginInstanceOrId;
        // Check if the plugin is already loaded or loading
        if (this._plugins[_pluginId]) {
          // maybe add world here?
          console.log("Plugin ".concat(_pluginId, " is already loaded or loading."));
          return this;
        }
        if (this.isServer) {
          // console.log('pluginId', pluginId, this.plugins)
          if (this.plugins[_pluginId]) {
            // console.log('loading plugin', pluginId, this.plugins[pluginId])
            return this.use(new this.plugins[_pluginId](options));
          }
          console.log("Attempted to load plugin by string name \"".concat(_pluginId, "\"on server, could not find! skipping"));
          return;
        }

        // Mark the plugin as loading
        this._plugins[_pluginId] = {
          status: 'loading'
        };
        this.loadingPluginsCount++;
        this.emit('plugin::loading', _pluginId);

        // Dynamically load the plugin script
        var scriptUrl = "".concat(basePath).concat(_pluginId, ".js");
        this.loadPluginScript(scriptUrl).then(function () {
          // The script is expected to call `game.use(pluginInstance)` after loading
          console.log("Loaded: ".concat(_pluginId));
          if ((typeof PLUGINS === "undefined" ? "undefined" : _typeof(PLUGINS)) === 'object') {
            //console.log('creating new instance', pluginId, PLUGINS[pluginId], PLUGINS)
            var pluginInstance = new PLUGINS[_pluginId]["default"](options);
            game.use(pluginInstance);
            // check to see if pluginInstance is async, if so
            // we'll assume it will emit a ready event when it's ready
            if (pluginInstance.async) {
              // plugin must perform async operation before it's ready
              // plugin author *must* emit their own ready event game will not start
            } else {
              game.loadingPluginsCount--;
              delete game._plugins[_pluginId];
              game.emit('plugin::ready::' + _pluginId, pluginInstance);
              cb();
            }
          } else {
            // decrement loadingPluginsCount even if it fails
            // this means applications will attempt to load even if plugins fail
            console.log('Warning: PLUGINS object not found, cannot load plugin', _pluginId);
            delete game._plugins[_pluginId];
            game.loadingPluginsCount--;
            cb(new Error('PLUGINS object not found, cannot load plugin'));
          }
        })["catch"](function (err) {
          console.error("Error loading plugin ".concat(_pluginId, ":"), err);
          game._plugins[_pluginId] = {
            status: 'error'
          };
          throw err;
        });
        return this;
      }

      // Handling plugin instances
      if (typeof pluginInstanceOrId.id === 'undefined') {
        console.log('Error with pluginInstance', pluginInstanceOrId);
        throw new Error('All plugins must have a static id property');
      }
      var pluginId = pluginInstanceOrId.id;
      this.loadedPlugins.push(pluginId);
      pluginInstanceOrId.init(this, this.engine, this.scene);
      this._plugins[pluginId] = pluginInstanceOrId;
      if (pluginInstanceOrId.type === 'world') {
        this.worlds.push(pluginInstanceOrId);
      }
      this.emit("plugin::loaded::".concat(pluginId), pluginInstanceOrId);
      this.emit('plugin::loaded', pluginId);
      if (typeof pluginInstanceOrId.type !== 'undefined' && pluginInstanceOrId.type === 'world') {
        this.emit("world::loaded::".concat(pluginInstanceOrId.id), pluginInstanceOrId);
        this.emit('world::loaded', pluginInstanceOrId);
      }
      game.data.plugins = game.data.plugins || {};
      game.data.plugins[pluginId] = options;
      return this;
    }

    // Helper function to load plugin scripts
  }, {
    key: "loadPluginScript",
    value: function loadPluginScript(scriptUrl) {
      console.log('Loading', scriptUrl);
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = scriptUrl;
        //script.async = true;
        script.defer = true;
        script.onload = function () {
          return resolve();
        };
        script.onerror = function () {
          return reject(new Error("Failed to load script: ".concat(scriptUrl)));
        };
        document.head.appendChild(script);
      });
    }
  }, {
    key: "removePlugin",
    value: function removePlugin(pluginName) {
      var plugin = this._plugins[pluginName];
      if (plugin) {
        // check to see if plugin is a system, if so remove the system
        if (this.systems[plugin.id]) {
          this.removeSystem(plugin.id);
        }
        // next see if plugin has unload method, if so call it
        if (typeof plugin.unload === 'function') {
          plugin.unload();
        }
        delete this._plugins[pluginName];
      }
    }

    // TODO: move to componentManager
  }, {
    key: "addComponent",
    value: function addComponent(entityId, componentType, data) {
      if (!this.components[componentType]) {
        this.components[componentType] = new _Component["default"](componentType, this);
      }
      // Initialize an empty map for the actionRateLimiter component
      // TODO: remove this hard-coded check for actionRateLimiter
      if (componentType === 'actionRateLimiter') {
        data = new Map();
      }
      this.components[componentType].set(entityId, data);
    }
  }, {
    key: "getComponent",
    value: function getComponent(entityId, componentType) {
      if (this.components.hasOwnProperty(componentType)) {
        return this.components[componentType].get(entityId);
      }
      return null;
    }
  }, {
    key: "addSystem",
    value: function addSystem(systemName, system) {
      return this.systemsManager.addSystem(systemName, system);
    }
  }, {
    key: "getSystem",
    value: function getSystem(systemName) {
      return this.systemsManager.getSystem(systemName);
    }
  }, {
    key: "removeSystem",
    value: function removeSystem(systemName) {
      return this.systemsManager.removeSystem(systemName.toLowerCase());
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData) {
      this.graphics.forEach(function (graphicsInterface) {
        graphicsInterface.updateGraphic(entityData);
      });
    }

    // TODO: move to playerManager
    // allows for custom player creation logic, or default player creation logic
  }, {
    key: "createPlayer",
    value: function createPlayer(playerConfig) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        // console.log(this.listenerCount('player::joined'))
        if (_this.listenerCount('player::joined') === 0) {
          var result = _this.createDefaultPlayer(playerConfig);
          resolve(result);
        } else {
          // Attach a one-time listener for handling the response
          _this.once('player::created', function (entity) {
            resolve(entity);
          });
          // Emit the player::joined event
          _this.emit('player::joined', playerConfig);
        }
      });
    }
  }, {
    key: "playNote",
    value: function playNote(note, duration) {
      console.log('Tone Plugin not loaded. Cannot play tone note.');
    }
  }, {
    key: "setGravity",
    value: function setGravity() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.physics) {
        this.physics.setGravity(x, y, z);
      }
    }
  }, {
    key: "setControls",
    value: function setControls(controls) {
      var game = this;
      game.controls = controls;
      if (game.systems['entity-input']) {
        // TODO: update instead of replace?
        game.systems['entity-input'].controlMappings = controls;
      }
    }
  }, {
    key: "setActions",
    value: function setActions(actions) {
      var game = this;
      var actionNames = Object.keys(actions);
      actionNames.forEach(function (actionName) {
        var action = actions[actionName];
        game.rules.on(actionName, action);
      });
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
    }
  }, {
    key: "zoom",
    value: function zoom(scale) {
      if (this.camera && this.camera.zoom) {
        this.camera.zoom(scale);
      } else {
        console.log('warning: no camera.zoom method found');
      }
    }
  }, {
    key: "shakeCamera",
    value: function shakeCamera(intensity, duration) {
      this.graphics.forEach(function (graphicsInterface) {
        if (graphicsInterface.cameraShake) {
          graphicsInterface.cameraShake(intensity, duration);
        }
      });
    }
  }, {
    key: "setPlayerId",
    value: function setPlayerId(playerId) {
      // console.log('setting playerID', playerId)
      this.currentPlayerId = playerId;
    }
  }, {
    key: "getCurrentPlayer",
    value: function getCurrentPlayer() {
      return this.getEntity(this.currentPlayerId);
    }

    // TODO: should physics plugin mount these instead of direct map to game?
  }, {
    key: "applyForce",
    value: function applyForce(entityId, force) {
      var body = this.bodyMap[entityId];
      this.physics.applyForce(body, body.position, force);
      this.components.velocity[entityId] = {
        x: body.velocity.x,
        y: body.velocity.y
      };
    }
  }, {
    key: "setPosition",
    value: function setPosition(entityId, position) {
      var body = this.bodyMap[entityId];
      this.physics.setPosition(body, position);
    }
  }, {
    key: "applyPosition",
    value: function applyPosition(entityId, position) {
      var body = this.bodyMap[entityId];
      // takes the current position and adds the new position
      var newPosition = {
        x: body.position.x + position.x,
        y: body.position.y + position.y
      };
      this.physics.setPosition(body, newPosition);
    }
  }, {
    key: "rotate",
    value: function rotate(entityId, rotation) {
      var rotationSpeed = 0.022; // TODO: config
      var rotationAmount = rotation * rotationSpeed;
      var body = this.bodyMap[entityId];
      this.physics.rotateBody(body, rotationAmount);
    }
  }, {
    key: "rotateCamera",
    value: function rotateCamera(angle) {
      // not implemented directly, Graphics plugin will handle this
    }
  }, {
    key: "setBackground",
    value: function setBackground(color) {
      // not implemented directly, Graphics plugin will handle this
    }
  }, {
    key: "createBorder",
    value: function createBorder(_ref2) {
      var width = _ref2.width,
        height = _ref2.height,
        _ref2$thickness = _ref2.thickness,
        thickness = _ref2$thickness === void 0 ? 8 : _ref2$thickness,
        color = _ref2.color;
      var game = this;
      if (game.systems.border) {
        game.systems.border.createBorder({
          width: game.width,
          height: game.height,
          thickness: thickness
        });
      } else {
        game.use('Border', {}, function () {
          game.systems.border.createBorder({
            width: game.width,
            height: game.height,
            thickness: thickness
          });
        });
      }
    }
  }, {
    key: "useSutra",
    value: function useSutra(subSutra, name) {
      if (this.rules) {
        this.rules.use(subSutra, name);
        if (this.systems['gui-sutra']) {
          this.systems['gui-sutra'].setRules(this.rules);
        }
      } else {
        console.log('Warning: no rules engine found, cannot use sutra', subSutra, name);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      // not a full game reset ( yet )
      // reset default entity input
      //let movementRules = movement(this);
      //this.rules.use(movementRules, 'movement');

      // reset all Sutra rules
      this.rules = this.createSutra();

      // remap the keyboard mappings to Sutra by default
      if (this.systems.sutra) {
        this.systems.sutra.bindKeyCodesToSutraConditions();
      }
    }
  }]);
  return Game;
}();

},{"./Component/ActionRateLimiter.js":1,"./Component/Component.js":2,"./Component/TimersComponent.js":3,"./System/SystemsManager.js":5,"./lib/createDefaultPlayer.js":7,"./lib/defaultPlayerMovement.js":8,"./lib/eventEmitter.js":9,"./lib/gameTick.js":10,"./lib/loadPluginsFromConfig.js":11,"./lib/localGameLoop.js":12,"./lib/onlineGameLoop.js":13,"./lib/start/defaultGameStart.js":14,"./lib/storage/storage.js":16,"./lib/switchWorlds.js":17,"./lib/util/loadCSS.js":18,"./lib/util/loadScripts.js":19}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _eventEmitter = _interopRequireDefault(require("../lib/eventEmitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // TODO: add events
var SystemsManager = /*#__PURE__*/function () {
  function SystemsManager(game) {
    _classCallCheck(this, SystemsManager);
    this.game = game;
    this.systems = new Map();
  }
  _createClass(SystemsManager, [{
    key: "addSystem",
    value: function addSystem(systemId, system) {
      if (this.systems.has(systemId)) {
        // throw new Error(`System with name ${systemId} already exists!`);
        console.log("Warning: System with name ".concat(systemId, " already exists!"));
        return;
      }

      // Remark: Defaulting all Plugins to event emitters has is currently enabled
      // This means all plugin methods will be emitted as events
      // In the future we can add a config option per Plugin and per Plugin method to enable/disable this
      // eventEmitter.bindClass(system, systemId)

      // binds system to local instance Map
      this.systems.set(systemId, system);
      // binds system to game.systems scope for convenience
      this.game.systems[systemId] = system;
      //console.log(`system[${systemId}] = new ${system.name}()`);
      //console.log(`game.use(new ${system.name}())`);
    }
  }, {
    key: "removeSystem",
    value: function removeSystem(systemId) {
      if (!this.systems.has(systemId)) {
        //throw new Error(`System with name ${systemId} does not exist!`);
        console.log("Warning: System with name ".concat(systemId, " does not exist!"));
        return;
      }
      // call the system.unload method if it exists
      var system = this.systems.get(systemId);
      if (typeof system.unload === "function") {
        system.unload();
      }
      this.systems["delete"](systemId);

      // Remark: Special scope used for plugins, we can probably remove this or rename it
      if (this.game._plugins[systemId]) {
        delete this.game._plugins[systemId];
      }

      // we may want to remove the extra game.systems scope? or reference directly to the map?
      delete this.game.systems[systemId];
    }
  }, {
    key: "getSystem",
    value: function getSystem(systemId) {
      if (this.systems.has(systemId)) {
        return this.systems.get(systemId);
      }
      throw new Error("System with name ".concat(systemId, " does not exist! Perhaps try running \"game.use(new plugins.").concat(systemId, "())\" first?"));
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      var _iterator = _createForOfIteratorHelper(this.systems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            _ = _step$value[0],
            system = _step$value[1];
          if (typeof system.update === "function") {
            system.update(deltaTime);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "render",
    value: function render() {
      /*
      const renderSystem = this.systems.get('render');
      if (renderSystem && typeof renderSystem.render === "function") {
        renderSystem.render();
      }
      */
    }

    /*
    // something like this
    before(eventPattern, callback) {
       // game.systemManager.before('entityMovement.update', (entityId, x, y) => {})
      game.systemManager.after('game.getPlayerSnapshot', (snapshot, next) => {
        // perform compression logic here
        next(snapshot); // is error not first arg? probably not?
      })
       // eventEmitter.before(eventPattern, callback)
    }
    */
  }]);
  return SystemsManager;
}();
var _default = exports["default"] = SystemsManager;

},{"../lib/eventEmitter.js":9}],6:[function(require,module,exports){
"use strict";

var MANTRA = {};
MANTRA.Game = require('./Game.js').Game;
MANTRA.plugins = {}; // empty plugin scope, may be populated by using plugins
module.exports = MANTRA;

},{"./Game.js":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createDefaultPlayer;
function createDefaultPlayer() {
  var playerConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  //console.log('creating default player', playerConfig)

  if (typeof playerConfig.position === 'undefined') {
    playerConfig.position = {
      x: 0,
      y: 0
    };
  }
  if (playerConfig.texture === 'none') {
    delete playerConfig.texture;
  }

  // check if game.currentPlayerId is already set,
  // if so return
  if (this.currentPlayerId) {
    return this.getEntity(this.currentPlayerId);
  }
  var player = this.createEntity({
    type: 'PLAYER',
    shape: 'triangle',
    collisionActive: true,
    collisionStart: true,
    collisionEnd: true,
    width: 16,
    height: 16,
    color: playerConfig.color,
    radius: playerConfig.radius,
    texture: playerConfig.texture,
    mass: 222,
    friction: 0.5,
    // Default friction
    frictionAir: 0.5,
    // Default air friction
    frictionStatic: 1,
    // Default static friction
    // color: 0x00ff00,
    position: playerConfig.position
  });
  this.setPlayerId(player.id);
  return player;
}
;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = topdownMovement;
function topdownMovement(game) {
  return;
  var rules = game.createSutra();
  rules["if"]('W').then('MOVE_FORWARD');
  rules["if"]('A').then('MOVE_LEFT');
  rules["if"]('S').then('MOVE_BACKWARD');
  rules["if"]('D').then('MOVE_RIGHT');
  rules["if"]('SPACE').then('FIRE_BULLET');
  rules["if"]('K').then('SWING_SWORD');
  rules["if"]('L').then('SWING_SWORD');
  rules["if"]('O').then('ZOOM_IN');
  rules["if"]('P').then('ZOOM_OUT');
  rules.on('MOVE_FORWARD', function (entity) {
    game.applyForce(entity.id, {
      x: 0,
      y: -1,
      z: 0
    });
    game.updateEntity({
      id: entity.id,
      rotation: 0
    });
  });
  rules.on('MOVE_BACKWARD', function (entity) {
    game.applyForce(entity.id, {
      x: 0,
      y: 1,
      z: 0
    });
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI
    });
  });
  rules.on('MOVE_LEFT', function (entity) {
    game.applyForce(entity.id, {
      x: -1,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: entity.id,
      rotation: -Math.PI / 2
    });
  });
  rules.on('MOVE_RIGHT', function (entity) {
    game.applyForce(entity.id, {
      x: 1,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI / 2
    });
  });
  rules.on('FIRE_BULLET', function (entity) {
    game.systems.bullet.fireBullet(entity.id);
  });
  rules.on('SWING_SWORD', function (entity) {
    game.systems.sword.swingSword(entity.id);
  });
  rules.on('CAMERA_SHAKE', function (entity) {
    game.shakeCamera(1000);
  });
  rules.on('ZOOM_IN', function (entity) {
    var currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom + 0.05);
  });
  rules.on('ZOOM_OUT', function (entity) {
    var currentZoom = game.data.camera.currentZoom || 1;
    game.setZoom(currentZoom - 0.05);
  });

  // game.emit('entityInput::handleActions', entityId, actions);

  return rules;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var eventEmitter = {
  listeners: {},
  emitters: {},
  wrappedFunctions: {}
};
eventEmitter.anyListeners = [];
eventEmitter.onAny = function onAny(callback) {
  eventEmitter.anyListeners.push(callback);
};
eventEmitter.offAny = function offAny(callback) {
  eventEmitter.anyListeners = eventEmitter.anyListeners.filter(function (listener) {
    return listener !== callback;
  });
};
eventEmitter.before = function beforeEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].unshift(callback);
};
eventEmitter.after = function afterEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].push(callback);
};
eventEmitter.once = function onceEvent(eventName, callback) {
  var _this = this;
  var onceWrapper = function onceWrapper() {
    _this.off(eventName, onceWrapper);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    callback.apply(null, args);
  };
  this.on(eventName, onceWrapper);
};
eventEmitter.on = function onEvent(eventName, callback) {
  if (!eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = [];
  }
  eventEmitter.listeners[eventName].push(callback);
};
eventEmitter.off = function offEvent(eventName, callback) {
  if (eventEmitter.listeners[eventName]) {
    eventEmitter.listeners[eventName] = eventEmitter.listeners[eventName].filter(function (listener) {
      return listener !== callback;
    });
  }
};
eventEmitter.emit = function emitEvent(eventName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  // Call anyListeners if they exist
  // Remark: .onAny() can't really be used in production; however it could be very useful for slower fps debugging
  if (eventEmitter.anyListeners.length > 0) {
    eventEmitter.anyListeners.forEach(function (listener) {
      // do not emit to the emitter that emitted the event
      try {
        listener.call.apply(listener, [null, eventName].concat(args));
      } catch (error) {
        console.error("Error when executing any listener for event \"".concat(eventName, "\":"), error);
      }
    });
  }

  // Directly check if listeners exist for the eventName
  var listeners = eventEmitter.listeners[eventName];
  if (listeners) {
    listeners.forEach(function (listener) {
      try {
        listener.apply(null, args);
      } catch (error) {
        console.error("Error when executing listener for event \"".concat(eventName, "\":"), error);
      }
    });
  }
};
eventEmitter.bindClass = function bindClass(classInstance, namespace) {
  var _this2 = this;
  var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(function (method) {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      var eventName = namespace + '::' + method;
      var originalMethod = classInstance[method].bind(classInstance);
      _this2.emitters[eventName] = classInstance;
      // Store the original method in wrappedFunctions for future reference
      _this2.wrappedFunctions[eventName] = originalMethod;

      // Set the original method as an event listener
      // TODO: add back this line to pass tests, add failing tests for double emit bug
      // this.on(eventName, this.wrappedFunctions[eventName]);

      // Replace the class method with a wrapper function that emits events
      classInstance[method] = function () {
        var _this2$wrappedFunctio;
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        // Emit the event
        _this2.emit.apply(_this2, [eventName].concat(args));
        // Call the original method
        return (_this2$wrappedFunctio = _this2.wrappedFunctions)[eventName].apply(_this2$wrappedFunctio, args);
      };
    }
  });
};
eventEmitter.unbindClass = function unbindClass(classInstance, namespace) {
  var _this3 = this;
  var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance));
  methods.forEach(function (method) {
    if (typeof classInstance[method] === 'function' && method !== 'constructor') {
      var eventName = namespace + '::' + method;
      var wrappedFunction = _this3.wrappedFunctions[eventName];

      // Remove the event listener if it exists
      if (wrappedFunction) {
        _this3.off(eventName, wrappedFunction);
        // Restore the original method by removing the wrapper
        classInstance[method] = wrappedFunction;
        // Remove the reference from wrappedFunctions
        delete _this3.wrappedFunctions[eventName];
      }
    }
  });
};
eventEmitter.listenerCount = function (eventPattern) {
  if (this.listeners[eventPattern]) {
    return this.listeners[eventPattern].length;
  }
  return 0;
};
var _default = exports["default"] = eventEmitter;

},{}],10:[function(require,module,exports){
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
  this.data.tick = this.tick;
  this.data.currentPlayer = this.getEntity(this.currentPlayerId);
  // Calculate deltaTime in milliseconds
  var now = Date.now();
  var deltaTimeMS = now - lastTick; // Delta time in milliseconds
  lastTick = now;

  // Clamp deltaTime to avoid time spiral and ensure stability
  deltaTimeMS = Math.min(deltaTimeMS, hzMS);

  // Clear changed entities
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
  var _iterator = _createForOfIteratorHelper(this.changedEntities),
    _step;
  try {
    var _loop = function _loop() {
      var entityId = _step.value;
      if (_this.isClient && _this.isOnline === false) {
        var ent = _this.entities.get(entityId);
        if (ent) {
          _this.graphics.forEach(function inflateEntityPerInterface(graphicsInterface) {
            graphicsInterface.inflateEntity(ent);
          });
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  this.changedEntities.clear();

  // Save the game snapshot
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);
  // TODO: THESE should / could all be hooks, after::gameTick
}
var _default = exports["default"] = gameTick;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPluginsFromConfig;
var _LoadingScreen = _interopRequireDefault(require("../plugins/loading-screen/LoadingScreen.js"));
var _GhostTyper = _interopRequireDefault(require("../plugins/typer-ghost/GhostTyper.js"));
var _defaultPlayerMovement = _interopRequireDefault(require("./defaultPlayerMovement.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// default player movement, this could be also be set in defaultGameStart.js

function loadPluginsFromConfig(_ref) {
  var physics = _ref.physics,
    graphics = _ref.graphics,
    collisions = _ref.collisions,
    keyboard = _ref.keyboard,
    mouse = _ref.mouse,
    gamepad = _ref.gamepad,
    editor = _ref.editor,
    sutra = _ref.sutra,
    ghostTyper = _ref.ghostTyper,
    lifetime = _ref.lifetime;
  var plugins = this.plugins;
  var gameConfig = this.config;
  if (gameConfig.showLoadingScreen && !this.isServer) {
    this.use(new _LoadingScreen["default"]({
      minLoadTime: gameConfig.minLoadTime
    }));
  }
  this.on('game::ready', function () {
    // when the game is ready, create the sutra for default top-down movements
    // this.useSutra(movement(this), 'movement');
  });
  this.use('Entity');
  if (physics === 'matter') {
    this.use('MatterPhysics');
  }
  if (physics === 'physx') {
    this.use('PhysXPhysics');
  }
  this.use('EntityInput');
  this.use('EntityMovement');
  this.use('SnapshotManager');
  if (lifetime) {
    this.use('Lifetime');
  }
  if (!this.isServer) {
    var clientConfig = {
      protobuf: gameConfig.protobuf,
      deltaCompression: gameConfig.deltaCompression,
      msgpack: gameConfig.msgpack
    };
    this.use('Client', clientConfig);
    if (editor) {
      this.use('Editor');
    }
    if (keyboard) {
      this.use('Keyboard');
    }
    if (mouse) {
      this.use('Mouse');
    }
    if (gamepad) {
      this.use('Gamepad');
      this.use('GamepadGUI', gamepad);
    }
    if (sutra) {
      this.use('Sutra');
    }
    this.use('GhostTyper');

    // TODO: move to Graphics.loadFromConfig() ?
    if (graphics) {
      this.use('Graphics');

      // check to see if user has specified a graphics engine in local storage
      var storedGraphics = this.storage.get('graphics');
      if (storedGraphics) {
        //this.use(storedGraphics, { camera: this.config.camera });
        //return;
      }
      if (typeof graphics === 'string') {
        graphics = [graphics];
      }
      if (graphics.includes('babylon')) {
        this.use('BabylonGraphics', {
          camera: this.config.camera
        });
      }
      if (graphics.includes('css')) {
        this.use('CSSGraphics', {
          camera: this.config.camera
        });
      }
      if (graphics.includes('css3D')) {
        this.use('CSS3DGraphics', {
          camera: this.config.camera
        });
      }
      if (graphics.includes('phaser')) {
        this.use('PhaserGraphics', {
          camera: this.config.camera
        });
      }
      if (graphics.includes('three')) {
        this.use('ThreeGraphics', {
          camera: this.config.camera
        });
      }
    }
  }
}

},{"../plugins/loading-screen/LoadingScreen.js":20,"../plugins/typer-ghost/GhostTyper.js":21,"./defaultPlayerMovement.js":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var started = false;
var hzMS = 16.666;
var accumulator = 0;
var lastGameTick = Date.now();
var fpsMeasurements = []; // Array to store FPS measurements
var fpsReportFrequency = 60; // How often to report FPS (e.g., every 60 frames)
var frameCount = 0; // A counter for the number of frames

function localGameLoop(game, playerId) {
  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Ensure we start with the current time
  }
  // game.localGameLoopRunning = true;
  game.mode = 'local';
  // Calculate deltaTime in seconds
  var currentTime = Date.now();
  var deltaTime = (currentTime - lastGameTick) / 1000.0; // seconds

  // FPS calculation
  if (deltaTime > 0) {
    var currentFPS = 1 / deltaTime; // FPS is the reciprocal of deltaTime in seconds
    fpsMeasurements.push(currentFPS);
    if (fpsMeasurements.length > fpsReportFrequency) {
      fpsMeasurements.shift(); // Remove the oldest FPS measurement
    }

    frameCount++;
    if (frameCount % fpsReportFrequency === 0) {
      var sumFPS = fpsMeasurements.reduce(function (a, b) {
        return a + b;
      }, 0);
      var averageFPS = sumFPS / fpsMeasurements.length;
      game.emit('fps', averageFPS); // Emit the 'fps' event with the average FPS
      fpsMeasurements = []; // Reset the measurements array after reporting
    }
  }

  lastGameTick = currentTime;

  // Accumulate time since the last game logic update
  accumulator += deltaTime;

  // Calculate how many full timesteps have passed
  var fixedStep = hzMS / 1000.0;
  while (accumulator >= fixedStep) {
    game.gameTick();
    accumulator -= fixedStep; // Decrease accumulator by a fixed timestep
  }

  // Calculate alpha based on the remaining accumulated time for interpolation
  var alpha = accumulator / fixedStep;

  // Render the local snapshot with interpolation
  game.graphics.forEach(function localGameLoopGraphicsRender(graphicsInterface) {
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop using requestAnimationFrame
  if (game.localGameLoopRunning) {
    _requestAnimationFrame(function rafLocalGameLoop() {
      localGameLoop(game, playerId);
    });
  }
}
function _requestAnimationFrame(callback) {
  if (typeof window === 'undefined') {
    return setTimeout(callback, 0);
  } else {
    return window.requestAnimationFrame(callback);
  }
}
var _default = exports["default"] = localGameLoop;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// onlineGameLoop.js - Marak Squires 2023
var started = false;
var lastRenderedSnapshotId = null;
var hzMS = 16.666;
var accumulator = 0;
var lastGameTick = Date.now();
var fpsMeasurements = []; // Array to store FPS measurements
var fpsReportFrequency = 60; // How often to report FPS (e.g., every 60 frames)
var frameCount = 0; // A counter for the number of frames

function onlineGameLoop(game) {
  if (!started) {
    started = true;
    lastGameTick = Date.now(); // Set the last game tick to the current time to start
  }

  game.onlineGameLoopRunning = true;
  game.mode = 'online';
  var currentTime = Date.now();
  var deltaTime = (currentTime - lastGameTick) / 1000.0; // Convert milliseconds to seconds

  // FPS calculation here, before updating lastGameTick
  if (deltaTime > 0) {
    var currentFPS = 1 / deltaTime; // FPS is the reciprocal of deltaTime in seconds
    fpsMeasurements.push(currentFPS);
    if (fpsMeasurements.length > fpsReportFrequency) {
      fpsMeasurements.shift(); // Remove the oldest FPS measurement
    }

    frameCount++;
    if (frameCount % fpsReportFrequency === 0) {
      var sumFPS = fpsMeasurements.reduce(function (a, b) {
        return a + b;
      }, 0);
      var averageFPS = sumFPS / fpsMeasurements.length;
      game.emit('fps', averageFPS); // Emit the 'fps' event with the average FPS
      fpsMeasurements = []; // Reset the measurements array after reporting
    }
  }

  // Update lastGameTick after FPS calculation
  lastGameTick = currentTime;

  // Accumulate time since the last game logic update
  accumulator += deltaTime;

  // If there is a new snapshot, process it
  if (game.latestSnapshot && game.latestSnapshot.id !== lastRenderedSnapshotId) {
    while (game.snapshotQueue.length > 0) {
      var snapshot = game.snapshotQueue.shift();
      snapshot.state.forEach(function (state) {
        game.inflateEntity(state);
      });
      lastRenderedSnapshotId = snapshot.id; // Update the last rendered snapshot ID
    }
  }

  // Run game logic updates based on the accumulated time
  while (accumulator >= hzMS / 1000.0) {
    game.gameTick(); // Run the game logic update
    accumulator -= hzMS / 1000.0; // Decrease accumulator by the fixed timestep
  }

  // Calculate alpha based on the remaining accumulated time for interpolation
  var fixedStep = hzMS / 1000.0;
  var alpha = accumulator / fixedStep;

  // Render the snapshot with the current state
  game.graphics.forEach(function (graphicsInterface) {
    graphicsInterface.render(game, alpha);
  });

  // Schedule the next iteration of the loop using requestAnimationFrame
  if (game.onlineGameLoopRunning) {
    requestAnimationFrame(function () {
      onlineGameLoop(game);
    });
  }
}
var _default = exports["default"] = onlineGameLoop;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultGameStart;
function defaultGameStart(game) {
  game.use('Bullet');
  game.createBorder({
    height: 2000,
    width: 2000
  });
}

},{}],15:[function(require,module,exports){
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
var MemoryBackend = /*#__PURE__*/function () {
  function MemoryBackend() {
    _classCallCheck(this, MemoryBackend);
    this.data = {};
  }
  _createClass(MemoryBackend, [{
    key: "clear",
    value: function clear() {
      this.data = {};
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.data[key] = value;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.data[key] || null;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      delete this.data[key];
    }
  }, {
    key: "key",
    value: function key(index) {
      return Object.keys(this.data)[index] || null;
    }
  }, {
    key: "length",
    get: function get() {
      return Object.keys(this.data).length;
    }
  }]);
  return MemoryBackend;
}();
var _default = exports["default"] = MemoryBackend;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MemoryBackend = _interopRequireDefault(require("./MemoryBackend.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = function () {
  var backend = null;
  if (typeof window !== "undefined" && window.localStorage) {
    backend = window.localStorage;
  } else {
    backend = new _MemoryBackend["default"]();
  }
  var prefix = 'mantra-';
  var setBackend = function setBackend(newBackend) {
    backend = newBackend;
  };
  var setPrefix = function setPrefix(newPrefix) {
    prefix = newPrefix;
  };
  var clear = function clear() {
    backend.clear();
  };
  var remove = function remove(key) {
    backend.removeItem(prefix + key);
  };
  var set = function set(key, value) {
    var stringValue = JSON.stringify(value);
    backend.setItem(prefix + key, stringValue);
  };
  var get = function get(key) {
    var stringValue = backend.getItem(prefix + key);
    if (stringValue === null) {
      return null;
    }
    try {
      return JSON.parse(stringValue);
    } catch (e) {
      return stringValue;
    }
  };
  var getAllKeys = function getAllKeys() {
    var keys = [];
    for (var i = 0; i < backend.length; i++) {
      var key = backend.key(i);
      if (key.startsWith(prefix)) {
        keys.push(key.substring(prefix.length));
      }
    }
    return keys;
  };
  var getAllKeysWithData = function getAllKeysWithData() {
    var keyDataPairs = {};
    for (var i = 0; i < backend.length; i++) {
      var key = backend.key(i);
      if (key && key.startsWith(prefix)) {
        var originalKey = key.substring(prefix.length);
        keyDataPairs[originalKey] = get(originalKey);
      }
    }
    return keyDataPairs;
  };

  // Expose public methods
  return {
    setBackend: setBackend,
    setPrefix: setPrefix,
    clear: clear,
    set: set,
    get: get,
    remove: remove,
    getAllKeys: getAllKeys,
    getAllKeysWithData: getAllKeysWithData
  };
}();
var _default = exports["default"] = storage;

},{"./MemoryBackend.js":15}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = switchWorlds;
function switchWorlds(selectedWorld) {
  var game = this;
  // check to see if game.worlds has any entries
  // if so, unload them if they have an unload method
  if (game.worlds.length > 0) {
    game.worlds.forEach(function (world, i) {
      if (world.unload) {
        // alert(`Unloading ${world.id}`);
        console.log(world.id, 'world.unload', world.unload);
        // remove the world from the game.worlds array
        game.worlds.splice(i, 1);
        world.unload();
      }
    });
  }
  game.systems.entity.removeAllEntities(true);
  var worldName = 'XState';
  worldName = 'Sutra';
  worldName = selectedWorld;
  var worldClass = WORLDS.worlds[worldName];
  if (!worldClass) {
    console.error("World ".concat(worldName, " not found"));
    return;
  }
  var worldInstance = new worldClass();
  game.once('plugin::loaded::' + worldInstance.id, function () {
    // alert('loaded')
    // call init?
    //worldInstance.init(game);
  });

  // needs to wait at least 1 tick of game loop to ensure entities are cleared
  // TODO: add Game.scheduleEvent(tickCount) method
  //       this will allow us to schedule events to occur at a specific tick in the future
  //       See: Timers.js file for example
  setTimeout(function () {}, 400);
  game.use(worldInstance);

  // USER INTENT: Change world
  // persist this intention to the local storage
  // so that it can be restored on next page load
  game.storage.set('world', selectedWorld);
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadCSS;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// loadCSS.js - Marak Squires 2024
function loadCSS(_x, _x2) {
  return _loadCSS.apply(this, arguments);
}
function _loadCSS() {
  _loadCSS = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(stylesheets, finalCallback) {
    var _this = this;
    var loadStylesheet, i;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isServer) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          // Ensure stylesheets is an array
          if (typeof stylesheets === 'string') {
            stylesheets = [stylesheets];
          }

          // Function to load an individual stylesheet and return a Promise
          loadStylesheet = /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(stylesheet) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", new Promise(function (resolve, reject) {
                      var link = document.createElement('link');
                      link.rel = 'stylesheet';
                      link.type = 'text/css';
                      link.href = _this.scriptRoot + stylesheet;
                      link.onload = function () {
                        resolve(stylesheet);
                      };
                      link.onerror = function () {
                        reject("Error loading stylesheet: ".concat(stylesheet));
                      };
                      document.head.appendChild(link);
                    }));
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function loadStylesheet(_x3) {
              return _ref.apply(this, arguments);
            };
          }(); // Sequentially load each stylesheet
          i = 0;
        case 5:
          if (!(i < stylesheets.length)) {
            _context2.next = 17;
            break;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return loadStylesheet(stylesheets[i]);
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](6);
          console.error(_context2.t0);
          // Optionally handle the error and decide whether to continue or stop
        case 14:
          i++;
          _context2.next = 5;
          break;
        case 17:
          // Call the final callback after all stylesheets are loaded
          if (typeof finalCallback === 'function') {
            finalCallback();
          }
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[6, 11]]);
  }));
  return _loadCSS.apply(this, arguments);
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadScripts;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// loadScripts.js - Marak Squires 2023
function loadScripts(_x, _x2) {
  return _loadScripts.apply(this, arguments);
}
function _loadScripts() {
  _loadScripts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(scripts, finalCallback) {
    var _this = this;
    var loadScript, i;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isServer) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          // Function to load an individual script and return a Promise
          loadScript = /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(script) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", new Promise(function (resolve, reject) {
                      var scriptElement = document.createElement('script');
                      scriptElement.type = 'text/javascript';
                      scriptElement.defer = true;
                      scriptElement.src = _this.scriptRoot + script;
                      scriptElement.onload = function () {
                        resolve(script);
                      };
                      scriptElement.onerror = function () {
                        reject("Error loading script: ".concat(script));
                      };
                      document.head.appendChild(scriptElement);
                    }));
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function loadScript(_x3) {
              return _ref.apply(this, arguments);
            };
          }(); // Sequentially load each script
          i = 0;
        case 4:
          if (!(i < scripts.length)) {
            _context2.next = 16;
            break;
          }
          _context2.prev = 5;
          _context2.next = 8;
          return loadScript(scripts[i]);
        case 8:
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](5);
          console.error(_context2.t0);
          // Optionally handle the error and decide whether to continue or stop
        case 13:
          i++;
          _context2.next = 4;
          break;
        case 16:
          // Call the final callback after all scripts are loaded
          if (finalCallback) {
            finalCallback();
          }
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[5, 10]]);
  }));
  return _loadScripts.apply(this, arguments);
}

},{}],20:[function(require,module,exports){
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
var LoadingScreen = /*#__PURE__*/function () {
  function LoadingScreen() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, LoadingScreen);
    this.id = LoadingScreen.id;
    this.plugins = [];
    this.minLoadTime = config.minLoadTime || 330; // Minimum time for the loading screen
    this.startTime = Date.now(); // Track the start time of the loading process
    this.loadedPluginsCount = 0;
    this.confirmedLoadedPlugins = [];
    this.pluginTimers = {}; // Store timers for each plugin
    this.pluginElements = {}; // Store references to plugin UI elements
  }
  _createClass(LoadingScreen, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      var self = this;
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      var currentPlugins = Object.keys(this.game._plugins);
      this.plugins = this.plugins.concat(currentPlugins);
      this.plugins.sort();
      this.createLoadingScreen();
      this.game.on('plugin::loading', function (pluginId) {
        // check to see if we already have a loading timer for this plugin
        // if not, create one
        if (_this.plugins.indexOf(pluginId) === -1) {
          _this.plugins.push(pluginId);
          _this.createPluginLoader(pluginId);
        }
      });
      this.game.on('plugin::loaded', function (pluginId) {
        _this.markPluginAsLoaded(pluginId);
      });
      this.game.on('game::ready', function () {
        var now = Date.now();
        var timeRemaining = _this.minLoadTime - (now - _this.startTime);
        // check to see if enough this.minLoadtime has passed since this.startTime 
        // if not, set a timeout to wait until it has

        self.gameReadyHandler();
        if (timeRemaining > 0) {
          setTimeout(function () {
            self.unload();
          }, timeRemaining * 0.33);
        } else {
          self.unload();
        }
      });

      //this.animateCRT = this.animateCRT.bind(this); // Bind the function
      // this.animateCRT();
    }

    /* Remark: Replaced with CSS animation
    animateCRT() {
      const glowElement = document.querySelector('.crt-glow');
      const scanlinesElement = document.querySelector('.crt-scanlines');
    
      // Adjust the glow intensity
      let glowIntensity = Math.random() * 0.5 + 0.5;
      glowElement.style.boxShadow = `inset 0 0 ${30 * glowIntensity}px rgba(0, 255, 0, ${0.7 * glowIntensity})`;
    
      // Adjust the scanlines opacity
      let scanlinesOpacity = Math.random() * 0.1 + 0.05;
      scanlinesElement.style.opacity = scanlinesOpacity;
    
      // Repeat this animation with a smoother transition
      setTimeout(this.animateCRT, 1000); // Adjust the timing as needed
    }
    */
  }, {
    key: "gameReadyHandler",
    value: function gameReadyHandler() {
      var _this2 = this;
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.startTime;
      var remainingTime = Math.max(this.minLoadTime - elapsedTime, 0);
      this.plugins.forEach(function (plugin) {
        if (!_this2.isPluginLoaded(plugin)) {
          _this2.fastTrackLoading(plugin, remainingTime);
        }
      });
    }
  }, {
    key: "isPluginLoaded",
    value: function isPluginLoaded(pluginId) {
      var progressBar = this.pluginElements[pluginId];
      return progressBar && progressBar.style.width === '100%';
    }
  }, {
    key: "fastTrackLoading",
    value: function fastTrackLoading(pluginId, remainingTime) {
      var _this3 = this;
      clearInterval(this.pluginTimers[pluginId]);
      var progressBar = this.pluginElements[pluginId];
      if (progressBar) {
        var currentWidth = parseInt(progressBar.style.width, 10) || 0;
        var intervalTime = remainingTime / (100 - currentWidth);
        this.pluginTimers[pluginId] = setInterval(function () {
          if (currentWidth < 100) {
            currentWidth++;
            progressBar.style.width = currentWidth + '%';
          } else {
            clearInterval(_this3.pluginTimers[pluginId]);
          }
        }, intervalTime);
      }
    }
  }, {
    key: "createLoadingScreen",
    value: function createLoadingScreen() {
      this.loadingScreen = document.createElement('div');
      this.loadingScreen.id = 'loadingScreen';

      // add class crt-background
      this.loadingScreen.classList.add('crt-background');

      // let loadingScreen = document.getElementById('loadingScreen');

      // crt-background (if needed)
      var crtBackground = document.createElement('div');
      crtBackground.classList.add('crt-background');
      this.loadingScreen.appendChild(crtBackground);

      // crt-glow
      var crtGlow = document.createElement('div');
      crtGlow.classList.add('crt-glow');
      crtBackground.appendChild(crtGlow); // Append to crtBackground if exists

      // crt-scanlines
      var crtScanlines = document.createElement('div');
      crtScanlines.classList.add('crt-scanlines');
      crtBackground.appendChild(crtScanlines); // Append to crtBackground if exists

      this.crtBackground = crtBackground;
      this.setupStyles(this.crtBackground, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      });

      // Header container
      var headerContainer = document.createElement('div');
      this.setupStyles(headerContainer, {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px'
      });

      // Game title
      var gameTitle = document.createElement('div');
      gameTitle.textContent = 'Mantra.js Game Starting';
      this.setupStyles(gameTitle, {
        fontSize: '20px',
        fontWeight: 'bold'
      });

      // Plugin counter
      this.pluginCounter = document.createElement('div');
      this.updatePluginCounter(); // Update the plugin counter initially
      this.setupStyles(this.pluginCounter, {
        fontSize: '16px'
      });
      headerContainer.appendChild(gameTitle);
      headerContainer.appendChild(this.pluginCounter);
      this.crtBackground.appendChild(headerContainer);
      this.createPluginLoaders();
      document.body.appendChild(this.loadingScreen);
    }
  }, {
    key: "updatePluginCounter",
    value: function updatePluginCounter() {
      // this.pluginCounter.textContent = `${this.loadedPluginsCount}/${this.plugins.length} plugins loaded`;
    }
  }, {
    key: "createPluginLoader",
    value: function createPluginLoader(plugin) {
      // Plugin container
      var pluginContainer = document.createElement('div');
      this.setupStyles(pluginContainer, {
        display: 'flex',
        alignItems: 'center',
        margin: '5px',
        width: '80%'
      });

      // Plugin name
      var pluginName = document.createElement('div');
      pluginName.textContent = plugin;
      this.setupStyles(pluginName, {
        marginRight: '10px',
        // Add margin to separate name from progress bar
        whiteSpace: 'nowrap' // Prevent plugin name from wrapping
      });

      // Progress bar container
      var progressBarContainer = document.createElement('div');
      this.setupStyles(progressBarContainer, {
        width: '60%',
        // Fixed width for all progress bars
        marginLeft: 'auto' // Aligns the progress bar container to the right
      });

      // Progress bar
      var progressBar = document.createElement('div');
      this.setupStyles(progressBar, {
        width: '0%',
        height: '20px',
        backgroundColor: 'limegreen'
      });
      progressBarContainer.appendChild(progressBar);
      pluginContainer.appendChild(pluginName);
      pluginContainer.appendChild(progressBarContainer);
      //this.loadingScreen.appendChild(pluginContainer);
      this.crtBackground.appendChild(pluginContainer); // Append to crtBackground if exists

      this.pluginElements[plugin] = progressBar;

      // Initialize and store the loading timer for each plugin
      this.pluginTimers[plugin] = this.initializeLoadingTimer(progressBar, plugin);
    }
  }, {
    key: "createPluginLoaders",
    value: function createPluginLoaders() {
      var _this4 = this;
      this.plugins.forEach(function (plugin) {
        _this4.createPluginLoader(plugin);
      });
    }
  }, {
    key: "initializeLoadingTimer",
    value: function initializeLoadingTimer(progressBar, plugin) {
      var _this5 = this;
      var width = 0;
      var maxTime = this.minLoadTime + Math.random() * 5000; // Randomize load time
      var intervalTime = maxTime / 100;
      return setInterval(function () {
        if (width < 100) {
          width++;
          progressBar.style.width = width + '%';
        } else {
          clearInterval(_this5.pluginTimers[plugin]);
        }
      }, intervalTime);
    }
  }, {
    key: "markPluginAsLoaded",
    value: function markPluginAsLoaded(pluginId) {
      // Clear the existing slow loading timer
      clearInterval(this.pluginTimers[pluginId]);
      var progressBar = this.pluginElements[pluginId];
      if (progressBar) {
        // Start a new faster loading timer
        this.animateToCompletion(progressBar, pluginId);
      }
      if (this.confirmedLoadedPlugins.indexOf(pluginId) !== -1) {
        return;
      }
      this.confirmedLoadedPlugins.push(pluginId);
      this.loadedPluginsCount++;
      this.updatePluginCounter();
    }
  }, {
    key: "animateToCompletion",
    value: function animateToCompletion(progressBar, pluginId) {
      var _this6 = this;
      var currentWidth = parseInt(progressBar.style.width, 10) || 0;
      var fastLoadTime = Math.random() * 500 + 200; // Random time between 200ms and 700ms
      var intervalTime = fastLoadTime / (100 - currentWidth); // Time per percentage

      this.pluginTimers[pluginId] = setInterval(function () {
        if (currentWidth < 100) {
          currentWidth++;
          progressBar.style.width = currentWidth + '%';
        } else {
          clearInterval(_this6.pluginTimers[pluginId]);
        }
      }, intervalTime);
    }
  }, {
    key: "setupStyles",
    value: function setupStyles(element, styles) {
      Object.assign(element.style, styles);
    }
  }, {
    key: "unload",
    value: function unload() {
      Object.values(this.pluginTimers).forEach(clearInterval);
      if (this.loadingScreen && this.loadingScreen.parentNode) {
        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
      }
    }
  }]);
  return LoadingScreen;
}();
_defineProperty(LoadingScreen, "id", 'loading-screen');
var _default = exports["default"] = LoadingScreen;

},{}],21:[function(require,module,exports){
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
// GhostTyper.js - Marak Squires 2023
var GhostTyper = /*#__PURE__*/function () {
  function GhostTyper() {
    _classCallCheck(this, GhostTyper);
    this.id = GhostTyper.id;
    this.typers = [];
  }
  _createClass(GhostTyper, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "createQueuedText",
    value: function createQueuedText(options) {
      var _this = this;
      var typer = new Typer(this.game, options.x, options.y, '', options.style, function () {
        return _this.removeTyper(typer);
      });
      this.typers.push(typer);
      return typer;
    }
    // Add text to the queue of a specific typer
  }, {
    key: "queueTextForTyper",
    value: function queueTextForTyper(typer, text, duration, removeDuration) {
      typer.queueText(text, duration, removeDuration);
    }

    // Start processing the queue for a specific typer
  }, {
    key: "startTyperQueue",
    value: function startTyperQueue(typer) {
      typer.processQueue();
    }
  }, {
    key: "createText",
    value: function createText(options) {
      var _this2 = this;
      var typer = new Typer(this.game, options.x, options.y, options.text, options.style, options.duration, options.removeDuration, function () {
        return _this2.removeTyper(typer);
      });
      this.typers.push(typer);
      return typer;
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;
      // update gets called once per game tick at the games FPS rate
      this.typers.forEach(function (typer) {
        if (_this3.game.tick % typer.framesToWait === 0 && !typer.complete) {
          typer.type();
        }
      });
    }
  }, {
    key: "removeTyper",
    value: function removeTyper(typerToRemove) {
      this.typers = this.typers.filter(function (typer) {
        return typer !== typerToRemove;
      });
    }
  }]);
  return GhostTyper;
}();
_defineProperty(GhostTyper, "id", 'typer-ghost');
var Typer = /*#__PURE__*/function () {
  function Typer(game, x, y) {
    var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var style = arguments.length > 4 ? arguments[4] : undefined;
    var duration = arguments.length > 5 ? arguments[5] : undefined;
    var removeDuration = arguments.length > 6 ? arguments[6] : undefined;
    var onRemove = arguments.length > 7 ? arguments[7] : undefined;
    _classCallCheck(this, Typer);
    this.game = game;
    this.text = '';
    this.ogText = text;
    this.duration = duration || 5000;
    this.removeDuration = removeDuration;
    this.style = style;
    this.typerText = this.createTextElement(x, y, style);
    this.framesToWait = Math.floor((duration || 5000) / (33.33 * text.length));
    this.frameCounter = 0;
    this.lastUpdate = 0;
    this.complete = false;
    this.removeTimer = null;
    this.textQueue = [];
    this.onRemove = onRemove;
  }
  _createClass(Typer, [{
    key: "queueText",
    value: function queueText(text, duration, removeDuration) {
      this.textQueue.push({
        text: text,
        duration: duration,
        removeDuration: removeDuration
      });
    }

    // Method to start processing the queue
  }, {
    key: "processQueue",
    value: function processQueue() {
      if (this.textQueue.length > 0) {
        var _this$textQueue$shift = this.textQueue.shift(),
          text = _this$textQueue$shift.text,
          duration = _this$textQueue$shift.duration,
          removeDuration = _this$textQueue$shift.removeDuration;
        this.updateText(text, duration, removeDuration);
      }
    }
  }, {
    key: "createTextElement",
    value: function createTextElement(x, y, style) {
      var cameraPosition = this.game.data.camera.position;
      var currentPlayer = this.game.getEntity(this.game.currentPlayerId);
      var element = document.createElement('div');
      Object.assign(element.style, style, {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px'
      });
      document.body.appendChild(element);
      return element;
    }
  }, {
    key: "type",
    value: function type() {
      if (this.text.length) {
        this.typerText.textContent += this.text[0];
        this.text = this.text.substr(1);
        this.isTyping = true;
      } else if (this.isTyping) {
        this.complete = true;
        this.isTyping = false;
        this.setRemoveTimer();
      }
    }
  }, {
    key: "setRemoveTimer",
    value: function setRemoveTimer() {
      var _this4 = this;
      if (this.removeDuration) {
        // Wait for removeDuration before processing the next queue item
        this.removeTimer = setTimeout(function () {
          _this4.typerText.textContent = '';
          _this4.processQueue();
        }, this.removeDuration);
      } else {
        // If there's no removeDuration, process the next item immediately
        this.processQueue();
      }
    }
  }, {
    key: "updateText",
    value: function updateText(newText, newDuration, newRemoveDuration) {
      this.complete = false;
      this.text = newText;
      this.ogText = newText;
      this.duration = newDuration || this.duration;
      this.removeDuration = newRemoveDuration;
      this.framesToWait = Math.floor(this.duration / (33.33 * newText.length));
      this.typerText.textContent = '';
      this.isTyping = false;
    }
  }]);
  return Typer;
}();
var _default = exports["default"] = GhostTyper;

},{}]},{},[6])(6)
});

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
      return this.data[key] || null;
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
var _localGameLoop = _interopRequireDefault(require("./lib/localGameLoop.js"));
var _onlineGameLoop = _interopRequireDefault(require("./lib/onlineGameLoop.js"));
var _gameTick = _interopRequireDefault(require("./lib/gameTick.js"));
var _defaultGameStart = _interopRequireDefault(require("./lib/start/defaultGameStart.js"));
var _ActionRateLimiter = _interopRequireDefault(require("./Component/ActionRateLimiter.js"));
var _TimersComponent = _interopRequireDefault(require("./Component/TimersComponent.js"));
var _loadPluginsFromConfig = _interopRequireDefault(require("./lib/loadPluginsFromConfig.js"));
var _loadScripts = _interopRequireDefault(require("./lib/util/loadScripts.js"));
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
// Game loops
// TODO: move to plugins
// Local game loop is for single machine games ( no networking )
// Online game loop is for multiplayer games ( networking )
// Game tick, called once per tick from game loop
// Provides a default Game.start(fn) logic ( creates a single player and border )
// Bind to event `player::joined` to override default player creation logic
// Action Rate Limiter, suitable for any Systems action that should be rate limited
// Loads plugins from config, can be disabled with gameConfig.loadDefaultPlugins = false
// Utility function for loading external script assets
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
      _ref$loadDefaultPlugi = _ref.loadDefaultPlugins,
      loadDefaultPlugins = _ref$loadDefaultPlugi === void 0 ? true : _ref$loadDefaultPlugi,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 1600 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 900 : _ref$height,
      _ref$physics = _ref.physics,
      physics = _ref$physics === void 0 ? 'matter' : _ref$physics,
      _ref$graphics = _ref.graphics,
      graphics = _ref$graphics === void 0 ? ['babylon'] : _ref$graphics,
      _ref$collisions = _ref.collisions,
      collisions = _ref$collisions === void 0 ? true : _ref$collisions,
      _ref$camera = _ref.camera,
      camera = _ref$camera === void 0 ? 'follow' : _ref$camera,
      _ref$keyboard = _ref.keyboard,
      keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
      _ref$mouse = _ref.mouse,
      mouse = _ref$mouse === void 0 ? true : _ref$mouse,
      _ref$gamepad = _ref.gamepad,
      gamepad = _ref$gamepad === void 0 ? true : _ref$gamepad,
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
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
    _classCallCheck(this, Game);
    if (isServer) {
      // override default
      isClient = false;
    }

    // config scope for convenience
    var config = {
      isClient: isClient,
      isEdgeClient: isEdgeClient,
      isServer: isServer,
      loadDefaultPlugins: loadDefaultPlugins,
      width: width,
      height: height,
      physics: physics,
      graphics: graphics,
      collisions: collisions,
      camera: camera,
      keyboard: keyboard,
      mouse: mouse,
      gamepad: gamepad,
      lifetime: lifetime,
      isOfflineMode: isOfflineMode,
      protobuf: protobuf,
      msgpack: msgpack,
      deltaCompression: deltaCompression,
      deltaEncoding: deltaEncoding,
      options: options
    };
    this.config = config;
    this.data = {
      width: config.width,
      height: config.height,
      FPS: 60
    };

    // Define the scriptRoot variable for loading external scripts
    // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
    this.scriptRoot = 'https://yantra.gg/mantra';

    // Could be another CDN or other remote location
    // For local development, try this.scriptRoot = './';
    if (options.scriptRoot) {
      console.log("USING SCRIPT ROOT", options.scriptRoot);
      this.scriptRoot = options.scriptRoot;
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
    this.bodyMap = {};
    this.systems = {};
    this.snapshotQueue = [];
    this.tick = 0;

    // Game settings
    this.width = width;
    this.height = height;

    // Remark: Currently, only (1) physics engine is supported at a time
    // If we want to run multiple physics engines, we'll want to make this array
    // this.physics = [];

    this.changedEntities = new Set();
    this.removedEntities = new Set();
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
      owner: new _Component["default"]('owner', this)
    };

    // define additional components for the game
    this.components.health = new _Component["default"]('color', this);
    this.components.health = new _Component["default"]('health', this);
    this.components.target = new _Component["default"]('target', this);
    this.components.lifetime = new _Component["default"]('lifetime', this);
    this.components.creationTime = new _Component["default"]('creationTime', this);
    this.components.BulletComponent = new _Component["default"]('BulletComponent', this);
    this.components.graphics = new _Component["default"]('graphics', this);
    this.components.lockedProperties = new _Component["default"]('lockedProperties', this);
    this.components.actionRateLimiter = new _ActionRateLimiter["default"]('actionRateLimiter', this);
    this.components.timers = new _TimersComponent["default"]('timers', this);

    // Systems Manager
    this.systemsManager = new _SystemsManager["default"](this);

    // Graphics rendering pipeline
    this.graphics = [];
    this.gameTick = _gameTick["default"].bind(this);
    this.localGameLoop = _localGameLoop["default"].bind(this);
    this.onlineGameLoop = _onlineGameLoop["default"].bind(this);
    this.loadPluginsFromConfig = _loadPluginsFromConfig["default"].bind(this);

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
      if (game.loadingPluginsCount > 0) {
        setTimeout(function () {
          game.start(cb);
        }, 4);
        return;
      } else {
        console.log('All Plugins are ready! Starting Mantra Game Client...');
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
      var game = this;

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
          console.log("Plugin ".concat(_pluginId, " is already loaded or loading."));
          return this;
        }
        if (this.isServer) {
          // console.log('pluginId', pluginId, this.plugins)
          if (this.plugins[_pluginId]) {
            console.log('loading plugin', _pluginId, this.plugins[_pluginId]);
            return this.use(new this.plugins[_pluginId](), options);
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
          console.log("Plugin ".concat(_pluginId, " loaded."), game.plugins, game._plugins);
          if ((typeof PLUGINS === "undefined" ? "undefined" : _typeof(PLUGINS)) === 'object') {
            //console.log('creating new instance', pluginId, PLUGINS[pluginId], PLUGINS)
            var pluginInstance = new PLUGINS[_pluginId]["default"](options);
            game.use(pluginInstance);
            // check to see if pluginInstance is async, if so
            // we'll assume it will emit a ready event when it's ready
            if (pluginInstance.async) {
              // plugin must perform async operation before it's ready
              // plugin author *must* emit their own ready event game will not start
              // alert('plugin must perform async operation before it\'s ready');
            } else {
              game.loadingPluginsCount--;
              game.emit('plugin::ready::' + _pluginId, pluginInstance);
            }
          } else {
            // decrement loadingPluginsCount even if it fails
            // this means applications will attempt to load even if plugins fail
            game.loadingPluginsCount--;
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
      this.emit('plugin::loaded', pluginId);
      pluginInstanceOrId.init(this, this.engine, this.scene);
      this._plugins[pluginId] = pluginInstanceOrId;
      return this;
    }

    // Helper function to load plugin scripts
  }, {
    key: "loadPluginScript",
    value: function loadPluginScript(scriptUrl) {
      console.log('loadPluginScript', scriptUrl);
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
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
      return this.components[componentType] ? this.components[componentType].get(entityId) : null;
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
        console.log(_this.listenerCount('player::joined'));
        if (_this.listenerCount('player::joined') === 0) {
          var result = _this.defaultCreatePlayer(playerConfig);
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
    key: "defaultCreatePlayer",
    value: function defaultCreatePlayer(playerConfig) {
      console.log('creating default player');
      return this.createEntity({
        type: 'PLAYER',
        shape: 'triangle',
        width: 200,
        height: 200,
        position: {
          x: 0,
          y: 0
        }
      });
    }
  }, {
    key: "setPlayerId",
    value: function setPlayerId(playerId) {
      // console.log('setting playerID', playerId)
      this.currentPlayerId = playerId;
    }
  }]);
  return Game;
}();

},{"./Component/ActionRateLimiter.js":1,"./Component/Component.js":2,"./Component/TimersComponent.js":3,"./System/SystemsManager.js":5,"./lib/eventEmitter.js":7,"./lib/gameTick.js":8,"./lib/loadPluginsFromConfig.js":9,"./lib/localGameLoop.js":10,"./lib/onlineGameLoop.js":11,"./lib/start/defaultGameStart.js":12,"./lib/util/loadScripts.js":13}],5:[function(require,module,exports){
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
        throw new Error("System with name ".concat(systemId, " already exists!"));
      }

      // Remark: Defaulting all Plugins to event emitters has is currently enabled
      // This means all plugin methods will be emitted as events
      // In the future we can add a config option per Plugin and per Plugin method to enable/disable this
      _eventEmitter["default"].bindClass(system, systemId);

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
        throw new Error("System with name ".concat(systemId, " does not exist!"));
      }
      // call the system.unload method if it exists
      var system = this.systems.get(systemId);
      if (typeof system.unload === "function") {
        system.unload();
      }
      this.systems["delete"](systemId);
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
      var renderSystem = this.systems.get('render');
      if (renderSystem && typeof renderSystem.render === "function") {
        renderSystem.render();
      }
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

},{"../lib/eventEmitter.js":7}],6:[function(require,module,exports){
"use strict";

var MANTRA = {};
MANTRA.Game = require('./Game.js').Game;

// Manually require each plugin
// TODO: order by group, then sort alphabetically
MANTRA.plugins = {
  // Behaviors: require('./plugins/behaviors/Behaviors.js').default,
  // BabylonCamera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  // BabylonGraphics: require('./plugins/graphics-babylon/BabylonGraphics.js').default,
  //Block: require('./plugins/block/Block.js').default,
  //Border: require('./plugins/border/Border.js').default,
  // Bullet: require('./plugins/bullet/Bullet.js').default,
  //CSSGraphics: require('./plugins/graphics-css/CSSGraphics.js').default,
  //Camera: require('./plugins/graphics-babylon/camera/BabylonCamera.js').default,
  //Client: require('./plugins/client/Client.js').default,
  //Collision: require('./plugins/collisions/Collisions.js').default,
  //Entity: require('./plugins/entity/Entity.js').default,
  //EntityInput: require('./plugins/entity-input/EntityInput.js').default,
  //EntityMovement: require('./plugins/entity-movement/EntityMovement.js').default,
  //Gamepad: require('./plugins/gamepad/Gamepad.js').default,
  // Graphics: require('./plugins/graphics/Graphics.js').default,
  //EntitiesGUI: require('./plugins/gui-entities/EntitiesGUI.js').default,

  //Health: require('./plugins/health/Health.js').default,
  //Timers: require('./plugins/timers/Timers.js').default,
  // ControlsGUI: require('./plugins/gui-controls/ControlsGUI.js').default,
  // LoadingScreen: require('./plugins/loading-screen/LoadingScreen.js').default,
  // PingTime: require('./plugins/ping-time/PingTime.js').default,
  // ChronoControl: require('./plugins/chrono-control/ChronoControl.js').default,
  // Creator: require('./plugins/gui-creator/Creator.js').default,
  //PluginsGUI: require('./plugins/gui-plugins/PluginsGUI.js').default,
  //YantraGUI: require('./plugins/gui-yantra/YantraGUI.js').default,
  //SutraGUI: require('./plugins/gui-sutra/SutraGUI.js').default,
  //Editor: require('./plugins/gui-editor/Editor.js').default,
  //SnapshotSize: require('./plugins/snapshot-size/SnapshotSize.js').default,
  //Schema: require('./plugins/schema/Schema.js').default,
  //CurrentFPS: require('./plugins/current-fps/CurrentFPS.js').default,
  //Keyboard: require('./plugins/keyboard/Keyboard.js').default,
  //Lifetime: require('./plugins/lifetime/Lifetime.js').default,
  //LocalClient: require('./plugins/client/LocalClient.js').default,
  // MatterPhysics: require('./plugins/physics-matter/MatterPhysics.js').default,
  //Mouse: require('./plugins/mouse/Mouse.js').default,
  //PhaserGraphics: require('./plugins/graphics-phaser/PhaserGraphics.js').default,
  //ThreeGraphics: require('./plugins/graphics-three/ThreeGraphics.js').default,
  //StarField: require('./plugins/starfield/StarField.js').default,
  /*
  AsteroidsMovement: require('./plugins/entity-movement/strategies/AsteroidsMovement.js').default,
  BabylonStarField: require('./plugins/starfield/BabylonStarField.js').default,
  MovementFrogger: require('./plugins/entity-movement/strategies/FroggerMovement.js').default,
  MovementPacman: require('./plugins/entity-movement/strategies/PacManMovement.js').default,
  MovementPong: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  MovementAsteroids: require('./plugins/entity-movement/strategies/AsteroidsMovement.js').default,
  PongMovement: require('./plugins/entity-movement/strategies/PongMovement.js').default,
  PongWorld: require('./plugins/world/pong/PongWorld.js').default,
  XState: require('./plugins/xstate/XState.js').default,
   */
  // ... add other plugins similarly
};
module.exports = MANTRA;

},{"./Game.js":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPluginsFromConfig;
function loadPluginsFromConfig(_ref) {
  var physics = _ref.physics,
    graphics = _ref.graphics,
    collisions = _ref.collisions,
    keyboard = _ref.keyboard,
    mouse = _ref.mouse,
    gamepad = _ref.gamepad,
    lifetime = _ref.lifetime;
  var plugins = this.plugins;
  var gameConfig = this.config;
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
    if (keyboard) {
      this.use('Keyboard');
    }
    if (mouse) {
      this.use('Mouse');
    }
    if (gamepad) {
      this.use('Gamepad');
    }

    // TODO: move to Graphics.loadFromConfig() ?
    if (graphics) {
      if (typeof graphics === 'string') {
        graphics = [graphics];
      }
      this.use('Graphics');
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

},{}],10:[function(require,module,exports){
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
  game.graphics.forEach(function (graphicsInterface) {
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop using requestAnimationFrame
  if (game.localGameLoopRunning) {
    requestAnimationFrame(function () {
      localGameLoop(game, playerId);
    });
  }
}
var _default = exports["default"] = localGameLoop;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaultGameStart;
function defaultGameStart(game) {
  var plugins = game.plugins;
  // creates a game border
  /*
  game.use(new plugins.Border({ autoBorder: false }));
  game.systems.border.createBorder({
    height: 2000,
    width: 2000,
  });
  */
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadScripts;
// Loads external js script files sequentially
function loadScripts(scripts, finalCallback) {
  var _this = this;
  if (this.isServer) {
    return;
  }
  var loadScript = function loadScript(index) {
    if (index < scripts.length) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      // Prepend the scriptRoot to the script src
      script.src = _this.scriptRoot + scripts[index];
      script.onload = function () {
        console.log("".concat(scripts[index], " loaded"));
        loadScript(index + 1); // Load the next script
      };

      document.head.appendChild(script);
    } else {
      finalCallback(); // All scripts have been loaded
    }
  };

  loadScript(0); // Start loading the first script
}

},{}]},{},[6])(6)
});

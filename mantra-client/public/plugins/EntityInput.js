(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).EntityInput = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var Plugin = /*#__PURE__*/function () {
  function Plugin(game) {
    _classCallCheck(this, Plugin);
    this.game = game; // Store the reference to the game logic
    this.name = 'Plugin'; // make name required to be set?
    // registers itself in event emitter?
  }
  _createClass(Plugin, [{
    key: "init",
    value: function init() {
      throw new Error('Method "init" must be implemented');
    }
  }, {
    key: "update",
    value: function update(deltaTime, snapshot) {
      throw new Error('Method "update" must be implemented');
    }
  }, {
    key: "render",
    value: function render() {
      // throw new Error('Method "render" must be implemented');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // throw new Error('Method "destroy" must be implemented');
    }
  }]);
  return Plugin;
}();
var _default = exports["default"] = Plugin;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Plugin2 = _interopRequireDefault(require("../../Plugin.js"));
var _Default2DInputStrategy = _interopRequireDefault(require("./strategies/2D/Default2DInputStrategy.js"));
var _Default3DInputStrategy = _interopRequireDefault(require("./strategies/3D/Default3DInputStrategy.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // EntityInput.js - Marak Squires 2023
var EntityInput = /*#__PURE__*/function (_Plugin) {
  _inherits(EntityInput, _Plugin);
  var _super = _createSuper(EntityInput);
  function EntityInput(strategy) {
    var _this;
    _classCallCheck(this, EntityInput);
    _this = _super.call(this);
    _this.id = 'entity-input';
    _this.bulletCooldown = 20;
    _this.buttonCooldown = 20;
    _this.lastBulletFireTime = {};
    _this.useMouseControls = false;
    _this.inputsActive = true;

    // Contains an array of input strategies that are run in order each time handleInputs() is called
    _this.strategies = [];

    // Contains an object mapping of all control names registered to the entityInput system
    // These mappings are populated by the input strategies when they are initialized
    // Mappings are currently last in, first out, and will overwrite each other,
    // so the last strategy to register a control mapping will be the one that is used
    _this.controlMappings = {};
    return _this;
  }
  _createClass(EntityInput, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.controlMappings = game.controls || {};
      this.game.systemsManager.addSystem('entity-input', this);
    }

    // Remark: 1/17/24 - Previous API relied on loadDefaultStrategy() in order to establish the default input strategy
    //                   This logic has been moved to loadPluginsFromConfig.js file
    //                   We also are now using Sutra movements as the default input strategy
    //                   The Default2DInputStrategy can still be used as an explicit input strategy
    //                    
  }, {
    key: "loadDefaultStrategy",
    value: function loadDefaultStrategy() {
      console.log('Warning: No input strategies registered, using default input strategy');
      console.log('Current Game.controls', this.game.controls);
      if (this.game.physics && this.game.physics.dimension === 3) {
        //console.log('game.use(new Default3DInputStrategy())');
        // TODO: add this to the physix demo as default plugin
        this.game.use(new _Default3DInputStrategy["default"]());
      } else {
        //console.log('game.use(new DefaultInputStrategy())');
        this.game.use(new _Default2DInputStrategy["default"]());
      }
      if (this.game.controls) {
        // update the controls based on developer usage
        this.game.setControls(this.game.controls);
      }
      this.game.emit('inputStrategyRegistered', this.strategies);
    }
  }, {
    key: "setInputsActive",
    value: function setInputsActive() {
      this.inputsActive = true;
    }
  }, {
    key: "disableInputs",
    value: function disableInputs() {
      this.inputsActive = false;
    }
  }, {
    key: "handleInputs",
    value: function handleInputs(entityId, input, sequenceNumber) {
      var _this2 = this;
      if (!this.inputsActive) {
        return;
      }
      var controls = input.controls;
      this.game.lifecycle.triggerHook('before.handleInput', entityId, input, sequenceNumber);
      if (this.game.customInput !== false) {
        this.strategies.forEach(function (strategy) {
          strategy.handleInputs(entityId, input, sequenceNumber);
        });
        if (typeof controls !== 'undefined') {
          // TODO: remove excessive calls to getEntity
          var ent = this.game.getEntity(entityId);
          var actions = Object.keys(controls).filter(function (key) {
            return controls[key];
          }).map(function (key) {
            return _this2.controlMappings[key];
          });
          actions.forEach(function (action) {
            if (typeof action === 'function') {
              action(ent, game);
            }
            if (_this2.game.rules && typeof action === 'string') {
              _this2.game.rules.emit(action, ent, {
                note: 'node data not available. emitted from entityInput::handleInputs directly from control mapping. this is most likely a result of game.setControls() being called.'
              }, _this2.game.data);
            }
          });
        }
      }
      if (this.game.rules) {
        // not needed? As Sutra plugin will use game.systems.sutra.inputCache?
        // this.game.rules.emit('entityInput::handleInputs', entityId, input, sequenceNumber);
      }

      // always emit the entityInput::handleInputs event
      this.game.emit('entityInput::handleInputs', entityId, input, sequenceNumber);
      this.game.lifecycle.triggerHook('after.handleInput', entityId, input, sequenceNumber);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "unload",
    value: function unload() {}
  }]);
  return EntityInput;
}(_Plugin2["default"]);
_defineProperty(EntityInput, "id", 'entity-input');
_defineProperty(EntityInput, "removable", false);
var _default = exports["default"] = EntityInput;

},{"../../Plugin.js":1,"./strategies/2D/Default2DInputStrategy.js":3,"./strategies/3D/Default3DInputStrategy.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// DefaultTwoDimensionalInputStrategy.js - Marak Squires 2023
// This input strategy is suitable for most top-down 2D games
var DefaultTwoDimensionalInputStrategy = /*#__PURE__*/function () {
  function DefaultTwoDimensionalInputStrategy(plugin) {
    _classCallCheck(this, DefaultTwoDimensionalInputStrategy);
    this.id = DefaultTwoDimensionalInputStrategy.id;
    this.plugin = plugin;
    this.isPressed = false;
    this.continuousActions = [];
  }
  _createClass(DefaultTwoDimensionalInputStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.defaultControlsMapping = {
        // Default 2D Keyboard Controls
        W: 'PLAYER_UP',
        S: 'PLAYER_DOWN',
        A: 'MOVE_LEFT',
        D: 'MOVE_RIGHT',
        SPACE: 'FIRE_BULLET',
        K: 'FIRE_BULLET',
        L: 'CAMERA_SHAKE',
        O: 'ZOOM_OUT',
        P: 'ZOOM_IN',
        U: 'SELECT_MENU',
        // Default 2D Gamepad Controls
        DPAD_UP: 'PLAYER_UP',
        DPAD_DOWN: 'PLAYER_DOWN',
        DPAD_LEFT: 'MOVE_LEFT',
        DPAD_RIGHT: 'MOVE_RIGHT',
        BUTTON_A: 'FIRE_BULLET',
        BUTTON_X: 'FIRE_BULLET',
        BUTTON_B: 'CAMERA_SHAKE',
        BUTTON_Y: 'ZOOM_OUT',
        BUTTON_L1: 'ZOOM_IN',
        BUTTON_SELECT: 'SELECT_MENU'
        // BUTTON_START: 'PAUSE_MENU',
      };

      // Remark: Button / Input cooldown has been removed in favor of input pooling on gametick
      // the new approach is to pool all inputs for a given tick, and send them to the server
      // this implies a button cool down of 1 tick, which is the same as no cooldown
      // Remark: bulletCooldown should be a property of the bullet system, not input system
      // this.bulletCooldown = 1;
      // this.buttonCooldown = 1;
      // this.lastBulletFireTime = {};

      this.useMouseControls = false;

      // check to see if entityInput system exists, if not throw error
      if (!game.systems['entity-input']) {
        throw new Error('DefaultTwoDimensionalInputStrategy requires an entityInput system to be registered! Please game.use(new EntityInput())');
      }
      game.systemsManager.addSystem(this.id, this);
      game.systems['entity-input'].strategies.push(this);
      // take the this.controlMappings and map them to the entityInput system
      game.systems['entity-input'].controlMappings = _objectSpread(_objectSpread({}, game.systems['entity-input'].controlMappings), this.defaultControlsMapping);
    }
  }, {
    key: "detectAndSendControls",
    value: function detectAndSendControls(entityData, ev) {
      if (this.game.useMouseControls !== true) {
        return;
      }
      if (!this.isPressed) {
        return;
      }
      // console.log('pointerDown', entityData, ev);
      var currentPlayer = game.getEntity(game.currentPlayerId);
      if (currentPlayer && game.communicationClient) {
        // Get browser window dimensions
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        // console.log('currentPlayer', currentPlayer.position);
        // console.log("Event", ev);

        // Calculate deltas
        var deltaX = ev.x - windowWidth / 2;
        var deltaY = ev.y - windowHeight / 2;
        // console.log('deltaX', deltaX, 'deltaY', deltaY);

        // Calculate angle in degrees
        var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        // console.log('Angle:', angle);

        // Calculate actions based on the angle
        var actions = [];
        if (angle >= -22.5 && angle < 22.5) {
          actions.push('MOVE_RIGHT');
        } else if (angle >= 22.5 && angle < 67.5) {
          actions.push('MOVE_RIGHT', 'PLAYER_DOWN');
        } else if (angle >= 67.5 && angle < 112.5) {
          actions.push('PLAYER_DOWN');
        } else if (angle >= 112.5 && angle < 157.5) {
          actions.push('MOVE_LEFT', 'PLAYER_DOWN');
        } else if (angle >= 157.5 || angle < -157.5) {
          actions.push('MOVE_LEFT');
        } else if (angle >= -157.5 && angle < -112.5) {
          actions.push('MOVE_LEFT', 'PLAYER_UP');
        } else if (angle >= -112.5 && angle < -67.5) {
          actions.push('PLAYER_UP');
        } else if (angle >= -67.5 && angle < -22.5) {
          actions.push('MOVE_RIGHT', 'PLAYER_UP');
        }
        this.continuousActions = actions;
        this.isPressed = true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      // If the input is pressed, keep applying the continuous actions
      if (this.isPressed) {
        var actions = this.continuousActions;
        this.handleInputs(this.game.currentPlayerId, {
          actions: actions
        });
      }
    }
  }, {
    key: "handleInputs",
    value: function handleInputs(entityId, _ref, sequenceNumber) {
      var _this = this;
      var _ref$controls = _ref.controls,
        controls = _ref$controls === void 0 ? {} : _ref$controls,
        _ref$mouse = _ref.mouse,
        mouse = _ref$mouse === void 0 ? {} : _ref$mouse,
        _ref$actions = _ref.actions,
        actions = _ref$actions === void 0 ? [] : _ref$actions;
      var plugin = this;
      var game = this.game;
      game.lastProcessedInput[entityId] = sequenceNumber;

      // console.log('mmmm', mouse.buttons)
      // Determine if the mouse button is pressed or released
      if (mouse.buttons && mouse.buttons.LEFT === true) {
        this.isPressed = true; // Button is pressed
        if (mouse.event) {
          // Calculate continuous actions based on mouse event
          this.detectAndSendControls(entityId, mouse.event);
        }
      }
      if (mouse.buttons && mouse.buttons.LEFT === false) {
        this.isPressed = false; // Button is released, stop continuous actions
        this.continuousActions = [];
      }

      // add any actions that were passed in to the continuousActions array, if not already present
      actions.forEach(function (action) {
        if (!_this.continuousActions.includes(action)) {
          _this.continuousActions.push(action);
        }
      });
      var moveSpeed = 5;
      var entityMovementSystem = game.getSystem('entity-movement');
      var _mouse$position = mouse.position,
        position = _mouse$position === void 0 ? {
          x: 0,
          y: 0
        } : _mouse$position,
        _mouse$canvasPosition = mouse.canvasPosition,
        canvasPosition = _mouse$canvasPosition === void 0 ? {
          x: 0,
          y: 0
        } : _mouse$canvasPosition,
        _mouse$buttons = mouse.buttons,
        buttons = _mouse$buttons === void 0 ? {
          LEFT: false,
          RIGHT: false,
          MIDDLE: false
        } : _mouse$buttons;
      if (actions.length === 0) {
        // if no actions were manually sent, assume default controls
        actions = Object.keys(controls).filter(function (key) {
          return controls[key];
        }).map(function (key) {
          return game.systems['entity-input'].controlMappings[key];
        });
      } else {
        // actions is already populated, use those actions as continuous action controls
      }
      if (actions.includes('PLAYER_UP')) entityMovementSystem.update(entityId, 0, moveSpeed);
      if (actions.includes('PLAYER_DOWN')) entityMovementSystem.update(entityId, 0, -moveSpeed);
      if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0, -1);
      if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0, 1);
      if (actions.includes('ROTATE_LEFT')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);
      if (actions.includes('ROTATE_RIGHT')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);
      if (actions.includes('ZOOM_IN')) {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom + 0.05);
      }
      if (actions.includes('ZOOM_OUT')) {
        var _currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(_currentZoom - 0.05);
      }
      if (game.systems.bullet) {
        if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
      }
      if (game.systems.sword) {
        if (actions.includes('FIRE_BULLET')) {
          game.getSystem('sword').swingSword(entityId);
        } else {
          game.getSystem('sword').sheathSword(entityId);
        }
      }
      if (actions.includes('SELECT_MENU')) {}

      // camera shake
      if (actions.includes('CAMERA_SHAKE')) {
        game.shakeCamera();
      }

      // barrel roll
      if (actions.includes('BARREL_ROLL')) {
        if (typeof this.game.data.camera.rotation === 'number') {
          game.rotateCamera(360);
          // console.log("this.game.data.camera.rotation", this.game.data.camera.rotation)
        } else {
          // rotate the camera 360 degrees
          game.rotateCamera(360);
        }
      }
    }
  }]);
  return DefaultTwoDimensionalInputStrategy;
}();
_defineProperty(DefaultTwoDimensionalInputStrategy, "id", 'default-2d-input-strategy');
var _default = exports["default"] = DefaultTwoDimensionalInputStrategy;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ThreeDimensionalInputStrategy = /*#__PURE__*/function () {
  function ThreeDimensionalInputStrategy(plugin) {
    _classCallCheck(this, ThreeDimensionalInputStrategy);
    this.plugin = plugin;
    this.id = ThreeDimensionalInputStrategy.id;
  }
  _createClass(ThreeDimensionalInputStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // check to see if entityInput system exists, if not throw error
      if (!game.systems['entity-input']) {
        throw new Error('ThreeDimensionalInputStrategy requires an entityInput system to be registered! Please game.use(new EntityInput())');
      }
      this.defaultControlsMapping = {
        W: 'PLAYER_UP',
        S: 'PLAYER_DOWN',
        A: 'MOVE_LEFT',
        D: 'MOVE_RIGHT',
        SPACE: 'FIRE_BULLET',
        Q: 'MOVE_UP',
        E: 'MOVE_DOWN',
        UP: 'PITCH_UP',
        DOWN: 'PITCH_DOWN',
        LEFT: 'YAW_LEFT',
        RIGHT: 'YAW_RIGHT',
        Z: 'ROLL_LEFT',
        C: 'ROLL_RIGHT'
      };
      game.systems['entity-input'].strategies.push(this);

      // take the this.controlMappings and map them to the entityInput system
      game.systems['entity-input'].controlMappings = _objectSpread(_objectSpread({}, game.systems['entity-input'].controlMappings), this.defaultControlsMapping);
    }
  }, {
    key: "getForwardDirection",
    value: function getForwardDirection(body) {
      var bodyRotation = this.game.physics.getBodyRotation(body); // Assume getBodyRotation is a method in your entityMovement system
      // console.log('initial bodyRotation', bodyRotation.x, bodyRotation.y, bodyRotation.z)
      // Assuming the body faces towards the negative y-axis when pitch, yaw, and roll are 0
      return {
        x: Math.sin(bodyRotation.y) * Math.cos(bodyRotation.x),
        y: -Math.cos(bodyRotation.y) * Math.cos(bodyRotation.x),
        z: Math.sin(bodyRotation.x)
      };
    }
  }, {
    key: "handleInputs",
    value: function handleInputs(entityId, _ref, sequenceNumber) {
      var _ref$controls = _ref.controls,
        controls = _ref$controls === void 0 ? {} : _ref$controls,
        _ref$mouse = _ref.mouse,
        mouse = _ref$mouse === void 0 ? {} : _ref$mouse;
      var plugin = this;
      var game = this.game;
      game.lastProcessedInput[entityId] = sequenceNumber;

      // Define movement speed for each axis and rotation speed
      var moveSpeed = 5;
      var rotateSpeed = 0.022; // Small value since it's typically in radians

      var entityMovementSystem = game.getSystem('entity-movement');
      var actions = Object.keys(controls).filter(function (key) {
        return controls[key];
      }).map(function (key) {
        return plugin.defaultControlsMapping[key];
      });

      // Extract the entity data
      var entityData = game.getEntity(entityId);
      var body = game.bodyMap[entityId];
      if (!entityData || !entityData.position) {
        return;
      }

      // Movement
      //let forwardDirection = this.getForwardDirection(body);
      // console.log('input calc forward facing direction', forwardDirection.x, forwardDirection.y, forwardDirection.z)
      // "forward facing" movements, forwardDirection needed
      // these movements are relative to the forward facing direction of the entity
      /*
      if (actions.includes('PLAYER_UP')) entityMovementSystem.update(entityId, forwardDirection.x * moveSpeed, -forwardDirection.y * moveSpeed, forwardDirection.z * moveSpeed);
      if (actions.includes('PLAYER_DOWN')) entityMovementSystem.update(entityId, forwardDirection.x * moveSpeed, forwardDirection.y * moveSpeed, -forwardDirection.z * moveSpeed);
      if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0, 0);  // Assuming left/right movement is still along the global X axis
      if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0, 0);  // Assuming left/right movement is still along the global X axis
      if (actions.includes('MOVE_UP')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);  // Assuming up/down movement is still along the global Z axis
      if (actions.includes('MOVE_DOWN')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);  // Assuming up/down movement is still along the global Z axis
      */
      // absolute movements, forwardDirection not needed
      if (actions.includes('PLAYER_UP')) entityMovementSystem.update(entityId, 0, -1, 0);
      if (actions.includes('PLAYER_DOWN')) entityMovementSystem.update(entityId, 0, 1, 0);
      if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -1, 0, 0); // Assuming left/right movement is still along the global X axis
      if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, 1, 0, 0); // Assuming left/right movement is still along the global X axis
      if (actions.includes('MOVE_UP')) entityMovementSystem.update(entityId, 0, 0, 1); // Assuming up/down movement is still along the global Z axis
      if (actions.includes('MOVE_DOWN')) entityMovementSystem.update(entityId, 0, 0, -1); // Assuming up/down movement is still along the global Z axis

      // Rotation
      if (actions.includes('PITCH_UP')) entityMovementSystem.rotate(entityId, -rotateSpeed, 0, 0);
      if (actions.includes('PITCH_DOWN')) entityMovementSystem.rotate(entityId, rotateSpeed, 0, 0);
      if (actions.includes('YAW_LEFT')) entityMovementSystem.rotate(entityId, 0, -rotateSpeed, 0);
      if (actions.includes('YAW_RIGHT')) entityMovementSystem.rotate(entityId, 0, rotateSpeed, 0);
      if (actions.includes('ROLL_LEFT')) entityMovementSystem.rotate(entityId, 0, 0, -rotateSpeed);
      if (actions.includes('ROLL_RIGHT')) entityMovementSystem.rotate(entityId, 0, 0, rotateSpeed);

      // Firing mechanic can remain the same as in 2D
      if (game.systems.bullet) {
        if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
      }
    }
  }]);
  return ThreeDimensionalInputStrategy;
}();
_defineProperty(ThreeDimensionalInputStrategy, "id", 'ThreeDimensionalInputStrategy');
var _default = exports["default"] = ThreeDimensionalInputStrategy;

},{}]},{},[2])(2)
});

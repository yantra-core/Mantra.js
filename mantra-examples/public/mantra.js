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
exports["default"] = void 0;
var _ensureColorInt = _interopRequireDefault(require("../plugins/entity/lib/util/ensureColorInt.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // EntityBuilder.js - Marak Squires 2024
var EntityBuilder = exports["default"] = /*#__PURE__*/function () {
  function EntityBuilder(game) {
    _classCallCheck(this, EntityBuilder);
    this.game = game;
    this.config = {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: 0,
      // TODO: x / y z
      size: {
        width: 16,
        height: 16,
        depth: 16
      },
      offset: {
        x: 0,
        y: 0,
        z: 0
      },
      meta: {}
    };
  }

  // Remark: id is not used when creating entities, it's used for building configs
  _createClass(EntityBuilder, [{
    key: "id",
    value: function id(value) {
      this.config.id = value;
      return this;
    }

    // Basic properties
  }, {
    key: "type",
    value: function type(value) {
      this.config.type = value;
      if (value === 'TEXT') {
        // text entities should not have a body by default
        // can be overridden by calling body(true) after type('TEXT')
        this.config.body = false;
      }
      return this;
    }
  }, {
    key: "name",
    value: function name(value) {
      this.config.name = value;
      return this;
    }
  }, {
    key: "kind",
    value: function kind(value) {
      this.config.kind = value;
      return this;
    }
  }, {
    key: "startingPosition",
    value: function startingPosition(x, y) {
      this.config.startingPosition = {
        x: x,
        y: y
      };
      return this;
    }
  }, {
    key: "body",
    value: function body() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.config.body = value;
      return this;
    }
  }, {
    key: "friction",
    value: function friction(value) {
      // friction will default override the other friction values
      this.config.friction = value;
      this.config.frictionStatic = value;
      this.config.frictionAir = value;
      return this;
    }
  }, {
    key: "frictionStatic",
    value: function frictionStatic(value) {
      this.config.frictionStatic = value;
      return this;
    }
  }, {
    key: "frictionAir",
    value: function frictionAir(value) {
      this.config.frictionAir = value;
      return this;
    }
  }, {
    key: "velocity",
    value: function velocity(x, y) {
      this.config.velocity = {
        x: x,
        y: y
      };
      return this;
    }
  }, {
    key: "rotation",
    value: function rotation(value) {
      this.config.rotation = value;
      return this;
    }

    // Physical properties
  }, {
    key: "mass",
    value: function mass(value) {
      this.config.mass = value;
      return this;
    }
  }, {
    key: "density",
    value: function density(value) {
      this.config.density = value;
      return this;
    }

    // Health and scoring
  }, {
    key: "health",
    value: function health(value) {
      this.config.health = value;
      return this;
    }
  }, {
    key: "score",
    value: function score(value) {
      this.config.score = value;
      return this;
    }
  }, {
    key: "lifetime",
    value: function lifetime(value) {
      this.config.lifetime = value;
      return this;
    }

    // Dimensions
  }, {
    key: "size",
    value: function size(width, height, depth) {
      if (typeof height === 'undefined') {
        height = width;
      }
      this.config.size = {
        width: width,
        height: height
      };
      if (typeof depth !== 'undefined') {
        // 2d games may not have a depth, we may want to default to 0
        this.config.size.depth = depth;
      } else {
        this.config.size.depth = height;
      }
      return this;
    }
  }, {
    key: "width",
    value: function width(value) {
      this.config.size.width = value;
      return this;
    }
  }, {
    key: "height",
    value: function height(value) {
      this.config.size.height = value;
      return this;
    }
  }, {
    key: "depth",
    value: function depth(value) {
      this.config.size.depth = value;
      return this;
    }
  }, {
    key: "radius",
    value: function radius(value) {
      this.config.radius = value;
      return this;
    }

    // Styling and appearance
  }, {
    key: "shape",
    value: function shape(value) {
      this.config.shape = value;
      return this;
    }
  }, {
    key: "color",
    value: function color(value) {
      this.config.color = (0, _ensureColorInt["default"])(value); // converts string and hex color to int
      return this;
    }
  }, {
    key: "texture",
    value: function texture(value) {
      this.config.texture = value;
      return this;
    }
  }, {
    key: "style",
    value: function style(value) {
      this.config.style = value;
      return this;
    }

    // Behavior and capabilities
  }, {
    key: "maxSpeed",
    value: function maxSpeed(value) {
      this.config.maxSpeed = value;
      return this;
    }
  }, {
    key: "owner",
    value: function owner(value) {
      this.config.owner = value;
      return this;
    }
  }, {
    key: "hasInventory",
    value: function hasInventory() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.config.hasInventory = value;
      return this;
    }
  }, {
    key: "isSensor",
    value: function isSensor() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.config.isSensor = value;
      return this;
    }
  }, {
    key: "isStatic",
    value: function isStatic() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.config.isStatic = value;
      return this;
    }
  }, {
    key: "_addEventHandler",
    value: function _addEventHandler(eventName, handler) {
      // Check if the event already has a composite function with handlers
      if (typeof this.config[eventName] === 'function' && Array.isArray(this.config[eventName].handlers)) {
        if (typeof handler === 'undefined') {
          throw new Error("Handler for ".concat(eventName, " event is undefined"));
        }
        this.config[eventName].handlers.push(handler); // Add to existing handlers
      } else {
        if (typeof handler === 'boolean') {
          this.config[eventName] = handler;
        }
        if (typeof handler === 'function') {
          // Otherwise, create a new composite function and handlers array
          var handlers = [handler];
          this.config[eventName] = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            try {
              handlers.forEach(function (h) {
                if (typeof h === 'function') {
                  h.apply(void 0, args);
                } else {
                  console.warn("handler is not a function", h, args);
                }
              }); // Execute all handlers
            } catch (err) {
              console.error("Error in event handler for ".concat(eventName, ":"), err);
            }
          };
          this.config[eventName].handlers = handlers; // Store handlers
        }
      }

      return this;
    }

    //
    // Public methods to add specific event handlers
    //
    // Pointer events
  }, {
    key: "pointerdown",
    value: function pointerdown(handler) {
      return this._addEventHandler('pointerdown', handler);
    }
  }, {
    key: "pointerup",
    value: function pointerup(handler) {
      return this._addEventHandler('pointerup', handler);
    }
  }, {
    key: "pointermove",
    value: function pointermove(handler) {
      return this._addEventHandler('pointermove', handler);
    }
  }, {
    key: "pointerover",
    value: function pointerover(handler) {
      return this._addEventHandler('pointerover', handler);
    }
  }, {
    key: "pointerout",
    value: function pointerout(handler) {
      return this._addEventHandler('pointerout', handler);
    }
  }, {
    key: "pointerenter",
    value: function pointerenter(handler) {
      return this._addEventHandler('pointerenter', handler);
    }
  }, {
    key: "pointerleave",
    value: function pointerleave(handler) {
      return this._addEventHandler('pointerleave', handler);
    }

    // Collision events
  }, {
    key: "collisionStart",
    value: function collisionStart(handler) {
      return this._addEventHandler('collisionStart', handler);
    }
  }, {
    key: "collisionActive",
    value: function collisionActive(handler) {
      return this._addEventHandler('collisionActive', handler);
    }
  }, {
    key: "collisionEnd",
    value: function collisionEnd(handler) {
      return this._addEventHandler('collisionEnd', handler);
    }

    // Lifecycle events
  }, {
    key: "onDrop",
    value: function onDrop(handler) {
      return this._addEventHandler('onDrop', handler);
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(handler) {
      return this._addEventHandler('update', handler);
    }
  }, {
    key: "afterItemCollected",
    value: function afterItemCollected(handler) {
      return this._addEventHandler('afterItemCollected', handler);
    }
  }, {
    key: "afterRemoveEntity",
    value: function afterRemoveEntity(handler) {
      return this._addEventHandler('afterRemoveEntity', handler);
    }
  }, {
    key: "afterCreateEntity",
    value: function afterCreateEntity(handler) {
      return this._addEventHandler('afterCreateEntity', handler);
    }
  }, {
    key: "sutra",
    value: function sutra(rules, config) {
      // TODO: This will overwrite Sutras as chain progresses left-to-right,
      // leaving only the last Sutra as active
      // TODO: merge rules existing sutra based on config ( default true )
      this.config.sutra = {
        rules: rules,
        config: config
      };
      return this;
    }

    // TODO: better name for "exit" semantics
  }, {
    key: "exit",
    value: function exit(handler) {
      this.config.exit = handler;
      return this;
    }

    // Entity Flags - make this it's own system
  }, {
    key: "collectable",
    value: function collectable() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.config.collectable = value;
      return this;
    }

    // Meta and Data
  }, {
    key: "meta",
    value: function meta(value) {
      if (_typeof(value) === 'object' && value !== null) {
        if (_typeof(this.config.meta) === 'object' && this.config.meta !== null) {
          console.log("MERGING THE IDEA", value);
          this.config.meta = _objectSpread(_objectSpread({}, this.config.meta), value);
        } else {
          this.config.meta = value;
        }
      }
      return this;
    }
  }, {
    key: "text",
    value: function text(value) {
      this.config.text = value;
      return this;
    }

    // Positioning and movement
  }, {
    key: "position",
    value: function position(x, y, z) {
      this.config.position = {
        x: x,
        y: y
      };
      if (typeof z === 'number') {
        this.config.position.z = z;
      }
      return this;
    }

    // Sugar syntax for x,y,z positioning
  }, {
    key: "x",
    value: function x(value) {
      this.config.position.x = value;
      return this;
    }
  }, {
    key: "y",
    value: function y(value) {
      this.config.position.y = value;
      return this;
    }
  }, {
    key: "z",
    value: function z(value) {
      this.config.position.z = value;
      return this;
    }
  }, {
    key: "container",
    value: function container(value) {
      this.config.container = value;
      return this;
    }
  }, {
    key: "offset",
    value: function offset(x, y, z) {
      if (_typeof(this.config.offset) !== 'object' || this.config.offset === null) {
        this.config.offset = {};
      }
      if (typeof x === 'number') {
        this.config.offset.x = x;
      }
      if (typeof y === 'number') {
        this.config.offset.y = y;
      }
      if (typeof z === 'number') {
        this.config.offset.z = z;
      }
      return this;
    }

    // Finalization
  }, {
    key: "build",
    value: function build() {
      // Return a deep copy to prevent further modifications
      return this.config;
    }

    // Creates *exact* copies of the entity with the specified configuration
  }, {
    key: "clone",
    value: function clone(count) {
      this.config.clone = count;
      return this;
    }

    // Creates a copy of the entity with the specified configuration, but will apply
    // all "repeaters" with index and count arguments, allowing for dynamic modifications
    // separately, the offset.x and offset.y will add to the position
  }, {
    key: "repeat",
    value: function repeat(count) {
      this.config.repeat = count;
      return this;
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      if (typeof this.config.clone === 'number') {
        var entities = [];
        for (var i = 0; i < this.config.clone; i++) {
          var clonedConfig = _objectSpread({}, this.config); // Shallow copy for non-function properties
          entities.push(this.game.createEntity(clonedConfig));
        }
        return entities;
      } else if (typeof this.config.repeat === 'number') {
        var _entities = [];
        for (var _i = 0; _i < this.config.repeat; _i++) {
          var entityConfig = _objectSpread({}, this.config); // Shallow copy for non-function properties
          // Calculate the offset for each repeated entity
          var offsetX = entityConfig.position.x + _i * entityConfig.offset.x;
          var offsetY = entityConfig.position.y + _i * entityConfig.offset.y;
          var offsetZ = entityConfig.position.z + _i * entityConfig.offset.z;
          if (typeof offsetX === 'number' && typeof offsetY === 'number') {
            entityConfig.position = {
              x: offsetX,
              y: offsetY,
              z: entityConfig.position.z
            };
          }
          if (typeof offsetZ === 'number' && !isNaN(offsetZ)) {
            entityConfig.position.z = offsetZ;
          }
          if (_typeof(this.repeatModifiers) === 'object' && this.repeatModifiers !== null) {
            for (var _i2 = 0, _Object$entries = Object.entries(this.repeatModifiers); _i2 < _Object$entries.length; _i2++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
                prop = _Object$entries$_i[0],
                modifier = _Object$entries$_i[1];
              if (typeof modifier === 'function') {
                entityConfig[prop] = modifier(_i, this.config.repeat, entityConfig[prop]);
              }
            }
          }
          // Remove repeat-related properties to avoid infinite recursion and irrelevant data
          delete entityConfig.repeat;
          delete entityConfig.repeatModifiers;
          _entities.push(this.game.createEntity(entityConfig));
        }
        return _entities;
      } else {
        var singleConfig = _objectSpread({}, this.config); // Shallow copy for non-function properties
        return this.game.createEntity(singleConfig);
      }
    }
  }, {
    key: "repeaters",
    value: function repeaters(modifiers) {
      this.repeatModifiers = modifiers;
      return this;
    }
  }, {
    key: "mix",
    value: function mix(mixinConfig) {
      var _this = this;
      var _loop = function _loop(key) {
        var value = mixinConfig[key];
        if (typeof value === 'function') {
          // Check if a composite function already exists for this key
          if (typeof _this.config[key] !== 'function') {
            // Define the composite function
            _this.config[key] = function () {
              for (var _len2 = arguments.length, handlerArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                handlerArgs[_key2] = arguments[_key2];
              }
              _this.config[key].handlers.forEach(function (handler) {
                return handler.apply(void 0, handlerArgs);
              });
            };
            // Initialize with an empty handlers array
            _this.config[key].handlers = [];
          }
          // Add the new handler to the composite function's handlers array
          // TODO: this may not work as intended? add more entity mixin tests
          _this.config[key].handlers.push(value);
        } else if (_typeof(value) === 'object' && _this.config[key] && _typeof(_this.config[key]) === 'object') {
          // For object types, merge the objects
          _this.config[key] = _objectSpread(_objectSpread({}, _this.config[key]), value);
        } else {
          // For color types, blend the colors
          if (key === 'color') {
            if (_this.config[key] !== undefined) {
              var existingColor = (0, _ensureColorInt["default"])(_this.config[key]);
              var newColor = (0, _ensureColorInt["default"])(value);
              value = blendColors(existingColor, newColor);
            }
          }
          // TODO we can add a merge / mix strategy for other types
          // For position we could average, hi-low, etc
          // For primitive types or new keys, simply overwrite/set the value
          _this.config[key] = value;
        }
      };
      for (var key in mixinConfig) {
        _loop(key);
      }
      return this; // Enable chaining
    }
  }]);
  return EntityBuilder;
}(); // Function to blend two colors
function blendColors(color1, color2) {
  var r = (color1 >> 16) + (color2 >> 16) >> 1;
  var g = (color1 >> 8 & 0xFF) + (color2 >> 8 & 0xFF) >> 1;
  var b = (color1 & 0xFF) + (color2 & 0xFF) >> 1;
  return r << 16 | g << 8 | b;
}

/* TODO: refactor to store Map() of OG references for granular removals / updates

// Initialize a map to keep track of original handlers for each composite function
const originalHandlersMap = new Map();

_addEventHandler(eventName, handler) {
    // Check if the event already has a composite function with handlers
    if (typeof this.config[eventName] === 'function' && Array.isArray(this.config[eventName].handlers)) {
        if (typeof handler === 'undefined') {
            throw new Error(`Handler for ${eventName} event is undefined`);
        }
        this.config[eventName].handlers.push(handler); // Add to existing handlers
        // Update the map with the new set of handlers for the composite function
        originalHandlersMap.set(this.config[eventName], this.config[eventName].handlers.slice());
    } else {
        if (typeof handler === 'boolean') {
            this.config[eventName] = handler;
        }
        if (typeof handler === 'function') {
            // Otherwise, create a new composite function and handlers array
            const handlers = [handler];
            const compositeFunction = (...args) => {
                try {
                    handlers.forEach(function(h) {
                        if (typeof h === 'function') {
                            h(...args);
                        } else {
                            console.warn("handler is not a function", h, args);
                        }
                    }); // Execute all handlers
                } catch (err) {
                    console.error(`Error in event handler for ${eventName}:`, err);
                }
            };
            this.config[eventName] = compositeFunction;
            this.config[eventName].handlers = handlers; // Store handlers

            // Map the composite function to its original handlers
            originalHandlersMap.set(compositeFunction, handlers);
        }
    }

    return this;
}


_removeEventHandler(eventName, handler) {
    // Check if the event for the given name exists and has handlers
    if (typeof this.config[eventName] === 'function' && Array.isArray(this.config[eventName].handlers)) {
        // Retrieve the composite function for the eventName
        const compositeFunction = this.config[eventName];

        // Retrieve the original handlers from the map using the composite function
        const originalHandlers = originalHandlersMap.get(compositeFunction);

        if (originalHandlers) {
            // Find the index of the handler to be removed
            const index = originalHandlers.findIndex(h => h === handler);

            // If the handler is found, remove it from the array of original handlers
            if (index !== -1) {
                originalHandlers.splice(index, 1);

                // Update the handlers array in the config to reflect the removal
                this.config[eventName].handlers = originalHandlers.slice();

                // Update the map to reflect the new set of handlers
                originalHandlersMap.set(compositeFunction, this.config[eventName].handlers);

                // If after removal, there are no handlers left, consider cleaning up
                if (originalHandlers.length === 0) {
                    // Remove the composite function and clean up the map
                    delete this.config[eventName];
                    originalHandlersMap.delete(compositeFunction);
                }
            }
        }
    }
}

*/

},{"../plugins/entity/lib/util/ensureColorInt.js":26}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var _Component = _interopRequireDefault(require("./Component/Component.js"));
var _construct = _interopRequireDefault(require("./lib/Game/construct.js"));
var _use = _interopRequireDefault(require("./lib/Game/use.js"));
var _unload = _interopRequireDefault(require("./lib/Game/unload.js"));
var _start = _interopRequireDefault(require("./lib/Game/start.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023
// The Game class is the main entry point for Mantra games
var Game = exports.Game = /*#__PURE__*/function () {
  function Game() {
    var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Game);
    // Default configuration
    var defaultConfig = {
      // game modes
      isClient: true,
      isEdgeClient: false,
      isServer: false,
      isOfflineMode: undefined,
      plugins: [],
      // array of plugins as string, instance, or string with config object
      // game options
      showLoadingScreen: true,
      minLoadTime: 330,
      // minimum time to show loading screen
      loadDefaultPlugins: true,
      // auto-loads default plugins based on pluginsConfig
      width: 800,
      height: 600,
      fieldOfView: 1600,
      fps: 60,
      useFoV: false,
      // game systems / auto-load based on pluginsConfig
      physics: 'matter',
      graphics: ['css'],
      collisions: true,
      camera: {},
      gravity: {},
      keyboard: true,
      mouse: true,
      gamepad: false,
      virtualGamepad: false,
      editor: true,
      sutra: true,
      lifetime: false,
      defaultMovement: false,
      // data compression
      protobuf: false,
      msgpack: false,
      deltaCompression: false,
      deltaEncoding: true,
      // createDefaultPlayer: false,
      defaultPlayer: false,
      gameRoot: 'https://yantra.gg/mantra',
      scriptRoot: null,
      // scripts, plugins, .js files, will inherit from gameRoot if not set
      assetRoot: null,
      // images, models, sounds, sprites, will inherit from gameRoot if not set
      options: {},
      mode: 'topdown',
      // default entity input and movement mode defined as Sutras
      multiplexGraphicsHorizontally: false,
      // default behavior is multiple graphics plugins will be horizontally stacked
      addLifecycleHooksToAllPlugins: true // default behavior is to add lifecycle hooks to all plugin methods
    };

    defaultConfig.gameRoot = 'http://192.168.1.80:7777';

    // Merge custom configuration with defaults
    var config = _objectSpread(_objectSpread({}, defaultConfig), customConfig);
    // Override for server-specific defaults
    if (config.isServer) {
      config.showLoadingScreen = false;
      config.isClient = false;
    }

    // Assigning the final configuration to this.config
    this.config = config;

    // Game.use('PluginName') is a helper function for loading plugins
    // must be defined before construct() is called
    this.use = (0, _use["default"])(this, config.plugins);
    this.unload = (0, _unload["default"])(this, config.plugins);

    // Additional construction logic
    (0, _construct["default"])(this, config.plugins);

    // Plugin handling
    this.start = _start["default"].bind(this);
  }
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
      this.systemsManager.render();
    }

    //
    // Component APIs
    //
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
      if (data == null) {
        return;
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

    //
    // System APIs
    //
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

    //
    // Plugin APIs
    //
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
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
    }

    //
    // Player specific APIs
    //
  }, {
    key: "setPlayerId",
    value: function setPlayerId(playerId) {
      console.log('setting playerID', playerId);
      this.currentPlayerId = playerId;
    }
  }, {
    key: "getCurrentPlayer",
    value: function getCurrentPlayer() {
      return this.getEntity(this.currentPlayerId);
    }

    // TODO: doesn't need to be player, can be ent
    // rename: getEntityFieldOfView
  }, {
    key: "getPlayerFieldOfView",
    value: function getPlayerFieldOfView(entId) {
      var distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var mergeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var ent;
      if (_typeof(entId) === 'object') {
        ent = entId;
      } else {
        ent = this.getEntity(entId);
      }
      if (!ent) {
        console.log('Warning: no entity found for entId', entId);
        return [];
      }
      var centerPosition = ent.position;
      var query = {
        minX: centerPosition.x - distance,
        minY: centerPosition.y - distance,
        maxX: centerPosition.x + distance,
        maxY: centerPosition.y + distance
      };
      if (this.systems.rbush) {
        return this.systems.rbush.search(query, mergeData);
      } else {
        console.log('Warning: no rbush system found, cannot perform getPlayerFieldOfView query');
      }
    }

    //
    // Containers
    //
  }, {
    key: "createContainer",
    value: function createContainer(entityData) {
      // helper method for containers
      entityData.type = 'CONTAINER';
      entityData.style = entityData.style || {};
      entityData.style.layout = entityData.layout || 'none';
      entityData.style.grid = entityData.grid || {};
      entityData.items = entityData.items || [];
      return this.createEntity(entityData);
    }

    //
    // Audio / Multimedia APIs
    //
  }, {
    key: "playNote",
    value: function playNote(note, duration) {
      console.log('Tone Plugin not loaded. Cannot play tone note.');
    }

    //
    // Physics Engine APIs
    //
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
    key: "applyGravity",
    value: function applyGravity(entA, entB, gravity) {
      var repulsion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.systems.physics.applyGravity(entA, entB, gravity, repulsion);
    }
  }, {
    key: "setPosition",
    value: function setPosition(entityId, position) {
      this.physics.setPosition(entityId, position);
    }
  }, {
    key: "applyForce",
    value: function applyForce(entityId, force) {
      // const body = this.bodyMap[entityId];
      this.physics.applyForce(entityId, force);
      // this.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
    }
  }, {
    key: "applyPosition",
    value: function applyPosition(entityId, position) {
      // const body = this.bodyMap[entityId];
      // takes the current position and adds the new position
      var newPosition = {
        x: body.position.x + position.x,
        y: body.position.y + position.y
      };
      this.physics.setPosition(entityId, newPosition);
    }
  }, {
    key: "rotate",
    value: function rotate(entityId, rotation) {
      var rotationSpeed = 0.022; // TODO: config
      var rotationAmount = rotation * rotationSpeed;
      // const body = this.bodyMap[entityId];
      this.physics.rotateBody(entityId, rotationAmount);
    }

    //
    // Camera APIs
    //
  }, {
    key: "rotateCamera",
    value: function rotateCamera(angle) {
      // not implemented directly, Graphics plugin will hoist this
    }
  }, {
    key: "setZoom",
    value: function setZoom() {// TODO: remove setZoom, use delegation to camera.zoom() instead of hoisting
      // not implemented directly, Graphics plugin will hoist this
    }
  }, {
    key: "setCameraMode",
    value: function setCameraMode(mode) {
      this.data.camera.mode = mode;
    }
  }, {
    key: "setCameraPosition",
    value: function setCameraPosition(x, y) {
      // Remark: We can we not just set the camera position directly?
      // game.data.camera.position.x = x;
      // game.data.camera.position.y = y;
      game.data.camera.offsetX = x;
      game.data.camera.offsetY = y;
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
          graphicsInterface.shakeCamera(intensity, duration);
        }
      });
    }
  }, {
    key: "isTouchDevice",
    value: function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    //
    // Asset and Styling APIs
    //
  }, {
    key: "addAsset",
    value: function addAsset(url, type, key, options) {
      // game::ready event / game.start(cb) will wait for all assets to be loaded
      if (this.preloader) {
        this.preloader.addAsset(url, type, key, options);
      } else {
        this.queuedAssets[key] = path;
      }
    }
  }, {
    key: "addAssets",
    value: function addAssets(assets) {
      for (var a in assets) {
        var asset = assets[a];
        this.addAsset(asset.url, asset.type, a, asset);
      }
    }
  }, {
    key: "setBackground",
    value: function setBackground(color) {
      // not implemented directly, Graphics plugin will handle this
    }
  }, {
    key: "randomColor",
    value: function randomColor() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'int';
      var color;

      // first generate color as int
      color = Math.floor(Math.random() * 16777215);
      if (format === 'int') {
        return color;
      }

      // if not int, probably hex
      color = '#' + color.toString(16);
      return color;
    }
  }, {
    key: "randomForce",
    value: function randomForce() {
      var maxSpeed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // Generate a random angle in radians
      var angle = Math.random() * 2 * Math.PI; // TODO: use game.seed, game.random instead of Math.random
      // Generate a random speed up to maxSpeed
      var speed = Math.random() * maxSpeed;
      // Convert polar coordinates (angle, speed) to cartesian coordinates (x, y)
      var force = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      };
      return force;
    }
  }, {
    key: "randomPositionSquare",
    value: function randomPositionSquare(centerX, centerY, distance) {
      var x = centerX + Math.random() * 2 * distance - distance; // Random x within distance from centerX
      var y = centerY + Math.random() * 2 * distance - distance; // Random y within distance from centerY
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "radialSpread",
    value: function radialSpread(centerX, centerY, distance, count, index) {
      var angle = index / count * 2 * Math.PI; // Evenly spaced angle
      var x = centerX + distance * Math.cos(angle); // Convert polar to Cartesian coordinates
      var y = centerY + distance * Math.sin(angle);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "randomPositionRadial",
    value: function randomPositionRadial(centerX, centerY, distance, count) {
      var angle = Math.random() * 2 * Math.PI; // Random angle
      var radius = Math.random() * distance; // Random radius within distance
      var x = centerX + radius * Math.cos(angle); // Convert polar to Cartesian coordinates
      var y = centerY + radius * Math.sin(angle);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "exists",
    value: function exists(entityId) {
      if (this.data && this.data.ents && this.data.ents._) {
        var ent = this.data.ents._[entityId];
        if (ent) {
          return true;
        }
        return false;
      }
      return false;
    }

    //
    // Text
    //
  }, {
    key: "createText",
    value: function createText(entityData) {
      entityData.type = 'TEXT';
      entityData.body = false;
      return this.createEntity(entityData);
    }

    // TODO: replace with EntityBuilder API
  }, {
    key: "createBorder",
    value: function createBorder() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? this.width : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? this.height : _ref$height,
        _ref$thickness = _ref.thickness,
        thickness = _ref$thickness === void 0 ? 8 : _ref$thickness,
        color = _ref.color,
        collisionStart = _ref.collisionStart;
      var game = this;
      if (game.systems.border) {
        game.systems.border.createBorder({
          width: game.width,
          height: game.height,
          thickness: thickness,
          collisionStart: collisionStart
        });
      } else {
        game.use('Border', {}, function () {
          game.systems.border.createBorder({
            width: game.width,
            height: game.height,
            thickness: thickness,
            collisionStart: collisionStart
          });
        });
      }
    }

    //
    // Time APIs / ChronoControl
    //
  }, {
    key: "stop",
    value: function stop() {
      var client = this.getSystem('client');
      client.stop();
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.systems['chrono-control']) {
        this.systems['chrono-control'].pause();
      }
    }
  }, {
    key: "rewind",
    value: function rewind(ticks) {
      if (this.systems['chrono-control']) {
        this.systems['chrono-control'].rewind(ticks);
      }
    }
  }, {
    key: "reset",
    value: function reset(mode) {
      var clearSutra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var game = this;

      // reset all Sutra rules
      if (clearSutra) {
        this.rules = this.createSutra();
      }

      // remap the keyboard mappings to Sutra by default
      if (this.systems.sutra) {
        this.systems.sutra.bindInputsToSutraConditions();
      }

      // clear any events that were bound to the game from World
      for (var listener in game.listeners) {
        // Remove any event that doesn't contain '::'
        // TODO: we may want to make this more specific, bound to scenes or systems
        if (listener.indexOf('::') === -1) {
          // game.off(listener, game.listeners[listener]);
          delete game.listeners[listener];
        }
      }

      // reset the Field of View use to default ( off )
      this.config.useFoV = false;

      // reset the default player controls
      this.setControls({});
      this.setCameraMode('follow');

      // set the default movement sutra
      if (this.systems.sutra) {
        this.systems.sutra.bindDefaultMovementSutra(mode);
      }

      // reset any deffered entities
      this.deferredEntities = {};

      // reset the camera offsets ( in case user has dragged or scrolled camera )
      game.viewportCenterOffsetX = 0; // TODO: scope these onto game.data.camera.viewPortOffset
      game.viewportCenterOffsetY = 0;

      // defaults camera back to 1x zoom
      game.zoom(1);
    }

    //
    // Sutra Behavior Tree APIs
    //
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
    key: "setActions",
    value: function setActions(actions) {
      var game = this;
      var actionNames = Object.keys(actions);
      actionNames.forEach(function (actionName) {
        var action = actions[actionName];
        game.rules.on(actionName, action);
      });
    }

    //
    // Networking APIs
    //
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
  }, {
    key: "awaitAllPlugins",
    value: function () {
      var _awaitAllPlugins = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.all(Object.values(this.loadingPluginPromises));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function awaitAllPlugins() {
        return _awaitAllPlugins.apply(this, arguments);
      }
      return awaitAllPlugins;
    }()
  }]);
  return Game;
}();

},{"./Component/Component.js":2,"./lib/Game/construct.js":11,"./lib/Game/start.js":12,"./lib/Game/unload.js":13,"./lib/Game/use.js":14}],6:[function(require,module,exports){
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
      var _this = this;
      if (this.systems.has(systemId)) {
        // throw new Error(`System with name ${systemId} already exists!`);
        console.log("Loading ".concat(systemId, " from memory..."));
        return;
      }

      /*
          All Plugins are event emitters feature ( DISABLED )
          // Remark: Defaulting all Plugins to event emitters is disabled for now by default
          // This is disabled for performance reasons, some of these methods are high frequency
          // and there is wildcard search logic enabled by default? It's a bit much on performance for all enabled
          // In the future we can add a config option per Plugin and per Plugin method to enable/disable this
          // This will enable all plugin methods as emitted events
           // eventEmitter.bindClass(system, systemId)
       */

      // All Plugins have Lifecycle Hooks feature ( ENABLED DEFAULT )
      // Remark: See: ./Game/Lifecyle.js for Mantra Lifecycle Hooks
      // register the system methods as Lifecycle hooks
      if (this.game.config.addLifecycleHooksToAllPlugins) {
        var allProps = Object.getOwnPropertyNames(Object.getPrototypeOf(system));
        var _iterator = _createForOfIteratorHelper(allProps),
          _step;
        try {
          var _loop = function _loop() {
            var propName = _step.value;
            var originalMethod = system[propName];
            if (typeof originalMethod === 'function' && propName === 'fireBullet') {
              // Found the method
              // console.log(`Method ${propName} found.`);

              // Initialize hooks if they don't already exist
              _this.game.lifecycle.hooks["before.".concat(systemId, ".").concat(propName)] = _this.game.lifecycle.hooks["before.".concat(systemId, ".").concat(propName)] || [];
              _this.game.lifecycle.hooks["after.".concat(systemId, ".").concat(propName)] = _this.game.lifecycle.hooks["after.".concat(systemId, ".").concat(propName)] || [];

              // Wrap the original method in a function that includes the lifecycle hooks
              system[propName] = function () {
                var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                // Trigger the 'before' hook with up to three arguments
                this.game.lifecycle.triggerHook("before.".concat(systemId, ".").concat(propName), arg1, arg2, arg3);

                // Call the original method with up to three arguments
                var result = originalMethod.call(this, arg1, arg2, arg3);

                // Trigger the 'after' hook with up to three arguments
                this.game.lifecycle.triggerHook("after.".concat(systemId, ".").concat(propName), arg1, arg2, arg3);

                // Return the original method's result
                return result;
              }.bind(system); // Ensure 'this' within the wrapped function refers to the system object
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
      }

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
      var _iterator2 = _createForOfIteratorHelper(this.systems),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            _ = _step2$value[0],
            system = _step2$value[1];
          if (typeof system.update === "function") {
            // check to see if the game is paused, if not, skip updates for systems without flag
            if (this.game.paused) {
              continue;
            }
            system.update(deltaTime);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    // Remark: Render control is being handled by graphics and each adapter
    // TODO: Add test coverage and formalize rendering through this method, it is required for helpers developers customizerendering
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
  }]);
  return SystemsManager;
}();
var _default = exports["default"] = SystemsManager;

},{"../lib/eventEmitter.js":16}],7:[function(require,module,exports){
"use strict";

var MANTRA = {};
MANTRA.Game = require('./Game.js').Game;
MANTRA.plugins = {}; // empty plugin scope, may be populated by using plugins
module.exports = MANTRA;

},{"./Game.js":5}],8:[function(require,module,exports){
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
// Lifecycle.js - Marak Squires 2024
var Lifecycle = exports["default"] = /*#__PURE__*/function () {
  function Lifecycle() {
    _classCallCheck(this, Lifecycle);
    this.hooks = {
      // TODO: all all lifecycle events
      'before.update': [],
      'after.update': [],
      //beforeRender: [],
      //afterRender: [],
      //beforeRenderEntity: [],
      //afterRenderEntity: [],
      'before.createEntity': [],
      'after.createEntity': [],
      'before.removeEntity': [],
      'after.removeEntity': [],
      'before.updateEntity': [],
      'after.updateEntity': [],
      'before.handleInput': [],
      'after.handleInput': [],
      'before.cleanupRemovedEntities': [],
      'after.cleanupRemovedEntities': [],
      'before.collisionStart': [],
      'before.collisionActive': [],
      'before.collisionEnd': [],
      'after.collisionStart': [],
      'after.collisionActive': [],
      'after.collisionEnd': []
      // Add more lifecycle events as needed
    };
  }
  _createClass(Lifecycle, [{
    key: "clearAllHooks",
    value: function clearAllHooks() {
      // go through all hooks and clear them
      for (var hookName in this.hooks) {
        this.hooks[hookName] = [];
      }
    }

    // Method to add a custom hook
  }, {
    key: "addHook",
    value: function addHook(hookName, callback) {
      if (this.hooks[hookName]) {
        this.hooks[hookName].push(callback);
      } else {
        console.warn("Hook '".concat(hookName, "' does not exist."));
      }
    }
  }, {
    key: "before",
    value: function before(hookName, callback) {
      this.addHook("before.".concat(hookName), callback);
    }
  }, {
    key: "after",
    value: function after(hookName, callback) {
      this.addHook("after.".concat(hookName), callback);
    }

    // Remark: `triggerHook` has been optimized for performance, please avoid refactoring without benchmarking
    // Method to trigger all callbacks associated with a hook
  }, {
    key: "triggerHook",
    value: function triggerHook(hookName, data, arg2, arg3) {
      var hooks = this.hooks[hookName];
      if (!hooks) {
        // `hooks` references object exists or Array.length, 0 returns false
        // console.warn(`Hook '${hookName}' does not exist.`);
        return data; // Return the initial data if no hooks exist
      }

      var result = data; // Initialize result with the data being processed

      // Optimized for single element array
      if (hooks.length === 1) {
        // Returns a single result from single array, allowing the hook to modify and return the data
        return hooks[0](result, arg2, arg3);
      }

      // Arrays with more than 1 element
      for (var i = 0; i < hooks.length; i++) {
        // Pass the result of the previous hook (or the initial data for the first hook) to the next hook
        result = hooks[i](result, arg2, arg3);
      }
      return result; // Return the final result after all hooks have been processed
    }
  }]);
  return Lifecycle;
}();

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _FBXLoader = _interopRequireDefault(require("./Preloader/FBXLoader.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Preloader = exports["default"] = /*#__PURE__*/function () {
  function Preloader(game) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$assets = _ref.assets,
      assets = _ref$assets === void 0 ? [] : _ref$assets;
    _classCallCheck(this, Preloader);
    this.assets = assets;
    this.totalAssetsSize = 0;
    this.loadedAssetsSize = 0;
    this.root = game.assetRoot;
    this.game = game;
    this.loaders = {};
  }
  _createClass(Preloader, [{
    key: "getItem",
    value: function getItem(key) {
      return this.assets.find(function (asset) {
        return asset.key === key;
      });
    }
  }, {
    key: "addAsset",
    value: function addAsset(url, type, key) {
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      this.assets.push({
        url: url,
        type: type,
        key: key,
        size: 0,
        frameWidth: data.frameWidth,
        frameHeight: data.frameHeight,
        frameTags: data.frameTags
      });
    }
  }, {
    key: "loadAll",
    value: function () {
      var _loadAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;
        var game, loadPromises;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              game = this.game;
              loadPromises = this.assets.map(function (asset) {
                return _this.loadAsset(asset);
              });
              _context.next = 4;
              return Promise.all(loadPromises);
            case 4:
              game.emit('preloader::loaded');
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadAll() {
        return _loadAll.apply(this, arguments);
      }
      return loadAll;
    }()
  }, {
    key: "createLoader",
    value: function createLoader(name, handler) {
      this.loaders[name] = handler;
    }
  }, {
    key: "loadAsset",
    value: function () {
      var _loadAsset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(asset) {
        var model;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = asset.type;
              _context2.next = _context2.t0 === 'image' ? 3 : _context2.t0 === 'spritesheet' ? 7 : _context2.t0 === 'model-fbx' ? 11 : 17;
              break;
            case 3:
              _context2.next = 5;
              return this.loadImage(asset);
            case 5:
              asset.loaded = true;
              return _context2.abrupt("break", 19);
            case 7:
              _context2.next = 9;
              return this.loadImage(asset);
            case 9:
              asset.loaded = true;
              return _context2.abrupt("break", 19);
            case 11:
              _context2.next = 13;
              return this.loadModel(asset);
            case 13:
              model = _context2.sent;
              asset.loaded = true;
              asset.loadedModel = model;
              return _context2.abrupt("break", 19);
            case 17:
              throw new Error('Unknown asset type: ' + asset.type);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function loadAsset(_x) {
        return _loadAsset.apply(this, arguments);
      }
      return loadAsset;
    }()
  }, {
    key: "loadModel",
    value: function () {
      var _loadModel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(asset) {
        var model;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // assume three fbx ( for now )
              model = (0, _FBXLoader["default"])(asset, this.root);
              return _context3.abrupt("return", model);
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function loadModel(_x2) {
        return _loadModel.apply(this, arguments);
      }
      return loadModel;
    }()
  }, {
    key: "loadImage",
    value: function () {
      var _loadImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(asset) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.game.isServer) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return");
            case 2:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                var img = new Image();
                img.style.display = 'none'; // Hide the image
                img.onload = function () {
                  document.body.appendChild(img); // Append to the DOM to ensure loading
                  resolve();
                };
                img.onerror = function () {
                  reject("Failed to load image: ".concat(asset.url));
                };
                // only append root if asset.url is not an absolute url
                /* TODO: better handling of absolute urls
                if (!asset.url.includes('http')) {
                  img.src = this.root + asset.url;
                } else {
                  img.src = asset.url;
                }*/
                img.src = _this2.root + asset.url;
              }));
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function loadImage(_x3) {
        return _loadImage.apply(this, arguments);
      }
      return loadImage;
    }()
  }, {
    key: "updateProgress",
    value: function updateProgress(loadedSize, totalSize) {
      this.loadedAssetsSize += loadedSize;
      var progress = this.loadedAssetsSize / this.totalAssetsSize;
      game.emit('progress', progress);
    }
  }]);
  return Preloader;
}();

},{"./Preloader/FBXLoader.js":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loader;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Remark: Won't build with current tools
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
function loader(_x, _x2) {
  return _loader.apply(this, arguments);
}
function _loader() {
  _loader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(asset, root) {
    var modelUrl, fbxLoader, loadedModel;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("incoming asset", root, asset);
          // Ensure asset.url or a similar property holds the path to your FBX file
          modelUrl = root + asset.url; // Assuming 'url' is the property holding the path to the FBX file
          console.log("modelUrl", modelUrl);
          fbxLoader = new FBXLoader(); // TODO: handle animation and texture load
          console.log("Loading model...", modelUrl);
          _context.prev = 5;
          _context.next = 8;
          return new Promise(function (resolve, reject) {
            console.log('loading resource', modelUrl);
            fbxLoader.load(modelUrl,
            // Use the URL or path from the asset object
            function (object) {
              // OnLoad callback
              resolve(object);
            }, function (xhr) {
              // OnProgress callback
              console.log("Model load progress: ".concat(xhr.loaded / xhr.total * 100, "%"));
            }, function (error) {
              // OnError callback
              console.error('An error happened during the loading of the model');
              reject(error);
            });
          });
        case 8:
          loadedModel = _context.sent;
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          console.log('Error loading model', _context.t0);
          throw _context.t0;
        case 15:
          return _context.abrupt("return", loadedModel);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 11]]);
  }));
  return _loader.apply(this, arguments);
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = construct;
var _Component = _interopRequireDefault(require("../../Component/Component.js"));
var _SystemsManager = _interopRequireDefault(require("../../System/SystemsManager.js"));
var _eventEmitter = _interopRequireDefault(require("../eventEmitter.js"));
var _gameTick = _interopRequireDefault(require("../gameTick.js"));
var _localGameLoop = _interopRequireDefault(require("../localGameLoop.js"));
var _onlineGameLoop = _interopRequireDefault(require("../onlineGameLoop.js"));
var _Lifecycle = _interopRequireDefault(require("./Lifecycle.js"));
var _EntityBuilder = _interopRequireDefault(require("../../Entity/EntityBuilder.js"));
var _ActionRateLimiter = _interopRequireDefault(require("../../Component/ActionRateLimiter.js"));
var _TimersComponent = _interopRequireDefault(require("../../Component/TimersComponent.js"));
var _storage = _interopRequireDefault(require("../storage/storage.js"));
var _loadPluginsFromConfig = _interopRequireDefault(require("../loadPluginsFromConfig.js"));
var _Preloader = _interopRequireDefault(require("./Preloader.js"));
var _loadScripts = _interopRequireDefault(require("../util/loadScripts.js"));
var _loadCSS = _interopRequireDefault(require("../util/loadCSS.js"));
var _switchWorlds = _interopRequireDefault(require("../switchWorlds.js"));
var _createDefaultPlayer = _interopRequireDefault(require("../createDefaultPlayer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Game instances are event emitters

// Game tick, called once per tick from game loop

// Game loops, TODO: make game loops plugins / configurable
// Local game loop is for single machine games ( no networking )
// Online game loop is for multiplayer games ( networking )
// Action Rate Limiter, suitable for any Systems action that should be rate limited
// Game local data storage
// Loads plugins from config, can be disabled with gameConfig.loadDefaultPlugins = false
// Utility function for loading external assets
function construct(game) {
  var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // fetch the gamegame.config from localStorage
  var localData = _storage["default"].getAllKeysWithData();

  // Remark: We could merge game data back into the game.config / game.data

  // set the last local start time
  _storage["default"].set('lastLocalStartTime', Date.now());

  // Keeps a clean copy of current game state
  // Game.data scope can be used for applying game.configuration settings while game is running
  // Game.game.config scope is expected to be "immutablish" and should not be modified while game is running
  game.data = {
    width: game.config.width,
    height: game.config.height,
    fps: game.config.fps,
    fieldOfView: game.config.fieldOfView,
    // global for game, not camera specific
    camera: {
      mode: null,
      follow: game.config.camera.follow,
      currentZoom: game.config.camera.startingZoom,
      position: {
        x: 0,
        y: 0
      },
      offsetX: 0,
      offsetY: 0
    },
    scenes: {},
    chunks: {}
  };

  // TODO: clean-up camera config
  if (typeof game.data.camera.follow === 'undefined') {
    game.data.camera.follow = true;
  }
  if (typeof game.data.camera.currentZoom === 'undefined') {
    game.data.camera.currentZoom = 1;
  }
  if (typeof game.config.camera === 'string') {
    //
    game.data.camera.mode = game.config.camera;
  }
  if (typeof game.config.fps === 'number') {
    // if fps is provide, set game.config.hzMS to 1000 / fps
    game.config.hzMS = 1000 / game.config.fps;
    // set precision to 3 decimal places, preserve the last repeating digit
    game.config.hzMS = game.config.hzMS.toFixed(3);
    console.log('Setting custom FPS:', game.config.fps);
  }
  console.log("Mantra starting...");

  // Define the scriptRoot variable for loading external scripts
  // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
  game.scriptRoot = 'https://yantra.gg/mantra';
  game.assetRoot = 'https://yantra.gg/mantra';

  // Could be another CDN or other remote location
  // For local development, try game.scriptRoot = './';
  if (game.config.gameRoot) {
    console.log("Mantra is using the follow path as it's root for both scripts and assets:", game.config.gameRoot);
    game.gameRoot = game.config.gameRoot;
    game.scriptRoot = game.config.gameRoot;
    game.assetRoot = game.config.gameRoot;
  }

  //
  // Remark: options scope being removed, everything should be mounted on GameConfig
  //
  if (game.config.options.scriptRoot) {
    console.log("Mantra is using the follow path as it's script root:", game.config.options.scriptRoot);
    game.scriptRoot = game.config.options.scriptRoot;
  }
  if (game.config.options.assetRoot) {
    console.log("Mantra is using the follow path as it's asset root:", game.config.options.assetRoot);
    game.assetRoot = game.config.options.assetRoot;
  }
  //
  // ^^ legacy API, remove soon
  //

  // scriptRoot and assetRoot take precedence over gameRoot if provided
  if (game.config.scriptRoot) {
    console.log("Mantra is using the follow path as it's script root:", game.config.scriptRoot);
    game.scriptRoot = game.config.scriptRoot;
  }
  if (game.config.assetRoot) {
    console.log("Mantra is using the follow path as it's asset root:", game.config.assetRoot);
    game.assetRoot = game.config.assetRoot;
  }
  console.log("new Game(".concat(JSON.stringify(game.config, true, 2), ")"));

  // Bind eventEmitter methods to maintain correct scope
  game.on = _eventEmitter["default"].on.bind(_eventEmitter["default"]);
  game.off = _eventEmitter["default"].off.bind(_eventEmitter["default"]);
  game.once = _eventEmitter["default"].once.bind(_eventEmitter["default"]);
  game.emit = _eventEmitter["default"].emit.bind(_eventEmitter["default"]);
  game.onAny = _eventEmitter["default"].onAny.bind(_eventEmitter["default"]);
  game.offAny = _eventEmitter["default"].offAny.bind(_eventEmitter["default"]);
  game.listenerCount = _eventEmitter["default"].listenerCount.bind(_eventEmitter["default"]);
  game.listeners = _eventEmitter["default"].listeners;
  game.emitters = _eventEmitter["default"].emitters;
  game.EntityBuilder = _EntityBuilder["default"];

  // Stores references to Promises of all plugins that are currently loading
  game.loadingPluginPromises = {};

  // Helper for building entity data configurations
  game.build = function () {
    return new game.EntityBuilder(game);
  };

  // Bind loadScripts from util
  game.loadScripts = _loadScripts["default"].bind(game);
  // Bind loadCSS from util
  game.loadCSS = _loadCSS["default"].bind(game);
  game.switchWorlds = _switchWorlds["default"].bind(game);

  // game.bodyMap = {};
  game.systems = {};
  game.storage = _storage["default"];
  game.snapshotQueue = [];
  game.lifecycle = new _Lifecycle["default"](game);
  game.before = game.lifecycle.before.bind(game.lifecycle);
  game.after = game.lifecycle.after.bind(game.lifecycle);
  game.tick = 0;

  // Keeps track of array of worlds ( Plugins with type="world" )
  // Each world is a Plugin and will run in left-to-right order
  // The current default behavior is single world, so worlds[0] is always the current world
  // Game.use(worldInstance) will add a world to the worlds array, running worlds in left-to-right order
  // With multiple worlds running at once, worlds[0] will always be the root world in the traversal of the world tree
  // TODO: move to worldManager
  game.worlds = [];

  // Game settings
  game.width = game.config.width;
  game.height = game.config.height;

  // Remark: Currently, only (1) physics engine is supported at a time
  // If we want to run multiple physics engines, we'll want to make game array
  // game.physics = [];

  game.changedEntities = new Set();
  game.removedEntities = new Set();
  game.pendingRender = new Set();

  // spatial tree
  game.deferredEntities = {};

  // Preloader, for loading assets in client
  var preloader = new _Preloader["default"](game);
  game.preloader = preloader;
  game.queuedAssets = {};
  game.isClient = game.config.isClient;
  game.isEdgeClient = game.config.isEdgeClient;
  game.isServer = game.config.isServer;
  game.localGameLoopRunning = false;
  game.onlineGameLoopRunning = false;
  game.currentPlayerId = null;

  // ComponentManager.js? If so, what does it do and is it needed for our ECS?
  // Remark: I don't think we need to explicitly define components, we can just add them as needed
  game.components = {
    type: new _Component["default"]('type', game),
    // string type, name of Entity
    destroyed: new _Component["default"]('destroyed', game),
    // boolean, if true, entity is pending destroy and will be removed from game
    position: new _Component["default"]('position', game),
    // object, { x: 0, y: 0, z: 0 }
    velocity: new _Component["default"]('velocity', game),
    rotation: new _Component["default"]('rotation', game),
    mass: new _Component["default"]('mass', game),
    density: new _Component["default"]('density', game),
    width: new _Component["default"]('width', game),
    height: new _Component["default"]('height', game),
    depth: new _Component["default"]('depth', game),
    // Remark: height, width, depth are being removed in favor of size
    size: new _Component["default"]('size', game),
    radius: new _Component["default"]('radius', game),
    isSensor: new _Component["default"]('isSensor', game),
    owner: new _Component["default"]('owner', game),
    inputs: new _Component["default"]('inputs', game),
    items: new _Component["default"]('items', game),
    hasInventory: new _Component["default"]('hasInventory', game),
    sutra: new _Component["default"]('sutra', game),
    scene: new _Component["default"]('scene', game),
    // meta property allows for arbitrary data to be attached to an entity
    // you should *not* use meta for any high-frequency data updates as it is not optimized for that
    // if you find yourself needing to put a larger amount of data in meta, consider creating a new component
    meta: new _Component["default"]('meta', game),
    // boolean flag for if the entity is a collectable
    // collectable entities go into items[] of the entity when they collide
    collectable: new _Component["default"]('collectable', game)
  };

  // define additional components for the game
  game.components.color = new _Component["default"]('color', game);
  game.components.health = new _Component["default"]('health', game);
  game.components.target = new _Component["default"]('target', game);
  game.components.lifetime = new _Component["default"]('lifetime', game);
  game.components.creationTime = new _Component["default"]('creationTime', game);
  game.components.BulletComponent = new _Component["default"]('BulletComponent', game);
  game.components.graphics = new _Component["default"]('graphics', game);
  game.components.lockedProperties = new _Component["default"]('lockedProperties', game);
  game.components.actionRateLimiter = new _ActionRateLimiter["default"]('actionRateLimiter', game);

  // TODO: add body component and remove game.bodyMap[] API

  game.components.timers = new _TimersComponent["default"]('timers', game);
  game.components.yCraft = new _Component["default"]('yCraft', game);
  game.components.text = new _Component["default"]('text', game);
  game.components.style = new _Component["default"]('style', game);
  game.components.collisionActive = new _Component["default"]('collisionActive', game);
  game.components.collisionStart = new _Component["default"]('collisionStart', game);
  game.components.collisionEnd = new _Component["default"]('collisionEnd', game);
  game.components.pointerdown = new _Component["default"]('pointerdown', game);
  game.components.pointerup = new _Component["default"]('pointerup', game);
  game.components.pointermove = new _Component["default"]('pointermove', game);
  game.components.pointerover = new _Component["default"]('pointerover', game);
  game.components.pointerout = new _Component["default"]('pointerout', game);
  game.components.pointerenter = new _Component["default"]('pointerenter', game);
  game.components.pointerleave = new _Component["default"]('pointerleave', game);
  game.components.onDrop = new _Component["default"]('onDrop', game);

  // stores a location to teleport to when the entity is touched
  game.components.exit = new _Component["default"]('exit', game);

  // stores the creation tick time of the entity ( which game tick the entity was created )
  game.components.ctick = new _Component["default"]('ctick', game);

  // Systems Manager
  game.systemsManager = new _SystemsManager["default"](game);

  // Scene Manager
  game.scenes = {};

  // Graphics rendering pipeline
  game.graphics = [];
  game.gameTick = _gameTick["default"].bind(game);
  game.localGameLoop = _localGameLoop["default"].bind(game);
  game.onlineGameLoop = _onlineGameLoop["default"].bind(game);
  game.loadPluginsFromConfig = _loadPluginsFromConfig["default"].bind(game);
  game.createDefaultPlayer = _createDefaultPlayer["default"].bind(game);
  game.createPlayer = _createDefaultPlayer["default"].bind(game);

  // keeps track of game.use('PluginStringName') async loading
  // game.start() will wait for all plugins to be loaded before starting
  // game means any plugins which are game.use('PluginStringName') will "block" the game from starting
  game.loadingPluginsCount = 0;
  // game.plugins represents the initial plugins the Game wil have access to
  // subsequent plugins will be loaded dynamically with game.use()
  game.plugins = plugins;

  // game._plugins represents all plugin instances that have been loaded
  game._plugins = {};
  game.loadedPlugins = [];
  // load default plugins
  if (game.config.loadDefaultPlugins) {
    game.loadPluginsFromConfig({
      physics: game.config.physics,
      graphics: game.config.graphics,
      collisions: game.config.collisions,
      keyboard: game.config.keyboard,
      mouse: game.config.mouse,
      gamepad: game.config.gamepad,
      virtualGamepad: game.config.virtualGamepad,
      editor: game.config.editor,
      sutra: game.config.sutra,
      lifetime: game.config.lifetime,
      defaultMovement: game.config.defaultMovement
    });
  }
}

},{"../../Component/ActionRateLimiter.js":1,"../../Component/Component.js":2,"../../Component/TimersComponent.js":3,"../../Entity/EntityBuilder.js":4,"../../System/SystemsManager.js":6,"../createDefaultPlayer.js":15,"../eventEmitter.js":16,"../gameTick.js":17,"../loadPluginsFromConfig.js":18,"../localGameLoop.js":19,"../onlineGameLoop.js":20,"../storage/storage.js":22,"../switchWorlds.js":23,"../util/loadCSS.js":24,"../util/loadScripts.js":25,"./Lifecycle.js":8,"./Preloader.js":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = start;
function start(cb) {
  var game = this;
  return new Promise(function (resolve, reject) {
    // Define a wrapper for the callback to also resolve the promise
    var callbackWrapper = function callbackWrapper(err, result) {
      if (err) {
        reject(err);
        if (cb) cb(err);
        return;
      }
      resolve(result);
      if (cb) cb(null, result);
    };
    if (typeof cb !== 'function') {
      cb = function cb() {// noop 
      };
    }

    // Wait for all systems to be ready before starting the game loop
    if (game.loadingPluginsCount > 0 || game.physicsReady !== true) {
      // console.log('waiting for plugins to load...', game.physicsReady)
      setTimeout(function () {
        game.start(cb).then(resolve)["catch"](reject);
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

      // Bind all controller input events to Sutra conditions by default
      if (game.systems.sutra) {
        console.log("Binding all input events to Sutra conditions...");
        game.systems.sutra.bindInputsToSutraConditions();
      }
      console.log('All Plugins are ready! Starting Mantra Game Client...');
      game.emit('game::ready');
      if (game.config.defaultPlayer) {
        // Remark: Using this defaultPlayer config will only work in offline mode
        //         Server mode uses .listen() and .connect() to create a player
        var defaultPlayer = game.createPlayer();
        game.setPlayerId(defaultPlayer.id);
      }
      if (game.systems.client) {
        var client = game.getSystem('client');
        client.start(callbackWrapper);
      } else {
        console.log('Warning: No Client System found, will not start game loop.');
      }
    }
  });
}

},{}],13:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unload;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function unload(game) {
  return /*#__PURE__*/function () {
    var _unload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(pluginInstanceOrId) {
      var options,
        cb,
        scene,
        ents,
        sceneEnts,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            cb = _args.length > 2 ? _args[2] : undefined;
            if (typeof cb === 'undefined') {
              cb = function noop() {};
            }
            console.log('Unloading plugin', pluginInstanceOrId);

            // TODO: do not store entire scene reference in data, only store the id
            // TOOD: store scene references on game.scenes scope
            scene = this.data.scenes[pluginInstanceOrId];
            if (scene) {
              // iterate all ents and remove them if scene matches
              ents = this.data.ents._;
              sceneEnts = Object.keys(ents).forEach(function (entId) {
                game.removeEntity(Number(entId));
              });
            }
            delete game.data.scenes[pluginInstanceOrId];

            // attempt to remove the system if it exists
            game.removeSystem(pluginInstanceOrId);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function unload(_x) {
      return _unload.apply(this, arguments);
    }
    return unload;
  }();
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = use;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function use(game) {
  return /*#__PURE__*/function () {
    var _use = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pluginInstanceOrId) {
      var options,
        cb,
        basePath,
        pluginId,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            cb = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : function () {};
            basePath = '/plugins/'; // Base path for loading plugins
            basePath = game.scriptRoot + basePath;
            if (!(typeof pluginInstanceOrId === 'string')) {
              _context2.next = 20;
              break;
            }
            pluginId = pluginInstanceOrId;
            if (!game._plugins[pluginId]) {
              _context2.next = 9;
              break;
            }
            console.log("Plugin ".concat(pluginId, " is already loaded or loading."));
            return _context2.abrupt("return", game);
          case 9:
            if (!game.isServer) {
              _context2.next = 14;
              break;
            }
            if (!game.plugins[pluginId]) {
              _context2.next = 12;
              break;
            }
            return _context2.abrupt("return", game.use(new game.plugins[pluginId](options)));
          case 12:
            console.log("Attempted to load plugin by string name \"".concat(pluginId, "\" on server, could not find! Skipping"));
            return _context2.abrupt("return");
          case 14:
            game._plugins[pluginId] = {
              status: 'loading'
            };
            game.loadingPluginsCount++;
            game.emit('plugin::loading', pluginId);

            // Store the loading promise
            game.loadingPluginPromises[pluginId] = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var scriptUrl, pluginInstance;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    scriptUrl = "".concat(basePath).concat(pluginId, ".js");
                    _context.next = 4;
                    return game.loadPluginScript(scriptUrl);
                  case 4:
                    console.log("Loaded: ".concat(pluginId));
                    if (!((typeof PLUGINS === "undefined" ? "undefined" : _typeof(PLUGINS)) === 'object' && PLUGINS[pluginId])) {
                      _context.next = 11;
                      break;
                    }
                    pluginInstance = new PLUGINS[pluginId]["default"](options);
                    _context.next = 9;
                    return handlePluginInstance(game, pluginInstance, pluginId, options, cb);
                  case 9:
                    _context.next = 13;
                    break;
                  case 11:
                    console.log('Warning: PLUGINS object not found, cannot load plugin', pluginId);
                    throw new Error('PLUGINS object not found, cannot load plugin');
                  case 13:
                    _context.next = 22;
                    break;
                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](0);
                    console.error("Error loading plugin ".concat(pluginId, ":"), _context.t0);
                    game._plugins[pluginId] = {
                      status: 'error'
                    };
                    game.loadingPluginsCount--;
                    cb(_context.t0);
                    throw _context.t0;
                  case 22:
                    _context.prev = 22;
                    // Remove the promise from the tracking object once it's settled
                    delete game.loadingPluginPromises[pluginId];
                    return _context.finish(22);
                  case 25:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 15, 22, 25]]);
            }))();
            _context2.next = 26;
            break;
          case 20:
            game.loadingPluginsCount++;
            if (pluginInstanceOrId.id) {
              _context2.next = 24;
              break;
            }
            console.log('Error with pluginInstance', pluginInstanceOrId);
            throw new Error('All plugins must have a static id property');
          case 24:
            _context2.next = 26;
            return handlePluginInstance(game, pluginInstanceOrId, pluginInstanceOrId.id, options, cb);
          case 26:
            return _context2.abrupt("return", game);
          case 27:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function use(_x) {
      return _use.apply(this, arguments);
    }
    return use;
  }();
}
function handlePluginInstance(_x2, _x3, _x4, _x5, _x6) {
  return _handlePluginInstance.apply(this, arguments);
}
function _handlePluginInstance() {
  _handlePluginInstance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(game, pluginInstance, pluginId, options, cb) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (typeof pluginInstance.build === 'function') {
            extendEntityBuilder(game, pluginInstance);
          }
          pluginGameSceneMethods(game, pluginInstance);
          game.loadedPlugins.push(pluginId);
          if (!pluginInstance.preload) {
            _context3.next = 8;
            break;
          }
          _context3.next = 6;
          return pluginInstance.preload(game);
        case 6:
          _context3.next = 8;
          return game.awaitAllPlugins();
        case 8:
          pluginInstance.init(game, game.engine, game.scene);
          game._plugins[pluginId] = pluginInstance;
          delete game._plugins[pluginId];
          game.emit("plugin::loaded::".concat(pluginId), pluginInstance);
          game.emit('plugin::loaded', pluginId);
          cb();
          if (pluginInstance.type === 'world' || pluginInstance.constructor.type === 'world') {
            game.worlds.push(pluginInstance);
            game.systemsManager.addSystem(pluginId, pluginInstance);
            game.emit("world::loaded::".concat(pluginInstance.id), pluginInstance);
            game.emit('world::loaded', pluginInstance);
            console.log('Loaded World:', pluginInstance.id);
          }
          if (pluginInstance.constructor.type === 'scene') {
            game.data.scenes = game.data.scenes || {};
            game.data.scenes[pluginId] = pluginInstance;
            game.systemsManager.addSystem(pluginId, pluginInstance);
            console.log('Loaded Scene:', pluginInstance.id);
          }
          game.data.plugins = game.data.plugins || {};
          game.data.plugins[pluginId] = options;
          game.loadingPluginsCount--;
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _handlePluginInstance.apply(this, arguments);
}
function pluginGameSceneMethods(game, pluginInstance) {
  pluginInstance.createEntity = function (data) {
    data.scene = pluginInstance.id;
    return game.createEntity(data);
  };
  pluginInstance.removeEntity = function (ent) {
    return game.removeEntity(ent);
  };
  pluginInstance.createText = function (data) {
    data.scene = pluginInstance.id;
    return game.createText(data);
  };
}
function extendEntityBuilder(game, pluginInstance) {
  var pluginName = pluginInstance.constructor.name;
  game.EntityBuilder.prototype[pluginName] = function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // Create a copy of the arguments and add the _previous property
    // This is used to pass along the current/previous state of the builder config
    // Some plugins use this as optionally depending on previous plugin builder state
    // Like TileSet.meta.tileSet->TileMap.meta.tileSet
    // Remark: We tried to merge the builder config scope with plugin instance scope;
    //         however it wasn't quite working and was adding complexity
    var enhancedArgs = args.map(function (arg) {
      return _objectSpread(_objectSpread({}, arg), {}, {
        _previous: _objectSpread({}, _this.config)
      });
    });

    // Call the plugin's build function with the enhanced arguments
    var componentValue = pluginInstance.build.apply(pluginInstance, enhancedArgs);
    if (_typeof(componentValue) === 'object') {
      var _loop = function _loop(key) {
        var value = componentValue[key];
        if (typeof value === 'function') {
          // Check if the composite function already exists, if not, initialize it
          if (typeof _this.config[key] !== 'function') {
            _this.config[key] = function () {
              for (var _len2 = arguments.length, handlerArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                handlerArgs[_key2] = arguments[_key2];
              }
              _this.config[key].handlers.forEach(function (handler) {
                // Call each handler with the original arguments enhanced with _previous
                handler.apply(void 0, _toConsumableArray(handlerArgs.map(function (arg) {
                  return _objectSpread(_objectSpread({}, arg), {}, {
                    _previous: _objectSpread({}, _this.config)
                  });
                })));
              });
            };
            // Initialize with an empty handlers array
            _this.config[key].handlers = [];
          }
          // Add the new handler to the composite function's handlers array
          _this.config[key].handlers.push(value);
        } else {
          // Directly set non-function properties
          _this.config[key] = value;
        }
      };
      for (var key in componentValue) {
        _loop(key);
      }
    } else if (typeof componentValue === 'number' || typeof componentValue === 'string') {
      this.config[pluginName] = componentValue;
    }
    return this; // Allow chaining by returning the EntityBuilder instance
  };
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createDefaultPlayer;
// TODO: use Entity.sutra to bind movement directly to the player
// import topdown from './Game/defaults/defaultTopdownMovement.js';

function createDefaultPlayer() {
  var playerConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var game = this;
  console.log('creating default player', playerConfig, this.currentPlayerId);
  if (typeof playerConfig.position === 'undefined') {
    playerConfig.position = {
      x: 0,
      y: 0,
      z: 1
    };
  }
  if (playerConfig.texture === 'none') {
    delete playerConfig.texture;
  }
  if (typeof playerConfig.rotation !== 'number') {
    playerConfig.rotation = 0;
  }

  // check if game.currentPlayerId is already set, if so, return that entity
  if (this.currentPlayerId) {
    // Remark: Removed 1/22/24 as part of bringing multiplayer back
    //         Can we remove this entirely?
    // return this.getEntity(this.currentPlayerId);
  }
  var rules = game.rules;
  if (typeof playerConfig.texture === 'undefined') {
    playerConfig.texture = {
      sheet: 'loz_spritesheet',
      sprite: 'player'
    };
  }
  var player = this.createEntity({
    name: playerConfig.name,
    type: 'PLAYER',
    shape: 'triangle',
    rotation: playerConfig.rotation,
    collisionActive: true,
    collisionStart: true,
    collisionEnd: true,
    width: playerConfig.width || 16,
    height: playerConfig.height || 16,
    color: playerConfig.color,
    radius: playerConfig.radius,
    texture: playerConfig.texture,
    /*
    afterRemoveEntity: function(entity){
      // creates the same player again with the same config
      // console.log('player removed', entity.id)
      //throw new Error('Player removed');
      // causing issues wit warping worlds since we remove all ents and this re-creates the player
      //game.createPlayer(playerConfig);
    },
    */
    mass: 222,
    // sutra: topdown(game), // TODO: replace with more comprehensive player sutra with sprites and item actions
    friction: 0.5,
    // Default friction
    frictionAir: 0.5,
    // Default air friction
    frictionStatic: 1,
    // Default static friction
    // color: 0x00ff00,
    position: playerConfig.position
    // sutra: playerConfig.sutra,
  });

  this.setPlayerId(player.id);
  return player;
}
;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var lastTick = Date.now();
function gameTick() {
  var _this = this;
  this.tick++;
  this.data.tick = this.tick;
  var hzMS = this.config.hzMS || 16.666; // 60 FPS
  if (this.currentPlayerId) {
    this.data.currentPlayer = this.data.ents.PLAYER.find(function (player) {
      return player.id === _this.currentPlayerId;
    });
  }

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
  this.physics.updateEngine(deltaTimeMS);

  // Run game lifecycle hooks
  if (this.lifecycle) {
    this.lifecycle.triggerHook('before.update', hzMS);
  }

  // run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Run game lifecycle hooks
  if (this.lifecycle) {
    this.lifecycle.triggerHook('after.update', hzMS);
  }

  /*
  Remark: Removed 1/22/24, this is directly handled by the graphics system in offline mode
  for (let entityId of this.changedEntities) {
    if (this.isClient && this.isOnline === false) {
      // only consider entities that are within the field of view of the current player
      // check to see if entityId is not within ItemsInFov array
      console.log("itemInFov.indexOf(entityId)", itemInFov.indexOf(entityId))
      if (itemInFov.indexOf(entityId) === -1) {
        continue;
      }
      let ent = this.entities.get(entityId);
      if (ent) {
        this.graphics.forEach(function inflateEntityPerInterface (graphicsInterface) {
          // graphicsInterface.inflateEntity(ent);
        });
      }
    }
  }
  */

  this.changedEntities.clear();

  // Save the game snapshot
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);
  // TODO: THESE should / could all be hooks, after::gameTick
}
var _default = exports["default"] = gameTick;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPluginsFromConfig;
var _LoadingScreen = _interopRequireDefault(require("../plugins/loading-screen/LoadingScreen.js"));
var _GhostTyper = _interopRequireDefault(require("../plugins/typer-ghost/GhostTyper.js"));
var _Physics = _interopRequireDefault(require("../plugins/physics/Physics.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// default player movement, this could be also be set in defaultGameStart.js
// import movement from './defaultPlayerMovement.js';
function loadPluginsFromConfig(_ref) {
  var _this = this;
  var physics = _ref.physics,
    graphics = _ref.graphics,
    collisions = _ref.collisions,
    keyboard = _ref.keyboard,
    mouse = _ref.mouse,
    gamepad = _ref.gamepad,
    virtualGamepad = _ref.virtualGamepad,
    editor = _ref.editor,
    sutra = _ref.sutra,
    ghostTyper = _ref.ghostTyper,
    lifetime = _ref.lifetime,
    _ref$defaultMovement = _ref.defaultMovement,
    defaultMovement = _ref$defaultMovement === void 0 ? true : _ref$defaultMovement;
  var plugins = this.plugins;
  var gameConfig = this.config;

  //
  // Iterate through `GameConfig.plugins` array and load plugins
  // Three separate formats are supported to load plugins:
  //   1. string name of plugin (e.g. 'Bullet')
  //   2. instance of plugin (e.g. new Bullet())
  //   3. object with `name` and `config` properties (e.g. { name: 'Bullet', config: { cool: true } })
  if (plugins.length) {
    console.log('The following plugins will be loaded from `GameConfig`', plugins);
    plugins.forEach(function (pluginy) {
      if (typeof pluginy === 'string') {
        // console.log('using plugin as string name', pluginy)
        _this.use(pluginy);
        return;
      }
      if (_typeof(pluginy) === 'object' && pluginy.id && typeof pluginy.init === 'function') {
        //console.log('found compatible plugin class instance as object', pluginy)
        _this.use(pluginy);
        return;
      }
      if (_typeof(pluginy) === 'object' && pluginy.name && _typeof(pluginy.config) === 'object') {
        // console.log('found plugin as config object', pluginy)
        _this.use(pluginy.name, pluginy.object);
        return;
      }
    });
  }
  if (gameConfig.showLoadingScreen && !this.isServer) {
    this.use(new _LoadingScreen["default"]({
      minLoadTime: gameConfig.minLoadTime
    }));
  }
  this.use('Entity');
  if (physics === 'matter') {
    this.use('MatterPhysics');
  }
  if (physics === 'physx') {
    this.use('PhysXPhysics');
  }

  // Remark: Removed 2/13/2024, no longer loading movement by default
  // this.use('EntityInput');
  // this.use('EntityMovement');

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
    }
    if (virtualGamepad) {
      this.use('GamepadGUI', gamepad);
    }
    if (sutra) {
      this.use('Sutra', {
        defaultMovement: defaultMovement // TODO: remove, no mutation from using plugins!
      });
    }

    if (defaultMovement) {
      if (this.systems.sutra) {
        this.systems.sutra.bindDefaultMovementSutra(mode);
      }
    }
    this.use('GhostTyper');

    // Physics is imported directly in Main mantra package ( for now )
    this.use(new _Physics["default"]());

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
      if (graphics.includes('ascii')) {
        this.use('ASCIIGraphics', {
          camera: this.config.camera
        });
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

},{"../plugins/loading-screen/LoadingScreen.js":27,"../plugins/physics/Physics.js":28,"../plugins/typer-ghost/GhostTyper.js":30}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var started = false;
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

  var hzMS = game.config.hzMS || 16.666; // 60 FPS

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
    // this looks like it may not deal with snapshots properly
    graphicsInterface.render(game, alpha); // Pass the alpha to the render method
  });

  // Call the next iteration of the loop using requestAnimationFrame
  if (game.localGameLoopRunning) {
    // why isn't game loop stopping for tests?
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

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// onlineGameLoop.js - Marak Squires 2023
var started = false;
var lastRenderedSnapshotId = null;
var hzMS = 16.666; // TODO: variable frame rates via game.config.hzMS
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

},{}],22:[function(require,module,exports){
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

},{"./MemoryBackend.js":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = switchWorlds;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function switchWorlds(_x) {
  return _switchWorlds.apply(this, arguments);
}
function _switchWorlds() {
  _switchWorlds = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(selectedWorld) {
    var game, worldName, worldClass, worldInstance, sleep;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sleep = function _sleep(ms) {
            return new Promise(function (resolve) {
              return setTimeout(resolve, ms);
            });
          };
          game = this; // check to see if game.worlds has any entries
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

          // we need to reset some state about the player here, such as respawn
          // since switching levels may result in a new player entity
          // this may or may not be the case, we'll have to see
          // remote player.meta.lives so player won't respawn
          game.updateEntity(game.currentPlayerId, {
            meta: {
              lives: 0
            },
            sutra: null
          });
          game.systems.entity.removeAllEntities(true);

          // already constructed plugin classes
          if (!(_typeof(selectedWorld) === 'object')) {
            _context.next = 9;
            break;
          }
          alert('loading s');
          game.use(selectedWorld);

          // USER INTENT: Change world
          // persist this intention to the local storage
          // so that it can be restored on next page load
          // game.storage.set('world', selectedWorld);
          return _context.abrupt("return");
        case 9:
          worldName = 'XState';
          worldName = 'Sutra';
          worldName = selectedWorld;

          // TODO: remove global WORLDS reference for server
          worldClass = WORLDS.worlds[worldName];
          if (worldClass) {
            _context.next = 16;
            break;
          }
          console.error("World ".concat(worldName, " not found"));
          return _context.abrupt("return");
        case 16:
          worldInstance = new worldClass();
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
          if (worldInstance.preload) {
            // remark: is this not already handled????
            // not needed?
            //await worldInstance.preload(game);
            // required ( for now should be automated? )
            //await game.preloader.loadAll();
          }
          game.use(worldInstance);

          // USER INTENT: Change world
          // persist this intention to the local storage
          // so that it can be restored on next page load
          game.storage.set('world', selectedWorld);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _switchWorlds.apply(this, arguments);
}

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
          if (typeof scripts === 'string') {
            scripts = [scripts];
          }

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
        case 5:
          if (!(i < scripts.length)) {
            _context2.next = 17;
            break;
          }
          _context2.prev = 6;
          _context2.next = 9;
          return loadScript(scripts[i]);
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
          // Call the final callback after all scripts are loaded
          if (finalCallback) {
            finalCallback();
          }
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this, [[6, 11]]);
  }));
  return _loadScripts.apply(this, arguments);
}

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureColorInt;
function ensureColorInt(color) {
  if (!color) {
    return color;
  }

  // Mapping of common color names to hex values
  var colorNameToHex = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#fff007',
    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    pink: '#FFC0CB'
    // Add more common colors as needed
  };

  // If color is already a number, return it as is
  if (typeof color === 'number') {
    return color;
  }

  // If color is a hex string (with #), convert it to an integer
  if (typeof color === 'string' && color.startsWith('#')) {
    return parseInt(color.replace('#', ''), 16);
  }

  // If color is a common color name, convert it using the mapping
  if (typeof color === 'string' && colorNameToHex[color.toLowerCase()]) {
    return parseInt(colorNameToHex[color.toLowerCase()].replace('#', ''), 16);
  }

  // If color format is unrecognized, throw an error or return a default color
  console.error('Unrecognized color format:', color);
  return parseInt('000000', 16); // Default to black
}

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _applyGravity = _interopRequireDefault(require("./applyGravity.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Physics.js - Marak Squires 2024
// Generic Math-Only Physics, designed to be used in-code without Physics engine
var Physics = exports["default"] = /*#__PURE__*/function () {
  function Physics(config) {
    _classCallCheck(this, Physics);
    this.id = Physics.id;
    this.applyGravity = _applyGravity["default"].bind(this);
  }
  _createClass(Physics, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      game.systemsManager.addSystem(Physics.id, this);

      // simplified vector math for physics
      this.Vector = {
        add: function add(v1, v2) {
          return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
          };
        },
        sub: function sub(v1, v2) {
          return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
          };
        },
        mult: function mult(v, factor) {
          return {
            x: v.x * factor,
            y: v.y * factor
          };
        },
        div: function div(v, factor) {
          return {
            x: v.x / factor,
            y: v.y / factor
          };
        },
        magnitude: function magnitude(v) {
          return Math.sqrt(v.x * v.x + v.y * v.y);
        },
        normalize: function normalize(v) {
          var mag = _this.Vector.magnitude(v);
          return mag > 0 ? _this.Vector.div(v, mag) : {
            x: 0,
            y: 0
          };
        }
      };
    }
  }]);
  return Physics;
}();
_defineProperty(Physics, "id", 'physics');
_defineProperty(Physics, "removable", false);

},{"./applyGravity.js":29}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyGravity;
function applyGravity(ent1, ent2, gravity) {
  var repulsion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var game = this.game;
  if (!ent1 || !ent2) {
    return;
  }
  var Vector = this.Vector;
  var distance = Vector.sub(ent2.position, ent1.position);
  var magnitude = Vector.magnitude(distance);
  if (magnitude < 0.5) {
    // This prevents extreme forces at very close distances
    return;
  }
  distance = Vector.normalize(distance);
  var force = gravity * ent1.mass * ent2.mass / (magnitude * magnitude);
  var maxForce = 1; // Prevents excessively large forces
  force = Math.min(force, maxForce);
  var sign = repulsion ? 1 : -1;
  game.applyForce(ent2.id, {
    x: sign * distance.x * force,
    y: sign * distance.y * force
  });
}

},{}],30:[function(require,module,exports){
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

},{}]},{},[7])(7)
});

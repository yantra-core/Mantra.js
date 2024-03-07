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
      // TODO: defaults should be applied at the end,
      //       during build() or .createEntity()
      //       it is unexpected to see default values during make() process
      //       it is better to leave the defaults off until the end
      // TODO: add tests for default values
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

  // provides a default Entity() builder, required for Mantra Markup
  _createClass(EntityBuilder, [{
    key: "Entity",
    value: function Entity() {
      return this;
    }

    // Remark: id is not used when creating entities, it's used for building configs
  }, {
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
  }, {
    key: "angle",
    value: function angle(value) {
      // angle is alias for rotaion
      // convert the incoming degrees to radians
      var radians = value * (Math.PI / 180);
      this.config.rotation = radians;
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
    key: "afterUpdateEntity",
    value: function afterUpdateEntity(handler) {
      return this._addEventHandler('afterUpdateEntity', handler);
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

    // used for components like 'Input' or 'Button'
  }, {
    key: "value",
    value: function value(_value) {
      this.config.value = _value;
      return this;
    }

    // Meta and Data
  }, {
    key: "meta",
    value: function meta(value) {
      if (_typeof(value) === 'object' && value !== null) {
        if (_typeof(this.config.meta) === 'object' && this.config.meta !== null) {
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
      if (typeof x === 'number') {
        this.config.position.x = x;
      }
      if (typeof y === 'number') {
        this.config.position.y = y;
      }
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
    key: "items",
    value: function items(value) {
      this.config.items = value;
      return this;
    }
  }, {
    key: "container",
    value: function container(value) {
      this.config.container = value;
      return this;
    }
  }, {
    key: "origin",
    value: function origin(value) {
      // Map of origin positions to their relative offsets
      var origins = {
        'center': {
          x: 0.5,
          y: 0.5
        },
        'top': {
          x: 0.5,
          y: 0
        },
        'bottom': {
          x: 0.5,
          y: 1
        },
        'left': {
          x: 0,
          y: 0.5
        },
        'right': {
          x: 1,
          y: 0.5
        },
        'top-left': {
          x: 0,
          y: 0
        },
        'top-right': {
          x: 1,
          y: 0
        },
        'bottom-left': {
          x: 0,
          y: 1
        },
        'bottom-right': {
          x: 1,
          y: 1
        }
      };
      var originOffset = origins[value];
      if (originOffset) {
        // Ensure the offset object exists
        if (_typeof(this.config.offset) !== 'object' || this.config.offset === null) {
          this.config.offset = {
            x: 0,
            y: 0,
            z: 0
          }; // Initialize with default values
        }

        // Adjust the existing offsets based on the origin
        // Assuming a default entity size to calculate the origin offset, adjust as needed
        var entitySize = this.config.size || {
          width: 16,
          height: 16,
          depth: 16
        };
        var offsetX = entitySize.width * (originOffset.x - 0.5); // Subtracting 0.5 to center the origin
        var offsetY = entitySize.height * (originOffset.y - 0.5); // Subtracting 0.5 to center the origin

        // Add the calculated origin offsets to the existing offsets
        this.offset(this.config.offset.x + offsetX, this.config.offset.y + offsetY, this.config.offset.z);
      } else {
        console.warn("Invalid origin value: '".concat(value, "'. Valid origins are center, top, bottom, left, right, top-left, top-right, bottom-left, bottom-right."));
      }
      return this;
    }
  }, {
    key: "layout",
    value: function layout(globalOrigin, referenceDimensions) {
      // Default to screen size if referenceDimensions are not provided
      if (typeof referenceDimensions === 'undefined') {
        referenceDimensions = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        /*
        referenceDimensions = {
          width: game.width,
          height: game.height
        };
        */
      }

      // console.log("Reference Dimensions:", referenceDimensions);

      // Calculate the center of the screen in screen coordinates
      var screenCenter = {
        x: referenceDimensions.width / 2,
        y: referenceDimensions.height / 2
      };

      // Map of global origin positions to their function for calculating position
      // TODO: alias all pairs of top/bottom, left/right, center
      //       such that API is easy to use and understand
      var globalOrigins = {
        'center': function center() {
          return {
            x: 0,
            y: 0
          };
        },
        // Center of game coordinates
        'top-left': function topLeft() {
          return {
            x: -screenCenter.x,
            y: -screenCenter.y
          };
        },
        'top-center': function topCenter() {
          return {
            x: 0,
            y: -screenCenter.y
          };
        },
        'top-right': function topRight() {
          return {
            x: screenCenter.x,
            y: -screenCenter.y
          };
        },
        'bottom-left': function bottomLeft() {
          return {
            x: -screenCenter.x,
            y: screenCenter.y
          };
        },
        'bottom-center': function bottomCenter() {
          return {
            x: 0,
            y: screenCenter.y
          };
        },
        'bottom-right': function bottomRight() {
          return {
            x: screenCenter.x,
            y: screenCenter.y
          };
        },
        'center-left': function centerLeft() {
          return {
            x: -screenCenter.x,
            y: 0
          };
        },
        'center-right': function centerRight() {
          return {
            x: screenCenter.x,
            y: 0
          };
        }
      };
      var calculatePosition = globalOrigins[globalOrigin];
      if (calculatePosition) {
        // Calculate the position based on the global origin
        var position = calculatePosition();

        // calculate offset based on origin to keep relative center position
        if (globalOrigin === 'top-left') {
          //position.x = position.x + (this.config.size.width / 2);
          //position.y = position.y + (this.config.size.height / 2);
        }
        if (globalOrigin === 'top-center') {
          //position.y = position.y + (this.config.size.height / 2);
        }
        if (globalOrigin === 'top-right') {
          //position.x = position.x - (this.config.size.width / 2);
          //position.y = position.y + (this.config.size.height / 2);
        }
        if (globalOrigin === 'bottom-left') {
          // position.x = position.x + (this.config.size.width / 2);
          // position.y = position.y + (this.config.size.height / 2);
        }

        // Update the entity's position by converting screen space to game space
        this.position(position.x, position.y);
      } else {
        console.warn("Invalid global origin value: '".concat(globalOrigin, "'. Valid global origins are center, top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, center-left, center-right."));
      }
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

    // TOOD: we should remove most of this, it should be in build
    // this will result in build sometimes returning array of objects
    // offset set / repeat / clone / etc
  }, {
    key: "createEntity",
    value: function createEntity() {
      var applyOffset = function applyOffset(config) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        // Apply the offset to the position based on the index
        config.position.x += config.offset.x * index;
        config.position.y += config.offset.y * index;
        config.position.z += config.offset.z * index;
      };
      if (typeof this.config.clone === 'number') {
        var entities = [];
        for (var i = 0; i < this.config.clone; i++) {
          var clonedConfig = _objectSpread({}, this.config); // Shallow copy for non-function properties
          applyOffset(clonedConfig); // No index needed for clones, as they are exact copies
          entities.push(this.game.createEntity(clonedConfig));
        }
        return entities;
      } else if (typeof this.config.repeat === 'number') {
        var _entities = [];
        for (var _i = 0; _i < this.config.repeat; _i++) {
          var entityConfig = _objectSpread({}, this.config); // Shallow copy for non-function properties
          // TODO: return cloned offset, cannot mutate like this? double check, tests would be good
          applyOffset(entityConfig, _i); // Apply offset based on the index for repeated entities

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
        applyOffset(singleConfig); // Apply offset for a single entity
        var singleCreatedEntity = this.game.createEntity(singleConfig);
        // TOOD: remove this from EntityBuilder, place in createEntity()
        if (singleCreatedEntity.type === 'PLAYER' || singleCreatedEntity.type === 'Player') {
          // TODO: check to see if there are no other active players / if so set this one
          this.game.setPlayerId(singleCreatedEntity.id);
        }
        return singleCreatedEntity;
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

},{"../plugins/entity/lib/util/ensureColorInt.js":27}],5:[function(require,module,exports){
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
      fieldOfView: 96,
      // CSSGraphics can support 96 on lower end devices, Three can easily do 144 or 256
      fps: 60,
      useFoV: false,
      // game systems / auto-load based on pluginsConfig
      physics: 'matter',
      graphics: ['css'],
      collisions: true,
      camera: {},
      gravity: {},
      useMinBuilds: true,
      keyboard: true,
      mouse: true,
      gamepad: false,
      virtualGamepad: false,
      markup: true,
      editor: false,
      sutra: true,
      lifetime: false,
      defaultMovement: true,
      defaultMouseMovement: true,
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
      addLifecycleHooksToAllPlugins: true,
      // default behavior is to add lifecycle hooks to all plugin methods
      warnNonYantraGameRoot: false // warns if gameRoot is not yantra.gg
    };

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

      // check to see if there is a checksum to load with
      if (_typeof(this.pluginChecksums) === 'object') {
        var checksum = this.pluginChecksums[scriptUrl];
        if (typeof checksum === 'string') {
          scriptUrl += '?c=' + checksum;
        }
      }

      // Remark: We could enable secure loading of plugins by checking the checksum
      // of the returned script and comparing it to the checksum in the pluginChecksums object
      // This would require usage of fetch() api instead of <script> tag
      // 2/23/2023- Performance + Complexity cost for little security gain
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
  }, {
    key: "markup",
    value: function markup() {
      var showOriginalHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.systems.markup) {
        this.systems.markup.parseHTML(showOriginalHTML);
      }
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
    key: "removeEntitiesByType",
    value: function removeEntitiesByType(type) {
      var _this = this;
      var entities = this.getEntitiesByType(type);
      if (entities) {
        entities.forEach(function (entity) {
          _this.removeEntity(entity.id);
        });
      }
    }
  }, {
    key: "getEntitiesByType",
    value: function getEntitiesByType(type) {
      if (this.data && this.data.ents && this.data.ents[type]) return this.data.ents[type];
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
    // DOM event helpers
    //
  }, {
    key: "unbindKeyboard",
    value: function unbindKeyboard() {
      if (this.systems['keyboard']) {
        this.systems['keyboard'].unbindAllEvents();
      }
    }
  }, {
    key: "bindKeyboard",
    value: function bindKeyboard() {
      if (this.systems['keyboard']) {
        this.systems['keyboard'].bindInputControls();
      }
    }

    //
    // Containers
    //
    // TODO: move to Container.js
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
      var game = this;
      this.graphics.forEach(function (graphicsInterface) {
        if (graphicsInterface.cameraShake) {
          graphicsInterface.shakeCamera({
            intensity: intensity,
            duration: duration
          });
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
    key: "convertColorToHex",
    value: function convertColorToHex(color) {
      return typeof color === 'number' ? "#".concat(color.toString(16)) : color;
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

},{"./Component/Component.js":2,"./lib/Game/construct.js":11,"./lib/Game/start.js":13,"./lib/Game/unload.js":14,"./lib/Game/use.js":15}],6:[function(require,module,exports){
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

},{"../lib/eventEmitter.js":17}],7:[function(require,module,exports){
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
var _pluginChecksums = _interopRequireDefault(require("./pluginChecksums.js"));
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
// checksums for plugins
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
      scaleMultiplier: 1,
      adaptiveZoom: true,
      // will auto-zoom the viewport to fit the game size
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
    // console.log('Setting custom FPS:', game.config.fps);
  }

  console.log("Mantra starting...");

  // Define the scriptRoot variable for loading external scripts
  // To support demos and CDN based Serverless Games, we default scriptRoot to yantra.gg
  game.scriptRoot = 'https://yantra.gg/mantra';
  game.assetRoot = 'https://yantra.gg/mantra';

  // Could be another CDN or other remote location
  // For local development, try game.scriptRoot = './';
  if (game.config.gameRoot) {
    if (!game.isServer) {
      console.log("Mantra is using the follow path as it's root for both scripts and assets:", game.config.gameRoot);
    }
    game.gameRoot = game.config.gameRoot;
    game.scriptRoot = game.config.gameRoot;
    game.assetRoot = game.config.gameRoot;
  }

  //
  // Remark: options scope being removed, everything should be mounted on GameConfig
  //
  if (game.config.options.scriptRoot) {
    // console.log("Mantra is using the follow path as it's script root:", game.config.options.scriptRoot)
    game.scriptRoot = game.config.options.scriptRoot;
  }
  if (game.config.options.assetRoot) {
    // console.log("Mantra is using the follow path as it's asset root:", game.config.options.assetRoot)
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
  if (typeof window !== 'undefined') {
    console.log("new Game(".concat(JSON.stringify(game.config, true, 2), ")"));
  }

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

  //
  // Entity Builder / helpers / sugar syntax for constructing and composing entities
  //
  game.make = function () {
    return new game.EntityBuilder(game);
  };

  // maintains a list of plugin checksums for cache busting and security
  game.pluginChecksums = _pluginChecksums["default"];

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
  // stores the last tick time the entity was updated
  game.components.ctick = new _Component["default"]('utick', game);

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
      markup: game.config.markup,
      defaultMovement: game.config.defaultMovement
    });
  }
}

},{"../../Component/ActionRateLimiter.js":1,"../../Component/Component.js":2,"../../Component/TimersComponent.js":3,"../../Entity/EntityBuilder.js":4,"../../System/SystemsManager.js":6,"../createDefaultPlayer.js":16,"../eventEmitter.js":17,"../gameTick.js":18,"../loadPluginsFromConfig.js":19,"../localGameLoop.js":20,"../onlineGameLoop.js":21,"../storage/storage.js":23,"../switchWorlds.js":24,"../util/loadCSS.js":25,"../util/loadScripts.js":26,"./Lifecycle.js":8,"./Preloader.js":9,"./pluginChecksums.js":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  "./plugins/BabylonCamera.js": "d081e991041950666c2e1f304e2653292d3dc131ff7e44613bf4f32e04e1d5d6",
  "./plugins/BabylonCamera.min.js": "d0d3c2c6657d2dfb3c1b2cb446af3098d9ade28551f61d87469114000c552710",
  "./plugins/BabylonGraphics.min.js": "1ea5d0b92ac68d0fe8545f2d70808e8e8a5fe156d210b51e6e40ac4964e9e871",
  "./plugins/BabylonStarField.js": "bcbeb93b6bd0a1490055f9ad862177173fe51d2c2fcbd964a899d519017b1b72",
  "./plugins/BabylonStarField.min.js": "d4a2f4ab4cd052977c7243a0d6918035b098843a80e5704e0f261dd1c30c3774",
  "./plugins/Behaviors.js": "7b7a58950a66608f894d22cedc281c75c15c5b169d763a525c0d0c32a234e101",
  "./plugins/Behaviors.min.js": "95c83275952aba582953b763a515c61378ca78af8c7b4897927f377cc90199b2",
  "./plugins/Block.js": "8a1f60d0008b88c23af3e4507883d51ca37b3e34c79c6d45e7e509f458cc425d",
  "./plugins/Block.min.js": "15d67b27b79f808ff076860b9ca72f8b8f357d3065221ff96619eb9a750b2568",
  "./plugins/Bomb.js": "f7a362f2807f41676bcc49901c6c16d0a01b8d741dfddcd726a2d2b2b1619621",
  "./plugins/Bomb.min.js": "a6e453890b05fcab61a54c6addaa2d59fbbfa2b89a0b4429ee5a4f7f6128e02a",
  "./plugins/Boomerang.js": "9699444f05362f0c1c653dfbfc457a840c4b7216bdb3e501e37392bb5ce8b367",
  "./plugins/Boomerang.min.js": "02f004d01651777df7f30dae220c15823a444de9e49deec3af948deb6257ad0f",
  "./plugins/Border.js": "776ff9a840aee4e40b98ac21a2ece7846157de59c843f7fa335d0497baaa2b7a",
  "./plugins/Border.min.js": "3584e32fb60aae9ee6a291e4b3a89722f9eb62b345bc0b68cc06b450c854ade5",
  "./plugins/Bullet.js": "19bb3f772caa2af29d758b56865186d0b043d15277249051dda1a6418fc0c3ec",
  "./plugins/Bullet.min.js": "f8e1f52b96ea8bee17a0c5c9ae5ba9c1925cc2daf6703093e613e4d7a92c4f07",
  "./plugins/Button.js": "2c83e710a9ba08fc3756da016a4b02db323ca6a1203ad300ec89fcf90094ad43",
  "./plugins/Button.min.js": "6403b7847805cbfacac06ac51c99e6d8d504745a27d8d4db00221a347a998385",
  "./plugins/CSS3DGraphics.js": "682cda73678716ab858e7f412b8fc4304a9ce1835a558d5f21681d8f7dbbd3ae",
  "./plugins/CSS3DGraphics.min.js": "5773e9e9d79ddbc8c295c517af3c790e74ce7069ecbfc9705746bada0b25f1e1",
  "./plugins/Canvas.js": "f38953424cd2e9a460c13f1eec39c01732e85e1604efa5d0472bd8386bb1762a",
  "./plugins/Canvas.min.js": "ca92686ba4df78cab48c226dcd2bf6b7f88be728a58f4602a11ef3b5e5f4bc38",
  "./plugins/Checkbox.js": "16b74e6931eaa235e6ff931f699a3ec3c6d754054ba017d81d6473d450a9a125",
  "./plugins/Checkbox.min.js": "ebb6d340f74df92367e284c26cf2411fcfbf86f2f9e92680ded0f065f816b44a",
  "./plugins/ChronoControl.js": "3d1eb99a514dc0726c3055371cf47fb32e25190a4f7c16b823792ecc7858dfa1",
  "./plugins/ChronoControl.min.js": "a9a511015708f05075041a02a32b9bcfd56e8cc73d07a5836699b0c1c2f1ae83",
  "./plugins/Code.js": "56988694fff92420836c8e44452dcfbe907628d74ccd8a73d15dbac7e777d809",
  "./plugins/Code.min.js": "cf633478b600ab5b225906fad83d8b353d93d756a7dd1f5f95a034b963e710ea",
  "./plugins/Collectable.js": "0ef48261adc5fc05911a3a1046f68645d9f4776a90e86b78db4e1563d9f91496",
  "./plugins/Collectable.min.js": "d6a2315ab43fe54db6af73c2df8f8eb32bc8484cddcc4075e5b3647458f225d0",
  "./plugins/Collisions.js": "947f90bbc97c4af120e61ac73087b6c20bdb61c78438f6c5c046864495839795",
  "./plugins/Collisions.min.js": "9b13eaf0d4cf10277aa2efb18354e004a1169a2c109bf9d9caffec80d5a7bb69",
  "./plugins/Container.js": "e1c826e681c7da4b0d653e66819c3f9f4b38a1f8d51555434a5de8e9f418370f",
  "./plugins/Container.min.js": "e1c3490ea0f8dbfb2bc93f3bc5eb2138f464a1ddc761f56aeb1cfdf9641db6ff",
  "./plugins/ControlsGUI.js": "d54f58ed4eabb78b5897a2428591e1ef0256d5d67773dcbe13c4d75f8075e63b",
  "./plugins/ControlsGUI.min.js": "08c30bc076baeda7379a728a2a188e0b35fcf5d91d031b5221654d319591ff86",
  "./plugins/Creator.js": "61d6002a0e5d51df00e5735ee8ffeeaecb7083e9f5ca6747a0991ef9bb39c306",
  "./plugins/Creator.min.js": "fb744b4f67f3a0b2e3dace2735dedf7061fa927bfa213818ba72b11f70c19de8",
  "./plugins/CurrentFPS.js": "6e200e9d32a7d223d64f2399006f289c0e276e75bca63e7826622a62ee2917da",
  "./plugins/CurrentFPS.min.js": "bef967a59c86722013e2ec5d6eb8e539f8464db050aadb32a1e4d53ede924752",
  "./plugins/Draggable.js": "58c9cabeb501780b0cb153f72a932bc50b4cb096bef8229e6458f9f1ff5374f9",
  "./plugins/Draggable.min.js": "d820d1a4d4fe0ba357fc5ce615428b34b3b4ea9e9a2b4825cde48764f73a928a",
  "./plugins/Droppable.js": "3861edc41aee15b701ceeff2c81a5d2ab039885921830c48594417b4cf4f7c72",
  "./plugins/Droppable.min.js": "a69031884f922e66c0b29ec604474a62341174837222231b0db060995808e9a4",
  "./plugins/EntitiesGUI.js": "bc66200e73eebd08e38cfc060d2f4d6b748aeac903d2d314b8c23c11c3bc3d0f",
  "./plugins/EntitiesGUI.min.js": "5f9e2133a539fe3fc7cb5ef028066f82538b5d38cb24cc8404eb3219662c7e38",
  "./plugins/EventInspector.js": "6ca05415864ef09766a010f0176db7d9caac6020df1252a3a680daee4f2b4fd1",
  "./plugins/EventInspector.min.js": "84690d0c1f5fe59f3fc28062e84ee1933391c8120b22d796e3689b1abf348165",
  "./plugins/Flame.js": "15b2ccbdc64f1779e22a354d7a67328c26541d9898433cbd463e5669ec571abb",
  "./plugins/Flame.min.js": "b24ccabd1f3a74b7579d667aad4198d450c2c19208129662de30483c8826ec4a",
  "./plugins/FlashMessage.js": "2a278a77a35b5575d7077580abc79f5221a3111c50d6d770a84603234ca042a0",
  "./plugins/FlashMessage.min.js": "764f1e74b4afe5bd37cc9e1b6bd00dc78eedb5d8b50ad6407fad5d287cc006a4",
  "./plugins/FloatyTyper.js": "0e42af84fa1f30be41ce34969bc625ee6d1c275e557d832be035be76c8de1bcd",
  "./plugins/FloatyTyper.min.js": "1229f52b05300c5c5582ba7dbd594a10af236283da758f3d504440e9208f05fd",
  "./plugins/GameEditorGui.js": "73b832620d31a9a20253bbb7dad0da557b6795fb6aa32fdcbb543ee4f82f84ad",
  "./plugins/GameEditorGui.min.js": "2778dae74a434aec88eedb7dd63242e0ebceb1bccbed35208ae0cb641d1559fd",
  "./plugins/Gamepad.js": "6eac485cee65c05d5a46f86d0d4b02ecdf827a93f11f1ae45454e4a6ff41f4ba",
  "./plugins/Gamepad.min.js": "5a360e60ec674cbfbe0181cfaf28b1f6f4bed413c0c6cca2430578191dbed576",
  "./plugins/GamepadGUI.js": "f9b8b834be215bb38a1e20112cdb79ebc4098e22bfbe588add62e4507d14a973",
  "./plugins/GamepadGUI.min.js": "a7364e86f4e4abbb31d6053a728c7d9d26fffd6842fc6975306bc54056a888d8",
  "./plugins/GhostTyper.js": "d13d0a0a2aa3eaefc3f5c50fa7a0a969dea114afa1fb5746c2954e1b27d2e8a6",
  "./plugins/GhostTyper.min.js": "15124babd086c31da916405d582032224301a4f01887e25e27c41c7c84be2ccd",
  "./plugins/Graphics.js": "349ef373638a229c9bd6b129aed466e23955f5ec8c21a303f716e9f9979ca21b",
  "./plugins/Graphics.min.js": "545b75c0728a493dc9f627639661f1d4d1a8f13b8fb93f79955bd44c3a77d7b1",
  "./plugins/GravityWell.js": "a213708152c92ddbdd30a0c6b553abd368627f5adaaab72b82b181502b8781ee",
  "./plugins/GravityWell.min.js": "323551ff077833c0a1c4f98b69b8d3ab65418a3a17184b5a79b94d0b57735b15",
  "./plugins/Health.js": "14543aa1672791249749eadc46c898105ef663b8be57ec78886c79c7903a25a8",
  "./plugins/Health.min.js": "c0b3b691a9a43ce10828818ab13199f814c49fc8abe8628afff904ae8b198923",
  "./plugins/Hexapod.js": "31e3ab5c2fac35d15fe9e4ce527e4fda34135ffb3e2e1fef23a14fac9307d2a3",
  "./plugins/Hexapod.min.js": "908249a2eb1df9b6c489937da2a4a46a81eebae104f9e51c133f1b10431755ba",
  "./plugins/Iframe.js": "ef82c243d98dc49ab09ba5b54d7483128eb0fb49a4e733e1032d25730a095db0",
  "./plugins/Iframe.min.js": "486536e022cee0dc0274cd5a99b24f456ed94715b20fa2de8bbfa88c36ada101",
  "./plugins/Image.js": "a9be3447d72667f4cc83443bdefc6ae1f09be99ec50668ade91212acee362792",
  "./plugins/Image.min.js": "b1f09111be50b848eed0bdf9f2c197af8d616f6b0f915ee75a0e0cbf83e0f57d",
  "./plugins/Input.js": "d0684ed311bbfacaf094fbbf4b70e23296b7fdc077e4e3f92e6ee3487a5ce83f",
  "./plugins/Input.min.js": "6b17a341cd67a0deab701cf2d40e150bd7e8055e6a91724f201825099ab52221",
  "./plugins/Inspector.js": "fda5c903185dfdeba99096d42f58ff7daafc757b016090bd440c74770dc2fc53",
  "./plugins/Inspector.min.js": "47b59a569e204210647e1bd9fbf739a57333e8174db1b7af86119304b10643eb",
  "./plugins/Key.js": "14be871e2d98ae2a84558d4680c456da0b717ab32f14ff6e3db394791b3be456",
  "./plugins/Key.min.js": "b7bb1a499c76689b538be49a2b29ccd5e57267dbcd5c4b54b8fb251cd60b8c41",
  "./plugins/Keyboard.js": "6d4c62e195bbbd24ec92def8605bcba6f15108e0cabbb68bacc6df16ab90b407",
  "./plugins/Keyboard.min.js": "3b82b35f79a51f9bb2f179222ed24967a179d43e0d1a92e571adcfa3cadeffeb",
  "./plugins/Label.js": "16cd42e7c61bbb5b28cf22fcc4e5e1fc8a6a25a42f237fd4c7c6379d176d1774",
  "./plugins/Label.min.js": "44a9e0631d95a8ccf9d23bc2249c2653abdbea4f79db1e3c9f5cfb7faf7f2cdc",
  "./plugins/Lifetime.js": "126648fa1b787f25fa302e56603a85d2073ab372b97d66b177930c27c4ae9f68",
  "./plugins/Lifetime.min.js": "1f0e46af7af17e9fdbda0b7ac3ed9844c7b9993b3ce7682443e0c7f0188b44b5",
  "./plugins/Link.js": "15613eac362fc089cd4450fa8aeb6a519239a0b6eff35f675827813f12dfa833",
  "./plugins/Link.min.js": "ef00cc642c22ddd3ce4251674c61761194867bfc9edc484050968c24f00037d5",
  "./plugins/LoadingScreen.js": "bfbba2189f6bf692e4e99e4342342242515289596cc14e39d7794486ebda4e1a",
  "./plugins/LoadingScreen.min.js": "8e4ed7bde63ee1505820ef7f7287154beeeb42d757316e79ad58b36477dc686e",
  "./plugins/LocalClient.js": "62886ed824f7bc714cde5664ecca9447e6d2a047eb65b5309f2dad765cef746e",
  "./plugins/LocalClient.min.js": "a681769ec3ebbd160693301d2780545f63629098867abbeaad8a3880694a04ea",
  "./plugins/Markup.js": "fcddabcc31984abd6133fa7ab85e1c7a78046382bd27dc0cbab839178dbaac89",
  "./plugins/Markup.min.js": "588be237351529a03c0e6e237bc9a14786b7b833f653bbf9ec4ab4c83fbee7bd",
  "./plugins/MatterPhysics.js": "5178aad694dc5b2de5cf7fe9bf2e5c26bd0e70dcffa53a5734a9ee6ad5645771",
  "./plugins/MatterPhysics.min.js": "97242c00f48c93a2ea854405db5a9e6568229d2017a8149998869dc1527c3313",
  "./plugins/Midi.js": "3c8b738ed48341c4221cf20e53f631907935bdf722ebbcafb2dee3a40f544fba",
  "./plugins/Midi.min.js": "5ef8a15f87866a63e014ecbf3433f93a6c463c26d48a1c3a4448604ee8b5d229",
  "./plugins/MidiGUI.js": "7dc1d8d9bd9fb458409f803e86667468b6d25563c08234a19d24cd733fb9af55",
  "./plugins/MidiGUI.min.js": "ceb780abf5f2fadc904cbb683dde98548db60f5bdf0f90f1398728c76a0f923f",
  "./plugins/Mouse.js": "35764079e8639081a1f97a40491b4400f8126358cc99e21780cbcd4e03e0f45e",
  "./plugins/Mouse.min.js": "936fe343f2dec3d9673f06c9e76bf9de86449d7e7272a758e3de954ba5243334",
  "./plugins/PingTime.js": "df3ff245078e918c5c09e017266c29e58973a6b97e025c931bc25af0cc176ffe",
  "./plugins/PingTime.min.js": "df610dd9876c1b43e3c3a1e7c36273842332b0a51b2f33a150ec926f8155bca0",
  "./plugins/Platform.js": "3c8a9709aaf415909d0ef153afc23824bd7f0de575e7ffac900f6abc4747141b",
  "./plugins/Platform.min.js": "a365b9ef1e0c90663cbf6bc7d2f732fc7a9d85840e37a3f89740ff6e2ff73c5b",
  "./plugins/Player.js": "cee710c93985f83dbefc341b8d7fcdcbab2515b5533c58f833559df0d94791c8",
  "./plugins/Player.min.js": "c9ee861c565a6139f87151cf4561b98b3edbfd511431acc3ac17d64259a08b7b",
  "./plugins/PluginExplorer.js": "10a1a744380c0e425c603cf05156a6f12b7f0365daacf4b3765d88789d3e2bf4",
  "./plugins/PluginExplorer.min.js": "e03f9fe01aa34fb485508b56c3c79607cc86d17d1236712325bca6cea80cc423",
  "./plugins/PluginsGUI.js": "c8259a06f4fe79bf42c8365d224d542da67100c0a66d4bf9d1eb45256363295b",
  "./plugins/PluginsGUI.min.js": "867f4f3d9fd64ea14335531454551f63d84e9b78058c07035da2bb33af7ebd30",
  "./plugins/RBush.js": "138a0ea04d269a7872393fb6e4c4b2b3d766381d8db0d65a59e06efe6a73957b",
  "./plugins/RBush.min.js": "1b87b4df682d7b5b6d0d249583871a1e5058d4697efe7e1d38f5ef47d4dd8f81",
  "./plugins/RadialMenu.js": "4151c73e5be8a17f8d3fd44c218a323fd36c3ed120eb27a6829f2305b1f00d62",
  "./plugins/RadialMenu.min.js": "2091b1073a9d3e41d2133c7cc4ec5b22fb8dae4a9f0c255a013e72842bc315a9",
  "./plugins/Radio.js": "f942470e3247bc192bca7713e77549ed8e7f8e990eaca65b6af0413651b2a77c",
  "./plugins/Radio.min.js": "cc039b7b38781356c7a5e3b603f476d81c9d5787d525a0221e13efbe98d513cb",
  "./plugins/Range.js": "70ee15e4608edd602bd2e931d268da8d2e613ee9dd49d96793ebdf9da0197523",
  "./plugins/Range.min.js": "0c4743bd74df70a2e7bf9486077dce5611e215a898aa6ba9f418edf9b534f171",
  "./plugins/Scoreboard.js": "7556ebd8c54d1d05466c4e857ba0608bfb1e60fc86925dd01183a52c5dc6f6ca",
  "./plugins/Scoreboard.min.js": "f79d065a822319e0c74c3e36a1f17da4cae47c66b9770e1f10e9075fd40ab436",
  "./plugins/Select.js": "0cf2274922e92b4a32b69f6f09ab131949360bc9e936c175dfabe49a431664bc",
  "./plugins/Select.min.js": "c4165a53da1a46cc9d27cfe2fa513903144468d37fd93d861a82c6f0a83d0c6a",
  "./plugins/StarField.js": "d33e4ee1e02b8719edc5b7988b3eb2ded91a214dc911b3d800b52bfe19572669",
  "./plugins/StarField.min.js": "302c7e8878c277e6d3dc553ca7767fc98e16f66a8964c1a74cf7e4b972892467",
  "./plugins/SwitchGraphics.js": "434f7480586ccdff9d28745b90d685baa06c53252069c0d8d2b7dbf4fe5a2b8c",
  "./plugins/SwitchGraphics.min.js": "85d763b07cd52596ccc910761ac2ee786e11b5cc42fb6ff332b6be879cdf14ee",
  "./plugins/Sword.js": "4ed88fd1e3f9fafe239d88db8b3bb3ee1189fff9c7b3c9ff54ac9b151c58fd32",
  "./plugins/Sword.min.js": "68708f6deb1b0b7de5a4fda1eabf50f1bc12d2a97433b491a72deabba506e33d",
  "./plugins/Teleporter.js": "4cdc7c735cb9e3186e97638406a7dd6eaa558f37edd2532439ae059cd08f21f4",
  "./plugins/Teleporter.min.js": "efadbc9c29dd46daa59800ebe49e913513ae9d261aef961d306b8c366b915469",
  "./plugins/Text.js": "eeb50f1cffc6e0f781a77bf982ed046d02b817c572e40c4cb9da1467f3f82e5d",
  "./plugins/Text.min.js": "388b6baebbe73c0d0d736442ecc04cf00b383660c6c7bd87b3d2c554bae69d86",
  "./plugins/Textarea.js": "a9f16f27cf2721e3d75a504fd5ae68cb8238d945ac7dbb10f3787d7a12d680bb",
  "./plugins/Textarea.min.js": "4ee950d2815ee75c63ae64b260f4b95ffbce227a37ca58a9596d2a317a56b03b",
  "./plugins/TileSet.js": "730987abc1a69c466047444b005ed25d49a6c3dab03c8128701e086e29eb6c57",
  "./plugins/TileSet.min.js": "9a83b80581a1611b7f34e2f8cc4fe9e4eef910ea55372a19a0eda54eb2033649",
  "./plugins/Tone.js": "d108292b7b9ca54609200b15005a28d4f4c7ba83f882e62b1e3e01f85a3b5d86",
  "./plugins/Tone.min.js": "acfc53c580afb09c8de27813cf407450c63a77068ad6fc5d7f996b854e825ca9",
  "./plugins/Tower.js": "5efe4026709064ff3fc7036f8880fd43572c9b2521a0f4d77d90e432d4980644",
  "./plugins/Tower.min.js": "6c37a14ae5c2afd4f8a617f194ad7407826cac8d3f6f5f876a9a2d3394655bc6",
  "./plugins/UnitSpawner.js": "7838dd890c8a7413d9117819e4ad5d79363c363efd9548d260ff0b53d7256bda",
  "./plugins/UnitSpawner.min.js": "9337e00ad6649b3a726d4b9f03458c4dc3f24fd0e7325d1a80dafbfba9921d21"
};

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
            if (!(game._plugins[pluginId] || game.systems[pluginId])) {
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
                    // Load unminified version of the plugin
                    scriptUrl = "".concat(basePath).concat(pluginId, ".js");
                    if (game.config.useMinBuilds) {
                      //scriptUrl = `${basePath}${pluginId}.min.js`;
                    }
                    _context.next = 5;
                    return game.loadPluginScript(scriptUrl);
                  case 5:
                    console.log("Loaded: ".concat(pluginId));
                    if (!((typeof PLUGINS === "undefined" ? "undefined" : _typeof(PLUGINS)) === 'object' && PLUGINS[pluginId])) {
                      _context.next = 12;
                      break;
                    }
                    pluginInstance = new PLUGINS[pluginId]["default"](options);
                    _context.next = 10;
                    return handlePluginInstance(game, pluginInstance, pluginId, options, cb);
                  case 10:
                    _context.next = 14;
                    break;
                  case 12:
                    console.log('Warning: PLUGINS object not found, cannot load plugin', pluginId);
                    throw new Error('PLUGINS object not found, cannot load plugin');
                  case 14:
                    _context.next = 23;
                    break;
                  case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](0);
                    console.error("Error loading plugin ".concat(pluginId, ":"), _context.t0);
                    game._plugins[pluginId] = {
                      status: 'error'
                    };
                    game.loadingPluginsCount--;
                    cb(_context.t0);
                    throw _context.t0;
                  case 23:
                    _context.prev = 23;
                    // Remove the promise from the tracking object once it's settled
                    delete game.loadingPluginPromises[pluginId];
                    return _context.finish(23);
                  case 26:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 16, 23, 26]]);
            }))();
            _context2.next = 28;
            break;
          case 20:
            if (pluginInstanceOrId.id) {
              _context2.next = 23;
              break;
            }
            console.log('Error with pluginInstance', pluginInstanceOrId);
            throw new Error('All plugins must have a static id property');
          case 23:
            if (!game.systems[pluginInstanceOrId.id]) {
              _context2.next = 25;
              break;
            }
            return _context2.abrupt("return");
          case 25:
            game.loadingPluginsCount++;
            _context2.next = 28;
            return handlePluginInstance(game, pluginInstanceOrId, pluginInstanceOrId.id, options, cb);
          case 28:
            return _context2.abrupt("return", game);
          case 29:
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
          if (!game.systems[pluginInstance.id]) {
            _context3.next = 3;
            break;
          }
          // Remark: 3/4/2024 - Previously we were letting double used plugins progress further,
          //                    down the code path for initialization below, this seemed incorrect.
          //                    The current approach is to return early and call the original plugins .init() method
          //                    The reasoning here is that most plugins are designed to not mutate game on init(),
          //                    but some plugins it makes sense ( like Editor / Modal windows / anything that toggles state )
          //                    An alternate solution would be to implement something like `toggle()` or `reload()` method for all plugins
          game.loadingPluginsCount--;
          //game.systems[pluginInstance.id].init(game, game.engine, game.scene);
          return _context3.abrupt("return");
        case 3:
          if (typeof pluginInstance.build === 'function') {
            extendEntityBuilder(game, pluginInstance);
          }
          pluginGameSceneMethods(game, pluginInstance);
          game.loadedPlugins.push(pluginId);
          if (!pluginInstance.preload) {
            _context3.next = 11;
            break;
          }
          _context3.next = 9;
          return pluginInstance.preload(game);
        case 9:
          _context3.next = 11;
          return game.awaitAllPlugins();
        case 11:
          pluginInstance.init(game, game.engine, game.scene);
          game._plugins[pluginId] = pluginInstance;
          delete game._plugins[pluginId];
          game.emit("plugin::loaded::".concat(pluginId), pluginInstance);
          game.emit('plugin::loaded', pluginId);
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
          // Remark: Wait until all logic is process before continuing
          cb();
        case 22:
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadPluginsFromConfig;
var _LoadingScreen = _interopRequireDefault(require("../plugins/loading-screen/LoadingScreen.js"));
var _GhostTyper = _interopRequireDefault(require("../plugins/typer-ghost/GhostTyper.js"));
var _Physics = _interopRequireDefault(require("../plugins/physics/Physics.js"));
var _FlashMessage = _interopRequireDefault(require("../plugins/message-flash/FlashMessage.js"));
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
    markup = _ref.markup,
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
    if (!this.systems['loading-screen']) {
      this.use(new _LoadingScreen["default"]({
        minLoadTime: gameConfig.minLoadTime
      }));
    }
  }
  if (!this.systems['message-flash'] && !this.isServer) {
    this.use(new _FlashMessage["default"]());
    // check if gameroot does not contain yantra.gg string,
    // if so game.flashText() the value
    if (!this.isServer && this.config.warnNonYantraGameRoot) {
      if (this.gameRoot && this.gameRoot.indexOf('yantra.gg') === -1) {
        this.flashMessage('GameRoot is not yantra.gg, this may cause issues with loading assets and scripts');
      }
    }
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
    if (markup) {
      this.use('Markup');
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

},{"../plugins/loading-screen/LoadingScreen.js":28,"../plugins/message-flash/FlashMessage.js":29,"../plugins/physics/Physics.js":30,"../plugins/typer-ghost/GhostTyper.js":32}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./MemoryBackend.js":22}],24:[function(require,module,exports){
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
                // if the world has the optional custom .unload() method, call it
                world.unload();
              }
              // unload the world itself as plugin
              game.unload(world.id);
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

          // switching player to already constructed plugin classes
          if (!(_typeof(selectedWorld) === 'object')) {
            _context.next = 8;
            break;
          }
          game.systems.entity.removeAllEntities();
          game.use(selectedWorld);
          return _context.abrupt("return");
        case 8:
          game.systems.entity.removeAllEntities(true);
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
        paddingTop: '10px',
        // Adjust the padding to center the loading screen
        left: '10px',
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
        fontWeight: 'bold',
        left: '40px',
        position: 'absolute'
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

},{}],29:[function(require,module,exports){
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
var Flash = /*#__PURE__*/function () {
  function Flash() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Flash);
    this.id = Flash.id;
    this.defaultDuration = config.defaultDuration || 3000; // Default duration in milliseconds
    this.flashContainer = null; // Will hold the container for flash messages
    // Default style properties
    this.style = _objectSpread({
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: '1000'
    }, config.style);
    // Style for different types of messages
    this.typeStyles = {
      error: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white'
      },
      warn: {
        backgroundColor: 'rgba(255, 255, 0, 0.7)',
        color: 'black'
      },
      info: {
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        color: 'white'
      },
      success: {
        backgroundColor: 'rgba(0, 255, 0, 0.7)',
        color: 'white'
      }
    };
  }
  _createClass(Flash, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      this.game.flashMessage = this.showMessage.bind(this);
      this.createFlashContainer();
    }
  }, {
    key: "createFlashContainer",
    value: function createFlashContainer() {
      if (!this.flashContainer) {
        this.flashContainer = document.createElement('div');
        this.flashContainer.id = 'flash-messages-container';
        Object.assign(this.flashContainer.style, this.style);
        document.body.appendChild(this.flashContainer);
      }
    }
  }, {
    key: "showMessage",
    value: function showMessage(content) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultDuration;
      var messageElement = document.createElement('div');
      var messageType = 'info'; // Default type
      var messageText = content;

      // If content is an object, extract type, message, style, and override duration if provided
      if (_typeof(content) === 'object' && content !== null) {
        messageType = content.type || messageType;
        messageText = content.message || messageText;
        if (content.sticky !== true) {
          duration = content.hasOwnProperty('duration') ? content.duration : duration;
        } else {
          duration = null;
        }
      }

      // Apply type style if it exists, otherwise default to empty object
      var typeStyle = this.typeStyles[messageType] || {};

      // Apply default styles and type-specific styles first
      Object.assign(messageElement.style, {
        cursor: 'pointer',
        margin: '5px 0',
        fontSize: '24px',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        // Needed to position the close button absolutely within the message
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }, typeStyle);

      // Then override with custom styles if provided
      if (_typeof(content) === 'object' && content.style) {
        Object.assign(messageElement.style, content.style);
      }

      // Add message text
      var textSpan = document.createElement('span');
      textSpan.innerHTML = messageText;
      messageElement.appendChild(textSpan);

      // Allow the message to be closed by clicking anywhere on it
      messageElement.onclick = function () {
        return messageElement.remove();
      };
      this.flashContainer.appendChild(messageElement);

      // Automatically remove the message after the duration, if duration is provided
      if (duration !== null) {
        setTimeout(function () {
          messageElement.remove();
        }, duration);
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.flashContainer) {
        this.flashContainer.remove();
        this.flashContainer = null;
      }
    }
  }]);
  return Flash;
}();
_defineProperty(Flash, "id", 'flash');
var _default = exports["default"] = Flash;

},{}],30:[function(require,module,exports){
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

},{"./applyGravity.js":31}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

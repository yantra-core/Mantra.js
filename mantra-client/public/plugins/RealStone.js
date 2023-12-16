(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).RealStone = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Actuator", {
  enumerable: true,
  get: function get() {
    return _Actuator["default"];
  }
});
Object.defineProperty(exports, "Amplifier", {
  enumerable: true,
  get: function get() {
    return _Amplifier["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _Button["default"];
  }
});
Object.defineProperty(exports, "ElectricalSignal", {
  enumerable: true,
  get: function get() {
    return _ElectricalSignal["default"];
  }
});
Object.defineProperty(exports, "LEDLight", {
  enumerable: true,
  get: function get() {
    return _LEDLight["default"];
  }
});
Object.defineProperty(exports, "LaserSensor", {
  enumerable: true,
  get: function get() {
    return _LaserSensor["default"];
  }
});
Object.defineProperty(exports, "Mirror", {
  enumerable: true,
  get: function get() {
    return _Mirror["default"];
  }
});
Object.defineProperty(exports, "MotionDetector", {
  enumerable: true,
  get: function get() {
    return _MotionDetector["default"];
  }
});
Object.defineProperty(exports, "PressureSensor", {
  enumerable: true,
  get: function get() {
    return _PressureSensor["default"];
  }
});
Object.defineProperty(exports, "RealStone", {
  enumerable: true,
  get: function get() {
    return _RealStone["default"];
  }
});
Object.defineProperty(exports, "Repeater", {
  enumerable: true,
  get: function get() {
    return _Repeater["default"];
  }
});
Object.defineProperty(exports, "Rover", {
  enumerable: true,
  get: function get() {
    return _Rover["default"];
  }
});
Object.defineProperty(exports, "Wire", {
  enumerable: true,
  get: function get() {
    return _Wire["default"];
  }
});
var _RealStone = _interopRequireDefault(require("./lib/RealStone.js"));
var _ElectricalSignal = _interopRequireDefault(require("./lib/signals/ElectricalSignal.js"));
var _Actuator = _interopRequireDefault(require("./lib/parts/Actuator.js"));
var _Amplifier = _interopRequireDefault(require("./lib/parts/Amplifier.js"));
var _Button = _interopRequireDefault(require("./lib/parts/Button.js"));
var _LaserSensor = _interopRequireDefault(require("./lib/parts/LaserSensor.js"));
var _LEDLight = _interopRequireDefault(require("./lib/parts/LEDLight.js"));
var _Mirror = _interopRequireDefault(require("./lib/parts/Mirror.js"));
var _MotionDetector = _interopRequireDefault(require("./lib/parts/MotionDetector.js"));
var _PressureSensor = _interopRequireDefault(require("./lib/parts/PressureSensor.js"));
var _Repeater = _interopRequireDefault(require("./lib/parts/Repeater.js"));
var _Rover = _interopRequireDefault(require("./lib/parts/Rover.js"));
var _Wire = _interopRequireDefault(require("./lib/parts/Wire.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./lib/RealStone.js":3,"./lib/parts/Actuator.js":4,"./lib/parts/Amplifier.js":5,"./lib/parts/Button.js":6,"./lib/parts/LEDLight.js":7,"./lib/parts/LaserSensor.js":8,"./lib/parts/Mirror.js":9,"./lib/parts/MotionDetector.js":10,"./lib/parts/PressureSensor.js":11,"./lib/parts/Repeater.js":12,"./lib/parts/Rover.js":13,"./lib/parts/Wire.js":14,"./lib/signals/ElectricalSignal.js":15}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Part = void 0;
var _EventEmitter2 = _interopRequireDefault(require("./utils/EventEmitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Part = exports.Part = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Part, _EventEmitter);
  var _super = _createSuper(Part);
  function Part() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, Part);
    _this = _super.call(this);
    _this.id = Part.idCounter++; // Assign a unique ID and increment the counter
    _this.position = {
      x: x,
      y: y,
      z: z
    };
    _this.size = {
      width: 64,
      height: 64,
      depth: 64
    }; // Fixed size for each part
    _this.props = {}; // Properties specific to each part
    return _this;
  }

  // Additional methods or properties common to all parts can be added here
  return _createClass(Part);
}(_EventEmitter2["default"]);
// for now, could also be a base Part class
_defineProperty(Part, "idCounter", 0);

},{"./utils/EventEmitter.js":16}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EventEmitter2 = _interopRequireDefault(require("./utils/EventEmitter.js"));
var _Wire = _interopRequireDefault(require("./parts/Wire.js"));
var _PressureSensor = _interopRequireDefault(require("./parts/PressureSensor.js"));
var _LEDLight = _interopRequireDefault(require("./parts/LEDLight.js"));
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
var RealStone = /*#__PURE__*/function (_EventEmitter) {
  _inherits(RealStone, _EventEmitter);
  var _super = _createSuper(RealStone);
  function RealStone() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$powerRequired = _ref.powerRequired,
      powerRequired = _ref$powerRequired === void 0 ? false : _ref$powerRequired;
    _classCallCheck(this, RealStone);
    _this = _super.call(this);
    _this.parts = [];
    _this.powerRequired = powerRequired;
    return _this;
  }
  _createClass(RealStone, [{
    key: "addPart",
    value: function addPart(part) {
      var _this2 = this;
      this.parts.push(part);
      if (part instanceof _EventEmitter2["default"]) {
        part.onAny(function (eventName) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          // Forward the part's events to the RealStone instance
          _this2.emit.apply(_this2, [eventName].concat(args));
        });
        if (typeof part.setRealStone === 'function') {
          part.setRealStone(this);
        }
      }
    }
  }, {
    key: "findpart",
    value: function findpart(partType) {
      return this.parts.find(function (part) {
        return part instanceof partType;
      });
    }

    // Method to toggle power requirements globally
  }, {
    key: "setPowerRequired",
    value: function setPowerRequired(enforce) {
      this.config.powerRequired = enforce;
    }

    // Modified connect method to handle connections across contraptions
  }, {
    key: "connect",
    value: function connect(targetComponent) {
      // Check if the target component belongs to another RealStone instance
      if (targetComponent instanceof RealStoneComponent && this.realStone !== targetComponent.realStone) {
        // Implement logic to handle inter-contraption connections
        // This could involve using a global event emitter or a direct reference
      } else {
        // Regular connection logic for components within the same RealStone instance
      }
    }
  }, {
    key: "run",
    value: function run() {
      // Logic to simulate the circuit behavior
      // This can be as simple or complex as needed, depending on the simulation requirements
    }
  }, {
    key: "tick",
    value: function tick() {
      // Logic to update the state of the system at each tick
      this.parts.forEach(function (part) {
        if (typeof part.update === 'function') {
          part.update();
        }
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this3 = this;
      return {
        powerRequired: this.powerRequired,
        parts: this.parts.map(function (part) {
          return {
            type: part.constructor.name,
            properties: _this3.getPartProperties(part),
            connections: _this3.getPartConnections(part),
            position: part.position,
            size: part.size
          };
        })
      };
    }
  }, {
    key: "getPartProperties",
    value: function getPartProperties(part) {
      // console.log("getPartProperties", part)
      // Serialize only relevant properties for each part
      // Example: { setting1: part.setting1, setting2: part.setting2 }
      // Customize based on the properties of each part type
      var properties = {};
      if (part.props) {
        for (var prop in part.props) {
          properties[prop] = part.props[prop];
        }
      }

      // Add logic to extract relevant properties
      return properties;
    }
  }, {
    key: "getPartConnections",
    value: function getPartConnections(part) {
      // console.log("getPartConnections", part)
      var connections = [];
      if (!part.connectedParts) {
        return connections;
      }
      part.connectedParts.forEach(function (connectedPart) {
        // console.log("connectedPart", connectedPart)
        // Serialize only relevant connection information for each part
        connections.push({
          id: connectedPart.id,
          type: connectedPart.constructor.name
        });
      });
      // Serialize connections in a non-circular manner
      // Example: return part.connectedParts.map(connectedPart => connectedPart.id);
      // Adjust based on how you're tracking connections
      // Add logic to extract connection information
      return connections;
    }
  }]);
  return RealStone;
}(_EventEmitter2["default"]);
var _default = exports["default"] = RealStone;

},{"./parts/LEDLight.js":7,"./parts/PressureSensor.js":11,"./parts/Wire.js":14,"./utils/EventEmitter.js":16}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Actuator = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Actuator, _Part);
  var _super = _createSuper(Actuator);
  function Actuator() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$frequency = _ref.frequency,
      frequency = _ref$frequency === void 0 ? 1000 : _ref$frequency;
    _classCallCheck(this, Actuator);
    // frequency in milliseconds
    _this = _super.call(this, x, y, z);
    _this.type = Actuator.type;
    _this.isActive = false;
    _this.frequency = frequency;
    _this.pulseTimer = null;
    _this.connectedParts = [];
    return _this;
  }
  _createClass(Actuator, [{
    key: "connect",
    value: function connect(component) {
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      this.signal = signal;
      this.toggleState();
    }
  }, {
    key: "toggleState",
    value: function toggleState() {
      this.isActive = !this.isActive;
      if (this.isActive) {
        this.startPulsing();
        this.emit('activate');
      } else {
        this.stopPulsing();
        this.emit('deactivate');
      }
    }
  }, {
    key: "startPulsing",
    value: function startPulsing() {
      var _this2 = this;
      if (this.pulseTimer === null) {
        this.pulseTimer = setInterval(function () {
          _this2.update();
        }, this.frequency);
      }
    }
  }, {
    key: "stopPulsing",
    value: function stopPulsing() {
      if (this.pulseTimer !== null) {
        clearInterval(this.pulseTimer);
        this.pulseTimer = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;
      if (this.isActive) {
        // Perform actions while the actuator is active
        this.connectedParts.forEach(function (comp) {
          return comp.receive(_this3.signal);
        });
      }
    }
  }]);
  return Actuator;
}(_Part2.Part);
_defineProperty(Actuator, "type", 'Actuator');

},{"../Part.js":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Amplifier = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Amplifier, _Part);
  var _super = _createSuper(Amplifier);
  function Amplifier() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$amplitude = _ref.amplitude,
      amplitude = _ref$amplitude === void 0 ? 2 : _ref$amplitude;
    _classCallCheck(this, Amplifier);
    if (_typeof(x) === 'object') {
      amplitude = x.amplitude || amplitude;
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    _this = _super.call(this, x, y, z);
    _this.type = Amplifier.type;
    _this.connectedParts = [];
    _this.amplitude = amplitude;
    return _this;
  }
  _createClass(Amplifier, [{
    key: "connect",
    value: function connect(component) {
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      signal.current = signal.current * this.amplitude;
      // console.log('sending along', signal)
      // Transmit the amplified signal
      this.transmit(signal);
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.connectedParts.forEach(function (component) {
        if (component.receive) {
          component.receive(signal);
        }
      });
    }

    // Optional: Add an update() method if the Amplifier has dynamic behavior
  }, {
    key: "update",
    value: function update() {
      // Update logic for the Amplifier, if any
    }
  }]);
  return Amplifier;
}(_Part2.Part);
_defineProperty(Amplifier, "type", 'Amplifier');

},{"../Part.js":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
var _ElectricalSignal = _interopRequireDefault(require("../signals/ElectricalSignal.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Button = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Button, _Part);
  var _super = _createSuper(Button);
  function Button() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, Button);
    _this = _super.call(this, x, y, z);
    _this.type = Button.type;
    _this.connectedComponent = null;
    _this.signal = new _ElectricalSignal["default"]();
    _this.connectedParts = [];
    _this.toggleDelay = 100; // Delay for debounce
    _this.autoReleaseDelay = 500; // Delay for auto-release
    _this.lastToggle = 0;
    _this.pressTimer = null; // Timer for auto-release
    return _this;
  }
  _createClass(Button, [{
    key: "setRealStone",
    value: function setRealStone(realStone) {
      this.realStone = realStone;
    }
  }, {
    key: "connect",
    value: function connect(component) {
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "press",
    value: function press() {
      var _this2 = this;
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      var currentTime = Date.now();

      // Debounce: check if enough time has passed since the last press
      if (currentTime - this.lastToggle < this.toggleDelay) {
        return; // Not enough time has passed, so exit the function
      }

      // Update the last toggle time
      this.lastToggle = currentTime;

      // Emit press event and send signal
      // console.log('Button.press', signal);
      this.emit('press', signal);
      this.connectedParts.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function') {
          component.receive(signal);
        }
      });

      // Clear existing timer if any
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
      }

      // Set a timer for auto-release
      this.pressTimer = setTimeout(function () {
        _this2.release();
        _this2.pressTimer = null;
      }, this.autoReleaseDelay);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      this.transmit(signal);
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.connectedParts.forEach(function (component) {
        if (component.receive) {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "release",
    value: function release() {
      var _this3 = this;
      this.emit('release');
      // console.log('Button released');

      // Notify connected components
      this.connectedParts.forEach(function (component) {
        if (component.off && typeof component.off === 'function') {
          // Optionally, you can send a release signal
          component.off(_this3.signal);
        }
      });
    }
  }]);
  return Button;
}(_Part2.Part);
_defineProperty(Button, "type", 'Button');

},{"../Part.js":2,"../signals/ElectricalSignal.js":15}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var LEDLight = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(LEDLight, _Part);
  var _super = _createSuper(LEDLight);
  function LEDLight() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$wattage = _ref.wattage,
      wattage = _ref$wattage === void 0 ? 40 : _ref$wattage,
      _ref$maxWattage = _ref.maxWattage,
      maxWattage = _ref$maxWattage === void 0 ? 120 : _ref$maxWattage;
    _classCallCheck(this, LEDLight);
    // curry the constructor to allow for multiple API styles
    if (_typeof(x) === 'object') {
      wattage = x.wattage || wattage;
      maxWattage = x.maxWattage || maxWattage;
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    _this = _super.call(this, x, y, z);
    _this.type = LEDLight.type;
    _this.wattage = wattage;
    _this.maxWattage = maxWattage;
    _this.isOn = false; // Property to track the LED light's state
    _this.isBroken = false; // Property to track if the light is broken
    return _this;
  }
  _createClass(LEDLight, [{
    key: "setRealStone",
    value: function setRealStone(realStone) {
      this.realStone = realStone;
    }
  }, {
    key: "off",
    value: function off(signal) {
      // console.log('Turning off LED light...');
      this.isOn = false;
      this.emit('off');
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Check if the light is broken
      if (this.isBroken) {
        // console.log('LED light is broken and cannot be turned on.');
        return;
      }
      this.signal = signal;
      var power = signal.calculatePower();

      // Check for exceeding maxWattage
      if (power > this.maxWattage) {
        // console.log('LED light has broken due to excessive power!');
        this.isOn = false;
        this.isBroken = true; // Permanently disable the light
        this.emit('broken');
        return;
      }
      if (this.isOn) {
        // console.log('Turning off LED light...');
        this.isOn = false;
        this.emit('off');
      } else {
        if (!this.realStone.powerRequired || power >= this.wattage) {
          // console.log('Turning on LED light...', signal);
          this.isOn = true;
          this.emit('on');
        } else {
          // console.log('Insufficient power to turn on LED light...')
        }
      }
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(entity) {
      // Check if the light is broken
      if (this.isBroken) {
        // console.log('LED light is broken and cannot be turned on.');
        return;
      }

      // Check if the entity is a Rover
      if (entity.type === 'Rover') {
        // console.log('LED light has broken due to collision with Rover!');
        this.isOn = false;
        this.isBroken = true; // Permanently disable the light
        this.props.color = 'grey';
        this.emit('broken');
      }
    }

    // Optionally, include an update method if you need dynamic behavior at each system tick
  }, {
    key: "update",
    value: function update() {
      // Add dynamic effects like blinking or fading if the light is not broken
      if (!this.isBroken) {
        // Your update logic here
      }
    }
  }]);
  return LEDLight;
}(_Part2.Part);
_defineProperty(LEDLight, "type", 'LEDLight');

},{"../Part.js":2}],8:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EventEmitter2 = _interopRequireDefault(require("../utils/EventEmitter.js"));
var _ElectricalSignal = _interopRequireDefault(require("../signals/ElectricalSignal.js"));
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
var LaserSensor = exports["default"] = /*#__PURE__*/function (_EventEmitter) {
  _inherits(LaserSensor, _EventEmitter);
  var _super = _createSuper(LaserSensor);
  function LaserSensor() {
    var _this;
    _classCallCheck(this, LaserSensor);
    _this = _super.call(this);
    _this.connectedComponent = null;
    // Laser signal can be represented by a specific ElectricalSignal
    _this.laserSignal = new _ElectricalSignal["default"]({
      voltage: 5,
      current: 0.1
    }); // Example values
    return _this;
  }
  _createClass(LaserSensor, [{
    key: "connect",
    value: function connect(component) {
      this.connectedComponent = component;
    }
  }, {
    key: "emitLaser",
    value: function emitLaser() {
      if (this.connectedComponent) {
        // console.log('LaserSensor: Emitting laser signal.');
        this.connectedComponent.receive(this.laserSignal);
      }
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Handle received signal if needed
      // For instance, checking if the laser hits a target
    }
  }]);
  return LaserSensor;
}(_EventEmitter2["default"]);

},{"../signals/ElectricalSignal.js":15,"../utils/EventEmitter.js":16}],9:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EventEmitter2 = _interopRequireDefault(require("../utils/EventEmitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
var Mirror = exports["default"] = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Mirror, _EventEmitter);
  var _super = _createSuper(Mirror);
  function Mirror() {
    var _this;
    _classCallCheck(this, Mirror);
    _this = _super.call(this);
    _this.connectedComponent = null;
    _this.orientation = 0; // Represents the angle or orientation of the mirror
    return _this;
  }
  _createClass(Mirror, [{
    key: "connect",
    value: function connect(component) {
      this.connectedComponent = component;
    }
  }, {
    key: "setOrientation",
    value: function setOrientation(angle) {
      this.orientation = angle;
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Check if the signal is a laser signal
      if (signal.constructor.name === 'LightSignal') {
        console.log("Mirror: Reflecting laser at orientation ".concat(this.orientation, " degrees."));
        if (this.connectedComponent) {
          // Modify the signal as needed based on the mirror's properties
          var reflectedSignal = _objectSpread(_objectSpread({}, signal), {}, {
            direction: this.calculateReflectionDirection(signal.direction)
          });
          this.connectedComponent.receive(reflectedSignal);
        }
      }
    }
  }, {
    key: "calculateReflectionDirection",
    value: function calculateReflectionDirection(incomingDirection) {
      // Simplified example of calculating reflection direction based on mirror orientation
      return (incomingDirection + 2 * this.orientation) % 360;
    }
  }]);
  return Mirror;
}(_EventEmitter2["default"]);

},{"../utils/EventEmitter.js":16}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
var _ElectricalSignal = _interopRequireDefault(require("../signals/ElectricalSignal.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var MotionDetector = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(MotionDetector, _Part);
  var _super = _createSuper(MotionDetector);
  function MotionDetector() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, MotionDetector);
    _this = _super.call(this, x, y, z);
    _this.type = MotionDetector.type;
    _this.isConnected = false;
    _this.connectedParts = [];
    return _this;
  }
  _createClass(MotionDetector, [{
    key: "connect",
    value: function connect(component) {
      this.isConnected = true;
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "detectMotion",
    value: function detectMotion() {
      if (this.isConnected) {
        // Create an ElectricalSignal instance for USB data transmission
        var signal = new _ElectricalSignal["default"]({
          voltage: 5
        }); // Example base voltage
        signal.encodeUSB(1); // Encoding a binary '1' to indicate motion detection
        console.log('Motion detected!');
        this.transmit(signal);
        this.emit('motion');
      } else {
        console.log('Motion detector is not connected to any component.');
      }
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.connectedParts.forEach(function (component) {
        if (typeof component.receive === 'function') {
          component.receive(signal);
        }
      });
    }

    // Optional: Add update method for dynamic behavior, e.g., periodically checking for motion
  }, {
    key: "update",
    value: function update() {
      // Logic to periodically check for motion
    }
  }]);
  return MotionDetector;
}(_Part2.Part);
_defineProperty(MotionDetector, "type", 'MotionDetector');

},{"../Part.js":2,"../signals/ElectricalSignal.js":15}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ElectricalSignal = _interopRequireDefault(require("../signals/ElectricalSignal.js"));
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PressureSensor = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(PressureSensor, _Part);
  var _super = _createSuper(PressureSensor);
  function PressureSensor() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, PressureSensor);
    _this = _super.call(this, x, y, z);
    _this.type = PressureSensor.type;
    _this.connectedParts = []; // Changed to an array to hold multiple connections
    _this.signal = new _ElectricalSignal["default"]();
    return _this;
  }
  _createClass(PressureSensor, [{
    key: "connect",
    value: function connect(component) {
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "trigger",
    value: function trigger() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      // Emit signal to all connected components
      this.emit('trigger');
      this.connectedParts.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Handle received signal if needed
      // This can be left empty or filled with logic as needed
    }
  }]);
  return PressureSensor;
}(_Part2.Part);
_defineProperty(PressureSensor, "type", 'PressureSensor');

},{"../Part.js":2,"../signals/ElectricalSignal.js":15}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Repeater = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Repeater, _Part);
  var _super = _createSuper(Repeater);
  function Repeater() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, Repeater);
    _this = _super.call(this, x, y, z);
    _this.type = Repeater.type;
    _this.connectedParts = [];
    return _this;
  }
  _createClass(Repeater, [{
    key: "connect",
    value: function connect(component) {
      if (component.constructor.name === 'Wire') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      this.transmit(signal);
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.emit('repeat', signal);
      this.connectedParts.forEach(function (component) {
        if (component.receive) {
          component.receive(signal);
        }
      });
    }

    // Optional: Add an update() method if the Repeater has dynamic behavior
  }, {
    key: "update",
    value: function update() {
      // Update logic for the Repeater, if any
    }
  }]);
  return Repeater;
}(_Part2.Part);
_defineProperty(Repeater, "type", 'Repeater');

},{"../Part.js":2}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Rover = /*#__PURE__*/function (_Part) {
  _inherits(Rover, _Part);
  var _super = _createSuper(Rover);
  function Rover() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$velocity = _ref.velocity,
      velocity = _ref$velocity === void 0 ? {
        x: 5,
        y: 5
      } : _ref$velocity,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 0xcccccc : _ref$color;
    _classCallCheck(this, Rover);
    _this = _super.call(this, x, y, z);
    _this.type = Rover.type;
    _this.props = {};
    _this.props.velocity = velocity;
    _this.props.color = color;
    _this.state = 'inactive'; // Initially inactive
    _this.isOn = false; // Toggle state
    _this.movementInterval = null;
    _this.defaultDelay = 100; // Default delay rate in milliseconds
    _this.collisionCooldown = false; // Flag to indicate collision cooldown

    // Listen for collision events
    _this.on('collision', _this.handleCollision);
    return _this;
  }

  // Method to set RealStone reference
  _createClass(Rover, [{
    key: "setRealStone",
    value: function setRealStone(realStone) {
      this.realStone = realStone;
    }

    // Method to activate or deactivate the Rover
  }, {
    key: "toggleOnOff",
    value: function toggleOnOff() {
      this.isOn = !this.isOn;
      if (this.isOn) {
        this.startMoving();
      } else {
        this.stopMoving();
      }
    }

    // Method to start moving
  }, {
    key: "startMoving",
    value: function startMoving() {
      var _this2 = this;
      this.state = 'active';
      if (this.movementInterval) {
        clearInterval(this.movementInterval);
      }
      this.movementInterval = setInterval(function () {
        return _this2.update();
      }, this.defaultDelay);
    }

    // Method to stop moving
  }, {
    key: "stopMoving",
    value: function stopMoving() {
      this.state = 'inactive';
      if (this.movementInterval) {
        clearInterval(this.movementInterval);
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.state === 'active') {
        // Emit move event with current position
        this.emit('move', this.position);
        // Update position
        this.position.x += this.props.velocity.x;
        this.position.y += this.props.velocity.y;
      }
    }

    // Method to handle collision
  }, {
    key: "handleCollision",
    value: function handleCollision(collidedWith) {
      // check to see if collidedWith if type Wire, if so ignore
      if (collidedWith.name === 'Wire') return;
      if (collidedWith.name === 'Rover') return; // TODO remove

      if (this.collisionCooldown) return; // Ignore collision if in cooldown
      // console.log(collidedWith, "ROVER HAS SWITCH POSITIONS");

      // Reverse direction upon collision
      this.props.velocity.x *= -1;
      this.props.velocity.y *= -1;

      // Emit move event with new position
      this.emit('move', this.position);

      // Start collision cooldown
      this.startCollisionCooldown();
    }
  }, {
    key: "startCollisionCooldown",
    value: function startCollisionCooldown() {
      var _this3 = this;
      this.collisionCooldown = true;
      setTimeout(function () {
        _this3.collisionCooldown = false;
      }, 200); // Collision cooldown period
    }
  }]);
  return Rover;
}(_Part2.Part);
_defineProperty(Rover, "type", 'Rover');
var _default = exports["default"] = Rover;

},{"../Part.js":2}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Part2 = require("../Part.js");
var _ElectricalSignal = _interopRequireDefault(require("../signals/ElectricalSignal.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Wire = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Wire, _Part);
  var _super = _createSuper(Wire);
  function Wire() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$signalLoss = _ref.signalLoss,
      signalLoss = _ref$signalLoss === void 0 ? true : _ref$signalLoss;
    _classCallCheck(this, Wire);
    _this = _super.call(this);
    _this.type = Wire.type;
    _this.props = {
      signalLoss: signalLoss,
      resistivity: 1.68e-8,
      crossSectionalArea: 2.08e-6
    };
    _this.connectedParts = [];
    _this.segments = [];
    _this.inputs = [];
    _this.outputs = [];
    return _this;
  }
  _createClass(Wire, [{
    key: "calculateResistance",
    value: function calculateResistance(length) {
      // Resistance = resistivity * length / cross-sectional area
      return this.props.resistivity * length / this.props.crossSectionalArea;
    }
  }, {
    key: "connect",
    value: function connect(part) {
      this.connectedParts.push(part);
      this.outputs.push(part);
      this.updateSegmentLengths(part); // Update lengths for the new connection
    }
  }, {
    key: "updateSegmentLengths",
    value: function updateSegmentLengths(newPart) {
      // Calculate segment lengths for inputs
      this.calculateSegmentLengthsForPartArray(newPart, this.inputs);

      // Calculate segment lengths for outputs
      this.calculateSegmentLengthsForPartArray(newPart, this.outputs);
    }
  }, {
    key: "calculateSegmentLengthsForPartArray",
    value: function calculateSegmentLengthsForPartArray(newPart, partsArray) {
      var _this2 = this;
      partsArray.forEach(function (part) {
        if (part !== newPart) {
          var segment = _this2.calculateSegment(newPart.position, part.position);
          _this2.segments.push(segment);
        }
      });
    }
  }, {
    key: "calculateSegment",
    value: function calculateSegment(pos1, pos2) {
      // Euclidean distance between two points (x1, y1, z1) and (x2, y2, z2)
      var length = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2) + Math.pow(pos2.z - pos1.z, 2));
      return {
        input: pos1,
        output: pos2,
        length: length
      };
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      if (this.props.signalLoss) {
        signal = this.applySignalLoss(signal);
      }
      // console.log('Wire received signal: ', signal);
      this.transmit(signal);
    }
  }, {
    key: "applySignalLoss",
    value: function applySignalLoss(signal) {
      var _this3 = this;
      // Sum of all voltage drops across the wire's segments
      var totalVoltageDrop = this.segments.reduce(function (totalDrop, segment) {
        var resistance = _this3.calculateResistance(segment.length);
        return totalDrop + signal.current * resistance;
      }, 0);

      // Adjust the voltage of the signal directly
      signal.voltage = Math.max(signal.voltage - totalVoltageDrop, 0); // Ensuring voltage doesn't go below 0
      return signal;
    }
  }, {
    key: "off",
    value: function off() {
      // console.log('Turning off wire...');
      this.emit('off');
      this.connectedParts.forEach(function (part) {
        if (part.off) {
          part.off();
        }
      });
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      if (this.props.signalLoss) {
        signal = this.applySignalLoss(signal);
      }
      this.emit('transmit', signal);
      // Transmit signal to all connected parts
      this.connectedParts.forEach(function (part) {
        if (part.receive) {
          part.receive(signal);
        }
      });
    }
  }]);
  return Wire;
}(_Part2.Part);
_defineProperty(Wire, "type", 'Wire');

},{"../Part.js":2,"../signals/ElectricalSignal.js":15}],15:[function(require,module,exports){
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
var ElectricalSignal = exports["default"] = /*#__PURE__*/function () {
  function ElectricalSignal() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$voltage = _ref.voltage,
      voltage = _ref$voltage === void 0 ? 5 : _ref$voltage,
      _ref$current = _ref.current,
      current = _ref$current === void 0 ? 1 : _ref$current,
      _ref$resistance = _ref.resistance,
      resistance = _ref$resistance === void 0 ? 0 : _ref$resistance,
      _ref$capacitance = _ref.capacitance,
      capacitance = _ref$capacitance === void 0 ? 0 : _ref$capacitance,
      _ref$inductance = _ref.inductance,
      inductance = _ref$inductance === void 0 ? 0 : _ref$inductance,
      _ref$frequency = _ref.frequency,
      frequency = _ref$frequency === void 0 ? 0 : _ref$frequency,
      _ref$phaseAngle = _ref.phaseAngle,
      phaseAngle = _ref$phaseAngle === void 0 ? 0 : _ref$phaseAngle,
      _ref$powerFactor = _ref.powerFactor,
      powerFactor = _ref$powerFactor === void 0 ? 1 : _ref$powerFactor;
    _classCallCheck(this, ElectricalSignal);
    this.voltage = voltage;
    this.current = current;
    this.resistance = resistance;
    this.capacitance = capacitance;
    this.inductance = inductance;
    this.frequency = frequency;
    this.phaseAngle = phaseAngle;
    this.powerFactor = powerFactor;
  }

  // Method to calculate power, etc.
  _createClass(ElectricalSignal, [{
    key: "calculatePower",
    value: function calculatePower() {
      // Basic Power calculation for DC: P = VI
      // For AC, more complex calculations involving phaseAngle and powerFactor might be required
      return this.voltage * this.current;
    }

    // Method to encode a binary data signal using differential signaling
  }, {
    key: "encodeUSB",
    value: function encodeUSB(data) {
      // In USB 2.0, a logical '0' or '1' is represented by a voltage difference
      // between D+ and D- lines. Let's use simplified voltage levels for this.
      var differentialVoltage = data === 1 ? 0.2 : -0.2; // Example values

      // Setting D+ and D- voltages accordingly
      this.dPlusVoltage = this.voltage + differentialVoltage;
      this.dMinusVoltage = this.voltage - differentialVoltage;
    }
  }]);
  return ElectricalSignal;
}();

},{}],16:[function(require,module,exports){
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
var EventEmitter = exports["default"] = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
    this.listeners = {};
    this.anyListeners = [];
  }
  _createClass(EventEmitter, [{
    key: "onAny",
    value: function onAny(callback) {
      this.anyListeners.push(callback);
    }
  }, {
    key: "offAny",
    value: function offAny(callback) {
      this.anyListeners = this.anyListeners.filter(function (listener) {
        return listener !== callback;
      });
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (this.listeners[eventName]) {
        this.listeners[eventName] = this.listeners[eventName].filter(function (listener) {
          return listener !== callback;
        });
      }
    }
  }, {
    key: "once",
    value: function once(eventName, callback) {
      var _this = this;
      var onceWrapper = function onceWrapper() {
        _this.off(eventName, onceWrapper);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(_this, args);
      };
      this.on(eventName, onceWrapper);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var _this2 = this;
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      // Call anyListeners if they exist
      this.anyListeners.forEach(function (listener) {
        try {
          listener.call.apply(listener, [_this2, eventName].concat(args));
        } catch (error) {
          console.error("Error when executing any listener for event \"".concat(eventName, "\":"), error);
        }
      });

      // Emit to specific event listeners
      var listeners = this.listeners[eventName];
      if (listeners) {
        listeners.forEach(function (listener) {
          try {
            listener.apply(_this2, args);
          } catch (error) {
            console.error("Error when executing listener for event \"".concat(eventName, "\":"), error);
          }
        });
      }
    }
  }, {
    key: "listenerCount",
    value: function listenerCount(eventPattern) {
      return this.listeners[eventPattern] ? this.listeners[eventPattern].length : 0;
    }
  }]);
  return EventEmitter;
}();

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Plugin2 = _interopRequireDefault(require("../../Plugin.js"));
var _index = require("../../../../RealStone/index.js");
var _createEntityFromPart = _interopRequireDefault(require("./lib/createEntityFromPart.js"));
var _partEventListeners = _interopRequireDefault(require("./lib/partEventListeners.js"));
var _createWire = _interopRequireDefault(require("./lib/parts/createWire.js"));
var _securitySystemWires = _interopRequireDefault(require("./security-system-wires.js"));
var _securitySystem = _interopRequireDefault(require("./security-system.js"));
var _buttonWireLight = _interopRequireDefault(require("./button-wire-light.js"));
var _roverLight = _interopRequireDefault(require("./rover-light.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// handles input controller events and relays them to the game logic
var RealStone = /*#__PURE__*/function (_Plugin) {
  _inherits(RealStone, _Plugin);
  var _super = _createSuper(RealStone);
  function RealStone() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$contraption = _ref.contraption,
      contraption = _ref$contraption === void 0 ? null : _ref$contraption,
      _ref$contraptions = _ref.contraptions,
      contraptions = _ref$contraptions === void 0 ? null : _ref$contraptions;
    _classCallCheck(this, RealStone);
    _this = _super.call(this);
    _this.id = RealStone.id;
    _this.contraption = contraption;
    _this.contraptions = contraptions;
    _this.createEntityFromPart = _createEntityFromPart["default"].bind(_assertThisInitialized(_this));
    _this.createWire = _createWire["default"].bind(_assertThisInitialized(_this));
    _this.partEventListeners = _partEventListeners["default"].bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(RealStone, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // add the system to the systems manager
      this.game.systemsManager.addSystem(this.id, this);
      console.log('RealStone.init()', _index.RealStone);
      if (this.contraption) {
        this.initContraption(this.contraption);
      } else {
        this.initContraption((0, _roverLight["default"])());
      }
    }
  }, {
    key: "initContraption",
    value: function initContraption(contraption) {
      var _this2 = this;
      //let contraption = testLight();
      // let contraption = roverLight();
      //let contraption = testContraption();
      //let contraption = securitySystemWithWires()
      //console.log('contraption', contraption);

      contraption.onAny(function (event) {
        //console.log('onAny contraption event', event, args);
      });

      // iterate through each part and create a corresponding entity
      contraption.parts.forEach(function (part) {
        // bind any potential event listners for the part, based on the type of part
        _this2.partEventListeners(part, contraption);
        var ent = _this2.createEntityFromPart(part, contraption);
        // console.log('created entity', ent);
      });
    }

    // TODO: add support for multiple contraptions
  }, {
    key: "setContraption",
    value: function setContraption(contraption) {
      this.contraption = contraption;
      this.initContraption(contraption);
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      // console.log('real stone collisions check', pair, bodyA, bodyB)

      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;
        var entityA = this.game.entities.get(entityIdA);
        var entityB = this.game.entities.get(entityIdB);
        if (!entityA || !entityB) {
          console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
          return;
        }
        if (entityA.realStone) {
          // trigger the part if possible
          // console.log('entityA.realStone', entityA.realStone)
          if (entityA.realStone.part.trigger) {
            entityA.realStone.part.trigger();
          }
          if (entityA.realStone.part.press) {
            entityA.realStone.part.press();
          }
          if (entityA.realStone.part.detectMotion) {
            entityA.realStone.part.detectMotion();
          }
        }
        if (entityB.realStone) {
          // trigger the part if possible
          // console.log('entityB.realStone', entityB.realStone)
          if (entityB.realStone.part.trigger) {
            entityB.realStone.part.trigger();
          }
          if (entityB.realStone.part.press) {
            entityB.realStone.part.press();
          }
          if (entityB.realStone.part.detectMotion) {
            entityB.realStone.part.detectMotion();
          }
        }
      }
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
  }]);
  return RealStone;
}(_Plugin2["default"]);
_defineProperty(RealStone, "id", 'real-stone');
var _default = exports["default"] = RealStone;

},{"../../../../RealStone/index.js":1,"../../Plugin.js":17,"./button-wire-light.js":19,"./lib/createEntityFromPart.js":20,"./lib/partEventListeners.js":21,"./lib/parts/createWire.js":22,"./rover-light.js":23,"./security-system-wires.js":24,"./security-system.js":25}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buttonLight;
var _index = require("../../../../RealStone/index.js");
function buttonLight() {
  var realStoneSystem = new _index.RealStone({
    powerRequired: false // default is false, set to true to enforce power requirements
  });

  // Create the button
  var button = new _index.Button(0, -350, 0); // Positioned a bit below in the center

  // Create three LED lights and position them on the top row
  var ledLight1 = new _index.LEDLight(-200, 250, 0); // First light
  var ledLight2 = new _index.LEDLight(0, 250, 0); // Second light, in the middle
  var ledLight3 = new _index.LEDLight(200, 250, 0); // Third light

  // Create wires to connect each LED light to the button
  var wire = new _index.Wire();

  // Connect button to each wire, and each wire to corresponding LED light
  button.connect(wire);
  wire.connect(ledLight1);
  button.connect(wire);
  wire.connect(ledLight2);
  button.connect(wire);
  wire.connect(ledLight3);

  // Add components to RealStone system
  realStoneSystem.addPart(button);
  realStoneSystem.addPart(wire);
  realStoneSystem.addPart(ledLight1);
  realStoneSystem.addPart(ledLight2);
  realStoneSystem.addPart(ledLight3);

  // Simulate pressing the button
  // button.press();
  return realStoneSystem;
}

},{"../../../../RealStone/index.js":1}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createEntityFromPart;
function createEntityFromPart(part, contraption) {
  var game = this.game;

  // create the entity

  var entity;
  switch (part.type) {
    case 'Wire':
      entity = this.createWire(part, contraption);
      break;
    case 'Rover':
      entity = this.game.createEntity({
        name: part.type,
        type: 'PART',
        color: part.props.color,
        position: part.position,
        width: part.size.width,
        height: part.size.height,
        isStatic: false,
        isSensor: true,
        realStone: {
          part: part,
          contraption: contraption
        }
      });
      break;
    default:
      // Handle non-wire parts
      entity = this.game.createEntity({
        name: part.type,
        type: 'PART',
        color: part.props.color,
        position: part.position,
        width: part.size.width,
        height: part.size.height,
        isStatic: true,
        realStone: {
          part: part,
          contraption: contraption
        }
      });
      break;
  }

  // check to see if entity is array, some parts create multiple entities
  if (Array.isArray(entity)) {
    var entityIds = [];
    entity.forEach(function (e) {
      entityIds.push(e.id);
    });
    part.entities = entityIds;
  } else {
    part.entityId = entity.id;
  }
  if (part.type !== 'Wire') {
    // create a text label for the entity

    var entityCenterX = part.position.x - part.size.width / 4;
    var textLabel = this.game.createEntity({
      type: 'TEXT',
      text: part.type,
      position: {
        x: entityCenterX,
        // Center horizontally
        y: part.position.y + part.size.height + 10 // Position below the entity
      },

      width: part.size.width,
      height: part.size.height,
      isStatic: true,
      isSensor: true,
      realStone: {
        part: part,
        contraption: contraption
      }
    });
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = partEventListeners;
// Listens for events on parts

function partEventListeners(part, contraption) {
  var _this = this;
  if (part.type === 'Wire') {
    part.on('transmit', function (signal) {
      // set the tint of the entity to yellow
      // console.log('Wire transmit', part);
      // check to see if part has entities array, if so, update all entities
      if (Array.isArray(part.entities)) {
        part.entities.forEach(function (entityId) {
          _this.game.updateEntity({
            id: entityId,
            color: 0xffff00
          });
        });
      }
    });
    part.on('off', function () {
      // set the tint of the entity to yellow
      //console.log('Wire stopTransmit', part);
      if (Array.isArray(part.entities)) {
        part.entities.forEach(function (entityId) {
          _this.game.updateEntity({
            id: entityId,
            color: 0xffffff
          });
        });
      }
    });
  }
  if (part.type === 'LEDLight') {
    part.on('on', function () {
      // set the tint of the entity to yellow
      // console.log('LEDLight on', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffff00
      });
    });
    part.on('off', function () {
      // set the tint of the entity to yellow
      // console.log('LEDLight off', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffffff
      });
    });
  }
  if (part.type === 'MotionDetector') {
    part.on('on', function () {
      // set the tint of the entity to yellow
      // console.log('MotionDetector on', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffff00
      });
    });
    part.on('off', function () {
      // set the tint of the entity to yellow
      // console.log('MotionDetector off', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffffff
      });
    });
  }
  if (part.type === 'Repeater') {
    part.on('repeat', function () {
      // set the tint of the entity to yellow
      // console.log('Repeater on', part);
      // TODO: should pulse? is not binary on / off state
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xf00f00
      });
    });
  }
  if (part.type === 'PressureSensor') {
    part.on('trigger', function () {
      // set the tint of the entity to yellow
      // console.log('PressureSensor on', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffff00
      });
    });
  }
  if (part.type === 'Button') {
    part.on('press', function () {
      // set the tint of the entity to yellow
      // console.log('Button on', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0x9a9ccf
      });
    });
    part.on('release', function () {
      // set the tint of the entity to yellow
      // console.log('Button off', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffffff
      });
    });
  }
  if (part.type === 'Actuator') {
    part.on('activate', function () {
      // set the tint of the entity to yellow
      // console.log('Actuator on', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffff00
      });
    });
    part.on('deactivate', function () {
      // set the tint of the entity to yellow
      // console.log('Actuator off', part);
      _this.game.updateEntity({
        id: part.entityId,
        color: 0xffffff
      });
    });
  }
  if (part.type === 'Rover') {
    part.on('move', function (position) {
      // set the tint of the entity to yellow
      // console.log('Rover move', part);
      _this.game.updateEntity({
        id: part.entityId,
        position: position
      });
      // game.applyForce(part.entityId, part.props.velocity);
    });
  }
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createWire;
function createWire(part, contraption) {
  var _this = this;
  var entities = []; // Store entities for each wire segment
  // console.log('wire part, render', part);

  // Create a line segment (thin box) for each unique connection pair
  part.inputs.forEach(function (input) {
    part.outputs.forEach(function (output) {
      // Calculate midpoint, angle, and length for the segment
      var midpoint = {
        x: (input.position.x + output.position.x) / 2,
        y: (input.position.y + output.position.y) / 2,
        z: (input.position.z + output.position.z) / 2
      };
      var angle = Math.atan2(output.position.y - input.position.y, output.position.x - input.position.x);
      var length = Math.hypot(output.position.x - input.position.x, output.position.y - input.position.y);

      // Create a thin box to represent the line
      var boxWidth = length;
      var boxHeight = 3; // A small height to make it look like a line

      // console.log('creating box', midpoint, angle, boxWidth, boxHeight)
      var entity = _this.game.createEntity({
        name: part.type,
        isSensor: true,
        type: 'PART',
        // Use PART type for the thin box
        position: midpoint,
        width: boxWidth,
        height: boxHeight,
        rotation: angle,
        isStatic: true,
        realStone: {
          part: part,
          contraption: contraption
        }
      });
      entities.push(entity);
    });
  });
  // console.log('CREATED', entities)
  return entities; // Return all created entities
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buttonLight;
var _index = require("../../../../RealStone/index.js");
function buttonLight() {
  var realStoneSystem = new _index.RealStone({
    powerRequired: false
  });

  // Create the buttons
  var button = new _index.Button(-150, -200, 0);
  var button2 = new _index.Button(150, -200, 0);

  // Create the LED lights
  var ledLight1 = new _index.LEDLight(-200, 250, 0);
  var ledLight2 = new _index.LEDLight(0, 250, 0);
  var ledLight3 = new _index.LEDLight(200, 250, 0);

  // Create the Rover
  var redRover = new _index.Rover(0, -200, 0, {
    color: 0xff0000,
    velocity: {
      x: -20,
      y: 0
    }
  });

  // Create wires for each button
  var wire1 = new _index.Wire();
  var wire2 = new _index.Wire();

  // Connect the first button to the first and second LED lights
  button.connect(wire1);
  wire1.connect(ledLight1);
  wire1.connect(ledLight2);
  wire1.connect(ledLight3);

  // Connect the second button to the third LED light
  button2.connect(wire2);
  //wire2.connect(ledLight1);
  //wire2.connect(ledLight2);
  wire2.connect(ledLight3);

  // Add components to RealStone system
  realStoneSystem.addPart(button);
  realStoneSystem.addPart(button2);
  realStoneSystem.addPart(wire1);
  realStoneSystem.addPart(wire2);
  realStoneSystem.addPart(ledLight1);
  realStoneSystem.addPart(ledLight2);
  realStoneSystem.addPart(ledLight3);
  realStoneSystem.addPart(redRover);

  // Start moving the Rover
  redRover.startMoving();
  return realStoneSystem;
}

},{"../../../../RealStone/index.js":1}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSecuritySystem;
var _index = require("../../../../RealStone/index.js");
function createSecuritySystem() {
  var realStoneSystem = new _index.RealStone();

  // Initialize and position components
  var motionDetector = new _index.MotionDetector(-150, -250, 0);
  var pressureSensor = new _index.PressureSensor(150, -250, 0);
  var actuator = new _index.Actuator(450, -250, 0);
  var securityLight = new _index.LEDLight(450, 0, 200, {
    wattage: 60
  });
  var manualOverrideButton = new _index.Button(50, 450, 0);

  // Initialize wires
  var wireFromMotionDetector = new _index.Wire();
  var wireFromPressureSensor = new _index.Wire();
  var wireFromButton = new _index.Wire();
  var wireToLight = new _index.Wire();

  // Connect components with wires
  motionDetector.connect(wireFromMotionDetector);
  wireFromMotionDetector.connect(actuator);
  pressureSensor.connect(wireFromPressureSensor);
  wireFromPressureSensor.connect(actuator);
  manualOverrideButton.connect(wireFromButton);
  wireFromButton.connect(actuator);
  actuator.connect(wireToLight);
  wireToLight.connect(securityLight);

  // Add components and wires to RealStone system
  realStoneSystem.addPart(motionDetector);
  realStoneSystem.addPart(pressureSensor);
  realStoneSystem.addPart(securityLight);
  realStoneSystem.addPart(manualOverrideButton);
  realStoneSystem.addPart(actuator);
  realStoneSystem.addPart(wireFromMotionDetector);
  realStoneSystem.addPart(wireFromPressureSensor);
  realStoneSystem.addPart(wireFromButton);
  realStoneSystem.addPart(wireToLight);

  // Simulate interactions
  // motionDetector.detectMotion(); // Simulate motion detection

  // Logging the system state
  console.log(realStoneSystem);
  return realStoneSystem;
}

},{"../../../../RealStone/index.js":1}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSecuritySystem;
var _index = require("../../../../RealStone/index.js");
function createSecuritySystem() {
  var realStoneSystem = new _index.RealStone();

  // Initialize and position components
  var motionDetector = new _index.MotionDetector(-150, -250, 0); // Position at top-left
  var pressureSensor = new _index.PressureSensor(150, -250, 0); // Next to the Motion Detector
  var actuator = new _index.Actuator(450, -250, 0); // Positioned appropriately
  var securityLight = new _index.LEDLight(450, 0, 0, {
    wattage: 60
  }); // Near bottom-right
  var manualOverrideButton = new _index.Button(50, 450, 0); // Near bottom-left

  // Connect components to the Actuator
  motionDetector.connect(actuator);
  pressureSensor.connect(actuator);
  manualOverrideButton.connect(actuator);

  // Connect Actuator to the Security Light
  actuator.connect(securityLight);

  // Add components to RealStone system
  realStoneSystem.addPart(motionDetector);
  realStoneSystem.addPart(pressureSensor);
  realStoneSystem.addPart(securityLight);
  realStoneSystem.addPart(manualOverrideButton);
  realStoneSystem.addPart(actuator);

  // Simulate interactions
  motionDetector.detectMotion(); // Simulate motion detection
  // manualOverrideButton.press(); // Simulate manual override

  // Logging the system state
  console.log(realStoneSystem);
  //console.log(JSON.stringify(realStoneSystem.toJSON(), true, 2))

  return realStoneSystem;
}

},{"../../../../RealStone/index.js":1}]},{},[18])(18)
});

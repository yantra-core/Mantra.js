(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WORLDS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "Craft", {
  enumerable: true,
  get: function get() {
    return _YCraft["default"];
  }
});
Object.defineProperty(exports, "Display", {
  enumerable: true,
  get: function get() {
    return _Display["default"];
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
Object.defineProperty(exports, "Latch", {
  enumerable: true,
  get: function get() {
    return _Latch["default"];
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
Object.defineProperty(exports, "Relay", {
  enumerable: true,
  get: function get() {
    return _Relay["default"];
  }
});
Object.defineProperty(exports, "Rover", {
  enumerable: true,
  get: function get() {
    return _Rover["default"];
  }
});
Object.defineProperty(exports, "VirtualMachine", {
  enumerable: true,
  get: function get() {
    return _VirtualMachine["default"];
  }
});
Object.defineProperty(exports, "Wire", {
  enumerable: true,
  get: function get() {
    return _Wire["default"];
  }
});
Object.defineProperty(exports, "YCraft", {
  enumerable: true,
  get: function get() {
    return _YCraft["default"];
  }
});
var _YCraft = _interopRequireDefault(require("./lib/YCraft.js"));
var _ElectricalSignal = _interopRequireDefault(require("./lib/signals/ElectricalSignal.js"));
var _Actuator = _interopRequireDefault(require("./lib/parts/Actuator.js"));
var _Amplifier = _interopRequireDefault(require("./lib/parts/Amplifier.js"));
var _Button = _interopRequireDefault(require("./lib/parts/Button.js"));
var _Display = _interopRequireDefault(require("./lib/parts/Display.js"));
var _LaserSensor = _interopRequireDefault(require("./lib/parts/LaserSensor.js"));
var _Latch = _interopRequireDefault(require("./lib/parts/Latch.js"));
var _LEDLight = _interopRequireDefault(require("./lib/parts/LEDLight.js"));
var _Mirror = _interopRequireDefault(require("./lib/parts/Mirror.js"));
var _MotionDetector = _interopRequireDefault(require("./lib/parts/MotionDetector.js"));
var _PressureSensor = _interopRequireDefault(require("./lib/parts/PressureSensor.js"));
var _Relay = _interopRequireDefault(require("./lib/parts/Relay.js"));
var _Rover = _interopRequireDefault(require("./lib/parts/Rover.js"));
var _VirtualMachine = _interopRequireDefault(require("./lib/parts/VirtualMachine.js"));
var _Wire = _interopRequireDefault(require("./lib/parts/Wire.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./lib/YCraft.js":3,"./lib/parts/Actuator.js":4,"./lib/parts/Amplifier.js":5,"./lib/parts/Button.js":6,"./lib/parts/Display.js":7,"./lib/parts/LEDLight.js":8,"./lib/parts/LaserSensor.js":9,"./lib/parts/Latch.js":10,"./lib/parts/Mirror.js":11,"./lib/parts/MotionDetector.js":12,"./lib/parts/PressureSensor.js":13,"./lib/parts/Relay.js":14,"./lib/parts/Rover.js":15,"./lib/parts/VirtualMachine.js":16,"./lib/parts/Wire.js":17,"./lib/signals/ElectricalSignal.js":18}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Part = void 0;
var _EventEmitter2 = _interopRequireDefault(require("./utils/EventEmitter.js"));
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      width: 16,
      height: 16,
      depth: 16
    }; // Fixed size for each part
    _this.props = {}; // Properties specific to each part
    return _this;
  }
  _createClass(Part, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }

    // Additional methods or properties common to all parts can be added here
  }]);
  return Part;
}(_EventEmitter2["default"]);
// for now, could also be a base Part class
_defineProperty(Part, "idCounter", 0);

},{"./utils/EventEmitter.js":19}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _EventEmitter2 = _interopRequireDefault(require("./utils/EventEmitter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var YCraft = /*#__PURE__*/function (_EventEmitter) {
  _inherits(YCraft, _EventEmitter);
  var _super = _createSuper(YCraft);
  function YCraft() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$powerRequired = _ref.powerRequired,
      powerRequired = _ref$powerRequired === void 0 ? false : _ref$powerRequired,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 160 : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 160 : _ref$width,
      _ref$description = _ref.description,
      description = _ref$description === void 0 ? 'A YCraft contraption' : _ref$description;
    _classCallCheck(this, YCraft);
    _this = _super.call(this);

    // Local x-coordinate in global space
    _this.position = {
      x: x,
      y: y,
      z: z
    };
    _this.height = height;
    _this.width = width;
    _this.description = description;
    _this.powerRequired = powerRequired;

    // parts of the contraption, added via addPart() method
    _this.parts = [];

    // sub-contraptions of the contraption, added via addContraption() method
    _this.contraptions = [];
    return _this;
  }

  // top-level on method for the contraption
  _createClass(YCraft, [{
    key: "start",
    value: function start() {
      // check to see if any parts have been added,
      if (this.parts.length > 0) {
        // get the first part and assume that it is the top-level part
        // then call the Part.on() method on that part
        if (this.parts[0].onFn) {
          this.parts[0].onFn();
        } else {
          console.log("Warning: ".concat(this.parts[0].constructor.name, " does not have an onFn method"));
        }
      }

      // check to see if any contraptions have been added
      if (this.contraptions.length > 0) {
        // call the .start() method of all the contraptions
        this.contraptions.forEach(function (contraption) {
          contraption.start();
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.parts.length > 0) {
        if (this.parts[0].offFn) {
          this.parts[0].offFn();
        } else {
          console.log("Warning: ".concat(this.parts[0].constructor.name, " does not have an offFn method"));
        }
      }
    }

    // Method to add an entire contraption
  }, {
    key: "addContraption",
    value: function addContraption(contraption) {
      var _this2 = this;
      // Offset the position of the contraption
      var offsetX = this.position.x;
      var offsetY = this.position.y;
      var offsetZ = this.position.z;
      contraption.setPosition(contraption.position.x + offsetX, contraption.position.y + offsetY, contraption.position.z + offsetZ);

      // Add the contraption to the YCraft's contraptions array
      this.contraptions.push(contraption);

      // Forward events from the contraption to the YCraft instance
      contraption.onAny(function (eventName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this2.emit.apply(_this2, [eventName].concat(args));
      });

      // Set the YCraft context for the contraption
      if (typeof contraption.setYCraft === 'function') {
        contraption.setYCraft(this);
      }
    }
  }, {
    key: "addPart",
    value: function addPart(part) {
      var _this3 = this;
      // Adjust part's position relative to the YCraft's local coordinates
      part.position.x += this.position.x;
      part.position.y += this.position.y;
      part.position.z += this.position.z;
      this.parts.push(part);
      if (part instanceof _EventEmitter2["default"]) {
        part.onAny(function (eventName) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          // Forward the part's events to the YCraft instance
          _this3.emit.apply(_this3, [eventName].concat(args));
        });
        if (typeof part.setYCraft === 'function') {
          part.setYCraft(this);
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
      // Check if the target component belongs to another YCraft instance
      if (targetComponent instanceof YCraftComponent && this.yCraft !== targetComponent.yCraft) {
        // Implement logic to handle inter-contraption connections
        // This could involve using a global event emitter or a direct reference
      } else {
        // Regular connection logic for components within the same YCraft instance
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
    key: "setMode",
    value: function setMode(newMode) {
      this.mode = newMode;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      var dx = x - this.position.x;
      var dy = y - this.position.y;
      var dz = z - this.position.z;
      // Update YCraft's local coordinates
      this.position.x = x;
      this.position.y = y;
      this.position.z = z;
      // Update all parts' positions
      this.parts.forEach(function (part) {
        part.position.x += dx;
        part.position.y += dy;
        part.position.z += dz;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this4 = this;
      return {
        powerRequired: this.powerRequired,
        parts: this.parts.map(function (part) {
          return {
            type: part.constructor.name,
            properties: _this4.getPartProperties(part),
            connections: _this4.getPartConnections(part),
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
  return YCraft;
}(_EventEmitter2["default"]);
var _default = exports["default"] = YCraft;

},{"./utils/EventEmitter.js":19}],4:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _this.isOn = false;
    _this.onFn = _this.start.bind(_assertThisInitialized(_this));
    _this.offFn = _this.stop.bind(_assertThisInitialized(_this));

    // this.signalMode = 'continuous';
    _this.timers = {
      pulse: null
    };
    _this.frequency = frequency;
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
      console.log("Actuator received signal", signal);
      this.signal = signal;
      this.toggle();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (!this.isOn) {
        this.start();
        this.emit('start');
        this.isOn = true;
        // immediately send a signal to connected components
        this.update();
      } else {
        this.stop();
        this.emit('stop');
        this.isOn = false;
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      if (this.timers.pulse === null) {
        this.timers.pulse = setInterval(function () {
          _this2.update();
        }, this.frequency);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timers.pulse !== null) {
        clearInterval(this.timers.pulse);
        this.timers.pulse = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;
      if (this.isOn) {
        this.emit('pulse', this.signal);
        // Perform actions while the actuator is active
        this.connectedParts.forEach(function (comp) {
          return comp.receive(_this3.signal);
        });
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove all timers
      this.stop();
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
    _this.amplitude = amplitude;
    _this.signal = new _ElectricalSignal["default"]();
    _this.outputs = [];
    _this.inputs = [];
    _this.onFn = _this.activate.bind(_assertThisInitialized(_this));
    _this.offFn = _this.deactivate.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Amplifier, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }
  }, {
    key: "connect",
    value: function connect(component) {
      if (typeof component.inputs !== 'undefined') {
        component.inputs.push(this);
      }
      this.outputs.push(component);
    }
  }, {
    key: "activate",
    value: function activate() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.isOn = true;
      this.emit('activate', signal);
      // Transmit the amplified signal
      this.transmit(signal);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.isOn = false;
      this.emit('deactivate', signal);
      signal.binarySignal = 0;
      this.outputs.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOn) {
        this.deactivate();
      } else {
        this.activate();
      }
    }
  }, {
    key: "receive",
    value: function receive() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      if (this.isOn) {
        // console.log('Turning off LED light...');
        this.deactivate(signal);
      } else {
        // console.log('Turning on LED light...');
        signal.current = signal.current * this.amplitude;
        this.activate(signal);
      }
    }
  }, {
    key: "transmit",
    value: function transmit() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.outputs.forEach(function (part) {
        if (part.receive) {
          part.receive(signal);
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

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],6:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Button = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Button, _Part);
  var _super = _createSuper(Button);
  function Button() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, Button);
    // curry the constructor to allow for multiple API styles
    if (_typeof(x) === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    _this = _super.call(this, x, y, z);
    _this.type = Button.type;
    _this.signal = new _ElectricalSignal["default"]();
    _this.connectedParts = [];
    _this.isOn = false;
    _this.onFn = _this.press.bind(_assertThisInitialized(_this));
    _this.offFn = _this.release.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Button, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }
  }, {
    key: "connect",
    value: function connect(component) {
      if (typeof component.inputs !== 'undefined') {
        component.inputs.push(this);
      }
      this.connectedParts.push(component);
    }
  }, {
    key: "press",
    value: function press() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      // Emit press event and send signal
      this.isOn = true;
      this.emit('press', signal);
      this.connectedParts.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "release",
    value: function release() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      // Emit release event
      this.isOn = false;
      this.emit('release');
      signal.binarySignal = 0;
      this.connectedParts.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Implement if needed; currently, the button may not need to receive signals
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
  }]);
  return Button;
}(_Part2.Part);
_defineProperty(Button, "type", 'Button');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],7:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Display = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Display, _Part);
  var _super = _createSuper(Display);
  function Display() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? 'Your Sign Here' : _ref$text;
    _classCallCheck(this, Display);
    // curry the constructor to allow for multiple API styles
    if (_typeof(x) === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    _this = _super.call(this, x, y, z);
    _this.type = Display.type;
    _this.text = text;
    _this.connectedParts = [];
    _this.inputs = []; // Parts that send signals to this display
    return _this;
  }
  _createClass(Display, [{
    key: "setText",
    value: function setText(text) {
      this.text = text;
      console.log("Display text set to: ".concat(this.text));
      // Additional logic to render the text can be implemented here
    }
  }, {
    key: "connect",
    value: function connect(part) {
      this.connectedParts.push(part);
      this.inputs.push(part);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      if (signal instanceof _ElectricalSignal["default"]) {
        // For now, we assume the signal carries simple text data
        // In the future, this can be expanded to handle more complex data types
        this.setText(signal.data); // Assuming 'data' property in the signal carries the text
      }
    }

    // Additional methods and logic for the display can be added here...
  }]);
  return Display;
}(_Part2.Part);
_defineProperty(Display, "type", 'Display');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],8:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _this.toggleFn = _this.toggle.bind(_assertThisInitialized(_this));
    _this.mode = 'continuous'; // or binary, trinary, etc.

    //antonymous verb pairs" or "contrasting verb pairs."
    _this.onFn = _this.activate.bind(_assertThisInitialized(_this));
    _this.offFn = _this.deactivate.bind(_assertThisInitialized(_this));
    _this.type = LEDLight.type;
    _this.isOn = false; // Property to track the LED light's state
    _this.color = 0x00ff00;

    // non-shared properties
    _this.props = {};
    _this.props.wattage = wattage;
    _this.props.maxWattage = maxWattage;
    _this.props.isBroken = false; // Property to track if the light is broken
    return _this;
  }
  _createClass(LEDLight, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }
  }, {
    key: "activate",
    value: function activate(signal) {
      this.isOn = true;
      this.emit('activate', signal);
    }
  }, {
    key: "deactivate",
    value: function deactivate(signal) {
      this.isOn = false;
      this.emit('deactivate', signal);
    }
  }, {
    key: "toggle",
    value: function toggle(signal) {
      if (this.isOn) {
        this.deactivate(signal);
      } else {
        this.activate(signal);
      }
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Check if the light is broken
      if (this.props.isBroken) {
        // console.log('LED light is broken and cannot be turned on.');
        return;
      }
      this.signal = signal;
      var power = signal.calculatePower();
      // Check for exceeding maxWattage
      /*
      if (power > this.props.maxWattage) {
        // console.log('LED light has broken due to excessive power!');
        this.deactivate(signal)
        this.break(signal);
        return;
      }
      */

      if (this.isOn) {
        // console.log('Turning off LED light...');
        this.deactivate(signal);
      } else {
        if (!this.yCraft.powerRequired || power >= this.props.wattage) {
          // console.log('Turning on LED light...');
          this.activate(signal);
        } else {
          // console.log('Insufficient power to turn on LED light...')
        }
      }
    }
  }, {
    key: "break",
    value: function _break(signal) {
      this.props.isBroken = true; // Permanently disable the light
      this.emit('broken');
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(entity) {
      // Check if the light is broken
      if (this.props.isBroken) {
        // console.log('LED light is broken and cannot be turned on.');
        return;
      }

      // Check if the entity is a Rover
      if (entity.type === 'Rover') {
        // console.log('LED light has broken due to collision with Rover!');
        this.isOn = false;
        this.props.isBroken = true; // Permanently disable the light
        this.props.color = 'grey';
        this.emit('broken');
      }
    }

    // Optionally, include an update method if you need dynamic behavior at each system tick
  }, {
    key: "update",
    value: function update() {
      // Add dynamic effects like blinking or fading if the light is not broken
      if (!this.props.isBroken) {
        // Your update logic here
      }
    }
  }]);
  return LEDLight;
}(_Part2.Part);
_defineProperty(LEDLight, "type", 'LEDLight');

},{"../Part.js":2}],9:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

},{"../signals/ElectricalSignal.js":18,"../utils/EventEmitter.js":19}],10:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Latch = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Latch, _Part);
  var _super = _createSuper(Latch);
  function Latch() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    _classCallCheck(this, Latch);
    _this = _super.call(this, x, y, z);
    _this.type = Latch.type;
    _this.connectedParts = [];
    _this.signal = new _ElectricalSignal["default"]();
    _this.isLatched = false; // State of the latch

    _this.onFn = _this.engage.bind(_assertThisInitialized(_this));
    _this.offFn = _this.disengage.bind(_assertThisInitialized(_this));

    // this.triggerFn = this.engage.bind(this);
    // this.toggleFn = this.toggle.bind(this);
    // this.transmitFn = this.disengage.bind(this);
    return _this;
  }
  _createClass(Latch, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
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
    key: "toggle",
    value: function toggle() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      if (!this.isLatched) {
        this.engage(signal);
      } else {
        this.disengage(signal);
      }
    }
  }, {
    key: "engage",
    value: function engage() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.isLatched = true;
      this.emit('engage', signal); // Emit an activation event
      this.transmit(signal);
    }
  }, {
    key: "disengage",
    value: function disengage(signal) {
      this.isLatched = false;
      this.emit('disengage'); // Emit a deactivation event
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
  }]);
  return Latch;
}(_Part2.Part);
_defineProperty(Latch, "type", 'Latch');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],11:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

},{"../utils/EventEmitter.js":19}],12:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MotionDetector = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(MotionDetector, _Part);
  var _super = _createSuper(MotionDetector);
  function MotionDetector() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$motionTimeout = _ref.motionTimeout,
      motionTimeout = _ref$motionTimeout === void 0 ? 4000 : _ref$motionTimeout,
      _ref$debounceDelay = _ref.debounceDelay,
      debounceDelay = _ref$debounceDelay === void 0 ? 500 : _ref$debounceDelay;
    _classCallCheck(this, MotionDetector);
    _this = _super.call(this, x, y, z);
    _this.type = MotionDetector.type;
    _this.isConnected = false;
    _this.connectedParts = [];
    _this.motionTimeout = motionTimeout; // Time in milliseconds to wait before emitting 'still' after motion
    _this.debounceDelay = debounceDelay; // Delay for debounce mechanism
    _this.lastMotionTime = 0; // Track the last time motion was detected
    _this.motionTimer = null; // Timer for 'still' event

    _this.onFn = _this.detectMotion.bind(_assertThisInitialized(_this));
    _this.offFn = function () {};
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
      var _this2 = this;
      var currentTime = Date.now();

      // Debounce check
      if (currentTime - this.lastMotionTime < this.debounceDelay) {
        return; // Too soon since last motion, ignore this trigger
      }
      this.lastMotionTime = currentTime;
      if (this.isConnected) {
        var signal = new _ElectricalSignal["default"]({
          voltage: 5
        });
        signal.encodeUSB(1); // Encoding binary '1' to indicate motion
        console.log('Motion detected!');
        this.transmit(signal);
        this.emit('motion', signal);

        // Reset and start the timer for 'still' event
        clearTimeout(this.motionTimer);
        this.motionTimer = setTimeout(function () {
          _this2.emit('still');
        }, this.motionTimeout);
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
  }, {
    key: "update",
    value: function update() {
      // Optional: Implement logic for periodic motion checks or other behaviors
    }
  }]);
  return MotionDetector;
}(_Part2.Part);
_defineProperty(MotionDetector, "type", 'MotionDetector');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],13:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PressureSensor = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(PressureSensor, _Part);
  var _super = _createSuper(PressureSensor);
  function PressureSensor() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$debounceDelay = _ref.debounceDelay,
      debounceDelay = _ref$debounceDelay === void 0 ? 500 : _ref$debounceDelay;
    _classCallCheck(this, PressureSensor);
    _this = _super.call(this, x, y, z);
    _this.type = PressureSensor.type;
    _this.connectedParts = [];
    _this.signal = new _ElectricalSignal["default"]();
    _this.debounceDelay = debounceDelay; // Delay for debounce mechanism
    _this.lastTriggerTime = 0; // Track the last time pressure was triggered

    _this.onFn = _this.trigger.bind(_assertThisInitialized(_this));
    _this.offFn = _this.release.bind(_assertThisInitialized(_this));
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
    key: "toggle",
    value: function toggle() {
      var currentTime = Date.now();

      // Debounce check
      if (currentTime - this.lastTriggerTime < this.debounceDelay) {
        return; // Too soon since last trigger, ignore this trigger
      }
      if (this.isOn) {
        this.release();
      } else {
        this.trigger();
      }
    }
  }, {
    key: "trigger",
    value: function trigger() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.lastTriggerTime = Date.now();
      this.isOn = true;

      // Emit trigger event and send signal
      this.emit('trigger', signal);
      this.connectedParts.forEach(function (component) {
        if (component.onFn && typeof component.onFn === 'function') {
          component.onFn(signal);
        }
      });
    }
  }, {
    key: "release",
    value: function release() {
      var _this2 = this;
      this.isOn = false;
      // Emit release event
      this.emit('release');
      this.connectedParts.forEach(function (component) {
        if (component.offFn && typeof component.offFn === 'function') {
          component.offFn(_this2.signal);
        }
      });
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      // Logic for receiving signals if needed
    }
  }]);
  return PressureSensor;
}(_Part2.Part);
_defineProperty(PressureSensor, "type", 'PressureSensor');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],14:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Relay = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(Relay, _Part);
  var _super = _createSuper(Relay);
  function Relay() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$amplitude = _ref.amplitude,
      amplitude = _ref$amplitude === void 0 ? 2 : _ref$amplitude;
    _classCallCheck(this, Relay);
    if (_typeof(x) === 'object') {
      z = x.z || 0;
      y = x.y || 0;
      x = x.x || 0;
    }
    _this = _super.call(this, x, y, z);
    _this.type = Relay.type;
    _this.connectedParts = [];
    _this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
    _this.signal = new _ElectricalSignal["default"]();

    // TODO: we could implement resistance or signalLoss in relay

    _this.outputs = [];
    _this.inputs = [];
    _this.onFn = _this.activate.bind(_assertThisInitialized(_this));
    _this.offFn = _this.deactivate.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Relay, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }
  }, {
    key: "connect",
    value: function connect(component) {
      if (typeof component.inputs !== 'undefined') {
        component.inputs.push(this);
      }
      this.outputs.push(component);
    }
  }, {
    key: "activate",
    value: function activate() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.isOn = true;
      this.emit('activate', signal);
      // Transmit the amplified signal
      this.transmit(signal);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.isOn = false;
      this.emit('deactivate', signal);
      signal.binarySignal = 0;
      this.outputs.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOn) {
        this.deactivate();
      } else {
        this.activate();
      }
    }
  }, {
    key: "receive",
    value: function receive() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      if (this.isOn) {
        this.deactivate(signal);
      } else {
        this.activate(signal);
      }
    }
  }, {
    key: "transmit",
    value: function transmit() {
      var signal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.signal;
      this.outputs.forEach(function (part) {
        if (part.receive) {
          part.receive(signal);
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      // Update logic for the Relay, if any
    }
  }]);
  return Relay;
}(_Part2.Part);
_defineProperty(Relay, "type", 'Relay');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],15:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      color = _ref$color === void 0 ? 0xcccccc : _ref$color,
      _ref$movementRate = _ref.movementRate,
      movementRate = _ref$movementRate === void 0 ? 16.666 : _ref$movementRate;
    _classCallCheck(this, Rover);
    _this = _super.call(this, x, y, z);
    _this.type = Rover.type;
    _this.props = {};
    _this.props.velocity = velocity;
    _this.props.color = color;
    _this.props.movementRate = movementRate;
    _this.state = 'inactive'; // Initially inactive
    _this.isOn = false; // Toggle state

    _this.timers = {
      movement: null
    };
    _this.defaultDelay = 100; // Default delay rate in milliseconds
    _this.collisionCooldown = false; // Flag to indicate collision cooldown

    _this.onFn = _this.start.bind(_assertThisInitialized(_this));
    _this.offFn = _this.stop.bind(_assertThisInitialized(_this));

    // Listen for collision events
    _this.on('collision', _this.handleCollision);
    return _this;
  }

  // Method to set YCraft reference
  _createClass(Rover, [{
    key: "setYCraft",
    value: function setYCraft(yCraft) {
      this.yCraft = yCraft;
    }

    // Method to activate or deactivate the Rover
    /*
    toggle() {
      if (this.isOn) {
        this.stop();
      } else {
        this.start();
      }
    }
    */

    // Method to start moving
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      this.state = 'active';
      this.isOn = true;
      if (this.timers.movementInterval) {
        clearInterval(this.timers.movementInterval);
      }
      this.timers.movementInterval = setInterval(function () {
        return _this2.update();
      }, this.props.movementRate);
    }

    // Method to stop moving
  }, {
    key: "stop",
    value: function stop() {
      this.state = 'inactive';
      this.isOn = false;
      if (this.timers.movementInterval) {
        clearInterval(this.timers.movementInterval);
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
      }, this.props.movementRate); // Collision cooldown period
    }
  }, {
    key: "unload",
    value: function unload() {
      // clear all timers
      if (this.timers.movementInterval) {
        clearInterval(this.timers.movementInterval);
      }
    }
  }]);
  return Rover;
}(_Part2.Part);
_defineProperty(Rover, "type", 'Rover');
var _default = exports["default"] = Rover;

},{"../Part.js":2}],16:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // can run arbitrary code between parts
// defaults to debian node.js sandbox
// allows developers to write arbitrary code inside contraptions
var VirtualMachine = exports["default"] = /*#__PURE__*/function (_Part) {
  _inherits(VirtualMachine, _Part);
  var _super = _createSuper(VirtualMachine);
  function VirtualMachine() {
    var _this;
    _classCallCheck(this, VirtualMachine);
    _this = _super.call(this);
    _this.type = VirtualMachine.type;
    _this.props = {};
    _this.image = function noopImage(signal) {
      return signal;
    };
    _this.connectedParts = [];
    _this.inputs = [];
    _this.outputs = [];
    // this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
    return _this;
  }
  _createClass(VirtualMachine, [{
    key: "setImage",
    value: function setImage(fn) {
      this.image = fn;
    }
  }, {
    key: "connect",
    value: function connect(part) {
      this.connectedParts.push(part);
      this.outputs.push(part);
    }
  }, {
    key: "receive",
    value: function receive(signal) {
      var modified = this.image(signal);
      this.transmit(modified);
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.emit('transmit', this.outputs, signal);
      // Transmit signal to all connected parts
      this.outputs.forEach(function (part) {
        if (part.receive) {
          part.receive(signal);
        }
      });
    }
  }]);
  return VirtualMachine;
}(_Part2.Part);
_defineProperty(VirtualMachine, "type", 'VirtualMachine');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],17:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    _this.onFn = _this.receive.bind(_assertThisInitialized(_this));
    _this.offFn = _this.stopTransmit.bind(_assertThisInitialized(_this));
    _this.mode = 'continuous'; // TODO: rename "mode", use mode for time-aware / immediate
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
      if (this.isOn) {
        // console.log('Turning off LED light...');
        this.stopTransmit(signal);
      } else {
        if (this.props.signalLoss) {
          signal = this.applySignalLoss(signal);
        }
        // Transmit the amplified signal
        this.transmit(signal);
      }
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
    key: "stopTransmit",
    value: function stopTransmit(signal) {
      this.isOn = false;
      this.emit('stopTransmit', signal);
      signal.binarySignal = 0;
      this.outputs.forEach(function (component) {
        if (component.receive && typeof component.receive === 'function' && component.mode === 'continuous') {
          component.receive(signal);
        }
      });
    }
  }, {
    key: "transmit",
    value: function transmit(signal) {
      this.isOn = true;
      if (this.props.signalLoss) {
        signal = this.applySignalLoss(signal);
      }
      this.emit('transmit', this.outputs, signal);
      // Transmit signal to all connected parts
      this.outputs.forEach(function (part) {
        if (part.receive) {
          part.receive(signal);
        }
      });
    }
  }]);
  return Wire;
}(_Part2.Part);
_defineProperty(Wire, "type", 'Wire');

},{"../Part.js":2,"../signals/ElectricalSignal.js":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    // Binary signal representation
    this.binarySignal = 1; // 0 or 1
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

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
          var scopedEventName = eventName;
          if (_this2.type) {
            scopedEventName = _this2.type + '::' + eventName;
          }
          listener.call.apply(listener, [_this2, scopedEventName].concat(args));
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

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bomb;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// bomb.js - Marak Squires 2024
function bomb(game) {
  var rules = game.createSutra();

  // Rate at which the player can drop bombs
  var fireRate = 1000;
  // Distance in front of the player where the bomb should start
  var distanceInFront = 16;
  // Speed at which the bomb is thrown
  var speed = 0.05;
  // TODO: ^^^ make these config

  rules.addCondition('canDropBomb', function (entity, gameState) {
    // TODO: better fluent integration of Action Rate Limiter into Sutra
    var actionRateLimiterComponent = game.components.actionRateLimiter;
    var lastFired = actionRateLimiterComponent.getLastActionTime(entity.id, 'dropBomb');
    var currentTime = Date.now();
    return currentTime - lastFired >= fireRate;
  });

  // Define actions
  rules.addAction({
    "if": 'canDropBomb',
    then: 'dropBomb'
  });

  // Event listeners for actions
  rules.on('dropBomb', function (entity, node, gameState) {
    var playerPos = entity.position;
    var playerRotation = entity.rotation; // in radians

    if (!playerPos) {
      // client might not have the position or rotation component, don't client-side predict
      console.log('no player data available');
      return;
    }

    // TODO: better fluent integration of Action Rate Limiter into Sutra
    var actionRateLimiterComponent = game.components.actionRateLimiter;
    actionRateLimiterComponent.recordAction(entity.id, 'dropBomb');
    if (typeof entity.radius !== 'undefined') {
      entity.width = entity.radius * 2;
      entity.height = entity.radius * 2;
    }
    var playerOffsetX = entity.width / 2; // Adjust this value to align the bomb properly
    var playerOffsetY = entity.height / 2; // Adjust this value to align the bomb properly

    playerOffsetX = 0;
    playerOffsetY = 0;
    if (typeof playerRotation === 'undefined') {
      playerRotation = 0; // this should have a default
    }

    // convert to 3d if rotation object
    if (_typeof(playerRotation) === 'object') {
      playerRotation = playerRotation.z;
    }

    // Compute the bomb's direction based on player's rotation
    var directionX = Math.sin(playerRotation);
    var directionY = -Math.cos(playerRotation);

    // Place the bomb in front of the player
    var bombStartPosition = {
      x: playerPos.x + playerOffsetX + distanceInFront * Math.sin(playerRotation),
      y: playerPos.y + playerOffsetY + distanceInFront * -Math.cos(playerRotation)
      //z: 10
    };
    var bombDirectionConfig = {
      type: 'BOMB',
      mass: 10000,
      collisionStart: true,
      position: bombStartPosition,
      lifetime: 2000,
      friction: 0.5,
      frictionStatic: 0.5,
      frictionAir: 0.01,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'bomb',
        playing: false
      },
      owner: entity.id,
      rotation: 0,
      velocity: {
        x: directionX * speed,
        y: directionY * speed
      },
      height: 16,
      width: 16,
      damage: 10 // TODO: make this a config
    };
    // console.log('using bombDirectionConfig', bombDirectionConfig)
    game.createEntity(bombDirectionConfig);
  });

  // Handling collisions
  rules["if"]('entTouchedBomb').then('bombCollision');
  rules.addCondition('entTouchedBomb', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'BOMB') {
        return true;
      }
      if (entity.bodyB.type === 'BOMB') {
        return true;
      }
    }
  });
  rules.on('bombCollision', function (collision, node, gameState) {
    var bombEntity = collision.bodyA.type === 'BOMB' ? collision.bodyA : collision.bodyB;
    var otherEntity = collision.bodyA.type === 'BOMB' ? collision.bodyB : collision.bodyA;

    // TODO: check the ctime of bomb to now, do not explode if too new
    // TODO: Apply damage or other effects to otherEntity
    // TODO: configurable collision groups
    if (['DEMON', 'HEXAPOD', 'FIRE', 'NPC', 'BLOCK', 'DOOR'].indexOf(otherEntity.type) !== -1) {
      // TODO: remove this to work with generic collision handler for Block types
      //       no need for explict call here, is simple refactor
      if (otherEntity.type === 'BLOCK' || otherEntity.type === 'HEXAPOD') {
        game.systems.block.blockBulletCollision(otherEntity.id, bombEntity.id, otherEntity, bombEntity);
      } else {
        game.removeEntity(otherEntity.id);
        game.removeEntity(bombEntity.id);
      }
    }
  });
  return rules;
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = demon;
function demon(game) {
  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 8,
    position: {
      x: -60,
      y: -60,
      z: 8
    }
  });
  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 8,
    position: {
      x: 64,
      y: -60,
      z: 8
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedDemon', function (entity, gameState) {
    console.log('entityTouchedDemon check', entity);
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (typeof entity.DEMON !== 'undefined') {
        return true;
      }
    }
  });

  /*
  rules.on('entityTouchedDemon', function (collision) {
    //let demonEntity = collision.bodyA.type === 'DEMON' ? collision.bodyA : collision.bodyB;
    // Define the scale factor for how much bigger the demon should get
    const scaleFactor = 2.1; // For example, 10% bigger
    // Increase the size of the demon
    game.updateEntity({
      id: demonEntity.id,
      width: demonEntity.width * scaleFactor,
      height: demonEntity.height * scaleFactor,
      depth: demonEntity.depth * scaleFactor
    });
  });
  */

  return rules;
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fire;
function fire(game) {
  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire'
      // frame: 0 // TODO: support single frame / bypass animation of array
    },
    //texture: 'fire',
    //color: 0xff0000,
    width: 16,
    height: 16,
    depth: 16,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 16
    }
  });
  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire'
      // frame: 0 // TODO: support single frame / bypass animation of array
    },
    //texture: 'fire',
    //color: 0xff0000,
    width: 16,
    height: 16,
    depth: 16,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 16
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedFire', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'FIRE') {
        return true;
      }
      if (entity.bodyB.type === 'FIRE') {
        return true;
      }
    }
  });
  rules["if"]('entityTouchedFire').then('playNote', {
    note: 'F#4'
  }).then('damageEntity');
  rules.on('damageEntity', function (collision) {
    var ent;
    if (collision.bodyA.type === 'FIRE') {
      ent = collision.bodyB;
    } else {
      ent = collision.bodyA;
    }
    // create a copy of the entity previous texture
    // TODO: remove the createDefaultPlayer() call here
    //       and instead have a game.on('player::death') event
    //       listening in parent Sutra
    var texture = ent.texture;
    game.removeEntity(ent.id);
    if (ent.type === 'PLAYER') {
      game.currentPlayerId = null;
      game.createDefaultPlayer({
        texture: texture
      });
    }
  });

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', function (entity, ev) {
    if (entity.type === 'FIRE') {
      game.playNote('G4');
    }
  });
  return rules;
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = gameOfLife;
function gameOfLife(game) {
  var GRID_SIZE = 150; // Define the size of the grid
  var CELL_SIZE = 5; // Size of each cell

  // Initialize grid cells
  for (var x = 0; x < GRID_SIZE; x += CELL_SIZE) {
    for (var y = 0; y < GRID_SIZE; y += CELL_SIZE) {
      game.createEntity({
        type: 'LIFE_CELL',
        //health: Math.random() < 0.5 ? 1 : 2, // 1 is alive, 2 is dead
        health: 2,
        position: {
          x: x,
          y: y
        },
        body: false,
        width: CELL_SIZE,
        height: CELL_SIZE
      });
    }
  }
  function initializeGlider(x, y, cellSize, game) {
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + cellSize,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + 2 * cellSize,
        y: y
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + 2 * cellSize,
        y: y - cellSize
      }
    });
    game.createEntity({
      type: 'LIFE_CELL',
      width: cellSize,
      height: cellSize,
      body: false,
      health: 1,
      position: {
        x: x + cellSize,
        y: y - 2 * cellSize
      }
    });
  }
  initializeGlider(100, 100, CELL_SIZE, game);
  var rules = game.createSutra();

  // Rule for updating cell state
  rules["if"]('updateCellState').then('transitionCellState');
  rules.addCondition('updateCellState', function (entity, gameState) {
    return entity.type === 'LIFE_CELL' && gameState.tick % 10 === 0; // Update every 2 ticks
  });
  rules.on('transitionCellState', function (entity, node, gameState) {
    var neighbors = getNeighbors(entity, node, gameState); // Function to get neighboring cells
    var aliveNeighbors = neighbors.filter(function (neighbor) {
      return neighbor.health === 1;
    }).length;

    // console.log(neighbors, aliveNeighbors)
    // Game of Life rules
    if (entity.health === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
      //entity.state = 'dead';
      entity.health = 0;
    } else if (entity.health === 2 && aliveNeighbors === 3) {
      entity.health = 1;
      //entity.state = 'alive';
    }

    // Update entity in the game
    game.updateEntity({
      id: entity.id,
      health: entity.health,
      style: {
        backgroundColor: entity.health === 1 ? 'green' : 'black'
      }
    });
  });
  return rules;
}
function getNeighbors(cell, node, gameState) {
  var gridSize = 150; // Define the size of the grid
  var cellSize = 5; // Assuming each cell has a fixed size

  var neighbors = [];
  var neighborOffsets = [{
    x: -cellSize,
    y: -cellSize
  }, {
    x: 0,
    y: -cellSize
  }, {
    x: cellSize,
    y: -cellSize
  }, {
    x: -cellSize,
    y: 0
  }, /* Current Cell */{
    x: cellSize,
    y: 0
  }, {
    x: -cellSize,
    y: cellSize
  }, {
    x: 0,
    y: cellSize
  }, {
    x: cellSize,
    y: cellSize
  }];
  gameState.ents.LIFE_CELL.forEach(function (otherCell) {
    for (var _i = 0, _neighborOffsets = neighborOffsets; _i < _neighborOffsets.length; _i++) {
      var offset = _neighborOffsets[_i];
      var wrappedX = (cell.position.x + offset.x + gridSize) % gridSize;
      var wrappedY = (cell.position.y + offset.y + gridSize) % gridSize;
      if (otherCell.position.x === wrappedX && otherCell.position.y === wrappedY) {
        neighbors.push(otherCell);
        break; // Found neighbor, no need to check other offsets
      }
    }
  });
  return neighbors;
}

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hexapod;
// hexapod.js - Marak Squires 2023
function hexapod(game) {
  // create 22 hexapods
  // start at 0,0 and make them in a circle with radius 80
  var numberOfHexapods = 22;
  var radius = 80;
  for (var i = 0; i < numberOfHexapods; i++) {
    // Calculate the angle for each hexapod
    var angle = i / numberOfHexapods * 2 * Math.PI;

    // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
    var x = radius * Math.cos(angle);
    var y = radius * Math.sin(angle);
    game.createEntity({
      type: 'HEXAPOD',
      texture: 'demon',
      width: 8,
      height: 8,
      position: {
        x: x,
        y: y
      }
    });
  }
  var rules = game.createSutra();

  // Define constant values for different forces and parameters
  var ALIGNMENT_FORCE = 0.1;
  var COHESION_FORCE = 0.4;
  var SEPARATION_FORCE = 0.81;
  var PERCEPTION_RADIUS = 1500;
  var FIELD_OF_VIEW = 1500;

  // hexapods grow on bullet hit
  rules["if"]('bulletHitHexapod').then('hexapodGrow');
  rules.addCondition('bulletHitHexapod', function (entity, gameState) {
    return entity.type === 'COLLISION' && entity.kind === 'START' && entity.HEXAPOD && entity.BULLET;
  });
  rules.on('hexapodGrow', function (collision) {
    var hexapod = collision.HEXAPOD;
    var style;
    // at a certain size, invert the colors
    if (hexapod.width > 16) {
      style = {
        // Define the animation name and duration
        animation: 'pulse-invert 5s',
        // Initial filter style
        filter: 'invert(90%)'
      };
    }
    // update entity size by 11%
    game.updateEntity({
      id: hexapod.id,
      width: hexapod.width * 1.1,
      height: hexapod.height * 1.1,
      style: style
    });
  });

  // hexpods think each tick
  rules["if"]('hexapodTick').then('hexapodThink');
  rules.addCondition('hexapodTick', function (entity, gameState) {
    return entity.type === 'HEXAPOD' && gameState.tick % 1 === 0;
  });
  rules.on('hexapodThink', function (entity, node, gameState) {
    var hexapod = entity;
    var hexapods = gameState.ents.HEXAPOD;
    var alignment = {
      x: 0,
      y: 0
    };
    var cohesion = {
      x: 0,
      y: 0
    };
    var separation = {
      x: 0,
      y: 0
    };
    var planetAvoidance = {
      x: 0,
      y: 0
    };

    // Target movement implementation
    var targetForce = {
      x: 0,
      y: 0
    };
    if (typeof gameState.currentPlayer !== 'undefined') {
      if (gameState.currentPlayer) {
        var target = gameState.currentPlayer.position;
        var targetDirection = Vector.sub(target, hexapod.position);
        targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
      }
    }

    // Process each hexapod in the field of view
    hexapods.forEach(function (otherHexapod) {
      if (otherHexapod.id !== hexapod.id) {
        var d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));

        // Alignment
        if (d < PERCEPTION_RADIUS) {
          alignment = Vector.add(alignment, otherHexapod.velocity);
        }

        // Cohesion
        if (d < PERCEPTION_RADIUS) {
          cohesion = Vector.add(cohesion, otherHexapod.position);
        }

        // Separation
        if (d < hexapod.width + otherHexapod.width) {
          var diff = Vector.sub(hexapod.position, otherHexapod.position);
          separation = Vector.add(separation, Vector.div(diff, d * d)); // Weight by distance
        }
      }
    });

    // Average out alignment, cohesion, and separation
    if (hexapods.length > 1) {
      alignment = Vector.div(alignment, hexapods.length - 1);
      cohesion = Vector.div(cohesion, hexapods.length - 1);
      cohesion = Vector.sub(cohesion, hexapod.position);
      separation = Vector.div(separation, hexapods.length - 1);
    }
    alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
    cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
    separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);

    // Apply forces
    var force = Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), targetForce);
    // Update hexapod position
    var newPosition = Vector.add(hexapod.position, Vector.mult(force, 1));
    newPosition.z = 1; // for now
    game.updateEntity({
      id: hexapod.id,
      position: newPosition
    });
  });
  return rules;
}

// Basic vector operations
var Vector = {
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
    var mag = Vector.magnitude(v);
    return mag > 0 ? Vector.div(v, mag) : {
      x: 0,
      y: 0
    };
  }
};

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = note;
function note(game) {
  // if touch note play sound
  game.createEntity({
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: 0,
      y: 0,
      z: 1
    }
  });
  var rules = game.createSutra();
  rules.addCondition('entityTouchedNote', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'NOTE') {
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        return true;
      }
    }
  });

  // TODO: move these events into a Sutra
  game.on('pointerDown', function (entity) {
    if (entity.type === 'NOTE') {
      game.playNote(entity.kind);
    }
    if (entity.type === 'DRUM') {
      game.playDrum(entity.kind);
    }
  });
}

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = platformMovement;
function platformMovement(game) {
  var rules = game.createSutra();
  rules.addCondition('PLAYER_UP', {
    op: 'or',
    conditions: ['W', 'DPAD_UP']
  });
  rules.addCondition('PLAYER_DOWN', {
    op: 'or',
    conditions: ['S', 'DPAD_DOWN']
  });
  rules.addCondition('MOVE_LEFT', {
    op: 'or',
    conditions: ['A', 'DPAD_LEFT']
  });
  rules.addCondition('MOVE_RIGHT', {
    op: 'or',
    conditions: ['D', 'DPAD_RIGHT']
  });
  rules.addCondition('PLAYER_JUMP', {
    op: 'or',
    conditions: ['SPACE', 'H', 'BUTTON_B']
  });
  rules.addCondition('PLAYER_RUN', {
    op: 'or',
    conditions: ['J', 'BUTTON_X']
  });
  rules.addCondition('ZOOM_IN', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules.addCondition('isRunning', {
    op: 'or',
    conditions: ['S', 'K'] // defaults DOWN key, or B button on Gamepad
  });
  rules["if"]('MOVE_LEFT').then('MOVE_LEFT').then('updateSprite', {
    sprite: 'playerLeftWalk'
  });
  rules["if"]('MOVE_RIGHT').then('MOVE_RIGHT').then('updateSprite', {
    sprite: 'playerRightWalk'
  });

  /*
  rules
    .if('PLAYER_UP')
      .then('PLAYER_UP')
      .then('updateSprite', { sprite: 'playerUpRight' });
  */

  rules["if"]('PLAYER_DOWN').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  rules.addMap('determineDuckingSprite', function (player, node) {
    var sprite = 'playerDownRight';
    if (player.texture.sprite === 'playerLeftWalk') {
      player.texture.sprite = 'playerDownLeft';
    } else {
      player.texture.sprite = 'playerDownRight';
    }
    return player;
  });

  //rules.if('S').then('DUCK').map('determineDuckingSprite').then('updateSprite');
  //rules.if('D').then('MOVE_RIGHT').then('updateSprite', { sprite: 'playerRightWalk' });

  /*
    Adding textures to Entities
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: { // sets directly to sprite, no animations
          x: -112,
          y: -16,
          height: 16,
          width: 16
        }
      }
    })
   */

  rules.on('updateSprite', function (player, node) {
    var sprite = node.data.sprite || player.texture.sprite;
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: sprite,
        animationPlaying: true
      }
    });
  });
  rules.addCondition('isPlayer', function (entity) {
    return entity.type === 'PLAYER';
  });
  var maxJumpTicks = 40;
  // Remark: isPlayer is already implied for all Key inputs,
  //         however we add the additional check here for the negative case,
  //         in order to not let other ents reset player walk speed
  rules["if"]('isPlayer').then(function (rules) {
    rules["if"]('PLAYER_RUN').then('RUN')["else"]('WALK');
  });
  rules["if"]('isPlayer').then(function (rules) {
    rules["if"]('PLAYER_JUMP')
    // .if('doesntExceedDuration')
    .then('JUMP').then('updateSprite', {
      sprite: 'playerRightJump'
    });
  });

  //rules.if('L').then('SWING_SWORD');
  //rules.if('O').then('ZOOM_IN');
  //rules.if('P').then('ZOOM_OUT');

  rules.on('JUMP', function (player, node, gameState) {
    // console.log("JUMP", gameState.input, gameState.controls)
    if (gameState.inputTicks.SPACE >= maxJumpTicks) {
      return;
    }
    game.applyForce(player.id, {
      x: 0,
      y: -2.3,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: 0,
      sprite: 'playerRightJump'
    });
  });
  var runningForce = 1;
  rules.on('RUN', function (player) {
    runningForce = 1.6;
    maxJumpTicks = 35;
  });
  rules.on('WALK', function (player) {
    runningForce = 1;
    maxJumpTicks = 25;
  });
  rules.on('DUCK', function (player) {
    game.applyForce(player.id, {
      x: 0,
      y: 0.5,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: Math.PI
    });
  });
  rules.on('MOVE_LEFT', function (player, node, gameState) {
    game.applyForce(player.id, {
      x: -runningForce,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: -Math.PI / 2
    });
  });
  rules.on('MOVE_RIGHT', function (player) {
    game.applyForce(player.id, {
      x: runningForce,
      y: 0,
      z: 0
    });
    game.updateEntity({
      id: player.id,
      rotation: Math.PI / 2
    });
  });
  rules.on('FIRE_BULLET', function (player) {
    game.systems.bullet.fireBullet(player.id);
  });
  rules.on('SWING_SWORD', function (player) {
    if (game.systems.sword) {
      game.systems.sword.swingSword(player.id);
    }
  });
  return rules;
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = topdownMovement;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// TODO: separate sprite actions from movement actions, separate sutras
function topdownMovement(game) {
  var rules = game.createSutra();
  rules.addCondition('PLAYER_UP', {
    op: 'or',
    conditions: ['W', 'DPAD_UP']
  });
  rules.addCondition('PLAYER_DOWN', {
    op: 'or',
    conditions: ['S', 'DPAD_DOWN']
  });
  rules.addCondition('PLAYER_LEFT', {
    op: 'or',
    conditions: ['A', 'DPAD_LEFT']
  });
  rules.addCondition('PLAYER_RIGHT', {
    op: 'or',
    conditions: ['D', 'DPAD_RIGHT']
  });
  rules.addCondition('USE_ITEM_1', {
    op: 'or',
    conditions: ['SPACE', 'H', 'BUTTON_B']
  });
  rules.addCondition('USE_ITEM_2', {
    op: 'or',
    conditions: ['J', 'BUTTON_X']
  });
  rules.addCondition('USE_ITEM_3', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('USE_ITEM_4', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules.addCondition('ZOOM_IN', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules["if"]('PLAYER_UP').then('MOVE_UP').then('updateSprite', {
    sprite: 'playerUp'
  });
  rules["if"]('PLAYER_LEFT').then('MOVE_LEFT').then('updateSprite', {
    sprite: 'playerLeft'
  });
  rules["if"]('PLAYER_DOWN').then('MOVE_DOWN').then('updateSprite', {
    sprite: 'playerDown'
  });
  rules["if"]('PLAYER_RIGHT').then('MOVE_RIGHT').then('updateSprite', {
    sprite: 'playerRight'
  });
  rules["if"]('USE_ITEM_1').then('FIRE_BULLET').map('determineShootingSprite').then('updateSprite');
  rules["if"]('USE_ITEM_2').then("THROW_BOOMERANG");

  // replace with rules.do('ZOOM_IN'), etc
  rules["if"]('ZOOM_IN').then('ZOOM_IN');
  rules["if"]('ZOOM_OUT').then('ZOOM_OUT');
  rules.addMap('determineShootingSprite', function (player, node) {
    // Normalize the rotation within the range of 0 to 2π

    if (typeof player.texture === 'undefined') {
      return player;
    }
    var normalizedRotation = player.rotation % (2 * Math.PI);
    // Define a mapping from radians to sprites
    var rotationToSpriteMap = _defineProperty(_defineProperty(_defineProperty({
      0: 'playerRodUp'
    }, Math.PI / 2, 'playerRodRight'), Math.PI, 'playerRodDown'), -Math.PI / 2, 'playerRodLeft');
    // Set the sprite based on the rotation, default to the current sprite
    player.texture.sprite = rotationToSpriteMap[normalizedRotation] || player.currentSprite;
    return player;
  });
  rules.on('updateSprite', function (player, node) {
    if (typeof player.texture === 'undefined') {
      // for now, just return
      return;
    }
    var sprite = node.data.sprite || player.texture.sprite;
    game.updateEntity({
      id: player.id,
      texture: {
        frameIndex: 0,
        sheet: player.texture.sheet,
        sprite: sprite,
        animationPlaying: true
      }
    });
  });
  function isDiagonalMovement(state) {
    var isDiagonal = (state.MOVE_UP || state.MOVE_DOWN) && (state.MOVE_LEFT || state.MOVE_RIGHT);
    return isDiagonal;
  }

  // Normalization factor for diagonal movement (1 / sqrt(2))
  // chebyshev movement
  var normalizationFactor = 0.7071; // Approximately 1/√2
  var moveSpeed = 2;
  rules.on('MOVE_UP', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_UP = true;
    var force = {
      x: 0,
      y: -moveSpeed,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.y *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: 0
    });
    // console.log('MOVE_UP', playerState);
  });
  rules.on('MOVE_DOWN', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_DOWN = true;
    var force = {
      x: 0,
      y: moveSpeed,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.y *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI
    });
  });
  rules.on('MOVE_LEFT', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_LEFT = true;
    var force = {
      x: -moveSpeed,
      y: 0,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.x *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: -Math.PI / 2
    });
  });
  rules.on('MOVE_RIGHT', function (entity, node) {
    node.state = node.state || {};
    node.state.MOVE_RIGHT = true;
    var force = {
      x: moveSpeed,
      y: 0,
      z: 0
    };
    if (isDiagonalMovement(rules.state)) {
      force.x *= normalizationFactor;
    }
    game.applyForce(entity.id, force);
    game.updateEntity({
      id: entity.id,
      rotation: Math.PI / 2
    });
  });
  rules.on('FIRE_BULLET', function (entity) {
    if (game.systems.bullet) {
      game.systems.bullet.fireBullet(entity.id);
    }
  });
  rules.on('SWING_SWORD', function (entity) {
    if (game.systems.sword) {
      game.systems.sword.swingSword(entity.id);
    }
  });
  rules.on('THROW_BOOMERANG', function (player) {
    if (game.systems.boomerang) {
      game.systems.boomerang.throwBoomerang(player.id);
    }
  });

  /*
  rules.on('DROP_BOMB', function (player) {
    // with no rate-limit, will drop 60 per second with default settings
    rules.emit('dropBomb', player)
  });
  */

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
  return rules;
}

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// EatWorld.js - Marak Squires 2024
var EatWorld = exports["default"] = /*#__PURE__*/function () {
  function EatWorld() {
    _classCallCheck(this, EatWorld);
    this.id = EatWorld.id;
    this.type = EatWorld.type;
    this.dropping = false;
    this.slurping = false;
  }
  _createClass(EatWorld, [{
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // preload these plugins before the plugin starts
              game.use('Player');
              game.use('GravityWell');
              game.use('UnitSpawner');
              game.use('Teleporter');
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setZoom(3.5);
      for (var i = 0; i < 100; i++) {
        var randomPosition = game.randomPositionRadial(0, 0, 400);
        var food = game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8);
        food.collisionStart(function (a, b, event, context) {
          game.removeEntity(context.owner.id);
          var player = context.target;
          game.updateEntity(player.id, {
            size: {
              width: player.size.width + 1,
              height: player.size.height + 1
            }
          });
          var randomPosition = game.randomPositionRadial(0, 0, 400);
          var food2 = game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8);
          var randomPosition2 = game.randomPositionRadial(0, 0, 400);
          var food3 = game.make().color(game.randomColor()).x(randomPosition2.x).y(randomPosition2.y).width(8).height(8);
        });
        food.createEntity();
      }
      //let randomPosition = game.randomPositionRadial(0, 0, 600);
      //console.log('randomPosition', randomPosition)
      //game.make().color(game.randomColor()).x(randomPosition.x).y(randomPosition.y).width(8).height(8).createEntity();
      //game.make().color('red').position(-100, -100).width(32).height(32).createEntity();

      game.make().Player().color('#FF00FF').depth(20).position(0, 0, 0).texture(null).createEntity();

      // game.make().Border().createEntity();
      // game.systems.border.createBorder()
      game.use("Border", {
        autoBorder: true
      });

      // alert('createWorld')
    }
  }]);
  return EatWorld;
}();
_defineProperty(EatWorld, "id", 'eat-world');
_defineProperty(EatWorld, "type", 'world');

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// GravityGardens.js - Marak Squires 2024
var GravityGardens = /*#__PURE__*/function () {
  function GravityGardens() {
    _classCallCheck(this, GravityGardens);
    this.id = GravityGardens.id;
    this.type = GravityGardens.type;
    this.dropping = false;
    this.slurping = false;
  }
  _createClass(GravityGardens, [{
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // preload these plugins before the plugin starts
              game.use('Player');
              game.use('GravityWell');
              game.use('UnitSpawner');
              game.use('Teleporter');
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;

      // Changes the default mouse controls

      // Enables mouse wheel zoom
      game.data.camera.mouseWheelZoomEnabled = true;
      // Movements with right click, switch default left-click-to-move behavior
      game.config.mouseMovementButton = 'RIGHT';
      // Actions with left click
      game.config.mouseActionButton = 'LEFT';
      game.data.camera.scaleMultiplier = 0.9;
      // enables the default top-down mouse movements
      game.config.defaultMouseMovement = true;

      // we reset the game to clear any previous state
      game.reset();
      game.data.camera.follow = true;
      this.createWorld();
      this.createFounts(game);
      this.bindEvents();
      this.bindSutraRules();

      // we can lazy load these after the plugin has started
      game.use('CurrentFPS');
      game.use('StarField');
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setGravity(0, 0, 0);
      game.setSize(800, 600);
      game.createBorder({
        thickness: 20,
        collisionStart: function collisionStart(a, b, pair, context) {
          if (context.target.type === 'PARTICLE') {
            game.removeEntity(context.target.id);
          }
        }
      });

      // set the zoom level based on device type
      if (game.isTouchDevice()) {
        game.zoom(1);
      } else {
        game.zoom(2.5);
      }

      // Builds a Player config with GravityWell 
      var playerConfig = game.make().GravityWell() // The player will have a gravity well
      .Player() // The player Plugin
      .texture(null) // default texture is a player sprite
      .color(0xffcccc) // gives a color to the player
      .meta({
        repulsion: false // set the repulsion flag to false, attracts
      }).position(0, 0, 0); // sets the player position

      playerConfig.collisionStart(function (a, b, pair, context) {
        if (context.target.type !== 'WARP') {
          game.removeEntity(context.target.id);
        }
      });
      playerConfig = playerConfig.build();
      var player = game.createEntity(playerConfig);
      game.setPlayerId(player.id);
      game.make().type('WARP').Teleporter({
        destination: {
          world: 'Home'
        }
      }).texture('warp-to-home').size(64, 64, 64).isStatic(true)
      //.isSensor(true)
      .position(595, -30, 0).createEntity();
      game.make().type('TEXT').text('Warp To Mantra').width(200).style({
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      }).position(590, 30, 0).createEntity();
    }
  }, {
    key: "bindSutraRules",
    value: function bindSutraRules() {
      var _this = this;
      var game = this.game;
      var rules = game.rules;
      rules["if"]('USE_ITEM_1').then('switchGravity');
      rules["if"]('USE_ITEM_2').then('shakeCamera');
      rules["if"]('USE_ITEM_3').then('ZOOM_IN');
      rules["if"]('USE_ITEM_4').then('ZOOM_OUT');
      rules.on('switchGravity', function (entity, node, gameState) {
        _this.playerSwitchedGravity(entity, gameState);
      });
      rules.on('shakeCamera', function (entity, node, gameState) {
        game.shakeCamera({
          duration: 777,
          intensity: 1000
        });
      });
      rules.on('ZOOM_IN', function (entity) {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom + 0.01);
      });
      rules.on('ZOOM_OUT', function (entity) {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom - 0.01);
      });
    }

    // Plugin.update() is called once per game tick
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;
      var game = this.game;
      // mouse drops particles logic
      if (this.dropping && game.tick % 3 === 0) {
        // console.log('dropping', mousePosition.x, mousePosition.y);
        var randomRadialPosition = game.randomPositionRadial(this.mousePosition.x, this.mousePosition.y, 15);
        var randomColor = game.randomColor();
        // create burst of particles at this position
        game.createEntity({
          type: 'PARTICLE',
          kind: 'START',
          color: randomColor,
          isSensor: true,
          size: {
            width: 8,
            height: 8
          },
          position: randomRadialPosition
        });
      }

      // mouse slurps up particles logic
      if (this.slurping && game.tick % 3 === 0) {
        Object.keys(game.data.ents._).forEach(function (eId) {
          var entity = game.data.ents._[eId];
          if (entity.type !== 'BLACK_HOLE' && entity.type !== 'PLAYER') {
            game.applyGravity({
              position: _this2.mousePosition,
              mass: 1000
            }, entity, 0.01);
          }
        });
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var game = this.game;
      this.mousePosition = {
        x: 0,
        y: 0
      };
      var that = this;
      game.on('pointerUp', function (position, event) {
        that.dropping = false;
        that.slurping = false;
      });
      game.on('pointerDown', function (context, event) {
        var position = context.position;
        that.mousePosition = position;

        // adjust position for game camera offset
        that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
        that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
        that.mousePosition.clientX = event.clientX;
        that.mousePosition.clientY = event.clientY;
        // if right click
        if (event.button === 2) {}

        // if left click
        if (event.button === 0) {
          that.dropping = true;
          game.pingPosition(event.clientX, event.clientY, 1, {
            color: 'white',
            duration: 1500,
            size: 25,
            finalSize: 100,
            borderWidth: 3
          });
          that.slurping = true;
          game.pingPosition(event.clientX, event.clientY, 1, {
            reverse: true,
            color: 'red',
            duration: 1500,
            size: 25,
            finalSize: 100,
            borderWidth: 3
          });
        }
      });
      game.on('pointerMove', function (position, event) {
        that.mousePosition = position;
        that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
        that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
      });
    }
  }, {
    key: "createFounts",
    value: function createFounts() {
      var game = this.game;

      // will set the collistionStart flag to true in order to register collision events
      var particleCollision = true;
      game.make().name('fountA').type('FOUNT').UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0xf03025,
          isSensor: true,
          position: {
            x: 200,
            y: 0
          }
        }
      }).color(0xf03025).isStatic(true).size(8, 8).position(200, 0).createEntity(); // Finalizes and creates the entity

      game.make().name('fountB').type('FOUNT').UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0x14b161,
          isSensor: true,
          position: {
            x: -200,
            y: 0
          },
          sprayAngle: Math.PI
        }
      }).color(0x14b161).isStatic(true).size(8, 8).position(-200, 0).createEntity(); // Finalizes and creates the entity

      game.make().name('fountC').type('FOUNT').UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0x3c62f8,
          isSensor: true,
          position: {
            x: 0,
            y: -200
          },
          sprayAngle: Math.PI / 2
        }
      }).color(0x3c62f8).isStatic(true).size(8, 8).position(0, -200).createEntity(); // Finalizes and creates the entity

      game.make().name('fountD').type('FOUNT').UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0xe9dd34,
          isSensor: true,
          position: {
            x: 0,
            y: 200
          },
          sprayAngle: -Math.PI / 2
        }
      }).color(0xe9dd34).isStatic(true).size(8, 8).position(0, 200).createEntity(); // Finalizes and creates the entity
    }
  }, {
    key: "playerSwitchedGravity",
    value: function playerSwitchedGravity(entity, gameState) {
      var game = this.game;
      if (typeof gameState.lastGravitySwitch === 'undefined') {
        gameState.lastGravitySwitch = 0;
      }
      if (Date.now() - gameState.lastGravitySwitch >= 1000) {
        gameState.repulsion = !gameState.repulsion;

        // pings the screen center, assuming player is there
        var x = window.innerWidth / 2;
        var y = window.innerHeight / 2;
        x = x - game.data.camera.offsetX;
        y = y - game.data.camera.offsetY;
        if (entity.meta && entity.meta.repulsion) {
          game.pingPosition(x, y, 1, {
            reverse: true,
            color: 'white',
            duration: 1500,
            size: 50,
            finalSize: 200,
            borderWidth: 3
          });
          game.updateEntity({
            id: entity.id,
            color: 0xff0000,
            meta: {
              repulsion: false
            }
          });
        } else {
          game.pingPosition(x, y, 1, {
            color: 'red',
            duration: 1500,
            size: 50,
            finalSize: 200,
            borderWidth: 3
          });
          // update the player color
          game.updateEntity({
            id: entity.id,
            color: 0xffffff,
            meta: {
              repulsion: true
            }
          });
        }
        gameState.lastGravitySwitch = Date.now();
      }
    }
  }]);
  return GravityGardens;
}();
_defineProperty(GravityGardens, "id", 'gravity-gardens');
_defineProperty(GravityGardens, "type", 'world');
var _default = exports["default"] = GravityGardens;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _assets = _interopRequireDefault(require("./assets.js"));
var _sutras = _interopRequireDefault(require("./sutras.js"));
var _welcomeMessage = _interopRequireDefault(require("./welcomeMessage.js"));
var _createBackground = _interopRequireDefault(require("./lib/createBackground.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } //
// Mantra Home World
//
/*

  # Loading custom assets:

  Asset data can be loaded from a simple JSON config file

    game.addAssets(assets);

  Assets can be individually loaded in the `preload` method

    game.addAsset('/img/game/env/planet-express-base.png', 'image', 'planet-express-base');

*/ /*
  
   # Custom Game Logic

   Use Sutra to add or modify your game's behavior tree

    game.useSutra(sutras(game), 'HOME');


*/ // TODO: remove this and use game.flashMessage() instead
// TODO: make this a JSON object? it could be a list of entities
// TODO: make this a JSON object? it could be a list of entities
// game.load(backGroundEntities)
var Home = /*#__PURE__*/function () {
  // type is optional for Plugins

  function Home() {
    _classCallCheck(this, Home);
    this.id = Home.id;
    this.type = Home.type;
  }
  _createClass(Home, [{
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              //
              // game.addAssets() and game.addAsset() will accumulate assets into the preload queue
              //
              // game.start() and `game::ready` will wait for all assets to be loaded

              // add groups of assets
              game.addAssets(_assets["default"]);

              // add single assets
              game.addAsset('/img/game/env/planet-express-base.png', 'image', 'planet-express-base');
              game.addAsset('/img/game/env/robot-arms-apartment.png', 'image', 'robot-arms-apartment');
              game.addAsset('/img/game/logos/sutra-tree.png', 'image', 'sutra-tree');
              game.addAsset('/img/game/env/warp-to-platform.gif', 'image', 'warp-to-platform');
              game.addAsset('/img/game/env/warp-to-music.gif', 'image', 'warp-to-music');
              game.addAsset('/img/game/env/warp-to-ycraft.gif', 'image', 'warp-to-ycraft');
              game.addAsset('/img/game/env/garden.png', 'image', 'garden');

              //
              // Game.start will call await.preloader.loadAll() for you
              //
              //   You may optionally invoke preloader to immediately load assets and wait
              //
              //     await game.preloader.loadAll();
              //

              //
              // Use plugins in the preloader so that will be available when init() is called
              // You can await each plugin here, or let them preload in parallel automatically
              game.use('Block');
              game.use('Bomb');
              game.use('Border');
              game.use('Bullet');
              game.use('Boomerang');
              game.use('Flame');
              game.use('Player');
              game.use('Tone');
              game.use('Hexapod');
              game.use('Teleporter');
              game.use('Draggable');
              game.use('Collectable');
              // game.use('SwitchGraphics');
              game.use('Key');
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;

      // Movements with right click, switch default left-click-to-move behavior
      game.config.mouseMovementButton = 'RIGHT';
      // Actions with left click
      game.config.mouseActionButton = 'LEFT';
      // enables the default top-down mouse movements

      // reset any previous worlds / game state
      game.reset();
      game.data.camera.scaleMultiplier = 2.5;
      var mouse = game.systems.mouse;

      // enables mouse wheel zoom
      game.data.camera.mouseWheelZoomEnabled = false;
      this.createWorld();
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setBackground('#007fff');
      game.data.camera.follow = true;
      if (game.isTouchDevice()) {
        game.zoom(1.44);
      } else {
        game.zoom(4.5);
      }

      // game.make().Block().size(16).clone(10).createEntity();

      game.setSize(16000, 9000);
      game.setGravity(0, 0, 0);
      var player1 = game.make().Player({
        lives: 99
      });
      player1 = player1.createEntity();
      game.setPlayerId(player1.id);
      // TODO: setup doors and keys on home page like Maze World ( easy )
      // game.make().Key().position(-100, 100, 10).createEntity();

      //
      // Create 22 Hexapods
      //
      var numberOfHexapods = 24;
      var radius = 80;
      var collectFn = function collectFn(entity) {
        console.log('got hexapod', entity.id);
      };
      for (var i = 0; i < numberOfHexapods; i++) {
        // Calculate the angle for each hexapod
        var angle = i / numberOfHexapods * 2 * Math.PI;
        // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
        var x = radius * Math.cos(angle);
        var y = radius * Math.sin(angle);
        game.make().Hexapod().Draggable().size(8).position(x, y, 0).createEntity();
        // .collectable(true).afterItemCollected(collectFn)
      }
      ;
      game.make().Block().size(16).position(0, -32).offset(0, 64).repeat(2).createEntity();
      game.make().Block().size(16).position(-32, 0).offset(64, 0).repeat(2).createEntity();
      this.createTwinFlames();
      (0, _welcomeMessage["default"])(game);
      game.useSutra((0, _sutras["default"])(game), 'HOME');
      (0, _createBackground["default"])(game);
    }
  }, {
    key: "createTwinFlames",
    value: function createTwinFlames() {
      // See Flame plugin for .build() entity config
      this.game.make().Flame().position(-80, -60, 16).createEntity();
      this.game.make().Flame().position(80, -60, 16).createEntity();
    }
  }, {
    key: "unload",
    value: function unload() {
      // optionally unload assets / remove events / etc
      // in most cases calling `game.reset()` at the start of the next world is sufficient
    }
  }]);
  return Home;
}();
_defineProperty(Home, "id", 'world-home');
_defineProperty(Home, "type", 'world');
var _default = exports["default"] = Home;

},{"./assets.js":31,"./lib/createBackground.js":32,"./sutras.js":33,"./welcomeMessage.js":35}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  'jogurt': {
    type: 'spritesheet',
    url: '/img/game/sheets/jogurt.png',
    frameWidth: 20,
    frameHeight: 24,
    frameTags: {
      walkDown: {
        frames: [{
          x: 0,
          y: 0
        }, {
          x: 0,
          y: -28
        }]
      },
      walkUp: {
        frames: [{
          x: -22,
          y: 0
        }, {
          x: -22,
          y: -28
        }]
      },
      walkLeft: {
        frames: [{
          x: -44,
          y: 0
        }, {
          x: -44,
          y: -28
        }]
      },
      walkRight: {
        frames: [{
          x: -70,
          y: -1
        }, {
          x: -70,
          y: -28
        }]
      }
    }
  }
};

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createBackground;
function createBackground(game) {
  game.make().type('BACKGROUND').texture('garden').body(false).size(300, 300, 1).position(0, 0, -10).createEntity();
  game.make().type('BACKGROUND').texture('sutra-tree').body(false).size(1024 / 4, 1024 / 4, 1).position(0, 300, 32).createEntity();
  game.make().type('BACKGROUND').texture('robot-arms-apartment').kind('building').size(1340, 3668, 1).body(false).position(900, -1800, -1).createEntity();
  game.make().type('BACKGROUND').texture('planet-express-base').kind('building').size(2048, 2048, 1).body(false).position(-900, -800, -1).createEntity();
  game.make().type('BLOCK').texture('tile-block').size(200, 200, 1).mass(10000).position(200, -800, -8).createEntity();

  // if touch warp, switch to YCraft level
  game.createEntity({
    type: 'WARP',
    // kind: 'YCraft',
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-ycraft',
    isStatic: true,
    isSensor: true,
    exit: {
      world: 'YCraft',
      // optional, if not specified will use the current world
      position: {
        // optional, if not specified will use 0,0,0
        x: 0,
        y: 0
      }
    },
    position: {
      x: 0,
      y: -210,
      z: 32
    }
  });

  // text label saying "Warp To YCraft World"
  game.createEntity({
    type: 'TEXT',
    text: 'Warp To YCraft World',
    width: 164,
    // kind: 'dynamic',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center',
      paddingLeft: '20px' // for now
    },
    body: false,
    position: {
      x: -20,
      y: -220,
      z: 64
    }
  });
  game.createEntity({
    name: 'css-text',
    type: 'TEXT',
    text: 'CSSGraphics Engine',
    width: 20,
    color: 0x000000,
    style: {
      width: '150px',
      fontSize: '12px',
      textAlign: 'center',
      color: 'black',
      opacity: 0.22
    },
    body: false,
    position: {
      x: -63,
      y: -16,
      z: -2
    }
  });

  /*
  game.make().Teleporter().position(55, 71, 10)
    .size(16)
    .width(16)
    .height(16)
    .createEntity();
     game.make().Teleporter().position(-55, 71, 10)
    .size(16)
    .width(16)
    .height(16)
    .createEntity();
    */

  // if touch warp, switch to Music level
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Music'
    },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-music',
    isStatic: true,
    isSensor: true,
    position: {
      x: -250,
      y: 0,
      z: 32
    }
  });

  // text label saying "Warp To Platform World"
  game.createEntity({
    type: 'TEXT',
    width: 100,
    text: 'Warp To Music World',
    // width: 200,
    color: 0x000000,
    style: {
      width: '100px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: -250,
      y: -30,
      z: 64
    }
  });

  // text label saying "Warp To Platform World"
  game.createEntity({
    type: 'TEXT',
    text: 'Warp To Platform World',
    color: 0x000000,
    width: 120,
    height: 200,
    style: {
      width: '120px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: 250,
      y: 20,
      z: 64
    }
  });
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Platform'
    },
    width: 64,
    height: 64,
    depth: 64,
    texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 0,
      z: 32
    }
  });

  //
  // Warp to Maze World
  //
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'Maze'
    },
    width: 64,
    height: 64,
    depth: 64,
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: -250,
      y: 250,
      z: 32
    }
  });

  // text label
  game.createEntity({
    type: 'TEXT',
    width: 80,
    text: 'Maze World',
    // width: 200,
    color: 0x000000,
    style: {
      width: '50px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: -235,
      y: 280,
      z: 32
    }
  });

  //
  // Warp to Gravity Gardens
  //
  game.createEntity({
    type: 'WARP',
    exit: {
      world: 'GravityGardens'
    },
    width: 64,
    height: 64,
    depth: 64,
    // texture: 'warp-to-platform',
    isStatic: true,
    isSensor: true,
    position: {
      x: 250,
      y: 250,
      z: 32
    }
  });

  // text label
  game.createEntity({
    type: 'TEXT',
    width: 80,
    text: 'Gravity Gardens',
    // width: 200,
    color: 0x000000,
    style: {
      width: '100px',
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: 240,
      y: 280,
      z: 32
    }
  });

  /*
  // if touch note play sound
  game.createEntity({
    type: 'NOTE',
    color: 0xccff00,
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: -120,
      y: -200,
      z: 32
    }
  });
  */
}

/*
// switch to CSSGraphics
game.createEntity({
  name: 'CSSGraphics',
  kind: 'CSSGraphics',
  collisionActive: true,
  collisionEnd: true,
  collisionStart: true,

  type: 'TEXT',
  text: 'CSS',
  width: 60,
  height: 50,
  //color: 0xffffff,
  style: {
    width: '60px',
    height: '30px',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
    // border: '1px solid white',
    opacity: 0.7
  },
  body: true,
  isSensor: true,
  position: {
    x: -55,
    y: 75,
    z: 10
  }
});
*/

/*
// switch to 3d text label
game.createEntity({
  name: 'BabylonGraphics',
  collisionActive: true,
  collisionEnd: true,
  collisionStart: true,
  kind: 'BabylonGraphics',
  type: 'TEXT',
  text: '3D',
  width: 60,
  height: 50,
  color: 0x000000,
  style: {
    width: '60px',
    height: '30px',
    fontSize: '12px',
    color: 'white',
    textAlign: 'center',
    opacity: 0.7
  },
  body: true,
  isSensor: true,
  position: {
    x: 55,
    y: 75,
    z: 64
  }
});
*/

/*
game.createEntity({
  name: 'noteInfo',
  type: 'TEXT',
  text: 'This is a note, touch it to play a sound',
  fontSize: 16,
  color: 0x000000,
  body: false,
  style: {
    fontSize: '16px'
  },
  position: {
    x: 0,
    y: -200,
    z: 64
  }
});
*/

/*

game.createEntity({
name: 'raiden-left',
type: 'BACKGROUND',
width: 64,
height: 64,
depth: 64,
style: {
display: 'none'
},
texture: 'raiden',
body: false,
position: {
x: 0,
y: 10,
z: 32
}
});

game.createEntity({
name: 'raiden-right',
type: 'BACKGROUND',
width: 64,
height: 64,
depth: 64,
style: {
display: 'none'
},
texture: 'raiden',
body: false,
position: {
x: 100,
y: 10,
z: 32
}
});

*/

/*
// displays some items from the spritesheet
let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];
itemsList = []; // for now
itemsList.forEach((item, index) => {
  game.createEntity({
    type: item.toUpperCase(),
    kind: item,
    width: 16,
    height: 16,
    depth: 32,
    texture: {
      sheet: 'loz_spritesheet',
      sprite: item,
    },
    position: {
      x: -100 + (index * 32),
      y: 150,
      z: 32
    }
  });
});
*/

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sutras;
var _switchGraphics = _interopRequireDefault(require("../sutras/switchGraphics.js"));
var _walker = _interopRequireDefault(require("../TowerDefense/sutras/walker.js"));
var _routing = _interopRequireDefault(require("../sutras/routing.js"));
var _block = _interopRequireDefault(require("./sutras/block.js"));
var _demon = _interopRequireDefault(require("../../mantra-sutras/demon.js"));
var _topDown = _interopRequireDefault(require("../../mantra-sutras/player-movement/top-down.js"));
var _bomb = _interopRequireDefault(require("../../mantra-sutras/bomb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// helper sutra for switching worlds

// walker is npc that walks around route

// routing helper to create vector routes

// import fire from "../../mantra-sutras/fire.js";

// import hexapod from '../../mantra-sutras/hexapod.js';

function sutras(game) {
  var rules = game.createSutra();

  // movement
  // not work, inputs to sutra tick not making it to subtree?
  // double check sutra tick in mantra plugin and sutra core
  // this *should* work
  // rules.use(movement(game), 'movement');

  // for now, ensure that player input movement sutras are top level rules
  // we should be able to use the movement sutra as a sub-sutra, see above comment
  game.useSutra((0, _topDown["default"])(game), 'mode-topdown');

  // helper for switching graphics
  var switchGraphicsSutra = (0, _switchGraphics["default"])(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');

  // walker is npc that walks around route
  rules.use((0, _walker["default"])(game, {
    route: _routing["default"].createRectangleRoute(-50, -150, 200, -150),
    // route: routing.createLineRoute(-50, -150, 200, -150, 20),
    // route: routing.createCircleRoute(0, 0, 100, 20),
    tolerance: 5
  }), 'walker');

  // helper for playing notes
  rules.on('playNote', function (collision) {
    return game.playNote(collision.note);
  });

  // fire entity
  // rules.use(fire(game), 'fire');

  // block entity
  rules.use((0, _block["default"])(game), 'block');

  // demon entity
  rules.use((0, _demon["default"])(game), 'demon');

  // hexapod entity
  // rules.use(hexapod(game), 'hexapod');

  // bomb item
  rules.use((0, _bomb["default"])(game), 'bomb');

  // console.log('created sutra', rules.toEnglish())
  return rules;
}

},{"../../mantra-sutras/bomb.js":20,"../../mantra-sutras/demon.js":21,"../../mantra-sutras/player-movement/top-down.js":27,"../TowerDefense/sutras/walker.js":57,"../sutras/routing.js":63,"../sutras/switchGraphics.js":64,"./sutras/block.js":34}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fire;
function fire(game) {
  var rules = game.createSutra();
  rules.addCondition('playerTouchedBlock', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules.addCondition('bulletTouchedBlock', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'BULLET' && entity.bodyB.type === 'BLOCK') {
        return true;
      }
      if (entity.bodyB.type === 'BLOCK' && entity.bodyA.type === 'BULLET') {
        return true;
      }
    }
  });

  /*
  rules.if('playerTouchedBlock')
    .then('playNote', {
      note: 'C2'
    })
  */

  rules["if"]('bulletTouchedBlock').then('playNote', {
    note: 'C4'
  });

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', function (entity, ev) {
    if (entity.type === 'BLOCK' && entity.kind === 'Tile') {
      game.playNote('C2');

      // Calculate the center of the tile
      var centerX = entity.width / 2;
      var centerY = entity.height / 2;

      // Calculate the difference between the click position and the center
      var diffX = ev.offsetX - centerX;
      var diffY = ev.offsetY - centerY;

      // Determine the direction to move the tile
      var directionX = 0;
      var directionY = 0;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Move horizontally in the opposite direction
        directionX = diffX > 0 ? -32 : 32; // Move left if click is to the right of center, else move right
      } else {
        // Move vertically in the opposite direction
        directionY = diffY > 0 ? -32 : 32; // Move up if click is below center, else move down
      }

      // Apply the new position
      game.applyPosition(entity.id, {
        x: directionX,
        y: directionY
      });
    }
  });
  return rules;
}
;

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = welcomeMessage;
function welcomeMessage(game) {
  if (game.hasShownWelcomeMessage !== true) {
    game.hasShownWelcomeMessage = true;
  } else {
    console.log('welcomeMessage already run once');
    return;
  }
  if (typeof window === 'undefined') {
    console.log('welcomeMessage only runs on client');
    return;
  }
  // calculate font size based on window size
  var fontSize = Math.floor(window.innerWidth / 15) + 'px';
  // calculate x / y based on window size
  var x = Math.floor(window.innerWidth / 2);
  var y = 110;
  if (is_touch_enabled()) {
    y = 30;
  }
  var typer = game.systems['typer-ghost'].createQueuedText({
    x: x,
    y: y,
    style: {
      color: 'white',
      fontSize: fontSize,
      width: '100%',
      // adds 3d shadow to text with black outline
      textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      // Adjust this value to position the text lower or higher from the top
      left: '50%',
      // Center horizontally
      transform: 'translateX(-50%)',
      // Ensure exact centering
      lineHeight: '1',
      zIndex: '999'
    },
    duration: 5000,
    removeDuration: 6000
  });

  // TODO: custom messages for mobile / vs desktop
  // Queueing additional messages
  typer.queueText('Welcome to Mantra Worlds', 5000, 2000);
  typer.queueText('WASD to move', 5000, 3000);
  typer.queueText('Click to interact', 5000, 3000);
  //typer.queueText('Zoom with Mouse Wheel', 5000, 3000);
  //typer.queueText('Press START to Switch Worlds', 5000, 2000);
  //typer.queueText('Press SELECT to Open Menu', 5000, 2000);
  typer.queueText('USB Gamepad Support', 5000, 2000);

  // Start processing the queue
  typer.processQueue();
}
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{}],36:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InfinityTower = exports["default"] = /*#__PURE__*/function () {
  function InfinityTower() {
    _classCallCheck(this, InfinityTower);
    this.id = InfinityTower.id;
  }
  _createClass(InfinityTower, [{
    key: "preload",
    value: function preload(game) {
      //game.use('Tower');
      game.use('Hexapod');
      game.use('Block');
      // game.use('Border', { autoBorder: true });
      game.use('Bullet');
      game.use('Boomerang');
      game.use('Tone');
      game.use('Tile');
      game.use('Collectable');
      game.use('RBush');
      game.use('UnitSpawner');
      game.use('Teleporter');
      game.use('Draggable');
    }
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.reset();
      game.zoom(2.5);
      game.setGravity(0, 0, 0);
      game.createPlayer({
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'player'
        },
        position: {
          x: -100,
          y: 10,
          z: 1
        }
      });
      game.setBackground('#000000');
      //
      // Create initial Towers
      //
      //game.make().Tower().color('#d000ff').position(-200, -20).offset(50).repeat(5).createEntity();
      //game.make().Tower().color('purple').position(-175, -40).offset(50).repeat(4).createEntity();
      //game.make().Tower().Draggable().color('yellow').position(0, 140).createEntity();
      // let a = game.make().Tower().Draggable().color('yellow').position(-175, 140);

      function onDrop(context, event) {
        // update the position of the context entity to the dropTarget
        // mix the current colors if possible
        var colorA = context.color;
        var colorB = context.dropTarget.color;
        if (colorA && colorB) {
          console.log('colorA', colorA, 'colorB', colorB);
          var configA = game.make().color(colorA).build();
          var configB = game.make().color(colorB).build();
          var mixed = game.make().mix(configA).mix(configB).build();

          // check that ent exists
          var exists = game.exists(context.id);
          if (!exists) {
            // console.log('context entity does not exist');
            return;
          }
          game.updateEntity(context.id, {
            color: mixed.color,
            size: {
              width: context.size.width * 1.5,
              height: context.size.height * 1.5
            }

            // increase size of entity by 1.5x
            /* Remark: why did this not work for CSSGraphics?
            */
          });
        }
        game.updateEntity(context.id, {
          position: context.dropTarget.position
        });
        game.removeEntity(context.dropTarget.id);
      }

      // assume 24 color HSV wheel and generate all colors as int or hex whatever is easy
      for (var i = 0; i < 24; i++) {
        var conf = game.make().Tower({
          fireRate: 100,
          bulletConfig: {
            texture: {
              sheet: 'loz_spritesheet',
              sprite: 'player'
            },
            velocity: {
              x: 0,
              y: 1
            }
          }
        }).Draggable().Droppable().onDrop(onDrop).position(-200 + i * 40, 0);
        conf.isSensor(true);
        console.log('conf', conf);
        // we need to generate color wheel here as int or hex
        //let color = ;
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        conf.color(color);
        conf.createEntity();
      }

      //
      // Left NPC Spawner
      //
      var hexapodConfigLeft = game.make().Hexapod().texture(null).radius(4).color('#007fff');
      hexapodConfigLeft.meta({
        maxUnits: 22
      });
      var unitSpawnerLeft = game.make().UnitSpawner({
        unitConfig: hexapodConfigLeft.config,
        sprayAngle: Math.PI,
        texture: 'hexapod'
      }).texture('hexapod').radius(1).position(-300, -200, 0).createEntity();

      //
      // Right NPC Spawner
      //
      var hexapodConfig = game.make().Hexapod().texture(null).radius(4).color('red');
      hexapodConfig.meta({
        maxUnits: 22
      });
      var unitSpawner = game.make().UnitSpawner({
        unitConfig: hexapodConfig.config
      }).texture(null).radius(1).color('red').position(300, -800, 0).createEntity();

      //
      // End zone - create a solid red line that has collisionStart handler to destroy ents
      //
      var endzoneConfig = game.make().position(-80, 50, 0).color('red').isStatic(true).width(400).height(10);
      endzoneConfig.collisionStart(function (ent) {
        if (ent.type === 'HEXAPOD') {
          game.removeEntity(ent.id);
        }
      });
      endzoneConfig.createEntity();

      //
      // warp to Mantra Home World
      //
      game.make().Teleporter({
        destination: {
          world: 'Home'
        }
      }).size(64).position(-400, -100, 0).texture('warp-to-home').createEntity();
      game.createEntity({
        type: 'WARP',
        exit: {
          world: 'Home'
        },
        texture: 'warp-to-home',
        width: 64,
        height: 64,
        isStatic: true,
        position: {
          x: -400,
          y: -100,
          z: 0
        }
      });

      // text "Warp to Mantra"
      game.createEntity(_defineProperty(_defineProperty({
        type: 'TEXT',
        text: 'Warp To Mantra',
        body: false,
        // kind: 'dynamic',
        style: {
          padding: '2px',
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center'
        }
      }, "body", false), "position", {
        x: -400,
        y: -120
      }));
    }
  }]);
  return InfinityTower;
}();
_defineProperty(InfinityTower, "id", 'world-infinity-tower');
_defineProperty(InfinityTower, "type", 'world');

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createDoors = _interopRequireDefault(require("./lib/createDoors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Maze = /*#__PURE__*/function () {
  function Maze() {
    _classCallCheck(this, Maze);
    this.id = Maze.id;
  }
  _createClass(Maze, [{
    key: "preload",
    value: function preload(game) {
      game.use('Key');
      game.use('Block');
      game.use('Bullet');
      game.use('Boomerang');
      game.use('Tone');
      game.use('Tile');
      game.use('Collectable');
      game.use('Container');
    }
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.reset();
      game.zoom(2.5);
      game.setGravity(0, 0, 0);
      game.createPlayer({
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'player'
        },
        position: {
          x: -100,
          y: 10,
          z: 1
        }
      });

      // TODO: sugar syntax for equipping items
      // Remark: Entity.items is reserved for layout and positioning
      //         Entity.meta.equippedItems is reserved for current eqipped item systems
      //         Entity.meta.inventory is reserved for inventory systems
      game.updateEntity(game.currentPlayerId, {
        meta: {
          equippedItems: [{
            plugin: 'bullet',
            method: 'fireBullet'
          }]
        }
      });
      game.setBackground('#000000');

      // game.use('Border', { autoBorder: true });
      (0, _createDoors["default"])(game);

      //
      // warp to Mantra Home World
      //
      game.createEntity({
        type: 'WARP',
        exit: {
          world: 'Home'
        },
        texture: 'warp-to-home',
        width: 64,
        height: 64,
        isStatic: true,
        position: {
          x: -400,
          y: -100,
          z: 0
        }
      });

      // text "Warp to Mantra"
      game.createEntity(_defineProperty(_defineProperty({
        type: 'TEXT',
        text: 'Warp To Mantra',
        body: false,
        // kind: 'dynamic',
        style: {
          padding: '2px',
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center'
        }
      }, "body", false), "position", {
        x: -400,
        y: -120
      }));
    }
  }]);
  return Maze;
}();
_defineProperty(Maze, "id", 'world-maze');
_defineProperty(Maze, "type", 'world');
var _default = exports["default"] = Maze;

},{"./lib/createDoors":38}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createDoors;
function createHomeKey(game) {
  game.make().Key().position(-100, 30, 0).createEntity();
}
function createDoors(game) {
  //
  // Creates a CONTAINER to hold the doors
  // 
  // Containers are a way to group entities together
  // With no layout given, entities will be placed relative to the container
  // With a layout given, entities will be placed according to the layout algorithm

  var container = game.make().Container({
    layout: 'grid',
    grid: {
      columns: 4,
      rows: 8
    }
  }).color(0xff00ff).name('laby-container').width(300).height(150).position(-100, -100, -1).style({
    padding: 0,
    margin: 0,
    // background: '#ff0000', // can also use Entity.color
    border: {
      color: '#000000',
      width: 0
    }
  }).createEntity();

  /*
  let container2 = game.createContainer({
  name: 'laby-container-2',
  layout: 'grid', // optional. can also be "flex" or "none"
  color: 0xff00ff,
  position: {
    x: -100,
    y: -100,
    z: -1
  },
  body: false,
  size: {
    width: 300,
    height: 180
  },
  grid: {
    columns: 4,
    rows: 8
  },
  style: { // supports CSS property names
    padding: 0,
    margin: 0,
    // background: '#ff0000', // can also use Entity.color
    border: {
      color: '#000000',
      width: 0
    }
  },
  });
  */

  var algos = [];
  algos.push('AldousBroder');
  algos.push('BinaryTree');
  algos.push('CellularAutomata');
  algos.push('EllersAlgorithm');
  algos.push('GrowingTree');
  algos.push('RecursiveBacktrack');
  algos.push('RecursiveDivision');
  algos.push('BeattieSchoberth');
  algos.push('ThomasHunter');
  algos.push('Metroidvania');
  var _loop = function _loop(i) {
    // create entity directly inside container with relative position
    game.createEntity({
      name: 'maze-door-' + i,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor'
      },
      color: 0x00ff00,
      container: 'laby-container',
      body: true,
      meta: {
        source: 'labryninthos',
        algo: 'recursive-backtracking',
        height: 16,
        width: 16
      },
      isStatic: true,
      type: 'DOOR',
      size: {
        width: 16,
        height: 16
      },
      collisionStart: function collisionStart(a, b) {
        // get the a b that isnt the door
        var enterEnt = a.name === 'maze-door-' + i ? a : b;
        var player = a.type === 'PLAYER' ? a : b;
        // only allow player collisions to trigger door events
        if (player.type !== 'PLAYER') {
          return;
        }

        // check to see if entity that collides has items which contains any type === 'KEY'
        // if so, remove the key and open the door

        // does the player have any items
        if (!player.items || player.items.length === 0) {
          game.shakeCamera({
            initialIntensity: 22,
            duration: 666
          });
          return;
        }

        // TODO: make this a CONTAINER and then just remove all items in container
        // default behavior is to clear all tiles

        // clear all keys
        if (game.data.ents.KEY) {
          game.data.ents.KEY.forEach(function (key) {
            game.removeEntity(key.id);
          });
          // create a new key at where it started
          createHomeKey(game);
        }
        game.flash();
        game.flashText(algos[i]);

        // clear all current tiles
        if (game.data.ents.TILE) {
          game.data.ents.TILE.forEach(function (tile) {
            game.removeEntity(tile.id);
          });
        }

        // Tile.createTile() can delegate ent types with override in TileSet config
        // currently only BLOCK, we'll need to figure out to clear entire level or perhaps scene / container
        if (game.data.ents.BLOCK) {
          game.data.ents.BLOCK.forEach(function (block) {
            game.removeEntity(block.id);
          });
        }

        // clear any tiles that are deferred
        for (var eId in game.deferredEntities) {
          var ent = game.deferredEntities[eId.toString()];
          if (ent.type === 'TILE') {
            // game.removeEntity(ent.id);
            delete game.deferredEntities[eId.toString()];
          }
        }

        // clear the players items
        game.updateEntity({
          id: player.id,
          items: []
        });

        // update the player position to the exit position ( can customimze this )
        // game.setPosition(enterEnt.id, { x: 0, y: 0, z: 0 }); // for now, can use .meta.position as well

        // generate a new seed and regenerate the maze with the new seed and existing settings
        var seed = Math.floor(Math.random() * 100000000000);
        var tileMap = {
          x: 20,
          // Remark: This will place tile map in TileMap units, not pixed
          y: -6,
          // Actual values will be x * 16, y * 16
          width: 32,
          height: 32,
          seed: seed,
          algo: algos[i],
          meta: {
            source: 'labryninthos',
            algo: 'recursive-backtracking',
            height: 16,
            width: 16
          }
        };

        // TODO: remove this if we can
        game.systems.tile.tileMap = tileMap;
        // set the new seed
        // ileMap.seed = seed;

        // regenerate the tile map
        game.systems.tile.createTileMap(tileMap);
      }
    });

    // create a text label for each door
    game.createEntity({
      type: 'TEXT',
      text: algos[i],
      size: {
        width: 80,
        height: 10
      },
      style: {
        fontSize: '8px'
      },
      body: false,
      position: {
        // relative to the container
        x: 0,
        y: 0,
        z: 0
      },
      container: 'laby-container'
    });
  };
  for (var i = 0; i < 10; i++) {
    _loop(i);
  }
  createHomeKey(game);

  // create text label instruction for picking up keys
  game.createEntity({
    type: 'TEXT',
    body: false,
    text: 'Collect keys to open doors',
    size: {
      width: 400,
      height: 20
    },
    style: {
      fontSize: '16px',
      color: '#ffffff',
      textAlign: 'center'
    },
    position: {
      x: -100,
      y: 20
    }
  });
}

},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createPiano = _interopRequireDefault(require("./instruments/createPiano.js"));
var _createDrumKit = _interopRequireDefault(require("./instruments/createDrumKit.js"));
var _topDown = _interopRequireDefault(require("../../mantra-sutras/player-movement/top-down.js"));
var _sutras = _interopRequireDefault(require("./sutras.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Music = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Music() {
    _classCallCheck(this, Music);
    this.id = Music.id;
  }
  _createClass(Music, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // Movements with right click, switch default left-click-to-move behavior
      game.config.mouseMovementButton = 'LEFT';
      // Actions with left click
      game.config.mouseActionButton = 'RIGHT';
      // enables the default top-down mouse movements
      game.config.defaultMouseMovement = true;
      game.reset();
      this.bindEvents();
      this.createWorld();
      game.make().Tower().color('purple').mass(10000).position(300, -40).angle(-180).offset(50).createEntity();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var game = this.game;
      this.mousePosition = {
        x: 0,
        y: 0
      };
      var that = this;
      game.on('pointerUp', function (position, event) {
        that.dropping = false;
        that.slurping = false;
      });
      game.on('pointerDown', function (context, event) {
        // alert('event')
        var position = context.position;
        that.mousePosition = position;
        // adjust position for game camera offset
        that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
        that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
        that.mousePosition.clientX = event.clientX;
        that.mousePosition.clientY = event.clientY;
        // if right click
        if (context.buttons[game.config.mouseActionButton]) {
          game.make().Tower({
            fireRate: 10
          }).x(position.x).y(position.y).angle(-180).createEntity();
        }

        // if left click
        if (event.button === 0) {
          that.dropping = true;
          //game.pingPosition(event.clientX, event.clientY, 1, { color: 'white', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
          that.slurping = true;
          //game.pingPosition(event.clientX, event.clientY, 1, { reverse: true, color: 'red', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
        }
      });
      game.on('pointerMove', function (position, event) {
        that.mousePosition = position;
        that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
        that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
      });
    }
  }, {
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              game.use('Bullet');
              game.use('Text');
              game.use('Platform');
              game.use('Teleporter');
              game.use('Hexapod');
              game.use('Player');
              game.use('Tower');
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setSize(2200, 600);
      //game.setGravity(0, 4.3, 0);
      game.setGravity(0, 0, 0);
      game.make().Hexapod().repeat(22).createEntity();
      if (game.isTouchDevice()) {
        game.zoom(1.44);
      } else {
        game.zoom(2.5);
      }
      game.make().Player().texture({
        sheet: 'loz_spritesheet',
        sprite: 'player'
      }).position(352, 80, 2).createEntity();
      game.customMovement = false;
      game.setBackground('black');
      var pianoConfig = {
        position: {
          x: -200,
          y: 200
        },
        //width: 4096 / 2, // Total width for the piano
        //height: 128 / 2// Height of each key
        width: 1028,
        height: 64
      };

      // text label for piano
      game.createEntity({
        type: 'TEXT',
        text: 'Click or Jump on the Piano',
        // kind: 'dynamic',
        //color: 0xffffff,
        style: {
          fontSize: '16px',
          color: '#ffffff',
          textAlign: 'center'
        },
        body: false,
        position: {
          x: 352,
          y: 150,
          z: 64
        }
      });
      (0, _createPiano["default"])(game, pianoConfig);
      // Usage example
      var drumKitConfig = {
        position: {
          x: 1000,
          y: 150
        } // Base position of the drum kit
      };
      (0, _createDrumKit["default"])(game, drumKitConfig);

      /*
      game.createEntity({
        type: 'PLATFORM',
        isStatic: true,
        width: 1000,
        height: 40,
        position: {
          x: 0,
          y: 200
        }
      });
      */

      /*
      game.createEntity({
        type: 'BLOCK',
        texture: 'tile-block',
        width: 32,
        height: 32,
        position: {
          x: -400,
          y: -150
        },
        friction: 1, 
        frictionAir: 1, 
        frictionStatic: 1
      });
      */

      game.use('Block');
      // game.use('Tile');
      game.use('Tone');
      game.use('Boomerang');
      game.use('Bullet');
      // game.use('Sword')

      game.use('Border', {
        autoBorder: true
      });
      var rules = game.rules;

      // set the Sutra rules for Home world
      game.useSutra((0, _sutras["default"])(game), 'MUSIC');

      // Teleports the Player to the Home world
      game.make().Teleporter({
        destination: {
          world: 'Home'
        },
        clickToTeleport: false
      }).texture('warp-to-home').size(64).position(195, -10, 1).createEntity();
      game.make().Text().text('Warp To Mantra').width(200).style({
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      }).position(195, -60).createEntity();
      game.createEntity({
        type: 'PLATFORM',
        // kind: 'ice',
        width: 200,
        height: 16,
        // color: 0x00ff00,
        isStatic: true,
        position: {
          x: 1000,
          y: 210
        }
      });
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
  return Music;
}();
_defineProperty(Music, "id", 'world-music');
// "world" type has special features in that it can be unloaded and reloaded.
//  with special rules such as merge, replace, etc.
//  this is currently used when switching between worlds in the GUI Editor
//  the default behavior is to unload the world, then load the new world
_defineProperty(Music, "type", 'world');
var _default = exports["default"] = Music;
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{"../../mantra-sutras/player-movement/top-down.js":27,"./instruments/createDrumKit.js":40,"./instruments/createPiano.js":41,"./sutras.js":42}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createDrumKit;
function createDrumKit(game, config) {
  // Drum kit components with their properties
  var drumComponents = [{
    type: 'kick',
    color: 0xffffff,
    width: 25,
    height: 25,
    position: {
      x: 0,
      y: 12.5
    }
  }, {
    type: 'snare',
    color: 0xffffff,
    width: 15,
    height: 15,
    position: {
      x: 0,
      y: -12.5
    }
  }, {
    type: 'hiHatClosed',
    color: 0xffffff,
    width: 10,
    height: 10,
    position: {
      x: -15,
      y: -7.5
    }
  }, {
    type: 'hiHatOpen',
    color: 0xffffff,
    width: 10,
    height: 10,
    position: {
      x: -15,
      y: 7.5
    }
  }, {
    type: 'tomLow',
    color: 0xffffff,
    width: 17.5,
    height: 17.5,
    position: {
      x: 17.5,
      y: -7.5
    }
  }, {
    type: 'tomHigh',
    color: 0xffffff,
    width: 12.5,
    height: 12.5,
    position: {
      x: 17.5,
      y: 7.5
    }
  }];
  drumComponents.forEach(function (drum) {
    // Adjust positions based on the config's base position
    var posX = config.position.x + drum.position.x;
    var posY = config.position.y + drum.position.y;
    game.createEntity({
      type: 'DRUM',
      kind: drum.type,
      color: drum.color,
      width: drum.width,
      height: drum.height,
      isStatic: true,
      position: {
        x: posX,
        y: posY
      }
    });

    // TODO: Remark: TEXT labels weren't aligned properly, removed for now
    /*
    // Adjust label positions
    const labelX = posX + drum.width / 2; // centering the label over the drum
    const labelY = posY + drum.height / 2; // centering the label over the drum
     game.createEntity({
      type: 'TEXT',
      text: drum.type,
      color: 0x000000,
      style: {
        font: '3px monospace',
        textAlign: 'right',
        zIndex: 999
      },
      body: false,
      position: {
        x: labelX,
        y: labelY,
        z: 999
      }
    });
    */
  });
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createPiano;
function createPiano(game, config) {
  var whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  var blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
  var xPosition = config.position.x;

  // Calculate key widths based on total width and number of white keys
  var totalWhiteKeys = 52; // 7 white keys per octave, 7.5 octaves
  var keyWidth = config.width / totalWhiteKeys;
  var blackKeyWidth = keyWidth / 2.5; // Black keys are usually narrower

  var keyHeight = config.height;
  var blackKeyHeight = keyHeight / 2;
  var _loop = function _loop(octave) {
    whiteKeys.forEach(function (note, index) {
      var key = note + octave;
      game.createEntity({
        type: 'NOTE',
        kind: key,
        color: 0xffffff,
        // White key color
        style: {
          borderRadius: '0px'
        },
        pointerdown: function pointerdown() {
          // alert('play')
        },
        width: keyWidth,
        height: keyHeight,
        isStatic: true,
        isSensor: true,
        position: {
          x: xPosition,
          y: config.position.y
        }
      });

      /* TODO: add back, was having issue getting pointerDown event context
      game.createEntity({
        type: 'TEXT',
        name: 'piano-roll-text',
        kind: key,
        text: key,
        color: 0x000000,
        style: {
          fontSize: '10px',
          textAlign: 'center',
          zIndex: 999
        },
        body: false,
        position: {
          x: xPosition + (keyWidth * 2) + 5,
          y: config.position.y + keyHeight,
          z: 10
        }
      });
      */

      xPosition += keyWidth;

      // Add black key after this white key, except after E and B
      if (note !== 'E' && note !== 'B') {
        var blackKey = blackKeys[index] + octave;
        game.createEntity({
          type: 'NOTE',
          kind: blackKey,
          color: 0xff0000,
          // Black key color
          width: blackKeyWidth,
          height: blackKeyHeight,
          isStatic: true,
          isSensor: true,
          style: {
            border: 'solid',
            zIndex: 9999,
            borderRadius: '0px'
          },
          position: {
            x: xPosition - blackKeyWidth,
            // Position the black key in the middle of two white keys
            y: config.position.y - blackKeyHeight / 2,
            // Slightly higher than white keys
            z: 9990
          }
        });
      }
    });
  };
  for (var octave = 0; octave < 8; octave++) {
    _loop(octave);
  }

  /* removed ( for now, create common fn for creating keys )
  // Add the last key (C8)
  game.createEntity({
    type: 'NOTE',
    kind: 'C8',
    color: 0xccff00,
    width: keyWidth,
    height: keyHeight,
    isStatic: true,
    position: {
      x: xPosition,
      y: config.position.y
    }
  });
   game.createEntity({
    type: 'TEXT',
    text: 'C8',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: xPosition,
      y: config.position.y - 20,
      z: 64
    }
  });
  */
}

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sutras;
var _switchGraphics = _interopRequireDefault(require("../sutras/switchGraphics.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// helper sutra for switching graphics

var isPressed = false;
var timerCache = {};
function sutras(game) {
  var rules = game.createSutra();
  rules.addCondition('isTile', function (entity) {
    return entity.type === 'BLOCK';
  });
  rules.addCondition('entityTouchedNote', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      // console.log('spawnUnitTouchedHomebase', entity)
      if (entity.bodyA.type === 'NOTE') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
      if (entity.bodyB.type === 'NOTE') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
    }
  });
  rules.on('damageEntity', function (collision) {
    var ent;
    if (collision.bodyA.type === 'FIRE') {
      ent = collision.bodyB;
    } else {
      ent = collision.bodyA;
    }
    console.log('damageEntity', ent);
    game.removeEntity(ent.id);
  });
  rules["if"]('entityTouchedNote').then('playNote').then('updateNoteColor');

  // helper for playing notes
  // TODO: unified api handling for playing notes
  rules.on('playNote', function (collision) {
    var note;
    if (collision.kind) {
      note = collision.kind;
    }
    if (collision.note) {
      note = collision.note;
    }
    if (collision.NOTE) {
      note = collision.NOTE.kind;
    }
    game.playNote(note);
  });
  rules.on('updateNoteColor', function (collision) {
    var ent = collision.NOTE || collision;

    // Check if we have a timerCache entry for this entity
    if (timerCache[ent.id]) {
      // Clear existing timeout
      clearTimeout(timerCache[ent.id].timer);

      // Reset the color to the original color stored in timerCache
      game.updateEntity({
        id: ent.id,
        color: timerCache[ent.id].originalColor
      });
    } else {
      // If no entry in timerCache, create one and store the original color
      timerCache[ent.id] = {
        originalColor: ent.color
      };
    }

    // Update the entity color to yellow
    game.updateEntity({
      id: ent.id,
      color: 0xccff00
    });

    // Set a timeout to revert the color back to original
    timerCache[ent.id].timer = setTimeout(function () {
      game.updateEntity({
        id: ent.id,
        color: timerCache[ent.id].originalColor
      });
      // Optionally, you might want to clean up the timerCache entry
      // delete timerCache[ent.id];
    }, 222);
  });
  console.log('created sutra', rules.toEnglish());

  // TODO: update these event handler new signature function(context, event)
  // TODO: move these events into a Sutra
  game.on('pointerDown', function (entity) {
    if (entity.type === 'NOTE' || entity.name === 'piano-roll-text') {
      game.playNote(entity.kind);
      rules.emit('updateNoteColor', entity);
      isPressed = true; // Set the pressed state to true when mouse is clicked
    }
    if (entity.type === 'DRUM') {
      game.playDrum(entity.kind);
    }
  });
  game.on('pointerMove', function (entity) {
    if (isPressed && entity.type === 'NOTE') {
      // Only play notes when pressed is true and the entity is a NOTE
      game.playNote(entity.kind);
      rules.emit('updateNoteColor', entity);
    }
  });
  game.on('pointerUp', function (entity) {
    // console.log('pointerUp', entity);
    isPressed = false; // Reset the pressed state when the mouse click is released
  });
  return rules;
}

},{"../sutras/switchGraphics.js":64}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _platform = _interopRequireDefault(require("../../mantra-sutras/player-movement/platform.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Platform = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Platform(game) {
    _classCallCheck(this, Platform);
    this.game = game; // Store the reference to the game logic
    this.id = Platform.id;
    this.type = Platform.type;
  }
  _createClass(Platform, [{
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              game.addAsset('/img/game/levels/smb3-1-1.png', 'image', 'smb3-1-1');
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;
      game.data.camera.mode = 'platform';
      this.createWorld();
    }
  }, {
    key: "unload",
    value: function unload() {}
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.reset('platform');
      game.setGravity(0, 3.3, 0);
      if (game.isTouchDevice()) {
        game.setZoom(3);
      } else {
        game.setZoom(2.5);
      }

      // we should be able to use the movement sutra as a sub-sutra, see above comment
      game.useSutra((0, _platform["default"])(game), 'mode-platform');
      game.createPlayer({
        height: 32,
        width: 32,
        texture: {
          sheet: 'blackMage',
          sprite: 'playerRight'
        },
        meta: {
          lives: 99
        },
        position: {
          x: 10,
          y: -100
        }
      });
      game.use('Platform');
      game.use('Sword');
      function createPlatform(platformData) {
        game.createEntity({
          type: 'PLATFORM',
          hasInventory: false,
          isStatic: true,
          width: platformData.width,
          height: platformData.height,
          // color: platformData.color,
          style: {
            display: 'none'
          },
          position: {
            x: platformData.x,
            y: platformData.y,
            z: platformData.z
          }
        });
      }

      // create some coin blocks near start like mario smb3-1-1
      createPlatform({
        x: 185,
        y: -74,
        z: -10,
        color: 0xff0000,
        width: 16,
        height: 16
      });
      createPlatform({
        x: 185 + 16,
        y: -74,
        z: -10,
        color: 0xff0000,
        width: 16,
        height: 16
      });
      createPlatform({
        x: 200,
        y: 13,
        z: -10,
        width: 850,
        height: 60
      });
      createPlatform({
        x: 925,
        y: 10,
        z: -10,
        width: 600,
        height: 60
      });

      /*
      createPlatform({
        x: 300,
        y: 10,
        z: -1,
        width: 2000,
        height: 60
      });
      */

      var rules = game.rules;
      rules.addCondition('isTile', function (entity) {
        return entity.type === 'BLOCK';
      });

      /*
      rules.on('CAMERA_SHAKE', function(player){
        game.shakeCamera(1000);
      });
      */
      rules.on('ZOOM_IN', function () {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom + 0.05);
      });
      rules.on('ZOOM_OUT', function () {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom - 0.05);
      });
      game.createEntity({
        type: 'WARP',
        exit: {
          world: 'Home'
        },
        texture: 'warp-to-home',
        width: 64,
        height: 64,
        depth: 1,
        isStatic: true,
        position: {
          x: -100,
          y: -100
        }
      });
      game.createEntity({
        type: 'TEXT',
        text: 'Warp To Mantra',
        width: 120,
        // kind: 'dynamic',
        color: 0xffffff,
        style: {
          color: '#ffffff',
          padding: '2px',
          paddingLeft: '10px',
          // for now
          fontSize: '16px',
          textAlign: 'center',
          backgroundColor: 'transparent'
        },
        body: false,
        position: {
          x: -105,
          y: -110
        }
      });

      // TODO: remap spacebar to jump
      // TODO:     game.on('game::ready', function () {
      //           needs secound ready emit after plugins are loaded after start
      game.on('plugin::ready::Platform', function () {
        //console.log(game.systems.platform.kinds)
        game.systems.platform.kinds.forEach(function (platformData) {
          // TODO: arrange platforms in a grid
        });

        /*
        createPlatform({
          x: 1200,
          y: 200,
          width: 800,
          height: 60
        });
         createPlatform({
          x: 0,
          y: 600,
          width: 500,
          height: 60
        });
         createPlatform({
          x: 1200,
          y: 600,
          width: 600,
          height: 60
        });
        */
      });

      // game.use('Border', { autoBorder: true })
      game.use('Bullet');
      // game.use('Sword')

      game.createEntity({
        type: 'BACKGROUND',
        texture: 'smb3-1-1',
        width: 2816,
        height: 433,
        body: false,
        position: {
          // position to right
          x: 0 + 1408,
          y: 0 - 216.5,
          z: -8
        }
      });
      var itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb'];
      //itemsList = [];
      itemsList.forEach(function (item, index) {
        game.createEntity({
          type: item.toUpperCase(),
          kind: item,
          collectable: false,
          // TODO: change this
          hasInventory: false,
          width: 16,
          height: 16,
          depth: 32,
          texture: {
            sheet: 'loz_spritesheet',
            sprite: item
          },
          position: {
            x: 150 + index * 32,
            y: -100,
            z: 32
          }
        });
      });
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
  return Platform;
}();
_defineProperty(Platform, "id", 'world-platform');
_defineProperty(Platform, "type", 'world');
var _default = exports["default"] = Platform;

},{"../../mantra-sutras/player-movement/platform.js":26}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var exampleRoot = 'https://yantra.gg/mantra/examples';
var Playground = exports["default"] = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Playground() {
    _classCallCheck(this, Playground);
    this.id = Playground.id;
  }
  _createClass(Playground, [{
    key: "preload",
    value: function () {
      var _preload = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(game) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              game.use('Button');
              game.use('Code');
              game.use('Container');
              game.use('Editor');
              game.use('Hexapod');
              game.use('Iframe');
              game.use('Image');
              game.use('Link');
              game.use('Platform');
              game.use('Player');
              game.use('Select');
              game.use('Teleporter');
              game.use('Text');
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function preload(_x) {
        return _preload.apply(this, arguments);
      }
      return preload;
    }()
  }, {
    key: "init",
    value: function init(game) {
      this.game = game;
      game.config.defaultMouseMovement = false;
      // Movements with right click, switch default left-click-to-move behavior
      game.config.mouseMovementButton = 'RIGHT';
      // Actions with left click
      game.config.mouseActionButton = 'LEFT';
      // enables the default top-down mouse movements
      game.config.defaultMouseMovement = true;
      game.data.camera.scaleMultiplier = 0.5;
      game.reset();
      document.body.style.overflow = 'auto';
      document.body.style.position = 'relative';
      game.data.camera.mode = 'none';

      // Remark: Not ideal for mapping Mouse buttons, 
      // as they should be conditionals in Sutra tree like Keyboard events are
      var mouse = game.systems.mouse;
      //mouse.setButtonMapping('LEFT', 1);
      //mouse.setButtonMapping('MIDDLE', 0);
      // enables mouse wheel zoom
      game.data.camera.mouseWheelZoomEnabled = false;
      this.createWorld();
      this.setDefaultZoom();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      var currentUrl = null;
      var text = game.make().Text().text('Mantra.js Alpha Playground').style({
        fontSize: '64px'
      }).color('white').width(900).position(50, -520, 0)
      //.layout('top-center')
      //.offset(0, 60)
      //.origin('top-left')
      .createEntity();

      // alert(text.position.x + ' ' + text.position.y)

      var link = game.make().Link({
        href: 'https://yantra.gg/mantra/examples/items/boomerang',
        target: '_blank'
      }).style({
        fontSize: '32px',
        color: 'purple'
      }).text('/examples/items/boomerang').width(600).height(20).x(-100).y(-440).createEntity();
      var sideTextGroup = game.make().name('side-text-group').style({
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }).position(-800, -400).createEntity();
      var introText = game.make().Text().text('Select from the drop downs');
      introText.color('white');
      introText.position(280, 10);
      introText.width(200);
      introText.style({
        fontSize: '64px',
        textAlign: 'right' // Not working? CSS style seems applied in DOM, Text() might be better as child span element
      });
      introText.container('side-text-group');
      introText.createEntity();
      var src = 'https://yantra.gg/mantra/img/game/env/github-link-256.png';

      // Remark: These image links could also be buttons with textures, or ents with in-line textures
      var githubImageLink = game.make().Image({
        alt: 'Mantra.js Github',
        src: src
      }).pointerdown(function (context, event) {
        // opens new link to Mantra.js Github
        event.preventDefault();
        var link = 'https://github.com/yantra-core/Mantra.js';
        if (game.isTouchDevice()) {
          window.location = link;
        } else {
          window.open(link, '_blank');
        }
      }).style({
        cursor: 'pointer'
      }).position(-700, 150).size(128).createEntity();
      var discordImageLink = game.make().Image({
        alt: 'AYYO Discord',
        src: 'https://yantra.gg/mantra/img/game/env/discord-voice-dark.png'
      }).pointerdown(function (context, event) {
        var link = 'https://discord.gg/ZyNxBVmFgV';
        if (game.isTouchDevice()) {
          window.location = link;
        } else {
          // opens new link to AYYO Discord
          window.open(link, '_blank');
        }
      }).style({
        cursor: 'pointer'
      }).position(-500, 150).size(128).createEntity();
      game.make().Container({
        layout: 'grid',
        grid: {
          columns: 7,
          rows: 3
        }
      }).color(0xff00ff).name('container-a').width(1960).height(400).position(170, 450, -1).style({
        //padding: 0,
        margin: 0,
        paddingLeft: 0,
        paddingTop: 0,
        // background: '#ff0000', // can also use Entity.color
        border: {
          color: '#000000',
          width: 0
        }
      }).createEntity();
      var primaryGameEmbed = game.make().Iframe({
        src: 'https://yantra.gg/mantra/examples/demo?source=items/boomerang'
      })
      // .Iframe({ src: 'http://192.168.1.80:7777/examples/demo.html?source=games/gravity-gardens' })
      .width(800).height(600).x(0).y(-100).createEntity();
      var evalEmbed = game.make().Iframe({
        src: 'https://yantra.gg/mantra/eval'
      })
      //.Iframe({ src: 'http://192.168.1.80:7777/eval.html' })
      .name('eval-embed').width(800).height(600).x(primaryGameEmbed.position.x).y(primaryGameEmbed.position.y).style({
        display: 'none'
      }).createEntity();

      // Creates a <code> element with the given source
      // Allows for remote code sources
      var codeEditor = game.make().Code({
        //  code: 'hello <h1>'
        src: 'https://yantra.gg/mantra/examples/items/boomerang.js'
        //src: 'http://192.168.1.80:8888/items/boomerang.js'
      }).name('code-editor').height(700).width(660).x(800).y(-170).z(33).createEntity();

      // TODO: use EntityBuilder.origin() property ( WIP )
      var origin = {
        // top-right origin
        x: codeEditor.position.x - codeEditor.size.width / 2,
        y: codeEditor.position.y + codeEditor.size.height / 2
      };
      origin.x += 100;
      origin.y += 38;
      game.on('iframeMessage', function (event) {
        console.log('iframeMessage', event);
        game.flashText(event.data.message);
      });
      var evalRunButton = game.make().Button({
        text: 'Run Code'
      }).width(200).height(40).position(origin.x, origin.y, 32).pointerdown(function (context, event) {
        // Get the <iframe> element reference
        var evalEmbed = game.getEntityByName('eval-embed');
        var graphic = evalEmbed.graphics['graphics-css'];
        var evalIframe = graphic.querySelectorAll('iframe')[0];

        // sets the evalRunButton to disabled
        /*
        game.updateEntity(evalRunButton.id, {
          style: {
            display: 'none'
          }
        });
        */

        // hides the primaryGameEmbed
        game.updateEntity(evalEmbed.id, {
          style: {
            display: 'block'
          }
        });

        // Get the <code> from the code editor
        var codeEditor = game.getEntityByName('code-editor');
        var graphic2 = codeEditor.graphics['graphics-css'];
        var textarea = graphic2.querySelectorAll('textarea')[0];
        var source;
        source = textarea.value;
        // Add a one-time event listener for the iframe's load event
        evalIframe.onload = function () {
          // Send the code to the iframe
          console.log('onload', source);
          // alert('post message')
          evalIframe.contentWindow.postMessage({
            code: source
          }, '*'); // Consider specifying the iframe's origin instead of '*'
        };

        // Reload the evalIframe from it's src to clear state
        evalIframe.src = evalIframe.src;

        // hides the primaryGameEmbed
        game.updateEntity(primaryGameEmbed.id, {
          meta: {
            src: null
          },
          style: {
            display: 'none'
          }
        });
        primaryGameEmbed.src = null;
      }).createEntity();
      var player = game.make().Player();
      player.position(evalRunButton.position.x + 60, evalRunButton.position.y + 5, 0).z(64);
      player.createEntity();
      var hexapods = game.make().Hexapod().position(-800, -800).repeat(6).createEntity();

      // Function to create a dropdown select with given options and append it to a specified container
      function createDropdown(primaryGameEmbed, options, containerId, dropdownTitle) {
        var _categories$find;
        var optionsFormatted = options.map(function (item) {
          return {
            label: item.title.replace('<br/>', ''),
            // <-- legacy examples API can remove soon
            value: exampleRoot + '/demo.html?source=' + item.url.replace('.html', '') // Concatenate the root path with the example URL
          };
        });

        // first options is the label
        optionsFormatted.unshift({
          label: dropdownTitle + '...',
          value: ''
        });
        // Create the select dropdown
        var dropdownSelect = game.make().Select({
          options: optionsFormatted,
          title: dropdownTitle // Optional: Use title for labeling or categorizing the dropdown
        }).container(containerId);

        // Function to handle after an option is selected and update the entity accordingly
        // TODO: add EntityBuilder.onchange event
        dropdownSelect.afterUpdateEntity(function (context, event) {
          if (!context || typeof context.value === 'undefined') {
            return;
          }
          if (currentUrl === context.value) return;
          console.log('afterUpdateEntity', primaryGameEmbed, context.value, event);
          if (typeof primaryGameEmbed === 'undefined') {
            return;
          }
          if (typeof context.value === 'undefined' || context.value === '' || context.value === null) {
            // do not process invalid selections ( such as the first option which is empty )
            return;
          }

          //
          // Set all the other dropdowns to the first option
          //

          //
          // Since the Playground is built using CSSGraphics, we can use the DOM to reset the dropdowns
          // This wouldn't be considered "best practice", however it will work fine for now until we have
          // implemented non-bubbling onchange event handling in the ECS with tests
          var currentSelect = context.graphics['graphics-css'].querySelectorAll('select')[0];
          var selectElements = document.querySelectorAll('select');
          selectElements.forEach(function (select) {
            if (select !== currentSelect) {
              select.value = '';
            }
          });

          // Remark: In order to do this through the ECS, we'd have to implement a non-bubbling update event,
          // tests would need to be written first, this type of update action is self-ref and cascade.
          // we also would be much better off using `onchange` event support instead of `afterUpdateEntity` for this
          /*
          let dropdowns = game.getEntitiesByType('SELECT');
          dropdowns.forEach(dropdown => {
            game.updateEntity(dropdown.id, {
              value: ''
            });
          });
          */

          //
          // Updates the IFrame src to the selected example
          //
          game.updateEntity(primaryGameEmbed.id, {
            meta: {
              src: context.value
            }
          });

          //
          // Updates the Code src to the selected example
          //
          var sourceLink = context.value.replace('demo.html?source=', '') + '.js';
          console.log('sourceLink', sourceLink);
          // alert(sourceLink)
          game.updateEntity(codeEditor.id, {
            meta: {
              src: sourceLink
            }
          });

          //
          // Updates the Examples link to the selected example link
          //
          var textLink = sourceLink.replace('https://yantra.gg/mantra', '').replace('.js', '');
          var exampleLink = sourceLink.replace('.js', '');
          game.updateEntity(link.id, {
            text: textLink,
            meta: {
              href: exampleLink
            }
          });

          // hides the evalEmbed

          // hides the primaryGameEmbed
          game.updateEntity(evalEmbed.id, {
            style: {
              display: 'none'
            }
          });

          // show the primaryGameEmbed
          game.updateEntity(primaryGameEmbed.id, {
            style: {
              display: 'block'
            }
          });
        });

        // Set style and dimensions for the dropdown
        dropdownSelect.width(230).height(80).style({
          fontSize: '32px',
          backgroundColor: ((_categories$find = categories.find(function (cat) {
            return cat.title === dropdownTitle;
          })) === null || _categories$find === void 0 ? void 0 : _categories$find.color) || '#e0e0e0' // Use category color if available
        }).createEntity();
      }
      categories.forEach(function (category) {
        // Filter examples based on whether 'example.category' is an array or a string
        var categoryExamples = examples.filter(function (example) {
          if (Array.isArray(example.category)) {
            // If 'example.category' is an array, check if it includes the current 'category.name'
            return example.category.includes(category.name);
          } else {
            // If 'example.category' is a string, perform direct comparison
            return example.category === category.name;
          }
        });

        // Create a dropdown for the current category with its examples
        createDropdown(primaryGameEmbed, categoryExamples, 'container-a', category.title); // Assume 'container-a' exists or is dynamically created for each category
      });

      // TODO: injects examples into playground scene itself
      // let addSceneButton = game.make().Button({ text: 'Load Example as Scene', disabled: true }).width(250).position(650, 500).createEntity();
      // TODO: save current scene as world on Yantra
      // let deployToYantraButton = game.make().Button({ text: 'Deploy to Yantra.gg' }).width(200).position(900, 500).createEntity();
      // TODO: copies code to clipboard
      // let copyCodeButton = game.make().Button({ text: 'Copy Code' }).width(200).position(1000, 500).createEntity();
      // TODO: changes gravity on the entire playground page
      // let gravitySlider = game.make().Range().width(100).position(-540, -400, 0).createEntity();

      var docsEmbed = game.make().width(768).height(1000);
      docsEmbed.Iframe({
        src: 'https://yantra.gg/mantra/examples'
      });
      docsEmbed.style({
        border: 'none'
      });
      docsEmbed.x(0).y(1200);
      docsEmbed.createEntity();

      /*
      let text_dragToMoveMap = game.make().Text().text('Drag to move map');
      text_dragToMoveMap.x(200);
      text_dragToMoveMap.y(220);
      text_dragToMoveMap.width(600);
      text_dragToMoveMap.color('white');
      text_dragToMoveMap.style({
        fontSize: '24px',
      })
      text_dragToMoveMap.createEntity();
      */

      /*
      let text_wheelToZoom = game.make().Text().text('Wheel to Zoom');
      text_wheelToZoom.x(0);
      text_wheelToZoom.y(220);
      text_wheelToZoom.width(600);
      text_wheelToZoom.color('white');
      text_wheelToZoom.style({
        fontSize: '24px',
      })
      text_wheelToZoom.createEntity();
      */

      /*
      let text_clickToInteract = game.make().Text().text('Click to interact');
      text_clickToInteract.x(220);
      text_clickToInteract.y(220);
      text_clickToInteract.width(170);
      //text_clickToInteract.height(40);
      text_clickToInteract.color('white');
      text_clickToInteract.style({
        fontSize: '24px',
        cursor: 'pointer'
      })
      text_clickToInteract.pointerup((context, event) => {
        event.preventDefault();
        // game.rotate(context.id, 0.1);
        this.game.shakeCamera({});
      });
      text_clickToInteract.createEntity();
      */

      // TODO code responsive layout for mobile
      /*
      if (screenWidth < 400) {
        // move the code editor to same x as embed
        // move embed up
        game.updateEntity(codeEditor.id, {
          x: primaryGameEmbed.position.x,
          y: primaryGameEmbed.position.y - 800
        })
      }
      */
    }
  }, {
    key: "setDefaultZoom",
    value: function setDefaultZoom() {
      var game = this.game;

      //
      // Caclulate the zoom based on the width and height of the window
      // Remark: We could put this into Mantra as a utility function with parameters
      //
      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight;

      // Width-based zoom calculation
      var zoomRatioWidth = 0.5 / game.width; // Derived ratio for width
      var baseWidth = game.width;
      var baseZoomWidth = 0.5;
      var zoomWidth = baseZoomWidth + (screenWidth - baseWidth) * zoomRatioWidth;

      // Height-based zoom calculation (assuming similar ratios and base values for height)
      var zoomRatioHeight = 0.5 / game.height; // You might need to adjust this based on your game's height scaling
      var baseHeight = game.height; // Adjust this base height as per your requirements
      var baseZoomHeight = 0.5;
      var zoomHeight = baseZoomHeight + (screenHeight - baseHeight) * zoomRatioHeight;

      // Choose the smaller zoom level to ensure content fits both width and height
      var zoom = Math.min(zoomWidth, zoomHeight);

      // Clamp the zoom level between 0.4 and 1
      zoom = Math.max(0.4, Math.min(zoom, 1));

      //
      // Calls game.setZoom with the calculated zoom level
      //
      game.setZoom(zoom);
    }
  }]);
  return Playground;
}(); //let entities = text2Entities(text);
_defineProperty(Playground, "id", 'world-playground');
_defineProperty(Playground, "type", 'world');
function text2Entities(text) {
  var entities = [];
  var lines = text.split('');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var x = 0 + i * 32;
    var y = -200;
    var entity = game.make().Text({
      text: line
    }).x(x).y(y).body(true).createEntity();
    entities.push(entity);
  }
  return entities;
}

},{}],45:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Pong = /*#__PURE__*/function () {
  function Pong() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Pong);
    this.averageSnapshotSize = null;
    this.displayElement = null;
    this.id = Pong.id;
  }
  _createClass(Pong, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // In order to let Mantra know the Pong Class subscribes to gameloop update() method
      // we must register it with the game instance as a "System".
      this.game.addSystem(this.id, this);
      // Now the game instance will call this.update()

      // TODO: refactor into functions
      /*
      game.systems['entity-input'].controlMappings = {
        W: 'PLAYER_UP',
        S: 'PLAYER_DOWN'
      };
      */

      var leftSide = game.width / 3 * -1;

      // custom player join logic
      game.on('player::joined', function (playerData) {
        console.log('a player has joined the server', playerData);
        var player = game.createEntity({
          id: playerData.id,
          // TODO: replace this
          type: 'PLAYER',
          shape: 'rectangle',
          restitution: 0,
          // bounciness
          mass: 90000,
          height: 300,
          width: 40,
          friction: 0,
          // Default friction
          frictionAir: 0,
          // Default air friction
          frictionStatic: 0,
          // Default static friction
          lockedProperties: {
            position: {
              x: leftSide
            }
          }
        });
        // make sure to let the game know that the player has been created
        game.emit('player::created', player);
      });

      //
      // Create the Player
      //

      this.createBorder();
      this.createBall();
    }
  }, {
    key: "update",
    value: function update() {
      // console.log('update');

      // TODO: scoring functions
    }
  }, {
    key: "createBall",
    value: function createBall() {
      this.game.createEntity({
        id: 'game-ball',
        type: 'BALL',
        x: 0,
        y: 500,
        height: 50,
        width: 50,
        velocity: {
          // set initial velocity
          x: 8,
          y: 8
        },
        maxSpeed: 20,
        restitution: 2.5,
        // bounciness
        friction: 0,
        // Default friction
        frictionAir: 0,
        // Default air friction
        frictionStatic: 0 // Default static friction
      });
    }
  }, {
    key: "createBorder",
    value: function createBorder() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var height = 1000;
      var width = 2000;
      var WALL_THICKNESS = 200;
      var borders = {
        top: {
          position: {
            x: 0,
            y: -height / 2 - WALL_THICKNESS / 2
          },
          size: {
            width: width + WALL_THICKNESS * 2,
            height: WALL_THICKNESS
          }
        },
        bottom: {
          position: {
            x: 0,
            y: height / 2 + WALL_THICKNESS / 2
          },
          size: {
            width: width + WALL_THICKNESS * 2,
            height: WALL_THICKNESS
          }
        },
        left: {
          position: {
            x: -width / 2 - WALL_THICKNESS / 2,
            y: 0
          },
          size: {
            width: WALL_THICKNESS,
            height: height
          }
        },
        right: {
          position: {
            x: width / 2 + WALL_THICKNESS / 2,
            y: 0
          },
          size: {
            width: WALL_THICKNESS,
            height: height
          }
        }
      };
      for (var b in borders) {
        var border = borders[b];
        if (typeof entityData.id === 'undefined') {
          entityData.id = 'border';
        }
        this.game.createEntity({
          name: entityData.id + '-' + b,
          type: 'BORDER',
          shape: 'rectangle',
          isStatic: true,
          position: {
            x: border.position.x,
            y: border.position.y
          },
          width: border.size.width,
          height: border.size.height,
          depth: 80
        });
      }
    }
  }]);
  return Pong;
}();
_defineProperty(Pong, "id", 'world-pong');
var _default = exports["default"] = Pong;

},{}],46:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Space = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Space(game) {
    _classCallCheck(this, Space);
    this.game = game; // Store the reference to the game logic
    this.id = Space.id;
    this.type = Space.type;
  }
  _createClass(Space, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;

      // Adds projectile Bullets to the game
      game.use('Bullet');

      // add / remove entitymovement
      // game.systems['entity-movement'].unload();
      game.systemsManager.removeSystem('entity-input');
      game.systemsManager.removeSystem('entity-movement');

      // TODO: Game.setPhysics('PhysXPhysics')
      game.use('PhysXPhysics');
      game.use('EntityInput');
      game.use('EntityMovement');

      // Adds destructible Blocks to the game
      game.use('Block');
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/physx-babylon.html'
      });

      // TODO: Game.setGraphics('BabylonGraphics')
      game.systems.graphics.switchGraphics('BabylonGraphics', function () {
        // Creates a single Block, since we have used Block plugin, this will be a destructible Block
        game.createEntity({
          type: 'BLOCK',
          width: 500,
          height: 500,
          depth: 200,
          position: {
            x: 0,
            y: -500
          }
        });
        game.use('Border', {
          autoBorder: true
        });
        game.use('StarField');
        game.createDefaultPlayer();
      });
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
  return Space;
}();
_defineProperty(Space, "id", 'world-space');
_defineProperty(Space, "type", 'world');
var _default = exports["default"] = Space;

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _demon = _interopRequireDefault(require("../../mantra-sutras/demon.js"));
var _hexapod = _interopRequireDefault(require("../../mantra-sutras/hexapod.js"));
var _note = _interopRequireDefault(require("../../mantra-sutras/note.js"));
var _fire = _interopRequireDefault(require("../../mantra-sutras/fire.js"));
var _gameOfLife = _interopRequireDefault(require("../../mantra-sutras/game-of-life.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } //import langtonsLoop from "../../mantra-sutras/langston-loop.js";
var agama = {
  demon: _demon["default"],
  hexapod: _hexapod["default"],
  note: _note["default"],
  fire: _fire["default"],
  gameOfLife: _gameOfLife["default"]
};
var Sutra = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Sutra(game) {
    _classCallCheck(this, Sutra);
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
    this.type = Sutra.type;
    this.demoInterval = null;
  }
  _createClass(Sutra, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      game.customMovement = true;
      // alert('hi')
      game.reset('topdown');
      game.setGravity(0, 0, 0);

      // TODO: set default zoom to 0.3 ( zoomed out )
      game.setZoom(3.5);
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      var that = this;
      game.use('Bullet');
      //    game.use('Timers');
      game.use('Tone');
      game.use('Health');
      console.log('hexapod', _hexapod["default"]);
      /*
       TODO: add back game.setSource(), which populates editor menu for code
            can open github link as default action ( for now )
      // game.use(new Plugins.SutraGUI({ }));
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/sutra-level-editor.html',
        sutraEditor: true
      });
      */

      game.use('Block', {
        MIN_BLOCK_SIZE: 1000
      });
      // game.use('Border', { autoBorder: true, thickness: 200 });
      game.useSutra((0, _hexapod["default"])(game), 'HEXAPOD');
      game.data.roundEnded = false;
      game.data.roundStarted = true;
      game.createPlayer();
      //createPlayPauseButton();

      /*
      game.createEntity({
        type: 'WARP',
        kind: 'Home',
        texture: 'warp-to-home',
        width: 64,
        height: 64,
        depth: 1,
        isStatic: true,
        position: {
          x: -100,
          y: -100
        }
      });
      */

      function createPlayPauseButton() {
        game.createEntity({
          name: 'play-pause-button',
          type: 'BUTTON',
          body: false,
          text: 'play',
          width: 25,
          height: 25,
          position: {
            x: -100,
            y: 50
          },
          style: {
            fontSize: 30,
            color: '#ffffff'
          }
          /*
          onClick: function () {
            if (game.data.roundEnded) {
              game.data.roundEnded = false;
              game.data.roundStarted = true;
              game.setSutra(hexapod(game));
            } else {
              game.data.roundEnded = true;
              game.data.roundStarted = false;
            }
          }
          */
        });
      }
      function writeSutraLabel(sutraName) {
        // text label for Sutra name
        game.createEntity({
          name: 'sutra-label',
          type: 'TEXT',
          body: false,
          text: sutraName,
          position: {
            x: -100,
            y: 0
          },
          style: {
            fontSize: 30,
            color: '#ffffff'
          }
        });
      }
      function updateSutraLabel(sutraName) {
        game.updateEntity({
          name: 'sutra-label',
          text: sutraName
        });
      }
      writeSutraLabel('hexapod');
      function demoSutras() {
        // set interval to iterate through agama
        var agamaKeys = Object.keys(agama);
        var agamaIndex = 0;
        that.demoInterval = setInterval(function () {
          var agamaKey = agamaKeys[agamaIndex];
          var agamaSutra = agama[agamaKey];
          // removes all entities except our sutra-label and play-pause-button
          // TODO: containers
          game.removeAllEntities({
            excludeByName: ['sutra-label', 'play-pause-button']
          });
          updateSutraLabel(agamaKey);
          // writeSutraLabel(agamaKey);
          game.setSutra(agamaSutra(game));

          // Increment the index and reset if it reaches the end of the array
          agamaIndex = (agamaIndex + 1) % agamaKeys.length;
        }, 3300);
      }
      //demoSutras();
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
    value: function unload() {
      // clear the interval
      if (this.demoSutras) {
        clearInterval(this.demoSutras);
      }
    }
  }]);
  return Sutra;
}();
_defineProperty(Sutra, "id", 'world-sutra');
_defineProperty(Sutra, "type", 'world');
var _default = exports["default"] = Sutra;

},{"../../mantra-sutras/demon.js":21,"../../mantra-sutras/fire.js":22,"../../mantra-sutras/game-of-life.js":23,"../../mantra-sutras/hexapod.js":24,"../../mantra-sutras/note.js":25}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sutras = _interopRequireDefault(require("./sutras.js"));
var _welcomeMessage = _interopRequireDefault(require("./welcomeMessage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Tiled = /*#__PURE__*/function () {
  // type is optional for Plugins

  function Tiled() {
    _classCallCheck(this, Tiled);
    this.id = Tiled.id;
    this.type = Tiled.type;
  }
  _createClass(Tiled, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.reset();
      game.setZoom(4.5);
      game.setSize(16000, 9000);
      game.setGravity(0, 0, 0);
      // game.setBackground('#000000');
      game.config.useFoV = true;
      game.data.fieldOfView = 96;
      // sprite sheet has been defined in defaultAssets.js
      game.createPlayer({
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'player'
        },
        position: {
          x: 0,
          y: 0,
          z: 1
        }
      });
      game.setBackground('#000000');
      game.use('Block');
      game.use('Border', {
        autoBorder: true
      });
      game.use('Bullet');
      // game.use('Sword')
      game.use('Tile', {
        loadInitialChunk: true,
        tiledServer: true,
        tileSize: 16,
        chunkUnitSize: 8,
        proceduralGenerateMissingChunks: false,
        lazyLoadTiles: false,
        loadDefaultTileMap: false
      });
      game.use('Tone');

      // welcomeMessage(game);

      var rules = game.rules;
      rules.addCondition('PLAYER_UP', {
        op: 'or',
        conditions: ['W', 'DPAD_UP']
      });
      rules.addCondition('PLAYER_DOWN', {
        op: 'or',
        conditions: ['S', 'DPAD_DOWN']
      });
      rules.addCondition('PLAYER_LEFT', {
        op: 'or',
        conditions: ['A', 'DPAD_LEFT']
      });
      rules.addCondition('PLAYER_RIGHT', {
        op: 'or',
        conditions: ['D', 'DPAD_RIGHT']
      });
      rules.addCondition('USE_ITEM_1', {
        op: 'or',
        conditions: ['SPACE', 'H', 'BUTTON_X']
      });

      // see: ../mantra-sutras/movement/top-down.js events MOVE_UP, MOVE_DOWN, etc.
      rules["if"]('PLAYER_UP').then('MOVE_UP').then('updateSprite', {
        sprite: 'playerUp'
      });
      rules["if"]('PLAYER_LEFT').then('MOVE_LEFT').then('updateSprite', {
        sprite: 'playerLeft'
      });
      rules["if"]('PLAYER_DOWN').then('MOVE_DOWN').then('updateSprite', {
        sprite: 'playerDown'
      });
      rules["if"]('PLAYER_RIGHT').then('MOVE_RIGHT').then('updateSprite', {
        sprite: 'playerRight'
      });
      rules["if"]('USE_ITEM_1').then('FIRE_BULLET').map('determineShootingSprite').then('updateSprite');

      //rules.if('K').then('SWING_SWORD');
      //rules.if('L').then('SWING_SWORD');
      // rules.if('L').then('DROP_BOMB');
      rules["if"]('K')["if"]('canDropBomb').then('DROP_BOMB');
      rules["if"]('O').then('ZOOM_IN');
      rules["if"]('P').then('ZOOM_OUT');
      rules.addMap('determineShootingSprite', function (player, node) {
        // Normalize the rotation within the range of 0 to 2π
        var normalizedRotation = player.rotation % (2 * Math.PI);
        // Define a mapping from radians to sprites
        var rotationToSpriteMap = _defineProperty(_defineProperty(_defineProperty({
          0: 'playerRodUp'
        }, Math.PI / 2, 'playerRodRight'), Math.PI, 'playerRodDown'), -Math.PI / 2, 'playerRodLeft');
        // Set the sprite based on the rotation, default to the current sprite
        player.texture.sprite = rotationToSpriteMap[normalizedRotation] || player.currentSprite;
        return player;
      });
      rules.on('updateSprite', function (player, node) {
        var sprite = node.data.sprite || player.texture.sprite;
        game.updateEntity({
          id: player.id,
          texture: {
            frameIndex: 0,
            sheet: player.texture.sheet,
            sprite: sprite,
            animationPlaying: true
          }
        });
      });
      rules.on('FIRE_BULLET', function (player) {
        game.systems.bullet.fireBullet(player.id);
      });
      rules.on('DROP_BOMB', function (player) {
        rules.emit('dropBomb', player);
      });
      rules.on('ZOOM_IN', function () {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom + 0.05);
      });
      rules.on('ZOOM_OUT', function () {
        var currentZoom = game.data.camera.currentZoom || 1;
        game.setZoom(currentZoom - 0.05);
      });
      game.useSutra((0, _sutras["default"])(game), 'TILED');
      game.createEntity({
        name: 'sutra-tree',
        type: 'BACKGROUND',
        // kind: 'building',
        width: 1024 / 4,
        height: 1024 / 4,
        //depth: 256,
        depth: 1,
        texture: 'sutra-tree',
        body: false,
        position: {
          x: 0,
          y: 300,
          z: 32
        }
      });

      // convert the Sutra.js rules to English text
      var rulesEnglish = rules.toEnglish();
      game.createEntity({
        name: 'sutra-tree-text',
        type: 'TEXT',
        text: 'Sutra Rules \n\n' + rulesEnglish,
        width: 256,
        height: 256,
        depth: 1,
        // texture: 'sutra-tree',
        body: false,
        style: {
          // this is code and we need to preserve the spaces and \n
          whiteSpace: 'pre',
          // width: '150px',
          // fontSize: '12px',
          textAlign: 'left',
          color: 'black',
          opacity: 0.55
        },
        position: {
          x: 40,
          y: 550,
          z: 32
        }
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      // optionally unload assets
      // in most cases calling game.reset() is sufficient
    }
  }]);
  return Tiled;
}();
_defineProperty(Tiled, "id", 'world-home');
_defineProperty(Tiled, "type", 'world');
var _default = exports["default"] = Tiled;

},{"./sutras.js":49,"./welcomeMessage.js":50}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sutras;
var _warpToWorld = _interopRequireDefault(require("../sutras/warpToWorld.js"));
var _switchGraphics = _interopRequireDefault(require("../sutras/switchGraphics.js"));
var _walker = _interopRequireDefault(require("../TowerDefense/sutras/walker.js"));
var _routing = _interopRequireDefault(require("../sutras/routing.js"));
var _fire = _interopRequireDefault(require("../../mantra-sutras/fire.js"));
var _demon = _interopRequireDefault(require("../../mantra-sutras/demon.js"));
var _hexapod = _interopRequireDefault(require("../../mantra-sutras/hexapod.js"));
var _topDown = _interopRequireDefault(require("../../mantra-sutras/player-movement/top-down.js"));
var _bomb = _interopRequireDefault(require("../../mantra-sutras/bomb.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// helper sutra for switching worlds

// walker is npc that walks around route

// routing helper to create vector routes

// import block from "./sutras/block.js";

function sutras(game) {
  var rules = game.createSutra();

  // movement
  rules.use((0, _topDown["default"])(game), 'movement');

  // helper for switching graphics
  var switchGraphicsSutra = (0, _switchGraphics["default"])(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');

  // when touching WARP entity, warp to world
  var warp = (0, _warpToWorld["default"])(game);
  rules.use(warp, 'warpToWorld');

  // helper for playing notes
  rules.on('playNote', function (collision) {
    return game.playNote(collision.note);
  });

  // fire entity
  // rules.use(fire(game), 'fire');

  // block entity
  // rules.use(block(game), 'block');

  // demon entity
  // rules.use(demon(game), 'demon');

  // hexapod entity
  // rules.use(hexapod(game), 'hexapod');

  // bomb item
  rules.use((0, _bomb["default"])(game), 'bomb');

  // console.log('created sutra', rules.toEnglish())
  return rules;
}

},{"../../mantra-sutras/bomb.js":20,"../../mantra-sutras/demon.js":21,"../../mantra-sutras/fire.js":22,"../../mantra-sutras/hexapod.js":24,"../../mantra-sutras/player-movement/top-down.js":27,"../TowerDefense/sutras/walker.js":57,"../sutras/routing.js":63,"../sutras/switchGraphics.js":64,"../sutras/warpToWorld.js":65}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = welcomeMessage;
function welcomeMessage(game) {
  if (game.hasShownWelcomeMessage !== true) {
    game.hasShownWelcomeMessage = true;
  } else {
    console.log('welcomeMessage already run once');
    return;
  }
  if (typeof window === 'undefined') {
    console.log('welcomeMessage only runs on client');
    return;
  }
  // calculate font size based on window size
  var fontSize = Math.floor(window.innerWidth / 15) + 'px';
  // calculate x / y based on window size
  var x = Math.floor(window.innerWidth / 2);
  var y = 110;
  if (is_touch_enabled()) {
    y = 30;
  }
  var typer = game.systems['typer-ghost'].createQueuedText({
    x: x,
    y: y,
    style: {
      color: 'white',
      fontSize: fontSize,
      width: '100%',
      // adds 3d shadow to text with black outline
      textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      // Adjust this value to position the text lower or higher from the top
      left: '50%',
      // Center horizontally
      transform: 'translateX(-50%)',
      // Ensure exact centering
      lineHeight: '1',
      zIndex: '999'
    },
    duration: 5000,
    removeDuration: 6000
  });

  // TODO: custom messages for mobile / vs desktop
  // Queueing additional messages
  typer.queueText('Welcome to Mantra Worlds', 5000, 2000);
  typer.queueText('Use WASD to move', 5000, 3000);
  typer.queueText('Click objects to interact', 5000, 3000);
  typer.queueText('Zoom with Slider or Mouse Wheel', 5000, 3000);
  typer.queueText('Press START to Switch Worlds', 5000, 2000);
  typer.queueText('Press SELECT to Open Menu', 5000, 2000);
  typer.queueText('USB Gamepad Support', 5000, 2000);

  // Start processing the queue
  typer.processQueue();
}
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _round = _interopRequireDefault(require("./sutras/round.js"));
var _player = _interopRequireDefault(require("./sutras/player.js"));
var _colorChanges = _interopRequireDefault(require("./sutras/colorChanges.js"));
var _enemy = _interopRequireDefault(require("./sutras/enemy.js"));
var _input = _interopRequireDefault(require("./sutras/input.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import movement from "../../mantra-sutras/player-movement/top-down.js";
var TowerWorld = /*#__PURE__*/function () {
  function TowerWorld() {
    _classCallCheck(this, TowerWorld);
    _defineProperty(this, "sutras", {
      'round': {
        description: 'Round Logic. Adds conditions and actions related to the round.'
      },
      'spawner': {
        description: 'Spawner Logic. Adds conditions and actions related to the spawner.'
      },
      'player': {
        description: 'Player Logic. Adds conditions and actions related to the player.'
      },
      'collision': {
        description: 'Collision Logic. Adds conditions and actions related to collisions.'
      },
      'colorChanges': {
        description: 'Color Changes Logic. Adds conditions and actions related to color changes.'
      }
    });
    _defineProperty(this, "entities", {
      'UnitSpawner': {
        type: 'UnitSpawner',
        health: 100,
        position: {
          x: 0,
          y: 0
        },
        width: 100,
        height: 100,
        color: 0x00ff00
      }
    });
    this.id = TowerWorld.id;
  }
  _createClass(TowerWorld, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      for (var key in this.sutras) {
        if (this[key]) {
          this.sutras[key] = this[key]();
        }
      }
      game.customMovement = true;
      game.reset();
      // game.data.camera.currentZoom = 2;
      game.setGravity(0, 0, 0);
      game.createPlayer({
        position: {
          x: 0,
          y: 0
        },
        texture: 'none'
      });

      // game.setBackground('#007F00');
      game.setBackground('#007fff');
      game.use('Block');
      game.use('Border', {
        autoBorder: true,
        thickness: 20,
        health: 100
      });
      game.use('Bullet');
      game.use('Border');
      game.use('StarField');

      // game.use('Scoreboard');

      // Create Sutras
      var roundSutra = _round["default"].call(this);
      var spawnerSutra = _enemy["default"].call(this);
      var playerSutra = _player["default"].call(this);
      var inputSutra = _input["default"].call(this);
      var colorChangesSutra = _colorChanges["default"].call(this);

      // Main rules Sutra
      var rules = game.createSutra();

      // movement
      // rules.use(movement(game), 'movement');

      rules.addCondition('isBorder', function (entity) {
        return entity.type === 'BORDER';
      });
      rules["if"]('roundNotPaused')["if"]('roundNotRunning').then('createBorders').then('spawnEnemyUnits').then('startRound');

      /*
      rules
      .if('spawnUnitTouchedHomebase')
      .then('removeSpawnUnit')
      .then('resetSpawnerUnit');
      */

      rules["if"]('blockHitWall').then('damageWall').then('removeBlock');
      rules["if"]('playerHealthBelow0').then('resetPlayerPosition');
      rules["if"]('blockHitPlayer').then(function (rules) {
        rules["if"]('blockIsRed').then('damagePlayer')["else"]('healPlayer');
      }).then('removeBlock');
      rules["if"]('roundRunning')["if"]('allWallsFallen').then('roundLost');
      rules.addCondition('allWallsFallen', function (entity, gameState) {
        // check see if any of UnitSpawners have been made it past the world height + 1000
        var height = gameState.height;
        var unitSpawners = gameState.ents.UnitSpawner;
        var allWallsFallen = false;
        unitSpawners.forEach(function (spawner) {
          if (spawner.position.y > 4200) {
            allWallsFallen = true;
          }
        });
        return allWallsFallen;
      });
      rules.use(roundSutra, 'round');
      rules.use(spawnerSutra, 'spawner');
      rules.use(playerSutra, 'player');
      rules.use(colorChangesSutra, 'colorChanges');
      rules.use(inputSutra, 'input');

      /*
      // rules.if('changesColorWithDamage').then('colorChanges');
      rules.addAction({
      if: 'changesColorWithDamage',
      subtree: 'colorChanges'
      });
      */

      /*
        Remark: I don't think we need to use a subtree here since the input sutra is bound to user inputs
                The input sutra should just work as intended without need to be subtree
        rules.addAction({
          if: 'isPlayer',
          subtree: 'input'
        });
      */

      /*
      // rules.if('isPlayer').then('input');
      */

      // Additional rules
      this.createAdditionalRules(rules);
      console.log(rules);
      // let test = game.createSutra();
      game.useSutra(rules, 'TowerDefense');
      game.data.roundStarted = true;
      game.data.roundRunning = false;
      return rules;
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

    // base unit spawner
  }, {
    key: "createBorders",
    value: function createBorders(N) {
      var game = this.game;
      // TODO: move this a sutra
      for (var i = 0; i < N; i++) {
        var scaleFactor = 0.2 * (i + 1);
        game.systems.border.createBorder({
          height: game.height * scaleFactor + game.height,
          width: game.width * scaleFactor + game.width,
          thickness: 20,
          health: 100
          // depth: 100,
        });
      }
    }
  }, {
    key: "createAdditionalRules",
    value: function createAdditionalRules(rules) {
      var game = this.game;
      var self = this;
      rules.addCondition('blockHitWall', function (entity, data) {
        if (entity.type === 'COLLISION') {
          if (entity.bodyA.type === 'BORDER' || entity.bodyB.type === 'BORDER') {
            // console.log('blockHitWall', entity, data)
            if (entity.bodyA.type === 'BLOCK' || entity.bodyB.type === 'BLOCK') {
              return true;
            }
          }
        }
      });
      rules.on('removeBlock', function (context, node) {
        var block = context.BLOCK;
        game.removeEntity(block.id);
      });
      rules.on('damageWall', function (context, node) {
        var border = context.BORDER;
        border.health -= 1;
        if (border.health <= 0) {
          // remove the wall
          game.removeEntity(border.id);
          return;
        }
        // remove existing border
        game.updateEntity({
          id: border.id,
          type: 'BORDER',
          health: border.health
          // color: 0xff0000
        });
      });

      //
      // Player / Block Collisions
      //
      rules.addCondition('blockHitPlayer', function (entity, data) {
        if (entity.type === 'COLLISION') {
          if (entity.bodyA.type === 'PLAYER' || entity.bodyB.type === 'PLAYER') {
            // console.log('blockHitPlayer', entity, data)
            if (entity.bodyA.type === 'BLOCK' || entity.bodyB.type === 'BLOCK') {
              return true;
            }
          }
        }
      });
      rules.addCondition('blockIsRed', function (data, node) {
        var block;
        if (data.bodyA.type === 'BLOCK') {
          block = data.bodyA;
        } else {
          block = data.bodyB;
        }
        if (block.type === 'BLOCK') {
          if (block.color === 0xff0000) {
            return true;
          }
        }
      });
      rules.on('entity::updateEntity', function (data, node) {
        // console.log('entity::updateEntity', data);
        game.updateEntity(data);
      });
      rules.on('createBorders', function (data, node) {
        self.createBorders(2);
      });
      rules.on('roundLost', function (data, node, gameState) {
        //console.log('roundLost!!!');
        // stop the game
        game.data.roundStarted = false;
        game.data.roundRunning = false;
        game.data.roundEnded = true;
      });
      rules.on('startRound', function (data, node, gameState) {
        // set roundRunning to true
        game.data.roundRunning = true;
      });
    }
  }]);
  return TowerWorld;
}();
_defineProperty(TowerWorld, "id", 'world-towerdefense');
_defineProperty(TowerWorld, "type", 'world');
var _default = exports["default"] = TowerWorld;
/*

  // TODO: round end / reset round / round start
  // Custom function for 'isBoss' condition


  rules.addCondition('scoreIsAbove10', {
    op: 'greaterThan',
    property: 'score',
    value: 10
  });

  rules.addAction({
    if: ['scoreIsAbove10'],
    then: [{
      action: 'upgradeWeapon'
    }]
  });

  rules.on('upgradeWeapon', function (data, node) {
    console.log('upgradeWeapon', data, node)
    game.updateEntity({
      id: data.id,
      type: 'PLAYER',
      bulletColor: 0x00ff00
    });
  });

 
  rules.addCondition('allEnemiesCleared', function (entity, gameState) {
    let length = gameState.ents.UnitSpawner.length;
    return length <= 7;
    // TODO: return length === 0;
  })


  rules.addAction({
    if: ['allEnemiesCleared'],
    then: [{
      action: 'roundOver'
    }]
  })

  rules.on('roundOver', function () {
    // console.log('roundOver!!!')
  });


*/

},{"./sutras/colorChanges.js":52,"./sutras/enemy.js":53,"./sutras/input.js":54,"./sutras/player.js":55,"./sutras/round.js":56}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = colorChanges;
function colorChanges() {
  var game = this.game;
  var colorChanges = this.game.createSutra();
  colorChanges.addCondition('changesColorWithDamage', {
    op: 'or',
    conditions: ['isSpawner', 'isPlayer', 'isBorder']
  });

  // Define health level conditions for the boss
  var healthLevels = [100, 80, 60, 40, 20];
  var colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red

  // Adding health level conditions
  healthLevels.forEach(function (level, index) {
    colorChanges.addCondition("isHealthBelow".concat(level), {
      op: 'lessThan',
      property: 'health',
      value: level
    });
  });

  // Action for the boss based on health levels
  colorChanges.addAction({
    "if": 'changesColorWithDamage',
    then: healthLevels.map(function (level, index) {
      return {
        "if": "isHealthBelow".concat(level),
        then: [{
          action: 'entity::updateEntity',
          data: {
            color: colors[index]
          }
        }]
      };
    })
  });
  colorChanges.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data);
    game.updateEntity(data);
  });
  return colorChanges;
}

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = spawner;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function spawner() {
  var game = this.game;
  var spawner = this.game.createSutra();
  spawner.addCondition('isSpawner', function (entity, gameState) {
    return entity.type === 'UnitSpawner';
  });

  // Assuming the entity initially moves to the right
  //spawner.addCondition('moveLeft', (entity, gameState) => entity.position.x >= entity.startingPosition.x);

  //spawner.addCondition('moveRight', (entity, gameState) => entity.position.x < entity.startingPosition.x - 400);

  var moveRange = 0; // Define the range of movement

  spawner.addCondition('moveLeft', function (entity, gameState) {
    //console.log('moveLeft Check', entity.position.x, entity.startingPosition.x + moveRange);
    return entity.position.x > entity.startingPosition.x + moveRange;
  });
  spawner.addCondition('moveRight', function (entity, gameState) {
    // console.log('moveRight Check', entity.position.x, entity.startingPosition.x - moveRange);
    return entity.position.x <= entity.startingPosition.x - moveRange;
  });
  spawner.addCondition('gameTickMod60', function (entity, gameState) {
    // console.log('gameState.gameTick')
    return gameState.tick % 60 === 0;
  });
  spawner["if"]('gameTickMod60')["if"]('isSpawner').then('spawnBlock', {
    x: 0,
    y: 100
  });

  //
  // Spawner Movement
  //

  // spawner.define()
  // spawner.condition('isSpawner', (entity, gameState) => entity.type === 'UnitSpawner');

  spawner["if"]('gameTickMod60')["if"]('isSpawner', 'moveLeft').then('entity::updateEntity', {
    velocity: {
      x: -10,
      y: 10
    }
  });
  spawner["if"]('gameTickMod60')["if"]('isSpawner', 'moveRight').then('entity::updateEntity', {
    velocity: {
      x: 1,
      y: 10
    }
  });
  spawner.on('spawnBlock', function (entity, data) {
    // console.log('spawnBlock', entity, data)
    var ent = game.createEntity({
      type: 'BLOCK',
      position: {
        x: entity.position.x,
        y: entity.position.y
      },
      mass: 100,
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      // texture: 'fire',
      velocity: {
        x: 0,
        y: 30
      },
      width: 16,
      height: 16

      // color: 0xff0000
    });
    // console.log('aaaa', ent)
  });
  spawner.on('entity::updateEntity', function (data, node) {
    // console.log('entity::updateEntity', data, node);
    game.updateEntity({
      id: data.id,
      velocity: data.velocity
    });
  });
  spawner.addCondition('spawnUnitTouchedHomebase', function (entity, gameState) {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'UnitSpawner' && entity.bodyB.type === 'BORDER') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
      if (entity.bodyB.type === 'UnitSpawner' && entity.bodyA.type === 'BORDER') {
        // console.log('spawnUnitTouchedHomebase', entity, gameState)
        return true;
      }
    }
  });
  spawner.on('resetSpawnerUnit', function (data, node) {
    var previous = data.UnitSpawner;
    var newSpawner = {
      type: 'UnitSpawner',
      health: 100,
      position: previous.startingPosition,
      width: 64,
      height: 64,
      color: 0x00ff00,
      style: {
        backgroundColor: '#000000'
      }
    };
    newSpawner.startingPosition = previous.startingPosition;
    var ent = game.createEntity(newSpawner);
    //ent.timers.setTimer('test-timer', 0.5, true);
  });
  spawner.on('spawnEnemyUnits', function (data, node) {
    console.log('data', data, node);
    try {
      // create 8 unit spawners at the top of the map border, left to right, evenly spaced
      var spawners = [];
      for (var i = 0; i < 8; i++) {
        // create fresh clone of unitSpawner
        var _spawner = JSON.parse(JSON.stringify(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
          type: 'UnitSpawner',
          health: 100,
          position: {
            x: 0,
            y: 0
          }
        }, "health", 100), "mass", 100), "width", 64), "height", 64), "color", 0x00ff00), "style", {
          backgroundColor: '#000000'
        })));
        console.log('spawner', _spawner);
        var smallerWidth = game.width * 0.8;
        _spawner.position.x = -smallerWidth / 2 + smallerWidth / 8 * i;
        _spawner.position.y = -game.height / 2 + 100;
        _spawner.startingPosition = {
          x: _spawner.position.x,
          y: _spawner.position.y
        };
        spawners.push(_spawner);
      }
      spawners.forEach(function (spawner) {
        var ent = game.createEntity(spawner);
      });
    } catch (err) {
      console.log('err', err);
    }
  });
  spawner.on('removeSpawnUnit', function (event, data, node) {
    if (event.bodyA.type === 'BORDER') {
      game.removeEntity(event.bodyB.id);
      // set the color of bodyB to red
    }
    if (event.bodyB.type === 'BORDER') {
      game.removeEntity(event.bodyA.id);
    }
  });
  return spawner;
}

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = input;
var moveSpeed = 5;
function input() {
  var game = this.game;
  var rules = this.game.createSutra();
  rules.addCondition('PLAYER_UP', {
    op: 'or',
    conditions: ['W', 'DPAD_UP']
  });
  rules.addCondition('PLAYER_DOWN', {
    op: 'or',
    conditions: ['S', 'DPAD_DOWN']
  });
  rules.addCondition('PLAYER_LEFT', {
    op: 'or',
    conditions: ['A', 'DPAD_LEFT']
  });
  rules.addCondition('PLAYER_RIGHT', {
    op: 'or',
    conditions: ['D', 'DPAD_RIGHT']
  });
  rules.addCondition('USE_ITEM_1', {
    op: 'or',
    conditions: ['SPACE', 'H', 'BUTTON_B']
  });
  rules.addCondition('USE_ITEM_2', {
    op: 'or',
    conditions: ['J', 'BUTTON_X']
  });
  rules.addCondition('ZOOM_IN', {
    op: 'or',
    conditions: ['K', 'BUTTON_A']
  });
  rules.addCondition('ZOOM_OUT', {
    op: 'or',
    conditions: ['L', 'BUTTON_Y']
  });
  rules["if"]('PLAYER_UP').then('MOVE_UP');
  rules["if"]('PLAYER_LEFT').then('MOVE_LEFT');
  rules["if"]('PLAYER_DOWN').then('MOVE_DOWN');
  rules["if"]('PLAYER_RIGHT').then('MOVE_RIGHT');
  rules["if"]('USE_ITEM_1').then('FIRE_BULLET').map('determineShootingSprite').then('updateSprite');
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

  // Sutra event listeners for executing actions
  rules.on('PLAYER_UP', function (entity) {
    var dx = 0;
    var dy = moveSpeed;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: -dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  rules.on('PLAYER_LEFT', function (entity) {
    var dx = moveSpeed;
    var dy = 0;
    var forceFactor = 0.05;
    var force = {
      x: -dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  rules.on('PLAYER_RIGHT', function (entity) {
    var dx = moveSpeed;
    var dy = 0;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  rules.on('PLAYER_DOWN', function (entity) {
    var dx = 0;
    var dy = moveSpeed;
    var forceFactor = 0.05;
    var force = {
      x: dx * forceFactor,
      y: dy * forceFactor
    };
    game.applyForce(entity.id, force);
  });
  console.log('creating input sutra', rules);
  return rules;
}
;

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = player;
function player() {
  var game = this.game;
  var player = this.game.createSutra();
  player.addCondition('isPlayer', function (entity) {
    return entity.type === 'PLAYER';
  });
  player.addCondition('playerHealthBelow0', function (entity, gameState) {
    if (entity.type === 'PLAYER') {
      if (entity.health <= 0) {
        return true;
      }
    }
  });
  player.on('resetPlayerPosition', function (data, node) {
    game.updateEntity({
      id: data.id,
      position: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      health: 100,
      color: 0x00ff00,
      score: 0
    });
  });
  player.on('damagePlayer', function (data, node) {
    var block = data.BLOCK;
    var player = data.PLAYER;
    player.health -= 10;
    game.updateEntity({
      id: player.id,
      health: player.health
    });
  });
  player.on('healPlayer', function (data, node) {
    var block = data.BLOCK;
    var player = data.PLAYER;
    if (player) {
      player.health += 5;
      game.updateEntity({
        id: player.id,
        health: player.health
      });
    }
  });
  return player;
}

},{}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = round;
function round() {
  var round = this.game.createSutra();

  // Condition to check if a round has started
  round.addCondition('roundStarted', function (entity, gameState) {
    console.log('roundStarted', gameState.roundStarted);
    return gameState.roundStarted === true;
  });

  // Condition to check if a round has ended
  round.addCondition('roundEnded', function (entity, gameState) {
    return gameState.roundEnded === true;
  });
  round.addCondition('roundRunning', function (entity, gameState) {
    return gameState.roundRunning === true;
  });
  round.addCondition('roundNotRunning', function (entity, gameState) {
    return gameState.roundRunning === false;
  });
  round.addCondition('roundPaused', function (entity, gameState) {
    return gameState.roundPaused === true;
  });

  // TODO: remove add NOT condition
  round.addCondition('roundNotPaused', function (entity, gameState) {
    return gameState.roundPaused !== true;
  });
  round.on('roundLost', function (data, node, gameState) {
    console.log('roundLost!!!');
    // stop the game
    gameState.roundStarted = false;
    gameState.roundRunning = false;
    gameState.roundEnded = true;
    gameState.roundPaused = true;
  });
  round.on('startRound', function (data, node, gameState) {
    // set roundRunning to true
    console.log('startRound', node);
    gameState.roundRunning = true;
    gameState.roundEnded = false;
  });

  // round.if('startRound').then('startRound');

  return round;
}

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createWalker;
function createWalker(game, config) {
  game.createEntity({
    type: 'Walker',
    // sutra: 'walker', // TODO
    width: 22,
    height: 24,
    texture: {
      sheet: 'jogurt',
      sprite: 'walkLeft'
    },
    depth: 64,
    position: {
      x: 50,
      y: -150,
      z: 32
    }
  });
  var walker = game.createSutra();

  // Set properties from config
  walker.route = config.route;
  walker.routeIndex = 0;
  walker.target = walker.route[walker.routeIndex];
  walker.tolerance = config.tolerance || 5; // Default tolerance to 5 if not specified

  walker.addCondition('isWalker', function (entity) {
    return entity.type === 'Walker';
  });

  // Check if the walker is at the current target waypoint
  walker.addCondition('atTarget', function (entity) {
    var dx = entity.position.x - walker.target[0];
    var dy = entity.position.y - walker.target[1];
    return Math.sqrt(dx * dx + dy * dy) < walker.tolerance;
  });

  // Determine the next waypoint
  walker.on('nextWaypoint', function (entity) {
    if (walker.routeIndex < walker.route.length - 1) {
      walker.routeIndex++;
    } else {
      walker.routeIndex = 0; // Loop back to the start
    }
    walker.target = walker.route[walker.routeIndex];
  });

  // Walker movement logic
  walker["if"]('isWalker')["if"]('atTarget').then('nextWaypoint'); // Switch to next waypoint when current one is reached

  walker["if"]('isWalker').then('entity::updateEntity');

  // Updating the entity (used for both movement and firing)
  walker.on('entity::updateEntity', function (entity) {
    var dx = walker.target[0] - entity.position.x;
    var dy = walker.target[1] - entity.position.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var velocityX = distance > 0 ? dx / distance : 0;
    var velocityY = distance > 0 ? dy / distance : 0;
    game.updateEntity({
      id: entity.id,
      velocity: {
        x: velocityX,
        y: velocityY
      }
    });
  });

  /*
  // Remark: We could add additional walker logic, and or create a new NPC sutra behavior for using weapons
  rules.addCondition('WalkerTouchedPlayer', (collision) => {
    console.log('ccc', collision)
    return (collision.entityA.type === 'Walker' && collision.entityB.type === 'Player') || (collision.entityA.type === 'Player' && collision.entityB.type === 'Walker');
  });
   rules.addCondition('WalkerTouchedPlayer', (entity, gameState) => {
    if (entity.type === 'COLLISION') {
      if (entity.bodyA.type === 'Walker' && entity.bodyB.type === 'PLAYER') {
        return true;
      }
      if (entity.bodyB.type === 'Walker' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
    rules.on('PlayerTakeDamage', (collision, node, gameState) => {
    console.log('PlayerTakeDamage', collision, gameState);
     game.removeEntity(collision.Walker.id);
     // get current walk count
    let walkerCount = gameState.ents.Walker.length || 0;
     if (walkerCount < 10) {
      // create a new walker
      game.createEntity({
        type: 'Walker',
        width: 16,
        height: 16,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'bomb',
        },
        depth: 64,
        position: {
          x: -50,
          y: -150,
          z: 32
        }
      });
       game.createEntity({
        type: 'Walker',
        width: 16,
        height: 16,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'bomb',
        },
        depth: 64,
        position: {
          x: 50,
          y: -150,
          z: 32
        }
      });
    }
  
  });
   rules
    .if('WalkerTouchedPlayer')
    .then('PlayerTakeDamage');
    */

  return walker;
}

},{}],58:[function(require,module,exports){
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var XState = /*#__PURE__*/function () {
  // type is optional for Plugins
  function XState(game) {
    _classCallCheck(this, XState);
    this.game = game; // Store the reference to the game logic
    this.id = XState.id;
    this.type = XState.type;
  }
  _createClass(XState, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;

      // Set gravity to zero
      game.setGravity(0, 0, 0);

      // Use Plugins to extend the game with new functionality

      // Adds projectile Bullets to the game
      game.use('Bullet');

      // Adds Health to the game
      game.use('Health');

      // Adds destructible Blocks to the game
      game.use('Block');

      // Adds a nice StarField background
      game.use('StarField');

      /*
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/xstate-matter-babylon.html'
      });
      */

      function BossFightMiddleware() {
        var BossFight = {
          id: 'bossFightGame',
          initial: 'Idle',
          context: {
            name: 'boss',
            health: 1000
          },
          states: {
            Idle: {
              on: {
                START: 'Active'
              }
            },
            Active: {
              on: {
                'entity::damage': {
                  target: 'UpdateEntity',
                  cond: 'isBossDamaged'
                },
                ENTITY_DESTROYED: {
                  target: 'Victory',
                  cond: 'isBossDefeated'
                }
              }
            },
            UpdateEntity: {
              on: {
                COMPLETE_UPDATE: 'Active'
              },
              entry: 'calculateComponentUpdate'
            },
            Victory: {
              type: 'final'
              // Additional actions or events after the boss is defeated
            }
          },
          on: {
            // Define global event handlers if needed
          }
        };
        var Actions = {
          calculateComponentUpdate: function calculateComponentUpdate(context, event) {
            // Logic to calculate and apply component updates
            context.health -= event.damage;

            // Define color ranges: yellow (0xffff00) to red (0xff0000)
            var yellow = {
              r: 255,
              g: 255,
              b: 0
            };
            var red = {
              r: 255,
              g: 0,
              b: 0
            };

            // Calculate the proportion of health lost
            var maxHealth = 1000; // Assuming max health is 1000
            var healthProportion = Math.max(context.health, 0) / maxHealth;

            // Interpolate between yellow and red based on health proportion
            var r = yellow.r + (red.r - yellow.r) * (1 - healthProportion);
            var g = yellow.g + (red.g - yellow.g) * (1 - healthProportion);
            var b = yellow.b + (red.b - yellow.b) * (1 - healthProportion);

            // Convert RGB to hexadecimal color
            context.color = Math.round(r) << 16 | Math.round(g) << 8 | Math.round(b);
          }
        };
        var Guards = {
          isBossDamaged: function isBossDamaged(context, event) {
            console.log('isBossDamaged', context, event);
            return event.name === context.name && event.type === 'entity::damage';
          },
          isBossDefeated: function isBossDefeated(context, event) {
            console.log('isBossDefeated', context, event);
            return event.name === context.name && event.type === 'ENTITY_DESTROYED';
          }
        };
        var Game = {
          "id": "bossFightGame",
          "world": {
            "width": 800,
            "height": 600
          },
          "entities": {
            "boss": {
              "type": "NPC",
              "position": {
                x: -200,
                y: -600
              },
              // Define boss's position
              height: 600,
              width: 600,
              "health": 1000
              // Additional boss properties like attack patterns, abilities, etc.
            }
          },
          "stateMachine": BossFight,
          "guards": Guards,
          "actions": Actions
        };
        return Game;
      }
      game.on('plugin::ready::XState', function () {
        game.createDefaultPlayer();
        game.systems['xstate'].loadEntities();
      });
      game.use('XState', {
        world: BossFightMiddleware()
      });
      // game.use('StarField');

      /*
      game.systems.graphics.switchGraphics('PhaserGraphics', function(){
       });
      */
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
    value: function unload() {
      this.game.systems['xstate'].unload();
    }
  }]);
  return XState;
}();
_defineProperty(XState, "id", 'world-xstate');
_defineProperty(XState, "type", 'world');
var _default = exports["default"] = XState;

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _contraptionsExample = _interopRequireDefault(require("./contraptions-example.js"));
var _topDown = _interopRequireDefault(require("../../mantra-sutras/player-movement/top-down.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var YCraft = /*#__PURE__*/function () {
  // type is optional for Plugins
  function YCraft(game) {
    _classCallCheck(this, YCraft);
    this.game = game; // Store the reference to the game logic
    this.id = YCraft.id;
    this.type = YCraft.type;
  }
  _createClass(YCraft, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.customMovement = false;
      game.reset();
      game.setGravity(0, 0, 0);
      game.setSize(1600, 900);
      if (game.isTouchDevice()) {
        game.zoom(1.5);
      } else {
        game.setZoom(2);
      }
      game.use('Boomerang');
      game.use('Bullet');
      game.use('Block');
      game.use('YCraft', {
        contraption: _contraptionsExample["default"]
      });
      game.use('YCraftGUI');
      game.createPlayer({
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'player'
        },
        meta: {
          lives: 99
        },
        position: {
          x: 100,
          y: 100
        }
      });

      // create warp by back home entity
      game.createEntity({
        type: 'WARP',
        exit: {
          world: 'Home',
          position: {
            x: 0,
            y: 0
          }
        },
        // color: 0x00ff00,
        width: 64,
        texture: 'warp-to-home',
        isStatic: true,
        collisionStart: true,
        // isSensor: false,
        height: 64,
        position: {
          x: 260,
          y: 60,
          z: 0
        }
      });

      // text label saying "Warp To Mantra Home"
      game.createEntity({
        type: 'TEXT',
        text: 'Warp To Mantra',
        width: 120,
        // kind: 'dynamic',
        color: 0x000000,
        style: {
          fontSize: '16px',
          textAlign: 'center'
        },
        body: false,
        position: {
          x: 260,
          y: 60,
          z: 64
        }
      });
      var rules = game.rules;
      function yCraftRules() {
        var rules = game.createSutra();
        // no custom rules yet, see YCraft.js plugin
        game.useSutra(rules, 'YCRAFT');
      }
      yCraftRules();
      /*
      game.once('plugin::loaded::typer-ghost', function(){
        game.systems['typer-ghost'].createText({ x: 300, y: 500, text: 'YCraft Crafting World', style: { color: 'white', fontSize: '144px' }, duration: 5000, removeDuration: 1000 });
      })
       game.use('GhostTyper');
      */
      /*
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-worlds/YCraft/YCraft.js',
        sutraEditor: true
      });
      */

      /*
      game.createEntity({ 
        type: 'BLOCK',
        color: 0xcccccc,
        mass: 10000,
        height: 64,
        width: 64,
        position: { x: 150, y: 300, z: 0 },
        friction: 1, 
        frictionAir: 1, 
        frictionStatic: 1
      });
      */

      // create some blocks to use
      for (var i = 0; i < 10; i++) {
        game.createEntity({
          type: 'BLOCK',
          texture: 'tile-block',
          mass: 10000,
          height: 16,
          width: 16,
          startCollision: true,
          position: {
            x: 180,
            y: 0 + i * 64,
            z: 0
          },
          friction: 1,
          frictionAir: 1,
          frictionStatic: 1
        });
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
  }, {
    key: "unload",
    value: function unload() {
      console.log('YCraft.unload()');
    }
  }]);
  return YCraft;
}();
_defineProperty(YCraft, "id", 'world-ycraft');
_defineProperty(YCraft, "type", 'world');
var _default = exports["default"] = YCraft;

},{"../../mantra-sutras/player-movement/top-down.js":27,"./contraptions-example.js":60}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createColorPuzzle;
var _index = require("../../../YCraft.js/index.js");
//import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from 'ycraft';

function createColorPuzzle() {
  // simple light
  var exampleA = new _index.YCraft(0, 0, 0, {
    description: "Simple Light",
    height: 100,
    width: 125
  });

  // Updated positions
  var button0 = new _index.Button(25, 15, 0);
  var latch0 = new _index.Latch(25, 65, 0);
  var light0 = new _index.LEDLight(75, 15, 25, {
    wattage: 60,
    height: 250,
    width: 250
  });
  button0.connect(light0);
  latch0.connect(light0);
  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);

  // wired light
  var exampleB = new _index.YCraft(0, 140, 0, {
    description: "Wired Light",
    height: 120,
    width: 200
  });
  var wire1 = new _index.Wire();
  var wire2 = new _index.Wire();
  var button1 = new _index.Button(25, 25, 1); // moved from (0, 0)
  var latch1 = new _index.Latch(25, 75, 1); // moved from (0, 37.5)
  var relay1 = new _index.Relay(75, 50, 0); // moved from (37.5, 18.75)
  var light1 = new _index.LEDLight(125, 50, 25, {
    wattage: 60,
    height: 250,
    width: 250
  }); // moved from (75, 18.75)

  button1.connect(wire1);
  latch1.connect(wire1);
  wire1.connect(relay1);
  relay1.connect(wire2);
  wire2.connect(light1);
  exampleB.addPart(light1);
  exampleB.addPart(button1);
  exampleB.addPart(latch1);
  exampleB.addPart(relay1);
  exampleB.addPart(wire1);
  exampleB.addPart(wire2);

  // pressure sensor wire

  var exampleC = new _index.YCraft(0, 280, 0, {
    description: "Pressure Sensor Wire",
    height: 120,
    width: 200
  });
  var pressureSensor = new _index.PressureSensor(25, 25, 1);
  var wire3 = new _index.Wire();
  var light2 = new _index.LEDLight(125, 25, 25, {
    wattage: 60,
    height: 250,
    width: 250
  });
  pressureSensor.connect(wire3);
  wire3.connect(light2);
  exampleC.addPart(pressureSensor);
  exampleC.addPart(wire3);
  exampleC.addPart(light2);

  /*
    const motionDetector = new MotionDetector(-150, -250, 0); // Position at top-left
  const pressureSensor = new PressureSensor(150, -250, 0); // Next to the Motion Detector
  const actuator = new Actuator(450, -250, 0); // Positioned appropriately
  const securityLight = new LEDLight(450, 0, 0, { wattage: 60 }); // Near bottom-right
  const manualOverrideButton = new Button(50, 450, 0); // Near bottom-left
   // Connect components to the Actuator
  motionDetector.connect(actuator);
  pressureSensor.connect(actuator);
  manualOverrideButton.connect(actuator);
   // Connect Actuator to the Security Light
  actuator.connect(securityLight);
   // Add parts to YCraft system
  yCraftSystem.addPart(motionDetector);
  yCraftSystem.addPart(pressureSensor);
  yCraftSystem.addPart(securityLight);
  yCraftSystem.addPart(manualOverrideButton);
  yCraftSystem.addPart(actuator);
  */

  // security system
  var exampleD = new _index.YCraft(210, 140, 0, {
    description: "Security System",
    height: 120,
    width: 200
  });
  var motionDetector2 = new _index.MotionDetector(25, 25, 0);
  var pressureSensor2 = new _index.PressureSensor(25, 75, 0);
  var actuator2 = new _index.Actuator(125, 50, 0);
  var light3 = new _index.LEDLight(175, 50, 25, {
    wattage: 60,
    height: 250,
    width: 250
  });
  var button2 = new _index.Button(25, 125, 0);
  motionDetector2.connect(actuator2);
  pressureSensor2.connect(actuator2);
  button2.connect(actuator2);
  actuator2.connect(light3);
  exampleD.addPart(motionDetector2);
  exampleD.addPart(pressureSensor2);
  exampleD.addPart(actuator2);
  exampleD.addPart(light3);
  exampleD.addPart(button2);
  var examples = new _index.YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);
  examples.addContraption(exampleC);
  examples.addContraption(exampleD);
  var rover = roverLight(-145, 145, 0);
  examples.addContraption(rover);
  return examples;
}
function roverLight(x, y, z) {
  var contraption = new _index.YCraft(x, y, z, {
    description: "Rover Light",
    powerRequired: false
  });

  // Create the latchs
  var latch = new _index.Latch(25, 25, 2);
  var latch2 = new _index.Latch(100, 25, 2);

  // Create the LED lights
  var ledLight1 = new _index.LEDLight(0, 100, 1);
  var ledLight2 = new _index.LEDLight(50, 100, 1);
  var ledLight3 = new _index.LEDLight(100, 100, 1);

  // Create the Rover
  var redRover = new _index.Rover(50, 25, 0, {
    color: 0xff0000,
    velocity: {
      x: -2,
      y: 0
    }
  });

  // Create wires for each latch
  var wire1 = new _index.Wire();
  var wire2 = new _index.Wire();
  contraption.addPart(redRover);

  // Connect the first latch to the first and second LED lights
  latch.connect(wire1);
  wire1.connect(ledLight1);
  wire1.connect(ledLight2);
  wire1.connect(ledLight3);

  // Connect the second latch to the third LED light
  latch2.connect(wire2);
  //wire2.connect(ledLight1);
  //wire2.connect(ledLight2);
  wire2.connect(ledLight3);

  // Add parts to YCraft system
  contraption.addPart(latch);
  contraption.addPart(latch2);
  contraption.addPart(wire1);
  contraption.addPart(wire2);
  contraption.addPart(ledLight1);
  contraption.addPart(ledLight2);
  contraption.addPart(ledLight3);
  contraption.onAny(function (event, data) {
    // console.log(event, data);
  });

  // Start moving the Rover
  // Since no collision system is being used, the Rover will move through the LED lights without triggering them
  redRover.start();
  return contraption;
}

},{"../../../YCraft.js/index.js":1}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "worlds", {
  enumerable: true,
  get: function get() {
    return _index["default"];
  }
});
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./index.js":62}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Home = _interopRequireDefault(require("./Home/Home.js"));
var _EatWorld = _interopRequireDefault(require("./EatWorld/EatWorld.js"));
var _GravityGardens = _interopRequireDefault(require("./GravityGardens/GravityGardens.js"));
var _InfinityTower = _interopRequireDefault(require("./InfinityTower/InfinityTower.js"));
var _Maze = _interopRequireDefault(require("./Maze/Maze.js"));
var _Music = _interopRequireDefault(require("./Music/Music.js"));
var _Platform = _interopRequireDefault(require("./Platform/Platform.js"));
var _Playground = _interopRequireDefault(require("./Playground/Playground.js"));
var _Pong = _interopRequireDefault(require("./Pong/Pong.js"));
var _Space = _interopRequireDefault(require("./Space/Space.js"));
var _Sutra = _interopRequireDefault(require("./Sutra/Sutra.js"));
var _Tiled = _interopRequireDefault(require("./Tiled/Tiled.js"));
var _TowerDefense = _interopRequireDefault(require("./TowerDefense/TowerDefense.js"));
var _XState = _interopRequireDefault(require("./XState/XState.js"));
var _YCraft = _interopRequireDefault(require("./YCraft/YCraft.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Remark: These should all be more closely tied to ./plugins directory
// and scope / codepaths. we should be able to load the World plugins from .use('WorldName')

var worlds = {};
worlds.Home = _Home["default"];
worlds.EatWorld = _EatWorld["default"];
worlds.GravityGardens = _GravityGardens["default"];
worlds.InfinityTower = _InfinityTower["default"];
worlds.Maze = _Maze["default"];
worlds.Music = _Music["default"];
worlds.Platform = _Platform["default"];
worlds.Playground = _Playground["default"];
worlds.Pong = _Pong["default"];
worlds.Space = _Space["default"];
worlds.Sutra = _Sutra["default"];
worlds.XState = _XState["default"];
worlds.Tiled = _Tiled["default"];
worlds.TowerDefense = _TowerDefense["default"];
worlds.YCraft = _YCraft["default"];
var _default = exports["default"] = worlds;

},{"./EatWorld/EatWorld.js":28,"./GravityGardens/GravityGardens.js":29,"./Home/Home.js":30,"./InfinityTower/InfinityTower.js":36,"./Maze/Maze.js":37,"./Music/Music.js":39,"./Platform/Platform.js":43,"./Playground/Playground.js":44,"./Pong/Pong.js":45,"./Space/Space.js":46,"./Sutra/Sutra.js":47,"./Tiled/Tiled.js":48,"./TowerDefense/TowerDefense.js":51,"./XState/XState.js":58,"./YCraft/YCraft.js":59}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var routing = {};
routing.createLineRoute = function createLineRoute(startX, startY, endX, endY, step) {
  var route = [];
  var dx = endX - startX;
  var dy = endY - startY;
  var steps = Math.max(Math.abs(dx), Math.abs(dy)) / step;
  for (var i = 0; i <= steps; i++) {
    route.push([startX + dx * i / steps, startY + dy * i / steps]);
  }
  return route;
};
routing.createRectangleRoute = function createRectangleRoute(x, y, width, height) {
  return [[x, y], [x + width, y], [x + width, y + height], [x, y + height], [x, y]];
};
routing.createCircleRoute = function createCircleRoute(centerX, centerY, radius, segments) {
  var route = [];
  for (var i = 0; i <= segments; i++) {
    var angle = 2 * Math.PI * i / segments;
    route.push([centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)]);
  }
  return route;
};

/*
const lineRoute = createLineRoute(0, 0, 200, 200, 20);
const rectangleRoute = createRectangleRoute(50, 50, 150, 100);
const circleRoute = createCircleRoute(100, 100, 50, 20);
*/
var _default = exports["default"] = routing;

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = switchGraphics;
var loadingCircle;

// TODO: make configurable
var waitTime = 3000;
function switchGraphics(game) {
  var rules = game.createSutra();
  rules.addCondition('playerTouchedPhaserGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'ACTIVE' && entity.TEXT.name === 'PhaserGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules.addCondition('playerStoppedTouchedPhaserGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'END' && entity.TEXT.name === 'PhaserGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules["if"]('playerTouchedPhaserGraphics').then('switchGraphics');
  rules["if"]('playerStoppedTouchedPhaserGraphics').then('hideLoader');

  // babylon graphics
  // TODO: clean up the collision handler to use a specific TYPE of entity for switching graphics, don't overlead TEXT
  // perhaps use Door, with KIND property being a Plugin spec
  rules.addCondition('playerTouchedThreeGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'ACTIVE') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT' && (entity.TEXT.name === 'ThreeGraphics' || entity.TEXT.name === 'CSSGraphics')) {
        return true;
      }
      if (entity.bodyA.type === 'TEXT' && (entity.TEXT.name === 'ThreeGraphics' || entity.TEXT.name === 'CSSGraphics') && entity.bodyB.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules.addCondition('playerStoppedTouchedThreeGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'END' && (entity.TEXT.name === 'ThreeGraphics' || entity.TEXT.name === 'CSSGraphics')) {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules["if"]('playerTouchedThreeGraphics').then('switchGraphics');
  rules["if"]('playerStoppedTouchedThreeGraphics').then('hideLoader');
  rules.on('hideLoader', function (entity, node, gameState) {
    if (loadingCircle) {
      loadingCircle.remove();
    }
  });
  rules.on('switchGraphics', function (entity, node, gameState) {
    if (typeof entity.duration === 'number') {
      if (entity.duration === 1) {
        // first time, show circle
        loadingCircle = new game.systems.graphics.LoadingCircle(waitTime);

        // Set position of the loading circle
        var position = entity.TEXT.position;
        var adjustedPosition = {
          x: position.x - gameState.camera.position.x + window.outerWidth / 2,
          y: position.y - gameState.camera.position.y + window.outerHeight / 2
        };
        adjustedPosition.x += 45;
        adjustedPosition.y += 255;
        loadingCircle.setPosition(adjustedPosition.x, adjustedPosition.y); // X and Y coordinates
        loadingCircle.container.addEventListener('loadingComplete', function (e) {
          console.log('Loading complete:', e.detail);
          var graphicsName = entity.TEXT.name || 'PhaserGraphics';
          game.switchGraphics(graphicsName);
          // remove the loading circle
          loadingCircle.remove();
        });
      } else {
        // update circle
        loadingCircle.tick(1 / gameState.fps * 1000);
      }
    }
  });
  return rules;
}

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = warpToWorld;
function warpToWorld(game) {
  var rules = game.createSutra();

  /*
  // TODO: pointerMove and hold to warp with mouse
  game.on('pointerMove', (entity) => {
    if (entity.type === 'WARP') {
      console.log('pointerMove WARP', entity)
    }
  });
  */

  rules.addCondition('playerTouchedWarpZone', function (entity, gameState) {
    if (entity.type === 'COLLISION') {
      if (entity.PLAYER && entity.WARP) {
        return true;
      }
    }
  });
  rules["if"]('playerTouchedWarpZone').then('switchWorld');
  rules.on('switchWorld', function (entity) {
    var worldName = entity.WARP.kind || 'Home';
    game.switchWorlds(worldName);
  });
  return rules;
}

},{}]},{},[61])(61)
});

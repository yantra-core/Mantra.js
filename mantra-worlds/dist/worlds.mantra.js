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
        if (component.receive && typeof component.receive === 'function') {
          component.receive(signal);
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
        if (component.off && typeof component.off === 'function') {
          component.off(_this2.signal);
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
exports["default"] = createWalker;
function createWalker(game, config) {
  game.createEntity({
    type: 'Walker',
    sutra: 'walker',
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
    depth: 64,
    position: {
      x: -60,
      y: -60,
      z: 32
    }
  });
  game.createEntity({
    type: 'DEMON',
    texture: 'demon',
    //texture: 'fire',
    //color: 0xff0000,
    width: 8,
    height: 8,
    depth: 64,
    position: {
      x: 64,
      y: -60,
      z: 32
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
    // TODO: figure out why collision not working
    alert('aaa')
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
    depth: 64,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 32
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
    depth: 64,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 32
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
    game.removeEntity(ent.id);
    if (ent.type === 'PLAYER') {
      game.currentPlayerId = null;
      game.createDefaultPlayer();
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
      isStatic: false,
      // isSensor: true,
      position: {
        x: x,
        y: y
      },
      velocity: {
        x: 0,
        y: 0
      } // Assuming velocity is part of the hexapod entity
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
    // update entity size by 11%
    game.updateEntity({
      id: hexapod.id,
      width: hexapod.width * 1.1,
      height: hexapod.height * 1.1
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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
var Home = /*#__PURE__*/function () {
  // type is optional for Plugins
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.

  function Home() {
    _classCallCheck(this, Home);
    this.id = Home.id;
  }
  _createClass(Home, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      // game.data.camera.currentZoom = 2;
      game.setGravity(0, 0, 0);
      game.createDefaultPlayer({
        position: {
          x: 0,
          y: 0
        }
      });

      // game.setBackground('#007F00');
      game.setBackground('#007fff');
      game.use('Block');
      game.use('Border', {
        autoBorder: true
      });
      game.use('Bullet');
      game.use('Tone');
      game.use('Tile');
      // game.use('Sword')

      (0, _welcomeMessage["default"])(game);

      // See: sutras.js for World logic
      var rules = (0, _sutras["default"])(game);
      game.setSutra(rules);

      /*    
      game.createEntity({
        type: 'KEY',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoKey',
        },
        width: 16,
        height: 16,
        body: false,
        position: { // position to right
          x: -185,
          y: 45,
          z: 10
        }
      });
      */

      // now create some background and text entities for navigation
      game.createEntity({
        type: 'BACKGROUND',
        texture: 'garden',
        width: 300,
        height: 300,
        //width: game.data.width,
        //height: game.data.height,
        body: false,
        position: {
          x: 0,
          y: 0,
          z: -10
        }
      });
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
      game.createEntity({
        type: 'BACKGROUND',
        texture: 'robot-arms-apartment',
        kind: 'building',
        depth: 1,
        width: 1340,
        height: 3668,
        body: false,
        position: {
          // position to right
          x: 900,
          y: -1800,
          z: 1
        }
      });
      game.createEntity({
        type: 'BACKGROUND',
        texture: 'planet-express-base',
        kind: 'building',
        width: 2048,
        height: 2048,
        depth: 1,
        body: false,
        position: {
          // position to right
          x: -900,
          y: -800,
          z: -1
        }
      });
      game.createEntity({
        type: 'BLOCK',
        texture: 'tile-block',
        width: 200,
        height: 200,
        mass: 10000,
        // body: false,
        position: {
          // position to right
          x: 200,
          y: -800,
          z: -8
        }
      });

      // if touch warp, switch to YCraft level
      game.createEntity({
        type: 'WARP',
        kind: 'YCraft',
        width: 64,
        height: 64,
        depth: 64,
        texture: 'warp-to-ycraft',
        isStatic: true,
        isSensor: true,
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
        // kind: 'dynamic',
        color: 0x000000,
        style: {
          fontSize: '16px',
          textAlign: 'center'
        },
        body: false,
        position: {
          x: -20,
          y: -220,
          z: 64
        }
      });

      // if touch warp, switch to Babylon Graphics
      /*
      game.createEntity({
        type: 'BLOCK',
        width: 64,
        height: 64,
        depth: 64,
        texture: '3d-homer',
        isSensor: true,
        // isStatic: true,
        position: {
          x: 80,
          y: 25,
          z: 25
        }
      });
      */

      // switch to 3d text label
      game.createEntity({
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

      // switch to phaser 3
      game.createEntity({
        name: 'PhaserGraphics',
        type: 'TEXT',
        text: 'Canvas',
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

      // switch to 3d text label
      game.createEntity({
        name: 'BabylonGraphics',
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
      game.createEntity({
        type: 'DOOR',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoDoor'
        },
        width: 16,
        height: 16,
        body: false,
        position: {
          // position to right
          x: 55,
          y: 71,
          z: 10
        }
      });
      game.createEntity({
        type: 'DOOR',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoDoor'
        },
        width: 16,
        height: 16,
        body: false,
        position: {
          // position to right
          x: -55,
          y: 71,
          z: 10
        }
      });

      // if touch warp, switch to Music level
      game.createEntity({
        type: 'WARP',
        kind: 'Music',
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
        kind: 'Platform',
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

      // displays some items from the spritesheet
      var itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];
      itemsList = [];
      itemsList.forEach(function (item, index) {
        game.createEntity({
          type: item.toUpperCase(),
          kind: item,
          width: 16,
          height: 16,
          depth: 32,
          texture: {
            sheet: 'loz_spritesheet',
            sprite: item
          },
          position: {
            x: -100 + index * 32,
            y: 150,
            z: 32
          }
        });
      });

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
    }
  }]);
  return Home;
}();
_defineProperty(Home, "id", 'world-home');
_defineProperty(Home, "type", 'world');
var _default = exports["default"] = Home;

},{"./sutras.js":26,"./welcomeMessage.js":28}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sutras;
var _warpToWorld = _interopRequireDefault(require("../sutras/warpToWorld.js"));
var _switchGraphics = _interopRequireDefault(require("../sutras/switchGraphics.js"));
var _walker = _interopRequireDefault(require("../../mantra-game/plugins/world-tower/sutras/walker.js"));
var _routing = _interopRequireDefault(require("../sutras/routing.js"));
var _fire = _interopRequireDefault(require("../../mantra-sutras/fire.js"));
var _block = _interopRequireDefault(require("./sutras/block.js"));
var _demon = _interopRequireDefault(require("../../mantra-sutras/demon.js"));
var _hexapod = _interopRequireDefault(require("../../mantra-sutras/hexapod.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// helper sutra for switching worlds

// walker is npc that walks around route

// routing helper to create vector routes

function sutras(game) {
  var rules = game.createSutra();

  //  rules.addCondition('isGameRunning', (game) => true);  
  //  rules.if('isGameRunning').then('warpToWorld');

  // helper for switching graphics
  var switchGraphicsSutra = (0, _switchGraphics["default"])(game);
  rules.use(switchGraphicsSutra, 'switchGraphics');

  // when touching WARP entity, warp to world
  var warp = (0, _warpToWorld["default"])(game);
  rules.use(warp, 'warpToWorld');

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
  rules.use((0, _fire["default"])(game), 'fire');

  // block entity
  rules.use((0, _block["default"])(game), 'block');

  // demon entity
  rules.use((0, _demon["default"])(game), 'demon');

  // hexapod entity
  rules.use((0, _hexapod["default"])(game), 'hexapod');

  // console.log('created sutra', rules.toEnglish())
  return rules;
}

},{"../../mantra-game/plugins/world-tower/sutras/walker.js":20,"../../mantra-sutras/demon.js":21,"../../mantra-sutras/fire.js":22,"../../mantra-sutras/hexapod.js":23,"../sutras/routing.js":42,"../sutras/switchGraphics.js":43,"../sutras/warpToWorld.js":44,"./sutras/block.js":27}],27:[function(require,module,exports){
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
  rules["if"]('playerTouchedBlock').then('playNote', {
    note: 'C2'
  });
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _warpToWorld = _interopRequireDefault(require("../sutras/warpToWorld.js"));
var _createPiano = _interopRequireDefault(require("./instruments/createPiano.js"));
var _createDrumKit = _interopRequireDefault(require("./instruments/createDrumKit.js"));
var _sutras = _interopRequireDefault(require("./sutras.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Home = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Home() {
    _classCallCheck(this, Home);
    this.id = Home.id;
  }
  _createClass(Home, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setBackground('black');

      // Usage example
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
      game.setGravity(0, 4.3, 0);

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
      game.use('Bullet');
      // game.use('Sword')

      game.use('Border', {
        autoBorder: true
      });

      // See: sutras.js for World logic
      var rules = (0, _sutras["default"])(game);

      // set the Sutra rules for Home world
      game.setSutra(rules);

      // warp to Platform level
      game.createEntity({
        type: 'WARP',
        texture: 'warp-to-home',
        width: 64,
        height: 64,
        isStatic: true,
        position: {
          x: 200,
          y: -10
        }
      });
      // text "Warp to Mantra"
      game.createEntity({
        type: 'TEXT',
        text: 'Warp To Mantra',
        // kind: 'dynamic',
        color: 0xffffff,
        style: {
          padding: '2px',
          fontSize: '16px',
          textAlign: 'center'
        },
        body: false,
        position: {
          x: 195,
          y: -20
        }
      });
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

      /*
      // if touch note play sound
      game.createEntity({
        type: 'NOTE',
        kind: 'C4', // etc, a note as formatted for Tone.js library
        color: 0xccff00,
        width: 64,
        height: 64,
        isStatic: true,
        position: {
          x: 0,
          y: -200
        }
      });
      */

      /*
       function createPianoRoll() {
        let keyCodes = game.systems['tone'].keyCodes;
          // for each key code object, create a new box entity with key code as text
        let i = 0;
        for (let tKey in keyCodes) {
          i++;
          let tKeyCode = keyCodes[tKey];
          let tEntity = game.createEntity({
            type: 'NOTE',
            kind: tKeyCode.toneCode,
            text: tKey,
            width: 64,
            height: 64,
            isStatic: true,
            position: {
              x: -300 + (i * 64),
              y: 200
            },
            //text: tKeyCode.keyName,
            //tone: tKeyCode.toneCode
          });
          console.log("tEntity", tEntity)
        }
        console.log("keyCodes", keyCodes)
        //game.use('GhostTyper');
        console.log(game.systems)
      }
        if (game.systems.tone) {
        createPianoRoll();
      } else {
        game.once('plugin::loaded::tone', function () {
          createPianoRoll();
        });
      }
      */

      /*
      game.systems.graphics.switchGraphics('BabylonGraphics', function(){
        game.use('StarField');
        game.createDefaultPlayer();
      });
      */

      game.createDefaultPlayer({
        position: {
          x: 352,
          y: 0
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
  return Home;
}();
_defineProperty(Home, "id", 'world-home');
// "world" type has special features in that it can be unloaded and reloaded.
//  with special rules such as merge, replace, etc.
//  this is currently used when switching between worlds in the GUI Editor
//  the default behavior is to unload the world, then load the new world
_defineProperty(Home, "type", 'world');
var _default = exports["default"] = Home;
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{"../sutras/warpToWorld.js":44,"./instruments/createDrumKit.js":30,"./instruments/createPiano.js":31,"./sutras.js":32}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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
        width: keyWidth,
        height: keyHeight,
        isStatic: true,
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

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sutras;
var _warpToWorld = _interopRequireDefault(require("../sutras/warpToWorld.js"));
var _switchGraphics = _interopRequireDefault(require("../sutras/switchGraphics.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// helper sutra for switching worlds

var isPressed = false;
var timerCache = {};
function sutras(game) {
  var rules = game.createSutra();
  rules.addCondition('isTile', function (entity) {
    return entity.type === 'BLOCK';
  });

  // when touching WARP entity, warp to world
  var warp = (0, _warpToWorld["default"])(game);
  rules.use(warp, 'warpToWorld');
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
    console.log('pointerUp', entity);
    isPressed = false; // Reset the pressed state when the mouse click is released
  });
  return rules;
}

},{"../sutras/switchGraphics.js":43,"../sutras/warpToWorld.js":44}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _warpToWorld = _interopRequireDefault(require("../sutras/warpToWorld.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
    key: "init",
    value: function init(game) {
      this.game = game;
      game.data.camera.mode = 'platformer';
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setGravity(0, 3.3, 0);
      game.use('Platform');
      function createPlatform(platformData) {
        game.createEntity({
          type: 'PLATFORM',
          isStatic: true,
          width: platformData.width,
          height: platformData.height,
          color: platformData.color,
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
        y: 10,
        z: -1,
        width: 850,
        height: 60
      });
      createPlatform({
        x: 925,
        y: 0,
        z: -1,
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

      var rules = game.createSutra();

      // TODO: moves to sutras.js
      var warp = (0, _warpToWorld["default"])(game);
      rules.use(warp, 'warpToWorld');
      rules.addCondition('isTile', function (entity) {
        return entity.type === 'BLOCK';
      });
      game.setSutra(rules);

      // console.log('created sutra', rules)

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
      game.createEntity({
        type: 'TEXT',
        text: 'Warp To Mantra',
        // kind: 'dynamic',
        color: 0xffffff,
        style: {
          color: '#ffffff',
          padding: '2px',
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
      game.use('Border', {
        autoBorder: true
      });
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
      game.createDefaultPlayer({
        position: {
          x: 10,
          y: -100
        }
      });
      var itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb'];
      itemsList = [];
      itemsList.forEach(function (item, index) {
        game.createEntity({
          type: item.toUpperCase(),
          kind: item,
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
  }, {
    key: "unload",
    value: function unload() {
      // reset camera mode
      game.data.camera.mode = null;
    }
  }]);
  return Platform;
}();
_defineProperty(Platform, "id", 'world-platform');
_defineProperty(Platform, "type", 'world');
var _default = exports["default"] = Platform;

},{"../sutras/warpToWorld.js":44}],34:[function(require,module,exports){
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
        W: 'MOVE_FORWARD',
        S: 'MOVE_BACKWARD'
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _demon = _interopRequireDefault(require("../../mantra-sutras/demon.js"));
var _hexapod = _interopRequireDefault(require("../../mantra-sutras/hexapod.js"));
var _note = _interopRequireDefault(require("../../mantra-sutras/note.js"));
var _fire = _interopRequireDefault(require("../../mantra-sutras/fire.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var agama = {
  demon: _demon["default"],
  hexapod: _hexapod["default"],
  note: _note["default"],
  fire: _fire["default"]
};
var Sutra = /*#__PURE__*/function () {
  // type is optional for Plugins
  function Sutra(game) {
    _classCallCheck(this, Sutra);
    this.game = game; // Store the reference to the game logic
    this.id = Sutra.id;
    this.type = Sutra.type;
  }
  _createClass(Sutra, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // alert('hi')
      this.createWorld();
    }
  }, {
    key: "createWorld",
    value: function createWorld() {
      var game = this.game;
      game.setGravity(0, 0, 0);

      // TODO: set default zoom to 0.3 ( zoomed out )
      game.zoom(0.3);
      game.use('Bullet');
      //    game.use('Timers');
      game.use('Tone');
      game.use('Health');
      console.log('hexapod', _hexapod["default"]);
      /*
      // game.use(new Plugins.SutraGUI({ }));
      game.use('Editor', {
        sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-client/public/examples/offline/sutra-level-editor.html',
        sutraEditor: true
      });
      */

      game.use('Block', {
        MIN_BLOCK_SIZE: 1000
      });
      game.use('Border', {
        autoBorder: true,
        thickness: 200
      });
      game.setSutra((0, _hexapod["default"])(game));
      game.data.roundEnded = false;
      game.data.roundStarted = true;
      game.createDefaultPlayer();
      function writeSutraLabel(sutraName) {
        // text label for Sutra name
        game.createEntity({
          type: 'TEXT',
          body: false,
          text: sutraName,
          position: {
            x: 0,
            y: 0
          },
          style: {
            fontSize: 30,
            color: '#ffffff'
          }
        });
      }
      writeSutraLabel('hexapod');

      // set interval to iterate through agama
      setInterval(function () {
        var agamaKeys = Object.keys(agama);
        var agamaIndex = Math.floor(Math.random() * agamaKeys.length);
        var agamaKey = agamaKeys[agamaIndex];
        var agamaSutra = agama[agamaKey];
        game.removeAllEntities();
        writeSutraLabel(agamaKey);
        game.setSutra(agamaSutra(game));
      }, 2000);
      /*
      game.systems.graphics.switchGraphics('BabylonGraphics', function(){
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
  }]);
  return Sutra;
}();
_defineProperty(Sutra, "id", 'world-sutra');
_defineProperty(Sutra, "type", 'world');
var _default = exports["default"] = Sutra;

},{"../../mantra-sutras/demon.js":21,"../../mantra-sutras/fire.js":22,"../../mantra-sutras/hexapod.js":23,"../../mantra-sutras/note.js":24}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _contraptionsExample = _interopRequireDefault(require("./contraptions-example.js"));
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
      game.setGravity(0, 0, 0);
      game.use('Bullet');
      game.use('Block');
      game.use('YCraft', {
        contraption: _contraptionsExample["default"]
      });
      game.use('YCraftGUI');

      // create warp by back home entity
      game.createEntity({
        type: 'WARP',
        kind: 'Home',
        // color: 0x00ff00,
        width: 64,
        texture: 'warp-to-home',
        isStatic: true,
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
      var rules = game.createSutra();

      // TODO: use common warp sutra
      rules.addCondition('playerTouchedWarpZone', function (entity, gameState) {
        if (entity.type === 'COLLISION') {
          console.log('entity', entity);
          if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'WARP') {
            return true;
          }
          if (entity.bodyA.type === 'WARP' && entity.bodyB.type === 'PLAYER') {
            return true;
          }
        }
      });
      rules["if"]('playerTouchedWarpZone').then('switchWorld');

      // TODO: make this common Sutra
      rules.on('switchWorld', function (entity) {
        console.log('entityentity', entity);
        var worldName = entity.WARP.kind || 'Home';
        game.switchWorlds(worldName);
      });
      game.setSutra(rules);

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

      // Remark: Players removed for initial demo, is working
      game.createDefaultPlayer({
        position: {
          x: 75,
          y: 75,
          z: 0
        }
      });

      /* Not needed anymore?
      game.systems.graphics.switchGraphics('CSSGraphics', function(){});
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
      console.log('YCraft.unload()');
    }
  }]);
  return YCraft;
}();
_defineProperty(YCraft, "id", 'world-ycraft');
_defineProperty(YCraft, "type", 'world');
var _default = exports["default"] = YCraft;

},{"./contraptions-example.js":39}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createColorPuzzle;
var _index = require("../../../YCraft.js/index.js");
// import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from 'ycraft';

function createColorPuzzle() {
  var exampleA = new _index.YCraft(0, 0, 0, {
    description: "Simple Light",
    height: 100,
    width: 125
  });

  // Updated positions
  var button0 = new _index.Button(25, 15, 0);
  var latch0 = new _index.Latch(25, 65, 0);
  var light0 = new _index.LEDLight(75, 15, 200, {
    wattage: 60,
    height: 250,
    width: 250
  });
  button0.connect(light0);
  latch0.connect(light0);
  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);
  var exampleB = new _index.YCraft(0, 140, 0, {
    description: "Wired Light",
    height: 120,
    width: 200
  });
  var wire1 = new _index.Wire();
  var wire2 = new _index.Wire();
  var button1 = new _index.Button(25, 25, 0); // moved from (0, 0)
  var latch1 = new _index.Latch(25, 75, 0); // moved from (0, 37.5)
  var relay1 = new _index.Relay(75, 50, 0); // moved from (37.5, 18.75)
  var light1 = new _index.LEDLight(125, 50, 100, {
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
  var examples = new _index.YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);
  return examples;
}

},{"../../../YCraft.js/index.js":1}],40:[function(require,module,exports){
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

},{"./index.js":41}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Home = _interopRequireDefault(require("./Home/Home.js"));
var _Music = _interopRequireDefault(require("./Music/Music.js"));
var _Platform = _interopRequireDefault(require("./Platform/Platform.js"));
var _Pong = _interopRequireDefault(require("./Pong/Pong.js"));
var _Space = _interopRequireDefault(require("./Space/Space.js"));
var _Sutra = _interopRequireDefault(require("./Sutra/Sutra.js"));
var _XState = _interopRequireDefault(require("./XState/XState.js"));
var _YCraft = _interopRequireDefault(require("./YCraft/YCraft.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var worlds = {};
worlds.Home = _Home["default"];
worlds.Music = _Music["default"];
worlds.Platform = _Platform["default"];
worlds.Pong = _Pong["default"];
worlds.Space = _Space["default"];
worlds.Sutra = _Sutra["default"];
worlds.XState = _XState["default"];
worlds.YCraft = _YCraft["default"];
var _default = exports["default"] = worlds;

},{"./Home/Home.js":25,"./Music/Music.js":29,"./Platform/Platform.js":33,"./Pong/Pong.js":34,"./Space/Space.js":35,"./Sutra/Sutra.js":36,"./XState/XState.js":37,"./YCraft/YCraft.js":38}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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
  rules.addCondition('playerTouchedBabylonGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'ACTIVE' && entity.TEXT.name === 'BabylonGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules.addCondition('playerStoppedTouchedBabylonGraphics', function (entity, gameState) {
    if (entity.type === 'COLLISION' && entity.kind === 'END' && entity.TEXT.name === 'BabylonGraphics') {
      if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'TEXT') {
        return true;
      }
      if (entity.bodyB.type === 'TEXT' && entity.bodyA.type === 'PLAYER') {
        return true;
      }
    }
  });
  rules["if"]('playerTouchedBabylonGraphics').then('switchGraphics');
  rules["if"]('playerStoppedTouchedBabylonGraphics').then('hideLoader');
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
        loadingCircle.tick(1 / gameState.FPS * 1000);
      }
    }
  });
  return rules;
}

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = warpToWorld;
function warpToWorld(game) {
  var rules = game.createSutra();
  game.on('pointerMove', function (entity) {
    if (entity.type === 'WARP') {
      console.log('pointerMove WARP', entity);
    }
  });
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

},{}]},{},[40])(40)
});

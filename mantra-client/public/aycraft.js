(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.RS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "AyCraft", {
  enumerable: true,
  get: function get() {
    return _AyCraft["default"];
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
Object.defineProperty(exports, "Wire", {
  enumerable: true,
  get: function get() {
    return _Wire["default"];
  }
});
Object.defineProperty(exports, "allExamples", {
  enumerable: true,
  get: function get() {
    return _allExamplesComposite["default"];
  }
});
exports.createContraption = createContraption;
var _AyCraft = _interopRequireDefault(require("./lib/AyCraft.js"));
var _ElectricalSignal = _interopRequireDefault(require("./lib/signals/ElectricalSignal.js"));
var _Actuator = _interopRequireDefault(require("./lib/parts/Actuator.js"));
var _Amplifier = _interopRequireDefault(require("./lib/parts/Amplifier.js"));
var _Button = _interopRequireDefault(require("./lib/parts/Button.js"));
var _LaserSensor = _interopRequireDefault(require("./lib/parts/LaserSensor.js"));
var _Latch = _interopRequireDefault(require("./lib/parts/Latch.js"));
var _LEDLight = _interopRequireDefault(require("./lib/parts/LEDLight.js"));
var _Mirror = _interopRequireDefault(require("./lib/parts/Mirror.js"));
var _MotionDetector = _interopRequireDefault(require("./lib/parts/MotionDetector.js"));
var _PressureSensor = _interopRequireDefault(require("./lib/parts/PressureSensor.js"));
var _Relay = _interopRequireDefault(require("./lib/parts/Relay.js"));
var _Rover = _interopRequireDefault(require("./lib/parts/Rover.js"));
var _Wire = _interopRequireDefault(require("./lib/parts/Wire.js"));
var _allExamplesComposite = _interopRequireDefault(require("./examples/WIP/all-examples-composite.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function createContraption() {
  return new _AyCraft["default"]();
}

},{"./examples/WIP/all-examples-composite.js":2,"./lib/AyCraft.js":4,"./lib/parts/Actuator.js":6,"./lib/parts/Amplifier.js":7,"./lib/parts/Button.js":8,"./lib/parts/LEDLight.js":9,"./lib/parts/LaserSensor.js":10,"./lib/parts/Latch.js":11,"./lib/parts/Mirror.js":12,"./lib/parts/MotionDetector.js":13,"./lib/parts/PressureSensor.js":14,"./lib/parts/Relay.js":15,"./lib/parts/Rover.js":16,"./lib/parts/Wire.js":17,"./lib/signals/ElectricalSignal.js":18}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = require("../../index.js");
/*

import buttonActuatorLight from '../button-actuator-light.js';
import buttonAmplifierWireLight from '../button-amplifier-wire-light.js';
import buttonLight from '../button-light.js';
import buttonRelayLight from '../button-relay-light.js';
import buttonWireLight from '../button-wire-light.js';
import latchLight from '../latch-light.js';
import pressureSensorWireLight from '../pressure-sensor-wire-light.js';
import roverLight from '../rover-light.js';
import securitySystem from '../security-system.js';
import signalButtonBreakLight from './WIP/signal-button-break-light.js/index.js';

*/
function multipleContraptions() {
  var bigDevice = new _index.AyCraft(0, 0, 0, {
    width: 1000,
    height: 1000,
    depth: 1000
  });

  /*
   // Add each contraption with hard-coded positions and increased spacing
  bigDevice.addContraption(buttonLight(-300, 0, 0));
  bigDevice.addContraption(buttonRelayLight(300, 0, 0));
  bigDevice.addContraption(buttonWireLight(-300, 300, 0));
  bigDevice.addContraption(latchLight(300, 300, 0));
  bigDevice.addContraption(roverLight(-300, 600, 0));
  bigDevice.addContraption(securitySystem(300, 600, 0));
  
  bigDevice.addContraption(signalButtonBreakLight(-300, 600, 0));
  bigDevice.addContraption(buttonActuatorLight(300, 600, 0));
  bigDevice.addContraption(buttonAmplifierWireLight(-300, 2400, 0));
  bigDevice.addContraption(pressureSensorWireLight(300, 2400, 0));
   */

  return bigDevice;
}
var _default = exports["default"] = multipleContraptions; // Run the contraption
multipleContraptions().start();

},{"../../index.js":3}],3:[function(require,module,exports){
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
Object.defineProperty(exports, "AyCraft", {
  enumerable: true,
  get: function get() {
    return _AyCraft["default"];
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
Object.defineProperty(exports, "Wire", {
  enumerable: true,
  get: function get() {
    return _Wire["default"];
  }
});
var _AyCraft = _interopRequireDefault(require("./lib/AyCraft.js"));
var _ElectricalSignal = _interopRequireDefault(require("./lib/signals/ElectricalSignal.js"));
var _Actuator = _interopRequireDefault(require("./lib/parts/Actuator.js"));
var _Amplifier = _interopRequireDefault(require("./lib/parts/Amplifier.js"));
var _Button = _interopRequireDefault(require("./lib/parts/Button.js"));
var _LaserSensor = _interopRequireDefault(require("./lib/parts/LaserSensor.js"));
var _Latch = _interopRequireDefault(require("./lib/parts/Latch.js"));
var _LEDLight = _interopRequireDefault(require("./lib/parts/LEDLight.js"));
var _Mirror = _interopRequireDefault(require("./lib/parts/Mirror.js"));
var _MotionDetector = _interopRequireDefault(require("./lib/parts/MotionDetector.js"));
var _PressureSensor = _interopRequireDefault(require("./lib/parts/PressureSensor.js"));
var _Relay = _interopRequireDefault(require("./lib/parts/Relay.js"));
var _Rover = _interopRequireDefault(require("./lib/parts/Rover.js"));
var _Wire = _interopRequireDefault(require("./lib/parts/Wire.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./lib/AyCraft.js":4,"./lib/parts/Actuator.js":6,"./lib/parts/Amplifier.js":7,"./lib/parts/Button.js":8,"./lib/parts/LEDLight.js":9,"./lib/parts/LaserSensor.js":10,"./lib/parts/Latch.js":11,"./lib/parts/Mirror.js":12,"./lib/parts/MotionDetector.js":13,"./lib/parts/PressureSensor.js":14,"./lib/parts/Relay.js":15,"./lib/parts/Rover.js":16,"./lib/parts/Wire.js":17,"./lib/signals/ElectricalSignal.js":18}],4:[function(require,module,exports){
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
var AyCraft = /*#__PURE__*/function (_EventEmitter) {
  _inherits(AyCraft, _EventEmitter);
  var _super = _createSuper(AyCraft);
  function AyCraft() {
    var _this;
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$powerRequired = _ref.powerRequired,
      powerRequired = _ref$powerRequired === void 0 ? false : _ref$powerRequired;
    _classCallCheck(this, AyCraft);
    _this = _super.call(this);

    // Local x-coordinate in global space
    _this.position = {
      x: x,
      y: y,
      z: z
    };
    _this.powerRequired = powerRequired;

    // parts of the contraption, added via addPart() method
    _this.parts = [];

    // sub-contraptions of the contraption, added via addContraption() method
    _this.contraptions = [];
    return _this;
  }

  // top-level on method for the contraption
  _createClass(AyCraft, [{
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

      // Add the contraption to the AyCraft's contraptions array
      this.contraptions.push(contraption);

      // Forward events from the contraption to the AyCraft instance
      contraption.onAny(function (eventName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this2.emit.apply(_this2, [eventName].concat(args));
      });

      // Set the AyCraft context for the contraption
      if (typeof contraption.setAyCraft === 'function') {
        contraption.setAyCraft(this);
      }
    }
  }, {
    key: "addPart",
    value: function addPart(part) {
      var _this3 = this;
      // Adjust part's position relative to the AyCraft's local coordinates
      part.position.x += this.position.x;
      part.position.y += this.position.y;
      part.position.z += this.position.z;
      this.parts.push(part);
      if (part instanceof _EventEmitter2["default"]) {
        part.onAny(function (eventName) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          // Forward the part's events to the AyCraft instance
          _this3.emit.apply(_this3, [eventName].concat(args));
        });
        if (typeof part.setAyCraft === 'function') {
          part.setAyCraft(this);
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
      // Check if the target component belongs to another AyCraft instance
      if (targetComponent instanceof AyCraftComponent && this.ayCraft !== targetComponent.ayCraft) {
        // Implement logic to handle inter-contraption connections
        // This could involve using a global event emitter or a direct reference
      } else {
        // Regular connection logic for components within the same AyCraft instance
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
      // Update AyCraft's local coordinates
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
  return AyCraft;
}(_EventEmitter2["default"]);
var _default = exports["default"] = AyCraft;

},{"./utils/EventEmitter.js":19}],5:[function(require,module,exports){
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
      width: 64,
      height: 64,
      depth: 64
    }; // Fixed size for each part
    _this.props = {}; // Properties specific to each part
    return _this;
  }
  _createClass(Part, [{
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
    }

    // Additional methods or properties common to all parts can be added here
  }]);
  return Part;
}(_EventEmitter2["default"]);
// for now, could also be a base Part class
_defineProperty(Part, "idCounter", 0);

},{"./utils/EventEmitter.js":19}],6:[function(require,module,exports){
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

},{"../Part.js":5}],7:[function(require,module,exports){
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
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],8:[function(require,module,exports){
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
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],9:[function(require,module,exports){
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
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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
        if (!this.ayCraft.powerRequired || power >= this.props.wattage) {
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

},{"../Part.js":5}],10:[function(require,module,exports){
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

},{"../signals/ElectricalSignal.js":18,"../utils/EventEmitter.js":19}],11:[function(require,module,exports){
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
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],12:[function(require,module,exports){
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

},{"../utils/EventEmitter.js":19}],13:[function(require,module,exports){
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],14:[function(require,module,exports){
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],15:[function(require,module,exports){
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
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],16:[function(require,module,exports){
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

  // Method to set AyCraft reference
  _createClass(Rover, [{
    key: "setAyCraft",
    value: function setAyCraft(ayCraft) {
      this.ayCraft = ayCraft;
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

},{"../Part.js":5}],17:[function(require,module,exports){
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

},{"../Part.js":5,"../signals/ElectricalSignal.js":18}],18:[function(require,module,exports){
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

},{}]},{},[1])(1)
});

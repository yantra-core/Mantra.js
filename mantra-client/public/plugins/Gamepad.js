(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Gamepad = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BitdoNES30Pro = _interopRequireDefault(require("./gamepads/8BitdoNES30Pro.js"));
var _Playstation = _interopRequireDefault(require("./gamepads/Playstation3.js"));
var _LogitechDualAction = _interopRequireDefault(require("./gamepads/LogitechDualAction.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var axesAssociation = {
  'DPAD_HORIZONTAL': ['DPAD_LEFT', 'DPAD_RIGHT'],
  'DPAD_VERTICAL': ['DPAD_UP', 'DPAD_DOWN'],
  'LEFT_STICK_HORIZONTAL': ['LEFT_STICK_LEFT', 'LEFT_STICK_RIGHT'],
  'LEFT_STICK_VERTICAL': ['LEFT_STICK_UP', 'LEFT_STICK_DOWN'],
  'RIGHT_STICK_HORIZONTAL': ['RIGHT_STICK_LEFT', 'RIGHT_STICK_RIGHT'],
  'RIGHT_STICK_VERTICAL': ['RIGHT_STICK_UP', 'RIGHT_STICK_DOWN']
};
var Gamepad = exports["default"] = /*#__PURE__*/function () {
  function Gamepad() {
    _classCallCheck(this, Gamepad);
    this.id = Gamepad.id;
    this.gamepads = {};
    this.configs = {
      // prestuff the cache so no lookups happen to known controllers
      '8Bitdo NES30 Pro (Vendor: 2dc8 Product: 3820)': _BitdoNES30Pro["default"],
      'Logitech Logitech Dual Action': _LogitechDualAction["default"],
      'Sony PLAYSTATION(R)3 Controller': _Playstation["default"]
    };
    this.hashes = {};
    this.controls = {
      'DPAD_UP': false,
      // Up
      'DPAD_DOWN': false,
      // Down
      'DPAD_LEFT': false,
      // Left
      'DPAD_RIGHT': false,
      // Right
      'LEFT_STICK_UP': false,
      // Up
      'LEFT_STICK_DOWN': false,
      // Down
      'LEFT_STICK_LEFT': false,
      // Left
      'LEFT_STICK_RIGHT': false,
      // Right
      'RIGHT_STICK_UP': false,
      // Up
      'RIGHT_STICK_DOWN': false,
      // Down
      'RIGHT_STICK_LEFT': false,
      // Left
      'RIGHT_STICK_RIGHT': false,
      // Right
      // y button
      'BUTTON_Y': false,
      // "Y" button
      // x button
      'BUTTON_X': false,
      // "X" button
      // b button
      'BUTTON_B': false,
      // "B" button
      // a button
      'BUTTON_A': false,
      // "A" button
      // start button
      'BUTTON_START': false,
      // "Start" button
      // select button
      'BUTTON_SELECT': false,
      // "Select" button
      // left shoulder button
      'BUTTON_L1': false,
      // "L1" button
      // right shoulder button
      'BUTTON_R1': false,
      // "R1" button
      // left trigger button
      'BUTTON_L2': false,
      // "L2" button
      // right trigger button
      'BUTTON_R2': false,
      // "R2" button
      // left stick button
      'BUTTON_L3': false,
      // "L3" button
      // right stick button
      'BUTTON_R3': false,
      // "R3" button
      'BUTTON_STICK_L': false,
      // "L3" button
      // right stick button
      'BUTTON_STICK_R': false // "R3" button
    };

    this.lastControlsAllFalse = true;
  }
  _createClass(Gamepad, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.id = Gamepad.id;
      game.systemsManager.addSystem('gamepad', this);
      if (!this.game.isServer) {
        window.addEventListener("gamepadconnected", function (event) {
          return _this.connectHandler(event);
        });
        window.addEventListener("gamepaddisconnected", function (event) {
          return _this.disconnectHandler(event);
        });
      }
    }
  }, {
    key: "connectHandler",
    value: function connectHandler(event) {
      console.log("Gamepad connected at index ".concat(event.gamepad.index, ": ").concat(event.gamepad.id, ". ").concat(event.gamepad.buttons.length, " buttons, ").concat(event.gamepad.axes.length, " axes."));
      this.gamepads[event.gamepad.index] = event.gamepad;
    }
  }, {
    key: "disconnectHandler",
    value: function disconnectHandler(event) {
      console.log("Gamepad disconnected from index ".concat(event.gamepad.index, ": ").concat(event.gamepad.id));
      delete this.gamepads[event.gamepad.index];
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.game.isServer) {
        this.pollGamepads();
        this.sendInputs();
      }
    }
  }, {
    key: "pollGamepads",
    value: function pollGamepads() {
      // Get the array of gamepads
      var detectedGamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      for (var i = 0; i < detectedGamepads.length; i++) {
        if (detectedGamepads[i]) {
          // Update the gamepad state
          this.gamepads[i] = detectedGamepads[i];
        }
      }
    }
  }, {
    key: "controllerConfig",
    value: function controllerConfig(hash) {
      var config = _typeof(this.configs[hash]) === 'object' ? this.configs[hash] : Gamepad.defaultControllerConfig;
      return config;
    }
  }, {
    key: "sendInputs",
    value: function sendInputs() {
      var _this2 = this;
      var _loop = function _loop() {
        // Cheezy hack to ignore VirtualHID driver
        // (a side effect of older controllers in OS X)
        if (_this2.gamepads[index].id.indexOf('Virtual') !== -1) return 1; // continue
        var config = _this2.controllerConfig(_this2.gamepads[index].id);
        var gamepad = _this2.gamepads[index];

        // Deadzone for analog stick to prevent drift
        var deadzone = 0.1;
        Object.keys(config.buttons).forEach(function (key) {
          _this2.controls[key] = gamepad.buttons[config.buttons[key]].pressed;
        });
        Object.keys(config.axes).forEach(function (key) {
          var booleanStates = axesAssociation[key];
          var value = gamepad.axes[config.axes[key]];
          _this2.controls[booleanStates[0]] = value < -deadzone;
          _this2.controls[booleanStates[1]] = value > deadzone;
        });
        var controls = _this2.controls;
        if (_this2.game.communicationClient) {
          _this2.game.communicationClient.sendMessage('player_input', {
            controls: controls
          });
        }
      };
      for (var index in this.gamepads) {
        if (_loop()) continue;
      }
    }
  }]);
  return Gamepad;
}();
_defineProperty(Gamepad, "id", 'gamepad');
_defineProperty(Gamepad, "defaultControllerConfig", {
  buttons: {
    'BUTTON_A': 0,
    'BUTTON_B': 2,
    'BUTTON_X': 3,
    'BUTTON_Y': 1,
    'BUTTON_L1': 4,
    'BUTTON_R1': 5,
    'BUTTON_L2': 6,
    'BUTTON_R2': 7,
    // L3 & R3 aren't fixed 
    // (sticks, touch pads, and other)
    //'BUTTON_L3':8 : 'l2',
    //'BUTTON_R3':9 : 'r2',
    'BUTTON_SELECT': 8,
    'BUTTON_START': 9,
    'BUTTON_STICK_L': 10,
    'BUTTON_STICK_R': 11
  },
  axes: {
    'DPAD_HORIZONTAL': 0,
    'DPAD_VERTICAL': 1,
    'LEFT_STICK_HORIZONTAL': 2,
    'LEFT_STICK_VERTICAL': 3,
    'RIGHT_STICK_HORIZONTAL': 4,
    'RIGHT_STICK_VERTICAL': 5
  }
});

},{"./gamepads/8BitdoNES30Pro.js":2,"./gamepads/LogitechDualAction.js":3,"./gamepads/Playstation3.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.controllerConfig = void 0;
// 8Bitdo NES30 Pro (Vendor: 2dc8 Product: 3820)
// OEJpdGRvIE5FUzMwIFBybyAoVmVuZG9yOiAyZGM4IFByb2R1Y3Q6IDM4MjAp
var controllerConfig = exports.controllerConfig = {
  buttons: {
    'BUTTON_A': 0,
    'BUTTON_B': 1,
    'BUTTON_X': 3,
    'BUTTON_Y': 4,
    'BUTTON_L1': 6,
    'BUTTON_R1': 7,
    'BUTTON_L2': 8,
    'BUTTON_R2': 9,
    'BUTTON_SELECT': 10,
    'BUTTON_START': 11,
    'BUTTON_STICK_L': 13,
    'BUTTON_STICK_R': 14
  },
  axes: {
    'LEFT_STICK_HORIZONTAL': 0,
    'LEFT_STICK_VERTICAL': 1,
    'RIGHT_STICK_HORIZONTAL': 2,
    'RIGHT_STICK_VERTICAL': 5,
    //the DPAD on 8bitdo NES30 is mismapped, couple to the analog sticks
    'DPAD_HORIZONTAL': 0,
    //4,
    'DPAD_VERTICAL': 1 //9,
  }
};
var _default = exports["default"] = controllerConfig;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.controllerConfig = void 0;
// Logitech Logitech Dual Action
// TG9naXRlY2ggTG9naXRlY2ggRHVhbCBBY3Rpb24
var controllerConfig = exports.controllerConfig = {
  buttons: {
    'BUTTON_A': 1,
    'BUTTON_B': 0,
    'BUTTON_X': 3,
    'BUTTON_Y': 2,
    'BUTTON_L1': 4,
    'BUTTON_R1': 5,
    'BUTTON_L2': 6,
    'BUTTON_R2': 7,
    'BUTTON_SELECT': 8,
    'BUTTON_START': 9,
    'BUTTON_STICK_L': 10,
    'BUTTON_STICK_R': 11,
    'DPAD_UP': 12,
    'DPAD_DOWN': 13,
    'DPAD_LEFT': 14,
    'DPAD_RIGHT': 15
  },
  axes: {
    'LEFT_STICK_HORIZONTAL': 0,
    'LEFT_STICK_VERTICAL': 1,
    'RIGHT_STICK_HORIZONTAL': 2,
    'RIGHT_STICK_VERTICAL': 3
  }
};
var _default = exports["default"] = controllerConfig;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.controllerConfig = void 0;
// Sony PLAYSTATION(R)3 Controller
// U29ueSBQTEFZU1RBVElPTihSKTMgQ29udHJvbGxlcg
var controllerConfig = exports.controllerConfig = {
  buttons: {
    'BUTTON_A': 1,
    'BUTTON_B': 0,
    'BUTTON_X': 3,
    'BUTTON_Y': 2,
    'BUTTON_L1': 4,
    'BUTTON_R1': 5,
    'BUTTON_L2': 6,
    'BUTTON_R2': 7,
    'BUTTON_SELECT': 8,
    'BUTTON_START': 9,
    'BUTTON_STICK_L': 10,
    'BUTTON_STICK_R': 11,
    'DPAD_UP': 12,
    'DPAD_DOWN': 13,
    'DPAD_LEFT': 14,
    'DPAD_RIGHT': 15,
    'HOME': 16
  },
  axes: {
    'LEFT_STICK_HORIZONTAL': 0,
    'LEFT_STICK_VERTICAL': 1,
    'RIGHT_STICK_HORIZONTAL': 2,
    'RIGHT_STICK_VERTICAL': 3
  }
};
var _default = exports["default"] = controllerConfig;

},{}]},{},[1])(1)
});

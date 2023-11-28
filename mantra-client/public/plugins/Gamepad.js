(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Gamepad = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var Gamepad = exports["default"] = /*#__PURE__*/function () {
  function Gamepad() {
    _classCallCheck(this, Gamepad);
    this.id = Gamepad.id;
    this.gamepads = {};
  }
  _createClass(Gamepad, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.id = Gamepad.id;
      game.systemsManager.addSystem('gamepad', this);
      window.addEventListener("gamepadconnected", function (event) {
        return _this.connectHandler(event);
      });
      window.addEventListener("gamepaddisconnected", function (event) {
        return _this.disconnectHandler(event);
      });
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
      this.pollGamepads();
      this.sendInputs();
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
    key: "sendInputs",
    value: function sendInputs() {
      for (var index in this.gamepads) {
        var gamepad = this.gamepads[index];

        // Axes for left analog stick
        var xAxis = gamepad.axes[0]; // Left (-1) to Right (1)
        var yAxis = gamepad.axes[1]; // Up (-1) to Down (1)

        // Deadzone for analog stick to prevent drift
        var deadzone = 0.1;

        // Map left stick to WASD keys
        // TODO: move this code to part of the entityInput strategy
        var controls = {
          W: yAxis < -deadzone,
          // Up
          S: yAxis > deadzone,
          // Down
          A: xAxis < -deadzone,
          // Left
          D: xAxis > deadzone,
          // Right
          SPACE: gamepad.buttons[2].pressed // "X" button for Spacebar (fire)
        };

        console.log('controls', controls);
        // Send the controls to the game logic or server
        if (this.game.communicationClient) {
          this.game.communicationClient.sendMessage('player_input', {
            controls: controls
          });
        }
      }
    }
  }]);
  return Gamepad;
}();
_defineProperty(Gamepad, "id", 'gamepad');

},{}]},{},[1])(1)
});

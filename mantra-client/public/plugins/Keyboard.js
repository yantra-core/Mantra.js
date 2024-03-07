(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Keyboard = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Keyboard.js - Marak Squires 2023

// All key codes available to browser
var KEY_CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Escape' /*, 'PrintScreen', 'ScrollLock', 'Pause', 'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', */];

// Filter any keys that users might not want browser to capture
KEY_CODES = KEY_CODES.filter(function (code) {
  return !['KeyR', 'Tab', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'ContextMenu'].includes(code);
});
// KeyR is just for dev to help with refresh page shortcut, we can remove it later

// Transforms the DOM key codes to the key codes used by Mantra
// KeyA -> A, Digit1 -> 1, ArrowLeft -> LEFT, etc
function transformKeyCode(keyCode) {
  return keyCode.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Arrow/, '').toUpperCase();
}
var MANTRA_KEY_MAP = Object.fromEntries(KEY_CODES.map(function (code) {
  return [code, transformKeyCode(code)];
}));

// create a new object hash containing the Mantra Key Codes as keys
var KEY_MAP = Object.fromEntries(KEY_CODES.map(function (code) {
  return [code, code];
}));

/*
Keyboard config object
{
  preventDefaults: true // boolean, default true, set false to gain control of browser keys again
}
*/
var Keyboard = exports["default"] = /*#__PURE__*/function () {
  function Keyboard() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$preventDefaults = _ref.preventDefaults,
      preventDefaults = _ref$preventDefaults === void 0 ? true : _ref$preventDefaults;
    _classCallCheck(this, Keyboard);
    this.id = Keyboard.id;
    this.controls = Object.fromEntries(Object.values(MANTRA_KEY_MAP).map(function (key) {
      return [key, false];
    }));
    // this.communicationClient = communicationClient;
    this.inputPool = {}; // Pool to store key inputs since the last game tick
    this.preventDefaults = preventDefaults;
    this.keyStates = {}; // Object to store the state of each key

    // Bind methods and store them as class properties
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    this.boundHandleWindowBlur = this.handleWindowBlur.bind(this); // Bind the window blur event handler
  }
  _createClass(Keyboard, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      if (!this.game.isServer) {
        this.bindInputControls();
      }
      this.name = 'keyboard';

      // register the Plugin as a system, on each update() we will send the inputPool to the server
      game.systemsManager.addSystem('keyboard', this);
    }
  }, {
    key: "bindInputControls",
    value: function bindInputControls() {
      document.addEventListener('keydown', this.boundHandleKeyDown);
      document.addEventListener('keyup', this.boundHandleKeyUp);
      window.addEventListener('blur', this.boundHandleWindowBlur); // Listen for window blur event
    }
  }, {
    key: "update",
    value: function update() {
      this.sendInputs();

      // Reset key down and up states
      // Remark: is this a race condition here with cross plugin reference from Sutra.js? to this.keyStates?
      /*
      for (let key in this.keyStates) {
        if (this.keyStates[key].down) {
          this.keyStates[key].down = false;
        }
        if (this.keyStates[key].up) {
          this.keyStates[key].up = false;
        }
      }
      */
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (MANTRA_KEY_MAP[event.code]) {
        if (event.repeat) {
          this.keyStates[MANTRA_KEY_MAP[event.code]] = {
            down: false,
            up: false,
            pressed: true
          };
          this.inputPool[MANTRA_KEY_MAP[event.code]] = false;
        } else {
          this.keyStates[MANTRA_KEY_MAP[event.code]] = {
            down: true,
            up: false,
            pressed: true
          };
          this.inputPool[MANTRA_KEY_MAP[event.code]] = true;
        }
        if (this.preventDefaults === true) {
          event.preventDefault();
        }
      }
      this.game.emit('keydown', event, MANTRA_KEY_MAP[event.code]);

      // create a new object for clean reference
      var obj = {};
      for (var key in this.inputPool) {
        obj[key] = this.inputPool[key];
      }

      // Remark: Optionally emit this event for user-space to listen to
      //         In most cases, user-space will listen to sutra emitters per key stroke
      //         Or the keyDown event above
      if (this.game.config.emitKeyboardInputsEvents) {
        this.game.emit('keyboard::handleInputs', {
          controls: obj
        });
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (MANTRA_KEY_MAP[event.code]) {
        this.keyStates[MANTRA_KEY_MAP[event.code]] = {
          down: false,
          up: true,
          pressed: false
        };
        this.inputPool[MANTRA_KEY_MAP[event.code]] = false;
      }
      this.game.emit('keyup', event, MANTRA_KEY_MAP[event.code]);

      // create a new object for clean reference
      var obj = {};
      for (var key in this.inputPool) {
        obj[key] = this.inputPool[key];
      }
      if (this.game.config.emitKeyboardInputsEvents) {
        this.game.emit('keyboard::handleInputs', {
          controls: obj
        });
      }
    }
  }, {
    key: "handleWindowBlur",
    value: function handleWindowBlur() {
      var _this = this;
      // On window blur we must clear all key inputs, as we may have keydown events
      // that will never recieve a keyup event ( since the window is not focused )

      // Iterate over the controls object and set each key's value to false
      Object.keys(this.controls).forEach(function (key) {
        _this.controls[key] = false;
      });
      // Reset the input pool and key states
      this.inputPool = {};
      this.keyStates = {};
    }
  }, {
    key: "sendInputs",
    value: function sendInputs() {
      var trueInputs = this.inputPool;

      // Remark: Removed 12/28/23 in order to allow final "false" event on keyup
      // Should be OK to remove
      // Filter the inputPool to only include keys with true values
      /*
        const trueInputs = Object.fromEntries(
          Object.entries(this.inputPool).filter(([key, value]) => value === true)
        );
      */
      //console.log('trueInputs', trueInputs)
      // Send trueInputs if there are any
      if (Object.keys(trueInputs).length > 0) {
        if (this.game.communicationClient) {
          this.game.communicationClient.sendMessage('player_input', {
            controls: trueInputs
          });
        }

        /*
        // create a new object for clean reference
        let obj = {};
        for (let key in trueInputs) {
          obj[key] = trueInputs[key];
        }
        this.game.emit('keyboard::handleInputs', { controls: obj });
        */
      }

      // Reset only the false values in the inputPool
      for (var key in this.inputPool) {
        if (!this.inputPool[key]) {
          delete this.inputPool[key];
        }
      }
    }
  }, {
    key: "unbindAllEvents",
    value: function unbindAllEvents() {
      // remove all event listeners using the bound functions
      document.removeEventListener('keydown', this.boundHandleKeyDown);
      document.removeEventListener('keyup', this.boundHandleKeyUp);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.unbindAllEvents();
    }
  }]);
  return Keyboard;
}();
_defineProperty(Keyboard, "id", 'keyboard');

},{}]},{},[1])(1)
});

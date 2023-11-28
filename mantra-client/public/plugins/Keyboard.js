(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Keyboard = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Keyboard.js - Marak Squires 2023

// All key codes available to browser
var KEY_CODES = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

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

    // Bind methods and store them as class properties
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
  }
  _createClass(Keyboard, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.bindInputControls();
      this.name = 'keyboard';

      // register the Plugin as a system, on each update() we will send the inputPool to the server
      game.systemsManager.addSystem('keyboard', this);
    }
  }, {
    key: "bindInputControls",
    value: function bindInputControls() {
      document.addEventListener('keydown', this.boundHandleKeyDown);
      document.addEventListener('keyup', this.boundHandleKeyUp);
    }
  }, {
    key: "update",
    value: function update() {
      this.sendInputs();
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (MANTRA_KEY_MAP[event.code]) {
        this.inputPool[MANTRA_KEY_MAP[event.code]] = true;
        if (this.preventDefaults === true) {
          event.preventDefault();
        }
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (MANTRA_KEY_MAP[event.code]) {
        this.inputPool[MANTRA_KEY_MAP[event.code]] = false;
      }
    }
  }, {
    key: "sendInputs",
    value: function sendInputs() {
      // Filter the inputPool to only include keys with true values
      var trueInputs = Object.fromEntries(Object.entries(this.inputPool).filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        return value === true;
      }));

      // Send trueInputs if there are any
      if (Object.keys(trueInputs).length > 0) {
        if (this.game.communicationClient) {
          this.game.communicationClient.sendMessage('player_input', {
            controls: trueInputs
          });
        }
      }

      // Reset only the false values in the inputPool
      for (var key in this.inputPool) {
        if (!this.inputPool[key]) {
          delete this.inputPool[key];
        }
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove all event listeners using the bound functions
      document.removeEventListener('keydown', this.boundHandleKeyDown);
      document.removeEventListener('keyup', this.boundHandleKeyUp);
    }
  }]);
  return Keyboard;
}();
_defineProperty(Keyboard, "id", 'keyboard');

},{}]},{},[1])(1)
});

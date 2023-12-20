(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).CurrentFPS = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// CurrentFPS.js - Marak Squires 2023
var CurrentFPS = /*#__PURE__*/function () {
  function CurrentFPS() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CurrentFPS);
    this.id = CurrentFPS.id;
    this.currentFPS = null;
    this.displayElement = null;
  }
  _createClass(CurrentFPS, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createDisplay();
      this.subscribeToFPSEvent();
    }
  }, {
    key: "createDisplay",
    value: function createDisplay() {
      this.displayElement = document.createElement('div');
      this.displayElement.id = "fpsDisplay";
      this.displayElement.style.position = 'absolute';
      this.displayElement.style.top = '8px'; // Adjusted from SnapshotSize plugin for spacing
      this.displayElement.style.right = '10px';
      this.displayElement.style.zIndex = '9002';
      this.displayElement.style.padding = '5px';
      this.displayElement.style.border = '1px solid #ddd';
      this.displayElement.style.borderRadius = '4px';
      this.displayElement.style.backgroundColor = '#f8f8f8';
      this.displayElement.textContent = 'FPS: -';
      // hidden
      this.displayElement.style.display = 'none';
      document.body.appendChild(this.displayElement);
    }
  }, {
    key: "subscribeToFPSEvent",
    value: function subscribeToFPSEvent() {
      var _this = this;
      this.game.on('fps', function (fps) {
        // check if hidden, if so show
        if (_this.displayElement.style.display === 'none') {
          _this.displayElement.style.display = 'block';
        }
        _this.currentFPS = truncateToPrecision(fps);
        _this.displayFPS();
      });
    }
  }, {
    key: "displayFPS",
    value: function displayFPS() {
      if (this.displayElement) {
        this.displayElement.textContent = "FPS: ".concat(this.currentFPS);
        // Optional: Add logic to change color based on FPS quality
        if (this.currentFPS >= 50) {
          this.displayElement.style.color = 'green';
        } else if (this.currentFPS >= 30) {
          this.displayElement.style.color = 'orange';
        } else {
          this.displayElement.style.color = 'red';
        }
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.displayElement && this.displayElement.parentNode) {
        this.displayElement.parentNode.removeChild(this.displayElement);
      }
      this.displayElement = null;
    }
  }]);
  return CurrentFPS;
}();
_defineProperty(CurrentFPS, "id", 'gui-current-fps');
var truncateToPrecision = function truncateToPrecision(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // FPS typically doesn't need decimals
  return Math.round(value);
};
var _default = exports["default"] = CurrentFPS;

},{}]},{},[1])(1)
});

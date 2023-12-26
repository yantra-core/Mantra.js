(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).GamepadGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var GamepadGUI = /*#__PURE__*/function () {
  function GamepadGUI(game) {
    _classCallCheck(this, GamepadGUI);
    this.game = game; // Store the reference to the game logic
    this.id = GamepadGUI.id;
  }
  _createClass(GamepadGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      var controllerHolder = document.createElement('div');
      controllerHolder.style.position = 'absolute';
      controllerHolder.style.top = '0';
      controllerHolder.style.left = '0';
      controllerHolder.style.width = '100%';
      controllerHolder.style.height = '100%';
      controllerHolder.style.zIndex = '9999';
      this.createSNESGamepad(controllerHolder);
      console.log('controllerHolder', controllerHolder);
      document.body.appendChild(controllerHolder);
    }
  }, {
    key: "createSNESGamepad",
    value: function createSNESGamepad(parentElement) {
      var str = "\n    \n    <!-- Code to handle the camera angle -->\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam1\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam2\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam3\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam4\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam5\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam6\" checked />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam7\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam8\" />\n<input tabindex=\"-1\" type=\"radio\" name=\"cam\" id=\"cam9\" />\n\n<div id=\"camera\">\n  <label for=\"cam1\"></label>\n  <label for=\"cam2\"></label>\n  <label for=\"cam3\"></label>\n  <label for=\"cam4\"></label>\n  <label for=\"cam5\"></label>\n  <label for=\"cam6\"></label>\n  <label for=\"cam7\"></label>\n  <label for=\"cam8\"></label>\n  <label for=\"cam9\"></label>\n</div>\n\n\n<article id=\"snes-gamepad\" aria-label=\"SNES controller\">\n  <!-- cord -->\n  <div id=\"cord\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n  \n  <!-- Buttons on top-->\n  <button id=\"l\" class=\"is3d\">Top left<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>\n  <button id=\"r\" class=\"is3d\">Top Right<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>\n  \n  <!-- frame -->\n  <div class=\"face is3d\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n  \n  <!-- Letters and Text -->\n  <h1>SUPER NINTENDO</h1>\n  <p>CSS ENTERTAINMENT SYSTEM</p>\n  \n  <p class=\"letter letter-x\" aria-hidden=\"true\">X</p>\n  <p class=\"letter letter-y\" aria-hidden=\"true\">Y</p>\n  <p class=\"letter letter-a\" aria-hidden=\"true\">A</p>\n  <p class=\"letter letter-b\" aria-hidden=\"true\">B</p>\n  <p class=\"letter-start\" aria-hidden=\"true\">START</p>\n  <p class=\"letter-select\" aria-hidden=\"true\">SELECT</p>\n  \n  <!-- directional buttons + axis -->\n  <button id=\"up\">Up</button>\n  <button id=\"left\">Left</button>\n  <button id=\"right\">Right</button>\n  <button id=\"down\">Down</button>\n  <div class=\"axis is3d\"><div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div><div style=\"--z:5\"></div><div style=\"--z:6\"></div></div>\n  \n  <!-- Menu buttons (start/select) -->\n  <button id=\"select\" class=\"is3d\">Select<div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div></button>\n  <button id=\"start\" class=\"is3d\">Start<div style=\"--z:1\"></div><div style=\"--z:2\"></div><div style=\"--z:3\"></div><div style=\"--z:4\"></div></button>\n  \n  <!-- Action buttons -->\n  <div class=\"buttons\">\n    <button id=\"x\" class=\"circle is3d\">x<div></div><div></div><div></div><div></div></button>\n    <button id=\"y\" class=\"circle is3d\">y<div></div><div></div><div></div><div></div></button>\n    <button id=\"a\" class=\"circle is3d\">a<div></div><div></div><div></div><div></div></button>\n    <button id=\"b\" class=\"circle is3d\">b<div></div><div></div><div></div><div></div></button>\n  </div>\n</article>\n\n    \n    ";
      parentElement.innerHTML = str;
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
  return GamepadGUI;
}();
_defineProperty(GamepadGUI, "id", 'gui-gamepad');
var _default = exports["default"] = GamepadGUI;

},{}]},{},[1])(1)
});

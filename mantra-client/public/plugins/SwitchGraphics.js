(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SwitchGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// SwitchGraphics.js - Marak Squires 2023
var SwitchGraphics = /*#__PURE__*/function () {
  function SwitchGraphics() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SwitchGraphics);
    this.id = SwitchGraphics.id;
    this.graphicsMode = config.graphicsMode || '2D';
  }
  _createClass(SwitchGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      this.createUI();
    }

    // TODO: make SwitchGraphics() a buildable entity
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    } /*
      if (typeof entityData.position === 'undefined') {
        entityData.position = { x: 0, y: 0 };
      }
      entityData.meta = entityData.meta || {};
      entityData.meta.disabled = entityData.disabled;
      return {
        type: 'BUTTON',
        body: false,
        text: entityData.text || 'Switch Graphics',
        position: entityData.position,
        ...entityData // Spread the rest of entityData to override defaults as necessary
      };
      */
  }, {
    key: "setMode",
    value: function setMode() {
      // Determine the next graphics mode
      var nextGraphicsMode = this.nextMode();

      // Update the graphics mode first
      this.graphicsMode = nextGraphicsMode;
      // this.game.data.camera.currentZoom = 2.5;
      this.game.switchGraphics(this.lookupGraphicsPlugin(this.graphicsMode));
      // Then update the button label to reflect the new mode
      this.updateButtonLabel(this.nextMode());
    }
  }, {
    key: "createUI",
    value: function createUI() {
      var container = this.createContainer();
      var button = this.createButton();
      container.appendChild(button);
      document.body.appendChild(container);
    }
  }, {
    key: "createContainer",
    value: function createContainer() {
      var container = document.createElement('div');
      container.id = 'switchgraphics-container';
      container.className = 'switchgraphics-container';
      container.style.cssText = "\n      position: absolute;\n      top: 0;\n      left: 50%;\n      transform: translateX(-50%);\n      text-align: center;\n      padding: 10px 0;\n      z-index: 11111;\n    ";
      return container;
    }
  }, {
    key: "lookupGraphicsPlugin",
    value: function lookupGraphicsPlugin(graphicsMode) {
      return graphicsMode === '2D' ? 'css' : 'three';
    }
  }, {
    key: "nextMode",
    value: function nextMode() {
      return this.graphicsMode === '2D' ? '3D' : '2D';
    }
  }, {
    key: "updateButtonLabel",
    value: function updateButtonLabel(nextGraphicsMode) {
      var button = document.querySelector('#switchgraphics-container button');
      button.innerHTML = "Switch to ".concat(nextGraphicsMode);
    }
  }, {
    key: "createButton",
    value: function createButton() {
      var _this = this;
      var button = document.createElement('button');
      button.innerHTML = "Switch to ".concat(this.nextMode());
      button.onclick = function () {
        return _this.setMode();
      };
      button.style.cssText = "\n      padding: 10px 20px;\n      cursor: pointer;\n      font-size: 16px;\n      border: none;\n      border-radius: 5px;\n      background-color: #4CAF50;\n      color: white;\n    ";
      return button;
    }
  }, {
    key: "unload",
    value: function unload() {
      var container = document.getElementById('switchgraphics-container');
      if (container) {
        container.remove();
      }
    }
  }]);
  return SwitchGraphics;
}();
_defineProperty(SwitchGraphics, "id", 'gui-switch-graphics');
var _default = exports["default"] = SwitchGraphics;

},{}]},{},[1])(1)
});

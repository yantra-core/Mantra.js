(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Code = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Code.js - Marak Squires 2024
// This plugin is designed to create and manage code block entities within the game environment.
var Code = exports["default"] = /*#__PURE__*/function () {
  function Code() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Code);
    this.id = Code.id;
    // Set default code styling here, if needed
    this.defaultStyle = config.defaultStyle || {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#D4D4D4',
      backgroundColor: '#1E1E1E',
      padding: '10px',
      borderRadius: '5px'
      // Add more default styling as needed
    };
  }
  _createClass(Code, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('code', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Apply default styling to the code entity
      var style = _objectSpread(_objectSpread({}, this.defaultStyle), entityData.style);
      entityData.meta = entityData.meta || {};
      if (typeof entityData.code !== 'undefined') {
        entityData.meta.code = entityData.code;
      }
      if (typeof entityData.src !== 'undefined') {
        entityData.meta.src = entityData.src;
      }
      if (typeof entityData.language !== 'undefined') {
        entityData.meta.language = entityData.language;
      } else {
        entityData.meta.language = 'javascript'; // Default language for syntax highlighting
      }

      return _objectSpread({
        type: 'CODE',
        body: false,
        // Assuming 'body' is used similarly to 'textarea' for physical representation
        text: entityData.text || '',
        // Default code text if none provided
        position: entityData.position,
        style: style
      }, entityData);
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Create the Code entity
      var codeEntity = this.game.createEntity(this.build(entityData));

      // Additional setup for the code entity can be added here
    }
  }]);
  return Code;
}();
_defineProperty(Code, "id", 'code');

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).FlashMessage = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var Flash = /*#__PURE__*/function () {
  function Flash() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Flash);
    this.id = Flash.id;
    this.defaultDuration = config.defaultDuration || 3000; // Default duration in milliseconds
    this.flashContainer = null; // Will hold the container for flash messages
    // Default style properties
    this.style = _objectSpread({
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: '1000'
    }, config.style);
    // Style for different types of messages
    this.typeStyles = {
      error: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white'
      },
      warn: {
        backgroundColor: 'rgba(255, 255, 0, 0.7)',
        color: 'black'
      },
      info: {
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        color: 'white'
      },
      success: {
        backgroundColor: 'rgba(0, 255, 0, 0.7)',
        color: 'white'
      }
    };
  }
  _createClass(Flash, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      this.game.flashMessage = this.showMessage.bind(this);
      this.createFlashContainer();
    }
  }, {
    key: "createFlashContainer",
    value: function createFlashContainer() {
      if (!this.flashContainer) {
        this.flashContainer = document.createElement('div');
        this.flashContainer.id = 'flash-messages-container';
        Object.assign(this.flashContainer.style, this.style);
        document.body.appendChild(this.flashContainer);
      }
    }
  }, {
    key: "showMessage",
    value: function showMessage(content) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultDuration;
      var messageElement = document.createElement('div');
      var messageType = 'info'; // Default type
      var messageText = content;

      // If content is an object, extract type, message, style, and override duration if provided
      if (_typeof(content) === 'object' && content !== null) {
        messageType = content.type || messageType;
        messageText = content.message || messageText;
        if (content.sticky !== true) {
          duration = content.hasOwnProperty('duration') ? content.duration : duration;
        } else {
          duration = null;
        }
      }

      // Apply type style if it exists, otherwise default to empty object
      var typeStyle = this.typeStyles[messageType] || {};

      // Apply default styles and type-specific styles first
      Object.assign(messageElement.style, {
        cursor: 'pointer',
        margin: '5px 0',
        fontSize: '24px',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        // Needed to position the close button absolutely within the message
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }, typeStyle);

      // Then override with custom styles if provided
      if (_typeof(content) === 'object' && content.style) {
        Object.assign(messageElement.style, content.style);
      }

      // Add message text
      var textSpan = document.createElement('span');
      textSpan.innerHTML = messageText;
      messageElement.appendChild(textSpan);

      // Allow the message to be closed by clicking anywhere on it
      messageElement.onclick = function () {
        return messageElement.remove();
      };
      this.flashContainer.appendChild(messageElement);

      // Automatically remove the message after the duration, if duration is provided
      if (duration !== null) {
        setTimeout(function () {
          messageElement.remove();
        }, duration);
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.flashContainer) {
        this.flashContainer.remove();
        this.flashContainer = null;
      }
    }
  }]);
  return Flash;
}();
_defineProperty(Flash, "id", 'flash');
var _default = exports["default"] = Flash;

},{}]},{},[1])(1)
});

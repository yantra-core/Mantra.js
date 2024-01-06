(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).GhostTyper = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// GhostTyper.js - Marak Squires 2023
var GhostTyper = /*#__PURE__*/function () {
  function GhostTyper() {
    _classCallCheck(this, GhostTyper);
    this.id = GhostTyper.id;
    this.typers = [];
  }
  _createClass(GhostTyper, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "createQueuedText",
    value: function createQueuedText(options) {
      var _this = this;
      var typer = new Typer(this.game, options.x, options.y, '', options.style, function () {
        return _this.removeTyper(typer);
      });
      this.typers.push(typer);
      return typer;
    }
    // Add text to the queue of a specific typer
  }, {
    key: "queueTextForTyper",
    value: function queueTextForTyper(typer, text, duration, removeDuration) {
      typer.queueText(text, duration, removeDuration);
    }

    // Start processing the queue for a specific typer
  }, {
    key: "startTyperQueue",
    value: function startTyperQueue(typer) {
      typer.processQueue();
    }
  }, {
    key: "createText",
    value: function createText(options) {
      var _this2 = this;
      var typer = new Typer(this.game, options.x, options.y, options.text, options.style, options.duration, options.removeDuration, function () {
        return _this2.removeTyper(typer);
      });
      this.typers.push(typer);
      return typer;
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;
      // update gets called once per game tick at the games FPS rate
      this.typers.forEach(function (typer) {
        if (_this3.game.tick % typer.framesToWait === 0 && !typer.complete) {
          typer.type();
        }
      });
    }
  }, {
    key: "removeTyper",
    value: function removeTyper(typerToRemove) {
      this.typers = this.typers.filter(function (typer) {
        return typer !== typerToRemove;
      });
    }
  }]);
  return GhostTyper;
}();
_defineProperty(GhostTyper, "id", 'typer-ghost');
var Typer = /*#__PURE__*/function () {
  function Typer(game, x, y) {
    var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var style = arguments.length > 4 ? arguments[4] : undefined;
    var duration = arguments.length > 5 ? arguments[5] : undefined;
    var removeDuration = arguments.length > 6 ? arguments[6] : undefined;
    var onRemove = arguments.length > 7 ? arguments[7] : undefined;
    _classCallCheck(this, Typer);
    this.game = game;
    this.text = '';
    this.ogText = text;
    this.duration = duration || 5000;
    this.removeDuration = removeDuration;
    this.style = style;
    this.typerText = this.createTextElement(x, y, style);
    this.framesToWait = Math.floor((duration || 5000) / (33.33 * text.length));
    this.frameCounter = 0;
    this.lastUpdate = 0;
    this.complete = false;
    this.removeTimer = null;
    this.textQueue = [];
    this.onRemove = onRemove;
  }
  _createClass(Typer, [{
    key: "queueText",
    value: function queueText(text, duration, removeDuration) {
      this.textQueue.push({
        text: text,
        duration: duration,
        removeDuration: removeDuration
      });
    }

    // Method to start processing the queue
  }, {
    key: "processQueue",
    value: function processQueue() {
      if (this.textQueue.length > 0) {
        var _this$textQueue$shift = this.textQueue.shift(),
          text = _this$textQueue$shift.text,
          duration = _this$textQueue$shift.duration,
          removeDuration = _this$textQueue$shift.removeDuration;
        this.updateText(text, duration, removeDuration);
      }
    }
  }, {
    key: "createTextElement",
    value: function createTextElement(x, y, style) {
      var cameraPosition = this.game.data.camera.position;
      var currentPlayer = this.game.getEntity(this.game.currentPlayerId);
      var element = document.createElement('div');
      Object.assign(element.style, style, {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px'
      });
      document.body.appendChild(element);
      return element;
    }
  }, {
    key: "type",
    value: function type() {
      if (this.text.length) {
        this.typerText.textContent += this.text[0];
        this.text = this.text.substr(1);
        this.isTyping = true;
      } else if (this.isTyping) {
        this.complete = true;
        this.isTyping = false;
        this.setRemoveTimer();
      }
    }
  }, {
    key: "setRemoveTimer",
    value: function setRemoveTimer() {
      var _this4 = this;
      if (this.removeDuration) {
        // Wait for removeDuration before processing the next queue item
        this.removeTimer = setTimeout(function () {
          _this4.typerText.textContent = '';
          _this4.processQueue();
        }, this.removeDuration);
      } else {
        // If there's no removeDuration, process the next item immediately
        this.processQueue();
      }
    }
  }, {
    key: "updateText",
    value: function updateText(newText, newDuration, newRemoveDuration) {
      this.complete = false;
      this.text = newText;
      this.ogText = newText;
      this.duration = newDuration || this.duration;
      this.removeDuration = newRemoveDuration;
      this.framesToWait = Math.floor(this.duration / (33.33 * newText.length));
      this.typerText.textContent = '';
      this.isTyping = false;
    }
  }]);
  return Typer;
}();
var _default = exports["default"] = GhostTyper;

},{}]},{},[1])(1)
});

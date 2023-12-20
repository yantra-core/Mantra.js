(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).FloatyTyper = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// FloatyTyper.js - Marak Squires 2023
var FloatyTyper = /*#__PURE__*/function () {
  function FloatyTyper() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FloatyTyper);
    this.id = FloatyTyper.id;
    this.typingArea = null;
  }
  _createClass(FloatyTyper, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      var that = this;
      this.game.systemsManager.addSystem(this.id, this);
      this.createTypingArea();
      this.game.on('playNote', function (note, duration, now) {
        that.scheduleFloatingChar(note, now);
      });
      // Optionally we can attach key listeners directly here
      // It will be better that we hook into the Mantra Event System instead
      // this.attachKeyListener();

      this.noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      this.noteColors = {
        'C': '#FF0000',
        // Red
        'D': '#FFA500',
        // Orange
        'E': '#FFFF00',
        // Yellow
        'F': '#008000',
        // Green
        'G': '#0000FF',
        // Blue
        'A': '#4B0082',
        // Indigo
        'B': '#EE82EE' // Violet
      };
    }
  }, {
    key: "createTypingArea",
    value: function createTypingArea() {
      // Create and style the typing area
      this.typingArea = document.createElement('div');
      this.typingArea.id = 'typingArea';
      this.typingArea.style.position = 'absolute';
      this.typingArea.style.bottom = '0px';
      this.typingArea.style.width = '100%';
      this.typingArea.style.height = '200px';
      this.typingArea.style.border = '1px solid black';
      document.body.appendChild(this.typingArea);
    }
  }, {
    key: "attachKeyListener",
    value: function attachKeyListener() {
      var _this = this;
      document.addEventListener('keypress', function (event) {
        var _char = event.key;
        _this.createFloatingChar(_char);
      });
    }
  }, {
    key: "scheduleFloatingChar",
    value: function scheduleFloatingChar(_char2, delay) {
      var _this2 = this;
      setTimeout(function () {
        _this2.createFloatingChar(_char2);
      }, delay * 600); // Convert delay to milliseconds
    }
  }, {
    key: "getNotePosition",
    value: function getNotePosition(note) {
      // Define the order of the notes on a keyboard
      var noteIndex = this.noteOrder.indexOf(note.charAt(0).toUpperCase());
      if (noteIndex === -1) return Math.random() * 100; // Default if note not found

      // Divide the screen into sections based on the number of notes
      var sectionWidth = 100 / this.noteOrder.length;
      // Calculate position with some random variation
      return sectionWidth * noteIndex + (Math.random() - 0.5) * sectionWidth;
    }
  }, {
    key: "createFloatingChar",
    value: function createFloatingChar(_char3) {
      // Use the first letter of the note to determine its position
      var position = this.getNotePosition(_char3);
      var charElement = document.createElement('span');
      charElement.classList.add('char');
      // let notationChar = "" + char;
      //charElement.textContent = '\uE1D5'; // Example for a quarter note
      // charElement.textContent = notationChar;
      charElement.textContent = _char3;
      charElement.style.fontSize = '64px';
      charElement.style.fontWeight = 'bold';
      charElement.style.color = this.noteColors[_char3.charAt(0)];
      charElement.style.position = 'absolute';
      charElement.style.bottom = '0';
      charElement.style.opacity = '1';
      charElement.style.transition = 'all 2s ease-out';
      // charElement.style.fontFamily = 'Bravura'; //
      // font-family: 'Bravura', sans-serif

      // adds padding to left
      position = position + 10;
      charElement.style.left = "".concat(position, "%");

      //charElement.style.left = `${Math.random() * 100}%`;

      this.typingArea.appendChild(charElement);

      // Animate
      setTimeout(function () {
        charElement.style.bottom = '100%';
        charElement.style.opacity = '0';
      }, 10);

      // Remove element after animation
      setTimeout(function () {
        charElement.remove();
      }, 20000);
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.typingArea) {
        this.typingArea.remove();
      }
      document.removeEventListener('keypress', this.createFloatingChar);
    }
  }]);
  return FloatyTyper;
}();
_defineProperty(FloatyTyper, "id", 'floaty-typer');
var _default = exports["default"] = FloatyTyper;

},{}]},{},[1])(1)
});

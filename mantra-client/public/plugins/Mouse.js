(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Mouse = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Mouse.js - Marak Squires 2023
var Mouse = exports["default"] = /*#__PURE__*/function () {
  function Mouse(communicationClient) {
    _classCallCheck(this, Mouse);
    this.id = Mouse.id;
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = {
      x: 0,
      y: 0
    };
    this.disableContextMenu = false;
    this.isDragging = false;
    this.dragStartPosition = {
      x: 0,
      y: 0
    };
    this.mouseButtons = {
      LEFT: false,
      RIGHT: false,
      MIDDLE: false
    };
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);
  }
  _createClass(Mouse, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.id = Mouse.id;
      this.bindInputControls();
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      // TODO: common function for selecting entities
      // TODO: have editor be aware if inspector is loaded
      // if so, show additional UX for selecting entities
      var target = event.target;
      if (target && target.getAttribute) {
        var mantraId = target.getAttribute('mantra-id');
        if (mantraId) {
          // if this is a Mantra entity, set the selectedEntityId
          // this is used for GUI rendering and CSSGraphics
          this.game.selectedEntityId = mantraId;
        }
      }
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      if (event.target instanceof HTMLCanvasElement) {
        var canvas = event.target;
        var rect = canvas.getBoundingClientRect();
        this.canvasPosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      } else {
        // if not a canvas, set relative position to null or keep the previous position
        this.canvasPosition = null;
      }

      // If dragging, calculate the delta and send drag data
      if (this.isDragging) {
        var dx = this.mousePosition.x - this.dragStartPosition.x;
        var dy = this.mousePosition.y - this.dragStartPosition.y;
        this.dx = dx;
        this.dy = dy;

        // Update the drag start position for the next movement
        this.dragStartPosition = {
          x: this.mousePosition.x,
          y: this.mousePosition.y
        };
      }
      this.sendMouseData();
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      var target = event.target;

      // check to see if target has a mantra-id attribute
      if (target && target.getAttribute) {
        var mantraId = target.getAttribute('mantra-id');
        if (mantraId) {
          // if this is a Mantra entity, set the selectedEntityId
          // this is used for GUI rendering and CSSGraphics
          this.game.selectedEntityId = mantraId;
        }
      }
      switch (event.button) {
        case 0:
          this.mouseButtons.LEFT = true;
          break;
        case 1:
          this.mouseButtons.MIDDLE = true;
          break;
        case 2:
          this.mouseButtons.RIGHT = true;
          break;
      }
      if (event.button === 2) {
        // Right mouse button
        this.isDragging = true;
        this.dragStartPosition = {
          x: event.clientX,
          y: event.clientY
        };
        // prevent default right click menu
        // event.preventDefault();
      }

      // TODO: add conditional check here to see if we should be processing mouse events

      this.sendMouseData();
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      switch (event.button) {
        case 0:
          this.mouseButtons.LEFT = false;
          break;
        case 1:
          this.mouseButtons.MIDDLE = false;
          break;
        case 2:
          this.mouseButtons.RIGHT = false;
          break;
      }
      if (event.button === 2) {
        // Right mouse button
        this.isDragging = false;
        // prevent default right click menu
        event.preventDefault();
      }
      this.game.emit('pointerUp', this.game.selectedEntityId);
      this.sendMouseData();
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut(event) {
      this.game.emit('pointerout', event);
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver(event) {
      this.game.emit('pointerover', event);
    }
  }, {
    key: "sendMouseData",
    value: function sendMouseData() {
      var mouseData = {
        position: this.mousePosition,
        // absolute position
        canvasPosition: this.canvasPosition,
        // relative position to any canvas
        buttons: this.mouseButtons,
        isDragging: this.isDragging,
        dragStartPosition: this.dragStartPosition,
        dx: this.dx,
        dy: this.dy
      };
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', {
          mouse: mouseData
        });
      }
    }
  }, {
    key: "bindInputControls",
    value: function bindInputControls() {
      document.addEventListener('pointerover', this.boundHandleMouseOver);
      document.addEventListener('pointerout', this.boundHandleMouseOut);
      document.addEventListener('pointermove', this.boundHandleMouseMove);
      document.addEventListener('pointerdown', this.boundHandleMouseDown);
      document.addEventListener('pointerup', this.boundHandleMouseUp);
      // TODO: could be a config option
      if (this.disableContextMenu) {
        document.addEventListener('contextmenu', function (event) {
          return event.preventDefault();
        });
      }
    }
  }, {
    key: "unbindAllEvents",
    value: function unbindAllEvents() {
      // unbind all events
      document.removeEventListener('pointerover', this.boundHandleMouseOver);
      document.removeEventListener('pointerout', this.boundHandleMouseOut);
      document.removeEventListener('pointermove', this.boundHandleMouseMove);
      document.removeEventListener('pointerdown', this.boundHandleMouseDown);
      document.removeEventListener('pointerup', this.boundHandleMouseUp);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.unbindAllEvents();
    }
  }]);
  return Mouse;
}();
_defineProperty(Mouse, "id", 'mouse');

},{}]},{},[1])(1)
});

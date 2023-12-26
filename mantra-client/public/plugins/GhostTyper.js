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
// TODO: this needs to be a "kind" of text element entity and go through,
// inflateText() code path with type: 'TEXT', kind: 'ghost'
// this is required in order to get the text to adjust position based on camera movements
// could be tricky to integrate with CSSCamera vs other camera systems
// might do well to have game.data.camera.position scope updated regardless of camera system
// current behavior of ghost text is to be fixed to the screen
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

      // TEST CODE DO NOT REMOVE
      //let typerInstance = this.typers[0]; // Example: get the first typewriter instance
      //this.updateText(typerInstance, "Welcome to Mantra\n my friend.", 10000, 10000);
      // END TEST CODE
    }
  }, {
    key: "createText",
    value: function createText(options) {
      var x = options.x,
        y = options.y,
        text = options.text,
        style = options.style,
        duration = options.duration;
      var typer = {
        text: text,
        ogText: text,
        duration: duration || 5000,
        style: style,
        typerText: this.createTextElement(x, y, style),
        framesToWait: Math.floor((duration || 5000) / (33.33 * text.length)),
        frameCounter: 0,
        lastUpdate: 0
      };
      this.typers.push(typer);
    }
  }, {
    key: "createTextElement",
    value: function createTextElement(x, y, style) {
      var cameraPosition = this.game.data.camera.position;
      console.log('ahhh', this.game.data);
      var currentPlayer = this.game.getEntity(this.game.currentPlayerId);
      console.log("currentPlayercurrentPlayercurrentPlayer", currentPlayer);
      //console.log('CSSGRA', this.game.systems['graphics-css']);
      // alert(cameraPosition)
      var element = document.createElement('div');
      Object.assign(element.style, style, {
        position: 'absolute',
        left: "".concat(x, "px"),
        top: "".concat(y, "px")
      });
      document.body.appendChild(element);
      return element;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;
      // update gets called once per game tick at the games FPS rate
      this.typers.forEach(function (typer) {
        if (_this.game.tick % typer.framesToWait === 0) {
          _this.typeWriter(typer);
        }
      });
    }
  }, {
    key: "typeWriter",
    value: function typeWriter(typer) {
      if (typer.text.length) {
        typer.typerText.textContent += typer.text[0];
        typer.text = typer.text.substr(1);
      }
    }
  }, {
    key: "updateText",
    value: function updateText(typer, newText, newDuration, removeDuration) {
      var now = new Date().getTime();
      if (now - typer.lastUpdate < 100) {
        console.log('ignoring update because it is too soon');
        return;
      }
      typer.lastUpdate = now;
      typer.text = newText;
      typer.ogText = newText;
      typer.duration = newDuration || typer.duration;
      typer.framesToWait = Math.floor(typer.duration / (33.33 * newText.length));
      typer.typerText.textContent = '';
      if (typeof removeDuration === 'number') {
        setTimeout(function () {
          typer.text = '';
          typer.typerText.textContent = '';
        }, removeDuration);
      }
    }
  }]);
  return GhostTyper;
}();
_defineProperty(GhostTyper, "id", 'typer-ghost');
var _default = exports["default"] = GhostTyper;

},{}]},{},[1])(1)
});

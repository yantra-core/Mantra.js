(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).LocalClient = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// LocalClient.js - Marak Squires 2023
// LocalClient is a client that runs the game loop locally, without a server
var LocalClient = exports["default"] = /*#__PURE__*/function () {
  function LocalClient() {
    _classCallCheck(this, LocalClient);
    this.started = false; // TODO: This doesn't seem ideal, we may not know the player name at this point
    this.id = LocalClient.id;
  }
  _createClass(LocalClient, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.isClient = true; // We may be able to remove this? It's currently not being used anywhere
      game.localGameLoopRunning = false;
      this.game.systemsManager.addSystem('localClient', this);
    }
  }, {
    key: "start",
    value: function start(callback) {
      var game = this.game;
      if (typeof callback === 'undefined') {
        callback = function noop() {};
      }
      this.game.isOnline = false;
      var self = this;
      callback(null, true);
      this.game.emit('start');
      if (this.game.systems.xstate) {
        this.game.systems.xstate.sendEvent('START');
      }
      this.game.localGameLoopRunning = true;
      this.game.localGameLoop(this.game); // Start the local game loop when offline

      this.game.communicationClient = this;
      this.game.createPlayer({
        type: 'PLAYER'
      }).then(function (ent) {
        game.setPlayerId(ent.id);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.game.localGameLoopRunning = false;
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(action, data) {
      if (action === 'player_input') {
        if (!this.game.systems['entity-input']) {
          console.log('entity-input system not found, skipping player_input action to sendMessage');
          return;
        }
        var entityInput = this.game.getSystem('entity-input');
        entityInput.handleInputs(this.game.currentPlayerId, {
          controls: data.controls,
          mouse: data.mouse
        });
      }
    }
  }]);
  return LocalClient;
}();
_defineProperty(LocalClient, "id", 'client-local');

},{}]},{},[1])(1)
});

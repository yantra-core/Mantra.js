(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PongMovement = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// PongMovement.js - Marak Squires 2023
var PongMovementStrategy = /*#__PURE__*/function () {
  function PongMovementStrategy() {
    _classCallCheck(this, PongMovementStrategy);
    this.id = PongMovementStrategy.id;
  }
  _createClass(PongMovementStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // check to see if entityMovement system exists, if not throw error
      if (!game.systems['entity-movement']) {
        throw new Error('PongMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
      }
      game.systemsManager.addSystem(this.id, this);
      game.systems['entity-movement'].strategies.push(this);
    }
  }, {
    key: "update",
    value: function update(entityId, dx, dy) {
      var player = this.game.bodyMap[entityId];
      if (!player) return;
      var MOVE_SPEED = 1; // This determines how fast the paddle moves, adjust as needed

      // Use dx and dy to set the movement direction
      var moveDirectionX = dx; // -1 for left, 1 for right, 0 for stationary
      var moveDirectionY = dy; // -1 for up, 1 for down, 0 for stationary

      // If there is any movement, update the entity's state
      if (moveDirectionX !== 0 || moveDirectionY !== 0) {
        var velocity = {
          x: 0,
          // in pong we only move on the Y axis
          y: -MOVE_SPEED * moveDirectionY // invert the Y axis to match the game's coordinate system
        };

        // Assuming this.game.physics.Body.setVelocity() is the correct method
        // to update the player's velocity in your physics engine.
        this.game.physics.Body.setVelocity(player, velocity);
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      var self = this;
      // removes self from the entityMovement system
      game.systems['entity-movement'].strategies = game.systems['entity-movement'].strategies.filter(function (strategy) {
        return strategy.id !== self.id;
      });
    }
  }]);
  return PongMovementStrategy;
}();
_defineProperty(PongMovementStrategy, "id", 'pong-movement');
var _default = exports["default"] = PongMovementStrategy;

},{}]},{},[1])(1)
});

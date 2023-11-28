(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).FroggerMovement = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// FroggerMovement.js - Marak Squires 2023
var FroggerMovement = /*#__PURE__*/function () {
  function FroggerMovement() {
    _classCallCheck(this, FroggerMovement);
    this.id = FroggerMovement.id;
  }
  _createClass(FroggerMovement, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // check to see if entityMovement system exists, if not throw error
      if (!game.systems['entity-movement']) {
        throw new Error('FroggerMovement requires an entity-movement system to be registered! Please game.use(new EntityMovement())');
      }
      game.systems['entity-movement'].addStrategy(this);
    }
  }, {
    key: "update",
    value: function update(entityId, dx, dy) {
      var entity = this.game.getEntity(entityId);
      var body = this.game.bodyMap[entityId];
      if (!entity) return;
      var GRID_SIZE = entity.width / 10; // Assuming each step moves by one grid unit

      // Update the position based on input
      var newPosition = {
        x: entity.position.x + dx * GRID_SIZE,
        y: entity.position.y + -dy * GRID_SIZE
      };
      this.game.physics.Body.setPosition(body, newPosition);
    }
  }, {
    key: "unload",
    value: function unload() {
      var self = this;
      // removes self from the entityMovement system
      // TODO: we could move this to commoon function on entityMovement system
      game.systems['entity-movement'].strategies = game.systems['entity-movement'].strategies.filter(function (strategy) {
        return strategy.id !== self.id;
      });
    }
  }]);
  return FroggerMovement;
}();
_defineProperty(FroggerMovement, "id", 'frogger-movement');
var _default = exports["default"] = FroggerMovement;

},{}]},{},[1])(1)
});

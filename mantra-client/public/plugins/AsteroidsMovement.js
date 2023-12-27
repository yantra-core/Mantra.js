(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).AsteroidsMovement = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// AsteroidsMovement.js - Marak Squires 2023
var AsteroidsMovementStrategy = /*#__PURE__*/function () {
  function AsteroidsMovementStrategy() {
    _classCallCheck(this, AsteroidsMovementStrategy);
  }
  _createClass(AsteroidsMovementStrategy, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.id = AsteroidsMovementStrategy.id;
      // check to see if entityInput system exists, if not throw error
      if (!game.systems['entity-movement']) {
        throw new Error('AsteroidsMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
      }
      game.systems['entity-movement'].strategies.push(this);
    }
  }, {
    key: "update",
    value: function update(entityId, dx, dy) {
      var body = this.game.bodyMap[entityId];
      if (!body) return;
      if (dx !== 0) {
        // Rotation
        var rotationSpeed = 0.022;
        this.game.physics.Body.rotate(body, dx * rotationSpeed, body.position);
      }
      var bodyPosition = this.game.physics.getBodyPosition(body);
      var bodyRotation = this.game.physics.getBodyRotation(body);
      if (dy !== 0) {
        // Thrust
        var thrust = 0.5;
        var angle = bodyRotation;

        // Adjusts for 3D space, remove this for 2d asteroids movements
        if (typeof bodyRotation.x !== 'undefined') {
          angle = bodyRotation.x;
        }
        if (typeof angle === 'undefined') {
          console.log("WARNING - rotation angle is undefined", entityId, bodyRotation);
          angle = 0; // for now
        }

        // Assuming angle = 0 is upwards, and increases in the clockwise direction
        var force = {
          x: Math.sin(angle) * dy * thrust,
          y: -Math.cos(angle) * dy * thrust,
          z: 0
        };
        this.game.physics.Body.applyForce(body, bodyPosition, force);
      }
    }
  }]);
  return AsteroidsMovementStrategy;
}();
_defineProperty(AsteroidsMovementStrategy, "id", 'asteroids-movement');
var _default = exports["default"] = AsteroidsMovementStrategy;

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Hexapod = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Hexapod.js - Marak Squires 2023
var Hexapod = exports["default"] = /*#__PURE__*/function () {
  function Hexapod() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Hexapod);
    this.id = Hexapod.id;
  }
  _createClass(Hexapod, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('hexapod', this);
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
      //let rules = this.sutra();
      return {
        type: 'HEXAPOD',
        texture: 'demon',
        width: 8,
        height: 8,
        body: true,
        collisionStart: this.grow.bind(this),
        update: this.think.bind(this),
        position: entityData.position
      };
    }
  }, {
    key: "grow",
    value: function grow(a, b, pair, context) {
      // eats bullets and grows
      if (context.target.type === 'BULLET') {
        var hexapod = context.owner;
        var style;
        // at a certain size, invert the colors
        if (hexapod.width > 16) {
          style = {
            // Define the animation name and duration
            animation: 'pulse-invert 5s',
            // Initial filter style
            filter: 'invert(90%)'
          };
        }
        // update entity size by 11%
        game.updateEntity({
          id: hexapod.id,
          width: hexapod.width * 1.1,
          height: hexapod.height * 1.1,
          style: style
        });
      }
    }
  }, {
    key: "think",
    value: function think(entity) {
      var gameState = this.game.data;
      var game = this.game;
      var Vector = this.game.systems.physics.Vector;

      // Define constant values for different forces and parameters
      var ALIGNMENT_FORCE = 0.1;
      var COHESION_FORCE = 0.4;
      var SEPARATION_FORCE = 0.81;
      var PERCEPTION_RADIUS = 1500;
      var FIELD_OF_VIEW = 1500;
      var hexapod = entity;
      var hexapods = gameState.ents.HEXAPOD;
      var alignment = {
        x: 0,
        y: 0
      };
      var cohesion = {
        x: 0,
        y: 0
      };
      var separation = {
        x: 0,
        y: 0
      };
      var planetAvoidance = {
        x: 0,
        y: 0
      };

      // Target movement implementation
      var targetForce = {
        x: 0,
        y: 0
      };
      if (typeof gameState.currentPlayer !== 'undefined') {
        if (gameState.currentPlayer) {
          var target = gameState.currentPlayer.position;
          var targetDirection = Vector.sub(target, hexapod.position);
          targetForce = Vector.mult(Vector.normalize(targetDirection), COHESION_FORCE);
        }
      }

      // Process each hexapod in the field of view
      hexapods.forEach(function (otherHexapod) {
        if (otherHexapod.id !== hexapod.id) {
          var d = Vector.magnitude(Vector.sub(hexapod.position, otherHexapod.position));

          // Alignment
          if (d < PERCEPTION_RADIUS) {
            alignment = Vector.add(alignment, otherHexapod.velocity);
          }

          // Cohesion
          if (d < PERCEPTION_RADIUS) {
            cohesion = Vector.add(cohesion, otherHexapod.position);
          }

          // Separation
          if (d < hexapod.width + otherHexapod.width) {
            var diff = Vector.sub(hexapod.position, otherHexapod.position);
            separation = Vector.add(separation, Vector.div(diff, d * d)); // Weight by distance
          }
        }
      });

      // Average out alignment, cohesion, and separation
      if (hexapods.length > 1) {
        alignment = Vector.div(alignment, hexapods.length - 1);
        cohesion = Vector.div(cohesion, hexapods.length - 1);
        cohesion = Vector.sub(cohesion, hexapod.position);
        separation = Vector.div(separation, hexapods.length - 1);
      }
      alignment = Vector.mult(Vector.normalize(alignment), ALIGNMENT_FORCE);
      cohesion = Vector.mult(Vector.normalize(cohesion), COHESION_FORCE);
      separation = Vector.mult(Vector.normalize(separation), SEPARATION_FORCE);

      // Apply forces
      var force = Vector.add(Vector.add(Vector.add(alignment, cohesion), separation), targetForce);
      // Update hexapod position
      var newPosition = Vector.add(hexapod.position, Vector.mult(force, 1));
      newPosition.z = 1; // for now
      game.updateEntity({
        id: hexapod.id,
        position: newPosition
      });
    }

    // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  }, {
    key: "createEntity",
    value: function createEntity() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Create the Hexapod entity
      var hexapod = game.createEntity(this.build(entityData));
    }
  }]);
  return Hexapod;
}();
_defineProperty(Hexapod, "id", 'hexapod');
_defineProperty(Hexapod, "type", 'sutra');

},{}]},{},[1])(1)
});

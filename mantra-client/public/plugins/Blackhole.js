(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Blackhole = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Blackhole.js - Marak Squires 2023
var Blackhole = exports["default"] = /*#__PURE__*/function () {
  function Blackhole() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Blackhole);
    this.id = Blackhole.id;
  }
  _createClass(Blackhole, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.bindRules();
      this.game.systemsManager.addSystem('blackhole', this);
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
      var rules = this.sutra();
      return {
        type: 'BLACK_HOLE',
        isStatic: true,
        isSensor: true,
        width: 4,
        height: 4,
        //radius: 20,
        position: {
          x: entityData.position.x,
          y: entityData.position.y
        },
        // runs every tick, recommended to keep this light and use this.game % 5 === 0 for heavier operations, etc
        // update: function () {},
        mass: 100,
        sutra: rules
      };
    }
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

      // Create the Black Hole entity
      var blackHole = this.game.createEntity(this.build(entityData));
    }
  }, {
    key: "sutra",
    value: function sutra() {
      var _this = this;
      var game = this.game;
      // Define the gravitational constant
      var GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay

      var rules = game.createSutra();
      rules.addCondition('gravityTick', function (entity, gameState) {
        return gameState.tick % 5 === 0;
      });
      rules["if"]('gravityTick').then('applyGravity');
      rules.on('applyGravity', function (entityData, node, gameState) {
        Object.keys(gameState.ents._).forEach(function (eId) {
          var entity = gameState.ents._[eId];
          if (entity.id !== entityData.id && !entity.destroyed) {
            var blackhole = gameState.ents._[entityData.id];
            _this.game.applyGravity(blackhole, entity, GRAVITATIONAL_CONSTANT, gameState);
          }
        });
      });

      // TODO: rework collision handlers to use new collisionContext system
      // rules.if('entTouchedBlackhole').then('blackHoleCollision');
      rules.addCondition('entTouchedBlackhole', function (entity, gameState) {
        // check if this running locally on a context or globally on all BLACK_HOLE entities
        if (typeof context !== 'undefined') {
          return entity.type === 'COLLISION' && entity.kind === 'START' && entity[context.type];
        } else {
          return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BLACK_HOLE;
        }
      });
      rules.on('blackHoleCollision', function (collision, node, gameState) {
        var pendingDestroy = collision.bodyA;
        var blackHole = collision.bodyB;
        if (collision.bodyA.type === 'BLACK_HOLE') {
          pendingDestroy = collision.bodyB;
          blackHole = collision.bodyA;
        }
        if (typeof context !== 'undefined') {
          if (collision.bodyA.type === context.type) {
            pendingDestroy = collision.bodyB;
          } else {
            pendingDestroy = collision.bodyA;
          }
          blackHole = context;
        }
        if (pendingDestroy && blackHole) {
          // here we have pendingDestroy.position, pendingDestroy.velocity, and blackHole.position
          // game.playSpatialSound(pendingDestroy, blackHole);
          // increase size of black hole
          // console.log(blackHole.height, blackHole.width)
          game.removeEntity(pendingDestroy.id);
        }

        // teleport the ent to a random radial a bit away from source
        //let randomPosition = game.randomPositionRadial(blackHole.position.x, blackHole.position.y, 1000);
        //this.game.updateEntity(pendingDestroy.id, { position: randomPosition });
      });

      return rules;
    }
  }, {
    key: "bindRules",
    value: function bindRules() {}
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Blackhole;
}();
_defineProperty(Blackhole, "id", 'blackhole');
_defineProperty(Blackhole, "type", 'sutra');

},{}]},{},[1])(1)
});

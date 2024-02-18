(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).GravityWell = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// GravityWell.js - Marak Squires 2023
var GravityWell = exports["default"] = /*#__PURE__*/function () {
  function GravityWell() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, GravityWell);
    this.id = GravityWell.id;
    this.GRAVITATIONAL_CONSTANT = 0.01; // Adjust as needed for gameplay
  }
  _createClass(GravityWell, [{
    key: "init",
    value: function init(game) {
      this.game = game;
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
      var meta = entityData.meta || {
        repulsion: false
      };
      if (typeof entityData.repulsion == 'boolean') {
        meta.repulsion = entityData.repulsion;
      }
      return {
        type: 'BLACK_HOLE',
        // isSensor: true,
        position: {
          x: entityData.position.x,
          y: entityData.position.y
        },
        meta: meta,
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
      var rules = game.createSutra();
      rules.addCondition('gravityTick', function (entity, gameState) {
        return gameState.tick % 5 === 0;
      });
      rules["if"]('gravityTick').then('applyGravity');
      rules.on('applyGravity', function (entityData, node, gameState) {
        Object.keys(gameState.ents._).forEach(function (eId) {
          var entity = gameState.ents._[eId];
          if (entity.id !== entityData.id && !entity.destroyed) {
            var gravityWell = gameState.ents._[entityData.id];
            if (gravityWell) {
              _this.game.applyGravity(gravityWell, entity, _this.GRAVITATIONAL_CONSTANT, gravityWell.meta.repulsion);
            }
          }
        });
      });
      return rules;
    }
  }]);
  return GravityWell;
}();
_defineProperty(GravityWell, "id", 'blackhole');
_defineProperty(GravityWell, "type", 'sutra');

},{}]},{},[1])(1)
});

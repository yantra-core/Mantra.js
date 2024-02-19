(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Player = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Player.js - Marak Squires 2024
var Player = exports["default"] = /*#__PURE__*/function () {
  function Player() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Player);
    this.id = Player.id;
  }
  _createClass(Player, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('player', this);
    }
  }, {
    key: "build",
    value: function build() {
      var playerConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof playerConfig.position === 'undefined') {
        playerConfig.position = {
          x: 0,
          y: 0
        };
      }
      if (typeof playerConfig.position === 'undefined') {
        playerConfig.position = {
          x: 0,
          y: 0,
          z: 1
        };
      }
      if (playerConfig.texture === 'none') {
        delete playerConfig.texture;
      }
      if (typeof playerConfig.rotation !== 'number') {
        playerConfig.rotation = 0;
      }
      if (typeof playerConfig.texture === 'undefined' && playerConfig.texture !== null) {
        playerConfig.texture = {
          sheet: 'loz_spritesheet',
          sprite: 'player'
        };
      }
      if (typeof playerConfig.lives === 'number') {
        playerConfig.meta = playerConfig.meta || {};
        playerConfig.meta.lives = playerConfig.lives;
      }
      var that = this;
      return {
        name: playerConfig.name,
        type: 'PLAYER',
        shape: 'triangle',
        rotation: playerConfig.rotation,
        collisionActive: true,
        collisionStart: true,
        collisionEnd: true,
        width: playerConfig.width || 16,
        height: playerConfig.height || 16,
        color: playerConfig.color,
        radius: playerConfig.radius,
        texture: playerConfig.texture,
        afterRemoveEntity: function afterRemoveEntity(entity) {
          // check to see if has any lives left
          if (entity.meta && typeof entity.meta.lives === 'number' && entity.meta.lives > 0) {
            // creates the same player again with the same config
            // TODO: better merging of player config, copy some of "entity" and some of "playerConfig"
            var respawnedPlayer = game.createEntity(that.build({
              lives: entity.meta.lives - 1
            }));
            game.setPlayerId(respawnedPlayer.id);
          }
        },
        mass: 222,
        meta: playerConfig.meta,
        // sutra: topdown(game), // TODO: replace with more comprehensive player sutra with sprites and item actions
        friction: 0.5,
        // Default friction
        frictionAir: 0.5,
        // Default air friction
        frictionStatic: 1,
        // Default static friction
        // color: 0x00ff00,
        position: playerConfig.position
        // sutra: playerConfig.sutra,
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
      // Create the Player entity
      var player = game.createEntity(this.build(entityData));
    }
  }, {
    key: "sutra",
    value: function sutra() {
      // no default player sutras ( yet )
    }
  }]);
  return Player;
}();
_defineProperty(Player, "id", 'player');

},{}]},{},[1])(1)
});

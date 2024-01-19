(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Bomb = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Bomb.js - Marak Squires 2024
var Bomb = /*#__PURE__*/function () {
  function Bomb() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Bomb);
    this.id = Bomb.id;
    this.bombCount = 0;
    this.speed = config.speed || 0.3; // or 22?
    this.direction = config.direction || {
      x: 0,
      y: 1
    };
    this.damage = config.damage || 30;
    this.lifetime = config.lifetime || 2000;
    this.fireRate = config.fireRate || 400;
  }
  _createClass(Bomb, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('bomb', this);
    }
  }, {
    key: "update",
    value: function update() {

      // for each bomb, check if it's expired
      // if so, remove it
    }
  }, {
    key: "dropBomb",
    value: function dropBomb(entityId) {
      var entity = this.game.getEntity(entityId);
      if (!entity) {
        console.log('Bomb.dropBomb no entity found for id', entityId);
        return;
      }
      var actionRateLimiterComponent = this.game.components.actionRateLimiter;
      var lastFired = actionRateLimiterComponent.getLastActionTime(entityId, 'dropBomb');
      var currentTime = Date.now();
      if (currentTime - lastFired < this.fireRate) {
        // console.log('Rate limit hit for entity', entityId, ', cannot fire yet');
        return;
      }
      actionRateLimiterComponent.recordAction(entityId, 'dropBomb');
      var playerPos = entity.position;
      var playerRotation = entity.rotation; // in radians

      if (!playerPos) {
        // client might not have the position or rotation component, don't client-side predict
        console.log('no player data available');
        return;
      }
      // Distance in front of the player where the bomb should start
      var distanceInFront = 16; // TODO: make this a config

      if (typeof entity.radius !== 'undefined') {
        entity.width = entity.radius * 2;
        entity.height = entity.radius * 2;
      }
      var playerOffsetX = entity.width / 2; // Adjust this value to align the bomb properly
      var playerOffsetY = entity.height / 2; // Adjust this value to align the bomb properly

      playerOffsetX = 0;
      playerOffsetY = 0;
      if (typeof playerRotation === 'undefined') {
        playerRotation = 0; // this should have a default
      }

      // convert to 3d if rotation object
      if (_typeof(playerRotation) === 'object') {
        playerRotation = playerRotation.z;
      }

      // Compute the bomb's direction based on player's rotation
      var directionX = Math.sin(playerRotation);
      var directionY = -Math.cos(playerRotation);

      // Place the bomb in front of the player
      var bombStartPosition = {
        x: playerPos.x + playerOffsetX + distanceInFront * Math.sin(playerRotation),
        y: playerPos.y + playerOffsetY + distanceInFront * -Math.cos(playerRotation)
        //z: 10
      };

      this.bombCount++;
      var bombDirectionConfig = {
        type: 'BOMB',
        mass: 10000,
        collisionStart: true,
        position: bombStartPosition,
        lifetime: this.lifetime,
        friction: 0.5,
        frictionStatic: 0.5,
        frictionAir: 0.01,
        //texture: 'tile-block',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'bomb',
          playing: false
        },
        owner: entityId,
        rotation: 0,
        //color: entity.bombColor || 0x000000,
        velocity: {
          x: directionX * this.speed,
          y: directionY * this.speed
        },
        height: 16,
        width: 16,
        damage: 10 // TODO: make this a config
      };
      // console.log('using bombDirectionConfig', bombDirectionConfig)
      this.game.createEntity(bombDirectionConfig);
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;
        var entityA = this.game.getEntity(entityIdA);
        var entityB = this.game.getEntity(entityIdB);

        // entityA is player ( for now )
        // console.log('types', entityA.type, entityB.type);
        if (!entityA || !entityB) {
          //console.log('Bomb.handleCollision no entity found. Skipping...', entityA, entityB);
          return;
        }
      }
    }
  }]);
  return Bomb;
}();
_defineProperty(Bomb, "id", 'bomb');
var _default = exports["default"] = Bomb;

},{}]},{},[1])(1)
});

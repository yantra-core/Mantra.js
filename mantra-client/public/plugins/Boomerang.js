(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Boomerang = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Boomerang.js - Marak Squires 2024
var Boomerang = /*#__PURE__*/function () {
  function Boomerang() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Boomerang);
    this.id = Boomerang.id;
    this.speed = config.speed || 3.3; // Speed at which the boomerang travels
    this.returnSpeed = config.returnSpeed || 0.01; // Speed at which the boomerang returns
    this.direction = config.direction || {
      x: 1,
      y: 0
    }; // Initial direction
    this.damage = config.damage || 20; // Damage dealt by the boomerang
    this.range = config.range || 30; // Maximum distance the boomerang can travel before returning
    this.catchBoomerangTickDelay = 33; // minimum number of ticks before the boomerang can be caught
    this.isReturning = false; // State to track if the boomerang is returning
    this.ownerId = null; // The entity ID of the boomerang's owner
  }
  _createClass(Boomerang, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('boomerang', this);
    }
  }, {
    key: "update",
    value: function update() {
      // TODO: we can perform this check less frequently
      // Iterate through all boomerang entities in the game data
      if (this.game.data.ents.BOOMERANG) {
        for (var eId in this.game.data.ents.BOOMERANG) {
          var boomerang = this.game.data.ents.BOOMERANG[eId];
          // Update each boomerang's position and check return conditions
          if (!boomerang.isReturning && this.hasReachedMaxRange(boomerang)) {
            boomerang.isReturning = true;
          }
          if (boomerang.isReturning) {
            this.returnToOwner(boomerang);
          } else {
            this.moveForward(boomerang);
          }
        }
      }
    }
  }, {
    key: "hasReachedMaxRange",
    value: function hasReachedMaxRange(entity) {
      // Calculate if the boomerang has reached its maximum range
      var startingPosition = entity.startingPosition;
      var currentPosition = entity.position;
      var distance = Math.sqrt(Math.pow(currentPosition.x - startingPosition.x, 2) + Math.pow(currentPosition.y - startingPosition.y, 2));
      return distance >= this.range;
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;

        //const entityA = this.game.getEntity(entityIdA);
        //const entityB = this.game.getEntity(entityIdB);
        var entityA = bodyA.entity;
        var entityB = bodyB.entity;

        // do not process collisions for entities that player owners ( for now )
        // Check if entityA owns entityB or if entityB owns entityA
        if (entityA.owner === entityB.id || entityB.owner === entityA.id) {
          var boomerang = entityA.type === 'BOOMERANG' ? entityA : entityB;
          pair.isActive = false; // Deactivate collision processing for this pair
          var diff = game.tick - boomerang.ctick;
          if (diff > this.catchBoomerangTickDelay) {
            this.completeReturn(boomerang);
          }
          return;
        }
      }
    }
  }, {
    key: "returnToOwner",
    value: function returnToOwner(boomerang) {
      // Find the owner entity using the owner ID stored in the boomerang
      var ownerEntity = this.game.getEntity(boomerang.owner);
      if (ownerEntity) {
        var ownerPosition = ownerEntity.position;
        var currentPosition = boomerang.position;
        var directionToOwner = {
          x: ownerPosition.x - currentPosition.x,
          y: ownerPosition.y - currentPosition.y
        };
        var normalizedDirection = this.normalize(directionToOwner);

        // Increase the return speed gradually, up to a maximum value
        var maxReturnSpeed = 0.1; // Maximum return speed, adjust as needed
        var speedIncreaseFactor = 0.001; // Rate of speed increase per update, adjust as needed

        if (typeof boomerang.returnSpeed !== 'number') {
          boomerang.returnSpeed = this.returnSpeed;
        }
        // Increase the return speed, but don't exceed the maximum
        boomerang.returnSpeed = Math.min(boomerang.returnSpeed + speedIncreaseFactor, maxReturnSpeed);
        this.game.applyForce(boomerang.id, {
          x: normalizedDirection.x * boomerang.returnSpeed,
          y: normalizedDirection.y * boomerang.returnSpeed
        });
      }
    }
  }, {
    key: "moveForward",
    value: function moveForward(entity) {
      // Update the boomerang's position based on its current direction
      entity.position.x += this.direction.x * this.speed;
      entity.position.y += this.direction.y * this.speed;
    }
  }, {
    key: "normalize",
    value: function normalize(vector) {
      var magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      return {
        x: vector.x / magnitude,
        y: vector.y / magnitude
      };
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(entityA, entityB) {
      // Simple collision detection logic
      // This should be replaced with more accurate collision detection if necessary
      return Math.abs(entityA.position.x - entityB.position.x) < 10 && Math.abs(entityA.position.y - entityB.position.y) < 10;
    }
  }, {
    key: "completeReturn",
    value: function completeReturn(boomerang) {
      // Logic to handle the boomerang's return completion
      // For example, remove the boomerang entity or reset its state
      this.game.removeEntity(boomerang.id);
      boomerang.isReturning = false; // Reset the return state for the next use
    }
  }, {
    key: "throwBoomerang",
    value: function throwBoomerang(entityId) {
      var entity = this.game.getEntity(entityId);
      if (!entity) {
        console.log('Boomerang.throwBoomerang no entity found for id', entityId);
        return;
      }

      // check to see if any other boomerangs already exists with this owner
      if (this.game.data.ents.BOOMERANG) {
        for (var eId in this.game.data.ents.BOOMERANG) {
          var b = this.game.data.ents.BOOMERANG[eId];
          if (b.owner === entityId) {
            return;
          }
        }
      }
      var ownerId = entityId; // Set the owner of the boomerang

      var playerPos = entity.position;
      var playerRotation = entity.rotation; // in radians, if applicable

      // Initial boomerang position should be close to the player
      var boomerangstartingPosition = {
        x: playerPos.x + Math.sin(playerRotation) * 10,
        // Offset by 10 units in the direction of player's facing
        y: playerPos.y - Math.cos(playerRotation) * 10
      };
      var boomerangVelocity = {
        x: this.direction.x * this.speed,
        y: this.direction.y * this.speed
      };

      // adjust force for entity.rotation
      boomerangVelocity.x = Math.sin(playerRotation) * this.speed;
      boomerangVelocity.y = -Math.cos(playerRotation) * this.speed;
      boomerangstartingPosition.z = 4;
      var boomerangConfig = {
        type: 'BOOMERANG',
        height: 16,
        width: 16,
        position: boomerangstartingPosition,
        rotation: entity.rotation,
        // TODO: get the player's rotation
        speed: this.speed,
        // isSensor: true,
        owner: ownerId,
        velocity: boomerangVelocity,
        style: {
          zIndex: 99 // TODO: should not be need, should use position.z
        },

        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'boomerang',
          playing: true
        }
      };
      this.game.createEntity(boomerangConfig);
    }
  }]);
  return Boomerang;
}();
_defineProperty(Boomerang, "id", 'boomerang');
var _default = exports["default"] = Boomerang;

},{}]},{},[1])(1)
});

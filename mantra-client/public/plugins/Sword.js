(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Sword = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Sword.js
var Sword = /*#__PURE__*/function () {
  function Sword() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Sword);
    this.id = Sword.id;
    this.swingRate = config.swingRate || 10; // Time between swings
    this.damage = config.damage || 20; // Damage per swing
    this.swingDuration = config.swingDuration || 500; // Duration of swing animation
    this.range = config.range || 50; // Range of the sword swing
  }
  _createClass(Sword, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "update",
    value: function update() {
      // console.log(this.game.components.items)

      var currentPlayerId = this.game.currentPlayerId;
      var currentPlayer = this.game.getEntity(currentPlayerId);
      if (!currentPlayerId) {
        return;
      }

      // hard-coded for one entity ( for now )
      var equippedItems = this.game.components.items.get(currentPlayerId);
      if (!equippedItems) {
        return;
      }
      var swordId = equippedItems[0]; // for now
      var swordEntity = this.game.getEntity(swordId);
      if (swordEntity) {
        var ownerPosition = currentPlayer.position;
        var ownerRotation = currentPlayer.rotation || 0;
        var distanceInFront = currentPlayer.height / 2; // Adjust as needed

        // Update sword position
        swordEntity.position.x = ownerPosition.x + distanceInFront * Math.sin(ownerRotation);
        swordEntity.position.y = ownerPosition.y + distanceInFront * -Math.cos(ownerRotation);

        // Update sword rotation
        swordEntity.rotation = ownerRotation;
      }
    }
  }, {
    key: "sheathSword",
    value: function sheathSword(entityId) {
      var entity = this.game.getEntity(entityId);
      if (!entity || !entity.items || entity.items.length === 0) {
        return;
      }
      var swordId = entity.items[0]; // Assuming the first item is the sword
      this.game.removeEntity(swordId); // Remove the sword entity

      // Update the player's items array
      entity.items = entity.items.filter(function (item) {
        return item !== swordId;
      });
      this.game.updateEntity(entity); // Update the entity with the new items array
    }
  }, {
    key: "swingSword",
    value: function swingSword(entityId) {
      var entity = this.game.getEntity(entityId);
      var actionRateLimiterComponent = this.game.components.actionRateLimiter;
      var lastSwung = actionRateLimiterComponent.getLastActionTime(entityId, 'swingSword');
      var currentTime = Date.now();
      if (currentTime - lastSwung < this.swingRate) {
        console.log('Swing rate limit hit for entity', entityId, ', cannot swing yet');
        return;
      }
      actionRateLimiterComponent.recordAction(entityId, 'swingSword');
      var playerPos = entity.position;
      var playerRotation = entity.rotation || 0; // in radians

      if (!playerPos) {
        console.log('no player data available');
        return;
      }

      // Check if the player already has a sword
      var swordEntity;
      if (entity.items && entity.items.length > 0) {
        // Assume the first item is the sword
        swordEntity = this.game.getEntity(entity.items[0]);
      }
      if (!swordEntity) {
        // If no sword exists, create one
        var distanceInFront = entity.height; // Adjust as needed
        var swordStartPos = {
          x: playerPos.x + distanceInFront * Math.sin(playerRotation),
          y: playerPos.y + distanceInFront * -Math.cos(playerRotation)
        };
        var swordDirectionConfig = {
          type: 'SWORD',
          mass: 10,
          position: swordStartPos,
          lifetime: Infinity,
          owner: entityId,
          rotation: playerRotation,
          isSensor: true,
          color: entity.bulletColor || 0x000000,
          /*
          velocity: {
            x: directionX * this.speed,
            y: directionY * this.speed
          },
          */
          height: 48,
          // TODO: make this a config
          width: 16,
          // TODO: make this a config
          damage: 10 // TODO: make this a config
        };

        swordEntity = this.game.createEntity(swordDirectionConfig);
        entity.items = [swordEntity.id]; // Overwrites all items on equip
        this.game.updateEntity(entity);
      } else {
        // Update existing sword's position and rotation
        var _distanceInFront = entity.height; // Adjust as needed
        swordEntity.position.x = playerPos.x + _distanceInFront * Math.sin(playerRotation);
        swordEntity.position.y = playerPos.y + _distanceInFront * -Math.cos(playerRotation);
        swordEntity.rotation = playerRotation;
      }
      console.log("Entity ".concat(entityId, " swung a sword at position ").concat(playerPos.x, ", ").concat(playerPos.y));
    }
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      // Handle collision logic for the sword
      // This could involve checking if the sword entity has collided with an NPC or other entities
      // and then applying damage or other effects accordingly

      // For simplicity, let's just log a message
      console.log('Sword collision detected:', pair);
    }
  }]);
  return Sword;
}();
_defineProperty(Sword, "id", 'sword');
var _default = exports["default"] = Sword;

},{}]},{},[1])(1)
});

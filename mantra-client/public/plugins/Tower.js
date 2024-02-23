(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tower = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Tower.js - Marak Squires 2024
var Tower = exports["default"] = /*#__PURE__*/function () {
  function Tower() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Tower);
    this.id = Tower.id;
    this.fireRate = config.fireRate || 100; // Time between shots in game ticks
    this.range = config.range || 200; // Range within which the tower can target and fire
    this.weaponType = config.weaponType || 'bullet'; // Default weapon type
  }
  _createClass(Tower, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.bindEvents();
      this.game.systemsManager.addSystem('tower', this);
    }
  }, {
    key: "build",
    value: function build() {
      var _this = this;
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      entityData.position = entityData.position || {
        x: 0,
        y: 0
      };

      // Define default configuration for unitConfig
      // const defaultBulletConfig = game.make().radius(8).build();
      var defaultBulletConfig = {
        radius: 8,
        velocoity: {
          x: 0,
          y: -2
        }
      };
      // entityData.meta = entityData.meta || {};
      // Combine the default configuration with the entityData
      var bulletConfig = _objectSpread(_objectSpread({}, defaultBulletConfig), entityData.bulletConfig);
      entityData.meta = entityData.meta || {};
      entityData.meta.bulletConfig = bulletConfig;
      if (typeof entityData.isShooting !== 'undefined') {
        // tower is shooting property
        entityData.meta.isShooting = entityData.isShooting;
      }
      console.log('bulletConfigbulletConfig', bulletConfig);
      return _objectSpread(_objectSpread({}, entityData), {}, {
        type: 'TOWER',
        texture: entityData.texture || 'towerSprite',
        meta: {
          bulletConfig: bulletConfig,
          fireRate: entityData.fireRate || this.fireRate,
          range: this.range,
          isShooting: entityData.meta.isShooting,
          weaponType: this.weaponType,
          lastFired: 0 // Game tick at which the last shot was fired
        },

        update: function update(entity) {
          /*
          if (!entity.meta.isShooting) {
            return;
          }
          */
          // shoot a bullet
          var fireRate = entity.meta.fireRate || _this.fireRate;
          // fireRate is in ms, convert to game ticks via game.fps
          //console.log('fireRate', fireRate)
          //tickRate = Math.round(tickRate);
          // console.log('tickRate', tickRate, this.game.tick, this.game.tick % tickRate)
          if (_this.game.tick % fireRate === 0) {
            /*
            if (entity.meta.unitConfig) {
              this.game.createEntity(entity.meta.unitConfig);
            } else {
              this.game.systems.bullet.fireBullet(entity.id);
            }
            */
            // console.log('entity.meta.bulletConfig', entity)
            _this.game.systems.bullet.fireBullet(entity.id, entity.meta.bulletConfig);
          }
          /*
          if (this.game.tick >= entityData.meta.lastFired + this.fireRate) {
            const target = this.findTargetWithinRange(entityData.position, this.range);
            if (target) {
              this.fireWeapon(entityData.position, target);
              entityData.meta.lastFired = this.game.tick;
            }
          }
          */
        },

        findTargetWithinRange: function findTargetWithinRange(position, range) {
          // Implement logic to find the nearest or most suitable target within range
          // This might involve iterating over enemy entities and calculating distances
          // Return the target entity or null if no target is found
        },
        fireWeapon: function fireWeapon(position, target) {
          // Create and configure the weapon entity based on the tower's weaponType
          // For example, if weaponType is 'missile', create a missile entity aimed at the target
          var weaponConfig = {
            position: _objectSpread({}, position),
            target: target.id
            // Additional weapon-specific configuration
          };

          _this.game.createEntity(_this.weaponType, weaponConfig); // Assuming game.createEntity can handle entity type and config
        }
      });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      // Bind necessary events for the Tower system
    }
  }]);
  return Tower;
}();
_defineProperty(Tower, "id", 'tower');

},{}]},{},[1])(1)
});

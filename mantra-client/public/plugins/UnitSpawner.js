(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).UnitSpawner = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// UnitSpawner.js - Marak Squires 2024
var UnitSpawner = exports["default"] = /*#__PURE__*/function () {
  function UnitSpawner() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, UnitSpawner);
    this.id = UnitSpawner.id;
    this.meta = {
      sprayAngle: Math.PI / 8 // Moved sprayAngle to UnitSpawner.meta
    };
  }
  _createClass(UnitSpawner, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.bindEvents();
      this.game.systemsManager.addSystem('unit-spawner', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var game = this.game;
      entityData.position = entityData.position || {
        x: 0,
        y: 0
      };
      var defaultUnitConfig = {
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 4,
          height: 4
        },
        friction: 0.05,
        frictionAir: 0.005,
        frictionStatic: 0.25,
        meta: {
          randomColor: true
        }
      };
      var unitConfig = _objectSpread(_objectSpread({}, defaultUnitConfig), entityData.unitConfig);
      unitConfig.afterRemoveEntity = function (ent) {
        var parentUnitSpawner = game.data.ents._[ent.owner];
        if (!parentUnitSpawner) {
          return;
        }
        parentUnitSpawner.meta.unitsSpawned -= 1;
        game.updateEntity(ent.owner, {
          meta: {
            unitConfig: parentUnitSpawner.meta.unitConfig
          }
        });
      };
      if (typeof entityData.meta === 'undefined') {
        entityData.meta = {};
      }
      var defaultMeta = {
        unitConfig: unitConfig,
        unitsSpawned: 0,
        // Initialize unitsSpawned
        maxUnits: 10,
        // Default max units
        sprayAngle: 0 // Reference sprayAngle from UnitSpawner.meta
      };

      if (typeof entityData.sprayAngle === 'number') {
        defaultMeta.sprayAngle = entityData.sprayAngle;
      }
      if (typeof entityData.maxUnits === 'number') {
        defaultMeta.maxUnits = entityData.maxUnits;
      }
      if (typeof entityData.unitsSpawned === 'number') {
        defaultMeta.unitsSpawned = entityData.unitsSpawned;
      }

      // combine entityData.meta with defaultMeta
      entityData.meta = _objectSpread(_objectSpread({}, defaultMeta), entityData.meta);
      console.log('using data', entityData);
      return _objectSpread({
        type: 'UNIT_SPAWNER',
        texture: entityData.texture || 'none',
        meta: entityData.meta,
        update: this.unitSpawnerUpdate.bind(this),
        size: {
          width: 16,
          height: 16,
          depth: 16
        },
        position: entityData.position
      }, entityData);
    }
  }, {
    key: "unitSpawnerUpdate",
    value: function unitSpawnerUpdate(entityData) {
      var unitConfig = entityData.meta.unitConfig;
      if (this.game.tick % 10 === 0 && entityData.meta.unitsSpawned < entityData.meta.maxUnits) {
        var position = entityData.position;
        unitConfig.position = position;
        unitConfig.owner = entityData.id;
        delete unitConfig.id;
        unitConfig.color = entityData.color;
        if (unitConfig.meta.randomColor) {
          unitConfig.color = this.game.randomColor();
        }
        var unit = this.createEntity(unitConfig);
        if (unit) {
          entityData.meta.unitsSpawned += 1;
          this.applySprayForce(unit, entityData.meta.sprayAngle); // Use sprayAngle from entityData.meta
          this.game.updateEntity(entityData.id, {
            color: unitConfig.color,
            meta: {
              unitConfig: unitConfig
            }
          });
        }
      }
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
      return this.game.createEntity(this.build(entityData));
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.createEntity(entityData);
    }
  }, {
    key: "applySprayForce",
    value: function applySprayForce(unitConfig, sprayAngle) {
      var sprayWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.PI / 4;
      var forceMagnitude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
      var game = this.game;
      var angleOffset = (Math.random() - 0.5) * sprayWidth;
      var angle = sprayAngle + angleOffset;
      var force = {
        x: forceMagnitude * Math.cos(angle),
        y: forceMagnitude * Math.sin(angle)
      };
      game.applyForce(unitConfig.id, force);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {}
  }]);
  return UnitSpawner;
}();
_defineProperty(UnitSpawner, "id", 'unit-spawner');

},{}]},{},[1])(1)
});

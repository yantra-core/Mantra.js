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
      // Ensure entityData has a position property
      entityData.position = entityData.position || {
        x: 0,
        y: 0
      };

      // Define default configuration for unitConfig
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
        sprayAngle: Math.PI / 8
      };

      // entityData.meta = entityData.meta || {};
      // Combine the default configuration with the entityData
      var unitConfig = _objectSpread(_objectSpread({}, defaultUnitConfig), entityData.unitConfig);

      // console.log('unitConfig', unitConfig)
      // Return the combined entity configuration
      return {
        type: 'UNIT_SPAWNER',
        texture: entityData.texture || 'none',
        meta: {
          unitConfig: unitConfig
        },
        update: this.unitSpawnerUpdate.bind(this),
        size: {
          width: 16,
          height: 16,
          depth: 16
        },
        position: entityData.position
      };
    }
  }, {
    key: "unitSpawnerUpdate",
    value: function unitSpawnerUpdate(entityData) {
      if (this.game.tick % 10 === 0) {
        // check for any unit-spawner entities
        // get current position of ent from reference
        var position = entityData.position;
        entityData.meta.unitConfig.position = position;
        delete entityData.meta.unitConfig.id; // Remark: Clean clone might be better
        var unit = this.createEntity(entityData.meta.unitConfig || {});
        this.applySprayForce(unit);
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

      // Create the UnitSpawner entity
      var unitSpawner = game.createEntity(this.build(entityData));
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return game.createEntity(this.build(entityData));
    }
  }, {
    key: "applySprayForce",
    value: function applySprayForce(unitConfig) {
      var baseAngle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.PI / 8;
      var sprayWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.PI / 4;
      var forceMagnitude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
      var angleOffset = (Math.random() - 0.5) * sprayWidth; // Random offset within a specified width
      var angle = unitConfig.sprayAngle + angleOffset;
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
/*
// fount.js - Marak Squires 2023
// Sutra for Generating Units
export default function fountSutra(game, entityId, sprayConfig = { collisionStart : false, collisionEnd : false, collisionActive : false }) {

  let rules = game.createSutra();

  // TODO: custom unit configs for Fount
  // Default configuration for the Fount
  const settings = {
    unitType: 'PARTICLE', // Type of unit to generate
    collisionActive: false, // Whether or not the unit will emit collisionActive actives ( performance hit )
    texture: 'pixel', // Texture for the unit
    color: 0x00ff00, // Color of the unit
    unitSize: { width: 4, height: 4 }, // Size of the unit
    sprayAngle: Math.PI / 8, // Angle of the spray arc (in radians)
    sprayWidth: Math.PI / 4, // Width of the spray arc (in radians)
    forceMagnitude: 0.5, // Magnitude of the force applied to each unit
    ...sprayConfig
  };

  // Function to create a unit
  function createUnit(position) {
    let rgbColor = settings.color;
    // convert from int to rgb
    rgbColor = [(rgbColor >> 16) & 255, (rgbColor >> 8) & 255, rgbColor & 255];
    let rgbColorString = `rgba(${rgbColor.join(',')}, 0.5)`; // Adjust opacity as needed
    return game.createEntity({
      type: settings.unitType,
      collisionActive: sprayConfig.collisionActive,
      collisionEnd: sprayConfig.collisionEnd,
      collisionStart: sprayConfig.collisionStart,
      // texture: settings.texture,
      height: settings.unitSize.height,
      color: settings.color,
      width: settings.unitSize.width,
      position: position,
      friction: 0.05,
      frictionAir: 0.005,
      frictionStatic: 0.25,
      style: {
        backgroundColor: rgbColorString
      },
      isSensor: true
    });
  }

  function applySprayForce(unit, baseAngle = settings.sprayAngle) {
    const angleOffset = (Math.random() - 0.5) * settings.sprayWidth; // Random offset within a specified width
    const angle = baseAngle + angleOffset;
  
    const force = {
      x: settings.forceMagnitude * Math.cos(angle),
      y: settings.forceMagnitude * Math.sin(angle)
    };
    game.applyForce(unit.id, force);
  }
  
  // Rule for generating and spraying units
  rules.if('fountTick').then('fountSpray');
  rules.addCondition('fountTick', (entity, gameState) => entity.id === entityId && gameState.tick % 10 === 0);
  
  rules.on('fountSpray', (context, node, gameState) => {
    // Determine the position of the fount (can be context-dependent)
    const fountPosition = (typeof context !== 'undefined') ? context.position : { x: 0, y: 0 };
    // Create a unit and apply force
    const unit = createUnit(fountPosition);
    applySprayForce(unit);
  });

  return rules;
}
*/
_defineProperty(UnitSpawner, "id", 'unit-spawner');

},{}]},{},[1])(1)
});

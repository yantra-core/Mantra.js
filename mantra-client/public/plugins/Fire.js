(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Fire = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Fire.js - Marak Squires 2023
var Fire = exports["default"] = /*#__PURE__*/function () {
  function Fire() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Fire);
    this.id = Fire.id;
  }
  _createClass(Fire, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.bindEvents();
      this.game.systemsManager.addSystem('fire', this);
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
        type: 'FIRE',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'fire'
          // frame: 0 // TODO: support single frame / bypass animation of array
        },

        //texture: 'fire',
        //color: 0xff0000,
        collisionStart: this.touchedFire,
        width: 16,
        height: 16,
        depth: 16,
        isStatic: true,
        position: {
          x: -80,
          y: -60,
          z: 16
        }
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

      // Create the Fire entity
      var fire = game.createEntity(this.build(entityData));
    }
  }, {
    key: "touchedFire",
    value: function touchedFire(a, b, pair, context) {
      // fire will not affect itself
      console.log('touchedFire', context);
      if (context.owner.owner !== context.target.id) {
        game.removeEntity(context.target.id);
      }
    }
  }, {
    key: "sutra",
    value: function sutra() {
      /*
      let rules = game.createSutra();
       rules.addCondition('entityTouchedFire', (entity, gameState) => {
        if (entity.type === 'COLLISION' && entity.kind === 'START') {
          if (entity.bodyA.type === 'FIRE') {
            return true;
          }
          if (entity.bodyB.type === 'FIRE') {
            return true;
          }
        }
      });
         rules
        .if('entityTouchedFire')
        .then('playNote', {
          note: 'F#4'
        })
        .then('damageEntity');
         rules.on('damageEntity', (collision) => {
        let ent;
        if (collision.bodyA.type === 'FIRE') {
          ent = collision.bodyB;
        } else {
          ent = collision.bodyA;
        }
        // create a copy of the entity previous texture
        // TODO: remove the createDefaultPlayer() call here
        //       and instead have a game.on('player::death') event
        //       listening in parent Sutra
        let texture = ent.texture;
        game.removeEntity(ent.id);
        if (ent.type === 'PLAYER') {
          game.currentPlayerId = null;
          game.createDefaultPlayer({
            texture
          });
        }
      });
       
      return rules;
      */
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      // TODO: move pointerDown event into Sutra
      game.on('pointerDown', function (entity, ev) {
        if (entity.type === 'FIRE') {
          game.playNote('G4');
        }
      });
    }
  }, {
    key: "update",
    value: function update() {}
  }]);
  return Fire;
}();
_defineProperty(Fire, "id", 'fire');
_defineProperty(Fire, "type", 'sutra');

},{}]},{},[1])(1)
});

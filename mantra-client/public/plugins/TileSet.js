(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).TileSet = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// TileSet.js - Marak Squires 2024
var TileSet = exports["default"] = /*#__PURE__*/function () {
  function TileSet() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TileSet);
    this.id = TileSet.id;
  }
  _createClass(TileSet, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // this.game.use(new Tile());
      this.game.systemsManager.addSystem('tileset', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0,
          z: 0
        };
      }
      if (typeof entityData.position.z === 'undefined') {
        entityData.position.z = 0;
      }
      var defaultTileSet = [
      /*
      VOID: 0,
      FLOOR: 1,
      WALL: 2,
      DOOR: 3,
      SPECIAL_DOOR: 4,
      ENTER: 5,
      EXIT: 6
      */
      // void
      {
        id: 0,
        kind: 'empty'
      },
      // wall
      {
        id: 1,
        kind: 'bush',
        texture: 'tile-grass',
        body: true,
        isStatic: true,
        customZ: true,
        z: 16
      }, {
        id: 2,
        kind: 'grass'
      }, {
        id: 3,
        kind: 'block',
        type: 'BLOCK',
        body: true,
        z: 16
      }, {
        id: 4,
        kind: 'path-green'
      }, {
        id: 5,
        kind: 'entrance',
        texture: 'tile-entrance'
      }, {
        id: 6,
        kind: 'exit',
        texture: 'tile-exit',
        body: true,
        isStatic: true,
        isSensor: true
      } // exit
      ];

      var meta = entityData.meta || {};
      meta.tileSet = meta.tileSet || entityData.tileSet || defaultTileSet;
      return {
        type: 'TILESET',
        meta: meta,
        name: entityData.name || 'No TileSet Name Set',
        position: entityData.position,
        data: entityData.data || []
      };
    }

    // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }
      // Create the TileSet entity
      var tileMap = game.createEntity(this.build(entityData));
    }
  }]);
  return TileSet;
}();
_defineProperty(TileSet, "id", 'tileset');

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Block = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Block.js - Marak Squires 2023
var Block = /*#__PURE__*/function () {
  function Block() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$MIN_BLOCK_SIZE = _ref.MIN_BLOCK_SIZE,
      MIN_BLOCK_SIZE = _ref$MIN_BLOCK_SIZE === void 0 ? 50 : _ref$MIN_BLOCK_SIZE,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 40 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 40 : _ref$height;
    _classCallCheck(this, Block);
    this.id = Block.id;
    // Assuming the config includes width and height properties
    this.width = width; // Default size if none provided
    this.height = height; // Default size if none provided
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
    this.splits = 0;
    this.rgbColorsInts = [0x0000ff,
    // Blue
    // 0x00ff00,  // Green
    // 0xff0000,  // Red
    0xffff00,
    // Yellow
    0x00ffff,
    // Cyan (a shade of Blue-Green, not in ROYGBIV)
    0xff00ff,
    // Magenta (a shade of Red-Violet, not in ROYGBIV)
    0xffa500,
    // Orange
    0x4b0082,
    // Indigo
    0x8a2be2 // Violet
    ];
  }
  _createClass(Block, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('block', this);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;
        var entityA = this.game.entities.get(entityIdA);
        var entityB = this.game.entities.get(entityIdB);
        if (!entityA || !entityB) {
          console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
          return;
        }
        if (entityA.type === 'BLOCK' && entityB.type === 'BULLET') {
          this.blockBulletCollision(entityIdA, entityIdB, entityA, entityB);
        }
        if (entityA.type === 'BULLET' && entityB.type === 'BLOCK') {
          this.blockBulletCollision(entityIdB, entityIdA, entityB, entityA);
        }
      }
    }

    // TODO: add option to cancel collision pairs
    // TODO: move the block splitting logic into separate function
  }, {
    key: "blockBulletCollision",
    value: function blockBulletCollision(entityIdA, entityIdB, entityA, entityB) {
      if (this.game.mode === 'local' || !this.game.isClient) {
        if (entityA.destroyed || entityB.destroyed) {
          return;
        }

        // console.log("Block.handleCollision", entityIdA, entityIdB, entityA, entityB)
        this.game.removeEntity(entityIdB);
        if (entityA.width * entityA.height <= this.MIN_BLOCK_SIZE || entityA.splits >= Block.MAX_SPLITS) {
          this.game.removeEntity(entityIdA);
          return;
        }
        var newWidth = entityA.width / 2;
        var newHeight = entityA.height / 2;
        var newSplits = entityA.splits + 1;

        // TODO: could we move this into a sutra rule instead?
        for (var i = 0; i < 4; i++) {
          var newColor = this.rgbColorsInts[Math.floor(Math.random() * this.rgbColorsInts.length)];
          var xOffset = i % 2 * newWidth;
          var yOffset = Math.floor(i / 2) * newHeight;
          this.game.createEntity({
            type: entityA.type,
            position: {
              x: entityA.position.x + xOffset,
              y: entityA.position.y + yOffset,
              z: entityA.position.z
            },
            velocity: {
              x: (Math.random() * 2 - 1) * 10,
              // Adjusted for less extreme velocities
              y: (Math.random() * 2 - 1) * 10
            },
            // inherit color from parent
            texture: entityA.texture,
            isSensor: entityA.isSensor,
            // color: newColor,
            width: newWidth,
            height: newHeight,
            splits: newSplits,
            //friction: 0.5,
            frictionAir: 0.2
            //frictionStatic: 0.5,
            // TODO: needs to inherit other properties from parent such as frictoin
          });
        }

        this.game.removeEntity(entityIdA);
      }
    }
  }]);
  return Block;
}();
_defineProperty(Block, "id", 'block');
var _default = exports["default"] = Block;

},{}]},{},[1])(1)
});

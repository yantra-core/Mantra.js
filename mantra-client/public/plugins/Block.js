(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Block = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Block.js - Marak Squires 2023
var Block = /*#__PURE__*/function () {
  // Assuming a max split limit

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
    this.width = width;
    this.height = height;
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
    this.splits = 0;
    this.rgbColorsInts = [0x0000ff,
    // Blue
    0xffff00,
    // Yellow
    0x00ffff,
    // Cyan
    0xff00ff,
    // Magenta
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
    key: "build",
    value: function build() {
      var _this = this;
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }
      return _objectSpread({
        type: 'BLOCK',
        texture: entityData.texture || 'tile-block',
        size: entityData.size || {
          width: this.width,
          height: this.height
        },
        position: entityData.position,
        collisionStart: function collisionStart(a, b, pair, context) {
          return _this.splitBlock(a, b, pair, context);
        }
      }, entityData);
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.game.createEntity(this.build(entityData));
    }
  }, {
    key: "splitBlock",
    value: function splitBlock(a, b, pair, context) {
      if (context.target.type !== 'BULLET') {
        return;
      }
      var blockEntity = this.game.data.ents._[context.owner.id];
      var bulletEntity = this.game.data.ents._[context.target.id];
      if (!blockEntity || !bulletEntity) {
        // console.log('Block.splitBlock no entity found. Skipping...', blockEntity, bulletEntity);
        return;
      }
      if (blockEntity.destroyed || bulletEntity.destroyed) {
        return;
      }
      this.game.removeEntity(bulletEntity.id);
      if (blockEntity.width * blockEntity.height <= this.MIN_BLOCK_SIZE || blockEntity.splits >= Block.MAX_SPLITS) {
        this.game.removeEntity(blockEntity.id);
        return;
      }
      var newWidth = blockEntity.width / 2;
      var newHeight = blockEntity.height / 2;
      var newSplits = blockEntity.splits + 1;
      for (var i = 0; i < 4; i++) {
        var xOffset = i % 2 * newWidth;
        var yOffset = Math.floor(i / 2) * newHeight;
        var newPosition = {
          x: blockEntity.position.x + xOffset,
          y: blockEntity.position.y + yOffset,
          z: blockEntity.position.z
        };

        // Use the builder pattern and ensure collisionStart is set on the new block
        this.create({
          position: newPosition,
          velocity: {
            x: (Math.random() * 2 - 1) * 10,
            y: (Math.random() * 2 - 1) * 10
          },
          size: {
            width: newWidth,
            height: newHeight
          },
          splits: newSplits,
          frictionAir: 0.2,
          color: blockEntity.color,
          lifetime: blockEntity.lifetime
        });
      }
      this.game.removeEntity(blockEntity.id);
    }
  }]);
  return Block;
}();
_defineProperty(Block, "id", 'block');
_defineProperty(Block, "MAX_SPLITS", 4);
var _default = exports["default"] = Block;

},{}]},{},[1])(1)
});

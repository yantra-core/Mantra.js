(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Platform = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
//import Prando from 'prando';
var Platform = /*#__PURE__*/function () {
  function Platform() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 40 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 40 : _ref$height,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 10 : _ref$depth;
    _classCallCheck(this, Platform);
    this.id = Platform.id;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.kinds = ['solid', 'trampoline', 'rubber', 'jello', 'mollasas', 'ice', 'linoleum', 'flypaper', 'sandpaper'];
  }
  _createClass(Platform, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "build",
    value: function build() {
      var platformData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // Define default values
      var defaults = {
        type: 'PLATFORM',
        hasInventory: false,
        isStatic: true
      };

      // Merge defaults with entityData, ensuring nested objects like position and velocity are merged correctly
      var mergedConfig = _objectSpread(_objectSpread(_objectSpread({}, defaults), platformData), {}, {
        position: _objectSpread(_objectSpread({}, defaults.position), platformData.position),
        texture: _objectSpread(_objectSpread({}, defaults.texture), platformData.texture),
        style: _objectSpread(_objectSpread({}, defaults.style), platformData.style)
      });

      // Return the merged configuration
      return mergedConfig;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "generatePlatforms",
    value: function generatePlatforms(worker, count) {}
  }, {
    key: "createPlatform",
    value: function createPlatform(entityData) {}
  }, {
    key: "handleCollision",
    value: function handleCollision(pair, bodyA, bodyB) {
      if (bodyA.myEntityId && bodyB.myEntityId) {
        var entityIdA = bodyA.myEntityId;
        var entityIdB = bodyB.myEntityId;
        var entityA = this.game.entities.get(entityIdA);
        var entityB = this.game.entities.get(entityIdB);
        if (!entityA || !entityB) {
          console.log('Platform.handleCollision no entity found. Skipping...', entityA, entityB);
          return;
        }
        if (entityA.type === 'PLATFORM' && entityB.type === 'PLAYER') {
          this.platformPlayerCollision(entityIdA, entityIdB, entityA, entityB);
        }
        if (entityA.type === 'PLAYER' && entityB.type === 'PLATFORM') {
          this.platformPlayerCollision(entityIdB, entityIdA, entityB, entityA);
        }
      }
    }
  }, {
    key: "platformPlayerCollision",
    value: function platformPlayerCollision(entityIdA, entityIdB, entityA, entityB) {
      // console.log('platformPlayerCollision', entityIdA, entityIdB, entityA, entityB);
    }
  }]);
  return Platform;
}();
_defineProperty(Platform, "id", 'platform');
var _default = exports["default"] = Platform;

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).BabylonStarField = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var gameTick = 0;
var BabylonStarField = /*#__PURE__*/function () {
  function BabylonStarField() {
    var starCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5000;
    var fieldSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    _classCallCheck(this, BabylonStarField);
    this.id = BabylonStarField.id;
    this.starCount = starCount;
    this.fieldSize = fieldSize;
    this.particles = [];
  }
  _createClass(BabylonStarField, [{
    key: "init",
    value: function init(game, engine, scene) {
      this.scene = scene;
      this.camera = scene.cameras[0];
      this.initialize(); // TODO: rename
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var _this = this;
      var self;
      if (typeof BABYLON === 'undefined' || typeof this.scene === 'undefined') {
        setTimeout(function () {
          self.initialize();
        }, 10);
        return;
      }
      var pcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene);
      this.pcs = pcs;
      pcs.addPoints(this.starCount, function (particle, i) {
        particle.position.x = Math.random() * _this.fieldSize - _this.fieldSize / 2;
        particle.position.y = Math.random() * _this.fieldSize - _this.fieldSize / 2;
        particle.position.z = Math.random() * _this.fieldSize - _this.fieldSize / 2;
      });
      pcs.buildMeshAsync().then(function () {
        _this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
      });
      this.particles = pcs.particles;
      this.scene.registerBeforeRender(function () {
        return _this.updateStars();
      });
    }
  }, {
    key: "updateStars",
    value: function updateStars() {
      var _this2 = this;
      if (!this.camera) {
        // if there is no camera, do not move the stars
        console.log('this.camera was not found in StarField.updateStars, returning early');
        return;
      }
      var halfFieldSize = this.fieldSize / 2;
      this.pcs.updateParticle = function (particle) {
        ['x', 'y', 'z'].forEach(function (axis) {
          if (particle.position[axis] - _this2.camera.position[axis] > halfFieldSize) {
            // Particle has exited positive side, reposition on negative side with buffer
            particle.position[axis] -= _this2.fieldSize - 10; // 10 units buffer to avoid sudden gaps
          } else if (particle.position[axis] - _this2.camera.position[axis] < -halfFieldSize) {
            // Particle has exited negative side, reposition on positive side with buffer
            particle.position[axis] += _this2.fieldSize - 10; // 10 units buffer to avoid sudden gaps
          }
        });

        return true; // Return true to update the particle in the system
      };

      this.pcs.setParticles();
    }
  }]);
  return BabylonStarField;
}();
_defineProperty(BabylonStarField, "id", 'babylon-starfield');
_defineProperty(BabylonStarField, "removable", false);
var _default = exports["default"] = BabylonStarField;

},{}]},{},[1])(1)
});

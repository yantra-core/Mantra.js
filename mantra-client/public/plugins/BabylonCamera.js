(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).BabylonCamera = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var BabylonCamera = /*#__PURE__*/function () {
  function BabylonCamera(_ref) {
    var camera = _ref.camera;
    _classCallCheck(this, BabylonCamera);
    this.id = BabylonCamera.id;
    this.startingZoom = camera.startingZoom;
    // config scope for convenience
    var config = {
      camera: camera
    };
    this.config = config;
  }
  _createClass(BabylonCamera, [{
    key: "init",
    value: function init(game, engine, scene) {
      this.scene = scene;
      this.game = game;
      this.engine = engine;

      // Store the initial values
      this.initialDistance = 2560;
      this.initialAlpha = 0;
      this.initialBeta = 0.35;

      // Set up the camera
      this.camera = new BABYLON.ArcRotateCamera("camera", this.initialAlpha, this.initialBeta, this.initialDistance, new BABYLON.Vector3(0, 0, 0), this.scene);
      game.camera = this.camera;
      this.game.systemsManager.addSystem(this.id, this);

      // this.camera.attachControl(document.getElementById('renderCanvas'), true);
      // Setup custom camera controls
      this.setupCameraControls();

      // Configuring full 360-degree rotation
      this.camera.upperBetaLimit = Math.PI;
      this.camera.lowerBetaLimit = 0;
      this.camera.upperAlphaLimit = null;
      this.camera.lowerAlphaLimit = null;

      // Camera zoom limits
      this.camera.minZ = 0.1;
      this.camera.maxZ = 20000;
      this.camera.lowerRadiusLimit = 50;
      this.camera.upperRadiusLimit = 2560 * 4 * 6; // 61440

      // Adjust wheelPrecision for more zoom per scroll
      this.camera.wheelPrecision = 0.5;

      //   Rotate the camera by -Math.PI / 2
      this.camera.alpha += Math.PI / 2;
      this.camera.radius = 2560 * this.startingZoom;
      //alert(this.camera.radius)
      //console.log('this.camera.radiusthis.camera.radiusthis.camera.radius', this.camera.radius)
    }
  }, {
    key: "setupCameraControls",
    value: function setupCameraControls() {
      // Detach default controls
      this.camera.attachControl(document.getElementById('gameHolder'), false);

      // Disable the keys for camera control
      this.camera.inputs.attached.keyboard.keysUp = []; // Disable UP arrow key
      this.camera.inputs.attached.keyboard.keysDown = []; // Disable DOWN arrow key
      this.camera.inputs.attached.keyboard.keysLeft = []; // Disable LEFT arrow key
      this.camera.inputs.attached.keyboard.keysRight = []; // Disable RIGHT arrow key

      // this.camera.inputs.attached.pointers.buttons = [1, -1, -1];
      this.camera._panningMouseButton = 0;
    }
  }, {
    key: "setupCameraControlsManual",
    value: function setupCameraControlsManual() {
      // Detach default controls from the canvas
      this.camera.detachControl(this.scene.getEngine().getRenderingCanvas());

      // Attach wheel event listener to gameHolder
      var gameHolder = document.getElementById('gameHolder');
      gameHolder.addEventListener('wheel', this.onMouseWheel.bind(this), {
        passive: false
      });

      // Prevent default handling of wheel event on canvas
      var canvas = this.scene.getEngine().getRenderingCanvas();
      canvas.addEventListener('wheel', function (e) {
        return e.stopPropagation();
      }, {
        passive: false
      });
    }
  }, {
    key: "onMouseWheel",
    value: function onMouseWheel(e) {
      // Adjust this scale factor as needed
      var scaleFactor = 0.1;
      this.camera.radius -= e.deltaY * scaleFactor;

      // Prevent page scrolling
      e.preventDefault();
    }
  }, {
    key: "resetToHome",
    value: function resetToHome() {
      // Reset to initial values
      this.camera.alpha = this.initialAlpha;
      this.camera.beta = this.initialBeta;
      this.camera.radius = this.initialDistance;
    }
  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
  }, {
    key: "render",
    value: function render() {
      var game = this.game;
      if (this.config.camera && this.config.camera.follow) {
        var currentPlayer = this.game.getEntity(game.currentPlayerId);
        if (currentPlayer && currentPlayer.graphics) {
          var graphic = currentPlayer.graphics['graphics-babylon'];
          if (graphic) {
            // Interpolating camera position
            var smoothness = 1; // Value between 0 and 1, where 1 is instant

            switch (game.physics.dimension) {
              case 2:
                this.camera.target.x += (graphic.position.x - this.camera.target.x) * smoothness;
                this.camera.target.z += (graphic.position.z - this.camera.target.z) * smoothness;
                break;
              case 3:
                this.camera.target = graphic.position;
                break;
              default:
                throw new Error('Unknown physics dimensions, cannot update camera');
                break;
            }
          }
        }
      }
    }
  }, {
    key: "renderLerp",
    value: function renderLerp() {
      // TODO: use this instead on render(), uses built in lerp
      var game = this.game;
      if (this.config.camera && this.config.camera.follow) {
        var currentPlayer = this.game.getEntity(game.currentPlayerId);
        if (currentPlayer && currentPlayer.graphics) {
          var graphic = currentPlayer.graphics['graphics-babylon'];
          var smoothness = 1; // Value between 0 and 1, where 1 is instant

          if (graphic) {
            // Smooth camera follow using Vector3.Lerp
            var targetPosition = new BABYLON.Vector3(graphic.position.x, this.camera.target.y, graphic.position.z);
            this.camera.target = BABYLON.Vector3.Lerp(this.camera.target, targetPosition, smoothness);
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      // console.log('camera update')
      /*  // TODO: use this instead of the camera target?
          this.position = new BABYLON.Vector3(0, 500, -500);
          this.target = BABYLON.Vector3.Zero();
      */
      //this.updatePlayerRotation(10);
    }
  }]);
  return BabylonCamera;
}();
_defineProperty(BabylonCamera, "id", 'graphics-babylon-camera');
_defineProperty(BabylonCamera, "removable", false);
var _default = exports["default"] = BabylonCamera;

},{}]},{},[1])(1)
});

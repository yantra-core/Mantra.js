(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PhaserCamera = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// PhaserCamera.js - Marak Squires 2023
var PhaserCamera = /*#__PURE__*/function () {
  function PhaserCamera(scene) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, PhaserCamera);
    this.id = PhaserCamera.id;
    this.scene = scene;
    this.camera = scene.cameras.main;
    this.config = config;
    /*
    this.zoom = {
      maxZoom: 2.222,
      minZoom: 0.1,
      current: 1,
      tweening: false
    };
    */
    this.initZoomControls();
  }
  _createClass(PhaserCamera, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('graphics-phaser-camera', this);
    }

    // update() is called each game tick, we may want to implement render() here instead for RAF
  }, {
    key: "update",
    value: function update() {
      var camera = this.scene.cameras.main;
      var player = this.game.getEntity(this.game.currentPlayerId);
      // let graphics = this.game.components.graphics.get(this.game.currentPlayerId);
      if (camera && player.graphics && player.graphics['graphics-phaser']) {
        camera.centerOn(player.position.x, player.position.y);
        this.followingPlayer = true; // Set the flag to true
      }
    }
  }, {
    key: "initZoomControls",
    value: function initZoomControls() {
      var _this = this;
      this.scene.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var currentZoom = zoom.current;
        // Determine the zoom factor based on the wheel event.
        var zoomFactor = deltaY < 0 ? 1.5 : 0.6; // Adjust these numbers to your preference
        // Calculate the target zoom level.
        currentZoom *= zoomFactor;
        // Clamp the zoom level to reasonable limits (e.g., between 0.2 to 2)
        currentZoom = Math.min(Math.max(currentZoom, zoom.minZoom), zoom.maxZoom);
        // Use zoom.tweenTo for smoother zoom transitions
        zoom.tweenTo(_this.scene, currentZoom, 666); // 1000 ms duration for the tween
      });
    }
  }, {
    key: "tweenToZoom",
    value: function tweenToZoom(targetZoom) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var callback = arguments.length > 2 ? arguments[2] : undefined;
    } // Your existing tweenTo logic
    // Use this.zoom and this.camera
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      zoom.zoomIn(this.scene, amount);
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      zoom.zoomOut(this.scene, amount);
    }
  }, {
    key: "setZoom",
    value: function setZoom(absoluteAmount) {
      zoom.set(this.scene, absoluteAmount);
    }
  }, {
    key: "startFollowing",
    value: function startFollowing(player) {}
  }]);
  return PhaserCamera;
}();
_defineProperty(PhaserCamera, "id", 'phaser-camera');
var _default = exports["default"] = PhaserCamera;
var zoom = {};
zoom.maxZoom = 16;
zoom.minZoom = 0.05;
zoom.current = 0.1;
zoom.tweening = false;
zoom.init = function (mainScene) {

  // if mobile change max and min zoom values
  /*
  if (!mainScene.game.device.os.desktop) {
    zoom.maxZoom = 3.333;
    zoom.minZoom = 0.33;
  }
  */
};
var currentZoomTween = null;
var zoomTweenDelay = 333;
var lastZoomTweenTime = 0;
zoom.tweenTo = function (mainScene, targetZoom, duration, callback) {
  if (typeof duration === 'undefined') {
    duration = 1000; // default duration to 1 second
  }

  var now = new Date().getTime();
  if (zoom.tweening && typeof currentZoomTween !== 'undefined') {
    // cancel the current tween

    if (now - lastZoomTweenTime > zoomTweenDelay) {
      // console.log('zoom tween delay', now - lastZoomTweenTime)
      currentZoomTween.stop();
    }
  }
  zoom.tweening = true;
  lastZoomTweenTime = new Date().getTime();
  targetZoom = Math.max(Math.min(targetZoom, zoom.maxZoom), zoom.minZoom); // clamp the targetZoom to min/max bounds
  currentZoomTween = mainScene.tweens.add({
    targets: mainScene.cameras.main,
    zoom: targetZoom,
    duration: duration,
    ease: 'Sine.easeInOut',
    // you can use any easing function provided by Phaser
    onUpdate: function onUpdate(tween) {
      zoom.current = tween.getValue();
    },
    onComplete: function onComplete() {
      zoom.tweening = false;
      if (typeof callback === 'function') {
        callback();
      }
    }
  });
};
zoom.zoomIn = function (mainScene, amount) {
  if (typeof amount === 'undefined') {
    amount = 0.01;
  }
  if (zoom.tweening) {
    return;
  }
  var scaleFactor = 1 / (mainScene.cameras.main.zoom * 2);
  amount *= scaleFactor;
  if (mainScene.cameras.main.zoom >= zoom.maxZoom) {
    return;
  }
  mainScene.cameras.main.zoom += amount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
};
zoom.zoomOut = function (mainScene, amount) {
  if (typeof amount === 'undefined') {
    amount = -0.01;
  }
  if (zoom.tweening) {
    return;
  }
  var scaleFactor = (mainScene.cameras.main.zoom - zoom.minZoom) / (zoom.maxZoom - zoom.minZoom);
  amount *= scaleFactor;
  if (mainScene.cameras.main.zoom <= zoom.minZoom) {
    return;
  }
  mainScene.cameras.main.zoom += amount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
};
zoom.set = function (mainScene, absoluteAmount) {
  if (zoom.tweening) {
    return;
  }
  if (absoluteAmount > zoom.maxZoom) {
    absoluteAmount = zoom.maxZoom;
  }
  if (absoluteAmount < zoom.minZoom) {
    absoluteAmount = zoom.minZoom;
  }
  mainScene.cameras.main.zoom = absoluteAmount;
  mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
  zoom.current = absoluteAmount;
};

},{}]},{},[1])(1)
});

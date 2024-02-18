(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PhaserGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// GraphicsInterface.js - Marak Squires 2023
var GraphicInterface = /*#__PURE__*/function () {
  function GraphicInterface() {
    _classCallCheck(this, GraphicInterface);
  }
  _createClass(GraphicInterface, [{
    key: "init",
    value: function init() {
      throw new Error("init method not implemented.");
    }

    // called by the client as many times as possible using requestAnimationFrame
  }, {
    key: "render",
    value: function render(game) {
      throw new Error("render method not implemented.");
    }

    // called once per game tick, using fixed time step
  }, {
    key: "update",
    value: function update(entities) {
      // throw new Error("update method not implemented.");
    }

    // used to inflate entity data from the server
    // the entityData may represent an: update, create, or destroy event
  }, {
    key: "inflateGraphic",
    value: function inflateGraphic(entityData) {
      throw new Error("inflateGraphic method not implemented.");
    }

    // create a new graphic object
  }, {
    key: "createGraphic",
    value: function createGraphic(entity, data) {
      throw new Error("createGraphic method not implemented.");
    }

    // remove the graphic object
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      throw new Error("removeGraphic method not implemented.");
    }

    // remove the graphics object
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entity, data) {
      throw new Error("updateGraphic method not implemented.");
    }
  }]);
  return GraphicInterface;
}();
var _default = exports["default"] = GraphicInterface;

},{}],2:[function(require,module,exports){
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
    this.follow = true;
    this.isDragging = false;
    this.dragInertia = {
      x: 0,
      y: 0
    };
    this.isThrowing = false;
    this.initZoomControls();
  }
  _createClass(PhaserCamera, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // hoists and overrides
      this.game.setZoom = this.setZoom.bind(this);
      this.game.systemsManager.addSystem('graphics-phaser-camera', this);
      this.scene.input.on('pointerdown', this.onPointerDown.bind(this));
      this.scene.input.on('pointermove', this.onPointerMove.bind(this));
      this.scene.input.on('pointerup', this.onPointerUp.bind(this));
    }

    // update() is called each game tick, we may want to implement render() here instead for RAF
  }, {
    key: "update",
    value: function update() {
      var camera = this.scene.cameras.main;
      var player = this.game.getEntity(this.game.currentPlayerId);
      // let graphics = this.game.components.graphics.get(this.game.currentPlayerId);
      if (camera && player && player.graphics && player.graphics['graphics-phaser']) {
        if (this.follow && !this.isDragging && !this.isThrowing) {
          camera.centerOn(player.position.x, player.position.y);
        }
        this.followingPlayer = true; // Set the flag to true
      }
    }
  }, {
    key: "onPointerDown",
    value: function onPointerDown(pointer) {
      if (pointer.rightButtonDown()) {
        this.isDragging = true;
        this.follow = false;
        this.lastPointerPosition = {
          x: pointer.x,
          y: pointer.y
        };
      }
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove(pointer) {
      if (this.isDragging) {
        var dx = pointer.x - this.lastPointerPosition.x;
        var dy = pointer.y - this.lastPointerPosition.y;
        this.camera.scrollX -= dx / this.camera.zoom;
        this.camera.scrollY -= dy / this.camera.zoom;
        this.lastPointerPosition = {
          x: pointer.x,
          y: pointer.y
        };
      }
    }
  }, {
    key: "onPointerUp",
    value: function onPointerUp(pointer) {
      if (this.isDragging) {
        /* TODO: implement inertial throwing
        const dx = pointer.x - this.lastPointerPosition.x;
        const dy = pointer.y - this.lastPointerPosition.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          this.isThrowing = true;
          this.dragInertia.x = dx;
          this.dragInertia.y = dy;
          this.scene.time.addEvent({ delay: 0, callback: this.applyThrow, callbackScope: this, loop: true });
        }
        */
        this.isDragging = false;
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
    key: "applyThrow",
    value: function applyThrow() {
      if (!this.isThrowing) return;
      var decayFactor = 0.95; // Adjust for desired inertia effect
      this.camera.scrollX -= this.dragInertia.x / this.camera.zoom;
      this.camera.scrollY -= this.dragInertia.y / this.camera.zoom;
      this.dragInertia.x *= decayFactor;
      this.dragInertia.y *= decayFactor;
      if (Math.abs(this.dragInertia.x) < 0.1 && Math.abs(this.dragInertia.y) < 0.1) {
        this.isThrowing = false;
        this.scene.time.removeAllEvents();
      }
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
var _default = exports["default"] = PhaserCamera; // TODO: refactor this code into above class
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
  // mainScene.game.G.currentZoom = mainScene.cameras.main.zoom;
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _PhaserCamera = _interopRequireDefault(require("./PhaserCamera.js"));
var _inflateGraphic = _interopRequireDefault(require("./graphics/inflateGraphic.js"));
var _inflateTriangle = _interopRequireDefault(require("./graphics/inflateTriangle.js"));
var _inflateBox = _interopRequireDefault(require("./graphics/box/inflateBox.js"));
var _inflateCircle = _interopRequireDefault(require("./graphics/inflateCircle.js"));
var _inflateText = _interopRequireDefault(require("./graphics/inflateText.js"));
var _createBox = _interopRequireDefault(require("./graphics/box/createBox.js"));
var _preload2 = _interopRequireDefault(require("./preload.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // PhaserGraphics.js - Marak Squires 2023
// assume global Phaser exists, or will be ready after init()
var PhaserGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(PhaserGraphics, _GraphicsInterface);
  var _super = _createSuper(PhaserGraphics);
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  // TODO: add PhaserGraphics.zoom ( from PhaserCamera.js )
  function PhaserGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$camera = _ref.camera,
      camera = _ref$camera === void 0 ? {} : _ref$camera;
    _classCallCheck(this, PhaserGraphics);
    _this = _super.call(this);
    _this.id = 'graphics-phaser';
    _this.async = PhaserGraphics.async;
    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      };
    }
    if (typeof camera.follow === 'undefined') {
      camera.follow = true;
    }
    if (typeof camera.startingZoom === 'undefined') {
      camera.startingZoom = 1;
    }

    // alert(camera.follow)

    var config = {
      camera: camera
    };
    if (typeof config.camera.startingZoom === 'undefined') {
      config.camera.startingZoom = 1;
    }

    // config scope for convenience
    _this.config = config;
    _this.scenesReady = false;
    _this.scene = null;
    _this.inflateGraphic = _inflateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.inflateEntity = _inflateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.inflateBox = _inflateBox["default"].bind(_assertThisInitialized(_this));
    _this.inflateTriangle = _inflateTriangle["default"].bind(_assertThisInitialized(_this));
    _this.inflateCircle = _inflateCircle["default"].bind(_assertThisInitialized(_this));
    _this.inflateText = _inflateText["default"].bind(_assertThisInitialized(_this));
    _this.createBox = _createBox["default"].bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(PhaserGraphics, [{
    key: "init",
    value: function init(game) {
      var _this2 = this;
      this.game = game;
      // check to see if Phaser scope is available, if not assume we need to inject it sequentially
      if (typeof Phaser === 'undefined') {
        console.log('Phaser is not defined, attempting to load it from vendor');
        game.loadScripts(['/vendor/phaser.min.js'], function () {
          _this2.phaserReady(game);
        });
      } else {
        this.phaserReady(game);
      }
    }
  }, {
    key: "phaserReady",
    value: function phaserReady(game) {
      var _Main = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function Main() {
          Phaser.Scene.call(this, 'Main');
        },
        init: function init() {
          var _this3 = this;
          // Listen for the loadcomplete event
          this.load.on('complete', function () {
            _this3.scene.launch('Main');
            _this3.gameReady();
          });
        },
        preload: function preload() {
          (0, _preload2["default"])(this, game);
        },
        create: function create() {
          // Optionally, set the background color of the scene
          // this.cameras.main.setBackgroundColor('#000000');
        }
      });
      this.phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'gameHolder',
        transparent: true,
        scene: [_Main],
        scale: {
          // mode: Phaser.Scale.RESIZE_AND_FIT,
          // cover
          mode: Phaser.Scale.ENVELOP
        }
      });
      var self = this;
      function gameReady() {
        var scene = self.phaserGame.scene.getScene('Main');
        self.scene = scene;
        var camera = scene.cameras.main;
        var phaserCamera = new _PhaserCamera["default"](scene, self.config.camera);
        this.game.use(phaserCamera);
        self.scenesReady = true;

        // register renderer with graphics pipeline
        game.graphics.push(this);

        // wait until scene is loaded before letting systems know phaser graphics are ready
        this.game.systemsManager.addSystem('graphics-phaser', this);

        // async:true plugins *must* self report when they are ready
        game.emit('plugin::ready::graphics-phaser', this);
        // TODO: add back configurable starting zoom
        // camera.zoom = this.config.camera.startingZoom;
        camera.zoom = 2.5;
        // TODO: remove this line from plugin implementations
        game.loadingPluginsCount--;
      }
      _Main.prototype.gameReady = gameReady.bind(this);
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      var entity = this.game.getEntity(entityId);
      if (!entity || !entity.graphics || !entity.graphics['graphics-phaser']) {
        return;
      }
      // TODO: auto-scope graphics-babylon to the entity, so we don't need to do this
      var gameobject = entity.graphics['graphics-phaser'];
      gameobject.destroy();
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData) {
      // console.log('calling updateGraphic', entityData)
      return this.inflateGraphic(entityData);
    }
  }, {
    key: "update",
    value: function update(entitiesData) {
      var game = this.game;
      if (!this.scenesReady) {
        return;
      }
      // TODO: camera updates here?
      // update() will be called at the games frame rate
    }
  }, {
    key: "inflate",
    value: function inflate(snapshot) {
      // console.log(snapshot)
    }
  }, {
    key: "render",
    value: function render(game, alpha) {
      // render will be called at the browser's refresh rate
      // can be used for camera updates or local effects
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this4 = this;
      // TODO: consolidate graphics pipeline unloading into SystemsManager
      // TODO: remove duplicated unload() code in BabylonGraphics
      this.game.graphics = this.game.graphics.filter(function (g) {
        return g.id !== _this4.id;
      });
      delete this.game._plugins['PhaserGraphics'];

      // iterate through all entities and remove existing phaser graphics
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            entity = _step$value[1];
          if (entity.graphics && entity.graphics['graphics-phaser']) {
            this.removeGraphic(eId);
            delete entity.graphics['graphics-phaser'];
          }
        }

        // remove the PhaserCamera system plugin
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (this.game.systems['graphics-phaser-camera']) {
        this.game.systemsManager.removeSystem('graphics-phaser-camera');
      }

      // stop phaser, remove canvas
      this.phaserGame.destroy(true);
      var canvas = document.getElementById('phaser-render-canvas');
      if (canvas) {
        canvas.remove();
      }
    }
  }]);
  return PhaserGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(PhaserGraphics, "id", 'graphics-phaser');
_defineProperty(PhaserGraphics, "removable", false);
_defineProperty(PhaserGraphics, "async", true);
var _default = exports["default"] = PhaserGraphics;

},{"../../lib/GraphicsInterface.js":1,"./PhaserCamera.js":2,"./graphics/box/createBox.js":4,"./graphics/box/inflateBox.js":5,"./graphics/inflateCircle.js":7,"./graphics/inflateGraphic.js":8,"./graphics/inflateText.js":9,"./graphics/inflateTriangle.js":10,"./preload.js":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createBox;
var _setCursorStyle = _interopRequireDefault(require("../../util/setCursorStyle.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
// TODO: remove, use Z coordinate instead
var depthChart = ['background', 'border', 'wire', 'part', 'TILE', 'PLAYER', 'BLOCK'];
function createBox(entityData) {
  var _this = this;
  var graphic;
  var game = this.game;
  if (entityData.texture) {
    // Use texture if available
    // console.log('texture', entityData.texture)

    var texture = game.getTexture(entityData.texture);
    var textureUrl = texture.url;
    var spritePosition = texture.sprite || {
      x: 0,
      y: 0
    };

    // for now, TODO: fix phaser 3 sprite mappings
    if (entityData.type === 'PLAYER') {
      texture.key = 'player';
    }

    //console.log("GOT TEXTURE", texture, texture.key)
    graphic = this.scene.add.sprite(0, 0, texture.key);
    if (_typeof(texture.frames) === 'object') {
      // get the texture from the sprite sheet
      var t = this.scene.textures.get(texture.key);
      //let pos = texture.sprite;
      // get specific area from the texture by x / y
      //let frame = t.get(pos.x, pos.y, 16, 16);
      // set the graphic to frame texture
      graphic.setTexture(t);
    }
    var depth = depthChart.indexOf(entityData.type);
    if (typeof entityData.position.z === 'number') {
      depth = entityData.position.z;
    }
    graphic.setDepth(depth);
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    if (entityData.color) {
      // Apply tint if color is also defined
      // graphic.setTint(entityData.color);
    }
  } else {
    // Fallback to color fill if no texture
    // console.log("FALLING BACK TO PIXEL TEXTURE", entityData.id, entityData.type, entityData)
    graphic = this.scene.add.sprite(0, 0, 'pixel');
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    graphic.setTint(entityData.color);
  }

  // Create the hitArea as a Phaser.Geom.Rectangle
  // The hitArea is initially positioned at (0,0) with the size of the entity
  var hitArea = new Phaser.Geom.Rectangle(0, 0, entityData.width, entityData.height);

  // Log the hitArea for debugging purposes
  // console.log('hitArea', hitArea);

  if (entityData.style && entityData.style.display) {
    if (entityData.style.display === 'none') {
      graphic.setVisible(false);
    }
  }
  if (entityData.style && entityData.style.border) {
    // console.log('entityData.style.border', entityData.style.border)
    if (entityData.style.border) {
      // graphic.setStrokeStyle(entityData.style.border.width, entityData.style.border.color);
      // graphic.setStrokeStyle(2, 0x000000);
    }
  }

  // Set the graphic to be interactive and use the hitArea for interaction checks
  graphic.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

  // Set the size of the graphic
  // It's important to use displayWidth and displayHeight for scaling purposes
  graphic.displayWidth = entityData.width;
  graphic.displayHeight = entityData.height;

  // Add pointer events
  graphic.on('pointerover', function () {
    // console.log('pointerover', entityData.id, entityData.type, entityData)
    (0, _setCursorStyle["default"])(graphic, _this.scene, 'pointer');
    // Get the full entity from the game and delegate based on part type
    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'MotionDetector') {
        ent.yCraft.part.onFn();
      }
    }
  });
  graphic.on('pointerout', function () {
    //setCursorStyle(graphic, this.scene, 'default');
  });
  graphic.on('pointerdown', function (pointer) {
    // set closed hand cursor
    // setCursorStyle(graphic, this.scene, 'grabbing');
    // Handle pointer down events

    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'Button') {
        ent.yCraft.part.press();
      }
      if (ent.yCraft.part.toggle) {
        ent.yCraft.part.toggle();
      }
    }
    if (ent) {
      var pointerX = pointer.worldX;
      var pointerY = pointer.worldY;

      // Calculate the center of the graphic
      var centerX = graphic.x + graphic.displayWidth / 2;
      var centerY = graphic.y + graphic.displayHeight / 2;

      // Calculate the offset from the center
      var offsetX = pointerX - centerX;
      var offsetY = pointerY - centerY;
      offsetX = offsetX + entityData.width / 2;
      offsetY = offsetY + entityData.height / 2;
      var convertedEvent = {
        offsetX: offsetX,
        offsetY: offsetY
      };
      console.log('Converted Event', pointer, graphic, convertedEvent);
      game.emit('pointerDown', ent, convertedEvent);
    }
  });
  graphic.on('pointerup', function () {
    // Handle pointer up events
    var ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      var partType = ent.yCraft.part.type;
      if (partType === 'Button' && ent.yCraft.part.release) {
        ent.yCraft.part.release();
      }
    }
  });
  return graphic;
}

},{"../../util/setCursorStyle.js":12}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflategraphic;
var _updateBox = _interopRequireDefault(require("./updateBox.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function inflategraphic(entityData) {
  var game = this.game;
  // check to see if there is existing graphic on entity, if so, use that
  var graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {
    graphic = this.createBox(entityData); // mutate graphic
    this.scene.add.existing(graphic);
  } else {
    // EXISTING GRAPHIC
    (0, _updateBox["default"])(entityData, graphic, game);
  }

  // check to see if position is the same, if so, don't redraw
  var currentGraphicsPosition = {
    x: graphic.x,
    y: graphic.y
  };
  var position = entityData.position;
  graphic.setPosition(position.x, position.y);
  if (entityData.rotation && typeof entityData.texture === 'undefined') {
    graphic.setRotation(entityData.rotation);
  }
  return graphic;
}

},{"./updateBox.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateBox;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function updateBox(entityData, graphic, game) {
  // check to see if color has changed, if so update the tint
  if (typeof entityData.color !== 'undefined') {
    // console.log('COLOR', entityData.color)
    graphic.setTint(entityData.color);
  }
  if (typeof entityData.texture !== 'undefined') {
    var texture = game.getTexture(entityData.texture);
    if (!texture) {
      return graphic;
    }
    var textureUrl = texture.url;
    var spritePosition = texture.sprite || {
      x: 0,
      y: 0
    };
    if (typeof entityData.texture.frame === 'number') {
      // graphic.setFrame(entityData.texture.frame);
    }
    if (_typeof(texture.frames) === 'object') {
      // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
      if (game.tick % 10 === 0) {
        // TODO: custom tick rate
        // shift first frame from array
        if (typeof entityData.frameIndex === 'undefined') {
          entityData.frameIndex = 0;
        }
        if (entityData.frameIndex >= texture.frames.length) {
          entityData.frameIndex = 0;
        }
        var frame = texture.frames[entityData.frameIndex];
        if (typeof frame !== 'undefined') {
          // console.log(frame)
          // set position on graphic based on frame.x and frame.y
          // graphic.setFrame(frame.frame);
          //graphic.setFrame(2);
          //console.log('frame', frame)
          // graphic.setFrame(entityData.frameIndex);
          // TODO: setFrame animation here
          entityData.frameIndex++;
          // add frame back to end of array
        }
      }
    }
  }
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCircle;
function inflateCircle(entityData) {
  var game = this.game;
  // check to see if there is existing graphic on entity, if so, use that
  var graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {
    if (entityData.texture) {
      var texture = game.getTexture(entityData.texture);
      var textureUrl = texture.url;
      var spritePosition = texture.sprite || {
        x: 0,
        y: 0
      };
      if (entityData.type === 'BULLET') {
        texture = 'pixel';
      }
      if (typeof entityData.texture.frame === 'number') {
        //spritePosition = texture.frames[entityData.texture.frame];
        //entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
      }

      /*
      if (typeof texture.frames === 'object') {
        // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
        if (game.tick % 10 === 0) { // TODO: custom tick rate
          // shift first frame from array
          if (typeof entityData.frameIndex === 'undefined') {
            entityData.frameIndex = 0;
          }
          if (entityData.frameIndex >= texture.frames.length) {
            entityData.frameIndex = 0;
          }
           let frame = texture.frames[entityData.frameIndex];
          if (typeof frame !== 'undefined') {
            spritePosition = frame;
            entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;
            entityData.frameIndex++;
            // add frame back to end of array
          }
        }
      }
      */
      graphic = this.scene.add.sprite(0, 0, texture);
    } else {
      graphic = this.scene.add.graphics();
      graphic.fillStyle(0xff0000, 1);
      graphic.fillCircle(0, 0, entityData.radius);
      graphic.setDepth(10);
    }
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
    //  graphic.clear();
  }
  graphic.setPosition(entityData.position.x, entityData.position.y);
  return graphic;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateGraphic;
function inflateGraphic(entity) {
  var graphic;
  switch (entity.type) {
    case 'PLAYER':
      if (entity.shape === 'rectangle') {
        graphic = this.inflateBox(entity);
      } else {
        graphic = this.inflateBox(entity);
      }
      break;
    case 'BULLET':
      graphic = this.inflateCircle(entity);
      break;
    case 'TEXT':
      graphic = this.inflateText(entity);
      break;
    default:
      graphic = this.inflateBox(entity);
    // TODO: createDefault()
  }

  this.game.components.graphics.set([entity.id, 'graphics-phaser'], graphic);
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateText;
function inflateText(entityData) {
  // Check if there is an existing container with the text and background
  var container = entityData.graphics && entityData.graphics['graphics-phaser'];

  // set color to default white
  var textStyle = {
    font: '22px',
    fill: '#ffffff',
    padding: 3
  };
  if (entityData.style) {
    // textStyle = entityData.style;
    if (entityData.style.fontSize) {
      // textStyle.fontSize = entityData.fontSize;
      textStyle.font = "".concat(entityData.style.fontSize);
    }
    if (entityData.style.backgroundColor) {
      textStyle.backgroundColor = entityData.style.backgroundColor;
    }
  }
  textStyle.font = '12px monospace';

  // color fill
  if (entityData.color) {
    textStyle.fill = entityData.color;
  }

  // replaces <br> with \n
  entityData.text = entityData.text.replace(/<br\/>/g, '\n');

  // If there's no existing container, create a new one
  if (!container) {
    // Create text and background graphic
    var textObject = this.scene.add.text(0, 0, entityData.text, textStyle).setOrigin(0.5, 0.5);
    textObject.setAlpha(1);
    textObject.setDepth(9999);
    textObject.visible = true;
    // Create a container and add the text and background graphic to it
    container = this.scene.add.container(entityData.position.x, entityData.position.y, [/*backgroundGraphic,*/textObject]);
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-phaser'] = container;
  } else {
    // Update the text and background graphic if the text has changed
    var _textObject = container.list[1]; // Assuming textObject is the second item in the container
    //const backgroundGraphic = container.list[0]; // Assuming backgroundGraphic is the first item

    if (_textObject.text !== entityData.text) {
      _textObject.setText(entityData.text);
    }

    // Update container position
    container.setPosition(entityData.position.x, entityData.position.y);
  }
  return container;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateTriangle;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function inflateTriangle(entityData) {
  if (!this.scene) {
    console.log('No scene yet, this should not happen.');
    return;
  }

  // check to see if there is existing graphic on entity, if so, use that
  var graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }

  // let graphic = entityData.graphic; // Assuming entityData.graphic holds the reference to the existing graphic object.

  if (!graphic) {
    // Create a new triangle if it doesn't exist
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
    graphic.clear();
  }

  // Update or set position, rotation, and color based on entityData
  var centerX = entityData.position.x;
  var centerY = entityData.position.y;
  var height = entityData.height || 64;
  var width = entityData.width || 64;
  var halfWidth = width / 2;
  var point1 = {
    x: centerX - halfWidth,
    y: centerY + height / 2
  };
  var point2 = {
    x: centerX + halfWidth,
    y: centerY + height / 2
  };
  var point3 = {
    x: centerX,
    y: centerY - height / 2
  };

  // Use entityData.color or default to red
  var color = entityData.color || 0xff0000;
  graphic.fillStyle(color, 1);
  graphic.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  graphic.setDepth(10);
  // console.log('entityData', entityData)
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (_typeof(entityData.rotation) === 'object') {
      // transform 3d to 2.5d
      graphic.rotation = entityData.rotation.x;
    } else {
      graphic.rotation = entityData.rotation;
    }
  }
  return graphic;
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = preload;
function preload(scene, game) {
  game.preloader.assets.forEach(function (asset) {
    if (asset.type === 'spritesheet') {
      // Load the sprite sheet
      scene.load.spritesheet(asset.key, asset.url, {
        frameWidth: asset.frameWidth,
        frameHeight: asset.frameHeight
      });
    } else if (asset.type === 'image') {
      // Load image assets
      scene.load.image(asset.key, asset.url);
    }
  });
  scene.load.on('complete', function () {
    game.preloader.assets.forEach(function (asset) {
      if (asset.type === 'spritesheet') {
        createCustomFramesAndAnimations(scene, asset);
      }
    });
  });
}
function createCustomFramesAndAnimations(scene, asset) {
  var _loop = function _loop(frameTagName) {
    var frameTag = asset.frameTags[frameTagName];
    var frames = frameTag.frames.map(function (frame, index) {
      var frameKey = "".concat(asset.key, "-").concat(frameTagName, "-").concat(index);
      console.log('scene.textures', scene.textures);
      scene.textures.get(asset.key).add(frameKey, 0, frame.x, frame.y, asset.frameWidth, asset.frameHeight);
      return {
        key: frameKey
      };
    });
    scene.anims.create({
      key: frameTagName,
      frames: frames,
      frameRate: 10,
      repeat: -1
    });
  };
  for (var frameTagName in asset.frameTags) {
    _loop(frameTagName);
  }
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setCursorStyle;
function setCursorStyle(graphic, scene, cursorStyle) {
  graphic.on('pointerover', function () {
    scene.game.canvas.style.cursor = cursorStyle;
  });
  graphic.on('pointerout', function () {
    scene.game.canvas.style.cursor = 'default';
  });
}

},{}]},{},[3])(3)
});

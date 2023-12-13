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
      throw new Error("update method not implemented.");
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
      var graphics = this.game.components.graphics.get(this.game.currentPlayerId);
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
var _inflateBox = _interopRequireDefault(require("./graphics/inflateBox.js"));
var _inflateCircle = _interopRequireDefault(require("./graphics/inflateCircle.js"));
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

  function PhaserGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$camera = _ref.camera,
      camera = _ref$camera === void 0 ? {} : _ref$camera,
      _ref$startingZoom = _ref.startingZoom,
      startingZoom = _ref$startingZoom === void 0 ? 0.1 : _ref$startingZoom;
    _classCallCheck(this, PhaserGraphics);
    _this = _super.call(this);
    _this.id = 'graphics-phaser';
    _this.async = PhaserGraphics.async;
    var config = {
      camera: camera,
      startingZoom: startingZoom
    };
    // config scope for convenience
    _this.config = config;
    _this.startingZoom = startingZoom;
    _this.scenesReady = false;
    _this.scene = null;
    _this.inflateGraphic = _inflateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.inflateBox = _inflateBox["default"].bind(_assertThisInitialized(_this));
    _this.inflateTriangle = _inflateTriangle["default"].bind(_assertThisInitialized(_this));
    _this.inflateCircle = _inflateCircle["default"].bind(_assertThisInitialized(_this));
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
        init: function init() {},
        create: function create() {
          this.cameras.main.setBackgroundColor('#000000');
        },
        preload: function preload() {
          this.load.image('player', 'textures/flare.png');
        }
      });
      this.phaserGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'gameHolder',
        width: 1600,
        // TODO: config  
        height: 800,
        scene: [_Main],
        scale: {
          //mode: Phaser.Scale.ENVELOP,
          mode: Phaser.Scale.RESIZE_AND_FIT
          //mode: Phaser.Scale.FIT,
        }
      });

      var self = this;
      function loadMainScene() {
        var scene = self.phaserGame.scene.getScene('Main');
        if (!scene) {
          setTimeout(loadMainScene.bind(self), 10);
          return;
        }
        var canvas = self.phaserGame.canvas;
        canvas.setAttribute('id', 'phaser-render-canvas');
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
        camera.zoom = this.startingZoom;

        // TODO: remove this line from plugin implementations
        game.loadingPluginsCount--;
      }
      var Main = new Phaser.Class({
        Extends: Phaser.Scene,
        initialize: function Main() {
          Phaser.Scene.call(this, 'Main');
        },
        init: function init() {},
        create: function create() {
          this.cameras.main.setBackgroundColor('#000000');
        },
        preload: function preload() {
          this.load.image('player', 'textures/flare.png');
        }
      });
      loadMainScene();
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
      // render is called at the browser's frame rate (typically 60fps)
      var self = this;
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            state = _step$value[1];
          var ent = this.game.entities.get(eId);
          // console.log('rendering', ent)
          this.inflateGraphic(ent, alpha);
          // Remark: 12/13/23 - pendingRender check is removed for now, inflateEntity can be called multiple times per entity
          //                    This could impact online mode, test for multiplayer
          /*
          // check if there is no graphic available, if so, inflate
          if (!ent.graphics || !ent.graphics['graphics-phaser']) {
            this.inflateGraphic(ent, alpha);
            ent.pendingRender['graphics-phaser'] = false;
          }
          if (ent.pendingRender && ent.pendingRender['graphics-phaser']) {
            this.inflateGraphic(ent, alpha);
            ent.pendingRender['graphics-phaser'] = false;
          }
          */
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this3 = this;
      // TODO: consolidate graphics pipeline unloading into SystemsManager
      // TODO: remove duplicated unload() code in BabylonGraphics
      this.game.graphics = this.game.graphics.filter(function (g) {
        return g.id !== _this3.id;
      });
      delete this.game._plugins['PhaserGraphics'];

      // iterate through all entities and remove existing phaser graphics
      var _iterator2 = _createForOfIteratorHelper(this.game.entities.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            eId = _step2$value[0],
            entity = _step2$value[1];
          if (entity.graphics && entity.graphics['graphics-phaser']) {
            this.removeGraphic(eId);
            delete entity.graphics['graphics-phaser'];
          }
        }

        // stop phaser, remove canvas
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
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

},{"../../lib/GraphicsInterface.js":1,"./PhaserCamera.js":2,"./graphics/inflateBox.js":4,"./graphics/inflateCircle.js":5,"./graphics/inflateGraphic.js":6,"./graphics/inflateTriangle.js":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflategraphic;
function inflategraphic(entityData) {
  // check to see if there is existing graphic on entity, if so, use that
  var graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {
    // Create a new triangle if it doesn't exist
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    if (!entityData.color) {
      // defaults to white
      entityData.color = 0xffffff;
    }
    graphic.fillStyle(entityData.color, 1);
    graphic.currentFillColor = entityData.color;
    graphic.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  }

  // check to see if color is the same, if so, don't redraw
  var currentGraphicsColor = graphic.currentFillColor;
  var color = entityData.color || 0xff0000; // Use entityData.color or default to red
  //console.log('checking color', currentGraphicsColor, color)
  if (currentGraphicsColor !== color) {
    graphic.clear();
    // console.log('setting new color', color)
    graphic.fillStyle(color, 1);
    graphic.currentFillColor = color;
    graphic.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
  }

  // check to see if position is the same, if so, don't redraw
  var currentGraphicsPosition = {
    x: graphic.x,
    y: graphic.y
  };
  var position = entityData.position;

  // let adjustedX = entityData.position.x + this.game.width / 2;
  // let adjustedY = entityData.position.y + this.game.height / 2;

  graphic.setPosition(position.x, position.y);
  // TODO: conditional update of position, use float truncation
  /*  
  //console.log('checking', currentGraphicsPosition, position)
  if (typeof currentGraphicsPosition === 'undefined' || (currentGraphicsPosition.x !== position.x || currentGraphicsPosition.y !== position.y)) {
    if (entityData.type === 'BORDER') {
      //throw new Error('setting new position', position)
      console.log('setting new position', position)
    }
    //let adjustedX = entityData.position.x + this.game.width / 2;
    //let adjustedY = entityData.position.y + this.game.height / 2;
  }
  */

  return graphic;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCircle;
function inflateCircle(entityData) {
  // check to see if there is existing graphic on entity, if so, use that
  var graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
    graphic.clear();
  }
  graphic.fillStyle(0xff0000, 1);
  graphic.fillCircle(0, 0, 50);
  graphic.setDepth(10);
  graphic.setPosition(entityData.position.x, entityData.position.y);
  return graphic;
}

},{}],6:[function(require,module,exports){
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
        graphic = this.inflateTriangle(entity);
      }
      break;
    case 'BULLET':
      graphic = this.inflateCircle(entity);
      break;
      graphic = this.inflateTriangle(entity);
    default:
      graphic = this.inflateBox(entity);
    // TODO: createDefault()
  }

  this.game.components.graphics.set([entity.id, 'graphics-phaser'], graphic);
}

},{}],7:[function(require,module,exports){
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

},{}]},{},[3])(3)
});

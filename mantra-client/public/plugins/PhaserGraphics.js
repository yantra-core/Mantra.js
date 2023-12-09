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
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // assume global phaser for now
//import Phaser from 'phaser';
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
      startingZoom = _ref$startingZoom === void 0 ? 0.4 : _ref$startingZoom;
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
    return _this;
  }
  _createClass(PhaserGraphics, [{
    key: "init",
    value: function init(game) {
      var _this2 = this;
      // console.log('PhaserGraphics.init()');

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
        scene: [_Main]
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
        self.scenesReady = true;

        // register renderer with graphics pipeline
        game.graphics.push(this);

        // possible duplicate api, ready per pipeline not needed,
        // as we have async loading of plugins now, review this line and remove
        // game.graphicsReady.push(self.name);

        // wait until scene is loaded before letting systems know phaser graphics are ready
        this.game.systemsManager.addSystem('graphics-phaser', this);

        // async:true plugins *must* self report when they are ready
        game.emit('plugin::ready::graphics-phaser', this);
        // TODO: remove this line from plugin implementations
        game.loadingPluginsCount--;

        // camera.rotation = -Math.PI / 2;
        /*
        // TODO: mouse wheel zoom.js
        self.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
          console.log('wheel', pointer, gameObjects, deltaX, deltaY, deltaZ)
        });
        */
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
      var previousEntity = this.game.getEntity(entityData.id);
      if (!previousEntity || !previousEntity.graphics || !previousEntity.position) {
        return;
      }
      if (previousEntity.position.x === entityData.position.x && previousEntity.position.y === entityData.position.y) {
        // TODO: we shouldn't need to do this as getPlayerSnapshot() should only return diff state
        // There may be an issue with how delta encoding works for offline mode, needs tests
        // return;
      }
      // console.log('updating graphic', entityData.id, entityData.position)

      var gameobject = previousEntity.graphics['graphics-phaser'];
      if (!gameobject) {
        console.log('no gameobject found for', entityData.id);
        return;
      }

      // Adjust the coordinates to account for the center (0,0) world
      var adjustedX = entityData.position.x + this.game.width / 2;
      var adjustedY = entityData.position.y + this.game.height / 2;
      gameobject.setPosition(adjustedX, adjustedY);

      // TODO: move this to common 3D-2.5D transform function(s)
      if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
        if (_typeof(entityData.rotation) === 'object') {
          // transform 3d to 2.5d
          gameobject.rotation = entityData.rotation.x;
        } else {
          gameobject.rotation = entityData.rotation;
        }
      }

      // console.log('updating position', entityData.position)
      // convert rotation to degrees
    }
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      // switch case based on entityData.type
      var graphic;
      switch (entityData.type) {
        case 'PLAYER':
          if (entityData.shape === 'rectangle') {
            graphic = this.createBox(entityData);
          } else {
            graphic = this.createTriangle(entityData);
          }
          break;
        case 'BULLET':
          graphic = this.createCircle(entityData);
          break;
          graphic = this.createTriangle(entityData);
        default:
          graphic = this.createBox(entityData);
        // TODO: createDefault()
      }

      var adjustedX = entityData.position.x + this.game.width / 2;
      var adjustedY = entityData.position.y + this.game.height / 2;
      graphic.setPosition(adjustedX, adjustedY);
      return graphic;
    }
  }, {
    key: "createBox",
    value: function createBox(entityData) {
      var box = this.scene.add.graphics();
      box.fillStyle(0xff0000, 1);
      box.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);

      // Adjust the coordinates to account for the center (0,0) world
      var adjustedX = entityData.position.x + this.game.width / 2;
      var adjustedY = entityData.position.y + this.game.height / 2;

      // We use a container to easily manage origin and position
      var container = this.scene.add.container(adjustedX, adjustedY);
      container.add(box);
      return container;
    }
  }, {
    key: "createTriangle",
    value: function createTriangle(entityData) {
      if (!this.scene) {
        console.log('no scene yet, this should not happen.');
        return;
      }

      // Assuming entityData.x and entityData.y specify the center of the triangle
      var centerX = entityData.position.x;
      var centerY = entityData.position.y;

      // Calculate the vertices of the triangle
      var height = entityData.height || 64;
      var width = entityData.width || 64;

      // Points for an equilateral triangle, adjust these calculations if you need a different type of triangle
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
      }; // Apex of the triangle

      // Draw the triangle
      var sprite = this.scene.add.graphics();
      sprite.fillStyle(0xff0000, 1);
      sprite.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
      sprite.setDepth(10);

      // TODO: move this to common 3D-2.5D transform function(s)
      if (typeof entityData.rotation !== 'undefined') {
        // Remark: shouldn't this be default 0?
        if ((typeof rotation === "undefined" ? "undefined" : _typeof(rotation)) === 'object') {
          // transform 3d to 2.5d
          sprite.rotation = entityData.rotation.x;
        } else {
          sprite.rotation = entityData.rotation;
        }
      }
      // setPosition not needed immediately after create?
      // sprite.setPosition(entityData.position.x, entityData.position.y);
      this.scene.add.existing(sprite);
      return sprite;
    }
  }, {
    key: "createCircle",
    value: function createCircle(entityData) {
      var sprite = this.scene.add.graphics();
      sprite.fillStyle(0xff0000, 1);
      sprite.fillCircle(0, 0, 50);
      sprite.setDepth(10);
      //sprite.x = entityData.position.x;
      //sprite.y = entityData.position.y;
      return sprite;
    }
  }, {
    key: "update",
    value: function update(entitiesData) {
      var game = this.game;
      if (!this.scenesReady) {
        return;
      }
      var camera = this.scene.cameras.main;
      if (this.config.camera && this.config.camera === 'follow') {
        //    if (this.followPlayer && this.followingPlayer !== true) {
        // Camera settings
        var player = this.game.getEntity(game.currentPlayerId);
        var graphics = this.game.components.graphics.get(game.currentPlayerId);
        if (player && graphics && player.graphics['graphics-phaser']) {
          camera.startFollow(player.graphics['graphics-phaser']);
          this.followingPlayer = true;
        }
      }

      // center camera
      // TODO now center the camera
      // center camera to (0,0) in game world coordinates
      var centerX = 0;
      var centerY = 0;
      // console.log('centering camera', centerX, centerY)
      camera.setPosition(centerX, centerY);
      camera.zoom = this.startingZoom;

      // console.log('phaser update called', snapshot)
    }
  }, {
    key: "inflate",
    value: function inflate(snapshot) {
      console.log(snapshot);
    }
  }, {
    key: "render",
    value: function render(game, alpha) {
      var self = this;
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            state = _step$value[1];
          var ent = this.game.entities.get(eId);
          if (ent.pendingRender && ent.pendingRender['graphics-phaser']) {
            this.inflateEntity(ent, alpha);
            ent.pendingRender['graphics-phaser'] = false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "inflateEntity",
    value: function inflateEntity(entity, alpha) {
      if (entity.type === 'BULLET') {
        //console.log("FUUUUU")
        //return;
      }
      if (entity.graphics && entity.graphics['graphics-phaser']) {
        var graphic = entity.graphics['graphics-phaser'];
        if (entity.type === 'BULLET') {} else {
          var adjustedX = entity.position.x + this.game.width / 2;
          var adjustedY = entity.position.y + this.game.height / 2;
          //entity.position.x = adjustedX;
          //entity.position.y = adjustedY;

          this.updateGraphic(entity, alpha);
        }
      } else {
        // Adjust the coordinates to account for the center (0,0) world
        var _adjustedX = entity.position.x + this.game.width / 2;
        var _adjustedY = entity.position.y + this.game.height / 2;
        //entity.position.x = adjustedX;
        //entity.position.y = adjustedY;
        // console.log('creating', entity.position)
        var _graphic = this.createGraphic(entity);
        // TODO: remove this line, there is bug somewhere in code here
        // or near MatterPhyics which is causing a double render / initial render to be in wrong position
        this.game.components.graphics.set([entity.id, 'graphics-phaser'], _graphic);
        //this.game.components.position.set(entity.id, entity.position);
      }
    }

    // Implement other necessary methods or adjust according to your architecture
  }]);
  return PhaserGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(PhaserGraphics, "id", 'graphics-phaser');
_defineProperty(PhaserGraphics, "removable", false);
_defineProperty(PhaserGraphics, "async", true);
var _default = exports["default"] = PhaserGraphics;

},{"../../lib/GraphicsInterface.js":1}]},{},[2])(2)
});

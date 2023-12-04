(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).ThreeGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // ThreeGraphics.js - Marak Squires 2023
var ThreeGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(ThreeGraphics, _GraphicsInterface);
  var _super = _createSuper(ThreeGraphics);
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  function ThreeGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      camera = _ref.camera,
      cameraConfig = _ref.cameraConfig;
    _classCallCheck(this, ThreeGraphics);
    _this = _super.call(this);
    _this.id = ThreeGraphics.id;
    _this.async = ThreeGraphics.async;
    _this.renderer = null;
    _this.camera = null;

    // config scope for convenience
    var config = {
      camera: camera
    };
    _this.config = config;

    // Set default camera configuration or use the provided one
    _this.cameraConfig = cameraConfig || {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000
    };
    return _this;
  }
  _createClass(ThreeGraphics, [{
    key: "init",
    value: function init(game) {
      var _this2 = this;
      game.graphics.push(this);
      this.game = game;
      this.game.systemsManager.addSystem('graphics-three', this);

      // check to see if THREE scope is available, if not assume we need to inject it sequentially
      if (typeof THREE === 'undefined') {
        console.log('THREE is not defined, attempting to load it from vendor');
        game.loadScripts(['/vendor/three.min.js'], function () {
          _this2.threeReady(game);
        });
      } else {
        this.threeReady(game);
      }
    }
  }, {
    key: "threeReady",
    value: function threeReady(game) {
      this.scene = new THREE.Scene();

      // Initialize the renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('gameHolder').appendChild(this.renderer.domElement);

      // Create and configure the camera
      this.camera = new THREE.PerspectiveCamera(this.cameraConfig.fov, this.cameraConfig.aspect, this.cameraConfig.near, this.cameraConfig.far);

      // Add a light source
      var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      this.scene.add(light);

      // Notify the system that graphics are ready
      // game.graphicsReady.push(this.name);

      // Position the camera for a bird's eye view
      this.camera.position.set(0, 200, 200);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      // TODO: Initialize controls for camera interaction
      // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.enableZoom = true; // Enable zooming

      // async:true plugins *must* self report when they are ready
      game.emit('plugin::ready::graphics-three', this);
      // TODO: remove this line from plugin implementations
      game.loadingPluginsCount--;
    }
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      var geometry, material, mesh;
      switch (entityData.type) {
        case 'BORDER':
          geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
          break;
        case 'BULLET':
          geometry = new THREE.SphereGeometry(entityData.radius, 32, 32);
          break;
        case 'PLAYER':
          geometry = new THREE.CylinderGeometry(0, entityData.width, entityData.height, 3);
          break;
        default:
          geometry = new THREE.BoxGeometry(entityData.width, entityData.width, entityData.width);
        // Default to a unit cube if no shape is specified
      }

      // Basic white material, replace with textures/materials as needed
      material = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });
      mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh); // Add the mesh to the scene
      // Store the mesh in the 'graphics' component
      this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);
      return mesh;
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData) {
      var mesh = this.game.components.graphics.get([entityData.id, 'graphics-three']);
      if (!mesh) {
        console.error('No mesh found for entity', entityData.id);
        return;
      }

      // Update mesh position and rotation
      if (_typeof(entityData.rotation) === 'object' && entityData.rotation !== null) {
        // 3D
        mesh.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);
      } else {
        // 2D / 2.5D
        mesh.rotation.set(0, entityData.rotation, 0);
      }

      // TODO: Add support for 3D position with entityData.position.z if available
      mesh.position.set(entityData.position.x, 1, entityData.position.y);
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      // Fetch the mesh from the 'graphics' component
      var mesh = this.game.components.graphics.get([entityId, 'graphics-three']);
      if (mesh) {
        this.scene.remove(mesh);
        // Remove the mesh from the 'graphics' component
        this.game.components.graphics.remove([entityId, 'graphics-three']);
      }
    }

    // called by systemsManager on each game tick
  }, {
    key: "update",
    value: function update() {
      this.updateCameraFollow();
    }

    // called as much as the client requires in order to render
  }, {
    key: "render",
    value: function render(game, alpha) {
      var self = this;
      // Update the controls on each frame
      // this.controls.update();
      // Follow the player entity with the camera
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            state = _step$value[1];
          var ent = this.game.entities.get(eId);
          if (ent.pendingRender['graphics-three']) {
            this.inflateEntity(ent, alpha);
            ent.pendingRender['graphics-three'] = false;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "updateCameraFollow",
    value: function updateCameraFollow() {
      var game = this.game;
      // Follow the player entity with the camera
      var currentPlayer = this.game.getEntity(game.currentPlayerId);
      if (currentPlayer) {
        var playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
        if (playerGraphic) {
          // Calculate the new camera position with a slight offset above and behind the player
          var newPosition = playerGraphic.position.clone().add(new THREE.Vector3(0, 50, -100));
          var lookAtPosition = playerGraphic.position.clone();

          // Use a smaller lerp factor for smoother camera movement
          this.camera.position.lerp(newPosition, 0.05);
          this.camera.lookAt(lookAtPosition);
        }
      }
    }
  }, {
    key: "inflateEntity",
    value: function inflateEntity(entity, alpha) {
      if (entity.graphics && entity.graphics['graphics-three']) {
        var graphic = entity.graphics['graphics-three'];
        if (entity.type !== 'BORDER') {
          // TODO: remove this
          this.updateGraphic(entity, alpha);
        }
      } else {
        var _graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-three'], _graphic);
      }
    }
  }]);
  return ThreeGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(ThreeGraphics, "id", 'graphics-three');
_defineProperty(ThreeGraphics, "removable", false);
_defineProperty(ThreeGraphics, "async", true);
var _default = exports["default"] = ThreeGraphics;

},{"../../lib/GraphicsInterface.js":1}]},{},[2])(2)
});

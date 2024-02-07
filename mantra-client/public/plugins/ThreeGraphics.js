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
var _render = _interopRequireDefault(require("./lib/render.js"));
var _createGraphic = _interopRequireDefault(require("./lib/createGraphic.js"));
var _updateGraphic = _interopRequireDefault(require("./lib/updateGraphic.js"));
var _removeGraphic = _interopRequireDefault(require("./lib/removeGraphic.js"));
var _inflateGraphic = _interopRequireDefault(require("./lib/inflateGraphic.js"));
var _inflateTexture = _interopRequireDefault(require("./lib/inflateTexture.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // ThreeGraphics.js - Marak Squires 2023
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { FontLoader } from './lib/FontLoader.js'
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
      this.render = _render["default"].bind(this);
      this.inflateGraphic = _inflateGraphic["default"].bind(this);
      this.createGraphic = _createGraphic["default"].bind(this);
      this.updateGraphic = _updateGraphic["default"].bind(this);
      this.removeGraphic = _removeGraphic["default"].bind(this);
      this.inflateTexture = _inflateTexture["default"].bind(this);
      this.game = game;
      this.game.systemsManager.addSystem('graphics-three', this);
      game.data.camera = {
        mode: 'follow',
        position: {
          x: 0,
          y: 0
        }
      };

      // check to see if THREE scope is available, if not assume we need to inject it sequentially
      if (typeof THREE === 'undefined') {
        console.log('THREE is not defined, attempting to load it from vendor');
        game.loadScripts(['/vendor/three.min.js'], function () {
          _this2.threeReady(game);
          /*
          this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (err, font) => {
            this.threeReady(game);
          })
          */
        });
      } else {
        this.threeReady(game);
        /*
          this.loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (err, font) => {
        */
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
      // set to transparent
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.id = 'three-render-canvas';
      document.getElementById('gameHolder').appendChild(this.renderer.domElement);

      // Create and configure the camera
      this.camera = new THREE.PerspectiveCamera(this.cameraConfig.fov, this.cameraConfig.aspect, this.cameraConfig.near, this.cameraConfig.far);

      // Set up the camera defaults
      this.setCameraDefaults();

      // Set up the mouse wheel event listener for zooming
      this.setupZoomControls();

      // Add a light source
      var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      this.scene.add(light);

      // Notify the system that graphics are ready
      // game.graphicsReady.push(this.name);

      // Position the camera for a bird's eye view
      this.camera.position.set(0, 0, 0);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      // TODO: Initialize controls for camera interaction
      // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.enableZoom = true; // Enable zooming

      // async:true plugins *must* self report when they are ready
      game.emit('plugin::ready::graphics-three', this);
      // TODO: remove this line from plugin implementations
      game.loadingPluginsCount--;
      game.graphics.push(this);
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
      document.body.style.cursor = 'default';
    }
  }, {
    key: "setCameraDefaults",
    value: function setCameraDefaults() {
      // this.camera.position.set(0, 0, 100); // Set a default position
      this.setZoom(1); // Set a default zoom level
      this.game.data.camera.mode = 'follow';
    }
  }, {
    key: "setZoom",
    value: function setZoom(zoomLevel) {
      // Here we are using fov to control the zoom. You can adjust this formula as needed.
      var newFov = 75 / zoomLevel;
      this.camera.fov = newFov;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, {
    key: "loadFont",
    value: function loadFont(path, cb) {
      var game = this.game;
      var fontLoader = new FontLoader();
      fontLoader.load('vendor/fonts/helvetiker_regular.typeface.json', function (font) {
        // Store the loaded font in your game's state
        console.log('got back', null, font);
        game.font = font;
        cb(null, font);
        //game.setFont(font);
      });
    }

    // called by systemsManager on each game tick
  }, {
    key: "update",
    value: function update() {
      this.updateCameraFollow();
    }
  }, {
    key: "updateCameraFollow",
    value: function updateCameraFollow() {
      var game = this.game;
      // Follow the player entity with the camera
      var currentPlayer = this.game.getEntity(game.currentPlayerId);
      if (currentPlayer) {
        if (game.data.camera.mode === 'fpv') {
          this.setFirstPersonView();
        }
        if (game.data.camera.mode === 'follow') {
          var playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
          if (playerGraphic) {
            // Calculate the new camera position with a slight offset above and behind the player
            var newPosition = playerGraphic.position.clone().add(new THREE.Vector3(0, 150, -100));
            var lookAtPosition = playerGraphic.position.clone();

            // Use a smaller lerp factor for smoother camera movement
            this.camera.position.lerp(newPosition, 0.05);
            this.camera.lookAt(lookAtPosition);
          }
        }

        // TODO: Better platform camera, see CSSGraphics.js for example
        if (game.data.camera.mode === 'platform') {
          var _playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
          if (_playerGraphic) {
            // Calculate the new camera position with a slight offset above and behind the player
            var _newPosition = _playerGraphic.position.clone().add(new THREE.Vector3(0, 150, -100));
            var _lookAtPosition = _playerGraphic.position.clone();

            // Use a smaller lerp factor for smoother camera movement
            this.camera.position.lerp(_newPosition, 0.05);
            this.camera.lookAt(_lookAtPosition);
          }
        }
      }
    }
  }, {
    key: "setupZoomControls",
    value: function setupZoomControls() {
      var _this3 = this;
      var zoomSensitivity = -0.05; // Adjust this value based on desired zoom speed
      var minFov = 20; // Minimum FOV
      var maxFov = 150; // Maximum FOV, you can adjust this value

      this.renderer.domElement.addEventListener('wheel', function (event) {
        // Adjust the camera's FOV
        _this3.camera.fov -= event.deltaY * zoomSensitivity;
        // Clamp the FOV to the min/max limits
        _this3.camera.fov = Math.max(Math.min(_this3.camera.fov, maxFov), minFov);
        // Update the camera's projection matrix
        _this3.camera.updateProjectionMatrix();
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this4 = this;
      // remove events mouse wheel camera
      this.renderer.domElement.removeEventListener('wheel', function () {});

      // iterate through all entities and remove existing babylon graphics
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            entity = _step$value[1];
          if (entity.graphics && entity.graphics['graphics-three']) {
            this.removeGraphic(eId);
            delete entity.graphics['graphics-three'];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.game.graphics = this.game.graphics.filter(function (g) {
        return g.id !== _this4.id;
      });
      delete this.game._plugins['ThreeGraphics'];

      // remove canvas
      var canvas = document.getElementById('three-render-canvas');
      if (canvas) {
        // hide canvas
        // canvas.style.display = 'none';
        canvas.remove();
      }
    }

    // New function to switch to first-person perspective
  }, {
    key: "setFirstPersonView",
    value: function setFirstPersonView() {
      var currentPlayer = this.game.getEntity(this.game.currentPlayerId);
      if (!currentPlayer) {
        console.warn('Current player entity not found');
        return;
      }
      var playerGraphic = this.game.components.graphics.get([this.game.currentPlayerId, 'graphics-three']);
      if (!playerGraphic) {
        console.warn('Player graphic component not found');
        return;
      }
      playerGraphic.visible = false;

      // Assume the player's "eyes" are located at some offset
      var eyePositionOffset = new THREE.Vector3(0, 1.6, 0); // Adjust Y offset to represent the player's eye level
      var playerPosition = playerGraphic.position.clone();

      // Position the camera at the player's eye level
      this.camera.position.copy(playerPosition.add(eyePositionOffset));

      // Assuming the player's forward direction is along the negative Z-axis of the player's local space
      // We need to find the forward direction in world space
      var forwardDirection = new THREE.Vector3(0, 0, 0);
      forwardDirection.applyQuaternion(playerGraphic.quaternion); // Convert local forward direction to world space

      // Look in the forward direction from the current camera position
      var lookAtPosition = this.camera.position.clone().add(forwardDirection);
      this.camera.lookAt(lookAtPosition);
    }
  }]);
  return ThreeGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(ThreeGraphics, "id", 'graphics-three');
_defineProperty(ThreeGraphics, "removable", false);
_defineProperty(ThreeGraphics, "async", true);
var _default = exports["default"] = ThreeGraphics;

},{"../../lib/GraphicsInterface.js":1,"./lib/createGraphic.js":3,"./lib/inflateGraphic.js":4,"./lib/inflateTexture.js":5,"./lib/removeGraphic.js":6,"./lib/render.js":7,"./lib/updateGraphic.js":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createGraphic;
function createGraphic(entityData) {
  // Early exit if entity is marked as destroyed
  if (entityData.destroyed === true) {
    console.log("Entity is destroyed, skipping creation.");
    return;
  }

  // Attempt to retrieve texture and model data
  // console.log("fetching texture", entityData, entityData.texture)
  var texture = game.getTexture(entityData.texture);
  // console.log("Creating entity with texture:", texture);

  // Define a variable to hold the main object for the entity (model or group)
  var entityObject;

  // Check if there is a model associated with the texture
  if (texture && texture.model) {
    //console.log("Using existing model for entity.");
    entityObject = processModel(texture.model);
    //entityObject = createGeometryForEntity(entityData);

    //console.log('entityObject after processModel()', entityObject);
  } else {
    // console.log("Creating new geometry for entity.");
    entityObject = createGeometryForEntity(entityData);
  }

  // Set entity position and add to the scene
  if (typeof entityData.position.z !== 'number') {
    entityData.position.z = 0;
  }

  // console.log('setting position of entityObject', entityObject, entityData.position);
  entityObject.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  entityObject.visible = true; // Ensure the entity is visible
  this.scene.add(entityObject);

  // Save the entity object in the game's component system
  this.game.components.graphics.set([entityData.id, 'graphics-three'], entityObject);
  return entityObject;
}
function processModel(model) {
  var clonedModel = model.clone();
  clonedModel.traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0xff0000 // Applying a red color for visibility
      });
    }
  });
  // Set model scale or other transformations if needed
  clonedModel.scale.set(1, 1, 1);
  return clonedModel;
}
function createGeometryForEntity(entityData) {
  var geometry, material, mesh;
  var entityGroup = new THREE.Group();

  // Define geometry based on entity type
  switch (entityData.type) {
    case 'BORDER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'PLAYER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'BULLET':
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
      break;
    case 'BLOCK':
    case 'TILE':
    default:
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  // Create material (color or texture)
  material = new THREE.MeshBasicMaterial({
    color: entityData.color || 0xffffff // Default to white if no color specified
  });

  // Create mesh and add it to the group
  mesh = new THREE.Mesh(geometry, material);
  if (entityData.type === 'TEXT') {
    mesh.visible = false; // Hide text meshes for now
  }

  if (entityData.texture) {
    mesh.visible = false; // Hide mesh until texture is loaded
  }

  entityGroup.add(mesh);
  return entityGroup;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateGraphic;
function inflateGraphic(entity, alpha) {
  if (entity.kind === 'building') {
    return; // for now
  }

  if (entity.destroyed === true) {
    return;
  }
  var graphic;
  if (entity.graphics && entity.graphics['graphics-three']) {
    graphic = entity.graphics['graphics-three'];
    if (entity.type !== 'BORDER') {
      // TODO: remove this
      this.updateGraphic(entity, alpha);
    }
  } else {
    graphic = this.createGraphic(entity);
    this.game.components.graphics.set([entity.id, 'graphics-three'], graphic);
  }
  if (!graphic) {
    return;
  }
  this.inflateTexture(entity, graphic);
}

/*
// Include the rolling animation logic// Include the rolling animation logic
if (graphic.isRolling && !graphic.rollCompleted) {
  graphic.rotation.x += 0.1; // Adjust the speed of rotation with this value
  console.log('graphic.rotation.x', graphic.rotation.x)
  // Check if the rotation has reached 0
  if (graphic.rotation.x >= 0) {
    console.log("ROLLING");

    graphic.rotation.x = 0; // Correct any overshoot
    graphic.isRolling = false;
    graphic.rollCompleted = true; // Stop the animation
  }
}
*/

// Include the fade-in animation logic with easing
/*
if (graphic.isFadingIn && !graphic.fadeCompleted) {
  graphic.progress += 0.05; // Increment progress. Adjust speed with this value.
  if (graphic.progress > 1) graphic.progress = 1; // Ensure progress doesn't exceed 1

  // Apply the easing function to the progress and then set the opacity
  graphic.material.opacity = easeInQuad(graphic.progress);

  // Check if the animation is complete
  if (graphic.progress === 1) {
    graphic.isFadingIn = false;
    graphic.fadeCompleted = true; // Stop the fade-in animation
  }
}
*/

function easeInQuad(t) {
  return t * t;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateTexture;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function inflateTexture(_x) {
  return _inflateTexture.apply(this, arguments);
}
function _inflateTexture() {
  _inflateTexture = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(entityData) {
    var texture, entityGraphic;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (entityData.texture) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          texture = this.game.getTexture(entityData.texture);
          if (texture) {
            _context.next = 6;
            break;
          }
          console.warn('Warning: Texture not found', entityData.texture);
          return _context.abrupt("return");
        case 6:
          // Retrieve the entity's graphic component, which could be a Mesh or a Group
          entityGraphic = entityData.graphics['graphics-three'];
          if (entityGraphic) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return");
        case 9:
          _context.next = 11;
          return applyTextureToEntityGraphic(this.game, entityData, entityGraphic);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _inflateTexture.apply(this, arguments);
}
function applyTextureToEntityGraphic(_x2, _x3, _x4) {
  return _applyTextureToEntityGraphic.apply(this, arguments);
}
function _applyTextureToEntityGraphic() {
  _applyTextureToEntityGraphic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(game, entityData, entityGraphic) {
    var texture, cachedTexture;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          texture = game.getTexture(entityData.texture);
          if (texture) {
            _context2.next = 4;
            break;
          }
          entityGraphic.visible = true; // No game texture found, ensure visibility and return
          return _context2.abrupt("return");
        case 4:
          if (texture.url) {
            _context2.next = 7;
            break;
          }
          entityGraphic.visible = true; // Texture has no URL, ensure visibility and return
          return _context2.abrupt("return");
        case 7:
          _context2.next = 9;
          return getCachedTexture(texture.url);
        case 9:
          cachedTexture = _context2.sent;
          if (cachedTexture) {
            _context2.next = 13;
            break;
          }
          entityGraphic.visible = true; // Texture failed to load, ensure visibility and return
          return _context2.abrupt("return");
        case 13:
          // Traverse the entity graphic component and apply texture to all child meshes
          entityGraphic.traverse(function (child) {
            if (child.isMesh) {
              applyTextureToMesh(child, cachedTexture, texture.sprite);
            }
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _applyTextureToEntityGraphic.apply(this, arguments);
}
function applyTextureToMesh(mesh, cachedTexture, sprite) {
  // console.log("applyTextureToMesh", mesh, cachedTexture, sprite)
  if (sprite) {
    // Adjust UV mapping for sprites
    var textureWidth = cachedTexture.image.width;
    var textureHeight = cachedTexture.image.height;
    var uvs = calculateSpriteUVs(sprite, textureWidth, textureHeight);

    // Clone the cached texture to avoid altering the original cached texture
    var clonedTexture = cachedTexture.clone();
    clonedTexture.repeat.set(-uvs.width, uvs.height); // Flip texture on the X-axis by setting width to -uvs.width
    clonedTexture.offset.set(uvs.x + uvs.width, 1 - uvs.y - uvs.height); // Adjust offset for the flipped texture

    mesh.material.map = clonedTexture;
  } else {
    // For non-sprite textures that need to be flipped on the X-axis
    var _clonedTexture = cachedTexture.clone();
    _clonedTexture.repeat.set(-1, 1); // Flip texture on the X-axis
    _clonedTexture.offset.set(1, 0); // Adjust offset for the flipped texture

    mesh.material.map = _clonedTexture;
  }
  mesh.material.needsUpdate = true;
  mesh.visible = true;
}
function calculateSpriteUVs(sprite, textureWidth, textureHeight) {
  sprite.width = sprite.width || 16; // Default sprite width
  sprite.height = sprite.height || 16; // Default sprite height

  return {
    x: Math.abs(sprite.x) / textureWidth,
    y: Math.abs(sprite.y) / textureHeight,
    width: sprite.width / textureWidth,
    height: sprite.height / textureHeight
  };
}
function getCachedTexture(_x5) {
  return _getCachedTexture.apply(this, arguments);
}
function _getCachedTexture() {
  _getCachedTexture = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(url) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!texturePool[url]) {
            // If the texture is not in the pool, load and cache it
            texturePool[url] = loadTexture(url);
          }
          return _context3.abrupt("return", texturePool[url]);
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getCachedTexture.apply(this, arguments);
}
function loadTexture(_x6) {
  return _loadTexture.apply(this, arguments);
}
function _loadTexture() {
  _loadTexture = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url) {
    var textureLoader;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          textureLoader = new THREE.TextureLoader();
          _context4.prev = 1;
          _context4.next = 4;
          return new Promise(function (resolve, reject) {
            textureLoader.load(url, resolve, undefined, reject);
          });
        case 4:
          return _context4.abrupt("return", _context4.sent);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](1);
          console.error('Error loading texture', url, _context4.t0);
          delete texturePool[url]; // Remove failed load from cache
          return _context4.abrupt("return", null);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return _loadTexture.apply(this, arguments);
}
var texturePool = {}; // Texture cache

/*

function customizeBoxUVs(geometry) {
  const uvAttribute = geometry.attributes.uv;
  const uvArray = uvAttribute.array;

  // Common UVs for all faces to cover the entire texture
  const commonUVs = [
    [0, 0], // Bottom left
    [1, 0], // Bottom right
    [1, 1], // Top right
    [0, 1]  // Top left
  ];

  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
    // Each face is two triangles, so 6 vertices in total
    const vertexIndices = [0, 1, 2, 2, 3, 0].map(v => v + faceIndex * 4);
    vertexIndices.forEach((vertexIndex, uvIndex) => {
      uvArray[vertexIndex * 2] = commonUVs[uvIndex % 4][0]; // U coordinate
      uvArray[vertexIndex * 2 + 1] = commonUVs[uvIndex % 4][1]; // V coordinate
    });
  }

  // Inform Three.js that the UVs have been updated
  uvAttribute.needsUpdate = true;
}

function getFaceUVs(texture, faceIndex) {
  // Calculate UVs based on the texture and which part of the texture you want to use for the face
  // This is a placeholder function, you need to implement the logic based on your texture layout and requirements
  // For example, you might divide the texture into sections and return UV coordinates for the section corresponding to the faceIndex
  const sectionWidth = 1 / 3; // Assuming 3x2 sections in the texture
  const sectionHeight = 1 / 2;
  const x = faceIndex % 3 * sectionWidth;
  const y = Math.floor(faceIndex / 3) * sectionHeight;

  return [
    [x, y + sectionHeight], // Bottom left
    [x + sectionWidth, y + sectionHeight], // Bottom right
    [x + sectionWidth, y], // Top right
    [x, y] // Top left
  ];
}


function customizeUVsForBox(faces) {
  // Customize UV mapping here based on your needs
  // This example divides the texture into quarters and applies each quarter to two faces of the box
  const uvCoordinates = [
    [0.5, 1], [0, 1], [0, 0.5], [0.5, 0.5], // First quarter
    [1, 1], [0.5, 1], [0.5, 0.5], [1, 0.5], // Second quarter
    // Add more for other faces, adjusting the texture coordinates accordingly
  ];

  faces.forEach((face, index) => {
    const uvIndex = Math.floor(index / 2); // Assuming two triangles per face
    const uvQuad = uvCoordinates[uvIndex];

    face.forEach((vertex, vertexIndex) => {
      const uv = uvQuad[vertexIndex];
      vertex.x = uv[0];
      vertex.y = uv[1];
    });
  });
}

*/
/*
function customizeBoxUVs(geometry, textureWidth, textureHeight) {
  // Calculate the aspect ratio of the texture
  const textureAspectRatio = textureWidth / textureHeight;

  const uvAttribute = geometry.attributes.uv;
  const uvArray = uvAttribute.array;

  // Iterate over each face of the box
  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      // Assuming each box face is a square, so aspect ratio is 1:1
      // If your box faces are not square, you would need to calculate the aspect ratio for each face

      // Calculate UV coordinates based on the aspect ratios
      let uMin, uMax, vMin, vMax;

      if (textureAspectRatio >= 1) {
          // Texture is wider than tall
          uMin = 0;
          uMax = 1;
          const scaleFactor = 1 / textureAspectRatio;
          vMin = (1 - scaleFactor) / 2; // Center vertically
          vMax = 1 - vMin;
      } else {
          // Texture is taller than wide
          vMin = 0;
          vMax = 1;
          const scaleFactor = textureAspectRatio;
          uMin = (1 - scaleFactor) / 2; // Center horizontally
          uMax = 1 - uMin;
      }

      // Apply calculated UVs to the current face
      // Each face is two triangles, so 6 vertices in total
      const vertexIndices = [0, 1, 2, 2, 3, 0].map(v => v + faceIndex * 4);
      const faceUVs = [
          [uMin, vMin], // Bottom left
          [uMax, vMin], // Bottom right
          [uMax, vMax], // Top right
          [uMin, vMax]  // Top left
      ];

      vertexIndices.forEach((vertexIndex, uvIndex) => {
          uvArray[vertexIndex * 2] = faceUVs[uvIndex % 4][0]; // U coordinate
          uvArray[vertexIndex * 2 + 1] = faceUVs[uvIndex % 4][1]; // V coordinate
      });
  }

*/

/*

// TODO: Better 2d sprite animation support
  let { url: textureUrl, sprite, frames, playing = true } = texture;

 // Function to handle sprite sheet and set appropriate UV mapping
 const handleSpriteSheet = (texture, spriteData) => {
  const tex = mesh.material.map;
  // console.log('tex', tex)
  if (tex && tex.image) {
    const textureWidth = tex.image.width;
    const textureHeight = tex.image.height;
    const uvs = {
      x: spriteData.x / textureWidth,
      y: spriteData.y / textureHeight,
      width: spriteData.width / textureWidth,
      height: spriteData.height / textureHeight
    };
    tex.repeat.set(uvs.width, uvs.height);
    tex.offset.set(uvs.x, 1 - uvs.y - uvs.height);
  }
};

  // Function to apply or update texture
  const applyOrUpdateTexture = (texUrl, spriteData) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texUrl, (loadedTexture) => {
      if (mesh.material.map && mesh.material.map.image.src === texUrl) {
        // Texture already exists, just update the sprite sheet
        if (spriteData) {
          handleSpriteSheet(loadedTexture, spriteData);
        }
      } else {
        // Apply new texture
        mesh.material.map = loadedTexture;
        mesh.material.needsUpdate = true;

        if (entityData.color) {
          const color = new THREE.Color(entityData.color);
          mesh.material.color.set(color);
        }

        if (spriteData) {
          // handleSpriteSheet(loadedTexture, spriteData);
        }
      }
    });
  };

  // Handle animated sprites
  if (Array.isArray(frames) && playing) {
    let frameIndex = entityData.texture.frame || 0;
    if (game.tick % 30 === 0) {
      let frame = frames[frameIndex];
      if (frame) {
        applyOrUpdateTexture(textureUrl, frame);
        frameIndex = (frameIndex >= frames.length - 1) ? 0 : frameIndex + 1;
        entityData.texture.frame = frameIndex;
      }
    }
  } else if (sprite) {
    // Handle static sprite sheets
    applyOrUpdateTexture(textureUrl, sprite);
  } else {
    // Handle simple textures without sprite sheets
    applyOrUpdateTexture(textureUrl);
  }

  */

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function removeGraphic(entityId) {
  var group = this.game.components.graphics.get([entityId, 'graphics-three']);
  if (group) {
    // Recursively dispose of group children
    group.traverse(function (child) {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          // If the material is an array of materials, dispose of each one
          if (Array.isArray(child.material)) {
            child.material.forEach(function (material) {
              return material.dispose();
            });
          } else {
            child.material.dispose();
          }
        }
      }
    });

    // Remove the group from its parent
    if (group.parent) {
      group.parent.remove(group);
    }

    // Alternatively, you can remove the group directly from the scene if it's directly added to it
    // this.scene.remove(group);

    // Remove the reference from your game components
    this.game.components.graphics.remove([entityId, 'graphics-three']);
  }
}
var _default = exports["default"] = removeGraphic;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = render;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// called as much as the client requires in order to render
function render(game, alpha) {
  var _this = this;
  var self = this;
  // Update the controls on each frame
  // this.controls.update();
  // Follow the player entity with the camera

  var fovEntities = new Map();
  var currentPlayer = this.game.data.currentPlayer;
  //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);

  if (this.game.useFov) {
    var itemsInFov = game.getPlayerFieldOfView(currentPlayer, game.data.fieldOfView, false);
    // console.log('itemsInFov', itemsInFov)

    itemsInFov.forEach(function (eId) {
      var ent = _this.game.entities.get(eId);
      if (ent) {
        _this.inflateGraphic(ent, alpha);
      }
    });
  } else {
    var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          eId = _step$value[0],
          state = _step$value[1];
        var ent = this.game.entities.get(eId);
        this.inflateGraphic(ent, alpha);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  this.renderer.render(this.scene, this.camera);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateGraphic;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function updateGraphic(entityData) {
  var mesh = this.game.components.graphics.get([entityData.id, 'graphics-three']);
  if (!mesh) {
    console.error('No mesh found for entity', entityData.id);
    return;
  }

  // Check and update mesh rotation if needed
  var hasRotationChanged = false;
  if (_typeof(entityData.rotation) === 'object' && entityData.rotation !== null) {
    // 3D rotation
    hasRotationChanged = mesh.rotation.x !== entityData.rotation.x || mesh.rotation.y !== entityData.rotation.y || mesh.rotation.z !== entityData.rotation.z;
    if (hasRotationChanged) {
      mesh.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);
    }
  } else {
    // 2D / 2.5D rotation (assuming around Y axis)
    hasRotationChanged = mesh.rotation.y !== entityData.rotation;
    if (hasRotationChanged) {
      mesh.rotation.set(0, entityData.rotation, 0);
    }
  }

  // get the current mesh position
  var currentMeshPosition = mesh.position.clone();
  // compare the current mesh position with the entityData position
  // only update the mesh position if the entityData position has changed
  if (-currentMeshPosition.x !== entityData.position.x || currentMeshPosition.y !== entityData.position.z) {
    if (typeof entityData.position.z !== 'number') {
      entityData.position.z = 0;
    }
    mesh.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  }
}

},{}]},{},[2])(2)
});

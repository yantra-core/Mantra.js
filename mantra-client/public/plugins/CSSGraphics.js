(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).CSSGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var _setTransform = _interopRequireDefault(require("./lib/camera/setTransform.js"));
var _rotateCameraOverTime = _interopRequireDefault(require("./lib/camera/rotateCameraOverTime.js"));
var _updateCameraPosition = _interopRequireDefault(require("./lib/camera/updateCameraPosition.js"));
var _updateEntityPosition = _interopRequireDefault(require("./lib/camera/updateEntityPosition.js"));
var _mouseWheelZoom = _interopRequireDefault(require("./lib/camera/mouseWheelZoom.js"));
var _zoom = _interopRequireDefault(require("./lib/camera/zoom.js"));
var _cameraShake = _interopRequireDefault(require("./lib/camera/cameraShake.js"));
var _applyThrow = _interopRequireDefault(require("./lib/camera/applyThrow.js"));
var _update = _interopRequireDefault(require("./lib/camera/update.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // CSSCamera.js - Marak Squires 2023
// Camera Transform
// Camera Entity Position ( used for `follow` and `CSSGraphics` )
// Camera Zoom
// Camera effects
// main update loop for camera
var CSSCamera = /*#__PURE__*/function () {
  function CSSCamera(scene) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, CSSCamera);
    this.id = CSSCamera.id;
    this.scene = scene;
    this.config = config;
    this.follow = true;
    this.isDragging = false;
    this.dragInertia = {
      x: 0,
      y: 0
    };
    this.isThrowing = false;
    this.rotating = false;
    this.mouseWheelEnabled = true;
    this.mouseWheelZoom = _mouseWheelZoom["default"].bind(this);
    this.zoom = _zoom["default"].bind(this);
    this.setTransform = _setTransform["default"].bind(this);
    this.updateEntityPosition = _updateEntityPosition["default"].bind(this);
    this.cameraShake = _cameraShake["default"].bind(this);
  }
  _createClass(CSSCamera, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      // this.resetCameraState();
      this.game.shakeCamera = _cameraShake["default"].bind(this); // for now
      game.zoom = this.zoom.bind(this);
      game.setZoom = this.zoom.bind(this); // TODO: legacy remove

      game.data.camera = {
        mode: 'follow',
        position: {
          x: 0,
          y: 0
        }
      };
      this.updateCameraPosition = _updateCameraPosition["default"].bind(this);
      this.applyThrow = _applyThrow["default"].bind(this);
      this.update = _update["default"].bind(this);
      this.scene.setTransform = this.setTransform.bind(this);
      this.scene.updateEntityPosition = this.updateEntityPosition.bind(this);

      // hoist rotateCamera to game
      game.rotateCamera = _rotateCameraOverTime["default"].bind(this);

      // sets auto-follow player when starting CSSGraphics ( for now )
      this.follow = true;
      this.game.systemsManager.addSystem('graphics-css-camera', this);
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      this.gameViewport = document.getElementById('gameHolder');
      this.gameViewport.style.transformOrigin = 'center center';
      this.initZoomControls();
      game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
        //console.log("CSSCamera.js", entityId, data, sequenceNumber)
        if (data.mouse) {
          // Update camera position based on drag deltas
          if (data.mouse.buttons.RIGHT) {
            _this.gameViewport.style.cursor = 'grabbing';
          }
          // console.log('Current Zoom', game.data.camera.currentZoom);
          data.mouse.dx = data.mouse.dx || 0;
          data.mouse.dy = data.mouse.dy || 0;
          var zoomFactor = 1 / game.data.camera.currentZoom || 4.5;
          var adjustedDx = data.mouse.dx * zoomFactor;
          var adjustedDy = data.mouse.dy * zoomFactor;
          //console.log('Adjusted Dx', adjustedDx, 'og', data.mouse.dx);
          _this.updateCameraPosition(-adjustedDx, -adjustedDy, data.mouse.isDragging);
        }
      });
    }
  }, {
    key: "resetCameraState",
    value: function resetCameraState() {
      // Reset other camera properties as needed
      this.game.viewportCenterXOffset = 0;
      this.game.viewportCenterYOffset = 0;
    }
  }, {
    key: "initZoomControls",
    value: function initZoomControls() {
      document.addEventListener('wheel', this.mouseWheelZoom, {
        passive: false
      });
      this.scene.mouseWheelEnabled = true;
    }

    // TODO: move rotateCamera and cancelThrow to common camera file
    // Method to rotate the camera
  }, {
    key: "rotateCamera",
    value: function rotateCamera(angle) {
      // Ensure the angle is a number and set a default if not
      if (typeof angle !== 'number') {
        console.error('Invalid angle for rotateCamera. Must be a number.');
        return;
      }
      // Update the CSS transform property to rotate the viewport
      this.gameViewport.style.transform = "rotate(".concat(angle, "deg)");
    }
  }, {
    key: "cancelThrow",
    value: function cancelThrow() {
      this.isThrowing = false;
      this.dragInertia = {
        x: 0,
        y: 0
      };
      // Reset cursor style back to default
      this.gameViewport.style.cursor = 'grab';
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove event listeners
      document.removeEventListener('wheel', this.mouseWheelZoom);
    }
  }]);
  return CSSCamera;
}();
_defineProperty(CSSCamera, "id", 'css-camera');
var _default = exports["default"] = CSSCamera;

},{"./lib/camera/applyThrow.js":4,"./lib/camera/cameraShake.js":5,"./lib/camera/mouseWheelZoom.js":6,"./lib/camera/rotateCameraOverTime.js":7,"./lib/camera/setTransform.js":8,"./lib/camera/update.js":9,"./lib/camera/updateCameraPosition.js":10,"./lib/camera/updateEntityPosition.js":11,"./lib/camera/zoom.js":12}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _CSSCamera = _interopRequireDefault(require("./CSSCamera.js"));
var _inflateBox = _interopRequireDefault(require("./lib/entity/inflateBox.js"));
var _inflateText = _interopRequireDefault(require("./lib/entity/inflateText.js"));
var _inflateGraphic = _interopRequireDefault(require("./lib/entity/inflateGraphic.js"));
var _inflateTexture = _interopRequireDefault(require("./lib/entity/inflateTexture.js"));
var _createGraphic = _interopRequireDefault(require("./lib/entity/createGraphic.js"));
var _updateGraphic = _interopRequireDefault(require("./lib/entity/updateGraphic.js"));
var _bindEntityEvents = _interopRequireDefault(require("./lib/entity/bindEntityEvents.js"));
var _bindYCraftEvents = _interopRequireDefault(require("./lib/entity/bindYCraftEvents.js"));
var _unload = _interopRequireDefault(require("./lib/unload.js"));
var _render = _interopRequireDefault(require("./lib/render.js"));
var _removeGraphic = _interopRequireDefault(require("./lib/entity/removeGraphic.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // CSSGraphics.js - Marak Squires 2023
// touch / mouse events on entities
// TODO: remove bindYCraftEvents.js file, replace with a Sutra
var CSSGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(CSSGraphics, _GraphicsInterface);
  var _super = _createSuper(CSSGraphics);
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  function CSSGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      camera = _ref.camera;
    _classCallCheck(this, CSSGraphics);
    _this = _super.call(this);

    // legacy API, remove in future
    if (typeof camera === 'string') {
      camera = {
        follow: true
      };
    }

    // Config scope for convenience
    _this.config = {
      camera: camera
    };
    _this.id = CSSGraphics.id;
    _this.async = CSSGraphics.async;
    _this.cameraPosition = {
      x: 0,
      y: 0
    };
    // this.game.data.camera.position = this.cameraPosition;
    _this.mouseWheelEnabled = false;

    // Binding methods to `this`
    _this.createGraphic = _createGraphic["default"].bind(_assertThisInitialized(_this));
    _this.inflateBox = _inflateBox["default"].bind(_assertThisInitialized(_this));
    _this.inflateText = _inflateText["default"].bind(_assertThisInitialized(_this));
    _this.inflateGraphic = _inflateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.inflateTexture = _inflateTexture["default"].bind(_assertThisInitialized(_this));
    _this.updateGraphic = _updateGraphic["default"].bind(_assertThisInitialized(_this));
    _this.render = _render["default"].bind(_assertThisInitialized(_this));
    _this.removeGraphic = _removeGraphic["default"].bind(_assertThisInitialized(_this));
    _this.bindEntityEvents = _bindEntityEvents["default"].bind(_assertThisInitialized(_this));
    _this.bindYCraftEvents = _bindYCraftEvents["default"].bind(_assertThisInitialized(_this));
    _this.unload = _unload["default"].bind(_assertThisInitialized(_this));

    // TODO: make this function lookup with defaults ( instead of -1 )
    _this.depthChart = ['background', 'border', 'wire', 'PART', 'TEXT', 'PLAYER', 'BLOCK', 'FIRE', 'WARP', 'NOTE'];
    // this.depthChart = this.depthChart.reverse();
    return _this;
  }
  _createClass(CSSGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      var cssCamera = new _CSSCamera["default"](this, this.camera);
      var windowHeight = window.innerHeight;
      this.game.use(cssCamera);
      game.camera = cssCamera;

      // Initialize the CSS render div
      this.initCSSRenderDiv();
      game.graphics.push(this);
      this.game.systemsManager.addSystem('graphics-css', this);

      // is sync load; however we still need to let the graphics pipeline know we are ready
      game.emit('plugin::ready::graphics-css', this);
      game.loadingPluginsCount--;
      this.game.viewportCenterXOffset = 0;
      this.game.viewportCenterYOffset = 0;
      document.body.style.cursor = 'default';
    }
  }, {
    key: "initCSSRenderDiv",
    value: function initCSSRenderDiv() {
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder);
      }
      var renderDiv = document.getElementById('css-render-div');
      if (!renderDiv) {
        renderDiv = document.createElement('div');
        renderDiv.id = 'css-render-div';
        renderDiv.className = 'render-div';
        gameHolder.appendChild(renderDiv);
      }
      this.renderDiv = renderDiv;
    }
  }, {
    key: "update",
    value: function update() {
      // Update logic goes here
    }
  }]);
  return CSSGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(CSSGraphics, "id", 'graphics-css');
_defineProperty(CSSGraphics, "removable", false);
_defineProperty(CSSGraphics, "async", true);
var _default = exports["default"] = CSSGraphics;

},{"../../lib/GraphicsInterface.js":1,"./CSSCamera.js":2,"./lib/entity/bindEntityEvents.js":13,"./lib/entity/bindYCraftEvents.js":14,"./lib/entity/createGraphic.js":15,"./lib/entity/inflateBox.js":16,"./lib/entity/inflateGraphic.js":17,"./lib/entity/inflateText.js":18,"./lib/entity/inflateTexture.js":19,"./lib/entity/removeGraphic.js":20,"./lib/entity/updateGraphic.js":21,"./lib/render.js":22,"./lib/unload.js":23}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyThrow;
// Apply the throw inertia to the camera
function applyThrow() {
  if (!this.isThrowing) return;
  var game = this.game;
  var decayFactor = 0.985; // Increase closer to 1 for longer throws

  game.viewportCenterXOffset += this.dragInertia.x;
  game.viewportCenterYOffset += this.dragInertia.y;

  // Decrease the inertia
  this.dragInertia.x *= decayFactor;
  this.dragInertia.y *= decayFactor;

  // Continue the animation if inertia is significant
  if (Math.abs(this.dragInertia.x) > 0.1 || Math.abs(this.dragInertia.y) > 0.1) {
    requestAnimationFrame(this.applyThrow.bind(this));
  } else {
    this.isThrowing = false;
    // console.log("1 STOPPED THROWING")
  }

  if (!this.isThrowing) {
    // Reset cursor style back to default at the end of a throw
    this.gameViewport.style.cursor = 'grab';
    //console.log("2 STOPPED THROWING")
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cameraShake;
// cameraShake.js - Marak Squires 2023
function cameraShake(_ref) {
  var _this = this;
  var _ref$initialIntensity = _ref.initialIntensity,
    initialIntensity = _ref$initialIntensity === void 0 ? 100 : _ref$initialIntensity,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 777 : _ref$duration;
  var gameViewport = document.getElementById('gameHolder');
  if (!gameViewport) {
    console.log('Warning: could not find gameHolder div, cannot apply camera shake');
    return;
  }

  // Debounce mechanism
  if (gameViewport.dataset.isShaking === 'true') {
    console.log('Camera is already shaking. Ignoring additional shake requests.');
    return;
  }
  gameViewport.dataset.isShaking = 'true';
  var startTime = Date.now();
  var shake = function shake() {
    var elapsedTime = Date.now() - startTime;
    var remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      // Reset transform after shaking completes
      gameViewport.style.transform = "scale(".concat(_this.game.data.camera.currentZoom, ")");
      gameViewport.dataset.isShaking = 'false'; // Reset the debounce flag
      return;
    }

    // Gradually reduce the intensity
    var intensity = initialIntensity * (remainingTime / duration);

    // Smooth shake effect using sine function
    var x = intensity * Math.sin(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);
    var y = intensity * Math.cos(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);

    // Apply the shake with the current zoom
    gameViewport.style.transform = "scale(".concat(_this.game.data.camera.currentZoom, ") translate(").concat(x, "px, ").concat(y, "px)");

    // Apply a random force to each entity
    Object.keys(_this.game.data.ents._).forEach(function (eId) {
      var entity = _this.game.data.ents._[eId];
      // TODO: make more configurable / part of constructor config
      // TODO: add a shakeable flag to entities / add parameter for tracking "shakeability", etc
      if (entity.type === 'PARTICLE' || entity.type === 'STAR' || entity.type === 'HEXAPOD' || entity.type === 'DEMON') {
        var forceX = Math.random() * intensity - intensity / 2;
        var forceY = Math.random() * intensity - intensity / 2;
        forceX = forceX * 0.01;
        forceY = forceY * 0.01;
        game.applyForce(eId, {
          x: forceX,
          y: forceY
        });
      }
    });
    requestAnimationFrame(shake);
  };
  shake();
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssMouseWheelZoom;
function cssMouseWheelZoom(event) {
  if (!this.mouseWheelEnabled) {
    return;
  }
  var game = this.game;
  var scale = game.data.camera.currentZoom;

  // Game viewport
  var gameViewport = document.getElementById('gameHolder');

  // Zoom settings
  var zoomSettings = {
    intensity: 0.1,
    // Base zoom intensity
    minScale: 0.1,
    // Minimum scale limit
    logBase: 2 // Logarithmic base
  };

  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  var delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  var direction = delta > 0 ? 1 : -1;

  // Applying logarithmic scale for smooth zoom
  var logScaledIntensity = zoomSettings.intensity * Math.log(scale + 1) / Math.log(zoomSettings.logBase);
  var newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);

  // Center of the viewport
  var viewportCenterX = window.innerWidth / 2;
  var viewportCenterY = window.innerHeight / 2;

  // Calculate offsets based on the old scale
  var offsetX = (viewportCenterX - this.scene.cameraPosition.x) / scale;
  var offsetY = (viewportCenterY - this.scene.cameraPosition.y) / scale;

  // Update scale
  this.zoom(newScale);
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rotateCameraOverTime;
// Method to smoothly rotate the camera over a given duration using CSS transitions
function rotateCameraOverTime() {
  var _this = this;
  var targetAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1100;
  if (typeof targetAngle !== 'number' || typeof duration !== 'number') {
    console.error('Invalid arguments for rotateCameraOverTime. Both targetAngle and duration must be numbers.');
    return;
  }
  if (this.rotating) {
    return;
  }
  this.rotating = true;
  this.game.data.camera.rotation = targetAngle;

  // Retrieve the current zoom level
  var currentZoom = this.game.data.camera.currentZoom;

  // Calculate the center of the screen
  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;

  // console.log('this.cameraPosition.y', this.game.data.camera.position.y)
  // TODO: camera center is still not correct when zoom scale is not 1
  // no need for X?
  // centerX = centerX / currentZoom;
  // centerY = centerY / currentZoom;
  // centerY = centerY + this.game.viewportCenterYOffset;
  // centerY = centerY +  this.game.data.camera.position.y / currentZoom;
  // Set the transition property on the gameViewport
  this.gameViewport.style.transition = "transform ".concat(duration, "ms");

  // Set transform-origin to the calculated center
  this.gameViewport.style.transformOrigin = "".concat(centerX, "px ").concat(centerY, "px");

  // Apply the combined scale (for zoom) and rotation
  this.gameViewport.style.transform = "scale(".concat(currentZoom, ") rotate(").concat(targetAngle, "deg)");

  // Reset the transition after the animation is complete
  setTimeout(function () {
    _this.gameViewport.style.transition = '';
    _this.rotating = false;
    _this.gameViewport.style.transformOrigin = '50% 50%';
    _this.gameViewport.style.transform = "scale(".concat(currentZoom, ") rotate(", 0, "deg)");
  }, duration);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTransform;
function setTransform(entityData, entityElement, domX, domY, rotation, angle) {
  // Retrieve the last rotation value, default to 0 if not set
  var lastRotation = entityElement.dataset.rotation || 0;

  // Check if the element has a background image
  var hasBackgroundImage = entityElement.style.backgroundImage && entityElement.style.backgroundImage !== 'none';

  // Update rotation if provided and no background image
  if (rotation /*&& !hasBackgroundImage*/) {
    lastRotation = angle;
    entityElement.dataset.rotation = angle;
  }

  // Update the transform property
  var newTransform = "translate(".concat(truncateToPrecision(domX, 2), "px, ").concat(truncateToPrecision(domY, 2), "px)");

  // Add rotation to the transform if no background image
  if (!hasBackgroundImage) {}
  if (entityData.type !== 'PLAYER') {
    newTransform += " rotate(".concat(lastRotation, "deg)");
  }

  // compare the new transform to the previous transform
  // if they are the same, don't update
  var prevTransform = entityElement.style.transform;
  if (prevTransform !== newTransform) {
    entityElement.style.transform = newTransform;
  }
}
function truncateToPrecision(value, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;
function update() {
  var game = this.game;
  var currentPlayer = this.game.getEntity(game.currentPlayerId);

  // Current zoom level
  var currentZoom = game.data.camera.currentZoom;

  // Get browser window dimensions
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  var zoomFactor = this.game.data.camera.currentZoom;
  // console.log('zoomFactor', zoomFactor)

  if (typeof game.viewportCenterXOffset !== 'number') {
    game.viewportCenterXOffset = 0;
  }
  if (typeof game.viewportCenterYOffset !== 'number') {
    game.viewportCenterYOffset = 0;
  }

  // game.viewportCenterYOffset = 500;
  // console.log('game.viewportCenterYOffset ', game.viewportCenterYOffset )

  // console.log(zoomFactor, game.viewportCenterXOffset, game.viewportCenterYOffset)

  // Update the camera position
  if (this.follow && currentPlayer && currentPlayer.position) {
    // If following a player, adjust the camera position based on the player's position and the calculated offset
    this.scene.cameraPosition.x = currentPlayer.position.x + game.viewportCenterXOffset;
    //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;

    var newY = currentPlayer.position.y + game.viewportCenterYOffset;
    //newY = newY / zoomFactor;
    if (game.data.camera.mode === 'platform') {
      // locks camera to not exceed bottom of screen for platform mode
      if (newY < windowHeight * 0.35) {
        this.scene.cameraPosition.y = newY;
      } else {
        this.scene.cameraPosition.y = windowHeight * 0.35;
      }
    } else {
      this.scene.cameraPosition.y = newY;
    }
    // this.scene.cameraPosition.y = newY;
  } else {
    // If not following a player, use the calculated offsets directly
    this.scene.cameraPosition.x = game.viewportCenterXOffset;
    this.scene.cameraPosition.y = game.viewportCenterYOffset;
  }

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateCameraPosition;
// Method to update camera position based on drag
function updateCameraPosition(dx, dy, isDragging) {
  var game = this.game;

  // New throw is starting, cancel existing throw
  if (this.isDragging && !isDragging) {
    this.cancelThrow();
  }
  if (isDragging) {
    this.gameViewport.style.cursor = 'grabbing';
    this.isDragging = true;
    // this.follow = false;
    if (typeof dx === 'number') {
      game.viewportCenterXOffset += dx;
    }
    if (typeof dy === 'number') {
      game.viewportCenterYOffset += dy;
    }
  }
  if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
    // console.log('THROWING', dx, dy)
    this.isThrowing = true;
    this.isDragging = false;
    if (Math.abs(dx) > 2) {
      this.dragInertia.x = dx * 1.6;
    }
    if (Math.abs(dy) > 2) {
      this.dragInertia.y = dy * 1.6;
    }
    requestAnimationFrame(this.applyThrow.bind(this));
  }
  if (!isDragging) {
    this.isDragging = false;
  }
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateEntityPosition;
function updateEntityPosition(entityElement, entityData) {
  var position = entityData.position;
  var rotation = entityData.rotation;
  var type = entityData.type;
  var width = entityData.width;
  var height = entityData.height;
  if (typeof entityData.radius === 'number') {
    width = entityData.radius;
    height = entityData.radius;
  }

  // Field of view (FoV) dimensions
  var fovWidth = window.outerWidth;
  var fovHeight = window.outerHeight;
  fovWidth = 600;
  fovHeight = 600;
  var adjustedPosition = {
    x: position.x - (this.scene.cameraPosition.x - window.innerWidth / 2),
    y: position.y - (this.scene.cameraPosition.y - window.outerHeight / 2)
  };

  // Check if the entity is within the field of view
  // Remark: Field of View is disabled ( for now ), it *should* be working as expected,
  //         the current implementation will hide the entity, we should removeEntity() instead
  if (true || isWithinFieldOfView(game, position, this.cameraPosition, width, height, fovWidth, fovHeight)) {
    var domX = adjustedPosition.x - width / 2;
    var domY = adjustedPosition.y - height / 2;

    // Convert rotation to degrees
    var angle = rotation * (180 / Math.PI);

    // Apply transformation to the entity
    this.setTransform(entityData, entityElement, domX, domY, rotation, angle);
    entityElement.style.display = ''; // Make sure the element is visible
  } else {
    /*
    if (entityData.type !== 'BACKGROUND' || entityData.type !== 'building') {
      // Hide the entity if it's outside the field of view
      entityElement.style.display = 'none';
    }
    */
  }
  if (entityData.style && entityData.style.display === 'none') {
    entityElement.style.display = 'none';
  }
  return entityElement;
}
function isWithinFieldOfView(game, position, cameraPosition, width, height, fovWidth, fovHeight) {
  // Calculate the center position of the entity
  var entityCenterX = position.x + width / 2;
  var entityCenterY = position.y + height / 2;

  // Calculate the distance from the entity center to the camera position
  var distanceX = entityCenterX - cameraPosition.x;
  var distanceY = entityCenterY - cameraPosition.y + 100;

  // Calculate the maximum allowed distance for an entity to be within the FoV
  // This can be half of the FoV width or height, depending on how you define the FoV area
  var maxDistance = Math.min(fovWidth, fovHeight);
  var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // console.log('distance', distance, maxDistance)
  // Check if the entity is within the distance
  return distance <= maxDistance;
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = zoom;
var minZoom = 0.1;
var maxZoom = 10;
function zoom(scale) {
  var transitionTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0s';
  if (scale < minZoom) {
    scale = minZoom;
  }
  if (scale > maxZoom) {
    scale = maxZoom;
  }
  this.game.data.camera.currentZoom = scale;
  var gameViewport = document.getElementById('gameHolder');
  if (gameViewport) {
    // Set the transform origin to the center
    gameViewport.style.transformOrigin = 'center center';

    // Set transition time
    gameViewport.style.transition = "transform ".concat(transitionTime);

    // Calculate the translation needed to keep the screen's center constant
    var centerX = window.innerWidth / 2;
    var centerY = window.outerHeight / 2;
    var playerHeightOffset = 16;
    if (window === top) {} else {
      // if embed in iframe, adjust for iframe offset
      playerHeightOffset = 32;
    }

    // The logic here ensures that the screen center remains constant during zoom
    // X adjustment not needed for default zoom behavior
    // let newCameraX = (centerX - (centerX / scale));
    var newCameraY = centerY - centerY / scale;
    //game.viewportCenterXOffset = newCameraX;
    // alert()
    this.game.viewportCenterYOffset = newCameraY + playerHeightOffset;

    // Apply scale and translate transform
    gameViewport.style.transform = "scale(".concat(scale, ")");
  } else {
    console.log('Warning: could not find gameHolder div, cannot zoom');
  }
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bindEntityEvents;
function bindEntityEvents(entityData, entityElement) {
  var game = this.game;
  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)
  entityElement.addEventListener('pointerdown', function (ev) {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    game.emit('pointerDown', ent, ev);
  });
  entityElement.addEventListener('pointerup', function (ev) {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    game.emit('pointerUp', ent, ev);
  });
  entityElement.addEventListener('pointermove', function (ev) {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    game.emit('pointerMove', ent, ev);
  });
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bindYCraftEvents;
// TODO: Remove this file and rely on a Sutra instead
// We could also delegate to the part itself from bindEntityEvents.js handlers
function bindYCraftEvents(entityData, entityElement) {
  // console.log("bindYCraftEvents", entityData, entityElement)
  // add hover state with 3d drop shadow effect
  entityElement.addEventListener('mouseover', function () {
    entityElement.style.boxShadow = '5px 5px 10px rgba(0,0,0,0.5)';
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    // delgate based on part type name
    var partName = ent.yCraft.part.name;
    var partType = ent.yCraft.part.type;
    var part = ent.yCraft.part;
    if (partType === 'MotionDetector') {
      // console.log('MotionDetector', part);
      ent.yCraft.part.onFn();
    }
  });
  entityElement.addEventListener('mouseout', function () {
    entityElement.style.boxShadow = '';
  });
  entityElement.addEventListener('pointerdown', function (ev) {
    // console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    // delgate based on part type name
    var partName = ent.yCraft.part.name;
    var partType = ent.yCraft.part.type;
    var part = ent.yCraft.part;
    if (partType === 'Button') {
      ent.yCraft.part.press();
    }
    // LEDLight, Latch, Amplifier, etc
    if (ent && ent.yCraft && ent.yCraft.part.toggle) {
      ent.yCraft.part.toggle();
    }
  });
  entityElement.addEventListener('pointerup', function (ev) {
    // console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    var ent = game.getEntity(entityData.id);
    // delgate based on part type name
    var partName = ent.yCraft.part.name;
    var partType = ent.yCraft.part.type;
    if (partType === 'Button') {
      if (ent && ent.yCraft && ent.yCraft.part.release) {
        ent.yCraft.part.release();
      }
    }
  });
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createGraphic;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function createGraphic(entityData) {
  if (entityData.destroyed === true) {
    // ignore, shouldn't have made it here, check upstream as well
    return;
  }
  var entityElement = document.createElement('div');
  entityElement.id = "entity-".concat(entityData.id);

  // set data-id to entity id
  entityElement.setAttribute('mantra-id', entityData.id);
  entityElement.className = 'entity-element';
  entityElement.style.position = 'absolute';
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (_typeof(entityData.rotation) === 'object') {
      // transform 3d to 2.5d
      entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
    } else {
      entityData.rotation = entityData.rotation;
    }
  }
  switch (entityData.type) {
    case 'BULLET':
      // For BULLET entities, create a circle
      var radius = entityData.radius || 0;
      // radius = 1;
      entityElement.style.width = entityData.radius + 'px';
      entityElement.style.height = entityData.radius + 'px';
      // console.log('inflating bullet', entityData)
      //entityElement.style.width = entityData.width + 'px';
      //entityElement.style.height = entityData.height + 'px';
      //entityElement.style.width = (radius / 2) + 'px';
      //entityElement.style.height = (radius / 2) + 'px';
      //entityElement.style.borderRadius = '50%';  // This will make the div a circle
      //entityElement.style.background = 'red';
      this.inflateBox(entityElement, entityData);
      break;
    case 'PLAYER':
      // For PLAYER entities, create a triangle
      entityElement.style.width = entityData.width + 'px';
      entityElement.style.height = entityData.height + 'px';
      //entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
      //entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
      //entityElement.style.borderBottom = entityData.height + 'px solid green';
      // entityElement.classList.add('pixelart-to-css');
      // Set default sprite
      // entityElement.classList.add('guy-right-0');
      this.inflateBox(entityElement, entityData);
      break;
    case 'TEXT':
      entityElement = this.inflateText(entityElement, entityData);
      break;
    default:
      if (entityData.type === 'PART' && entityData.name === 'Display') {
        this.inflateText(entityElement, entityData);
      } else {
        this.inflateBox(entityElement, entityData);
      }
      break;
  }

  // new api for entity.size
  if (typeof entityData.radius !== 'undefined') {
    // set circle size
    entityElement.style.width = entityData.radius + 'px';
    entityElement.style.height = entityData.radius + 'px';
    entityElement.style.borderRadius = '50%'; // This will make the div a circle
    // ensure background image will fit / cover expand
    // entityElement.style.backgroundSize = `${entityData.radius}px ${entityData.radius}px`;
  }

  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    var hexColor = '#' + entityData.color.toString(16);
    // update the background color
    var randomHexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // console.log("SETTING BG COLOR", entityData.color, hexColor)
    // entityElement.style.background = randomHexColor;
  }

  this.renderDiv.appendChild(entityElement);

  // Update the position of the entity element
  this.updateEntityPosition(entityElement, entityData);
  return entityElement;
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateBox;
function inflateBox(entityElement, entityData) {
  // console.log('inflating entity', entityData.type, entityData.name)
  var game = this.game;
  var getTexture = game.getTexture;
  var depthChart = this.depthChart;
  // For other entities, create a rectangle
  var hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }
  if (typeof entityData.radius === 'number') {
    entityElement.style.width = entityData.radius + 'px';
    entityElement.style.height = entityData.radius + 'px';
  } else {
    entityElement.style.width = entityData.width + 'px';
    entityElement.style.height = entityData.height + 'px';
  }

  // entityElement.style.borderRadius = '10px';  // Optional: to make it rounded

  // set default depth based on type
  entityElement.style.zIndex = depthChart.indexOf(entityData.type);
  this.bindEntityEvents(entityData, entityElement);

  // TODO: move to separate file for inflatePart,
  if (entityData.type === 'PART') {
    // TODO: part.kind, not name, name is the individual part name user defined
    switch (entityData.name) {
      case 'Wire':
        entityElement.style.zIndex = -1;
        break;
      case 'Display':
        entityElement.style.zIndex = -1;
        break;
      default:
        // set 1000 z-index for parts
        entityElement.style.zIndex = depthChart.indexOf('PART');
        break;
    }

    // add pointer cursor for buttons on hover
    entityElement.style.cursor = 'pointer';
    this.bindYCraftEvents(entityData, entityElement);
  }

  // console.log(entityData.type, entityData.name, entityElement.style.zIndex);
  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor;
  if (entityData.style) {
    Object.keys(entityData.style).forEach(function (key) {
      entityElement.style[key] = entityData.style[key];
    });
  }
  if (entityData.type === 'BLOCK' && entityData.kind === 'Tile') {
    // TODO: refactor API
    // tileFlip(entityElement, hexColor, getTexture, entityData);
  }

  // console.log('entityElement', entityElement)

  this.updateEntityPosition(entityElement, entityData);
  return entityElement;
}
function tileFlip(entityElement, hexColor, getTexture, entityData) {
  var texture = getTexture(entityData.texture);
  // Calculate animation duration based on X and Y coordinates
  var duration = Math.abs(entityData.position.x) + Math.abs(entityData.position.y);
  duration = duration / 500; // Divide by 1000 to get a duration in seconds

  // cap duration at min of 0.5
  duration = Math.max(duration, 0.1);
  duration = Math.min(duration, 3.3);

  // Create a wrapper element for the flip effect
  var flipWrapper = document.createElement('div');
  flipWrapper.style.position = 'relative';
  flipWrapper.style.width = '100%';
  flipWrapper.style.height = '100%';
  flipWrapper.style.perspective = '1000px'; // Set the perspective for the 3D effect

  // Create the front and back faces of the tile
  var frontFace = document.createElement('div');
  frontFace.style.position = 'absolute';
  frontFace.style.width = '100%';
  frontFace.style.height = '100%';
  frontFace.style.backfaceVisibility = 'hidden'; // Hide the back face during the animation
  frontFace.style.animation = "flip ".concat(duration, "s ease"); // Set the animation using keyframes
  frontFace.style.background = "url('".concat(texture.url, "')");
  frontFace.style.backgroundRepeat = 'no-repeat';
  frontFace.style.backgroundSize = 'cover';
  var backFace = document.createElement('div');
  backFace.style.position = 'absolute';
  backFace.style.width = '100%';
  backFace.style.height = '100%';
  backFace.style.backfaceVisibility = 'hidden'; // Hide the back face during the animation
  backFace.style.animation = "flip ".concat(duration, "s ease"); // Set the animation using keyframes
  backFace.style.transform = 'rotateY(180deg)'; // Initial rotation for the back face, flipped
  backFace.style.background = hexColor;

  // Append front and back faces to the wrapper
  flipWrapper.appendChild(frontFace);
  flipWrapper.appendChild(backFace);

  // Append the wrapper to the entityElement
  entityElement.appendChild(flipWrapper);

  // Remove the flipWrapper after animation is complete
  flipWrapper.addEventListener('animationend', function () {
    //entityElement.background = 
    entityElement.style.background = "url('".concat(texture.url, "')");
    entityElement.style.backgroundRepeat = 'no-repeat';
    entityElement.style.backgroundSize = 'cover';

    // clear animations styles
    frontFace.style.animation = '';
    frontFace.style.transform = '';
    backFace.style.animation = '';
    backFace.style.transform = '';

    //flipWrapper.removeChild(frontFace);
    //flipWrapper.removeChild(backFace);
    if (entityElement) {
      //entityElement.removeChild(flipWrapper);
    }
    flipWrapper.remove();
  });
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateEntity;
function inflateEntity(entity, alpha) {
  // checks for existence of entity, performs update or create
  var graphic;
  if (entity.graphics && entity.graphics['graphics-css']) {
    graphic = this.updateGraphic(entity, alpha);
  } else {
    graphic = this.createGraphic(entity);
    this.game.components.graphics.set([entity.id, 'graphics-css'], graphic);
  }

  // TODO: don't send .destroyed=true ents?
  // after entity has been inflated, check to see if a texture should be applied
  // this will also run any animations on the entity.animations component
  if (!graphic) {
    // console.log('warning: no graphic', entity)
    return;
  }
  this.inflateTexture(entity, graphic);
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateText;
function inflateText(entityElement, entityData) {
  var depthChart = this.depthChart;
  // TODO: check if chat bubble already exists, if so just update it
  // Create a container for the chat bubble

  entityElement.innerText = entityData.text;
  if (entityData.style) {
    // apply styles
    for (var key in entityData.style) {
      entityElement.style[key] = entityData.style[key];
    }
  }
  if (entityData.width) {
    entityElement.style.width = entityData.width + 'px';
  }
  if (entityData.color) {
    entityElement.style.color = entityData.color;
  }

  /* Remark: No need to bind each entity to a pointerdown event for CSSGraphics, we can delegate
  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)
  chatBubble.addEventListener('pointerdown', (ev) => {
    //console.log(ev.target, entityData.id, entityData.type, entityData)
    // get the full ent from the game
    let ent = game.getEntity(entityData.id);
    game.emit('pointerDown', ent, ev);
  });
  */

  // console.log('appending new text element')
  // Append the chat bubble to the container
  // entityElement.appendChild(chatBubble);
  // Update the position of the chat bubble container
  //this.updateEntityElementPosition(entityElement, entityData);

  return entityElement;
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateTexture;
function inflateTexture(entityData, entityElement) {
  if (!entityData.texture) return;
  var game = this.game;
  var texture = game.getTexture(entityData.texture);
  if (!texture) {
    // console.warn('Warning: Texture not found', entityData.texture);
    return;
  }
  var textureUrl = texture.url,
    _texture$sprite = texture.sprite,
    spritePosition = _texture$sprite === void 0 ? {
      x: 0,
      y: 0
    } : _texture$sprite,
    frames = texture.frames,
    rate = texture.rate,
    _texture$playing = texture.playing,
    playing = _texture$playing === void 0 ? true : _texture$playing;
  // Extract the current texture URL from the element's style
  var currentTextureUrl = entityElement.style.backgroundImage.slice(5, -2);

  // Extract the current sprite name from the data attribute
  var currentSpriteName = entityElement.getAttribute('data-texture-sprite');
  var newSpriteName = entityData.texture.sprite;

  // Check if the texture or its sprite name has changed
  var isTextureChanged = currentTextureUrl !== textureUrl || currentSpriteName !== newSpriteName;

  // Check if the element already has a texture applied
  var isTextureSet = entityElement.style.backgroundImage.includes(textureUrl);

  // Set initial texture state only if no texture is applied or if the texture has changed
  if (!isTextureSet || isTextureChanged) {
    if (Array.isArray(frames) && frames.length > 0) {
      spritePosition = frames[0];
    } else if (typeof entityData.texture.frame === 'number') {
      spritePosition = frames[entityData.texture.frame];
    }
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
  }

  // Update frame index and position for animated sprites
  if (Array.isArray(frames) && playing) {
    var frameIndex = parseInt(entityElement.getAttribute('data-frame-index'), 10) || 0;
    var frame = frames[frameIndex];
    if (typeof rate !== 'number') {
      rate = 30;
    }
    if (game.tick % rate === 0) {
      // uses configurable rate from texture.rate, see defaulAssets.js file
      if (frame) {
        spritePosition = frame;
        frameIndex = frameIndex >= frames.length - 1 ? 0 : frameIndex + 1;
        entityElement.setAttribute('data-texture-sprite', texture.sprite.name);
      }
      entityElement.setAttribute('data-frame-index', frameIndex);
      applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
    }
  } else {
    // Update the background size for non-animated textures
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
  }
}
function applyTextureStyles(texture, element, textureUrl, spritePosition, entityData) {
  Object.assign(element.style, {
    background: "url('".concat(textureUrl, "') no-repeat ").concat(spritePosition.x, "px ").concat(spritePosition.y, "px"),
    border: 'none',
    zIndex: entityData.position.z,
    borderRadius: '0px',
    backgroundSize: !texture.frames ? "".concat(entityData.width, "px ").concat(entityData.height, "px") : ''
  });
}

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeGraphic;
function removeGraphic(entityId) {
  var entity = this.game.getEntity(entityId);
  if (!entity || !entity.graphics || !entity.graphics['graphics-css']) {
    return;
  }
  var renderDiv = document.getElementById('css-render-div');
  if (renderDiv && renderDiv.contains(entity.graphics['graphics-css'])) {
    entity.graphics['graphics-css'].remove();
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateGraphic;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function updateGraphic(entityData) {
  var game = this.game;
  // TODO: move this to common 3D-2.5D transform function(s)
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (_typeof(entityData.rotation) === 'object') {
      // transform 3d to 2.5d
      entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
    } else {
      entityData.rotation = entityData.rotation;
    }
  }
  var entityElement = document.getElementById("entity-".concat(entityData.id));
  if (entityElement) {
    // Update the entity color
    if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
      // entityData.color is int number here we need a hex
      var hexColor = '#' + entityData.color.toString(16);
      // update the background color
      entityElement.style.background = hexColor;
    }
    if (typeof entityData.position.z === 'number') {
      entityElement.style.zIndex = entityData.position.z;
    }
    if (entityData.type === 'TEXT' && typeof entityData.text !== 'undefined' && entityData.text !== null) {
      // check that text has changed
      if (entityElement.innerHTML !== entityData.text) {
        entityElement.innerHTML = entityData.text;
      }
      // return this.inflateText(entityData);
    }

    // new api for Entity.size
    if (typeof entityData.radius !== 'undefined') {
      // Multiply the radius by 2 to get the diameter for CSS
      var diameter = entityData.radius * 2;
      //entityElement.style.width = diameter + 'px';
      //entityElement.style.height = diameter + 'px';

      // Adjust the position to align with the Matter.js body
      // This moves the element left and up by half its width and height
    }

    // entityElement.style.transition = 'width 1.5s ease, height 1.5s ease';

    if (typeof entityData.radius !== 'number') {
      if (typeof entityData.width !== 'undefined') {
        entityElement.style.width = entityData.width + 'px';
      }
      if (typeof entityData.height !== 'undefined') {
        entityElement.style.height = entityData.height + 'px';
      }
    } else {
      // Multiply the radius by 2 to get the diameter for CSS
      var _diameter = entityData.radius * 2;
      entityElement.style.width = _diameter + 'px';
      entityElement.style.height = _diameter + 'px';
    }
    if (entityData.style) {
      Object.keys(entityData.style).forEach(function (key) {
        entityElement.style[key] = entityData.style[key];
      });
    }
    return this.updateEntityPosition(entityElement, entityData);
  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}

/*

export default function updateGraphic(entityData) {
  let game = this.game;

  // Rotation handling with type check
  if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
    entityData.rotation = entityData.rotation.x;
  }

  const entityElement = document.getElementById(`entity-${entityData.id}`);
  if (entityElement) {
    // Update entity color
    updateEntityColor(entityData, entityElement);
    // Update zIndex
    updateEntityZIndex(entityData, entityElement);
    // Update style
    updateEntityStyle(entityData, entityElement);
    // Update texture
    updateEntityTexture(entityData, entityElement, game);
    // Update text
    updateEntityText(entityData, entityElement);
    // console.log('entityData.previousPosition', entityData.previousPosition, entityData.position)
    // Handling of entity position updates
    // Check if the entity's position has changed
    // this wont work since all graphics needs to move if camera moves
    return this.updateEntityPosition(entityElement, entityData);

  } else {
    // Create the graphic if it doesn't exist
    return this.createGraphic(entityData);
  }
}

const truncate = (value, precision = 0) => { // FPS typically doesn't need decimals
  return Math.round(value);
};


// Function to check if the entity's position has changed
function hasPositionChanged(entityData) {
  // Function to truncate a number to four decimal places
  
  if (!entityData.previousPosition) {
    return true;
  }

  const prevPosX = truncate(entityData.previousPosition.x);
  const prevPosY = truncate(entityData.previousPosition.y);
  const currentPosX = truncate(entityData.position.x);
  const currentPosY = truncate(entityData.position.y);

  // console.log('prevPosX', prevPosX, 'prevPosY', prevPosY, 'currentPosX', currentPosX, 'currentPosY', currentPosY)

  return prevPosX !== currentPosX || prevPosY !== currentPosY;
}

// Separate function to handle color update
function updateEntityColor(entityData, entityElement) {
  if (entityData.color !== undefined && entityData.color !== null) {
    let hexColor = '#' + entityData.color.toString(16);
    entityElement.style.background = hexColor;
  }
}

// Separate function to handle zIndex update
function updateEntityZIndex(entityData, entityElement) {
  if (typeof entityData.position.z === 'number') {
    entityElement.style.zIndex = entityData.position.z;
  }
}

// Separate function to handle style update
function updateEntityStyle(entityData, entityElement) {
  if (entityData.style) {
    Object.keys(entityData.style).forEach((key) => {
      entityElement.style[key] = entityData.style[key];
    });
  }
}

// Separate function to handle texture update
function updateEntityTexture(entityData, entityElement, game) {
  if (entityData.texture) {
    let texture = game.getTexture(entityData.texture);
    let spritePosition = texture.sprite ? texture.sprite : { x: 0, y: 0 };

    if (typeof entityData.texture.frame === 'number') {
      spritePosition = texture.frames[entityData.texture.frame];
    } else if (typeof texture.frames === 'object' && game.tick % 10 === 0) {
      if (typeof entityData.texture.frameIndex === 'undefined') {
        entityData.texture.frameIndex = 0;
      }
      if (entityData.texture.frameIndex >= texture.frames.length) {
        entityData.texture.frameIndex = 0;
      }

      let frame = texture.frames[entityData.texture.frameIndex];
      if (frame) spritePosition = frame;
      entityData.texture.frameIndex++;
    }

    entityElement.style.backgroundPosition = `${spritePosition.x}px ${spritePosition.y}px`;

    // Set background size for non-player entities
    if (entityData.type !== 'PLAYER') {
      entityElement.style.backgroundSize = `${entityData.width}px ${entityData.height}px`;
      entityElement.style.width = `${entityData.width}px`;
      entityElement.style.height = `${entityData.height}px`;
    }
  }
}

// Separate function to handle text update
function updateEntityText(entityData, entityElement) {
  if (entityData.type === 'TEXT' && entityData.text !== undefined && entityData.text !== null) {
    if (entityElement.innerHTML !== entityData.text) {
      entityElement.innerHTML = entityData.text;
    }
  }
}
*/

},{}],22:[function(require,module,exports){
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
function render(game, alpha) {
  var _this = this;
  // console.log('rendering', this.game.entities.size, 'entities')

  // render is called at the browser's frame rate (typically 60fps)
  var self = this;

  // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
  // This is not ideal and will yield low-entity count CSSGraphics performance
  // Best to remove camera follow for CSSGraphics if possible
  // We tried to only iterate changed entities, but this breaks camera follow

  if (this.game.useFov) {
    var fovEntities = new Map();
    var currentPlayer = this.game.data.currentPlayer;
    //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);
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
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unload;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function unload() {
  var _this = this;
  // set zoom back to 1, or else document may be fuzzy
  this.game.zoom(1);

  // TODO: consolidate graphics pipeline unloading into SystemsManager
  // TODO: remove duplicated unload() code in BabylonGraphics

  this.game.graphics = this.game.graphics.filter(function (g) {
    return g.id !== _this.id;
  });
  delete this.game._plugins['CSSGraphics'];

  // unload the CSSCamera
  this.game.systemsManager.removeSystem('graphics-css-camera');

  // remove the wheel event listener
  // document.removeEventListener('wheel', this.cssMouseWheelZoom);
  this.mouseWheelEnabled = false;

  // iterate through all entities and remove existing css graphics
  var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        eId = _step$value[0],
        entity = _step$value[1];
      if (entity.graphics && entity.graphics['graphics-css']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-css'];
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var div = document.getElementById('css-render-canvas');
  if (div) {
    div.remove();
  }
}

},{}]},{},[3])(3)
});

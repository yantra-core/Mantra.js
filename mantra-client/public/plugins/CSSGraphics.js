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

      // Remark: We can remove this soon, camera should be initialized in the game
      if (typeof game.data.camera === 'undefined') {
        game.data.camera = {
          mode: 'follow',
          position: {
            x: 0,
            y: 0
          }
        };
      }
      this.updateCameraPosition = _updateCameraPosition["default"].bind(this);
      this.applyThrow = _applyThrow["default"].bind(this);
      this.update = _update["default"].bind(this);
      this.scene.setTransform = this.setTransform.bind(this);
      this.scene.updateEntityPosition = this.updateEntityPosition.bind(this);

      // hoist rotateCamera to game
      game.rotateCamera = _rotateCameraOverTime["default"].bind(this);
      this.game.systemsManager.addSystem('graphics-css-camera', this);
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      this.gameViewport = document.getElementById('gameHolder');
      this.gameViewport.style.transformOrigin = 'center center';
      this.initMouseWheelZoomControls();

      // set initial zoom based on config
      if (this.config.initialZoom) {
        this.zoom(this.config.initialZoom);
      }

      // Remark: 2/16/2024 - can we remove this?
      game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
        //console.log("CSSCamera.js", entityId, data, sequenceNumber)
        if (data.mouse) {
          // Update camera position based on drag deltas
          if (data.mouse.buttons.RIGHT) {
            // this.gameViewport.style.cursor = 'grabbing';
          }
          if (data.mouse.buttons.MIDDLE) {
            // this.gameViewport.style.cursor = 'grabbing';
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
      this.game.data.camera.offsetX = 0;
      this.game.data.camera.offsetY = 0;
    }
  }, {
    key: "initMouseWheelZoomControls",
    value: function initMouseWheelZoomControls() {
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
      // this.gameViewport.style.cursor = 'grab';
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
var _createGraphic = _interopRequireDefault(require("./lib/entity/createGraphic.js"));
var _inflateBox = _interopRequireDefault(require("./lib/entity/inflate/inflateBox.js"));
var _inflateText = _interopRequireDefault(require("./lib/entity/inflate/inflateText.js"));
var _inflateCanvas = _interopRequireDefault(require("./lib/entity/inflate/inflateCanvas.js"));
var _inflateImage = _interopRequireDefault(require("./lib/entity/inflate/inflateImage.js"));
var _inflateGraphic = _interopRequireDefault(require("./lib/entity/inflateGraphic.js"));
var _inflateTexture = _interopRequireDefault(require("./lib/entity/inflateTexture.js"));
var _inflateButton = _interopRequireDefault(require("./lib/entity/inflate/inflateButton.js"));
var _inflateCheckbox = _interopRequireDefault(require("./lib/entity/inflate/inflateCheckbox.js"));
var _inflateInput = _interopRequireDefault(require("./lib/entity/inflate/inflateInput.js"));
var _inflateIframe = _interopRequireDefault(require("./lib/entity/inflate/inflateIframe.js"));
var _inflateRadio = _interopRequireDefault(require("./lib/entity/inflate/inflateRadio.js"));
var _inflateRange = _interopRequireDefault(require("./lib/entity/inflate/inflateRange.js"));
var _inflateSelect = _interopRequireDefault(require("./lib/entity/inflate/inflateSelect.js"));
var _inflateTextarea = _interopRequireDefault(require("./lib/entity/inflate/inflateTextarea.js"));
var _inflateCode = _interopRequireDefault(require("./lib/entity/inflate/inflateCode.js"));
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

    // HTML DOM elements as Mantra entities
    _this.inflateButton = _inflateButton["default"].bind(_assertThisInitialized(_this));
    _this.inflateSelect = _inflateSelect["default"].bind(_assertThisInitialized(_this));
    _this.inflateRange = _inflateRange["default"].bind(_assertThisInitialized(_this));
    _this.inflateRadio = _inflateRadio["default"].bind(_assertThisInitialized(_this));
    _this.inflateInput = _inflateInput["default"].bind(_assertThisInitialized(_this));
    _this.inflateTextarea = _inflateTextarea["default"].bind(_assertThisInitialized(_this));
    _this.inflateCode = _inflateCode["default"].bind(_assertThisInitialized(_this));
    _this.inflateCheckbox = _inflateCheckbox["default"].bind(_assertThisInitialized(_this));
    _this.inflateImage = _inflateImage["default"].bind(_assertThisInitialized(_this));
    //this.inflateVideo = inflateVideo.bind(this);
    _this.inflateCanvas = _inflateCanvas["default"].bind(_assertThisInitialized(_this));
    _this.inflateIframe = _inflateIframe["default"].bind(_assertThisInitialized(_this));
    _this.render = _render["default"].bind(_assertThisInitialized(_this));
    _this.removeGraphic = _removeGraphic["default"].bind(_assertThisInitialized(_this));
    _this.bindEntityEvents = _bindEntityEvents["default"].bind(_assertThisInitialized(_this));
    _this.bindYCraftEvents = _bindYCraftEvents["default"].bind(_assertThisInitialized(_this));
    _this.unload = _unload["default"].bind(_assertThisInitialized(_this));

    // TODO: make this function lookup with defaults ( instead of -1 )
    // TODO: remove in favor of using position.z for zIndex
    _this.depthChart = ['background', 'border', 'wire', 'PART', 'TEXT', 'PLAYER', 'BLOCK', 'FIRE', 'WARP', 'NOTE'];
    // this.depthChart = this.depthChart.reverse();
    return _this;
  }
  _createClass(CSSGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      var cssCamera = new _CSSCamera["default"](this, {
        initialZoom: 1
      });
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
      this.game.data.camera.offsetX = 0;
      this.game.data.camera.offsetY = 0;
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

      // Disable drag behavior for all images within the game container
      gameHolder.addEventListener('dragstart', function (event) {
        if (event.target.tagName === 'IMG') {
          event.preventDefault();
        }
      });
      var renderDiv = document.getElementById('css-render-div');
      if (!renderDiv) {
        renderDiv = document.createElement('div');
        renderDiv.id = 'css-render-div';
        renderDiv.className = 'render-div';
        renderDiv.style.transformOrigin = 'center center';
        gameHolder.appendChild(renderDiv);
      }
      this.renderDiv = renderDiv;
    }
  }]);
  return CSSGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(CSSGraphics, "id", 'graphics-css');
_defineProperty(CSSGraphics, "removable", false);
_defineProperty(CSSGraphics, "async", true);
var _default = exports["default"] = CSSGraphics;

},{"../../lib/GraphicsInterface.js":1,"./CSSCamera.js":2,"./lib/entity/bindEntityEvents.js":13,"./lib/entity/bindYCraftEvents.js":14,"./lib/entity/createGraphic.js":15,"./lib/entity/inflate/inflateBox.js":16,"./lib/entity/inflate/inflateButton.js":17,"./lib/entity/inflate/inflateCanvas.js":18,"./lib/entity/inflate/inflateCheckbox.js":19,"./lib/entity/inflate/inflateCode.js":20,"./lib/entity/inflate/inflateIframe.js":21,"./lib/entity/inflate/inflateImage.js":22,"./lib/entity/inflate/inflateInput.js":23,"./lib/entity/inflate/inflateRadio.js":24,"./lib/entity/inflate/inflateRange.js":25,"./lib/entity/inflate/inflateSelect.js":26,"./lib/entity/inflate/inflateText.js":27,"./lib/entity/inflate/inflateTextarea.js":28,"./lib/entity/inflateGraphic.js":29,"./lib/entity/inflateTexture.js":30,"./lib/entity/removeGraphic.js":31,"./lib/entity/updateGraphic.js":32,"./lib/render.js":33,"./lib/unload.js":34}],4:[function(require,module,exports){
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

  game.data.camera.offsetX += this.dragInertia.x;
  game.data.camera.offsetY += this.dragInertia.y;

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
    // this.gameViewport.style.cursor = 'grab';
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
    // console.log('Camera is already shaking. Ignoring additional shake requests.');
    return;
  }
  gameViewport.dataset.isShaking = 'true';

  // Capture the initial transform state before starting the shake effect
  var initialTransform = gameViewport.style.transform;
  var startTime = Date.now();
  var shake = function shake() {
    var elapsedTime = Date.now() - startTime;
    var remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      // Reset transform to the initial state after shaking completes
      gameViewport.style.transform = initialTransform;
      gameViewport.dataset.isShaking = 'false'; // Reset the debounce flag
      return;
    }

    // Gradually reduce the intensity
    var intensity = initialIntensity * (remainingTime / duration);

    // Smooth shake effect using sine function
    var x = intensity * Math.sin(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);
    var y = intensity * Math.cos(elapsedTime / 100) * (Math.random() > 0.5 ? 1 : -1);

    // Apply the shake effect on top of the initial transform
    gameViewport.style.transform = "".concat(initialTransform, " translate(").concat(x, "px, ").concat(y, "px)");

    // Apply a random force to each entity
    Object.keys(_this.game.data.ents._).forEach(function (eId) {
      var entity = _this.game.data.ents._[eId];
      // TODO: make more configurable / part of constructor config
      // TODO: add a shakeable flag to entities / add parameter for tracking "shakeability", etc
      if (entity.type === 'PARTICLE' || entity.type === 'STAR' || entity.type === 'HEXAPOD' || entity.type === 'DEMON' || entity.type === 'NONE') {
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
// TODO: add a mode where mouse wheel will scroll camera veritcally
function cssMouseWheelZoom(event) {
  var game = this.game;
  if (!this.mouseWheelEnabled) {
    // legacy API, use game.data.camera instead
    return;
  }
  if (game.data.camera && game.data.camera.mouseWheelZoomEnabled !== true) {
    return;
  }

  // Prevent default scrolling behavior
  // Prevents the default *after* checking to see if mouse enabled
  // This is to best serve user so Mantra won't eat their scroll events
  // We could add an additional flag here in cases we want an embedded Mantra to scroll
  event.preventDefault();

  /*
     Remark: Removed 2/16/2024, as this was preventing mouse wheel zoom from working
     // check that target is gameHolder, if not cancel
    // Remark: This should suffice for CSSGraphics, this is required for embedding or other page interactions
    //         outside of the Mantra Game
    if (event.target !== document.body) {
      return false;
    }
  */

  var scale = game.data.camera.currentZoom;

  // Zoom settings
  var zoomSettings = {
    intensity: 0.01,
    // Base zoom intensity
    minScale: 0.1,
    // Minimum scale limit
    logBase: 10 // Logarithmic base
  };

  // Determine zoom direction
  var delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  var direction = delta > 0 ? 1 : -1;

  // Applying logarithmic scale for smooth zoom
  var logScaledIntensity = zoomSettings.intensity * Math.log(scale + 1) / Math.log(zoomSettings.logBase);
  var newScale = Math.max(zoomSettings.minScale, scale + direction * logScaledIntensity);

  // Update scale
  this.zoom(newScale);
  return false;
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
  // centerY = centerY + this.game.data.camera.offsetY;
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
var _zoom = _interopRequireDefault(require("./zoom.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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

  if (typeof game.data.camera.offsetX !== 'number') {
    game.data.camera.offsetX = 0;
  }
  if (typeof game.data.camera.offsetY !== 'number') {
    game.data.camera.offsetY = 0;
  }

  // Initialize offsets if they are not numbers
  if (typeof game.data.camera.offsetX !== 'number') {
    game.data.camera.offsetX = 0;
  }
  if (typeof game.data.camera.offsetY !== 'number') {
    game.data.camera.offsetY = 0;
  }

  // Determine the base position of the camera
  var baseX = 0,
    baseY = 0;

  // If following the player, set the base position to the player's position
  if (this.game.data.camera.mode === 'follow' && currentPlayer && currentPlayer.position) {
    baseX = currentPlayer.position.x;
    baseY = currentPlayer.position.y;
  }

  // Apply viewport offsets to the base position
  this.scene.cameraPosition.x = baseX + game.data.camera.offsetX;
  this.scene.cameraPosition.y = baseY + game.data.camera.offsetY;

  // Find the center of the screen
  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;

  // Calculate the adjusted position for camera centering and zoom
  var adjustedPosition = {
    x: this.scene.cameraPosition.x - centerX,
    y: this.scene.cameraPosition.y - centerY
  };

  // Apply the current zoom level to adjust the position
  adjustedPosition.x *= this.game.data.camera.currentZoom;
  adjustedPosition.y *= this.game.data.camera.currentZoom;

  // Calculate the size of the visible area in the game's world space at the current zoom level
  var visibleWidth = window.innerWidth / this.game.data.camera.currentZoom;
  var visibleHeight = window.innerHeight / this.game.data.camera.currentZoom;

  // Determine the offsets needed to center the viewport in the game's world space
  var offsetX = (window.innerWidth - visibleWidth) / 2;
  var offsetY = (window.innerHeight - visibleHeight) / 2;

  // Apply zoom to offsets
  offsetX *= this.game.data.camera.currentZoom;
  offsetY *= this.game.data.camera.currentZoom;

  // Adjust the y position further by the offsetY to center vertically
  adjustedPosition.y += offsetY;

  // Update the transform of the renderDiv to adjust the camera view
  if (this.scene.renderDiv) {
    setTransform(this.scene.renderDiv, -adjustedPosition.x, -adjustedPosition.y, this.game.data.camera.currentZoom, 0);
  }

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}
function setTransform(container, offsetX, offsetY, zoom, rotation) {
  // Retrieve the last applied values from the container's dataset
  var lastOffsetX = parseFloat(container.dataset.lastOffsetX) || 0;
  var lastOffsetY = parseFloat(container.dataset.lastOffsetY) || 0;
  var lastZoom = parseFloat(container.dataset.lastZoom) || 1;
  var lastRotation = parseFloat(container.dataset.lastRotation) || 0;

  // Improved checks for NaN and finite numbers
  // We shouldn't get NaN at this stage; however it's better to not apply an invalid transform than to break the layout,
  // as subsequent calls may provide valid values. This issue came up in embed scenarios
  offsetX = Number.isFinite(offsetX) ? offsetX : lastOffsetX;
  offsetY = Number.isFinite(offsetY) ? offsetY : lastOffsetY;
  zoom = Number.isFinite(zoom) && zoom > 0 ? zoom : lastZoom; // Zoom should not be negative
  rotation = Number.isFinite(rotation) ? rotation : lastRotation;

  // Check if the new values differ from the last applied values
  if (offsetX !== lastOffsetX || offsetY !== lastOffsetY || zoom !== lastZoom || rotation !== lastRotation) {
    // Apply the new transform only if there's a change
    container.style.transform = "translate(".concat(offsetX, "px, ").concat(offsetY, "px) scale(").concat(zoom, ") rotate(").concat(rotation, "deg)");
    // Update the container's dataset with the new values
    container.dataset.lastOffsetX = offsetX.toString();
    container.dataset.lastOffsetY = offsetY.toString();
    container.dataset.lastZoom = zoom.toString();
    container.dataset.lastRotation = rotation.toString();
  }
}

},{"./zoom.js":12}],10:[function(require,module,exports){
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
    this.isDragging = true;
    // document.body.style.cursor = 'grabbing'; 
    // this.follow = false;
    if (typeof dx === 'number') {
      game.data.camera.offsetX += dx;
    }
    if (typeof dy === 'number') {
      game.data.camera.offsetY += dy;
    }
  }
  if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
    // console.log('THROWING', dx, dy)
    this.isThrowing = true;
    this.isDragging = false;
    // document.body.style.cursor = 'grabbing'; 

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
    // document.body.style.cursor = 'default'; 
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

  /* Remark: Removed 2/7/2024
            Entities are no longer transformed per camera
            Instead entities are transformed per game holder
            Camera will apply transforms to the game holder
     Reason: Performance, we don't need to transform every entity per camera
     let adjustedPosition = {
      x: position.x - (this.scene.cameraPosition.x -  window.innerWidth / 2),
      y: position.y - (this.scene.cameraPosition.y - window.outerHeight / 2)
    };
  */

  var adjustedPosition = {
    x: position.x,
    y: position.y
  };

  // if the entity happens to be position: 'fixed' set the entityElement to absolute position with no adjustments
  if (entityData.style && entityData.style.position === 'fixed') {
    entityElement.style.position = 'absolute';
    entityElement.style.left = position.x + 'px';
    entityElement.style.top = position.y + 'px';
    entityElement.style.display = ''; // Make sure the element is visible
    return entityElement;
  }

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
    case 'BUTTON':
      entityElement = this.inflateButton(entityElement, entityData);
      break;
    case 'INPUT':
      // For INPUT entities, create an input
      entityElement = this.inflateInput(entityElement, entityData);
      break;
    case 'SELECT':
      // For SELECT entities, create a box
      entityElement = this.inflateSelect(entityElement, entityData);
      break;
    case 'IMAGE':
      // For IMAGE entities, create an image
      entityElement = this.inflateImage(entityElement, entityData);
      break;
    case 'TEXTAREA':
      // For TEXTAREA entities, create a textarea
      entityElement = this.inflateTextarea(entityElement, entityData);
      break;
    case 'RANGE':
      // For RANGE entities, create a range input
      entityElement = this.inflateRange(entityElement, entityData);
      break;
    case 'CHECKBOX':
      // For CHECKBOX entities, create a checkbox input
      entityElement = this.inflateCheckbox(entityElement, entityData);
      break;
    case 'RADIO':
      // For RADIO entities, create a radio input
      entityElement = this.inflateRadio(entityElement, entityData);
      break;
    case 'IFRAME':
      // For IFRAME entities, create an iframe
      entityElement = this.inflateIframe(entityElement, entityData);
      break;
    case 'CANVAS':
      // For CANVAS entities, create a canvas
      entityElement = this.inflateCanvas(entityElement, entityData);
      break;
    case 'CODE':
      // For CODE entities, create a code block
      entityElement = this.inflateCode(entityElement, entityData);
      break;
    case 'TOOLBAR':
      // For CANVAS entities, create a canvas
      if (this.game.systems.toolbar) {
        entityElement = this.game.systems.toolbar.inflate(entityElement, entityData);
      }
      break;
    default:
      if (entityData.type === 'PART' && entityData.name === 'Display') {
        this.inflateText(entityElement, entityData);
      } else {
        this.inflateBox(entityElement, entityData);
      }
      break;
  }

  // console.log(entityData.type, entityElement)
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

  // if style.position is absolute, append to gameHolder instead
  if (typeof entityData.style !== 'undefined' && entityData.style.position === 'absolute') {
    // if style has been manually set to absolute, place the entity directly in gameHolder ( instead of css-render-dev)
    // using absolute values. this will ensure that the entity is not affected by camera scroll and zoom 
    var gameHolder = document.getElementById('gameHolder');
    entityElement.style.position = 'flex';
    entityElement.style.top = "".concat(entityData.position.y, "px");
    entityElement.style.left = "".concat(entityData.position.x, "px");
    entityElement.style.width = "".concat(entityData.width, "px");
    entityElement.style.height = "".concat(entityData.height, "px");
    gameHolder.appendChild(entityElement);
  } else {
    this.renderDiv.appendChild(entityElement);
  }

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
  //entityElement.style.zIndex = depthChart.indexOf(entityData.type);
  // console.log('setting position', entityData.z, entityData.type, entityData.texture)
  entityElement.style.zIndex = entityData.position.z;

  // Remark: No longer binding events directly to entity, instead delegating from Mouse.js
  // this.bindEntityEvents(entityData, entityElement);

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
    //  entityElement.style.cursor = 'pointer';
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

  // console.log('entityElement', entityElement)

  this.updateEntityPosition(entityElement, entityData);
  return entityElement;
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateButton;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function inflateButton(entityElement, entityData) {
  // Create the button
  var button = document.createElement('button');
  console.log('entityData', entityData);
  if (_typeof(entityData.meta) === 'object' && entityData.meta.disabled === true) {
    button.disabled = true;
  }

  // Set button text if provided
  if (entityData.text) {
    button.innerHTML = entityData.text;
  }

  // Apply default and custom button styles
  applyButtonStyles(button, entityData);

  // Append the button to the entityElement
  entityElement.appendChild(button);

  // Optional: Set width and color of the entityElement if provided
  if (entityData.width) {
    entityElement.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  // Event listeners for hover and pressed states
  button.addEventListener('mouseover', function () {
    button.style.backgroundColor = '#e6e6e6'; // Lighter shade for hover
  });

  button.addEventListener('mouseout', function () {
    button.style.backgroundColor = defaultButtonStyles.backgroundColor; // Default background color
  });

  button.addEventListener('mousedown', function () {
    button.style.backgroundColor = '#cccccc'; // Darker shade for pressed
  });

  button.addEventListener('mouseup', function () {
    button.style.backgroundColor = '#e6e6e6'; // Lighter shade for hover
  });

  return entityElement;
}
var defaultButtonStyles = {
  border: 'none',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '12px',
  backgroundColor: '#f2f2f2',
  color: 'black',
  transition: 'background-color 0.4s ease, color 0.4s ease'
};
function applyButtonStyles(button, entityData) {
  Object.assign(button.style, defaultButtonStyles, entityData.style);
}
function convertColorToHex(color) {
  return typeof color === 'number' ? "#".concat(color.toString(16)) : color;
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCanvas;
function inflateCanvas(entityElement, entityData) {
  var canvas;

  // Check if a canvas or canvas context is passed in entityData.meta.canvas
  if (entityData.meta && entityData.meta.canvas) {
    // Assuming entityData.meta.canvas could be a canvas element or a canvas context
    canvas = entityData.meta.canvas instanceof HTMLCanvasElement ? entityData.meta.canvas : entityData.meta.canvas.canvas;
  } else {
    // Create a new canvas if none is provided
    canvas = document.createElement('canvas');
    // Use entityData.width and entityData.height directly
    canvas.width = entityData.width || 300;
    canvas.height = entityData.height || 150;

    // Optional: Apply default and custom canvas styles
    applyCanvasStyles(canvas, entityData);
  }

  // Append the canvas to the entityElement if it's not already there
  // This check is important to avoid re-adding an existing canvas to the DOM
  if (!entityElement.contains(canvas)) {
    entityElement.appendChild(canvas);
  }

  // Adjust canvas dimensions using CSS for visual scaling if necessary
  // Use entityData.width and entityData.height directly for CSS styles
  if (entityData.width) {
    canvas.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    canvas.style.height = "".concat(entityData.height, "px");
  }

  // Additional logic to handle drawing on the canvas if an image is provided
  if (entityData.meta && entityData.meta.imageData) {
    var ctx = canvas.getContext('2d');

    // Check if imageData is actually an Image or Canvas element
    if (entityData.meta.imageData instanceof HTMLImageElement || entityData.meta.imageData instanceof HTMLCanvasElement) {
      // Draw the image or canvas onto the canvas
      ctx.drawImage(entityData.meta.imageData, 0, 0, canvas.width, canvas.height);
    } else if (entityData.meta.imageData instanceof ImageData) {
      // If it's ImageData, use putImageData
      ctx.putImageData(entityData.meta.imageData, 0, 0);
    } else {
      console.error('Unsupported imageData type:', entityData.meta.imageData);
    }
  }
  return entityElement;
}
function applyCanvasStyles(canvas, entityData) {
  // canvas.style.border = '1px solid #000'; // Example default style

  // Apply any custom styles defined in entityData
  if (entityData.styles) {
    Object.keys(entityData.styles).forEach(function (styleKey) {
      canvas.style[styleKey] = entityData.styles[styleKey];
    });
  }
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCheckbox;
function inflateCheckbox(entityElement, entityData) {
  if (Array.isArray(entityData.options)) {
    entityData.options.forEach(function (optionData) {
      var label = document.createElement('label');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = optionData.value;
      if (optionData.checked) {
        checkbox.checked = true;
      }
      label.appendChild(checkbox);
      label.append(optionData.label);
      entityElement.appendChild(label);
    });
  }

  // Optional: Apply custom styles to checkboxes
  // No default styling function provided, adapt if needed

  return entityElement;
}

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCode;
// TODO: Move this to Code.js Plugin inflate()
function inflateCode(entityElement, entityData) {
  var _this = this;
  var graphic = entityData.graphics && entityData.graphics['graphics-css'];
  var pre, code;
  if (graphic) {
    // graphic is top level DOM, all other elements are children
    pre = graphic.querySelectorAll('pre')[0];
    code = graphic.querySelectorAll('code')[0];
  } else {
    pre = document.createElement('pre');
    code = document.createElement('code');
    pre.appendChild(code);
    entityElement.appendChild(pre);
  }

  // add class "language-javascript" to the code element
  var codeHighlightClassName = 'language-' + entityData.meta.language;
  codeHighlightClassName = 'language-javascript'; // TODO: remove this line
  code.classList.add(codeHighlightClassName);

  // Initialize fetchSourceHandles if it doesn't exist
  this.fetchSourceHandles = this.fetchSourceHandles || {};
  var src = entityData.meta && entityData.meta.src;
  if (src) {
    // Set initial content to indicate loading
    code.textContent = "Loading... ".concat(src);
    if (!this.fetchSourceHandles[src]) {
      // Create a mutex and start fetching the content
      this.fetchSourceHandles[src] = fetch(src).then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      }).then(function (content) {
        // Update the code element directly once the content is fetched
        Array.from(document.querySelectorAll("code[data-src=\"".concat(src, "\"]"))).forEach(function (el) {
          el.textContent = content;
          Prism.highlightAll();
        });

        // Store the fetched content for future use, replacing the promise
        _this.fetchSourceHandles[src] = {
          content: content
        };
      })["catch"](function (error) {
        console.error('Error fetching source code:', error);
        // Update all code elements with the error message
        Array.from(document.querySelectorAll("code[data-src=\"".concat(src, "\"]"))).forEach(function (el) {
          el.textContent = '// Error fetching source code';
        });
        // Store the error message for future use, replacing the promise
        _this.fetchSourceHandles[src] = {
          error: '// Error fetching source code'
        };
      });
    }

    // Mark the code element with a data attribute for future updates
    code.setAttribute('data-src', src);
  } else {
    // Set default code text if none provided and no src is specified
    code.textContent = entityData.meta && entityData.meta.code || '';
  }
  applyCodeStyles(pre, code, entityData);

  // Additional style adjustments
  if (entityData.width) {
    pre.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    pre.style.height = "".concat(entityData.height, "px");
  }
  if (entityData.color) {
    code.style.color = convertColorToHex(entityData.color);
  }
  return entityElement;
}
function applyCodeStyles(pre, code, entityData) {
  // Define and apply default styles for code element here
  // For example, setting a monospace font and a background color
  pre.style.display = 'block';
  pre.style.overflow = 'auto';
  pre.style.padding = '5px';
  pre.style.backgroundColor = '#1E1E1E'; // Dark background for the code block

  code.style.fontFamily = 'monospace';
  code.style.fontSize = '14px';
  code.style.color = '#D4D4D4'; // Light color for the text for better contrast

  // Apply any custom styles from entityData if provided
  if (entityData.style) {
    Object.assign(pre.style, entityData.style.pre); // Apply styles to the <pre> element
    Object.assign(code.style, entityData.style.code); // Apply styles to the <code> element
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateIframe;
function inflateIframe(entityElement, entityData) {
  var iframe = document.createElement('iframe');
  if (entityData.meta && entityData.meta.src) {
    iframe.src = entityData.meta.src || 'about:blank'; // Default src if none provided
  }

  // Optional: Apply default and custom iframe styles
  applyIframeStyles(iframe, entityData);
  entityElement.appendChild(iframe);
  if (entityData.width) {
    iframe.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    iframe.style.height = "".concat(entityData.height, "px");
  }
  return entityElement;
}
function applyIframeStyles(iframe, entityData) {
  // Define and apply default styles for iframe here
  // Similar to applySelectStyles function
}

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateImage;
function inflateImage(entityElement, entityData) {
  var element; // This can be an <img> or <canvas>
  // Check for imageData in meta and use it if available
  if (entityData.meta && typeof entityData.meta.imageData !== 'undefined') {
    if (entityData.meta.imageData instanceof HTMLCanvasElement) {
      // Directly use the canvas instead of converting it to a data URL
      element = entityData.meta.imageData;
    } else {
      console.error('Unsupported imageData type:', entityData.meta.imageData);
      return;
    }
  } else {
    // Fallback to creating an <img> if imageData is not available or not a canvas
    element = document.createElement('img');
    if (entityData.meta && entityData.meta.src) {
      element.src = entityData.meta.src;
    }
  }

  // Optional: Apply default and custom styles
  applyImageStyles(element, entityData);
  entityElement.appendChild(element);

  // Set dimensions if specified in entityData
  if (entityData.width) {
    element.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    element.style.height = "".concat(entityData.height, "px");
  }
  return entityElement;
}
function applyImageStyles(img, entityData) {
  // Define and apply default styles for img here
  // This function is similar to applyIframeStyles but for <img> elements
  // For example, setting a default border, margin, or any other styles
  img.style.border = 'none'; // Example default style

  // Apply any custom styles defined in entityData
  if (entityData.styles) {
    Object.keys(entityData.styles).forEach(function (styleKey) {
      img.style[styleKey] = entityData.styles[styleKey];
    });
  }
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateInput;
function inflateInput(entityElement, entityData) {
  // Create the input element
  var input = document.createElement('input');

  // Set input type if provided, default to 'text'
  input.type = entityData.type || 'text';

  // Set input value if provided
  if (entityData.value) {
    input.value = entityData.value;
  }

  // Set input placeholder if provided
  if (entityData.placeholder) {
    input.placeholder = entityData.placeholder;
  }

  // Apply default and custom input styles
  applyInputStyles(input, entityData);

  // Append the input element to the entityElement
  entityElement.appendChild(input);

  // Optional: Set width of the entityElement if provided
  if (entityData.width) {
    input.style.width = "".concat(entityData.width, "px");
  }

  // Optional: Set color of the input text if provided
  if (entityData.color) {
    input.style.color = convertColorToHex(entityData.color);
  }

  // Event listener for input changes
  input.addEventListener('input', function (event) {
    var _input = event.target;
    // Update entity value in ECS on range change
    game.updateEntity(entityData.id, {
      value: _input.value
    });
  });
  return entityElement;
}
var defaultInputStyles = {
  padding: '10px',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'text',
  borderRadius: '4px',
  backgroundColor: '#fff',
  color: '#333',
  border: '1px solid #ccc',
  appearance: 'none',
  // Removes default browser styling
  transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
};
function applyInputStyles(input, entityData) {
  Object.assign(input.style, defaultInputStyles, entityData.style);

  // Add focus and change event listeners for interactive styles
  input.addEventListener('focus', function () {
    input.style.borderColor = '#80bdff';
    input.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });
  input.addEventListener('blur', function () {
    input.style.borderColor = '#ccc';
    input.style.boxShadow = 'none';
  });
}
function convertColorToHex(color) {
  return typeof color === 'number' ? "#".concat(color.toString(16)) : color;
}

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateRadio;
function inflateRadio(entityElement, entityData) {
  if (entityData.meta && entityData.meta.options) {
    var options = entityData.meta.options;
    if (Array.isArray(options)) {
      options.forEach(function (optionData) {
        var label = document.createElement('label');
        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = entityData.groupName; // Ensure all radio buttons have the same 'name' attribute
        radio.value = optionData.value;
        if (optionData.checked) {
          radio.checked = true;
        }
        label.appendChild(radio);
        label.append(optionData.label);
        entityElement.appendChild(label);
      });
    }
  }

  // Optional: Apply custom styles to radio buttons
  // No default styling function provided, adapt if needed

  return entityElement;
}

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateRange;
function inflateRange(entityElement, entityData) {
  var range = document.createElement('input');
  range.type = 'range';
  range.value = entityData.value || 100; // Default value if none provided

  if (entityData.min) {
    range.min = entityData.min;
  }
  if (entityData.max) {
    range.max = entityData.max;
  }
  if (entityData.step) {
    range.step = entityData.step;
  }

  // Apply default and custom range styles
  applyRangeStyles(range, entityData);
  console.log('rrrrr', range);
  // Append the range input to the entityElement
  entityElement.appendChild(range);
  if (entityData.width) {
    entityElement.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }

  // Event listener for range input changes
  range.addEventListener('input', function (event) {
    var _range = event.target;
    // Update entity value in ECS on range change
    game.updateEntity(entityData.id, {
      value: _range.value
    });
  });
  return entityElement;
}
function applyRangeStyles(range, entityData) {
  var defaultRangeStyles = {
    display: 'block',
    width: '100%',
    // Takes full width of the container
    margin: '8px 0',
    // Adds some space around the slider
    cursor: 'pointer'
  };

  // Apply default and custom styles from entityData
  Object.assign(range.style, defaultRangeStyles, entityData.style);

  // Attempt to adjust the slider thumb size and track height for WebKit browsers
  if (entityData.height) {
    var thumbHeight = "".concat(entityData.height, "px");
    var trackHeight = "".concat(Math.round(parseInt(entityData.height) / 2), "px"); // Adjust track height as needed

    range.style.webkitAppearance = 'none'; // Removes default styling
    range.style.height = thumbHeight; // Attempts to set the thumb height, might not work as expected

    // Custom styles for the thumb
    range.style.setProperty("--thumb-height", thumbHeight);
    range.style.setProperty("--track-height", trackHeight);
    range.style.background = "\n      linear-gradient(transparent, transparent),\n      url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"".concat(thumbHeight, "\" width=\"").concat(thumbHeight, "\" viewBox=\"0 0 20 20\"><circle cx=\"10\" cy=\"10\" r=\"8\" fill=\"").concat(entityData.color ? convertColorToHex(entityData.color) : '#CCC', "\"/></svg>') no-repeat center,\n      linear-gradient(transparent, transparent)\n    ");

    // Additional custom thumb and track styles for WebKit browsers
    range.style.setProperty("--webkit-slider-thumb", "\n      -webkit-appearance: none;\n      width: var(--thumb-height);\n      height: var(--thumb-height);\n      border-radius: 50%;\n      background: ".concat(entityData.color ? convertColorToHex(entityData.color) : '#CCC', ";\n      cursor: pointer;\n      margin-top: calc((var(--track-height) - var(--thumb-height)) / 2); // Centers the thumb vertically\n    "));
    range.style.setProperty("--webkit-slider-runnable-track", "\n      width: 100%;\n      height: var(--track-height);\n      background: #DDD;\n      border-radius: calc(var(--track-height) / 2);\n    ");
  }

  // Additional styling can be applied through entityData.style
}

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateSelect;
function inflateSelect(entityElement, entityData) {
  var select = document.createElement('select');

  // Populate the select element with options if available
  if (entityData.meta && entityData.meta.options && Array.isArray(entityData.meta.options)) {
    entityData.meta.options.forEach(function (optionData) {
      var option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.label;

      // Set fontSize and other styles directly on the option if needed
      if (entityData.style && entityData.style.fontSize) {
        option.style.fontSize = entityData.style.fontSize;
      }
      // Apply other styles as needed
      if (entityData.style && entityData.style.color) {
        option.style.color = entityData.style.color;
      }
      if (optionData.selected) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  // Apply default and custom styles
  applySelectStyles(select, entityData);

  // Append the select element to the entityElement
  entityElement.appendChild(select);
  return entityElement;
}
function applySelectStyles(select, entityData) {
  var defaultSelectStyles = {
    padding: '10px 15px',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: '1px solid #ccc',
    appearance: 'none',
    // Removes default browser styling
    transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
  };

  // Apply default styles
  Object.assign(select.style, defaultSelectStyles);

  // Set width and height if provided
  if (entityData.width) {
    select.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    select.style.height = "".concat(entityData.height, "px");
    // Adjust padding and font size based on height if necessary
    var adjustedPadding = Math.max(0, (entityData.height - 20) / 2); // Example adjustment
    // select.style.padding = `${adjustedPadding}px 15px`;
  }

  // Set color if provided
  if (entityData.color) {
    select.style.color = convertColorToHex(entityData.color);
  }

  // Apply custom styles from entityData
  if (entityData.style) {
    Object.assign(select.style, entityData.style);
  }

  // Event listeners for interactive styles and entity updates
  select.addEventListener('focus', function () {
    select.style.borderColor = '#80bdff';
    select.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,.25)';
  });
  select.addEventListener('blur', function () {
    select.style.borderColor = '#ccc';
    select.style.boxShadow = 'none';
  });
  select.addEventListener('change', function (event) {
    var _select = event.target;
    // Update entity value in ECS on select change
    game.updateEntity(entityData.id, {
      value: _select.value
    });
  });
}
function convertColorToHex(color) {
  // Ensure color conversion logic is consistent with your needs
  return typeof color === 'number' ? "#".concat(color.toString(16)) : color;
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateText;
function inflateText(entityElement, entityData) {
  // Create a container for the text

  entityElement.innerText = entityData.text;

  // Ensure the background is transparent by default
  entityElement.style.backgroundColor = 'transparent';

  // Apply custom styles from entityData.style
  if (entityData.style) {
    for (var key in entityData.style) {
      entityElement.style[key] = entityData.style[key];
    }
  }

  // Set width if provided
  if (entityData.width) {
    entityElement.style.width = "".concat(entityData.width, "px");
  }

  // Convert and set color if provided
  if (entityData.color) {
    var hexColor;
    // Convert integer color to hex format
    if (typeof entityData.color === 'number') {
      hexColor = "#".concat(entityData.color.toString(16).padStart(6, '0')); // Ensure proper hex format with padding
    } else {
      hexColor = entityData.color; // Assume it's already a string in a valid format
    }

    entityElement.style.color = hexColor;
  }
  console.log(entityElement);
  return entityElement;
}

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateTextarea;
function inflateTextarea(entityElement, entityData) {
  var textarea = document.createElement('textarea');
  textarea.textContent = entityData.text || ''; // Default text if none provided

  // Apply default and custom textarea styles
  applyTextareaStyles(textarea, entityData);

  // Append the textarea to the entityElement
  entityElement.appendChild(textarea);
  if (entityData.width) {
    textarea.style.width = "".concat(entityData.width, "px");
  }
  if (entityData.height) {
    textarea.style.height = "".concat(entityData.height, "px");
  }
  if (entityData.color) {
    textarea.style.color = this.game.convertColorToHex(entityData.color);
  }
  return entityElement;
}
function applyTextareaStyles(textarea, entityData) {
  // Define and apply default styles for textarea here
  // Similar to applySelectStyles function
}

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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
    // TODO: remove this refactor all code to inflate* paths
    if (typeof entityData.color !== 'undefined' && entityData.color !== null && entityData.type !== 'TEXT') {
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

    if (typeof entityData.width !== 'undefined') {
      entityElement.style.width = entityData.width + 'px';
    }
    if (typeof entityData.height !== 'undefined') {
      entityElement.style.height = entityData.height + 'px';
    }
    if (typeof entityData.radius !== 'number') {} else {
      // Multiply the radius by 2 to get the diameter for CSS
      var diameter = entityData.radius * 2;
      entityElement.style.width = diameter + 'px';
      entityElement.style.height = diameter + 'px';
    }

    // Size is new API, remove direct refs at ent root to height and width and radius
    if (_typeof(entityData.size) === 'object') {
      if (typeof entityData.size.width !== 'undefined') {
        entityElement.style.width = entityData.size.width + 'px';
      }
      if (typeof entityData.size.height !== 'undefined') {
        entityElement.style.height = entityData.size.height + 'px';
      }
    }
    if (entityData.style) {
      Object.keys(entityData.style).forEach(function (key) {
        entityElement.style[key] = entityData.style[key];
      });
    }
    if (entityData.type === 'IFRAME') {
      var iframe = entityElement.querySelector('iframe');
      // check to see if iframe src matches entityData.meta.src
      if (iframe && iframe.src !== entityData.meta.src) {
        iframe.src = entityData.meta.src;
      }
    }
    if (entityData.type === 'CODE') {
      // Query entityElement for the first code tag that has a 'data-src' attribute matching entityData.meta.src
      var codeElement = entityElement.querySelector("code[data-src=\"".concat(entityData.meta.src, "\"]"));
      //console.log('entityElement', entityElement);

      if (codeElement) {} else {
        console.log("No code element with matching data-src found.", entityData.meta.src);
        this.inflateCode(entityElement, entityData);
      }
    }
    return this.updateEntityPosition(entityElement, entityData);
  } else {
    // If the entity element does not exist, create it
    return this.createGraphic(entityData);
  }
}

},{}],33:[function(require,module,exports){
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

  if (this.game.config.useFoV) {
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
    // LOOP1 render loop ( cannot remove? )
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

},{}],34:[function(require,module,exports){
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

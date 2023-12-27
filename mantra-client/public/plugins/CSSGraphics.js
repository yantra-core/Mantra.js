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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// CSSCamera.js - Marak Squires 2023
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
  }
  _createClass(CSSCamera, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;

      // sets auto-follow player when starting CSSGraphics ( for now )
      this.follow = true;
      this.game.systemsManager.addSystem('graphics-css-camera', this);
      this.gameViewport = document.getElementById('gameHolder');

      // this.scene.zoom(this.game.config.camera.startingZoom);

      game.viewportCenterXOffset = 0;
      game.viewportCenterYOffset = -200;
      this.initZoomControls();
      game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
        /*
        // our MouseData looks like this:
        data.mouse = {
            position: this.mousePosition, // absolute position
            canvasPosition: this.canvasPosition, // relative position to any canvas
            buttons: this.mouseButtons,
            isDragging: this.isDragging,
            dragStartPosition: this.dragStartPosition,
            dx: this.dx,
            dy: this.dy
          };
        */
        if (data.mouse) {
          // Update camera position based on drag deltas
          if (data.mouse.buttons.RIGHT) {
            _this.gameViewport.style.cursor = 'grabbing';
          }
          _this.updateCameraPosition(data.mouse.dx, data.mouse.dy, data.mouse.isDragging);
        }
      });
    }

    // Method to update camera position based on drag
  }, {
    key: "updateCameraPosition",
    value: function updateCameraPosition(dx, dy, isDragging) {
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

    // Apply the throw inertia to the camera
  }, {
    key: "applyThrow",
    value: function applyThrow() {
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

    // update() is called each game tick, we may want to implement render() here instead for RAF
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      var currentPlayer = this.game.getEntity(game.currentPlayerId);
      var entityId = game.currentPlayerId;

      // console.log('game.viewportCenterXOffset', game.viewportCenterXOffset, game.viewportCenterYOffset)
      // TODO: add ability for this to work with dragging and follow false
      if (this.follow && currentPlayer.position) {
        this.scene.cameraPosition.x = currentPlayer.position.x - game.viewportCenterXOffset;
        this.scene.cameraPosition.y = currentPlayer.position.y - game.viewportCenterYOffset;
      }
    }
  }, {
    key: "initZoomControls",
    value: function initZoomControls() {
      document.addEventListener('wheel', this.scene.mouseWheelZoom, {
        passive: false
      });
      this.scene.mouseWheelEnabled = true;
    }
  }]);
  return CSSCamera;
}();
_defineProperty(CSSCamera, "id", 'css-camera');
var _default = exports["default"] = CSSCamera;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _CSSCamera = _interopRequireDefault(require("./CSSCamera.js"));
var _inflateBox = _interopRequireDefault(require("./lib/inflateBox.js"));
var _inflateText = _interopRequireDefault(require("./lib/inflateText.js"));
var _updateEntityPosition = _interopRequireDefault(require("./lib/updateEntityPosition.js"));
var _updatePlayerSprite = _interopRequireDefault(require("./lib/updatePlayerSprite.js"));
var _mouseWheelZoom = _interopRequireDefault(require("./lib/mouseWheelZoom.js"));
var _handleInputs = _interopRequireDefault(require("./lib/handleInputs.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // CSSGraphics.js - Marak Squires 2023
var CSSGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(CSSGraphics, _GraphicsInterface);
  var _super = _createSuper(CSSGraphics);
  function CSSGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      camera = _ref.camera;
    _classCallCheck(this, CSSGraphics);
    _this = _super.call(this);
    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      };
    }

    // config scope for convenience
    var config = {
      camera: camera
    };
    _this.config = config;
    _this.id = CSSGraphics.id;
    _this.cameraPosition = {
      x: 0,
      y: 0
    };
    // this.game.data.camera.position = this.cameraPosition;
    _this.mouseWheelEnabled = false;
    _this.inflateBox = _inflateBox["default"].bind(_assertThisInitialized(_this));
    _this.inflateText = _inflateText["default"].bind(_assertThisInitialized(_this));
    _this.updateEntityPosition = _updateEntityPosition["default"].bind(_assertThisInitialized(_this));
    _this.handleInputs = _handleInputs["default"].bind(_assertThisInitialized(_this));
    _this.updatePlayerSprite = _updatePlayerSprite["default"].bind(_assertThisInitialized(_this));
    _this.depthChart = ['background', 'border', 'wire', 'PART', 'TEXT', 'PLAYER', 'BLOCK'];

    // this.depthChart = this.depthChart.reverse();
    _this.mouseWheelZoom = _mouseWheelZoom["default"].bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(CSSGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      var cssCamera = new _CSSCamera["default"](this, this.camera);
      this.game.use(cssCamera);

      // register renderer with graphics pipeline
      game.graphics.push(this);

      // let the graphics pipeline know the document is ready ( we could add document event listener here )
      // Remark: CSSGraphics current requires no async external loading scripts

      // Initialize the CSS render div
      this.initCSSRenderDiv();

      // Bind event handlers for changing player sprite
      this.handleInputs();

      // register renderer with graphics pipeline
      game.graphics.push(this);
      this.game.systemsManager.addSystem('graphics-css', this);

      // is sync load; however we still need to let the graphics pipeline know we are ready
      game.emit('plugin::ready::graphics-css', this);

      // TODO: remove this line from plugin implementations
      game.loadingPluginsCount--;

      // this.zoom(1.1);
    }
  }, {
    key: "initCSSRenderDiv",
    value: function initCSSRenderDiv() {
      // Ensure the gameHolder div exists
      // Remark: This is handled by `Graphics.js`; however in async loading with no priority
      // It is currently possible that CSSGraphics will load before Graphics does, so we need this check
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
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
    key: "createGraphic",
    value: function createGraphic(entityData) {
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
          entityElement.style.width = radius * 2 + 'px';
          entityElement.style.height = radius * 2 + 'px';
          entityElement.style.borderRadius = '50%'; // This will make the div a circle
          entityElement.style.background = 'red';
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
          entityElement.classList.add('guy-right-0');
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
      this.renderDiv.appendChild(entityElement);

      // Update the position of the entity element
      this.updateEntityPosition(entityElement, entityData);
      return entityElement;
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData) {
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
        // Update the background sprite if velocity is present
        /*
        if (entityData.type === 'PLAYER' && entityData.velocity && this.game.tick % 10 === 0 && Math.abs(entityData.velocity.x) > 0.001 && Math.abs(entityData.velocity.y) > 0.001) {
           let angle = Math.atan2(entityData.velocity.y, entityData.velocity.x);
          let angleDeg = angle * 180 / Math.PI;
           // Remark: Move this logic to just listen for local entityInput
          // we can revist this for server side prediction later
          // Determine direction based on angle
          let direction = "";
          if (angleDeg >= -45 && angleDeg < 45) {
            direction = "right";
          } else if (angleDeg >= 45 && angleDeg < 135) {
            direction = "down";
          } else if (angleDeg >= -135 && angleDeg < -45) {
            direction = "up";
          } else {
            direction = "left";
          }
           // Assume there's a way to determine whether to use -0 or -1 suffix
          // For simplicity, let's alternate between -0 and -1
          let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
          let spriteClass = `guy-${direction}-${spriteNumber}`;
           // First, clear previous sprite classes if any
          entityElement.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');
           // Add the new sprite class
          entityElement.classList.add(spriteClass);
           //console.log('Entity data:', entityData);
          //console.log('Applied class:', spriteClass);
        }
        */

        // Update the position of the entity element
        return this.updateEntityPosition(entityElement, entityData);
      } else {
        // If the entity element does not exist, create it
        return this.createGraphic(entityData);
      }
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      var entity = this.game.getEntity(entityId);
      if (!entity || !entity.graphics || !entity.graphics['graphics-css']) {
        return;
      }
      var renderDiv = document.getElementById('css-render-div');
      if (renderDiv && renderDiv.contains(entity.graphics['graphics-css'])) {
        entity.graphics['graphics-css'].remove();
      }
    }
  }, {
    key: "setTransform",
    value: function setTransform(entityElement, domX, domY, rotation, angle) {
      // Retrieve the last rotation value, default to 0 if not set
      var lastRotation = entityElement.dataset.rotation || 0;
      // Update rotation if provided
      if (rotation) {
        lastRotation = angle;
        entityElement.dataset.rotation = angle;
      }

      // Update the transform property
      entityElement.style.transform = "translate(".concat(domX, "px, ").concat(domY, "px) rotate(").concat(lastRotation, "deg)");
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      if (typeof game.viewportCenterXOffset === 'undefined') {
        game.viewportCenterXOffset = 0;
      }
      if (typeof game.viewportCenterYOffset === 'undefined') {
        game.viewportCenterYOffset = 0;
      }
      var currentPlayer = this.game.getEntity(game.currentPlayerId);
      var entityId = game.currentPlayerId;

      // PLAYER MOUSE MOVEMENT CODE< TODO MOVE THIS TO SEPARATE FILE
      /*
      if (currentPlayer && currentPlayer.inputs && currentPlayer.inputs.mouse && currentPlayer.inputs.mouse.buttons.LEFT) {
        let data = currentPlayer.inputs;
        // Player's current position
        const playerX = currentPlayer.position.x;
        const playerY = currentPlayer.position.y;
         // Get mouse position
        const mouseX = data.mouse.position.x;
        const mouseY = data.mouse.position.y;
         // Calculate direction vector
        let dirX = mouseX - playerX;
        let dirY = mouseY - playerY;
         // Calculate the angle in radians
        const angle = Math.atan2(dirY, dirX);
         // Define the fixed directions (in radians)
        const directions = {
          UP: -Math.PI / 2,
          DOWN: Math.PI / 2,
          LEFT: Math.PI,
          RIGHT: 0,
          //UP_LEFT: -3 * Math.PI / 4,
          //UP_RIGHT: -Math.PI / 4,
          //DOWN_LEFT: 3 * Math.PI / 4,
          //DOWN_RIGHT: Math.PI / 4
        };
         // Find the closest direction
        let closestDirection = Object.keys(directions).reduce((prev, curr) => {
          if (Math.abs(angle - directions[curr]) < Math.abs(angle - directions[prev])) {
            return curr;
          }
          return prev;
        });
         // Set direction vector based on the closest fixed direction
        switch (closestDirection) {
          case 'UP':
            dirX = 0;
            dirY = -1;
            break;
          case 'DOWN':
            dirX = 0;
            dirY = 1;
            break;
          case 'LEFT':
            dirX = -1;
            dirY = 0;
            break;
          case 'RIGHT':
            dirX = 1;
            dirY = 0;
            break;
          case 'UP_LEFT':
            dirX = -1;
            dirY = -1;
            break;
          case 'UP_RIGHT':
            dirX = 1;
            dirY = -1;
            break;
          case 'DOWN_LEFT':
            dirX = -1;
            dirY = 1;
            break;
          case 'DOWN_RIGHT':
            dirX = 1;
            dirY = 1;
            break;
        }
        // console.log("entityIdentityId", entityId, data);
        // this.updatePlayerSprite(entityId, data);
         // Apply the direction vector as force or movement
        game.applyForce(entityId, { x: dirX, y: dirY });
       }
      */
    }
  }, {
    key: "render",
    value: function render(game, alpha) {
      var _iterator = _createForOfIteratorHelper(this.game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            eId = _step$value[0],
            state = _step$value[1];
          var ent = this.game.entities.get(eId);
          this.inflateEntity(ent, alpha);
          if (ent.pendingRender && ent.pendingRender['graphics-css']) {
            ent.pendingRender['graphics-css'] = false;
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
      // checks for existence of entity, performs update or create
      if (entity.graphics && entity.graphics['graphics-css']) {
        var graphic = entity.graphics['graphics-css'];
        this.updateGraphic(entity, alpha);
      } else {
        var _graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-css'], _graphic);
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this2 = this;
      // Reset Zoom
      this.zoom(1);

      // TODO: consolidate graphics pipeline unloading into SystemsManager
      // TODO: remove duplicated unload() code in BabylonGraphics
      this.game.graphics = this.game.graphics.filter(function (g) {
        return g.id !== _this2.id;
      });
      delete this.game._plugins['CSSGraphics'];

      // remove the wheel event listener
      // document.removeEventListener('wheel', this.cssMouseWheelZoom);
      this.mouseWheelEnabled = false;

      // iterate through all entities and remove existing css graphics
      var _iterator2 = _createForOfIteratorHelper(this.game.entities.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            eId = _step2$value[0],
            entity = _step2$value[1];
          if (entity.graphics && entity.graphics['graphics-css']) {
            this.removeGraphic(eId);
            delete entity.graphics['graphics-css'];
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var div = document.getElementById('css-render-canvas');
      if (div) {
        div.remove();
      }
    }
  }, {
    key: "zoom",
    value: function zoom(scale) {
      console.log("CSSGraphics zoom", scale);
      var gameViewport = document.getElementById('gameHolder');
      if (gameViewport) {
        gameViewport.style.transform = "scale(".concat(scale, ")");
        gameViewport.style.transition = 'transform 1s ease'; // Adjust duration and easing as needed
        // transition: transform 0.3s ease; /* Adjust duration and easing as needed */
        this.game.data.camera.currentZoom = scale;
        // const viewportCenterX = window.innerWidth / 2;
        // const viewportCenterY = window.innerHeight / 2;
      }
    }
  }]);
  return CSSGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(CSSGraphics, "id", 'graphics-css');
_defineProperty(CSSGraphics, "removable", false);
var _default = exports["default"] = CSSGraphics;

},{"../../lib/GraphicsInterface.js":1,"./CSSCamera.js":2,"./lib/handleInputs.js":4,"./lib/inflateBox.js":5,"./lib/inflateText.js":6,"./lib/mouseWheelZoom.js":7,"./lib/updateEntityPosition.js":8,"./lib/updatePlayerSprite.js":9}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cssHandleInputs;
function cssHandleInputs() {
  var _this = this;
  var game = this.game;
  //
  // Updates the player sprite based on the current input
  // Remark: Input and Movement are handled in EntityInput and EntityMovement plugins
  //
  game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
    var player = game.getEntity(entityId);
    if (data && player) {
      game.components.inputs.set(entityId, data);
      //if (data.mouse.buttons.LEFT) {
      // game.components.inputs.set(entityId, data);
      // }
      //console.log('setting', entityId, 'inputs to', data)
      //player.inputs = data.controls;

      // console.log(data.mouse.position)
      if (data.controls) {
        _this.updatePlayerSprite(entityId, data);
      }
    }
  });
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateBox;
function inflateBox(entityElement, entityData) {
  var game = this.game;
  var depthChart = this.depthChart;
  // For other entities, create a rectangle
  var hexColor = 'white';
  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    hexColor = '#' + entityData.color.toString(16);
  }
  entityElement.style.width = entityData.width + 'px';
  entityElement.style.height = entityData.height + 'px';
  entityElement.style.borderRadius = '10px'; // Optional: to make it rounded

  // set default depth based on type
  entityElement.style.zIndex = depthChart.indexOf(entityData.type);

  // console.log('inflateBox', entityData.type, entityElement.style.zIndex)

  // TODO: move to separate file for inflatePart,
  // move this code to CSSGraphics switch case
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
  // console.log(entityData.type, entityData.name, entityElement.style.zIndex);
  // set border color to black
  entityElement.style.border = '1px solid black';
  entityElement.style.background = hexColor; // Move this line here
  return entityElement;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateText;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function inflateText(entityElement, entityData) {
  var depthChart = this.depthChart;
  // TODO: check if chat bubble already exists, if so just update it
  // Create a container for the chat bubble
  entityElement.className = 'chat-bubble-container';
  entityElement.style.position = 'absolute';

  // Create the chat bubble itself
  var chatBubble = document.createElement('div');
  chatBubble.className = 'chat-bubble';
  // chatBubble.style.position = 'absolute';
  chatBubble.style.border = '1px solid #000';
  chatBubble.style.borderRadius = '10px';
  // chatBubble.style.padding = '10px';
  // set padding to left and right
  chatBubble.style.paddingLeft = '10px';
  chatBubble.style.paddingRight = '10px';
  chatBubble.style.background = '#fff';
  if (_typeof(entityData.style) === 'object') {
    Object.assign(chatBubble.style, entityData.style);
  }

  // chatBubble.style.maxWidth = '200px';
  //chatBubble.style.width = `${entityData.width}px`;
  //chatBubble.style.height = `${entityData.height}px`;
  chatBubble.innerText = entityData.text || '';

  // set default depth based on type
  // console.log(entityData.type, entityData.name, depthChart.indexOf(entityData.type))
  chatBubble.style.zIndex = depthChart.indexOf(entityData.type);

  // console.log('appending new text element')
  // Append the chat bubble to the container
  entityElement.appendChild(chatBubble);
  // Update the position of the chat bubble container
  //this.updateEntityElementPosition(entityElement, entityData);

  return entityElement;
}

},{}],7:[function(require,module,exports){
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
    intensity: 0.03,
    // Decreased zoom intensity for smoother zoom
    minScale: 0.1 // Minimum scale limit
  };

  // Prevent default scrolling behavior
  event.preventDefault();

  // Determine zoom direction
  var delta = event.wheelDelta ? event.wheelDelta : -event.detail;
  var direction = delta > 0 ? 1 : -1;

  // Update scale
  scale += direction * zoomSettings.intensity;
  scale = Math.max(zoomSettings.minScale, scale); // Prevent zooming out too much

  this.zoom(scale);

  // Calculate center of the viewport
  var viewportCenterX = window.innerWidth / 2;
  var viewportCenterY = window.innerHeight / 2;
  scale = scale * 100;
  // Calculate offset based on camera position and scale
  var offsetX = (viewportCenterX - this.cameraPosition.x) / scale;
  var offsetY = (viewportCenterY - this.cameraPosition.y) / scale;
  offsetX += 100;
  offsetY += 100;

  //console.log('oooo', offsetX, offsetY, scale)
  // Update game viewport offsets (if needed)
  //game.viewportCenterXOffset = offsetX;
  //game.viewportCenterYOffset = offsetY;
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateEntityElementPosition;
function updateEntityElementPosition(entityElement, _ref) {
  var position = _ref.position,
    width = _ref.width,
    height = _ref.height,
    _ref$rotation = _ref.rotation,
    rotation = _ref$rotation === void 0 ? 0 : _ref$rotation;
  // Adjust the position based on the camera position
  //console.log("og position", position, this.cameraPosition)
  var adjustedPosition = {
    x: position.x - this.cameraPosition.x + window.outerWidth / 2,
    y: position.y - this.cameraPosition.y + window.outerHeight / 2
  };
  var domX = adjustedPosition.x - width / 2;
  var domY = adjustedPosition.y - height / 2;

  // convert rotation to degrees
  var angle = rotation * (180 / Math.PI);
  this.setTransform(entityElement, domX, domY, rotation, angle);

  //console.log('updated position', position, adjustedPosition, domX, domY)

  return entityElement;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updatePlayerSprite;
function updatePlayerSprite(entityId, data) {
  var game = this.game;
  var currentInputs = data.controls;
  if (game.tick % 5 !== 0) {
    return;
  }
  // check to see if we have a player entity
  var playerEntity = game.getEntity(entityId);
  if (!playerEntity) {
    return;
  }
  var graphic = playerEntity.graphics['graphics-css'];
  if (!graphic) {
    return;
  }
  var direction = 'right';
  if (currentInputs) {
    if (currentInputs.W) {
      direction = 'up';
    } else if (currentInputs.A) {
      direction = 'left';
    } else if (currentInputs.S) {
      direction = 'down';
    } else if (currentInputs.D) {
      direction = 'right';
    }
    // Assume there's a way to determine whether to use -0 or -1 suffix
    // For simplicity, let's alternate between -0 and -1

    // get current className from graphic
    var spriteClass = graphic.className;

    // check it spriteClass has "0" in it
    var spriteNumber = spriteClass.indexOf('0') > -1 ? 1 : 0;

    // let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
    //let spriteNumber = playerEntity.bit;
    spriteClass = "guy-".concat(direction, "-").concat(spriteNumber);

    // First, clear previous sprite classes if any
    graphic.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');

    // Add the new sprite class
    graphic.classList.add(spriteClass);
  }
}

},{}]},{},[3])(3)
});

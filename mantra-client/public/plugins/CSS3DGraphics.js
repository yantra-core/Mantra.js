(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).CSS3DGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var CSS3DCamera = /*#__PURE__*/function () {
  function CSS3DCamera(graphics) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, CSS3DCamera);
    this.graphics = graphics;
    this.position = {
      x: 0,
      y: 0,
      z: 0
    };
    this.rotation = {
      x: 0,
      y: 0,
      z: 0
    };
    this.id = CSS3DCamera.id;
    // Additional camera properties and methods
  }
  _createClass(CSS3DCamera, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('camera', this);
    }
  }, {
    key: "update",
    value: function update() {
      var currentPlayer = this.game.getEntity(this.game.currentPlayerId);
      if (!currentPlayer) {
        return;
      }

      // Assume player's eye level is at z = 1.65 meters (or units in your game's scale)
      var eyeLevel = 1.65;

      // Update camera position to match player's position and eye level.
      this.position.x = currentPlayer.position.x;
      this.position.y = currentPlayer.position.y;
      this.position.z = currentPlayer.position.z + eyeLevel; // Eye level height

      // If player's rotation is undefined, default to 0
      var playerRotation = currentPlayer.rotation || 0;
      var rotationY = playerRotation * 180 / Math.PI;

      // Get half of the viewport's width and height
      var halfScreenWidth = window.innerWidth / 2;
      var halfScreenHeight = window.innerHeight / 2;

      // Apply the camera transformations with additional translation to center the player
      var transform = "translate3d(".concat(-this.position.x + halfScreenWidth, "px, ").concat(-this.position.y + halfScreenHeight, "px, ").concat(-this.position.z, "px) rotateY(").concat(rotationY, "deg)");
      this.graphics.renderDiv.style.transform = transform;
    }

    // console.log('currentPlayer', currentPlayer.position);

    // Other necessary methods for camera control
  }]);
  return CSS3DCamera;
}();
_defineProperty(CSS3DCamera, "id", 'css-3d-camera');
var _default = exports["default"] = CSS3DCamera;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _CSS3DCamera = _interopRequireDefault(require("./CSS3DCamera.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CSS3DGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(CSS3DGraphics, _GraphicsInterface);
  var _super = _createSuper(CSS3DGraphics);
  function CSS3DGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      camera = _ref.camera;
    _classCallCheck(this, CSS3DGraphics);
    _this = _super.call(this);
    _this.config = {
      camera: camera || {}
    };
    _this.id = CSS3DGraphics.id;
    _this.cameraPosition = {
      x: 0,
      y: 0,
      z: 0
    }; // 3D position

    // Bind methods
    _this.initCSS3DRenderDiv = _this.initCSS3DRenderDiv.bind(_assertThisInitialized(_this));
    _this.createGraphic = _this.createGraphic.bind(_assertThisInitialized(_this));
    _this.updateEntityPosition = _this.updateEntityPosition.bind(_assertThisInitialized(_this));
    _this.render = _this.render.bind(_assertThisInitialized(_this));

    // Additional properties and methods initialization
    return _this;
  }
  _createClass(CSS3DGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;

      // Initialize CSS3D camera
      var css3dCamera = new _CSS3DCamera["default"](this, this.camera);
      this.game.use(css3dCamera);

      // Initialize the CSS3D render div
      this.initCSS3DRenderDiv();

      // Register renderer with graphics pipeline
      game.graphics.push(this);

      // Other initialization code
      game.emit('plugin::ready::graphics-css-3d', this);
    }
  }, {
    key: "initCSS3DRenderDiv",
    value: function initCSS3DRenderDiv() {
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder);
      }
      var renderDiv = document.createElement('div');
      renderDiv.id = 'css3d-render-div';
      renderDiv.style.position = 'absolute';
      renderDiv.style.transformStyle = 'preserve-3d'; // Enable 3D transformations
      gameHolder.appendChild(renderDiv);
      this.renderDiv = renderDiv;

      // Set up the camera's perspective
      this.setupCameraPerspective();
    }
  }, {
    key: "setupCameraPerspective",
    value: function setupCameraPerspective() {
      this.renderDiv.style.perspective = '600px'; // Adjust as needed for the desired effect
      // Other camera setup code
    }
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      var entityElement = document.createElement('div');
      entityElement.id = "entity-".concat(entityData.id);
      entityElement.className = 'entity-element';
      entityElement.style.position = 'absolute';
      entityElement.style.transformOrigin = '0 0 0';
      // color and border
      //    entityElement.style.backgroundColor = entityData.color;
      entityElement.style.backgroundColor = 'green';
      entityElement.style.color = 'green';
      entityElement.style.border = '1px solid black';
      entityElement.style.top = "".concat(entityData.position.y, "px");
      entityElement.style.left = "".concat(entityData.position.x, "px");
      entityElement.style.width = "".concat(entityData.width, "px");
      entityElement.style.height = "".concat(entityData.height, "px");
      entityElement.style.transformStyle = 'preserve-3d';

      // Apply initial transformations based on entityData
      this.setEntityTransform(entityElement, entityData, 300); // Use a default perspective distance or adjust as needed

      this.renderDiv.appendChild(entityElement);
      return entityElement;
    }
  }, {
    key: "setEntityTransform",
    value: function setEntityTransform(entityElement, entityData, perspectiveDistance) {
      var rotationDeg = (entityData.rotation || 0) * 180 / Math.PI; // Convert radians to degrees
      entityData.position.z = entityData.position.z || 0; // Ensure z position is set
      var scale = perspectiveDistance / (perspectiveDistance - entityData.position.z);

      // Apply transformation
      entityElement.style.transform = "\n      translate3d(".concat(entityData.position.x, "px, ").concat(entityData.position.y, "px, ").concat(entityData.position.z, "px)\n      scale(").concat(scale, ")\n      rotateY(").concat(rotationDeg, "deg)");

      // Adjust zIndex for proper stacking
      entityElement.style.zIndex = 1000 - Math.floor(entityData.position.z);
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entityData, alpha) {
      var entityElement = document.getElementById("entity-".concat(entityData.id));
      if (!entityElement) {
        console.error("No element found for entity ".concat(entityData.id));
        return;
      }

      // If this entity is the player, skip updating its graphic.
      // Otherwise, update based on interpolated position.
      if (entityData.id !== this.game.currentPlayerId) {
        var interpolatedPosition = entityData.position; // Interpolation logic can be added here if needed
        this.setEntityTransform(entityElement, entityData, 800);
      }
    }
  }, {
    key: "updateEntityPosition",
    value: function updateEntityPosition(entityElement, entityData) {
      this.apply3DTransformations(entityElement, entityData);
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityData) {
      var entityElement = document.getElementById("entity-".concat(entityData.id));
      if (entityElement) {
        entityElement.parentNode.removeChild(entityElement);
      }
    }
  }, {
    key: "inflateEntity",
    value: function inflateEntity(entityData, alpha) {
      var entity = this.game.getEntity(entityData.id);
      // Inflate the graphic of an entity in 3D space
      if (entity.graphics && entity.graphics['graphics-css-3d']) {
        var graphic = entity.graphics['graphics-css-3d'];
        this.updateGraphic(entity, alpha);
      } else {
        var _graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-css-3d'], _graphic);
      }
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
          // do not re-inflate destroyed entities
          if (ent.destroyed !== true) {
            this.inflateEntity(ent, alpha);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return CSS3DGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(CSS3DGraphics, "id", 'graphics-css-3d');
_defineProperty(CSS3DGraphics, "removable", false);
var _default = exports["default"] = CSS3DGraphics;

},{"../../lib/GraphicsInterface.js":1,"./CSS3DCamera.js":2}]},{},[3])(3)
});

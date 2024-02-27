(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).ASCIIGraphics = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var _GraphicsInterface2 = _interopRequireDefault(require("../../lib/GraphicsInterface.js"));
var _CSSCamera = _interopRequireDefault(require("../graphics-css/CSSCamera.js"));
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // ASCIIGraphics.js - Marak Squires 2024
var ASCIIGraphics = /*#__PURE__*/function (_GraphicsInterface) {
  _inherits(ASCIIGraphics, _GraphicsInterface);
  var _super = _createSuper(ASCIIGraphics);
  function ASCIIGraphics() {
    var _this;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      camera = _ref.camera;
    _classCallCheck(this, ASCIIGraphics);
    _this = _super.call(this);
    _this.camera = camera;
    _this.cameraPosition = {
      x: 0,
      y: 0
    };
    _this.screen = null;
    _this.elements = {};
    _this.id = ASCIIGraphics.id;
    _this.asciiScreen = []; // New array to hold ASCII screen representation
    return _this;
  }
  _createClass(ASCIIGraphics, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.asciiScreen = this.asciiScreen;

      // Set the ASCII screen size to a portion of the viewport size, for example 50%
      var screenScaleFactor = 0.5; // Adjust this value to scale the ASCII screen size
      this.screen = {
        width: Math.round(Math.min(window.innerWidth, game.width) * screenScaleFactor),
        height: Math.round(Math.min(window.innerHeight, game.height) * screenScaleFactor)
      };

      // Scaling factors - determine how game coordinates are scaled to ASCII screen coordinates
      this.scaleX = this.screen.width / game.width;
      this.scaleY = this.screen.height / game.height;
      var cssCamera = new _CSSCamera["default"](this, this.camera);
      this.game.use(cssCamera);
      this.createAsciiContainer(); // Initialize the ASCII container in the DOM
      this.createAsciiScreen(); // Initialize ASCII screen
      game.graphics.push(this);
    }

    // Method to convert entity to ASCII representation
  }, {
    key: "entityToAscii",
    value: function entityToAscii(entity) {
      // Simple example: return a character based on entity type
      // More complex logic can be implemented as needed
      switch (entity.type) {
        case 'PLAYER':
          return '@';
        case 'ENEMY':
          return '!';

        // Add more cases as needed
        default:
          return '#';
      }
    }
  }, {
    key: "createAsciiContainer",
    value: function createAsciiContainer() {
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';
        document.body.appendChild(gameHolder);
      }
      var renderDiv = document.getElementById('ascii-render-div');
      if (!renderDiv) {
        renderDiv = document.createElement('div');
        renderDiv.id = 'ascii-render-div';
        renderDiv.className = 'render-div';
        gameHolder.appendChild(renderDiv);
      }
      this.renderDiv = renderDiv;

      // this.renderDiv = document.createElement('div');
      this.renderDiv.style.fontFamily = 'monospace';
      // set zIndex to 1 to ensure it is above other elements
      this.renderDiv.style.zIndex = 1;
      // larger font
      this.renderDiv.style.fontSize = '16px';
      // font color is black
      this.renderDiv.style.color = '#000';
      this.renderDiv.style.whiteSpace = 'pre'; // Ensure whitespace is respected
      gameHolder.appendChild(this.renderDiv); // Append to body, or another element as needed

      // Initialize the container with blank spaces
      for (var y = 0; y < this.screen.height; y++) {
        var row = document.createElement('div');
        row.textContent = ' '.repeat(this.screen.width); // Initialize with blank spaces
        this.renderDiv.appendChild(row);
      }
    }
  }, {
    key: "updateAsciiContainer",
    value: function updateAsciiContainer() {
      for (var y = 0; y < this.screen.height; y++) {
        var row = this.renderDiv.childNodes[y];
        var newRowContent = this.asciiScreen[y].join('');
        if (row.textContent !== newRowContent) {
          row.textContent = newRowContent; // Update entire row if different
        }
      }
    }
  }, {
    key: "createAsciiScreen",
    value: function createAsciiScreen() {
      // Initialize the ASCII screen with the viewport size
      for (var y = 0; y < this.screen.height; y++) {
        this.asciiScreen[y] = [];
        for (var x = 0; x < this.screen.width; x++) {
          this.asciiScreen[y][x] = ' ';
        }
      }
    }
  }, {
    key: "transformEntityToScreenCoordinates",
    value: function transformEntityToScreenCoordinates(entity) {
      // console.log(this.game.data.camera.position)
      var x = Math.round((entity.position.x - this.game.data.camera.position.x + this.game.width / 2) * this.scaleX);
      var y = Math.round((entity.position.y - this.game.data.camera.position.y + this.game.height / 2) * this.scaleY);
      var width = Math.max(1, Math.round(entity.width * this.scaleX));
      var height = Math.max(1, Math.round(entity.height * this.scaleY));
      x = Math.max(0, Math.min(x, this.screen.width - width));
      y = Math.max(0, Math.min(y, this.screen.height - height));
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    }
  }, {
    key: "isWithinScreenBounds",
    value: function isWithinScreenBounds(x, y) {
      return x >= 0 && x < this.screen.width && y >= 0 && y < this.screen.height;
    }
  }, {
    key: "inflateGraphic",
    value: function inflateGraphic(entity) {
      // console.log('inflateGraphic', entityData)
      if (entity.kind === 'building') {
        return; // for now
      }

      var graphic;
      if (entity.graphics && entity.graphics['graphics-ascii']) {
        graphic = entity.graphics['graphics-ascii'];
        if (entity.type !== 'BORDER') {
          // TODO: remove this
          this.updateGraphic(entity);
        }
      } else {
        graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-ascii'], graphic);
      }
      if (!graphic) {
        return;
      }
    }
  }, {
    key: "createGraphic",
    value: function createGraphic(entityData) {
      var _this$transformEntity = this.transformEntityToScreenCoordinates(entityData),
        x = _this$transformEntity.x,
        y = _this$transformEntity.y,
        width = _this$transformEntity.width,
        height = _this$transformEntity.height;
      var asciiChar = this.entityToAscii(entityData);

      // Fill in the ASCII characters for the entity
      for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
          if (this.isWithinScreenBounds(x + j, y + i)) {
            this.asciiScreen[y + i][x + j] = asciiChar;
          }
        }
      }
      this.elements[entityData.id] = {
        x: x,
        y: y,
        "char": asciiChar,
        width: width,
        height: height
      };
      return this.elements[entityData.id];
    }
  }, {
    key: "updateGraphic",
    value: function updateGraphic(entity) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var oldPos = this.elements[entity.id];
      var newPos = this.transformEntityToScreenCoordinates(entity);

      // console.log(`Updating entity ${entity.id}:`, { oldPos, newPos, entity });

      if (this.elements[entity.id]) {
        var _oldPos = this.elements[entity.id];
        var _this$transformEntity2 = this.transformEntityToScreenCoordinates(entity),
          x = _this$transformEntity2.x,
          y = _this$transformEntity2.y,
          width = _this$transformEntity2.width,
          height = _this$transformEntity2.height;
        var asciiChar = this.entityToAscii(entity);

        // Clear old position
        for (var i = 0; i < _oldPos.height; i++) {
          for (var j = 0; j < _oldPos.width; j++) {
            if (this.isWithinScreenBounds(_oldPos.x + j, _oldPos.y + i)) {
              this.asciiScreen[_oldPos.y + i][_oldPos.x + j] = ' ';
            }
          }
        }

        // Draw new position
        for (var _i = 0; _i < height; _i++) {
          for (var _j = 0; _j < width; _j++) {
            if (this.isWithinScreenBounds(x + _j, y + _i)) {
              this.asciiScreen[y + _i][x + _j] = asciiChar;
            }
          }
        }
        this.elements[entity.id] = {
          x: x,
          y: y,
          "char": asciiChar,
          width: width,
          height: height
        };
      }
    }
  }, {
    key: "render",
    value: function render(game) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      //this.updateAsciiContainer(); // Smart update of ASCII display in the DOM

      this.game.data.camera.position = this.cameraPosition;
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
        // console.log(this.camera.position, this.game.data.camera.position)
        //this.cameraPosition.x = this.camera.position.x;
        //this.cameraPosition.y = this.camera.position.y;
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.updateAsciiContainer();
    }
  }, {
    key: "update",
    value: function update() {
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
      if ( /*this.follow && */currentPlayer && currentPlayer.position) {
        // If following a player, adjust the camera position based on the player's position and the calculated offset
        //this.scene.cameraPosition.x = currentPlayer.position.x + game.data.camera.offsetX;
        this.game.data.camera.position.x = currentPlayer.position.x + game.data.camera.offsetX;
        //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;

        //let newY = currentPlayer.position.y + game.data.camera.offsetY;
        var newY = currentPlayer.position.y + game.data.camera.offsetY;
        this.scene.cameraPosition.y = newY;
      } else {
        // If not following a player, use the calculated offsets directly
        this.scene.cameraPosition.x = game.data.camera.offsetX;
        this.scene.cameraPosition.y = game.data.camera.offsetY;
      }
    }
  }, {
    key: "removeGraphic",
    value: function removeGraphic(entityId) {
      if (this.elements[entityId]) {
        var _this$elements$entity = this.elements[entityId],
          x = _this$elements$entity.x,
          y = _this$elements$entity.y;
        this.asciiScreen[y][x] = ' '; // Clear the character
        delete this.elements[entityId];
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      this.screen.destroy();
      this.asciiScreen = [];
    }
  }]);
  return ASCIIGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(ASCIIGraphics, "id", 'graphics-ascii');
_defineProperty(ASCIIGraphics, "removable", true);
var _default = exports["default"] = ASCIIGraphics;

},{"../../lib/GraphicsInterface.js":1,"../graphics-css/CSSCamera.js":3}],3:[function(require,module,exports){
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
    this.cameraThrowEnabled = true;
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

},{"./lib/camera/applyThrow.js":4,"./lib/camera/cameraShake.js":5,"./lib/camera/mouseWheelZoom.js":6,"./lib/camera/rotateCameraOverTime.js":7,"./lib/camera/setTransform.js":8,"./lib/camera/update.js":9,"./lib/camera/updateCameraPosition.js":10,"./lib/camera/updateEntityPosition.js":11,"./lib/camera/zoom.js":12}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = applyThrow;
// Apply the throw inertia to the camera
function applyThrow() {
  if (!this.isThrowing) return;
  if (!this.cameraThrowEnabled) {
    return;
  }
  var game = this.game;
  var decayFactor = 0.555; // Increase closer to 1 for longer throws

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

  var mouse = this.game.systems.mouse;
  var target = event.target;
  var defaultScrollElements = ['TEXTAREA', 'PRE', 'CODE', 'BUTTON', 'INPUT'];

  // console.log("Event target tag:", target.tagName);

  // If the target is a CODE element, use its parent PRE for overflow check
  if (target.tagName.toUpperCase() === 'CODE') {
    target = target.parentNode; // Assuming the immediate parent is always a PRE
  }

  // Check if the event target is one of the default scroll elements
  if (defaultScrollElements.includes(target.tagName.toUpperCase())) {
    // Determine if the target element (PRE) is overflowing
    var isOverflowing = target.scrollHeight > target.clientHeight;

    // If the target element is not overflowing, prevent the default scroll
    if (!isOverflowing) {
      event.preventDefault();
      // console.log("Custom wheel event action");
    } else {
      // If the target element is overflowing, allow the default browser scroll
      // console.log("Default scroll allowed for overflowing content");
      // Return here to prevent camera zooming
      return;
    }
  } else {
    // For elements other than 'TEXTAREA', 'PRE', 'CODE', prevent default scroll
    event.preventDefault();
    // console.log("Custom wheel event action for non-default scroll elements");
  }
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
    intensity: 0.1,
    // Base zoom intensity
    minScale: 0.1,
    // Minimum scale limit
    logBase: 2 // Logarithmic base
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
  var draggingAllowed = true;
  if (typeof game.data.camera.draggingAllowed === 'boolean') {
    draggingAllowed = game.data.camera.draggingAllowed;
  }
  if (!draggingAllowed) {
    return;
  }

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

},{}]},{},[2])(2)
});

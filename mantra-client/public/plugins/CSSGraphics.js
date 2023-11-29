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
    return _this;
  }
  _createClass(CSSGraphics, [{
    key: "init",
    value: function init(game) {
      // register renderer with graphics pipeline
      game.graphics.push(this);
      this.game = game;
      this.game.systemsManager.addSystem('graphics-css', this);

      // let the graphics pipeline know the document is ready ( we could add document event listener here )
      // Remark: CSSGraphics current requires no async external loading scripts
      game.graphicsReady.push(self.name);

      // Initialize the CSS render div
      this.initCSSRenderDiv();
    }
  }, {
    key: "initCSSRenderDiv",
    value: function initCSSRenderDiv() {
      var gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        console.error('gameHolder not found!');
        return;
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
          break;
        case 'PLAYER':
          // For PLAYER entities, create a triangle
          entityElement.style.width = '0px';
          entityElement.style.height = '0px';
          entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
          entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
          entityElement.style.borderBottom = entityData.height + 'px solid blue';
          break;
        case 'TEXT':
          entityElement = this.createText(entityElement, entityData);
          break;
        default:
          // For other entities, create a rectangle
          entityElement.style.width = entityData.width + 'px';
          entityElement.style.height = entityData.height + 'px';
          entityElement.style.borderRadius = '10px'; // Optional: to make it rounded
          entityElement.style.background = 'blue'; // Move this line here
          break;
      }
      entityElement.style.background = 'blue';
      this.renderDiv.appendChild(entityElement);

      // Update the position of the entity element
      this.updateEntityElementPosition(entityElement, entityData);
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
        // Update the position of the entity element
        return this.updateEntityElementPosition(entityElement, entityData);
      } else {
        // If the entity element does not exist, create it
        return this.createGraphic(entityData);
      }
    }
  }, {
    key: "createText",
    value: function createText(entityElement, entityData) {
      // Create a container for the chat bubble
      entityElement.className = 'chat-bubble-container';
      entityElement.style.position = 'absolute';

      // Create the chat bubble itself
      var chatBubble = document.createElement('div');
      chatBubble.className = 'chat-bubble';
      chatBubble.style.border = '1px solid #000';
      chatBubble.style.borderRadius = '10px';
      chatBubble.style.padding = '10px';
      chatBubble.style.background = '#fff';
      chatBubble.style.maxWidth = '200px';
      chatBubble.innerText = "entityData.text"; // Assuming entityData contains the chat text

      // Append the chat bubble to the container
      entityElement.appendChild(chatBubble);
      // Update the position of the chat bubble container
      //this.updateEntityElementPosition(entityElement, entityData);

      return entityElement;
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
    key: "updateEntityElementPosition",
    value: function updateEntityElementPosition(entityElement, _ref2) {
      var position = _ref2.position,
        width = _ref2.width,
        height = _ref2.height,
        _ref2$rotation = _ref2.rotation,
        rotation = _ref2$rotation === void 0 ? 0 : _ref2$rotation;
      // Adjust the position based on the camera position
      var adjustedPosition = {
        x: position.x - this.cameraPosition.x + window.innerWidth / 2,
        y: position.y - this.cameraPosition.y + window.innerHeight / 2
      };
      var domX = adjustedPosition.x - width / 2;
      var domY = adjustedPosition.y - height / 2;

      // convert rotation to degrees
      var angle = rotation * (180 / Math.PI);
      // Translate and rotate the element
      entityElement.style.transform = "\n      translate(".concat(domX, "px, ").concat(domY, "px)\n      rotate(").concat(angle, "deg)\n    ");
      return entityElement;
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      var currentPlayer = this.game.getEntity(game.currentPlayerId);
      if (this.config.camera && this.config.camera === 'follow' && currentPlayer) {
        if (currentPlayer.position) {
          this.cameraPosition.x = currentPlayer.position.x;
          this.cameraPosition.y = currentPlayer.position.y;
        }
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
          if (ent.pendingRender && ent.pendingRender['graphics-css']) {
            this.inflateEntity(ent, alpha);
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
      if (entity.graphics && entity.graphics['graphics-css']) {
        var graphic = entity.graphics['graphics-css'];
        this.updateGraphic(entity, alpha);
      } else {
        var _graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-css'], _graphic);
      }
    }
  }]);
  return CSSGraphics;
}(_GraphicsInterface2["default"]);
_defineProperty(CSSGraphics, "id", 'graphics-css');
_defineProperty(CSSGraphics, "removable", false);
var _default = exports["default"] = CSSGraphics;

},{"../../lib/GraphicsInterface.js":1}]},{},[2])(2)
});
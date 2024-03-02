(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Markup = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Markup.js - Marak Squires 2023
// This Plugin will parse the DOM HTML and create entities based on the markup
// Uses the custom elements API to define custom elements
// Can bind to events on the entity event lifecycle
// collision events / pointer events / entity creation / entity removal
// Remark: Not all events and styles are supported yet
var Markup = exports["default"] = /*#__PURE__*/function () {
  function Markup() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$displayOriginalH = _ref.displayOriginalHTML,
      displayOriginalHTML = _ref$displayOriginalH === void 0 ? false : _ref$displayOriginalH;
    _classCallCheck(this, Markup);
    this.id = Markup.id;
    this.originalHTML = '';
    this.displayOriginalHTML = displayOriginalHTML;
  }
  _createClass(Markup, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      //this.initializeGame();
      this.saveOriginalHTML();
      this.game.systemsManager.addSystem(Markup.id, this);
    }
  }, {
    key: "removeAllCustomElements",
    value: function removeAllCustomElements(game) {
      // Use the systems map keys directly to construct tag names for custom elements
      var systemsTags = Array.from(Object.keys(game.systems)).map(function (systemName) {
        return "m-".concat(systemName.toLowerCase());
      });
      var entities = document.querySelectorAll(systemsTags.join(','));
      entities.forEach(function (entity) {
        return entity.remove();
      });
    }
  }, {
    key: "defineCustomElements",
    value: function defineCustomElements(game) {
      game.plugins.forEach(function (pluginName) {
        var tagName = "m-".concat(pluginName.toLowerCase());
        if (!customElements.get(tagName)) {
          // Prevent redefining existing custom elements
          var CustomElement = /*#__PURE__*/function (_HTMLElement) {
            _inherits(CustomElement, _HTMLElement);
            var _super = _createSuper(CustomElement);
            function CustomElement() {
              _classCallCheck(this, CustomElement);
              return _super.call(this);
            }
            return _createClass(CustomElement);
          }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
          customElements.define(tagName, CustomElement);
        }
      });
    }
  }, {
    key: "parseCustomDomElements",
    value: function parseCustomDomElements(game) {
      console.log('Parsing custom DOM elements...', game);
      var systems = game.systemsManager.systems;
      // systems is map, we need to iterate over the values
      var that = this;
      function processSystem(system) {
        var tagName = "m-".concat(system.id.toLowerCase());
        var entities = document.querySelectorAll(tagName);
        entities.forEach(function (entity) {
          // Define a safe list of style properties
          var safeStyleProperties = new Set(['color', 'background', 'fontSize',
          // Shorthand border properties
          'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
          // Border-width properties
          'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
          // Border-style properties
          'border-style', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
          // Border-color properties
          'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
          // Background
          'background-color', 'background-image', 'background-repeat', 'background-position', 'background-size',
          // Margin and Padding
          'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'
          // Add other relevant style properties here
          ]);

          var styles = window.getComputedStyle(entity);
          var safeStyles = {};
          // Copy only the safe styles
          var _iterator = _createForOfIteratorHelper(styles),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var style = _step.value;
              if (safeStyleProperties.has(style)) {
                safeStyles[style] = styles[style];
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var entityType = system.constructor.name;
          var ent = game.make();
          ent[entityType]();
          ent.style(safeStyles);
          that.buildEntity(ent, entity);
        });
      }
      processSystem(game.systems.container);
      var _iterator2 = _createForOfIteratorHelper(systems.values()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var system = _step2.value;
          if (system.id === 'container') continue;
          //console.log('system', system)
          processSystem(system);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      console.log('All entities created.');
    }
  }, {
    key: "parseDl",
    value: function parseDl(dl, parentObject) {
      var _this = this;
      var dts = dl.querySelectorAll('dt');
      var dds = dl.querySelectorAll('dd');
      dts.forEach(function (dt, index) {
        var key = dt.textContent.trim();
        var dd = dds[index];
        var nestedDl = dd.querySelector('dl');
        if (nestedDl) {
          var nestedObject = {};
          _this.parseDl(nestedDl, nestedObject);
          parentObject[key] = nestedObject;
        } else {
          parentObject[key] = dd.textContent.trim();
        }
      });
    }
  }, {
    key: "buildEntity",
    value: function buildEntity(ent, entity) {
      var _this2 = this;
      var width = parseInt(entity.getAttribute('width'), 10) || 16;
      var height = parseInt(entity.getAttribute('height'), 10) || 16;
      var x = parseInt(entity.getAttribute('data-x'), 10) || 0;
      var y = parseInt(entity.getAttribute('data-y'), 10) || 0;
      var repeat = parseInt(entity.getAttribute('data-repeat'), 10) || 1;
      var texture = entity.getAttribute('data-texture') || null;
      var color = entity.getAttribute('data-color') || null;
      var layout = entity.getAttribute('data-layout') || null;
      // TODO: get any pointerdown events bound to the entity
      var pointerdown = entity.getAttribute('onpointerdown') || null;

      // if text element, get the inner HTML
      if (entity.tagName.toLowerCase() === 'm-text') {
        ent.text(entity.innerHTML);
      }
      var collisionStart = entity.getAttribute('data-collision-start') || null;
      ent.x(x).y(y).z(10).width(width).height(height);
      if (texture) {
        ent.texture(texture);
      }
      if (color) {
        ent.color(color);
      }
      if (layout) {
        ent.layout(layout);
      }
      ent.pointerdown(function () {
        // TODO: check ECS pointerevents, was seeing a double event, could have been test env
        // TODO: switch to window or scoped object instead of eval
        pointerdown && eval(pointerdown);
      });
      ent.collisionStart(function (a, b, pair, context) {
        window[collisionStart] && window[collisionStart](a, b, pair, context);
      });

      //entity.removeAttribute('onpointerdown');

      var dls = entity.querySelectorAll('dl');
      if (dls.length > 0) {
        var meta = {};
        dls.forEach(function (dl) {
          return _this2.parseDl(dl, meta);
        });
        console.log('Assigning meta:', meta);
        ent.meta(meta);
      }
      var containerName = entity.getAttribute('data-name');
      if (containerName) {
        ent.name(containerName);
      }
      var parentContainer = entity.closest('m-container');
      if (parentContainer) {
        var parentContainerName = parentContainer.getAttribute('data-name');
        if (parentContainerName) {
          ent.container(parentContainerName);
        }
      }
      if (repeat > 1) {
        console.log("repeat", repeat);
        ent.repeat(repeat);
      }
      ent.createEntity();
    }
  }, {
    key: "preview",
    value: function preview() {
      var game = this.game;
      // Iterate over the keys of the systems object
      Object.keys(game.systems).forEach(function (systemName) {
        var tagName = "m-".concat(systemName.toLowerCase());
        var entities = document.querySelectorAll(tagName);
        console.log('align');
        entities.forEach(function (entity) {
          var x = parseInt(entity.getAttribute('data-x') || 0, 10) + window.innerWidth / 2;
          var y = parseInt(entity.getAttribute('data-y') || 0, 10) + window.innerHeight / 2;
          entity.style.position = 'absolute';
          entity.style.left = "".concat(x, "px");
          entity.style.top = "".concat(y, "px");
          //entity.width = parseInt(entity.getAttribute('width'), 10) || 16;
          //entity.height = parseInt(entity.getAttribute('height'), 10) || 16;
        });
      });
    }
  }, {
    key: "saveOriginalHTML",
    value: function saveOriginalHTML() {
      this.originalHTML = document.body.innerHTML;
    }
  }, {
    key: "displayOrignalHTMLInPreTag",
    value: function displayOrignalHTMLInPreTag() {
      var pre = document.createElement('pre');
      pre.textContent = this.originalHTML;
      document.body.appendChild(pre);
    }
  }, {
    key: "parseHTML",
    value: function parseHTML(displayOriginalHTML) {
      var game = this.game;
      this.defineCustomElements(game);
      this.parseCustomDomElements(game);
      this.removeAllCustomElements(game);
      if (displayOriginalHTML || this.displayOriginalHTML) {
        this.displayOrignalHTMLInPreTag();
      }
    }
  }]);
  return Markup;
}();
_defineProperty(Markup, "id", 'markup');

},{}]},{},[1])(1)
});

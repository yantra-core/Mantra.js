(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Link = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateLink = _interopRequireDefault(require("./lib/inflateLink.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Link.js - Marak Squires 2024
var Link = exports["default"] = /*#__PURE__*/function () {
  function Link() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Link);
    this.id = Link.id;
    this.disabled = false; // Links typically don't have a disabled state, but included for consistency
    if (typeof config.disabled === 'boolean') {
      this.disabled = config.disabled;
    }
  }
  _createClass(Link, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.inflate = _inflateLink["default"].bind(this);
      this.game.systemsManager.addSystem('link', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      entityData.position = entityData.position || {
        x: 0,
        y: 0
      };
      entityData.meta = entityData.meta || {};
      if (typeof entityData.href !== 'undefined') {
        entityData.meta.href = entityData.href;
      }
      if (typeof entityData.target !== 'undefined') {
        entityData.meta.target = entityData.target;
      }
      return _objectSpread({
        type: 'LINK',
        body: false,
        text: entityData.text || 'Click me!',
        position: entityData.position
      }, entityData);
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      entityData.position = entityData.position || {
        x: 0,
        y: 0
      };

      // Create the Link entity
      var link = this.game.createEntity(this.build(entityData));
    }
  }]);
  return Link;
}();
_defineProperty(Link, "id", 'link');

},{"./lib/inflateLink.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateLink;
// inflateLink.js
function inflateLink(entityElement, entityData) {
  // Create the link element
  var link = document.createElement('a');
  if (entityData.text) {
    link.innerHTML = entityData.text;
  }
  if (entityData.meta.target) {
    link.target = entityData.meta.target;
  }
  if (entityData.meta.href) {
    link.href = entityData.meta.href;
  }

  // Apply styles and append the link to the entityElement
  applyLinkStyles(link, entityData);
  entityElement.appendChild(link);

  // Set width, height, and color if provided
  if (entityData.width) {
    entityElement.style.width = "".concat(entityData.width, "px");
    link.style.width = '100%';
  }
  if (entityData.height) {
    entityElement.style.height = "".concat(entityData.height, "px");
    link.style.height = '100%';
  }
  if (entityData.color) {
    entityElement.style.color = convertColorToHex(entityData.color);
  }
  return entityElement;
}
var defaultLinkStyles = {
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  color: 'blue',
  // Default link color
  transition: 'color 0.4s ease'
};
function applyLinkStyles(link, entityData) {
  Object.assign(link.style, defaultLinkStyles, entityData.style);
}
function convertColorToHex(color) {
  return typeof color === 'number' ? "#".concat(color.toString(16)) : color;
}

},{}]},{},[1])(1)
});

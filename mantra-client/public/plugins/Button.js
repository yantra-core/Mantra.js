(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Button = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateButton = _interopRequireDefault(require("./lib/inflateButton.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Button.js - Marak Squires 2023
var Button = exports["default"] = /*#__PURE__*/function () {
  function Button() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Button);
    this.id = Button.id;
    this.disabled = false;
    if (typeof config.disabled === 'boolean') {
      this.disabled = config.disabled;
    }
  }
  _createClass(Button, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.inflate = _inflateButton["default"].bind(this);
      this.game.systemsManager.addSystem('button', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }
      entityData.meta = entityData.meta || {};
      if (typeof entityData.disabled !== 'undefined') {
        entityData.meta.disabled = entityData.disabled;
      }

      // provide default size for UI elements
      if (typeof entityData.size === 'undefined') {
        entityData.size = {
          width: 100,
          height: 50
        };
      }
      return _objectSpread({
        type: 'BUTTON',
        body: false,
        text: entityData.text || 'Hello, Mantra!',
        position: entityData.position
      }, entityData);
    }

    // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  }, {
    key: "createEntity",
    value: function createEntity() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Create the Button entity
      var text = game.createEntity(this.build(entityData));
    }
  }]);
  return Button;
}();
_defineProperty(Button, "id", 'button');

},{"./lib/inflateButton.js":2}],2:[function(require,module,exports){
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

  // Set width and color of the entityElement and button if provided
  if (entityData.width) {
    entityElement.style.width = "".concat(entityData.width, "px");
    button.style.width = '100%';
  }
  if (entityData.height) {
    entityElement.style.height = "".concat(entityData.height, "px");
    button.style.height = '100%';
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
  // padding: '15px 32px',
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

},{}]},{},[1])(1)
});

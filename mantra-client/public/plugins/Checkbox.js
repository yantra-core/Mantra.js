(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Checkbox = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateCheckbox = _interopRequireDefault(require("./lib/inflateCheckbox.js"));
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
var Checkbox = exports["default"] = /*#__PURE__*/function () {
  // type is optional for plugins

  function Checkbox() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Checkbox);
    this.id = Checkbox.id;
    this.type = Checkbox.type;
    this.options = config.options || [{
      label: 'Be amazing.',
      value: 'option1',
      checked: false
    }, {
      label: 'Be awesome.',
      value: 'option2',
      checked: false
    }]; // Default options if not provided
  }
  _createClass(Checkbox, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.inflate = _inflateCheckbox["default"].bind(this);
      this.game.systemsManager.addSystem('checkbox', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0,
          z: 0
        };
      }
      entityData.meta = entityData.meta || {};
      if (Array.isArray(entityData.options)) {
        entityData.meta.options = entityData.options;
      } else {
        entityData.meta.options = this.options;
      }
      entityData.style = entityData.style || {};
      if (typeof entityData.style.fontSize === 'undefined') {
        entityData.style.fontSize = '0.8em';
      }
      return _objectSpread({
        type: 'CHECKBOX',
        body: false,
        meta: entityData.meta,
        position: entityData.position
      }, entityData);
    }
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
      var checkboxEntity = this.game.createEntity(this.build(entityData));
    }
  }]);
  return Checkbox;
}();
_defineProperty(Checkbox, "id", 'checkbox');
_defineProperty(Checkbox, "type", 'ui-component');

},{"./lib/inflateCheckbox.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCheckbox;
// inflateCheckbox.js - Marak Squires 2024
function inflateCheckbox(entityElement, entityData) {
  if (Array.isArray(entityData.meta.options)) {
    entityData.meta.options.forEach(function (optionData) {
      var label = document.createElement('label');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = optionData.value;
      if (optionData.checked) {
        checkbox.checked = true;
      }
      if (entityData.meta.labelFirst === true) {
        label.append(optionData.label);
        label.appendChild(checkbox);
      } else {
        //label.appendChild(checkbox);
        //label.append(optionData.label);
        label.append(optionData.label);
        label.appendChild(checkbox);
      }

      // apply all styles entityData.styles to the label
      if (entityData.styles) {
        Object.keys(entityData.styles).forEach(function (styleKey) {
          label.style[styleKey] = entityData.styles[styleKey];
        });
      }

      // add change event for checkbox
      checkbox.addEventListener('change', function () {
        game.updateEntity(entityData.id, {
          value: checkbox.checked
        });
        //entityData.change(checkbox.checked);
      });
      // TODO: change / click events
      /*
      if (typeof entityData.pointerdown === 'function') {
        label.addEventListener('click', entityData.pointerdown);
      }
      */

      // Wrap the label (which contains the checkbox) with a control div
      var wrappedLabel = wrapControl(label, 'form-control-checkbox'); // 'form-control-checkbox' is an example class name
      entityElement.appendChild(wrappedLabel);
    });
  }
  return entityElement;
}

// Utility function to wrap an element with a form control div
// TODO: move this to a class function on a common utility class for UI components
function wrapControl(element, className) {
  var wrapperDiv = document.createElement('div');
  wrapperDiv.className = className; // Set the class name for styling
  wrapperDiv.appendChild(element); // Wrap the original element
  return wrapperDiv;
}

},{}]},{},[1])(1)
});

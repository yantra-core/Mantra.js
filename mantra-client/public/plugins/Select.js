(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Select = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateSelect = _interopRequireDefault(require("./lib/inflateSelect.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Select.js - Marak Squires 2024
var Select = exports["default"] = /*#__PURE__*/function () {
  // type is optional for plugins
  function Select() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Select);
    this.id = Select.id;
    this.type = Select.type;
    this.options = config.options || [
    // default select
    {
      label: 'Please select an option...',
      value: 'default',
      selected: true
    }, {
      label: 'Option 1: Be Awesome',
      value: 'option1'
    }, {
      label: 'Option 2: Be kind to each other',
      value: 'option2'
    }, {
      label: 'Option 3: GOTO 1',
      value: 'option3'
    }]; // default options
  }
  _createClass(Select, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.inflate = _inflateSelect["default"].bind(this);
      this.game.systemsManager.addSystem('select', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0,
          z: 11
        };
      }

      // Ensure entityData.options is an array of options
      if (!Array.isArray(entityData.options)) {
        entityData.options = this.options;
      }
      if (typeof entityData.options !== 'undefined') {
        entityData.meta = entityData.meta || {};
        entityData.meta.options = entityData.options;
      }

      // convert any string options to objects
      if (typeof entityData.meta.options !== 'undefined') {
        entityData.meta.options = entityData.meta.options.map(function (option) {
          if (typeof option === 'string') {
            return {
              label: option,
              value: option
            };
          }
          return option;
        });
      }
      if (typeof entityData.meta.options === 'undefined') {
        // create default options to help user experience
        entityData.meta.options = [{
          label: 'Option 1: Be Awesome',
          value: 'option1'
        }, {
          label: 'Option 2: Be kind to each other',
          value: 'option2'
        }, {
          label: 'Option 3: GOTO 1',
          value: 'option3'
        }];
      }

      // UI components overwrite default sizes
      // this means size should be set *after* Select() is called
      // easiest thing to do for now
      entityData.size = entityData.size || {
        width: 220,
        height: 30
      };
      return _objectSpread({
        type: 'SELECT',
        body: false,
        meta: entityData.meta,
        options: entityData.options,
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

      // Create the Select entity
      var selectEntity = this.game.createEntity(this.build(entityData));

      // Additional logic to handle the select entity can be added here
      // For example, attaching event listeners or integrating with the game's rendering system
    }
  }]);
  return Select;
}();
_defineProperty(Select, "id", 'select');
_defineProperty(Select, "type", 'ui-component');

},{"./lib/inflateSelect.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateSelect;
function inflateSelect(entityElement, entityData) {
  var game = this.game;
  var select = document.createElement('select');
  var defaultOptionStyles = {
    fontSize: '28px',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: 'none',
    // Ensure no border for the select element
    borderRadius: '8px',
    // Optional: Match container's border-radius if desired
    appearance: 'none',
    // Removes default browser styling
    transition: 'background-color 0.3s ease' // Smooth transition for background color
  };

  // remove background and border
  //entityElement.style.backgroundColor = 'transparent';
  //entityElement.style.border = 'none';
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
        // immediately update the entity value to the selected option
        // Remark: we may want to move this down until the select is appended to the entityElement
        //game.updateEntity(entityData.id, { value: option.value });
      }

      // Apply default styles
      Object.assign(option.style, defaultOptionStyles);
      select.appendChild(option);
    });
  }

  // Apply default and custom styles
  applySelectStyles(game, entityElement, select, entityData);

  // Append the select element to the entityElement
  entityElement.appendChild(select);
  return entityElement;
}
function applySelectStyles(game, entityElement, select, entityData) {
  var defaultSelectStyles = {
    paddingLeft: '10px',
    margin: '0',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#f2f2f2',
    color: 'black',
    border: 'none',
    // Ensure no border for the select element
    borderRadius: '8px',
    // Optional: Match container's border-radius if desired
    appearance: 'none',
    // Removes default browser styling
    transition: 'background-color 0.3s ease' // Smooth transition for background color
  };

  var defaultSelectEntityHolderStyle = {
    position: 'relative',
    width: entityData.width + 'px',
    height: entityData.height + 'px',
    padding: '0',
    // Adjust padding to be handled by the select element inside
    borderRadius: '8px',
    // Rounded corners for the container
    //backgroundColor: '#f2f2f2', // Match select background color
    //border: '1px solid #ccc', // Singular border on the container
    'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
    // Subtle shadow for depth
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease' // Smooth transition for shadow and border color
  };

  // Apply default styles
  Object.assign(select.style, defaultSelectStyles);
  Object.assign(entityElement.style, defaultSelectEntityHolderStyle);

  // Additional style adjustments for the focus state of the select element
  select.addEventListener('focus', function () {
    entityElement.style.borderColor = 'lightblue'; // Highlight border color on focus
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'; // Deeper shadow on focus
  });

  select.addEventListener('blur', function () {
    entityElement.style.borderColor = '#ccc'; // Revert border color on blur
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Revert shadow on blur
  });

  entityElement.addEventListener('mouseenter', function () {
    entityElement.style.borderColor = 'lightblue'; // Highlight border color on hover
    entityElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'; // Deeper and more pronounced shadow for a "pop" effect
    entityElement.style.transform = 'translateY(-2px)'; // Slightly raise the element for a 3D effect
    entityElement.style.transition = 'all 0.2s ease-out'; // Smooth transition for all properties
  });

  entityElement.addEventListener('mouseleave', function () {
    entityElement.style.borderColor = '#ccc'; // Revert border color on mouse leave
    entityElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Revert shadow on mouse leave
    entityElement.style.transform = 'translateY(0)'; // Reset the position of the element
    entityElement.style.transition = 'all 0.2s ease-in'; // Smooth transition for all properties
  });

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

},{}]},{},[1])(1)
});

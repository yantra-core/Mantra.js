(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Code = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inflateCode = _interopRequireDefault(require("./lib/inflateCode.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Code.js - Marak Squires 2024
// This plugin is designed to create and manage code block entities within the game environment.
var Code = exports["default"] = /*#__PURE__*/function () {
  function Code() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Code);
    this.id = Code.id;
    // Set default code styling here, if needed
    this.defaultStyle = config.defaultStyle || {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#D4D4D4',
      backgroundColor: '#1E1E1E',
      padding: '10px',
      borderRadius: '5px'
      // Add more default styling as needed
    };

    this.inflate = _inflateCode["default"].bind(this);
  }
  _createClass(Code, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('code', this);
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

      // Apply default styling to the code entity
      var style = _objectSpread(_objectSpread({}, this.defaultStyle), entityData.style);
      entityData.meta = entityData.meta || {};
      if (typeof entityData.code !== 'undefined') {
        entityData.meta.code = entityData.code;
      }
      if (typeof entityData.src !== 'undefined') {
        entityData.meta.src = entityData.src;
      }
      if (typeof entityData.language !== 'undefined') {
        entityData.meta.language = entityData.language;
      } else {
        entityData.meta.language = 'javascript'; // Default language for syntax highlighting
      }

      return _objectSpread({
        type: 'CODE',
        body: false,
        // Assuming 'body' is used similarly to 'textarea' for physical representation
        text: entityData.text || '',
        // Default code text if none provided
        position: entityData.position,
        style: style
      }, entityData);
    }
  }, {
    key: "create",
    value: function create() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }

      // Create the Code entity
      var codeEntity = this.game.createEntity(this.build(entityData));

      // Additional setup for the code entity can be added here
    }
  }]);
  return Code;
}();
_defineProperty(Code, "id", 'code');

},{"./lib/inflateCode.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inflateCode;
var storeOriginalInHiddenScriptTag = false;
var originalScriptCopyPrefix = 'mantra-code-src-';
var usePrism = true;
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
          var html = content;
          if (typeof Prism !== 'undefined' && usePrism) {
            html = Prism.highlight(content, Prism.languages.javascript, 'javascript');
          }
          el.innerHTML = html;
          if (game.systems.monaco && game.systems.monaco.editor) {
            game.systems.monaco.editor.setValue(content);
          }

          // update the meta.code property on the ECS
          // console.log('updating entity', entityData.id, { meta: { code: content } })
          console.log('ccccc', content);
          game.updateEntity(entityData.id, {
            meta: {
              code: content
            }
          });
        });

        //
        // Will save the original source code in a hidden script tag,
        // useful for debugging, could be used if others required such functionality
        if (storeOriginalInHiddenScriptTag) {
          var name = 'shared';
          var domId = originalScriptCopyPrefix + name;
          if (typeof entityData.name !== 'undefined') {
            domId = entityData.name;
          }

          // check if exists
          var script = document.getElementById(domId);

          // if not create
          if (!script) {
            script = document.createElement('script');
            script.id = domId;
            script.type = 'text/plain';
            document.body.appendChild(script);
          }
          script.textContent = content;
        }

        // Store the fetched content for future use, replacing the promise
        _this.fetchSourceHandles[src] = {
          content: content
        };
      })["catch"](function (error) {
        console.error('Error fetching source code:', error);
        // Update all code elements with the error message
        Array.from(document.querySelectorAll("code[data-src=\"".concat(src, "\"]"))).forEach(function (el) {
          el.textContent = '// Error fetching source code \n' + error;
        });
        // Store the error message for future use, replacing the promise
        _this.fetchSourceHandles[src] = {
          error: '// Error fetching source code'
        };
        throw error;
      });
    }

    // Mark the code element with a data attribute for future updates
    code.setAttribute('data-src', src);
  } else {
    // Set default code text if none provided and no src is specified
    code.textContent = entityData.meta && entityData.meta.code || '';
  }
  applyCodeStyles(entityElement, pre, code, entityData);

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
function applyCodeStyles(entityElement, pre, code, entityData) {
  // Define and apply default styles for code element here
  // For example, setting a monospace font and a background color
  pre.style.display = 'block';
  pre.style.overflow = 'auto';
  pre.style.paddingLeft = '5px';
  pre.style.paddingRight = '5px';
  pre.style.margin = '0px';
  pre.style.backgroundColor = '#1E1E1E'; // Dark background for the code block

  entityElement.style.padding = '0px'; // Remove padding from the entity element
  entityElement.style.margin = '0px'; // Remove padding from the entity element

  code.style.fontFamily = 'monospace';
  code.style.fontSize = '14px';
  code.style.color = '#D4D4D4'; // Light color for the text for better contrast

  // entityElement.style.border = "2px solid #999"; // Default border
  entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  entityElement.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  var hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  var hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  entityElement.addEventListener('mouseenter', function () {
    entityElement.style.border = hoverBorderStyle;
    entityElement.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  entityElement.addEventListener('mouseleave', function () {
    entityElement.style.border = "2px solid #999";
    entityElement.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });

  // Apply any custom styles from entityData if provided
  if (entityData.style) {
    Object.assign(pre.style, entityData.style.pre); // Apply styles to the <pre> element
    Object.assign(code.style, entityData.style.code); // Apply styles to the <code> element
  }
}

// TODO: similiar styles for applyCodeStyles
function applyIframeStyles(iframe, entityData) {
  // Define default styles for the iframe
  iframe.style.border = "2px solid #999"; // Default border
  iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)"; // Soft shadow for a subtle effect
  iframe.style.transition = "all 0.3s ease-in-out"; // Smooth transition for hover effect

  // Define hover effect styles
  var hoverBorderStyle = "2px solid #fff"; // Border color for hover state
  var hoverBoxShadowStyle = "0 0 15px 5px rgba(0, 150, 255, 0.7)"; // Glowing effect for hover state

  // Add event listeners to change styles on hover
  iframe.addEventListener('mouseenter', function () {
    iframe.style.border = hoverBorderStyle;
    iframe.style.boxShadow = hoverBoxShadowStyle;
  });

  // Revert to default styles when not hovering
  iframe.addEventListener('mouseleave', function () {
    iframe.style.border = "2px solid #999";
    iframe.style.boxShadow = "0 0 8px 0 rgba(0, 0, 0, 0.1)";
  });
}

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).DragAndDropFileUpload = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// DragAndDropFileUpload.js - Marak Squires 2024
var DragAndDropFileUpload = /*#__PURE__*/function () {
  function DragAndDropFileUpload(game) {
    _classCallCheck(this, DragAndDropFileUpload);
    this.game = game;
    this.id = DragAndDropFileUpload.id;
    this.dropArea = null;
    this.defaultDataButton = null;
    this.overlay = null;
  }
  _createClass(DragAndDropFileUpload, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.createOverlay();
      this.createDropArea();
      this.createDefaultDataButton();
      this.createOptionsSection();
      this.bindEvents();
      game.on('tilemap::created', function () {
        // hide overlay ( for now )
        _this.overlay.style.visibility = 'hidden';
      });

      // check to see if tileMap is already loaded, if so, hide overlay
      if (game.systems.tile && game.systems.tile.tileMap) {
        this.overlay.style.visibility = 'hidden';
      }
    }
  }, {
    key: "createOverlay",
    value: function createOverlay() {
      // Create overlay
      this.overlay = document.createElement('div');
      this.overlay.id = 'drag-and-drop-file-upload-overlay';
      this.setStyle(this.overlay, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        visibility: 'block',
        padding: '20px'
      });
      var gameHolder = document.getElementById('gameHolder');
      gameHolder.appendChild(this.overlay);
    }
  }, {
    key: "createDropArea",
    value: function createDropArea() {
      // Create drop area container
      var dropAreaContainer = document.createElement('div');
      this.setStyle(dropAreaContainer, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      });

      // Create drop area
      this.dropArea = document.createElement('div');
      this.setStyle(this.dropArea, {
        width: '300px',
        height: '200px',
        border: '2px dashed #fff',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        fontSize: '27px',
        cursor: 'pointer'
      });
      this.dropArea.innerText = 'Drop Tiled .tmj file here';
      dropAreaContainer.appendChild(this.dropArea);
      this.overlay.appendChild(dropAreaContainer);
    }
  }, {
    key: "createDefaultDataButton",
    value: function createDefaultDataButton() {
      var _this2 = this;
      // Create Load Default Data button
      this.defaultDataButton = document.createElement('button');
      this.setStyle(this.defaultDataButton, {
        width: '300px',
        height: '200px',
        border: '2px solid #fff',
        borderRadius: '5px',
        backgroundColor: '#444',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer'
      });
      this.defaultDataButton.innerText = 'Load Default Tiled Data';
      this.defaultDataButton.onclick = function () {
        return _this2.loadDefaultData();
      };

      // Append to the drop area container
      var dropAreaContainer = this.overlay.children[0]; // Assuming it's the first child
      dropAreaContainer.appendChild(this.defaultDataButton);
    }
  }, {
    key: "setStyle",
    value: function setStyle(element, styles) {
      for (var property in styles) {
        element.style[property] = styles[property];
      }
    }
  }, {
    key: "createOptionsSection",
    value: function createOptionsSection() {
      // Create options section container
      this.optionsSection = document.createElement('div');
      this.setStyle(this.optionsSection, {
        marginTop: '20px',
        padding: '10px',
        border: '2px solid #fff',
        borderRadius: '5px',
        backgroundColor: '#222',
        color: '#fff'
      });

      // Create tiledServer checkbox
      this.tiledServerCheckbox = this.createCheckboxOption('tiledServer', 'Use Serverless Tiled Chunks');

      // Create proceduralGenerateMissingChunks checkbox
      this.proceduralGenerateCheckbox = this.createCheckboxOption('proceduralGenerateMissingChunks', 'Procedural Generate Missing Chunks');
      this.optionsSection.appendChild(this.tiledServerCheckbox.container);
      this.optionsSection.appendChild(this.proceduralGenerateCheckbox.container);
      this.overlay.appendChild(this.optionsSection);
    }
  }, {
    key: "createCheckboxOption",
    value: function createCheckboxOption(id, label) {
      var container = document.createElement('div');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = id;
      checkbox.name = id;
      checkbox.value = id;
      // set size to bigger
      checkbox.style.width = '24px';
      checkbox.style.height = '24px';

      // set to checked by default
      checkbox.checked = true;
      var labelElement = document.createElement('label');
      labelElement.htmlFor = id;
      labelElement.innerText = label;
      labelElement.style.marginLeft = '8px';
      container.appendChild(checkbox);
      container.appendChild(labelElement);
      return {
        container: container,
        checkbox: checkbox
      };
    }
  }, {
    key: "getCheckboxValues",
    value: function getCheckboxValues() {
      return {
        tiledServer: this.tiledServerCheckbox.checkbox.checked,
        proceduralGenerateMissingChunks: this.proceduralGenerateCheckbox.checkbox.checked
      };
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this3 = this;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        _this3.overlay.addEventListener(eventName, function (e) {
          return _this3.preventDefaults(e);
        }, false);
      });
      ['dragenter', 'dragover'].forEach(function (eventName) {
        _this3.dropArea.addEventListener(eventName, function () {
          return _this3.highlight();
        }, false);
      });
      ['dragleave', 'drop'].forEach(function (eventName) {
        _this3.dropArea.addEventListener(eventName, function () {
          return _this3.unhighlight();
        }, false);
      });
      this.dropArea.addEventListener('drop', function (e) {
        return _this3.handleDrop(e);
      }, false);
    }
  }, {
    key: "preventDefaults",
    value: function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: "highlight",
    value: function highlight() {
      this.dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    }
  }, {
    key: "unhighlight",
    value: function unhighlight() {
      this.dropArea.style.backgroundColor = '';
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;
      this.handleFiles(files);
    }
  }, {
    key: "handleFiles",
    value: function handleFiles(files) {
      var _this4 = this;
      var game = this.game;
      var tilePluginOptions = this.getCheckboxValues();
      if (game.systems.tile) {
        game.systems.tile.setOptions(tilePluginOptions);
      }
      _toConsumableArray(files).forEach(function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var text = e.target.result;
          var jsonData;
          try {
            jsonData = JSON.parse(text);
            console.log('Parsed JSON:', jsonData);
            if (jsonData) {
              game.emit('file::upload', jsonData);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          // hide overlay
          _this4.overlay.style.visibility = 'hidden';
        };
        reader.onerror = function (error) {
          console.error('Error reading file:', error);
        };
        reader.readAsText(file);
      });
    }
  }, {
    key: "loadDefaultData",
    value: function loadDefaultData() {
      // Custom function to load default map data
      // Placeholder for now, can be filled out later
      console.log('Loading default map data...');
      if (this.game.systems.tile) {
        var tilePluginOptions = this.getCheckboxValues();
        this.game.systems.tile.setOptions(tilePluginOptions);
        this.game.systems.tile.createTileMapFromTiledJSON(this.game.systems.tile.tileMap); // for now
        this.overlay.style.visibility = 'hidden';
      }
    }
  }, {
    key: "update",
    value: function update() {
      // Update logic if necessary
    }
  }, {
    key: "render",
    value: function render() {
      // Render logic if necessary
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Cleanup
      this.overlay.remove();
    }
  }]);
  return DragAndDropFileUpload;
}();
_defineProperty(DragAndDropFileUpload, "id", 'drag-and-drop-file-upload');
var _default = exports["default"] = DragAndDropFileUpload;

},{}]},{},[1])(1)
});

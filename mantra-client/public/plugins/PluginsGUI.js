(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PluginsGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// gui.js - Marak Squires 2023
var gui = {
  window: function window(id) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Window';
    var close = arguments.length > 2 ? arguments[2] : undefined;
    if (typeof close === 'undefined') {
      close = function close() {
        console.log("WARNING: No close function provided for window with id: " + id + ", defaulting to remove()");
        document.getElementById(id).remove();
      };
    }
    // Create container
    var container = document.createElement('div');
    container.id = id;
    container.className = 'gui-container';

    // Create the content of the container
    var content = document.createElement('div');
    content.className = 'gui-content';

    // Create a draggable header
    var guiHeader = document.createElement('div');
    guiHeader.className = 'gui-header';

    // Add traffic light buttons
    var closeButton = document.createElement('div');
    var minimizeButton = document.createElement('div');
    var maximizeButton = document.createElement('div');
    closeButton.className = 'traffic-light close';
    minimizeButton.className = 'traffic-light minimize';
    maximizeButton.className = 'traffic-light maximize';
    minimizeButton.onclick = function () {
      return close();
    };
    closeButton.onclick = function () {
      return close();
    };
    maximizeButton.onclick = function () {
      if (container.style.width === '100vw') {
        container.style.width = '50%';
        container.style.height = '50%';
        // set position to center

        if (typeof container.lastTop !== 'undefined') {
          container.style.top = container.lastTop;
          container.style.left = container.lastLeft;
        } else {
          container.style.top = '20%';
          container.style.left = '20%';
        }
      } else {
        // store the exact last position on container itself
        // use special property
        container.lastTop = container.style.top;
        container.lastLeft = container.style.left;
        container.style.width = '100vw';
        container.style.height = '90%';
        // set position to top left
        container.style.top = '50px';
        container.style.left = '0px';
      }
    };
    guiHeader.appendChild(closeButton);
    guiHeader.appendChild(minimizeButton);
    guiHeader.appendChild(maximizeButton);

    // create h3 for title
    var guiHeaderTitle = document.createElement('h3');
    guiHeaderTitle.textContent = title;
    guiHeader.appendChild(guiHeaderTitle);
    container.appendChild(guiHeader);
    container.appendChild(content);

    // Add resize handle
    var resizeHandle = document.createElement('div');
    resizeHandle.className = 'resizeHandle';
    container.appendChild(resizeHandle);

    // Append the container to the document body
    document.body.appendChild(container);

    // Initialize dragging and resizing
    this.initializeDrag(guiHeader, container);
    this.initializeResize(resizeHandle, container);

    // Add event listener for click to manage z-index
    container.addEventListener('click', function () {
      // Bring the clicked container to the front
      gui.bringToFront(container);
    });
    return container;
  },
  initializeResize: function initializeResize(resizeHandle, container) {
    var _this = this;
    resizeHandle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      gui.bringToFront(container);
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    var resize = function resize(e) {
      // Set new width and height of the container
      _this.container.style.width = e.clientX - _this.container.offsetLeft + 'px';
      _this.container.style.height = e.clientY - _this.container.offsetTop + 'px';
    };
    var stopResize = function stopResize() {
      window.removeEventListener('mousemove', resize);
    };
  },
  initializeDrag: function initializeDrag(dragElement, container) {
    var offsetX = 0,
      offsetY = 0,
      mouseX = 0,
      mouseY = 0;
    dragElement.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      gui.bringToFront(container);
      // Get the mouse cursor position at startup
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Set the element's new position
      dragElement.parentElement.style.top = dragElement.parentElement.offsetTop - offsetY + "px";
      dragElement.parentElement.style.left = dragElement.parentElement.offsetLeft - offsetX + "px";
    }
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
  bringToFront: function bringToFront(clickedContainer) {
    // Get all gui-containers
    var containers = document.querySelectorAll('.gui-container');

    // Set z-index of all containers to 1
    containers.forEach(function (container) {
      container.style.zIndex = '1';
    });

    // Set z-index of the clicked container to 10
    clickedContainer.style.zIndex = '10';
  }
};
var _default = exports["default"] = gui;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gui = _interopRequireDefault(require("../gui-editor/gui.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PluginsGUI = /*#__PURE__*/function () {
  function PluginsGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PluginsGUI);
    this.id = PluginsGUI.id;
  }
  _createClass(PluginsGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createPluginView();
      this.drawPluginTable();
      this.subscribeToPluginUpdates();
      this.game.addSystem(this.id, this);
    }
  }, {
    key: "createPluginView",
    value: function createPluginView() {
      // Create the window using gui.window
      this.container = _gui["default"].window('pluginsContainer', 'Plugins', function () {
        game.systemsManager.removeSystem(PluginsGUI.id);
      });

      // Create the table for plugins
      this.pluginTable = document.createElement('table');
      this.pluginTable.id = "pluginTable";
      this.pluginTable.className = "pluginTable";
      var headerRow = this.pluginTable.createTHead().insertRow();
      var headerName = document.createElement('th');
      var headerStatus = document.createElement('th');
      headerName.textContent = 'Plugin Name';
      headerStatus.textContent = 'Status';
      headerRow.appendChild(headerName);
      headerRow.appendChild(headerStatus);

      // Append the table to the container's gui-content
      var guiContent = this.container.querySelector('.gui-content');
      guiContent.appendChild(this.pluginTable);
      console.log('appending', guiContent, 'to', this.container, 'with', this.pluginTable, 'inside');
      this.container.appendChild(guiContent);
    }
  }, {
    key: "drawPluginTable",
    value: function drawPluginTable() {
      var _this = this;
      var plugins = this.game.plugins;
      var loadedPlugins = new Set(this.game.loadedPlugins.map(function (name) {
        return name.toLowerCase();
      }));

      // Remove all previous rows except the header
      while (this.pluginTable.rows.length > 1) {
        this.pluginTable.deleteRow(1);
      }
      Object.entries(plugins).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          pluginName = _ref2[0],
          plugin = _ref2[1];
        var row = _this.pluginTable.insertRow();
        var cellName = row.insertCell();
        var cellStatus = row.insertCell();
        var pluginId = plugins[pluginName].id;
        cellName.textContent = pluginName;
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        console.log("CHECKING IF LOADED", pluginId, loadedPlugins.has(pluginId));
        console.log('lll', loadedPlugins);

        // check if plugin is in system, not if it been loaded once
        var checkSystem = _this.game.systems[pluginId];
        checkbox.checked = loadedPlugins.has(pluginId);
        checkbox.disabled = plugin.removable === false;
        checkbox.addEventListener('change', function () {
          _this.togglePlugin(checkbox, pluginName, pluginId);
        });
        cellStatus.appendChild(checkbox);
      });
    }
  }, {
    key: "togglePlugin",
    value: function togglePlugin(checkbox, pluginName, pluginId) {
      console.log('togglePlugin', checkbox, pluginName, pluginId);
      if (checkbox.checked) {
        // check to see if the plugin is already loaded
        // if so, just call reload
        if (this.game._plugins[pluginId]) {
          this.game._plugins[pluginId].reload();
        } else {
          var pluginInstance = new this.game.plugins[pluginName]();
          this.game.use(pluginInstance);
        }
      } else {
        // this.game.removeSystem(this.game.plugins[pluginName].id);
        this.game.removePlugin(pluginId);
      }
    }
  }, {
    key: "subscribeToPluginUpdates",
    value: function subscribeToPluginUpdates() {
      var _this2 = this;
      // Update the plugin table when plugins are loaded or unloaded
      this.game.on('plugin::loaded', function (pluginName) {
        _this2.drawPluginTable();
      });
      this.game.on('plugin::unloaded', function (pluginName) {
        _this2.drawPluginTable();
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      // Remove the window from the DOM
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }]);
  return PluginsGUI;
}();
_defineProperty(PluginsGUI, "id", 'gui-plugins');
var _default = exports["default"] = PluginsGUI;

},{"../gui-editor/gui.js":1}]},{},[2])(2)
});

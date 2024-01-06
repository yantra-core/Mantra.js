(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).PluginsGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// gui.js - Marak Squires 2023
var gui = {
  elementList: ['gui-container', 'gui-content', 'gui-header', 'gui-header-title', 'traffic-light', 'close', 'minimize', 'maximize', 'resizeHandle', 'gui-window-footer'],
  window: function window(id) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Window';
    var close = arguments.length > 2 ? arguments[2] : undefined;
    var pluginInstance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var self = this;
    if (typeof close === 'undefined') {
      close = function close() {
        console.log("WARNING: No close function provided for window with id: " + id + ", defaulting to remove()");
        document.getElementById(id).remove();
      };
    }
    var guiClasses = {
      'container': 'gui-container',
      'content': 'gui-content',
      'header': 'gui-header',
      'header-title': 'gui-header-title'
    };
    if (is_touch_enabled()) {
      /*
      guiClasses = {
        'container': 'gui-container-touch',
        'content': 'gui-content-touch',
        'header': 'gui-header-touch',
        'header-title': 'gui-header-title-touch'
      }
      */
    }

    // Create container
    var container = document.createElement('div');
    container.id = id;
    container.className = guiClasses['container'];

    // Create the content of the container
    var content = document.createElement('div');
    content.className = guiClasses['content'];

    // Create a draggable header
    var guiHeader = document.createElement('div');
    guiHeader.className = guiClasses['header'];

    // Traffic light container
    var trafficLightContainer = document.createElement('div');
    trafficLightContainer.className = 'traffic-light-container';

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
      self.maxWindow(container);
    };
    trafficLightContainer.appendChild(closeButton);
    trafficLightContainer.appendChild(minimizeButton);
    trafficLightContainer.appendChild(maximizeButton);
    guiHeader.appendChild(trafficLightContainer);

    // create h3 for title
    var guiHeaderTitle = document.createElement('h3');
    guiHeaderTitle.textContent = title;

    // add "double click" event to h3 to maximize window
    guiHeaderTitle.ondblclick = function () {
      self.maxWindow(container);
    };
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
  maxWindow: function maxWindow(container) {
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
      container.style.zIndex = '1000';
    });

    // Set z-index of the clicked container to 10
    clickedContainer.style.zIndex = '1010';
  }
};
gui.init = function (game) {
  if (typeof document === 'undefined') {
    console.log('gui-plugin: document not found, skipping initialization');
    return;
  }
  // add a global click handler to document that will delegate any clicks
  // that are not inside gui-windows to re-enable inputs
  document.addEventListener('click', function (e) {
    // check if the click was inside a gui-window
    var guiWindow = e.target.closest('.gui-container');
    if (game && game.systems && game.systems['entity-input'] && game.systems['keyboard']) {
      if (!guiWindow) {
        // re-enable inputs
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      } else {
        // disable inputs
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      }
    }
  });

  // bind the ESC key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      // get all gui-containers
      var containers = document.querySelectorAll('.gui-container');

      // TODO: unload the plugin instead of removing the container
      // remove the last one
      var lastContainer = containers[containers.length - 1];
      if (lastContainer) {
        lastContainer.remove();
      }
    }
  });
};
var _default = exports["default"] = gui;
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

/*
 setTheme: function (name) {
   if (name === 'light') {
     this.theme(lightTheme);
   } else if (name === 'dark') {
     this.theme(darkTheme);
   } else {
     console.log(`Theme ${name} not found, defaulting to light theme`);
     this.theme(lightTheme);
   }
 },
 theme: function (theme) {
   // theme is an object gui-elements and cssObjects
   // for each gui element type in the theme
   // find *all* nodes that match the type
   // iterate over each node and apply the cssObject
   console.log('setting theme', theme)
   for (let type in theme) {
     let cssObject = theme[type];
     let nodes = document.querySelectorAll(`.${type}`);
     console.log('ffff', nodes)
     nodes.forEach(node => {
       this.skin(node, cssObject);
     });
   }
 },
 skin: function(guiElement, cssObject) {
   // guiElement is a DOM element
   // cssObject is an object with css properties
   for (let property in cssObject) {
     // update the live node style
     guiElement.style[property] = cssObject[property];
     // update the style sheet for all future nodes
     // this will override any inline styles
     let styleSheet = document.styleSheets[0];
     let selector = `.${guiElement.className}`;
     let rule = `${property}: ${cssObject[property]}`;
     let index = styleSheet.cssRules.length;
     styleSheet.insertRule(`${selector} { ${rule} }`, index);
    }
 },
 */

// TODO:
// Allow option to set window as background
// Allow option for simple 4x4 grid for windows
// Default mode is to place 2x2 vertical on left side first,
// then 2x2 vertical on right side
// Then for 3, its top left, bottom left, top right, with bottom right empty
// For 4 each is 1x1, the entire window is filled at 4x4
// Repeat same logic in units of 4 for 8, 12, 16, etc
// Max windows is 64

// TODO: all windows should have footers with a toolbar ( empty for now )
// TODO: windows should have option to run "skinless" with no header or footer, no traffic lights

//import lightTheme from "./themes/light.js";
//import darkTheme from "./themes/dark.js";

/*

    // create a utility gear icon in header that will call game.systems['gui-plugin-explorer'].drawPluginForm(pluginName)
    if (true && pluginInstance) {
      const gearIcon = document.createElement('i');
      gearIcon.className = 'fas fa-cog';
      gearIcon.style.float = 'right';
      gearIcon.style.cursor = 'pointer';
      gearIcon.style.top = '20px';
      gearIcon.style.right = '20px';
      gearIcon.style.fontSize = '50px';
      gearIcon.innerHTML = "FFF";
      gearIcon.onclick = () => {
        console.log(pluginInstance)
        game.systems['gui-plugin-explorer'].drawPluginForm(pluginInstance, game._plugins[pluginInstance.id]);
      };
      guiHeader.appendChild(gearIcon);
    }

    */

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gui = _interopRequireDefault(require("../gui-editor/gui.js"));
var _pluginsList = _interopRequireDefault(require("./pluginsList.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      var game = this.game;
      // Create the window using gui.window
      this.container = _gui["default"].window('pluginsContainer', 'Plugins', function () {
        game.systemsManager.removeSystem(PluginsGUI.id);
      });

      // Create the table for plugins
      this.pluginTable = document.createElement('table');
      this.pluginTable.id = "pluginTable";
      this.pluginTable.className = "pluginTable";
      console.log("CREATINT TABLE", this.pluginTable);
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
      var game = this.game;
      // Ensure that pluginsList is an array
      var systemPlugins = Array.isArray(_pluginsList["default"]) ? _pluginsList["default"] : Object.keys(_pluginsList["default"]);

      // Map to store the plugin name and its loaded status
      var pluginStatusMap = new Map();
      // Iterate over game._plugins to get the plugin names and their loaded status
      for (var p in game._plugins) {
        var pluginName = game._plugins[p].constructor.name;
        // TODO: remove this conditional, legacy data still in game._plugins
        if (pluginName !== 'Object') {
          pluginStatusMap.set(pluginName, true); // true indicates the plugin is loaded
        }
      }

      // Add system plugins to the map if not already present
      systemPlugins.forEach(function (pluginId) {
        if (!pluginStatusMap.has(pluginId)) {
          pluginStatusMap.set(pluginId, false); // false indicates the plugin is not loaded
        }
      });

      // Separate plugins into checked and unchecked
      var checkedPlugins = [];
      var uncheckedPlugins = [];
      var pluginList = document.createElement('ul');
      pluginList.className = "pluginList";
      pluginStatusMap.forEach(function (isChecked, pluginName) {
        var listItem = document.createElement('li');
        listItem.className = "pluginItem";
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.id = "checkbox-".concat(pluginName.replace(/\s+/g, '-'));
        checkbox.className = "pluginCheckbox";
        checkbox.addEventListener('change', function () {
          _this.togglePlugin(checkbox, pluginName);
        });
        var label = document.createElement('label');
        label.setAttribute('for', checkbox.id);
        label.textContent = pluginName;
        label.className = "pluginLabel";
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        pluginList.appendChild(listItem);
      });

      // Replace the existing table with the newly created list
      this.pluginTable.replaceWith(pluginList);
      this.pluginTable = pluginList; // Update the reference to the new list

      // Append checked plugins first, then unchecked
      checkedPlugins.forEach(function (row) {
        return _this.pluginTable.appendChild(row);
      });
      uncheckedPlugins.forEach(function (row) {
        return _this.pluginTable.appendChild(row);
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
          // let pluginInstance = new this.game.plugins[pluginName]();
          this.game.use(pluginName);
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
      this.game.on('plugin::ready', function (pluginName) {
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

},{"../gui-editor/gui.js":1,"./pluginsList.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var pluginsList = {
  "AsteroidsMovement": {
    "path": "./plugins/entity-movement/strategies/AsteroidsMovement.js",
    "size": 4.952
  },
  "Behaviors": {
    "path": "./plugins/behaviors/Behaviors.js",
    "size": 5.512
  },
  "BabylonCamera": {
    "path": "./plugins/graphics-babylon/camera/BabylonCamera.js",
    "size": 9.131
  },
  "BabylonGraphics": {
    "path": "./plugins/graphics-babylon/BabylonGraphics.js",
    "size": 59.249
  },
  "Block": {
    "path": "./plugins/block/Block.js",
    "size": 6.845
  },
  "Border": {
    "path": "./plugins/border/Border.js",
    "size": 9.126
  },
  "Bullet": {
    "path": "./plugins/bullet/Bullet.js",
    "size": 13.116
  },
  "CSSGraphics": {
    "path": "./plugins/graphics-css/CSSGraphics.js",
    "size": 49.193
  },
  "Client": {
    "path": "./plugins/client/Client.js",
    "size": 122.132
  },
  "ChronoControl": {
    "path": "./plugins/chrono-control/ChronoControl.js",
    "size": 9.901
  },
  "Collisions": {
    "path": "./plugins/collisions/Collisions.js",
    "size": 9.748
  },
  "Creator": {
    "path": "./plugins/gui-creator/Creator.js",
    "size": 6.391
  },
  "Entity": {
    "path": "./plugins/entity/Entity.js",
    "size": 42.819
  },
  "EntityInput": {
    "path": "./plugins/entity-input/EntityInput.js",
    "size": 28.495
  },
  "EntityMovement": {
    "path": "./plugins/entity-movement/EntityMovement.js",
    "size": 21.153
  },
  "Gamepad": {
    "path": "./plugins/gamepad/Gamepad.js",
    "size": 5.789
  },
  "Graphics": {
    "path": "./plugins/graphics/Graphics.js",
    "size": 8.248
  },
  "Health": {
    "path": "./plugins/health/Health.js",
    "size": 3.9
  },
  "Timers": {
    "path": "./plugins/timers/Timers.js",
    "size": 21.13
  },
  "ControlsGUI": {
    "path": "./plugins/gui-controls/ControlsGUI.js",
    "size": 17.963
  },
  "LoadingScreen": {
    "path": "./plugins/loading-screen/LoadingScreen.js",
    "size": 13.779
  },
  "EntitiesGUI": {
    "path": "./plugins/gui-entities/EntitiesGUI.js",
    "size": 22.755
  },
  "PingTime": {
    "path": "./plugins/ping-time/PingTime.js",
    "size": 5.687
  },
  "PluginsGUI": {
    "path": "./plugins/gui-plugins/PluginsGUI.js",
    "size": 24.458
  },
  "YantraGUI": {
    "path": "./plugins/gui-yantra/YantraGUI.js",
    "size": 12.952
  },
  "SutraGUI": {
    "path": "./plugins/gui-sutra/SutraGUI.js",
    "size": 86.905
  },
  "Editor": {
    "path": "./plugins/gui-editor/Editor.js",
    "size": 47.876
  },
  "SnapshotSize": {
    "path": "./plugins/snapshot-size/SnapshotSize.js",
    "size": 9.829
  },
  "Schema": {
    "path": "./plugins/schema/Schema.js",
    "size": 287.685
  },
  "CurrentFPS": {
    "path": "./plugins/current-fps/CurrentFPS.js",
    "size": 5.728
  },
  "Keyboard": {
    "path": "./plugins/keyboard/Keyboard.js",
    "size": 9.453
  },
  "Lifetime": {
    "path": "./plugins/lifetime/Lifetime.js",
    "size": 3.929
  },
  "LocalClient": {
    "path": "./plugins/client/LocalClient.js",
    "size": 4.988
  },
  "MatterPhysics": {
    "path": "./plugins/physics-matter/MatterPhysics.js",
    "size": 395.2
  },
  "Mouse": {
    "path": "./plugins/mouse/Mouse.js",
    "size": 8.75
  },
  "PhaserGraphics": {
    "path": "./plugins/graphics-phaser/PhaserGraphics.js",
    "size": 41.466
  },
  "ThreeGraphics": {
    "path": "./plugins/graphics-three/ThreeGraphics.js",
    "size": 19.209
  },
  "PongMovement": {
    "path": "./plugins/entity-movement/strategies/PongMovement.js",
    "size": 5.054
  },
  "PongWorld": {
    "path": "./plugins/world/pong/PongWorld.js",
    "size": 11.68
  },
  "StarField": {
    "path": "./plugins/starfield/StarField.js",
    "size": 10.172
  },
  "BabylonStarField": {
    "path": "./plugins/starfield/BabylonStarField.js",
    "size": 5.879
  },
  "FroggerMovement": {
    "path": "./plugins/entity-movement/strategies/FroggerMovement.js",
    "size": 4.579
  },
  "PacManMovement": {
    "path": "./plugins/entity-movement/strategies/PacManMovement.js",
    "size": 4.573
  },
  "XState": {
    "path": "./plugins/xstate/XState.js",
    "size": 192.303
  }
};
var _default = exports["default"] = pluginsList;

},{}]},{},[2])(2)
});

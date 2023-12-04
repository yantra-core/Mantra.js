(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).EntitiesGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//import lightTheme from "./themes/light.js";
//import darkTheme from "./themes/dark.js";
// gui.js - Marak Squires 2023
var gui = {
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

    // create a utility gear icon in header that will call game.systems['gui-plugin-explorer'].drawPluginForm(pluginName)
    if (false && pluginInstance) {
      var gearIcon = document.createElement('i');
      gearIcon.className = 'fas fa-cog';
      gearIcon.style["float"] = 'right';
      gearIcon.style.cursor = 'pointer';
      gearIcon.style.top = '20px';
      gearIcon.style.right = '20px';
      gearIcon.style.fontSize = '50px';
      gearIcon.innerHTML = "FFF";
      gearIcon.onclick = function () {
        console.log(pluginInstance);
        game.systems['gui-plugin-explorer'].drawPluginForm(pluginInstance, game._plugins[pluginInstance.id]);
      };
      guiHeader.appendChild(gearIcon);
    }

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // gui-entities.js
var EntitiesGUI = /*#__PURE__*/function () {
  function EntitiesGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, EntitiesGUI);
    this.id = EntitiesGUI.id;
    this.eventCounts = {}; // Object to keep track of event counts
    this.renderAtTick = 60; // each 60 ticks, update the table
    this.sortBy = {
      column: 1,
      isAscending: false
    }; // Add sortBy state

    this.dynamicColumns = config.dynamicColumns || false; // Configurable flag for dynamic columns
    this.defaultProperties = ['id', 'type', 'name']; // Default properties to display
    this.knownProperties = new Set(this.defaultProperties);
    this.previousEntityStates = {}; // ...rest of the properties
  }
  _createClass(EntitiesGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.knownProperties = new Set(['id', 'type', 'name']); // Initialize with basic properties
      this.createGlobalEventTable();
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "update",
    value: function update() {
      // console.log('EntitiesGUI update', this.game.tick);

      for (var entityId in this.game.components.creationTime.data) {
        var entity = this.game.getEntity(entityId);
        // console.log('ent', entity);

        /*
        // Check if entity state has changed since last update
        if (this.hasEntityChanged(entityId, entity)) {
          this.updateRowForEntity(entityId, entity);
          this.previousEntityStates[entityId] = { ...entity }; // Update the stored state
        }
        */

        if (entity.destroyed) {
          // Remove the row from the table
          var _row = this.entitiesTable.querySelector("tr[data-id='".concat(entityId, "']"));
          if (_row) {
            _row.parentNode.removeChild(_row);
          }
          continue;
        }

        // check to see if row exists by id
        var row = this.entitiesTable.querySelector("tr[data-id='".concat(entityId, "']"));
        if (!row) {
          // create row
          this.updateRowForEntity(entityId, entity);
        }
      }
    }
  }, {
    key: "hasEntityChanged",
    value: function hasEntityChanged(entityId, entity) {
      var previousState = this.previousEntityStates[entityId];
      if (!previousState) return true; // If no previous state, consider changed

      // Compare current entity state with previous state
      return JSON.stringify(entity) !== JSON.stringify(previousState);
    }
  }, {
    key: "createGlobalEventTable",
    value: function createGlobalEventTable() {
      var game = this.game;
      this.container = _gui["default"].window('entitiesView', 'Entities', function () {
        game.systemsManager.removeSystem(EntitiesGUI.id);
      });
      this.entitiesTable = document.createElement('table');
      this.entitiesTable.id = "entitiesTable";
      this.entitiesTable.className = 'entities-table'; // Add class for styling

      // add click event to table
      this.entitiesTable.addEventListener('click', function (e) {
        // find the data-id attribute to get the entityId
        var entityId = e.target.parentNode.getAttribute('data-id');
        // set the global game selectedEntityId context so other guid components can use it
        game.selectedEntityId = entityId;
        // check if gui-inspector is loaded, if not, load it
        if (!game.systems['gui-inspector']) {
          game.use(new game.plugins.Inspector());
        }
      });

      // Create Header
      this.headerRow = this.entitiesTable.createTHead().insertRow();
      this.updateTableHeaders(Array.from(this.knownProperties));
      var guiContent = this.container.querySelector('.gui-content');
      guiContent.appendChild(this.entitiesTable);
    }
  }, {
    key: "updateTableHeaders",
    value: function updateTableHeaders(properties) {
      var _this = this;
      this.headerRow.innerHTML = ''; // Clear existing headers
      properties.forEach(function (prop) {
        var header = document.createElement('th');
        header.textContent = prop;
        _this.headerRow.appendChild(header);
      });
    }
  }, {
    key: "updateRowForEntity",
    value: function updateRowForEntity(entityId, entity) {
      var _this2 = this;
      if (this.dynamicColumns) {
        // Update known properties if dynamic columns are enabled
        Object.keys(entity).forEach(function (prop) {
          return _this2.knownProperties.add(prop);
        });
      }

      // Update headers if new properties are detected and dynamic columns are enabled
      if (this.dynamicColumns && this.headerRow.cells.length < this.knownProperties.size) {
        this.updateTableHeaders(Array.from(this.knownProperties));
      }
      var row = this.entitiesTable.querySelector("tr[data-id='".concat(entityId, "']"));
      if (!row) {
        row = this.entitiesTable.insertRow();
        row.setAttribute('data-id', entityId);
      }

      // Clear existing cells
      row.innerHTML = '';

      // Determine which properties to display
      var propertiesToShow = this.dynamicColumns ? Array.from(this.knownProperties) : this.defaultProperties;

      // Add new cells based on current entity properties
      propertiesToShow.forEach(function (prop) {
        var cell = row.insertCell();
        var value = entity[prop];
        // ... handle special cases like 'graphics' as before
        cell.textContent = value || ''; // Handle undefined properties
      });
    }
  }, {
    key: "setSortBy",
    value: function setSortBy(columnIndex) {
      // console.log('setSortBy', columnIndex, this.sortBy.column, this.sortBy.isAscending);
      if (this.sortBy.column === columnIndex) {
        this.sortBy.isAscending = !this.sortBy.isAscending; // Toggle sort order
      } else {
        this.sortBy = {
          column: columnIndex,
          isAscending: true
        };
      }
      this.updateGlobalEventTable();
    }
  }, {
    key: "openEntityInEditor",
    value: function openEntityInEditor(entity) {
      // Remark: we have a separate plugin for the editor
      console.log('openEntityInEditor', entity);
    }
  }, {
    key: "toggleView",
    value: function toggleView() {
      if (this.container.style.display === 'none') {
        this.container.style.display = 'block';
      } else {
        this.container.style.display = 'none';
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      // Remove the onAny listener
      if (this.listener) {
        this.game.offAny(this.listener);
        this.listener = null;
      }

      // Remove the container from the DOM
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }]);
  return EntitiesGUI;
}();
_defineProperty(EntitiesGUI, "id", 'gui-entities');
var _default = exports["default"] = EntitiesGUI;

},{"../gui-editor/gui.js":1}]},{},[2])(2)
});

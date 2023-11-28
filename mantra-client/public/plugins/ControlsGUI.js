(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).ControlsGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // ControlsGUI.js - Marak Squires 2023
var ControlsGUI = /*#__PURE__*/function () {
  function ControlsGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ControlsGUI);
    this.id = ControlsGUI.id;
    this.highlightedKeys = {};
  }
  _createClass(ControlsGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.listenForEntityInput();
      this.game.systemsManager.addSystem(this.id, this);
      // this.drawTable();
    }
  }, {
    key: "drawTable",
    value: function drawTable() {
      var game = this.game;
      if (!game.systems['entity-input']) {
        console.log('entity-input system not found, skipping drawTable');
        return;
      }
      var entityInputSystem = game.systemsManager.getSystem('entity-input');
      var controls = entityInputSystem.controlMappings;
      var table = document.createElement('table');
      table.id = "controlsTable";
      var headerHTML = '<tr><th>Key</th><th>Action</th></tr>';
      table.innerHTML = headerHTML;
      for (var key in controls) {
        var row = table.insertRow();
        row.id = "row-".concat(key);
        var cellKey = row.insertCell();
        var cellAction = row.insertCell();
        cellKey.textContent = key;
        cellAction.textContent = controls[key];
      }

      // Use gui.window() to create the window
      this.controlsView = _gui["default"].window('controlsView', 'Input Controls', function () {
        game.systemsManager.removeSystem(ControlsGUI.id);
      });
      var guiContent = this.controlsView.querySelector('.gui-content');
      guiContent.appendChild(table);

      //this.controlsView.appendChild(table);
    }
  }, {
    key: "listenForEntityInput",
    value: function listenForEntityInput(entity) {
      var _this = this;
      var game = this.game;
      var self = this;
      game.on('entityInput::handleInputs', function (entityId, data, sequenceNumber) {
        if (data) {
          var currentInputs = data.controls;
          for (var key in _this.highlightedKeys) {
            document.getElementById("row-".concat(key)).style.backgroundColor = '';
          }
          _this.highlightedKeys = {};
          for (var _key in currentInputs) {
            var row = document.getElementById("row-".concat(_key));
            if (row && currentInputs[_key]) {
              row.style.backgroundColor = '#00ff00';
              _this.highlightedKeys[_key] = true;
            }
          }
        }
      });
      game.on('inputStrategyRegistered', function (strategies) {
        strategies.forEach(function (strategy) {
          self.drawTable();
        });
      });
      this.clearHighlightsInterval = setInterval(this.clearHighlights.bind(this), 500);
    }
  }, {
    key: "clearHighlights",
    value: function clearHighlights() {
      for (var key in this.highlightedKeys) {
        document.getElementById("row-".concat(key)).style.backgroundColor = '';
      }
      this.highlightedKeys = {};
    }
  }, {
    key: "unload",
    value: function unload() {
      // Remove the onAny listener
      if (this.listener) {
        this.game.offAny(this.listener);
        this.listener = null;
      }
      // remove all html elements
      this.controlsView.remove();
      // clear the interval
      clearInterval(this.clearHighlightsInterval);
    }
  }]);
  return ControlsGUI;
}();
_defineProperty(ControlsGUI, "id", 'gui-controls');
var _default = exports["default"] = ControlsGUI;

},{"../gui-editor/gui.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});

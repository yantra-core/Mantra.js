(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Nes = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Nes.js - Marak Squires 2023
var Nes = /*#__PURE__*/function () {
  function Nes() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Nes);
    this.id = Nes.id;
    // Other configurations can be added here if needed
  }
  _createClass(Nes, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      this.createNesEmulator();
      if (this.game && this.game.systems && this.game.systems['entity-input']) {
        // Remark: You may not have to disable inputs + remove events
        // *just* removing events should be enough, this is OK for now
        this.game.systems['entity-input'].disableInputs();
        this.game.systems['keyboard'].unbindAllEvents();
      }

      // add a global click handler to document that will delegate any clicks
      // that are not inside gui-windows to re-enable inputs
      document.addEventListener('click', function (e) {
        // check if the click was inside a gui-window
        var guiWindow = e.target.closest('.gui-container');
        if (_this.game && _this.game.systems && _this.game.systems['entity-input'] && _this.game.systems['keyboard']) {
          if (!guiWindow) {
            // re-enable inputs
            _this.game.systems['entity-input'].setInputsActive();
            _this.game.systems['keyboard'].bindInputControls();
          } else {
            // disable inputs
            _this.game.systems['entity-input'].disableInputs();
            _this.game.systems['keyboard'].unbindAllEvents();
          }

          // check to see if this is a class sutra-link, if so open the form editor
          if (e.target.classList.contains('sutra-link')) {
            var sutraPath = e.target.getAttribute('data-path');
            var node = _this.behavior.findNode(sutraPath);
            _this.showConditionalsForm(node);
          }
        }
      });
    }
  }, {
    key: "createNesEmulator",
    value: function createNesEmulator() {
      var _this2 = this;
      // Use gui.window() to create the window
      this.nesView = _gui["default"].window('nesView', 'NES Emulator', function () {
        _this2.game.systemsManager.removeSystem(Nes.id);
      });

      // Create iframe for the NES emulator
      var iframe = document.createElement('iframe');
      iframe.id = 'nesIframe';
      iframe.style.width = '100%'; // Set iframe width
      iframe.style.height = '100%'; // Set iframe height
      iframe.src = './plugins/nes/vendor/SaltyNES.html'; // Set the source for the iframe

      // Append iframe to the GUI window
      var guiContent = this.nesView.querySelector('.gui-content');
      guiContent.appendChild(iframe);
      //document.body.appendChild(iframe);
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.nesView) {
        this.nesView.remove();
      }
    }
  }]);
  return Nes;
}();
_defineProperty(Nes, "id", 'nes');
var _default = exports["default"] = Nes;

},{"../gui-editor/gui.js":1}]},{},[2])(2)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Scoreboard = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Scoreboard.js - Marak Squires 2023
var Scoreboard = /*#__PURE__*/function () {
  function Scoreboard() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Scoreboard);
    this.id = Scoreboard.id;
    this.scoreData = config.scoreData || {};
  }
  _createClass(Scoreboard, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      this.drawScoreboard();
    }
  }, {
    key: "drawScoreboard",
    value: function drawScoreboard() {
      var scoreboard = document.createElement('div');
      scoreboard.id = "scoreboard";
      scoreboard.className = "scoreboard";
      // scoreboard.style.cssText = "position: absolute; top: 0; left: 50%; transform: translateX(-50%); text-align: center;";
      // set height and width

      /*
      let header = document.createElement('h1');
      header.textContent = "Scoreboard";
      scoreboard.appendChild(header);
      */

      var list = document.createElement('ul');
      for (var player in this.scoreData) {
        var listItem = document.createElement('li');
        listItem.textContent = "".concat(player, ": ").concat(this.scoreData[player]);
        list.appendChild(listItem);
      }
      scoreboard.appendChild(list);

      // Use gui.window() to create the window
      this.scoreboardView = _gui["default"].window('scoreboardView', 'Scoreboard', function () {
        game.systemsManager.removeSystem(Scoreboard.id);
      });
      var guiContent = this.scoreboardView.querySelector('.gui-content');
      guiContent.appendChild(scoreboard);
    }
  }, {
    key: "updateScore",
    value: function updateScore(player, score) {
      this.scoreData[player] = score;
      this.drawScoreboard(); // Redraw scoreboard with updated scores
    }
  }, {
    key: "updateScoreboard",
    value: function updateScoreboard() {
      var list = document.querySelector('#scoreboard ul');
      list.innerHTML = '';
      for (var player in this.scoreData) {
        var listItem = document.createElement('li');
        listItem.textContent = "".concat(player, ": ").concat(this.scoreData[player]);
        list.appendChild(listItem);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      // console.log('Scoreboard.update()')
      // console.log('Scoreboard.update()', game.data)
      var players = game.data.ents.PLAYER;
      var scoreData = {};
      for (var id in players) {
        var player = players[id];
        scoreData[player.name || 'Anon'] = player.score || 0;
      }
      this.scoreData = scoreData;
      // TODO: only draw if diff
      // this.drawScoreboard();
      this.updateScoreboard();
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.scoreboardView) {
        this.scoreboardView.remove();
      }
    }
  }]);
  return Scoreboard;
}();
_defineProperty(Scoreboard, "id", 'gui-scoreboard');
var _default = exports["default"] = Scoreboard;

},{"../gui-editor/gui.js":1}]},{},[2])(2)
});

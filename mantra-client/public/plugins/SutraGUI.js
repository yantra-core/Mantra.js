(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SutraGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var _drawTable = _interopRequireDefault(require("./lib/drawTable.js"));
var _dataView = _interopRequireDefault(require("./lib/editor/dataView.js"));
var _dataForm = _interopRequireDefault(require("./lib/editor/dataForm.js"));
var _actionForm = _interopRequireDefault(require("./lib/editor/actionForm.js"));
var _conditionalsForm = _interopRequireDefault(require("./lib/editor/conditionalsForm.js"));
var _conditionalForm = _interopRequireDefault(require("./lib/editor/conditionalForm.js"));
var _createLabel = _interopRequireDefault(require("./lib/editor/createLabel.js"));
var _editor = _interopRequireDefault(require("./lib/editor.js"));
var _serializeFormToJSON = _interopRequireDefault(require("./util/serializeFormToJSON.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // SutraGUI.js - Marak Squires 2023
// TODO: move gui code to Window() plugin + builder
// import testRules from './testRules.js';
var SutraGUI = /*#__PURE__*/function () {
  function SutraGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SutraGUI);
    this.id = SutraGUI.id;
    this.highlightedKeys = {};
    this.bossHealth = 100;
    this.drawTable = _drawTable["default"].bind(this);
    this.showFunctionEditor = _editor["default"].showFunctionEditor.bind(this);
    this.showObjectEditor = _editor["default"].showObjectEditor.bind(this);
    // this.conditionalsForm = conditionalsForm.bind(this);
    this.showConditionalsForm = _conditionalsForm["default"].bind(this);
    this.createConditional = _editor["default"].createConditional.bind(this);
    this.createConditionalForm = _conditionalForm["default"].bind(this);
    this.createLabel = _createLabel["default"].bind(this);
    this.dataView = _dataView["default"].bind(this);
    this.dataForm = _dataForm["default"].bind(this);
    this.showActionForm = _actionForm["default"].bind(this);
    this.onConditionalTypeChange = _editor["default"].onConditionalTypeChange.bind(this);
    this.serializeFormToJSON = _serializeFormToJSON["default"].bind(this);
    // this.sutra = sutra;
  }
  _createClass(SutraGUI, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      if (this.game.systemsManager) {
        this.game.systemsManager.addSystem(this.id, this);
      }
      if (this.game && this.game.systems && this.game.systems['entity-input']) {
        // Remark: You may not have to disable inputs + remove events
        // *just* removing events should be enough, this is OK for now
        this.game.systems['entity-input'].disableInputs();
        this.game.systems['keyboard'].unbindAllEvents();
      }

      // may need to be removed / moved higher up in the stack
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
            // Remark: Editing / Viewing Conditionals is not yet supported
            //this.showConditionalsForm(node);
          }
        }
      });

      game.loadCSS('/plugins/SutraGUI/Sutra.css');
      this.drawTable();
      if (this.game.rules) {
        this.setRules(this.game.rules);
        this.showSutra();
      } else {
        // add message to indicate no sutra
        var container = document.getElementById('sutraTable');
        var message = document.createElement('div');
        message.className = 'sutra-message';
        message.textContent = 'No Sutra Rules have been defined yet.';
        var wrapper = document.createElement('div');
        // create a new div with link that calls Game.switchWorld('SutraWorld')
        var link = document.createElement('a');
        link.href = '#';
        link.textContent = 'Warp to Sutra Tree World for Tutorial';
        link.onclick = function (e) {
          e.preventDefault();
          _this.game.switchWorld('SutraWorld');
        };
        wrapper.appendChild(link);
        wrapper.appendChild(link);
        container.appendChild(message);
        // container.appendChild(wrapper);      
      }
    }
  }, {
    key: "setRules",
    value: function setRules(rules) {
      console.log('setting rules', rules);
      // let rules = testRules(game);

      // gui.setTheme('light');
      rules.onAny(function (ev, data, node) {
        if (typeof node === 'undefined') {
          // could be tick event, check for performance impact
          return;
        }
        var sutraPath = node.sutraPath;
        var humanReadablePath = rules.getReadableSutraPath(sutraPath);
        document.querySelectorAll("[data-path='".concat(sutraPath, "']")).forEach(function (node) {
          node.classList.add('highlighted-sutra-node');
          // remove collapsed class
          //node.classList.remove('collapsed');
        });
        // Highlight the current element
        var parts = sutraPath.split('.');
        parts.forEach(function (part, i) {
          var path = parts.slice(0, i + 1).join('.');
          document.querySelectorAll("[data-path='".concat(path, "']")).forEach(function (node) {
            node.classList.add('highlighted-sutra-node');
            //node.classList.remove('collapsed');
          });
        });
      });

      this.behavior = rules;

      //this.drawTable();
      var json = rules.serializeToJson();
      this.drawBehaviorTree(JSON.parse(json));
    }
  }, {
    key: "addNewRule",
    value: function addNewRule() {
      // Open a form to create a new conditional
      this.showConditionalsForm();
    }
  }, {
    key: "showSutra",
    value: function showSutra() {
      // this.drawBehaviorTree();
      var json = this.behavior.toJSON();
      this.drawBehaviorTree(this.behavior);
    }
  }, {
    key: "viewMarkup",
    value: function viewMarkup() {
      var json = this.behavior.serializeToJson();
      var markup = this.game.systems.markup.toHTML();
      // clear the #sutraTable
      var table = document.getElementById('sutraTable');
      table.innerHTML = '';
      // create a new div
      var markupDiv = document.createElement('pre');
      markupDiv.style.width = '95%';
      markupDiv.style.height = '800px';
      markupDiv.textContent = markup;
      table.appendChild(markupDiv);
    }
  }, {
    key: "viewJson",
    value: function viewJson() {
      var json = this.behavior.serializeToJson({
        includeSutraPath: false
      });
      // clear the #sutraTable
      var table = document.getElementById('sutraTable');
      table.innerHTML = '';
      // create a new div
      var jsonDiv = document.createElement('textarea');
      // set height and width to 100%
      jsonDiv.style.width = '95%';
      jsonDiv.style.height = '800px';
      jsonDiv.value = json;
      table.appendChild(jsonDiv);
      this.adjustTextareaHeight(jsonDiv);
    }
  }, {
    key: "viewSutraEnglish",
    value: function viewSutraEnglish() {
      var english = this.behavior.exportToEnglish();
      // replace all \n with <br>
      //english = english.replace(/\n/g, '<br>');
      // TODO: add Sutra's i18n support
      //let cn = this.behavior.exportToEnglish(0, 'zh');
      //let ja = this.behavior.exportToEnglish(0, 'ja');
      // clear the #sutraTable
      var table = document.getElementById('sutraTable');
      table.innerHTML = '';
      var pre = document.createElement('pre');
      var englishDiv = document.createElement('code');
      englishDiv.style.width = '95%';
      englishDiv.style.height = '800px';
      englishDiv.innerHTML = english;
      pre.appendChild(englishDiv);
      table.appendChild(pre);
    }
  }, {
    key: "getEmitters",
    value: function getEmitters() {
      return this.game.emitters;
    }
  }, {
    key: "drawBehaviorTree",
    value: function drawBehaviorTree(json) {
      var _this2 = this;
      // Ensure the container and table elements exist
      var container = document.getElementById('sutraView');
      if (!container) {
        console.error('Container element #sutraView not found.');
        return;
      }
      var table = document.getElementById('sutraTable');
      if (!table) {
        console.error('Table element #sutraTable not found.');
        return;
      }

      // Clear the table contents initially
      table.innerHTML = '';

      // Recursive helper function to draw a node and its children
      var drawNode = function drawNode(node, parentElement) {
        var nodeElement = _this2.createNodeElement(node, 1);
        parentElement.appendChild(nodeElement);
        // If the node has children, draw them recursively
        if (node.tree && node.tree.length > 0) {
          node.tree.forEach(function (child) {
            return drawNode(child, parentElement);
          });
        }
      };

      // Draw the main tree nodes
      json.tree.forEach(function (node) {
        drawNode(node, table);
      });

      // Draw subtrees, if any
      if (json.subtrees) {
        var subtrees = Object.keys(json.subtrees);
        if (subtrees.length > 0) {
          subtrees.forEach(function (key) {
            var subtree = json.subtrees[key];
            subtree.tree.forEach(function (node) {
              console.log('subtree node', node);
              drawNode(node, table);
            });
          });
        }
      }
    }
  }, {
    key: "getAvailableActions",
    value: function getAvailableActions() {
      var re = [];
      var emitters = this.getEmitters();
      if (!emitters) {
        return re;
      }
      return Object.keys(emitters);
    }
  }, {
    key: "createNodeElement",
    value: function createNodeElement(node, indentLevel) {
      var _this3 = this;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var keyword = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'IF';
      var formElement = document.createElement('form');
      formElement.className = 'node-element-form';
      var nodeId = path ? "".concat(path, "-").concat(node.action || node["if"]) : node.action || node["if"];

      // Check if node.subtree is a string, indicating a subtree reference
      if (typeof node.subtree === 'string') {
        // Retrieve the subtree based on the reference
        var subtree = this.game.rules.getSubtree(node.subtree);

        // Check if subtree is an instance of Sutra and needs recursive rendering
        // Render each node in the subtree recursively
        subtree.tree.forEach(function (subNode) {
          var childFormElement = _this3.createNodeElement(subNode, indentLevel + 1, nodeId);
          formElement.appendChild(childFormElement);
        });
      }
      var contentDiv = document.createElement('div');
      contentDiv.className = 'node-element';
      formElement.appendChild(contentDiv);
      if (node.action) {
        formElement.classList.add('action-node-form');
        formElement.onclick = function () {
          _this3.showActionForm(node);
        };
        this.appendActionElement(contentDiv, node, indentLevel, keyword);
      } else if (node["if"]) {
        this.appendConditionalElement(contentDiv, node, indentLevel);
      }
      if (indentLevel !== 1) {
        // Remark: 3/4/2024 - Commented out to show all rules by default
        // formElement.classList.add('collapsible-content');
      }
      return formElement;
    }
  }, {
    key: "saveSutra",
    value: function saveSutra() {
      // get the #sutraTable
      var table = document.getElementById('sutraTable');

      // console.log('saveSutra', this.serializeFormToJSON(table));
    }
  }, {
    key: "appendActionElement",
    value: function appendActionElement(element, node, indentLevel) {
      var keyword = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'THEN';
      // "Then" clause container
      var actionSelectContainer = document.createElement('div');
      actionSelectContainer.className = 'action-select-container';

      // "Then" clause label with embedded select element
      var thenLabel = document.createElement('label');
      thenLabel.className = 'then-label';
      thenLabel.innerHTML = "<span class=\"sutra-keyword\">".concat(keyword, "</span>");
      actionSelectContainer.setAttribute('data-path', node.sutraPath);
      var select = this.createActionSelect(node);
      // Append select element inside label element
      thenLabel.appendChild(select);

      // Append the label (with the select inside it) to the container
      actionSelectContainer.appendChild(thenLabel);

      // add click handler to actionSelectContainer so that it removes all "collapsed" classes,
      // from all nodes whose data-path matches the data-path of the actionSelectContainer
      actionSelectContainer.onclick = function () {
        var nodes = document.querySelectorAll("[data-path='".concat(node.sutraPath, "']"));
        // console.log('made a nodes query', nodes)
        // remove all collapsed classes from those nodes
        nodes.forEach(function (node) {
          // TODO: why toggle not working as expected?
          // node.classList.toggle('collapsed');
          // node.classList.remove('collapsed');
        });
      };

      // Append the action select container to the main element
      element.appendChild(actionSelectContainer);
      if (node.data) {
        var dataContainer = document.createElement('div');
        dataContainer.className = 'data-container';
        dataContainer.classList.add('with-container');
        dataContainer.setAttribute('data-path', node.sutraPath);
        var withLabel = document.createElement('label');
        withLabel.className = 'with-label';
        withLabel.innerHTML = "<a href=\"#\" class=\"sutra-keyword\">WITH</a>";
        //dataContainer.appendChild(withLabel);

        // actionSelectContainer.appendChild(withLabel);

        //let dataView = this.dataView(node, indentLevel);
        // Append the data container to the main element
        //element.appendChild(dataView);
      }
    }
  }, {
    key: "createActionSelect",
    value: function createActionSelect(node) {
      var select = document.createElement('select');
      select.className = 'action-select';
      var actions = this.getAvailableActions();

      // Check if node.action is in the list of actions
      if (node.action && !actions.includes(node.action)) {
        actions.push(node.action); // Add it to the list if not present
      }

      actions.forEach(function (action) {
        var option = document.createElement('option');
        option.value = action;
        option.text = action;
        if (node.action === action) {
          option.selected = true;
        }
        select.appendChild(option);
      });
      return select;
    }
  }, {
    key: "createInputGroup",
    value: function createInputGroup(node, key, indentLevel, path) {
      var inputGroup = document.createElement('div');
      inputGroup.className = 'input-group';
      var label = this.createLabel(key, indentLevel);
      var input = this.createInput(node, key, path);
      inputGroup.appendChild(label);
      inputGroup.appendChild(input);
      return inputGroup;
    }
  }, {
    key: "createInput",
    value: function createInput(node, key) {
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var input = document.createElement('input');
      input.className = 'param-input';
      if (path.length) {
        input.name = path;
      } else {
        input.name = key;
      }
      input.setAttribute('data-action', node.action);
      input.setAttribute('data-key', key);
      input.setAttribute('data-id', node.data.id); // Assuming node.action can serve as a unique ID
      input.value = node.data[key];
      input.onchange = function (e) {
        node.data[key] = e.target.value;
      };
      return input;
    }
  }, {
    key: "appendConditionalElement",
    value: function appendConditionalElement(element, node, indentLevel) {
      var self = this;
      var condition = this.createConditionElement(node);
      element.appendChild(condition);
      if (node.then) {
        node.then.forEach(function (childNode) {
          element.appendChild(self.createNodeElement(childNode, indentLevel + 1, '', 'THEN'));
        });
      }
      if (node["else"]) {
        var elseElement = this.createElseElement(node, indentLevel);
        element.appendChild(elseElement);
      }
    }
  }, {
    key: "createConditionElement",
    value: function createConditionElement(node) {
      var self = this;
      var keyword = "IF";
      var conditionContainer = document.createElement('div');
      conditionContainer.className = 'condition-container';

      // check to see if node.sutraPath is anywhere at first level of tree[0]
      // could be tree[1] or tree[2] etc.
      var isFirstLevel = false;
      // check to see if has one "[" then it is first level
      // TODO: better way to handle this
      if (node.sutraPath.split('[').length === 2) {
        isFirstLevel = true;
      }
      if (!isFirstLevel) {
        // Add a visual separator, if desired
        /*
        let ifSeparator = document.createElement('div');
        ifSeparator.className = 'condition-separator';
        ifSeparator.textContent = 'IF';
        conditionContainer.appendChild(ifSeparator);
        */
        keyword = "AND";
      }
      if (Array.isArray(node["if"])) {
        node["if"].forEach(function (cond, i) {
          var condition = document.createElement('div');
          condition.className = 'condition';
          condition.innerHTML = "<span class=\"sutra-keyword\">".concat(keyword, "</span> ").concat(cond);
          // set data-path attribute to node.sutraPath
          condition.setAttribute('data-path', node.sutraPath);
          condition.onclick = function () {
            // Remark: Editing / Viewing Conditionals is not yet supported
            // self.showConditionalsForm(node);
          };
          conditionContainer.appendChild(condition);

          //const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
          //condition.appendChild(removeRuleBtn);

          // Add a visual separator, if desired
          /*
          if (node.if.indexOf(cond) !== node.if.length - 1) {
            let andSeparator = document.createElement('div');
            andSeparator.className = 'condition-separator';
            andSeparator.textContent = 'AND';
            conditionContainer.appendChild(andSeparator);
          }
          */
        });
      } else {
        var condition = document.createElement('div');
        condition.className = 'condition';
        condition.innerHTML = "<span class=\"sutra-keyword\">".concat(keyword, "</span> ").concat(node["if"]);
        condition.setAttribute('data-path', node.sutraPath);
        condition.onclick = function () {
          // find the child node-element-form in condition
          var nodeElementForm = condition.parentElement.parentElement.querySelector('.node-element-form');
          // nodeElementForm.classList.toggle('collapsed');
          // Remark: Editing / Viewing Conditionals is not yet supported
          // self.showConditionalsForm(node);
        };

        conditionContainer.appendChild(condition);

        //const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
        //condition.appendChild(removeRuleBtn);
      }

      // clicking the form element will toggle collapsed class
      conditionContainer.onclick = function (e) {
        var target = e.target;
        var container = target.parentElement;
        var allCollapsibleContent = conditionContainer.parentElement.querySelectorAll('.node-element-form');
        allCollapsibleContent.forEach(function (collapsibleContent) {
          collapsibleContent.classList.toggle('collapsible-content');
        });
      };
      return conditionContainer;
    }
  }, {
    key: "createElseElement",
    value: function createElseElement(node, indentLevel) {
      var _this4 = this;
      var keyword = "ELSE";
      var elseElement = document.createElement('div');
      elseElement.className = 'else-branch';
      node["else"].forEach(function (childNode) {
        return elseElement.appendChild(_this4.createNodeElement(childNode, indentLevel + 1, '', 'ELSE'));
      });
      return elseElement;
    }
  }, {
    key: "saveConditional",
    value: function saveConditional(conditionalName, form) {
      var json = this.serializeFormToJSON(form);
      console.log('SutraGui.saveConditional() called', conditionalName, json);
      this.behavior.updateCondition(conditionalName, json); // Update Sutra instance
      this.drawBehaviorTree(); // Redraw the tree to reflect changes
    }
  }, {
    key: "handleAddRuleClick",
    value: function handleAddRuleClick(nodeId) {
      console.log('handleAddRuleClick', nodeId);
      var node = this.behavior.findNode(nodeId);
      console.log('node', node);
      if (node.action) {
        // Add a new conditional
        this.showConditionalsForm(node);
      } else if (node["if"]) {
        // Add a new action
        this.showConditionalsForm(node);
        //this.showAddActionForm(nodeId);
      }
    }
  }, {
    key: "handleRemoveRuleClick",
    value: function handleRemoveRuleClick(sutraPath) {
      console.log('handleRemoveRuleClick', sutraPath);
      try {
        this.behavior.removeNode(sutraPath);
      } catch (err) {
        console.log(err);
      }
      /*
      let node = this.behavior.findNode(nodeId);
      console.log('node', node)
      if (node.action) {
        // Remove the action
        this.behavior.removeNode(node.sutraPath);
      } else if (node.if) {
        // Remove the conditional
        this.behavior.removeCondition(node.if);
      }
      */

      var json = this.behavior.serializeToJson();
      this.drawBehaviorTree();
    }
  }, {
    key: "createAddRuleButton",
    value: function createAddRuleButton(nodeId) {
      var _this5 = this;
      var button = document.createElement('button');
      button.textContent = '+';
      button.className = 'rule-button rule-button-add';
      button.title = 'Add a new rule';
      button.setAttribute('data-id', nodeId);
      button.onclick = function (e) {
        _this5.handleAddRuleClick(e.target.getAttribute('data-id'));
        return false;
      };
      return button;
    }
  }, {
    key: "createRemoveRuleButton",
    value: function createRemoveRuleButton(nodeId) {
      var _this6 = this;
      var button = document.createElement('button');
      button.textContent = '-';
      button.className = 'rule-button rule-button-remove';
      button.title = 'Remove this rule';
      button.setAttribute('data-id', nodeId);
      button.onclick = function (e) {
        e.stopPropagation();
        _this6.handleRemoveRuleClick(e.target.getAttribute('data-id'));
      };
      return button;
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      if (game.tick % 60 === 0) {
        // Clear previously highlighted elements
        document.querySelectorAll('.highlighted-sutra-node').forEach(function (node) {
          node.classList.remove('highlighted-sutra-node');
          // node.classList.add('collapsed');
        });
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove all html elements
      this.sutraView.remove();
    }
  }, {
    key: "adjustTextareaHeight",
    value: function adjustTextareaHeight(textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      textarea.style.height = textarea.scrollHeight + 'px'; // Set new height
    }
  }]);
  return SutraGUI;
}();
_defineProperty(SutraGUI, "id", 'gui-sutra');
var _default = exports["default"] = SutraGUI;

},{"../gui-editor/gui.js":1,"./lib/drawTable.js":3,"./lib/editor.js":4,"./lib/editor/actionForm.js":5,"./lib/editor/conditionalForm.js":7,"./lib/editor/conditionalsForm.js":8,"./lib/editor/createLabel.js":9,"./lib/editor/dataForm.js":10,"./lib/editor/dataView.js":11,"./util/serializeFormToJSON.js":12}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = drawTable;
var _gui = _interopRequireDefault(require("../../gui-editor/gui.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function drawTable() {
  var _this = this;
  var game = this.game;
  var self = this;
  var table = document.createElement('div');
  table.id = "sutraTable";

  // Use gui.window() to create the window
  this.sutraView = _gui["default"].window('sutraView', 'Sutra Editor', function () {
    if (game.systemsManager) {
      game.systemsManager.removeSystem(self.id);
    }
  });

  // Add a "Show Sutra" button
  var showSutraButton = document.createElement('button');
  showSutraButton.textContent = 'Show Sutra';
  showSutraButton.onclick = function () {
    return _this.showSutra();
  };

  // Add a button to create new rules
  var addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = function () {
    return _this.addNewRule();
  };

  // Add view JSON button
  var viewJsonButton = document.createElement('button');
  viewJsonButton.textContent = 'JSON';
  viewJsonButton.onclick = function () {
    return _this.viewJson();
  };

  // Add "Read Sutra" button
  var readSutraButton = document.createElement('button');
  readSutraButton.textContent = 'Read Sutra';
  readSutraButton.onclick = function () {
    return _this.viewSutraEnglish();
  };

  // Adds "View Markup" button
  var viewMarkupButton = document.createElement('button');
  viewMarkupButton.textContent = 'View Markup';
  viewMarkupButton.onclick = function () {
    return _this.viewMarkup();
  };
  var guiContent = this.sutraView.querySelector('.gui-content');

  // set background color to transparent
  this.sutraView.style.backgroundColor = 'transparent';
  var slider = createOpacitySlider(this.sutraView);
  // hide the slider (for now)
  slider.style.display = 'none';
  // Create and append the new footer
  var footer = document.createElement('div');
  footer.className = 'gui-window-footer';
  guiContent.appendChild(showSutraButton);
  // guiContent.appendChild(viewJsonButton);
  guiContent.appendChild(readSutraButton);
  guiContent.appendChild(viewMarkupButton);
  guiContent.appendChild(slider);
  guiContent.appendChild(table);

  // add <br>
  guiContent.appendChild(document.createElement('br'));
  // guiContent.appendChild(addRuleButton);

  // create save button
  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = function () {
    return _this.saveSutra();
  };
  // footer.appendChild(saveButton);

  //this.sutraView.appendChild(guiContent);
  this.sutraView.appendChild(footer);

  // trigger slider event to update background color
  slider.querySelector('input').dispatchEvent(new Event('input'));
  // this.sutraView.appendChild(footer);
}

function createOpacitySlider(element) {
  // Create the wrapper div
  var wrapper = document.createElement('div');
  wrapper.style.position = 'absolute'; // Or 'relative' depending on your layout
  wrapper.style.right = '40px'; // Adjust the value as needed
  wrapper.style.top = '5px'; // Adjust the value as needed
  wrapper.style.zIndex = '10'; // Ensure it's above other elements

  // Create the slider element
  var slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.setAttribute('min', '0');
  slider.setAttribute('max', '1');
  slider.setAttribute('step', '0.01');
  slider.setAttribute('value', '1'); // Start with a fully solid background
  slider.style.width = '110px'; // Make the slider larger
  slider.style.transform = 'scale(1.5)'; // Scale the slider for better visibility
  slider.style.cursor = 'pointer';

  // Append the slider to the wrapper
  wrapper.appendChild(slider);

  // Set initial background color with 0 opacity using rgba
  element.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Assuming you want to start with a black background

  // Add an event listener to the slider
  slider.addEventListener('input', function () {
    // Update the background color with the new opacity value
    var opacity = this.value;
    element.style.backgroundColor = "rgba(10, 15, 27, ".concat(opacity, ")"); // #0a0f1b converted to rgba
  });

  return wrapper;
}

},{"../../gui-editor/gui.js":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gui = _interopRequireDefault(require("../../gui-editor/gui.js"));
var _componentsSelect = _interopRequireDefault(require("./editor/componentsSelect.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var editor = {};
editor.showFunctionEditor = function showFunctionEditor(conditionalName, conditional) {
  var _this = this;
  var guiContent = this.sutraFormView.querySelector('.gui-content');
  var title = document.createElement('h3');
  title.textContent = "Edit Function: ".concat(conditionalName);
  guiContent.appendChild(title);
  var textarea = document.createElement('textarea');
  textarea.value = conditional.toString(); // Convert function to string
  guiContent.appendChild(textarea);
  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-button');
  saveButton.onclick = function () {
    var updatedFunction = new Function('return ' + textarea.value)();
    _this.behavior.updateCondition(conditionalName, updatedFunction); // Assuming such a method exists
    _this.redrawBehaviorTree(); // Redraw to reflect changes
  };

  guiContent.appendChild(saveButton);
};
editor.showObjectEditor = function showObjectEditor(conditionalName, conditional, operators) {
  var _this2 = this;
  var self = this;
  var guiContent = this.sutraFormView.querySelector('.gui-content');
  // Main container for the editor
  var editorContainer = document.createElement('div');
  editorContainer.className = 'conditional-editor-container';
  guiContent.appendChild(editorContainer);
  var form = document.createElement('form');
  form.className = 'conditional-form';
  editorContainer.appendChild(form);

  // Descriptive text
  var description = document.createElement('div');
  description.innerHTML = "<span class=\"sutra-keyword\">property</span> refers to current context values <br/><span class=\"sutra-keyword\">gamePropertyPath</span>  refers to global 'game.data'";
  form.appendChild(description);

  // if global 
  //  such as gameState.ents[entity.type] or ents.BLOCK.length in game.data.

  // Radio buttons for property type selection
  var propertyRadio = createRadio('propertyType', 'property', 'Local Property');
  var gamePropertyRadio = createRadio('propertyType', 'gamePropertyPath', 'Global Game Property');
  form.appendChild(propertyRadio.container);
  form.appendChild(gamePropertyRadio.container);

  // Event listener to toggle input fields
  propertyRadio.input.addEventListener('change', toggleFields);
  gamePropertyRadio.input.addEventListener('change', toggleFields);

  // Function to create radio buttons
  function createRadio(name, value, label) {
    var container = document.createElement('div');
    var input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    input.id = value;
    var labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.setAttribute('for', value);
    container.appendChild(input);
    container.appendChild(labelElement);
    return {
      container: container,
      input: input
    };
  }

  // Function to toggle visibility of input fields
  function toggleFields() {
    // set all field values to empty string
    /*
    let fields = form.querySelectorAll('.field-input');
    fields.forEach(field => {
      field.value = '';
    });
    */

    propertySelectContainer.style.display = propertyRadio.input.checked ? 'block' : 'none';
    gamePropertyFieldContainer.style.display = gamePropertyRadio.input.checked ? 'block' : 'none';
  }

  // Create form fields
  var propertyFieldContainer = createField('property', conditional.property || '');
  var components = [];
  if (typeof game !== 'undefined' && game.components) {
    components = Object.keys(game.components);
  }
  var propertySelectContainer = (0, _componentsSelect["default"])('property', components);
  var gamePropertyFieldContainer = createField('gamePropertyPath', conditional.gamePropertyPath || '');
  form.appendChild(propertySelectContainer);
  form.appendChild(gamePropertyFieldContainer);

  // Function to create input fields
  function createField(name, value) {
    var fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';
    var label = document.createElement('label');
    label.textContent = name;
    label.className = 'field-label';
    label.classList.add('sutra-keyword');
    fieldContainer.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.value = value;
    input.className = 'field-input';
    fieldContainer.appendChild(input);
    return fieldContainer;
  }

  /*
  // We need to always show "property" and "gameProperty", even if they are empty
  if (typeof conditional.property === 'undefined') {
    conditional.property = '';
  }
  if (typeof conditional.gameProperty === 'undefined') {
    conditional.gamePropertyPath = '';
  }
  */

  // Create form fields based on the conditional's properties
  for (var key in conditional) {
    if (key === 'op') continue; // Skip 'op' here, it will be handled separately

    if (key === 'property' || key === 'gamePropertyPath') {
      continue; // Skip these, they were handled above
      //label.classList.add('sutra-keyword');
    }

    var fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-container';
    form.appendChild(fieldContainer);
    var label = document.createElement('label');
    label.textContent = key;
    label.className = 'field-label';
    fieldContainer.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = conditional[key];
    input.className = 'field-input';
    fieldContainer.appendChild(input);
  }
  var opContainer = document.createElement('div');
  opContainer.className = 'operator-container';
  form.appendChild(opContainer);
  var opLabel = document.createElement('label');
  opLabel.textContent = 'OP';
  opLabel.classList.add('sutra-keyword');
  opContainer.appendChild(opLabel);
  var select = document.createElement('select');
  select.name = 'op';
  select.className = 'operator-select';
  opContainer.appendChild(select);
  operators.forEach(function (operator) {
    var option = document.createElement('option');
    option.value = operator;
    option.text = operator;
    select.appendChild(option);
    if (conditional.op === operator) {
      option.selected = true;
    }
  });
  var saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';
  saveButton.className = 'save-button';
  form.appendChild(saveButton);
  saveButton.onclick = function (event) {
    event.preventDefault();

    // check to see which radio button is checked
    var propertyType = form.querySelector('input[name="propertyType"]:checked').value;

    // get the existing condition
    var existingCondition = _this2.behavior.getCondition(conditionalName);
    // create a new array of conditions
    var newConditionObj = [];
    // add the existing condition to the new array
    if (Array.isArray(existingCondition)) {
      existingCondition.forEach(function (cond, index) {
        newConditionObj.push(cond);
      });
    } else {
      newConditionObj.push(existingCondition);
    }

    // get the form data
    var formData = self.serializeFormToJSON(form);
    if (propertyType === 'property') {
      // removes the gamePropertyPath property
      delete formData.gamePropertyPath;
    }
    if (propertyType === 'gamePropertyPath') {
      // removes the property property
      delete formData.property;
    }

    // add a new condition to the new array
    newConditionObj.push(formData);
    console.log('updating', conditionalName, newConditionObj);
    self.behavior.updateCondition(conditionalName, newConditionObj, true);
    // get the update condition to verify it was updated
    var updatedCondition = _this2.behavior.getCondition(conditionalName);
    console.log('updatedCondition', updatedCondition);
  };
  // Initially set field visibility
  if (conditional.property !== undefined) {
    propertyRadio.input.checked = true;
  } else if (conditional.gamePropertyPath !== undefined) {
    gamePropertyRadio.input.checked = true;
  }
  toggleFields(); // Call this to set initial field visibility
};

// Adjust createConditional to handle both creating and updating conditionals
editor.createConditional = function createConditional(e, node) {
  e.preventDefault();
  var formData = new FormData(e.target);
  var type = formData.get('conditionalType');
  var conditionalName = node ? node.action : 'newConditional'; // Default name for new conditional

  if (type === 'function') {
    // Logic to create and add custom function conditional
    var func = new Function('return ' + formData.get('conditionalFunction'))();
    this.behavior.updateCondition(conditionalName, func);
  } else {
    // Logic to create and add DSL object conditional
    var dsl = {
      op: formData.get('dslOperator'),
      property: formData.get('dslProperty'),
      value: formData.get('dslValue')
    };
    this.behavior.updateCondition(conditionalName, dsl);
  }

  // Redraw behavior tree or update UI as needed
  this.redrawBehaviorTree();
};
editor.onConditionalTypeChange = function onConditionalTypeChange(type, node) {
  // Update form based on selected type
  var inputContainer = document.getElementById('conditionalInputContainer');
  if (type === 'function') {
    // Provide a textarea for custom function input
    var functionValue = node && typeof node.condition === 'function' ? node.condition.toString() : '';
    inputContainer.innerHTML = "<textarea name=\"conditionalFunction\">".concat(functionValue, "</textarea>");
  } else {
    // Provide inputs for DSL object properties
    var propertyValue = node && node.condition && node.condition.property ? node.condition.property : '';
    var valueValue = node && node.condition && node.condition.value ? node.condition.value : '';
    var selectedOp = node && node.condition && node.condition.op ? node.condition.op : '';
    inputContainer.innerHTML = "\n      <input name=\"dslProperty\" placeholder=\"Property\" value=\"".concat(propertyValue, "\">\n      <input name=\"dslValue\" placeholder=\"Value\" value=\"").concat(valueValue, "\">\n      <select name=\"dslOperator\">\n        ").concat(this.behavior.getOperators().map(function (op) {
      return "<option value=\"".concat(op, "\" ").concat(op === selectedOp ? 'selected' : '', ">").concat(op, "</option>");
    }).join(''), "\n      </select>\n    ");
  }
};
var _default = exports["default"] = editor;

},{"../../gui-editor/gui.js":1,"./editor/componentsSelect.js":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = showActionForm;
var _gui = _interopRequireDefault(require("../../../gui-editor/gui.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function showActionForm(node) {
  // Remark: Action form is not yet implemented

  return;
  /*
  // If the node is undefined, assume we are at tree root
  if (typeof node === 'undefined') {
    node = {
      sutraPath: 'tree',
      action: 'newConditional'
    };
  }
  */

  console.log('node', node);
  var sutraActionEditor = document.getElementById('sutraActionEditor');
  if (!sutraActionEditor) {
    this.sutraActionEditor = _gui["default"].window('sutraActionEditor', 'Sutra Action Editor', function () {
      var sutraActionEditor = document.getElementById('sutraActionEditor');
      if (sutraActionEditor) {
        sutraActionEditor.remove();
      }
    });
  }
  // not working?
  _gui["default"].bringToFront(this.sutraActionEditor);
  var guiContent = this.sutraActionEditor.querySelector('.gui-content');
  guiContent.innerHTML = ''; // Clear previous content

  // "Then" clause container
  var actionSelectContainer = document.createElement('div');
  actionSelectContainer.className = 'action-select-container';

  // "Then" clause label with embedded select element
  var thenLabel = document.createElement('label');
  thenLabel.className = 'then-label';
  thenLabel.innerHTML = "<span class=\"sutra-keyword\">THEN</span>";
  actionSelectContainer.setAttribute('data-path', node.sutraPath);
  var select = this.createActionSelect(node);
  // Append select element inside label element
  thenLabel.appendChild(select);

  // Append the label (with the select inside it) to the container
  actionSelectContainer.appendChild(thenLabel);
  var nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info';
  var ifLink = '';
  if (Array.isArray(node["if"])) {
    node["if"].forEach(function (conditionalName, index) {
      // let conditional = this.behavior.getCondition(conditionalName);
      if (index > 0) {
        ifLink += " <strong class=\"sutra-keyword\">AND</strong> <span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(conditionalName, "</span>");
      } else {
        ifLink += "<span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(conditionalName, "</span>");
      }
    });
  } else {
    ifLink = node["if"];
  }
  var humanPath = this.behavior.getReadableSutraPath(node.sutraPath) || 'root';
  humanPath = humanPath.replace('and', '<strong class="sutra-keyword">..</strong>');
  // Create and append the 'Path' element
  var pathElement = document.createElement('div');
  pathElement.innerHTML = "<strong class=\"sutra-keyword\">PATH</strong> ".concat(humanPath);
  nodeInfo.appendChild(pathElement);

  // Append the entire node info to the GUI content
  guiContent.appendChild(nodeInfo);

  // Append the entire container to the GUI content
  guiContent.appendChild(actionSelectContainer);

  //  this.appendActionElement(guiContent, node);

  var formContainer = this.dataForm(node);
  guiContent.appendChild(formContainer);
}

},{"../../../gui-editor/gui.js":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = componentsSelect;
function componentsSelect(id, components) {
  var fieldContainer = document.createElement('div');
  fieldContainer.className = 'field-container';
  var label = document.createElement('label');
  label.textContent = id;
  label.className = 'field-label';
  label.classList.add('sutra-keyword');
  fieldContainer.appendChild(label);
  var select = document.createElement('select');
  select.id = id;
  select.name = id;
  components.forEach(function (component) {
    var option = document.createElement('option');
    option.value = component;
    option.text = component;
    select.appendChild(option);
  });
  fieldContainer.appendChild(select);
  return fieldContainer;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createConditionalForm;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function createConditionalForm(conditionalName, node) {
  var _this = this;
  console.log('creating conditional form', conditionalName, node);
  var self = this;
  // Create the form element

  /*
  let form = document.createElement('form');
  form.className = 'sutra-form';
  // Create the radio group div
  let radioGroupDiv = document.createElement('div');
  radioGroupDiv.className = 'radio-group';
  // Add radio buttons to radioGroupDiv as needed
   // Create the conditional input container div
  let conditionalInputContainer = document.createElement('div');
  conditionalInputContainer.id = `conditionalInputContainer-${conditionalName}`;
  conditionalInputContainer.className = 'input-container';
   // Append the created elements to the form
  form.appendChild(radioGroupDiv);
  form.appendChild(conditionalInputContainer);
  // form.appendChild(removeConditionButton);
  // form.appendChild(addConditionBelowButton);
  */
  // Append the form to the DOM or a parent element as required
  // Example: document.body.appendChild(form); or parentElement.appendChild(form);

  var conditional = this.behavior.getCondition(conditionalName);
  console.log('conditional', conditional);
  if (!conditional) {
    console.log('condition not found', conditionalName);
    conditional = {
      op: '==',
      property: 'type',
      value: 'block'
    };
  }

  // Handling when conditional is an array
  if (Array.isArray(conditional)) {
    // Create a container for each condition in the array
    conditional.forEach(function (cond, index) {
      var container = document.createElement('div');
      container.id = "conditional-".concat(conditionalName, "-").concat(index);
      container.className = 'conditional-array-item';
      // Depending on the type of condition (function or object), call the appropriate editor
      if (typeof cond === 'function') {
        _this.showFunctionEditor("".concat(conditionalName, "-").concat(index), cond, container);
      } else if (_typeof(cond) === 'object') {
        _this.showObjectEditor("".concat(conditionalName, "-").concat(index), cond, _this.behavior.operators, container);
      } else {
        console.log('Unknown conditional type in array');
      }
      var guiContent = _this.sutraFormView.querySelector('.gui-content');
      guiContent.appendChild(container);

      // Append the container to the form
      //form.querySelector('#conditionalInputContainer-' + conditionalName).appendChild(container);
    });
  } else if (typeof conditional === 'function') {
    this.showFunctionEditor(conditionalName, conditional);
  } else if (_typeof(conditional) === 'object') {
    this.showObjectEditor(conditionalName, conditional, this.behavior.operators);
  } else {
    console.log('Unknown conditional type');
  }
  var guiContent = this.sutraFormView.querySelector('.gui-content');
  var footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = "<h3>Individual Condition Footer</h3>";
  guiContent.appendChild(footer);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = showConditionalsForm;
var _gui = _interopRequireDefault(require("../../../gui-editor/gui.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function showConditionalsForm(node) {
  var _this = this;
  // If the node is undefined, assume we are at tree root
  if (typeof node === 'undefined') {
    node = {
      sutraPath: 'tree',
      action: 'newConditional',
      "if": 'newConditional',
      then: [{
        action: 'newAction'
      }]
    };
  }
  var sutraFormView = document.getElementById('sutraFormView');
  if (!sutraFormView) {
    this.sutraFormView = _gui["default"].window('sutraFormView', 'Sutra Condition Editor', function () {
      var sutraFormView = document.getElementById('sutraFormView');
      if (sutraFormView) {
        sutraFormView.remove();
      }
    });
  }
  // not working?
  _gui["default"].bringToFront(this.sutraFormView);
  var guiContent = this.sutraFormView.querySelector('.gui-content');
  guiContent.innerHTML = ''; // Clear previous content

  var nodeInfo = document.createElement('div');
  nodeInfo.className = 'node-info';
  var ifLink = '';
  if (Array.isArray(node["if"])) {
    node["if"].forEach(function (conditionalName, index) {
      // let conditional = this.behavior.getCondition(conditionalName);
      if (index > 0) {
        ifLink += "<strong class=\"sutra-keyword\">AND</strong> <span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(conditionalName, "</span>");
      } else {
        ifLink += "<span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(conditionalName, "</span>");
      }
    });
  } else {
    ifLink = node["if"];
  }
  var humanPath = this.behavior.getReadableSutraPath(node.sutraPath) || 'root';
  console.log('humanPath', humanPath);
  humanPath = humanPath.replace('and', '');
  humanPath = humanPath.split(' ');

  // for each item in humanPath create a span that has sutra-link class and sutra-path attribute
  var path = '';
  humanPath.forEach(function (item, index) {
    if (index > 0) {
      path += " <strong class=\"sutra-keyword\">..</strong> <span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(item, "</span>");
    } else {
      path += "<span=\"openCondition\" class=\"sutra-link\" data-path=\"".concat(node.sutraPath, "\">").concat(item, "</span>");
    }
  });

  // Create and append the 'Path' element
  var pathElement = document.createElement('div');
  pathElement.innerHTML = "<strong class=\"sutra-keyword\">ROOT</strong> ".concat(humanPath);
  nodeInfo.appendChild(pathElement);

  // Create and append the 'If' element
  var ifElement = document.createElement('div');
  ifElement.innerHTML = "<strong class=\"sutra-keyword\">IF</strong> ".concat(ifLink);
  nodeInfo.appendChild(ifElement);
  if (node.then && Array.isArray(node.then) && typeof node.then[0].action !== 'undefined') {
    // Create and append the 'Then' element
    var thenElement = document.createElement('div');
    thenElement.innerHTML = "<strong class=\"sutra-keyword\">THEN</strong> ".concat(node.then[0].action);
    // clicking on the Then element should up Action Editor
    thenElement.addEventListener('click', function (e) {
      e.preventDefault();
      _this.showActionForm(node.then[0]);
    });
    nodeInfo.appendChild(thenElement);
  }

  /*
  if (typeof node.then[0].data !== 'undefined') {
    // add "WITH" header span
    let withElement = document.createElement('div');
    withElement.innerHTML = `<strong class="sutra-keyword">WITH</strong>`;
    nodeInfo.appendChild(withElement);
  }
  */

  // Append the entire node info to the GUI content
  guiContent.appendChild(nodeInfo);

  // Handle array of conditionals
  if (Array.isArray(node["if"])) {
    node["if"].forEach(function (conditionalName) {
      _this.createConditionalForm(conditionalName, node);
    });
  } else {
    // get condition first
    var condition = this.behavior.getCondition(node["if"]);
    if (!condition) {
      console.log('condition not found', node["if"]);
      condition = {
        op: '==',
        property: 'type',
        value: 'block'
      };
    }
    if (Array.isArray(condition.conditions)) {
      condition.conditions.forEach(function (condName, index) {
        var subCondition = _this.behavior.getCondition(condName);
        _this.createConditionalForm(condName, node);
      });
    } else {
      this.createConditionalForm(node["if"], node);
    }
  }

  // add footer for adding new conditional / remove entire if condition
  // let button = addConditionButton(this, conode);

  var footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = "<h3>Entire Condition Footer</h3>";
  guiContent.appendChild(footer);
  _gui["default"].bringToFront(this.sutraFormView);
}

},{"../../../gui-editor/gui.js":1}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createLabel;
function createLabel(key, indentLevel) {
  var label = document.createElement('label');
  label.textContent = key;
  label.className = 'param-label';
  label.style.marginLeft = '10px';
  // make bold
  label.style.fontWeight = 'bold';
  //label.style.marginLeft = `${indentLevel * 10}px`;
  return label;
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dataForm;
var _actionForm = _interopRequireDefault(require("./actionForm.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function dataForm(node) {
  var _this = this;
  var indentLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  this.createDataContainer = createDataContainer.bind(this);
  this.createNestedDataContainer = createNestedDataContainer.bind(this);
  this.redrawComponent = redrawComponent.bind(this);
  this.showAddPropertyForm = showAddPropertyForm.bind(this);
  this.addPropertyToNestedNode = addPropertyToNestedNode.bind(this);
  this.createObjectInput = createObjectInput.bind(this);
  this.createValueInput = createValueInput.bind(this);
  this.actionForm = _actionForm["default"].bind(this);

  // "With" context container for data
  var dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  // Add with-container class
  dataContainer.classList.add('with-container');
  // dataContainer.classList.add('collapsed');

  // set data-path attribute to sutraPath
  dataContainer.setAttribute('data-path', node.sutraPath);

  // "With" context label
  var withLabel = document.createElement('label');
  withLabel.className = 'with-label';
  withLabel.innerHTML = "<span class=\"sutra-keyword\">WITH</span>";
  dataContainer.setAttribute('data-path', node.sutraPath);

  // Append the label directly to the data container
  dataContainer.appendChild(withLabel);

  // Create and append the data content to the data container
  var dataContent = this.createDataContainer(node, indentLevel);
  dataContainer.appendChild(dataContent);

  // Add "Add Property" button
  var addButton = document.createElement('button');
  addButton.innerText = 'Add Property';
  addButton.onclick = function () {
    return _this.showAddPropertyForm(node, indentLevel, dataContainer);
  };
  dataContainer.appendChild(addButton);
  return dataContainer;
}
function createDataContainer(node) {
  var _this2 = this;
  var indentLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  console.log('creating a data container', node, indentLevel);
  var dataContainer = document.createElement('div');
  dataContainer.className = 'action-form';
  Object.keys(node.data).forEach(function (key) {
    var path = key;
    // Check if the value is an object and not null
    if (_typeof(node.data[key]) === 'object' && node.data[key] !== null) {
      var nestedLabel = _this2.createLabel(key, indentLevel);
      dataContainer.appendChild(nestedLabel);
      var nestedContainer = _this2.createNestedDataContainer(node.data[key], indentLevel + 1, path);
      nestedContainer.dataset.key = key; // Optional: set a data attribute for the key
      dataContainer.appendChild(nestedContainer);
      var addButton = document.createElement('button');
      addButton.innerText = 'Add Property';
      addButton.onclick = function () {
        return _this2.showAddPropertyForm(node, indentLevel, dataContainer);
      };

      // Add indentation to the button based on the indent level
      addButton.style.marginLeft = "".concat(indentLevel + 1 * 20, "px"); // adjust 20px to your preference

      dataContainer.appendChild(addButton);
    } else {
      var inputGroup = _this2.createInputGroup(node, key, indentLevel, path);
      dataContainer.appendChild(inputGroup);
    }
  });
  return dataContainer;
}
function showAddPropertyForm(node, indentLevel, parentElement) {
  var self = this;
  var form = document.createElement('form');
  var typeSelect = createTypeSelect();
  var valueInput = this.createValueInput('string'); // default type is string

  // Updating value input based on type selection
  typeSelect.onchange = function () {
    var selectedType = this.value;
    form.replaceChild(self.createValueInput(selectedType, indentLevel), valueInput);
    valueInput = form.elements.value;
  };
  form.appendChild(createLabelInputPair('Key', 'text', 'key'));
  form.appendChild(typeSelect);
  form.appendChild(valueInput);
  form.appendChild(createButton('Save', 'submit'));
  form.appendChild(createButton('Cancel'));

  // Cancel button functionality
  form.lastChild.onclick = function (event) {
    event.preventDefault();
    parentElement.removeChild(form);
  };
  form.onsubmit = function (event) {
    event.preventDefault();
    var key = event.target.elements.key.value;
    var value = parseValueFromInput(valueInput, typeSelect.value);
    if (indentLevel > 0) {
      // For nested objects, update the nestedNode instead of the main node
      self.addPropertyToNestedNode(node, key, value, parentElement, indentLevel);
    } else {
      addPropertyToNode(node, key, value);
      self.redrawComponent(node, indentLevel, parentElement);
    }
  };
  parentElement.appendChild(form);
}
function addPropertyToNestedNode(nestedNode, key, value, parentElement, indentLevel) {
  var _this3 = this;
  nestedNode[key] = value;
  // Redraw the nested object container
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  var newDataContent = this.createDataContainer({
    data: nestedNode
  }, indentLevel);
  parentElement.appendChild(newDataContent);
  parentElement.appendChild(createButton('Add Nested Property', 'button', function () {
    return _this3.showAddPropertyForm(nestedNode, indentLevel, parentElement);
  }));
}
function createLabelInputPair(labelText, inputType, inputName) {
  var label = document.createElement('label');
  label.textContent = "".concat(labelText, ": ");
  label.classList.add('data-label');
  var input = document.createElement('input');
  input.type = inputType;
  input.name = inputName;
  label.appendChild(input);
  return label;
}
function createTypeSelect() {
  var select = document.createElement('select');
  var types = ['string', 'number', 'boolean', 'object', 'array', 'function', 'null'];
  types.forEach(function (type) {
    var option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    select.appendChild(option);
  });
  return select;
}
function createValueInput(type) {
  var indentLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  switch (type) {
    case 'boolean':
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'value';
      return checkbox;
    case 'object':
      return this.createObjectInput(indentLevel + 1);
    case 'array':
      return createArrayInput();
    case 'function':
      return createFunctionInput();
    case 'null':
      var nullInput = document.createElement('input');
      nullInput.disabled = true;
      nullInput.name = 'value';
      return nullInput;
    default:
      var input = document.createElement('input');
      input.type = type;
      input.name = 'value';
      input.placeholder = 'Value';
      // input.classList.add('param-input');
      return input;
  }
}
function createObjectInput(indentLevel) {
  var self = this;
  var nestedNode = {}; // Initialize an empty object for nested data
  var container = document.createElement('div');
  container.className = "nested-data-container nested-level-".concat(indentLevel);
  var addButton = document.createElement('button');
  addButton.textContent = 'Add Nested Property';
  addButton.onclick = function () {
    self.showAddPropertyForm(nestedNode, indentLevel + 1, container);
  };
  container.appendChild(addButton);
  return container;
}
function createArrayInput() {
  var container = document.createElement('div');
  var addButton = document.createElement('button');
  addButton.textContent = 'Add Item';
  addButton.onclick = function () {
    container.appendChild(createArrayItemInput());
  };
  container.appendChild(addButton);
  return container;
}
function createFunctionInput() {
  var textarea = document.createElement('textarea');
  textarea.placeholder = 'Enter function body here...';
  return textarea;
}
function createKeyValuePairInput() {
  var container = document.createElement('div');
  var keyInput = document.createElement('input');
  keyInput.placeholder = 'Key';
  var valueInput = this.createValueInput('string'); // default to string
  container.appendChild(keyInput);
  container.appendChild(valueInput);
  return container;
}
function createArrayItemInput() {
  var itemContainer = document.createElement('div');
  var itemInput = this.createValueInput('string'); // default to string
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    itemContainer.remove();
  };
  itemContainer.appendChild(itemInput);
  itemContainer.appendChild(deleteButton);
  return itemContainer;
}
function parseValueFromInput(input, type) {
  console.log('parseValueFromInput', input, type);
  switch (type) {
    case 'number':
      return parseFloat(input.value) || 0;
    case 'boolean':
      return input.checked;
    case 'null':
      return null;
    default:
      return input.value;
  }
}
function createButton(text) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'button';
  var button = document.createElement('button');
  button.type = type;
  button.textContent = text;
  return button;
}
function addPropertyToNode(node, key, value) {
  // Assuming node.data is the object to update
  node.data[key] = value;
}

// TODO: what is going on with redrawComponent?
// it seems to not redraw actual component, just some sub-view
// it would be better if this instead just reloads the whole data view
// based on the current state of the tree
function redrawComponent(node, indentLevel, parentElement) {
  // get the exists gui-content
  var guiContent = this.sutraActionEditor.querySelector('.gui-content');
  // empty it
  guiContent.innerHTML = '';

  // redraw the node
  var dataContent = this.actionForm(node);
  guiContent.appendChild(dataContent);
  return;
  // Clear the existing content
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  // Redraw the component
  var newDataContent = this.createDataContainer(node, indentLevel);
  parentElement.appendChild(newDataContent);
}
function createNestedDataContainer(nestedNode, indentLevel) {
  var _this4 = this;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var nestedDataContainer = document.createElement('div');
  nestedDataContainer.className = 'nested-data-container nested-level-' + indentLevel;
  Object.keys(nestedNode).forEach(function (nestedKey) {
    var nestedPath = path ? "".concat(path, ".").concat(nestedKey) : nestedKey;
    // console.log('nestedPath', nestedPath)
    if (_typeof(nestedNode[nestedKey]) === 'object' && nestedNode[nestedKey] !== null) {
      var nestedLabel = _this4.createLabel(nestedKey, indentLevel);
      nestedDataContainer.appendChild(nestedLabel);
      var innerNestedContainer = _this4.createNestedDataContainer(nestedNode[nestedKey], indentLevel + 1, nestedPath);
      innerNestedContainer.dataset.key = nestedKey; // Optional
      nestedDataContainer.appendChild(innerNestedContainer);
    } else {
      var inputGroup = _this4.createInputGroup({
        data: nestedNode
      }, nestedKey, indentLevel, nestedPath);
      nestedDataContainer.appendChild(inputGroup);
    }
  });
  return nestedDataContainer;
}

},{"./actionForm.js":5}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = dataView;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function dataView(node) {
  var indentLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  this.createDataContainer = createDataContainer.bind(this);
  this.createNestedDataContainer = createNestedDataContainer.bind(this);
  this.createLabel = createLabel.bind(this);
  this.createValueDisplay = createValueDisplay.bind(this);
  var dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  dataContainer.classList.add('with-container');
  dataContainer.setAttribute('data-path', node.sutraPath);
  var withLabel = document.createElement('label');
  withLabel.className = 'with-label';
  withLabel.innerHTML = "<span class=\"sutra-keyword\">WITH</span>";
  dataContainer.appendChild(withLabel);
  var dataContent = this.createDataContainer(node, indentLevel);
  dataContainer.appendChild(dataContent);
  return dataContainer;
}
function createDataContainer(node, indentLevel) {
  var _this = this;
  var dataContainer = document.createElement('div');
  dataContainer.className = '';
  Object.keys(node.data).forEach(function (key) {
    var path = key;
    if (_typeof(node.data[key]) === 'object' && node.data[key] !== null) {
      var nestedLabel = _this.createLabel(key, indentLevel);
      dataContainer.appendChild(nestedLabel);
      var nestedContainer = _this.createNestedDataContainer(node.data[key], indentLevel + 1, path);
      dataContainer.appendChild(nestedContainer);
    } else {
      var valueDisplay = _this.createValueDisplay(key, node.data[key], indentLevel, path);
      dataContainer.appendChild(valueDisplay);
    }
  });
  return dataContainer;
}
function createNestedDataContainer(nestedNode, indentLevel) {
  var _this2 = this;
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var nestedDataContainer = document.createElement('div');
  nestedDataContainer.className = 'nested-data-container nested-level-' + indentLevel;
  Object.keys(nestedNode).forEach(function (nestedKey) {
    var nestedPath = path ? "".concat(path, ".").concat(nestedKey) : nestedKey;
    if (_typeof(nestedNode[nestedKey]) === 'object' && nestedNode[nestedKey] !== null) {
      var nestedLabel = _this2.createLabel(nestedKey, indentLevel);
      nestedDataContainer.appendChild(nestedLabel);
      var innerNestedContainer = _this2.createNestedDataContainer(nestedNode[nestedKey], indentLevel + 1, nestedPath);
      nestedDataContainer.appendChild(innerNestedContainer);
    } else {
      var valueDisplay = _this2.createValueDisplay(nestedKey, nestedNode[nestedKey], indentLevel, nestedPath);
      nestedDataContainer.appendChild(valueDisplay);
    }
  });
  return nestedDataContainer;
}
function createLabel(key, indentLevel) {
  var label = document.createElement('label');
  label.className = 'data-label';
  label.innerText = key;
  console.log("CRETING LABEL", key, indentLevel);
  label.style.paddingLeft = "".concat(indentLevel * 20, "px"); // Indentation for nesting
  return label;
}
function createValueDisplay(key, value, indentLevel, path) {
  var valueDisplayWrapper = document.createElement('div');
  valueDisplayWrapper.className = 'data-value-wrapper';
  valueDisplayWrapper.style.paddingLeft = "".concat(indentLevel * 20, "px");
  var label = document.createElement('label');
  label.className = 'data-key';
  label.innerText = key + ':';
  valueDisplayWrapper.appendChild(label);
  var valueDisplay = document.createElement('div');
  valueDisplay.className = 'data-value';
  valueDisplay.innerText = value;
  valueDisplayWrapper.appendChild(valueDisplay);
  valueDisplayWrapper.setAttribute('data-path', path);
  return valueDisplayWrapper;
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeFormsInDOMElement;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function serializeFormsInDOMElement(domElement) {
  var obj = {};

  // Function to process each form
  function processForm(form) {
    var formData = new FormData(form);
    var _iterator = _createForOfIteratorHelper(formData),
      _step;
    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];
        var keys = key.split('.');
        keys.reduce(function (acc, k, i) {
          if (i === keys.length - 1) {
            acc[k] = coerceType(value);
          } else {
            acc[k] = acc[k] || {};
          }
          return acc[k];
        }, obj);
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  // check to see if the DOM element is a form
  if (domElement.tagName === 'FORM') {
    processForm(domElement);
    return obj;
  }

  // Find and process all forms within the DOM element
  var forms = domElement.querySelectorAll('form');
  forms.forEach(function (form) {
    return processForm(form);
  });
  return obj;
}
function coerceType(value) {
  // Convert 'true' or 'false' to boolean
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  // Convert string number to actual number but avoid NaN
  var number = Number(value);
  if (!isNaN(number) && number.toString() === value) {
    return number;
  }

  // Return the original string if no conversion is applicable
  return value;
}

},{}]},{},[2])(2)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SutraGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var _drawTable = _interopRequireDefault(require("./lib/drawTable.js"));
var _dataView = _interopRequireDefault(require("./lib/editor/dataView.js"));
var _dataForm = _interopRequireDefault(require("./lib/editor/dataForm.js"));
var _actionForm = _interopRequireDefault(require("./lib/editor/actionForm.js"));
var _createLabel = _interopRequireDefault(require("./lib/editor/createLabel.js"));
var _editor = _interopRequireDefault(require("./lib/editor.js"));
var _serializeFormToJSON = _interopRequireDefault(require("./util/serializeFormToJSON.js"));
var _testRules = _interopRequireDefault(require("./testRules.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // SutraGUI.js - Marak Squires 2023
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
    this.showConditionalsForm = _editor["default"].showConditionalsForm.bind(this);
    this.createConditional = _editor["default"].createConditional.bind(this);
    this.createLabel = _createLabel["default"].bind(this);
    this.dataView = _dataView["default"].bind(this);
    this.dataForm = _dataForm["default"].bind(this);
    this.showActionForm = _actionForm["default"].bind(this);
    this.onConditionalTypeChange = _editor["default"].onConditionalTypeChange.bind(this);
    this.createConditionalForm = _editor["default"].createConditionalForm.bind(this);
    this.serializeFormToJSON = _serializeFormToJSON["default"].bind(this);
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
      var rules = (0, _testRules["default"])(game);

      // gui.setTheme('light');

      rules.onAny(function (ev, data, node) {
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

      var json = rules.serializeToJson();
      this.drawTable();
      this.drawBehaviorTree(JSON.parse(json));
      this.behavior = rules;
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
      this.redrawBehaviorTree();
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
    }
  }, {
    key: "viewSutraEnglish",
    value: function viewSutraEnglish() {
      var english = this.behavior.exportToEnglish();
      // TODO: add Sutra's i18n support
      //let cn = this.behavior.exportToEnglish(0, 'zh');
      //let ja = this.behavior.exportToEnglish(0, 'ja');
      // clear the #sutraTable
      var table = document.getElementById('sutraTable');
      table.innerHTML = '';
      // create a new div
      var englishDiv = document.createElement('textarea');
      // set height and width to 100%
      englishDiv.style.width = '95%';
      englishDiv.style.height = '800px';
      englishDiv.value = english;
      table.appendChild(englishDiv);
    }
  }, {
    key: "getEmitters",
    value: function getEmitters() {
      return this.game.emitters;
    }
  }, {
    key: "redrawBehaviorTree",
    value: function redrawBehaviorTree() {
      var _this2 = this;
      var json = this.behavior.serializeToJson();
      var container = document.getElementById('sutraTable');
      //let guiContent = container.querySelector('.gui-content');
      container.innerHTML = '';
      JSON.parse(json).tree.forEach(function (node) {
        container.appendChild(_this2.createNodeElement(node, 0));
      });
    }
  }, {
    key: "drawBehaviorTree",
    value: function drawBehaviorTree(json) {
      var _this3 = this;
      // get existing container
      var container = document.getElementById('sutraView');
      var table = document.getElementById('sutraTable');
      //let guiContent = container.querySelector('.gui-content');

      if (json.tree.length === 0) {
        // add message to indicate no sutra
        table.innerHTML = 'No Sutra Rules have been defined yet. Click "Add Rule" to begin.';
        return;
      }
      //let container = document.createElement('div');
      json.tree.forEach(function (node) {
        table.appendChild(_this3.createNodeElement(node, 1));
      });
      // Append this container to your GUI, adjust as needed
      //guiContent.appendChild(table);
      //container.appendChild(guiContent); // Example: appending to body
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
      var _this4 = this;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var keyword = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'IF';
      // Create a form element instead of a div
      var formElement = document.createElement('form');
      formElement.className = 'node-element-form';
      // formElement.style.marginLeft = `${indentLevel * 10}px`;

      // Generate a unique path identifier for the node
      var nodeId = path ? "".concat(path, "-").concat(node.action || node["if"]) : node.action || node["if"];

      // Create a div to hold the node contents
      var contentDiv = document.createElement('div');
      contentDiv.className = 'node-element';

      // Append buttons to the contentDiv
      //const addRuleBtn = this.createAddRuleButton(node.sutraPath);
      //formElement.appendChild(addRuleBtn);
      formElement.appendChild(contentDiv);
      if (node.action) {
        // add new className to formElement, action-node-form
        formElement.classList.add('action-node-form');
        // add click handler to formElement so that it opens showActionForm
        formElement.onclick = function () {
          _this4.showActionForm(node);
        };

        // formElement.classList.add('collapsible-content');
        this.appendActionElement(contentDiv, node, indentLevel, keyword);
      } else if (node["if"]) {
        this.appendConditionalElement(contentDiv, node, indentLevel);
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
          node.classList.remove('collapsed');
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

        actionSelectContainer.appendChild(withLabel);

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
            // condition.classList.toggle('collapsed');
            self.showConditionalsForm(node);
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
          self.showConditionalsForm(node);
        };
        conditionContainer.appendChild(condition);

        //const removeRuleBtn = self.createRemoveRuleButton(node.sutraPath);
        //condition.appendChild(removeRuleBtn);
      }

      return conditionContainer;
    }
  }, {
    key: "createElseElement",
    value: function createElseElement(node, indentLevel) {
      var _this5 = this;
      var keyword = "ELSE";
      var elseElement = document.createElement('div');
      elseElement.className = 'else-branch';
      node["else"].forEach(function (childNode) {
        return elseElement.appendChild(_this5.createNodeElement(childNode, indentLevel + 1, '', 'ELSE'));
      });
      return elseElement;
    }
  }, {
    key: "saveConditional",
    value: function saveConditional(conditionalName, form) {
      var json = this.serializeFormToJSON(form);
      console.log('SutraGui.saveConditional() called', conditionalName, json);
      this.behavior.updateCondition(conditionalName, json); // Update Sutra instance
      this.redrawBehaviorTree(); // Redraw the tree to reflect changes
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
      console.log('json', json);
      this.redrawBehaviorTree();
    }
  }, {
    key: "createAddRuleButton",
    value: function createAddRuleButton(nodeId) {
      var _this6 = this;
      var button = document.createElement('button');
      button.textContent = '+';
      button.className = 'rule-button rule-button-add';
      button.title = 'Add a new rule';
      button.setAttribute('data-id', nodeId);
      button.onclick = function (e) {
        _this6.handleAddRuleClick(e.target.getAttribute('data-id'));
        return false;
      };
      return button;
    }
  }, {
    key: "createRemoveRuleButton",
    value: function createRemoveRuleButton(nodeId) {
      var _this7 = this;
      var button = document.createElement('button');
      button.textContent = '-';
      button.className = 'rule-button rule-button-remove';
      button.title = 'Remove this rule';
      button.setAttribute('data-id', nodeId);
      button.onclick = function (e) {
        e.stopPropagation();
        _this7.handleRemoveRuleClick(e.target.getAttribute('data-id'));
      };
      return button;
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      this.bossHealth--;
      if (game.tick % 60 === 0) {
        // Clear previously highlighted elements
        document.querySelectorAll('.highlighted-sutra-node').forEach(function (node) {
          node.classList.remove('highlighted-sutra-node');
          // node.classList.add('collapsed');
        });
      }
      var _iterator = _createForOfIteratorHelper(game.entities.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            entityId = _step$value[0],
            entity = _step$value[1];
          this.behavior.tick(entity, game.data);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      // remove all html elements
      this.sutraView.remove();
    }
  }]);
  return SutraGUI;
}();
_defineProperty(SutraGUI, "id", 'gui-sutra');
var _default = exports["default"] = SutraGUI;

},{"../gui-editor/gui.js":1,"./lib/drawTable.js":3,"./lib/editor.js":4,"./lib/editor/actionForm.js":5,"./lib/editor/createLabel.js":7,"./lib/editor/dataForm.js":8,"./lib/editor/dataView.js":9,"./testRules.js":10,"./util/serializeFormToJSON.js":11}],3:[function(require,module,exports){
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
  var guiContent = this.sutraView.querySelector('.gui-content');

  // set background color to transparent
  this.sutraView.style.backgroundColor = 'transparent';
  var slider = createOpacitySlider(this.sutraView);

  // Create and append the new footer
  var footer = document.createElement('div');
  footer.className = 'gui-window-footer';
  guiContent.appendChild(showSutraButton);
  guiContent.appendChild(viewJsonButton);
  guiContent.appendChild(readSutraButton);
  guiContent.appendChild(slider);
  guiContent.appendChild(table);

  // add <br>
  guiContent.appendChild(document.createElement('br'));
  guiContent.appendChild(addRuleButton);

  // create save button
  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = function () {
    return _this.saveSutra();
  };
  footer.appendChild(saveButton);

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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

editor.showConditionalsForm = function showConditionalsForm(node) {
  var _this3 = this;
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
  console.log('node', node);
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
      _this3.showActionForm(node.then[0]);
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
      _this3.createConditionalForm(conditionalName, node);
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
        var subCondition = _this3.behavior.getCondition(condName);
        _this3.createConditionalForm(condName, node);
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
};
editor.createConditionalForm = function createConditionalForm(conditionalName, node) {
  var _this4 = this;
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
        _this4.showFunctionEditor("".concat(conditionalName, "-").concat(index), cond, container);
      } else if (_typeof(cond) === 'object') {
        _this4.showObjectEditor("".concat(conditionalName, "-").concat(index), cond, _this4.behavior.operators, container);
      } else {
        console.log('Unknown conditional type in array');
      }
      var guiContent = _this4.sutraFormView.querySelector('.gui-content');
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

},{}],8:[function(require,module,exports){
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

},{"./actionForm.js":5}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = testRules;
var _index = _interopRequireDefault(require("../../../../sutra/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import sutra from '@yantra-core/sutra';

function testRules(game) {
  var rules = new _index["default"].Sutra();
  // return rules;

  // Define health level conditions for the boss
  var healthLevels = [800, 600, 400, 200, 0];
  var colors = [0x00ff00, 0x99ff00, 0xffff00, 0xff9900, 0xff0000]; // Green to Red
  // New color when the spawner is idle (not spawning)
  var idleSpawnerColor = 0x777777; // Gray color
  var activeSpawnerColor = 0xff0000; // Green color

  // Custom function for 'isBoss' condition
  rules.addCondition('isBoss', function (entity) {
    return entity.type === 'BOSS';
  });

  // use custom function for condition
  rules.addCondition('isBoss', function (entity) {
    return entity.type === 'BOSS';
  });
  // rules.addCondition('isSpawner', (entity) => entity.type === 'SPAWNER');

  // use standard Sutra DSL for condition
  rules.addCondition('isSpawner', {
    op: 'eq',
    property: 'type',
    value: 'SPAWNER'
  });

  // use standard Sutra DSL for condition
  rules.addCondition('isHealthLow', {
    op: 'lessThan',
    property: 'health',
    value: 50
  });
  rules.addCondition('blockCountLessThan5', {
    op: 'lessThan',
    gamePropertyPath: 'ents.BLOCK.length',
    value: 5
  });

  /*
  rules.addCondition('isDead', {
    op: 'lte',
    property: 'health',
    value: 0
  });
  */

  rules.on('entity::updateEntity', function (entity, node) {
    // create a new object that merges the entity and data
    //let updatedEntity = Object.assign({}, { id: entity.id }, data.data);
    // console.log("entity::updateEntity", entity, node);
    game.systems.entity.inflateEntity(entity);
    //game.emit('entity::updateEntity', entity);
  });

  rules.on('entity::createEntity', function (entity, node) {
    console.log("entity::createEntity", entity, node);
    game.systems.entity.createEntity(node.data);
    //game.emit('entity::createEntity', entity);
  });

  rules.addCondition('timerCompleted', function (entity) {
    // check if entities has timers and timer with name 'test-timer' is completed
    var timerDone = false;
    // TODO: remove this, should iterate and know timer names
    if (entity.timers && entity.timers.timers && entity.timers.timers['test-timer'] && entity.timers.timers['test-timer'].done) {
      timerDone = true;
      // set time done to false on origin timer
      entity.timers.timers['test-timer'].done = false;
    }
    return timerDone;
    //return entity.timerDone;
  });

  rules.addCondition('blockCountBetween5and10', [{
    op: 'greaterThan',
    gamePropertyPath: 'ents.BLOCK.length',
    value: 5
  }, {
    op: 'lessThan',
    gamePropertyPath: 'ents.BLOCK.length',
    value: 10
  }]);
  rules.on('consoleLog', function (entity, node) {
    console.log("consoleLog", entity, node);
  });

  /*
  rules.addAction({
    if: 'blockCountBetween5and10',
    then: [{ action: 'consoleLog' }]
  });
  */

  function generateRandomPosition() {
    var x = Math.random() * 100 - 50; // Example range, adjust as needed
    var y = Math.random() * 100 - 50; // Example range, adjust as needed
    return {
      x: x,
      y: y
    };
  }

  // Adding a new condition to check if the entity is a block
  rules.addCondition('isBlock', function (entity) {
    return entity.type === 'BLOCK';
  });
  // () => ({ position: generateRandomPosition() })
  // Action to move all blocks when timerCompleted
  // Function to generate random positions
  function generateRandomPosition() {
    var x = Math.random() * 1000 - 500; // Example range, adjust as needed
    var y = Math.random() * 1000 - 500; // Example range, adjust as needed
    return {
      x: x,
      y: y
    };
  }
  function logger() {
    console.log('FFFFFFFF');
  }
  // Action to move all blocks when timerCompleted
  rules.addAction({
    "if": 'timerCompleted',
    then: [{
      "if": 'isBlock',
      then: [{
        action: 'entity::updateEntity',
        data: {
          color: 'generateRandomColorInt',
          position: 'generateRandomPosition'
        }
      }]
    }, {
      "if": 'isSpawner',
      then: [{
        "if": ['blockCountLessThan5', 'spawnerHealthAbove50'],
        then: [{
          action: 'entity::updateEntity',
          data: {
            color: activeSpawnerColor
          }
        }, {
          action: 'entity::createEntity',
          data: {
            type: 'BLOCK',
            color: generateRandomColorInt,
            height: 20,
            width: 20,
            position: {
              x: 0,
              y: -200
            }
          }
        }],
        "else": [{
          action: 'entity::updateEntity',
          data: {
            color: idleSpawnerColor
          }
        }]
      }]
    }]
  });

  // Action for the boss based on health levels
  rules.addAction({
    "if": 'isBoss',
    then: healthLevels.map(function (level, index) {
      return {
        "if": "isHealthBelow".concat(level),
        then: [{
          action: 'entity::updateEntity',
          data: {
            color: colors[index],
            speed: 5
          }
        }]
      };
    })
  });
  rules.addAction({
    "if": 'isBoss',
    then: [{
      "if": 'isHealthLow',
      then: [{
        action: 'entity::updateEntity',
        data: {
          color: 0xff0000,
          speed: 5
        } // Example with multiple properties
      }]
    }]
  });

  function generateRandomColorInt() {
    return Math.floor(Math.random() * 255);
  }

  // Composite AND condition
  rules.addCondition('isBossAndHealthLow', {
    op: 'and',
    conditions: ['isBoss', 'isHealthLow']
  });

  // New condition for spawner health
  rules.addCondition('spawnerHealthAbove50', {
    op: 'greaterThan',
    property: 'health',
    value: 50
  });

  // Adding health level conditions
  healthLevels.forEach(function (level, index) {
    rules.addCondition("isHealthBelow".concat(level), {
      op: 'lessThan',
      property: 'health',
      value: level
    });
  });
  rules.addAction({
    "if": 'isBossAndHealthLow',
    then: [{
      action: 'testAction'
    }]
  });

  // Custom function conditions to check entity count
  rules.addCondition('blockCountEquals0', function (data, gameState) {
    return gameState.ents.BLOCK.length === 0;
  });
  rules.addCondition('bossCountEquals0', function (data, gameState) {
    return gameState.ents.BOSS.length === 0;
  });
  rules.addCondition('spawnerCountEquals0', function (data, gameState) {
    return gameState.ents.SPAWNER.length === 0;
  });

  // Composite condition to check if all counts are zero
  rules.addCondition('allEntitiesCountZero', {
    op: 'and',
    conditions: ['spawnerCountEquals0', 'blockCountEquals0', 'bossCountEquals0']
  });

  // Action to end the round
  rules.addAction({
    "if": 'allEntitiesCountZero',
    then: [{
      action: 'endRound'
    }]
  });
  rules.on('endRound', function () {
    console.log('Ending round as all BLOCK, BOSS, and SPAWNER counts are zero.');
    // Implement the logic to end the round
    // respawn the spawner
    var ent = game.createEntity({
      type: 'SPAWNER',
      destroyed: false,
      health: 100,
      width: 200,
      height: 200,
      depth: 200,
      position: {
        x: -800,
        y: -800
      }
    });
    // alert("YOU ARE THE WINRAR")
  });

  return rules;
}

},{"../../../../sutra/index.js":12}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Sutra = _interopRequireDefault(require("./lib/Sutra.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sutra = {};
sutra.Sutra = _Sutra["default"];
sutra.createSutra = function () {
  return new _Sutra["default"]();
};
var _default = exports["default"] = sutra;

},{"./lib/Sutra.js":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _exportToEnglish = _interopRequireDefault(require("./exportToEnglish.js"));
var _serializeToJson = _interopRequireDefault(require("./serializeToJson.js"));
var _evaluateCondition = _interopRequireDefault(require("./evaluateCondition.js"));
var _evaluateSingleCondition = _interopRequireDefault(require("./evaluateSingleCondition.js"));
var _evaluateDSLCondition = _interopRequireDefault(require("./evaluateDSLCondition.js"));
var _evaluateCompositeCondition = _interopRequireDefault(require("./evaluateCompositeCondition.js"));
var _parsePath = _interopRequireDefault(require("./parsePath.js"));
var _operatorAliases = _interopRequireDefault(require("./operatorAliases.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var logger = function logger() {};
// logger = console.log.bind(console);
var Sutra = /*#__PURE__*/function () {
  function Sutra() {
    _classCallCheck(this, Sutra);
    this.tree = [];
    this.conditions = {};
    this.listeners = {};
    this.operators = ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'and', 'or', 'not'];
    this.operatorAliases = _operatorAliases["default"];
    this.exportToEnglish = _exportToEnglish["default"];
    this.serializeToJson = _serializeToJson["default"];
    this.evaluateCondition = _evaluateCondition["default"];
    this.evaluateSingleCondition = _evaluateSingleCondition["default"];
    this.evaluateDSLCondition = _evaluateDSLCondition["default"];
    this.evaluateCompositeCondition = _evaluateCompositeCondition["default"];
    this.parsePath = _parsePath["default"];
    this.nodeIdCounter = 0; // New property to keep track of node IDs
  }
  _createClass(Sutra, [{
    key: "on",
    value: function on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      // Trigger all listeners for this specific event
      if (this.listeners[event]) {
        this.listeners[event].forEach(function (listener) {
          return listener.apply(void 0, args);
        });
      }
      // Trigger all 'any' listeners, regardless of the event type
      if (this.anyListeners) {
        this.anyListeners.forEach(function (listener) {
          return listener.apply(void 0, [event].concat(args));
        });
      }
    }
  }, {
    key: "onAny",
    value: function onAny(listener) {
      // Initialize the anyListeners array if it doesn't exist
      this.anyListeners = this.anyListeners || [];
      this.anyListeners.push(listener);
    }
  }, {
    key: "addAction",
    value: function addAction(node) {
      this.tree.push(node);
      this.generateSutraPath(node, 'tree', this.tree.length - 1, null);
    }
  }, {
    key: "addCondition",
    value: function addCondition(name, conditionObj) {
      var _this = this;
      this.originalConditions = this.originalConditions || {};
      if (Array.isArray(conditionObj)) {
        this.conditions[name] = conditionObj.map(function (cond) {
          if (typeof cond === 'function') {
            _this.originalConditions[name] = _this.originalConditions[name] || [];
            _this.originalConditions[name].push({
              type: 'function',
              func: cond
            });
            return {
              func: function func(data, gameState) {
                return cond(data, gameState);
              },
              original: null
            };
          } else {
            _this.originalConditions[name] = _this.originalConditions[name] || [];
            _this.originalConditions[name].push(cond);
            var conditionFunc = function conditionFunc(data, gameState) {
              return _this.evaluateDSLCondition(cond, data, gameState);
            };
            return {
              func: conditionFunc,
              original: cond
            };
          }
        });
      } else {
        this.storeSingleCondition(name, conditionObj);
      }
    }
  }, {
    key: "removeCondition",
    value: function removeCondition(name) {
      if (this.conditions[name]) {
        delete this.conditions[name];
        if (this.originalConditions && this.originalConditions[name]) {
          delete this.originalConditions[name];
        }
        return true;
      }
      return false; // Condition name not found
    }
  }, {
    key: "updateCondition",
    value: function updateCondition(name, newConditionObj) {
      var _this2 = this;
      if (!this.conditions[name]) {
        return false;
      }
      // If the new condition is a function, update directly
      if (typeof newConditionObj === 'function') {
        this.conditions[name] = newConditionObj;
      } else if (_typeof(newConditionObj) === 'object') {
        // Handle if newConditionObj is an array
        if (Array.isArray(newConditionObj)) {
          // Update each condition in the array
          newConditionObj.forEach(function (condition) {
            if (condition.op === 'and' || condition.op === 'or' || condition.op === 'not') {
              // Composite condition for each element in the array
              var conditionFunc = function conditionFunc(data, gameState) {
                return _this2.evaluateDSLCondition(condition, data, gameState);
              };
              conditionFunc.original = condition;
              _this2.conditions[name] = conditionFunc;
            } else {
              // DSL condition for each element in the array
              var _conditionFunc = function _conditionFunc(data, gameState) {
                return _this2.evaluateDSLCondition(condition, data, gameState);
              };
              _conditionFunc.original = condition;
              _this2.conditions[name] = _conditionFunc;
            }
          });
        } else if (newConditionObj.op === 'and' || newConditionObj.op === 'or' || newConditionObj.op === 'not') {
          // Composite condition
          var conditionFunc = function conditionFunc(data, gameState) {
            return _this2.evaluateDSLCondition(newConditionObj, data, gameState);
          };
          conditionFunc.original = newConditionObj;
          this.conditions[name] = conditionFunc;
        } else {
          // DSL condition
          var _conditionFunc2 = function _conditionFunc2(data, gameState) {
            return _this2.evaluateDSLCondition(newConditionObj, data, gameState);
          };
          _conditionFunc2.original = newConditionObj;
          this.conditions[name] = _conditionFunc2;
        }
      } else {
        return false;
      }
      // Update original conditions for GUI use
      this.originalConditions[name] = newConditionObj;
      return true;
    }
  }, {
    key: "storeSingleCondition",
    value: function storeSingleCondition(name, conditionObj) {
      var _this3 = this;
      // Store the original condition object separately for GUI use
      if (!(typeof conditionObj === 'function' && conditionObj.original)) {
        this.originalConditions = this.originalConditions || {};
        this.originalConditions[name] = conditionObj;
      }
      if (conditionObj.op === 'and' || conditionObj.op === 'or' || conditionObj.op === 'not') {
        // Store composite conditions directly
        this.conditions[name] = conditionObj;
        this.originalConditions[name] = conditionObj;
      } else if (typeof conditionObj === 'function') {
        // Wrap custom function conditions to include gameState
        this.conditions[name] = function (data, gameState) {
          var val = false;
          try {
            val = conditionObj(data, gameState);
          } catch (err) {
            // console.log('warning: error in condition function', err)
          }
          return val;
        };
      } else {
        // For DSL conditions, pass gameState to the evaluateDSLCondition function
        var conditionFunc = function conditionFunc(data, gameState) {
          return _this3.evaluateDSLCondition(conditionObj, data, gameState);
        };
        conditionFunc.original = conditionObj;
        this.conditions[name] = conditionFunc;
      }
    }
  }, {
    key: "resolveOperator",
    value: function resolveOperator(operator) {
      return this.operatorAliases[operator] || operator;
    }

    // Method to set or update aliases
  }, {
    key: "setOperatorAlias",
    value: function setOperatorAlias(alias, operator) {
      this.operatorAliases[alias] = operator;
    }
  }, {
    key: "getConditionFunction",
    value: function getConditionFunction(name) {
      return this.conditions[name];
    }
  }, {
    key: "getCondition",
    value: function getCondition(name) {
      return this.originalConditions ? this.originalConditions[name] : undefined;
    }
  }, {
    key: "getOperators",
    value: function getOperators() {
      return Object.keys(this.operatorAliases);
    }

    // Updated to pass entity data to condition evaluation
  }, {
    key: "traverseNode",
    value: function traverseNode(node, data, gameState) {
      if (node.action) {
        this.executeAction(node.action, data, node, gameState); // Execute action
      } else {
        // Evaluate the top-level condition
        // const conditionMet = node.if ? this.evaluateCondition(node.if, data) : true;
        var conditionMet = node["if"] ? this.evaluateCondition(node["if"], data, gameState) : true;
        // Process 'then' and 'else' blocks based on the condition
        if (conditionMet) {
          this.processBranch(node.then, data, gameState);
        } else {
          this.processBranch(node["else"], data, gameState);
        }
      }
    }
  }, {
    key: "processBranch",
    value: function processBranch(branch, data, gameState) {
      var _this4 = this;
      if (Array.isArray(branch)) {
        branch.forEach(function (childNode) {
          return _this4.traverseNode(childNode, data, gameState);
        });
      }
    }
  }, {
    key: "executeAction",
    value: function executeAction(action, data, node, gameState) {
      // check data to see if any of the keys at the first level are functions
      // if so, execute them and replace the value with the result
      // this is to allow for dynamic data to be passed to the action
      var object = {};
      if (!node.data) {
        node.data = {};
      }
      var entityData = data;
      Object.entries(entityData).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        if (typeof value === 'function') {
          object[key] = value(gameState);
        } else {
          object[key] = value;
        }
      });
      Object.entries(node.data).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        if (typeof value === 'function') {
          object[key] = value(gameState);
        } else {
          object[key] = value;
        }
      });
      var mergedData = object;
      this.emit(action, mergedData, node, gameState);
    }
  }, {
    key: "updateEntity",
    value: function updateEntity(entity, updateData, gameState) {
      Object.entries(updateData).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        if (typeof value === 'function') {
          entity[key] = value();
        } else {
          entity[key] = value;
        }
      });
    }
  }, {
    key: "generateSutraPath",
    value: function generateSutraPath(node, parentPath, index, parent) {
      var _this5 = this;
      var path = index === -1 ? parentPath : "".concat(parentPath, "[").concat(index, "]");
      node.sutraPath = path;
      node.parent = parent; // Set the parent reference

      if (node.then && Array.isArray(node.then)) {
        node.then.forEach(function (child, idx) {
          return _this5.generateSutraPath(child, "".concat(path, ".then"), idx, node);
        });
      }
      if (node["else"] && Array.isArray(node["else"])) {
        node["else"].forEach(function (child, idx) {
          return _this5.generateSutraPath(child, "".concat(path, ".else"), idx, node);
        });
      }
    }
  }, {
    key: "getNestedValue",
    value: function getNestedValue(obj, path) {
      var pathArray = this.parsePath(path);
      return pathArray.reduce(function (current, part) {
        return current && current[part] !== undefined ? current[part] : undefined;
      }, obj);
    }
  }, {
    key: "findNode",
    value: function findNode(path) {
      // Remark: findNode is intentionally not recursive / doesn't use visitor pattern
      //         This choice is based on performance considerations
      //         Feel free to create a benchmark to compare the performance of this
      var obj = this;
      var pathArray = this.parsePath(path);
      var current = obj;
      var _iterator = _createForOfIteratorHelper(pathArray),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var part = _step.value;
          if (current[part] === undefined) {
            return undefined;
          }
          current = current[part];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return current;
    }
  }, {
    key: "removeNode",
    value: function removeNode(path) {
      // Split the path into segments and find the parent node and the index of the node to be removed
      var pathArray = this.parsePath(path);
      var current = this;
      for (var i = 0; i < pathArray.length - 1; i++) {
        var part = pathArray[i];
        if (current[part] === undefined) {
          return; // Node doesn't exist, nothing to remove
        }

        current = current[part];
      }
      var nodeToRemoveIndex = pathArray[pathArray.length - 1];
      if (Array.isArray(current) && typeof nodeToRemoveIndex === 'number') {
        // If current is an array and nodeToRemoveIndex is an index, use splice
        if (current.length > nodeToRemoveIndex) {
          current.splice(nodeToRemoveIndex, 1);

          // Reconstruct the parentPath
          var parentPath = pathArray.slice(0, -1).reduce(function (acc, curr, idx) {
            // Append array indices with brackets and property names with dots
            return idx === 0 ? curr : !isNaN(curr) ? "".concat(acc, "[").concat(curr, "]") : "".concat(acc, ".").concat(curr);
          }, '');

          // Update sutraPath for subsequent nodes in the same array
          this.updateSutraPaths(current, nodeToRemoveIndex, parentPath);
        }
      } else if (current[nodeToRemoveIndex] !== undefined) {
        // If it's a regular object property
        delete current[nodeToRemoveIndex];
      }
    }
  }, {
    key: "updateSutraPaths",
    value: function updateSutraPaths(nodes, startIndex, parentPath) {
      for (var i = startIndex; i < nodes.length; i++) {
        // Convert dot notation to bracket notation for indices in the parentPath
        var adjustedParentPath = parentPath.replace(/\.(\d+)(?=\[|$)/g, '[$1]');
        this.generateSutraPath(nodes[i], adjustedParentPath, i, nodes[i].parent);
      }
    }
  }, {
    key: "updateNode",
    value: function updateNode(path, newNodeData) {
      var node = this.findNode(path);
      if (node) {
        Object.assign(node, newNodeData);
        return true;
      }
      return false;
    }
  }, {
    key: "tick",
    value: function tick(data) {
      var _this6 = this;
      var gameState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.tree.forEach(function (node) {
        return _this6.traverseNode(node, data, gameState);
      });
    }
  }, {
    key: "getReadableSutraPath",
    value: function getReadableSutraPath(sutraPath) {
      var node = this.findNode(sutraPath);
      if (!node) return 'Invalid path';

      // Recursive function to build the readable path
      var buildPath = function buildPath(node) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        if (!node.parent) return path;
        var parent = node.parent;
        var part = parent["if"] ? "".concat(parent["if"]) : parent.action ? "".concat(parent.action) : 'unknown';
        var newPath = part + (path ? ' and ' + path : '');
        return buildPath(parent, newPath);
      };
      return buildPath(node);
    }
  }]);
  return Sutra;
}();
var _default = exports["default"] = Sutra;

},{"./evaluateCompositeCondition.js":14,"./evaluateCondition.js":15,"./evaluateDSLCondition.js":16,"./evaluateSingleCondition.js":17,"./exportToEnglish.js":18,"./operatorAliases.js":19,"./parsePath.js":20,"./serializeToJson.js":21}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateCompositeCondition;
function evaluateCompositeCondition(conditionObj, data, gameState) {
  var _this = this;
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  switch (conditionObj.op) {
    case 'and':
      return conditionObj.conditions.every(function (cond) {
        return _this.evaluateCondition(cond, targetData, gameState);
      });
    case 'or':
      return conditionObj.conditions.some(function (cond) {
        return _this.evaluateCondition(cond, targetData, gameState);
      });
    case 'not':
      // Assuming 'not' operator has a single condition
      return !this.evaluateCondition(conditionObj.condition, targetData, gameState);
    default:
      return false;
  }
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateCondition;
function evaluateCondition(condition, data, gameState) {
  var _this = this;
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  if (typeof condition === 'string') {
    var conditionEntry = this.conditions[condition];
    if (conditionEntry) {
      if (Array.isArray(conditionEntry)) {
        return conditionEntry.every(function (cond) {
          return typeof cond.func === 'function' ? cond.func(targetData, gameState) : _this.evaluateDSLCondition(cond.original, targetData, gameState);
        });
      } else if (['and', 'or', 'not'].includes(conditionEntry.op)) {
        // Handling composite conditions
        return this.evaluateCompositeCondition(conditionEntry, targetData, gameState);
      } else {
        return this.evaluateSingleCondition(conditionEntry, targetData, gameState);
      }
    }
  } else if (typeof condition === 'function') {
    return condition(targetData, gameState);
  } else if (Array.isArray(condition)) {
    return condition.every(function (cond) {
      return _this.evaluateCondition(cond, targetData, gameState);
    });
  }
  return false;
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateDSLCondition;
function evaluateDSLCondition(conditionObj, data, gameState) {
  var _this = this;
  var operator = this.resolveOperator(conditionObj.op);
  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  var targetValue;
  if (conditionObj.gamePropertyPath) {
    // Use getNestedValue for deeply nested properties in gameState
    targetValue = this.getNestedValue(gameState, conditionObj.gamePropertyPath);
  } else if (conditionObj.gameProperty) {
    // Use gameState for top-level properties
    targetValue = gameState[conditionObj.gameProperty];
  } else {
    // Use data for entity properties
    targetValue = targetData[conditionObj.property];
  }
  if (typeof targetValue === 'undefined') {
    targetValue = 0;
  }
  switch (operator) {
    case 'lessThan':
      return targetValue < conditionObj.value;
    case 'greaterThan':
      return targetValue > conditionObj.value;
    case 'equals':
      return targetValue === conditionObj.value;
    case 'notEquals':
      return targetValue !== conditionObj.value;
    case 'lessThanOrEqual':
      return targetValue <= conditionObj.value;
    case 'greaterThanOrEqual':
      return targetValue >= conditionObj.value;
    case 'and':
      return conditionObj.conditions.every(function (cond) {
        return _this.evaluateDSLCondition(cond, targetData, gameState);
      });
    case 'or':
      return conditionObj.conditions.some(function (cond) {
        return _this.evaluateDSLCondition(cond, targetData, gameState);
      });
    case 'not':
      return !this.evaluateDSLCondition(conditionObj.condition, targetData, gameState);
    default:
      return false;
  }
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = evaluateSingleCondition;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function evaluateSingleCondition(condition, data, gameState) {
  // logger('Evaluating condition', condition, data);

  var targetData;
  if (typeof data === 'function') {
    targetData = data(gameState);
  } else {
    targetData = data;
  }
  if (typeof condition === 'string') {
    var conditionEntry = this.conditions[condition];
    if (conditionEntry) {
      // Handle composite conditions
      if (['and', 'or', 'not'].includes(conditionEntry.op)) {
        return this.evaluateCompositeCondition(conditionEntry, targetData, gameState);
      }

      // Handle named function conditions
      if (typeof conditionEntry === 'function') {
        return conditionEntry(targetData, gameState); // Pass gameState here
      }

      // Handle DSL conditions
      if (_typeof(conditionEntry.original) === 'object') {
        return this.evaluateDSLCondition(conditionEntry.original, targetData, gameState); // Pass gameState here
      }
    }
  }

  // Handle direct function conditions
  if (typeof condition === 'function') {
    return condition(targetData, gameState); // Pass gameState here
  }

  // Handle if condition is array of conditions
  /* Remark: needs tests before we should add this, may be working already
  if (Array.isArray(condition)) {
    return condition.every(cond => this.evaluateCondition(cond, targetData, gameState)); // Pass gameState here
  }
  */

  // logger('Evaluating unrecognized condition');
  return false;
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exportToEnglish;
// Example language configuration object
var languageConfig = {
  en: {
    // English
    ifKeyword: "if",
    thenKeyword: "then",
    elseKeyword: "else"
    // Add more keywords or phrases as needed
  },

  zh: {
    // Mandarin
    ifKeyword: "如果",
    // Rúguǒ
    thenKeyword: "那么",
    // Nàme
    elseKeyword: "否则" // Fǒuzé
  },

  ja: {
    // Japanese
    ifKeyword: "もし",
    // Moshi
    thenKeyword: "ならば",
    // Naraba
    elseKeyword: "それ以外" // Sore igai
  }
  // You can add more languages here
};

function exportToEnglish() {
  var indentLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var langKeywords = languageConfig[lang] || languageConfig.en; // Fallback to English if the language is not found

  var describeAction = function describeAction(node, indentLevel) {
    var currentIndent = ' '.repeat(indentLevel * 4);
    var nextIndent = ' '.repeat((indentLevel + 1) * 4);
    if (node.action) {
      return "".concat(currentIndent, "'").concat(node.action, "'");
    } else if (node["if"]) {
      var description = "".concat(currentIndent).concat(langKeywords.ifKeyword, " ").concat(node["if"]);
      if (node.then) {
        var thenDescription = node.then.map(function (childNode) {
          return describeAction(childNode, indentLevel + 1);
        }).join('\n');
        description += " ".concat(langKeywords.thenKeyword, "\n").concat(thenDescription);
      }
      if (node["else"]) {
        var elseDescription = node["else"].map(function (childNode) {
          return describeAction(childNode, indentLevel + 1);
        }).join('\n');
        description += "\n".concat(currentIndent).concat(langKeywords.elseKeyword, "\n").concat(elseDescription);
      }
      return description;
    }
    return '';
  };
  return this.tree.map(function (node) {
    return describeAction(node, indentLevel);
  }).join('.\n').concat('.');
}

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  eq: 'equals',
  '==': 'equals',
  neq: 'notEquals',
  '!=': 'notEquals',
  lt: 'lessThan',
  '<': 'lessThan',
  lte: 'lessThanOrEqual',
  '<=': 'lessThanOrEqual',
  gt: 'greaterThan',
  '>': 'greaterThan',
  gte: 'greaterThanOrEqual',
  '>=': 'greaterThanOrEqual',
  '&&': 'and',
  '||': 'or',
  '!': 'not'
};

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parsePath;
function parsePath(path) {
  return path.split('.').reduce(function (acc, part) {
    var arrayMatch = part.match(/([^\[]+)(\[\d+\])?/);
    if (arrayMatch) {
      acc.push(arrayMatch[1]);
      if (arrayMatch[2]) {
        acc.push(parseInt(arrayMatch[2].replace(/[\[\]]/g, '')));
      }
    }
    return acc;
  }, []);
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = serializeToJson;
var _excluded = ["parent"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function serializeToJson() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$includeSutraPath = _ref.includeSutraPath,
    includeSutraPath = _ref$includeSutraPath === void 0 ? true : _ref$includeSutraPath;
  includeSutraPath = true;
  var serializedData = {
    tree: this.tree.map(function (node) {
      return serializeNode(node, includeSutraPath);
    }),
    conditions: {}
  };

  // Serialize the DSL part of conditions correctly
  for (var key in this.conditions) {
    var condition = this.conditions[key];
    if (Array.isArray(condition)) {
      // Handle each condition in the array
      serializedData.conditions[key] = condition.map(function (cond) {
        if (typeof cond === 'function') {
          // Condition is a function
          return _typeof(cond.original) === 'object' ? cond.original : {
            type: 'customFunction'
          };
        } else if (_typeof(cond) === 'object') {
          // Condition is an object (assumed to be a DSL condition)
          return cond;
        }
      });
    } else if (typeof condition === 'function') {
      // Single condition is a function
      serializedData.conditions[key] = _typeof(condition.original) === 'object' ? condition.original : {
        type: 'customFunction'
      };
    } else if (_typeof(condition) === 'object') {
      // Single condition is an object (assumed to be a DSL condition)
      serializedData.conditions[key] = condition;
    }
  }
  return JSON.stringify(serializedData, null, 2);
}

// Helper function to serialize a single node
function serializeNode(node, includeSutraPath) {
  var parent = node.parent,
    serializedNode = _objectWithoutProperties(node, _excluded); // Exclude the parent property

  // Recursively serialize 'then' and 'else' branches
  if (serializedNode.then && Array.isArray(serializedNode.then)) {
    serializedNode.then = serializedNode.then.map(function (childNode) {
      return serializeNode(childNode, includeSutraPath);
    });
  }
  if (serializedNode["else"] && Array.isArray(serializedNode["else"])) {
    serializedNode["else"] = serializedNode["else"].map(function (childNode) {
      return serializeNode(childNode, includeSutraPath);
    });
  }

  // Optional: Handle sutraPath based on includeSutraPath flag
  /*
  if (!includeSutraPath) {
    delete serializedNode.sutraPath;
  }
  */

  return serializedNode;
}

},{}]},{},[2])(2)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SutraGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _gui = _interopRequireDefault(require("../gui-editor/gui.js"));
var _sutra = _interopRequireDefault((typeof window !== "undefined" ? window['Sutra'] : typeof global !== "undefined" ? global['Sutra'] : null));
var _drawTable = _interopRequireDefault(require("./lib/drawTable.js"));
var _editor = _interopRequireDefault(require("./lib/editor.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // SutraGUI.js - Marak Squires 2023
//import sutra from '../../../../sutra/index.js';
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
    this.showAddConditionalForm = _editor["default"].showAddConditionalForm.bind(this);
    this.createConditional = _editor["default"].createConditional.bind(this);
    this.onConditionalTypeChange = _editor["default"].onConditionalTypeChange.bind(this);
  }
  _createClass(SutraGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      var rules = new _sutra["default"].Sutra();

      // use custom function for condition
      rules.addCondition('isBoss', function (entity) {
        return entity.type === 'BOSS';
      });
      rules.addCondition('isSpawner', function (entity) {
        return entity.type === 'SPAWNER';
      });

      /*
      // could also be written as:
      sutra.addCondition('isBoss', {
        operator: 'equals',
        property: 'type',
        value: 'BOSS'
      });
      */

      // use standard Sutra DSL for condition
      rules.addCondition('isHealthLow', {
        op: 'lessThan',
        property: 'health',
        value: 50
      });

      /*
      rules.addCondition('isDead', {
        op: 'lte',
        property: 'health',
        value: 0
      });
      */

      rules.on('entity::updateEntity', function (entity) {
        // console.log('entity::updateEntity', entity)
        //game.systems.entity.inflateEntity(entity);
        game.emit('entity::updateEntity', entity);
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

      rules.addAction({
        "if": 'isSpawner',
        then: [{
          "if": 'timers::done',
          then: [{
            action: 'entity::createEntity',
            data: {
              type: 'BOSS',
              height: 555,
              width: 222
            }
          }]
        }]
      });
      rules.addCondition('timers::done', function (entity, timerName) {
        return entity.timers.checkTimer(timerName);
      });

      // Composite AND condition
      rules.addCondition('isBossAndHealthLow', {
        op: 'and',
        conditions: ['isBoss', 'isHealthLow']
      });
      rules.addAction({
        "if": 'isBossAndHealthLow',
        then: [{
          action: 'testAction'
        }]
      });
      var json = rules.serializeToJson();
      console.log('json', json);
      this.drawTable();
      this.drawBehaviorTree(JSON.parse(json));
      this.behavior = rules;
    }
  }, {
    key: "addNewRule",
    value: function addNewRule() {
      // Open a form to create a new conditional
      this.showAddConditionalForm();
    }
  }, {
    key: "redrawBehaviorTree",
    value: function redrawBehaviorTree() {
      var _this = this;
      var json = this.behavior.serializeToJson();
      console.log('json', json);
      var container = document.getElementById('sutraTable');
      var guiContent = container.querySelector('.gui-content');
      guiContent.innerHTML = '';
      alert('redraw');
      JSON.parse(json).tree.forEach(function (node) {
        guiContent.appendChild(_this.createNodeElement(node, 0));
      });
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
      // get existing container
      var container = document.getElementById('sutraView');
      var table = document.getElementById('sutraTable');
      var guiContent = container.querySelector('.gui-content');

      //let container = document.createElement('div');
      json.tree.forEach(function (node) {
        table.appendChild(_this2.createNodeElement(node, 1));
      });
      // Append this container to your GUI, adjust as needed
      guiContent.appendChild(table);
      container.appendChild(guiContent); // Example: appending to body
    }
  }, {
    key: "getAvailableActions",
    value: function getAvailableActions() {
      return Object.keys(this.getEmitters());
    }
  }, {
    key: "createNodeElement",
    value: function createNodeElement(node, indentLevel) {
      var element = document.createElement('div');
      element.className = 'node-element';
      element.style.marginLeft = "".concat(indentLevel * 20, "px");
      if (node.action) {
        this.appendActionElement(element, node, indentLevel);
      } else if (node["if"]) {
        this.appendConditionalElement(element, node, indentLevel);
      }
      return element;
    }
  }, {
    key: "appendActionElement",
    value: function appendActionElement(element, node, indentLevel) {
      var select = this.createActionSelect(node);
      element.appendChild(select);
      if (node.data) {
        var dataContainer = this.createDataContainer(node, indentLevel);
        element.appendChild(dataContainer);
      }
    }
  }, {
    key: "createActionSelect",
    value: function createActionSelect(node) {
      var select = document.createElement('select');
      select.className = 'action-select';
      var actions = this.getAvailableActions();
      actions.forEach(function (action) {
        var option = document.createElement('option');
        option.value = action;
        option.text = action;
        if (node.action === action) {
          option.selected = true;
        }
        console.log('nnnnn', node.action);
        select.appendChild(option);
      });
      return select;
    }
  }, {
    key: "createDataContainer",
    value: function createDataContainer(node, indentLevel) {
      var _this3 = this;
      var dataContainer = document.createElement('div');
      dataContainer.className = 'data-container';
      Object.keys(node.data).forEach(function (key) {
        var label = _this3.createLabel(key, indentLevel);
        var input = _this3.createInput(node, key);
        dataContainer.appendChild(label);
        dataContainer.appendChild(input);
      });
      return dataContainer;
    }
  }, {
    key: "createLabel",
    value: function createLabel(key, indentLevel) {
      var label = document.createElement('label');
      label.textContent = key;
      label.className = 'param-label';
      label.style.marginLeft = "".concat(indentLevel * 20, "px");
      return label;
    }
  }, {
    key: "createInput",
    value: function createInput(node, key) {
      var input = document.createElement('input');
      input.className = 'param-input';
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
      var _this4 = this;
      var condition = this.createConditionElement(node);
      element.appendChild(condition);
      if (node.then) {
        node.then.forEach(function (childNode) {
          return element.appendChild(_this4.createNodeElement(childNode, indentLevel + 1));
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
      var _this5 = this;
      var condition = document.createElement('div');
      condition.className = 'condition';
      condition.textContent = "If: ".concat(node["if"]);
      condition.onclick = function () {
        return _this5.editConditional(node["if"]);
      };
      return condition;
    }
  }, {
    key: "createElseElement",
    value: function createElseElement(node, indentLevel) {
      var _this6 = this;
      var elseElement = document.createElement('div');
      elseElement.className = 'else-branch';
      elseElement.textContent = 'Else';
      node["else"].forEach(function (childNode) {
        return elseElement.appendChild(_this6.createNodeElement(childNode, indentLevel + 1));
      });
      return elseElement;
    }
  }, {
    key: "editConditional",
    value: function editConditional(conditionalName) {
      console.log('editConditional', conditionalName);
      var conditional = this.behavior.getCondition(conditionalName); // Fetch the conditional's details
      console.log("found conditional", _typeof(conditional), conditional);
      var operators = this.behavior.getOperators(); // Fetch available operators
      console.log('found operators', operators);
      var editorContainer = document.getElementById('editorContainer'); // Editor container

      if (!editorContainer) {
        editorContainer = document.createElement('div');
        editorContainer.id = 'editorContainer';
        this.sutraView.appendChild(editorContainer);
        //document.body.appendChild(editorContainer);
      }

      if (typeof conditional === 'function') {
        this.showFunctionEditor(conditionalName, conditional);
      } else if (_typeof(conditional) === 'object') {
        this.showObjectEditor(conditionalName, conditional, operators);
      } else {
        console.log('Unknown conditional type');
      }
    }
  }, {
    key: "saveConditional",
    value: function saveConditional(conditionalName, form) {
      var formData = new FormData(form);
      var updatedConditional = {};
      var _iterator = _createForOfIteratorHelper(formData.entries()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          updatedConditional[key] = value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.behavior.updateCondition(conditionalName, updatedConditional); // Update Sutra instance
      this.redrawBehaviorTree(); // Redraw the tree to reflect changes
    }
  }, {
    key: "showConditionalEditor",
    value: function showConditionalEditor(conditional) {
      // Implement the UI logic to show and edit the details of the conditional
      // This could be a form with inputs for the conditional's properties
    }
  }, {
    key: "update",
    value: function update() {
      var game = this.game;
      this.bossHealth--;
      var _iterator2 = _createForOfIteratorHelper(game.entities.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            entityId = _step2$value[0],
            entity = _step2$value[1];
          // iterate through game entities
          // console.log('entity', entity)
          if (entity.type === 'BOSS') {
            // console.log('boss found', entity.id, entity.health)
          }
          this.behavior.tick(entity);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../gui-editor/gui.js":1,"./lib/drawTable.js":3,"./lib/editor.js":4}],3:[function(require,module,exports){
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
  if (!game.systems['entity-input']) {
    console.log('entity-input system not found, skipping drawTable');
    return;
  }
  var table = document.createElement('div');
  table.id = "sutraTable";

  // Use gui.window() to create the window
  this.sutraView = _gui["default"].window('sutraView', 'Sutra Editor', function () {
    game.systemsManager.removeSystem(self.id);
  });

  // Add a button to create new rules
  var addRuleButton = document.createElement('button');
  addRuleButton.textContent = 'Add Rule';
  addRuleButton.onclick = function () {
    return _this.addNewRule();
  };
  var guiContent = this.sutraView.querySelector('.gui-content');
  guiContent.appendChild(addRuleButton);
  guiContent.appendChild(table);

  //this.sutraView.appendChild(addRuleButton);
  //this.sutraView.appendChild(table);
}

},{"../../gui-editor/gui.js":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var editor = {};
editor.createConditional = function createConditional(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  var type = formData.get('conditionalType');
  if (type === 'function') {
    // Logic to create and add custom function conditional
    var func = new Function('return ' + formData.get('conditionalFunction'))();
    this.behavior.addCondition('customFunction', func);
  } else {
    // Logic to create and add DSL object conditional
    var dsl = {
      op: formData.get('dslOperator'),
      property: formData.get('dslProperty'),
      value: formData.get('dslValue')
    };
    this.behavior.addCondition('customDSL', dsl);
  }

  // Redraw behavior tree or update UI as needed
  this.redrawBehaviorTree();
};
editor.showFunctionEditor = function showFunctionEditor(conditionalName, conditional) {
  var _this = this;
  var editorContainer = document.getElementById('editorContainer'); // Assuming you have a container for the editor
  editorContainer.innerHTML = ''; // Clear previous content

  var title = document.createElement('h3');
  title.textContent = "Edit Function: ".concat(conditionalName);
  editorContainer.appendChild(title);
  var textarea = document.createElement('textarea');
  textarea.value = conditional.toString(); // Convert function to string
  editorContainer.appendChild(textarea);
  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.onclick = function () {
    var updatedFunction = new Function('return ' + textarea.value)();
    _this.behavior.updateCondition(conditionalName, updatedFunction); // Assuming such a method exists
    _this.redrawBehaviorTree(); // Redraw to reflect changes
  };

  editorContainer.appendChild(saveButton);
};
editor.showObjectEditor = function showObjectEditor(conditionalName, conditional, operators) {
  var _this2 = this;
  var editorContainer = document.getElementById('editorContainer'); // Editor container
  editorContainer.innerHTML = ''; // Clear previous content

  var title = document.createElement('h3');
  title.textContent = "Edit Object: ".concat(conditionalName);
  editorContainer.appendChild(title);
  var form = document.createElement('form');
  form.className = 'conditional-form'; // Add class for styling
  editorContainer.appendChild(form);
  var table = document.createElement('table');
  table.className = 'editor-table'; // Add class for styling
  form.appendChild(table);

  // Create form fields based on the conditional's properties
  for (var key in conditional) {
    if (key === 'op') continue; // Skip 'op' here, it will be handled separately

    var row = table.insertRow();
    var labelCell = row.insertCell();
    var inputCell = row.insertCell();
    var label = document.createElement('label');
    label.textContent = key;
    labelCell.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.name = key;
    input.value = conditional[key];
    inputCell.appendChild(input);
  }

  // Row for operators
  var opRow = table.insertRow();
  var opLabelCell = opRow.insertCell();
  var opSelectCell = opRow.insertCell();
  opLabelCell.appendChild(document.createTextNode('Operator'));
  var select = document.createElement('select');
  select.name = 'op';
  operators.forEach(function (operator) {
    var option = document.createElement('option');
    option.value = operator;
    option.text = operator;
    select.appendChild(option);
    if (conditional.op === operator) {
      option.selected = true;
    }
  });
  opSelectCell.appendChild(select);

  // Save button
  var buttonRow = table.insertRow();
  var buttonCell = buttonRow.insertCell();
  buttonCell.colSpan = 2; // Span across both columns

  var saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Save';
  saveButton.onclick = function (event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way
    _this2.saveConditional(conditionalName, form);
  };
  buttonCell.appendChild(saveButton);
};
editor.showAddConditionalForm = function showAddConditionalForm() {
  var _this3 = this;
  var editorContainer = document.getElementById('editorContainer');
  if (!editorContainer) {
    editorContainer = document.createElement('div');
    editorContainer.id = 'editorContainer';
    this.sutraView.appendChild(editorContainer);
  }
  editorContainer.innerHTML = ''; // Clear previous content

  // Form to choose between custom function or DSL object
  var form = document.createElement('form');
  form.innerHTML = "\n    <label>\n      <input type=\"radio\" name=\"conditionalType\" value=\"function\" checked>\n      Custom Function\n    </label>\n    <label>\n      <input type=\"radio\" name=\"conditionalType\" value=\"dsl\">\n      DSL Object\n    </label>\n    <div id=\"conditionalInputContainer\"></div>\n    <button type=\"submit\">Create Conditional</button>\n  ";
  editorContainer.appendChild(form);

  // Event listener for radio button change
  form.elements.conditionalType.forEach(function (radio) {
    radio.addEventListener('change', function (e) {
      return _this3.onConditionalTypeChange(e.target.value);
    });
  });

  // Event listener for form submission
  form.addEventListener('submit', function (e) {
    return _this3.createConditional(e);
  });
};
editor.onConditionalTypeChange = function onConditionalTypeChange(type) {
  // Update form based on selected type
  var inputContainer = document.getElementById('conditionalInputContainer');
  if (type === 'function') {
    // Provide a textarea for custom function input
    inputContainer.innerHTML = '<textarea name="conditionalFunction"></textarea>';
  } else {
    // Provide inputs for DSL object properties
    inputContainer.innerHTML = "\n      <input name=\"dslProperty\" placeholder=\"Property\">\n      <input name=\"dslValue\" placeholder=\"Value\">\n      <select name=\"dslOperator\">\n        ".concat(this.behavior.getOperators().map(function (op) {
      return "<option value=\"".concat(op, "\">").concat(op, "</option>");
    }).join(''), "\n      </select>\n    ");
  }
};
var _default = exports["default"] = editor;

},{}]},{},[2])(2)
});

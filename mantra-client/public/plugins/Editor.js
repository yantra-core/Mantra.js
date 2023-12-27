(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Editor = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _createToolbar = _interopRequireDefault(require("./lib/createToolbar.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Editor = /*#__PURE__*/function () {
  function Editor() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      sourceCode = _ref.sourceCode,
      _ref$sutraEditor = _ref.sutraEditor,
      sutraEditor = _ref$sutraEditor === void 0 ? false : _ref$sutraEditor;
    _classCallCheck(this, Editor);
    this.id = Editor.id;
    this.sourceCode = sourceCode;
    this.sutraEditor = sutraEditor;
    this.createToolbar = _createToolbar["default"].bind(this);
  }
  _createClass(Editor, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      // register the plugin with the game
      // this.game.systemsManager.addSystem(this.id, this);

      document.body.style.perspective = 'none';
      this.dropdownTimers = new Map(); // To manage delayed close timers

      // Check for jQuery
      if (typeof $ === 'undefined') {
        console.log('$ is not defined, attempting to load jQuery from vendor');
        game.loadScripts(['/vendor/jquery.min.js', '/worlds.mantra.js'], function () {
          console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
          _this.jqueryReady();
        });
      } else {
        this.jqueryReady();
      }
      // game.use(new this.game.plugins.PluginsGUI());
    }
  }, {
    key: "jqueryReady",
    value: function jqueryReady() {
      this.createToolbar(this.game);
      this.setupGlobalClickListener();

      // this.createViewSourceModal();
      this.game.systemsManager.addSystem(this.id, this);
    }
  }, {
    key: "createIcon",
    value: function createIcon(name) {
      var element = document.createElement('img');
      element.src = "/vendor/feather/".concat(name, ".svg");
      element.classList.add('feather-icon');
      element.style.width = '36px';
      element.style.height = '36px';
      element.style.paddingTop = '5px';
      // element.style.marginRight = '10px';
      element.style.cursor = 'pointer';
      element.style.filter = 'invert(100%)';
      return element;
    }
  }, {
    key: "createMenu",
    value: function createMenu(menuTitle) {
      var _this2 = this;
      var onClickAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var $menu = $('<div>', {
        "class": 'menu'
      });
      var $button = $('<button>').text(menuTitle);
      if (onClickAction) {
        $button.on('click', onClickAction);
      } else {
        var $dropdownContent = $('<div>', {
          "class": 'dropdown-content'
        });
        $menu.append($dropdownContent);
        $button.on('click', function () {
          _this2.closeAllDropdowns();
          $dropdownContent.toggleClass('show');
        });

        // Handle mouseout event
        $dropdownContent.on('mouseout', function () {
          _this2.dropdownTimers.set($dropdownContent[0], setTimeout(function () {
            $dropdownContent.removeClass('show');
          }, 333));
        });

        // Cancel the timer if the mouse re-enters
        $dropdownContent.on('mouseover', function () {
          if (_this2.dropdownTimers.has($dropdownContent[0])) {
            clearTimeout(_this2.dropdownTimers.get($dropdownContent[0]));
            _this2.dropdownTimers["delete"]($dropdownContent[0]);
          }
        });
      }
      $menu.append($button);
      return $menu;
    }
  }, {
    key: "populateFileMenu",
    value: function populateFileMenu($menu) {
      var _this3 = this;
      var $dropdownContent = $menu.find('.dropdown-content');
      var $viewSource = $('<a>', {
        href: '#',
        text: 'View Source'
      });
      $viewSource.on('click', function () {
        return _this3.showSourceCode();
      }); // Add click handler
      $dropdownContent.append($viewSource);
      var $deployWorld = $('<a>', {
        href: 'https://yantra.gg/game-dev-quickstart/deploy-world',
        text: 'Deploy to Yantra Cloud',
        target: '_blank'
      });
      $dropdownContent.append($deployWorld);
      var $pluginsView = $('<a>', {
        href: '#',
        text: 'Plugins'
      });
      $pluginsView.on('click', function () {
        return _this3.showPluginsGUI();
      }); // Add click handler
      $dropdownContent.append($pluginsView);
      var $aboutMantra = $('<a>', {
        href: 'https://github.com/yantra-core/mantra',
        text: 'About Mantra',
        target: '_blank'
      });
      $dropdownContent.append($aboutMantra);
    }
  }, {
    key: "populatePluginsMenu",
    value: function populatePluginsMenu($menu) {
      var $dropdownContent = $menu.find('.dropdown-content');
      var $newItem = $('<a>', {
        href: '#',
        text: 'Plugins'
      });
      $dropdownContent.append($newItem);
      // Repeat for other Plugins menu items...
    }
  }, {
    key: "populateAboutMenu",
    value: function populateAboutMenu($menu) {
      var $dropdownContent = $menu.find('.dropdown-content');
      var $githubLink = $('<a>', {
        href: 'https://github.com/yantra-core/mantra',
        text: 'Mantra GitHub Repository'
      });
      $dropdownContent.append($githubLink);

      //const $yantraSDK = $('<a>', { href: 'https://github.com/yantra-core/', text: 'Yantra SDK' });
      //$dropdownContent.append($yantraSDK);

      var $yantraLink = $('<a>', {
        href: 'https://yantra.gg',
        text: 'Yantra Serverless Hosting'
      });
      $dropdownContent.append($yantraLink);
      // Repeat for other About menu items...
    }
  }, {
    key: "setupGlobalClickListener",
    value: function setupGlobalClickListener() {
      var _this4 = this;
      $(document).on('click', function (event) {
        if (!$(event.target).closest('.menu button').length) {
          _this4.closeAllDropdowns();
        }

        // TODO: remove this code and move it into Mouse.js
        var toolbar = event.target.closest('.toolbar');
        if (_this4.game && _this4.game.systems && _this4.game.systems['entity-input']) {
          if (!toolbar) {
            console.log("toolbar not found");
            // re-enable inputs
            _this4.game.systems['entity-input'].setInputsActive();
            if (_this4.game.systems['keyboard']) {
              _this4.game.systems['keyboard'].bindInputControls();
            }
            if (_this4.game.systems['mouse']) {
              _this4.game.systems['mouse'].bindInputControls();
            }
          } else {
            console.log("toolbar found");
            // disable inputs
            _this4.game.systems['entity-input'].disableInputs();
            if (_this4.game.systems['keyboard']) {
              _this4.game.systems['keyboard'].unbindAllEvents();
            }
            if (_this4.game.systems['mouse']) {
              _this4.game.systems['mouse'].unbindAllEvents();
            }
            event.preventDefault();
            return false;
          }
        }
      });

      /*
      // add a global click handler to document that will delegate any clicks
      // that are not inside gui-windows to re-enable inputs
      document.addEventListener('click', (e) => {
        // check if the click was inside a gui-window
        let guiWindow = e.target.closest('.gui-container');
        if (this.game && this.game.systems && this.game.systems['entity-input'] && this.game.systems['keyboard']) {
          if (!guiWindow) {
            // re-enable inputs
            this.game.systems['entity-input'].setInputsActive();
            this.game.systems['keyboard'].bindInputControls();
          } else {
            // disable inputs
            this.game.systems['entity-input'].disableInputs();
            this.game.systems['keyboard'].unbindAllEvents();
          }
           // check to see if this is a class sutra-link, if so open the form editor
          if (e.target.classList.contains('sutra-link')) {
            let sutraPath = e.target.getAttribute('data-path');
            let node = this.behavior.findNode(sutraPath);
            // Remark: Editing / Viewing Conditionals is not yet supported
            //this.showConditionalsForm(node);
          }
        }
      });
      */
    }
  }, {
    key: "closeAllDropdowns",
    value: function closeAllDropdowns() {
      var _this5 = this;
      $('.dropdown-content.show').each(function (index, dropdown) {
        $(dropdown).removeClass('show');
        var timer = _this5.dropdownTimers.get(dropdown);
        if (timer) {
          clearTimeout(timer);
          _this5.dropdownTimers["delete"](dropdown);
        }
      });
    }
  }, {
    key: "showCrafting",
    value: function showCrafting() {
      var game = this.game;
      if (typeof game.systems['gui-ycraft'] === 'undefined') {
        game.use('YCraft');
        game.use('YCraftGUI');
      } else {
        this.game.systemsManager.removeSystem('gui-ycraft');
      }
    }
  }, {
    key: "showRules",
    value: function showRules() {
      var game = this.game;
      if (typeof game.systems['gui-sutra'] === 'undefined') {
        /*
        game.once('plugin::loaded::gui-sutra', () => {
          game.systems['gui-sutra'].drawTable();
        });
        */
        game.use('SutraGUI');
      } else {
        this.game.systemsManager.removeSystem('gui-sutra');
      }
    }
  }, {
    key: "showPluginsGUI",
    value: function showPluginsGUI() {
      var game = this.game;
      if (typeof game.systems['gui-plugins'] === 'undefined') {
        game.use('PluginsGUI');
      } else {
        this.game.systemsManager.removeSystem('gui-plugins');
      }
    }
  }, {
    key: "showEventsInspector",
    value: function showEventsInspector() {
      var game = this.game;
      if (typeof game.systems['gui-event-inspector'] === 'undefined') {
        game.use('EventInspector');
      } else {
        this.game.systemsManager.removeSystem('gui-event-inspector');
      }
    }
  }, {
    key: "showControls",
    value: function showControls() {
      var _this6 = this;
      var game = this.game;
      if (typeof game.systems['gui-controls'] === 'undefined') {
        game.once('plugin::ready::gui-controls', function () {
          _this6.game.systems['gui-controls'].drawTable();
        });
        game.use('ControlsGUI');
      } else {
        this.game.systemsManager.removeSystem('gui-controls');
      }
    }
  }, {
    key: "showInspector",
    value: function showInspector() {
      var game = this.game;
      if (typeof game.systems['gui-inspector'] === 'undefined') {
        game.use('Inspector');
      } else {
        this.game.systemsManager.removeSystem('gui-inspector');
      }
    }
  }, {
    key: "showEntities",
    value: function showEntities() {
      var game = this.game;
      if (typeof game.systems['gui-entities'] === 'undefined') {
        game.use('EntitiesGUI');
        // this.game.systems['gui-entities'].drawTable();
      } else {
        this.game.systemsManager.removeSystem('gui-entities');
      }
    }
  }, {
    key: "showSourceCode",
    value: function showSourceCode() {
      var sourceCode = document.documentElement.outerHTML;
      console.log(sourceCode);
      // open new link to github
      window.open(this.sourceCode, '_blank');
      //$('#sourceCode').text(sourceCode);
      //$('#sourceCodeModal').show();
    }
  }]);
  return Editor;
}();
_defineProperty(Editor, "id", 'gui-editor');
_defineProperty(Editor, "async", true);
var _default = exports["default"] = Editor;

},{"./lib/createToolbar.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GraphicsSelector = /*#__PURE__*/function () {
  function GraphicsSelector(editor) {
    _classCallCheck(this, GraphicsSelector);
    this.editor = editor;
    this.game = editor.game; // Store the reference to the game logic
    this.selectBox = this.createElements(); // Now returns the select box element
    this.addEventListeners();
  }
  _createClass(GraphicsSelector, [{
    key: "createElements",
    value: function createElements() {
      // Create the select box
      var selectBox = document.createElement('select');
      selectBox.id = 'graphicsSelect';
      selectBox.style.maxHeight = '45px';

      // tool tip hint
      selectBox.title = 'Select graphics mode.\nMantra supports hot-swapping and multiplexing of graphics modes.';
      // TODO: Populate the select box with options as needed
      // Example: this.addOption(selectBox, 'Option 1', 'value1');
      this.addOption(selectBox, 'CSSGraphics - v1.1.0', 'CSSGraphics');
      this.addOption(selectBox, 'Babylon.js - v6.25.0', 'BabylonGraphics');
      this.addOption(selectBox, 'Phaser 3 - v3.60.0', 'PhaserGraphics');
      return selectBox;
    }
  }, {
    key: "selectElement",
    value: function selectElement(value) {
      // Select the option with the given value
      this.selectBox.value = value;
    }
  }, {
    key: "addOption",
    value: function addOption(selectBox, text, value) {
      var option = document.createElement('option');
      option.text = text;
      option.value = value;
      selectBox.add(option);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;
      this.game.on('plugin::ready::graphics-phaser', function () {
        _this.selectElement('PhaserGraphics');
      });
      this.game.on('plugin::ready::graphics-babylon', function () {
        _this.selectElement('BabylonGraphics');
      });
      // Add event listener to the select box
      this.selectBox.addEventListener('change', function (event) {
        _this.handleSelectionChange(event);
      });
    }
  }, {
    key: "handleSelectionChange",
    value: function handleSelectionChange(event) {
      var game = this.game;

      // TODO: figure out why cursor doesnt immediate change,
      //       when switching to BabylonGraphics
      this.showLoadingSpinner();

      // Get the value of the selected graphics mode
      var selectedGraphicsMode = event.target.value;
      var selectGraphicsId;
      if (selectedGraphicsMode === 'BabylonGraphics') {
        selectGraphicsId = 'graphics-babylon';
      }
      if (selectedGraphicsMode === 'PhaserGraphics') {
        selectGraphicsId = 'graphics-phaser';
      }
      if (selectedGraphicsMode === 'CSSGraphics') {
        selectGraphicsId = 'graphics-css';
      }
      game.systems.graphics.switchGraphics(selectedGraphicsMode);

      // USER INTENT: Change graphics mode
      // persist this intention to the local storage
      // so that it can be restored on next page load
      game.storage.set('graphics', selectedGraphicsMode);
    }
  }, {
    key: "showLoadingSpinner",
    value: function showLoadingSpinner() {
      document.body.style.cursor = 'wait';
    }
  }, {
    key: "hideLoadingSpinner",
    value: function hideLoadingSpinner() {
      document.body.style.cursor = 'default';
    }
  }]);
  return GraphicsSelector;
}();
var _default = exports["default"] = GraphicsSelector;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ToolbarMenu = exports["default"] = /*#__PURE__*/function () {
  function ToolbarMenu() {
    _classCallCheck(this, ToolbarMenu);
    // Create the primary and secondary groups
    this.primaryGroup = document.createElement('div');
    this.secondaryGroup = document.createElement('div');

    // Set classes for primary and secondary groups
    this.primaryGroup.className = 'menu-group primary';
    this.secondaryGroup.className = 'menu-group secondary';

    // Style the primary and secondary groups
    this.setStyle(this.primaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });
    this.setStyle(this.secondaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });

    // Create the toolbar and append the groups
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'toolbar';
    this.toolbar.appendChild(this.primaryGroup);
    this.toolbar.appendChild(this.secondaryGroup);

    // Style the toolbar
    this.setStyle(this.toolbar, {
      position: 'fixed',
      top: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      // padding: '10px',
      backgroundColor: '#f3f3f3',
      zIndex: 1
    });

    // Add the toolbar to the document
    document.body.appendChild(this.toolbar);

    // Responsive design for smaller screens
    window.addEventListener('resize', this.updateResponsiveStyles.bind(this));
    this.updateResponsiveStyles();
  }
  _createClass(ToolbarMenu, [{
    key: "addElement",
    value: function addElement(group, element) {
      var prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (prepend) {
        if (group === 'primary') {
          this.primaryGroup.insertBefore(element, this.primaryGroup.firstChild);
        } else if (group === 'secondary') {
          this.secondaryGroup.insertBefore(element, this.secondaryGroup.firstChild);
        }
      } else {
        if (group === 'primary') {
          this.primaryGroup.appendChild(element);
        } else if (group === 'secondary') {
          this.secondaryGroup.appendChild(element);
        }
      }
    }
  }, {
    key: "addItem",
    value: function addItem(group, itemObj) {
      var prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var item = document.createElement('div');
      item.className = 'menu-item';
      item.style.textAlign = 'center';
      if (itemObj.hint) {
        item.title = itemObj.hint;
      }
      var itemText = document.createElement('div');
      itemText.className = 'menu-item-text';
      itemText.textContent = itemObj.text;
      itemText.style.textAlign = 'center';
      if (prepend) {
        item.appendChild(itemText, item.firstChild);
      } else {
        item.appendChild(itemText);
      }
      if (_typeof(itemObj.icon) === 'object') {
        if (prepend) {
          item.insertBefore(itemObj.icon, item.firstChild);
        } else {
          item.appendChild(itemObj.icon);
        }
      }
      this.setStyle(item, {
        margin: '5px',
        fontSize: '20px',
        // padding: '5px 10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '5px',
        paddingBottom: '5px',
        //      fontWeight: 'bold',
        minWidth: '60px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'relative' // For dropdown positioning
      });

      if (itemObj.onClick) {
        item.onclick = itemObj.onClick;
      }
      if (itemObj.subItems && itemObj.subItems.length > 0) {
        var dropdown = this.createDropdown(itemObj.subItems);
        item.appendChild(dropdown);
        item.onmouseenter = function () {
          return dropdown.style.display = 'block';
        };
        item.onmouseleave = function () {
          return dropdown.style.display = 'none';
        };
      }
      if (group === 'primary') {
        this.primaryGroup.appendChild(item);
      } else if (group === 'secondary') {
        this.secondaryGroup.appendChild(item);
      }
    }
  }, {
    key: "createDropdown",
    value: function createDropdown(subItems) {
      var _this = this;
      var dropdown = document.createElement('div');
      dropdown.className = 'dropdown';
      this.setStyle(dropdown, {
        display: 'none',
        minWidth: '300px',
        fontSize: '24px',
        position: 'absolute',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '5px',
        zIndex: 1,
        textAlign: 'left',
        //top: '78px',
        // left: '-5px',
        left: 0,
        right: '0'
      });
      subItems.forEach(function (subItemObj) {
        var subItem = _this.createSubItem(subItemObj);
        dropdown.appendChild(subItem);
      });
      return dropdown;
    }
  }, {
    key: "createSubItem",
    value: function createSubItem(subItemObj) {
      var subItem = document.createElement('div');
      subItem.textContent = subItemObj.text;
      this.setStyle(subItem, {
        padding: '5px 10px',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd'
      });
      subItem.onmouseenter = function () {
        return subItem.style.backgroundColor = '#ddd';
      };
      subItem.onmouseleave = function () {
        return subItem.style.backgroundColor = 'transparent';
      };
      if (subItemObj.onClick) {
        subItem.onclick = subItemObj.onClick;
      }
      return subItem;
    }
  }, {
    key: "setStyle",
    value: function setStyle(element, styles) {
      // Apply each style to the element
      Object.assign(element.style, styles);
    }
  }, {
    key: "updateResponsiveStyles",
    value: function updateResponsiveStyles() {
      // Apply responsive styles based on the window width
      if (window.innerWidth <= 600) {
        this.setStyle(this.toolbar, {
          flexDirection: 'column',
          alignItems: 'flex-start'
        });
      } else {
        this.setStyle(this.toolbar, {
          flexDirection: 'row'
        });
      }
    }
  }]);
  return ToolbarMenu;
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WorldSelector = /*#__PURE__*/function () {
  function WorldSelector(game) {
    _classCallCheck(this, WorldSelector);
    this.game = game;
    this.selectBox = this.createElements(); // Now returns the select box element
    this.lastLoadedWorld = null;
    this.currentWorld = null;
    this.addEventListeners();
  }
  _createClass(WorldSelector, [{
    key: "createElements",
    value: function createElements() {
      var game = this.game;
      // Create the select box
      var selectBox = document.createElement('select');
      selectBox.id = 'graphicsSelect';
      selectBox.style.maxHeight = '45px';

      // TODO: Populate the select box with options as needed
      // Example: this.addOption(selectBox, 'Option 1', 'value1');

      // adds a choose your world option
      this.addOption(selectBox, 'Choose Your World', 'Choose');
      this.addOption(selectBox, 'Home World', 'Home');
      this.addOption(selectBox, 'Platform World', 'Platform');
      // this.addOption(selectBox, 'Space World', 'Platform');
      //this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');

      // adds separator option
      this.addOption(selectBox, '------Tutorial Worlds-----', '----------------', true);
      this.addOption(selectBox, 'YCraft World', 'YCraft');
      this.addOption(selectBox, 'Sutra World', 'Sutra');
      this.addOption(selectBox, 'XState World', 'XState');

      // this.addOption(selectBox, 'Experimental 3D Space Flight', 'Space');
      return selectBox;
    }
  }, {
    key: "selectElement",
    value: function selectElement(value) {
      // Select the option with the given value
      this.selectBox.value = value;
    }
  }, {
    key: "addOption",
    value: function addOption(selectBox, text, value, disabled) {
      var option = document.createElement('option');
      option.text = text;
      option.value = value;
      if (disabled) {
        option.disabled = true;
      }
      selectBox.add(option);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;
      var that = this;
      var game = this.game;
      /*
      this.game.on('plugin::ready::graphics-phaser', () => {
        this.selectElement('PhaserGraphics');
      });
      this.game.on('plugin::ready::graphics-babylon', () => {
        this.selectElement('BabylonGraphics');
      });
      */
      // Add event listener to the select box
      this.selectBox.addEventListener('change', function (event) {
        _this.handleSelectionChange(event);
      });
      game.on('world::loaded', function (pluginInstance) {
        // alert('loaded')
        console.log("world::loaded", pluginInstance.constructor.name, pluginInstance.id);
        var worldName = pluginInstance.constructor.name;
        //console.log('world::loaded', worldName, pluginInstance);
        that.selectElement(worldName);
        //that.hideLoadingSpinner();
      });
    }

    // TODO: refactor world change logic to separate function
  }, {
    key: "handleSelectionChange",
    value: function handleSelectionChange(event) {
      var game = this.game;
      var that = this;
      this.showLoadingSpinner();
      var selectedWorld = event.target.value;

      // check to see if game.worlds has any entries
      // if so, unload them if they have an unload method
      if (game.worlds.length > 0) {
        game.worlds.forEach(function (world, i) {
          if (world.unload) {
            // alert(`Unloading ${world.id}`);
            console.log(world.id, 'world.unload', world.unload);
            // remove the world from the game.worlds array
            // TODO: we could move this logic into Game.js
            game.worlds.splice(i, 1);
            world.unload();
          }
        });
      }
      game.systems.entity.clearAllEntities(false);
      var worldName = 'XState';
      worldName = 'Sutra';
      worldName = selectedWorld;
      var worldClass = WORLDS.worlds[worldName];
      var worldInstance = new worldClass();
      game.once('plugin::loaded::' + worldInstance.id, function () {
        that.hideLoadingSpinner();
      });
      game.use(worldInstance);

      // USER INTENT: Change world
      // persist this intention to the local storage
      // so that it can be restored on next page load
      game.storage.set('world', selectedWorld);

      // update the dropdown to show the current world
      this.selectElement(selectedWorld);
    }
  }, {
    key: "showLoadingSpinner",
    value: function showLoadingSpinner() {
      document.body.style.cursor = 'wait';
    }
  }, {
    key: "hideLoadingSpinner",
    value: function hideLoadingSpinner() {
      document.body.style.cursor = 'default';
    }
  }]);
  return WorldSelector;
}();
var _default = exports["default"] = WorldSelector;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createToolbar;
var _GraphicsSelector = _interopRequireDefault(require("./GraphicsSelector.js"));
var _WorldSelector = _interopRequireDefault(require("./WorldSelector.js"));
var _ToolbarMenu = _interopRequireDefault(require("./ToolbarMenu.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function createToolbar(game) {
  var _this = this;
  // Create menus
  var $fileMenu = this.createMenu('File');
  var toolbarMenu = new _ToolbarMenu["default"]();
  this.toolbarMenu = toolbarMenu;

  // create image icon with source of ./vendor/feather/eye.svg
  var inspectorIcon = this.createIcon('search');
  inspectorIcon.src = '/vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  inspectorIcon.title = 'Click to open Entity Inspector';
  inspectorIcon.style.width = '36px';
  inspectorIcon.style.height = '36px';
  inspectorIcon.style.paddingTop = '24px';
  inspectorIcon.style.marginRight = '30px';
  inspectorIcon.style.marginLeft = '10px';
  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = function () {
    return _this.showInspector();
  };
  toolbarMenu.addElement('secondary', inspectorIcon);
  toolbarMenu.addItem('primary', {
    text: 'Mantra',
    icon: this.createIcon('slack'),
    subItems: [{
      text: 'View Source',
      onClick: function onClick() {
        return _this.showSourceCode();
      }
    }, {
      text: 'About Mantra',
      onClick: function onClick() {
        return alert('Open Mantra Github');
      }
    }, {
      text: 'Deploy World to Yantra',
      onClick: function onClick() {
        return alert('Open Yantra');
      }
    }]
  });
  toolbarMenu.addItem('primary', {
    text: 'Entities',
    hint: 'Manage Game Entities',
    icon: this.createIcon('box'),
    onClick: function onClick() {
      return _this.showEntities();
    }
  });
  toolbarMenu.addItem('primary', {
    text: 'Rules',
    hint: 'Manage Game Rules with Sutra',
    icon: this.createIcon('pocket'),
    onClick: function onClick() {
      return _this.showRules();
    }
  });
  toolbarMenu.addItem('primary', {
    text: 'Crafting',
    hint: 'Manage Game Rules with YCraft',
    icon: this.createIcon('codesandbox'),
    onClick: function onClick() {
      return _this.showCrafting();
    }
  });
  toolbarMenu.addItem('primary', {
    text: 'Events ',
    hint: 'Manage Game Events',
    icon: this.createIcon('activity'),
    onClick: function onClick() {
      return _this.showEventsInspector();
    }
  });
  var worldIcon = this.createIcon('globe');
  worldIcon.style.marginTop = '0px';
  worldIcon.style.paddingTop = '0px';
  worldIcon.style.position = 'relative';
  worldIcon.style.top = '10px';
  var graphicsIcon = this.createIcon('tv');
  graphicsIcon.style.marginTop = '0px';
  graphicsIcon.style.paddingTop = '0px';
  graphicsIcon.style.position = 'relative';
  graphicsIcon.style.top = '10px';

  // toolbarMenu.addItem('secondary', { text: 'Settings' });
  var graphicsSelector = new _GraphicsSelector["default"](this);
  graphicsSelector.selectBox.style.fontSize = '22px';
  graphicsSelector.selectBox.style.cursor = 'pointer';
  graphicsSelector.selectBox.style.margin = '20px';

  // create item holder for graphicsSelector
  var graphicsSelectorItem = document.createElement('div');
  // graphicsSelectorItem.appendChild(graphicsIcon);
  graphicsSelectorItem.appendChild(graphicsSelector.selectBox);
  graphicsSelectorItem.title = 'Select Graphics Engine';
  var worldSelector = new _WorldSelector["default"](this.game);
  worldSelector.selectBox.style.fontSize = '22px';
  worldSelector.selectBox.style.cursor = 'pointer';
  worldSelector.selectBox.style.margin = '20px';
  var worldSelectorItem = document.createElement('div');
  // worldSelectorItem.appendChild(worldIcon);
  worldSelectorItem.appendChild(worldSelector.selectBox);
  worldSelectorItem.title = 'Select World';
  /*
  worldSelectorItem.onmousedown = () => {
    worldSelector.selectBox.click();
  };
  */

  toolbarMenu.addElement('secondary', worldSelectorItem);
  toolbarMenu.addElement('secondary', graphicsSelectorItem);
  if (game.worlds.length > 0) {
    var currentWorldName = game.worlds[0].constructor.name;
    worldSelector.selectElement(currentWorldName);
  }
  if (is_touch_enabled()) {
    toolbarMenu.toolbar.style.display = 'none';
  }
  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}

// TODO: move this to a utils file
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{"./GraphicsSelector.js":2,"./ToolbarMenu.js":3,"./WorldSelector.js":4}]},{},[1])(1)
});

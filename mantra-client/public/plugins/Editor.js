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
          // console.log('All jQuery scripts loaded sequentially, proceeding with initialization');
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
      this.game.loadCSS('/plugins/Editor/Editor.css');
    }
  }, {
    key: "createIcon",
    value: function createIcon(name) {
      var featherRoot = this.game.assetRoot || 'https://yantra.gg';
      var element = document.createElement('img');
      element.src = "".concat(featherRoot, "/vendor/feather/").concat(name, ".svg");
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
            // console.log("toolbar not found")
            // re-enable inputs
            _this4.game.systems['entity-input'].setInputsActive();
            if (_this4.game.systems['keyboard']) {
              _this4.game.systems['keyboard'].bindInputControls();
            }
            if (_this4.game.systems['mouse']) {
              _this4.game.systems['mouse'].bindInputControls();
            }
          } else {
            // console.log("toolbar found")
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

},{"./lib/createToolbar.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SelectPicker = _interopRequireDefault(require("./SelectPicker.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
      var game = this.game;
      // Create the select box
      var selectBox = document.createElement('select');
      selectBox.id = 'graphicsSelect';

      // hides by default
      selectBox.style.display = 'none';
      selectBox.style.maxHeight = '45px';

      // tool tip hint
      selectBox.title = 'Select graphics mode.\nMantra supports hot-swapping and multiplexing of graphics modes.';
      // TODO: Populate the select box with options as needed
      // Example: this.addOption(selectBox, 'Option 1', 'value1');
      //this.addOption(selectBox, 'CSSGraphics v1.1.0', 'CSSGraphics');
      //this.addOption(selectBox, 'Babylon.js v6.25.0', 'BabylonGraphics');
      this.addOption(selectBox, '2D CSS', 'CSSGraphics');
      this.addOption(selectBox, '3D Babylon.js', 'BabylonGraphics');
      this.addOption(selectBox, '3D Three.js', 'ThreeGraphics');

      // Remark: Phaser 3 support removed 1/14/2023
      //         With CSSGraphics engine working well, not much need for phaser 3
      //         Babylon.js currently handles 3d
      //         Improved Three.js support will be added in the future
      // this.addOption(selectBox, 'Phaser 3 - v3.60.0', 'PhaserGraphics');
      // this.addOption(selectBox, 'Three.js', 'ThreeGraphics');

      this.selectPicker = new _SelectPicker["default"](selectBox, function (selectedGraphicsMode) {
        game.systems.graphics.switchGraphics(selectedGraphicsMode);
      }, game);
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
      var game = this.game;
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
      var that = this;
      var isKeyDown = false;

      // TODO: refactor this to be members of the class
      function toggleModalOnKeyPress(isKeyPressed) {
        if (isKeyPressed && !isKeyDown) {
          // Key is pressed down for the first time
          isKeyDown = true;
          toggleModal();
        } else if (!isKeyPressed && isKeyDown) {
          // Key is released
          isKeyDown = false;
          //toggleModal();
        }
      }

      function toggleModal() {
        if (that.selectPicker.showingModal) {
          that.selectPicker.hideModal();
        } else {
          that.selectPicker.showModal();
        }
      }

      /* Removed 1/5/2023, SELECT button now opens Toolbar instead of graphics selector
      game.on('entityInput::handleInputs', (entityId, input) => {
        if (input.controls && input.controls.U !== undefined) {
          if (input.controls.U === false) {
            console.log("FALSE")
          }
          toggleModalOnKeyPress(input.controls.U);
        }
      });
      */
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

},{"./SelectPicker.js":3}],3:[function(require,module,exports){
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
var SelectPicker = exports["default"] = /*#__PURE__*/function () {
  function SelectPicker(selectElement, click, game) {
    _classCallCheck(this, SelectPicker);
    this.selectElement = selectElement;
    this.game = game;
    this.click = click;
    this.modal = this.createModal();
    this.debounceTimer = null;
    this.addEventListeners();
  }
  _createClass(SelectPicker, [{
    key: "createModal",
    value: function createModal() {
      var _this = this;
      var game = this.game;
      var modal = document.createElement('div');
      this.applyModalStyles(modal);
      var picker = document.createElement('ul');
      this.applyPickerStyles(picker);
      this.addPickerScrollEvents(picker);
      Array.from(this.selectElement.options).forEach(function (option) {
        var listItem = document.createElement('li');
        _this.applyListItemStyles(listItem);
        listItem.textContent = option.text;
        listItem.onclick = function () {
          _this.selectElement.value = option.value;
          _this.click(option.value);
          _this.hideModal();
        };
        picker.appendChild(listItem);
      });
      modal.appendChild(picker);
      document.body.appendChild(modal);
      return modal;
    }
  }, {
    key: "addPickerScrollEvents",
    value: function addPickerScrollEvents(picker) {
      var isDragging = false;
      var startY;
      var scrollTop;
      picker.onmousedown = function (e) {
        isDragging = true;
        startY = e.pageY - picker.offsetTop;
        scrollTop = picker.scrollTop;
        e.preventDefault();
      };
      picker.onmousemove = function (e) {
        if (!isDragging) return;
        var y = e.pageY - picker.offsetTop;
        var scroll = y - startY;
        picker.scrollTop = scrollTop - scroll;
      };
      window.onmouseup = function () {
        isDragging = false;
      };
      picker.onwheel = function (e) {
        picker.scrollTop += e.deltaY;
        e.preventDefault();
      };
    }
  }, {
    key: "applyModalStyles",
    value: function applyModalStyles(modal) {
      Object.assign(modal.style, {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 22222
      });
    }
  }, {
    key: "applyPickerStyles",
    value: function applyPickerStyles(picker) {
      Object.assign(picker.style, {
        position: 'relative',
        top: '0px',
        zIndex: 22222,
        listStyle: 'none',
        margin: '0',
        padding: '0',
        maxHeight: '80%',
        maxWidth: '1000px',
        overflowY: 'auto',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      });
    }
  }, {
    key: "applyListItemStyles",
    value: function applyListItemStyles(listItem) {
      Object.assign(listItem.style, {
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '5px',
        paddingRight: '5px',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd',
        fontSize: '36px',
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
        margin: '5px',
        borderRadius: '8px',
        transition: 'background-color 0.3s'
      });
      listItem.onmouseover = function () {
        return listItem.style.backgroundColor = '#e8e8e8';
      };
      listItem.onmouseout = function () {
        return listItem.style.backgroundColor = '#f8f8f8';
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;
      this.selectElement.addEventListener('focus', function () {
        return _this2.showModal();
      });
      this.selectElement.addEventListener('click', function () {
        return _this2.showModal();
      });
      this.selectElement.addEventListener('click', function (e) {
        return e.stopPropagation();
      });
      window.addEventListener('click', function (e) {
        if (e.target === _this2.modal) {
          _this2.hideModal();
        }
      });
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var _this3 = this;
      this.debounce(function () {
        if (_this3.showingModal) {
          _this3.hideModal();
        } else {
          _this3.showModal();
        }
      }, 300); // 300ms debounce time
    }
  }, {
    key: "debounce",
    value: function debounce(func, delay) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(func, delay);
    }
  }, {
    key: "showModal",
    value: function showModal() {
      this.showingModal = true;
      this.modal.style.display = 'flex';
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.showingModal = false;
      this.modal.style.display = 'none';
    }
  }]);
  return SelectPicker;
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
var ToolbarMenu = exports["default"] = /*#__PURE__*/function () {
  function ToolbarMenu() {
    _classCallCheck(this, ToolbarMenu);
    this.toggleStatus = 'open';
    // Add an isTransitioning flag to track transition state
    this.isTransitioning = false;

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
      zIndex: 9001
    });

    // Add the toolbar to the document
    document.body.appendChild(this.toolbar);

    // Responsive design for smaller screens
    window.addEventListener('resize', this.updateResponsiveStyles.bind(this));
    this.updateResponsiveStyles();
  }
  _createClass(ToolbarMenu, [{
    key: "setTransitioningState",
    value: function setTransitioningState(isTransitioning) {
      this.isTransitioning = isTransitioning;

      // Disable interaction during transition
      this.toolbar.style.pointerEvents = isTransitioning ? 'none' : 'auto';
    }
  }, {
    key: "slideOutToolbar",
    value: function slideOutToolbar() {
      var _this = this;
      if (this.isTransitioning || this.toggleStatus === 'closed') {
        return;
      }
      this.setTransitioningState(true);
      this.toggleStatus = 'closed';
      this.setStyle(this.toolbar, {
        transition: '0.5s',
        top: '-100px'
      });

      // Reset isTransitioning flag after transition ends
      setTimeout(function () {
        return _this.setTransitioningState(false);
      }, 500);
    }
  }, {
    key: "slideInToolbar",
    value: function slideInToolbar() {
      var _this2 = this;
      if (this.isTransitioning || this.toggleStatus === 'open') {
        return;
      }
      this.setTransitioningState(true);
      this.toggleStatus = 'open';
      this.setStyle(this.toolbar, {
        transition: '0.5s',
        top: '0'
      });

      // Reset isTransitioning flag after transition ends
      setTimeout(function () {
        return _this2.setTransitioningState(false);
      }, 500);
    }
  }, {
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
      var _this3 = this;
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
        var subItem = _this3.createSubItem(subItemObj);
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SelectPicker = _interopRequireDefault(require("./SelectPicker.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
    this.pickerCreated = false;
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
      // hide by default
      selectBox.style.display = 'none';

      // TODO: Populate the select box with options as needed
      // Example: this.addOption(selectBox, 'Option 1', 'value1');

      // adds a choose your world option
      // this.addOption(selectBox, 'Choose Your World', 'Choose');

      this.addOption(selectBox, 'Home World', 'Home');
      // this.addOption(selectBox, 'Maze World', 'Maze');

      this.addOption(selectBox, 'Platform World', 'Platform');
      this.addOption(selectBox, 'Music World', 'Music');
      this.addOption(selectBox, 'Gravity Gardens', 'GravityGardens');

      // this.addOption(selectBox, 'Space World', 'Platform');
      //this.addOption(selectBox, '2D Overhead', 'BabylonGraphics');

      // adds separator option
      // this.addOption(selectBox, '------Tutorial Worlds-----', '----------------', true);

      this.addOption(selectBox, 'YCraft World', 'YCraft');
      this.addOption(selectBox, 'Sutra World', 'Sutra');
      // this.addOption(selectBox, 'XState World', 'XState');

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
      this.selectPicker = new _SelectPicker["default"](this.selectBox, function (worldName) {
        game.switchWorlds(worldName);
      }, game);
      game.on('entityInput::handleInputs', function (entityId, input) {
        if (input && input.controls && (input.controls.I === true || input.controls.I === false)) {
          if (input.controls.I === false) {
            // console.log("FALSE")
          }
          toggleModalOnKeyPress(input.controls.I);
        }
      });
      var isKeyDown = false;
      function toggleModalOnKeyPress(isKeyPressed) {
        if (isKeyPressed && !isKeyDown) {
          // Key is pressed down for the first time
          isKeyDown = true;
          toggleModal(isKeyPressed);
        } else if (!isKeyPressed && isKeyDown) {
          // Key is released
          isKeyDown = false;
          //toggleModal();
        }
      }

      function toggleModal(isKeyPressed) {
        if (that.selectPicker.showingModal) {
          that.selectPicker.hideModal();
        } else {
          that.selectPicker.showModal();
        }
      }
      game.on('world::loaded', function (pluginInstance) {
        // alert('loaded')
        // console.log("world::loaded", pluginInstance.constructor.name, pluginInstance.id);
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
      switchWorld(selectedWorld);

      // alert('close modal')
      // hide the modal if showing
      this.selectPicker.hideModal();
      this.game.switchWorlds(selectedWorld);

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

},{"./SelectPicker.js":3}],6:[function(require,module,exports){
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
  var keyPressed = false;

  // TODO: this won't work if editor isn't already loaded
  game.on('entityInput::handleInputs', function (entityId, input) {
    if (input.controls && input.controls.U !== undefined) {
      if (input.controls.U === true && !keyPressed) {
        keyPressed = true; // Set the flag when key is initially pressed
        // Toggle the toolbar based on its current state
        if (toolbarMenu.toggleStatus === 'open') {
          toolbarMenu.slideOutToolbar();
        } else {
          toolbarMenu.slideInToolbar();
        }
      } else if (input.controls.U === false) {
        keyPressed = false; // Reset the flag when key is released
      }
    }
  });

  // create image icon with source of ./vendor/feather/eye.svg
  // TODO: remove featherRoot from code, quick fix for now
  var featherRoot = this.game.assetRoot || 'https://yantra.gg';
  var inspectorIcon = this.createIcon('search');
  inspectorIcon.src = featherRoot + '/vendor/feather/search.svg';
  inspectorIcon.style.cursor = 'pointer';
  inspectorIcon.title = 'Click to open Entity Inspector';
  inspectorIcon.style.marginRight = '10px';
  inspectorIcon.style.marginLeft = '10px';
  inspectorIcon.style.marginTop = '5px';
  inspectorIcon.style.filter = 'invert(100%)';
  if (is_touch_enabled()) {
    // hide inspector icon on touch devices
    inspectorIcon.style.display = 'none';
  }

  // TODO: have this change values based on open / cloase state
  // . Click in-game on Entity to Inspect
  inspectorIcon.onclick = function () {
    return _this.showInspector();
  };

  // toolbarMenu.addElement('secondary', inspectorIcon);

  toolbarMenu.addItem('primary', {
    text: 'Mantra',
    icon: this.createIcon('slack')
    /*
    subItems: [
      { text: 'View Source', onClick: () => this.showSourceCode() },
      { text: 'About Mantra', onClick: () => alert('Open Mantra Github') },
      { text: 'Deploy World to Yantra', onClick: () => alert('Open Yantra') }
    ]
    */
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

  /*
  toolbarMenu.addItem('primary', {
    text: 'Crafting',
    hint: 'Manage Game Rules with YCraft',
    icon: this.createIcon('codesandbox'),
    onClick: () => this.showCrafting()
  });
  */

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
  graphicsSelectorItem.appendChild(graphicsIcon);

  // create text label element to show current graphics engine
  var graphicsSelectorLabel = document.createElement('span');
  graphicsSelectorLabel.style.fontSize = '22px';
  graphicsSelectorLabel.style.marginRight = '10px';
  graphicsSelectorLabel.style.marginLeft = '10px';
  graphicsSelectorLabel.style.marginTop = '10px';
  graphicsSelectorLabel.style.marginBottom = '10px';
  graphicsSelectorLabel.style.cursor = 'pointer';

  // set value to foo
  graphicsSelectorLabel.innerText = 'Graphics';

  // add label to graphicsSelectorItem
  graphicsSelectorItem.appendChild(graphicsSelectorLabel);
  graphicsSelectorItem.onpointerdown = function () {
    // close world selector
    worldSelector.selectPicker.hideModal();

    // toggle select picker
    graphicsSelector.selectPicker.toggle();
  };
  graphicsSelectorItem.appendChild(graphicsSelector.selectBox);
  graphicsSelectorItem.title = 'Select Graphics Engine';
  var worldSelector = new _WorldSelector["default"](this.game);
  worldSelector.selectBox.style.fontSize = '22px';
  worldSelector.selectBox.style.cursor = 'pointer';
  worldSelector.selectBox.style.margin = '20px';
  var worldSelectorItem = document.createElement('div');
  worldSelectorItem.appendChild(worldIcon);

  // create text label element to show current world
  var worldSelectorLabel = document.createElement('span');
  worldSelectorLabel.style.fontSize = '22px';
  worldSelectorLabel.style.marginRight = '10px';
  worldSelectorLabel.style.marginLeft = '10px';
  worldSelectorLabel.style.marginTop = '10px';
  worldSelectorLabel.style.marginBottom = '10px';
  worldSelectorLabel.style.cursor = 'pointer';

  // set value to foo
  worldSelectorLabel.innerText = 'Worlds';

  // add label to worldSelectorItem
  worldSelectorItem.appendChild(worldSelectorLabel);
  worldSelectorItem.onpointerdown = function () {
    // hide world selector
    graphicsSelector.selectPicker.hideModal();
    // toggle select picker
    worldSelector.selectPicker.toggle();
  };
  worldSelectorItem.appendChild(worldSelector.selectBox);
  worldSelectorItem.title = 'Select World';

  // Create a flex container for the selectors
  var selectorsContainer = document.createElement('div');
  selectorsContainer.style.display = 'flex'; // Enable Flexbox
  selectorsContainer.style.alignItems = 'center'; // Align items vertically in the center
  selectorsContainer.style.justifyContent = 'space-between'; // Space out items
  selectorsContainer.style.margin = '20px'; // Add some margin for aesthetics

  selectorsContainer.appendChild(inspectorIcon);
  selectorsContainer.appendChild(graphicsSelectorItem);
  selectorsContainer.appendChild(worldSelectorItem);
  toolbarMenu.addElement('secondary', selectorsContainer);
  if (game.worlds.length > 0) {
    var currentWorldName = game.worlds[0].constructor.name;
    worldSelector.selectElement(currentWorldName);
  }

  // toolbarMenu.toolbar.style.display = 'none';
  toolbarMenu.slideOutToolbar();

  // Append the toolbar to the body
  $('body').append(toolbarMenu.toolbar);
}

// TODO: move this to a utils file
function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

},{"./GraphicsSelector.js":2,"./ToolbarMenu.js":4,"./WorldSelector.js":5}]},{},[1])(1)
});

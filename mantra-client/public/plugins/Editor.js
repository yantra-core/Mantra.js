(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Editor = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
      sourceCode = _ref.sourceCode;
    _classCallCheck(this, Editor);
    this.id = Editor.id;
    this.sourceCode = sourceCode;
  }
  _createClass(Editor, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.dropdownTimers = new Map(); // To manage delayed close timers

      // Check for jQuery
      if (typeof $ === 'undefined') {
        console.log('$ is not defined, attempting to load jQuery from vendor');
        game.loadScripts(['/vendor/jquery.min.js'], function () {
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
      this.createToolbar();
      this.setupGlobalClickListener();
      // this.createViewSourceModal();
    }
  }, {
    key: "createToolbar",
    value: function createToolbar() {
      var $toolbar = $('<div>', {
        id: 'editorToolbar',
        "class": 'editor-toolbar'
      });

      // Create menus
      var $fileMenu = this.createMenu('File');
      var $pluginsMenu = this.createMenu('Plugins', this.showPluginsGUI.bind(this));
      var $eventsMenu = this.createMenu('Events', this.showEventsInspector.bind(this));
      var $controlsMenu = this.createMenu('Controls', this.showControls.bind(this));
      var $entitiesMenu = this.createMenu('Entities', this.showEntities.bind(this));
      var $rulesMenu = this.createMenu('Rules', this.showRules.bind(this));
      var $inspectorMenu = this.createMenu('Inspector', this.showInspector.bind(this));
      // const $aboutMenu = this.createMenu('About');
      // TODO: add optional xstate menu for editing / viewing state machines

      // Populate menus
      this.populateFileMenu($fileMenu);
      this.populatePluginsMenu($pluginsMenu);

      // TODO: about links
      //this.populateAboutMenu($aboutMenu);

      // Append menus to the toolbar
      $toolbar.append($fileMenu, $pluginsMenu, $eventsMenu, $controlsMenu, $entitiesMenu, $rulesMenu, $inspectorMenu);

      // Append the toolbar to the body
      $('body').append($toolbar);
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
    key: "showRules",
    value: function showRules() {
      var game = this.game;
      if (typeof game.systems['gui-sutra'] === 'undefined') {
        game.use(new this.game.plugins.SutraGUI());
      } else {
        this.game.systemsManager.removeSystem('gui-sutra');
      }
    }
  }, {
    key: "showPluginsGUI",
    value: function showPluginsGUI() {
      var game = this.game;
      if (typeof game.systems['gui-plugins'] === 'undefined') {
        game.use(new this.game.plugins.PluginsGUI());
      } else {
        this.game.systemsManager.removeSystem('gui-plugins');
      }
    }
  }, {
    key: "showEventsInspector",
    value: function showEventsInspector() {
      var game = this.game;
      console.log('showEventsInspector', game.systems['gui-event-inspector']);
      if (typeof game.systems['gui-event-inspector'] === 'undefined') {
        game.use(new this.game.plugins.EventInspector());
      } else {
        this.game.systemsManager.removeSystem('gui-event-inspector');
      }
    }
  }, {
    key: "showControls",
    value: function showControls() {
      var game = this.game;
      if (typeof game.systems['gui-controls'] === 'undefined') {
        game.use(new this.game.plugins.ControlsGUI());
        this.game.systems['gui-controls'].drawTable();
      } else {
        this.game.systemsManager.removeSystem('gui-controls');
      }
    }
  }, {
    key: "showInspector",
    value: function showInspector() {
      var game = this.game;
      console.log('showInspector', game.systems['gui-inspector']);
      if (typeof game.systems['gui-inspector'] === 'undefined') {
        game.use(new this.game.plugins.Inspector());
      } else {
        this.game.systemsManager.removeSystem('gui-inspector');
      }
    }
  }, {
    key: "showEntities",
    value: function showEntities() {
      var game = this.game;
      if (typeof game.systems['gui-entities'] === 'undefined') {
        game.use(new this.game.plugins.EntitiesGUI());
        // this.game.systems['gui-entities'].drawTable();
      } else {
        this.game.systemsManager.removeSystem('gui-entities');
      }
    }
  }, {
    key: "createViewSourceModal",
    value: function createViewSourceModal() {
      // Create modal structure
      var $modal = $('<div>', {
        id: 'sourceCodeModal',
        "class": 'modal'
      });
      var $modalContent = $('<div>', {
        "class": 'modal-content'
      });
      var $closeSpan = $('<span>', {
        "class": 'close',
        text: '×'
      });
      var $sourcePre = $('<pre>', {
        id: 'sourceCode'
      });
      $modalContent.append($closeSpan, $sourcePre);
      $modal.append($modalContent);

      // Append the modal to the body
      $('body').append($modal);

      // Close event
      $closeSpan.on('click', function () {
        return $modal.hide();
      });
      $(window).on('click', function (event) {
        if ($(event.target).is($modal)) {
          $modal.hide();
        }
      });
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
var _default = exports["default"] = Editor;

},{}]},{},[1])(1)
});

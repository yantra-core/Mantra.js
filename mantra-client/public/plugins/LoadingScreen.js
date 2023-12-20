(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).LoadingScreen = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var LoadingScreen = /*#__PURE__*/function () {
  function LoadingScreen() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, LoadingScreen);
    this.id = LoadingScreen.id;
    this.plugins = [];
    this.minLoadTime = 3600; // Minimum time for the loading screen
    this.startTime = Date.now(); // Track the start time of the loading process
    this.loadedPluginsCount = 0;
    this.confirmedLoadedPlugins = [];
    this.pluginTimers = {}; // Store timers for each plugin
    this.pluginElements = {}; // Store references to plugin UI elements
  }
  _createClass(LoadingScreen, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
      var currentPlugins = Object.keys(this.game._plugins);
      this.plugins = this.plugins.concat(currentPlugins);
      this.plugins.sort();
      this.createLoadingScreen();
      this.game.on('plugin::loading', function (pluginId) {
        // check to see if we already have a loading timer for this plugin
        // if not, create one
        if (_this.plugins.indexOf(pluginId) === -1) {
          _this.plugins.push(pluginId);
          _this.createPluginLoader(pluginId);
        }
      });
      this.game.on('plugin::loaded', function (pluginId) {
        _this.markPluginAsLoaded(pluginId);
      });
      this.game.on('game::ready', function () {
        _this.gameReadyHandler();
      });
    }
  }, {
    key: "gameReadyHandler",
    value: function gameReadyHandler() {
      var _this2 = this;
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.startTime;
      var remainingTime = Math.max(this.minLoadTime - elapsedTime, 0);
      this.plugins.forEach(function (plugin) {
        if (!_this2.isPluginLoaded(plugin)) {
          _this2.fastTrackLoading(plugin, remainingTime);
        }
      });
      setTimeout(function () {
        _this2.unload();
      }, remainingTime);
    }
  }, {
    key: "isPluginLoaded",
    value: function isPluginLoaded(pluginId) {
      var progressBar = this.pluginElements[pluginId];
      return progressBar && progressBar.style.width === '100%';
    }
  }, {
    key: "fastTrackLoading",
    value: function fastTrackLoading(pluginId, remainingTime) {
      var _this3 = this;
      clearInterval(this.pluginTimers[pluginId]);
      var progressBar = this.pluginElements[pluginId];
      if (progressBar) {
        var currentWidth = parseInt(progressBar.style.width, 10) || 0;
        var intervalTime = remainingTime / (100 - currentWidth);
        this.pluginTimers[pluginId] = setInterval(function () {
          if (currentWidth < 100) {
            currentWidth++;
            progressBar.style.width = currentWidth + '%';
          } else {
            clearInterval(_this3.pluginTimers[pluginId]);
          }
        }, intervalTime);
      }
    }
  }, {
    key: "createLoadingScreen",
    value: function createLoadingScreen() {
      this.loadingScreen = document.createElement('div');
      this.loadingScreen.id = 'loadingScreen';
      this.setupStyles(this.loadingScreen, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      });

      // Header container
      var headerContainer = document.createElement('div');
      this.setupStyles(headerContainer, {
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px'
      });

      // Game title
      var gameTitle = document.createElement('div');
      gameTitle.textContent = 'Mantra.js Game Starting';
      this.setupStyles(gameTitle, {
        fontSize: '20px',
        fontWeight: 'bold'
      });

      // Plugin counter
      this.pluginCounter = document.createElement('div');
      this.updatePluginCounter(); // Update the plugin counter initially
      this.setupStyles(this.pluginCounter, {
        fontSize: '16px'
      });
      headerContainer.appendChild(gameTitle);
      headerContainer.appendChild(this.pluginCounter);
      this.loadingScreen.appendChild(headerContainer);
      this.createPluginLoaders();
      document.body.appendChild(this.loadingScreen);
    }
  }, {
    key: "updatePluginCounter",
    value: function updatePluginCounter() {
      // this.pluginCounter.textContent = `${this.loadedPluginsCount}/${this.plugins.length} plugins loaded`;
    }
  }, {
    key: "createPluginLoader",
    value: function createPluginLoader(plugin) {
      // Plugin container
      var pluginContainer = document.createElement('div');
      this.setupStyles(pluginContainer, {
        display: 'flex',
        alignItems: 'center',
        margin: '5px',
        width: '80%'
      });

      // Plugin name
      var pluginName = document.createElement('div');
      pluginName.textContent = plugin;
      this.setupStyles(pluginName, {
        marginRight: '10px',
        // Add margin to separate name from progress bar
        whiteSpace: 'nowrap' // Prevent plugin name from wrapping
      });

      // Progress bar container
      var progressBarContainer = document.createElement('div');
      this.setupStyles(progressBarContainer, {
        width: '60%',
        // Fixed width for all progress bars
        marginLeft: 'auto' // Aligns the progress bar container to the right
      });

      // Progress bar
      var progressBar = document.createElement('div');
      this.setupStyles(progressBar, {
        width: '0%',
        height: '20px',
        backgroundColor: 'limegreen'
      });
      progressBarContainer.appendChild(progressBar);
      pluginContainer.appendChild(pluginName);
      pluginContainer.appendChild(progressBarContainer);
      this.loadingScreen.appendChild(pluginContainer);
      this.pluginElements[plugin] = progressBar;

      // Initialize and store the loading timer for each plugin
      this.pluginTimers[plugin] = this.initializeLoadingTimer(progressBar, plugin);
    }
  }, {
    key: "createPluginLoaders",
    value: function createPluginLoaders() {
      var _this4 = this;
      this.plugins.forEach(function (plugin) {
        _this4.createPluginLoader(plugin);
      });
    }
  }, {
    key: "initializeLoadingTimer",
    value: function initializeLoadingTimer(progressBar, plugin) {
      var _this5 = this;
      var width = 0;
      var maxTime = this.minLoadTime + Math.random() * 5000; // Randomize load time
      var intervalTime = maxTime / 100;
      return setInterval(function () {
        if (width < 100) {
          width++;
          progressBar.style.width = width + '%';
        } else {
          clearInterval(_this5.pluginTimers[plugin]);
        }
      }, intervalTime);
    }
  }, {
    key: "markPluginAsLoaded",
    value: function markPluginAsLoaded(pluginId) {
      // Clear the existing slow loading timer
      clearInterval(this.pluginTimers[pluginId]);
      var progressBar = this.pluginElements[pluginId];
      if (progressBar) {
        // Start a new faster loading timer
        this.animateToCompletion(progressBar, pluginId);
      }
      if (this.confirmedLoadedPlugins.indexOf(pluginId) !== -1) {
        return;
      }
      this.confirmedLoadedPlugins.push(pluginId);
      this.loadedPluginsCount++;
      this.updatePluginCounter();
    }
  }, {
    key: "animateToCompletion",
    value: function animateToCompletion(progressBar, pluginId) {
      var _this6 = this;
      var currentWidth = parseInt(progressBar.style.width, 10) || 0;
      var fastLoadTime = Math.random() * 500 + 200; // Random time between 200ms and 700ms
      var intervalTime = fastLoadTime / (100 - currentWidth); // Time per percentage

      this.pluginTimers[pluginId] = setInterval(function () {
        if (currentWidth < 100) {
          currentWidth++;
          progressBar.style.width = currentWidth + '%';
        } else {
          clearInterval(_this6.pluginTimers[pluginId]);
        }
      }, intervalTime);
    }
  }, {
    key: "setupStyles",
    value: function setupStyles(element, styles) {
      Object.assign(element.style, styles);
    }
  }, {
    key: "unload",
    value: function unload() {
      Object.values(this.pluginTimers).forEach(clearInterval);
      if (this.loadingScreen && this.loadingScreen.parentNode) {
        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
      }
    }
  }]);
  return LoadingScreen;
}();
_defineProperty(LoadingScreen, "id", 'loading-screen');
var _default = exports["default"] = LoadingScreen;

},{}]},{},[1])(1)
});

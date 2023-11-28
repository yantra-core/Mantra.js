(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).YantraGUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var YantraGUI = /*#__PURE__*/function () {
  function YantraGUI() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, YantraGUI);
    this.id = YantraGUI.id;
    this.logContainer = null;
    this.logTextArea = null;
    this.pingTestComplete = false;
  }
  _createClass(YantraGUI, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createDisplay();
      var self = this;
      game.on('server::discovery::polling', function (data) {
        self.updateLog(data.message);
      });
      game.on('server::discovery::best-server', function (data) {
        var bestServer = data.data[0];
        var filteredData = {
          region: bestServer.region,
          activePlayers: bestServer.activePlayers,
          processId: bestServer.processId,
          hostId: bestServer.hostId,
          mode: bestServer.mode,
          settings: bestServer.settings
        };
        self.updateLog(JSON.stringify(filteredData, true, 2));
      });
      game.on('server::discovery::start', function (data) {
        self.updateLog(data.message);
      });
      game.on('server::discovery::message', function (data) {
        self.updateLog(data.message);
      });
      game.on('server::discovery::completed', function (data) {
        self.pingTestComplete = true;
      });
      game.on('server::discovery::pingtest', function (data) {
        var region = data.region;
        var latency = data.latency;
        var latencyClass = 'ping-good';
        if (latency > 100 && latency <= 200) {
          latencyClass = 'ping-moderate';
        } else if (latency > 200) {
          latencyClass = 'ping-poor';
        }
        var regionElement = document.querySelector("#pingResults .ping-region[data-region=\"".concat(region, "\"]"));
        if (regionElement) {
          regionElement.className = "ping-region ".concat(latencyClass);
          regionElement.textContent = "".concat(region, ": ").concat(latency, " ms");
        }
        self.sortPingResults();
      });
    }
  }, {
    key: "createDisplay",
    value: function createDisplay() {
      // Event listener to close the modal when clicking outside of it
      window.addEventListener('click', function (event) {
        if (event.target === document.getElementById('pingModal')) {
          document.getElementById('pingModal').style.display = 'none';
        }
      });

      // Event listener to close the modal on any key press after ping test results
      window.addEventListener('keydown', function () {
        if (self.pingTestComplete) {
          // assuming pingTestComplete is a boolean flag
          document.getElementById('pingModal').style.display = 'none';
        }
      });

      // Create a container for the two-column layout
      var columnsContainer = document.createElement('div');
      this.applyStyles(columnsContainer, {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      });

      // Create container for ping results (left column)
      var pingResults = document.createElement('div');
      pingResults.id = 'pingResults';
      pingResults.className = 'ping-results-container';
      this.applyStyles(pingResults, {
        width: '50%',
        marginRight: '10px' // Add some spacing between columns
      });

      // Create a header for the modal which includes the title and close button
      var modalHeader = document.createElement('div');
      this.applyStyles(modalHeader, {
        display: 'flex',
        justifyContent: 'space-between',
        // Space out title and close button
        alignItems: 'center',
        // Align items vertically
        width: '100%'
      });

      // Create and style the ping test modal
      var pingModal = document.createElement('div');
      pingModal.id = 'pingModal';
      pingModal.className = 'modal';
      this.applyStyles(pingModal, {
        /* Add necessary styles for modal */
      });

      // Create modal content container
      var modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      this.applyStyles(modalContent, {
        /* Add necessary styles for modal content */
      });
      // Create and style the close button (now part of the header)
      var closeButton = document.createElement('span');
      closeButton.className = 'close-button';
      closeButton.textContent = '×';
      this.applyStyles(closeButton, {
        cursor: 'pointer',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#aaa'
      });

      // Add title
      var title = document.createElement('h2');
      title.textContent = 'Yantra Server Discovery';

      // Add event listener to close button
      // const closeButton = document.querySelector('.close-button');
      closeButton.addEventListener('click', function () {
        document.getElementById('pingModal').style.display = 'none';
      });

      // Create and add title to the header
      modalHeader.appendChild(title);

      // Add the close button to the header
      modalHeader.appendChild(closeButton);

      // Append the header to the modal content
      modalContent.prepend(modalHeader);

      // Append elements
      //modalContent.appendChild(closeButton);
      //modalContent.appendChild(title);
      modalContent.appendChild(pingResults);
      pingModal.appendChild(modalContent);
      document.body.appendChild(pingModal);

      // Initialize regions with a pending state
      window.YANTRA.serverDiscovery.regionList.forEach(function (regionInfo) {
        var regionElement = document.createElement('div');
        regionElement.className = 'ping-region ping-pending';
        regionElement.setAttribute('data-region', regionInfo.region);
        regionElement.textContent = "".concat(regionInfo.region, ": Pending...");
        document.getElementById('pingResults').appendChild(regionElement);
      });

      // Create container for log text (right column)
      this.logTextArea = document.createElement('textarea');
      this.logTextArea.id = 'yantraLogTextArea';
      this.logTextArea.readOnly = true;
      this.applyStyles(this.logTextArea, {
        width: '50%',
        height: '400px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        boxSizing: 'border-box',
        overflowY: 'scroll'
      });

      // Append elements to the columns container
      columnsContainer.appendChild(pingResults);
      columnsContainer.appendChild(this.logTextArea);

      // Append columns container to the modal content
      modalContent.appendChild(columnsContainer);

      // Append elements to the log container and then to the body
      //this.logContainer.appendChild(this.logTextArea);
      //document.body.appendChild(this.logContainer);
    }
  }, {
    key: "applyStyles",
    value: function applyStyles(element, styles) {
      for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        element.style[key] = value;
      }
    }
  }, {
    key: "updateLog",
    value: function updateLog(message) {
      this.logTextArea.value += message + '\n';
      this.logTextArea.scrollTop = this.logTextArea.scrollHeight;
    }
  }, {
    key: "sortPingResults",
    value: function sortPingResults() {
      var pingResultsContainer = document.getElementById('pingResults');
      var regions = Array.from(pingResultsContainer.children);
      regions.sort(function (a, b) {
        var latencyA = parseInt(a.textContent.split(': ')[1]);
        var latencyB = parseInt(b.textContent.split(': ')[1]);
        return latencyA - latencyB;
      });

      // Re-append the sorted regions to the container
      regions.forEach(function (region) {
        return pingResultsContainer.appendChild(region);
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      // Remove elements when the plugin is unloaded
      if (this.logContainer && this.logContainer.parentNode) {
        this.logContainer.parentNode.removeChild(this.logContainer);
      }
      this.logContainer = null;
      this.logTextArea = null;
    }
  }]);
  return YantraGUI;
}(); // Exporting the plugin class
_defineProperty(YantraGUI, "id", 'gui-yantra');
var _default = exports["default"] = YantraGUI;

},{}]},{},[1])(1)
});

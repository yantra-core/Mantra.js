(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).SnapshotSize = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bytes = _interopRequireDefault(require("./vendor/bytes/bytes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // SnapshotSize.js - Marak Squires 2023
var SnapshotSize = /*#__PURE__*/function () {
  function SnapshotSize() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SnapshotSize);
    this.averageSnapshotSize = null;
    this.displayElement = null;
    this.id = SnapshotSize.id;
  }
  _createClass(SnapshotSize, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.createDisplay();
      this.subscribeToSnapshotSizeEvent();
    }
  }, {
    key: "createDisplay",
    value: function createDisplay() {
      this.displayElement = document.createElement('div');
      this.displayElement.id = "snapshotSizeDisplay";
      this.displayElement.style.position = 'absolute';
      this.displayElement.style.top = '8px';
      this.displayElement.style.right = '350px';
      this.displayElement.style.padding = '5px';
      this.displayElement.style.zIndex = '1000';
      this.displayElement.style.border = '1px solid #ddd';
      this.displayElement.style.borderRadius = '4px';
      this.displayElement.style.backgroundColor = '#f8f8f8';
      this.displayElement.textContent = 'Snapshot Size: - bytes';
      // hide
      this.displayElement.style.display = 'none';
      document.body.appendChild(this.displayElement);
    }
  }, {
    key: "subscribeToSnapshotSizeEvent",
    value: function subscribeToSnapshotSizeEvent() {
      var _this = this;
      this.game.on('snapshotsize', function (size) {
        // check if hidden, if so show
        if (_this.displayElement.style.display === 'none') {
          _this.displayElement.style.display = 'block';
        }
        _this.averageSnapshotSize = truncateToPrecision(size);
        _this.displaySnapshotSize();
      });
    }
  }, {
    key: "displaySnapshotSize",
    value: function displaySnapshotSize() {
      if (this.displayElement) {
        this.displayElement.textContent = "Snapshot Size: ".concat((0, _bytes["default"])(this.averageSnapshotSize));
        // Optional: Add logic to change color based on snapshot size
        if (this.averageSnapshotSize < 1024) {
          this.displayElement.style.color = 'green';
        } else if (this.averageSnapshotSize < 2048) {
          this.displayElement.style.color = 'orange';
        } else {
          this.displayElement.style.color = 'red';
        }
      }
    }
  }, {
    key: "unload",
    value: function unload() {
      if (this.displayElement && this.displayElement.parentNode) {
        this.displayElement.parentNode.removeChild(this.displayElement);
      }
      this.displayElement = null;
    }
  }]);
  return SnapshotSize;
}();
_defineProperty(SnapshotSize, "id", 'gui-snapshot-size');
var truncateToPrecision = function truncateToPrecision(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  // Adjust the precision based on the value size if needed
  var factor = value < 1 ? 100 : value < 1024 ? 10 : 1;
  return Math.round(value * factor) / factor;
};
var _default = exports["default"] = SnapshotSize;

},{"./vendor/bytes/bytes.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
/**
 * Module exports.
 * @public
 */
var _default = exports["default"] = bytes;
/**
 * Module variables.
 * @private
 */
var formatThousandsRegExp = /\B(?=(\d{3})+(?!\d))/g;
var formatDecimalsRegExp = /(?:\.0*|(\.[^0]+)0+)$/;
var map = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: Math.pow(1024, 4),
  pb: Math.pow(1024, 5)
};
var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;

/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  decimalPlaces: [number]
 *  fixedDecimals: [boolean]
 *  thousandsSeparator: [string]
 *  unitSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  if (typeof value === 'string') {
    return parse(value);
  }
  if (typeof value === 'number') {
    return format(value, options);
  }
  return null;
}

/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]
 * @param {number} [options.fixedDecimals=false]
 * @param {string} [options.thousandsSeparator=]
 * @param {string} [options.unit=]
 * @param {string} [options.unitSeparator=]
 *
 * @returns {string|null}
 * @public
 */

function format(value, options) {
  if (!Number.isFinite(value)) {
    return null;
  }
  var mag = Math.abs(value);
  var thousandsSeparator = options && options.thousandsSeparator || '';
  var unitSeparator = options && options.unitSeparator || '';
  var decimalPlaces = options && options.decimalPlaces !== undefined ? options.decimalPlaces : 2;
  var fixedDecimals = Boolean(options && options.fixedDecimals);
  var unit = options && options.unit || '';
  if (!unit || !map[unit.toLowerCase()]) {
    if (mag >= map.pb) {
      unit = 'PB';
    } else if (mag >= map.tb) {
      unit = 'TB';
    } else if (mag >= map.gb) {
      unit = 'GB';
    } else if (mag >= map.mb) {
      unit = 'MB';
    } else if (mag >= map.kb) {
      unit = 'KB';
    } else {
      unit = 'B';
    }
  }
  var val = value / map[unit.toLowerCase()];
  var str = val.toFixed(decimalPlaces);
  if (!fixedDecimals) {
    str = str.replace(formatDecimalsRegExp, '$1');
  }
  if (thousandsSeparator) {
    str = str.split('.').map(function (s, i) {
      return i === 0 ? s.replace(formatThousandsRegExp, thousandsSeparator) : s;
    }).join('.');
  }
  return str + unitSeparator + unit;
}

/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 *
 * @returns {number|null}
 * @public
 */

function parse(val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }
  if (typeof val !== 'string') {
    return null;
  }

  // Test if the string passed is valid
  var results = parseRegExp.exec(val);
  var floatValue;
  var unit = 'b';
  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(val, 10);
    unit = 'b';
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }
  if (isNaN(floatValue)) {
    return null;
  }
  return Math.floor(map[unit] * floatValue);
}

},{}]},{},[1])(1)
});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Creator = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Creator.js - WIP - Intended to be a GUI for sending data to emitters by name
var Creator = /*#__PURE__*/function () {
  function Creator() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Creator);
    this.id = Creator.id;
  }
  _createClass(Creator, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.drawEmitterList();
    }
  }, {
    key: "drawEmitterList",
    value: function drawEmitterList() {
      var _this = this;
      var emitters = Object.keys(this.game.emitters);

      // Create Dropdown
      var dropdown = document.createElement('select');
      dropdown.id = "emittersDropdown";
      var emittersKeys = Object.keys(this.game.emitters);
      // sort
      emittersKeys.sort();
      emittersKeys.forEach(function (emitterName) {
        var option = document.createElement('option');
        option.value = emitterName;
        option.textContent = emitterName;
        dropdown.appendChild(option);
      });

      // Create Method List Container
      var methodList = document.createElement('div');
      methodList.id = "methodList";

      // Event Listener for Emitter Selection
      dropdown.addEventListener('change', function (event) {
        _this.updateMethodList(event.target.value, methodList);
      });

      // Append Elements to the Document
      var container = document.createElement('div');
      container.id = "emittersContainer";
      container.appendChild(dropdown);
      container.appendChild(methodList);
      document.body.appendChild(container);

      // Initialize with the first emitter
      this.updateMethodList(emitters[0], methodList);
    }
  }, {
    key: "updateMethodList",
    value: function updateMethodList(emitterName, methodListContainer) {
      var _this2 = this;
      methodListContainer.innerHTML = '';
      console.log('emitterName', emitterName);
      var methods = Object.keys(this.game.emitters[emitterName] || {});
      methods.forEach(function (method) {
        var form = document.createElement('form');
        form.onsubmit = function (e) {
          e.preventDefault();
          console.log('ahhh', emitterName, method, form);
          _this2.invokeMethod(emitterName, method, form);
        };
        var button = document.createElement('button');
        button.type = 'submit';
        button.textContent = method;
        var input = document.createElement('textarea');
        input.placeholder = 'Enter entityData as JSON';
        form.appendChild(input);
        form.appendChild(button);
        methodListContainer.appendChild(form);
      });
    }
  }, {
    key: "invokeMethod",
    value: function invokeMethod(emitterName, methodName, form) {
      var entityData = {};
      /*
      try {
        entityData = JSON.parse(form.querySelector('textarea').value);
      } catch (e) {
        console.error('Invalid JSON input:', e);
      }
      */
      console.log("Invoked ".concat(emitterName, "::").concat(methodName, " with"), entityData);
      console.log('this.game.emitters', emitterName, this.game.emitters);
      var fn = emitterName.split('::')[1];
      this.game.emitters[emitterName][fn](entityData);
      // Add actual invocation logic here, passing entityData
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Clean up if necessary
    }
  }]);
  return Creator;
}();
_defineProperty(Creator, "id", 'gui-creator');
var _default = exports["default"] = Creator;

},{}]},{},[1])(1)
});

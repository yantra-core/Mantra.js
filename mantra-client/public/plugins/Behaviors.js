(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Behaviors = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Behaviors.js - Marak Squires 2023
var Behaviors = /*#__PURE__*/function () {
  function Behaviors() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Behaviors);
    this.id = Behaviors.id;
  }
  _createClass(Behaviors, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      // register behaviors as system
      game.systemsManager.addSystem(this.id, this);
    }

    // Behavior Methods
  }, {
    key: "approach",
    value: function approach(target) {
      // Logic for approaching a target
    }
  }, {
    key: "evade",
    value: function evade() {
      // Logic for evading or dodging
    }
  }, {
    key: "investigate",
    value: function investigate(area) {
      // Logic for investigating an area or object
    }
  }, {
    key: "idle",
    value: function idle() {
      // Logic for idle behavior
    }
  }, {
    key: "flee",
    value: function flee() {
      // Logic for fleeing from danger
    }
  }, {
    key: "pursue",
    value: function pursue(target) {
      // Logic for pursuing a target
    }
  }, {
    key: "defend",
    value: function defend(target) {
      // Logic for defending or guarding
    }
  }, {
    key: "attack",
    value: function attack(target) {
      // Logic for attacking
    }
  }, {
    key: "patrol",
    value: function patrol(path) {
      // Logic for patrolling a set path
    }
  }, {
    key: "interact",
    value: function interact(object) {
      // Logic for interacting with objects or characters
    }
  }, {
    key: "search",
    value: function search(target) {
      // Logic for searching for something or someone
    }
  }, {
    key: "alert",
    value: function alert(signal) {
      // Logic for reacting to alerts
    }
  }, {
    key: "useAbility",
    value: function useAbility(ability) {
      // Logic for using a special skill or ability
    }
  }, {
    key: "communicate",
    value: function communicate(message) {
      // Logic for engaging in dialogue or signaling
    }
  }, {
    key: "follow",
    value: function follow(target) {
      // Logic for following another character or entity
    }
  }, {
    key: "gather",
    value: function gather(resources) {
      // Logic for gathering resources or items
    }
  }, {
    key: "rest",
    value: function rest() {
      // Logic for resting or healing
    }
  }, {
    key: "wander",
    value: function wander() {
      // Logic for wandering or exploring randomly
    }
  }]);
  return Behaviors;
}();
_defineProperty(Behaviors, "id", 'behaviors');
var _default = exports["default"] = Behaviors;

},{}]},{},[1])(1)
});

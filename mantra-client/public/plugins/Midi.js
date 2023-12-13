(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Midi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Midi.js - Marak Squires 2023
var Midi = /*#__PURE__*/function () {
  function Midi() {
    _classCallCheck(this, Midi);
    this.id = Midi.id;
    this.devices = {};
    this.currentInput = null;
  }
  _createClass(Midi, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.connectMidi();
      game.on('midi-message', this.handleMidiMessage.bind(this));
    }
  }, {
    key: "connectMidi",
    value: function connectMidi() {
      this.game.emit('midi::log', 'Attempting to connect MIDI...');
      if (!navigator.requestMIDIAccess) {
        console.error('Web MIDI API not supported.');
        this.game.emit('midi::log', 'Web MIDI API not supported.');
        return;
      }
      navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this), this.onMidiFailure.bind(this));
    }
  }, {
    key: "onMidiSuccess",
    value: function onMidiSuccess(midiAccess) {
      var _this = this;
      this.game.emit('midi::log', 'MIDI Connected!');
      console.log('MIDI Access:', midiAccess);
      this.midi = midiAccess;
      var inputs = midiAccess.inputs;
      inputs.forEach(function (input) {
        input.onmidimessage = _this.emitMidiData.bind(_this);
        _this.devices[input.name] = input;
      });
    }
  }, {
    key: "onMidiFailure",
    value: function onMidiFailure(err) {
      this.game.emit('midi::log', "MIDI Initialization Error: ".concat(err.message));
      console.error("MIDI Initialization Error: ".concat(err));
    }
  }, {
    key: "emitMidiData",
    value: function emitMidiData(event) {
      this.game.emit('midi-data', event.data);
    }
  }, {
    key: "handleMidiMessage",
    value: function handleMidiMessage(message) {
      // Handle incoming MIDI messages here
      this.game.emit('midi-data', message);
      console.log('MIDI Message:', message);
    }
  }, {
    key: "unload",
    value: function unload() {
      // Cleanup, if necessary
    }
  }]);
  return Midi;
}();
_defineProperty(Midi, "id", 'midi');
var _default = exports["default"] = Midi;

},{}]},{},[1])(1)
});

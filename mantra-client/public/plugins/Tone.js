(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tone = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';
var TonePlugin = /*#__PURE__*/function () {
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  function TonePlugin() {
    _classCallCheck(this, TonePlugin);
    this.id = TonePlugin.id;
    this.synth = null;
    this.userEnabled = false;
  }
  _createClass(TonePlugin, [{
    key: "init",
    value: function init(game) {
      var _this = this;
      this.game = game;
      // check to see if Tone scope is available, if not assume we need to inject it sequentially
      if (typeof Tone === 'undefined') {
        console.log('Tone is not defined, attempting to load it from vendor');
        game.loadScripts(['/vendor/tone.min.js'], function () {
          _this.toneReady(game);
        });
      } else {
        this.toneReady(game);
      }
    }
  }, {
    key: "toneReady",
    value: function toneReady() {
      var game = this.game;

      //create a synth and connect it to the main output (your speakers)
      var synth = new Tone.Synth().toDestination();
      // game.createSynth = function() {};

      game.playNote = function (note, duration) {
        if (!this.userEnabled) {
          // prompt the user for interaction to enable audio
          Tone.start();
        }
        // console.log('playing ', note, duration)

        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease("C4", "8n");
        game.emit('playNote', note, duration);
      };
      game.playNote("C4", "8n");

      // async:true plugins *must* self report when they are ready
      game.emit('plugin::ready::tone', this);
    }
  }, {
    key: "playNote",
    value: function playNote(note, duration) {
      // Play a note for a given duration
      this.synth.triggerAttackRelease(note, duration);
    }
  }]);
  return TonePlugin;
}();
_defineProperty(TonePlugin, "id", 'tone');
_defineProperty(TonePlugin, "async", true);
var _default = exports["default"] = TonePlugin;
/*
setInterval(function(){
  game.playNote("C4", "8n");
}, 2000)
*/
// Test Note
/*
var pattern = new Tone.Pattern(function (time, note) {
synth.triggerAttackRelease(note, 0.25);
}, ["C4", "D4", "E4", "G4", "A4"]);
// begin at the beginning
//pattern.start(0);
//Tone.Transport.start();
*/

},{}]},{},[1])(1)
});

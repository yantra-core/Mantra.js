(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Tone = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _startUp = _interopRequireDefault(require("./jingles/start-up.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';
var TonePlugin = /*#__PURE__*/function () {
  // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  function TonePlugin() {
    _classCallCheck(this, TonePlugin);
    this.id = TonePlugin.id;
    this.synth = null;
    this.playIntro = true;
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
      var _this2 = this;
      var game = this.game;
      var self = this;
      var that = this;

      // TODO: game.createSynth = function() {};
      this.synth = new Tone.Synth().toDestination();
      game.playNote = function (note, duration) {
        Tone.start();
        // console.log('playing ', note, duration)
        //play a middle 'C' for the duration of an 8th note
        self.playNote(note, duration);
      };

      // Create a synth and connect it to the main output
      //const synth = new Tone.Synth().toDestination();

      console.log('Tone is ready', _startUp["default"]);
      if (this.playIntro) {
        var synths = [];
        var currentMidi = _startUp["default"];
        var now = Tone.now() + 0.5;
        currentMidi.tracks.forEach(function (track) {
          //create a synth for each track
          _this2.synth = new Tone.PolySynth(Tone.Synth, {
            envelope: {
              attack: 0.02,
              decay: 0.1,
              sustain: 0.3,
              release: 1
            }
          }).toDestination();
          synths.push(that.synth);
          //schedule all of the events
          // we have access to that.synth, can we listen for play note events?
          track.notes.forEach(function (note) {
            that.playNote(note.name, note.duration, note.time + now, note.velocity);
          });
        });
      }

      // Function to play the sound
      function playSound(sound) {
        Tone.start(); // Start audio context - required for newer browsers

        sound.notes.forEach(function (note) {
          synth.triggerAttackRelease(note, sound.duration);
        });
      }

      // async:true plugins *must* self report when they are ready
      game.emit('plugin::ready::tone', this);
    }
  }, {
    key: "playNote",
    value: function playNote(note, duration) {
      var now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var velocity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      // console.log('playing ', note, duration)
      var game = this.game;
      // Play a note for a given duration
      this.synth.triggerAttackRelease(note, duration, now, velocity);
      // game.emit('playNote', note, duration, now, velocity);
    }
  }]);
  return TonePlugin;
}();
_defineProperty(TonePlugin, "id", 'tone');
_defineProperty(TonePlugin, "async", true);
var _default = exports["default"] = TonePlugin;

},{"./jingles/start-up.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  "header": {
    "keySignatures": [],
    "meta": [],
    "name": "Single Staff",
    "ppq": 480,
    "tempos": [{
      "bpm": 145.03368407312598,
      "ticks": 0
    }],
    "timeSignatures": [{
      "ticks": 0,
      "timeSignature": [4, 4],
      "measures": 0
    }]
  },
  "tracks": [{
    "channel": 0,
    "controlChanges": {
      "0": [{
        "number": 0,
        "ticks": 0,
        "time": 0,
        "value": 0
      }],
      "32": [{
        "number": 32,
        "ticks": 0,
        "time": 0,
        "value": 0
      }]
    },
    "pitchBends": [],
    "instrument": {
      "family": "piano",
      "number": 0,
      "name": "acoustic grand piano"
    },
    "name": "Track 1",
    "notes": [],
    "endOfTrackTicks": 7680
  }, {
    "channel": 0,
    "controlChanges": {},
    "pitchBends": [],
    "instrument": {
      "family": "reed",
      "number": 71,
      "name": "clarinet"
    },
    "name": "",
    "notes": [{
      "duration": 0.13100404999999998,
      "durationTicks": 152,
      "midi": 55,
      "name": "G3",
      "ticks": 0,
      "time": 0,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100404999999998,
      "durationTicks": 152,
      "midi": 60,
      "name": "C4",
      "ticks": 159,
      "time": 0.13703713125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13014218125,
      "durationTicks": 151,
      "midi": 64,
      "name": "E4",
      "ticks": 319,
      "time": 0.27493613125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 67,
      "name": "G4",
      "ticks": 480,
      "time": 0.413697,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100404999999993,
      "durationTicks": 152,
      "midi": 72,
      "name": "C5",
      "ticks": 639,
      "time": 0.55073413125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 76,
      "name": "E5",
      "ticks": 799,
      "time": 0.6886331312499999,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 79,
      "name": "G5",
      "ticks": 960,
      "time": 0.827394,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 76,
      "name": "E5",
      "ticks": 1440,
      "time": 1.241091,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100404999999982,
      "durationTicks": 152,
      "midi": 56,
      "name": "G#3",
      "ticks": 1920,
      "time": 1.654788,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 60,
      "name": "C4",
      "ticks": 2079,
      "time": 1.7918251312499998,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 63,
      "name": "D#4",
      "ticks": 2239,
      "time": 1.92972413125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 68,
      "name": "G#4",
      "ticks": 2400,
      "time": 2.068485,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 72,
      "name": "C5",
      "ticks": 2559,
      "time": 2.20552213125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 75,
      "name": "D#5",
      "ticks": 2719,
      "time": 2.34342113125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 80,
      "name": "G#5",
      "ticks": 2880,
      "time": 2.482182,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 75,
      "name": "D#5",
      "ticks": 3360,
      "time": 2.895879,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 58,
      "name": "A#3",
      "ticks": 3840,
      "time": 3.309576,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 62,
      "name": "D4",
      "ticks": 3999,
      "time": 3.4466131312500004,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 65,
      "name": "F4",
      "ticks": 4159,
      "time": 3.5845121312499995,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 70,
      "name": "A#4",
      "ticks": 4320,
      "time": 3.723273,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 74,
      "name": "D5",
      "ticks": 4479,
      "time": 3.8603101312500003,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 77,
      "name": "F5",
      "ticks": 4639,
      "time": 3.9982091312499994,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 82,
      "name": "A#5",
      "ticks": 4800,
      "time": 4.13697,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 82,
      "name": "A#5",
      "ticks": 5280,
      "time": 4.550667,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 82,
      "name": "A#5",
      "ticks": 5439,
      "time": 4.68770413125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 82,
      "name": "A#5",
      "ticks": 5599,
      "time": 4.825603131249999,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 76,
      "name": "E5",
      "ticks": 5760,
      "time": 4.964364,
      "velocity": 0.7874015748031497
    }]
  }, {
    "channel": 0,
    "controlChanges": {
      "0": [{
        "number": 0,
        "ticks": 0,
        "time": 0,
        "value": 0
      }],
      "32": [{
        "number": 32,
        "ticks": 0,
        "time": 0,
        "value": 0
      }]
    },
    "pitchBends": [],
    "instrument": {
      "family": "piano",
      "number": 0,
      "name": "acoustic grand piano"
    },
    "name": "Sequenced By",
    "notes": [],
    "endOfTrackTicks": 7680
  }, {
    "channel": 1,
    "controlChanges": {},
    "pitchBends": [],
    "instrument": {
      "family": "reed",
      "number": 71,
      "name": "clarinet"
    },
    "name": "",
    "notes": [{
      "duration": 0.13100404999999998,
      "durationTicks": 152,
      "midi": 52,
      "name": "E3",
      "ticks": 160,
      "time": 0.137899,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.13100404999999998,
      "durationTicks": 152,
      "midi": 55,
      "name": "G3",
      "ticks": 320,
      "time": 0.275798,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 60,
      "name": "C4",
      "ticks": 480,
      "time": 0.413697,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.13100404999999993,
      "durationTicks": 152,
      "midi": 64,
      "name": "E4",
      "ticks": 640,
      "time": 0.551596,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 67,
      "name": "G4",
      "ticks": 800,
      "time": 0.689495,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 72,
      "name": "C5",
      "ticks": 960,
      "time": 0.827394,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 67,
      "name": "G4",
      "ticks": 1440,
      "time": 1.241091,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.13100405000000026,
      "durationTicks": 152,
      "midi": 51,
      "name": "D#3",
      "ticks": 2080,
      "time": 1.7926869999999997,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100404999999982,
      "durationTicks": 152,
      "midi": 56,
      "name": "G#3",
      "ticks": 2240,
      "time": 1.9305860000000001,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 60,
      "name": "C4",
      "ticks": 2400,
      "time": 2.068485,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 63,
      "name": "D#4",
      "ticks": 2560,
      "time": 2.206384,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 68,
      "name": "G#4",
      "ticks": 2720,
      "time": 2.344283,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 72,
      "name": "C5",
      "ticks": 2880,
      "time": 2.482182,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 68,
      "name": "G#4",
      "ticks": 3360,
      "time": 2.895879,
      "velocity": 0.7086614173228346
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 53,
      "name": "F3",
      "ticks": 4000,
      "time": 3.4474750000000003,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 58,
      "name": "A#3",
      "ticks": 4160,
      "time": 3.5853739999999994,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 62,
      "name": "D4",
      "ticks": 4320,
      "time": 3.723273,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 65,
      "name": "F4",
      "ticks": 4480,
      "time": 3.8611720000000003,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 70,
      "name": "A#4",
      "ticks": 4640,
      "time": 3.9990709999999994,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 74,
      "name": "D5",
      "ticks": 4800,
      "time": 4.13697,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 74,
      "name": "D5",
      "ticks": 5280,
      "time": 4.550667,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 84,
      "name": "C6",
      "ticks": 5760,
      "time": 4.964364,
      "velocity": 0.7874015748031497
    }]
  }, {
    "channel": 0,
    "controlChanges": {
      "0": [{
        "number": 0,
        "ticks": 0,
        "time": 0,
        "value": 0
      }],
      "32": [{
        "number": 32,
        "ticks": 0,
        "time": 0,
        "value": 0
      }]
    },
    "pitchBends": [],
    "instrument": {
      "family": "piano",
      "number": 0,
      "name": "acoustic grand piano"
    },
    "name": "MIDI225368@aol.com",
    "notes": [],
    "endOfTrackTicks": 7680
  }, {
    "channel": 2,
    "controlChanges": {},
    "pitchBends": [],
    "instrument": {
      "family": "reed",
      "number": 71,
      "name": "clarinet"
    },
    "name": "",
    "notes": [{
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 48,
      "name": "C3",
      "ticks": 480,
      "time": 0.413697,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100404999999993,
      "durationTicks": 152,
      "midi": 52,
      "name": "E3",
      "ticks": 639,
      "time": 0.55073413125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 55,
      "name": "G3",
      "ticks": 799,
      "time": 0.6886331312499999,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 64,
      "name": "E4",
      "ticks": 960,
      "time": 0.827394,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 60,
      "name": "C4",
      "ticks": 1440,
      "time": 1.241091,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.13100405000000004,
      "durationTicks": 152,
      "midi": 48,
      "name": "C3",
      "ticks": 2400,
      "time": 2.068485,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 51,
      "name": "D#3",
      "ticks": 2559,
      "time": 2.20552213125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 56,
      "name": "G#3",
      "ticks": 2719,
      "time": 2.34342113125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 63,
      "name": "D#4",
      "ticks": 2880,
      "time": 2.482182,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.3930121500000001,
      "durationTicks": 456,
      "midi": 60,
      "name": "C4",
      "ticks": 3360,
      "time": 2.895879,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.19650607499999984,
      "durationTicks": 228,
      "midi": 50,
      "name": "D3",
      "ticks": 4320,
      "time": 3.723273,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 53,
      "name": "F3",
      "ticks": 4479,
      "time": 3.8603101312500003,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 58,
      "name": "A#3",
      "ticks": 4639,
      "time": 3.9982091312499994,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 65,
      "name": "F4",
      "ticks": 4800,
      "time": 4.13697,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 62,
      "name": "D4",
      "ticks": 5280,
      "time": 4.550667,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1310040499999996,
      "durationTicks": 152,
      "midi": 62,
      "name": "D4",
      "ticks": 5439,
      "time": 4.68770413125,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.1301421812500001,
      "durationTicks": 151,
      "midi": 62,
      "name": "D4",
      "ticks": 5599,
      "time": 4.825603131249999,
      "velocity": 0.7874015748031497
    }, {
      "duration": 0.39301214999999967,
      "durationTicks": 456,
      "midi": 60,
      "name": "C4",
      "ticks": 5760,
      "time": 4.964364,
      "velocity": 0.7874015748031497
    }]
  }]
};

},{}]},{},[1])(1)
});

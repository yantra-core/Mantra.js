// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';

import startUpJingle from './jingles/start-up.js';

class TonePlugin {

  static id = 'tone';
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor() {
    this.id = TonePlugin.id;
    this.synth = null;
    this.playIntro = true;
    this.userEnabled = false;
  }

  init(game) {
    this.game = game;
    // check to see if Tone scope is available, if not assume we need to inject it sequentially
    if (typeof Tone === 'undefined') {
      console.log('Tone is not defined, attempting to load it from vendor');
      game.loadScripts(['/vendor/tone.min.js'], () => {
        this.toneReady(game);
      });
    } else {
      this.toneReady(game);
    }
  }

  toneReady() {
    let game = this.game;
    let self = this;
    let that = this;

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

    console.log('Tone is ready', startUpJingle)
    if (this.playIntro) {
      const synths = [];
      let currentMidi = startUpJingle;
      const now = Tone.now() + 0.5;
      currentMidi.tracks.forEach((track) => {
        //create a synth for each track
       this.synth = new Tone.PolySynth(Tone.Synth, {
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 1,
          },
        }).toDestination();
        synths.push(that.synth);
        //schedule all of the events
        // we have access to that.synth, can we listen for play note events?
        track.notes.forEach((note) => {
          that.playNote(
            note.name,
            note.duration,
            note.time + now,
            note.velocity
          )
        });
      });
    }

    // Function to play the sound
    function playSound(sound) {
      Tone.start(); // Start audio context - required for newer browsers

      sound.notes.forEach(note => {
        synth.triggerAttackRelease(note, sound.duration);
      });
    }

    // async:true plugins *must* self report when they are ready
    game.emit('plugin::ready::tone', this);
  }

  playNote(note, duration, now = 0, velocity = 1) {
    // console.log('playing ', note, duration)
    let game = this.game;
    // Play a note for a given duration
    this.synth.triggerAttackRelease(note, duration, now, velocity);
    // game.emit('playNote', note, duration, now, velocity);
  }
}

export default TonePlugin;
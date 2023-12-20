// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';

class TonePlugin {

  static id = 'tone';
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor() {
    this.id = TonePlugin.id;
    this.synth = null;
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
    //create a synth and connect it to the main output (your speakers)
    this.synth = new Tone.Synth().toDestination();
    // game.createSynth = function() {};

    game.playNote = function (note, duration) {
      if (!this.userEnabled) {
        // prompt the user for interaction to enable audio
        Tone.start();
      }
      // console.log('playing ', note, duration)
      //play a middle 'C' for the duration of an 8th note
      self.playNote("C4", "8n");
    };

    self.playNote("C4", "8n");

    // async:true plugins *must* self report when they are ready
    game.emit('plugin::ready::tone', this);
  }

  playNote(note, duration) {
    console.log('playing ', note, duration)
    let game = this.game;
    // Play a note for a given duration
    this.synth.triggerAttackRelease(note, duration);
    game.emit('playNote', note, duration);
  }
}

export default TonePlugin;

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
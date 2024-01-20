// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';

import DrumKit from './instruments/DrumKit.js';
import startUpJingle from './jingles/start-up.js';
import keyCodes from './keyCodes.js';
import harmonicShift from './util/harmonicShift.js';
import playJingle from './util/playJingle.js';
import playSpatialSound from './util/playSpatialSound.js';

class TonePlugin {

  static id = 'tone';
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor() {
    this.id = TonePlugin.id;
    this.synth = null;
    this.playIntro = false;
    this.userEnabled = false;
    this.lastNotePlayed = null;
    this.keyCodes = keyCodes;
    this.toneStarted = false;
  }

  init(game) {
    this.game = game;
    
    this.harmonicShift = harmonicShift.bind(this);
    this.playJingle = playJingle.bind(this);
    this.playSpatialSound = playSpatialSound.bind(this);
    // register the plugin with the game
    this.game.systemsManager.addSystem(this.id, this);
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

    // Tone.context.latencyHint = 'interactive'; // or a number in seconds
    Tone.Transport.lookAhead = 0.5; // in seconds

    this.drumKit = new DrumKit();


    this.game.playSpatialSound = this.playSpatialSound.bind(this);
      
    const limiter = new Tone.Limiter(-6).toDestination();

    // Create a compressor
    /*
    const compressor = new Tone.Compressor({
      threshold: -3, // Threshold in dB
      ratio: 4,       // Compression ratio
      attack: 0.003,  // Attack time in seconds
      release: 0.25   // Release time in seconds
    }).toDestination();
    */

    // TODO: game.createSynth = function() {};
    this.synth = new Tone.Synth();
    this.synth.volume.value = -3; // Lower volume

    //this.synth.connect(compressor);
    this.synth.connect(limiter);


    game.playDrum = function (sound = 'kick') {
      if (!this.toneStarted) {
        Tone.start();
        this.toneStarted = true;
      }
      that.drumKit.play(sound);
    };

    game.playNote = function (note, duration) {
      if (!this.toneStarted) {
        Tone.start();
        this.toneStarted = true;
      }      // console.log('playing ', note, duration)
      //play a middle 'C' for the duration of an 8th note
      self.playNote(note, duration);
    };

    // Create a synth and connect it to the main output
    //const synth = new Tone.Synth().toDestination();
    console.log('Tone is ready', startUpJingle)
    if (this.playIntro) {
      this.playJingle(startUpJingle);
    }

    // Function to play the sound
    function playSound(sound) {
      if (!this.toneStarted) {
        Tone.start();
        this.toneStarted = true;
      }
      sound.notes.forEach(note => {
        synth.triggerAttackRelease(note, sound.duration);
      });
    }

    // async:true plugins *must* self report when they are ready
    game.emit('plugin::ready::tone', this);
  }

  playNote(note, duration, now = 0, velocity = 0.5) {

     // Ensure velocity is within range
    velocity = Math.min(Math.max(velocity, 0), 0.5);

    // console.log('playNote', note, duration, now, velocity)
    if (typeof note === 'undefined') {
      // if note is not defined, select a random note from the keyCodes object
      let keys = Object.keys(this.keyCodes);
      let randomKey = keys[Math.floor(Math.random() * keys.length)];

      // check to see if this.lastNotePlayed is defined, if so perform harmonic shift
      if (this.lastNotePlayed) {
        // console.log("performing harmonic shift", this.lastNotePlayed)
        randomKey = this.harmonicShift(this.lastNotePlayed, { type: 'perfectFifth' });
        // exact key match was not available, default to C4 ( for now )
        // Remark: we could make a more approximate match based on letter of key / music theory
        if (!randomKey) {
          randomKey = this.harmonicShift('C4', { type: 'perfectFifth' });
        }
      }

      note = this.keyCodes[randomKey].toneCode;
    }

    this.lastNotePlayed = note;

    // console.log('playing ', note, duration)
    let game = this.game;
    // Play a note for a given duration
    // console.log('playing note', note, duration, now, velocity)

    try {
      // this.synth.triggerAttack(note, now, velocity * 0.1);
      this.synth.triggerAttackRelease(note, duration, now, velocity);
    } catch (err) {
      console.log('WARNING: Tone.js synth not ready yet. Skipping note play', err)
    }
    // game.emit('playNote', note, duration, now, velocity);
  }

}

export default TonePlugin;
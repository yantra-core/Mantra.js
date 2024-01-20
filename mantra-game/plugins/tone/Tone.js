// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone'; <-- import if needed, otherwise it will be loaded from vendor

import DrumKit from './instruments/DrumKit.js';
import startUpJingle from './jingles/start-up.js';
import keyCodes from './keyCodes.js';
import harmonicShift from './util/harmonicShift.js';
import playJingle from './util/playJingle.js';
import playSpatialSound from './util/playSpatialSound.js';

class TonePlugin {
  static id = 'tone';
  static async = true; // indicates that this plugin has async initialization and should should emit ready event

  constructor() {
    this.id = TonePlugin.id;
    this.playIntro = false;
    this.userEnabled = false;
    this.lastNotePlayed = null;
    this.keyCodes = keyCodes;
    this.toneStarted = false;
  }

  init(game) {
    this.game = game;
    this.bindUtilityFunctions();

    if (typeof Tone === 'undefined') {
      console.log('Tone is not defined, attempting to load it from vendor');
      game.loadScripts(['/vendor/tone.min.js'], () => this.toneReady());
    } else {
      this.toneReady();
    }
  }

  bindUtilityFunctions() {
    this.harmonicShift = harmonicShift.bind(this);
    this.playJingle = playJingle.bind(this);
    this.playSpatialSound = playSpatialSound.bind(this);
    this.game.systemsManager.addSystem(this.id, this);
  }

  toneReady() {

    this.synth = new Tone.Synth().toDestination();
    this.drumKit = new DrumKit();
    this.limiter = new Tone.Limiter(-6).toDestination();
    this.synth.connect(this.limiter);
    this.synth.volume.value = -3;


    Tone.Transport.lookAhead = 0.5;

    this.game.playSpatialSound = this.playSpatialSound;
    this.game.playDrum = this.playDrum.bind(this);
    this.game.playNote = this.playNote.bind(this);

    console.log('Tone is ready', startUpJingle);
    if (this.playIntro) {
      this.playJingle(startUpJingle);
    }

    this.game.emit('plugin::ready::tone', this);
  }

  playNote(note, duration, now = 0, velocity = 0.5) {
    velocity = Math.min(Math.max(velocity, 0), 0.5);
    note = note || this.selectRandomNote();
    this.lastNotePlayed = note;

    try {
      this.synth.triggerAttackRelease(note, duration, now, velocity);
    } catch (err) {
      console.log('WARNING: Tone.js synth not ready yet. Skipping note play', err);
    }
  }

  playDrum(sound = 'kick') {
    this.startTone();
    this.drumKit.play(sound);
  }

  startTone() {
    if (!this.toneStarted) {
      Tone.start();
      this.toneStarted = true;
    }
  }

  selectRandomNote() {
    let keys = Object.keys(this.keyCodes);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    if (this.lastNotePlayed) {
      randomKey = this.harmonicShift(this.lastNotePlayed, { type: 'perfectFifth' }) || this.harmonicShift('C4', { type: 'perfectFifth' });
    }
    return this.keyCodes[randomKey].toneCode;
  }
}

export default TonePlugin;

// Tone.js - Mantra Plugin - Marak Squires 2023
// Tone.js - https://tonejs.github.io/
// import * as Tone from 'tone';

import DrumKit from './instruments/DrumKit.js';
import startUpJingle from './jingles/start-up.js';
import keyCodes from './keyCodes.js';

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
      this.playIntroJingle();
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

  playIntroJingle() {
    let that = this;
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


  // Method to play spatial sound
  // TODO: needs to use pool of synths, this creates too many synths
  playSpatialSound(particle, blackHole) {
    if (!this.toneStarted) {
      Tone.start();
      this.toneStarted = true;
    }
  
    // Calculate panning based on particle's position relative to black hole
    const gameWidth = this.game.width; // Use actual game width
    const xPosition = (particle.position.x - blackHole.position.x) / gameWidth;
    const panner = new Tone.Panner(xPosition).toDestination();
  
    // Calculate velocity factor
    const velocityMagnitude = Math.sqrt(particle.velocity.x ** 2 + particle.velocity.y ** 2);
    const maxVelocity = 10; // Replace with maximum expected velocity in your game
    const velocityFactor = velocityMagnitude / maxVelocity;
  
    // Create FM Synth for water drop sound
    const fmSynth = new Tone.FMSynth({
      harmonicity: 8,
      modulationIndex: 2,
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1
      },
      modulation: { type: 'square' },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1
      }
    }).connect(panner);
  
    // Adjust parameters based on velocity
    const duration = 0.2 + (0.3 * (1 - velocityFactor)); // Shorter duration for faster particles
    const pitchDrop = velocityFactor * 24; // Higher drop for faster particles
  
    // Trigger the FM Synth with a pitch drop
    fmSynth.triggerAttack("C4", Tone.now());
    setTimeout(() => {
      fmSynth.setNote(`C${4 - pitchDrop}`, Tone.now());
      fmSynth.triggerRelease(Tone.now() + duration);
    }, 10);
  
    // Optionally: Add a delay for a more spacious effect
    // const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    // fmSynth.connect(feedbackDelay);
  }
  

  harmonicShift(traktorKeyCode, options = { type: 'perfectFifth' }) {
    const wheelOrder = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m', '11m', '12m', '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', '10d', '11d', '12d'];

    let currentIndex = wheelOrder.indexOf(traktorKeyCode);

    if (currentIndex === -1) {
      // keycode wasn't found, try to find it in the toneCode property
      let keys = Object.keys(this.keyCodes);
      let foundKey = keys.find(key => this.keyCodes[key].toneCode === traktorKeyCode);
      if (foundKey) {
        currentIndex = wheelOrder.indexOf(foundKey);
      }
    }

    if (currentIndex === -1) {
      // throw new Error('Invalid Traktor Key Code');
      console.log("WARNING: Could not find Traktor Key Code", traktorKeyCode)
      return;
    }

    switch (options.type) {
      case 'perfectFifth':
        // 7 steps forward for major, 7 steps backward for minor
        currentIndex += (traktorKeyCode.endsWith('m') ? -7 : 7);
        break;
      case 'majorMinorSwap':
        // Toggle between major and minor
        currentIndex += (traktorKeyCode.endsWith('m') ? 12 : -12);
        break;
      case 'shift':
        // Shift by a specified amount
        if (typeof options.amount !== 'number' || Math.abs(options.amount) > 3) {
          throw new Error('Invalid shift amount');
        }
        currentIndex += options.amount;
        break;
      default:
        throw new Error('Invalid transition type');
    }

    // Ensure the index wraps around the wheel
    currentIndex = (currentIndex + 24) % 24;

    return wheelOrder[currentIndex];
  }

}

export default TonePlugin;


/*
// Example usage
console.log(harmonicShift('5m', { type: 'perfectFifth' })); // Expected output: 10m
console.log(harmonicShift('5m', { type: 'majorMinorSwap' })); // Expected output: 5d
console.log(harmonicShift('5m', { type: 'shift', amount: -2 })); // Expected output: 3m
*/

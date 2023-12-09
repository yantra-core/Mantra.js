// Midi.js - Marak Squires 2023

class Midi {
  static id = 'midi';

  constructor() {
    this.id = Midi.id;
    this.devices = {};
    this.currentInput = null;
  }

  init(game) {
    this.game = game;
    this.connectMidi();
    game.on('midi-message', this.handleMidiMessage.bind(this));
  }

  connectMidi() {
    this.game.emit('midi::log', 'Attempting to connect MIDI...');
    if (!navigator.requestMIDIAccess) {
      console.error('Web MIDI API not supported.');
      this.game.emit('midi::log', 'Web MIDI API not supported.');
      return;
    }

    navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this), this.onMidiFailure.bind(this));
  }

  onMidiSuccess(midiAccess) {
    this.game.emit('midi::log', 'MIDI Connected!');
    console.log('MIDI Access:', midiAccess);
    this.midi = midiAccess;
    const inputs = midiAccess.inputs;
    inputs.forEach(input => {
      input.onmidimessage = this.emitMidiData.bind(this);
      this.devices[input.name] = input;
    });
  }

  onMidiFailure(err) {
    this.game.emit('midi::log', `MIDI Initialization Error: ${err.message}`);
    console.error(`MIDI Initialization Error: ${err}`);
  }

  emitMidiData(event) {
    this.game.emit('midi-data', event.data);
  }

  handleMidiMessage(message) {
    // Handle incoming MIDI messages here
    this.game.emit('midi-data', message);

    console.log('MIDI Message:', message);
  }

  unload() {
    // Cleanup, if necessary
  }
}

export default Midi;

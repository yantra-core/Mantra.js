// gui-midi.js
import gui from '../gui-editor/gui.js';

class GuiMidi {
  static id = 'gui-midi';

  constructor() {
    this.id = GuiMidi.id;
    this.midiLog = [];
  }

  init(game) {
    this.game = game;
    game.on('midi-data', this.logMidiData.bind(this));
    game.on('midi::log', this.logMidiEvent.bind(this)); // Listen to midi::log events

    this.createMidiWindow();
  }

  logMidiEvent(message) {
    let logItem = document.createElement('p');
    logItem.textContent = `MIDI Event: ${message}`;
    this.logElement.appendChild(logItem);
  }

  createMidiWindow() {
    this.midiView = gui.window('midiView', 'MIDI Debug', () => {
      this.game.systemsManager.removeSystem(GuiMidi.id);
    });

    let guiContent = this.midiView.querySelector('.gui-content');
    this.logElement = document.createElement('div');
    this.logElement.id = "midi-log";
    guiContent.appendChild(this.logElement);
  }

  logMidiData(data) {
    this.midiLog.push(data);
    this.updateLogDisplay();
  }

  updateLogDisplay() {
    this.logElement.innerHTML = '';
    this.midiLog.forEach(data => {
      let item = document.createElement('p');
      item.textContent = `MIDI Data: ${data}`;
      this.logElement.appendChild(item);
    });
  }

  unload() {
    if (this.midiView) {
      this.midiView.remove();
    }
  }
}

export default GuiMidi;

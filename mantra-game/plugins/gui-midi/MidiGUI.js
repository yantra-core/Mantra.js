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


/*


// Initialize Babylon.js scene
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

// Function to create a note object
function createNoteObject(noteNumber) {
    const size = 0.2; // Size can vary based on note properties
    const noteObject = BABYLON.MeshBuilder.CreateSphere(`note_${noteNumber}`, {diameter: size}, scene);
    noteObject.position.x = (noteNumber % 12) - 6; // Example positioning logic
    noteObject.position.y = 0;
    noteObject.isVisible = false;

    return noteObject;
}

// Dictionary to store note objects
const notes = {};

// Function to process MIDI data
function processMIDIData(data) {
    const [command, noteNumber, velocity] = data;

    if (command === 144) { // Note on
        if (!notes[noteNumber]) {
            notes[noteNumber] = createNoteObject(noteNumber);
        }
        notes[noteNumber].isVisible = true;
        // Additional logic for animation based on velocity
    } else if (command === 128) { // Note off
        if (notes[noteNumber]) {
            notes[noteNumber].isVisible = false;
        }
    }
}

// Render loop
engine.runRenderLoop(function () {
    scene.render();
});

// Handle window resize
window.addEventListener('resize', function(){
    engine.resize();
});

// Example of processing MIDI data
processMIDIData([144, 60, 100]); // Note on C4
processMIDIData([128, 60, 0]);   // Note off C4

*/
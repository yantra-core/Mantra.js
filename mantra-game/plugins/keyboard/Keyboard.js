// Keyboard.js - Marak Squires 2023

// All key codes available to browser
let KEY_CODES = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight',
  'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Escape' /*, 'PrintScreen', 'ScrollLock', 'Pause', 'Insert', 'Home', 'PageUp', 'Delete', 'End', 'PageDown', */
];

// Filter any keys that users might not want browser to capture
KEY_CODES = KEY_CODES.filter(code => !['KeyR', 'Tab', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'ContextMenu'].includes(code));
// KeyR is just for dev to help with refresh page shortcut, we can remove it later

// Transforms the DOM key codes to the key codes used by Mantra
// KeyA -> A, Digit1 -> 1, ArrowLeft -> LEFT, etc
function transformKeyCode(keyCode) {
  return keyCode
    .replace(/^Key/, '')
    .replace(/^Digit/, '')
    .replace(/^Arrow/, '')
    .toUpperCase();
}

const MANTRA_KEY_MAP = Object.fromEntries(KEY_CODES.map(code => [code, transformKeyCode(code)]));

// create a new object hash containing the Mantra Key Codes as keys
const KEY_MAP = Object.fromEntries(KEY_CODES.map(code => [code, code]));

/*
Keyboard config object
{
  preventDefaults: true // boolean, default true, set false to gain control of browser keys again
}
*/
export default class Keyboard {

  static id = 'keyboard';

  constructor({ preventDefaults = true } = {}) {
    this.id = Keyboard.id;

    this.controls = Object.fromEntries(Object.values(MANTRA_KEY_MAP).map(key => [key, false]));
    // this.communicationClient = communicationClient;
    this.inputPool = {};  // Pool to store key inputs since the last game tick
    this.preventDefaults = preventDefaults;

    this.keyStates = {}; // Object to store the state of each key


    // Bind methods and store them as class properties
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);

  }

  init(game) {
    this.game = game;
    if (!this.game.isServer) {
      this.bindInputControls();
    }
    this.name = 'keyboard';

    // register the Plugin as a system, on each update() we will send the inputPool to the server
    game.systemsManager.addSystem('keyboard', this);
  }
  
  bindInputControls() {
    document.addEventListener('keydown', this.boundHandleKeyDown);
    document.addEventListener('keyup', this.boundHandleKeyUp);
  }

  update() {
    this.sendInputs();

    // Reset key down and up states
    // Remark: is this a race condition here with cross plugin reference from Sutra.js? to this.keyStates?
    /*
    for (let key in this.keyStates) {
      if (this.keyStates[key].down) {
        this.keyStates[key].down = false;
      }
      if (this.keyStates[key].up) {
        this.keyStates[key].up = false;
      }
    }
    */

  }

  handleKeyDown(event) {
    if (MANTRA_KEY_MAP[event.code]) {
      this.keyStates[MANTRA_KEY_MAP[event.code]] = { down: true, up: false, pressed: true };
      this.inputPool[MANTRA_KEY_MAP[event.code]] = true;
      if (this.preventDefaults === true) {
        event.preventDefault();
      }
    }
    this.game.emit('keydown', event, MANTRA_KEY_MAP[event.code]);
  }

  handleKeyUp(event) {
    if (MANTRA_KEY_MAP[event.code]) {
      this.keyStates[MANTRA_KEY_MAP[event.code]] = { down: false, up: true, pressed: false };
      this.inputPool[MANTRA_KEY_MAP[event.code]] = false;

    }
    this.game.emit('keyup', event, MANTRA_KEY_MAP[event.code]);

  }

  sendInputs() {

    const trueInputs = this.inputPool;

    // Remark: Removed 12/28/23 in order to allow final "false" event on keyup
    // Should be OK to remove
    // Filter the inputPool to only include keys with true values
    /*
      const trueInputs = Object.fromEntries(
        Object.entries(this.inputPool).filter(([key, value]) => value === true)
      );
    */

    // Send trueInputs if there are any
    if (Object.keys(trueInputs).length > 0) {
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', { controls: trueInputs });
      }
    }

    // Reset only the false values in the inputPool
    for (let key in this.inputPool) {
      if (!this.inputPool[key]) {
        delete this.inputPool[key];
      }
    }
  }

  unbindAllEvents () {
    // remove all event listeners using the bound functions
    document.removeEventListener('keydown', this.boundHandleKeyDown);
    document.removeEventListener('keyup', this.boundHandleKeyUp);
  }

  unload() {
    this.unbindAllEvents();
  }

}
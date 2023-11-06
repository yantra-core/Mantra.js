// BrowserKeyboard.js - Marak Squires 2023


// All key codes available to browser
let KEY_CODES = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight',
  'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'
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

export default class BrowserKeyboard {
  constructor(communicationClient) {
    this.controls = Object.fromEntries(Object.values(MANTRA_KEY_MAP).map(key => [key, false]));
    this.communicationClient = communicationClient;
    this.inputPool = {};  // Pool to store key inputs since the last game tick
  }

  init(game) {
    this.game = game;
    console.log('init keyboard controls');
    this.bindInputControls();
    this.preventDefaults = true;

    // register the Plugin as a system, on each update() we will send the inputPool to the server
    game.systemsManager.addSystem('browserKeyboard', this);
  }

  bindInputControls() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  update() {
    this.sendInputs();
  }

  handleKeyDown(event) {
    if (MANTRA_KEY_MAP[event.code]) {
      this.inputPool[MANTRA_KEY_MAP[event.code]] = true;
      if (this.preventDefaults === true) {
        event.preventDefault();
      }
    }
  }

  handleKeyUp(event) {
    if (MANTRA_KEY_MAP[event.code]) {
      this.inputPool[MANTRA_KEY_MAP[event.code]] = false;
    }
  }

  sendInputs() {
    // Filter the inputPool to only include keys with true values
    const trueInputs = Object.fromEntries(
      Object.entries(this.inputPool).filter(([key, value]) => value === true)
    );

    // Send trueInputs if there are any
    if (Object.keys(trueInputs).length > 0) {
      this.game.communicationClient.sendMessage('player_input', { controls: trueInputs });
    }

    // Reset only the false values in the inputPool
    for (let key in this.inputPool) {
      if (!this.inputPool[key]) {
        delete this.inputPool[key];
      }
    }
  }

}
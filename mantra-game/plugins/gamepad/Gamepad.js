import bitdoNesPro from './gamepads/8BitdoNES30Pro.js';
import ps3 from './gamepads/Playstation3.js';
import logitechDualAction from './gamepads/LogitechDualAction.js';
const axesAssociation = {
  'DPAD_HORIZONTAL' : ['DPAD_LEFT', 'DPAD_RIGHT'],
  'DPAD_VERTICAL' : ['DPAD_UP', 'DPAD_DOWN'],
  'LEFT_STICK_HORIZONTAL' : ['LEFT_STICK_LEFT', 'LEFT_STICK_RIGHT'],
  'LEFT_STICK_VERTICAL' : ['LEFT_STICK_UP', 'LEFT_STICK_DOWN'],
  'RIGHT_STICK_HORIZONTAL' : ['RIGHT_STICK_LEFT', 'RIGHT_STICK_RIGHT'],
  'RIGHT_STICK_VERTICAL' : ['RIGHT_STICK_UP', 'RIGHT_STICK_DOWN']
};

export default class Gamepad {

  static id = 'gamepad';
  static defaultControllerConfig = {
    buttons : {
        'BUTTON_A' : 0,
        'BUTTON_B' : 2,
        'BUTTON_X' : 3,
        'BUTTON_Y' : 1,
        'BUTTON_L1': 4,
        'BUTTON_R1': 5,
        'BUTTON_L2': 6,
        'BUTTON_R2': 7,
        // L3 & R3 aren't fixed 
        // (sticks, touch pads, and other)
        //'BUTTON_L3':8 : 'l2',
        //'BUTTON_R3':9 : 'r2',
        'BUTTON_SELECT':8,
        'BUTTON_START':9,
        'BUTTON_STICK_L' : 10,
        'BUTTON_STICK_R' :11,
    },
    axes : {
        'DPAD_HORIZONTAL' : 0,
        'DPAD_VERTICAL' : 1,
        'LEFT_STICK_HORIZONTAL' : 2,
        'LEFT_STICK_VERTICAL' : 3,
        'RIGHT_STICK_HORIZONTAL' : 4,
        'RIGHT_STICK_VERTICAL' : 5,
    }
  };

  constructor() {
    this.id = Gamepad.id;
    this.gamepads = {};
    this.configs = {
      // prestuff the cache so no lookups happen to known controllers
      '8Bitdo NES30 Pro (Vendor: 2dc8 Product: 3820)': bitdoNesPro,
      'Logitech Logitech Dual Action': logitechDualAction,
      'Sony PLAYSTATION(R)3 Controller': ps3
    };
    this.hashes = {};
    this.controls = {
      'DPAD_UP': false, // Up
      'DPAD_DOWN': false,  // Down
      'DPAD_LEFT': false, // Left
      'DPAD_RIGHT': false,  // Right
      'LEFT_STICK_UP': false, // Up
      'LEFT_STICK_DOWN': false,  // Down
      'LEFT_STICK_LEFT': false, // Left
      'LEFT_STICK_RIGHT': false,  // Right
      'RIGHT_STICK_UP': false, // Up
      'RIGHT_STICK_DOWN': false,  // Down
      'RIGHT_STICK_LEFT': false, // Left
      'RIGHT_STICK_RIGHT': false,  // Right
      // y button
      'BUTTON_Y': false, // "Y" button
      // x button
      'BUTTON_X': false, // "X" button
      // b button
      'BUTTON_B': false, // "B" button
      // a button
      'BUTTON_A': false, // "A" button
      // start button
      'BUTTON_START': false, // "Start" button
      // select button
      'BUTTON_SELECT': false, // "Select" button
      // left shoulder button
      'BUTTON_L1': false, // "L1" button
      // right shoulder button
      'BUTTON_R1': false, // "R1" button
      // left trigger button
      'BUTTON_L2': false, // "L2" button
      // right trigger button
      'BUTTON_R2': false, // "R2" button
      // left stick button
      'BUTTON_L3': false, // "L3" button
      // right stick button
      'BUTTON_R3': false, // "R3" button
      'BUTTON_STICK_L': false, // "L3" button
      // right stick button
      'BUTTON_STICK_R': false, // "R3" button
    };
    this.lastControlsAllFalse = true;
    
  }

  init(game) {
    this.game = game;
    this.id = Gamepad.id;

    if (this.game.systems.sutra) {
      this.game.systems.sutra.bindGamepadToSutraConditions();
    }

    game.systemsManager.addSystem('gamepad', this);
    if (!this.game.isServer) {
      window.addEventListener("gamepadconnected", (event) => this.connectHandler(event));
      window.addEventListener("gamepaddisconnected", (event) => this.disconnectHandler(event));
    }
  }

  connectHandler(event) {
    console.log(`Gamepad connected at index ${event.gamepad.index}: ${event.gamepad.id}. ${event.gamepad.buttons.length} buttons, ${event.gamepad.axes.length} axes.`);
    this.gamepads[event.gamepad.index] = event.gamepad;
  }

  disconnectHandler(event) {
    console.log(`Gamepad disconnected from index ${event.gamepad.index}: ${event.gamepad.id}`);
    delete this.gamepads[event.gamepad.index];
  }

  update() {
    if (!this.game.isServer) {
      this.pollGamepads();
      this.sendInputs();
    }
  }

  pollGamepads() {
    // Get the array of gamepads
    const detectedGamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < detectedGamepads.length; i++) {
      if (detectedGamepads[i]) {
        // Update the gamepad state
        this.gamepads[i] = detectedGamepads[i];
      }
    }
  }
  
  controllerConfig(hash) {
    const config = typeof this.configs[hash] === 'object'?
      this.configs[hash]:
      Gamepad.defaultControllerConfig;
    return config;
  }

  sendInputs() {
    for (let index in this.gamepads) {
      // Cheezy hack to ignore VirtualHID driver
      // (a side effect of older controllers in OS X)
      if(this.gamepads[index].id.indexOf('Virtual') !== -1) continue;
      const config = this.controllerConfig(this.gamepads[index].id);
      const gamepad = this.gamepads[index];

      // Deadzone for analog stick to prevent drift
      const deadzone = 0.1;

      Object.keys(config.buttons).forEach((key)=>{
        this.controls[key] = gamepad.buttons[config.buttons[key]].pressed;
      });
      Object.keys(config.axes).forEach((key)=>{
        const booleanStates = axesAssociation[key];
        const value = gamepad.axes[config.axes[key]];
        this.controls[booleanStates[0]] = value < -deadzone;
        this.controls[booleanStates[1]] = value > deadzone;
      });

      let controls = this.controls;
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', { controls });
      }
    }

  }
}
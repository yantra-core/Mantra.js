export default class Gamepad {

  static id = 'gamepad';

  constructor() {
    this.id = Gamepad.id;
    this.gamepads = {};
    this.controls = {
      'DPAD_UP': false, // Up
      'DPAD_DOWN': false,  // Down
      'DPAD_LEFT': false, // Left
      'DPAD_RIGHT': false,  // Right
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

  sendInputs() {
    for (let index in this.gamepads) {
      const gamepad = this.gamepads[index];

      // Axes for left analog stick
      const xAxis = gamepad.axes[0]; // Left (-1) to Right (1)
      const yAxis = gamepad.axes[1]; // Up (-1) to Down (1)

      // Deadzone for analog stick to prevent drift
      const deadzone = 0.1;

      // TODO: map controls to current entity input defaults for gamepad
      this.controls = {
        'DPAD_UP': yAxis < -deadzone, // Up
        'DPAD_DOWN': yAxis > deadzone,  // Down
        'DPAD_LEFT': xAxis < -deadzone, // Left
        'DPAD_RIGHT': xAxis > deadzone,  // Right
        // y button
        'BUTTON_Y': gamepad.buttons[1].pressed, // "Y" button
        // x button
        'BUTTON_X': gamepad.buttons[3].pressed, // "X" button
        // b button
        'BUTTON_B': gamepad.buttons[2].pressed, // "B" button
        // a button
        'BUTTON_A': gamepad.buttons[0].pressed, // "A" button
        // start button
        'BUTTON_START': gamepad.buttons[9].pressed, // "Start" button
        // select button
        'BUTTON_SELECT': gamepad.buttons[8].pressed, // "Select" button
        // left shoulder button
        'BUTTON_L1': gamepad.buttons[4].pressed, // "L1" button
        // right shoulder button
        'BUTTON_R1': gamepad.buttons[5].pressed, // "R1" button
        // left trigger button
        'BUTTON_L2': gamepad.buttons[6].pressed, // "L2" button
        // right trigger button
        'BUTTON_R2': gamepad.buttons[7].pressed, // "R2" button
        // left stick button
        'BUTTON_L3': gamepad.buttons[10].pressed, // "L3" button
        // right stick button
        'BUTTON_R3': gamepad.buttons[11].pressed, // "R3" button
      };

      let controls = this.controls;
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', { controls });
      }
    }

  }
}
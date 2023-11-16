export default class Gamepad {

  static id = 'gamepad';

  constructor() {
    this.id = Gamepad.id;
    this.gamepads = {};
  }

  init(game) {
    this.game = game;
    this.name = 'browserGamepad';
    game.systemsManager.addSystem('browserGamepad', this);
    window.addEventListener("gamepadconnected", (event) => this.connectHandler(event));
    window.addEventListener("gamepaddisconnected", (event) => this.disconnectHandler(event));
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
    this.pollGamepads();
    this.sendInputs();
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
  
      // Map left stick to WASD keys
      // TODO: move this code to part of the entityInput strategy
      const controls = {
        W: yAxis < -deadzone, // Up
        S: yAxis > deadzone,  // Down
        A: xAxis < -deadzone, // Left
        D: xAxis > deadzone,  // Right
        SPACE: gamepad.buttons[2].pressed // "X" button for Spacebar (fire)
      };
  
      console.log('controls', controls)
      // Send the controls to the game logic or server
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', { controls });
      }
    }
  }
  
}

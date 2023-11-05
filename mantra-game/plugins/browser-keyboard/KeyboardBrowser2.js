// BrowserKeyboard.js - Marak Squires 2023
// 3d flight controls
export default class BrowserKeyboard {
  constructor(communicationClient) {
    this.controls = {
      W: false, // Move Forward
      S: false, // Move Backward
      A: false, // Move Left
      D: false, // Move Right
      SPACE: false, // Fire Bullet
      Q: false, // Move Up (along z-axis)
      E: false, // Move Down (along z-axis)
      ARROW_UP: false, // Pitch Up
      ARROW_DOWN: false, // Pitch Down
      ARROW_LEFT: false, // Yaw Left
      ARROW_RIGHT: false, // Yaw Right
      Z: false, // Roll Left
      C: false // Roll Right
    };
  }

  init (game) {
    this.game = game;
    console.log('init keyboard controls');
    this.bindInputControls();
  }

  bindInputControls() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    const game = this.game;
    const handledKeys = [
      'KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space',
      'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'KeyZ', 'KeyC'
    ];

    if (handledKeys.includes(event.code)) {
      const controlKey = event.code.replace('Key', '').replace('Arrow', '');
      this.controls[controlKey] = true;
      //console.log('aaaa', controlKey)
      //console.log('sending con', this.controls)
      game.communicationClient.sendMessage('player_input', { controls: this.controls });
      event.preventDefault(); // Prevent default browser behavior for handled keys
    }
  }

  handleKeyUp(event) {
    let game = this.game;
    const handledKeys = [
      'KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space',
      'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'KeyZ', 'KeyC'
    ];

    // console.log('eeee', event.code)
    if (handledKeys.includes(event.code)) {
      const controlKey = event.code.replace('Key', '').replace('Arrow', '');
      this.controls[controlKey] = false;
      game.communicationClient.sendMessage('player_input', { controls: this.controls });
    }
  }
}

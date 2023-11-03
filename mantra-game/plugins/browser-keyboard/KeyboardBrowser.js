// BrowserKeyboard.js - Marak Squires 2023
export default class BrowserKeyboard {
  constructor(communicationClient) {
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.controls = {
      W: false,
      S: false,
      A: false,
      D: false,
      SPACE: false
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
    let game = this.game;
    switch (event.code) {
      case 'KeyW':
        this.controls.W = true;
        break;
      case 'KeyS':
        this.controls.S = true;
        break;
      case 'KeyA':
        this.controls.A = true;
        break;
      case 'KeyD':
        this.controls.D = true;
        break;
      case 'Space':
        this.controls.SPACE = true;
        event.preventDefault();  // Prevent default browser behavior for space key
        break;
      case 'KeyR':
        // reset to home in UI camera
        // TODO: this.game.systems scope
        // this.game.renderer.cameraSystem.resetToHome();
        break;
    }
    game.communicationClient.sendMessage('player_input', { controls: this.controls });
  }

  handleKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
        this.controls.W = false;
        break;
      case 'KeyS':
        this.controls.S = false;
        break;
      case 'KeyA':
        this.controls.A = false;
        break;
      case 'KeyD':
        this.controls.D = false;
        break;
      case 'Space':
        this.controls.SPACE = false;
        break;
      case 'KeyR':
        // reset to home in UI camera
        // TODO: this.game.systems scope
        this.game.renderer.cameraSystem.resetToHome();
        break;
    }
  }
}

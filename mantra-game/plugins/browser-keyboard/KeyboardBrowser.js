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
    switch (event.key.toLowerCase()) {
      case 'w':
        this.controls.W = true;
        break;
      case 's':
        this.controls.S = true;
        break;
      case 'a':
        this.controls.A = true;
        break;
      case 'd':
        this.controls.D = true;
        break;
      case 'x':
        this.controls.SPACE = true;
        break;
      case 'h':
        // reset to home in UI camera
        // TODO: this.game.systems scope
        this.game.renderer.cameraSystem.resetToHome();
        break;
    }
    game.communicationClient.sendMessage('player_input', { controls: this.controls });
  }

  handleKeyUp(event) {
    switch (event.key.toLowerCase()) {
      case 'w':
        this.controls.W = false;
        break;
      case 's':
        this.controls.S = false;
        break;
      case 'a':
        this.controls.A = false;
        break;
      case 'd':
        this.controls.D = false;
        break;
      case 'x':
        this.controls.SPACE = false;
        break;
    }
  }
}

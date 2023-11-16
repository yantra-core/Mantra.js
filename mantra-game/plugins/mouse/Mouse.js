// Mouse.js - Marak Squires 2023
export default class Mouse {

  static id = 'mouse';

  constructor(communicationClient) {
    this.id = Mouse.id;
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = { x: 0, y: 0 };
    this.mouseButtons = {
      LEFT: false,
      RIGHT: false,
      MIDDLE: false
    };

    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);

  }

  init(game) {
    this.game = game;
    console.log('init mouse controls');
    this.bindMouseControls();
  }

  bindMouseControls() {
    document.addEventListener('pointermove', this.boundHandleMouseMove);
    document.addEventListener('pointerdown', this.boundHandleMouseDown);
    document.addEventListener('pointerup', this.boundHandleMouseUp);
  }

  handleMouseMove(event) {
    this.mousePosition = { x: event.clientX, y: event.clientY };
    if (event.target instanceof HTMLCanvasElement) {
      const canvas = event.target;
      const rect = canvas.getBoundingClientRect();
      this.canvasPosition = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    } else {
      // if not a canvas, set relative position to null or keep the previous position
      this.canvasPosition = null;
    }
    this.sendMouseData();
  }

  handleMouseDown(event) {
    switch (event.button) {
      case 0:
        this.mouseButtons.LEFT = true;
        break;
      case 1:
        this.mouseButtons.MIDDLE = true;
        break;
      case 2:
        this.mouseButtons.RIGHT = true;
        break;
    }
    this.sendMouseData();
  }

  handleMouseUp(event) {
    switch (event.button) {
      case 0:
        this.mouseButtons.LEFT = false;
        break;
      case 1:
        this.mouseButtons.MIDDLE = false;
        break;
      case 2:
        this.mouseButtons.RIGHT = false;
        break;
    }
    this.sendMouseData();
  }

  sendMouseData() {
    const mouseData = {
      position: this.mousePosition, // absolute position
      canvasPosition: this.canvasPosition, // relative position to any canvas
      buttons: this.mouseButtons
    };
    if (this.game.communicationClient) {
      this.game.communicationClient.sendMessage('player_input', { mouse: mouseData });
    }
  }

  unload() {
    // unbind all events
    document.removeEventListener('pointermove', this.boundHandleMouseMove);
    document.removeEventListener('pointerdown', this.boundHandleMouseDown);
    document.removeEventListener('pointerup', this.boundHandleMouseUp);
  }

}
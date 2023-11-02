// BrowserMouse.js - Marak Squires 2023
export default class BrowserMouse {
  constructor(communicationClient) {
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = { x: 0, y: 0 };
    this.mouseButtons = {
      LEFT: false,
      RIGHT: false,
      MIDDLE: false
    };
  }

  init(game) {
    this.game = game;
    console.log('init mouse controls');
    this.bindMouseControls();
  }

  bindMouseControls() {
    document.addEventListener('pointermove', this.handleMouseMove.bind(this));
    document.addEventListener('pointerdown', this.handleMouseDown.bind(this));
    document.addEventListener('pointerup', this.handleMouseUp.bind(this));
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
    console.log("MOUSE DOWN", event)
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
    this.game.communicationClient.sendMessage('player_input', { mouse: mouseData });
  }
}
// Mouse.js - Marak Squires 2023
export default class Mouse {

  static id = 'mouse';

  constructor(communicationClient) {
    this.id = Mouse.id;
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = { x: 0, y: 0 };
    this.disableContextMenu = false;
    this.isDragging = false;
    this.dragStartPosition = { x: 0, y: 0 };

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
    this.bindMouseControls();
  }

  bindMouseControls() {
    document.addEventListener('pointermove', this.boundHandleMouseMove);
    document.addEventListener('pointerdown', this.boundHandleMouseDown);
    document.addEventListener('pointerup', this.boundHandleMouseUp);
    // TODO: could be a config option
    if (this.disableContextMenu) {
      document.addEventListener('contextmenu', event => event.preventDefault());
    }
  }

  handleMouseMove(event) {

    // TODO: common function for selecting entities
    // TODO: have editor be aware if inspector is loaded
    // if so, show additional UX for selecting entities
    let target = event.target;
    if (target && target.getAttribute) {
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        // if this is a Mantra entity, set the selectedEntityId
        // this is used for GUI rendering and CSSGraphics
        this.game.selectedEntityId = mantraId;
      }
    }

    this.mousePosition = { x: event.clientX, y: event.clientY };
    if (event.target instanceof HTMLCanvasElement) {
      const canvas = event.target;
      const rect = canvas.getBoundingClientRect();
      this.canvasPosition = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    } else {
      // if not a canvas, set relative position to null or keep the previous position
      this.canvasPosition = null;
    }

    // If dragging, calculate the delta and send drag data
    if (this.isDragging) {
      const dx = this.mousePosition.x - this.dragStartPosition.x;
      const dy = this.mousePosition.y - this.dragStartPosition.y;
      this.dx = dx;
      this.dy = dy;

      // Update the drag start position for the next movement
      this.dragStartPosition = { x: this.mousePosition.x, y: this.mousePosition.y };
    }

    this.sendMouseData();
  }

  handleMouseDown(event) {
    let target = event.target;

    // check to see if target has a mantra-id attribute
    if (target && target.getAttribute) {
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        // if this is a Mantra entity, set the selectedEntityId
        // this is used for GUI rendering and CSSGraphics
        this.game.selectedEntityId = mantraId;
      }
    }

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


    if (event.button === 2) { // Right mouse button
      this.isDragging = true;
      this.dragStartPosition = { x: event.clientX, y: event.clientY };
      // prevent default right click menu
      // event.preventDefault();
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

    if (event.button === 2) { // Right mouse button
      this.isDragging = false;
      // prevent default right click menu
      event.preventDefault();
    }

    this.sendMouseData();
  }

  sendMouseData() {
    const mouseData = {
      position: this.mousePosition, // absolute position
      canvasPosition: this.canvasPosition, // relative position to any canvas
      buttons: this.mouseButtons,
      isDragging: this.isDragging,
      dragStartPosition: this.dragStartPosition,
      dx: this.dx,
      dy: this.dy
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
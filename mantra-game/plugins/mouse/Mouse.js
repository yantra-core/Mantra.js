// Mouse.js - Marak Squires 2023
export default class Mouse {

  static id = 'mouse';

  constructor(communicationClient) {
    this.id = Mouse.id;
    // this.communicationClient = communicationClient;
    // this.game = this.communicationClient.game;
    this.mousePosition = { x: 0, y: 0 };
    this.disableContextMenu = true;
    this.isDragging = false;
    this.dragStartPosition = { x: 0, y: 0 };

    this.mouseButtons = {
      LEFT: null,
      RIGHT: null,
      MIDDLE: null
    };

    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);

  }

  init(game) {
    this.game = game;
    this.id = Mouse.id;
    this.bindInputControls();
    this.game.systemsManager.addSystem(this.id, this);
  }

  handleMouseMove(event) {
    let game = this.game;
    // TODO: common function for selecting entities
    // TODO: have editor be aware if inspector is loaded
    // if so, show additional UX for selecting entities
    let target = event.target;
    /* TODO: mouse over selects ent, make this configurable
       was making it hard to debug the editor since it would switch entities
    if (target && target.getAttribute) {
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        // if this is a Mantra entity, set the selectedEntityId
        // this is used for GUI rendering and CSSGraphics
        this.game.selectedEntityId = mantraId;
      }
    }
    */

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

    // Get mouse position
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Convert screen coordinates to world coordinates
    let worldX = (mouseX - window.innerWidth / 2 + game.data.camera.offsetX) / game.data.camera.currentZoom + game.data.camera.position.x;
    let worldY = (mouseY - window.innerHeight / 2 + game.data.camera.offsetY) / game.data.camera.currentZoom + game.data.camera.position.y;
    
    this.game.emit('pointerMove', { x: worldX, y: worldY }, event)

  }

  handleMouseDown(event) {
    let target = event.target;
    let game = this.game;
    // console.log('handleMouseDown', target)
    // check to see if target has a mantra-id attribute
    // TODO: we'll need entity detection per Graphics adapter
    // Remark: The current approach only works for DOM HTML, for canvas, we'll need the adapter ( three ) to query scene and return ent id
    if (target && target.getAttribute) { 
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        // if this is a Mantra entity, set the selectedEntityId
        // this is used for GUI rendering and CSSGraphics
        this.game.selectedEntityId = mantraId;
        // get the reference to this ent, check for pointerdown event
        const ent = this.game.data.ents._[mantraId];
        if (ent && ent.pointerdown) {
          let context = ent;
          ent.pointerdown(ent, event);
        }
      }

      if (!mantraId) {
        // if no mantraID was found, a non-game element was clicked
        // in most cases this is a GUI element, so we should clear the selectedEntityId
        this.game.selectedEntityId = null;
        // and do nothing else
        // if it happens to be the body, it could still be the game canvas ( empty area )
        // in that case, we still want to process the mouse event
        // check to see if the target is not the body
        if (target.tagName != 'BODY') {
          this.game.selectedEntityId = null;
          return;
        }
      }
    } else {
      // no target, do nothing, continue
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

    // middle mouse button
    if (event.button === 1) { // Middle mouse button
      this.isDragging = true;
      this.dragStartPosition = { x: event.clientX, y: event.clientY };
      // set cursor to grabbing
      // document.body.style.cursor = 'grabbing';
      // prevents default browser scrolling
      event.preventDefault();
    }

    // Get mouse position
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Convert screen coordinates to world coordinates
    let worldX = (mouseX - window.innerWidth / 2 + game.data.camera.offsetX) / game.data.camera.currentZoom + game.data.camera.position.x;
    let worldY = (mouseY - window.innerHeight / 2 + game.data.camera.offsetY) / game.data.camera.currentZoom + game.data.camera.position.y;
    
    let position = { x: worldX, y: worldY };

    // truncate to 3 decimal places
    position.x = Math.round(position.x * 1000) / 1000;
    position.y = Math.round(position.y * 1000) / 1000;
    position.button = this.mouseButtons;
    position.entityId = this.game.selectedEntityId || null;
    // Remark: We may need better logic here to determine intent of the user pointerDown
    // TODO: add conditional check here to see if we should be processing mouse events
    //       should support configurable options for mouse events
    this.game.emit('pointerDown', position, event)
    this.sendMouseData(event);

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

    if (event.button === 1) { // Middle mouse button
      this.isDragging = false;
      // prevent default right click menu
      event.preventDefault();
    }

    // get the reference to this ent, check for pointerdown event
    const ent = this.game.data.ents._[this.game.selectedEntityId];
    if (ent && ent.pointerup) {
      let context = ent;
      ent.pointerup(ent, event);
    }

    this.game.emit('pointerUp', this.game.selectedEntityId, event)
    this.sendMouseData(event);
  }

  handleMouseOut(event) {
    this.game.emit('pointerOut', event)
  }

  handleMouseOver(event) {
    let target = event.target;
    this.game.emit('pointerOver', this.game.selectedEntityId || {}, event)
    this.sendMouseData(event);
  }

  sendMouseData(event) {
    const mouseData = {
      position: this.mousePosition, // absolute position
      canvasPosition: this.canvasPosition, // relative position to any canvas
      buttons: this.mouseButtons,
      isDragging: this.isDragging,
      dragStartPosition: this.dragStartPosition,
      dx: this.dx,
      dy: this.dy,
      event: event,
      worldPosition: {
        x: (this.mousePosition.x - window.innerWidth / 2 + this.game.data.camera.offsetX) / this.game.data.camera.currentZoom + this.game.data.camera.position.x,
        y: (this.mousePosition.y - window.innerHeight / 2 + this.game.data.camera.offsetY) / this.game.data.camera.currentZoom + this.game.data.camera.position.y
      }
    };
    // this.game.data.mouse = this.game.data.mouse || {};
    this.game.data.mouse = mouseData;
    if (this.game.communicationClient) {
      this.game.communicationClient.sendMessage('player_input', { mouse: mouseData });
    }
  }

  bindInputControls() {
    document.addEventListener('pointerover', this.boundHandleMouseOver);
    document.addEventListener('pointerout', this.boundHandleMouseOut);
    document.addEventListener('pointermove', this.boundHandleMouseMove);
    document.addEventListener('pointerdown', this.boundHandleMouseDown);
    document.addEventListener('pointerup', this.boundHandleMouseUp);
    // TODO: could be a config option
    if (this.disableContextMenu) {
      document.addEventListener('contextmenu', event => event.preventDefault());
    }

    // TODO: drag and drop to move map
    // TODO: two finger pinch to zoom
    document.addEventListener('touchmove', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });

  }
  unbindAllEvents() {
    // unbind all events
    document.removeEventListener('pointerover', this.boundHandleMouseOver);
    document.removeEventListener('pointerout', this.boundHandleMouseOut);
    document.removeEventListener('pointermove', this.boundHandleMouseMove);
    document.removeEventListener('pointerdown', this.boundHandleMouseDown);
    document.removeEventListener('pointerup', this.boundHandleMouseUp);
  }

  unload() {
    this.unbindAllEvents();
  }

}
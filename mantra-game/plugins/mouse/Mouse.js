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

    this.activeTouches = {}; // Store active touches
    // TODO: support 3+ touches
    this.firstTouchId = null; // Track the first touch for movement
    this.secondTouchId = null; // Track the second touch for firing
    this.endedFirstTouch = false;
    this.endedSecondTouch = false;

    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
    this.boundHandleMouseOut = this.handleMouseOut.bind(this);
    this.boundHandleMouseOver = this.handleMouseOver.bind(this);

    this.boundHandlePointerDown = this.handlePointerDown.bind(this);
    this.boundHandlePointerMove = this.handlePointerMove.bind(this);
    this.boundHandlePointerUp = this.handlePointerUp.bind(this);

  }

  init(game) {
    this.game = game;
    this.id = Mouse.id;
    this.bindInputControls();
    this.game.systemsManager.addSystem(this.id, this);
  }

  // Common function to generate mouse context with world coordinates
  createMouseContext(event) {
    const { clientX, clientY } = event;
    const canvas = event.target instanceof HTMLCanvasElement ? event.target : null;
    let canvasPosition = null;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvasPosition = { x: clientX - rect.left, y: clientY - rect.top };
    }

    // Convert screen coordinates to world coordinates
    const worldX = (clientX - window.innerWidth / 2 + this.game.data.camera.offsetX) / this.game.data.camera.currentZoom + this.game.data.camera.position.x;
    const worldY = (clientY - window.innerHeight / 2 + this.game.data.camera.offsetY) / this.game.data.camera.currentZoom + this.game.data.camera.position.y;

    // Construct the context object
    const context = {
      mousePosition: { x: clientX, y: clientY },
      canvasPosition,
      worldPosition: { x: worldX, y: worldY },
      event,
      entityId: this.game.selectedEntityId || null,
      isDragging: this.isDragging,
      dragStartPosition: this.dragStartPosition,
      buttons: this.mouseButtons,
      firstTouchId: this.firstTouchId,
      secondTouchId: this.secondTouchId,
      // Number of active touches can be useful for multi-touch logic
      activeTouchCount: Object.keys(this.activeTouches).length,
      // Provide detailed information on active touches if needed
      activeTouches: this.activeTouches,
      // Add any other relevant data here
    };

    // alias for worldPosition - developer context is usually in world coordinates
    context.position = context.worldPosition;

    return context;
  }

  handleMouseMove(event) {
    let game = this.game;
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

    // get the reference to this ent, check for pointerdown event
    if (this.game.data && this.game.data.ents && this.game.data.ents._) {
      const ent = this.game.data.ents._[this.game.selectedEntityId];
      if (ent && ent.pointermove) {
        let context = ent;
        ent.pointermove(ent, event);
      }
    }

    let context = this.createMouseContext(event);
    context.x = context.position.x; // legacy API expects world position at root x and y
    context.y = context.position.y; // can remove these mappings later
    this.game.emit('pointerMove', context, event)

  }

  updateMouseButtons(event, isDown) {

    if (game.isTouchDevice()) {
      switch (event.button) {
        case 2:
          this.mouseButtons.LEFT = isDown;
          break;
        case 1:
          this.mouseButtons.MIDDLE = isDown;
          break;
        case 0:
          this.mouseButtons.RIGHT = isDown;
          break;
      }
    } else {

      switch (event.button) {
        case 0:
          this.mouseButtons.LEFT = isDown;
          break;
        case 1:
          this.mouseButtons.MIDDLE = isDown;
          break;
        case 2:
          this.mouseButtons.RIGHT = isDown;
          break;
      }
    }
  }

  handleMouseDown(event) {
    let target = event.target;
    let game = this.game;
    // TODO: we'll need entity detection per Graphics adapter
    // Remark: The current approach only works for DOM HTML, for canvas, we'll need the adapter ( three ) to query scene and return ent id
    if (target && target.getAttribute) {
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        // if this is a Mantra entity, set the selectedEntityId
        // this is used for GUI rendering and CSSGraphics
        this.game.selectedEntityId = mantraId;
        if (this.game.data && this.game.data.ents) {
          // get the reference to this ent, check for pointerdown event
          const ent = this.game.data.ents._[Number(mantraId)];
          if (ent && ent.pointerdown) {
            let context = ent;
            ent.pointerdown(ent, event);
          }

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

    this.updateMouseButtons(event, true);

    // middle mouse button
    if (event.button === 1) { // Middle mouse button
      this.isDragging = true;
      this.dragStartPosition = { x: event.clientX, y: event.clientY };
      // set cursor to grabbing
      // document.body.style.cursor = 'grabbing';
      // prevents default browser scrolling
      event.preventDefault();
    }

    let context = this.createMouseContext(event);

    this.game.emit('pointerDown', context, event)
    this.sendMouseData(event);

  }

  handleMouseUp(event) {

    this.updateMouseButtons(event, false);

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

    let context = this.createMouseContext(event);
    context.endedFirstTouch = this.endedFirstTouch;
    context.endedSecondTouch = this.endedSecondTouch;

    this.game.emit('pointerUp', context, event)
    this.sendMouseData(event);
  }

  handleMouseOut(event) {
    // TODO: refactor all mouse event handling into common function that can
    // create the world position and other context data we need to pass forward to ECS
    let target = event.target;
    let game = this.game;
    if (target && target.getAttribute) {
      let mantraId = target.getAttribute('mantra-id');
      if (mantraId) {
        this.game.selectedEntityId = mantraId;
        if (this.game.data && this.game.data.ents) {
          // get the reference to this ent, check for pointerout event
          const ent = this.game.data.ents._[mantraId];
          if (ent && ent.pointerout) {
            let context = ent;
            ent.pointerout(ent, event);
          }

        }
      }
    }
    this.game.emit('pointerOut', event)
  }

  handleMouseOver(event) {
    let target = event.target;
    this.game.emit('pointerOver', this.game.selectedEntityId || {}, event)
    this.sendMouseData(event);
  }

  handlePointerDown(event) {
    // Add the new touch to the active touches
    this.activeTouches[event.pointerId] = { x: event.clientX, y: event.clientY };

    // Assign first and second touches if not already assigned
    if (this.firstTouchId === null) {
      this.firstTouchId = event.pointerId;
      // First touch logic (e.g., movement)
    } else if (this.secondTouchId === null) {
      this.secondTouchId = event.pointerId;
      // alert('second')
      // Second touch logic (e.g., firing)
    }
    // once we have done special processing, call the regular mantra mouse event
    this.handleMouseDown(event);
  }

  handlePointerMove(event) {
    if (this.activeTouches[event.pointerId]) {
      // Update touch position
      this.activeTouches[event.pointerId] = { x: event.clientX, y: event.clientY };

      // Movement or other continuous actions based on pointerId
      if (event.pointerId === this.firstTouchId) {
        // Movement logic
      } else if (event.pointerId === this.secondTouchId) {
        // Firing logic
      }
    }
    // once we have done special processing, call the regular mantra mouse event
    this.handleMouseMove(event);
  }

  handlePointerUp(event) {

    // Determine if this pointerId matches first or second touch identifiers
    this.endedFirstTouch = event.pointerId === this.firstTouchId;
    this.endedSecondTouch = event.pointerId === this.secondTouchId;

    // Remove the touch from active touches
    delete this.activeTouches[event.pointerId];

    // Reset first or second touch ID if they are lifted
    if (event.pointerId === this.firstTouchId) {
      this.firstTouchId = null;
    } else if (event.pointerId === this.secondTouchId) {
      this.secondTouchId = null;
    }

    // once we have done special processing, call the regular mantra mouse event
    this.handleMouseUp(event);
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

    if (game.isTouchDevice()) {
      document.addEventListener('pointerover', this.boundHandleMouseOver);
      document.addEventListener('pointerout', this.boundHandleMouseOut);
      document.addEventListener('pointermove', this.boundHandlePointerMove);
      document.addEventListener('pointerdown', this.boundHandlePointerDown);
      document.addEventListener('pointerup', this.boundHandlePointerUp);
    } else {
      document.addEventListener('mouseover', this.boundHandleMouseOver);
      document.addEventListener('mouseout', this.boundHandleMouseOut);
      document.addEventListener('mousemove', this.boundHandleMouseMove);
      document.addEventListener('mousedown', this.boundHandleMouseDown);
      document.addEventListener('mouseup', this.boundHandleMouseUp);
    }

    // TODO: could be a config option
    if (this.disableContextMenu) {
      document.addEventListener('contextmenu', event => {
        // Handle internal Mantra events first before prevent default to disable browser right click menu
        //let context = this.createMouseContext(event); 
        //this.game.emit('ecsInternalEvent', context); 
        // Prevent the default context menu from appearing
        event.preventDefault();
      });
    }

    // TODO: drag and drop to move map
    // TODO: two finger pinch to zoom
    document.addEventListener('touchmove', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });

  }
  unbindAllEvents() {
    if (game.isTouchDevice()) {
      // unbind all events
      document.removeEventListener('pointerover', this.boundHandleMouseOver);
      document.removeEventListener('pointerout', this.boundHandleMouseOut);
      document.removeEventListener('pointermove', this.boundHandlePointerMove);
      document.removeEventListener('pointerdown', this.boundHandlePointerDown);
      document.removeEventListener('pointerup', this.boundHandlePointerUp);
    } else {
      // unbind all events
      document.removeEventListener('mouseover', this.boundHandleMouseOver);
      document.removeEventListener('mouseout', this.boundHandleMouseOut);
      document.removeEventListener('mousemove', this.boundHandleMouseMove);
      document.removeEventListener('mousedown', this.boundHandleMouseDown);
      document.removeEventListener('mouseup', this.boundHandleMouseUp);
    }
  }

  unload() {
    this.unbindAllEvents();
  }

}
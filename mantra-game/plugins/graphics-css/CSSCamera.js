// CSSCamera.js - Marak Squires 2023
class CSSCamera {

  static id = 'css-camera';

  constructor(scene, config = {}) {
    this.id = CSSCamera.id;
    this.scene = scene;
    this.config = config;

    this.follow = true;
    this.isDragging = false;
    this.dragInertia = { x: 0, y: 0 };
    this.isThrowing = false;

  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('graphics-css-camera', this);

    this.gameViewport = document.getElementById('gameHolder');
    
    // Add event listener for mouse wheel
    this.scene.zoom(this.game.config.camera.startingZoom);

    game.viewportCenterXOffset = 0;
    game.viewportCenterYOffset = 0;

    this.initZoomControls();

    game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
      /*
      // our MouseData looks like this:
      data.mouse = {
          position: this.mousePosition, // absolute position
          canvasPosition: this.canvasPosition, // relative position to any canvas
          buttons: this.mouseButtons,
          isDragging: this.isDragging,
          dragStartPosition: this.dragStartPosition,
          dx: this.dx,
          dy: this.dy
        };
    */
      if (data.mouse) {
        // Update camera position based on drag deltas
        if (data.mouse.buttons.RIGHT) {
          this.gameViewport.style.cursor = 'grabbing';
        }
        this.updateCameraPosition(data.mouse.dx, data.mouse.dy, data.mouse.isDragging);
      }
    });

  }

  // Method to update camera position based on drag
  updateCameraPosition(dx, dy, isDragging) {
    let game = this.game;

    // New throw is starting, cancel existing throw
    if (this.isDragging && !isDragging) {
      this.cancelThrow();
    }

    if (isDragging) {
      this.gameViewport.style.cursor = 'grabbing';

      this.isDragging = true;

      if (typeof dx === 'number') {
        game.viewportCenterXOffset += dx;
      }
  
      if (typeof dy === 'number') {
        game.viewportCenterYOffset += dy;
      }
  
    }

    if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
      // console.log('THROWING', dx, dy)
      this.isThrowing = true;
      this.isDragging = false;

      if (Math.abs(dx) > 2) {
        this.dragInertia.x = dx * 1.6;
      }
      if (Math.abs(dy) > 2) {
        this.dragInertia.y = dy * 1.6;
      }
      requestAnimationFrame(this.applyThrow.bind(this));
    }

    if (!isDragging) {
      this.isDragging = false;
    }
  }

  cancelThrow() {
    this.isThrowing = false;
    this.dragInertia = { x: 0, y: 0 };
    // Reset cursor style back to default
    this.gameViewport.style.cursor = 'grab';
  }

  // Apply the throw inertia to the camera
  applyThrow() {
    if (!this.isThrowing) return;

    let game = this.game;
    const decayFactor = 0.985; // Increase closer to 1 for longer throws

    game.viewportCenterXOffset += this.dragInertia.x;
    game.viewportCenterYOffset += this.dragInertia.y;

    // Decrease the inertia
    this.dragInertia.x *= decayFactor;
    this.dragInertia.y *= decayFactor;

    // Continue the animation if inertia is significant
    if (Math.abs(this.dragInertia.x) > 0.1 || Math.abs(this.dragInertia.y) > 0.1) {
      requestAnimationFrame(this.applyThrow.bind(this));
    } else {
      this.isThrowing = false;
      // console.log("1 STOPPED THROWING")
    }

    if (!this.isThrowing) {
      // Reset cursor style back to default at the end of a throw
      this.gameViewport.style.cursor = 'grab';
      //console.log("2 STOPPED THROWING")
    }

  }

  // update() is called each game tick, we may want to implement render() here instead for RAF
  update() {
    let game = this.game;
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    let entityId = game.currentPlayerId;

    if (typeof game.viewportCenterXOffset === 'undefined') {
      game.viewportCenterXOffset = 0;
    }

    if (typeof game.viewportCenterYOffset === 'undefined') {
      game.viewportCenterYOffset = 0;
    }

    // TODO: add ability for this to work with dragging and follow false
    if (this.follow && currentPlayer.position) {
      this.scene.cameraPosition.x = currentPlayer.position.x - game.viewportCenterXOffset;
      this.scene.cameraPosition.y = currentPlayer.position.y - game.viewportCenterYOffset;
    }
  }

  initZoomControls() {
    document.addEventListener('wheel', this.scene.mouseWheelZoom, { passive: false });
    this.scene.mouseWheelEnabled = true;
  }

}

export default CSSCamera;
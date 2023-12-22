// CSSCamera.js - Marak Squires 2023
class CSSCamera {

  static id = 'css-camera';

  constructor(scene, config = {}) {
    this.id = CSSCamera.id;
    this.scene = scene;
    this.config = config;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('graphics-css-camera', this);

    // Add event listener for mouse wheel
    this.scene.zoom(this.game.config.camera.startingZoom);

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
      if (data.mouse && data.mouse.isDragging) {
        // Update camera position based on drag deltas
        this.updateCameraPosition(data.mouse.dx, data.mouse.dy);
      }
    });

  }

  // Method to update camera position based on drag
  updateCameraPosition(dx, dy) {
    let game = this.game;

    if (typeof game.viewportCenterXOffset === 'undefined') {
      game.viewportCenterXOffset = 0;
    }

    if (typeof game.viewportCenterYOffset === 'undefined') {
      game.viewportCenterYOffset = 0;
    }


    if (typeof dx === 'number') {
      game.viewportCenterXOffset += dx;
    }

    if (typeof dy === 'number') {
      game.viewportCenterYOffset += dy;
    }

    // Update the actual camera view, if needed
    //this.applyCameraTransform();
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

    if (currentPlayer.position) {
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
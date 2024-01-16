// CSSCamera.js - Marak Squires 2023
import applyThrow from './lib/camera/applyThrow.js';
import rotateCameraOverTime from './lib/camera/rotateCameraOverTime.js';
import updateCameraPosition from './lib/camera/updateCameraPosition.js';
// main update loop for camera
import update from './lib/camera/update.js';

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
    this.rotating = false;

  }

  init(game) {
    this.game = game;
    // this.resetCameraState();

    this.updateCameraPosition = updateCameraPosition.bind(this);
    this.applyThrow = applyThrow.bind(this);
    this.update = update.bind(this);

    // hoist rotateCamera to game
    game.rotateCamera = rotateCameraOverTime.bind(this);

    // sets auto-follow player when starting CSSGraphics ( for now )
    this.follow = true;

    this.game.systemsManager.addSystem('graphics-css-camera', this);

    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
    }

    this.gameViewport = document.getElementById('gameHolder');
    this.gameViewport.style.transformOrigin = 'center center';

    this.initZoomControls();

    game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {

      if (data.mouse) {
        // Update camera position based on drag deltas
        if (data.mouse.buttons.RIGHT) {
          this.gameViewport.style.cursor = 'grabbing';
        }
        // console.log('Current Zoom', game.data.camera.currentZoom);
        data.mouse.dx = data.mouse.dx || 0;
        data.mouse.dy = data.mouse.dy || 0;
        let zoomFactor = 1 / game.data.camera.currentZoom || 4.5;
        let adjustedDx = data.mouse.dx * zoomFactor;
        let adjustedDy = data.mouse.dy * zoomFactor;
        //console.log('Adjusted Dx', adjustedDx, 'og', data.mouse.dx);
        //console.log('Adjusted Dy', adjustedDy, 'og', data.mouse.dy);
        this.updateCameraPosition(-adjustedDx, -adjustedDy, data.mouse.isDragging);
      }

    });

  }

  resetCameraState() {
    // Reset other camera properties as needed
    this.game.viewportCenterXOffset = 0;
    this.game.viewportCenterYOffset = 0;
  }

  initZoomControls() {
    document.addEventListener('wheel', this.scene.mouseWheelZoom, { passive: false });
    this.scene.mouseWheelEnabled = true;
  }

  // TODO: move rotateCamera and cancelThrow to common camera file
  // Method to rotate the camera
  rotateCamera(angle) {
    // Ensure the angle is a number and set a default if not
    if (typeof angle !== 'number') {
      console.error('Invalid angle for rotateCamera. Must be a number.');
      return;
    }

    // Update the CSS transform property to rotate the viewport
    this.gameViewport.style.transform = `rotate(${angle}deg)`;
  }
  
  cancelThrow() {
    this.isThrowing = false;
    this.dragInertia = { x: 0, y: 0 };
    // Reset cursor style back to default
    this.gameViewport.style.cursor = 'grab';
  }

}

export default CSSCamera;
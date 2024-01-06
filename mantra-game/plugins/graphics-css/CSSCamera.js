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
    this.rotating = false;
    

  }

  init(game) {
    this.game = game;
    this.resetCameraState();

    //game.rotateCamera = this.rotateCamera.bind(this);
    game.rotateCamera = this.rotateCameraOverTime.bind(this);
    // sets auto-follow player when starting CSSGraphics ( for now )
    this.follow = true;

    this.game.systemsManager.addSystem('graphics-css-camera', this);

    this.gameViewport = document.getElementById('gameHolder');

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
        // console.log('Current Zoom', game.data.camera.currentZoom);

        // Adjust the drag deltas based on the current zoom level
        // When zoomed out (lower zoom value), increase the drag deltas
        // When zoomed in (higher zoom value), decrease the drag deltas
        data.mouse.dx = data.mouse.dx || 0;
        data.mouse.dy = data.mouse.dy || 0;
        let zoomFactor = 1 / game.data.camera.currentZoom || 4.5;
        let adjustedDx = data.mouse.dx * zoomFactor;
        let adjustedDy = data.mouse.dy * zoomFactor;

        //console.log('Adjusted Dx', adjustedDx, 'og', data.mouse.dx);
        //console.log('Adjusted Dy', adjustedDy, 'og', data.mouse.dy);

        this.updateCameraPosition(adjustedDx, adjustedDy, data.mouse.isDragging);
      }

    });

  }

  resetCameraState() {
    // alert('reset')
    this.game.viewportCenterXOffset = 0;
    this.game.viewportCenterYOffset = 0;
    // Reset other camera properties as needed
  }

 
  // Method to smoothly rotate the camera over a given duration using CSS transitions
  rotateCameraOverTime(targetAngle = 90, duration = 800) {
    if (typeof targetAngle !== 'number' || typeof duration !== 'number') {
      console.error('Invalid arguments for rotateCameraOverTime. Both targetAngle and duration must be numbers.');
      return;
    }

    if (this.rotating) {
      return;
    }

    this.rotating = true;
    this.game.data.camera.rotation = targetAngle;

    // Retrieve the current zoom level
    let currentZoom = this.game.data.camera.currentZoom;

    // Set the transition property on the gameViewport
    this.gameViewport.style.transition = `transform ${duration}ms`;

    // TODO: better centering
    // this.gameViewport.style.transformOrigin = 'center center 0';

    // Apply the combined scale (for zoom) and rotation
    this.gameViewport.style.transform = `scale(${currentZoom}) rotate(${targetAngle}deg)`;

    // Reset the transition after the animation is complete
    // TODO: remove setTimeout in favor of game.tick % N
    setTimeout(() => {
      this.gameViewport.style.transition = '';
      this.rotating = false;
    }, duration);
  }

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
      // this.follow = false;
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

  update() {
    let game = this.game;
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
  
    // Current zoom level
    let currentZoom = game.data.camera.currentZoom;
  
    // Get browser window dimensions
    let windowHeight = window.innerHeight;
  
    // Define the adjustment value and scale factor
    //console.log('adjustment', adjustment);
    // TODO: use pixelAdjustment based on zoom scale

    let scaleFactor = 1 / currentZoom;
    let adjustment = -400; // TODO: this should be window height or something similar
    adjustment = (-windowHeight / 2) + 350;
    let pixelAdjustment = adjustment * scaleFactor;

    game.viewportCenterYOffset = -windowHeight / 2;
    // Update the camera position
    if (this.follow && currentPlayer && currentPlayer.position) {
      // If following a player, adjust the camera position based on the player's position and the calculated offset
      
      this.scene.cameraPosition.x = currentPlayer.position.x;

      let newY = currentPlayer.position.y - game.viewportCenterYOffset;
      // locks camera to not exceed bottom of screen for platformer mode
      if (game.data.camera.mode === 'platformer') {
        if (newY < windowHeight * 0.38) {
          this.scene.cameraPosition.y = newY;
        }
      } else {
        this.scene.cameraPosition.y = newY;
      }
    } else {
      // If not following a player, use the calculated offsets directly
      this.scene.cameraPosition.x = game.viewportCenterXOffset;
      this.scene.cameraPosition.y = game.viewportCenterYOffset;
    }
  
    // Update the camera's position in the game data
    this.game.data.camera.position = this.scene.cameraPosition;
  }
  
  initZoomControls() {
    document.addEventListener('wheel', this.scene.mouseWheelZoom, { passive: false });
    this.scene.mouseWheelEnabled = true;
  }

}

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

export default CSSCamera;
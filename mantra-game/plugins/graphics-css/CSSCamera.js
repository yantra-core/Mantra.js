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
    //this.initZoomControls();

    // Add event listener for mouse wheel
    document.addEventListener('wheel', this.scene.mouseWheelZoom, { passive: false });
    this.scene.mouseWheelEnabled = true;
    this.scene.zoom(this.game.config.camera.startingZoom);

  }

  // update() is called each game tick, we may want to implement render() here instead for RAF
  update() {
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    let entityId = game.currentPlayerId;

    if (currentPlayer.position) {
      this.scene.cameraPosition.x = currentPlayer.position.x - game.viewportCenterXOffset;
      this.scene.cameraPosition.y = currentPlayer.position.y - game.viewportCenterYOffset;
    }
    /*
    let camera = this.scene.cameras.main;
    let player = this.game.getEntity(this.game.currentPlayerId);
    // let graphics = this.game.components.graphics.get(this.game.currentPlayerId);
    if (camera && player.graphics && player.graphics['graphics-css']) {
      camera.centerOn(player.position.x, player.position.y);
      this.followingPlayer = true; // Set the flag to true
    }
    */
  }

  initZoomControls() {
    /*
    this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      let currentZoom = zoom.current;
      // Determine the zoom factor based on the wheel event.
      const zoomFactor = deltaY < 0 ? 1.5 : 0.6;  // Adjust these numbers to your preference
      // Calculate the target zoom level.
      currentZoom *= zoomFactor;
      // Clamp the zoom level to reasonable limits (e.g., between 0.2 to 2)
      currentZoom = Math.min(Math.max(currentZoom, zoom.minZoom), zoom.maxZoom);
      // Use zoom.tweenTo for smoother zoom transitions
      zoom.tweenTo(this.scene, currentZoom, 666);  // 1000 ms duration for the tween
    });
    */
  }

  tweenToZoom(targetZoom, duration = 1000, callback) {
    // Your existing tweenTo logic
    // Use this.zoom and this.camera
  }

  zoomIn(amount = 0.01) {
    zoom.zoomIn(this.scene, amount);
  }

  zoomOut(amount = 0.01) {
    zoom.zoomOut(this.scene, amount);
  }

  setZoom(absoluteAmount) {
    zoom.set(this.scene, absoluteAmount);
  }

  startFollowing(player) {
  }
}

export default CSSCamera;
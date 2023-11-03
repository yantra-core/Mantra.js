class CameraSystem {
  constructor({ followPlayer = false } = {}) {
    this.name = 'graphics-babylon/camera';
    this.followPlayer = followPlayer;
  }

  init (game, engine, scene) {

    this.scene = scene;
    this.game = game;
    this.engine = engine;

    // Store the initial values
    this.initialDistance = 2560;
    this.initialAlpha = 0;
    this.initialBeta = 0.01;

    // Set up the camera
    this.camera = new BABYLON.ArcRotateCamera("camera", this.initialAlpha, this.initialBeta, this.initialDistance, new BABYLON.Vector3(0, 0, 0), this.scene);

    game.camera = this.camera;

    this.game.systemsManager.addSystem(this.name, this);

    // this.camera.attachControl(document.getElementById('renderCanvas'), true);
    // Setup custom camera controls
    this.setupCameraControls();

    // Configuring full 360-degree rotation
    this.camera.upperBetaLimit = Math.PI;
    this.camera.lowerBetaLimit = 0;
    this.camera.upperAlphaLimit = null;
    this.camera.lowerAlphaLimit = null;

    // Camera zoom limits
    this.camera.minZ = 0.1;
    this.camera.maxZ = 20000;

    this.camera.lowerRadiusLimit = 50;
    this.camera.upperRadiusLimit = 2560 * 4 * 6; // 61440

    // Adjust wheelPrecision for more zoom per scroll
    this.camera.wheelPrecision = 0.5;

    //   Rotate the camera by -Math.PI / 2
    this.camera.alpha += Math.PI / 2;
  }

  setupCameraControls() {
    // Detach default controls
    this.camera.attachControl(document.getElementById('gameHolder'), false);
    return;
  }

  setupCameraControlsManual() {
    // Detach default controls from the canvas
    this.camera.detachControl(this.scene.getEngine().getRenderingCanvas());

    // Attach wheel event listener to gameHolder
    const gameHolder = document.getElementById('gameHolder');
    gameHolder.addEventListener('wheel', this.onMouseWheel.bind(this), { passive: false });

    // Prevent default handling of wheel event on canvas
    const canvas = this.scene.getEngine().getRenderingCanvas();
    canvas.addEventListener('wheel', e => e.stopPropagation(), { passive: false });
  }

  onMouseWheel(e) {
    // Adjust this scale factor as needed
    const scaleFactor = 0.1;
    this.camera.radius -= e.deltaY * scaleFactor;

    // Prevent page scrolling
    e.preventDefault();
  }


  resetToHome() {
    // Reset to initial values
    this.camera.alpha = this.initialAlpha;
    this.camera.beta = this.initialBeta;
    this.camera.radius = this.initialDistance;
  }

  getCamera() {
    return this.camera;
  }

  render() {


    if (this.followPlayer) {
      let currentPlayer = this.game.getEntity(window.currentPlayerId);
      if (currentPlayer) {
        let graphic = currentPlayer.graphics['graphics-babylon']; // TODO helper function for this
        if (graphic) {
          this.camera.target.x = graphic.position.x;
          this.camera.target.z = graphic.position.z;
          // why not use vector positon for camera?
          // let pos = new BABYLON.Vector3(currentPlayer.position.x, 0, currentPlayer.position.y);
        }
      }
  
    }
  }

  update() {
    // console.log('camera update')
    /*  // TODO: use this instead of the camera target?
        this.position = new BABYLON.Vector3(0, 500, -500);
        this.target = BABYLON.Vector3.Zero();
    */
    //this.updatePlayerRotation(10);



  }
}

export default CameraSystem;

class CameraSystem {
  constructor(game, engine, scene) {
    this.name = 'babylon-camera';
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

    this.game.systemsManager.addSystem('babylon-camera', this);

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

  }

  setupCameraControls() {
    // Detach default controls
    this.camera.attachControl(document.getElementById('renderCanvas'), false);
    return;
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

class BabylonCamera {

  static id = 'graphics-babylon-camera';
  static removable = false;

  constructor({ camera } = {}) {
    this.id = BabylonCamera.id;

    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

  }

  init (game, engine, scene) {

    this.scene = scene;
    this.game = game;
    this.engine = engine;

    // Store the initial values
    this.initialDistance = 2560;
    this.initialAlpha = 0;
    this.initialBeta = 0.35;

    // Set up the camera
    this.camera = new BABYLON.ArcRotateCamera("camera", this.initialAlpha, this.initialBeta, this.initialDistance, new BABYLON.Vector3(0, 0, 0), this.scene);

    game.camera = this.camera;

    this.game.systemsManager.addSystem(this.id, this);

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

    this.camera.radius = 1300;
  }

  setupCameraControls() {
    // Detach default controls
    this.camera.attachControl(document.getElementById('gameHolder'), false);
  
    // Disable the keys for camera control
    this.camera.inputs.attached.keyboard.keysUp = []; // Disable UP arrow key
    this.camera.inputs.attached.keyboard.keysDown = []; // Disable DOWN arrow key
    this.camera.inputs.attached.keyboard.keysLeft = []; // Disable LEFT arrow key
    this.camera.inputs.attached.keyboard.keysRight = []; // Disable RIGHT arrow key

    // this.camera.inputs.attached.pointers.buttons = [1, -1, -1];
    this.camera._panningMouseButton = 0;
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
    let game = this.game;
    if (this.config.camera && this.config.camera === 'follow') {
      let currentPlayer = this.game.getEntity(game.currentPlayerId);
      if (currentPlayer && currentPlayer.graphics) {
        let graphic = currentPlayer.graphics['graphics-babylon'];
        if (graphic) {
          // Interpolating camera position
          let smoothness = 1; // Value between 0 and 1, where 1 is instant

          switch (game.physics.dimension) {
            case 2:
              this.camera.target.x += (graphic.position.x - this.camera.target.x) * smoothness;
              this.camera.target.z += (graphic.position.z - this.camera.target.z) * smoothness;
            break;
            case 3:
              this.camera.target = graphic.position;
              break;
            default:
              throw new Error('Unknown physics dimensions, cannot update camera')
              break;
          }

        }
      }
    }
  }

  renderLerp() { // TODO: use this instead on render(), uses built in lerp
    let game = this.game;
    if (this.config.camera && this.config.camera === 'follow') {
      let currentPlayer = this.game.getEntity(game.currentPlayerId);
      if (currentPlayer && currentPlayer.graphics) {
        let graphic = currentPlayer.graphics['graphics-babylon'];
        let smoothness = 1; // Value between 0 and 1, where 1 is instant

        if (graphic) {
          // Smooth camera follow using Vector3.Lerp
          let targetPosition = new BABYLON.Vector3(graphic.position.x, this.camera.target.y, graphic.position.z);
          this.camera.target = BABYLON.Vector3.Lerp(this.camera.target, targetPosition, smoothness);
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

export default BabylonCamera;
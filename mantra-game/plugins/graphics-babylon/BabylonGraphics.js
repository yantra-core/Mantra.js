// BabylonRenderer.js extends RendererInterface.js
import GraphicsInterface from '../../lib/GraphicsInterface.js';

// You can create your own renderer by replacing this file with a Class that extends RendererInterface.js

// Simple Babylon.js Debug GUI for Entity inspection
//import DebugGUI from '../../Component/DebugGUI.js';
//import EntityLabel from '../../Component/EntityLabel.js';
//import StarField from '../../Component/StarField.js';

let lastKnownStates = {};

class BabylonRenderer extends GraphicsInterface {
  constructor() {
    super();
    this.name = 'BabylonRenderer';
    this.engine = null;
    this.scene = null;
    this.camera = null;
    // this.babylonEntities = {}; // TODO: remove this and all references to it, use game instead
    this.entityStates = {};    // Store application-specific entity data
    this.debug = false;  // Store debug flag for later usage
  }

  init(game) {

    game.graphics.push(this);
    this.game = game;

    // Access the renderCanvas element and set its size
    const renderCanvas = document.getElementById('renderCanvas');
    // TODO: config height and width from Game constructor
    // renderCanvas.width = 800;  // Set canvas width in pixels
    // renderCanvas.height = 600; // Set canvas height in pixels

    this.engine = new BABYLON.Engine(renderCanvas, true);
    this.scene = new BABYLON.Scene(this.engine);

    game.scene = this.scene; // Remark: We need a way for babylon components to access the scene

    // TODO: move this into Systems for Babylon client
    // this.cameraSystem = new CameraSystem(this.game, this.engine, this.scene);

    // Only initialize DebugGUI if debug flag is set to true
    if (this.debug) {
      // this.debugGUI = new DebugGUI(this.scene);
    }

    // Add a hemispheric light to ensure everything is illuminated
    let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    // Initialize the StarField
    // this.starField = new StarField(this.scene, this.camera);

    // TODO Inject the Babylon.js specific MeshFactory as a Provider to the core MeshFactory

    this.engine.runRenderLoop(() => this.scene.render());
    window.addEventListener('resize', () => this.engine.resize());
    renderCanvas.addEventListener('wheel', this.handleZoom.bind(this), { passive: false });

  }

  // called as much as the client requires in order to render
  render(game) {
    let self = this;
    let cameraSystem = game.getSystem('babylon-camera');
    cameraSystem.render();
  }

  handleZoom(event) {
    // Logic for zoom handling
  }

  inflate (snapshot) {
    let game = this.game;
    snapshot.state.forEach(function (state) {
      game.inflate(state);
    });
  }

  // called each time new gametick data arrives
  update() { // Remark: Important, this is bound to systemsUpdate, not view updates!
    let game = this.game;
    let cameraSystem = this.game.getSystem('babylon-camera');
    cameraSystem.update(); // This currently does nothing


  }

}

export default BabylonRenderer;
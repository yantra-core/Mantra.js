// BabylonRenderer.js extends RendererInterface.js
import GraphicsInterface from '../../lib/GraphicsInterface.js';

// You can create your own renderer by replacing this file with a Class that extends RendererInterface.js

// Simple Babylon.js Debug GUI for Entity inspection
//import DebugGUI from '../../Component/DebugGUI.js';
//import EntityLabel from '../../Component/EntityLabel.js';
//import StarField from '../../Component/StarField.js';

let lastKnownStates = {};

class BabylonGraphics extends GraphicsInterface {
  constructor() {
    super();
    this.name = 'graphics-babylon';
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
    if (typeof game.width === 'number') {
      renderCanvas.width = game.width;  // Set canvas width in pixels
    }
    if (typeof game.height === 'number') {
      renderCanvas.height = game.height; // Set canvas height in pixels
    }

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

    // Babylon seems to be immediately ready, versus Phaser which must wait for scene to be ready
    game.graphicsReady.push(this.name);
  }

  updateGraphic(entityData) {
    let previousEntity = this.game.getEntity(entityData.id);
    if (!previousEntity || !previousEntity.graphics) {
      console.log('no previous entity found for', entityData.id);
      return;
    }
    let graphic = previousEntity.graphics['graphics-babylon'];
    // TODO: this needs to call into the meshFactory, no direct calls to babylon here!
    graphic.position = new BABYLON.Vector3(entityData.position.x, 1, entityData.position.y);
    if (entityData.rotation !== undefined) {
      graphic.rotation.y = -entityData.rotation;
      // in additon, adjust by -Math.PI / 2;
      graphic.rotation.y = -entityData.rotation - Math.PI / 2;
    }
  }

  removeGraphic(entityId) {
    let entity = this.game.getEntity(entityId);
    if (!entity || !entity.graphics || !entity.graphics['graphics-babylon']) {
      return;
    }
    // TODO: auto-scope graphics-babylon to the entity, so we don't need to do this
    entity.graphics['graphics-babylon'].dispose();
  }


  createGraphic(entityData) {
    // switch case based on entityData.type
    let graphic;
    switch (entityData.type) {
      case 'PLAYER':
        graphic = this.createTriangle(entityData);
        break;
      case 'BULLET':
        graphic = this.createSphere(entityData);
        break;
      case 'TRIANGLE':
        graphic = this.createTriangle(entityData);
        break;
      default:
        graphic = this.createTriangle(entityData); // TODO: createDefault()
    }
    return graphic;
  }

  createSphere(entityData) {
    let sphere = BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: entityData.radius * 2 }, this.scene);
    // reposition the sphere to the center of the bullet
    sphere.position.z = entityData.position.y;
    sphere.position.x = entityData.position.x;
    return sphere;
  }

  createTriangle(entityData) {

    let mesh = BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
      diameterTop: 0,
      diameterBottom: 100,
      height: 100,
      tessellation: 3
    }, this.scene);

    mesh.rotation.z = Math.PI / 2;
    mesh.rotation.y = -Math.PI / 2;
    return mesh;
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

  inflate (snapshot) {} // not used?

  // called each time new gametick data arrives
  update() { // Remark: Important, this is bound to systemsUpdate, not view updates!
    let game = this.game;
    let cameraSystem = this.game.getSystem('babylon-camera');
    cameraSystem.update(); // This currently does nothing


  }

}

export default BabylonGraphics;
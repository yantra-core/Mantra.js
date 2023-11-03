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
    this.entityStates = {};    // Store application-specific entity data
    this.debug = false;  // Store debug flag for later usage
  }

  init(game) {

    game.graphics.push(this);
    this.game = game;

    this.game.systemsManager.addSystem('graphics-babylon', this);

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

    this.engine.runRenderLoop(() => this.scene.render());
    window.addEventListener('resize', () => this.engine.resize());
    renderCanvas.addEventListener('wheel', this.handleZoom.bind(this), { passive: false });


    // remit all pointer events to the document
    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
        case BABYLON.PointerEventTypes.POINTERUP:
        case BABYLON.PointerEventTypes.POINTERMOVE:
          reEmitEvent(pointerInfo.event);
          break;
      }
    });

    function reEmitEvent(babylonEvent) {
      const newEvent = new MouseEvent(babylonEvent.type, babylonEvent);
      document.dispatchEvent(newEvent);
    }

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

    graphic.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);
    if (entityData.rotation !== undefined) {
      //graphic.rotation.y = -entityData.rotation;
      // in additon, adjust by -Math.PI / 2;
      graphic.rotation.y = entityData.rotation + -Math.PI / 2;
    }
  }

  removeGraphic(entityId) {
    let entity = this.game.getEntity(entityId);
    if (!entity || !entity.graphics || !entity.graphics['graphics-babylon']) {
      return;
    }
    entity.graphics['graphics-babylon'].dispose();
  }

  createGraphic(entityData) {
    // switch case based on entityData.type
    let graphic;
    switch (entityData.type) {
      case 'PLAYER':
        if (entityData.shape === 'rectangle') {
          graphic = this.createBox(entityData);
        } else {
          graphic = this.createTriangle(entityData);
        }
        break;
      case 'BULLET':
        graphic = this.createSphere(entityData);
        break;
      case 'TEXT':
        graphic = this.createText(entityData);
        break;
  
      case 'TRIANGLE':
        graphic = this.createTriangle(entityData);
        break;
      default:
        graphic = this.createBox(entityData); // TODO: createDefault()
    }

    // translate the graphic to the correct position in 2.5D space
    graphic.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);

    return graphic;
  }
  createText(entityData) {
    const plane = BABYLON.MeshBuilder.CreatePlane('chatBubble', { width: entityData.width, height: entityData.height }, this.scene);
    
    const texture = new BABYLON.DynamicTexture('dynamic texture', { width: 512, height: 256 }, this.scene);
    const material = new BABYLON.StandardMaterial('Mat', this.scene);
    
    const text = 'HELLO WORLD';  // Or use entityData.text if it contains the message
    const font = 'bold 44px monospace';
    
    texture.drawText(text, null, 40, font, 'black', 'white', true, true);
    
    material.diffuseTexture = texture;
    plane.material = material;

    // Set the billboard mode so the plane always faces the camera
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    return plane;
}


  createSphere(entityData) {
    let sphere = BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: entityData.radius * 2 }, this.scene);
    return sphere;
  }

  createBox(entityData) {
    let box = BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: 300, depth: entityData.height }, this.scene);
    return box;
  }

  createTriangle(entityData) {
    let mesh = BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
      diameterTop: 0,
      diameterBottom: 100,
      height: 100,
      tessellation: 3
    }, this.scene);
    // rotate the triangle to the correct orientation ( forward facing )
    mesh.rotation.z = Math.PI / 2;
    mesh.rotation.y += -Math.PI / 2;
    return mesh;
  }

  // called as much as the client requires in order to render
  render(game) {
    let self = this;
    let cameraSystem = game.getSystem('graphics-babylon/camera');
    cameraSystem.render();

    if (this.game.systems['graphics-babylon/camera']) {

    }
  }

  handleZoom(event) {
    // Logic for zoom handling
  }

  inflate(snapshot) { } // not used?

  // called each time new gametick data arrives
  update() { // Remark: Important, this is bound to systemsUpdate, not view updates!
    let game = this.game;
    let cameraSystem = this.game.getSystem('graphics-babylon/camera');
    cameraSystem.update(); // This currently does nothing

    if (this.game.systems['graphics-babylon/camera']) { }


  }

}

export default BabylonGraphics;
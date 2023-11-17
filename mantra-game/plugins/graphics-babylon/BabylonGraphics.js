// BabylonRenderer.js extends RendererInterface.js
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import plugins from '../../plugins.js';

// You can create your own renderer by replacing this file with a Class that extends RendererInterface.js

// Simple Babylon.js Debug GUI for Entity inspection
//import DebugGUI from '../../Component/DebugGUI.js';
//import EntityLabel from '../../Component/EntityLabel.js';
//import StarField from '../../Component/StarField.js';

let lastKnownStates = {};

const POOL_SIZE_BLOCK = 3000;
const POOL_SIZE_BULLET = 1000;

class BabylonGraphics extends GraphicsInterface {

  static id = 'graphics-babylon';
  static removable = false;

  constructor({ camera } = {}) {
    super();
    this.id = BabylonGraphics.id;
    this.engine = null;
    this.scene = null;
    this.camera = null;
    this.entityStates = {};    // Store application-specific entity data
    this.debug = false;  // Store debug flag for later usage
    this.pendingLoad = []; // queue of pending Plugins that depend on this Babylon Graphics

    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    this.mantraPools = {
      block: [],
      bullet: []
    };

  }

  init(game) {

    game.graphics.push(this);
    this.game = game;
    this.game.systemsManager.addSystem('graphics-babylon', this);

    // check to see if BABYLON scope is available, if not assume we need to inject it sequentially
    if (typeof BABYLON === 'undefined') {
      console.log('BABYLON is not defined, attempting to load it from vendor');

      game.loadScripts([
        '/vendor/babylon.js',
        '/vendor/babylon.gui.min.js',
        '/vendor/babylonjs.materials.min.js'
      ], () => {

        console.log('All BABYLON scripts loaded sequentially, proceeding with initialization');
        // All scripts are loaded, proceed with initialization
        this.babylonReady();
      })
    } else {
      this.babylonReady();
    }

  }

  async babylonReady() {
    let game = this.game;

    // Access the renderCanvas element and set its size
    let renderCanvas = document.getElementById('babylon-render-canvas');

    if (!renderCanvas) {
      // if the render canvas does not exist, create it
      renderCanvas = document.createElement('canvas');
      renderCanvas.id = 'babylon-render-canvas';
      renderCanvas.style.width = '100%';
      renderCanvas.style.height = '100%';
      // renderCanvas.style.position = 'absolute';
      renderCanvas.style.top = '0px';
      renderCanvas.style.left = '0px';
      // append the renderCanvas to the gameHolder
      document.getElementById('gameHolder').appendChild(renderCanvas);
    }

    if (!renderCanvas) {
      throw new Error('No div element found in DOM with id "renderCanvas". This is required for Babylon.js to render. Please try again after adding a div element with id "renderCanvas" to the DOM.');
    }
    // TODO: config height and width from Game constructor
    if (typeof game.width === 'number') {
      renderCanvas.width = game.width;  // Set canvas width in pixels
    }
    if (typeof game.height === 'number') {
      renderCanvas.height = game.height; // Set canvas height in pixels
    }

    this.engine = new BABYLON.Engine(renderCanvas, true);
    // TODO: enabled WebGPU by default
    //this.engine = new BABYLON.WebGPUEngine(renderCanvas, true);
    // await this.engine.initAsync();
    this.scene = new BABYLON.Scene(this.engine);
    this.game.scene = this.scene; // Remark: We need a way for babylon components to access the scene
    game.scene = this.scene; // Remark: We need a way for babylon components to access the scene


    this.initializeObjectPools(3000);

    // TODO: move this into Systems for Babylon client
    // this.cameraSystem = new CameraSystem(this.game, this.engine, this.scene);

    // Only initialize DebugGUI if debug flag is set to true
    if (this.debug) {
      // this.debugGUI = new DebugGUI(this.scene);
    }

    // Add a hemispheric light to ensure everything is illuminated
    let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;

    // Remark: This has been removed, as we are using a custom game loop and RequestAnimationFrame
    // this.scene.render() is instead called in the render() method of this class
    // this.engine.runRenderLoop(() => this.scene.render());
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

    // TODO: Should we have generic Camera plugin scoped to graphics pipeline?
    //       see how StarField.js is implemented for reference
    game.use(new plugins.Camera({ camera: this.config.camera }));

    game.graphicsReady.push(this.name);

    this.pendingLoad.forEach(function (pluginInstance) {
      game.use(pluginInstance);
    });

  }

  updateGraphic(entityData /*, alpha*/) {
    // console.log('setting position', entityData.position)
    let previousEntity = this.game.getEntity(entityData.id);
    if (!previousEntity || !previousEntity.graphics) {
      return;
    }

    let graphic = previousEntity.graphics['graphics-babylon'];

    // alpha value will be present if snapshot interpolation is enabled
    if (typeof alpha === 'number') {
      if (typeof previousEntity.position.z !== 'number') {
        previousEntity.position.z = 0;
      }
      if (typeof entityData.position.z !== 'number') {
        entityData.position.z = 0;
      }

      // Perform interpolation between the previous and current state
      let previousVector = new BABYLON.Vector3(previousEntity.position.x, previousEntity.position.y, previousEntity.position.z);
      let currentVector = new BABYLON.Vector3(entityData.position.x, entityData.position.y, entityData.position.z);
      const interpolatedPosition = BABYLON.Vector3.Lerp(previousVector, currentVector, alpha);
      // TODO: add rotation interpolation
      // const interpolatedRotation = BABYLON.Quaternion.Slerp(previousEntity.rotation, entityData.rotation, alpha);
      // console.log(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);
      // Update the entity's graphical representation with the interpolated state
      graphic.position = new BABYLON.Vector3(-interpolatedPosition.x, interpolatedPosition.z, interpolatedPosition.y);

    } else {
      //
      // Snapshot interpolation is not enabled, use exact position values from the snapshot
      //
      // console.log(-entityData.position.x, entityData.position.z, entityData.position.y);
      graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
    }

    if (entityData.rotation !== undefined) {
      //graphic.rotation.y = -entityData.rotation;
      // in additon, adjust by -Math.PI / 2;
      // adjust cylinder rotation shape to point "forward"
      // TODO: put in switch here for dimensions
      switch (this.game.physics.dimension) {
        case 2:
          graphic.rotation.y = entityData.rotation + -Math.PI / 2;
          break;
        case 3:
          graphic.rotation.y = entityData.rotation.y + -Math.PI / 2;
          graphic.rotation.x = entityData.rotation.x
          graphic.rotation.z = entityData.rotation.z + Math.PI / 2;
          break;
        default:
          throw new Error('Unknown physics dimensions, cannot update graphic')
          break;
      }
    }
  }

  removeGraphic(entityId) {
    //console.log('this.game.entities', this.game.entities);
    //console.log('this.game.entities[entityId]', this.game.entities[entityId])
    let entity = this.game.getEntity(entityId);
    if (!entity || !entity.graphics || !entity.graphics['graphics-babylon']) {
      return;
    }
    if (entity.graphics['graphics-babylon'].mantraPools) {
      // TODO: delegate here instead of if / else
      if (entity.type === 'BULLET') {
        this.releaseBullet(entity.graphics['graphics-babylon']);
      }
      if (entity.type === 'BLOCK') {
        this.releaseBlock(entity.graphics['graphics-babylon']);
      }
    } else {
      entity.graphics['graphics-babylon'].dispose();
    }

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
        graphic = this.getBullet(entityData);
        break;
      case 'TEXT':
        graphic = this.createText(entityData);
        break;
      case 'BORDER':
        graphic = this.createBox(entityData);
        break;
      case 'BLOCK':
        graphic = this.getBlock(entityData);
        break;
      case 'TRIANGLE':
        graphic = this.createTriangle(entityData);
        break;
      default:
        graphic = this.createBox(entityData); // TODO: createDefault()
    }

    graphic.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);

    return graphic;
  }

  initializeObjectPools(size) {
    for (let i = 0; i < POOL_SIZE_BLOCK; i++) {
      let block = BABYLON.MeshBuilder.CreateBox('box', {width: 1, height: 1, depth: 1}, this.scene);
      block.isVisible = false; // Start with the box hidden
      block.mantraPools = true;
      this.mantraPools.block.push(block);
    }

    for (let i = 0; i < POOL_SIZE_BULLET; i++) {
      let bullet = BABYLON.MeshBuilder.CreateSphere('box', {width: 1, height: 1, depth: 1}, this.scene);
      bullet.isVisible = false; // Start with the box hidden
      bullet.mantraPools = true;
      this.mantraPools.bullet.push(bullet);
    }

  }

  getBlock(entityData) {
    let block = this.mantraPools.block.find(b => !b.isVisible);
    if (block) {
      block.isVisible = true;
      // set height and width
      block.scaling.x = entityData.width;
      block.scaling.z = entityData.height;
      block.scaling.y = entityData.depth;
      // set position
      block.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);

      return block;
    }

    return this.createBox(entityData);
    // Optional: Create new box if none are available
  }

  releaseBlock(block) {
    block.isVisible = false;
    // Reset block properties if necessary
  }

  getBullet(entityData) {
    let bullet = this.mantraPools.bullet.find(b => !b.isVisible);
    if (bullet) {
      bullet.isVisible = true;
  
      // Assuming the original diameter of the bullet is known. 
      // Replace `originalDiameter` with the actual value.
      let originalDiameter = 1; // Example value
      let scale = (entityData.radius * 2) / originalDiameter;
  
      bullet.scaling.x = scale;
      bullet.scaling.y = scale;
      bullet.scaling.z = scale;
  
      bullet.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);
  
      return bullet;
    }
    return this.createSphere(entityData);
  }
  
  releaseBullet(bullet) {
    bullet.isVisible = false;
    // Reset bullet properties if necessary
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
    let box = BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: entityData.depth, depth: entityData.height }, this.scene);
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
  render(game, alpha) {
    let self = this;
    let cameraSystem = game.getSystem('graphics-babylon-camera');

    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      if (ent.pendingRender && ent.pendingRender['graphics-babylon']) {
        this.inflateEntity(ent, alpha);
        ent.pendingRender['graphics-babylon'] = false;
      }
    }

    cameraSystem.render();
    this.scene.render();

  }

  // called each time new gametick data arrives
  update() {
    let game = this.game;
    let cameraSystem = this.game.getSystem('graphics-babylon-camera');
    cameraSystem.update(); // is cameraSystem.update() required here?
  }

  // TODO: move inflateEntity to Graphics interface and use common between all graphics plugins
  inflateEntity(entity, alpha) {
    if (entity.graphics && entity.graphics['graphics-babylon']) {
      let graphic = entity.graphics['graphics-babylon'];
      if (entity.type !== 'BORDER') { // TODO: remove this
        this.updateGraphic(entity, alpha);
      }
    } else {
      if (entity.destroyed) {
        // shouldnt happen got destroy event for already removed ent
      } else {
        let graphic = this.createGraphic(entity);
        this.game.components.graphics.set([entity.id, 'graphics-babylon'], graphic);
      }
    }
  }

  handleZoom(event) {
    // Logic for zoom handling
  }

  inflate(snapshot) { } // not used?


}

export default BabylonGraphics;
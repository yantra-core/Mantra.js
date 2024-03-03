// BabylonGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import BabylonCamera from './camera/BabylonCamera.js';
// import inflate3DText from './lib/inflate3DText.js';
import inflateText from './lib/inflateText.js';
import createBox from './lib/createBox.js';
import getBlock from './lib/getBlock.js';
import updateGraphic from './lib/updateGraphic.js';
import apply2DTexture from './lib/apply2DTexture.js';

let lastKnownStates = {};
const POOL_SIZE_BLOCK = 3000;
const POOL_SIZE_BULLET = 1000;

// You can create your own renderer by replacing this file with a Class that extends GraphicsInterface.js
class BabylonGraphics extends GraphicsInterface {

  static id = 'graphics-babylon';
  static removable = false;
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor({ camera = {} } = {}) {
    super();
    this.id = BabylonGraphics.id;
    this.async = BabylonGraphics.async;
    this.engine = null;
    this.scene = null;
    this.createBox = createBox.bind(this);
    this.getBlock = getBlock.bind(this);
    this.updateGraphic = updateGraphic.bind(this);
    this.apply2DTexture = apply2DTexture.bind(this);

    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      }
    }

    if (typeof camera.startingZoom !== 'number') {
      camera.startingZoom = 1;
    }

    if (typeof camera.follow === 'undefined') {
      camera.follow = true;
    }

    this.camera = camera;
    this.startingZoom = camera.startingZoom;
    this.entityStates = {};    // Store application-specific entity data
    this.debug = false;  // Store debug flag for later usage
    this.pendingLoad = []; // queue of pending Plugins that depend on this Babylon Graphics

    // this.inflate3DText = inflateText.bind(this);
    this.inflateText = inflateText.bind(this);

    // config scope for convenience
    let config = camera;
    this.config = config;

    this.mantraPools = {
      block: [],
      bullet: []
    };

  }

  init(game) {
    this.game = game;
    this.game.use('Graphics');
    // check to see if BABYLON scope is available, if not assume we need to inject it sequentially
    if (typeof BABYLON === 'undefined') {
      console.log('BABYLON is not defined, attempting to load it from vendor');

      game.loadScripts([
        '/vendor/babylon.js',
        '/vendor/babylon.gui.min.js',
        '/vendor/babylonjs.materials.min.js',
        //        '/vendor/babylonjs.loaders.min.js',
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
      // renderCanvas.style.background = '#007fff';
      // append the renderCanvas to the gameHolder

      // Setup the canvas dimensions
      if (typeof game.width === 'number') {
        renderCanvas.width = game.width;
      }
      if (typeof game.height === 'number') {
        renderCanvas.height = game.height;
      }

      // Ensure the canvas has a transparent background
      renderCanvas.style.background = 'transparent';

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

    // this.engine = new BABYLON.Engine(renderCanvas, true);

    // Create the engine with alpha (transparency) enabled
    this.engine = new BABYLON.Engine(renderCanvas, true, { preserveDrawingBuffer: true, stencil: true, alpha: true });

    // TODO: enabled WebGPU by default
    //this.engine = new BABYLON.WebGPUEngine(renderCanvas, true);
    // await this.engine.initAsync();
    this.scene = new BABYLON.Scene(this.engine);
    this.game.scene = this.scene; // Remark: We need a way for babylon components to access the scene
    game.scene = this.scene; // Remark: We need a way for babylon components to access the scene

    // Set the scene's clear color to transparent
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

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
    game.use(new BabylonCamera({ camera: this.camera }));

    this.pendingLoad.forEach(function (pluginInstance) {
      game.use(pluginInstance);
    });

    // this.createCompass();


    // once the graphics system is ready, add it to the systemsManager
    this.game.systemsManager.addSystem('graphics-babylon', this);

    // register this graphics pipline with the game
    game.graphics.push(this);

    // Setup AssetsManager or similar loader
    let assetsManager = new BABYLON.AssetsManager(this.scene);

    // Define your assets to be loaded here
    // Example: var meshTask = assetsManager.addMeshTask("mesh task", "", "path/", "file.babylon");

    // Check when all assets are loaded
    assetsManager.onFinish = (tasks) => {
      // All assets are loaded, now you can emit your ready event
      game.emit('plugin::ready::graphics-babylon', this);
      //game.loadingPluginsCount--;
      document.body.style.cursor = 'default';
    };

    // Start loading the assets
    assetsManager.load();

    /* TODO load custom meshes from obj
    BABYLON.SceneLoader.ImportMesh("helloMesh", "textures/", "monu3.obj", this.scene, function (newMeshes) {
      // Set the target of the camera to the first imported mesh
      newMeshes[0].position = new BABYLON.Vector3(-100, 2, 2000);
      newMeshes[0].scaling = new BABYLON.Vector3(250, 250, 250);
      camera.target = newMeshes[0];
    });
    */


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
    // console.log('Babylon.createGraphic', entityData)
    // throw new Error('line')
    // switch case based on entityData.type
    let graphic;
    switch (entityData.type) {
      case 'PLAYER':
        if (entityData.shape === 'rectangle') {
          graphic = this.createBox(entityData);
        } else {
          graphic = this.getBlock(entityData);
        }
        break;
      case 'BULLET':
        graphic = this.getBullet(entityData);
        break;
      case 'TEXT':
        graphic = this.inflateText(entityData);
        // TODO: add support for 3d text
        // graphic = this.inflateText(entityData);
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

    // TODO: allow for setting of z position in 2d mode, if z exists
    if (this.game.physics.dimension === 2) {
      if (typeof entityData.position.z === 'undefined') {
        // console.log("undefined Z", entityData.type, entityData.position)
        entityData.position.z = 1;
      }
      graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
    }

    if (this.game.physics.dimension === 3) {
      graphic.position = new BABYLON.Vector3(-entityData.position.x, entityData.position.z, entityData.position.y);
    }

    if (typeof entityData.color === 'number') {

      if (!graphic.material) {
        graphic.material = new BABYLON.StandardMaterial("material", this.scene);
      }

      // console.log("setting color", entityData.color)
      // Extract RGB components from the hexadecimal color value
      var red = (entityData.color >> 16) & 255;
      var green = (entityData.color >> 8) & 255;
      var blue = entityData.color & 255;
      // Set tint of graphic using the extracted RGB values
      graphic.material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
      // console.log('updated graphic.diffuseColor', graphic.diffuseColor);

    }

    return graphic;
  }

  initializeObjectPools(size) {
    for (let i = 0; i < POOL_SIZE_BLOCK; i++) {
      let block = BABYLON.MeshBuilder.CreateBox('box', { width: 1, height: 1, depth: 1 }, this.scene);
      block.isVisible = false; // Start with the box hidden
      block.mantraPools = true;
      this.mantraPools.block.push(block);
    }

    for (let i = 0; i < POOL_SIZE_BULLET; i++) {
      let bullet = BABYLON.MeshBuilder.CreateSphere('box', { width: 1, height: 1, depth: 1 }, this.scene);
      bullet.isVisible = false; // Start with the box hidden
      bullet.mantraPools = true;
      this.mantraPools.bullet.push(bullet);
    }
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
      let originalDiameter = 4; // Example value
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

  createSphere(entityData) {
    let sphere = BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: entityData.radius * 2 }, this.scene);
    return sphere;
  }

  createTriangle(entityData) {

    let mesh = BABYLON.MeshBuilder.CreateCylinder(entityData.id, {
      diameterTop: 0,
      diameterBottom: entityData.width,
      height: entityData.height,
      tessellation: 3
    }, this.scene);

    // rotate the triangle so it points "forward"
    // Remark: 11/25 this is no longer working? 
    mesh.rotation.z = Math.PI / 2;
    mesh.rotation.y += -Math.PI / 2;
    return mesh;
  }

  // called as much as the client requires in order to render
  render(game, alpha) {
    let self = this;

    if (game.systems['graphics-babylon-camera']) {
      let cameraSystem = game.getSystem('graphics-babylon-camera');
      cameraSystem.render();
    }

    this.scene.render();

  }

  // called each time new gametick data arrives
  update() {
    let game = this.game;

    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateGraphic(ent, 1);
    }


    if (game.systems['graphics-babylon-camera']) {
      let cameraSystem = this.game.getSystem('graphics-babylon-camera');
      cameraSystem.update(); // is cameraSystem.update() required here?
    }

  }

  inflateGraphic(entity, alpha) {
    if (entity.graphics && entity.graphics['graphics-babylon']) {
      let graphic = entity.graphics['graphics-babylon'];
      this.updateGraphic(entity, alpha);
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

  unload() {

    // TODO: consolidate graphics pipeline unloading into SystemsManager
    // TODO: remove duplicated unload() code in PhaserGraphics

    // iterate through all entities and remove existing babylon graphics
    for (let [eId, entity] of this.game.entities.entries()) {
      if (entity.graphics && entity.graphics['graphics-babylon']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-babylon'];
      }
    }

    // remove BabylonCamera as well
    // Remark: is this required? could we just leave it in memory?
    this.game.systemsManager.removeSystem('graphics-babylon-camera');

    this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
    delete this.game._plugins['BabylonGraphics'];

    // stop babylon, remove canvas
    this.engine.stopRenderLoop();
    this.engine.dispose();
    this.scene.dispose();
    // remove canvas

    let canvas = document.getElementById('babylon-render-canvas');
    if (canvas) {
      // hide canvas
      // canvas.style.display = 'none';
      canvas.remove();
    }


  }

}

export default BabylonGraphics;
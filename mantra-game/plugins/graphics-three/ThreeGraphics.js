// ThreeGraphics.js - Marak Squires 2023
import { MOUSE, Scene, WebGLRenderer, PerspectiveCamera, HemisphereLight, Vector3 } from 'three';
import { OrbitControls } from '../../vendor/three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../../vendor/three/examples/jsm/loaders/FontLoader.js';

import GraphicsInterface from '../../lib/GraphicsInterface.js';

import render from './lib/render.js';
import createGraphic from './lib/createGraphic.js';
import updateGraphic from './lib/updateGraphic.js';
import removeGraphic from './lib/removeGraphic.js';
import inflateGraphic from './lib/inflateGraphic.js';
import inflateTexture from './lib/inflateTexture.js';
import inflateText from './lib/inflateText.js';

class ThreeGraphics extends GraphicsInterface {
  static id = 'graphics-three';
  static removable = false;
  static async = false; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor({ camera, cameraConfig } = {}) {
    super();
    this.id = ThreeGraphics.id;
    this.async = ThreeGraphics.async;
    this.renderer = null;
    this.camera = null;
    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    // Set default camera configuration or use the provided one
    this.cameraConfig = cameraConfig || {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000
    };

    // Flag to determine if manual camera control is active
    this.isManualControlActive = false;

  }

  init(game) {
    
    this.render = render.bind(this);
    this.inflateGraphic = inflateGraphic.bind(this);
    this.createGraphic = createGraphic.bind(this);
    this.updateGraphic = updateGraphic.bind(this);
    this.removeGraphic = removeGraphic.bind(this);
    this.inflateTexture = inflateTexture.bind(this);
    this.inflateText = inflateText.bind(this);
    this.game = game;
    this.game.systemsManager.addSystem('graphics-three', this);

    if (typeof this.game.threeReady === 'undefined') {
      this.game.threeReady = false; // TODO: remove this, check case in SystemManager for double plugin init
    }

    this.loadFont(()=>{
      this.threeReady(game);
    });

  }

  threeReady(game) {
    if (this.game.threeReady) {
      console.warn('ThreeGraphics already initialized');
      return;
    }
    this.game.threeReady = true;

    // get the three-render-canvas, if exists, clear it
    let canvas = document.getElementById('three-render-canvas');
    if (canvas) {
      canvas.remove();
    }

    this.scene = new Scene();
    // Initialize the renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    // set to transparent
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = 'three-render-canvas';

    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder);
    }

    document.getElementById('gameHolder').appendChild(this.renderer.domElement);

    // Create and configure the camera
    this.camera = new PerspectiveCamera(
      this.cameraConfig.fov,
      this.cameraConfig.aspect,
      this.cameraConfig.near,
      this.cameraConfig.far
    );

    // Set up the camera defaults
    this.setCameraDefaults();

    // Set up the mouse wheel event listener for zooming
    this.setupZoomControls();

    // Add a light source
    const light = new HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);


    // Notify the system that graphics are ready
    // game.graphicsReady.push(this.name);

    // Position the camera for a bird's eye view
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(new Vector3(0, 0, 0));

    // Initialize OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Correctly disable mouse buttons for OrbitControls
    this.disableOrbitControlsMouseEvents(this.controls); // Pass 'this.controls' as the argument

    // Add event listeners to set the flag during manual camera control
    this.controls.addEventListener('start', () => {
      this.isManualControlActive = true;
    });

    this.controls.addEventListener('end', () => {
      this.isManualControlActive = false;
    });

    // this.controls.enableZoom = true; // Enable zooming
    // async:true plugins *must* self report when they are ready
    // game.emit('plugin::ready::graphics-three', this);
    game.graphics.push(this);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    document.body.style.cursor = 'default';
  }

  setCameraDefaults() {
    // this.camera.position.set(0, 0, 100); // Set a default position
    // this.setZoom(1); // Set a default zoom level
    this.game.data.camera.mode = 'follow';
  }

  setZoom(zoomLevel) {
    // Here we are using fov to control the zoom. You can adjust this formula as needed.
    const newFov = 75 / zoomLevel;
    this.camera.fov = newFov;
    this.camera.updateProjectionMatrix();
    this.game.data.camera.currentZoom = zoomLevel;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  loadFont(cb) {
    let game = this.game;
    const fontLoader = new FontLoader();
    fontLoader.load('vendor/fonts/helvetiker_regular.typeface.json', function (font) {
      // Store the loaded font in your game's state
      // console.log('got back', null, font)
      game.font = font;
      cb(null, font)
      //game.setFont(font);
    });

  }

  // update() is called by the SystemsManager, it's the main game loop
  // Remark: Graphics generally should run in the render() loop, not the update() loop
  // update() {}

  // Remark: updateCamera() is called from within the render() loop
  updateCamera() {
    let game = this.game;

    /* default camera view 
    this.camera.position.set(0, 400, 100);
    this.camera.lookAt(new Vector3(0, 150, -100));
    */

    // Get the current player entity
    const currentPlayer = game.getEntity(game.currentPlayerId);
    if (!currentPlayer) {
      // If no current player, set a default camera position and perspective
      this.camera.position.set(0, 400, 100);
      this.camera.lookAt(new Vector3(0, 0, 0));
      return;
    }

    const playerGraphic = game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
    if (!playerGraphic) {
      console.warn('Player graphic component not found');
      return;
    }

    // Determine the camera mode and update accordingly
    switch (game.data.camera.mode) {
      case 'fpv':
      case 'none':
        this.setFirstPersonView(playerGraphic);
        break;
      case 'follow':
        this.updateFollowCamera(playerGraphic);
        break;
      case 'platform': // 'follow' and 'platform' share the same logic
        this.updatePlatformCamera(playerGraphic);
        break;
      default:
        console.warn('Unknown camera mode:', game.data.camera.mode);
    }
  }

  updatePlatformCamera(playerGraphic) {
    // Calculate the new camera position with an offset
    const offset = new Vector3(0, 150, -100); // Adjust the offset as needed
    const newPosition = playerGraphic.position.clone().add(offset);
    const lookAtPosition = playerGraphic.position.clone();

    // Update orientation only when not manually controlling
    if (!this.isManualControlActive) {
      // Smoothing the camera movement
      this.camera.position.copy(newPosition);
      this.camera.lookAt(lookAtPosition);
    }
  }

  updateFollowCamera(playerGraphic) {
    // Calculate the new camera position with an offset

    // top-down
    let offset;

    if (this.game.data.mode === 'topdown') {
      offset = new Vector3(0, 150, -100); // Adjust the offset as needed
      let newPosition = playerGraphic.position.clone().add(offset);
      // top-down
      let lookAtPosition = playerGraphic.position.clone();

      // Update orientation only when not manually controlling
      if (!this.isManualControlActive) {
        this.camera.position.copy(newPosition);
        this.camera.lookAt(lookAtPosition);
        this.camera.up.set(0, 1, 0);
      }

    } else if (this.game.data.mode === 'platform') {

      offset = new Vector3(0, 250, 0);

      let newPosition = playerGraphic.position.clone().add(offset);
      // 2d platform side view
      let lookAtPosition = new Vector3(playerGraphic.position.x, playerGraphic.position.y, playerGraphic.position.z);

      // Update orientation only when not manually controlling
      if (!this.isManualControlActive) {
        this.camera.position.copy(newPosition);
        this.camera.lookAt(lookAtPosition);

        this.camera.up.set(0, -1, 0);
      }

    }

  }

  setFirstPersonView(playerGraphic) {
    playerGraphic.visible = false;
    const eyePositionOffset = new Vector3(0, 1.6, 0);
    const playerPosition = playerGraphic.position.clone();
    const cameraPosition = playerPosition.add(eyePositionOffset);

    const forwardDirection = new Vector3(0, 0, -1).applyQuaternion(playerGraphic.quaternion);
    const lookAtPosition = cameraPosition.clone().add(forwardDirection);

    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(lookAtPosition);
  }

  smoothCameraUpdate(newPosition, lookAtPosition) {
    // Adjust the lerp factor to control the smoothness (smaller value = smoother)
    const lerpFactor = 0.05;
    this.camera.position.lerp(newPosition, lerpFactor);
    this.camera.lookAt(lookAtPosition);
  }

  disableOrbitControlsMouseEvents(orbitControls) {
    if (!orbitControls) return; // Guard clause in case orbitControls is not defined
    orbitControls.mouseButtons = {
      LEFT: null, // Disables orbiting with left mouse button
      MIDDLE: MOUSE.ROTATE, // Enables dollying with the middle mouse button
      RIGHT: null // Disables panning with right mouse button
    };

    // Optionally, you might want to disable the touch events if they are not needed
    orbitControls.touches = {
      ONE: null, // Disables touch rotation
      TWO: null // Disables touch zoom/pan
    };
  }

  setupZoomControls() {
    const zoomSensitivity = -0.05; // Adjust this value based on desired zoom speed
    const minFov = 20; // Minimum FOV
    const maxFov = 150; // Maximum FOV, you can adjust this value

    this.renderer.domElement.addEventListener('wheel', (event) => {
      // Adjust the camera's FOV
      this.camera.fov -= event.deltaY * zoomSensitivity;
      // Clamp the FOV to the min/max limits
      this.camera.fov = Math.max(Math.min(this.camera.fov, maxFov), minFov);
      // Update the camera's projection matrix
      this.camera.updateProjectionMatrix();
    });
  }

  unload() {

    // remove events mouse wheel camera
    this.renderer.domElement.removeEventListener('wheel', () => { });

    // iterate through all entities and remove existing babylon graphics
    for (let [eId, entity] of this.game.entities.entries()) {
      if (entity.graphics && entity.graphics['graphics-three']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-three'];
      }
    }

    this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
    delete this.game._plugins['ThreeGraphics'];

    // Remove the canvas from the DOM
    const canvas = document.getElementById('three-render-canvas');
    if (canvas) {
      canvas.remove();
    }
    this.game.threeReady = false;

  }

}

export default ThreeGraphics;
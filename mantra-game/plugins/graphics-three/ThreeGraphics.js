// ThreeGraphics.js - Marak Squires 2023
import { Scene, WebGLRenderer, PerspectiveCamera, HemisphereLight, Vector3 } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import GraphicsInterface from '../../lib/GraphicsInterface.js';

import render from './lib/render.js';
import createGraphic from './lib/createGraphic.js';
import updateGraphic from './lib/updateGraphic.js';
import removeGraphic from './lib/removeGraphic.js';
import inflateGraphic from './lib/inflateGraphic.js';
import inflateTexture from './lib/inflateTexture.js';

// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { FontLoader } from './lib/FontLoader.js'

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
  }

  init(game) {

    this.render = render.bind(this);
    this.inflateGraphic = inflateGraphic.bind(this);
    this.createGraphic = createGraphic.bind(this);
    this.updateGraphic = updateGraphic.bind(this);
    this.removeGraphic = removeGraphic.bind(this);
    this.inflateTexture = inflateTexture.bind(this);

    this.game = game;
    this.game.systemsManager.addSystem('graphics-three', this);

    game.data.camera = {
      mode: 'follow',
      position: {
        x: 0,
        y: 0
      }
    }

    this.threeReady(game);

  }

  threeReady(game) {

    this.scene = new Scene();

    // Initialize the renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    // set to transparent
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.id = 'three-render-canvas';
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
    // TODO: Initialize controls for camera interaction
    //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableZoom = true; // Enable zooming
    // async:true plugins *must* self report when they are ready
    // game.emit('plugin::ready::graphics-three', this);

    game.graphics.push(this);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    document.body.style.cursor = 'default';

  }

  setCameraDefaults() {
    // this.camera.position.set(0, 0, 100); // Set a default position
    this.setZoom(1); // Set a default zoom level
    this.game.data.camera.mode = 'follow';
  }

  setZoom(zoomLevel) {
    // Here we are using fov to control the zoom. You can adjust this formula as needed.
    const newFov = 75 / zoomLevel;
    this.camera.fov = newFov;
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  loadFont(path, cb) {
    let game = this.game;
    const fontLoader = new FontLoader();
    fontLoader.load('vendor/fonts/helvetiker_regular.typeface.json', function (font) {
      // Store the loaded font in your game's state
      console.log('got back', null, font)
      game.font = font;
      cb(null, font)
      //game.setFont(font);
    });

  }

  // called by systemsManager on each game tick
  update() {
    this.updateCameraFollow();
  }

  updateCameraFollow() {
    let game = this.game;
    // Follow the player entity with the camera
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    if (currentPlayer) {
      if (game.data.camera.mode === 'fpv') {
        this.setFirstPersonView();
      }

      if (game.data.camera.mode === 'follow') {

        const playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
        if (playerGraphic) {
          // Calculate the new camera position with a slight offset above and behind the player
          const newPosition = playerGraphic.position.clone().add(new Vector3(0, 150, -100));
          const lookAtPosition = playerGraphic.position.clone();
          // Use a smaller lerp factor for smoother camera movement
          this.camera.position.lerp(newPosition, 0.05);
          this.camera.lookAt(lookAtPosition);
        }

      }

      if (game.data.camera.mode === 'platform') {

        const playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
        if (playerGraphic) {
          // Calculate the new camera position with a slight offset above and behind the player
          const newPosition = playerGraphic.position.clone().add(new Vector3(0, 150, -100));
          const lookAtPosition = playerGraphic.position.clone();

          // Use a smaller lerp factor for smoother camera movement
          this.camera.position.lerp(newPosition, 0.05);
          this.camera.lookAt(lookAtPosition);
        }

      }

    } else {
      // no current player
      // sets a default camera position and perspective
      // TODO: add multiple camera views here / camera controls to orbital view
      this.camera.position.set(0, 400, 100); // Set a default position
      this.camera.lookAt(new Vector3(0, 0, 0));
      console.log('fffcouldnt find follow player looking at 0');
    }
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

    // remove canvas
    let canvas = document.getElementById('three-render-canvas');

    if (canvas) {
      // hide canvas
      // canvas.style.display = 'none';
      canvas.remove();
    }

  }


  // New function to switch to first-person perspective
  setFirstPersonView() {
    const currentPlayer = this.game.getEntity(this.game.currentPlayerId);
    if (!currentPlayer) {
      console.warn('Current player entity not found');
      return;
    }

    const playerGraphic = this.game.components.graphics.get([this.game.currentPlayerId, 'graphics-three']);
    if (!playerGraphic) {
      console.warn('Player graphic component not found');
      return;
    }

    playerGraphic.visible = false;

    // Assume the player's "eyes" are located at some offset
    const eyePositionOffset = new Vector3(0, 1.6, 0); // Adjust Y offset to represent the player's eye level
    const playerPosition = playerGraphic.position.clone();

    // Position the camera at the player's eye level
    this.camera.position.copy(playerPosition.add(eyePositionOffset));

    // Assuming the player's forward direction is along the negative Z-axis of the player's local space
    // We need to find the forward direction in world space
    const forwardDirection = new Vector3(0, 0, 0);
    forwardDirection.applyQuaternion(playerGraphic.quaternion); // Convert local forward direction to world space

    // Look in the forward direction from the current camera position
    const lookAtPosition = this.camera.position.clone().add(forwardDirection);
    this.camera.lookAt(lookAtPosition);
  }

}

export default ThreeGraphics;
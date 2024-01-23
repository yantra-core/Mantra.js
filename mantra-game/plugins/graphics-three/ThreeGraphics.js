// ThreeGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';

import render from './lib/render.js';
import createGraphic from './lib/createGraphic.js';
import updateGraphic from './lib/updateGraphic.js';
import removeGraphic from './lib/removeGraphic.js';
import inflateGraphic from './lib/inflateGraphic.js';
import inflateTexture from './lib/inflateTexture.js';

class ThreeGraphics extends GraphicsInterface {
  static id = 'graphics-three';
  static removable = false;
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

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

    // check to see if THREE scope is available, if not assume we need to inject it sequentially
    if (typeof THREE === 'undefined') {
      console.log('THREE is not defined, attempting to load it from vendor');

      game.loadScripts([
        '/vendor/three.min.js'
      ], () => {
        this.threeReady(game);
      });

    } else {
      this.threeReady(game);
    }

  }

  threeReady(game) {

    this.scene = new THREE.Scene();

    // Initialize the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gameHolder').appendChild(this.renderer.domElement);

    // Create and configure the camera
    this.camera = new THREE.PerspectiveCamera(
      this.cameraConfig.fov,
      this.cameraConfig.aspect,
      this.cameraConfig.near,
      this.cameraConfig.far
    );

    // Add a light source
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);

    // Notify the system that graphics are ready
    // game.graphicsReady.push(this.name);

    // Position the camera for a bird's eye view
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    // TODO: Initialize controls for camera interaction
    // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableZoom = true; // Enable zooming

    // async:true plugins *must* self report when they are ready
    game.emit('plugin::ready::graphics-three', this);
    // TODO: remove this line from plugin implementations
    game.loadingPluginsCount--;
        
    game.graphics.push(this);

    document.body.style.cursor = 'default';

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
      const playerGraphic = this.game.components.graphics.get([game.currentPlayerId, 'graphics-three']);
      if (playerGraphic) {
        // Calculate the new camera position with a slight offset above and behind the player
        const newPosition = playerGraphic.position.clone().add(new THREE.Vector3(0, 150, -100));
        const lookAtPosition = playerGraphic.position.clone();
  
        // Use a smaller lerp factor for smoother camera movement
        this.camera.position.lerp(newPosition, 0.05);
        this.camera.lookAt(lookAtPosition);
      }
    }
  }

}

export default ThreeGraphics;

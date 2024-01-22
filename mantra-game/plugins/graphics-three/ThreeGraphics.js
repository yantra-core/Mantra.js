// ThreeGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';

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
    game.graphics.push(this);

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

  }

  createGraphic(entityData) {
    let geometry, material, mesh;

    switch (entityData.type) {
      case 'BORDER':
        geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
        break;
      case 'BULLET':
        geometry = new THREE.SphereGeometry(entityData.radius, 32, 32);
        break;
      case 'PLAYER':
        geometry = new THREE.CylinderGeometry(0, entityData.width, entityData.height, 3);
        break;
      default:
        geometry = new THREE.BoxGeometry(entityData.width, entityData.width, entityData.width); // Default to a unit cube if no shape is specified
    }

    // Basic white material, replace with textures/materials as needed
    material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      wireframe: true // Set wireframe to true
    });

    mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh); // Add the mesh to the scene
    // Store the mesh in the 'graphics' component
    this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);
    mesh.position.set(-entityData.position.x, 1, -entityData.position.y);


    return mesh;
  }

  updateGraphic(entityData) {
    const mesh = this.game.components.graphics.get([entityData.id, 'graphics-three']);
    if (!mesh) {
      console.error('No mesh found for entity', entityData.id);
      return;
    }

    // Update mesh position and rotation
    if (typeof entityData.rotation === 'object' && entityData.rotation !== null) {
      // 3D
      mesh.rotation.set(entityData.rotation.x, entityData.rotation.y, entityData.rotation.z);

    } else {
      // 2D / 2.5D
      mesh.rotation.set(0, entityData.rotation, 0);
    }
    
    // TODO: Add support for 3D position with entityData.position.z if available
    mesh.position.set(-entityData.position.x, 1, -entityData.position.y);

  }

  removeGraphic(entityId) {
    // Fetch the mesh from the 'graphics' component
    const mesh = this.game.components.graphics.get([entityId, 'graphics-three']);
    if (mesh) {
      this.scene.remove(mesh);
      // Remove the mesh from the 'graphics' component
      this.game.components.graphics.remove([entityId, 'graphics-three']);
    }
  }

  // called by systemsManager on each game tick
  update() {
    this.updateCameraFollow();
  }

  // called as much as the client requires in order to render
  render(game, alpha) {
    let self = this;
    // Update the controls on each frame
    // this.controls.update();
    // Follow the player entity with the camera

    let fovEntities = new Map();
    let currentPlayer = this.game.data.currentPlayer;
    //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);
    let itemsInFov = game.getPlayerFieldOfView(currentPlayer, 16, false);

    for (let [eId, state] of this.game.entities.entries()) {
      //console.log('eId',eId, itemsInFov)
      if (game.useFoV && itemsInFov.indexOf(eId) === -1) {
        game.removeGraphic(eId);
        continue;
      }
      let ent = this.game.entities.get(eId);
      this.inflateEntity(ent, alpha);
    }
    this.renderer.render(this.scene, this.camera);
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

  inflateEntity(entity, alpha) {
    if (entity.graphics && entity.graphics['graphics-three']) {
      let graphic = entity.graphics['graphics-three'];
      if (entity.type !== 'BORDER') { // TODO: remove this
        this.updateGraphic(entity, alpha);
      }
    } else {
      let graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-three'], graphic);
    }
  }

}

export default ThreeGraphics;

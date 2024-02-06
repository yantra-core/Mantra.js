// MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023
import Component from './Component/Component.js';
import construct from './lib/Game/construct.js';
import use from './lib/Game/use.js';
import start from './lib/Game/start.js';

// The Game class is the main entry point for Mantra games
class Game {
  constructor(customConfig = {}) {
    // Default configuration
    const defaultConfig = {
      // game modes
      isClient: true,
      isEdgeClient: false,
      isServer: false,
      isOfflineMode: undefined,
      plugins: {}, // Plugin Classes that will be bound to the game instance
      // game options
      showLoadingScreen: true,
      minLoadTime: 330, // minimum time to show loading screen
      loadDefaultPlugins: true, // auto-loads default plugins based on pluginsConfig
      width: 800,
      height: 600,
      fieldOfView: 1600,
      useFoV: true,
      // game systems / auto-load based on pluginsConfig
      physics: 'matter',
      graphics: ['css'],
      collisions: true,
      camera: {},
      gravity: {},
      keyboard: true,
      mouse: true,
      gamepad: true,
      editor: true,
      sutra: true,
      lifetime: true,
      defaultMovement: true,
      // data compression
      protobuf: false,
      msgpack: false,
      deltaCompression: false,
      deltaEncoding: true,
      defaultPlayer: true,
      options: {},
      mode: 'topdown', // default entity input and movement mode defined as Sutras
      multiplexGraphicsHorizontally: false // default behavior is multiple graphics plugins will be horizontally stacked
    };

    // Merge custom configuration with defaults
    const config = { ...defaultConfig, ...customConfig };

    // Override for server-specific defaults
    if (config.isServer) {
      config.showLoadingScreen = false;
      config.isClient = false;
    }

    // Assigning the final configuration to this.config
    this.config = config;

    // Game.use('PluginName') is a helper function for loading plugins
    // must be defined before construct() is called
    this.use = use(this, config.plugins);

    // Additional construction logic
    construct(this, config.plugins);

    // Plugin handling
    this.start = start.bind(this);

  }

  update(deltaTime) {
    // Call update method of SystemsManager, which delegate to all Systems which have an update method
    this.systemsManager.update(deltaTime);
  }

  render() {
    // Call render method of SystemsManager, which will delegate to all Graphics systems
    this.systemsManager.render();
  }


  //
  // Component APIs
  //
  addComponent(entityId, componentType, data) {
    if (!this.components[componentType]) {
      this.components[componentType] = new Component(componentType, this);
    }
    // Initialize an empty map for the actionRateLimiter component
    // TODO: remove this hard-coded check for actionRateLimiter
    if (componentType === 'actionRateLimiter') {
      data = new Map();
    }
    this.components[componentType].set(entityId, data);
  }

  getComponent(entityId, componentType) {
    if (this.components.hasOwnProperty(componentType)) {
      return this.components[componentType].get(entityId);
    }
    return null;
  }

  //
  // System APIs
  //
  addSystem(systemName, system) {
    return this.systemsManager.addSystem(systemName, system);
  }

  getSystem(systemName) {
    return this.systemsManager.getSystem(systemName);
  }

  removeSystem(systemName) {
    return this.systemsManager.removeSystem(systemName.toLowerCase());
  }

  updateGraphic(entityData) {
    this.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData);
    });
  }

  //
  // Plugin APIs
  //
  loadPluginScript(scriptUrl) {
    console.log('Loading', scriptUrl)
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      //script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`));
      document.head.appendChild(script);
    });
  }

  removePlugin(pluginName) {
    let plugin = this._plugins[pluginName];
    if (plugin) {
      // check to see if plugin is a system, if so remove the system
      if (this.systems[plugin.id]) {
        this.removeSystem(plugin.id);
      }
      // next see if plugin has unload method, if so call it
      if (typeof plugin.unload === 'function') {
        plugin.unload();
      }
      delete this._plugins[pluginName];
    }
  }

  setControls(controls) {
    let game = this;
    game.controls = controls;
    if (game.systems['entity-input']) {
      // TODO: update instead of replace?
      game.systems['entity-input'].controlMappings = controls;
    }
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  //
  // Player specific APIs
  //
  setPlayerId(playerId) {
    console.log('setting playerID', playerId)
    this.currentPlayerId = playerId;
  }

  getCurrentPlayer() {
    return this.getEntity(this.currentPlayerId);
  }

  getPlayerFieldOfView(entId, distance = 1000, mergeData = true) {
    let ent;

    if (typeof entId === 'object') {
      ent = entId;
    } else {
      ent = this.getEntity(entId);
    }

    if (!ent) {
      console.log('Warning: no entity found for entId', entId);
      return [];
    }

    let centerPosition = ent.position;
    let query = {
      minX: centerPosition.x - distance,
      minY: centerPosition.y - distance,
      maxX: centerPosition.x + distance,
      maxY: centerPosition.y + distance
    };

    if (this.systems.rbush) {
      return this.systems.rbush.search(query, mergeData)
    } else {
      console.log('Warning: no rbush system found, cannot perform getPlayerFieldOfView query');
    }

  }

  //
  // Audio / Multimedia APIs
  //
  playNote(note, duration) {
    console.log('Tone Plugin not loaded. Cannot play tone note.');
  }

  //
  // Physics Engine APIs
  //
  setGravity(x = 0, y = 0, z = 0) {
    if (this.physics) {
      this.physics.setGravity(x, y, z);
    }
  }

  setPosition(entityId, position) {
    const body = this.bodyMap[entityId];
    this.physics.setPosition(body, position);
  }

  applyForce(entityId, force) {
    const body = this.bodyMap[entityId];
    this.physics.applyForce(body, body.position, force);
    this.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
  }

  applyPosition(entityId, position) {
    const body = this.bodyMap[entityId];
    // takes the current position and adds the new position
    let newPosition = {
      x: body.position.x + position.x,
      y: body.position.y + position.y
    };
    this.physics.setPosition(body, newPosition);
  }

  rotate(entityId, rotation) {
    const rotationSpeed = 0.022; // TODO: config
    let rotationAmount = rotation * rotationSpeed;
    const body = this.bodyMap[entityId];
    this.physics.rotateBody(body, rotationAmount);
  }

  //
  // Camera APIs
  //
  rotateCamera(angle) {
    // not implemented directly, Graphics plugin will hoist this
  }

  setZoom() { // TODO: remove setZoom, use delegation to camera.zoom() instead of hoisting
    // not implemented directly, Graphics plugin will hoist this
  }

  zoom(scale) {
    if (this.camera && this.camera.zoom) {
      this.camera.zoom(scale);
    } else {
      console.log('warning: no camera.zoom method found')
    }
  }

  shakeCamera(intensity, duration) {
    this.graphics.forEach(function (graphicsInterface) {
      if (graphicsInterface.cameraShake) {
        graphicsInterface.shakeCamera(intensity, duration);
      }
    });
  }

  isTouchDevice () {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  //
  // Asset and Styling APIs
  //
  addAsset(key, path) {
    // game.addAsset needs to work immediately, potentially before game.start()
    // the preloader won't be available until the `Client` system is loaded
    if (this.preloader) {
      this.preloader.addAsset(path, 'spritesheet', key);
    } else {
      this.queuedAssets[key] = path;
    }
  }

  setBackground(color) {
    // not implemented directly, Graphics plugin will handle this
  }

  createBorder({ width, height, thickness = 8, color }) {
    let game = this;
    if (game.systems.border) {
      game.systems.border.createBorder({
        width: game.width,
        height: game.height,
        thickness: thickness
      });
    } else {
      game.use('Border', {}, function () {
        game.systems.border.createBorder({
          width: game.width,
          height: game.height,
          thickness: thickness
        });
      });
    }
  }

  //
  // Time APIs / ChronoControl
  //
  stop() {
    let client = this.getSystem('client');
    client.stop();
  }

  pause() {
    if (this.systems['chrono-control']) {
      this.systems['chrono-control'].pause();
    }
  }

  rewind(ticks) {
    if (this.systems['chrono-control']) {
      this.systems['chrono-control'].rewind(ticks);
    }
  }

  reset(mode, clearSutra = true) {

    // reset all Sutra rules
    if (clearSutra) {
      this.rules = this.createSutra();
    }

    // remap the keyboard mappings to Sutra by default
    if (this.systems.sutra) {
      this.systems.sutra.bindInputsToSutraConditions();
    }

    // reset the Field of View use to default ( off )
    this.config.useFoV = false;

    // reset the default player controls
    this.setControls({});

    // set the default movement sutra
    if (this.systems.sutra) {
      this.systems.sutra.bindDefaultMovementSutra(mode);
    }

    // reset any deffered entities
    this.deferredEntities = {};
  }

  //
  // Sutra Behavior Tree APIs
  //
  useSutra(subSutra, name) {
    if (this.rules) {
      this.rules.use(subSutra, name);
      if (this.systems['gui-sutra']) {
        this.systems['gui-sutra'].setRules(this.rules);
      }
    } else {
      console.log('Warning: no rules engine found, cannot use sutra', subSutra, name);
    }
  }

  setActions(actions) {
    let game = this;
    let actionNames = Object.keys(actions);
    actionNames.forEach(function (actionName) {
      let action = actions[actionName];
      game.rules.on(actionName, action);
    });
  }


  //
  // Networking APIs
  //
  connect(url) {
    let game = this;
    // Wait for all systems to be ready before starting the game loop
    if (game.loadingPluginsCount > 0) {
      setTimeout(function () {
        game.connect(url);
      }, 4);
      return
    } else {
      console.log('All Plugins are ready! Starting Mantra Game Client...');
      let client = this.getSystem('client');
      client.connect(url);
    }
  }

  disconnect() {
    let client = this.getSystem('client');
    client.disconnect();
  }

}

export { Game };
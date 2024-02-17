// MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023
import Component from './Component/Component.js';
import construct from './lib/Game/construct.js';
import use from './lib/Game/use.js';
import unload from './lib/Game/unload.js';
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
      plugins: [], // array of plugins as string, instance, or string with config object
      // game options
      showLoadingScreen: true,
      minLoadTime: 330, // minimum time to show loading screen
      loadDefaultPlugins: true, // auto-loads default plugins based on pluginsConfig
      width: 800,
      height: 600,
      fieldOfView: 1600,
      fps: 60,
      useFoV: false,
      // game systems / auto-load based on pluginsConfig
      physics: 'matter',
      graphics: ['css'],
      collisions: true,
      camera: {},
      gravity: {},
      keyboard: true,
      mouse: true,
      gamepad: false,
      virtualGamepad: false,
      editor: true,
      sutra: true,
      lifetime: false,
      defaultMovement: false,
      // data compression
      protobuf: false,
      msgpack: false,
      deltaCompression: false,
      deltaEncoding: true,
      // createDefaultPlayer: false,
      defaultPlayer: false,
      gameRoot: 'https://yantra.gg/mantra',
      scriptRoot: null, // scripts, plugins, .js files, will inherit from gameRoot if not set
      assetRoot: null,  // images, models, sounds, sprites, will inherit from gameRoot if not set
      options: {},
      mode: 'topdown', // default entity input and movement mode defined as Sutras
      multiplexGraphicsHorizontally: false, // default behavior is multiple graphics plugins will be horizontally stacked
      addLifecycleHooksToAllPlugins: true, // default behavior is to add lifecycle hooks to all plugin methods
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
    this.unload = unload(this, config.plugins);

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

    if (data == null) {
      return;
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

  // TODO: doesn't need to be player, can be ent
  // rename: getEntityFieldOfView
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
  // Containers
  //
  createContainer(entityData) { // helper method for containers
    entityData.type = 'CONTAINER'
    entityData.style = entityData.style || {};
    entityData.style.layout = entityData.layout || 'none';
    entityData.style.grid = entityData.grid || {};
    entityData.items = entityData.items || [];
    return this.createEntity(entityData);
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

  applyGravity(entA, entB, gravity) {
    this.systems.physics.applyGravity(entA, entB, gravity);
  }

  setPosition(entityId, position) {
    this.physics.setPosition(entityId, position);
  }

  applyForce(entityId, force) {
    // const body = this.bodyMap[entityId];
    this.physics.applyForce(entityId, force);
    // this.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
  }

  applyPosition(entityId, position) {
    // const body = this.bodyMap[entityId];
    // takes the current position and adds the new position
    let newPosition = {
      x: body.position.x + position.x,
      y: body.position.y + position.y
    };
    this.physics.setPosition(entityId, newPosition);
  }

  rotate(entityId, rotation) {
    const rotationSpeed = 0.022; // TODO: config
    let rotationAmount = rotation * rotationSpeed;
    // const body = this.bodyMap[entityId];
    this.physics.rotateBody(entityId, rotationAmount);
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
  
  setCameraMode(mode) {
    this.data.camera.mode = mode;
  }

  setCameraPosition(x, y) {
    // Remark: We can we not just set the camera position directly?
    // game.data.camera.position.x = x;
    // game.data.camera.position.y = y;
    game.data.camera.offsetX = x;
    game.data.camera.offsetY = y;
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

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  //
  // Asset and Styling APIs
  //
  addAsset(url, type, key, options) {
    // game::ready event / game.start(cb) will wait for all assets to be loaded
    if (this.preloader) {
      this.preloader.addAsset(url, type, key, options);
    } else {
      this.queuedAssets[key] = path;
    }
  }

  addAssets(assets) {
    for (let a in assets) {
      let asset = assets[a];
      this.addAsset(asset.url, asset.type, a, asset);
    }
  }

  setBackground(color) {
    // not implemented directly, Graphics plugin will handle this
  }

  randomColor(format = 'int') {

    let color;

    // first generate color as int
    color = Math.floor(Math.random() * 16777215);

    if (format === 'int') {
      return color;
    }

    // if not int, probably hex
    color = '#' + color.toString(16);
    return color;

  }

  randomForce(maxSpeed = 1) {
    // Generate a random angle in radians
    const angle = Math.random() * 2 * Math.PI; // TODO: use game.seed, game.random instead of Math.random
    // Generate a random speed up to maxSpeed
    const speed = Math.random() * maxSpeed;
    // Convert polar coordinates (angle, speed) to cartesian coordinates (x, y)
    const force = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
    return force;
  }

  randomPositionSquare(centerX, centerY, distance) {
    let x = centerX + Math.random() * 2 * distance - distance; // Random x within distance from centerX
    let y = centerY + Math.random() * 2 * distance - distance; // Random y within distance from centerY
    return { x, y };
  }

  randomPositionRadial(centerX, centerY, distance, count) {
    let angle = Math.random() * 2 * Math.PI; // Random angle
    let radius = Math.random() * distance; // Random radius within distance
    let x = centerX + radius * Math.cos(angle); // Convert polar to Cartesian coordinates
    let y = centerY + radius * Math.sin(angle);
    return { x, y };
  }

  //
  // Text
  //
  createText(entityData) {
    entityData.type = 'TEXT';
    entityData.body = false;
    return this.createEntity(entityData);
  }

  createBorder({ width = this.width, height = this.height, thickness = 8, color } = {}) {
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

    // clear any events that were bound to the game from World
    for (let listener in game.listeners) {
      // Remove any event that doesn't contain '::'
      // TODO: we may want to make this more specific, bound to scenes or systems
      if (listener.indexOf('::') === -1) {
        // game.off(listener, game.listeners[listener]);
        delete game.listeners[listener];
      }
    }

    // reset the Field of View use to default ( off )
    this.config.useFoV = false;

    // reset the default player controls
    this.setControls({});

    this.setCameraMode('follow');

    // set the default movement sutra
    if (this.systems.sutra) {
      this.systems.sutra.bindDefaultMovementSutra(mode);
    }

    // reset any deffered entities
    this.deferredEntities = {};

    // reset the camera offsets ( in case user has dragged or scrolled camera )
    game.viewportCenterOffsetX = 0; // TODO: scope these onto game.data.camera.viewPortOffset
    game.viewportCenterOffsetY = 0;

    // defaults camera back to 1x zoom
    game.zoom(1);

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

  async awaitAllPlugins () {
    await Promise.all(Object.values(game.loadingPluginPromises));
  }

}

export { Game };
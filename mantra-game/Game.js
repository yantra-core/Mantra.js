// MANTRA - Yantra Works 2023
// Game.js - Marak Squires 2023
import Component from './Component/Component.js';
import construct from './lib/Game/construct.js';
import use from './lib/Game/use.js';
import start from './lib/Game/start.js';

// Provides a default Game.start(fn) logic ( creates a single player and border )
// Bind to event `player::joined` to override default player creation logic
// import defaultGameStart from './lib/start/defaultGameStart.js';

// default player movement, this could be also be set in defaultGameStart.js
// import movement from './lib/defaultPlayerMovement.js';

// The Game class is the main entry point for Mantra games
class Game {
  constructor({
    // game modes
    isClient = true,
    isEdgeClient = false,
    isServer = false,
    isOfflineMode,
    plugins = {}, // Plugin Classes that will be bound to the game instance
    // game options
    showLoadingScreen = true,
    minLoadTime = 330, // minimum time to show loading screen
    loadDefaultPlugins = true, // auto-laods default plugins based on pluginsConfig
    width = 800,
    height = 600,
    // game systems / auto-load based on pluginsConfig
    physics = 'matter',
    graphics = ['css'],
    collisions = true,
    camera = {},
    gravity = {},
    keyboard = true,
    mouse = true,
    gamepad = true,
    editor = true,
    sutra = true,
    lifetime = true,
    defaultMovement = true,
    // data compression
    protobuf = false,
    msgpack = false,
    deltaCompression = false,
    deltaEncoding = true,
    defaultPlayer = true,
    options = {} } = {}) {
    if (isServer) {
      // override default
      showLoadingScreen = false;
      isClient = false;
    }
    // config scope for convenience
    const config = {
      isClient,
      isEdgeClient,
      isServer,
      showLoadingScreen,
      minLoadTime,
      loadDefaultPlugins,
      width,
      height,
      gravity,
      physics,
      graphics,
      collisions,
      camera,
      keyboard,
      mouse,
      gamepad,
      editor,
      lifetime,
      defaultMovement,
      isOfflineMode,
      protobuf,
      msgpack,
      deltaCompression,
      deltaEncoding,
      defaultPlayer,
      options,
      multiplexGraphicsHorizontally: true // default behavior is multiple graphics plugins will be horizontally stacked
    };

    this.config = config;


    this.use = use(this, plugins);
    this.start = start.bind(this);
    
    // Adds internal properties to the game instance
    construct(this, plugins);

  }

  // TODO: hoist to systemsManager
  update(deltaTime) {
    // Call update method of SystemsManager, which delegate to all Systems which have an update method
    this.systemsManager.update(deltaTime);
  }

  render() {
    // Call render method of SystemsManager, which will delegate to all Graphics systems
    // TODO: should we remove this and hoist it to the systemsManager?
    this.systemsManager.render();
  }

  // TODO: move to client, let client hoist the connection logic to game
  stop() {
    let client = this.getSystem('client');
    client.stop();
  }

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

  // All Systems are Plugins, but not all Plugins are Systems
  // TODO: move to separate file


  // Helper function to load plugin scripts
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

  // TODO: move to componentManager
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

  // TODO: move to playerManager
  // allows for custom player creation logic, or default player creation logic
  createPlayer(playerConfig) {
    return new Promise((resolve, reject) => {
      // console.log(this.listenerCount('player::joined'))
      if (this.listenerCount('player::joined') === 0) {
        let result = this.createDefaultPlayer(playerConfig);
        resolve(result);
      } else {
        // Attach a one-time listener for handling the response
        this.once('player::created', (entity) => {
          resolve(entity);
        });
        // Emit the player::joined event
        this.emit('player::joined', playerConfig);
      }
    });
  }

  playNote(note, duration) {
    console.log('Tone Plugin not loaded. Cannot play tone note.');
  }

  setGravity(x = 0, y = 0, z = 0) {
    if (this.physics) {
      this.physics.setGravity(x, y, z);
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

  setActions(actions) {
    let game = this;
    let actionNames = Object.keys(actions);
    actionNames.forEach(function (actionName) {
      let action = actions[actionName];
      game.rules.on(actionName, action);
    });
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
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
        graphicsInterface.cameraShake(intensity, duration);
      }
    });
  }

  setPlayerId(playerId) {
    // console.log('setting playerID', playerId)
    this.currentPlayerId = playerId;
  }

  getCurrentPlayer() {
    return this.getEntity(this.currentPlayerId);
  }

  // TODO: should physics plugin mount these instead of direct map to game?
  applyForce(entityId, force) {
    const body = this.bodyMap[entityId];
    this.physics.applyForce(body, body.position, force);
    this.components.velocity[entityId] = { x: body.velocity.x, y: body.velocity.y };
  }

  setPosition(entityId, position) {
    const body = this.bodyMap[entityId];
    this.physics.setPosition(body, position);
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

  rotateCamera(angle) {
    // not implemented directly, Graphics plugin will handle this
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

  reset() {
    // not a full game reset ( yet )
    // reset default entity input
    //let movementRules = movement(this);
    //this.rules.use(movementRules, 'movement');

    // reset all Sutra rules
    this.rules = this.createSutra();

    // remap the keyboard mappings to Sutra by default
    if (this.systems.sutra) {
      this.systems.sutra.bindInputsToSutraConditions();
    }

    // reset the default player controls
    this.setControls({});

  }

  setZoom() {
    // noop
  }

  addAsset(key, path) {
    // game.addAsset needs to work immediately, potentially before game.start()
    // the preloader won't be available until the `Client` system is loaded
    if (this.preloader) {
      this.preloader.addAsset(path, 'spritesheet', key);
    } else {
      this.queuedAssets[key] = path;
    }
  }

}

export { Game };
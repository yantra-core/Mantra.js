export default function use(game) {
  return async function use(pluginInstanceOrId, options = {}, cb) {

    if (typeof cb === 'undefined') {
      cb = function noop() { };
    }

    // TODO: make game configurable
    let basePath = '/plugins/'; // Base path for loading plugins
    basePath = game.scriptRoot + basePath;
    //console.log("FOUND SCRIPT ROOT", game.scriptRoot)
    //console.log("LOADING FROM BASEPATH", basePath)
    // Check if the argument is a string (plugin ID)
    if (typeof pluginInstanceOrId === 'string') {
      const pluginId = pluginInstanceOrId;
      // Check if the plugin is already loaded or loading
      if (game._plugins[pluginId]) {
        // maybe add world here?
        console.log(`Plugin ${pluginId} is already loaded or loading.`);
        return game;
      }

      if (game.isServer) {
        // console.log('pluginId', pluginId, game.plugins)
        if (game.plugins[pluginId]) {
          // console.log('loading plugin', pluginId, game.plugins[pluginId])
          return game.use(new game.plugins[pluginId](options));
        }

        console.log(`Attempted to load plugin by string name "${pluginId}"on server, could not find! skipping`);
        return;
      }

      // Mark the plugin as loading
      game._plugins[pluginId] = { status: 'loading' };
      game.loadingPluginsCount++;
      game.emit('plugin::loading', pluginId);

      // Dynamically load the plugin script
      const scriptUrl = `${basePath}${pluginId}.js`;
      game.loadPluginScript(scriptUrl).then(async function () {
        // The script is expected to call `game.use(pluginInstance)` after loading
        console.log(`Loaded: ${pluginId}`);

        if (typeof PLUGINS === 'object') {
          //console.log('creating new instance', pluginId, PLUGINS[pluginId], PLUGINS)
          let pluginInstance = new PLUGINS[pluginId].default(options);

          if (pluginInstance.preload) {
            // alert('pluginInstance.preload')
            // console.log("pluginInstance.preload", pluginInstance.preload)
            // await pluginInstance.preload(game);
            // we could preload here as well, i don't think we need to since it will happen below
          }

          game.use(pluginInstance);
          // check to see if pluginInstance is async, if so
          // we'll assume it will emit a ready event when it's ready
          if (pluginInstance.async) { // TODO: remove this and have better async init semantics
            // plugin must perform async operation before it's ready
            // plugin author *must* emit their own ready event game will not start
          } else {
            game.loadingPluginsCount--;
            delete game._plugins[pluginId];
            game.emit('plugin::ready::' + pluginId, pluginInstance);
            cb();
          }
        } else {
          // decrement loadingPluginsCount even if it fails
          // game means applications will attempt to load even if plugins fail
          console.log('Warning: PLUGINS object not found, cannot load plugin', pluginId);
          delete game._plugins[pluginId];
          game.loadingPluginsCount--;
          cb(new Error('PLUGINS object not found, cannot load plugin'));
        }
      }).catch(function (err) {
        console.error(`Error loading plugin ${pluginId}:`, err);
        game._plugins[pluginId] = { status: 'error' };
        throw err;
      });

      return game;
    }

    // Handling plugin instances
    if (typeof pluginInstanceOrId.id === 'undefined') {
      console.log('Error with pluginInstance', pluginInstanceOrId);
      throw new Error('All plugins must have a static id property');
    }


    if (typeof pluginInstanceOrId.build === 'function') {
      extendEntityBuilder(game, pluginInstanceOrId);
    }

    pluginGameSceneMethods(game, pluginInstanceOrId);

    const pluginId = pluginInstanceOrId.id;
    game.loadedPlugins.push(pluginId);

    //
    // If the Plugin has a .preload() method, call it
    //
    if (pluginInstanceOrId.preload) {
      await pluginInstanceOrId.preload(game);
    }

    pluginInstanceOrId.init(game, game.engine, game.scene);
    game._plugins[pluginId] = pluginInstanceOrId;

    // can we only check static property here? no need to check instance.type?
    if (pluginInstanceOrId.type === 'world' || pluginInstanceOrId.constructor.type === 'world') {
      game.worlds.push(pluginInstanceOrId);
      // register all worlds as systems ( for now )
      // we could make this a config flag of the scene ( for performance )
      game.systemsManager.addSystem(pluginId, pluginInstanceOrId);
    }

    game.emit(`plugin::loaded::${pluginId}`, pluginInstanceOrId);
    game.emit('plugin::loaded', pluginId);

    // Remark: Duplicate conditional, remove and cleanup
    if (typeof pluginInstanceOrId.type !== 'undefined' && pluginInstanceOrId.type === 'world') {
      game.emit(`world::loaded::${pluginInstanceOrId.id}`, pluginInstanceOrId);
      game.emit('world::loaded', pluginInstanceOrId);
    }

    game.data.plugins = game.data.plugins || {};
    game.data.plugins[pluginId] = options;

    if (pluginInstanceOrId.constructor.type === 'scene') {
      // Remark: why was mutating game.scenes not working as expected?
      // game.scenes[pluginId] = pluginInstanceOrId;
      // data scopes seems OK here
      game.data.scenes = game.data.scenes || {};
      game.data.scenes[pluginId] = pluginInstanceOrId;

      // register all scenes as systems ( for now )
      // we could make this a config flag of the scene ( for performance )
      game.systemsManager.addSystem(pluginId, pluginInstanceOrId);
    }

    return game;

  }
}

//
// Extends plugins with scoped scene methods
//
function pluginGameSceneMethods (game, pluginInstance) {

  // attach scene methods to plugin, game methods wrapped to scope entity to plugin scene
  pluginInstance.createEntity = function (data) {
    data.scene = pluginInstance.id;
    return game.createEntity(data);
  }

  pluginInstance.removeEntity = function (ent) {
    return game.removeEntity(ent);
  }

  pluginInstance.createText = function (data) {
    data.scene = pluginInstance.id;
    return game.createText(data);
  }
}

function extendEntityBuilder(game, pluginInstance) {
  let pluginId = pluginInstance.id;

  // Add a new method to the EntityBuilder class prototype
  game.EntityBuilder.prototype[pluginId] = function(...args) {

    // call the build method with it's own plugin scope + any potential entityData config objects
    const componentValue = pluginInstance.build.call(pluginInstance, ...args);

    if (typeof componentValue === 'object') {
      // assume nested object and iterate
      // TODO: array
      for (let key in componentValue) {
        this.config[key] = componentValue[key];
      }
    }

    if (typeof componentValue === 'number' || typeof componentValue === 'string') {
      // Update the config with the new component
      this.config[pluginId] = componentValue;
    }

    // TODO: function / undefined

    // Return 'this' to maintain the fluent interface
    return this;
  };
}
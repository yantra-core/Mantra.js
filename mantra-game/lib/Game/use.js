export default function use(game) {
  return async function use(pluginInstanceOrId, options = {}, cb = () => {}) {
    let basePath = '/plugins/'; // Base path for loading plugins
    basePath = game.scriptRoot + basePath;

    if (typeof pluginInstanceOrId === 'string') {
      const pluginId = pluginInstanceOrId;
      if (game._plugins[pluginId]) {
        console.log(`Plugin ${pluginId} is already loaded or loading.`);
        return game;
      }

      if (game.isServer) {
        if (game.plugins[pluginId]) {
          return game.use(new game.plugins[pluginId](options));
        }
        console.log(`Attempted to load plugin by string name "${pluginId}" on server, could not find! Skipping`);
        return;
      }

      game._plugins[pluginId] = { status: 'loading' };
      game.loadingPluginsCount++;
      game.emit('plugin::loading', pluginId);

      // Store the loading promise
      game.loadingPluginPromises[pluginId] = (async () => {
        try {

          

          // Load unminified version of the plugin
          let scriptUrl = `${basePath}${pluginId}.js`;

          if (game.config.useMinBuilds) {
            //scriptUrl = `${basePath}${pluginId}.min.js`;
          }

          await game.loadPluginScript(scriptUrl);
          console.log(`Loaded: ${pluginId}`);
          if (typeof PLUGINS === 'object' && PLUGINS[pluginId]) {
            let pluginInstance = new PLUGINS[pluginId].default(options);
            await handlePluginInstance(game, pluginInstance, pluginId, options, cb);
          } else {
            console.log('Warning: PLUGINS object not found, cannot load plugin', pluginId);
            throw new Error('PLUGINS object not found, cannot load plugin');
          }

        } catch (err) {
          console.error(`Error loading plugin ${pluginId}:`, err);
          game._plugins[pluginId] = { status: 'error' };
          game.loadingPluginsCount--;
          cb(err);
          throw err; // Rethrow or handle as needed
        } finally {
          // Remove the promise from the tracking object once it's settled
          delete game.loadingPluginPromises[pluginId];
        }
      })();

    } else {
      game.loadingPluginsCount++;
      if (!pluginInstanceOrId.id) {
        console.log('Error with pluginInstance', pluginInstanceOrId);
        throw new Error('All plugins must have a static id property');
      }
      await handlePluginInstance(game, pluginInstanceOrId, pluginInstanceOrId.id, options, cb);
    }

    return game;
  }
}

async function handlePluginInstance(game, pluginInstance, pluginId, options, cb) {

  if (typeof pluginInstance.build === 'function') {
    extendEntityBuilder(game, pluginInstance);
  }

  pluginGameSceneMethods(game, pluginInstance);

  game.loadedPlugins.push(pluginId);

  if (pluginInstance.preload) {
    await pluginInstance.preload(game);
    // await all game.use(pluginName) in parallel
    await game.awaitAllPlugins();
    // Remark: we could also await assets here

  }

  pluginInstance.init(game, game.engine, game.scene);
  game._plugins[pluginId] = pluginInstance;
  delete game._plugins[pluginId];

  game.emit(`plugin::loaded::${pluginId}`, pluginInstance);
  game.emit('plugin::loaded', pluginId);
  cb();

  if (pluginInstance.type === 'world' || pluginInstance.constructor.type === 'world') {
    game.worlds.push(pluginInstance);
    game.systemsManager.addSystem(pluginId, pluginInstance);
    game.emit(`world::loaded::${pluginInstance.id}`, pluginInstance);
    game.emit('world::loaded', pluginInstance);
    console.log('Loaded World:', pluginInstance.id);
  }

  if (pluginInstance.constructor.type === 'scene') {
    game.data.scenes = game.data.scenes || {};
    game.data.scenes[pluginId] = pluginInstance;
    game.systemsManager.addSystem(pluginId, pluginInstance);
    console.log('Loaded Scene:', pluginInstance.id);
  }

  game.data.plugins = game.data.plugins || {};
  game.data.plugins[pluginId] = options;
  game.loadingPluginsCount--;

}

function pluginGameSceneMethods(game, pluginInstance) {
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
  let pluginName = pluginInstance.constructor.name;
  game.EntityBuilder.prototype[pluginName] = function (...args) {
    // Create a copy of the arguments and add the _previous property
    // This is used to pass along the current/previous state of the builder config
    // Some plugins use this as optionally depending on previous plugin builder state
    // Like TileSet.meta.tileSet->TileMap.meta.tileSet
    // Remark: We tried to merge the builder config scope with plugin instance scope;
    //         however it wasn't quite working and was adding complexity
    let enhancedArgs = args.map(arg => ({ ...arg, _previous: { ...this.config } }));
    
    // Call the plugin's build function with the enhanced arguments
    const componentValue = pluginInstance.build.apply(pluginInstance, enhancedArgs);

    if (typeof componentValue === 'object') {
      for (let key in componentValue) {
        const value = componentValue[key];
        if (typeof value === 'function') {
          // Check if the composite function already exists, if not, initialize it
          if (typeof this.config[key] !== 'function') {
            this.config[key] = (...handlerArgs) => {
              this.config[key].handlers.forEach(handler => {
                // Call each handler with the original arguments enhanced with _previous
                handler(...handlerArgs.map(arg => ({ ...arg, _previous: { ...this.config } })));
              });
            };
            // Initialize with an empty handlers array
            this.config[key].handlers = [];
          }
          // Add the new handler to the composite function's handlers array
          this.config[key].handlers.push(value);
        } else {
          // Directly set non-function properties
          this.config[key] = value;
        }
      }
    } else if (typeof componentValue === 'number' || typeof componentValue === 'string') {
      this.config[pluginName] = componentValue;
    }
    return this; // Allow chaining by returning the EntityBuilder instance
  };
}
export default function use(game) {
  return function use(pluginInstanceOrId, options = {}, cb) {

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
      game.loadPluginScript(scriptUrl).then(function () {
        // The script is expected to call `game.use(pluginInstance)` after loading
        console.log(`Loaded: ${pluginId}`);
        if (typeof PLUGINS === 'object') {
          //console.log('creating new instance', pluginId, PLUGINS[pluginId], PLUGINS)
          let pluginInstance = new PLUGINS[pluginId].default(options);
          game.use(pluginInstance);
          // check to see if pluginInstance is async, if so
          // we'll assume it will emit a ready event when it's ready
          if (pluginInstance.async) {
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

    const pluginId = pluginInstanceOrId.id;
    game.loadedPlugins.push(pluginId);

    pluginInstanceOrId.init(game, game.engine, game.scene);
    game._plugins[pluginId] = pluginInstanceOrId;

    if (pluginInstanceOrId.type === 'world') {
      game.worlds.push(pluginInstanceOrId);
    }
    game.emit(`plugin::loaded::${pluginId}`, pluginInstanceOrId);
    game.emit('plugin::loaded', pluginId);

    if (typeof pluginInstanceOrId.type !== 'undefined' && pluginInstanceOrId.type === 'world') {
      game.emit(`world::loaded::${pluginInstanceOrId.id}`, pluginInstanceOrId);
      game.emit('world::loaded', pluginInstanceOrId);
    }

    game.data.plugins = game.data.plugins || {};

    game.data.plugins[pluginId] = options;

    return game;

  }
}
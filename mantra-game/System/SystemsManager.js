// TODO: add events
import eventEmitter from '../lib/eventEmitter.js';

class SystemsManager {
  constructor(game) {
    this.game = game;
    this.systems = new Map();
  }

  addSystem(systemId, system) {
    if (this.systems.has(systemId)) {
      // throw new Error(`System with name ${systemId} already exists!`);
      console.log(`Warning: System with name ${systemId} already exists!`);
      return;
    }

    // Remark: Defaulting all Plugins to event emitters is disabled for now by default
    // This is disabled for performance reasons, some of these methods are high frequency
    // and there is wildcard search logic enabled by default? It's a bit much on performance for all enabled
    // In the future we can add a config option per Plugin and per Plugin method to enable/disable this
    // This will enable all plugin methods as emitted events

    // eventEmitter.bindClass(system, systemId)

    // register the system methods as Lifecycle hooks
    // we will want a beforePluginNameMethodName and afterPluginNameMethodName
    // be sure to iterate through all methods, ignore init? maybe no

    // binds system to local instance Map
    this.systems.set(systemId, system);
    // binds system to game.systems scope for convenience
    this.game.systems[systemId] = system;
    //console.log(`system[${systemId}] = new ${system.name}()`);
    //console.log(`game.use(new ${system.name}())`);
  }

  removeSystem(systemId) {
    if (!this.systems.has(systemId)) {
      //throw new Error(`System with name ${systemId} does not exist!`);
      console.log(`Warning: System with name ${systemId} does not exist!`)
      return;
    }
    // call the system.unload method if it exists
    const system = this.systems.get(systemId);
    if (typeof system.unload === "function") {
      system.unload();
    }
    this.systems.delete(systemId);


    // Remark: Special scope used for plugins, we can probably remove this or rename it
    if (this.game._plugins[systemId]) {
      delete this.game._plugins[systemId];
    }

    // we may want to remove the extra game.systems scope? or reference directly to the map?
    delete this.game.systems[systemId];
  }

  getSystem(systemId) {
    if (this.systems.has(systemId)) {
      return this.systems.get(systemId);
    }
    throw new Error(`System with name ${systemId} does not exist! Perhaps try running "game.use(new plugins.${systemId}())" first?`);
  }

  update(deltaTime) {
    for (const [_, system] of this.systems) {
      if (typeof system.update === "function") {

        // check to see if the game is paused, if not, skip updates for systems without flag
        if (this.game.paused) {
          continue;
        }


        system.update(deltaTime);
      }
    }
  }

  render() {
    /*
    const renderSystem = this.systems.get('render');
    if (renderSystem && typeof renderSystem.render === "function") {
      renderSystem.render();
    }
    */
  }

  /*
  // something like this
  before(eventPattern, callback) {

    // game.systemManager.before('entityMovement.update', (entityId, x, y) => {})
    game.systemManager.after('game.getPlayerSnapshot', (snapshot, next) => {
      // perform compression logic here
      next(snapshot); // is error not first arg? probably not?
    })

    // eventEmitter.before(eventPattern, callback)
  }
  */

}

export default SystemsManager;

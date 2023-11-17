// TODO: add events
import eventEmitter from '../lib/eventEmitter.js';

class SystemsManager {
  constructor(game) {
    this.game = game;
    this.systems = new Map();
  }

  addSystem(systemId, system) {
    if (this.systems.has(systemId)) {
      throw new Error(`System with name ${systemId} already exists!`);
    }
    // console.log('adding system', systemId, system, this.game.plugins);
    // Remark: Defaulting all plugins as EE has been disabled for now
    // Remark: We need to piece meal this / granularize it so that the wildcard regex
    // registers the new system in event emitter
    // the best option we can do is have the event binding be default off
    // then setup defaults for the required default systems ( possibly listening event / etc )
    // eventEmitter.bindClass(system, systemName)

    // binds system to local instance Map
    this.systems.set(systemId, system);
    // binds system to game.systems scope for convenience
    this.game.systems[systemId] = system;
    //console.log(`system[${systemId}] = new ${system.name}()`);
    //console.log(`game.use(new ${system.name}())`);
  }

  removeSystem(systemId) {
    if (!this.systems.has(systemId)) {
      throw new Error(`System with name ${systemId} does not exist!`);
    }
    // call the system.unload method if it exists
    const system = this.systems.get(systemId);
    if (typeof system.unload === "function") {
      system.unload();
    }
    this.systems.delete(systemId);
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
        system.update(deltaTime);
      }
    }
  }

  render() {
    const renderSystem = this.systems.get('render');
    if (renderSystem && typeof renderSystem.render === "function") {
      renderSystem.render();
    }
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

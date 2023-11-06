// TODO: add events
import eventEmitter from '../lib/eventEmitter.js';

class SystemsManager {
  constructor(game) {
    this.game = game;
    this.systems = new Map();
  }

  addSystem(systemName, system) {
    if (this.systems.has(systemName)) {
      throw new Error(`System with name ${systemName} already exists!`);
    }
    // TODO: add this later
    // registers the new system in event emitter
    eventEmitter.bindClass(system, systemName)
    // binds system to local instance Map
    this.systems.set(systemName, system);
    // binds system to game.systems scope for convenience
    this.game.systems[systemName] = system;
    console.log(`system.${systemName} = new ${system.name}()`);
    //console.log(`game.use(new ${system.name}())`);
  }

  removeSystem(systemName) {
    if (!this.systems.has(systemName)) {
      throw new Error(`System with name ${systemName} does not exist!`);
    }
    this.systems.delete(systemName);
  }

  getSystem(systemName) {
    if (this.systems.has(systemName)) {
      return this.systems.get(systemName);
    }
    throw new Error(`System with name ${systemName} does not exist! Perhaps try running "game.use(new plugins.${systemName}())" first?`);
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

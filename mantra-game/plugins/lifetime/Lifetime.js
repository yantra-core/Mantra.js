import Plugin from '../../Plugin.js';

// handles input controller events and relays them to the game logic
class Lifetime extends Plugin {
  constructor() {
    super();
    this.name = 'lifetime';

  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('lifetime', this);
  }

  update () {
    const now = Date.now();
    for (let entityId in this.game.components.creationTime.data) {
      let ent = this.game.getEntity(entityId);
      if (this.game.components.lifetime[entityId] !== Infinity) {
        //console.log("AAAFFFFF", this.game.components.creationTime[entityId])
        const elapsedTime = now - ent.creationTime; 
        //console.log('loleelapsedTime', now, elapsedTime, this.game.components.creationTime[entityId])
        if (elapsedTime > ent.lifetime) {
          this.game.removeEntity(entityId);
        }
      }
    }
  }

  render() { }

  destroy() { }

}

export default Lifetime;

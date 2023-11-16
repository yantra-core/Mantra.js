class Lifetime {

  static id = 'lifetime';

  constructor() {
    this.id = Lifetime.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('lifetime', this);
  }

  update () {
    const now = Date.now();
    for (let entityId in this.game.components.creationTime.data) {
      let ent = this.game.getEntity(entityId);
      if (ent && this.game.components.lifetime[entityId] !== Infinity) {
        const elapsedTime = now - ent.creationTime; 
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
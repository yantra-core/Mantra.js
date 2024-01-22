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
    // TODO: iterate through lifetime instead of creationTime
    // TODO: ensure that lifetime is only added if non Infinity
    // TODO: check performance of lifetime again after these changes
    for (let entityId in this.game.components.creationTime.data) {
      let ent = this.game.getEntity(entityId);
      if (ent && this.game.components.lifetime[entityId] > 0 && this.game.components.lifetime[entityId] !== Infinity) { // Remark: protobuf didn't like Infinity, -1 is probably better choice
        const elapsedTime = now - ent.creationTime; 
        if (elapsedTime > ent.lifetime) {
          this.game.removeEntity(Number(entityId)); // TODO: remove Number(), refactor Components to use Map
        }
      }
    }
  }

  render() { }

  destroy() { }

}

export default Lifetime;
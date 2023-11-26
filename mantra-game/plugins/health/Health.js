class Health {

  static id = 'health';

  constructor() {
    this.id = Health.id;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('health', this);
  }

  update () {
    const now = Date.now();
    for (let entityId in this.game.components.health.data) {
      let value = this.game.components.health.data[entityId];
      // check if health is below 0, if so remove entity
      //console.log('checking ent', entityId, value)
      if (typeof value === 'number' && value <= 0) {
        this.game.removeEntity(Number(entityId)); // TODO: remove Number(), refactor Components to use Map
      }
    }
  }

  render() { }

  destroy() { }

}

export default Health;
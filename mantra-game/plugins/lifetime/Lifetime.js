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
    for (let entityId in this.game.components.lifetime.data) {
      let entLifetime = this.game.components.lifetime.get(entityId);
      if (entLifetime > 0) {
        let creationTime = this.game.components.creationTime.get(entityId);
        const elapsedTime = now - creationTime; 
        if (elapsedTime > entLifetime) {
          this.game.removeEntity(Number(entityId)); // TODO: remove Number(), refactor Components to use Map
        }
      }
    }
  }

  render() { }

  destroy() { }

}

export default Lifetime;
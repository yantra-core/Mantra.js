//import Prando from 'prando';

class Platform {
  static id = 'platform';

  constructor({ width = 40, height = 40, depth = 10 } = {}) {
    this.id = Platform.id;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.kinds = ['solid', 'trampoline', 'rubber', 'jello', 'mollasas', 'ice', 'linoleum', 'flypaper', 'sandpaper'];
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  build(platformData = {}) {
    // Define default values
    const defaults = {
      type: 'PLATFORM',
      hasInventory: false,
      isStatic: true
    };

    // Merge defaults with entityData, ensuring nested objects like position and velocity are merged correctly
    const mergedConfig = {
      ...defaults,
      ...platformData,
      position: { ...defaults.position, ...platformData.position },
      texture: { ...defaults.texture, ...platformData.texture },
      style: { ...defaults.style, ...platformData.style }
    };

    // Return the merged configuration
    return mergedConfig;
  }

  update() {
  }

  render() {
  }

  destroy() {
  }

  generatePlatforms(worker, count) {
  }

  createPlatform(entityData) {

  }

  handleCollision(pair, bodyA, bodyB) {

    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);

      if (!entityA || !entityB) {
        console.log('Platform.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }

      if (entityA.type === 'PLATFORM' && entityB.type === 'PLAYER') {
        this.platformPlayerCollision(entityIdA, entityIdB, entityA, entityB);
      }

      if (entityA.type === 'PLAYER' && entityB.type === 'PLATFORM') {
        this.platformPlayerCollision(entityIdB, entityIdA, entityB, entityA);
      }
    }
  }

  platformPlayerCollision(entityIdA, entityIdB, entityA, entityB) {
    // console.log('platformPlayerCollision', entityIdA, entityIdB, entityA, entityB);
  }

}

export default Platform;

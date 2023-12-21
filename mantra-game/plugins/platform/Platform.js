// import Matter from 'matter-js';
//import Prando from 'prando';
//import { nanoid } from 'nanoid';

class Platform {
  static id = 'platform';

  constructor({ width = 40, height = 40, depth = 10 } = {}) {
    this.id = Platform.id;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.kinds = ['solid', 'trampoline', 'rubber', 'jello', 'mollasas', 'ice', 'linoleum', 'flypaper', 'sandpaper'];
    // this.rng = new Prando('ayyo.gg');
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
  }

  update() {
    // Update logic if any
  }

  render() {
    // Render logic if any
  }

  destroy() {
    // Cleanup logic if any
  }

  generatePlatforms(worker, count) {
    // Your existing platform.generate function logic
    // Update this method to use class properties and methods as needed
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

  platformPlayerCollision (entityIdA, entityIdB, entityA, entityB) {
    console.log('platformPlayerCollision', entityIdA, entityIdB, entityA, entityB);
  }

}

export default Platform;

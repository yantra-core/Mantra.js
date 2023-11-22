// Block.js - Marak Squires 2023
class Block {
  static id = 'block';
  constructor({ MIN_BLOCK_SIZE = 1000, width = 40, height = 40 } = {}) {
    this.id = Block.id;
    // Assuming the config includes width and height properties
    this.width = width; // Default size if none provided
    this.height = height; // Default size if none provided
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
    this.splits = 0;
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('block', this);
  }

  update() {
  }

  handleCollision(pair, bodyA, bodyB) {

    if (bodyA.myEntityId && bodyB.myEntityId) {
      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.entities.get(entityIdA);
      const entityB = this.game.entities.get(entityIdB);

      if (!entityA || !entityB) {
        console.log('Block.handleCollision no entity found. Skipping...', entityA, entityB);
        return;
      }
      //console.log("entityA", entityA)
      //console.log("entityB", entityB)
      // do not process blocks that are already destroyed

      // console.log('aaaa', entityA.type, entityB.type)
      if (entityA.type === 'BLOCK' && entityB.type === 'BULLET') {
        this.blockBulletCollision(entityIdA, entityIdB, entityA, entityB);
      }

      if (entityA.type === 'BULLET' && entityB.type === 'BLOCK') {
        this.blockBulletCollision(entityIdB, entityIdA, entityB, entityA);
      }
    }
  }

  blockBulletCollision(entityIdA, entityIdB, entityA, entityB) {
    if (this.game.mode === 'local' || !this.game.isClient) {

      if (entityA.destroyed) {
        return;
      }

      this.game.removeEntity(entityIdB);

      if (entityA.width * entityA.height <= this.MIN_BLOCK_SIZE || entityA.splits >= Block.MAX_SPLITS) {
        this.game.removeEntity(entityIdA);
        return;
      }

      const newWidth = entityA.width / 2;
      const newHeight = entityA.height / 2;
      const newSplits = entityA.splits + 1;

      for (let i = 0; i < 4; i++) {
        const xOffset = (i % 2) * newWidth;
        const yOffset = Math.floor(i / 2) * newHeight;
        this.game.createEntity({
          type: 'BLOCK',
          position: {
            x: entityA.position.x + xOffset,
            y: entityA.position.y + yOffset
          },
          velocity: {
            x: (Math.random() * 2 - 1) * 10, // Adjusted for less extreme velocities
            y: (Math.random() * 2 - 1) * 10
          },
          width: newWidth,
          height: newHeight,
          splits: newSplits
        });
      }

      this.game.removeEntity(entityIdA);
    }
  }

}

export default Block;

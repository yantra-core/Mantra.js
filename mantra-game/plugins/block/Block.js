// Block.js - Marak Squires 2023
class Block {
  constructor({ MIN_BLOCK_SIZE = 50, width = 40, height = 40 } = {}) {
    this.name = 'Block';
    // Assuming the config includes width and height properties
    this.width = width; // Default size if none provided
    this.height = height; // Default size if none provided
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
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

    // if (!this.game.isClient && this.game.onlineMode)
    // for now, don't perform block split logic on client
  
    if (this.game.mode === 'local' || !this.game.isClient) {

      this.game.removeEntity(entityIdB);

      // Check if the block is big enough to split
      if (entityA.width <= this.MIN_BLOCK_SIZE && entityA.height <= this.MIN_BLOCK_SIZE) {
        this.game.removeEntity(entityIdA);
        return;
      }

      // Calculate the size of the smaller blocks
      const newWidth = entityA.width / 2;
      const newHeight = entityA.height / 2;

      // Create 4 smaller blocks
      for (let i = 0; i < 4; i++) {
        const xOffset = (i % 2) * newWidth;
        const yOffset = Math.floor(i / 2) * newHeight;
        this.game.createEntity({
          type: 'BLOCK',
          // Position the new blocks relative to the position of the original block
          position: {
            x: entityA.position.x + xOffset - entityA.width / 4,
            y: entityA.position.y + yOffset - entityA.height / 4
          },
          velocity: {
            // Generate random velocities in both positive and negative directions
            x: (Math.random() * 2 - 1) * 22.22,
            y: (Math.random() * 2 - 1) * 22.22
          },
          width: newWidth,
          height: newHeight
        });
      }

      // Destroy the original block
      this.game.removeEntity(entityIdA);


    }

  }

}

export default Block;

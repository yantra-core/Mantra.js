// Block.js - Marak Squires 2023
class Block {
  static id = 'block';
  constructor({ MIN_BLOCK_SIZE = 100, width = 40, height = 40 } = {}) {
    this.id = Block.id;
    // Assuming the config includes width and height properties
    this.width = width; // Default size if none provided
    this.height = height; // Default size if none provided
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
    this.splits = 0;
    this.rgbColorsInts = [
      0x0000ff,  // Blue
      // 0x00ff00,  // Green
      // 0xff0000,  // Red
      0xffff00,  // Yellow
      0x00ffff,  // Cyan (a shade of Blue-Green, not in ROYGBIV)
      0xff00ff,  // Magenta (a shade of Red-Violet, not in ROYGBIV)
      0xffa500,  // Orange
      0x4b0082,  // Indigo
      0x8a2be2   // Violet
    ];
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

      if (entityA.type === 'BLOCK' && entityB.type === 'BULLET') {
        this.blockBulletCollision(entityIdA, entityIdB, entityA, entityB);
      }

      if (entityA.type === 'BULLET' && entityB.type === 'BLOCK') {
        this.blockBulletCollision(entityIdB, entityIdA, entityB, entityA);
      }
    }
  }

  // TODO: add option to cancel collision pairs
  blockBulletCollision(entityIdA, entityIdB, entityA, entityB) {
    if (this.game.mode === 'local' || !this.game.isClient) {

      if (entityA.destroyed || entityB.destroyed) {
        return;
      }

      // console.log("Block.handleCollision", entityIdA, entityIdB, entityA, entityB)
      this.game.removeEntity(entityIdB);

      if (entityA.width * entityA.height <= this.MIN_BLOCK_SIZE || entityA.splits >= Block.MAX_SPLITS) {
        this.game.removeEntity(entityIdA);
        return;
      }

      const newWidth = entityA.width / 2;
      const newHeight = entityA.height / 2;
      const newSplits = entityA.splits + 1;

      // TODO: could we move this into a sutra rule instead?
      for (let i = 0; i < 4; i++) {
        let newColor = this.rgbColorsInts[Math.floor(Math.random() * this.rgbColorsInts.length)];
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
          // inherit color from parent
          texture: entityA.texture,
          isSensor: entityA.isSensor,
          // color: newColor,
          width: newWidth,
          height: newHeight,
          splits: newSplits,
          //friction: 0.5,
          frictionAir: 0.2,
          //frictionStatic: 0.5,
          // TODO: needs to inherit other properties from parent such as frictoin
        });
      }

      this.game.removeEntity(entityIdA);
    }
  }

}

export default Block;

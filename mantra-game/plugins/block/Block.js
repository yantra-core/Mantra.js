// Block.js - Marak Squires 2023
class Block {
  static id = 'block';
  static MAX_SPLITS = 4; // Assuming a max split limit

  constructor({ MIN_BLOCK_SIZE = 50, width = 40, height = 40 } = {}) {
    this.id = Block.id;
    this.width = width;
    this.height = height;
    this.MIN_BLOCK_SIZE = MIN_BLOCK_SIZE;
    this.splits = 0;
    this.rgbColorsInts = [
      0x0000ff,  // Blue
      0xffff00,  // Yellow
      0x00ffff,  // Cyan
      0xff00ff,  // Magenta
      0xffa500,  // Orange
      0x4b0082,  // Indigo
      0x8a2be2   // Violet
    ];
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('block', this);
  }

  build(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    return {
      type: 'BLOCK',
      mass: 50000,
      texture: entityData.texture || 'tile-block',
      size: entityData.size || { width: this.width, height: this.height },
      position: entityData.position,
      collisionStart: (a, b, pair, context) => this.splitBlock(a, b, pair, context),
      ...entityData // Spread the rest of entityData to override defaults as necessary
    };
  }

  create(entityData = {}) {
    return this.game.createEntity(this.build(entityData));
  }

  splitBlock(a, b, pair, context) {
    if (context.target.type !== 'BULLET') {
      return;
    }

    const blockEntity = this.game.data.ents._[context.owner.id];
    const bulletEntity = this.game.data.ents._[context.target.id];

    if (!blockEntity || !bulletEntity) {
      // console.log('Block.splitBlock no entity found. Skipping...', blockEntity, bulletEntity);
      return;
    }

    if (blockEntity.destroyed || bulletEntity.destroyed) {
      return;
    }

    this.game.removeEntity(bulletEntity.id);

    if (blockEntity.width * blockEntity.height <= this.MIN_BLOCK_SIZE || blockEntity.splits >= Block.MAX_SPLITS) {
      this.game.removeEntity(blockEntity.id);
      return;
    }

    const newWidth = blockEntity.width / 2;
    const newHeight = blockEntity.height / 2;
    const newSplits = blockEntity.splits + 1;

    for (let i = 0; i < 4; i++) {
      const xOffset = (i % 2) * newWidth;
      const yOffset = Math.floor(i / 2) * newHeight;
      const newPosition = {
        x: blockEntity.position.x + xOffset,
        y: blockEntity.position.y + yOffset,
        z: blockEntity.position.z
      };

      // Use the builder pattern and ensure collisionStart is set on the new block
      this.create({
        position: newPosition,
        velocity: {
          x: (Math.random() * 2 - 1) * 10,
          y: (Math.random() * 2 - 1) * 10
        },
        size: {
          width: newWidth,
          height: newHeight,
        },
        splits: newSplits,
        frictionAir: 0.2,
        color: blockEntity.color,
        lifetime: blockEntity.lifetime,
      });
    }

    this.game.removeEntity(blockEntity.id);
  }
}

export default Block;
// TileSet.js - Marak Squires 2024
export default class TileSet {
  static id = 'tileset';
  constructor(config = {}) {
    this.id = TileSet.id;
  }

  init(game) {
    this.game = game;
    // this.game.use(new Tile());
    this.game.systemsManager.addSystem('tileset', this);
  }

  build (entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0, z: 0};
    }

    if (typeof entityData.position.z === 'undefined') {
      entityData.position.z = 0;
    }

    const defaultTileSet = [
      /*
      VOID: 0,
      FLOOR: 1,
      WALL: 2,
      DOOR: 3,
      SPECIAL_DOOR: 4,
      ENTER: 5,
      EXIT: 6
      */
      // void
      { id: 0, kind: 'empty' },
      // wall
      { id: 1, kind: 'bush', texture: 'tile-grass', body: true, isStatic: true, customZ: true, z: 16  },
      { id: 2, kind: 'grass' },
      { id: 3, kind: 'block', type: 'BLOCK', body: true, z: 16 },
      { id: 4, kind: 'path-green' },
      { id: 5, kind: 'entrance', texture: 'tile-entrance' },
      { id: 6, kind: 'exit', texture: 'tile-exit', body: true, isStatic: true, isSensor: true }, // exit
    ];

    let meta = entityData.meta || {};
    meta.tileSet = meta.tileSet || entityData.tileSet || defaultTileSet;
    return {
      type: 'TILESET',
      meta: meta,
      name: entityData.name || 'No TileSet Name Set',
      position: entityData.position,
      data: entityData.data || [],
    };
  }

  // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  create(entityData = {}) {
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }
    // Create the TileSet entity
    const tileMap = game.createEntity(this.build(entityData));
  }

}
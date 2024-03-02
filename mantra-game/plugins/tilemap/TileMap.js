import Tile from '../tile/Tile.js'; // for now

// TileMap.js - Marak Squires 2024
export default class TileMap {
  static id = 'tilemap';
  constructor(config = {}) {
    this.id = TileMap.id;
  }

  init(game) {
    this.game = game;
    this.game.use(new Tile());
    this.game.systemsManager.addSystem('tilemap', this);
  }

  build (entityData = {}) {
    let game = this.game;
    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0, z: 0};
    }

    if (typeof entityData.position.z === 'undefined') {
      entityData.position.z = 0;
    }

    entityData.meta = entityData.meta || {};

    if (entityData.tileMapWidth && entityData.tileMapHeight) {
      entityData.meta.tileMapWidth = entityData.tileMapWidth;
      entityData.meta.tileMapHeight = entityData.tileMapHeight;
    } else {
      entityData.meta.tileMapWidth = 4;
      entityData.meta.tileMapHeight = 4;
    }

    if (entityData.tileSize) {
      entityData.meta.tileSize = entityData.tileSize;
      entityData.meta.tileWidth = entityData.tileSize;
      entityData.meta.tileHeight = entityData.tileSize;
    }

    if (entityData.tileWidth && entityData.tileHeight) {
      entityData.meta.tileWidth = entityData.tileWidth;
      entityData.meta.tileHeight = entityData.tileHeight;
    }

    if (typeof entityData.meta.tileWidth !== 'number') {
      entityData.meta.tileWidth = 32;
    }
    if (typeof entityData.meta.tileHeight !== 'number') {
      entityData.meta.tileHeight = 32;
    }

    // provide a small default tile map if none is provided
    entityData.meta.data = entityData.data || [
      1,0,0,1,
      1,0,0,1,
      1,0,0,1,
      1,0,0,1
    ];

    let meta = {};
   
    if (entityData.meta) {
      meta = entityData.meta;
    }

    if (entityData._previous && entityData._previous.meta && entityData._previous.meta.tileSet) {
      meta.tileSet = entityData._previous.meta.tileSet;
    }
   
    if (entityData.tileSet) {
      meta.tileSet = entityData.tileSet;
    }

    if (!meta.tileSet) {
      meta.tileSet = [
        { id: 0, texture: 'tile-grass' },
        { id: 1, texture: 'tile-bush' },
      ];
    }

    // calculate the container size by multiplying the tile map width and height by the tile size
    entityData.size = {
      width: entityData.meta.tileMapWidth * entityData.meta.tileWidth,
      height: entityData.meta.tileMapHeight * entityData.meta.tileHeight,
    };

    // adds a border buffer around the tile map ( for now )
    entityData.size.width += 16;
    entityData.size.height += 16;

    // set actual x y z values as string if not exist
    let coordinateKey = entityData.coordinateKey || entityData.position.x + ',' + entityData.position.y + ',' + entityData.position.z;
    return {
      type: 'TILEMAP',
      isSensor: true,
      body: false,
      name: coordinateKey,
      position: entityData.position,
      size: entityData.size, // size of the container for the tile map
      meta: meta,
      style: {
        display: 'none', // since TILEMAP itself is the container, we don't want to see it
      },
      afterCreateEntity: (entityData) => {
        let game = this.game;
        // after the tile map container is created, create all the tiles as children
        // create the tiles scoped to entityData.id as container
        // console.log(entityData)
        // console.log('coordinateKey', coordinateKey)
        // console.log('using the tileset', entityData.meta.tileSet)
        let tileMap = {
          container: coordinateKey,
          data: entityData.meta.data,
          tileSet: entityData.meta.tileSet,
          x: 0, // Remark: This will place tile map in TileMap units, not pixel
          y: 0, // Actual values will be x * 16, y * 16
          width: entityData.meta.tileMapWidth || 4,
          height: entityData.meta.tileMapHeight || 4,
          // TileMap renders relative to 0,0,0 on the parent TILEMAP container
          position: { x: 0, y: 0, z: 0 },
          tileWidth: entityData.meta.tileWidth || 16,
          tileHeight: entityData.meta.tileHeight || 16,
          tileDepth: entityData.meta.tileDepth || 16,
          tileSize:  entityData.meta.tileWidth, // TODO: remove this
        };
        // TODO: refactor `Tile.createLayer` to `TileMap.create()`
        game.systems.tile.createLayer(tileMap, tileMap.tileSize, tileMap.tileSize)
      }
    };
  }

  // TODO: rename to create? we probably need this.createEntity scope preserved for scene
  create(entityData = {}) {

    if (typeof entityData.position === 'undefined') {
      entityData.position = { x: 0, y: 0 };
    }

    // Create the TileMap entity
    const tileMap = game.createEntity(this.build(entityData));
  }

}
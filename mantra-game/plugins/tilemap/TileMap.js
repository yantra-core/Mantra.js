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

    // provide a small default tile map if none is provided
    entityData.meta.data = entityData.data || [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
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

    // set actual x y z values as string if not exist
    let coordinateKey = entityData.coordinateKey || entityData.position.x + ',' + entityData.position.y + ',' + entityData.position.z;

    return {
      type: 'TILEMAP',
      name: coordinateKey,
      position: entityData.position,
      meta: meta,
      style: {
        display: 'none', // since TILEMAP itself is the container, we don't want to see it
      },
      afterCreateEntity: (entityData) => {
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
          /*
          tileSize: 16,
          data: [
            1,1,1,1,
            1,1,1,1,
            1,1,1,1,
            1,1,1,1,
          ]*/
          position: { x: 0, y: 0 },
          tileWidth: entityData.meta.tileWidth || 16,
          tileHeight: entityData.meta.tileHeight || 16,
          tileDepth: entityData.meta.tileDepth || 16,
          tileSize:  entityData.meta.tileWidth, // TODO: remove this
        };
        console.log('sending', tileMap)
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
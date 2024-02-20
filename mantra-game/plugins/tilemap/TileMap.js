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

    entityData.meta.data = entityData.data || {};
    entityData.meta.tileSet = entityData.tileSet || [];

    //let rules = this.sutra();

    // set actual x y z values as string if not exist
    let coordinateKey = entityData.coordinateKey || entityData.position.x + ',' + entityData.position.y + ',' + entityData.position.z;

    return {
      type: 'TILEMAP',
      name: coordinateKey,
      position: entityData.position,
      meta: entityData.meta,
      afterCreateEntity: (entityData) => {
        //alert('afterCreateEntity')
        // after the tile map container is created, create all the tiles as children

        // create the tiles scoped to entityData.id as container
        console.log(entityData)
        console.log('coordinateKey', coordinateKey)
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
          tileSize: 16, // can make object later
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
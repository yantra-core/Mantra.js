import defaultOrthogonalMap from './maps/defaultOrthogonalMap.js';
// import mediumOrthogonalMap from './maps/mediumOrthogonalMap.js';
//import largeOrthogonalMap from './maps/largeOrthogonalMap.js';
const tilemap = {
  1: 'block',
  2: 'grass',
  3: 'water'
};

class Tile {
  static id = 'tile';

  constructor(game) {
    this.game = game;
    this.id = Tile.id;
  }

  init(game) {
    this.game = game;
    setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
    //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);

    //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
  }

  createTileMapFromTiledJSON(tiledJSON) {
    tiledJSON.layers.forEach(layer => {
      if (layer.type === 'tilelayer') {
        this.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
      }
    });
  }

  createLayer(layer, tileWidth, tileHeight) {
    let max = 1000;
    layer.data.forEach((tileId, index) => {
      if (tileId !== 0 && tileId !== 2 && tileId !== 4577 && tileId !== 4767) {
        const { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, tileId);
        this.createTile(tileId, x, y, z, tileWidth, tileHeight);
      }
    });
  }

  calculateTilePosition(index, layer, tileWidth, tileHeight, tileId) {
    let x = (index % layer.width) * tileWidth - (layer.width * tileWidth / 2);
    let y = Math.floor(index / layer.width) * tileHeight - (layer.height * tileHeight / 2);
    let z = tileId === 1 ? 0 : -1;

    return { x, y, z };
  }

  createTile(tileId, x, y, z, tileWidth, tileHeight) {
    const scale = 1;
    let body = tileId === 1;
    let isStatic = tileId !== 1;
    let mass = tileId === 1 ? 5000 : 1;


    this.game.createEntity({
      type: 'BLOCK',
      kind: 'Tile',
      body,
      mass,
      isStatic,
      style: { cursor: 'pointer' },
      position: { x: x * scale, y: y * scale, z },
      friction: 1,
      frictionAir: 1,
      frictionStatic: 1,
      texture: `tile-${tilemap[tileId]}`,
      width: tileWidth * scale,
      height: tileHeight * scale,
      depth: tileWidth * scale
    });
  }

  getTileImageURL(tileId) {
    return `img/game/tiles/${tileId}.png`;
  }

  update() { }

  render() { }

  destroy() { }
}

export default Tile;

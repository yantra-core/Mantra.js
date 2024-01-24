import defaultOrthogonalMap from './maps/defaultOrthogonalMap.js';
//import mediumOrthogonalMap from './maps/mediumOrthogonalMap.js';
//import largeOrthogonalMap from './maps/largeOrthogonalMap.js';

// TODO: mantra-tiled-server needs to be a package.json
import getChunkFiles from './lib/getChunkFiles.js';
import loadChunk from './lib/loadChunk.js';
import calculateTilePosition from './lib/calculateTilePosition.js';
import generateRandomChunk from './lib/generateRandomChunk.js';
import generateRandomChunkWithPaths from './lib/generateRandomChunkWithPaths.js';
import generateChunkWithFractal from './lib/generateChunkWithFractal.js';
import randomTileFromDistribution from './lib/randomTileFromDistribution.js';
import createTile from './lib/createTile.js'; 

const tileKinds = [
  { id: 1, kind: 'bush', weight: 5, body: true, isStatic: true, z: 0 },
  { id: 2, kind: 'grass', weight: 70 },
  { id: 3, kind: 'block', weight: 5, body: true, z: 0  },
  { id: 4, kind: 'path-green', weight: 10 },
  { id: 5, kind: 'path-brown', weight: 10 },
];

class Tile {
  static id = 'tile';

  constructor({ 
    tileMap = defaultOrthogonalMap,
    tiledServer = false,
    chunkUnitSize = 8,
    tileSize = 16,
    proceduralGenerateMissingChunks = false
  } = {}) {
  
    this.id = Tile.id;

    // in debug mode we will add colors to each chunk
    this.debug = false;

    // set a default tile map
    this.tileMap = tileMap;

    this.tileKinds = tileKinds; // rename

    // TODO: configurable chunk size and tile size
    this.chunkUnitSize = chunkUnitSize;
    this.tileSize = tileSize;
    this.chunkPixelSize = this.chunkUnitSize * this.tileSize;

    this.loadingStates = {}; // Track the state of loadScript calls
    this.maxRetries = 3; // Set the maximum number of retries for a given URL

    // tiledServer is a boolean flag to indicate if we are using mantra-tiled-server
    // tile chunks will be loaded on demand based on the mantra-tiled-server specs
    this.tiledServer = tiledServer;

    // if true, will load tiles on demand based on mantra-tiled-server specs
    this.lazyLoadTiles = false;

    // if true, will generate random chunks for missing chunks not found by mantra-tiled-server
    this.proceduralGenerateMissingChunks = proceduralGenerateMissingChunks;

    // list of tile ids for random generation
    this.tileIds = [1, 2, 3];

    this.loadChunk = loadChunk.bind(this);
    this.calculateTilePosition = calculateTilePosition.bind(this);
    this.generateRandomChunk = generateRandomChunk.bind(this);
    this.generateRandomChunkWithPaths = generateRandomChunkWithPaths.bind(this);
    this.generateChunkWithFractal = generateChunkWithFractal.bind(this);
    this.randomTileFromDistribution = randomTileFromDistribution.bind(this);
    this.createTile = createTile.bind(this);
    

  }

  init(game) {
    this.game = game;
    this.game.addSystem('tile', this);

    if (this.tiledServer) {
      this.game.loadScripts([
        '/tiled/chunks/chunk_x0_y0.js'
      ], () => {
        // query the default tiled chunk location for chunk chunk_x0_y0
        // this file will exist in ./tiled/chunks/chunk_x0_y0.js
        // we can simply inject this remote .js file from the CDN into the client
        // and the game.data.chunks scope will be populated with the chunk data
        console.log('this.game.data.chunks.chunk_x0_y0', this.game.data.chunks.chunk_x0_y0.data.length)
        this.createLayer(this.game.data.chunks.chunk_x0_y0, this.tileSize, this.tileSize);
      });
  
    } else {
      this.createTileMapFromTiledJSON(this.tileMap);
      //setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
    }

  }

  createTileMapFromTiledJSON(tiledJSON) {
    tiledJSON.layers.forEach(layer => {
      if (layer.type === 'tilelayer') {
        this.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
      }
    });
  }

  createLayer(layer, tileWidth, tileHeight) {
    layer.data.forEach((tile, index) => {
      if (typeof tile === 'number') {
        // find id = tile in tileKinds
        let tileId = tile;
        let tileKind = tileKinds.find(tileKind => tileKind.id === tileId);
        if (tileKind) {
          tile = tileKind;
        }
      }
      //if (tileId !== 0 && /* tileId !== 2 && */ tileId !== 4577 && tileId !== 4767) {
      let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, tile.id);
      this.createTile(tile, x, y, z, tileWidth, tileHeight, layer.color);
      //}
    });
  }



  getTileImageURL(tileId) {
    return `img/game/tiles/${tileId}.png`;
  }

 
  handleLoadFailure(chunkPath, chunkKey) {
    //console.log("Fallback for failed load:", chunkPath, chunkKey);
    // Call the procedural generation function
    if (this.proceduralGenerateMissingChunks) {
      console.log('Generating random chunk', chunkKey)
      let randomChunk = this.generateChunkWithFractal(chunkKey, tileKinds);
      // console.log('randomChunk', chunkKey, randomChunk.data.length)
      this.game.data.chunks[chunkKey] = randomChunk;
      this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
    }
  }
 

  /*
  randomTileFromDistribution(tileIds) {
    let randomIndex = Math.floor(Math.pow(Math.random(), 2) * tileIds.length);
    return tileIds[randomIndex];
  }
  */

  extractChunkCoordinates(chunkKey) {
    // Extracts x and y coordinates from the chunk key
    let match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
    return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : { x: 0, y: 0 };
  }

  loadTilesForArea(position) {

    if (!this.tiledServer) return;

    let outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
    const result = getChunkFiles(position, this.chunkUnitSize, outputDir, 2);
    // console.log("getChunkFiles result", position, result);
  
    result.forEach(chunkName => {
      // Extract the chunk key from the chunk file name
      let chunkKey = chunkName.replace('.js', '').replace(outputDir, '');
      // Load the chunk if it's not already loaded
      if (typeof this.game.data.chunks[chunkKey] === 'undefined') {
        // console.log("loadTilesForArea", position, this.chunkUnitSize);
        let chunkPath = chunkName; // Since the directory is already included in chunkName
        this.loadChunk(chunkPath, chunkKey);
      }
    });
  }
  
  update() { }

  render() { }

  destroy() { }
}

export default Tile;
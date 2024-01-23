import defaultOrthogonalMap from './maps/defaultOrthogonalMap.js';
//import mediumOrthogonalMap from './maps/mediumOrthogonalMap.js';
//import largeOrthogonalMap from './maps/largeOrthogonalMap.js';

// import getChunkFiles from '../../../mantra-tiled-server/lib/getChunkFiles.js';

const tilemap = {
  0: 'block',
  1: 'block',
  2: 'grass',
  3: 'water'
};

class Tile {
  static id = 'tile';

  constructor(game) {
    this.game = game;
    this.id = Tile.id;


    // TODO: configurable chunk size and tile size
    this.chunkUnitSize = 128;
    this.tileSize = 16;
    this.chunkPixelSize = this.chunkUnitSize * this.tileSize;

    this.loadingStates = {}; // Track the state of loadScript calls
    this.maxRetries = 3; // Set the maximum number of retries for a given URL

    // if true, will load tiles on demand based on mantra-tiled-server specs
    this.lazyLoadTiles = false;

    // if true, will generate random chunks for missing chunks not found by mantra-tiled-server
    this.proceduralGenerateMissingChunks = false;

    // list of tile ids for random generation
    this.tileIds = [2];

  }

  init(game) {
    this.game = game;
    this.game.addSystem('tile', this);

    if (this.lazyLoadTiles) {
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
      setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
    }

  }

  createTile(tileId, x, y, z, tileWidth, tileHeight, color) {

    // console.log('createTile', tileId, x, y, z, tileWidth, tileHeight)
    // if tileId is 1, give it 30% chance to flip to 2
    /*
    if (tileId == 2 && Math.random() < 0.1) {
      tileId = 1;
    }
    */

    if (tileId == 2) {
      z = -16;
      tileWidth = 16;
      return;
    }

    const scale = 1;
    let body = tileId === 1;
    let isStatic = tileId !== 1;
    let mass = tileId === 1 ? 5000 : 1;

    let _color;
    if (color) {
      _color = color;
    }
    // body = false;
    let _texture = `tile-${tilemap[tileId]}`;
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
      texture: _texture,
      color: _color,
      width: tileWidth * scale,
      height: tileHeight * scale,
      depth: tileWidth * scale
    });
  }

  createTileMapFromTiledJSON(tiledJSON) {
    tiledJSON.layers.forEach(layer => {
      if (layer.type === 'tilelayer') {
        this.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
      }
    });
  }

  createLayer(layer, tileWidth, tileHeight) {
    layer.data.forEach((tileId, index) => {
      //if (tileId !== 0 && /* tileId !== 2 && */ tileId !== 4577 && tileId !== 4767) {
      let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, tileId);
      this.createTile(tileId, x, y, z, tileWidth, tileHeight, layer.color);
      //}
    });
  }

  calculateTilePosition(index, layer, tileWidth, tileHeight, tileId) {
    // Calculate the tile's local position within the layer (relative to the layer's top-left corner)
    let localX = (index % layer.width) * tileWidth;
    let localY = Math.floor(index / layer.width) * tileHeight;

    // Calculate the center of the layer in pixel coordinates
    let layerCenterX = layer.width * tileWidth / 2;
    let layerCenterY = layer.height * tileHeight / 2;

    // Convert local positions to pixel values and add the layer's offset
    // Adjusted to start from the center (0,0)
    let mapX = localX - layerCenterX + (layer.x * tileWidth);
    let mapY = localY - layerCenterY + (layer.y * tileHeight);

    // Calculate the absolute position of the tile in the game world
    let x = mapX;
    let y = mapY;
    let z = tileId === 1 ? 0 : -1;  // Adjust z based on your game's logic

    return { x, y, z };
}

  getTileImageURL(tileId) {
    return `img/game/tiles/${tileId}.png`;
  }

  loadChunk(chunkPath, chunkKey) {
    // console.log("load chunk", chunkPath, chunkKey)

    if (!this.loadingStates[chunkPath]) {
      this.loadingStates[chunkPath] = { attempts: 0, loading: false };
    }

    let state = this.loadingStates[chunkPath];

    if (!state.loading && state.attempts < this.maxRetries) {
      state.loading = true;
      state.attempts++;

      console.log("Attempting to load tile chunk", chunkPath);
      this.game.loadScripts([chunkPath], () => {
        console.log("Loaded tile chunk", chunkKey);
        state.loading = false;

        if (this.game.data.chunks[chunkKey]) {
          this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
        } else {
          console.log("WARNING: chunk not found", chunkKey);
          this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
        }
      });
    } else if (state.attempts >= this.maxRetries) {
      console.log("MAX RETRIES REACHED FOR", chunkPath);
      this.handleLoadFailure(chunkPath, chunkKey); // Handle the failure case
    }
  }

  handleLoadFailure(chunkPath, chunkKey) {
    console.log("Fallback for failed load:", chunkPath, chunkKey);
    // Call the procedural generation function
    if (this.proceduralGenerateMissingChunks) {
      console.log('generating random chunk', chunkKey)
      let randomChunk = this.generateRandomChunk(chunkKey, this.tileIds);
      console.log('randomChunk', chunkKey, randomChunk)
      this.game.data.chunks[chunkKey] = randomChunk;
      this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
    }
  }

  generateRandomChunk(chunkKey, tileIds) {
    let chunkData = [];

    for (let i = 0; i < this.tileSize * this.tileSize; i++) {
      // Generate a random tile based on the distribution
      let tile = this.randomTileFromDistribution(tileIds);
      chunkData.push(tile);
    }

    let randomIntColor = Math.floor(Math.random() * 16777215);
    return {
      data: chunkData,
      height: this.chunkUnitSize,
      width: this.chunkUnitSize,
      color: randomIntColor,
      x: this.extractChunkCoordinates(chunkKey).x,
      y: this.extractChunkCoordinates(chunkKey).y
    };
  }

  randomTileFromDistribution(tileIds) {
    let randomIndex = Math.floor(Math.pow(Math.random(), 2) * tileIds.length);
    return tileIds[randomIndex];
  }

  extractChunkCoordinates(chunkKey) {
    // Extracts x and y coordinates from the chunk key
    let match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
    return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : { x: 0, y: 0 };
  }

  loadTilesForArea(position) {

    if (!this.lazyLoadTiles) return;

    let outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
    const result = getChunkFiles(position, this.chunkUnitSize, outputDir);
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
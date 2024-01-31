import labyrinthos from 'labyrinthos';
// import labyrinthos from '../../../../Labyrinthos.js/lib/labyrinthos.js';

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
  { id: 0, kind: 'empty', weight: 10 },
  { id: 1, kind: 'bush', weight: 2, body: true, isStatic: true, z: 0 },
  { id: 2, kind: 'grass', weight: 63 },
  { id: 3, kind: 'block', weight: 5, body: true, z: 0 },
  { id: 4, kind: 'path-green', weight: 10 },
  { id: 5, kind: 'path-brown', weight: 10 },
];

class Tile {
  static id = 'tile';

  constructor({
    tileMap = null,
    tiledMap = defaultOrthogonalMap,
    tiledServer = false,
    chunkUnitSize = 8,
    tileSize = 16,
    proceduralGenerateMissingChunks = false,
    loadInitialChunk = true,
    loadDefaultTileMap = true,
    loadTileMap = false
  } = {}) {

    this.id = Tile.id;

    // in debug mode we will add colors to each chunk
    this.debug = false;

    // set a default tiled map
    this.tiledMap = tiledMap;

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
    this.loadDefaultTileMap = loadDefaultTileMap;
    this.loadTileMap = loadTileMap;

    // if true, will load tiles on demand based on mantra-tiled-server specs
    this.lazyLoadTiles = false;

    this.loadInitialChunk = loadInitialChunk;

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

  setOptions(TileConfig) {
    // console.log("SET NEW OPTIONS", TileConfig)
    this.tiledServer = TileConfig.tiledServer;
    this.proceduralGenerateMissingChunks = TileConfig.proceduralGenerateMissingChunks;
    //this.tiledMap = TileConfig.tiledMap;
    //this.loadInitialChunk = TileConfig.loadInitialChunk;
    //this.chunkUnitSize = TileConfig.chunkUnitSize;
    //this.tileSize = TileConfig.tileSize;
    //this.chunkPixelSize = TileConfig.chunkPixelSize;
    //this.debug = TileConfig.debug;
    //this.lazyLoadTiles = TileConfig.lazyLoadTiles;
    //this.tileIds = TileConfig.tileIds;
  }

  init(game) {
    this.game = game;
    this.game.addSystem('tile', this);

    if (this.loadInitialChunk) {

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

      } else if (this.proceduralGenerateMissingChunks) {
        // TODO: generator
      }


    } else {

      //setTimeout(() => this.createTileMapFromTiledJSON(defaultOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(mediumOrthogonalMap), 222);
      //setTimeout(() => this.createTileMapFromTiledJSON(largeOrthogonalMap), 222);
    }

    if (this.loadDefaultTileMap) {
      this.createTileMapFromTiledJSON(this.tiledMap);
    }

    if (this.loadTileMap) {
      this.createTileMap(this.tileMap);
    }

    // only code path using file::upload 1/24/24 is tile.html Tiled server upload demo
    this.game.on('file::upload', (data) => {
      // console.log('got new tile data', data);
      this.createTileMapFromTiledJSON(data);
    });

  }

  createTileMap(tileMap) {

    console.log('createTileMap', tileMap);

    let map = new labyrinthos.TileMap({
      x: 0,
      y: 0,
      width: tileMap.width,
      height: tileMap.height,
      tileWidth: 16, // TODO: tileSet.tilewidth
      tileHeight: 16 // TODO: tileSet.tileheight
    });
    map.fill(1);

    map.seed(tileMap.seed);

    let transformFn = labyrinthos.mazes[tileMap.algo];
    let transformType = 'maze';
    if (typeof transformFn === 'undefined') {
      transformFn = labyrinthos.terrains[tileMap.algo];
      transformType = 'terrain';
    }
    if (typeof transformFn === 'undefined') {
      transformFn = labyrinthos.shapes[tileMap.algo];
      transformType = 'shape';
    }

    if (typeof transformFn === 'undefined') {
      console.log('no transformFn found for', tileMap.algo);
      throw new Error('no transformFn found for ' + tileMap.algo);
    }

    transformFn(map, tileMap.options || {});

    if (transformType === 'terrain') {
      map.scaleToTileRange(6);
    }

    // labyrinthos.mazes.RecursiveBacktrack(map, {});
    // labyrinthos.mazes.SpiralBacktrack(map, {});
    // labyrinthos .mazes.RecursiveDivision(map, {});
    // labyrinthos.terrains.DiamondSquare(map, {});
    //labyrinthos.terrains.FaultLine(map, {});
    this.createLayer(map, 16, 16); // TODO: tileSet.tilewidth, tileSet.tileheight

    this.game.emit('tilemap::created', tileMap);

  }

  createTileMapFromTiledJSON(tiledJSON) {
    // TODO: remove this line
    if (typeof window !== 'undefined') {
      let overlay = document.getElementById('drag-and-drop-file-upload-overlay');
      // set hidden
      overlay.style.display = 'none';
    }
    tiledJSON.layers.forEach(layer => {
      if (layer.type === 'tilelayer') {

        if (layer.chunks) {
          layer.chunks.forEach(chunk => {
            this.createLayer(chunk, tiledJSON.tilewidth, tiledJSON.tileheight);
          });
        } else {
          this.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
        }

      }
    });
  }

  createLayer(layer, tileWidth, tileHeight) {
    // Check if the layer.data is a 3D array
    if (Array.isArray(layer.data[0])) {
      // 3D data handling
      layer.data.forEach((layer2D, z) => {
        layer2D.forEach((tile, index) => {
          this.processTile(tile, index, layer, tileWidth, tileHeight, z);
        });
      });
    } else {
      // 2D data handling
      layer.data.forEach((tile, index) => {
        this.processTile(tile, index, layer, tileWidth, tileHeight, 0); // Assume z=0 for 2D data
      });
    }
  }
  
  processTile(tile, index, layer, tileWidth, tileHeight, depth) {
    if (typeof tile === 'number') {
      // Find id = tile in tileKinds
      let tileId = tile;
      let tileKind = tileKinds.find(tileKind => tileKind.id === tileId);
      if (tileKind) {
        tile = tileKind;
      } else {
        tile = tileKinds[3]; // Default tile kind if not found
      }
    }
  
    let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, depth);
    tile.z = z;
    this.createTile(tile, x, y, z, tileWidth, tileHeight, layer.color);
  }
  

  getTileImageURL(tileId) {
    return `img/game/tiles/${tileId}.png`;
  }

  handleLoadFailure(chunkPath, chunkKey) {
    console.log("Fallback for failed load:", chunkPath, chunkKey);
    // Call the procedural generation function
    if (this.proceduralGenerateMissingChunks) {
      // console.log('Generating random chunk', chunkKey)
      // let randomChunk = this.generateRandomChunk(chunkKey, tileKinds);
      let randomChunk;
      let chunkCoordinates = this.extractChunkCoordinates(chunkKey);


      //console.log('chunkCoordinates', chunkCoordinates)
      //console.log('current map data', this.tiledMap)

      // console.log('chunkCoordinates', chunkCoordinates)
      let x = chunkCoordinates.x;
      let y = chunkCoordinates.y;
      // TODO: subsection query, continious map
      //let subsection = this.tiledMap.query({ x: x, y: y, width: this.chunkUnitSize, height: this.chunkUnitSize });
      let map = new labyrinthos.TileMap({
        x: x,
        y: y,
        width: 8,
        height: 8,
        tileWidth: 16,
        tileHeight: 16
      });
      map.fill(1);
      //labyrinthos.mazes.RecursiveBacktrack(map, {});
      // labyrinthos.mazes.SpiralBacktrack(map, {});
      // labyrinthos .mazes.RecursiveDivision(map, {});
      // labyrinthos.terrains.DiamondSquare(map, {});
      // map.seed(4121);
      console.log('using fallback generator')
      labyrinthos.terrains.FaultLine(map, {});
      
      map.scaleToTileRange(6);
      // console.log('map', map)

      randomChunk = map;

      // console.log('randomChunk', chunkKey, randomChunk.data.length)
      this.game.data.chunks[chunkKey] = randomChunk;
      this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
    }
  }

  extractChunkCoordinates(chunkKey) {
    // Extracts x and y coordinates from the chunk key
    let match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
    return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : { x: 0, y: 0 };
  }

  loadTilesForArea(position) {

    //generateMap(map, {});
    //console.log('map', map)

    // if (!this.tiledServer) return;

    let outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
    const result = getChunkFiles(position, this.chunkUnitSize, outputDir, 2);
    // console.log("getChunkFiles result", position, result);

    // TODO: place check to see if we allow remote chunk loading
    result.forEach(chunkName => {
      // Extract the chunk key from the chunk file name
      let chunkKey = chunkName.replace('.js', '').replace(outputDir, '');
      // Load the chunk if it's not already loaded
      if (typeof this.game.data.chunks[chunkKey] === 'undefined') {
        // console.log("loadTilesForArea", position, this.chunkUnitSize);
        if (this.tiledServer) {
          let chunkPath = chunkName;
          this.loadChunk(chunkPath, chunkKey);
        } else if (this.proceduralGenerateMissingChunks) {
          this.handleLoadFailure(null, chunkKey); // Changed to handle procedural generation
        }
      }
    });
  }

  update() { }

  render() { }

  destroy() { }
}

export default Tile;
import labyrinthos from 'labyrinthos';
// import labyrinthos from '../../../../Labyrinthos.js/lib/labyrinthos.js';

import defaultOrthogonalMap from './maps/defaultOrthogonalMap.js';
//import mediumOrthogonalMap from './maps/mediumOrthogonalMap.js';
//import largeOrthogonalMap from './maps/largeOrthogonalMap.js';

import getChunkFiles from './lib/getChunkFiles.js';
import loadChunk from './lib/loadChunk.js';
import loadTilesForArea from './lib/loadTilesForArea.js';
import handleChunkLoadFailure from './lib/handleChunkLoadFailure.js';
import calculateTilePosition from './lib/calculateTilePosition.js';
import createTile from './lib/createTile.js';
import createTileMap from './lib/createTileMap.js';
import createTileMapFromTiledJSON from './lib/createTileMapFromTiledJSON.js';
import createLayer from './lib/createLayer.js';
import processTile from './lib/processTile.js';

const defaultTileSet = [
  { id: 0, kind: 'empty', weight: 10 },
  { id: 1, kind: 'bush', texture: 'tile-bush', weight: 2, body: true, isStatic: true,  z: 16 /* size: { depth: 32 } */ },
  { id: 2, kind: 'grass', weight: 63 },
  { id: 3, kind: 'block', weight: 5, body: true, z: 16 },
  { id: 4, kind: 'path-green', weight: 10 },
  { id: 5, kind: 'path-brown', weight: 10 },
  { id: 6, kind: 'path-brown', weight: 10 },
];

class Tile {
  static id = 'tile';

  constructor({
    tileMap = null,
    tiledMap = defaultOrthogonalMap,
    tiledServer = false,
    tileSet = defaultTileSet,
    chunkUnitSize = 8,
    tileSize = 16,
    labyrinthosAlgo = 'FaultLine',
    proceduralGenerateMissingChunks = false,
    loadInitialChunk = true,
    loadDefaultTileMap = true,
    loadTileMap = false
  } = {}) {

    this.id = Tile.id;
    this.labyrinthos = labyrinthos;
    // in debug mode we will add colors to each chunk
    this.debug = false;

    // set a default tiled map
    this.tiledMap = tiledMap;

    this.tileMap = tileMap;

    this.labyrinthosAlgoName = labyrinthosAlgo;
    this.labyType = 'maze';

    // TODO: replace this scaffold wth labyrinthos.transform()
    this.labyrinthosAlgo = labyrinthos.mazes[labyrinthosAlgo];
    if (typeof this.labyrinthosAlgo === 'undefined') {
      this.labyrinthosAlgo = labyrinthos.terrains[labyrinthosAlgo];
      this.labyType = 'terrain';
    }
    if (typeof this.labyrinthosAlgo === 'undefined') {
      this.labyrinthosAlgo = labyrinthos.shapes[labyrinthosAlgo];
      this.labyType = 'shape';
    }
    if (typeof this.labyrinthosAlgo === 'undefined') {
      console.log('Warning: no labyrinthos algo found for', labyrinthosAlgo);
    }

    this.tileSet = tileSet;
    this.tileSets = {
      default: tileSet
    };

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
    // this.tileIds = [1, 2, 3];

    this.createTile = createTile.bind(this);
    this.createTileMap = createTileMap.bind(this);
    this.createTileMapFromTiledJSON = createTileMapFromTiledJSON.bind(this);
    this.loadChunk = loadChunk.bind(this);
    this.getChunkFiles = getChunkFiles.bind(this);
    this.handleChunkLoadFailure = handleChunkLoadFailure.bind(this);
    this.calculateTilePosition = calculateTilePosition.bind(this);
    this.loadTilesForArea = loadTilesForArea.bind(this);
    this.createLayer = createLayer.bind(this);
    this.processTile = processTile.bind(this);

  }

  setOptions(TileConfig) {
    // console.log("Tile.setOptions", TileConfig)
    this.tiledServer = TileConfig.tiledServer;
    this.proceduralGenerateMissingChunks = TileConfig.proceduralGenerateMissingChunks;
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
      this.tiledServer = false;
      this.createTileMapFromTiledJSON(data);
    });

  }

  // takes an incoming TileSet and sets it as active for immediate use
  useTileSet(key, tileSet) {
    this.tileSet = tileSet;
    this.tileSets[key] = tileSet;
  }

  // adds / registers a new TileSet into Tile.tileSets[key] ( for later access )
  addTileSet(key, tileSet) {
    this.tileSets(key, tileSet);
  }

  extractChunkCoordinates(chunkKey) {
    // Extracts x and y coordinates from the chunk key
    let match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
    return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : { x: 0, y: 0 };
  }

  update() { 
    /*
    if (this.game.tick % 10 === 0) {
      let allBodies = this.game.physics.Composite.allBodies(this.game.engine.world);
    }
    */

  }

  render() { }

  destroy() { }
}

export default Tile;
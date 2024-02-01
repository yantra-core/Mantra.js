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

const tileKinds = [
  { id: 0, kind: 'empty', weight: 10 },
  { id: 1, kind: 'bush', weight: 2, body: true, isStatic: true, z: 16 },
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
    // this.tileIds = [1, 2, 3];

    this.createTile = createTile.bind(this);
    this.createTileMap = createTileMap.bind(this);
    this.loadChunk = loadChunk.bind(this);
    this.getChunkFiles = getChunkFiles.bind(this);
    this.handleChunkLoadFailure = handleChunkLoadFailure.bind(this);
    this.calculateTilePosition = calculateTilePosition.bind(this);
    this.loadTilesForArea = loadTilesForArea.bind(this);

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
    if (typeof layer.data[0] === 'object') {
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
      let tileKind = this.tileKinds.find(tileKind => tileKind.id === tileId);
      if (tileKind) {
        tile = tileKind;
      } else {
        tile = this.tileKinds[3]; // Default tile kind if not found
      }
    }

    let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, depth);
    if (tile === null) {
      //return;
    }
    // allow tile.z to override z ( useful for blocks / layers / etc )
    if (typeof tile.z !== 'number') {
      tile.z = z;
    }
    tile.z = z;

    // TODO: check to see if existing tile exsting at this slot?
    this.createTile(tile, x, y, z, tileWidth, tileHeight, layer.color);

  }

  getTileImageURL(tileId) {
    return `img/game/tiles/${tileId}.png`;
  }

  extractChunkCoordinates(chunkKey) {
    // Extracts x and y coordinates from the chunk key
    let match = chunkKey.match(/chunk_x(-?\d+)_y(-?\d+)/);
    return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : { x: 0, y: 0 };
  }

  update() { }

  render() { }

  destroy() { }
}

export default Tile;
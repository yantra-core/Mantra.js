// Main function to generate mazes, supports both 2D and 3D, with "unique" and "extrude" modes for 3D
// TODO: remove game references and move this logic to Labyrinthos.js library itself
export default function generateTerrain(type = 'AldousBroder', options = {}) {
  const { width = 32, height = 12, depth = 1, mode = '2D', stackingMode = 'unique', seed = 1234 } = options;

  if (this.proceduralGenerateMissingChunks && !this.game.systems.rbush) {
    console.warn('proceduralGenerateMissingChunks is set to true, but rbush is not available. This means that chunks will not be generated procedurally and infinte mode will not work. Please game.use("RBush") plugin and try again.');
  }

  // Initialize and fill tile map
  let tileMap = new game.TileMap({
    x: 0, y: 0, width, height,
    seed, tileWidth: 16, tileHeight: 16
  });
  tileMap.fill(2); // Assuming '2' is the default tile to fill the map with

  if (mode === '3D') {
    tileMap.depth = depth; // Set the depth for a 3D map
    if (stackingMode === 'unique') {
      for (let i = 0; i < depth; i++) {
        let layer = new game.TileMap({ x: 0, y: 0, width, height, seed: seed + i, tileWidth: 16, tileHeight: 16 });
        layer.fill(2);
        this.generateTerrainLayer(layer, type);
        tileMap.data.push(layer.data); // Assuming `tileMap.data` can store layers for 3D maps
      }
    } else if (stackingMode === 'extrude') {
      let layer = new game.TileMap({ x: 0, y: 0, width, height, seed, tileWidth: 16, tileHeight: 16 });
      layer.fill(2);
      this.generateTerrainLayer(layer, type);
      for (let i = 0; i < depth; i++) {
        tileMap.data.push([...layer.data]); // Clone the layer for each depth level
      }
    }
  } else {
    // 2D maze generation
    this.generateTerrainLayer(tileMap, type);
  }

  // Assuming there's a way to attach the generated map to a container or entity system
  tileMap.container = 'tilemap-container';
  game.systems.tile.createLayer(tileMap, 16, 16); // Assuming this creates a tile layer from the tile map

  console.log("Generated Maze:", tileMap);
}

// Utility function to generate a single layer of a maze
// TODO: remove game references and move this logic to Labyrinthos.js library itself
export default function generateTerrainLayer(tileMap, generatorType) {
  try {
    const generator = game.terrainGenerators[generatorType];
    generator(tileMap, {});
    // Assume there's a function to scale tile ranges if necessary, similar to `scaleToTileRange`
    if (game.terrains[generatorType]) {
      // tileMap.scaleToTileRange(4); // Example function call, adjust as per actual API
    }
  } catch (err) {
    throw new Error('Error generating maze layer: ' + err.message);
  }
}
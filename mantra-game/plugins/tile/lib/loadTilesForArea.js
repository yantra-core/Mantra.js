export default function loadTilesForArea(position) {
  // Calculate the actual half-width and half-height by scaling the tileMap dimensions
  /*
  let halfWidth = (this.tileMap.width * 16) / 2;
  let halfHeight = (this.tileMap.height * 16) / 2;

  // Define a loading buffer distance
  let loadingBuffer = 0; // This can be adjusted based on how much buffer you want

  // Adjust halfWidth and halfHeight to include the loading buffer
  let bufferedHalfWidth = halfWidth - loadingBuffer;
  let bufferedHalfHeight = halfHeight - loadingBuffer;

  // Check if the position's absolute values are within the buffered tileMap dimensions
  if (Math.abs(position.x) <= bufferedHalfWidth && Math.abs(position.y) <= bufferedHalfHeight) {
    // Position is within the buffered area of the tileMap, so we don't need to do anything yet
    // Remark: We can continue to generate if seeds are aligned it, it may try to double place entities
    // at the 0,0 chunk tiles
    // console.log('Position is within the tileMap area with a buffer');
    // return;
  } else {
    // Position is within the loading buffer or outside the tileMapArea, time to load or generate new tiles
    // console.log('Position is approaching the tileMap boundary or is outside, loading or generating new tiles');
  }
  */

  let outputDir = '/tiled/chunks/'; // Set the base directory for the chunks
  const result = this.getChunkFiles(position, this.chunkUnitSize, outputDir, 2);
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
        this.handleChunkLoadFailure(null, chunkKey); // Changed to handle procedural generation
      }
    }
  });

}
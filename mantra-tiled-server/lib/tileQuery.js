// TODO: remove this code in favor of LABY.TileMap.query()
export default function tileQuery (tiledMap, { x, y, width, height }) {
    // Adjust x and y based on the center being at (0,0)
    const minX = x - width / 2;
    const maxX = x + width / 2;
    const minY = y - height / 2;
    const maxY = y + height / 2;
  
    // Filter chunks based on adjusted coordinates
    const relevantChunks = tiledMap.layers[0].chunks.filter(chunk => {
      const chunkEndX = chunk.x + chunk.width;
      const chunkEndY = chunk.y + chunk.height;
      return chunk.x <= maxX && chunkEndX >= minX &&
        chunk.y <= maxY && chunkEndY >= minY;
    });
    return relevantChunks;
}
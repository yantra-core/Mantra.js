import path from 'path';

export default function getChunkFiles(normalizedQuery, gridSize, outputDir) {
  const chunkFiles = [];
  for (let x = normalizedQuery.minX; x < normalizedQuery.maxX; x += gridSize) {
    for (let y = normalizedQuery.minY; y < normalizedQuery.maxY; y += gridSize) {
      const fileName = `chunk_x${x}_y${y}.js`;
      const filePath = path.join(outputDir, fileName);
      chunkFiles.push(filePath);
    }
  }
  return chunkFiles;
}

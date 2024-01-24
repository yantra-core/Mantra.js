export default function getChunkFiles(playerPosition, gridSize, outputDir, buffer = 1) {
  const chunkFiles = [];

  // Calculate the base chunk coordinates based on the player's position
  // The Math.round function is used to handle both positive and negative coordinates correctly
  const baseChunkX = Math.round(playerPosition.x / (gridSize * 16)) * gridSize;
  const baseChunkY = Math.round(playerPosition.y / (gridSize * 16)) * gridSize;

  // Loop through the buffer range to include surrounding chunks
  for (let x = -buffer; x <= buffer; x++) {
    for (let y = -buffer; y <= buffer; y++) {
      const chunkX = baseChunkX + (x * gridSize);
      const chunkY = baseChunkY + (y * gridSize);
      const fileName = `chunk_x${chunkX}_y${chunkY}.js`;
      const filePath = pathJoin(outputDir, fileName);
      chunkFiles.push(filePath);
    }
  }

  return chunkFiles;
}

function pathJoin(dir, file) {
  // Ensure there is a slash between the dir and file parts
  if (dir.endsWith('/')) {
    return dir + file;
  } else {
    return dir + '/' + file;
  }
}
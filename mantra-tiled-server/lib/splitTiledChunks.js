import fs from 'fs';
import path from 'path';

// Function to read the Tiled .tmj file
function loadTiledMap(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Function to save a chunk as a JS file
function saveChunkAsJS(chunk, outputDir) {
  const fileName = `chunk_x${chunk.x}_y${chunk.y}.js`;
  const filePath = path.join(outputDir, fileName);
  const content = `export const chunk = ${JSON.stringify(chunk)};`;
  fs.writeFileSync(filePath, content);
}

// Main function to process the .tmj file and split into chunks
export default function splitTiledChunks(tiledMap, outputDir) {

  tiledMap.layers.forEach(layer => {
    if (layer.chunks) {
      layer.chunks.forEach(chunk => {
        saveChunkAsJS(chunk, outputDir);
      });
    }
  });
}

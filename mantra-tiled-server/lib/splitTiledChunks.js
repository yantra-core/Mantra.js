import fs from 'fs';
import path from 'path';

// Function to read the Tiled .tmj file
function loadTiledMap(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

let colorsArray = [0x00ff00, 0xff0000, 0x0000ff, 0xffff00, 0x00ffff, 0xff00ff];

// Function to save a chunk as a JS file
function saveChunkAsJS(chunk, outputDir) {
  const fileName = `chunk_x${chunk.x}_y${chunk.y}.js`;
  console.log('fileNamefileName', fileName)
  let chunkKey = `chunk_x${chunk.x}_y${chunk.y}`;
  const filePath = path.join(outputDir, fileName);
  //
  // Adds a random color to each chunk for debugging ( for now )
  //
  chunk.color = colorsArray.pop();  // pop color from array, assign to chunk
  colorsArray.unshift(chunk.color);  // unshift color back into array

  let content = `game.data.chunks['${chunkKey}'] = ${JSON.stringify(chunk)};`;
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

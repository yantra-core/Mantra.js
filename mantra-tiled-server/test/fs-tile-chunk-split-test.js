import tap from 'tap';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import splitTiledChunks from "../lib/splitTiledChunks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testTiledMapPath = __dirname + '/../infinite.tmj'; // Sample .tmj file path for testing
const testOutputDir = __dirname + '/../chunks'; // Directory for test output

// Function to read the Tiled .tmj file
function loadTiledMap(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

tap.test('tiledChunks integration test', async t => {
  // Ensure the output directory exists
  if (!fs.existsSync(testOutputDir)) {
    fs.mkdirSync(testOutputDir, { recursive: true });
  }

  // Load the tiled map
  const tiledMap = loadTiledMap(testTiledMapPath);

  // Process the tiled map
  splitTiledChunks(tiledMap, testOutputDir);

  // Check if files are created
  tiledMap.layers.forEach(layer => {
    if (layer.chunks) {
      layer.chunks.forEach(chunk => {
        const chunkKey = `chunk_x${chunk.x}_y${chunk.y}`;
        const expectedFilePath = path.join(testOutputDir, `${chunkKey}.js`);
        t.ok(fs.existsSync(expectedFilePath), `File should exist: ${expectedFilePath}`);
        
        // Read and verify file content
        const content = fs.readFileSync(expectedFilePath, 'utf8');
        const expectedContentPattern = new RegExp(`game\\.data\\.chunks\\['${chunkKey}'\\] =`);
        t.match(content, expectedContentPattern, 'File content should match expected format');
      });
    }
  });

  t.end();
});

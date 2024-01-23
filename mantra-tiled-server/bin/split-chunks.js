import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import splitTiledChunks from "../lib/splitTiledChunks.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Function to read the Tiled .tmj file
function loadTiledMap(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

let outputDirectory = path.join(__dirname, '../chunks');
let tmjFileName = 'infinite.tmj';
let tmjFilePath = path.join(__dirname, '../', tmjFileName);
// Load your Tiled map
const tiledMap = loadTiledMap(tmjFilePath);

console.log('tiledMap', tiledMap, outputDirectory);

splitTiledChunks(tiledMap, outputDirectory);

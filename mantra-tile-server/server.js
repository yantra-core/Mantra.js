import express from 'express';
import fs from 'fs';
import tileQuery from './lib/tileQuery.js';
const app = express();
const port = 3000;

// Function to read the Tiled .tmj file
function loadTiledMap(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Load your Tiled map
const tiledMap = loadTiledMap('infinite.tmj');

// Endpoint to get tile data
app.get('/tiles', (req, res) => {
  let x = parseInt(req.query.x, 10);
  let y = parseInt(req.query.y, 10);
  let width = parseInt(req.query.width, 10);
  let height = parseInt(req.query.height, 10);

  // Set default values if parameters are undefined
  x = isNaN(x) ? 0 : x;
  y = isNaN(y) ? 0 : y;
  width = isNaN(width) ? 32 : width;
  height = isNaN(height) ? 32 : height;

  let tiles = tileQuery(tiledMap, { x, y, width, height})
  res.json(tiles);;

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

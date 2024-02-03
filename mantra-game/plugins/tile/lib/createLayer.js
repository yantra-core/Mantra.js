//
// createLayer.js - Will process the entire TileMap.data array and create the tiles for the layer
//
export default function  createLayer(layer, tileWidth, tileHeight) {
  // Check if the layer.data is a 3D array
  if (typeof layer.data[0] === 'object') {
    // 3D data handling
    layer.data.forEach((layer2D, z) => {
      layer2D.forEach((tileValue, index) => {
        let customZ = false;
        if (z > 0) {
          customZ = true;
        }
        this.processTile(tileValue, index, layer, tileWidth, tileHeight, z, customZ);
      });
    });
  } else {
    // 2D data handling
    layer.data.forEach((tileValue, index) => {
      this.processTile(tileValue, index, layer, tileWidth, tileHeight, 0); // Assume z=0 for 2D data
    });
  }
}
export default function  createLayer(layer, tileWidth, tileHeight) {

  // Check if the layer.data is a 3D array
  if (typeof layer.data[0] === 'object') {
    // 3D data handling
    layer.data.forEach((layer2D, z) => {
      layer2D.forEach((tile, index) => {
        this.processTile(tile, index, layer, tileWidth, tileHeight, z);
      });
    });
  } else {
    // 2D data handling
    layer.data.forEach((tile, index) => {
      this.processTile(tile, index, layer, tileWidth, tileHeight, 0); // Assume z=0 for 2D data
    });
  }
}

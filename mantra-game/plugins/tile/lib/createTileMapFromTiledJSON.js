export default function createTileMapFromTiledJSON(tiledJSON) {
  // TODO: remove this line
  if (typeof window !== 'undefined') {
    let overlay = document.getElementById('drag-and-drop-file-upload-overlay');
    // set hidden
    overlay.style.display = 'none';
  }
  tiledJSON.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {

      if (layer.chunks) {
        layer.chunks.forEach(chunk => {
          this.createLayer(chunk, tiledJSON.tilewidth, tiledJSON.tileheight);
        });
      } else {
        this.createLayer(layer, tiledJSON.tilewidth, tiledJSON.tileheight);
      }

    }
  });
}
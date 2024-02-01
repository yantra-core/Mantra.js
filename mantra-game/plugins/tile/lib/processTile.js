export default function processTile(tile, index, layer, tileWidth, tileHeight, depth) {
  if (typeof tile === 'number') {
    // Find id = tile in tileKinds
    let tileId = tile;
    let tileKind = this.tileKinds.find(tileKind => tileKind.id === tileId);
    if (tileKind) {
      tile = tileKind;
    } else {
      tile = this.tileKinds[3]; // Default tile kind if not found
    }
  }

  let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, depth);
  if (tile === null) {
    //return;
  }
  // allow tile.z to override z ( useful for blocks / layers / etc )
  if (typeof tile.z !== 'number') {
    tile.z = z;
  }
  tile.z = z;

  // TODO: check to see if existing tile exsting at this slot?
  this.createTile(tile, x, y, z, tileWidth, tileHeight, layer.color);

}
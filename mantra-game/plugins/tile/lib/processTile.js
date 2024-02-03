// processTile.js - This function will take a tileValue ( Tile.id ) with index / tileWidth / tileHeight / depth and create a tile
//                  at the correct position in the game world 
export default function processTile(tileValue, index, layer, tileWidth, tileHeight, tileDepth) {

  let tile;
  // If the tileValue is a number as this point, it's an id of a tile kind ( TileSet )
  // look up the tile kind and use that as the tile
  if (typeof tileValue === 'number') {
    // Find id = tile in tileKinds
    let tileId = tileValue;
    let tileKind = this.tileKinds.find(tileKind => tileKind.id === tileId);
    if (tileKind) {
      tile = tileKind;
    } else {
      // Default tile kind if not found
      tile = this.tileKinds[3];
    }
  } else {
    console.log('Warning: tileValue was not a number. This should not happen:', tileValue);
    return;
  }

  //
  // We need to take the relative tile coordinates and convert them world coordinates
  //
  if (typeof tileDepth !== 'number') {
    tileDepth = tileHeight;
  }

  let { x, y, z } = this.calculateTilePosition(index, layer, tileWidth, tileHeight, tileDepth);

  // TODO: check to see if existing tile exsting at this slot?
  this.createTile(tile, x, y, z, tileWidth, tileHeight, tileDepth, layer.color);

} 
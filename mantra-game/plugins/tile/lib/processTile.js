// processTile.js - This function will take a tileValue ( Tile.id ) with index / tileWidth / tileHeight / depth and create a tile
//                  at the correct position in the game world 
export default function processTile(tileValue, index, layer, tileWidth, tileHeight, tileDepth, customDepth = false) {

  // TODO: we currently always pull from `Tile.tileSet`, which is active default
  //       we can add logic for checking `Tile.tileSets[key]` if we have multiple tileSets 
  let tile;
  let tileSet = this.tileSet;

  if (layer.tileSet && layer.tileSet.length > 0) {
    tileSet = layer.tileSet;
  }

  // console.log('did layer find tile', layer.tileSet)

  // If the tileValue is a number as this point, it's an id of a tile kind ( TileSet )
  // look up the tile kind and use that as the tile
  if (typeof tileValue === 'number') {
    // Find id = tile in tileSet
    // perform direct lookup based on tile value
    tile = tileSet[tileValue];

    if (!tile) {
      tile = tileSet[0]; // was previously 3
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
  // console.log('processTile.js: x, y, z:', tile, x, y, z);
  // TODO: check to see if existing tile exsting at this slot?
  tile.layer = layer; // for now
  this.createTile(tile, x, y, z, tileWidth, tileHeight, tileDepth, layer.color, customDepth);

} 
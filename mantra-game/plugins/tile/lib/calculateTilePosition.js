export default function calculateTilePosition(index, layer, tileWidth, tileHeight, tileId) {
  // Calculate the tile's local position within the layer (relative to the layer's top-left corner)
  let localX = (index % layer.width) * tileWidth;
  let localY = Math.floor(index / layer.width) * tileHeight;

  // Calculate the center of the layer in pixel coordinates
  let layerCenterX = layer.width * tileWidth / 2;
  let layerCenterY = layer.height * tileHeight / 2;

  // Convert local positions to pixel values and add the layer's offset
  // Adjusted to start from the center (0,0)
  let mapX = localX - layerCenterX + (layer.x * tileWidth);
  let mapY = localY - layerCenterY + (layer.y * tileHeight);

  // Calculate the absolute position of the tile in the game world
  let x = mapX;
  let y = mapY;
  let z = tileId === 1 ? 0 : -1;  // Adjust z based on your game's logic

  return { x, y, z };
}
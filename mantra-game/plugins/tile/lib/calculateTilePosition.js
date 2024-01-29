export default function calculateTilePosition(index, layer, tileWidth = 16, tileHeight = 16, z = 0, depth = 1) {
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
  
  // Use the z parameter to calculate the depth position
  // 'depth' is the total depth of the map, used to calculate the offset for each layer
  let zOffset = z * (tileHeight / depth); // Example calculation for z position, adjust as needed
  return { x, y, z: zOffset };
}
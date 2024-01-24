export default function generateRandomChunkWithPaths(chunkKey, tileKinds) {
  let chunkData = [];
  const totalWeight = tileKinds.reduce((acc, tileType) => acc + tileType.weight, 0);

  // Determine if this chunk should have a path, and if so, get the pattern
  const hasPath = Math.random() < 0.5; // 50% chance to have a path
  let pathPattern = hasPath ? randomPathPattern(this.chunkUnitSize) : null;

  // Variables to control path color consistency
  let currentPathColor = Math.random() < 0.5 ? 'path-green' : 'path-brown'; // Initial path color
  let colorSwitchThreshold = 3; // Number of tiles before color switch
  let colorCounter = 0; // Counter for the current color

  for (let i = 0; i < this.chunkUnitSize * this.chunkUnitSize; i++) {
    let tile;
    if (hasPath && pathPattern.has(i)) {
      tile = { kind: currentPathColor };
      colorCounter++;
      // Switch color if the threshold is reached
      if (colorCounter >= colorSwitchThreshold) {
        currentPathColor = currentPathColor === 'path-green' ? 'path-brown' : 'path-green';
        colorCounter = 0; // Reset counter after switching
      }
    } else {
      tile = this.randomTileFromDistribution(tileKinds, totalWeight);
    }
    chunkData.push(tile);
  }

  let randomIntColor = Math.floor(Math.random() * 16777215);
  return {
    data: chunkData,
    height: this.chunkUnitSize,
    width: this.chunkUnitSize,
    color: randomIntColor,
    x: this.extractChunkCoordinates(chunkKey).x,
    y: this.extractChunkCoordinates(chunkKey).y
  };
}

function randomPathPattern(size) {
  // Example implementation: Create a simple straight horizontal path
  let pathSet = new Set();
  let row = Math.floor(Math.random() * size); // Random row for the path
  for (let i = 0; i < size; i++) {
    pathSet.add(row * size + i);
  }
  return pathSet;
}

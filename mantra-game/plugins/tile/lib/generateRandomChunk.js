export default function generateRandomChunk(chunkKey, tileTypes) {
  let chunkData = [];
  const totalWeight = tileTypes.reduce((acc, tileType) => acc + tileType.weight, 0);

  for (let i = 0; i < this.chunkUnitSize * this.chunkUnitSize; i++) {
    let tile = this.randomTileFromDistribution(tileTypes, totalWeight);
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
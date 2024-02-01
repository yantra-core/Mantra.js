export default function handleChunkLoadFailure(chunkPath, chunkKey) {
  let labyrinthos = this.labyrinthos;
  // console.log("Fallback for failed load:", chunkPath, chunkKey);

  // Call the procedural generation function
  if (this.proceduralGenerateMissingChunks) {

    // console.log('Generating random chunk', chunkKey)

    let randomChunk;
    let chunkCoordinates = this.extractChunkCoordinates(chunkKey);

    //console.log('chunkCoordinates', chunkCoordinates)
    //console.log('current map data', this.tiledMap)

    let x = chunkCoordinates.x;
    let y = chunkCoordinates.y;

    // this will eventually call Tile.createLayer()
    // certain incoming tileMap options will require custom logic to re-inflate the map
    // with correct seed and algo configurations
    let map = this.createTileMap({
      x: x,
      y: y,
      width: 8,
      height: 8,
      tileWidth: 16,
      tileHeight: 16,
      algo: this.labyrinthosAlgoName,
      seed: chunkKey
    });

    randomChunk = map;

    // console.log('randomChunk', chunkKey, randomChunk.data.length)
    this.game.data.chunks[chunkKey] = randomChunk;
    
  }

}
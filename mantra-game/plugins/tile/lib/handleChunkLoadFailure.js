// TODO: move most of the processing logic in this file to dedicated infinite chunk generators / tiled-server code
export default function handleChunkLoadFailure(chunkPath, chunkKey) {
  let labyrinthos = this.labyrinthos;
  // console.log("Fallback for failed load:", chunkPath, chunkKey);

  // Call the procedural generation function
  if (this.proceduralGenerateMissingChunks) {

    // console.log('Generating random chunk', chunkKey)

    let randomChunk;
    let chunkCoordinates = this.extractChunkCoordinates(chunkKey);

    // console.log('chunkCoordinates', chunkCoordinates)
    //console.log('current map data', this.tiledMap)

    let x = chunkCoordinates.x;
    let y = chunkCoordinates.y;

    // do not regen 0,0 ( for now )
    if (x === 0 && y === 0) {
      return;
    }

    // this will eventually call Tile.createLayer()
    // certain incoming tileMap options will require custom logic to re-inflate the map
    // with correct seed and algo configurations
    let map = this.createTileMap({
      x: x,
      y: y,
      width: this.chunkUnitSize,
      height: this.chunkUnitSize,
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
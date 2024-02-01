export default function handleChunkLoadFailure(chunkPath, chunkKey) {
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

    // TODO: subsection query, continious map
    //let subsection = this.tiledMap.query({ x: x, y: y, width: this.chunkUnitSize, height: this.chunkUnitSize });
    let map = new labyrinthos.TileMap({
      x: x,
      y: y,
      width: 8,
      height: 8,
      tileWidth: 16,
      tileHeight: 16
    });
    map.fill(1);

    // map.seed(this.labySeed);
    map.seed(chunkKey);

    // labyrinthos.mazes.RecursiveBacktrack(map, {});
    // labyrinthos.mazes.SpiralBacktrack(map, {});
    // labyrinthos .mazes.RecursiveDivision(map, {});
    // labyrinthos.terrains.DiamondSquare(map, {});
    // map.seed(4121);
    console.log('using fallback generator', this.labyrinthosAlgoName)

    this.labyrinthosAlgo(map, {});

    if (this.labyType === 'terrain') {
      // TODO: remove this
      map.scaleToTileRange(6);
    }
    // console.log('map', map)

    randomChunk = map;

    // console.log('randomChunk', chunkKey, randomChunk.data.length)
    this.game.data.chunks[chunkKey] = randomChunk;
    this.game.systems.tile.createLayer(this.game.data.chunks[chunkKey], this.tileSize, this.tileSize);
  }
}
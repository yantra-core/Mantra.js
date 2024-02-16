
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  plugins: ['RBush', 'Tile'], // RBush is required for Field of View
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  let tileMap = new game.TileMap({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    tileWidth: 16, // TODO: tileSet.tilewidth
    tileHeight: 16 // TODO: tileSet.tileheight
  });

  // file entire tilemap with grass
  tileMap.fill(2);

  tileMap.seed(12345);

  let tileset = new game.TileSet({
    tiles: [
      { id: 0, name: 'grass' },
      { id: 1, name: 'bush', body: true, isStatic: true }, // optional metadata properties
      { id: 2, name: 'tree' },
      { id: 3, name: 'block', body: true },
      { id: 4, name: 'path-green' },
      { id: 5, name: 'path-brown' }
    ]
  });

  // Create a new biome with the tileset and distribution
  let forest = new game.Biome({
    name: 'forest',
    tileset: tileset,
    distribution: {
      // create a spread by tile name
      'grass': 0.5,
      'bush': 0,
      'tree': 0.15,
      'block': 0,
      'path-green': 0.2,
      'path-brown': 0.2
    }
  });
  console.log('forest', forest);

  // Generate a map with Perlin Noise
  game.terrains.PerlinNoise(tileMap, {});

  // Apply the biome to the map
  tileMap.applyBiome(forest);

  // replace all 0 with 1 ( for now, later use custom tile sets )
  tileMap.data = tileMap.data.map((tile) => {
    if (tile === 0) {
      return 1;
    }
    return tile;
  });
  
  console.log("tileMap", tileMap)

  game.systems.tile.createLayer(tileMap, 16, 16)

});
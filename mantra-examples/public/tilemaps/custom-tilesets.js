
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  camera: 'follow',
  defaultMovement: true,
  plugins: ['RBush', 'Tile', 'Bullet', 'Gamepad', 'GamepadGUI'], // RBush is required for Field of View
  useFoV: true,
});

game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  let tileMap = new game.TileMap({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    //depth: parseInt(tileMap.depth),
    tileWidth: 16, // TODO: tileSet.tilewidth
    tileHeight: 16 // TODO: tileSet.tileheight
  });

  // file entire tilemap with grass
  tileMap.fill(2);
  tileMap.seed('123456');

  function bushCollision(a, b) {
    let bush = a.name === 'bush' ? a : b;
    game.removeEntity(bush.id);
  }

  let tileset = new game.TileSet({
    tiles: [
      { id: 1, name: 'grass',  texture: 'demon', body: true, isStatic: true, collisionStart: bushCollision }, // optional metadata properties
      { id: 2, name: 'bush',  texture: 'tile-bush', body: true, isStatic: true, collisionStart: bushCollision }, // optional metadata properties
      { id: 3, name: 'tree', texture: 'tile-entrance' },
      { id: 4, name: 'block', body: true },
      { id: 5, name: 'path-green' },
      { id: 6, name: 'path-brown' }
    ]
  });

  // TODO: remove this, cleanup TileMap API
  game.systems.tile.tileSet = tileset.tiles;

  // Create a new biome with the tileset and distribution
  let forest = new game.Biome({
    name: 'forest',
    seed: 1234,
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

  
  console.log("tileMap", tileMap)

  game.systems.tile.createLayer(tileMap, 16, 16)

});

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


  let tileMapConfig = game.make().TileMap({
    tileData: [], // this is the tileData array from wherever ( LABY )
  });

  let teleporterConfig = game.make().Teleporter({
    destination: {
      plugin: 'Level-2',
    }
  })
  .texture('tile-exit')
  .build();

  // manually map 6, exit tile
  teleporterConfig.id = 6;
  let exitTileConfig = teleporterConfig;
  // constructions options or can be configured at runtime
  tileMapConfig.meta({
    tileSet: [ // this is the tileSet array from wherever ( LABY )
      { id: 0, kind: 'empty' },
      { id: 1, kind: 'wall', texture: 'tile-bush', body: true, isStatic: true, customZ: true, z: 16 /* size: { depth: 32 } */ },
      { id: 2, kind: 'grass' },
      { id: 3, kind: 'block', type: 'BLOCK', body: true, z: 16 },
      { id: 4, kind: 'path-green' },
      { id: 5, kind: 'entrance', texture: 'tile-entrance' },
      exitTileConfig, // <--- tile id value 6 is the exit tile
    ], 
  });

  // we map the tileSet to some actions




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
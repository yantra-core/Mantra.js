let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  camera: 'follow',
  plugins: ['TileMap', 'TileSet', 'Bullet', 'Block', 'Boomerang', 'Teleporter']
});
game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  // A Tile config can be any Entity, create a simple block
  let blockTileConfig = game.make().Block().body(true).size(16).build();

  // Construct the TileMap config
  let tileMap = game.make().TileMap({
    tileMapWidth: 6,
    tileMapHeight: 4,
    tileSize: 16,
    // TileMap.data array of integers ( see: Labyrinthos.js )
    data: [
      1,1,1,1,1,1,
      0,0,0,2,0,0,
      1,0,0,2,0,0,
      1,1,1,1,1,1,
    ],
    // tileSet can also be a `.TileSet()` builder config
    tileSet: [
      { id: 0, texture: 'tile-grass' }, // each item is an Entity builder config
      { id: 1, texture: 'tile-bush', body: true, isStatic: true}, // supports all Entity builder config options
      { id: 2, texture: 'tile-block', ...blockTileConfig },
    ],
  }).position(-100, 0);
  
  // Create the TileMap entity
  tileMap.createEntity();

  // Use Entity Builder to create a TileMap with TileSet
  let ent = game.make();

  // Create a TileSet config ( slightly scaled up from the previous example )
  ent.TileSet({
    tileSet: [
      { id: 0, texture: 'tile-grass' }, // each item is an Entity builder config
      { id: 1, texture: 'tile-bush', body: true, isStatic: true },
      { id: 2, texture: 'tile-block', body: true, type: 'BLOCK' },
    ],
  });

  ent.TileMap({
    position: {
      x: 100,
      y: 0
    },
    x: 0, // Remark: This will place tile map in TileMap units, not pixel
    y: 0, // Actual values will be x * 16, y * 16
    tileMapWidth: 4,
    tileMapHeight: 4,
    tileWidth: 32,
    tileHeight: 32,
    tileDepth: 32,
    data: [
      1,1,1,1,
      1,0,0,1,
      1,0,2,1,
      1,1,1,1,
    ]
  });
  
  ent.createEntity();
  
  // teleports to the next example
  game.make().Teleporter({
    url: 'https://yantra.gg/mantra/examples/tilemaps/tile-collisions',
  }).position(200, 0).createEntity()

});
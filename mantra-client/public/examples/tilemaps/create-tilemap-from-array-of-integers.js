
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  camera: 'follow',
  plugins: ['TileMap', 'TileSet', 'Bullet', 'Block', 'Boomerang'],
  gameRoot: 'http://192.168.1.80:7777',
});
game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  let blockConfig = game.build().Block().build();

  // Construct the TileMap config
  let tileMap = game.build().TileMap({
    tileMapWidth: 6,
    tileMapHeight: 4,
    tileSize: 16,
    tileSet: [ // tileSet can also be a `.TileSet()` builder config
      { id: 0, texture: 'tile-grass' }, // each item is an Entity builder config
      { id: 1, texture: 'tile-bush', body: true, isStatic: true},
      { id: 2, texture: 'tile-block',  body: true, type: 'BLOCK' },
    ],
    data: [
      1,1,1,1,1,1,
      0,0,0,2,0,0,
      1,0,0,2,0,0,
      1,1,1,1,1,1,
    ]
  }).position(-100, 0);
  
  // Create the TileMap entity
  tileMap.createEntity();


  // Use Entity Builder to create a TileMap with TileSet
  let ent = game.build();

  // Create a TileSet config
  ent.TileSet({
    tileSet: [
      { id: 0, texture: 'tile-grass' }, // each item is an Entity builder config
      { id: 1, texture: 'tile-bush', body: true, isStatic: true},
      { id: 2, texture: 'tile-block', body: true },
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
      1,0,0,1,
      1,1,1,1,
    ]
  });
  
  ent.createEntity();
  
});
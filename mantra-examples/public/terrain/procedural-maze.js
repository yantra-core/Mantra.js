
let game = new MANTRA.Game({
  width: 400,
  height: 300,
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  plugins: ['Tile', 'Player'], // RBush is required for Field of View
});
game.start(function () {

  game.make().Player().position(0, 0, 16).createEntity();

  let tileMap = new game.TileMap({
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    seed: 1234,
    //depth: parseInt(tileMap.depth),
    tileWidth: 16, // TODO: tileSet.tilewidth
    tileHeight: 16 // TODO: tileSet.tileheight
  });
  tileMap.fill(2);

  // Supports all options from Labyrinthos.js
  // See: https://github.com/yantra-core/Labyrinthos.js
  game.mazes.AldousBroder(tileMap, {});

  console.log("tileMap", tileMap)
  game.systems.tile.createLayer(tileMap, 16, 16)

  game.setBackground('black');
});
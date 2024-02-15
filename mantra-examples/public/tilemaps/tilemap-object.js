
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  plugins: ['Tile'], // RBush is required for Field of View
  gameRoot: 'http://192.168.1.80:7777/'
});
game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  //
  // Creating a TileMap can be done at the lowest-level using arrays of integers
  //

  // TODO: have this be new game.TileMap({ ... })
  let tileMap = {
    x: 20, // Remark: This will place tile map in TileMap units, not pixed
    y: -6, // Actual values will be x * 16, y * 16
    width: 16,
    height: 16,
    seed: 1234,
    algo: 'AldousBroder'
  };

  game.systems.tile.tileMap = tileMap
  game.systems.tile.createTileMap(tileMap);

});
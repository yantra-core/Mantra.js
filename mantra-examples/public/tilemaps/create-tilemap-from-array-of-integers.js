
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  plugins: ['Tile'], // RBush is required for Field of View
});
game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

  //
  // Creating a TileMap can be done at the lowest-level using arrays of integers
  //
  let tileMap = {
    x: 2, // Remark: This will place tile map in TileMap units, not pixel
    y: 2, // Actual values will be x * 16, y * 16
    width: 4,
    height: 4,
    tileSize: 16,
    data: [
      1,1,1,1,
      1,1,1,1,
      1,1,1,1,
      1,1,1,1,
    ]
  };

  game.systems.tile.createLayer(tileMap, tileMap.tileSize, tileMap.tileSize)

});
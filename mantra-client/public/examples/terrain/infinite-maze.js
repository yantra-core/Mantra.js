
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  width: 400,
  height: 300,
  plugins: ['RBush', 'Bullet'], // RBush is required for Field of View
  /*
    fieldOfView- Field of View distance can be set in the constructor or after construction
  */
  fieldOfView: 96,
  /*
    useFoV- Field of View can be turned on or off in the constructor or after construction
  */
  useFoV: true,
  camera: 'follow'
});

game.use('Tile', {
  proceduralGenerateMissingChunks: true
});


game.start(function () {
  game.zoom(2.5);
  game.createPlayer();

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

  tileMap.fill(1);

  // Supports all options from Labyrinthos.js
  // See: https://github.com/yantra-core/Labyrinthos.js
  game.mazes.RecursiveDivision(tileMap, {});

  // TODO: fix TileMap API
  game.systems.tile.labyrinthosAlgoName = 'RecursiveDivision';

  console.log("tileMap", tileMap)

  game.systems.tile.createLayer(tileMap, 16, 16);

  game.setBackground('#000000');

});

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  /*
    fps - Frames per second can be set at construction
  */
  fps: 20,
  defaultMovement: true,
  plugins: ['Bullet', 'Boomerang'],
});

game.start(function () {
  game.createPlayer();
  game.createBorder();
});

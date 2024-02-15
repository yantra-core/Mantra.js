
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  /*
    fps - Frames per second can be set at construction
  */
  fps: 20,
  defaultMovement: true,
  plugins: ['Bullet', 'Boomerang'],
  gameRoot: 'http://192.168.1.80:7777/'
});

game.start(function () {
  game.createPlayer();
  game.createBorder();
});

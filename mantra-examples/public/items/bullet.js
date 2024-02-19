let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  defaultMovement: true, // adds movement to player
  virtualGamepad: false, // adds virtual gamepad to player
  plugins: ['Block', 'Border'], // plugins at construction
});

game.use('Bullet'); // plugins at runtime

// TODO: demos should have simple control mappings with Sutra, no default mappings
game.start(function () {
  game.setBackground('#000000');

  game.on('pointerDown', function (event) {
    game.systems.bullet.fireBullet(game.data.ents.PLAYER[0].id);
  });

  game.createPlayer({
    rotation: Math.PI / 2 // player aims to the right
  });

  // create a few entities in a straight line to shoot
  game.build()
    .Block()
    .position(100, 0, 0)
    .offset(48)
    .repeat(11)
    .createEntity();

});
window.game = game;

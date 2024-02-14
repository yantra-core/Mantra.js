let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true, // adds movement to player
  virtualGamepad: false, // adds virtual gamepad to player
  plugins: ['Border', 'Bullet'], // plugins at construction
});

game.use('Block'); // plugins at runtime

// TODO: demos should have simple control mappings with Sutra, no default mappings
game.start(function () {
  game.setBackground('#000000');

  game.on('pointerDown', function (event) {
    game.systems.bullet.fireBullet(game.data.ents.PLAYER[0].id);
  });

  game.createPlayer({
    rotation: Math.PI / 2 // player faces right
  });

  // create a few entities to shoot, aligned horizontally in front of the gun
  let entities = [];
  let startPosition = { x: 100, y: 0 };
  let blockSpacing = 60; // Adjust as needed for spacing between blocks
  for (let i = 0; i < 10; i++) {
    let entity = game.createEntity({
      type: 'BLOCK',
      size: {
        width: 50,
        height: 50
      },
      hasCollisionStart: true,
      position: {
        x: startPosition.x + (i * blockSpacing), // Position blocks in a line to the right of the gun
        y: startPosition.y // Align blocks vertically with the gun
      }
    });
    entities.push(entity);
  }


});
window.game = game;

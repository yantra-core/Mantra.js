let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultPlayer: true,   // creates a player
  defaultMovement: true, // adds movement to player
  virtualGamepad: false, // adds virtual gamepad to player
  
});

game.use('Block');
game.use('Boomerang');

game.start(function () {
  game.setBackground('#000000');

  game.on('pointerDown', function (event) {
    game.systems.boomerang.throwBoomerang(game.data.ents.PLAYER[0].id);
  });

  // create a few entities to shoot, aligned horizontally in front of the gun
  let entities = [];
  let startPosition = { x: 100, y: 100 };
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

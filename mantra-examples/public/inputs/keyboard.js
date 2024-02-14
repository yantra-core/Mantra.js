let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultPlayer: true,
  defaultMovement: true, // adds movement to player
  plugins: ['Block', 'Border'], // plugins at construction
  gameRoot: 'http://192.168.1.80:7777'
});

game.use('Bullet'); // plugins at runtime

// TODO: demos should have simple control mappings with Sutra, no default mappings
game.start(function () {
  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createBorder();

  game.on('keydown', function (event) {
    game.createEntity({
      type: 'TEXT',
      width: 70,
      lifespan: 2000,
      height: 50,
      color: 0xffffff,
      text: `${event.key}`,
      position: {
        x: 0,
        y: -100
      },
      velocity: {
        x: 0,
        y: -4
      },
    });
  });

  game.on('pointerMove', function (entity, event) {
    // game.systems.bullet.fireBullet(game.data.ents.PLAYER[0].id, event);
    console.log('pointerMove', entity, event);
    game.updateEntity(mouseInfo.id, {
      text: `entity: ${entity.id} x: ${event.x}, y: ${event.y}`
    });
  });

  let mouseInfo = game.createEntity({
    type: 'TEXT',
    width: 500,
    height: 50,
    color: 0xffffff,
    text: 'Click and drag to shoot'
  })

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

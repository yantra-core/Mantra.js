let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultPlayer: true,
  defaultMovement: true, // adds movement to player
  plugins: ['Block', 'Border'], // plugins at construction
});

game.use('Bullet'); // plugins at runtime

// TODO: demos should have simple control mappings with Sutra, no default mappings
game.start(function () {
  game.setBackground('#000000');
  game.setZoom(1)
  game.on('pointerDown', function (entity, event) {
    game.systems.bullet.fireBullet(game.data.ents.PLAYER[0].id);
    console.log(event)
    game.updateEntity(game.data.ents.PLAYER[0].id, {
      position: {
        x: event.x,
        y: event.y
      }
    });


  });

  game.on('pointerMove', function (entity, event) {
    // game.systems.bullet.fireBullet(game.data.ents.PLAYER[0].id, event);
    console.log('pointerMove', entity, event);
    game.updateEntity(mouseInfo.id, {
      text: `entity: ${entity.id} x: ${event.x}, y: ${event.y}`
    });
    // update player to mouse position
    console.log('eeee', event.x, event.y)
    console.log(game.data.camera.position)
    /*
    game.updateEntity(game.data.ents.PLAYER[0].id, {
      position: {
        x: game.data.camera.position.x + event.x,
        y: game.data.camera.position.y + event.y
      }
    });
    */
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

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  //defaultPlayer: true,
  //defaultMovement: true, // adds movement to player
  plugins: ['Block', 'Border', 'Lifetime'], // plugins at construction
});

game.use('Bullet'); // plugins at runtime

// TODO: demos should have simple control mappings with Sutra, no default mappings
game.start(function () {
  game.setBackground('#000000');
  game.setZoom(1)
  game.createBorder();
  game.setGravity(0, 2);
  game.on('pointerDown', function (position, event) {
    let worldX = position.x, worldY = position.y;
    // Create entity at this location in the world
    game.createEntity({
      color: 0xffffff,
      size: {
        width: 100,
        height: 100
      },
      lifetime: 1000,
      position: {
        x: worldX,
        y: worldY,
        z: 1
      },
    });
  });

  game.on('pointerMove', function (position, event) {
    let text = `
      x: ${position.x}
      y: ${position.y}
    `;
    game.updateEntity(mouseInfo.id, {
      text: text
    });
  });

  let mouseInfo = game.createEntity({
    type: 'TEXT',
    body: false,
    size: {
      width: 500,
      height: 500,
    },
    hasCollisionStart: true,

    position: {
      x: 100,
      y: 100,
      z: 1
    },
    color: 0xffffff,
    text: '',
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    }
  })

  game.createEntity({
    type: 'TEXT',
    body: false,
    size: {
      width: 500,
      height: 100,
    },
    hasCollisionStart: true,

    position: {
      x: 50,
      y: -200,
      z: 1
    },
    color: 0xffffff,
    text: 'Click to create entities',
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    }
  })

});
window.game = game;
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  defaultPlayer: true,   // creates a player
  defaultMovement: true, // adds movement to player
  virtualGamepad: false, // adds virtual gamepad to player
  plugins: ['Block', 'Collectable'], // plugins at construction
});

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
  // TODO: make radial pattern around player to catch with boomerang
  for (let i = 0; i < 10; i++) {
    let entity = game.createEntity({
      type: 'BLOCK',
      size: {
        width: 32,
        height: 32
      },
      isSensor: true,
      collectable: true,
      position: {
        x: startPosition.x + (i * blockSpacing), // Position blocks in a line to the right of the gun
        y: startPosition.y // Align blocks vertically with the gun
      }
    });
    entities.push(entity);
  }

  game.createEntity({
    type: 'KEY',
    size: {
      width: 16,
      height: 8
    },
    // equippable: true,
    isSensor: true,
    collectable: true,
    //onCollect: true

    name: 'maze-door-0',
    texture: "ayyo-key",
    color: 0x00ff00,
    // container: 'laby-container',
    position: { // relative to the container
      x: -100,
      y: -30,
      z: 0
    }
  });

});
window.game = game;

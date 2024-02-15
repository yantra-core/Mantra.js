let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  defaultPlayer: true,
  defaultMovement: true, // adds movement to player
  plugins: ['Block', 'Border', 'Bullet', 'Boomerang', 'Gamepad'], // plugins at construction
});

// optional virtual gamepad GUI
game.use('GamepadGUI'); // plugins at runtime

game.start(function () {
  game.setBackground('#000000');
  game.createBorder();

  // create text, "Connect USB Gamepad to play"
  game.createEntity({
    type: 'TEXT',
    body: false,
    width: 700,
    height: 50,
    color: 0xffffff,
    text: `Connect USB Gamepad to play`,
    position: {
      x: 50,
      y: -100
    },
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

  // TODO: add status icon with gamepad image and game.on('gamepadconnected', function() { ... }
  
  // create a few entities to shoot, aligned horizontally in front of the gun
  let entities = [];
  let startPosition = { x: 100, y: 0 };
  let blockSpacing = 60; // Adjust as needed for spacing between blocks
  for (let i = 0; i < 5; i++) {
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

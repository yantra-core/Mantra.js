
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Gamepad', 'GamepadGUI'],
  defaultMovement: true,
  defaultPlayer: true
});

game.use('Block');
game.use('Border');
game.use('Bullet');

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');

  game.before('update', function () {
    if (game.tick % 70 === 0) {

      // set the camera to a random radial position
      let randomPosition = game.randomPositionRadial(0, 0, 300);

      game.setCameraPosition(randomPosition.x, randomPosition.y);

      game.updateEntity(text.id, {
        text: `Camera position: ${game.data.camera.offsetX.toFixed(3)}, ${game.data.camera.offsetY.toFixed(3)}`
      })
    }
  });

  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 11; i++) {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100,
      width: Math.random() * 100
    };
    // TODO: random shapes
    let entity = game.createEntity({
      color: randomColor,
      size: {
        width: 32,
        height: 32
      },
      hasCollisionStart: true,
      position: {
        // random positions start from top left corner
        x: Math.random() * -game.width / 4,
        y: Math.random() * -game.height / 4
      }
    });
    entities.push(entity.id);
  }

  // create text that says use WASD or Gamepad to move the camera
  let text = game.createText({
    text: `Camera position: ${game.data.camera.offsetX}, ${game.data.camera.offsetY}`,
    position: {
      x: 40,
      y: 50
    },
    body: false,
    size: {
      width: 500,
      height: 50,
    },
    color: 0xffffff,
    style: {
      backgroundColor: 'black',
      fontSize: '24px',
    }
  });

});
window.game = game;


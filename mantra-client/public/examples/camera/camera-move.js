
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Gamepad', 'GamepadGUI'],
  defaultMovement: false,
  defaultPlayer: true
});

game.use('Block');
game.use('Border');
game.use('Bullet');

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');

  let rules = game.rules;

  rules.if('W').then('MOVE_CAMERA', { x: 0, y: -10 });
  rules.if('S').then('MOVE_CAMERA', { x: 0, y: 10 });
  rules.if('A').then('MOVE_CAMERA', { x: -10, y: 0 });
  rules.if('D').then('MOVE_CAMERA', { x: 10, y: 0 });

  rules.if('DPAD_UP').then('MOVE_CAMERA', { x: 0, y: -10 });
  rules.if('DPAD_DOWN').then('MOVE_CAMERA', { x: 0, y: 10 });
  rules.if('DPAD_LEFT').then('MOVE_CAMERA', { x: -10, y: 0 });
  rules.if('DPAD_RIGHT').then('MOVE_CAMERA', { x: 10, y: 0 });

  rules.on('MOVE_CAMERA', function (data) {
    game.data.camera.offsetX += data.x;
    game.data.camera.offsetY += data.y;
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
    text: 'Use WASD or Gamepad to move Camera',
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


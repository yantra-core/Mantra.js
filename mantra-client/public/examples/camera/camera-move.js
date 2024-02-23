
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Player', 'Text', 'Gamepad', 'GamepadGUI'],
});

game.use('Block');
game.use('Border');
game.use('Bullet');

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');

  game.make().Player().createEntity();

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
    let randomPosition = {
      x: Math.random() * 100,
      y: Math.random() * 100 - 100
    };
    let entity = game.make()
      .color(randomColor)
      .size(32)
      .position(randomPosition.x, randomPosition.y)
      .createEntity();
    entities.push(entity.id);
  }

  let instructionText = game.make().Text()
    .text('Move Camera with: WASD, Middle Mouse Click, or Gamepad')
    .position(40, 50, -1)
    .body(false)
    .size(500, 50)
    .color('white')
    .style({
        backgroundColor: 'black',
        fontSize: '24px'
    })
    .createEntity();

});

//
//
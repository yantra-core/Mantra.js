
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Gamepad'],
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
    if (game.tick % 100 === 0) {
      game.shakeCamera(1000, 1);
    }
  });

  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 44; i++) {
    let randomColor = game.randomColor();
    let randomPosition = game.randomPositionRadial(0, 0, 300);
    let randomSize = {
      height: Math.random() * 100,
      width: Math.random() * 100
    };
    let entity = game.make()
    .color(randomColor)
    .size(16, 16)
    .position(randomPosition.x, randomPosition.y)
    .createEntity();

    entities.push(entity.id);
  }

});

//
//
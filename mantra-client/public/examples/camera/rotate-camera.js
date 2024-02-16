
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Gamepad', 'GamepadGUI'],
  defaultMovement: true,
  defaultPlayer: true,
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
      game.rotateCamera(50);
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
    let entity = game.createEntity({
      color: randomColor,
      size: {
        width: 16,
        height: 16
      },
      hasCollisionStart: true,
      position: {
        // random positions start from top left corner
        x: randomPosition.x,
        y: randomPosition.y
      }
    });
    entities.push(entity.id);
  }

  

});
window.game = game;


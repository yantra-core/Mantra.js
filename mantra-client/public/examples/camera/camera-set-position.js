
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Text', 'Gamepad'],
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
      game.updateEntity(cameraPositionText.id, {
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
    let entity = game.make()
      .color(randomColor)
      .size(32, 32)
      .position(Math.random() * -game.width / 4, Math.random() * -game.height / 4)
      .createEntity();

    entities.push(entity.id);
  }

  let cameraPositionText = game.make().Text()
    .text(`Camera position: ${game.data.camera.offsetX}, ${game.data.camera.offsetY}`)
    .position(40, 50)
    .body(false)
    .size(500, 50)
    .color('white')
    .style({
      backgroundColor: 'black',
      fontSize: '24px'
    })
    .createEntity();

});
window.game = game;


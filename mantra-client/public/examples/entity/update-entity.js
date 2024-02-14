let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

game.use('Block');
game.use('Border');
game.use('Bullet');

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 33; i++) {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100,
      width: Math.random() * 100
    };
    // TODO: random shapes
    let entity = game.createEntity({
      color: randomColor,
      size: randomSize,
      hasCollisionStart: true,
      position: {
        // random positions start from top left corner
        x: Math.random() * -game.width / 4,
        y: Math.random() * -game.height / 4
      }
    });
    entities.push(entity.id);
  }

  game.before('update', function () {
    if (game.tick % 22 === 0) {
      entities.forEach((entityId) => {
        let randomColor = game.randomColor();
        // TODO: fix size
        let randomSize = {
          height: Math.random() * 100,
          width: Math.random() * 100
        };
        game.updateEntity(entityId, { color: randomColor, size: randomSize });
      });
    }
  });

});
window.game = game;
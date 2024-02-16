let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
});

game.start(function () {
  game.createBorder();
  game.setBackground('#000000');

  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 22; i++) {
    let randomColor = game.randomColor();
    let entity = game.createEntity({
      color: randomColor,
      size: {
        width: 16,
        height: 16
      },
      hasCollisionStart: true,
      position: {
        // random positions start from top left corner
        x: Math.random() * -game.width / 2,
        y: Math.random() * -game.height / 2
      }
    });
    entities.push(entity);
  }

  game.after('update', function () {
    if (game.tick % 100) {
      entities.forEach((entity) => {
        game.applyForce(entity.id, { x: 0.01, y: 0.01 });
      });
    }
  });

});
window.game = game;

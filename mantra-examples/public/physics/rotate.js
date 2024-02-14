let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'http://192.168.1.80:7777',
});

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 33; i++) {
    let randomColor = game.randomColor();
    let entity = game.createEntity({
      color: randomColor,
      size: {
        width: 16,
        height: 48
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

  game.before('update', function () {
    if (game.tick % 100) {
      entities.forEach((entityId) => {
        //console.log('rotate', entityId)
        game.rotate(entityId, 1);
      });
    }
  });

});

window.game = game;
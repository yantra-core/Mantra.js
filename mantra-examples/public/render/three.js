async function start() {
  let game = new MANTRA.Game({
    defaultPlayer: false,
    graphics: ['three'], // array enum, 'babylon', 'css', 'three',
  });
  await game.start();
  
  // game.setZoom(2);

  game.setBackground('#000000');
  game.createBorder();

  let entities = [];
  
  // random position from center, could be + or -
  for (let i = 0; i < 22; i++) {
    let randomColor = game.randomColor();
    let entity = game.createEntity({
      color: randomColor,
      size: {
        width: 16,
        height: 16
      },
      isSensor: true,
      hasCollisionStart: true,
      position: {
        x: 0,
        y: 0
      }
    });
    entities.push(entity.id);
  }
  
  game.before('update', function () {
    if (game.tick % 16 === 0) {
      entities.forEach((entityId) => {
        // generate a random position within an area around 0,0 with distance of 284
        let randomPosition = game.randomPositionSquare(0, 0, 284);
        game.setPosition(entityId, { x: randomPosition.x, y: randomPosition.y });
      });
    }
  });
  window.game = game;


}

start();
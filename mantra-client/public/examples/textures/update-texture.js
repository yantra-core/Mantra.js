let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

async function start () {
  let textures = ['tile-block', 'tile-grass'];
  await game.start();
  game.createBorder();
  game.setBackground('#000000');
  let entities = [];
  for (let i = 0; i < 22; i++) {
    let randomColor = game.randomColor();
    let randomTexture = textures[Math.floor(Math.random() * textures.length)];
    let entity = game.createEntity({
      // color: randomColor,
      texture: randomTexture,
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

  // simple logic to apply force to entities on each 100 ticks
  game.before('update', function () {
    if (game.tick % 30 === 0) {
      entities.forEach((entity) => {
        let randomTexture = textures[Math.floor(Math.random() * textures.length)];
        game.updateEntity(entity.id, { texture: randomTexture });
      });
    }
  });

  window.game = game;
}
start();

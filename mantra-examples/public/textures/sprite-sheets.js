let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  
});

async function start () {
  let textures = ['tile-block', 'tile-grass'];
  await game.start();
  game.zoom(2.5);
  game.createBorder();
  game.setBackground('#000000');
  let entities = [];
  for (let i = 0; i < 11; i++) {
    let randomColor = game.randomColor();
    let entity = game.createEntity({
      // color: randomColor,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      },
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

  window.game = game;
}
start();


let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Block', 'Border', 'Bullet'], // plugins at construction
});

game.use('Lifetime'); // plugins at runtime

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 33; i++) {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100 + 10,
      width: Math.random() * 100 + 10
    };
    
    // TODO: random shapes
    let entity = game.createEntity({
      color: randomColor,
      size: randomSize,
      lifetime: 500 * i,
      position: {
        // random positions start from top left corner
        x: Math.random() * -game.width / 4,
        y: Math.random() * -game.height / 4
      }
    });
    entities.push(entity.id);
  }

});
window.game = game;
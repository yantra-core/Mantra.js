let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  // Plugins at construction
  plugins: ['Player', 'Key', 'Block', 'Collectable', 'Teleporter', 'Gamepad'],
  width: 400,
  height: 300
});

// Plugins at runtime
game.use('Boomerang'); // plugins at runtime
game.start(function () {

  // Boomerang action should be left click for demo
  game.config.mouseActionButton = 'LEFT';
  game.config.mouseMovementButton = 'RIGHT';
  game.reset();

  game.setBackground('#000000');
  game.make().Player().createEntity();

  for (let i = 0; i < 10; i++) {
    let randomRadial = game.radialSpread(0, 0, 100, 10, i);
    game.make().Key({
      position: randomRadial
    }).createEntity();  
  }

});

//
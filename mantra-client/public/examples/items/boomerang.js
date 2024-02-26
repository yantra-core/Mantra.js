let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  // Plugins at construction
  plugins: ['Player', 'Key', 'Block', 'Collectable', 'Teleporter', 'Gamepad']
});

// Plugins at runtime
game.use('Boomerang'); // plugins at runtime

game.start(function () {

  game.setBackground('#000000');
  game.setZoom(2.5);
  game.make().Player().createEntity();

  for (let i = 0; i < 10; i++) {
    let randomRadial = game.radialSpread(0, 0, 100, 10, i);
    game.make().Key({
      position: randomRadial
    }).createEntity();  
  }

});

//
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Player', 'Key', 'Block', 'Collectable', 'Teleporter', 'Gamepad'], // plugins at construction
  gameRoot: 'http://192.168.1.80:7777'
});

game.use('Boomerang'); // plugins at runtime

game.start(function () {

  game.setBackground('#000000');
  game.setZoom(2.5);
  game.build().Player().createEntity();

  for (let i = 0; i < 10; i++) {
    let randomRadial = game.radialSpread(0, 0, 100, 10, i);
    game.build().Key({
      position: randomRadial
    }).createEntity();  
  }

  // teleports to the next example
  game.build().Teleporter({
    url: 'http://192.168.1.80:8888/items/unit-spawner',
  }).position(200, 0).createEntity()

});
window.game = game;

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  defaultMovement: true, // adds movement to player
  plugins: ['Block', 'Key', 'Collectable', 'Gamepad', 'GamepadGUI'], // plugins at construction
});

game.use('Boomerang'); // plugins at runtime

game.start(function () {

  game.setBackground('#000000');
  game.setZoom(2.5);

  game.createPlayer({
    rotation: Math.PI / 2 // player aims to the right
  });

  game.on('pointerDown', function (event) {
    game.systems.boomerang.throwBoomerang(game.data.ents.PLAYER[0].id);
  });

  for (let i = 0; i < 10; i++) {
    let randomRadial = game.radialSpread(0, 0, 100, 10, i);
    game.build().Key({
      position: randomRadial
    }).createEntity();  
  }

});
window.game = game;

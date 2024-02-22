let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  defaultMovement: true, // adds movement to player
  plugins: ['Boomerang', 'Key', 'Block', 'Collectable', 'Gamepad'], // plugins at construction
});

game.use('Boomerang'); // plugins at runtime

game.start(function () {

  game.setBackground('#000000');
  game.setZoom(2.5);

  game.createPlayer({
    rotation: Math.PI / 2 // player aims to the right
  });

  for (let i = 0; i < 10; i++) {
    let randomRadial = game.radialSpread(0, 0, 100, 10, i);
    game.build().Key({
      position: randomRadial
    }).createEntity();  
  }

});
window.game = game;

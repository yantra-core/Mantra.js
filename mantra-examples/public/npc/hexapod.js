let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Hexapod', 'Player', 'Gamepad','Bullet', 'Boomerang', 'Teleporter']
});
game.start(function(){
  game.setBackground('black');
  game.setZoom(2.5);
  
  // Create a Player
  game.make().Player().createEntity();
  
  // Create two groups of Hexapods
  game.make()
    .Hexapod()
    .texture(null)
    .radius(8)
    .color('#007fff')
    .position(-300, 0, 0)
    .clone(22)
    .createEntity();

  game.make()
    .Hexapod()
    .texture(null)
    .radius(8)
    .color('red')
    .position(300, 0, 0)
    .clone(22)
    .createEntity();

  // teleports to the next example
  game.make().Teleporter({
    url: 'https://yantra.gg/mantra/examples/games/gravity-gardens',
  }).position(200, 0).createEntity()

});

//
//
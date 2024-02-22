let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Hexapod', 'Player', 'Gamepad','Bullet', 'Boomerang', 'Teleporter'],
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function(){
  game.setBackground('black');
  game.setZoom(2.5);
  game.build().Player().createEntity();
  game.build().Hexapod().texture(null).radius(4).color('#007fff').position(-300, 0, 0).clone(22).createEntity();
  game.build().Hexapod().texture(null).radius(4).color('red').position(300, 0, 0).clone(22).createEntity();

  // teleports to the next example
  game.build().Teleporter({
    url: 'http://192.168.1.80:8888/tilesmaps/tilemap-data',
  }).position(200, 0).createEntity()


});

//
//
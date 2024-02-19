let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Hexapod', 'Gamepad', 'GamepadGUI', 'Bullet', 'Boomerang'],
  defaultPlayer: true,
  defaultMovement: true,
});
game.start(function(){
  game.setBackground('black');
  game.setZoom(2.5);
  game.build().Hexapod().texture(null).radius(1).color('#007fff').position(-300, 0, 0).clone(22).createEntity();
  game.build().Hexapod().texture(null).radius(1).color('red').position(300, 0, 0).clone(22).createEntity();
});

//
//
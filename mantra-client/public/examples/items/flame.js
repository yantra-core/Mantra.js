
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Flame', 'Player', 'Gamepad', 'GamepadGUI'],
  defaultMovement: true,
  defaultPlayer: true,
});
game.start(function(){
  game.setBackground('black');
  game.setZoom(4.5);
  game
    .build()
    .Flame()
    .position(-60, -50, 0)
    .offset(120)
    .repeat(2)
    .createEntity();
  
  game.build().Player().createEntity();
});
    
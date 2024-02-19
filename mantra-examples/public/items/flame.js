
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Flame', 'Player'],
  defaultMovement: true,
  defaultPlayer: true,
  gameRoot: 'http://192.168.1.80:7777'
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
    
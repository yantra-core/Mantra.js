
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Hexapod', 'Gamepad', 'GamepadGUI', 'Bullet', 'Boomerang'],
  defaultPlayer: true,
  defaultMovement: true,
  style: { // TODO: css styles for GameConfig
    backgroundColor: 'black'
  },
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function(){
  game.setBackground('black');
  game.setZoom(2.5);
  // Create 22 Hexapods
  game.build().Hexapod().position(-300, 0, 0).clone(22).createEntity();
});

//
//
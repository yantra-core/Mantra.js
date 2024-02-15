let game = new MANTRA.Game({
  defaultPlayer: true,
  defaultMovement: true, // TODO: remove these, should work without
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Block', 'Border', 'Lifetime', 'Gamepad', 'Bullet', 'Boomerang'], // plugins at construction
  gameRoot: 'http://192.168.1.80:7777/'
});

game.start(function () {

  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createBorder();

  //
  // See: Gamepad.js for all available Gamepad actions ( DPAD_UP, DPAD_DOWN, etc.)
  //
  game
    .rules
      .if('DPAD_UP')
      .then('createColorBlock');

  game.rules.on('createColorBlock', function () {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100 + 10,
      width: Math.random() * 100 + 10
    };
    game.createEntity({
      type: 'BLOCK',
      color: randomColor,
      size: randomSize,
      lifetime: 800,
      position: {
        x: Math.random() * game.width - game.width / 2,
        y: Math.random() * game.height - game.height / 2
      }
    });
  });

  // instruction text
  game.createEntity({
    type: 'TEXT',
    body: false,
    width: 700,
    height: 50,
    color: 0xffffff,
    text: `Press DPAD UP to create blocks`,
    position: {
      x: 0,
      y: 0
    },
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  })


});
window.game = game;

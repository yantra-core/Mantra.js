let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Block', 'Border', 'Lifetime'], // plugins at construction
});

game.start(function () {
  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createBorder();
  game.on('keydown', function (event) {
    // random value between range of +- half game width from center
    let randomX = Math.random() * game.width - game.width / 2;
    game.createEntity({
      type: 'TEXT',
      width: 70,
      color: 0xffffff,
      lifetime: 700,
      height: 50,
      text: `${event.key}`,
      position: {
        x: randomX,
        y: -150
      },
      velocity: {
        x: 0,
        y: -4
      },
      style: { // CSS properties supported
        fontSize: '44px',
        textAlign: 'center',
        textShadow: '0 0 5px black',
        backgroundColor: game.randomColor('hex')
      },
    });
  });

  // instruction text
  game.createEntity({
    type: 'TEXT',
    body: false,
    width: 700,
    height: 50,
    color: 0xffffff,
    text: `Press any key to create a text entity`,
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

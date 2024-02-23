let game = new MANTRA.Game({
  defaultPlayer: true,
  defaultMovement: true, // TODO: remove these, should work without
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Text', 'Block', 'Border', 'Lifetime', 'Gamepad'], // plugins at construction
});

game.start(function () {

  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createBorder();

  game.rules.if('DPAD_UP').then('createColorBlock');
  game.rules.if('SPACE').then('createColorBlock');

  // TODO: Sutra should have conditional for generic keydown events, not just specific keys
  // game.rules.if('keydown').then('createColorBlock');

  game.rules.on('createColorBlock', function () {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100 + 10,
      width: Math.random() * 100 + 10
    };
    game.createEntity({
      color: randomColor,
      size: randomSize,
      lifetime: 500,
      position: {
        x: Math.random() * game.width - game.width / 2,
        y: Math.random() * game.height - game.height / 2
      }
    });
  });

  game.make().Text()
   .text('Press SPACE Key')
   .color('#ffffff')
   .width(400)
    .height(50)
    .style({
      backgroundColor: 'black',
      fontSize: '44px'
    }).createEntity();



});
window.game = game;

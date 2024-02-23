
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Player', 'Boomerang', 'Flame', 'Text', 'Gamepad'],
  defaultMovement: true
});
game.start(function () {
  game.setBackground('black');
  game.setZoom(4.5);

  //
  // Create a Player
  //
  game.make().Player().createEntity();

  //
  // Create a Flame with custom collisionStart behavior
  //
  game
    .make()
    .Flame()
    .collisionStart(function () {
      // Default collisionStart behavior of Flame is to destroy the entity that touches it
      // We can add additional collisionStart behaviors in the Builder, they will be called in order
      game.make().Player().createEntity();
    })
    .position(-60, -50, 0)
    .offset(120)
    .repeat(2)
    .createEntity();

  // adds text, do not touch flame
  game.make().Text()
    .text('Do not touch the flame')
    .width(300)
    .position(60, -25)
    .style({
      fontSize: '18px',
      color: 'white',
      fontFamily: 'Arial'
    })
    .createEntity();

});

//
//

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  defaultMovement: true,
  plugins: ['Player', 'Teleporter'],

});
game.start(function () {

  game.setZoom(2.5);
  game.setBackground('black');
  game.make().Player().createEntity();

  game
    .make()
    .color('red')
    .size(16)
    .body(true)
    .clone(11)
    .createEntity()

  game
    .make()
    .color('yellow')
    .size(16)
    .body(true)
    .clone(11)
    .createEntity()

  // do the same but sideways and diff color
  game
    .make()
    .color('yellow')
    .size(16)
    .body(true)
    .clone(11)
    .position(32, 0)
    .createEntity()

  game
    .make()
    .color('red')
    .size(16)
    .body(true)
    .clone(11)
    .position(-32, 0)
    .createEntity()

  // teleports to the next example
  game.make().Teleporter({
    url: 'https://yantra.gg/mantra/examples/entity/entity-composition',
  }).position(-200, 0).createEntity()

});    
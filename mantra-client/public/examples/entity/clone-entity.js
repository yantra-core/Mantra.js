
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  defaultMovement: true,
  plugins: ['Player', 'Teleporter'],
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function(){

  game.setZoom(2.5);
  game.setBackground('black');
  game.build().Player().createEntity();

  game
    .build()
    .color('red')
    .size(16)
    .body(true)
    .clone(11)
    .createEntity()

    game
    .build()
    .color('yellow')
    .size(16)
    .body(true)
    .clone(11)
    .createEntity()

    // do the same but sideways and diff color
    game
    .build()
    .color('yellow')
    .size(16)
    .body(true)
    .clone(11)
    .position(32, 0)
    .createEntity()

    game
    .build()
    .color('red')
    .size(16)
    .body(true)
    .clone(11)
    .position(-32, 0)
    .createEntity()

    // teleports to the next example
    game.build().Teleporter({
      url: 'http://192.168.1.80:8888/entity/entity-composition',
    }).position(-200, 0).createEntity()

});    
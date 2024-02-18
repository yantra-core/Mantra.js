
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function(){

  game.setBackground('black');

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

});    

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  width: 300,
  height: 300,
  defaultMovement: true,
});
game.start(function(){

  game.setZoom(2);
  game.createBorder();
  game.createPlayer();
  // TODO: switch between graphics with a button
  // check that setup / teardown of graphics works as expected
  game.switchGraphics('three');

});
    
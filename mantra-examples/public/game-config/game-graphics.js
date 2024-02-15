
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  width: 300,
  height: 300,
  defaultMovement: true,
  gameRoot: 'http://192.168.1.80:7777/'
});
game.start(function(){

  game.setZoom(2);
  game.createBorder();
  game.createPlayer();
  // TODO: switch between graphics with a button
  // check that setup / teardown of graphics works as expected
  game.switchGraphics('three');

});
    

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Iframe']
});
game.start(function(){

//
// <iframe> element
//
game.make()
  .Iframe({ src: 'http://marak.com' })
  .body(true)
  .width(800)
  .height(600)
  .isStatic(false)
  .position(0, 0)
  .createEntity();

});
    
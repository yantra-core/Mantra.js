
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Select', 'Text']
});
game.start(function(){
 
  // Text() header
  //
  game.make()
    .Text()
    .text('<h1>Hello</h1> World')
    .body(true)
    .isStatic(false)
    .x(-400)
    .size(100)
    .createEntity();

});
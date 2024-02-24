
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Text', 'Player']
});
game.start(function(){
  // Text() header
  //
  game.make()
    .Text()
    .text('<h1>Hello</h1> World')
    .body(true)
    .isStatic(false)
    .x(-20)
    .y(-10)
    .size(100)
    .createEntity();

    game.make().Player().createEntity();
    game.setZoom(2.5);

});
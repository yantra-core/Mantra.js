let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Button', 'Text']
});
game.start(function(){
  
  game.setBackground('black');
  game.setZoom(2);

  let counter = 0;
  //
  // <button>
  //
  game.make()
    .Button()
    .body(true)
    .pointerdown(function (entity) {
      counter++;
      game.updateEntity(text.id, { text: `Button clicked ${counter} times` });
    })
    .isStatic(false)
    .position(0, 0)
    .size(100)
    .createEntity();

  // <input> text to hold range value
  let text = game.make()
    .Text()
    .text('Click the button')
    // .color('white')
    .style({ color: 'white' })
    .position(0, 100)
    .size(110)
    .createEntity();

});

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Input', 'Text']
});
game.start(function(){
  
  game.setBackground('black');
   game.setZoom(2);

 
  //
  // <input type="text">
  //
  game.make()
    .Input()
    .value('Input Text')
    .body(true)
    .onUpdate(function (entity) {
      console.log(entity.value);
      // Updates the text
      game.updateEntity(text.id, { text: `Input value: ${entity.value}` });
    })
    .isStatic(false)
    .x(-200)
    .size(100)
    .createEntity();
  
  // <input> text to hold range value
  let text = game.make()
    .Text()
    .text('Type in the input box')
    // .color('white')
    .style({ color: 'white' })
    .position(0, 50)
    .size(110)
    .createEntity();

});
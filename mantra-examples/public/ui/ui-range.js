
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Range', 'Text']
});
game.start(function(){
  
  game.setBackground('black');
   game.setZoom(2);

   //
  // <input type="range">
  //
  game.make()
    .Range({
      value: 50,
      min: 0,
      max: 100,
      step: 1
    })
    .body(true)
    .onUpdate(function (entity) {
      console.log(entity.value);
      // Updates the text
      game.updateEntity(text.id, { text: `Range value: ${entity.value}` });
      // Moves the balls position based on the range value
      game.setPosition(ball.id, { x: entity.value - 50, y: 100 });
    })
    .isStatic(false)
    .position(0, 0)
    .width(500)
    .height(50)
    .createEntity();

  // <input> text to hold range value
  let text = game.make()
    .Text()
    .text('Drag the range slider')
    // .color('white')
    .style({ color: 'white' })
    .position(0, 50)
    .size(110)
    .createEntity();

    let ball = game.make()
      // .Circle(), .Square(), .Triangle(), .Hexagon(), .Pentagon(), .Star(), .Octagon(), .Heptagon()
      .size(50)
      .color('red')
      .isStatic(false)
      .position(0, 100)
      .createEntity();
});
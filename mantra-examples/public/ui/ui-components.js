let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Text', 'Textarea', 'Input', 'Range', 'Checkbox', 'Radio', 'Iframe']
});

game.start(function(){

  //
  // Text() header
  //
  game.make()
    .Text()
    .text('HELLO <TEXT>')
    .color('white')
    .body(true)
    .isStatic(false)
    .x(-400)
    .size(100)
    .createEntity();

  //
  // <textarea>
  //
  game.make()
    .Textarea()
    .body(true)
    .text('HELLO <TEXTAREA>')
    .isStatic(false)
    .x(-400)
    .size(100)
    .createEntity();

  //
  // <input type="text">
  //
  game.make()
    .Input()
    .value('Input Text')
    .body(true)
    .isStatic(false)
    .x(-200)
    .size(100)
    .createEntity();
  
  //
  // <input type="range">
  //
  game.make()
    .Range()
    .body(true)
    .isStatic(false)
    .x(300)
    .y(100)
    .size(100)
    .onUpdate(function(entity){
      console.log(entity.value);
    })
    .createEntity();

  //
  // <input type="checkbox">
  //
  game.make()
    .Checkbox()
    .body(true)
    .isStatic(false)
    .x(-300)
    .y(100)
    .size(100)
    .createEntity();

  //
  // <input type="radio">
  //
  game.make()
    .Radio()
    .body(true)
    .isStatic(false)
    .x(-200)
    .y(100)
    .size(100)
    .createEntity();
});    

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Select', 'Text']
});
game.start(function(){
  
  game.setBackground('black');
   game.setZoom(2);
    



  //
  // <select> Drop-down Select
  //

  game.make()
    .Select({
      options: [
        {
          value: '',
          label: 'Select color...'
        },
        {
          value: 'red',
          label: 'Red'
        },
        {
          value: 'green',
          label: 'Green'
        },
        {
          value: 'blue',
          label: 'Blue'
        },
      ]
    })
    .body(true)
    .isStatic(false)
    .position(0, 0)
    .size(100)
    // .onChange() // TODO
    .onUpdate(function (context, event) {
      game.setBackground(context.value);
    })
    .createEntity();

});
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  plugins: ['Text']
});

game.start(function(){

  let count = 0;

  // Creates a red box
  game.make()
    .color('red')
    .size(50)
    .position(0, -200)
    .collisionActive(function (entity) {
      count++;
      game.updateEntity(collisionCounter.id, {
        text: `Collisions: ${count}`
      });
    })
    .createEntity();

  // Text Counter for collisions
  let collisionCounter = game.make()
    .Text()
    .text(`Collisions: ${count}`)
    .color('white')
    .position(-200, 10)
    .body(false)
    .size(350, 50)
    .style({
      backgroundColor: 'black',
      fontSize: '44px',
    })
    .createEntity();
  
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  game.setGravity(0, 2);

  game.createPlayer();

});
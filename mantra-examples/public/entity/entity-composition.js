
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
});
game.start(function(){

  game.setBackground('black');
  game.createBorder();
  game.setZoom(1.5);

  // define a yellow jet engine configuration with velocity
  let jetEngineConfig = game.build()
    .color('yellow')
    .size(16)
    .body(true)
    .friction(0).frictionAir(0).frictionStatic(0)
    .velocity(0, -1.4)
    .build();

  // define a red car configuration
  let carConfig = game.build()
    .color('red')
    .size(40, 100)
    .kind('Chevy')
    .body(true)
    .build();

  // mix the car and jet engine configurations to create a new jet car configuration
  let jetCarConfig = game.build()
    .mix(jetEngineConfig)
    .mix(carConfig)
    .position(0, 200)
    .build(); 

  // create an orange Chevy car with a jet engine
  game.createEntity(jetCarConfig);

});
    

//
//

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function(){

  // define a red car configuration
  let carConfig = game.build().color('red').size(16).kind('Chevy').body(true).build();

  // define a yellow jet engine configuration with velocity
  let jetEngineConfig = game.build().color('yellow').size(16).velocity(0, -4).body(true).build();

  // mix the car and jet engine configurations to create a new jet car configuration
  let jetCarConfig = game.build().mix(carConfig).mix(jetEngineConfig); 

  // create an orange Chevy car with a jet engine
  game.createEntity(jetCarConfig.build());

});
    
let game = new MANTRA.Game({
  defaultMovement: true,
  plugins: ['Gamepad'],
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

game.start(function () {
  game.setBackground('#000000');
  game.zoom(2.5);
  game.createPlayer();
  
  let colorBlock = game.createEntity({
    type: 'MY_TYPE',
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 16
    }
  });

  game.createEntity({
    type: 'MY_TYPE',
    width: 32,
    height: 32,
    depth: 16,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 16
    }
  });

  //
  // Use gameState.tick and a condition to create a custom timer
  //
  game.rules.addCondition('customTimerTick', (entity, gameState) => 
    entity.type == 'MY_TYPE' && gameState.tick % 10 === 0);

  // Adds maps to mutate state of the context
  game.rules.addMap('randomColor', (context) => {
    context.color = game.randomColor();
  });

  //
  // Create a rule to change the color of the entities on a custom timer tick
  //
  game
    .rules
    .if('customTimerTick')
    .map('randomColor')
    .then('customAction');
  
  //
  // Create a custom action to change the color of the entities 
  //
  game.rules.on('customAction', (context, node, gameState) => {
    // You could also assign the color here instead of using a map
    game.updateEntity(context.id, { color: context.color });
  });

});
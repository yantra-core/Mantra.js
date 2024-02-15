let game = new MANTRA.Game({
  defaultMovement: true,
  width: 400,
  height: 300,
  plugins: ['Gamepad', 'GamepadGUI'],
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

game.start(function () {

  game.zoom(2.5);
  game.createPlayer({
    position: {
      x: 0,
      y: -32,
      z: 1
    }
  });
  game.createBorder();
  
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

  // draw a horizontal line in the middle of the screen
  game.createEntity({
    width: 400,
    height: 10,

    body: false,
    isStatic: true,
    position: {
      x: 0,
      y: 0,
      z: 0
    }
  });

  // add text to describe the party zone, cross to enter
  game.createText({
    text: 'Cross line to change color!',
    color: 'white',
    position: {
      x: 0,
      y: 50
    },
    body: false,
    size: {
      width: 300,
      height: 50,
    },
    color: 0xffffff,
    style: {
      backgroundColor: 'black',
      fontSize: '24px',
      textAlign: 'center'
    },
  });

  // create a simple rule to see if player is below the middle of the screen
  // returns true or false
  game.rules.addCondition('playerBelowMiddle', (entity, gameState) => {
    return entity.type === 'PLAYER' && entity.position.y > 0;
  });

  //
  // Check types to create conditional rules
  //
  game.rules.addCondition('isPlayer', (entity, gameState) =>
    entity.type === 'PLAYER');

  //
  // Create a rule to change the color of the entities on a custom timer tick
  //
  game.rules
    .if('isPlayer')
    .then((rules) => {
      rules
        .if('playerBelowMiddle')
        .then('customAction')
        .else('resetColors')
    })
  
  //
  // Create a custom action to change the color of the entities 
  //
  game.rules.on('customAction', (context, node, gameState) => {
    let color = game.randomColor();
    game.data.ents.MY_TYPE.forEach((ent) => {
      game.updateEntity(ent.id, { color });      
    });
    game.setBackground('black');
  });

  //
  // Reset the background color when the player is above the middle
  //
  game.rules.on('resetColors', (context, node, gameState) => {
    game.setBackground('white');
  });

});
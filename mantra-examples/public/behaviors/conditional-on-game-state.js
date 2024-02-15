// TODO: make example where blocks spawn until count is hit then remove all

let game = new MANTRA.Game({
  defaultMovement: true,
  width: 400,
  height: 300,
  plugins: ['Gamepad', 'GamepadGUI'],
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'http://192.168.1.80:7777/'
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
  game.rules.addCondition('blockCountTooHigh', (entity, gameState) => {
    return gameState.data.ents.MY_TYPE.length > 10;
  });

  //
  // Use gameState.tick and a condition to create a custom timer
  //
  game.rules.addCondition('customTimerTick', (entity, gameState) => 
    gameState.tick % 100 === 0);

  //
  // Check types to create conditional rules
  //
  game.rules.addCondition('isPlayer', (entity, gameState) =>
    entity.type === 'PLAYER');

  //
  // Create a rule to change the color of the entities on a custom timer tick
  //
  /*
  game
    .rules
      .if('blockCountTooHigh')
      .then('clearBlocks')
    */

  game.rules.on('tick', (gameState) => {

    if (gameState.ents.MY_TYPE.length > 10) {
      gameState.ents.MY_TYPE.forEach((entity) => {
        game.removeEntity(entity.id);
      });
    }

  });
    
  
  //
  // Create a custom action to change the color of the entities 
  //
  game.rules.on('createBlocks', (context, node, gameState) => {
    let randomPosition = game.randomPositionSquare(0,0,100);

    console.log('createBlocks', randomPosition)
    /*
    game.createEntity({
      type: 'MY_TYPE',
      body: false,
      width: 32,
      height: 32,
      depth: 1,
      position: {
        x: randomPosition.x,
        y: -60,
        z: 16
      }
    });
    */
  });

  //
  // Reset the background color when the player is above the middle
  //
  game.rules.on('resetColors', (context, node, gameState) => {
    game.setBackground('white');
  });

});
let game = new MANTRA.Game({
  defaultMovement: true,
  width: 400,
  height: 300,
  plugins: ['Text', 'Gamepad'],
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

game.start(function () {

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


  game.zoom(2.5);
  game.createPlayer({
    position: {
      x: 0,
      y: -32,
      z: 1
    }
  });
  game.createBorder();

  // REMARK: notice the new builder APIs? these are the category of changes we need
  let colorBlockLeft = game.make().type('MY_TYPE').isStatic(true).size(32).position(-80, -60, 16).createEntity();

  let colorBlockRight = game.make()
    .type('MY_TYPE')
    .size(32) // Assuming this sets both width and height
    .isStatic(true)
    .position(80, -60, 16)
    .createEntity();

  let horizontalLine = game.make()
    .size(400, 10) // Assuming the first argument is width, the second is height
    .body(false)
    .position(0, 0, 0)
    .createEntity();

  let partyZoneText = game.make()
    .Text()
    .text('Cross line to change color!')
    .color('white')
    .position(0, 50)
    .size(300, 50) // Assuming this sets the width and height for the text box
    .style({
      backgroundColor: 'black',
      fontSize: '24px',
      textAlign: 'center'
    })
    .createEntity();

});

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  plugins: ['Player']
});
game.start(function () {
  game.setBackground('black');
  game.createBorder();
  game.setGravity(0, 0.5);

  game.make().Player().createEntity();

  let entityConfig = game
    .make()
    .type('MY_TYPE') // Example entity type
    .name('a-thing')
    .kind('Warrior')
    .position(0, 50)
    .startingPosition(0, 0)
    .body(true)
    .velocity(0, -15)
    .rotation(Math.PI / 2) // in Radians
    .angle(45)  // in Degrees
    .mass(10)
    .density(1.2)
    .health(100)
    .score(0)
    .size(32, 32, 32) // Example for 3D game; omit depth for 2D
    .radius(8) // If applicable, for circular entities
    .shape('rectangle') // 'circle', 'polygon', etc.
    .color('red')
    .texture({
      sheet: 'blackMage',
      sprite: 'playerRight',
    })
    .style({ border: '1px solid red' }) // CSS-like style object
    .maxSpeed(10)
    //.owner('player1')
    .hasInventory(false)
    .isSensor(false)
    .isStatic(false)
    .pointerdown(() => updateCounter('pointerdown'))
    .collisionStart(() => updateCounter('collisionStart'))
    .collisionActive(() => updateCounter('collisionActive'))
    .collisionEnd(() => updateCounter('collisionEnd'))
    .onUpdate(() => updateCounter('onUpdate'))
    .meta({ level: 1, faction: 'allies' })
    .text('Hello World')
    .clone(33) // Create 11 clones of the entity with the specified configuration
    
    
  entityConfig.createEntity();


  // Function to update the count for a given event
  function updateCounter(eventName) {
    // Increment the count for the specific event
    eventCounts[eventName]++;

    // Generate the display text by aggregating all event counts
    let displayText = Object.entries(eventCounts)
      .map(([event, count]) => `${event} ${count} <br/><br/>`)
      .join('\n');

    // Update the text entity with the new counts
    let textEntity = game.getEntityByName('counter');
    if (textEntity) {
      game.updateEntity(textEntity.id, { text: displayText });
    }
  }

  // create a text counter for each event to debug
  // Initialize an object to keep track of event counts
  let eventCounts = {
    pointerdown: 0,
    collisionStart: 0,
    collisionActive: 0,
    collisionEnd: 0,
    onUpdate: 0
  };
  game
    .make()
    .name('counter')
    .type('TEXT')
    .style({
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      textAlign: 'center',
    })
    .width(150)
    .name('counter')
    .position(0, 0)
    .layout('top-center')
    .origin('center')
    .text('loading...')
    .createEntity();

});    
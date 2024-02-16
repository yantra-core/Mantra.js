let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Border'],
  gameRoot: 'http://192.168.1.80:7777/'
});

//
// Registers an event listener before the 'updateEntity' event
//
// Replaces all colors with blue
game.before('updateEntity', function (entityData) {
  console.log('before update entity', entityData)
  if (entityData.type === 'MY_TYPE') {
    // Mantra works with entityData as a regular JSON object
    // Mutate the entity data or create a fresh one scope
    // Replace color with blue
    entityData.color = 0x007fff; // Remark: see why color as string name wasn't working here
  }
  return entityData;
});

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 33; i++) {
    let randomPosition = game.randomPositionSquare(0, 0, game.width / 4);

    let entity = game.createEntity({
      color: 'white',
      type: 'MY_TYPE',
      size: {
        width: 50,
        height: 50
      },
      position: {
        x: randomPosition.x,
        y: randomPosition.y
      }
    });
    entities.push(entity.id);
  }

  // now we have the entities, update them all
  entities.forEach(eId => {
    console.log('updating entity', eId)
    game.updateEntity(eId, {
      color: 'red',
      type: 'MY_TYPE'
    });
  });

});
window.game = game;
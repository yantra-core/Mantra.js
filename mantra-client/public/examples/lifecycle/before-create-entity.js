let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Border'],
});


//
// Registers an event listener before the 'createEntity' event
//
game.before('createEntity', function (entityData) {
  if (entityData.type === 'MY_TYPE') {
    // Mantra works with entityData as a regular JSON object
    // Mutate the entity data or create a fresh one scope
    entityData.color = 'red';
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

});
window.game = game;
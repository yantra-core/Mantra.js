let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Border']
});

//
// Registers an event listener after the 'updateEntity' event
//
// Applies a random force each time entity is updated
game.after('updateEntity', function (entityData) {
  console.log('after update entity', entityData);
  let randomForce = game.randomForce(2);
  game.applyForce(entityData.id, {
    x: randomForce.x,
    y: randomForce.y
  });
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
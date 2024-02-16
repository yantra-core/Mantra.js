let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Border']
});

//
// Registers an event listener after the 'createEntity' event
//
// Applies a random force each time entity is created
game.after('createEntity', function (entityData) {
  console.log('after create entity', entityData);
  let randomForce = game.randomForce(2);
  game.applyForce(entityData.id, {
    x: randomForce.x,
    y: randomForce.y
  });
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
      color: 'red',
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
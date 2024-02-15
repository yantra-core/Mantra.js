let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  plugins: ['Border', 'Lifetime'],
  gameRoot: 'http://192.168.1.80:7777',
});

//
// Registers an event listener before the 'removeEntity' event
//
// Replaces the ent about to be removed with a new one
game.before('removeEntity', function (entityData) {
  // console.log('before remove entity', entityData);
  if (entityData.type === 'MY_TYPE') {
    createBox();
  }
  // returning false here will prevent the entity from being removed, however graphic will still be removed,
  // return false;
});

function createBox () {
  
  let randomColor = game.randomColor();  
  let randomPosition = game.randomPositionSquare(0, 0, game.width / 4);
  let randomLifetime = 500 + Math.random() * 1500;  // random lifetime between 500 and 2000

  let entity = game.createEntity({
    color: randomColor,
    type: 'MY_TYPE',
    isSensor: true,
    size: {
      width: 32,
      height: 32
    },
    lifetime: randomLifetime,
    position: {
      x: randomPosition.x,
      y: randomPosition.y
    }
  });
  return entity;
}

game.start(function () {
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  // create a few entities to shoot
  let entities = [];
  for (let i = 0; i < 33; i++) {
    let entity = createBox();
    entities.push(entity.id);
  }

});
window.game = game;
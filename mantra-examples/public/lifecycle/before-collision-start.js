let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
});

let collisions = 0;
let cancelledCollisions = 0;

//
// Registers an event listener before the 'collisionStart' event
//
// Cancels the collision by returning false
game.before('collisionStart', function (entityA, entityB, pair) {
  cancelledCollisions++;
  let cancelledCollisionsText = game.getEntityByName('cancelledCollisions');
  game.updateEntity(cancelledCollisionsText.id, {
    text: `Cancelled: ${cancelledCollisions}`
  });
  return false;
  // returning false here will prevent the entity from being removed, however graphic will still be removed,
  // return false;
});

game.start(function(){
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createPlayer();

  let box = game.createEntity({
    color: 'red',
    size: {
      height: 50,
      width: 50
    },
    collisionStart: function (entity) {
      collisions++;
      // update the text
      game.updateEntity(collisionCounter.id, {
        text: `Collisions: ${collisions}`
      });
    },
    position: {
      x: 0,
      y: -200
    }
  });

  let collisionCounter = game.createText({
    text: `Collisions: ${collisions}`,
    color: 'white',
    position: {
      x: -200,
      y: 10
    },
    body: false,
    size: {
      width: 280,
      height: 50,
    },
    color: 0xffffff,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

  let cancelledCollisions = game.createText({
    name: 'cancelledCollisions',
    text: `Cancelled: 0`,
    color: 'white',
    position: {
      x: 200,
      y: 10
    },
    body: false,
    size: {
      width: 280,
      height: 50,
    },
    color: 0xffffff,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

});
    
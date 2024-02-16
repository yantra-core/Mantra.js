let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
});

let collisions = 0;

//
// Registers an event listener before the 'collisionStart' event
//
// Cancels the collision by returning false
game.after('collisionStart', function (entityA, entityB, pair) {

  // change the color of the entity
  game.updateEntity(entityA.id, {
    color: game.randomColor()
  });

  // change the color of the entity
  game.updateEntity(entityB.id, {
    color: game.randomColor()
  });

});

game.start(function(){
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createPlayer();

  let box = game.createEntity({
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

});    
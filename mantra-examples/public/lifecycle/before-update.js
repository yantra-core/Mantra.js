document.addEventListener('DOMContentLoaded', async (event) => {
  let game = new MANTRA.Game({
    physics: 'matter', // enum, 'physx', 'matter
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    virtualGamepad: true,
    border: true,
    // TODO gameRoot: 'http://192.168.1.80:7777',
    options: {
      scriptRoot: 'http://192.168.1.80:7777',
      assetRoot: 'http://192.168.1.80:7777'
    }
  });

  await game.start();

  game.zoom(1);
  game.setBackground('#000000');

  // create a few entities
  let entities = [];
  for (let i = 0; i < 10; i++) {
    let entity = game.createEntity({
      type: 'MY_ENTITY_TYPE',        // can be any string
      position: {
        x: Math.random() * -500,
        y: Math.random() * -1000
      }
    });
    entities.push(entity.id);
  }

  game.before('update', function () {
    if (game.tick % 100) {
      entities.forEach((entityId) => {
        let force = {
          x: 0.01,
          y: 0.01
        };
        //let ent = game.data.ents._[entityId];  // gets the most recent data for the entity
        // console.log('ent', ent.position);
        game.applyForce(entityId, force);
      });
    }
  });

  window.game = game;

});

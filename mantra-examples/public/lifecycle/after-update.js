document.addEventListener('DOMContentLoaded', (event) => {

  let game = new MANTRA.Game({
    physics: 'matter', // enum, 'physx', 'matter
    collisions: true,
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    // camera: 'follow',
    // TODO: gameRoot, have this be default for scriptRoot and assetRoot
    options: {
      scriptRoot: 'http://192.168.1.80:7777',
      assetRoot: 'http://192.168.1.80:7777'
    }
  });

  game.use('Block');

  game.use('Bullet');

  // TODO: demos should have simple control mappings with Sutra, no default mappings

  game.start(function () {
    game.zoom(1);
    game.setBackground('#000000');


    // create a few entities to shoot
    let entities = [];
    for (let i = 0; i < 10; i++) {
      let entity = game.createEntity({
        type: 'BLOCK',
        hasCollisionStart: true,
        position: {
          x: Math.random() * -500,
          y: Math.random() * -1000
        }
      });
      entities.push(entity);
    }

    game.after('update', function () {
      // won't be processed until next game tick
      if (game.tick % 100) {
        entities.forEach((entity) => {
          game.applyForce(entity.id, { x: 0.01, y: 0.01 });
        });
      }
    });

  });
  window.game = game;

});

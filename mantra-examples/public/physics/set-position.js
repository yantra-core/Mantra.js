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
        size: {
          width: 50,
          height: 50
        },
        isSensor: true,
        hasCollisionStart: true,
        position: {
          x: Math.random() * -500,
          y: Math.random() * -1000
        }
      });
      entities.push(entity);
    }

    game.before('update', function () {
      if (game.tick % 10 === 0) {
        entities.forEach((entity) => {
          let randomX = Math.random() * -500;
          let randomY = Math.random() * -500;
          game.setPosition(entity.id, { x: randomX, y: randomY });
        });
      }
    });

  });
  window.game = game;

});

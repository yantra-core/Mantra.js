  let game = new MANTRA.Game({
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    // camera: 'follow',
    // TODO: gameRoot, have this be default for scriptRoot and assetRoot
  });

  game.use('Block');

  game.use('Bomb');
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
          x: Math.random() * 1000,
          y: Math.random() * 1000
        }
      });
      entities.push(entity);
    }

  });
  window.game = game;

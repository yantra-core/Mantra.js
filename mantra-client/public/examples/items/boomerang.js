let game = new MANTRA.Game({
  physics: 'matter', // enum, 'physx', 'matter
  collisions: true,
  graphics: ['three'], // array enum, 'babylon', 'phaser', 'css', 'three'
  // camera: 'follow',
  // TODO: gameRoot, have this be default for scriptRoot and assetRoot
  gameRoot: 'https://yantra.gg/mantra'

});

game.use('Block');

game.use('Boomerang');
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
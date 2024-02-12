document.addEventListener('DOMContentLoaded', (event) => {

  let game = new MANTRA.Game({
    createDefaultPlayer: true,
    physics: 'matter', // enum, 'physx', 'matter
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    gameRoot: 'https://yantra.gg/mantra'
  });

  game.use('Block');
  game.use('Border');
  game.use('Bullet');

  game.start(function () {
    game.zoom(1);
    game.createBorder();
    game.setBackground('#000000');
    let entity = game.createEntity({
      color: 0xff0000,
      size: {
        width: 16,
        height: 16
      },
      hasCollisionStart: true,
      position: {
        x: 0,
        y: 0
      }
    });

    game.before('update', function () {

      // 'entity' reference from earlier is not garanteed to be up to date

      // Remark: Calling game.getEntity() will fully hydrate all Entity component properties
      // In most cases you will *not* need to call `game.getEntity()`,
      let ent = game.getEntity(entity.id);

      // You can access the same Entity data with game.data.ents._[entity.id]
      let alsoSameEnt = game.data.ents._[entity.id];

      game.setPosition(ent.id, { x: ent.position.x + 0.5, y: ent.position.y + 0.5 });
    });

  });
  window.game = game;

});

document.addEventListener('DOMContentLoaded', (event) => {

  let game = new MANTRA.Game({
    createDefaultPlayer: true,
    physics: 'matter', // enum, 'physx', 'matter
    graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
    gameRoot: 'http://192.168.1.80:7777'
  });

  game.use('Block');
  game.use('Border');
  game.use('Bullet');

  game.start(function () {
    game.zoom(1);
    game.createBorder();
    game.setBackground('#000000');

    createEntities();

    game.before('update', function () {
      if (game.tick % 11 === 0) {
        if (game.data.ents.MY_TYPE.length === 0) {
          console.log('no more entities, regenerate');
          createEntities();
          return;
        }
        let remainingEnt = game.data.ents.MY_TYPE.pop();
        // remove the entity
        game.removeEntity(remainingEnt.id);
      }
    });

  });
  window.game = game;

});

function createEntities(){
  for (let i = 0; i < 33; i++) {
    let randomColor = game.randomColor();
    let randomSize = {
      height: Math.random() * 100,
      width: Math.random() * 100
    };
    // TODO: random shapes
    let randomPosition = game.randomPositionSquare(0, 0, 250);

    let entity = game.createEntity({
      type: 'MY_TYPE',
      color: randomColor,
      size: randomSize,
      isSensor: true,
      position: {
        x: randomPosition.x,
        y: randomPosition.y
      }
    });
  }

}
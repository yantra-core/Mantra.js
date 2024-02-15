let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  gameRoot: 'http://192.168.1.80:7777/'
});

game.start(function(){
  game.zoom(1);
  game.createBorder();
  game.setBackground('#000000');
  game.setGravity(0, 2);
  game.createPlayer();

  let count = 0;

  let box = game.createEntity({
    color: 'red',
    size: {
      height: 50,
      width: 50
    },
    collisionActive: function (entity) {
      count++;
      // update the text
      game.updateEntity(collisionCounter.id, {
        text: `Collisions: ${count}`
      });
    },
    position: {
      x: 0,
      y: -200
    }
  });

  let collisionCounter = game.createText({
    text: `Collisions: ${count}`,
    color: 'white',
    position: {
      x: -200,
      y: 10
    },
    body: false,
    size: {
      width: 350,
      height: 50,
    },
    color: 0xffffff,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },

  });

});
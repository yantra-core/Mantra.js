
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'http://192.168.1.80:7777/'
});
game.start(function(){
  game.setBackground('#000000');
  game.setZoom(1.5);
  let container = game.createContainer({
    name: 'laby-container',
    layout: 'grid', // optional. can also be "flex" or "none"
    color: 0xff00ff,
    position: {
      x: 0,
      y: 0,
      z: -1
    },
    body: false,
    size: {
      width: 300,
      height: 180
    },
    grid: {
      columns: 4,
      rows: 8
    },
    style: { // supports CSS property names
      padding: 0,
      margin: 0,
      // background: '#ff0000', // can also use Entity.color
      border: {
        color: '#000000',
        width: 0
      }
    },
  });

  for (let i = 0; i < 24; i++) {

    // create entity directly inside container with relative position
    game.createEntity({
      name: 'maze-door-' + i,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'ayyoDoor',
      },
      color: 0x00ff00,
      container: 'laby-container',
      body: true,
      meta: {
        source: 'labryninthos',
        algo: 'recursive-backtracking',
        height: 16,
        width: 16
      },
      isStatic: true,
      type: 'DOOR',
      size: {
        width: 16,
        height: 16
      }
    });
  }

});
    
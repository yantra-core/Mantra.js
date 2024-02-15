
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'css', 'three'
  /*
    Mantra's gameRoot is the root URL for all game assets and scripts.
    This is useful for when you want to host your game on a different server
  */
  gameRoot: 'http://yantra.gg/mantra',
  /*

    gameRoot always takes initial precedence over assetRoot and scriptRoot.
    You may optionally set assetRoot and scriptRoot to override gameRoot for assets and scripts.
  */
  scriptRoot: 'http://yantra.gg/mantra', // scripts, plugins, .js files
  assetRoot: 'http://yantra.gg/mantra',  // images, models, sounds, sprites
});

game.start(function(){

  let container = game.createContainer({
    name: 'game-root-text',
    layout: 'grid', // optional. can also be "flex" or "none"
    color: 0xff00ff,
    position: {
      x: 0,
      y: 0,
      z: -1
    },
    body: false,
    size: {
      width: 800,
      height: 600,
    },
    grid: {
      columns: 1,
      rows: 4
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

  // create a text entity explaining game root
  game.createEntity({
    type: 'TEXT',
    container: 'game-root-text',
    body: false,
    size: {
      width: 700,
      height: 50,
    },
    color: 0xffffff,
    text: `Game Root: ${game.gameRoot}`,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

  // now the same for assetRoot and scriptRoot
  game.createEntity({
    type: 'TEXT',
    container: 'game-root-text',
    body: false,
    size: {
      width: 700,
      height: 50,
    },
    color: 0xffffff,
    text: `Asset Root: ${game.assetRoot}`,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

  game.createEntity({
    type: 'TEXT',
    container: 'game-root-text',
    body: false,
    size: {
      width: 700,
      height: 50,
    },
    color: 0xffffff,
    text: `Script Root: ${game.scriptRoot}`,
    style: {
      backgroundColor: 'black',
      fontSize: '44px',
    },
  });

});
    
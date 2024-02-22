
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Text', 'Block'],
  defaultMovement: true
});
game.start(function () {

  let tickCount = 0;
  let text;
  let reloadText;
  let unloadSceneText;

  class MyScene {
    static id = 'myscene';
    static type = 'scene'; // type is optional for Plugins
    constructor(game) {
      this.game = game; // Store the reference to the game logic
      this.id = MyScene.id;
      this.type = MyScene.type;
    }

    async preload(game) {
      game.addAsset('/img/game/tiles/tile-block.png', 'image', 'tile-block-0');  // custom asset
    }

    init(game) {
      console.log("Initializing MyScene");
      this.game.setBackground('#000000');

      let mySceneLoadedText = game.build().Text()
        .text('MyScene loaded')
        .position(0, 0, -1)
        .size(400, 50)
        .color('white')
        .style({
          backgroundColor: 'black',
          fontSize: '44px'
        })
        .createEntity();

      let grassBlock = game.build()
        .Block()
        .size(50, 50)
        .position(-32, -100)
        .texture('tile-block-0')
        .createEntity();

      unloadSceneText = game.build().Text()
        .text(`Scene will unload ${100 - tickCount} ticks`)
        .position(0, 0)
        .size(400, 50)
        .color('white')
        .style({
          backgroundColor: 'black',
          fontSize: '44px',
          textAlign: 'center'
        })
        .createEntity();

    }

    update() {

      if (tickCount > 100) {
        game.unload('myscene');
        tickCount = 0;
        return;
      }
      tickCount++;

      if (this.game.tick % 10 === 0) {
        this.game.updateEntity(unloadSceneText.id, {
          text: `Scene will unload ${100 - tickCount} ticks`,
        });
      }

    }

    unload() {
      console.log("Unloading MyScene");

      // create text that says click to load scene
      reloadText = game.build().Text()
        .text('MyScene unloaded. Click to reload.')
        .position(0, 0)
        .size(400, 50)
        .color('white')
        .style({
          backgroundColor: 'black',
          fontSize: '44px',
          textAlign: 'center'
        })
        .createEntity();

    }
  }

  let myScene = new MyScene(game);

  game.use(myScene);

  game.on('pointerDown', function (event) {
    // Lookup scenes by id, not class name
    if (typeof game.data.scenes.myscene === 'undefined') {
      // Use the scene class instance
      game.use(myScene);
      game.removeEntity(reloadText.id);
    }
  });

  game.createPlayer({
    position: {
      x: 0,
      y: 100
    }
  });
});

let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function () {

  let tickCount = 0;
  let text;
  let reloadText;

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
      this.createText({
        text: 'MyScene loaded',
        position: {
          x: 0,
          y: 0,
          z: -1
        },
        size: {
          width: 400,
          height: 50,
        },
        color: 0xffffff,
        style: {
          backgroundColor: 'black',
          fontSize: '44px',
        },
      });

      // create grass block
      this.createEntity({
        type: 'BLOCK',
        size: {
          width: 50,
          height: 50
        },
        hasCollisionStart: true,
        position: {
          x: -32,
          y: -100
        },
        texture: 'tile-block-0'
      });

      // create text that says click to load scene
      text = game.createText({
        text: `Scene will unload ${100 - tickCount} ticks`,
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 400,
          height: 50,
        },
        color: 0xffffff,
        style: {
          backgroundColor: 'black',
          fontSize: '44px',
          textAlign: 'center'
        },
      });

    }

    update() {

      if (tickCount > 100) {
        game.unload('myscene');
        tickCount = 0;
        return;
      }
      tickCount++;

      if (this.game.tick % 10 === 0) {
        this.game.updateEntity(text.id, {
          text: `Scene will unload ${100 - tickCount} ticks`,
        });
      }

    }

    unload() {
      console.log("Unloading MyScene");

      // create text that says click to load scene
      reloadText = game.createText({
        text: 'MyScene unloaded. Click to reload.',
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 400,
          height: 50,
        },
        color: 0xffffff,
        style: {
          backgroundColor: 'black',
          fontSize: '44px',
          textAlign: 'center'
        },
      });

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
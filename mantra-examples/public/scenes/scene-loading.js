let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true
});

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

  init (game) {
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

  }

  unload () {
    console.log("Unloading MyScene");
  }
}

game.start(function(){

  let myScene = new MyScene(game);

  game.on('pointerDown', function (event) {
    // Lookup scenes by id, not class name
    if (!game.data.scenes.myscene) {
      // Use the scene class instance
      game.use(myScene);
      game.removeEntity(text.id);
    }
  });

  // create text that says click to load scene
  let text = game.createText({
    text: 'Click to load scene',
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



  game.createPlayer({
    position: {
      x: 0,
      y: 100
    }
  });
});
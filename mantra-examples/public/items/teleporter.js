
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  defaultPlayer: true,
  defaultMovement: true,
  plugins: ['Teleporter', 'Text', 'Block', 'Gamepad', 'GamepadGUI'],
  gameRoot: 'http://192.168.1.80:7777'
});
game.start(function () {
  game.setZoom(3.5);

  game.build().Text().text('Teleport to position').width(200).position(-80, -20, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        position: { x: 0, y: 0, z: 0 }
      }
    })
    .position(-100, 0, 0)
    .createEntity();

  game.build().Text().text('Teleport to Plugin').width(200).position(-80, 70, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        plugin: new DemoScene(game)
      }
    })
    .position(-100, 50, 0)
    .createEntity();

  // block ref will contain the block.id
  let block = game.build().Block().isStatic(true).name('a-block').position(0, 50).size(16).createEntity();
  // we can get ent by name later
  // let block = game.getEntityByName('a-block');

  game.build().Text().text('Teleport to Entity').width(200).position(120, 70, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        entity: block.id
      }
    })
    .position(100, 50, 0).createEntity();

  game.build().Text().text('Teleport to function').width(200).position(120, -20, 0).createEntity();
  game.build()
    .Teleporter({
      // define custom teleportation behavior
      collisionStart: function (a, b, pair, context) {
        // can perform arbitrary logic here
        game.setPosition(context.target.id, {
          x: -150,
          y: 0,
          z: 0
        })
      },
    })
    .position(100, 0, 0)
    .createEntity();
});


class DemoScene {
  static id = 'demo-scene';
  static type = 'scene'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = DemoScene.id;
    this.type = DemoScene.type;
  }

  async preload(game) {
    game.addAsset('/img/game/tiles/tile-block.png', 'image', 'tile-block-0');  // custom asset
  }

  init (game) {
    console.log("Initializing DemoScene");
    this.game.setBackground('#000000');
    this.createText({
      text: 'DemoScene loaded',
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

    this.game.build().Fire().createEntity();

  }

  unload () {
    console.log("Unloading MyScene");
  }
}
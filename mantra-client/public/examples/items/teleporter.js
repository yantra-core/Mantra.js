
let game = new MANTRA.Game({
  width: 400,
  height: 300,
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  defaultPlayer: true,
  defaultMovement: true,
  plugins: ['Teleporter', 'Text', 'Flame', 'Block', 'Gamepad'],

});
game.start(function () {
  game.setZoom(3.5);

  game.make().Text().text('Teleport to position').width(200).position(-80, -20, 0).createEntity();
  game.make()
    .Teleporter({
      destination: {
        position: { x: 0, y: 0, z: 0 }
      }
    })
    .position(-100, 0, 0)
    .createEntity();

  game.make().Text().text('Teleport to Plugin').width(200).position(-80, 70, 0).createEntity();
  game.make()
    .Teleporter({
      destination: {
        plugin: new DemoScene(game)
      }
    })
    .position(-100, 50, 0)
    .createEntity();

  // block ref will contain the block.id
  let block = game.make().Block().isStatic(true).name('a-block').position(0, 50).size(16).createEntity();
  // we can get ent by name later
  // let block = game.getEntityByName('a-block');

  game.make().Text().text('Teleport to Entity').width(200).position(120, 70, 0).createEntity();
  game.make()
    .Teleporter({
      destination: {
        entity: block.id
      }
    })
    .position(100, 50, 0).createEntity();

  game.make().Text().text('Teleport to function').width(200).position(120, -20, 0).createEntity();
  game.make()
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

    // Teleport to URL
    game.make().Text().text('Teleport to URL').width(200).position(120, -120, 0).createEntity();
    game.make()
      .Teleporter({
        destination: {
          url: 'https://github.com/yantra-core/Mantra.js'
        }
      })
      .position(100, -100, 0)
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

    this.game.make().Flame().y(-50).createEntity();

  }

  unload () {
    console.log("Unloading MyScene");
  }
}
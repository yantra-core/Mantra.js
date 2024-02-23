let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  plugins: ['Text', 'Hexapod', 'Bullet'],
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

    let customEnt = game.make()
      .type('BLOCK')
      .size(50, 50)
      .position(-32, -100)
      .texture('tile-block-0')
      .createEntity();
    
    this.game.make().Hexapod().repeat(6).position(-300, 0).createEntity();
    this.game.make().Hexapod().repeat(6).position(300, 0).createEntity();
  }

  unload() {
    console.log("Unloading MyScene");
  }

}

game.start(function () {

  let myScene = new MyScene(game);

  game.on('pointerDown', function (event) {
    // Lookup scenes by id, not class name
    if (!game.data.scenes.myscene) {
      // Use the scene class instance
      game.use(myScene);
      game.removeEntity(clickToLoadText.id);
    }
  });

  let clickToLoadText = game.make().Text()
    .text('Click to load scene')
    .position(0, 0)
    .size(400, 50)
    .color('white')
    .style({
      backgroundColor: 'black',
      fontSize: '44px',
      textAlign: 'center'
    })
    .createEntity();


  game.createPlayer({
    position: {
      x: 0,
      y: 100
    }
  });

});
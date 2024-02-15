
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});
game.start(function(){


  class MyScene {
    static id = 'myscene';
    static type = 'scene'; // type is optional for Plugins
    constructor(game) {
      this.game = game; // Store the reference to the game logic
      this.id = MyScene.id;
      this.type = MyScene.type;
    }
  
    async preload(game) {
      game.addAsset('/img/game/tiles/tile-grass.png', 'image', 'tile-grass-0');  
    }

    init (game) {
      console.log("Initializing MyScene");
      this.game.setBackground('#000000');

      game.createText({
        text: 'My Scene.',
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 280,
          height: 50,
        },
        color: 0xffffff,
        style: {
          backgroundColor: 'black',
          fontSize: '44px',
        },
      });

      // create grass block
      game.createEntity({
        type: 'BLOCK',
        size: {
          width: 50,
          height: 50
        },
        hasCollisionStart: true,
        position: {
          x: 0,
          y: 50
        },
        texture: 'tile-grass-0'
      });

    }

    unload () {
      console.log("Unloading MyScene");
    }
  }


  let myScene = new MyScene(game);
  game.use(myScene);




  game.createPlayer();
});
    
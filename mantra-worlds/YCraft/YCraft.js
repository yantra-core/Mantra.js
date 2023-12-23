class YCraft {
  static id = 'world-ycraft';
  static type = 'world'; // type is optional for Plugins
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = YCraft.id;
    this.type = YCraft.type;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.setGravity(0, 0, 0);

    game.use('Bullet');

    game.use('YCraft');
    game.use('YCraftGUI');

    /*
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-worlds/YCraft/YCraft.js',
      sutraEditor: true
    });
    */
    
    game.createEntity({ 
      type: 'BLOCK',
      color: 0xcccccc,
      mass: 10000,
      height: 64,
      width: 64,
      position: { x: 0, y: 0, z: 0 },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1

    });

    /*
    game.systems.graphics.switchGraphics('CSSGraphics', function(){
      game.createDefaultPlayer();

    });
    */

  }

  update() {
  }

  render() { }

  destroy() { }

  unload () {
    console.log('YCraft.unload()');

  }

}

export default YCraft;
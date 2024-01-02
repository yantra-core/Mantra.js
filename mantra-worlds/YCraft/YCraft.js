import contraptionsExample from './contraptions-example.js';

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
    //game.use('Entity')
    game.use('YCraft', {
      contraption: contraptionsExample
    });
    game.use('YCraftGUI');

    /*
    game.once('plugin::loaded::typer-ghost', function(){
      game.systems['typer-ghost'].createText({ x: 300, y: 500, text: 'YCraft Crafting World', style: { color: 'white', fontSize: '144px' }, duration: 5000, removeDuration: 1000 });
    })

    game.use('GhostTyper');
    */
    /*
    game.use('Editor', {
      sourceCode: 'https://github.com/yantra-core/mantra/blob/master/mantra-worlds/YCraft/YCraft.js',
      sutraEditor: true
    });
    */
    
    /*
    game.createEntity({ 
      type: 'BLOCK',
      color: 0xcccccc,
      mass: 10000,
      height: 64,
      width: 64,
      position: { x: 150, y: 300, z: 0 },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1
    });
    */

    // Remark: Players removed for initial demo, is working
    game.createDefaultPlayer();


    /* Not needed anymore?
    game.systems.graphics.switchGraphics('CSSGraphics', function(){});
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
class Home {
  static id = 'world-home';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;


    game.setGravity(0, 0, 0);

    /*
    game.createEntity({
      type: 'PLATFORM',
      isStatic: true,
      width: 1000,
      height: 40,
      position: {
        x: 0,
        y: 200
      }
    });
    */

    /*
    game.createEntity({
      type: 'BLOCK',
      texture: 'tile-block',
      width: 32,
      height: 32,
      position: {
        x: -400,
        y: -150
      },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1
    });
    */

    game.createDefaultPlayer();

    game.use('Block')
    game.use('Tile');

    //  game.use('Bullet')
    // game.use('Sword')

    game.use('Border', { autoBorder: true })

    game.once('plugin::loaded::typer-ghost', function(){

      // calculate font size based on window size
      let fontSize = Math.floor(window.innerWidth / 10) + 'px';
      // calculate x / y based on window size
      let x = Math.floor(window.innerWidth / 2);
      let y = 110;

      let typer = game.systems['typer-ghost'].createText({ 
        x: x, y: y, text: 'Welcome to Mantra\n my friend.',
        style: {
          color: 'white',
          fontSize: fontSize,
          width: '100%',
          position: 'absolute',
          textAlign: 'center',
          top: '100px', // Adjust this value to position the text lower or higher from the top
          left: '50%', // Center horizontally
          transform: 'translateX(-50%)', // Ensure exact centering
          lineHeight: '1',
          zIndex: '3000'
     
        },
        duration: 5000, removeDuration: 6000
      });

      setTimeout(function(){
        let moveMessage = 'Use WASD to move.';
        if (is_touch_enabled()) {
          moveMessage = 'Touch Gamepad to move.';
        }
        typer.updateText(moveMessage, 5000, 6000);

      }, 6000)

      setTimeout(function(){
        typer.updateText('Switch Worlds by pressing START', 5000, 6000);
      }, 12000)


      setTimeout(function(){
        typer.updateText('You can Switch Graphics by pressing SELECT', 5000, 6000);
      }, 18000)

    })

    game.use('GhostTyper');
    console.log(game.systems)

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.use('StarField');
      game.createDefaultPlayer();
    });
    */



  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Home;

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

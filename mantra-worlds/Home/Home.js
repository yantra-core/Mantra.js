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

    game.createEntity({
      type: 'BLOCK',
      texture: 'img/game/tiles/tile-block.png',
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


    game.use('Tile');


    game.use('Block')
  //  game.use('Bullet')
    game.use('Sword')

    game.use('Border', { autoBorder: true })


    /*
    game.once('plugin::loaded::typer-ghost', function(){
      game.systems['typer-ghost'].createText({ x: 300, y: 500, text: 'Welcome to Mantra\n my friend.', style: { color: 'white', fontSize: '144px' }, duration: 10000 });
    })
    */

    // game.use('GhostTyper');
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
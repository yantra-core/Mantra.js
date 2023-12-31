import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

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
    game.createDefaultPlayer();

    game.use('Block')
    game.use('Tile');
    game.use('Tone');

    game.use('Bullet')
    // game.use('Sword')


    game.use('Border', { autoBorder: true })

    welcomeMessage(game);

    // See: sutra.js for game logic
    let rules = sutras(game);
    game.setSutra(rules);

    // if touch warp, switch to Platform level
    game.createEntity({
      type: 'WARP',
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: 300,
        y: 0,
        z: 32
      }
    });

    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      color: 0xccff00,
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: 0,
        y: -200,
        z: 32

      }
    });

    // if touch fire damage entity
    game.createEntity({
      type: 'FIRE',
      texture: 'fire',
      //color: 0xff0000,
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: -400,
        y: 50,
        z: 32
      }
    });


  }

}

export default Home;
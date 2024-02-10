//
// Mantra Home World
//

import assets from './assets.js';
/*

  # Loading custom assets:

  Asset data can be loaded from a simple JSON config file

    game.addAssets(assets);

  Assets can be individually loaded in the `preload` method

    game.addAsset('/img/game/env/planet-express-base.png', 'image', 'planet-express-base');

*/

import sutras from './sutras.js';
/*
  
   # Custom Game Logic

   Use Sutra to add or modify your game's behavior tree

    game.useSutra(sutras(game), 'HOME');


*/

// TODO: remove this and use game.flashMessage() instead
import welcomeMessage from './welcomeMessage.js';

// TODO: make this a JSON object? it could be a list of entities
import createBackground from './lib/createBackground.js';

// TODO: make this a JSON object? it could be a list of entities
// game.load(backGroundEntities)

//
// All Worlds are Plugins
//
/*

    A Plugin is a class that has the following methods:

      - constructor() - required, must set an id
      - init(game) - required, must map `game` instance to `this`, is called automatically by game.start()
      - preload(game) - optional
      - unload() - optional ( called automatically during plugin::unload )
      - update(delta) - optional, called once per game loop
      - render(delta) - optional, called as many times as possible per render loop
      - handleCollision(a, b) - optional, called when a collision occurs


*/
class Home {
  static id = 'world-home';
  static type = 'world'; // type is optional for Plugins

  constructor() {
    this.id = Home.id;
    this.type = Home.type;
  }

  async preload(game) {
    //
    // game.addAssets() and game.addAsset() will accumulate assets into the preload queue
    //
    // game.start() and `game::ready` will wait for all assets to be loaded

    // add groups of assets
    game.addAssets(assets);

    // add single assets
    game.addAsset('/img/game/env/planet-express-base.png', 'image', 'planet-express-base');
    game.addAsset('/img/game/env/robot-arms-apartment.png', 'image', 'robot-arms-apartment');
    game.addAsset('/img/game/logos/sutra-tree.png', 'image', 'sutra-tree');
    game.addAsset('/img/game/env/warp-to-platform.gif', 'image', 'warp-to-platform');
    game.addAsset('/img/game/env/warp-to-music.gif', 'image', 'warp-to-music');
    game.addAsset('/img/game/env/warp-to-ycraft.gif', 'image', 'warp-to-ycraft');
    game.addAsset('/img/game/env/garden.png', 'image', 'garden');

    //
    // Game.start will call await.preloader.loadAll() for you
    //
    //   You may optionally invoke preloader to immediately load assets and wait
    //
    //     await game.preloader.loadAll();
    //
  }


  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;

    game.reset();

    if (game.isTouchDevice()) {
      game.zoom(1.44);
    } else {
      game.zoom(4.5);
    }

    game.setSize(16000, 9000);
    game.setGravity(0, 0, 0);

    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      },
      position: {
        x: 0,
        y: 0
      }
    });

    game.setBackground('#007fff');

    game.use('Block');
    game.use('Bomb');
    game.use('Border', { autoBorder: true })
    game.use('Bullet');
    game.use('Boomerang');
    game.use('Tone');

    welcomeMessage(game);
    game.useSutra(sutras(game), 'HOME');

    createBackground(game);

  }

  unload() {
    // optionally unload assets / remove events / etc
    // in most cases calling `game.reset()` at the start of the next world is sufficient
  }

}

export default Home;
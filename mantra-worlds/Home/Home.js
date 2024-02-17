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

    //
    // Use plugins in the preloader so that will be available when init() is called
    // You can await each plugin here, or let them preload in parallel automatically
    game.use('Block');
    game.use('Bomb');
    game.use('Border')
    game.use('Bullet');
    game.use('Boomerang');
    game.use('Flame');
    game.use('Player');


  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  update () {
    if (this.game.tick % 10 === 0) { // TODO: better exists check for player alive status
      if (!this.game.data.ents._[this.game.currentPlayerId]) {
        let player1 = game.build().Player().createEntity();
        game.setPlayerId(player1.id);
      }
    }
  }

  createWorld() {

    let game = this.game;

    game.reset();

    game.data.camera.follow = true;

    if (game.isTouchDevice()) {
      game.zoom(1.44);
    } else {
      game.zoom(4.5);
    }

    game.setSize(16000, 9000);
    game.setGravity(0, 0, 0);

    let player1 = game.build().Player().createEntity();
    game.setPlayerId(player1.id);

    /*
    game.after('removeEntity', function(entity) {
      if (entity.type === 'PLAYER') {
        game.createPlayer({
          respawns: true,
          texture: {
            sheet: 'loz_spritesheet',
            sprite: 'player',
          },
          position: {
            x: 0,
            y: 0
          }
        });
      }
    });
    */

    game.setBackground('#007fff');

    // game.use('Tone');
    this.createTwinFlames();    
    welcomeMessage(game);
    game.useSutra(sutras(game), 'HOME');

    createBackground(game);

  }

  createTwinFlames () {
    // See Flame plugin for .build() entity config
    this.game.build().Flame().position(-80, -60, 16).createEntity();
    this.game.build().Flame().position(80, -60, 16).createEntity();
  }

  unload() {
    // optionally unload assets / remove events / etc
    // in most cases calling `game.reset()` at the start of the next world is sufficient
  }

}

export default Home;
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
    game.use('Tone');
    game.use('Hexapod');
    game.use('Teleporter');
    game.use('Draggable');
    game.use('Collectable');
    game.use('Key');

  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  update() {
  }

  createWorld() {

    let game = this.game;

    game.reset();
    game.setBackground('#007fff');

    game.data.camera.follow = true;

    if (game.isTouchDevice()) {
      game.zoom(1.44);
    } else {
      game.zoom(4.5);
    }

    // game.build().Block().size(16).clone(10).createEntity();

    game.setSize(16000, 9000);
    game.setGravity(0, 0, 0);

    let player1 = game.build().Player({
      lives: 99,
    });

    let moving = false;
    let movingToPosition = {};


    player1.onUpdate(function (entity) {
      if (moving && movingToPosition.x && movingToPosition.y) {
        // move the player based on the angle of the mouse compared to the player
        // create a new force based on angle and speed
        let radians = movingToPosition.rotation
        let force = {
          x: Math.cos(radians) * 1.5,
          y: Math.sin(radians) * 1.5
        };
        // Remark: Directly apply forces to player, this is local only
        //         Networked movements need to go through Entity Input systems with control inputs
        // TODO:   Update default top-down movement system to support mouse movements
        game.applyForce(game.data.ents.PLAYER[0].id, force);

      }
    });


    player1 = player1.createEntity();

    game.setPlayerId(player1.id);
    game.build().Key().position(-100, 100, 10).createEntity();

    game.on('pointerUp', function (context, event) {
      if (game.isTouchDevice()) {
        if (context.endedFirstTouch) {
          moving = false;
        }
      } else {
        // Consider whether to stop movement based on which button was released
        if (context.buttons.RIGHT === false) {
          moving = false;
        }
      }
    });

    game.on('pointerMove', function (context, event) {
      let gamePointerPosition = context.position;
      let currentPlayer = game.data.ents.PLAYER[0];
      let playerPosition = currentPlayer.position;

      if (playerPosition && moving) { // Ensure we update the movement only if the player is set to move.
        let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);
        movingToPosition = {
          x: gamePointerPosition.x,
          y: gamePointerPosition.y,
          rotation: radians
        };
      }
    });

    game.on('pointerDown', function (context, event) {

      let gamePointerPosition = context.position;
      let currentPlayer = game.data.ents.PLAYER[0];
      let playerPosition = currentPlayer.position;

      if (playerPosition) {
        let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);

        // Simplified touch and non-touch device handling. 
        // Assumes first touch or right-click for movement, second touch or left-click for boomerang.
        if (game.isTouchDevice()) {
          if (event.pointerId === context.firstTouchId) {
            moving = true;
            movingToPosition = {
              x: gamePointerPosition.x,
              y: gamePointerPosition.y,
              rotation: radians
            };
          } else if (event.pointerId === context.secondTouchId) {
            game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
          }
        } else {
          // For non-touch devices, use right-click for movement and left-click for boomerang.
          if (context.buttons.RIGHT) {
            moving = true;
            movingToPosition = {
              x: gamePointerPosition.x,
              y: gamePointerPosition.y,
              rotation: radians
            };
          }
          if (context.buttons.LEFT) {
            game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
          }
        }
      }
    });

    //
    // Create 22 Hexapods
    //
    const numberOfHexapods = 24;
    const radius = 80;
    for (let i = 0; i < numberOfHexapods; i++) {
      // Calculate the angle for each hexapod
      let angle = (i / numberOfHexapods) * 2 * Math.PI;
      // Convert polar coordinates (angle, radius) to Cartesian coordinates (x, y)
      let x = radius * Math.cos(angle);
      let y = radius * Math.sin(angle);
      game.build().Hexapod().Draggable().collectable(true).size(8).position(x, y, 0).createEntity();
    };

    game.build().Block().size(16).position(0, -32).offset(0, 64).repeat(2).createEntity();

    this.createTwinFlames();
    welcomeMessage(game);
    game.useSutra(sutras(game), 'HOME');

    createBackground(game);

  }

  createTwinFlames() {
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
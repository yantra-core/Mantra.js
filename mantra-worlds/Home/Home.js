import sutras from './sutras.js';
import welcomeMessage from './welcomeMessage.js';

import enemy from '../../mantra-game/plugins/world-tower/sutras/enemy.js';
import walker from '../../mantra-game/plugins/world-tower/sutras/walker.js';

function createLineRoute(startX, startY, endX, endY, step) {
  const route = [];
  const dx = endX - startX;
  const dy = endY - startY;
  const steps = Math.max(Math.abs(dx), Math.abs(dy)) / step;
  for (let i = 0; i <= steps; i++) {
    route.push([startX + dx * i / steps, startY + dy * i / steps]);
  }
  return route;
}

function createRectangleRoute(x, y, width, height) {
  return [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y]
  ];
}

function createCircleRoute(centerX, centerY, radius, segments) {
  const route = [];
  for (let i = 0; i <= segments; i++) {
    const angle = 2 * Math.PI * i / segments;
    route.push([centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)]);
  }
  return route;
}

/*
const lineRoute = createLineRoute(0, 0, 200, 200, 20);
const rectangleRoute = createRectangleRoute(50, 50, 150, 100);
const circleRoute = createCircleRoute(100, 100, 50, 20);
*/



class Home {
  static id = 'world-home';
  static type = 'world'; // type is optional for Plugins
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.

  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;
    // game.data.camera.currentZoom = 2;
    game.setGravity(0, 0, 0);

    game.createDefaultPlayer({
      position: {
        x: 0,
        y: 0
      }
    });

    game.use('Block')
    game.use('Border', { autoBorder: true })
    game.use('Bullet')
    // game.use('Timers');

    game.use('Tone');
    // TODO: better control of loading tiles
    // TODO: game.systems.tile.loadTilemap() -> Tiled JSON
    game.use('Tile');

    //game.use('Sword')

    // welcomeMessage(game);

    // See: sutra.js for game logic
    let rules = sutras(game);
    let e = enemy.call(this);
    let w = walker(game,  {
      route: createRectangleRoute(-50, -150, 200, -150),
      // route: createLineRoute(-50, -150, 200, -150, 20),
      // route: createCircleRoute(0, 0, 100, 20),
      tolerance: 5
    });
    rules.use(w, 'walker');

    rules.addCondition('WalkerTouchedPlayer', (collision) => {
      console.log('ccc', collision)
      return (collision.entityA.type === 'Walker' && collision.entityB.type === 'Player') || (collision.entityA.type === 'Player' && collision.entityB.type === 'Walker');
    });

    rules.addCondition('WalkerTouchedPlayer', (entity, gameState) => {
      if (entity.type === 'COLLISION') {
        if (entity.bodyA.type === 'Walker' && entity.bodyB.type === 'PLAYER') {
          return true;
        }
        if (entity.bodyB.type === 'Walker' && entity.bodyA.type === 'PLAYER') {
          return true;
        }
      }
    });

    rules.on('2PlayerTakeDamage', (collision, node, gameState) => {
      console.log('PlayerTakeDamage', collision, gameState);

      game.removeEntity(collision.Walker.id);

      // get current walk count
      let walkerCount = gameState.ents.Walker.length || 0;

      if (walkerCount < 10) {
        // create a new walker
        game.createEntity({
          type: 'Walker',
          width: 16,
          height: 16,
          texture: {
            sheet: 'loz_spritesheet',
            sprite: 'bomb',
          },
          depth: 64,
          position: {
            x: -50,
            y: -150,
            z: 32
          }
        });

        game.createEntity({
          type: 'Walker',
          width: 16,
          height: 16,
          texture: {
            sheet: 'loz_spritesheet',
            sprite: 'bomb',
          },
          depth: 64,
          position: {
            x: 50,
            y: -150,
            z: 32
          }
        });
      }



    });

    rules
      .if('WalkerTouchedPlayer')
      .then('PlayerTakeDamage');

      /*
    game.createEntity({
      type: 'Walker',
      width: 16,
      height: 16,
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'bomb',
      },
      depth: 64,
      position: {
        x: -50,
        y: -150,
        z: 32
      }
    });
    */

    game.createEntity({
      type: 'Walker',
      sutra: 'walker',
      width: 22,
      height: 24,
      texture: {
        sheet: 'jogurt',
        sprite: 'walkLeft'
      },
      depth: 64,
      position: {
        x: 50,
        y: -150,
        z: 32
      }
    });

    rules.addCondition('true', () => {
      return true;
    })

    game.setSutra(rules);

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'tile-grass',
      width: game.data.width,
      height: game.data.height,
      body: false,
      position: {
        x: 0,
        y: 0,
        z: -10
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'robot-arms-apartment',

      width: 1340,
      height: 3668,
      body: false,
      position: { // position to right
        x: 900,
        y: -1800,
        z: 1
      }
    });

    game.createEntity({
      type: 'BACKGROUND',
      texture: 'planet-express-base',

      width: 2048,
      height: 2048,
      body: false,
      position: { // position to right
        x: -900,
        y: -800,
        z: 1
      }
    });

    game.createEntity({
      type: 'BLOCK',
      texture: 'tile-block',
      width: 200,
      height: 200,
      mass: 10000,
      // body: false,
      position: { // position to right
        x: 200,
        y: -800,
        z: -8
      }
    });

    /*
    // text element to explain graphics engines
    game.createEntity({
      type: 'TEXT',
      text: 'This is text on how to use game\n <----- Move this way',
      fontSize: 144,
      color: 0x000000,
      body: false,
      position: {
        x: -800,
        y: 0,
        z: 10
      }
    });
    */

    game.createEntity({
      type: 'WARP',
      kind: 'Platform',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-platform',
      isStatic: true,
      position: {
        x: 300,
        y: 0,
        z: 32
      }
    });

    // if touch warp, switch to YCraft level
    game.createEntity({
      type: 'WARP',
      kind: 'YCraft',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-ycraft',
      isStatic: true,
      isSensor: true,
      position: {
        x: 0,
        y: -150,
        z: 32
      }
    });

    // text label saying "Warp To YCraft World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To <br/> YCraft World',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 0,
        y: -180,
        z: 64
      }
    });

    // if touch warp, switch to Babylon Graphics
    game.createEntity({
      type: 'BLOCK',
      width: 64,
      height: 64,
      depth: 64,
      texture: '3d-homer',
      isSensor: true,
      // isStatic: true,
      position: {
        x: -40,
        y: 20,
        z: 32
      }
    });

    // switch to 3d text label
    game.createEntity({
      type: 'TEXT',
      text: 'Rendered with CSSGraphics Engine',
      width: 20,
      color: 0x000000,
      style: {
        width: '150px',
        fontSize: '12px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -72,
        y: -30,
        z: 64
      }
    });

    // switch to 3d text label
    game.createEntity({
      type: 'TEXT',
      text: 'Upgrade Graphics to 3D',
      width: 20,
      color: 0x000000,
      style: {
        width: '60px',
        fontSize: '12px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -80,
        y: 100,
        z: 64
      }
    });

    // switch to phaser 3
    game.createEntity({
      type: 'TEXT',
      text: 'Upgrade to Canvas Graphics',
      width: 20,
      color: 0x000000,
      style: {
        width: '60px',
        fontSize: '12px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 20,
        y: 100,
        z: 64
      }
    });

    // if touch warp, switch to Music level
    game.createEntity({
      type: 'WARP',
      kind: 'Music',
      width: 64,
      height: 64,
      depth: 64,
      texture: 'warp-to-music',
      isStatic: true,
      position: {
        x: -300,
        y: 0,
        z: 32
      }
    });

    // text label saying "Warp To Platform World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To <br/> Music World',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -300,
        y: -30,
        z: 64
      }
    });

    // text label saying "Warp To Platform World"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To <br/> Platform World',
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 300,
        y: -30,
        z: 64
      }
    });

    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      color: 0xccff00,
      width: 32,
      height: 32,
      depth: 16,
      isStatic: true,
      position: {
        x: -120,
        y: -200,
        z: 32
      }
    });

    /*
    game.createEntity({
      name: 'noteInfo',
      type: 'TEXT',
      text: 'This is a note, touch it to play a sound',
      fontSize: 16,
      color: 0x000000,
      body: false,
      style: {
        fontSize: '16px'
      },
      position: {
        x: 0,
        y: -200,
        z: 64
      }
    });
    */

    let itemsList = ['arrow', 'sword', 'lantern', 'fire', 'bomb', 'iceArrow', 'boomerang'];

    itemsList.forEach((item, index) => {
      game.createEntity({
        type: item.toUpperCase(),
        kind: item,
        width: 16,
        height: 16,
        depth: 32,
        texture: {
          sheet: 'loz_spritesheet',
          sprite: item,
        },
        position: {
          x: -100 + (index * 32),
          y: 150,
          z: 32
        }
      });
    });

    // if touch fire damage entity
    game.createEntity({
      type: 'FIRE',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'fire',
      //color: 0xff0000,
      width: 16,
      height: 16,
      depth: 64,
      isStatic: true,
      position: {
        x: -120,
        y: -60,
        z: 32
      }
    });

    game.createEntity({
      type: 'FIRE',
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'fire',
        // frame: 0 // TODO: support single frame / bypass animation of array
      },
      //texture: 'fire',
      //color: 0xff0000,
      width: 16,
      height: 16,
      depth: 64,
      isStatic: true,
      position: {
        x: 100,
        y: -60,
        z: 32
      }
    });

  }

}

export default Home;
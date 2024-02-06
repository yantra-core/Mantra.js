// GravityGardens.js - Marak Squires 2024
import blackhole from '../../mantra-sutras/blackhole.js'
import fount from '../../mantra-sutras/fount.js'

class GravityGardens {
  static id = 'world-gravity-gardens';
  static type = 'gravity-gardens';

  constructor() {
    this.id = GravityGardens.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
    game.use('CurrentFPS');

  }

  createWorld() {
    let game = this.game;

    game.reset();
    game.setGravity(0, 0, 0);
    game.setSize(800, 600);
    game.setZoom(2.5);

    let player = game.createPlayer({
      color: 0xcccccc,
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    });

    game.setBackground('#007fff');

    let rules = game.rules;

    function switchGravity(entity, game) {
      if (typeof game.data.lastGravitySwitch === 'undefined') {
        game.data.lastGravitySwitch = 0;
      }
      if (Date.now() - game.data.lastGravitySwitch >= 1000) {
        game.data.repulsion = !game.data.repulsion;

        // get screen center coordinates, take the window size and divide by 2
        // use the document window here not the game data
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2 + 24;

        if (game.data.repulsion) {
          game.pingPosition(x, y, { color: 'red', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
          game.updateEntity({
            id: entity.id,
            color: 0xff0000
          });
        } else {
          game.pingPosition(x, y, { reverse: true, color: 'white', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
          // update the player color
          game.updateEntity({
            id: entity.id,
            color: 0xffffff
          });
        }

        game.data.lastGravitySwitch = Date.now();
      }

    }
    // game.customControls = true;
    // game.customMovement = false;
    game.setControls({
      W: 'PLAYER_UP',
      S: 'PLAYER_DOWN',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      // SPACE: 'FIRE_BULLET',
      // K: 'FIRE_BULLET',
      O: 'ZOOM_IN',
      P: 'ZOOM_OUT',
      L: function (entity, game) {
        switchGravity(entity, game);
      },
      SPACE: function (entity, game) {
        switchGravity(entity, game);
      },
      K: 'CAMERA_SHAKE',
      U: 'SELECT_MENU'
    });

    game.use('StarField');

    if (game.systems.border) {
      game.systems.border.createAutoBorder();
    } else {
      game.use('Border', { autoBorder: true })
    }

    createFounts(game);

    // Particles will be removed when they collide with the wall
    let wallCollision = game.createSutra();

    wallCollision.addCondition('particleTouchedWall', (entity, gameState) => {
      return entity.type === 'COLLISION' && entity.kind === 'START' && entity.BORDER;
    });

    wallCollision.if('particleTouchedWall').then('particleWallCollision');

    wallCollision.on('particleWallCollision', (collision) => {
      let particle = collision.PARTICLE || collision.STAR;
      if (particle) {
        // remove the entity
        game.removeEntity(particle.id);
      }
    });

    game.useSutra(wallCollision, 'wallCollision');
    // Apply the blackhole behavior to existing entities
    game.updateEntity({
      id: player.id,
      sutra: blackhole(game, player)
    });

    // warp to Platform level
    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Home'
      },
      texture: 'warp-to-home',
      width: 64,
      height: 64,
      depth: 64,
      isStatic: true,
      position: {
        x: 600,
        y: -30,
        z: 0
      }
    });

    // text "Warp to Mantra"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      // kind: 'dynamic',
      style: {
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: 595,
        y: -60
      }
    });
  }

}

function createFounts(game) {
  let fountA = game.createEntity({
    name: 'fountA',
    type: 'FOUNT',
    color: 0xf03025,
    isStatic: true,
    width: 8,
    height: 8,
    position: { x: 200, y: 0 },
  });

  game.updateEntity({
    id: fountA.id,
    sutra: fount(game, fountA, { sprayAngle: 0, color: 0xf03025 })
  });

  let fountB = game.createEntity({
    name: 'fountB',
    type: 'FOUNT',
    color: 0x14b161,
    isStatic: true,
    width: 8,
    height: 8,
    position: { x: -200, y: 0 }
  });

  game.updateEntity({
    id: fountB.id,
    sutra: fount(game, fountB, { sprayAngle: Math.PI, color: 0x14b161 })
  });

  let fountC = game.createEntity({
    name: 'fountC',
    type: 'FOUNT',
    color: 0x3c62f8,
    isStatic: true,
    width: 8,
    height: 8,
    position: { x: 0, y: -200 },
  });

  game.updateEntity({
    id: fountC.id,
    sutra: fount(game, fountC, { sprayAngle: Math.PI / 2, color: 0x3c62f8 })
  });

  let fountD = game.createEntity({
    name: 'fountD',
    type: 'FOUNT',
    color: 0xe9dd34,
    isStatic: true,
    width: 8,
    height: 8,
    position: { x: 0, y: 200 }
  });

  game.updateEntity({
    id: fountD.id,
    sutra: fount(game, fountD, { sprayAngle: -Math.PI / 2, color: 0xe9dd34 })
  });


}

export default GravityGardens;

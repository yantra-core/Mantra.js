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

    function switchGravity(entity, gameState) {

      if (typeof gameState.lastGravitySwitch === 'undefined') {
        gameState.lastGravitySwitch = 0;
      }
      if (Date.now() - gameState.lastGravitySwitch >= 1000) {
        gameState.repulsion = !gameState.repulsion;

        // get screen center coordinates, take the window size and divide by 2
        // use the document window here not the game data
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2 + 24;

        if (gameState.repulsion) {
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

        gameState.lastGravitySwitch = Date.now();
      }

    }

    // Remark: You can also use Sutra rules to define custom controls instead of direct mappings
    // TODO: just bind to sutra rules or events here?

    // remove default behaviors
    rules.removeNodes({
      if: 'USE_ITEM_1'
    });

    rules.removeNodes({
      if: 'USE_ITEM_2'
    });

    rules.removeNodes({
      if: 'ZOOM_IN'
    });

    rules.removeNodes({
      if: 'ZOOM_OUT'
    });

    rules.if('USE_ITEM_1').then('switchGravity');
    rules.if('USE_ITEM_2').then('shakeCamera');
    rules.if('USE_ITEM_3').then('ZOOM_IN');
    rules.if('USE_ITEM_4').then('ZOOM_OUT');

    rules.on('switchGravity', (entity, node, gameState) => {
      switchGravity(entity, gameState);
    });

    rules.on('shakeCamera', (entity, node, gameState) => {
      game.shakeCamera({ duration: 777, intensity: 1000 });
    });
    
    rules.on('ZOOM_IN', function (entity) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom + 0.01);
    });

    rules.on('ZOOM_OUT', function (entity) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom - 0.01);
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

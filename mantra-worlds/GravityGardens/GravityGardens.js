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
  }

  createWorld() {
    let game = this.game;
    game.setGravity(0, 0, 0);

    let player = game.createDefaultPlayer({
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    });

    game.setBackground('#007fff');

    game.setControls({
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      SPACE: 'FIRE_BULLET',
      // K: 'FIRE_BULLET',
      K: 'ZOOM_IN',
      L: 'ZOOM_OUT',
      O: function (game) {
        if (typeof game.data.lastGravitySwitch === 'undefined') {
          game.data.lastGravitySwitch = 0;
        }
        if (Date.now() - game.data.lastGravitySwitch >= 1000) {
          game.data.repulsion = !game.data.repulsion;
          game.data.lastGravitySwitch = Date.now();
        }
      },
      P: 'CAMERA_SHAKE',
      U: 'SELECT_MENU'
    });

    game.use('StarField');
    game.use('Border', { autoBorder: true })

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

    game.setSutra(wallCollision);
    // game.setSutra(blackhole(game));
    // game.setSutra(fount(game));

    // Create stand-alone black hole Sutra with entity
    // game.rules.emit('blackhole::create');

    // Apply the blackhole behavior to existing entities
    game.updateEntity({
      id: player.id,
      sutra: blackhole(game, player)
    });

  }


}

export default GravityGardens;

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

    if (game.isTouchDevice()) {
      game.zoom(1);
    } else {
      game.zoom(2.5);
    }

    let player = game.createPlayer({
      color: 0xcccccc,
      texture: null,
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

        // pings the screen center, assuming player is there
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        x = x - game.data.camera.offsetX;
        y = y - game.data.camera.offsetY;

        if (gameState.repulsion) {
          game.pingPosition(x, y, 1, { color: 'red', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
          game.updateEntity({
            id: entity.id,
            color: 0xff0000
          });
        } else {
          game.pingPosition(x, y, 1, { reverse: true, color: 'white', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
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

    let dropping = false;
    let slurping = false;
    let mousePosition = { x: 0, y: 0 };
    game.on('pointerUp', function (position, event) {
      dropping = false;
      slurping = false;
    });

    game.on('pointerDown', function (position, event) {
      mousePosition = position;

      // adjust position for game camera offset
      mousePosition.x = mousePosition.x - game.data.camera.offsetX;
      mousePosition.y = mousePosition.y - game.data.camera.offsetY;

      mousePosition.clientX = event.clientX;
      mousePosition.clientY = event.clientY;
      // if right click
      if (event.button === 2) {
        slurping = true;
        game.pingPosition(event.clientX, event.clientY, 1, {  reverse: true, color: 'red', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }

      // if left click
      if (event.button === 0) {
        dropping = true;
        game.pingPosition(event.clientX, event.clientY, 1, {  color: 'white', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }
    });

    game.on('pointerMove', function (position, event) {
      mousePosition = position;
      mousePosition.x = mousePosition.x - game.data.camera.offsetX;
      mousePosition.y = mousePosition.y - game.data.camera.offsetY;
    });

    // mouse drops particles logic
    game.before('update', function () {
      if (dropping && game.tick % 3 === 0) {
        // console.log('dropping', mousePosition.x, mousePosition.y);
        let randomRadialPosition = game.randomPositionRadial(mousePosition.x, mousePosition.y, 15);
        let randomColor = game.randomColor();
        // create burst of particles at this position
        game.createEntity({
          type: 'PARTICLE',
          kind: 'START',
          color: randomColor,
          isSensor: true,
          size: {
            width: 8,
            height: 8
          },
          position: randomRadialPosition
        });
      }

      // show repeating ping
      if (dropping && game.tick % 10 === 0 ) {
        // game.pingPosition(mousePosition.clientX, mousePosition.clientY, -1, { color: 'white', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }

    });

    // mouse slurps up particles logic
    game.before('update', function () {
      if (slurping && game.tick % 3 === 0) {
        Object.keys(game.data.ents._).forEach(eId => {
          let entity = game.data.ents._[eId];
          if (entity.type !== 'BLACK_HOLE' && entity.type !== 'PLAYER') {
            game.applyGravity({ position: mousePosition, mass: 1000 }, entity, 0.01);
          }
        });
      }

      // show repeating ping
      if (slurping && game.tick % 10 === 0 ) {
        // game.pingPosition(mousePosition.clientX, mousePosition.clientY, -1, { color: 'red', reverse: true, duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }

    });

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
        // only remove if ctick is very old to game.tick
        game.removeEntity(particle.id);
        /*
        if (particle.ctick < game.tick - 1000) {}
        */
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

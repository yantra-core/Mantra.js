// GravityGardens.js - Marak Squires 2024
class GravityGardens {
  static id = 'gravity-gardens';
  static type = 'world';

  constructor() {
    this.id = GravityGardens.id;
    this.type = GravityGardens.type;
    this.dropping = false;
    this.slurping = false;
  }

  async preload(game) {
    // preload these plugins before the plugin starts
    game.use('Player');
    game.use('GravityWell');
    game.use('UnitSpawner');
    game.use('Teleporter');
  }

  init(game) {
    this.game = game;

    // Changes the default mouse controls

    // Enables mouse wheel zoom
    game.data.camera.mouseWheelZoomEnabled = true;
    // Movements with right click, switch default left-click-to-move behavior
    game.config.mouseMovementButton = 'RIGHT';
    // Actions with left click
    game.config.mouseActionButton = 'LEFT';

    // enables the default top-down mouse movements
    game.config.defaultMouseMovement = true;


    // we reset the game to clear any previous state
    game.reset();

    game.data.camera.follow = true;


    this.createWorld();
    this.createFounts(game);
    this.bindEvents();
    this.bindSutraRules();

    // we can lazy load these after the plugin has started
    game.use('CurrentFPS');
    game.use('StarField');
  }

  createWorld() {
    let game = this.game;

    game.setGravity(0, 0, 0);
    game.setSize(800, 600);
    game.createBorder({
      thickness: 20,
      collisionStart: function (a, b, pair, context) {
        if (context.target.type === 'PARTICLE') {
          game.removeEntity(context.target.id);
        }
      }
    });

    // set the zoom level based on device type
    if (game.isTouchDevice()) {
      game.zoom(1);
    } else {
      game.zoom(2.5);
    }

    // Builds a Player config with GravityWell 
    let playerConfig = game.make()
      .GravityWell()     // The player will have a gravity well
      .Player()          // The player Plugin
      .texture(null)     // default texture is a player sprite
      .color(0xffcccc)   // gives a color to the player
      .meta({
        repulsion: false // set the repulsion flag to false, attracts
      })
      .position(0, 0, 0) // sets the player position

    playerConfig.collisionStart(function (a, b, pair, context) {
      if (context.target.type !== 'WARP') {
        game.removeEntity(context.target.id);
      }
    });

    playerConfig = playerConfig.build();

    let player = game.createEntity(playerConfig);
    game.setPlayerId(player.id);

    game.make()
      .type('WARP')
      .Teleporter({
        destination: {
          world: 'Home'
        }
      })
      .texture('warp-to-home')
      .size(64, 64, 64)
      .isStatic(true)
      //.isSensor(true)
      .position(595, -30, 0)
      .createEntity();

    game.make()
      .type('TEXT')
      .text('Warp To Mantra')
      .width(200)
      .style({ padding: '2px', fontSize: '16px', color: '#ffffff', textAlign: 'center' })
      .position(590, 30, 0)
      .createEntity();

  }

  bindSutraRules() {
    let game = this.game;
    let rules = game.rules;

    rules.if('USE_ITEM_1').then('switchGravity');
    rules.if('USE_ITEM_2').then('shakeCamera');
    rules.if('USE_ITEM_3').then('ZOOM_IN');
    rules.if('USE_ITEM_4').then('ZOOM_OUT');

    rules.on('switchGravity', (entity, node, gameState) => {
      this.playerSwitchedGravity(entity, gameState);
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

  }

  // Plugin.update() is called once per game tick
  update() {
    let game = this.game;
    // mouse drops particles logic
    if (this.dropping && game.tick % 3 === 0) {
      // console.log('dropping', mousePosition.x, mousePosition.y);
      let randomRadialPosition = game.randomPositionRadial(this.mousePosition.x, this.mousePosition.y, 15);
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

    // mouse slurps up particles logic
    if (this.slurping && game.tick % 3 === 0) {
      Object.keys(game.data.ents._).forEach(eId => {
        let entity = game.data.ents._[eId];
        if (entity.type !== 'BLACK_HOLE' && entity.type !== 'PLAYER') {
          game.applyGravity({ position: this.mousePosition, mass: 1000 }, entity, 0.01);
        }
      });
    }

  }

  bindEvents() {
    let game = this.game;
    this.mousePosition = { x: 0, y: 0 };
    let that = this;

    game.on('pointerUp', function (position, event) {
      that.dropping = false;
      that.slurping = false;
    });

    game.on('pointerDown', function (context, event) {
      let position = context.position;
      that.mousePosition = position;

      // adjust position for game camera offset
      that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
      that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;

      that.mousePosition.clientX = event.clientX;
      that.mousePosition.clientY = event.clientY;
      // if right click
      if (event.button === 2) {}

      // if left click
      if (event.button === 0) {
        that.dropping = true;
        game.pingPosition(event.clientX, event.clientY, 1, { color: 'white', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
        that.slurping = true;
        game.pingPosition(event.clientX, event.clientY, 1, { reverse: true, color: 'red', duration: 1500, size: 25, finalSize: 100, borderWidth: 3 });
      }
    });

    game.on('pointerMove', function (position, event) {
      that.mousePosition = position;
      that.mousePosition.x = that.mousePosition.x - game.data.camera.offsetX;
      that.mousePosition.y = that.mousePosition.y - game.data.camera.offsetY;
    });

  }

  createFounts() {

    let game = this.game;

    // will set the collistionStart flag to true in order to register collision events
    let particleCollision = true;

    game.make()
      .name('fountA')
      .type('FOUNT')
      .UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0xf03025,
          isSensor: true,
          position: { x: 200, y: 0 },
        }
      })
      .color(0xf03025)
      .isStatic(true)
      .size(8, 8)
      .position(200, 0)
      .createEntity(); // Finalizes and creates the entity

    game.make()
      .name('fountB')
      .type('FOUNT')
      .UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0x14b161,
          isSensor: true,
          position: { x: -200, y: 0 },
          sprayAngle: Math.PI,
        }
      })
      .color(0x14b161)
      .isStatic(true)
      .size(8, 8)
      .position(-200, 0)
      .createEntity(); // Finalizes and creates the entity

    game.make()
      .name('fountC')
      .type('FOUNT')
      .UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0x3c62f8,
          isSensor: true,
          position: { x: 0, y: -200 },
          sprayAngle: Math.PI / 2,
        }
      })
      .color(0x3c62f8)
      .isStatic(true)
      .size(8, 8)
      .position(0, -200)
      .createEntity(); // Finalizes and creates the entity

    game.make()
      .name('fountD')
      .type('FOUNT')
      .UnitSpawner({
        unitConfig: {
          type: 'PARTICLE',
          color: 0xe9dd34,
          isSensor: true,
          position: { x: 0, y: 200 },
          sprayAngle: -Math.PI / 2,
        }
      })
      .color(0xe9dd34)
      .isStatic(true)
      .size(8, 8)
      .position(0, 200)
      .createEntity(); // Finalizes and creates the entity

  }

  playerSwitchedGravity(entity, gameState) {

    let game = this.game;
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
      if (entity.meta && entity.meta.repulsion) {
        game.pingPosition(x, y, 1, { reverse: true, color: 'white', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
        game.updateEntity({
          id: entity.id,
          color: 0xff0000,
          meta: {
            repulsion: false
          }
        });
      } else {
        game.pingPosition(x, y, 1, { color: 'red', duration: 1500, size: 50, finalSize: 200, borderWidth: 3 });
        // update the player color
        game.updateEntity({
          id: entity.id,
          color: 0xffffff,
          meta: {
            repulsion: true
          }
        });
      }

      gameState.lastGravitySwitch = Date.now();
    }

  }

}

export default GravityGardens;
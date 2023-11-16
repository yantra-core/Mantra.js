// assume global phaser for now
//import Phaser from 'phaser';
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class PhaserGraphics extends GraphicsInterface {
  constructor({ camera = {}, startingZoom = 0.4 } = {}) {
    super();
    this.name = 'graphics-phaser';

    let config = {
      camera,
      startingZoom
    };
    // config scope for convenience
    this.config = config;

    this.startingZoom = startingZoom;
    this.scenesReady = false;
    this.scene = null;
  }

  init(game) {
    // console.log('PhaserGraphics.init()');

    // register renderer with graphics pipeline
    game.graphics.push(this);
    this.game = game;

    this.game.systemsManager.addSystem('graphics-phaser', this);

    // check to see if Phaser scope is available, if not assume we need to inject it sequentially
    if (typeof Phaser === 'undefined') {
      console.log('Phaser is not defined, attempting to load it from vendor');

      game.loadScripts([
        '/vendor/phaser.min.js'
      ], () => {
        this.phaserReady(game);
      });

    } else {
      this.phaserReady(game);
    }

  }


  phaserReady(game) {

    let _Main = new Phaser.Class({

      Extends: Phaser.Scene,

      initialize:

        function Main() {
          Phaser.Scene.call(this, 'Main');
        },


      init() {

      },
      create() {
        this.cameras.main.setBackgroundColor('#000000');
      },

      preload: function () {
        this.load.image('player', 'textures/flare.png');
      }
    });


    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'gameHolder',
      width: game.width, // TODO: config  
      height: game.height,
      scene: [_Main]
    });

    let self = this;
    function loadMainScene() {
      let scene = self.phaserGame.scene.getScene('Main');
      if (!scene) {
        setTimeout(loadMainScene.bind(self), 10);
        return;
      }

      let canvas = self.phaserGame.canvas;
      canvas.setAttribute('id', 'phaser-render-canvas');
      self.scene = scene;
      let camera = scene.cameras.main;

      self.scenesReady = true;
      game.graphicsReady.push(self.name);

      // camera.rotation = -Math.PI / 2;
      /*
      // TODO: mouse wheel zoom.js
      self.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        console.log('wheel', pointer, gameObjects, deltaX, deltaY, deltaZ)
      });
      */
    }


    let Main = new Phaser.Class({

      Extends: Phaser.Scene,

      initialize:

        function Main() {
          Phaser.Scene.call(this, 'Main');
        },


      init() {

      },
      create() {
        this.cameras.main.setBackgroundColor('#000000');
      },

      preload: function () {
        this.load.image('player', 'textures/flare.png');
      }
    });

    loadMainScene();

  }

  removeGraphic(entityId) {
    let entity = this.game.getEntity(entityId);
    if (!entity || !entity.graphics || !entity.graphics['graphics-phaser']) {
      return;
    }
    // TODO: auto-scope graphics-babylon to the entity, so we don't need to do this
    let gameobject = entity.graphics['graphics-phaser'];
    gameobject.destroy();
  }


  updateGraphic(entityData) {

    let previousEntity = this.game.getEntity(entityData.id);
    if (!previousEntity || !previousEntity.graphics || !previousEntity.position) {
      return;
    }
    if (previousEntity.position.x === entityData.position.x && previousEntity.position.y === entityData.position.y) {
      // TODO: we shouldn't need to do this as getPlayerSnapshot() should only return diff state
      // There may be an issue with how delta encoding works for offline mode, needs tests
      // return;
    }
    // console.log('updating graphic', entityData.id, entityData.position)

    let gameobject = previousEntity.graphics['graphics-phaser'];

    if (!gameobject) {
      console.log('no gameobject found for', entityData.id);
      return;
    }

    /*
    // Adjust the coordinates to account for the center (0,0) world
    let adjustedX = entityData.position.x + this.game.width / 2;
    let adjustedY = entityData.position.y + this.game.height / 2;

    gameobject.setPosition(adjustedX, adjustedY);
    gameobject.x = adjustedX;
    gameobject.y = adjustedY;
    */
   gameobject.setPosition(entityData.position.x, entityData.position.y);

    // TODO: move this to common 3D-2.5D transform function(s)
    if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
      if (typeof entityData.rotation === 'object') {
        // transform 3d to 2.5d
        gameobject.rotation = entityData.rotation.x;
      } else {
        gameobject.rotation = entityData.rotation;
      }
    }

    // console.log('updating position', entityData.position)
    // convert rotation to degrees

  }

  createGraphic(entityData) {

    // switch case based on entityData.type
    let graphic;
    switch (entityData.type) {
      case 'PLAYER':
        if (entityData.shape === 'rectangle') {
          graphic = this.createBox(entityData);
        } else {
          graphic = this.createTriangle(entityData);
        }
        break;
      case 'BULLET':
        graphic = this.createCircle(entityData);
        break;
        graphic = this.createTriangle(entityData);
      default:
        graphic = this.createBox(entityData); // TODO: createDefault()
    }

    let adjustedX = entityData.position.x + this.game.width / 2;
    let adjustedY = entityData.position.y + this.game.height / 2;

    graphic.setPosition(adjustedX, adjustedY);
    return graphic;
  }
  createBox(entityData) {

    let box = this.scene.add.graphics();
    box.fillStyle(0xff0000, 1);
    box.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);

    // Adjust the coordinates to account for the center (0,0) world
    let adjustedX = entityData.position.x + this.game.width / 2;
    let adjustedY = entityData.position.y + this.game.height / 2;

    // We use a container to easily manage origin and position
    let container = this.scene.add.container(adjustedX, adjustedY);
    container.add(box);

    return container;
  }

  createTriangle(entityData) {

    if (!this.scene) {
      console.log('no scene yet, this should not happen.');
      return;
    }

    // Assuming entityData.x and entityData.y specify the center of the triangle
    let centerX = entityData.position.x;
    let centerY = entityData.position.y;

    // Calculate the vertices of the triangle
    let height = entityData.height || 64;
    let width = entityData.width || 64;

    // Points for an equilateral triangle, adjust these calculations if you need a different type of triangle
    let halfWidth = width / 2;
    let point1 = { x: centerX - halfWidth, y: centerY + (height / 2) };
    let point2 = { x: centerX + halfWidth, y: centerY + (height / 2) };
    let point3 = { x: centerX, y: centerY - (height / 2) };  // Apex of the triangle

    // Draw the triangle
    let sprite = this.scene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    sprite.setDepth(10);

    // TODO: move this to common 3D-2.5D transform function(s)
    if (typeof entityData.rotation !== 'undefined') { // Remark: shouldn't this be default 0?
      if (typeof rotation === 'object') {
        // transform 3d to 2.5d
        sprite.rotation = entityData.rotation.x;
      } else {
        sprite.rotation = entityData.rotation;
      }
    }
    // setPosition not needed immediately after create?
    // sprite.setPosition(entityData.position.x, entityData.position.y);
    this.scene.add.existing(sprite);
    return sprite;
  }

  createCircle(entityData) {
    let sprite = this.scene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillCircle(0, 0, 50);
    sprite.setDepth(10);
    //sprite.x = entityData.position.x;
    //sprite.y = entityData.position.y;
    return sprite;
  }

  update(entitiesData) {
    if (!this.scenesReady) {
      return;
    }

    let camera = this.scene.cameras.main;
    if (this.config.camera && this.config.camera === 'follow') {

      //    if (this.followPlayer && this.followingPlayer !== true) {
      // Camera settings
      let player = this.game.getEntity(window.currentPlayerId);
      let graphics = this.game.components.graphics.get(window.currentPlayerId);

      if (player && graphics && player.graphics['graphics-phaser']) {
        camera.startFollow(player.graphics['graphics-phaser']);
        this.followingPlayer = true;
      }
    }

    // center camera
    // TODO now center the camera
    // center camera to (0,0) in game world coordinates
    let centerX = 0;
    let centerY = 0;
    // console.log('centering camera', centerX, centerY)
    camera.setPosition(centerX, centerY);
    camera.zoom = this.startingZoom;

    // console.log('phaser update called', snapshot)
  }

  inflate(snapshot) {
    console.log(snapshot)
  }

  render(game, alpha) {
    let self = this;

    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateEntity(ent, alpha);
    }
  }

  inflateEntity(entity, alpha) {

    if (entity.graphics && entity.graphics['graphics-phaser']) {
      let graphic = entity.graphics['graphics-phaser'];

      if (entity.type === 'BULLET') {
      } else {
        this.updateGraphic(entity, alpha);
      }

    } else {


      // Adjust the coordinates to account for the center (0,0) world
      let adjustedX = entity.position.x + this.game.width / 2;
      let adjustedY = entity.position.y + this.game.height / 2;

      //gameobject.setPosition(adjustedX, adjustedY);
      //gameobject.x = adjustedX;
      //gameobject.y = adjustedY;

      //entity.position.x = adjustedX;
      //entity.position.y = adjustedY;
      // console.log('creating', entity.position)
      let graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-phaser'], graphic);

    }
  }

  // Implement other necessary methods or adjust according to your architecture
}

export default PhaserGraphics;

// assume global phaser for now
//import Phaser from 'phaser';
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class PhaserRenderer extends GraphicsInterface {
  constructor(config) {
    super();
    this.config = config;

    this.name = 'graphics-phaser';

    this.scenesReady = false;
    this.scene = null;

  }

  init(game) {

    game.graphics.push(this);
    this.game = game;

    this.game.systemsManager.addSystem('graphics-phaser', this);


    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'phaser-root',
      width: game.width, // TODO: config  
      height: game.height,
      scene: [Main]
    });

    let self = this;
    function loadMainScene() {
      let scene = self.phaserGame.scene.getScene('Main');
      if (!scene) {
        setTimeout(loadMainScene.bind(self), 10);
        return;
      }
      self.scenesReady = true;
      game.graphicsReady.push(self.name);

      let canvas = self.phaserGame.canvas;
      canvas.setAttribute('id', 'phaser-canvas');
      self.scene = scene;
      let camera = scene.cameras.main;
      // camera.rotation = -Math.PI / 2;
      /*
      // TODO: mouse wheel zoom.js
      self.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        console.log('wheel', pointer, gameObjects, deltaX, deltaY, deltaZ)
      });
      */
    }

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
    if (!previousEntity || !previousEntity.graphics) {
      console.log('no previous entity found for', entityData.id);
      return;
    }

    let gameobject = previousEntity.graphics['graphics-phaser'];

    if (!gameobject) {
      console.log('no gameobject found for', entityData.id);
      return;
    }

    gameobject.setPosition(entityData.position.x, entityData.position.y);
    gameobject.x = entityData.position.x;
    gameobject.y = entityData.position.y;

    if (entityData.rotation) {
    //  let rotated = -entityData.rotation - Math.PI / 2;
      gameobject.rotation = entityData.rotation;
    }

    // console.log('updating position', entityData.position)
    // convert rotation to degrees

  }

  createGraphic(entityData) {
    // switch case based on entityData.type
    let graphic;
    switch (entityData.type) {
      case 'PLAYER':
        graphic = this.createTriangle(entityData);
        break;
      case 'BULLET':
        graphic = this.createCircle(entityData);
        break;
        graphic = this.createTriangle(entityData);
      default:
        graphic = this.createBox(entityData); // TODO: createDefault()
    }
    graphic.setPosition(entityData.position.x, entityData.position.y);
    return graphic;
  }
  createBox(entityData) {

    let box = this.scene.add.graphics();
    box.fillStyle(0xff0000, 1);
    box.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
  
    // We use a container to easily manage origin and position
    let container = this.scene.add.container(entityData.position.x, entityData.position.y);
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

    // rotate sprite by -Math.PI / 2;
    if (typeof entityData.rotation !== 'undefined') { // Remark: shouldn't this be default 0?
      sprite.rotation = entityData.rotation;
    }

    //camera.rotation m= -Math.PI / 2;
    sprite.setPosition(entityData.position.x, entityData.position.y);
    this.scene.add.existing(sprite);
    return sprite;
  }

  createCircle(entityData) {
    let sprite = this.scene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillCircle(0, 0, 50);
    sprite.setDepth(10);
    sprite.x = entityData.position.x;
    sprite.y = entityData.position.y;
    return sprite;
  }

  update(entitiesData) {
    if (!this.scenesReady) {
      return;
    }

    if (this.followingPlayer !== true) {
      // Camera settings
      let camera = this.scene.cameras.main;
      let player = this.game.getEntity(window.currentPlayerId);
      if (player && player.graphics) {
        // camera.startFollow(player.graphics['graphics-phaser']);
      }
      camera.zoom = 0.2;
      this.followingPlayer = true;
    }


    // console.log('phaser update called', snapshot)
  }

  inflate(snapshot) {
    console.log(snapshot)
  }

  render(game) {

    // console.log('phaser render called', game)
  }
  // Implement other necessary methods or adjust according to your architecture
}

export default PhaserRenderer;


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
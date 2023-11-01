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
    this.phaserGameObjects = {};

  }

  init(game) {

    game.graphics.push(this);
    this.game = game;

    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'phaser-root',
      width: game.width, // TODO: config  
      height: game.height,
      scene: [Main]
    });

    let self = this;
    function loadMainScene () {
      let scene = self.phaserGame.scene.getScene('Main');
      if (!scene) {
        setTimeout(loadMainScene.bind(self), 100);
        return;
      }
      self.scenesReady = true;
      game.graphicsReady = true;
      self.scene = scene;
    }

    loadMainScene();

  }

  removeGraphic (entityData) {}

  updateGraphic (entityData) {

    // console.log('updateGraphic entityData', entityData, this.phaserGameObjects);
    let gameobject = this.phaserGameObjects[entityData.id];

    if (!gameobject) {
      console.log('no gameobject found for', entityData.id);
      return;
    }
    // console.log('updating position', entityData.position)
    gameobject.x = entityData.position.y;
    gameobject.y = entityData.position.x;
    // convert rotation to degrees
    if (entityData.rotation) {
      let rotated = -entityData.rotation - Math.PI / 2;
      gameobject.rotation = rotated;
    }

  }

  createTriangle(entityData) {
    console.log("CREATE TRIANGLE", entityData)

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
    sprite.rotation = sprite.rotation - Math.PI / 2;

  
    // Camera settings
    let camera = this.scene.cameras.main;
    camera.startFollow(sprite);
    camera.zoom = 0.3;
  
    this.phaserGameObjects[entityData.id] = sprite;
    return sprite;
  }
  

  update(entitiesData) {
    if (!this.scenesReady) {
      return;
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
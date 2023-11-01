// assume global phaser for now
// will have a require script on game.html with conditional
// might have separate phaser.html instead
//import Phaser from 'phaser';
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class PhaserRenderer extends GraphicsInterface {
  constructor(config) {
    super();
    this.config = config;

    this.scenesReady = false;

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
      scene: [Main],
      // Additional Phaser configuration...
    });

    this.scene = this.phaserGame.scene.getScene('Main');

    // TODO: we may have to wait for scenes here
    this.scenesReady = true;
    // Initialize Babylon.js specific MeshFactory
    // let phaserMeshFactory = new PhaserMeshFactory(this.scene);

    // Inject the Babylon.js specific MeshFactory as a Provider to the core MeshFactory
    // this.meshFactory = new MeshFactory(this.scene, phaserMeshFactory);

    // Inject the MeshFactory to EntityFactory as renderer
    // TODO: this is now handled in entityFactory constructor?
    // this.entityFactory = new EntityFactory(this.game, this.scene, this.meshFactory, this.onlineMode);

  }

  removeGraphic (entityData) {}

  updateGraphic (entityData) {

    let gameobject = this.phaserGameObjects[entityData.id];

    if (!gameobject) {
      console.log('no gameobject found for', entityData.id);
      return;
    }

    gameobject.x = entityData.position.x;
    gameobject.y = entityData.position.y;
    gameobject.rotation = entityData.rotation;

  }

  createTriangle(entityData) {
    let mainScene = this.phaserGame.scene.getScene('Main');
    let sprite = mainScene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillRect(500, 500, 64, 64);
    sprite.setDepth(10);
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
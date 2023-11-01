// assume global phaser for now
// will have a require script on game.html with conditional
// might have separate phaser.html instead
//import Phaser from 'phaser';
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class PhaserRenderer extends GraphicsInterface {
  constructor(config) {
    super();
    this.config = config;
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'phaser-root',
      width: 800, // TODO: config
      height: 600,
      scene: [Main],
      // Additional Phaser configuration...
    });

    this.scenesReady = false;

  }

  updateGraphic (entityData) {

  }

  createTriangle(entityData) {
    let mainScene = this.phaserGame.scene.getScene('Main');
    let sprite = mainScene.add.graphics();
    sprite.fillStyle(0xff0000, 1);
    sprite.fillRect(500, 500, 100, 100);
    sprite.setDepth(10);
    console.log('entityData.x', entityData.position)
    return sprite;
  }

  init(game) {

    game.graphics.push(this);
    this.game = game;

    console.log('phaser init called')
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
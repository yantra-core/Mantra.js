// TODO

// assume global phaser instead
// will have a require script on game.html with conditional
// might have separate phaser.html instead
//import Phaser from 'phaser';
//import CustomMeshFactory from './CustomMeshFactory';  // Adjusted for Phaser
//import DebugGUI from '../../Component/DebugGUI'; // Adjust or remove as needed

import EntityFactory from '../../Entity/EntityFactory.js';
import MeshFactory from '../../Entity/MeshFactory.js';
import RendererInterface from '../RendererInterface.js';
import PhaserMeshFactory from './PhaserMeshFactory.js';


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



class PhaserRenderer extends RendererInterface {
  constructor(config) {
    super();
    this.config = config;
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'root',
      width: 1600,
      height: 1200,
      scene: [Main],
      // Additional Phaser configuration...
    });

    this.scenesReady = false;

  }
  init () {
    console.log('phaser init called')
    this.scene = this.phaserGame.scene.getScene('Main');


    if (!this.scene) {
      let self = this;
      // wait a moment and try again
      setTimeout(function() {
        self.init();
      }, 100);
      return;
    }


    this.scenesReady = true;
    // Initialize Babylon.js specific MeshFactory
    let phaserMeshFactory = new PhaserMeshFactory(this.scene);
    
    // Inject the Babylon.js specific MeshFactory as a Provider to the core MeshFactory
    this.meshFactory = new MeshFactory(this.scene, phaserMeshFactory);

    // Inject the MeshFactory to EntityFactory as renderer
    // TODO: this is now handled in entityFactory constructor?
    this.entityFactory = new EntityFactory(this.game, this.scene, this.meshFactory, this.onlineMode);

  }

  setGame(game) {
    this.game = game;
    console.log('game was set', game);
  }

  
  update (entitiesData) {
    if (!this.scenesReady) {
      return;
    }
    for (const entityData of entitiesData.state) {
      this.entityFactory.handleEntityDebugging(entityData);

      // TODO: refactor this into generic inflate() method, we'll need to keep making these for each renderer
      this.entityFactory.updateOrDestroyEntity(entityData);
    }

    // console.log('phaser update called', snapshot)
  }

  render (game) {
    
    // console.log('phaser render called', game)
  }
  // Implement other necessary methods or adjust according to your architecture
}

export default PhaserRenderer;

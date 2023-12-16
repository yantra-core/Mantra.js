// PhaserGraphics.js - Marak Squires 2023
// assume global Phaser exists, or will be ready after init()
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import PhaserCamera from './PhaserCamera.js';
import inflateGraphic from './graphics/inflateGraphic.js';
import inflateTriangle from './graphics/inflateTriangle.js';
import inflateBox from './graphics/inflateBox.js';
import inflateCircle from './graphics/inflateCircle.js';
import inflateText from './graphics/inflateText.js';

class PhaserGraphics extends GraphicsInterface {
  static id = 'graphics-phaser';
  static removable = false;
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  // TODO: add PhaserGraphics.zoom ( from PhaserCamera.js )
  constructor({ camera = {}, startingZoom = 0.8 } = {}) {
    super();
    this.id = 'graphics-phaser';
    this.async = PhaserGraphics.async;

    let config = {
      camera,
      startingZoom
    };
    // config scope for convenience
    this.config = config;

    this.startingZoom = startingZoom;
    this.scenesReady = false;
    this.scene = null;
    this.inflateGraphic = inflateGraphic.bind(this);
    this.inflateBox = inflateBox.bind(this);
    this.inflateTriangle = inflateTriangle.bind(this);
    this.inflateCircle = inflateCircle.bind(this);
    this.inflateText = inflateText.bind(this);
  }

  init(game) {
    this.game = game;
    // check to see if Phaser scope is available, if not assume we need to inject it sequentially
    if (typeof Phaser === 'undefined') {
      console.log('Phaser is not defined, attempting to load it from vendor');
      game.loadScripts([ '/vendor/phaser.min.js'], () => {
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
      init() {},
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
      /*
      width: 1600, // TODO: config  
      height: 800,
      */
      scene: [_Main],
      scale: {
        //mode: Phaser.Scale.ENVELOP,
        mode: Phaser.Scale.RESIZE_AND_FIT,
        //mode: Phaser.Scale.FIT,
      }
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

      let phaserCamera = new PhaserCamera(scene, self.config.camera);
      this.game.use(phaserCamera);

      self.scenesReady = true;

      // register renderer with graphics pipeline
      game.graphics.push(this);

      // wait until scene is loaded before letting systems know phaser graphics are ready
      this.game.systemsManager.addSystem('graphics-phaser', this);

      // async:true plugins *must* self report when they are ready
      game.emit('plugin::ready::graphics-phaser', this);

      camera.zoom = this.startingZoom;

      // TODO: remove this line from plugin implementations
      game.loadingPluginsCount--;

    }

    let Main = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize:
        function Main() {
          Phaser.Scene.call(this, 'Main');
        },
      init() {},
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
    // console.log('calling updateGraphic', entityData)
    return this.inflateGraphic(entityData);
  }

  update(entitiesData) {
    let game = this.game;
    if (!this.scenesReady) {
      return;
    }
    // TODO: camera updates here?
    // update() will be called at the games frame rate
  }
  
  inflate(snapshot) {
    // console.log(snapshot)
  }

  render(game, alpha) {
    // render is called at the browser's frame rate (typically 60fps)
    let self = this;
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      // console.log('rendering', ent)
      this.inflateGraphic(ent, alpha);
      // Remark: 12/13/23 - pendingRender check is removed for now, inflateEntity can be called multiple times per entity
      //                    This could impact online mode, test for multiplayer
      /*
      // check if there is no graphic available, if so, inflate
      if (!ent.graphics || !ent.graphics['graphics-phaser']) {
        this.inflateGraphic(ent, alpha);
        ent.pendingRender['graphics-phaser'] = false;
      }
      if (ent.pendingRender && ent.pendingRender['graphics-phaser']) {
        this.inflateGraphic(ent, alpha);
        ent.pendingRender['graphics-phaser'] = false;
      }
      */
    }
  }

  unload () {

    // TODO: consolidate graphics pipeline unloading into SystemsManager
    // TODO: remove duplicated unload() code in BabylonGraphics
    this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
    delete this.game._plugins['PhaserGraphics'];

    // iterate through all entities and remove existing phaser graphics
    for (let [eId, entity] of this.game.entities.entries()) {
      if (entity.graphics && entity.graphics['graphics-phaser']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-phaser'];
      }
    }

    // stop phaser, remove canvas
    this.phaserGame.destroy(true);
    let canvas = document.getElementById('phaser-render-canvas');
    if (canvas) {
      canvas.remove();
    }
  }

}

export default PhaserGraphics;
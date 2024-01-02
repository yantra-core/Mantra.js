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
  constructor({ camera = {}} = {}) {
    super();
    this.id = 'graphics-phaser';
    this.async = PhaserGraphics.async;
    
    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      }
    }

    if (typeof camera.follow === 'undefined') {
      camera.follow = true;
    }

    if (typeof camera.startingZoom === 'undefined') {
      camera.startingZoom = 1;
    }

    // alert(camera.follow)

    let config = {
      camera
    };

    if (typeof config.camera.startingZoom === 'undefined') {
      config.camera.startingZoom = 1;
    }

    // config scope for convenience
    this.config = config;

    this.scenesReady = false;
    this.scene = null;
    this.inflateGraphic = inflateGraphic.bind(this);
    this.inflateEntity = inflateGraphic.bind(this);
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
      game.loadScripts(['/vendor/phaser.min.js'], () => {
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
        // Listen for the loadcomplete event
        this.load.on('complete', () => {
          this.scene.launch('Main');
          this.gameReady();
        });

      },
      preload: function () {
        // Mantra preloader should have already loaded all assets
        // Phaser preloader should hit the cache and load them from there
        game.preloader.assets.forEach((asset) => {
          if (asset.type === 'spritesheet') {
            // console.log('asset', asset)
            this.load.spritesheet(asset.key, asset.url, {
              frameWidth: asset.frameWidth,// TODO: config
              frameHeight: asset.frameHeight,
              startFrame: 0, // TODO: config
              endFrame: 8
            });
          }
          if (asset.type === 'image') {
            this.load.image(asset.key, asset.url);
          }
        });
      },
      create: function() {
        // Optionally, set the background color of the scene
        // this.cameras.main.setBackgroundColor('#000000');
      }
    });
  
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'gameHolder',
      transparent: true,
      scene: [_Main],
      scale: {
        // mode: Phaser.Scale.RESIZE_AND_FIT,
        // cover
        mode: Phaser.Scale.ENVELOP
      }
    });
  
    let self = this;
    function gameReady() {
      let scene = self.phaserGame.scene.getScene('Main');
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
      camera.zoom = this.config.camera.startingZoom;
  
      // TODO: remove this line from plugin implementations
      game.loadingPluginsCount--;
    }
  
    _Main.prototype.gameReady = gameReady.bind(this);
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
    // render will be called at the browser's refresh rate
    // can be used for camera updates or local effects
  }

  unload() {

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

    // remove the PhaserCamera system plugin
    if (this.game.systems['graphics-phaser-camera']) {
      this.game.systemsManager.removeSystem('graphics-phaser-camera');
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
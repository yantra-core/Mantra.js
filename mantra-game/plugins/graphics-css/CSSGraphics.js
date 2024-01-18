// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import CSSCamera from './CSSCamera.js';

import inflateBox from './lib/entity/inflateBox.js';
import inflateText from './lib/entity/inflateText.js';
import inflateEntity from './lib/entity/inflateEntity.js';
import inflateTexture from './lib/entity/inflateTexture.js';
import createGraphic from './lib/entity/createGraphic.js';

import setTransform from './lib/camera/setTransform.js';

import updateGraphic from './lib/entity/updateGraphic.js';
import updateEntityPosition from './lib/camera/updateEntityPosition.js';
import mouseWheelZoom from './lib/camera/mouseWheelZoom.js';

// touch / mouse events on entities
import bindEntityEvents from './lib/entity/bindEntityEvents.js';

// TODO: remove bindYCraftEvents.js file, replace with a Sutra
import bindYCraftEvents from './lib/entity/bindYCraftEvents.js';

import unload from './lib/unload.js';
import zoom from './lib/camera/zoom.js';
import cameraShake from './lib/camera/cameraShake.js';

import render from './lib/render.js';
import removeGraphic from './lib/entity/removeGraphic.js';

class CSSGraphics extends GraphicsInterface {
  static id = 'graphics-css';
  static removable = false;
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor({ camera } = {}) {
    super();

    // legacy API, remove in future
    if (typeof camera === 'string') {
      camera = { follow: true };
    }

    // Config scope for convenience
    this.config = { camera };

    this.id = CSSGraphics.id;
    this.async = CSSGraphics.async;
    this.cameraPosition = { x: 0, y: 0 };
    // this.game.data.camera.position = this.cameraPosition;
    this.mouseWheelEnabled = false;

    // Binding methods to `this`
    this.createGraphic = createGraphic.bind(this);
    this.inflateBox = inflateBox.bind(this);
    this.inflateText = inflateText.bind(this);
    this.inflateEntity = inflateEntity.bind(this);
    this.inflateTexture = inflateTexture.bind(this);
    this.setTransform = setTransform.bind(this);
    this.updateGraphic = updateGraphic.bind(this);
    this.updateEntityPosition = updateEntityPosition.bind(this);
    this.render = render.bind(this);
    this.removeGraphic = removeGraphic.bind(this);
    this.bindEntityEvents = bindEntityEvents.bind(this);
    this.bindYCraftEvents = bindYCraftEvents.bind(this);
    this.mouseWheelZoom = mouseWheelZoom.bind(this);
    this.unload = unload.bind(this);
    this.zoom = zoom.bind(this);
    this.cameraShake = cameraShake.bind(this);  

    // TODO: make this function lookup with defaults ( instead of -1 )
    this.depthChart = [
      'background', 'border', 'wire', 'PART', 'TEXT', 'PLAYER',
      'BLOCK', 'FIRE', 'WARP', 'NOTE'
    ];
    // this.depthChart = this.depthChart.reverse();
  }

  init(game) {
    this.game = game;
    game.setZoom = this.zoom.bind(this);

    const cssCamera = new CSSCamera(this, this.camera);
    const windowHeight = window.innerHeight;
    this.game.use(cssCamera);

    // Initialize the CSS render div
    this.initCSSRenderDiv();
    game.graphics.push(this);
    this.game.systemsManager.addSystem('graphics-css', this);

    // is sync load; however we still need to let the graphics pipeline know we are ready
    game.emit('plugin::ready::graphics-css', this);

    game.loadingPluginsCount--;

    this.game.viewportCenterXOffset = 0;
    this.game.viewportCenterYOffset = 0;

    document.body.style.cursor = 'default';

    game.on('game::ready', () => {
      this.zoom(1); // game.data.camera.currentZoom
    });
  }

  initCSSRenderDiv() {
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder);
    }

    let renderDiv = document.getElementById('css-render-div');
    if (!renderDiv) {
      renderDiv = document.createElement('div');
      renderDiv.id = 'css-render-div';
      renderDiv.className = 'render-div';
      gameHolder.appendChild(renderDiv);
    }

    this.renderDiv = renderDiv;
  }

  update() {
    // Update logic goes here
  }
}

export default CSSGraphics;
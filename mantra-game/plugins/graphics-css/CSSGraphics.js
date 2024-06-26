// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import CSSCamera from './CSSCamera.js';

import createGraphic from './lib/entity/createGraphic.js';

import inflateBox from './lib/entity/inflate/inflateBox.js';
import inflateText from './lib/entity/inflate/inflateText.js';
import inflateCanvas from './lib/entity/inflate/inflateCanvas.js';
import inflateImage from './lib/entity/inflate/inflateImage.js';

import inflateGraphic from './lib/entity/inflateGraphic.js';
import inflateTexture from './lib/entity/inflateTexture.js';

import inflateInput from './lib/entity/inflate/inflateInput.js';
import inflateIframe from './lib/entity/inflate/inflateIframe.js';
import inflateRadio from './lib/entity/inflate/inflateRadio.js';
import inflateRange from './lib/entity/inflate/inflateRange.js';
import inflateTextarea from './lib/entity/inflate/inflateTextarea.js';

import updateGraphic from './lib/entity/updateGraphic.js';

// touch / mouse events on entities
import bindEntityEvents from './lib/entity/bindEntityEvents.js';

// TODO: remove bindYCraftEvents.js file, replace with a Sutra
import bindYCraftEvents from './lib/entity/bindYCraftEvents.js';

import unload from './lib/unload.js';

import render from './lib/render.js';
import removeGraphic from './lib/entity/removeGraphic.js';

class CSSGraphics extends GraphicsInterface {
  static id = 'graphics-css';
  static removable = false;
  static async = true; // indicates that this plugin has async initialization and should not auto-emit a ready event on return

  constructor({ camera } = {}) {
    super();

    this.id = CSSGraphics.id;
    this.async = CSSGraphics.async;
    this.cameraPosition = { x: 0, y: 0 };
    // this.game.data.camera.position = this.cameraPosition;
    this.mouseWheelEnabled = false;

    // Binding methods to `this`
    this.createGraphic = createGraphic.bind(this);
    this.inflateBox = inflateBox.bind(this);
    this.inflateText = inflateText.bind(this);
    this.inflateGraphic = inflateGraphic.bind(this);
    this.inflateTexture = inflateTexture.bind(this);
    this.updateGraphic = updateGraphic.bind(this);

    // HTML DOM elements as Mantra entities
    // TODO: move these to each individual plugin scope
    this.inflateRange = inflateRange.bind(this);
    this.inflateRadio = inflateRadio.bind(this);
    this.inflateInput = inflateInput.bind(this);
    this.inflateTextarea = inflateTextarea.bind(this);
    this.inflateImage = inflateImage.bind(this);
    //this.inflateVideo = inflateVideo.bind(this);
    this.inflateCanvas = inflateCanvas.bind(this);
    this.inflateIframe = inflateIframe.bind(this);


    // refactored out to Plugins
    // this.inflateCode = inflateCode.bind(this);
    // this.inflateButton = inflateButton.bind(this);


    this.render = render.bind(this);
    this.removeGraphic = removeGraphic.bind(this);
    this.bindEntityEvents = bindEntityEvents.bind(this);
    this.bindYCraftEvents = bindYCraftEvents.bind(this);
    this.unload = unload.bind(this);


    // TODO: make this function lookup with defaults ( instead of -1 )
    // TODO: remove in favor of using position.z for zIndex
    this.depthChart = [
      'background', 'border', 'wire', 'PART', 'TEXT', 'PLAYER',
      'BLOCK', 'FIRE', 'WARP', 'NOTE'
    ];
    // this.depthChart = this.depthChart.reverse();
  }

  init(game) {
    this.game = game;

    const cssCamera = new CSSCamera(this, {
      initialZoom: 1
    });

    const windowHeight = window.innerHeight;
    this.game.use(cssCamera);
    game.camera = cssCamera;

    // Initialize the CSS render div
    this.initCSSRenderDiv();
    game.graphics.push(this);
    this.game.systemsManager.addSystem('graphics-css', this);

    // is sync load; however we still need to let the graphics pipeline know we are ready
    game.emit('plugin::ready::graphics-css', this);

    this.game.data.camera.offsetX = 0;
    this.game.data.camera.offsetY = 0;

    document.body.style.cursor = 'default';

  }

  initCSSRenderDiv() {
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder);
    }

    // Disable drag behavior for all images within the game container
    gameHolder.addEventListener('dragstart', function(event) {
      if (event.target.tagName === 'IMG') {
        event.preventDefault();
      }
    });

    let renderDiv = document.getElementById('css-render-div');
    if (!renderDiv) {
      renderDiv = document.createElement('div');
      renderDiv.id = 'css-render-div';
      renderDiv.className = 'render-div';
      renderDiv.style.transformOrigin = 'center center';

      gameHolder.appendChild(renderDiv);
    }

    this.renderDiv = renderDiv;
  }

  isEntityInViewport(ent, zoomFactor) { // We could add buffer if needed
    let result = {};
    let inViewport = true;
    let outsideOf = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };


    // Adjust the entity's position and size based on the zoom factor
    const adjustedPosition = {
      x: (ent.position.x * zoomFactor) + (window.innerWidth / 2),
      y: (ent.position.y * zoomFactor) + (window.innerHeight / 2)
    };
    const adjustedSize = {
      width: ent.size.width * zoomFactor,
      height: ent.size.height * zoomFactor
    };
  
    // Check if the adjusted entity position is within the viewport
    if (adjustedPosition.x + adjustedSize.width < 0) {
      outsideOf.left = true;
      outsideOf.direction = 'W';
      inViewport = false;
    }
    if (adjustedPosition.x > window.innerWidth) {
      outsideOf.right = true;
      outsideOf.direction = 'E';
      inViewport = false;
    }
    if (adjustedPosition.y + adjustedSize.height < 0) {
      outsideOf.top = true;
      outsideOf.direction = 'N';
      inViewport = false;
    }
    if (adjustedPosition.y > window.innerHeight) {
      outsideOf.bottom = true;
      outsideOf.direction = 'S';
      inViewport = false;
    }

    result.outsideOf = outsideOf;
    result.direction = outsideOf.direction;
    result.inViewport = inViewport;
    result.adjustedPosition = adjustedPosition;
  
    return result;
  }
  

}

export default CSSGraphics;
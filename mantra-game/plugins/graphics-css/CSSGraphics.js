// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import CSSCamera from './CSSCamera.js';

import inflateBox from './lib/inflateBox.js';
import inflateText from './lib/inflateText.js';
import inflateEntity from './lib/inflateEntity.js';

import setTransform from './lib/setTransform.js';

import updateGraphic from './lib/updateGraphic.js';
import updateEntityPosition from './lib/updateEntityPosition.js';
import mouseWheelZoom from './lib/mouseWheelZoom.js';

import handleInputs from '../graphics/lib/handleInputs.js';

class CSSGraphics extends GraphicsInterface {

  static id = 'graphics-css';
  static removable = false;

  constructor({ camera } = {}) {
    super();

    if (typeof camera === 'string') {
      // legacy API, remove in future
      camera = {
        follow: true
      }
    }

    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    this.id = CSSGraphics.id;
    this.cameraPosition = { x: 0, y: 0 };
    // this.game.data.camera.position = this.cameraPosition;
    this.mouseWheelEnabled = false;

    this.inflateBox = inflateBox.bind(this);
    this.inflateText = inflateText.bind(this);
    this.inflateEntity = inflateEntity.bind(this);

    this.setTransform = setTransform.bind(this);

    this.updateGraphic = updateGraphic.bind(this);
    this.updateEntityPosition = updateEntityPosition.bind(this);
    this.handleInputs = handleInputs.bind(this);

    // TODO: make this function lookup with defaults ( instead of -1 )
    this.depthChart = [
      'background',
      'border',
      'wire',
      'PART',
      'TEXT',
      'PLAYER',
      'BLOCK',
      'FIRE',
      'WARP',
      'NOTE'
    ];

    // this.depthChart = this.depthChart.reverse();
    this.mouseWheelZoom = mouseWheelZoom.bind(this);

  }

  init(game) {
    this.game = game;
    game.setZoom = this.zoom.bind(this);

    let cssCamera = new CSSCamera(this, this.camera);
    this.game.use(cssCamera);

    // let the graphics pipeline know the document is ready ( we could add document event listener here )
    // Remark: CSSGraphics current requires no async external loading scripts

    // Initialize the CSS render div
    this.initCSSRenderDiv();

    // register renderer with graphics pipeline
    game.graphics.push(this);

    this.game.systemsManager.addSystem('graphics-css', this);

    // is sync load; however we still need to let the graphics pipeline know we are ready
    game.emit('plugin::ready::graphics-css', this);

    // TODO: remove this line from plugin implementations
    game.loadingPluginsCount--;

    game.data.camera.currentZoom = 4.5;
    this.zoom(4.5);
    // this.zoom(game.data.camera.currentZoom);
    // this.zoom(game.data.camera.currentZoom);

  }

  initCSSRenderDiv() {

    // Ensure the gameHolder div exists
    // Remark: This is handled by `Graphics.js`; however in async loading with no priority
    // It is currently possible that CSSGraphics will load before Graphics does, so we need this check
    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
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

  createGraphic(entityData) {

    if (entityData.destroyed === true) {
      // ignore, shouldn't have made it here, check upstream as well
      return;
    }
    let entityElement = document.createElement('div');
    entityElement.id = `entity-${entityData.id}`;

    // set data-id to entity id
    entityElement.setAttribute('mantra-id', entityData.id);

    entityElement.className = 'entity-element';
    entityElement.style.position = 'absolute';

    if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
      if (typeof entityData.rotation === 'object') {
        // transform 3d to 2.5d
        entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
      } else {
        entityData.rotation = entityData.rotation;
      }
    }

    switch (entityData.type) {
      case 'BULLET':
        // For BULLET entities, create a circle
        const radius = entityData.radius || 0;
        entityElement.style.width = entityData.radius + 'px';
        entityElement.style.height = entityData.radius + 'px';
        // console.log('inflating bullet', entityData)
        //entityElement.style.width = entityData.width + 'px';
        //entityElement.style.height = entityData.height + 'px';
        //entityElement.style.width = (radius / 2) + 'px';
        //entityElement.style.height = (radius / 2) + 'px';
        //entityElement.style.borderRadius = '50%';  // This will make the div a circle
        //entityElement.style.background = 'red';
        this.inflateBox(entityElement, entityData);

        break;
      case 'PLAYER':
        // For PLAYER entities, create a triangle
        entityElement.style.width = entityData.width + 'px';
        entityElement.style.height = entityData.height + 'px';
        //entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
        //entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
        //entityElement.style.borderBottom = entityData.height + 'px solid green';
        // entityElement.classList.add('pixelart-to-css');

        // Set default sprite
        // entityElement.classList.add('guy-right-0');
        this.inflateBox(entityElement, entityData);


        break;
      case 'TEXT':
        entityElement = this.inflateText(entityElement, entityData);
        break;
      default:

        if (entityData.type === 'PART' && entityData.name === 'Display') {
          this.inflateText(entityElement, entityData);
        } else {
          this.inflateBox(entityElement, entityData);
        }

        break;
    }

    this.renderDiv.appendChild(entityElement);

    // Update the position of the entity element
    this.updateEntityPosition(entityElement, entityData);
    return entityElement;
  }

  removeGraphic(entityId) {
    let entity = this.game.getEntity(entityId);

    if (!entity || !entity.graphics || !entity.graphics['graphics-css']) {
      return;
    }

    let renderDiv = document.getElementById('css-render-div');
    if (renderDiv && renderDiv.contains(entity.graphics['graphics-css'])) {
      entity.graphics['graphics-css'].remove();
    }
  }

  update() {
    let game = this.game;

    /*
    if (typeof game.viewportCenterXOffset === 'undefined') {
      game.viewportCenterXOffset = 0;
    }

    if (typeof game.viewportCenterYOffset === 'undefined') {
      game.viewportCenterYOffset = 0;
    }

    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    let entityId = game.currentPlayerId;
    */


    // PLAYER MOUSE MOVEMENT CODE< TODO MOVE THIS TO SEPARATE FILE
    /*
    if (currentPlayer && currentPlayer.inputs && currentPlayer.inputs.mouse && currentPlayer.inputs.mouse.buttons.LEFT) {
      let data = currentPlayer.inputs;
      // Player's current position
      const playerX = currentPlayer.position.x;
      const playerY = currentPlayer.position.y;

      // Get mouse position
      const mouseX = data.mouse.position.x;
      const mouseY = data.mouse.position.y;

      // Calculate direction vector
      let dirX = mouseX - playerX;
      let dirY = mouseY - playerY;

      // Calculate the angle in radians
      const angle = Math.atan2(dirY, dirX);

      // Define the fixed directions (in radians)
      const directions = {
        UP: -Math.PI / 2,
        DOWN: Math.PI / 2,
        LEFT: Math.PI,
        RIGHT: 0,
        //UP_LEFT: -3 * Math.PI / 4,
        //UP_RIGHT: -Math.PI / 4,
        //DOWN_LEFT: 3 * Math.PI / 4,
        //DOWN_RIGHT: Math.PI / 4
      };

      // Find the closest direction
      let closestDirection = Object.keys(directions).reduce((prev, curr) => {
        if (Math.abs(angle - directions[curr]) < Math.abs(angle - directions[prev])) {
          return curr;
        }
        return prev;
      });

      // Set direction vector based on the closest fixed direction
      switch (closestDirection) {
        case 'UP':
          dirX = 0;
          dirY = -1;
          break;
        case 'DOWN':
          dirX = 0;
          dirY = 1;
          break;
        case 'LEFT':
          dirX = -1;
          dirY = 0;
          break;
        case 'RIGHT':
          dirX = 1;
          dirY = 0;
          break;
        case 'UP_LEFT':
          dirX = -1;
          dirY = -1;
          break;
        case 'UP_RIGHT':
          dirX = 1;
          dirY = -1;
          break;
        case 'DOWN_LEFT':
          dirX = -1;
          dirY = 1;
          break;
        case 'DOWN_RIGHT':
          dirX = 1;
          dirY = 1;
          break;
      }
      // console.log("entityIdentityId", entityId, data);

      // Apply the direction vector as force or movement
      game.applyForce(entityId, { x: dirX, y: dirY });

    }
    */

  }

  render(game, alpha) {
    // render is called at the browser's frame rate (typically 60fps)
    let self = this;
    if (this.game.changedEntities.size > 0) {
      // console.log('CHANGED', this.game.changedEntities)
    }
    // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
    // This is not ideal and will yield low-entity count CSSGraphics performance
    // Best to remove camera follow for CSSGraphics if possible
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      // console.log('rendering', ent)
      // do not re-inflate destroyed entities
      if (ent.destroyed !== true) {
        this.inflateEntity(ent, alpha);
      }
      // this.game.changedEntities.delete(eId);
    }
  }

  unload() {

    // Reset Zoom
    this.zoom(1);

    // TODO: consolidate graphics pipeline unloading into SystemsManager
    // TODO: remove duplicated unload() code in BabylonGraphics
    this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
    delete this.game._plugins['CSSGraphics'];

    // remove the wheel event listener
    // document.removeEventListener('wheel', this.cssMouseWheelZoom);
    this.mouseWheelEnabled = false;

    // iterate through all entities and remove existing css graphics
    for (let [eId, entity] of this.game.entities.entries()) {
      if (entity.graphics && entity.graphics['graphics-css']) {
        this.removeGraphic(eId);
        delete entity.graphics['graphics-css'];
      }
    }

    let div = document.getElementById('css-render-canvas');
    if (div) {
      div.remove();
    }

  }

  // TODO: adjust the viewportCenterXOffset and viewportCenterYOffset based on the new scale
  // ensure that the center of the viewport remains the same
  zoom(scale) {

    // console.log("CSSGraphics zoom", scale)
    this.game.data.camera.currentZoom = scale;

    let gameViewport = document.getElementById('gameHolder');
    if (gameViewport) {
      gameViewport.style.transform = `scale(${scale})`;
    }
    let windowHeight = window.innerHeight;
  
    // Define the adjustment value and scale factor
    let adjustment = -400; // TODO: this should be window height or something similar
    adjustment = (-windowHeight / 2) + 350;
    let scaleFactor = 1 / scale;
    // Calculate the Y offset
    let pixelAdjustment = adjustment * scaleFactor;
    game.viewportCenterYOffset = -(windowHeight / 2) - pixelAdjustment;
    //game.viewportCenterYOffset = -1600;

  }

}

export default CSSGraphics;

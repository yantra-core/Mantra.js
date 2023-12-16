// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import inflateBox from './lib/inflateBox.js';
import inflateText from './lib/inflateText.js';

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

    this.inflateBox = inflateBox.bind(this);
    this.inflateText = inflateText.bind(this);

  }

  init(game) {
    // register renderer with graphics pipeline
    game.graphics.push(this);

    this.game = game;

    this.game.systemsManager.addSystem('graphics-css', this);

    // let the graphics pipeline know the document is ready ( we could add document event listener here )
    // Remark: CSSGraphics current requires no async external loading scripts

    // Initialize the CSS render div
    this.initCSSRenderDiv();
  }

  initCSSRenderDiv() {
    const gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      console.error('gameHolder not found!');
      return;
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
        entityElement.style.width = (radius * 2) + 'px';
        entityElement.style.height = (radius * 2) + 'px';
        entityElement.style.borderRadius = '50%';  // This will make the div a circle
        entityElement.style.background = 'red';

        break;
      case 'PLAYER':
        // For PLAYER entities, create a triangle
        entityElement.style.width = '0px';
        entityElement.style.height = '0px';
        entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
        entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
        entityElement.style.borderBottom = entityData.height + 'px solid green';
        break;
      case 'TEXT':
        entityElement = this.inflateText(entityElement, entityData);
        break;
      default:
        this.inflateBox(entityElement, entityData);
        break;
    }

    this.renderDiv.appendChild(entityElement);

    // Update the position of the entity element
    this.updateEntityElementPosition(entityElement, entityData);
    return entityElement;
  }

  updateGraphic(entityData) {

    // TODO: move this to common 3D-2.5D transform function(s)
    if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
      if (typeof entityData.rotation === 'object') {
        // transform 3d to 2.5d
        entityData.rotation = entityData.rotation.x; // might not be best to mutate entityData
      } else {
        entityData.rotation = entityData.rotation;
      }
    }


    const entityElement = document.getElementById(`entity-${entityData.id}`);
    if (entityElement) {

      // Update the entity color
      if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
        // entityData.color is int number here we need a hex
        let hexColor = '#' + entityData.color.toString(16);
        // update the background color
        entityElement.style.background = hexColor;
      }

      // Update the position of the entity element
      return this.updateEntityElementPosition(entityElement, entityData);
    } else {
      // If the entity element does not exist, create it
      return this.createGraphic(entityData);
    }
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

  updateEntityElementPosition(entityElement, { position, width, height, rotation = 0 }) {
    // Adjust the position based on the camera position
    const adjustedPosition = {
      x: position.x - this.cameraPosition.x + window.innerWidth / 2,
      y: position.y - this.cameraPosition.y + window.innerHeight / 2
    };

    const domX = adjustedPosition.x - width / 2;
    const domY = adjustedPosition.y - height / 2;

    // convert rotation to degrees
    let angle = rotation * (180 / Math.PI);

    this.setTransform(entityElement, domX, domY, rotation, angle);

    return entityElement;
  }

  setTransform(entityElement, domX, domY, rotation, angle) {
    // Retrieve the last rotation value, default to 0 if not set
    let lastRotation = entityElement.dataset.rotation || 0;
    // Update rotation if provided
    if (rotation) {
      lastRotation = angle;
      entityElement.dataset.rotation = angle;
    }

    // Update the transform property
    entityElement.style.transform = `translate(${domX}px, ${domY}px) rotate(${lastRotation}deg)`;
  }
  update() {
    let game = this.game;
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    if (this.config.camera && this.config.camera.follow && currentPlayer) {
      if (currentPlayer.position) {
        this.cameraPosition.x = currentPlayer.position.x;
        this.cameraPosition.y = currentPlayer.position.y;
      }
    }
  }

  render(game, alpha) {
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateEntity(ent, alpha);
      if (ent.pendingRender && ent.pendingRender['graphics-css']) {
        ent.pendingRender['graphics-css'] = false;
      }
    }
  }

  inflateEntity(entity, alpha) {

    // checks for existence of entity, performs update or create
    if (entity.graphics && entity.graphics['graphics-css']) {
      let graphic = entity.graphics['graphics-css'];
      this.updateGraphic(entity, alpha);

    } else {
      let graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-css'], graphic);

    }
  }

}

export default CSSGraphics;

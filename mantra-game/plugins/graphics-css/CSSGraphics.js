// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class CSSGraphics extends GraphicsInterface {

  static id = 'graphics-css';
  static removable = false;

  constructor({ camera } = {}) {
    super();

    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    this.id = CSSGraphics.id;
    this.cameraPosition = { x: 0, y: 0 };
  }

  init(game) {
    // register renderer with graphics pipeline
    game.graphics.push(this);

    this.game = game;

    this.game.systemsManager.addSystem('graphics-css', this);

    // let the graphics pipeline know the document is ready ( we could add document event listener here )
    // Remark: CSSGraphics current requires no async external loading scripts
    game.graphicsReady.push(self.name);

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
        break;
      case 'PLAYER':
        // For PLAYER entities, create a triangle
        entityElement.style.width = '0px';
        entityElement.style.height = '0px';
        entityElement.style.borderLeft = entityData.width / 2 + 'px solid white';
        entityElement.style.borderRight = entityData.width / 2 + 'px solid white';
        entityElement.style.borderBottom = entityData.height + 'px solid blue';
        break;
      case 'TEXT':
        entityElement = this.createText(entityElement, entityData);
        break;
      default:
        // For other entities, create a rectangle
        entityElement.style.width = entityData.width + 'px';
        entityElement.style.height = entityData.height + 'px';
        entityElement.style.borderRadius = '10px';  // Optional: to make it rounded
        entityElement.style.background = 'blue';  // Move this line here
        break;
    }

    entityElement.style.background = 'blue';
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
      // Update the position of the entity element
      return this.updateEntityElementPosition(entityElement, entityData);
    } else {
      // If the entity element does not exist, create it
      return this.createGraphic(entityData);
    }
  }

  createText(entityElement, entityData) {
    // Create a container for the chat bubble
    entityElement.className = 'chat-bubble-container';
    entityElement.style.position = 'absolute';

    // Create the chat bubble itself
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.style.border = '1px solid #000';
    chatBubble.style.borderRadius = '10px';
    chatBubble.style.padding = '10px';
    chatBubble.style.background = '#fff';
    chatBubble.style.maxWidth = '200px';
    chatBubble.innerText = "entityData.text";  // Assuming entityData contains the chat text

    // Append the chat bubble to the container
    entityElement.appendChild(chatBubble);
    // Update the position of the chat bubble container
    //this.updateEntityElementPosition(entityElement, entityData);

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
    // Translate and rotate the element
    entityElement.style.transform = `
      translate(${domX}px, ${domY}px)
      rotate(${angle}deg)
    `;

    return entityElement;
  }

  update() {
    let game = this.game;
    const currentPlayer = this.game.getEntity(game.currentPlayerId);
    if (this.config.camera && this.config.camera === 'follow' && currentPlayer) {
      if (currentPlayer.position) {
        this.cameraPosition.x = currentPlayer.position.x;
        this.cameraPosition.y = currentPlayer.position.y;
      }
    }
  }

  render(game, alpha) {
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      if (ent.pendingRender && ent.pendingRender['graphics-css']) {
        this.inflateEntity(ent, alpha);
        ent.pendingRender['graphics-css'] = false;
      }

    }
  }

  inflateEntity(entity, alpha) {

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

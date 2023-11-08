// CSSGraphics.js - Marak Squires 2023
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class CSSGraphics extends GraphicsInterface {
  constructor({ camera } = {}) {
    super();
  
    // config scope for convenience
    let config = {
      camera
    };
    this.config = config;

    this.name = 'graphics-css';
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

    switch (entityData.type) {
      case 'BULLET':
        // For BULLET entities, create a circle
        const radius = entityData.radius || 0;
        entityElement.style.width = (radius * 2) + 'px';
        entityElement.style.height = (radius * 2) + 'px';
        entityElement.style.borderRadius = '50%';  // This will make the div a circle
        break;
      case 'PLAYER':
      /*
      // TODO
      case 'PLAYER':
        if (entityData.shape === 'rectangle') {
          graphic = this.createBox(entityData);
        } else {
          graphic = this.createTriangle(entityData);
        }
        break;
      */
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
    console.log('aaa', entityElement)
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
  
  updateEntityElementPosition(entityElement, {position, width, height, rotation = 0}) {
   
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

  update () {
    const currentPlayer = this.game.getEntity(window.currentPlayerId);
    if (this.config.camera && this.config.camera === 'follow' && currentPlayer) {
      if (currentPlayer.position) {
        this.cameraPosition.x = currentPlayer.position.x;
        this.cameraPosition.y = currentPlayer.position.y;
      }
    }
  }

  render () {}
}

export default CSSGraphics;

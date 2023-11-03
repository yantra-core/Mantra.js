import GraphicsInterface from '../../lib/GraphicsInterface.js';

class HTMLGraphics extends GraphicsInterface {
  constructor({ debug = true, onlineMode = true, followPlayer = false } = {}) {
    super();
    this.onlineMode = onlineMode;
    this.entityStates = {};
    this.debug = debug;
    this.name = 'graphics-html';
    this.followPlayer = followPlayer;
    this.cameraPosition = { x: 0, y: 0 };
  }

  init(game) {
    // register renderer with graphics pipeline
    game.graphics.push(this);

    this.game = game;
    // Only initialize DebugGUI if debug flag is set to true
    if (this.debug) {}
    // leave always on ( for now )
    // this.initDebugUI();

    this.game.systemsManager.addSystem('graphics-html', this);

    // let the graphics pipeline know the document is ready ( we could add document event listener here )
    game.graphicsReady.push(self.name);
  }

  initDebugUI() {
    // Create a debug UI container
    this.debugUIContainer = document.createElement('div');
    this.debugUIContainer.id = 'debugUIContainer';
    this.debugUIContainer.style.top = '10px';
    this.debugUIContainer.style.right = '10px';
    this.debugUIContainer.style.width = '40vw';
    this.debugUIContainer.style.height = '50vw';
    this.debugUIContainer.style.background = 'rgba(0, 0, 0, 0.5)';
    this.debugUIContainer.style.padding = '10px';
    this.debugUIContainer.style.color = 'white';
    this.debugUIContainer.style.zIndex = '9999';
    this.debugUIContainer.style.position = 'absolute';



    // Create a table within the debug UI container
    this.debugTable = document.createElement('table');
    this.debugTable.id = 'debugTable';
    this.debugUIContainer.appendChild(this.debugTable);

    document.body.appendChild(this.debugUIContainer);
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
      case 'BULLET':

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
    document.body.appendChild(entityElement);

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

    if (!entity || !entity.graphics || !entity.graphics['graphics-html']) {
      return;
    }
    
    if (document.contains(entity.graphics['graphics-html'])) {
      entity.graphics['graphics-html'].remove();
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
    if (this.followPlayer && currentPlayer && currentPlayer.position) {
      this.cameraPosition.x = currentPlayer.position.x;
      this.cameraPosition.y = currentPlayer.position.y;
    }
  }
  
  render () {}
}

export default HTMLGraphics;

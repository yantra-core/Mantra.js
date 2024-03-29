export default function createGraphic(entityData) {

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
      let radius = entityData.radius || 0;
      // radius = 1;
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

    case 'BUTTON':
      if (this.game.systems.button) {
        entityElement = this.game.systems.button.inflate(entityElement, entityData);
      }
      break;

    case 'LINK':
      if (this.game.systems.link) {
        entityElement = this.game.systems.link.inflate(entityElement, entityData);
      }
      break;
    case 'INPUT':
      // For INPUT entities, create an input
      entityElement = this.inflateInput(entityElement, entityData);
      break;
    case 'SELECT':
      // For SELECT entities, create a select drop down
      if (this.game.systems.select) {
        entityElement = this.game.systems.select.inflate(entityElement, entityData);
      }
      break;
    case 'IMAGE':
      // For IMAGE entities, create an image
      entityElement = this.inflateImage(entityElement, entityData);
      break;
    case 'TEXTAREA':
      // For TEXTAREA entities, create a textarea
      entityElement = this.inflateTextarea(entityElement, entityData);
      break;
    case 'RANGE':
      // For RANGE entities, create a range input
      entityElement = this.inflateRange(entityElement, entityData);
      break;
    case 'CHECKBOX':
      // For CHECKBOX entities, create a checkbox input
      if (this.game.systems.checkbox) {
        entityElement = this.game.systems.checkbox.inflate(entityElement, entityData);
      }
      break;
    case 'RADIO':
      // For RADIO entities, create a radio input
      entityElement = this.inflateRadio(entityElement, entityData);
      break;
    case 'IFRAME':
      // For IFRAME entities, create an iframe
      entityElement = this.inflateIframe(entityElement, entityData);
      break;
    case 'CANVAS':
      // For CANVAS entities, create a canvas
      entityElement = this.inflateCanvas(entityElement, entityData);
      break;
    case 'MONACO':
      // For CODE entities, create a code block
      console.log('inflating monaco', entityData, this.game.systems)
      if (this.game.systems.monaco) {
        entityElement = this.game.systems.monaco.inflate(entityElement, entityData);
      }
      break;


    case 'CODE':
      // For CODE entities, create a code block
      if (this.game.systems.code) {
        entityElement = this.game.systems.code.inflate(entityElement, entityData);
      }
      break;
    case 'TOOLBAR':
      if (this.game.systems.toolbar) {
        entityElement = this.game.systems.toolbar.inflate(entityElement, entityData);
      }
      break;

    default:

      if (entityData.type === 'PART' && entityData.name === 'Display') {
        this.inflateText(entityElement, entityData);
      } else {
        this.inflateBox(entityElement, entityData);
      }

      break;
  }

  // console.log(entityData.type, entityElement)
  // new api for entity.size
  if (typeof entityData.radius !== 'undefined') {
    // set circle size
    entityElement.style.width = entityData.radius + 'px';
    entityElement.style.height = entityData.radius + 'px';
    entityElement.style.borderRadius = '50%';  // This will make the div a circle
    // ensure background image will fit / cover expand
    // entityElement.style.backgroundSize = `${entityData.radius}px ${entityData.radius}px`;

  }

  if (typeof entityData.color !== 'undefined' && entityData.color !== null) {
    // entityData.color is int number here we need a hex
    let hexColor = '#' + entityData.color.toString(16);
    // update the background color
    let randomHexColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    // console.log("SETTING BG COLOR", entityData.color, hexColor)
    // entityElement.style.background = randomHexColor;
  }


  // if style.position is absolute, append to gameHolder instead
  if ((typeof entityData.style === 'object') && (entityData.style.position === 'absolute' || entityData.style.position === 'fixed')) {
    // if style has been manually set to absolute, place the entity directly in gameHolder ( instead of css-render-dev)
    // using absolute values. this will ensure that the entity is not affected by camera scroll and zoom 
    let gameHolder = document.getElementById('gameHolder');
    entityElement.style.position = 'flex';
    if (entityData.style.positionScreen === true) {
      // these are absolute screen coordinates starting with 0,0 at top left
      entityElement.style.top = `${entityData.position.y}px`;
      entityElement.style.left = `${entityData.position.x}px`;
      entityElement.style.width = `${entityData.width}px`;
      entityElement.style.height = `${entityData.height}px`;
    } else {
      // these are world coordinates starting with 0,0 in center of viewport
      let domPosition = {};
      let screenWidth = window.innerWidth;
      let screenHeight = window.innerHeight;
      domPosition.x = entityData.position.x + window.innerWidth / 2;
      domPosition.y = entityData.position.y + window.innerHeight / 2;
      entityElement.style.top = `${domPosition.y}px`;
      entityElement.style.left = `${domPosition.x}px`;
      entityElement.style.width = `${entityData.width}px`;
      entityElement.style.height = `${entityData.height}px`;
    }
    // the gameHolder is parent of the css-render-div and is not affected by camera scroll and zoom
    gameHolder.appendChild(entityElement);
    return entityElement;
  } else {
    this.renderDiv.appendChild(entityElement);
  }

  // Update the position of the entity element
  this.updateEntityPosition(entityElement, entityData);
  return entityElement;
}

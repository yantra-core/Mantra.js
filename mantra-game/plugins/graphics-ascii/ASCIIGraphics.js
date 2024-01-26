// ASCIIGraphics.js - Marak Squires 2024
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import CSSCamera from '../graphics-css/CSSCamera.js';

class ASCIIGraphics extends GraphicsInterface {
  static id = 'graphics-ascii';
  static removable = true;

  constructor({ camera } = {}) {
    super();
    this.camera = camera;
    this.cameraPosition = { x: 0, y: 0 };
    this.screen = null;
    this.elements = {};
    this.id = ASCIIGraphics.id;
    this.asciiScreen = []; // New array to hold ASCII screen representation
  }

  init(game) {
    this.game = game;
    this.game.asciiScreen = this.asciiScreen;

    // Set the ASCII screen size to a portion of the viewport size, for example 50%
    let screenScaleFactor = 0.5; // Adjust this value to scale the ASCII screen size
    this.screen = {
      width: Math.round(Math.min(window.innerWidth, game.width) * screenScaleFactor),
      height: Math.round(Math.min(window.innerHeight, game.height) * screenScaleFactor),
    };

    // Scaling factors - determine how game coordinates are scaled to ASCII screen coordinates
    this.scaleX = this.screen.width / game.width;
    this.scaleY = this.screen.height / game.height;

    const cssCamera = new CSSCamera(this, this.camera);
    this.game.use(cssCamera);

    this.createAsciiContainer(); // Initialize the ASCII container in the DOM
    this.createAsciiScreen(); // Initialize ASCII screen
    game.graphics.push(this);
  }

  // Method to convert entity to ASCII representation
  entityToAscii(entity) {
    // Simple example: return a character based on entity type
    // More complex logic can be implemented as needed
    switch (entity.type) {
      case 'PLAYER': return '@';
      case 'ENEMY': return '!';

      // Add more cases as needed
      default: return '#';
    }
  }


  createAsciiContainer() {

    let gameHolder = document.getElementById('gameHolder');
    if (!gameHolder) {
      gameHolder = document.createElement('div');
      gameHolder.id = 'gameHolder';
      document.body.appendChild(gameHolder);
    }

    let renderDiv = document.getElementById('ascii-render-div');
    if (!renderDiv) {
      renderDiv = document.createElement('div');
      renderDiv.id = 'ascii-render-div';
      renderDiv.className = 'render-div';
      gameHolder.appendChild(renderDiv);
    }

    this.renderDiv = renderDiv;

    // this.renderDiv = document.createElement('div');
    this.renderDiv.style.fontFamily = 'monospace';
    // set zIndex to 1 to ensure it is above other elements
    this.renderDiv.style.zIndex = 1;
    // larger font
    this.renderDiv.style.fontSize = '16px';
    // font color is black
    this.renderDiv.style.color = '#000';
    this.renderDiv.style.whiteSpace = 'pre'; // Ensure whitespace is respected
    gameHolder.appendChild(this.renderDiv); // Append to body, or another element as needed

    // Initialize the container with blank spaces
    for (let y = 0; y < this.screen.height; y++) {
      let row = document.createElement('div');
      row.textContent = ' '.repeat(this.screen.width); // Initialize with blank spaces
      this.renderDiv.appendChild(row);
    }
  }

  updateAsciiContainer() {
    for (let y = 0; y < this.screen.height; y++) {
      let row = this.renderDiv.childNodes[y];
      let newRowContent = this.asciiScreen[y].join('');

      if (row.textContent !== newRowContent) {
        row.textContent = newRowContent; // Update entire row if different
      }
    }
  }

  createAsciiScreen() {
    // Initialize the ASCII screen with the viewport size
    for (let y = 0; y < this.screen.height; y++) {
      this.asciiScreen[y] = [];
      for (let x = 0; x < this.screen.width; x++) {
        this.asciiScreen[y][x] = ' ';
      }
    }
  }

  transformEntityToScreenCoordinates(entity) {
    let x = Math.round((entity.position.x - this.cameraPosition.x + this.game.width / 2) * this.scaleX);
    let y = Math.round((entity.position.y - this.cameraPosition.y + this.game.height / 2) * this.scaleY);

    let width = Math.max(1, Math.round(entity.width * this.scaleX));
    let height = Math.max(1, Math.round(entity.height * this.scaleY));

    x = Math.max(0, Math.min(x, this.screen.width - width));
    y = Math.max(0, Math.min(y, this.screen.height - height));

    return { x, y, width, height };
  }

  isWithinScreenBounds(x, y) {
    return x >= 0 && x < this.screen.width && y >= 0 && y < this.screen.height;
  }

  inflateGraphic(entity) {
    // console.log('inflateGraphic', entityData)
    if (entity.kind === 'building') {
      return; // for now
    }

    let graphic;
    if (entity.graphics && entity.graphics['graphics-ascii']) {
      graphic = entity.graphics['graphics-ascii'];
      if (entity.type !== 'BORDER') { // TODO: remove this
        this.updateGraphic(entity);
      }
    } else {
      graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-ascii'], graphic);
    }

    if (!graphic) {
      return;
    }

  }

  createGraphic(entityData) {
    const { x, y, width, height } = this.transformEntityToScreenCoordinates(entityData);
    const asciiChar = this.entityToAscii(entityData);

    // Fill in the ASCII characters for the entity
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (this.isWithinScreenBounds(x + j, y + i)) {
          this.asciiScreen[y + i][x + j] = asciiChar;
        }
      }
    }

    this.elements[entityData.id] = { x, y, char: asciiChar, width, height };
    return this.elements[entityData.id];
  }

  updateGraphic(entity, alpha = 1) {
    if (this.elements[entity.id]) {
      const oldPos = this.elements[entity.id];
      const { x, y, width, height } = this.transformEntityToScreenCoordinates(entity);
      const asciiChar = this.entityToAscii(entity);

      // Clear old position
      for (let i = 0; i < oldPos.height; i++) {
        for (let j = 0; j < oldPos.width; j++) {
          if (this.isWithinScreenBounds(oldPos.x + j, oldPos.y + i)) {
            this.asciiScreen[oldPos.y + i][oldPos.x + j] = ' ';
          }
        }
      }

      // Draw new position
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (this.isWithinScreenBounds(x + j, y + i)) {
            this.asciiScreen[y + i][x + j] = asciiChar;
          }
        }
      }

      this.elements[entity.id] = { x, y, char: asciiChar, width, height };
    }
  }
  render(game, alpha = 1) {
    //this.updateAsciiContainer(); // Smart update of ASCII display in the DOM
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateGraphic(ent, alpha);
    }
    this.updateAsciiContainer();

  }

  removeGraphic(entityId) {
    if (this.elements[entityId]) {
      const { x, y } = this.elements[entityId];
      this.asciiScreen[y][x] = ' '; // Clear the character
      delete this.elements[entityId];
    }
  }

  unload() {
    this.screen.destroy();
    this.asciiScreen = [];
  }

}

export default ASCIIGraphics;

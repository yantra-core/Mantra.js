// ASCIIGraphics.js - Marak Squires 2024
import GraphicsInterface from '../../lib/GraphicsInterface.js';

class ASCIIGraphics extends GraphicsInterface {
  static id = 'graphics-ascii';
  static removable = true;

  constructor({ camera } = {}) {
    super();
    this.cameraPosition = { x: 0, y: 0 };
    this.screen = null;
    this.elements = {};
    this.id = ASCIIGraphics.id;
    this.asciiScreen = []; // New array to hold ASCII screen representation
  }

  init(game) {
    this.game = game;
    this.game.asciiScreen = this.asciiScreen;
    this.screen = {
      width: Math.min(window.innerWidth, game.width),
      height: Math.min(window.innerHeight, game.height),
    };

    this.screen.width = this.screen.width * 0.1;
    this.screen.height = this.screen.height * 0.1;

    console.log('ssss', this.screen)
    this.scaleX = this.screen.width / game.width;
    this.scaleY = this.screen.height / game.height;
    // set scale to 1 ( for now )
    //this.scaleX = 10;
    //this.scaleY = 10;
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

    // get gameHolder div by id
    let gameHolder = document.getElementById('gameHolder');

    this.asciiContainer = document.createElement('div');
    this.asciiContainer.style.fontFamily = 'monospace';
    // set zIndex to 1 to ensure it is above other elements
    this.asciiContainer.style.zIndex = 1;
    // larger font
    this.asciiContainer.style.fontSize = '16px';
    // font color is black
    this.asciiContainer.style.color = '#000';
    this.asciiContainer.style.whiteSpace = 'pre'; // Ensure whitespace is respected
    gameHolder.appendChild(this.asciiContainer); // Append to body, or another element as needed

    // Initialize the container with blank spaces
    for (let y = 0; y < this.screen.height; y++) {
      let row = document.createElement('div');
      row.textContent = ' '.repeat(this.screen.width); // Initialize with blank spaces
      this.asciiContainer.appendChild(row);
    }
  }

  updateAsciiContainer() {
    for (let y = 0; y < this.screen.height; y++) {
      let row = this.asciiContainer.childNodes[y];
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
        this.asciiScreen[y][x] = '0';
      }
    }
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

    // console.log('createGraphic', asciiChar)
    const { x, y } = this.transformCoordinates(entityData);
    const asciiChar = this.entityToAscii(entityData);
    console.log('adding', asciiChar)
    this.asciiScreen[y][x] = asciiChar;
    this.elements[entityData.id] = { x, y, char: asciiChar };

    return this.elements[entityData.id];
  }

  updateGraphic(entity, alpha = 1) {

    if (this.elements[entity.id]) {
      const { x, y } = this.transformCoordinates(entity);
      const oldPos = this.elements[entity.id];
      this.asciiScreen[oldPos.y][oldPos.x] = ' '; // Clear old position
      const asciiChar = this.entityToAscii(entity);
      // console.log('updateGraphic', asciiChar)

      this.asciiScreen[y][x] = asciiChar;
      this.elements[entity.id] = { x, y, char: asciiChar };
      // this.screen.render(); // Render changes
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

  // Transform game world coordinates to screen coordinates
  // Refactored transformCoordinates method
  transformCoordinates(entity) {
    // Adjust game coordinates to screen coordinates based on camera position
    let x = Math.round((entity.position.x - this.cameraPosition.x) * this.scaleX);
    let y = Math.round((entity.position.y - this.cameraPosition.y) * this.scaleY);

    // Ensure x and y are within the bounds of the ASCII screen
    x = Math.max(0, Math.min(x, this.screen.width - 1));
    y = Math.max(0, Math.min(y, this.screen.height - 1));

    return { x, y };
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

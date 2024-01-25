// WIP - Not ready for use
// BlessedGraphics.js - Marak Squires 2024
import GraphicsInterface from '../../lib/GraphicsInterface.js';
import blessed from 'blessed';

class BlessedGraphics extends GraphicsInterface {

  static id = 'graphics-blessed';
  static removable = false;

  constructor({ camera } = {}) {
    super();
    this.cameraPosition = { x: 0, y: 0 }; // Initialize camera position
    this.screen = null; // Placeholder for blessed screen object
    this.elements = {}; // Store blessed elements keyed by entity ID
    this.id = BlessedGraphics.id;
  }

  init(game) {
    this.game = game;
    // Initialize blessed screen
    this.screen = blessed.screen({
      smartCSR: true,
      title: 'Your Game Title'
    });

    // Calculate scaling factors based on game world size and screen size
    this.scaleX = this.screen.width / game.width;
    this.scaleY = this.screen.height / game.height;


    // Register this renderer with the graphics pipeline
    game.graphics.push(this);



    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0);
    });
    // ... other event listeners or initial setup

    this.screen.render(); // Render the initial screen
  }

  createGraphic(entityData) {
    
    //  console.log('screen', this.screen.width, this.screen.height, game.width, game.height, this.scaleX, this.scaleY)
    //  console.log('creating graphic', entityData, entityData.position)

    // Create and manage blessed elements based on entityData
    const { x, y, width, height } = this.transformCoordinates(entityData);

    let element = blessed.box({
      parent: this.screen,
      top: y,
      left: x,
      width: width * 10,
      height: height * 10,
      style: {
        fg: 'white', // Foreground color
        bg: 'blue',  // Background color
        border: {
          type: 'line'
        }
      }
    });

    this.elements[entityData.id] = element; // Store the element
    return element;
  }

  updateGraphic(entity, alpha) {
    // Update an entity's graphic representation
    if (this.elements[entity.id]) {
      const { x, y, width, height } = this.transformCoordinates(entity);

      let graphic = this.elements[entity.id];
      // Update position, size, or other properties as needed
      graphic.top = y;
      graphic.left = x;
      graphic.width = width;
      graphic.height = height;
      this.screen.render(); // Re-render the screen to reflect changes
    }
  }

  // Transform game world coordinates to screen coordinates
  transformCoordinates(entity) {
    // Translate game coordinates (center origin) to screen coordinates (top-left origin)
    let x = (entity.position.x + this.game.width / 2) * this.scaleX;
    let y = (entity.position.y + this.game.height / 2) * this.scaleY;

    // Scale width and height
    let width = entity.width * this.scaleX;
    let height = entity.height * this.scaleY;

    return { x, y, width, height };
  }

  inflateEntity(entity, alpha) {
    // Checks for existence of entity, performs update or create
    if (entity.graphics && entity.graphics['graphics-blessed']) {
      this.updateGraphic(entity, alpha);
    } else {
      let graphic = this.createGraphic(entity);
      this.game.components.graphics.set([entity.id, 'graphics-blessed'], graphic);
    }
  }

  update() {
    // Update logic for each frame
    // For example, iterate through entities and call inflateEntity

    let sortedByDepth = [];

    for (let [id, entity] of this.game.entities.entries()) {
      this.inflateEntity(entity);

      //      sortedByDepth.push(entity)
    }

    sortedByDepth = sortedByDepth.sort((a, b) => {
      return a.position.z - b.position.z;
    });
    // console.log('sortedByDepth', sortedByDepth)
    sortedByDepth.forEach(entity => {
      //if (entity.type !== 'BACKGROUND') {
      //}
    });

  }

  render(game, alpha) {
  }

  removeGraphic(entityId) {
    // Remove graphics associated with an entity
    if (this.elements[entityId]) {
      this.elements[entityId].destroy(); // Destroy the blessed element
      delete this.elements[entityId]; // Remove from tracking
    }
  }

  unload() {
    // Clean up resources, remove event listeners, etc.
    this.screen.destroy();
  }

  // ... additional methods as needed

}

export default BlessedGraphics;

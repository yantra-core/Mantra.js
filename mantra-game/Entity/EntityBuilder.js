// EntityBuilder.js - Marak Squires 2024
export default class EntityBuilder {
  constructor(game) {
    this.game = game;
    this.config = {};
  }

  // Basic properties
  type(value) {
    this.config.type = value;

    if (value === 'TEXT') {
      // text entities should not have a body by default
      // can be overridden by calling body(true) after type('TEXT')
      this.config.body = false;
    }

    return this;
  }

  name(value) {
    this.config.name = value;
    return this;
  }

  kind(value) {
    this.config.kind = value;
    return this;
  }

  // Positioning and movement
  position(x, y) {
    this.config.position = { x, y };
    return this;
  }

  startingPosition(x, y) {
    this.config.startingPosition = { x, y };
    return this;
  }

  velocity(x, y) {
    this.config.velocity = { x, y };
    return this;
  }

  rotation(value) {
    this.config.rotation = value;
    return this;
  }

  // Physical properties
  mass(value) {
    this.config.mass = value;
    return this;
  }

  density(value) {
    this.config.density = value;
    return this;
  }

  // Health and scoring
  health(value) {
    this.config.health = value;
    return this;
  }

  score(value) {
    this.config.score = value;
    return this;
  }

  // Dimensions
  size(width, height, depth) {

    if (typeof height === 'undefined') {
      height = width;
    }

    this.config.size = { width, height };
    if (typeof depth !== 'undefined') { // 2d games may not have a depth, we may want to default to 0
      this.config.size.depth = depth;
    }
    return this;
  }

  radius(value) {
    this.config.radius = value;
    return this;
  }

  // Styling and appearance
  shape(value) {
    this.config.shape = value;
    return this;
  }

  color(value) {
    this.config.color = value;
    return this;
  }

  texture(value) {
    this.config.texture = value;
    return this;
  }

  style(value) {
    this.config.style = value;
    return this;
  }

  // Behavior and capabilities
  maxSpeed(value) {
    this.config.maxSpeed = value;
    return this;
  }

  owner(value) {
    this.config.owner = value;
    return this;
  }

  hasInventory(value = true) {
    this.config.hasInventory = value;
    return this;
  }

  isSensor(value = true) {
    this.config.isSensor = value;
    return this;
  }

  isStatic(value = true) {
    this.config.isStatic = value;
    return this;
  }
  
  // Private method to add an event handler
  _addEventHandler(eventName, handler) {
    // console.log(`Adding handler for event: ${eventName}`);

    // Define a variable outside the composite function to hold the handlers
    let handlers;

    // Check if a composite function already exists for this event
    if (typeof this.config[eventName] !== 'function') {
      // console.log(`No composite function for ${eventName}, creating new.`);

      // Initialize the handlers array and store it in the variable
      handlers = [handler];

      // Create a new composite function that uses the handlers variable
      this.config[eventName] = (...args) => {
        // console.log(`Executing composite function for ${eventName} with args:`, args);
        handlers.forEach(h => {
          console.log(`Executing handler for ${eventName}`);
          h(...args);
        });
      };
    } else {
      // console.log(`Composite function exists for ${eventName}, adding to existing handlers.`);

      // If the composite function exists, retrieve its handlers array
      handlers = this.config[eventName].handlers;

      // Add the new handler to the array
      handlers.push(handler);
    }

    // Attach the handlers array to the composite function for potential future reference
    this.config[eventName].handlers = handlers;
    // console.log(`Total handlers for ${eventName}: ${handlers.length}`);

    return this;
  }


  // Public methods to add specific event handlers
  pointerdown(handler) {
    return this._addEventHandler('pointerdown', handler);
  }

  collisionStart(handler) {
    return this._addEventHandler('collisionStart', handler);
  }

  collisionActive(handler) {
    return this._addEventHandler('collisionActive', handler);
  }

  collisionEnd(handler) {
    return this._addEventHandler('collisionEnd', handler);
  }

  onUpdate(handler) {
    return this._addEventHandler('update', handler);
  }

  sutra(rules, config) {
    // TODO: This will overwrite Sutras as chain progresses left-to-right,
    // leaving only the last Sutra as active
    // TODO: merge rules existing sutra based on config ( default true )
    this.config.sutra = { rules, config };
    return this;
  }

  // TODO: better name for "exit" semantics
  exit(handler) {
    this.config.exit = handler;
    return this;
  }

  // Meta and Data
  meta(value) { // TODO: meta should be able to merge with existing meta if required
    this.config.meta = value;
    return this;
  }

  text(value) {
    this.config.text = value;
    return this;
  }

  // Finalization
  build() {
    // Return a deep copy to prevent further modifications
    return this.config;
  }

  repeat(count) {
    this.config.repeat = count;
    return this;
  }

  createEntity() {
    // Create a new entity with the current configuration
    if (typeof this.config.repeat === 'number') {
      let entities = [];
      for (let i = 0; i < this.config.repeat; i++) {
        entities.push(this.game.createEntity(this.config));
      }
      return entities;
    }
    return this.game.createEntity(this.config);
  }

}
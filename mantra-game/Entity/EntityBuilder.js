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

  // Event handlers
  pointerdown(handler) {
    this.config.pointerdown = handler;
    return this;
  }

  collisionStart(handler) {
    this.config.collisionStart = handler;
    return this;
  }

  collisionEnd(handler) {
    this.config.collisionEnd = handler;
    return this;
  }

  sutra(rules, config) {
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

  createEntity() {
    // Create a new entity with the current configuration
    return this.game.createEntity(this.config);
  }

}
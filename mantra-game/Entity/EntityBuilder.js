export default class EntityBuilder {
  constructor() {
    this.config = {};
  }

  // Basic properties
  type(value) {
    this.config.type = value;
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

  // Dimensions and appearance
  size(width, height) {
    this.config.size = { width, height };
    return this;
  }

  radius(value) {
    this.config.radius = value;
    return this;
  }

  shape(value) {
    this.config.shape = value;
    return this;
  }

  color(value) {
    this.config.color = value;
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

  // Finalization
  build() {
    // Return a deep copy to prevent further modifications
    return this.config;
  }
}
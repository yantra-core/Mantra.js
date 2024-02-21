// EntityBuilder.js - Marak Squires 2024
import ensureColorInt from '../plugins/entity/lib/util/ensureColorInt.js';
export default class EntityBuilder {
  constructor(game) {
    this.game = game;
    this.config = {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: 0, // TODO: x / y z
      size: {
        width: 16,
        height: 16,
        depth: 16
      },
      offset: {
        x: 0,
        y: 0,
        z: 0
      },
      meta: {}

    };
  }

  // Remark: id is not used when creating entities, it's used for building configs
  id(value) {
    this.config.id = value;
    return this;
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

  startingPosition(x, y) {
    this.config.startingPosition = { x, y };
    return this;
  }

  body(value = true) {
    this.config.body = value;
    return this;
  }

  friction(value) { // friction will default override the other friction values
    this.config.friction = value;
    this.config.frictionStatic = value;
    this.config.frictionAir = value;
    return this;
  }

  frictionStatic(value) {
    this.config.frictionStatic = value;
    return this;
  }

  frictionAir(value) {
    this.config.frictionAir = value;
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

  lifetime(value) {
    this.config.lifetime = value;
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
    } else {
      this.config.size.depth = height;
    }
    return this;
  }

  width(value) {
    this.config.size.width = value;
    return this;
  }

  height(value) {
    this.config.size.height = value;
    return this;
  }

  depth(value) {
    this.config.size.depth = value;
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
    this.config.color = ensureColorInt(value); // converts string and hex color to int
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

  _addEventHandler(eventName, handler) {
    // Check if the event already has a composite function with handlers
    if (typeof this.config[eventName] === 'function' && Array.isArray(this.config[eventName].handlers)) {
      this.config[eventName].handlers.push(handler); // Add to existing handlers
    } else {
      if (typeof handler === 'boolean') {
        this.config[eventName] = handler;
      }
      if (typeof handler === 'function') {
        // Otherwise, create a new composite function and handlers array
        const handlers = [handler];
        this.config[eventName] = (...args) => {
          try {
            handlers.forEach(function(h){
              if (typeof h === 'function') {
                h(...args);
              } else {
                console.warn("handler is not a function", h, args)
              }
            }); // Execute all handlers
          } catch (err) {
            console.error(`Error in event handler for ${eventName}:`, err);
          }
        };
        this.config[eventName].handlers = handlers; // Store handlers
      }
    }

    return this;
  }

  //
  // Public methods to add specific event handlers
  //
  // Pointer events
  pointerdown(handler) {
    return this._addEventHandler('pointerdown', handler);
  }
  pointerup(handler) {
    return this._addEventHandler('pointerup', handler);
  }
  pointermove(handler) {
    return this._addEventHandler('pointermove', handler);
  }
  pointerover(handler) {
    return this._addEventHandler('pointerover', handler);
  }
  pointerout(handler) {
    return this._addEventHandler('pointerout', handler);
  }
  pointerenter(handler) {
    return this._addEventHandler('pointerenter', handler);
  }
  pointerleave(handler) {
    return this._addEventHandler('pointerleave', handler);
  }

  // Collision events
  collisionStart(handler) {
    return this._addEventHandler('collisionStart', handler);
  }
  collisionActive(handler) {
    return this._addEventHandler('collisionActive', handler);
  }
  collisionEnd(handler) {
    return this._addEventHandler('collisionEnd', handler);
  }

  // Lifecycle events
  onDrop(handler) {
    return this._addEventHandler('onDrop', handler);
  }

  onUpdate(handler) {
    return this._addEventHandler('update', handler);
  }

  afterRemoveEntity(handler) {
    return this._addEventHandler('afterRemoveEntity', handler);
  }

  afterCreateEntity(handler) {
    return this._addEventHandler('afterCreateEntity', handler);
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

  // Entity Flags - make this it's own system
  collectable(value = true) {
    this.config.collectable = value;
    return this;
  }

  // Meta and Data
  meta(value) {
    if (typeof value === 'object' && value !== null) {
      if (typeof this.config.meta === 'object' && this.config.meta !== null) {
        console.log("MERGING THE IDEA", value)
        this.config.meta = { ...this.config.meta, ...value };
      } else {
        this.config.meta = value;
      }
    }
    return this;
  }

  text(value) {
    this.config.text = value;
    return this;
  }

  // Positioning and movement
  position(x, y, z) {
    this.config.position = { x, y };
    if (typeof z === 'number') {
      this.config.position.z = z;
    }
    return this;
  }

  offset(x, y, z) {
    if (typeof this.config.offset !== 'object' || this.config.offset === null) {
      this.config.offset = {};
    }
    if (typeof x === 'number') {
      this.config.offset.x = x;
    }
    if (typeof y === 'number') {
      this.config.offset.y = y;
    }
    if (typeof z === 'number') {
      this.config.offset.z = z;
    }
    return this;
  }


  // Finalization
  build() {
    // Return a deep copy to prevent further modifications
    return this.config;
  }

  // Creates *exact* copies of the entity with the specified configuration
  clone(count) {
    this.config.clone = count;
    return this;
  }

  // Creates a copy of the entity with the specified configuration, but will apply
  // all "repeaters" with index and count arguments, allowing for dynamic modifications
  // separately, the offset.x and offset.y will add to the position
  repeat(count) {
    this.config.repeat = count;
    return this;
  }

  createEntity() {

    if (typeof this.config.clone === 'number') {
      let entities = [];
      for (let i = 0; i < this.config.clone; i++) {
        let clonedConfig = { ...this.config }; // Shallow copy for non-function properties
        entities.push(this.game.createEntity(clonedConfig));
      }
      return entities;
    } else if (typeof this.config.repeat === 'number') {
      let entities = [];
      for (let i = 0; i < this.config.repeat; i++) {
        let entityConfig = { ...this.config }; // Shallow copy for non-function properties
        // Calculate the offset for each repeated entity
        let offsetX = entityConfig.position.x + i * entityConfig.offset.x;
        let offsetY = entityConfig.position.y + i * entityConfig.offset.y;
        let offsetZ = entityConfig.position.z + i * entityConfig.offset.z;
        if (typeof offsetX === 'number' && typeof offsetY === 'number') {
          entityConfig.position = { x: offsetX, y: offsetY, z: entityConfig.position.z };
        }
        if (typeof offsetZ === 'number' && !isNaN(offsetZ)) {
          entityConfig.position.z = offsetZ;
        }
        if (typeof this.repeatModifiers === 'object' && this.repeatModifiers !== null) {
          for (let [prop, modifier] of Object.entries(this.repeatModifiers)) {
            if (typeof modifier === 'function') {
              entityConfig[prop] = modifier(i, this.config.repeat, entityConfig[prop]);
            }
          }
        }
        // Remove repeat-related properties to avoid infinite recursion and irrelevant data
        delete entityConfig.repeat;
        delete entityConfig.repeatModifiers;
        entities.push(this.game.createEntity(entityConfig));
      }
      return entities;
    } else {
      let singleConfig = { ...this.config }; // Shallow copy for non-function properties
      return this.game.createEntity(singleConfig);
    }


  }

  repeaters(modifiers) {
    this.repeatModifiers = modifiers;
    return this;
  }

  mix(mixinConfig) {
    for (let key in mixinConfig) {
      let value = mixinConfig[key];
      if (typeof value === 'function') {
        // Check if a composite function already exists for this key
        if (typeof this.config[key] !== 'function') {
          // Define the composite function
          this.config[key] = (...handlerArgs) => {
            this.config[key].handlers.forEach(handler => handler(...handlerArgs));
          };
          // Initialize with an empty handlers array
          this.config[key].handlers = [];
        }
        // Add the new handler to the composite function's handlers array
        // TODO: this may not work as intended? add more entity mixin tests
        this.config[key].handlers.push(value);
      } else if (typeof value === 'object' && this.config[key] && typeof this.config[key] === 'object') {
        // For object types, merge the objects
        this.config[key] = { ...this.config[key], ...value };
      } else {
        // For color types, blend the colors
        if (key === 'color') {
          if (this.config[key] !== undefined) {
            const existingColor = ensureColorInt(this.config[key]);
            const newColor = ensureColorInt(value);
            value = blendColors(existingColor, newColor);
          }
        }
        // TODO we can add a merge / mix strategy for other types
        // For position we could average, hi-low, etc
        // For primitive types or new keys, simply overwrite/set the value
        this.config[key] = value;
      }
    }
    return this; // Enable chaining
  }
}

// Function to blend two colors
function blendColors(color1, color2) {
  const r = ((color1 >> 16) + (color2 >> 16)) >> 1;
  const g = (((color1 >> 8) & 0xFF) + ((color2 >> 8) & 0xFF)) >> 1;
  const b = ((color1 & 0xFF) + (color2 & 0xFF)) >> 1;
  return (r << 16) | (g << 8) | b;
}
// TODO: add support for Entity.items

import EntityClass from '../../../Entity/Entity.js';
// TODO: remove TimersComponent import, use game reference instead ( reduce imported code )
import TimersComponent from '../../../Component/TimersComponent.js';

function distanceSquared(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

function deferEntityCreation(entityData) {
  // Add entity data to a spatial data structure
  spatialStructure.add(entityData);
}

// ignoreSetup set to true will ignore the setup phase of createEntity
// the setup phase assigns default values to the entity and auto-id
// this is currently being used from `rbush` plugin when creating deferred entities
export default function createEntity(config, ignoreSetup = false) {
  // console.log('createEntity', config)

  let entityId;

  if (!ignoreSetup) {
    entityId = this._generateId();

    let defaultConfig = {
      id: entityId,
      name: null,
      kind: null,
      body: true,
      shape: 'triangle',
      color: null,
      position: { x: 0, y: 0, z: 0 },
      startingPosition: null,
      velocity: { x: 0, y: 0, z: 0 },
      rotation: 0,
      mass: 100,
      density: 100,
      health: Infinity,
      score: 0,
      // radius: null,
      height: 100,
      width: 100,
      depth: 16,
      // Remark: height, width, and depth are being replaced by size
      size: { width: 100, height: 100, depth: 16 },
      lifetime: -1,
      maxSpeed: 9999,
      isStatic: false,
      isSensor: false,
      restitution: 0,
      container: null,
      items: null,
      sutra: null,
      meta: null,
      collectable: false,
      hasInventory: true,
      owner: 0, // 0 = server
      inputs: null,
      destroyed: false,
      type: 'NONE',
      friction: 0.1,  // Default friction
      frictionAir: 0.01, // Default air friction
      frictionStatic: 0.5, // Default static friction
      lockedProperties: null, // object hash of properties that should never be updated
      actionRateLimiter: null, // object hash of state history
      timers: null, // object hash timers for TimersComponent.js
      yCraft: null, // object hash of properties for YCraft.js
      text: null,
      style: null,
      texture: null,
      collisionActive: false,
      collisionStart: true,
      collisionEnd: false,
      exit: null,
      ctick: this.game.tick
    };

    // Remark: Adding support for new Entity.size prop, removing Entity.height and Entity.width
    if (typeof config.size === 'object') {
      config.width = config.size.width;
      config.height = config.size.height;
      config.depth = config.size.depth;
    } else {
      // Remark: Added 2/8/2024 Backwards support for legacy API, removed soon
      config.size = { width: config.width, height: config.height, depth: config.depth };
    }

    // merge config with defaultConfig
    config = { ...defaultConfig, ...config };

    // before mutating any game state based on the incoming entity, we *must* check that certain properties validate
    // check that position is well formed, contains, x,y,z, and is all valid numbers
    if (config.position &&
      (typeof config.position.x !== 'number' || isNaN(config.position.x) ||
        typeof config.position.y !== 'number' || isNaN(config.position.y))) {
      console.log('Entity.createEntity could not create with data', config);
      throw new Error('Invalid position for entity');
    }

    if (this.game.systems.rbush) {
      this.game.systems.rbush.addEntity(config);
    }

    // Remark: Always add to deferredEntities, this is now being used to store all local
    //         game data that may not yet be in the game.data scope ( off screen / not loaded )
    this.game.deferredEntities[config.id.toString()] = config;

    if (this.game.config.useFoV) {
      // check to see if entity is within game.data.fieldOfView,
      // if not, we will defer creation until it is
      let currentPlayer = this.game.getCurrentPlayer();
      if (currentPlayer) {
        let incomingPosition = config.position || { x: 0, y: 0, z: 0 };
        let distance = distanceSquared(currentPlayer.position.x, currentPlayer.position.y, incomingPosition.x, incomingPosition.y);
        let fieldOfViewSquared = this.game.data.fieldOfView * this.game.data.fieldOfView;
        if (distance > fieldOfViewSquared) {
          return;
        }
      }

    }

  }

  entityId = config.id;
  const entity = new EntityClass(entityId);

  /*
  entity.getTimer = (timerId) => {
    return this.game.components.timers.get(entityId, timerId);
  };
  */

  if (!config.startingPosition) {
    config.startingPosition = config.position;
  }

  const { name, type, kind, position, rotation, startingPosition, body, mass, density, velocity, isSensor, isStatic, lockedProperties, width, height, depth, size, radius, shape, color, maxSpeed, health, score, items, container, sutra, meta, collectable, hasInventory, owner, inputs, lifetime, yCraft, text, style, texture, collisionActive, collisionStart, collisionEnd, exit, ctick } = config;

  let { x, y } = position;

  /*
  if (typeof config.position !== 'undefined') {
    position.x = config.position.x;
    position.y = config.position.y;
  }
  */

  // console.log('position', position, 'width', width, 'height', height)
  // Using game's API to add components
  this.game.addComponent(entityId, 'type', type || 'PLAYER');
  this.game.addComponent(entityId, 'name', name || null);
  this.game.addComponent(entityId, 'kind', kind);
  this.game.addComponent(entityId, 'position', position);
  this.game.addComponent(entityId, 'startingPosition', startingPosition);
  this.game.addComponent(entityId, 'velocity', velocity);
  this.game.addComponent(entityId, 'rotation', rotation);
  this.game.addComponent(entityId, 'mass', mass);
  this.game.addComponent(entityId, 'density', density);
  this.game.addComponent(entityId, 'health', health);
  this.game.addComponent(entityId, 'score', score);
  this.game.addComponent(entityId, 'width', width);
  this.game.addComponent(entityId, 'height', height);
  this.game.addComponent(entityId, 'depth', depth);
  // Remark: height, width, and depth are being replaced by size
  this.game.addComponent(entityId, 'size', size);
  this.game.addComponent(entityId, 'radius', radius);
  this.game.addComponent(entityId, 'shape', shape);
  this.game.addComponent(entityId, 'color', color);
  this.game.addComponent(entityId, 'maxSpeed', maxSpeed);
  this.game.addComponent(entityId, 'owner', owner);
  this.game.addComponent(entityId, 'items', items);
  this.game.addComponent(entityId, 'sutra', sutra);
  this.game.addComponent(entityId, 'meta', meta);
  this.game.addComponent(entityId, 'collectable', collectable);
  
  // if entity is allowed to pickup items, add an inventory component
  this.game.addComponent(entityId, 'hasInventory', hasInventory);

  this.game.addComponent(entityId, 'inputs', inputs);
  this.game.addComponent(entityId, 'lifetime', lifetime);
  this.game.addComponent(entityId, 'destroyed', false);
  this.game.addComponent(entityId, 'creationTime', Date.now());  // Current time in milliseconds
  this.game.addComponent(entityId, 'isSensor', isSensor);
  this.game.addComponent(entityId, 'isStatic', isStatic);
  this.game.addComponent(entityId, 'lockedProperties', lockedProperties);
  this.game.addComponent(entityId, 'actionRateLimiter', {});
  // TODO: clean up API contract with Component
  this.game.addComponent(entityId, 'timers', new TimersComponent('timers', entityId, this.game));
  this.game.addComponent(entityId, 'yCraft', yCraft);
  this.game.addComponent(entityId, 'text', text);
  this.game.addComponent(entityId, 'style', style);
  this.game.addComponent(entityId, 'texture', texture);
  this.game.addComponent(entityId, 'collisionActive', collisionActive);
  this.game.addComponent(entityId, 'collisionStart', collisionStart);
  this.game.addComponent(entityId, 'collisionEnd', collisionEnd);
  this.game.addComponent(entityId, 'exit', exit);
  this.game.addComponent(entityId, 'ctick', ctick);

  if (body) {
    // remove this step, have everything work in addToWorld
    let body = {
      entityId: entityId,
      width: width,
      height: height,
      radius: radius,
      type: type,
      shape: shape,
      position: position,
      velocity: velocity,
      rotation: rotation,
      mass: mass,
      density: density,
      isStatic: isStatic,
      isSensor: isSensor,
      restitution: config.restitution,
      friction: config.friction,
      frictionAir: config.frictionAir,
      frictionStatic: config.frictionStatic
    }
    body.myEntityId = entityId; // TODO myEntityId is legacy, remove

    this.game.physics.addToWorld(body);
    // TODO: bodyMap needs to be removed
    //       in order to decouple physics from game, we'll need to use body references in app space
    //       and allow the physics interface to use entity.id as the key between worker and app space
    // this.game.bodyMap[entityId] = body;

    if (velocity && (velocity.x !== 0 || velocity.y !== 0)) {
      this.game.physics.setVelocity(entityId, velocity);
    }

    if (position) {
      this.game.physics.setPosition(entityId, position);
    }
    if (typeof rotation !== 'undefined') {
      if (this.game.physics && this.game.physics.setRotation) {
        this.game.physics.setRotation(entityId, rotation);
      }
    }
  } else {
    // immediately add to changedEntities
    // this.game.changedEntities.add(entityId);
  }


  


  // Add the entity to the game entities scope
  // TODO: new Entity() should do this
  // console.log('setting id', entityId, 'to entity')
  this.game.entities.set(entityId, {
    id: entityId
  });
  // console.log("SETTING CHANGED", entityId)
  // this.game.changedEntities.add(entityId);

  // get updated entity with components
  let updatedEntity = this.game.getEntity(entityId);

  if (typeof updatedEntity.pendingRender === 'undefined') {
    updatedEntity.pendingRender = {};
  }
  this.game.graphics.forEach(function (graphicsInterface) {
    updatedEntity.pendingRender[graphicsInterface.id] = true;
  });

  // updates entity in the ECS entity Map scope
  this.game.entities.set(entityId, updatedEntity);


  // TODO: move this to separate file
  if (container) {
    console.log('attemping to add to container');

    let containerEnt = this.game.findEntity(container); // Adjust this line to match how you access the boss entity

    if (!containerEnt) {
      throw new Error('Container not found: ' + container);
    }
    let containerPosition = containerEnt.position;
    console.log('found container ent to work with', containerEnt);

    let layoutType = 'none';

    if (containerEnt.style && containerEnt.style.layout) {
      layoutType = containerEnt.style.layout;
    }

    //
    // Add the current new entity id to the container items
    //
    containerEnt.items.push(entityId);

    //
    // Default / no layout indicates relative position from top left origin ( -1, -1 )
    // Remark: May want to add custom origins such as center ( 0, 0 ) or bottom right ( 1, 1 ), etc
    //
    if (layoutType === 'none') {
      // console.log('adding item to container using relative position with no layout algorithm');
      // adjust the absolute position about to be set to the container relative position
      position.x = position.x + containerPosition.x;
      position.y = position.y + containerPosition.y;
    }

    //
    // Layout container items using grid layout algorithm
    //
    if (layoutType === 'grid') {
      let cols = containerEnt.style.grid.columns;
      let rows = containerEnt.style.grid.rows;

      if (typeof cols !== 'number' || typeof rows !== 'number') {
        console.log('containerEnt.layout', containerEnt.layout);
        throw new Error('Grid layout requires cols and rows to be numbers');
      }

      // get all the other items in the container
      let containerItems = containerEnt.items || [];

      // call game.getEntity() for each item to get its size and position
      // TODO: use components api to only fetch the necessary components ( instead of entire ent )
      containerItems = containerItems.map((itemId) => {
        return this.game.getEntity(itemId);
      });

      let containerSize = containerEnt.size;

      // Calculate the width and height for each grid cell
      let cellWidth = containerSize.width / cols;
      let cellHeight = containerSize.height / rows;

      // Loop through each item in the container
      containerItems.forEach((item, index) => {
        // Calculate the row and column for the current item based on its index
        let row = Math.floor(index / cols);
        let col = index % cols;

        // skip if item is not found
        if (!item) {
          // Remark: This should *not* happen, investigate why index is null value
          console.log('warning: item not found in container', index, item)
          return;
        }

        let paddingTop = containerEnt.style.paddingTop || 20;
        let paddingLeft = containerEnt.style.paddingLeft || -10;

        // Set the starting position to the top-left corner of the container's bounding box
        let positionX = containerPosition.x - containerSize.width / 2 + paddingLeft;
        let positionY = containerPosition.y - containerSize.height / 2 + paddingTop;
        let positionZ = containerPosition.z;

        // Calculate the position for the current item, aligning the center of the entity with the center of the grid cell
        let itemPosition = {
          x: positionX + (col * cellWidth) + (cellWidth / 2), // Center of the grid cell
          y: positionY + (row * cellHeight) + (cellHeight / 2), // Center of the grid cell
          z: item.position.z // Assuming z-index remains constant or is managed elsewhere
        };

        // Update the entity's position using the game framework's method
        this.game.updateEntity({ id: item.id, position: itemPosition });

        console.log(`Item ${item.id} positioned at row ${row}, column ${col}`);
      });

      console.log('adding item to container using grid layout algorithm');
    }

    //
    // Layout container items using custom function
    //
    if (typeof layoutType === 'function') {
      console.log('adding item to container using custom layout algorithm');
      throw new Error('Custom layout algorithm functions are yet implemented!')
    }

  }

  // updates entity in the flat game.data scope
  this.game.data.ents = this.game.data.ents || {};
  this.game.data.ents._ = this.game.data.ents._ || {};
  this.game.data.ents._[entityId] = updatedEntity;
  this.game.data.ents[updatedEntity.type] = this.game.data.ents[updatedEntity.type] || [];
  this.game.data.ents[updatedEntity.type].push(updatedEntity);

  return updatedEntity;
}
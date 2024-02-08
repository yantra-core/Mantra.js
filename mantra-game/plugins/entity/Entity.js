// Entity.js - Marak Squires 2023

import createEntity from './lib/createEntity.js';
import getEntity from './lib/getEntity.js';
import inflateEntity from './lib/inflateEntity.js';
import removeEntity from './lib/removeEntity.js';
import updateEntity from './lib/updateEntity.js';

class Entity {

  static id = 'entity';
  static removable = false;

  constructor() {
    this.id = Entity.id;
    this.nextEntityId = 1; // 0 is reserved for server
  }

  init(game) {

    // bind game scope to this.game
    this.game = game;

    // init a new Map to store entities
    game.entities = new Map();

    this.game.systemsManager.addSystem(this.id, this);

    // Bind some methods to parent Game scope for convenience
    // The most useful and common System methods are expected to be bound to Game
    // This allows developers to customcraft a clean Game API based on their needs
    this.game.createEntity = createEntity.bind(this);
    this.game.getEntity = getEntity.bind(this);
    this.game.removeEntity = removeEntity.bind(this);
    this.game.getEntityByName = this.getEntityByName.bind(this);
    this.game.getEntities = this.allEntities.bind(this);
    this.game.updateEntity = updateEntity.bind(this);
    this.game.inflateEntity = inflateEntity.bind(this);
    this.game.hasEntity = this.hasEntity.bind(this);
    this.game.findEntity = this.findEntity.bind(this);
    this.game.removeAllEntities = this.removeAllEntities.bind(this);
  }

  hasEntity (entityId) {
    return this.game.entities.has(entityId);
  }

  findEntity (query) {
    if (typeof query === 'string') {
      query = { name: query };
    }
    // iterate over entities and return the first match
    for (let [entityId, entity] of this.game.entities) {
      let match = true;
      for (let key in query) {
        if (entity[key] !== query[key]) {
          match = false;
          break;
        }
      }
      if (match) {
        return entity;
      }
    }
  }

  getEntityByName(name) {
    for (let [entityId, entity] of this.game.entities) {
      if (entity.name === name) {
        return entity;
      }
    }
  }
 
  _generateId() {
    return this.nextEntityId++;
  }

  cleanupDestroyedEntities() {
    const destroyedComponentData = this.game.components.destroyed.data;
    for (let entityId in destroyedComponentData) {
      if (typeof entityId === 'string') {
        entityId = parseInt(entityId); // for now, this can be removed when we switch Component.js to use Maps
      }
      const destroyedType = this.game.components.type.get(entityId);
      if (destroyedComponentData[entityId]) {
        // Removes the body from the physics engine
        if (typeof this.game.physics.removeBody === 'function') {
          if (this.game.physics.bodyMap[entityId]) {
            // removes body from physics engine
            this.game.physics.removeBody(this.game.physics.bodyMap[entityId]);
            // deletes reference to body
            delete this.game.physics.bodyMap[entityId];
          } else {
            // console.log('No body found for entityId', entityId);
          }
        }
        // Delete associated components for the entity using Component's remove method
        for (let componentType in this.game.components) {
          this.game.components[componentType].remove(entityId);
        }
        this.game.entities.delete(entityId);
        // remove the reference in this.game.data.ents
        delete this.game.data.ents._[entityId];
        // find entity by id and filter it out
        if (this.game.data.ents[destroyedType]) {
          // TODO: missing test ^^^
          this.game.data.ents[destroyedType] = this.game.data.ents[destroyedType].filter((entity) => {
            return Number(entity.id) !== Number(entityId);
          });
        }
      }
    }
  }

  // Update the getEntities method to return the game.entities
  allEntities() {
    return this.game.entities;
  }


  applyLockedProperties(entityId, lockedProperties) {
    // Check and apply locked properties
    if (lockedProperties) {
      console.log("Processing lockedProperties properties");
      for (let key in lockedProperties) {
        let currentVal = this.game.components[key].get(entityId);
        console.log('currentVal', currentVal, 'key', key, lockedProperties)
        if (currentVal !== undefined && currentVal !== null) {
          if (typeof lockedProperties[key] === 'object' && !Array.isArray(lockedProperties[key])) {
            // If lockedProperties[key] is an object, iterate through its keys
            console.log('lockedProperties[key]', lockedProperties[key])
            for (let subKey in lockedProperties[key]) {
              console.log('subKey', subKey, lockedProperties[key][subKey])
              if (lockedProperties[key][subKey] === true) {  // only process if the value is true
                let nestedVal = currentVal[subKey];
                if (nestedVal !== undefined && nestedVal !== null) {
                  console.log('Setting lockedProperties property', `${key}.${subKey}`, 'to', nestedVal);
                  this.game.components['lockedProperties'].set(entityId, { [key]: { [subKey]: nestedVal } });
                } else {
                  console.log('Error: No such component or invalid value for', `${key}.${subKey}`);
                }
              }
            }
          } else if (lockedProperties[key] === true) {  // if lockedProperties[key] is not an object and the value is true
            console.log('Setting lockedProperties property', key, 'to', currentVal);
            this.game.components['lockedProperties'].set(entityId, { [key]: currentVal });
          }
        } else {
          console.log('Error: No such component or invalid value for', key);
        }
      }
    }
  }

  removeAllEntities(options) {

    // curry arguments, legacy API
    let clearCurrentPlayer = false;
    let excludeByName = [];
    if (typeof options === 'boolean') {
      clearCurrentPlayer = options;
    }

    if (typeof options === 'object' && Array.isArray(options.excludeByName)) {
      excludeByName = options.excludeByName;
    }

    this.game.entities.forEach(ent => {
      // Do not remove the current player if clearCurrentPlayer is false
      if (ent.id === this.game.currentPlayerId && !clearCurrentPlayer) {
        return;
      }
      // Do not remove entities that are excluded by name
      if (excludeByName.includes(ent.name)) {
        return;
      }
      if (ent && ent.yCraft && ent.yCraft.part && ent.yCraft.part.unload) {
        ent.yCraft.part.unload();
      }
      this.game.removeEntity(ent.id);
    });
    if (clearCurrentPlayer) {
      this.game.currentPlayerId = null;
    }
  }

}

export default Entity;

/* refactor to use this pattern */
/*
import Entity from './Entity.js';
const entity = new Entity(entityId);

*/

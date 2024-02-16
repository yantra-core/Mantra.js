// Collisions.js - Marak Squires 2023
class Collisions {

  static id = 'collisions';
  static removable = false;

  constructor() {
    this.id = Collisions.id;
  }

  init(game) {
    this.game = game;

    // TODO: this won't work unless game.physics exists
    // Binds our handleCollision method to the game physics engine's collisionStart event
    this.game.physics.collisionStart(this.game, this.handleCollision.bind(this));
    this.game.physics.collisionActive(this.game, this.collisionActive.bind(this));
    this.game.physics.collisionEnd(this.game, this.collisionEnd.bind(this));

    // Binds game.handleCollision to the Game for convenience 
    this.game.handleCollision = this.handleCollision.bind(this);

  }

  handleCollision(pair, bodyA, bodyB) {

    // console.log('Collision detected between:', bodyA.myEntityId, 'and', bodyB.myEntityId);
    const entityIdA = bodyA.myEntityId;
    const entityIdB = bodyB.myEntityId;

    //const entityA = this.game.getEntity(entityIdA);
    //const entityB = this.game.getEntity(entityIdB);
    const entityA = bodyA.entity;
    const entityB = bodyB.entity;

    let canCollide = this.game.lifecycle.triggerHook('before.collisionStart', entityA, entityB, pair);

    if (canCollide === false) {
      // console.log('before.collisionStart returned false, skipping collision', entityIdA, entityIdB);
      return;
    }

    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }

    // TODO: remove this in favor of collisionStart() handler?
    // Remark: May have many of these? Only allow on per entity? may need array?
    if (entityA.exit || entityB.exit) {
      let exitEnt = entityA.exit ? entityA : entityB;
      let enterEnt = entityA.exit ? entityB : entityA;

      if (typeof exitEnt.exit.exitHandler === 'function') {
        // call with this.game scope
        //exitEnt.exit.exitHandler(enterEnt, exitEnt);
        exitEnt.exit.exitHandler.call(this.game, enterEnt, exitEnt);
      } else {
        if (typeof exitEnt.exit.world !== 'undefined') {
          if (enterEnt.type === 'PLAYER') {
            game.switchWorlds(exitEnt.exit.world);
          }
        }
        if (typeof exitEnt.exit.position !== 'undefined') {
          this.game.setPosition(enterEnt.id, { x: exitEnt.exit.position.x, y: exitEnt.exit.position.y });
        }
      }

    }
    if (entityA.collisionStart) {
      if (typeof entityA.collisionStart === 'function') {
        // console.log('calling entityA.collisionStart', entityA.collisionStart, entityA, entityB)
        entityA.collisionStart.call(this.game, entityB, entityA);
      }
    }

    if (entityB.collisionStart) {
      if (typeof entityB.collisionStart === 'function') {
        // console.log('calling entityB.collisionStart', entityB.collisionStart, entityB, entityA)
        entityB.collisionStart.call(this.game, entityA, entityB);
      }
    }

    //
    // Collectable entities will get attached to the entity they collide with
    // this is done by adding to Entity.items() array
    // further checks in Collectibles system can update the position of the collectable
    function addItemIfCollectible(sourceEntity, targetEntity) {
      if (!targetEntity.hasInventory) {
        return;
      }
      // console.log('Processing collectable', sourceEntity.collectable, sourceEntity, targetEntity);
      // Initialize the target entity's items array if it doesn't exist
      targetEntity.items = targetEntity.items || [];
      // Check if the source entity's ID is already in the target entity's items array
      // If not, add it to the array and update the entity
      if (!targetEntity.items.includes(sourceEntity.id)) {

        /* TODO: add this back, we'll need a config flag + og body reference if item is dropped
        // that means recreate the item, better from ref incase item was mutated by game code
        // if the source entity has a body, remove it ( in some cases we want to keep it )
        game.updateEntity({
          id: sourceEntity.id,
          body: false
        })
        */

        // console.log("ADDING ITEM", sourceEntity.id, targetEntity.id, targetEntity.items)
        targetEntity.items.push(sourceEntity.id);
        this.game.updateEntity({
          id: targetEntity.id,
          items: targetEntity.items
        });
      }
    }

    if (entityA.collectable) {
      addItemIfCollectible.call(this, entityA, entityB);
    }

    if (entityB.collectable) {
      addItemIfCollectible.call(this, entityB, entityA);
    }

    // Check for specific collision cases and send events to the state machine
    if (this.shouldSendCollisionEvent(bodyA, bodyB, 'START')) {
      if (this.game.machine && this.game.machine.sendEvent) {
        // console.log('sending machine event', 'COLLISION');
        this.game.machine.sendEvent('COLLISION', {
          entityIdA: bodyA.myEntityId,
          entityIdB: bodyB.myEntityId
        });
      }

      if (entityA.yCraft && entityA.yCraft.part && entityA.yCraft.part.handleCollision) {
        if (entityB.type !== 'TEXT') {
          entityA.yCraft.part.handleCollision(entityB);
        }
      }
      if (entityB.yCraft && entityB.yCraft.part && entityB.yCraft.part.handleCollision) {
        if (entityA.type !== 'TEXT') {
          entityB.yCraft.part.handleCollision(entityA);
        }
      }

      // Remark: This could be this.game.systems.sutra
      this.game.data.collisions = this.game.data.collisions || [];
      // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
      let collisionContext = {
        type: 'COLLISION',
        kind: 'START',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        bodyA: entityA,
        bodyB: entityB
      };

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;

      this.game.data.collisions.push(collisionContext);

      this.game.lifecycle.triggerHook('after.collisionStart', entityA, entityB, pair);

    }

    // do not process player collisions locally ( for now )
    if (this.game.isClient && entityA.type === 'PLAYER' && entityB.type === 'PLAYER') {
      //console.log("BYPASSING PLAYER COLISION ON CLIENT")
      pair.isActive = false;
      return;
    }

    // iterate through all systems and see if they have a handleCollision method
    for (const [_, system] of this.game.systemsManager.systems) {
      if (typeof system.handleCollision === "function") {
        // any system that has a handleCollision method will be called here
        system.handleCollision(pair, bodyA, bodyB);
      }
    }
  }

  // TODO: Remark: Active collisions should be managed in a Map() with unique key,
  //               being composite key of entityIdA and entityIdB
  //               This will allow for optimized collision management and improved time complexity
  collisionEnd(pair, bodyA, bodyB) {
    // console.log('collisionEnd', pair, bodyA, bodyB);

    const entityIdA = bodyA.myEntityId;
    const entityIdB = bodyB.myEntityId;

    const entityA = bodyA.entity;
    const entityB = bodyB.entity;

    this.game.lifecycle.triggerHook('before.collisionEnd', entityA, entityB, pair);

    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }

    if (entityA.collisionEnd) {
      if (typeof entityA.collisionEnd === 'function') {
        entityA.collisionEnd.call(this.game, entityB, entityA);
      }
    }

    if (entityB.collisionEnd) {
      if (typeof entityB.collisionEnd === 'function') {
        entityB.collisionEnd.call(this.game, entityA, entityB);
      }
    }

    if (this.shouldSendCollisionEvent(bodyA, bodyB, 'END')) {

      this.game.data.collisions = this.game.data.collisions || [];
      // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
      let collisionContext = {
        type: 'COLLISION',
        kind: 'END',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        bodyA: entityA,
        bodyB: entityB
      };

      // Find and remove the active collision
      this.game.data.collisions = this.game.data.collisions.filter(collision => {
        return !(collision.entityIdA === bodyA.myEntityId &&
          collision.entityIdB === bodyB.myEntityId &&
          collision.kind === 'ACTIVE');
      });

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;

      this.game.data.collisions.push(collisionContext);

    }

    // iterate through all systems and see if they have a handleCollision method
    for (const [_, system] of this.game.systemsManager.systems) {
      if (typeof system.collisionEnd === "function") {
        // any system that has a handleCollision method will be called here
        system.collisionEnd(pair, bodyA, bodyB);
      }
    }

    this.game.lifecycle.triggerHook('after.collisionEnd', entityA, entityB, pair);

  }

  collisionActive(pair, bodyA, bodyB) {

    const entityIdA = bodyA.myEntityId;
    const entityIdB = bodyB.myEntityId;

    const entityA = bodyA.entity;
    const entityB = bodyB.entity;

    this.game.lifecycle.triggerHook('before.collisionActive', entityA, entityB, pair);

    // console.log('collisionActive', pair, bodyA, bodyB, entityA, entityB)
    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }


    if (entityA.collisionActive) {
      if (typeof entityA.collisionActive === 'function') {
        entityA.collisionActive.call(this.game, entityB, entityA);
      }
    }

    if (entityB.collisionActive) {
      if (typeof entityB.collisionActive === 'function') {
        entityB.collisionActive.call(this.game, entityA, entityB);
      }
    }

    if (this.shouldSendCollisionEvent(bodyA, bodyB, 'ACTIVE')) {

      this.game.data.collisions = this.game.data.collisions || [];
      // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
      let collisionContext = {
        type: 'COLLISION',
        kind: 'ACTIVE',
        entityIdA: bodyA.myEntityId,
        entityIdB: bodyB.myEntityId,
        ticks: 1,
        duration: 1,
        bodyA: entityA,
        bodyB: entityB
      };

      // add entity onto the collision by type name
      collisionContext[entityA.type] = entityA;
      collisionContext[entityB.type] = entityB;

      // Find existing collision, if any
      let existingCollision = this.game.data.collisions.find(collision =>
        collision.entityIdA === collisionContext.entityIdA &&
        collision.entityIdB === collisionContext.entityIdB &&
        collision.kind === 'ACTIVE'
      );

      if (existingCollision) {
        // Increment duration if collision is already active
        existingCollision.duration += 1 / this.game.data.fps; // Adds approximately 0.01667 seconds per tick at 60 FPS
        existingCollision.ticks++;
      } else {
        // Add new collision if not found
        this.game.data.collisions.push(collisionContext);
      }
    }

    // iterate through all systems and see if they have a handleCollision method
    for (const [_, system] of this.game.systemsManager.systems) {
      if (typeof system.collisionActive === "function") {
        // any system that has a handleCollision method will be called here
        system.collisionActive(pair, bodyA, bodyB);
      }
    }

    this.game.lifecycle.triggerHook('after.collisionActive', entityA, entityB, pair);

  }

  // Remark: In most cases this code path will not be reached since the Physics interface,
  //         should be responsible for delegating collisions based on the collision type
  //         We keep this additional check for future proofing and additional gaurds on collision logic
  //         In the future, we would expect to see collision layers and collision groups here
  shouldSendCollisionEvent(bodyA, bodyB, kind = 'START') {
    // for now, send all events to the stateMachine
    if (kind === 'ACTIVE' && (bodyA.entity.collisionActive === true || bodyB.entity.collisionActive === true)) {
      return true;
    }
    if (kind === 'START' && (bodyA.entity.collisionStart || bodyB.entity.collisionStart)) {
      return true;
    }
    if (kind === 'END' && (bodyA.entity.collisionEnd === true || bodyB.entity.collisionEnd === true)) {
      return true;
    }
    return false;
  }

}

export default Collisions;
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

    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }

    if (entityA.exit || entityB.exit) {
      let exitEnt = entityA.exit ? entityA : entityB;
      let enterEnt = entityA.exit ? entityB : entityA;
      if (typeof exitEnt.exit.world !== 'undefined') {
        game.switchWorlds(exitEnt.exit.world);
      }
      if (typeof exitEnt.exit.position !== 'undefined') {
        this.game.setPosition(enterEnt.id, { x: exitEnt.exit.position.x, y: exitEnt.exit.position.y });
      }
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

    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
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

  }

  collisionActive(pair, bodyA, bodyB) {

    const entityIdA = bodyA.myEntityId;
    const entityIdB = bodyB.myEntityId;

    const entityA = bodyA.entity;
    const entityB = bodyB.entity;

    // console.log('collisionActive', pair, bodyA, bodyB, entityA, entityB)
    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
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
        existingCollision.duration += 1 / this.game.data.FPS; // Adds approximately 0.01667 seconds per tick at 60 FPS
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
    if (kind === 'START' && (bodyA.entity.collisionStart === true || bodyB.entity.collisionStart === true)) {
      return true;
    }
    if (kind === 'END' && (bodyA.entity.collisionEnd === true || bodyB.entity.collisionEnd === true)) {
      return true;
    }
    return false;
  }

}

export default Collisions;
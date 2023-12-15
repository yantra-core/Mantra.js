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
    this.game.physics.collisionActive(this.game, function noop() { });
    this.game.physics.collisionEnd(this.game, function noop() { });

    // Binds game.handleCollision to the Game for convenience 
    this.game.handleCollision = this.handleCollision.bind(this);

  }
  handleCollision(pair, bodyA, bodyB) {

    // console.log('Collision detected between:', bodyA.myEntityId, 'and', bodyB.myEntityId);
    const entityIdA = bodyA.myEntityId;
    const entityIdB = bodyB.myEntityId;

    const entityA = this.game.getEntity(entityIdA);
    const entityB = this.game.getEntity(entityIdB);

    if (!entityA || !entityB) {
      // console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }
    // Check for specific collision cases and send events to the state machine
    if (this.shouldSendCollisionEvent(bodyA, bodyB)) {
      if (this.game.machine && this.game.machine.sendEvent) {
        // console.log('sending machine event', 'COLLISION');
        this.game.machine.sendEvent('COLLISION', {
          entityIdA: bodyA.myEntityId,
          entityIdB: bodyB.myEntityId
        });
      }

      if (entityA.realStone && entityA.realStone.part && entityA.realStone.part.handleCollision) {
        if (entityB.type !== 'TEXT') {
          entityA.realStone.part.handleCollision(entityB);
        }
      }
      if (entityB.realStone && entityB.realStone.part && entityB.realStone.part.handleCollision) {
        if (entityA.type !== 'TEXT') {
          entityB.realStone.part.handleCollision(entityA);
        }
      }

      if (this.game.rules) {
        this.game.data.collisions = this.game.data.collisions || [];
        // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
        let collisionContext = {
          type: 'COLLISION',
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
    }

    //console.log(entityA)
    //console.log(entityB)

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

  shouldSendCollisionEvent(bodyA, bodyB) {
    // for now, send all events to the stateMachine
    return true;
  }

}

export default Collisions;
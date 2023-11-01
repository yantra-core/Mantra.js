// CollisionPlugin.js
class CollisionPlugin {
  constructor() {
    // You can also add listeners for collisionActive and collisionEnd if needed
  }

  init (game) {
    this.game = game;
    
    // Binds our handleCollision method to the game physics engine's collisionStart event
    this.game.physics.collisionStart(this.game.engine, this.handleCollision.bind(this));
    
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
      console.log('handleCollision no entity found. Skipping...', entityIdA, entityA, entityIdB, entityB);
      return;
    }

    //console.log(entityA)
    //console.log(entityB)
    // do not process player collisions locally ( for now )
    if (this.game.isClient && entityA.type === 'PLAYER' && entityB.type === 'PLAYER') {
      //console.log("BYPASSING PLAYER COLISION ON CLIENT")
      pair.isActive = false;
      return;
    }

    for (const [_, system] of this.game.systemsManager.systems) {
      if (typeof system.handleCollision === "function") {
        system.handleCollision(pair, bodyA, bodyB);
      }
    }
  }

}

export default CollisionPlugin;
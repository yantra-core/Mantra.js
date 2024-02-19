export default function  collisionStart(game, callback) {
  let Matter = this.Matter
  Matter.Events.on(this.engine, 'collisionStart', (event) => {
    for (let pair of event.pairs) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      const entityIdA = bodyA.myEntityId;
      const entityIdB = bodyB.myEntityId;

      const entityA = this.game.getEntity(entityIdA);
      const entityB = this.game.getEntity(entityIdB);

      bodyA.entity = entityA;
      bodyB.entity = entityB;

      if (bodyA.entity.collisionStart || bodyB.entity.collisionStart ) {
        game.emit('collisionStart', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    }
  });
}
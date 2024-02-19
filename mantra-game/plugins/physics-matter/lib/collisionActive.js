export default function collisionActive(game, callback) {
  this.Matter.Events.on(this.engine, 'collisionActive', (event) => {
    for (let pair of event.pairs) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      // console.log('collisionActive', bodyA.entity, bodyB.entity)
      if (bodyA.entity.collisionActive || bodyB.entity.collisionActive) {
        game.emit('collision::active', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    }
  });
}
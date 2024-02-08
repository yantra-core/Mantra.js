export default function collisionEnd(game, callback) {
  let Matter = this.Matter
  Matter.Events.on(this.engine, 'collisionEnd', (event) => {
    for (let pair of event.pairs) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;
      if (bodyA.entity.collisionEnd === true || bodyB.entity.collisionEnd === true) {
        game.emit('collision::end', { pair, bodyA, bodyB })
        callback(pair, bodyA, bodyB);
      }
    }
  });
}

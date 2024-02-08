export default function lockedProperties(body) {
  let Matter = this.Matter;
  let eId = body.myEntityId;
  let ent = this.game.getEntity(eId);
  if (ent && ent.lockedProperties) {
    if (ent.lockedProperties.position) {
      let currentPosition = body.position;
      if (typeof ent.lockedProperties.position.x === 'number') {
        currentPosition.x = ent.lockedProperties.position.x;
      }
      if (typeof ent.lockedProperties.position.y === 'number') {
        currentPosition.y = ent.lockedProperties.position.y;
      }
      Matter.Body.setPosition(body, currentPosition);
    }
  }
}
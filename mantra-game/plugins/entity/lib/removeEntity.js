export default function removeEntity(entityId) {
  let ent = this.game.entities.get(entityId);
  if (ent && this.game.systems.graphics && ent.graphics) {
    // Is this best done here? or in the graphics plugin?
    this.game.systems.graphics.removeGraphic(entityId);
  }
  if (ent) {
    this.game.components.destroyed.set(entityId, true);

    // check to see if any timers exist, if so clear them all
    if (this.game.components.timers.get(entityId)) {
      let timers = this.game.components.timers.get(entityId);
      for (let timerId in timers.timers) {
        timers.removeTimer(timerId);
      }
    }

    // update the entity with the destroyed state
    let updatedEntity = this.game.getEntity(entityId);
    this.game.entities.set(entityId, updatedEntity);

    if (updatedEntity && this.game.systems.rbush) {
      // TODO: don't remove entity if field of view is active
      // this way it will reinflate when it comes back into view
      // this.game.systems.rbush.removeEntity(updatedEntity);
    }

  }

}

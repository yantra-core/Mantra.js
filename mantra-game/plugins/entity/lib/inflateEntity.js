export default function inflateEntity(entityData) { // TODO: ensure creator_json API can inflate without graphics / client deps
  let game = this.game;
  // console.log('inflateEntity', entityData)
  // takes outside state and performs update/destroy/create depending
  // on the current local state of the entity and incoming state
  // if the incoming state is pending destroy, just remove it immediately and return
  if (entityData.destroyed === true) {
    game.removeGraphic(entityData.id);
    game.removeEntity(entityData.id);
    return;
  }

  // Check if the entity is marked for local removal
  // This could happen if client-side prediction has removed an entity,
  // and the server still has an update for it in the queue
  if (this.game.removedEntities.has(entityData.id)) {
    console.log('Skipping update for locally removed entity:', entityData.id);
    return;
  }

  // this isn't a destroyed state, attempt to get a copy of the local state by id
  let localEntity = game.entities.get(entityData.id);
  if (!localEntity) {
    // no local copy of the state exists, create a new entity
    if (typeof entityData.height === 'undefined' || typeof entityData.width === 'undefined') {
      // Remark: This shouldn't happen, there is an issue where local destroyed entities are still being considered updated
      // and the local system thinks we should create a new entity on the state update; however the state is stale and
      // the entity is already destroyed, so we do not wish to update the state, skip for now
      // TODO: we should resolve this with unit tests and ensure syncronization between server and client
      return;
    }
    game.createEntity(entityData);
  } else {
    // a local copy of the state exists, update it
    game.updateEntity(entityData);
  }

}
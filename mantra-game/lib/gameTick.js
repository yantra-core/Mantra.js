let lastTick = Date.now();

function gameTick() {
  this.tick++;
  this.data.tick = this.tick;

  let hzMS = this.config.hzMS || 16.666; // 60 FPS
  if (this.currentPlayerId) {
    this.data.currentPlayer = this.data.ents.PLAYER.find(player => player.id === this.currentPlayerId);
  }

  // Calculate deltaTime in milliseconds
  let now = Date.now();
  let deltaTimeMS = now - lastTick; // Delta time in milliseconds
  lastTick = now;

  // Clamp deltaTime to avoid time spiral and ensure stability
  deltaTimeMS = Math.min(deltaTimeMS, hzMS);

  // Clear changed entities
  this.removedEntities.clear();

  if (this.isClient) {
    // TODO: move to localGameLoop?
    this.systems['entity'].cleanupDestroyedEntities();
  }

  // Update the physics engine
  this.physics.updateEngine(deltaTimeMS);

  // Run game lifecycle hooks
  if (this.lifecycle) {
    this.lifecycle.triggerHook('before.update', hzMS);
  }

  // run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Run game lifecycle hooks
  if (this.lifecycle) {
    this.lifecycle.triggerHook('after.update', hzMS);
  }
  
  /*
  Remark: Removed 1/22/24, this is directly handled by the graphics system in offline mode
  for (let entityId of this.changedEntities) {
    if (this.isClient && this.isOnline === false) {
      // only consider entities that are within the field of view of the current player
      // check to see if entityId is not within ItemsInFov array
      console.log("itemInFov.indexOf(entityId)", itemInFov.indexOf(entityId))
      if (itemInFov.indexOf(entityId) === -1) {
        continue;
      }
      let ent = this.entities.get(entityId);
      if (ent) {
        this.graphics.forEach(function inflateEntityPerInterface (graphicsInterface) {
          // graphicsInterface.inflateEntity(ent);
        });
      }
    }
  }
  */

  this.changedEntities.clear();

  // Save the game snapshot
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);
  // TODO: THESE should / could all be hooks, after::gameTick

}

export default gameTick;
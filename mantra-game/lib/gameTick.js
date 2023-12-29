let lastTick = Date.now();
let hzMS = 16.666; // 60 FPS

function gameTick() {
  this.tick++;
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
  this.physics.updateEngine(this.physics.engine, deltaTimeMS);

  // run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Loop through entities that have changed
  for (let entityId of this.changedEntities) {
    if (this.isClient && this.isOnline === false) {
      let ent = this.entities.get(entityId);
      if (ent) {
        this.graphics.forEach(function (graphicsInterface) {
          graphicsInterface.inflateEntity(ent);
        });
      }

    }
  }

  this.changedEntities.clear();

  // Save the game snapshot
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);
  // TODO: THESE should / could all be hooks, after::gameTick

}

export default gameTick;
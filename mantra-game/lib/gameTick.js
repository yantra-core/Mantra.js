let lastTick = Date.now();
let hzMS = 16.666; // 60 FPS

function gameTick(lastGameTick, accumulator) {

  // Calculate deltaTime in milliseconds
  let now = Date.now();
  let deltaTimeMS = now - lastTick; // Delta time in milliseconds
  lastTick = now;

  // Clamp deltaTime to avoid time spiral and ensure stability
  deltaTimeMS = Math.min(deltaTimeMS, hzMS);

  // at the start of the game tick, run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Update the physics engine
  this.physics.updateEngine(this.physics.engine, hzMS); // TODO: deltaTime

  // Loop through entities that have changed
  for (let entityId of this.changedEntities) {
    const body = this.bodyMap[entityId];
    // TODO: entities that can exist outside of physics engine / aka bodyMap

    if (!body) {
      console.error(`No body found for entity ${entityId}`);
      continue;
    }

    // TODO: move this to Bullet plugin
    let entity = this.getEntity(entityId);
    // kinematic bullet movements on client
    if (this.isClient && entity.type === 'BULLET') {
      // console.log("kinematic", entity)
      if (entity.graphics) {
        for (let g in entity.graphics) {
          let graphicInterface = this.systems[g];
          if (graphicInterface) {
            graphicInterface.updateGraphic(entity);
          }
        }
      }
    }

  }

  // Save the game snapshot
  this.saveSnapshot(this.getEntities(), this.lastProcessedInput);

  // Clear changed entities
  this.changedEntities.clear();
  
  this.systems.entityFactory.cleanupDestroyedEntities();


  // TODO: THESE should / could all be hooks, after::gameTick

  // Reset the accumulator on each game logic update
  accumulator = 0;
  lastGameTick = Date.now();


}

export default gameTick;

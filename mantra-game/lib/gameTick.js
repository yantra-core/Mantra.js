let lastTick = Date.now();
let hzMS = 16.666; // 60 FPS

function gameTick() {

  // Calculate deltaTime in milliseconds
  let now = Date.now();
  let deltaTimeMS = now - lastTick; // Delta time in milliseconds
  lastTick = now;

  // Clamp deltaTime to avoid time spiral and ensure stability
  deltaTimeMS = Math.min(deltaTimeMS, hzMS);

  // Update the physics engine
  this.physics.updateEngine(this.physics.engine, deltaTimeMS);


  // run the .update() method of all registered systems
  if (this.systemsManager) {
    this.systemsManager.update(hzMS); // TODO: use deltaTime in systemsManager
  }

  // Loop through entities that have changed
  // TODO: move rendering logic out of gameTick
  for (let entityId of this.changedEntities) {
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

}

export default gameTick;

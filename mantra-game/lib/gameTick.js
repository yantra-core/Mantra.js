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
  //this.changedEntities.clear();
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
  // TODO: move rendering logic out of gameTick to Graphics.js
  for (let entityId of this.changedEntities) {

    // we need a way for the local game mode to know when to render entities
    if (this.isClient && this.isOnline === false) {
      let ent = this.entities.get(entityId);
      if (ent) {
        // pendingRender is not a component property yet, just ad-hoc on client
        ent.pendingRender = {};
        // flag each graphics interface as needing to render this entity
        // remark: this is local game mode only
        this.graphics.forEach(function (graphicsInterface) {
          ent.pendingRender[graphicsInterface.id] = true;
        });
      }
    }

    // TODO: move this to Bullet plugin
    let entity = this.getEntity(entityId);
    // kinematic bullet movements on client
    if (this.isClient && entity && entity.type === 'BULLET') {
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


  // TODO: THESE should / could all be hooks, after::gameTick

}

export default gameTick;
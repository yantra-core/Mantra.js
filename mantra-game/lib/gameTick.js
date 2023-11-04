let hzMS = 40;

function gameTick() {

  // at the start of the game tick, run the .update() method of all registered systems
  // TODO: addSystem -> registerSystem
  if (this.systemsManager) {
    this.systemsManager.update()
  }

  // Update the physics engine
  this.physics.updateEngine(this.physics.engine, hzMS); // TODO: deltaTime

  // Loop through entities that have changed
  // TODO: Ensure we check all components properties here that could have changed
  // this seems wrong, should all be based on snapshot processing physics-matter beforeHandler
  for (let entityId of this.changedEntities) {
    const body = this.bodyMap[entityId];
    // TODO: entities that can exist outside of physics engine / aka bodyMap

    if (!body) {
      console.error(`No body found for entity ${entityId}`);
      continue;
    }

    // TODO: move this to Bullet plugin
    // TODO: why is this in game tick? seems like it's bullet system logic
    let entity = this.getEntity(entityId);
    if (this.isClient && entity.type === 'BULLET') { // kinematic bullet movements on client
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

export default function inflateEntity(entityData) {
  let game = this.game;

  // Check for entity marked for destruction and remove immediately if so
  if (entityData.destroyed === true) {
    game.removeGraphic(entityData.id);
    game.removeEntity(entityData.id);
    return;
  }

  // Check for entities marked for local removal, skip updates if found
  if (game.removedEntities.has(entityData.id)) {
    console.log('Skipping update for locally removed entity:', entityData.id);
    return;
  }

  // Check if the entity is from a remote source and handle potential source conflicts
  if (entityData.source != null) {
    // This entity orginated from a remote source, we'll need to account for an entity.id that was
    // created in another system
    let existingSourceId = game.components.source.get(entityData.source + '-' + entityData.id); // get concat source-id
    // If a prior source exists, we should perform an update using the sourceId
    // If the entity exists and has a different source, log the conflict and decide on handling strategy
    if (existingSourceId) { // sourceId?
      // console.log(`Entity ${entityData.id} from source ${entityData.source} encountered, previously associated with source ${existingSource}. Handling potential ID conflict.`);
      // Implement conflict resolution strategy here, e.g., update, replace, ignore, etc.
      entityData.id = entityData.source.split('_')[1]; // Remark brittle, maybe sourceId
      // console.log("ALREADY EXISTS updateOrCreate REMOTE", entityData);
      return updateOrCreate(game, entityData);
    } else {
      delete entityData.id;
      // store a new source refer

      // since this ent is remote, we should attempt to build it by type,
      // in order to re-establish the correct components and behaviors
      let type = entityData.type;
      if (type) {

        // tolowercase then uppercase first letter
        type = type.toLowerCase();
        type = type.charAt(0).toUpperCase() + type.slice(1);

        try {
          let defaultTypeConfig = this.game.make();
          defaultTypeConfig[type](entityData);
          let config = defaultTypeConfig.build();
          // merge the default type config with the entity data
          for (let p in config) {
            entityData[p] = config[p];
          }
          // remove any undefined values or null values
          for (let p in entityData) {
            if (typeof entityData[p] === 'undefined' || entityData[p] === null) {
              delete entityData[p];
            }
          }
        }
        catch (err) {
          // This will happen for any type that is not defined by an active plugin
          // console.warn('Failed to build remote entity by type:', type, err, 'using default build');
          defaultBuild(game, entityData)
        }

        // console.log('proceeding with typed data', entityData)

      } else {
        defaultBuild(game, entityData);
      }

      return updateOrCreate(game, entityData);
    }
  } else {
    return updateOrCreate(game, entityData);
  }

}

function defaultBuild(game, entityData) {
  // merge default build make 
  let defaultConfig = game.make().build();
  for (let p in defaultConfig) {
    if (typeof entityData[p] === 'undefined' || entityData[p] === null) {
      entityData[p] = defaultConfig[p];
    }
  }
  // remove any undefined values or null values ( should not be necessary at this stage ) ( more tests )
  for (let p in entityData) {
    if (typeof entityData[p] === 'undefined' || entityData[p] === null) {
      delete entityData[p];
    }
  }
}

function updateOrCreate(game, entityData) {
  // After handling potential source conflicts, proceed to create or update the entity
  let localEntity = game.entities.get(entityData.id);
  if (!localEntity) {
    // If it's a new entity or a remote entity not seen before, create it
    //console.log("createEntity LOCAL", entityData);
    return game.createEntity(entityData);
  } else {
    //console.log("updateEntity LOCAL", entityData);
    // If it's an existing entity, update it
    return game.updateEntity(entityData);
  }

}
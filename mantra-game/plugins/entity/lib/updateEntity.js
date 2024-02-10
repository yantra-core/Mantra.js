export default function updateEntity(entityData) {

  // Remark: See: ./Game/Lifecyle.js for Mantra Lifecycle Hooks
  entityData = this.game.lifecycle.triggerHook('before.updateEntity', entityData);

  // console.log('updateEntity', entityData)
  let entityId = entityData.id;
  if (typeof entityId === 'undefined') {
    // check to see if we have a name, if so, find the entity by name
    if (entityData.name) {
      let ent = this.game.getEntityByName(entityData.name);
      if (ent) {
        entityId = ent.id;
      }
    }
  }

  if (typeof entityId === 'undefined') {
    console.log('Error: updateEntity was not provided a valid entity.id or entity.name', entityData);
    console.log('This is most likely the result of passing invalid data to updateEntity()');
    return;
  }

  let ent = this.game.getEntity(entityId);

  // if the state doesn't exist, return error
  if (!ent) {
    console.log('Error: updateEntity called for non-existent entity', entityId, entityData);
    console.log('This should not happen, if a new state came in it should be created');
    return;
  }

  // Remove destroyed entities
  if (entityData.destroyed) {
    this.removeEntity(entityId);
    return;
  }

  // not a component property yet, just ad-hoc on client
  ent.pendingRender = {};
  this.game.graphics.forEach(function (graphicsInterface) {
    ent.pendingRender[graphicsInterface.id] = true;
  });

  // TODO: add additional component types that can be updated ( should be most of them )
  if (entityData.color) {
    this.game.components.color.set(entityId, entityData.color);
    //if (!this.game.changedEntities.has(entityId)) {}
    // this.game.changedEntities.add(entityId);
    // console.log("SETTING COLOR", entityData.color)
  }

  let updateSize = false;
  if (entityData.height) {
    updateSize = true;
    this.game.components.height.set(entityId, entityData.height);
  }

  if (entityData.width) {
    updateSize = true;
    this.game.components.width.set(entityId, entityData.width);
  }

  if (entityData.radius) {
    updateSize = true;
    // this.game.components.radius.set(entityId, entityData.radius);
  }

  /*
  if (entityData.body === false) {
    // alert("remove body");
    this.game.physics.removeBody(entityId);
  }
  */

  if (updateSize) {
    // let body = this.game.bodyMap[entityId];
    this.game.physics.setBodySize(entityId, entityData);

  }

  if (entityData.position) {
    // Remark: Tests require we update component, perhaps changed test?
    this.game.components.position.set(entityId, entityData.position);
    // let body = this.game.bodyMap[entityId];
    this.game.physics.setPosition(entityId, entityData.position);

  }

  if (entityData.velocity) {
    this.game.physics.setVelocity(entityId, entityData.velocity);
  }

  if (entityData.health) {
    this.game.components.health.set(entityId, entityData.health);
  }

  if (typeof entityData.thickness !== 'undefined' && entityData.thickness !== null) {
    this.game.components.width.set(entityId, entityData.thickness);
  }

  if (typeof entityData.score !== 'undefined' && entityData.score !== null) {
    this.game.components.score.set(entityId, entityData.score);
  }

  if (typeof entityData.rotation !== 'undefined') {
    if (this.game.physics && this.game.physics.setRotation) {
      // let body = this.game.bodyMap[entityId];
      this.game.physics.setRotation(entityId, entityData.rotation);

    } else {
      console.log('WARNING: physics.setRotation is not defined');
      // Remark: we could support direct rotation updates here if mantra was being run without physics engine
      // this.game.components.rotation.set(entityId, entityData.rotation);
    }
  }

  if (typeof entityData.text !== 'undefined') {
    this.game.components.text.set(entityId, entityData.text);
  }

  // Items
  if (typeof entityData.items !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    this.game.components.items.set(entityId, entityData.items);
  }

  // Sutra rules
  if (typeof entityData.sutra !== 'undefined') {
    // overwrite sutra ( for now )
    this.game.components.sutra.set(entityId, entityData.sutra);
  }

  // Items
  if (typeof entityData.items !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    this.game.components.items.set(entityId, entityData.items);
  }

  if (typeof entityData.style !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    this.game.components.style.set(entityId, entityData.style);
  }

  if (typeof entityData.texture !== 'undefined') {
    // overwrite all items ( for now )
    // Remark: in the future we could merge instead of overwrite
    // create new textures object by merging in the new texture
    let prev = this.game.components.texture.get(entityId);
    let newTexture = { ...prev, ...entityData.texture };
    this.game.components.texture.set(entityId, newTexture);
  }

  // Remark: The physics engine update will update the position
  //         If we update the position here, it's most likely going to be overwritten by the physics engine
  if (this.game.systems.rbush) {
    // this.game.systems.rbush.updateEntity(ent);
  }

  ent = this.game.lifecycle.triggerHook('after.updateEntity', ent);

  return ent;

}
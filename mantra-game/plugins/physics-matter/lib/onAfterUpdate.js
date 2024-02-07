// TODO: decouple game objects from physics updates
// might be to move this outside of worker entire and only have worker report body updates each tick

export default function onAfterUpdate(event) {
  let Matter = this.Matter;
  let that = this;

  // show total number of bodies in the world
  // Remark: should this and bodyMap be replaced with a more generic mapping
  // in order to allow non-physics backed entities to exist in the game?
  for (const body of event.world.bodies) {

    // let entity = that.game.getEntity(body.myEntityId);
    let entity = that.game.data.ents._[body.myEntityId];

    if (entity && body.isSleeping !== true && body.myEntityId) {

      //
      // Clamp max speed
      //
      let maxSpeed = 100; // TODO: move to config
      if (entity.maxSpeed) {
        maxSpeed = entity.maxSpeed;
      }
      that.limitSpeed(body, maxSpeed);

      //
      // Apply locked properties  ( like entity cannot move x or y position, etc )
      //
      if (entity.lockedProperties) {
        that.lockedProperties(body);
      }

      // If this is the client and we are in online mode,
      // do not update local physics for remote players, only update local physics for the local player
      // This may be changed in the future or through configuration
      if (that.game.isClient && that.game.onlineMode && entity.type === 'PLAYER' && entity.id !== game.currentPlayerId) {
        // In online mode, if the entity is a player and that player is not the current player, skip updating physics
        // continue; // Skip updating physics for remote players
      }

      if (that.game.isClient) {
        // this is the logic for updating *all* entities positions
        // this should probably be in entity-movement plugin
        /*            */
        // console.log(body.myEntityId, body.position)
        let ent = that.game.entities.get(body.myEntityId);
        // console.log('client ent', ent.id ,body.position)
        // console.log('this.game.localGameLoopRunning', this.game.localGameLoopRunning)
        if (that.game.localGameLoopRunning) {
          // check if body position has changed

          let bodyPosition = {
            x: that.truncateToStringWithPrecision(body.position.x, 3),
            y: that.truncateToStringWithPrecision(body.position.y, 3)
          };
          let entPosition = {
            x: that.truncateToStringWithPrecision(ent.position.x, 3),
            y: that.truncateToStringWithPrecision(ent.position.y, 3)
          }

          // TODO: add this same kind of logic for server as well?
          // delta encoding will filter this; however it would be better to do it here as well
          if (bodyPosition.x !== entPosition.x || bodyPosition.y !== entPosition.y) {
            that.game.changedEntities.add(body.myEntityId);
          }
          // TODO: rotation / velocity as well, use flag isChanged

          // check it z position is undefined on body ( 2D physics )
          // if there is no z position, check for previous z position on entity and use that
          // if there is no previous z position on entity, use 0

          let position = { x: body.position.x, y: body.position.y };
          if (typeof body.position.z === 'undefined') {
            if (typeof ent.position.z === 'undefined') {
              position.z = 0;
            } else {
              position.z = ent.position.z;
            }
          }

          that.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
          that.game.components.position.set(body.myEntityId, position);
          that.game.components.rotation.set(body.myEntityId, body.angle);

          // update size as well
          //this.game.components.height.set(body.myEntityId, body.bounds.max.y);
          //this.game.components.width.set(body.myEntityId, body.bounds.max.x);
          // this.game.components.radius.set(body.myEntityId, body.bounds.max.x / 2);

        }

        if (body) {
          if (that.game.systems.rbush) {
            let ent = that.game.entities.get(body.myEntityId);
            let position = { x: body.position.x, y: body.position.y };
            that.game.systems.rbush.updateEntity({
              id: body.myEntityId,
              position: position,
              width: ent.width,
              height: ent.height
            });
            // this.game.deferredEntities[body.myEntityId] = ent;
          }
        }

        if (ent.type === 'BULLET') {
          that.game.changedEntities.add(body.myEntityId);
          that.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
          that.game.components.position.set(body.myEntityId, { x: body.position.x, y: body.position.y });
          that.game.components.rotation.set(body.myEntityId, body.angle);
        }

      } else {
        // this is the logic for updating *all* entities positions
        // this should probably be in entity-movement plugin

        let ent = that.game.getEntity(body.myEntityId);
        //console.log('server ent', ent)
        that.game.changedEntities.add(body.myEntityId);
        that.game.components.velocity.set(body.myEntityId, { x: body.velocity.x, y: body.velocity.y });
        that.game.components.position.set(body.myEntityId, { x: body.position.x, y: body.position.y });
        that.game.components.rotation.set(body.myEntityId, body.angle);

      }

    }

  }
}
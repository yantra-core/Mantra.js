export default function checkForMovedBodies() {
  // Retrieve all the dynamic bodies from the scene
  // const dynamicBodies = scene.getDynamicBodies(); // This function will need to be implemented based on your setup

  this.dynamicBodies.forEach((body) => {
    // If the body is awake, it has potentially moved and you can broadcast its new state
    const entityId = body.userData; // Assuming you store entityId in the userData of the body
    let myEntityId = body.myEntityId;
    //this.broadcastBodyState(entityId, body);
    //console.log('eee', myEntityId, body)
    let bodyPosition = this.getBodyPosition(body);
    let ent = this.game.getEntity(myEntityId);
    //console.log('ent', ent)
    this.game.changedEntities.add(body.myEntityId);


    let bodyVelocity = this.getLinearVelocity(body);
    if (ent.type === 'BULLET') {
      //console.log(bodyPosition)
    }
    //console.log('bodyVelocitybodyVelocity', bodyVelocity)

    this.game.components.velocity.set(body.myEntityId, { x: bodyVelocity.x, y: bodyVelocity.y });
    this.game.components.position.set(body.myEntityId, { x: bodyPosition.x, y: bodyPosition.y, z: bodyPosition.z });

    let bodyRotation = this.getBodyRotation(body);
    // console.log('bodyRotation', bodyRotation)
    this.game.components.rotation.set(body.myEntityId, bodyRotation.x);
    //if (body.isAwake()) {}
  });
}
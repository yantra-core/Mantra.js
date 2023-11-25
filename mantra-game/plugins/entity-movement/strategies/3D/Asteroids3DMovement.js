// 3DAsteroidsMovement.js - Marak Squires 2023

class AsteroidsMovementStrategy {

  static id = '3d-asteroids-movement';

  constructor() {

    // Define thrust for movement
    this.thrust = 0.05 * 1000;
    this.id = AsteroidsMovementStrategy.id;
  }

  init(game) {
    this.game = game;

    // check to see if entityMovement system exists, if not throw error
    if (!game.systems['entity-movement']) {
      throw new Error('AsteroidsMovementStrategy requires an entityMovement system to be registered! Please game.use(new EntityMovement())');
    }

    game.systems['entity-movement'].strategies.push(this);
  }

  getForwardDirection(body) {
    let bodyRotation = this.game.physics.getBodyRotation(body); // Quaternion
    
    // convert bodyRotation to babyonjs quaternion
    let quaternion = new BABYLON.Quaternion(bodyRotation.x, bodyRotation.y, bodyRotation.z, bodyRotation.w);
    // Default forward vector
    let forwardVector = new BABYLON.Vector3(0, 0, -1);
  
    // Apply the rotation to the forward vector
    let rotatedVector = forwardVector.rotateByQuaternionToRef(quaternion, new BABYLON.Vector3());
    return {
      x: rotatedVector.x,
      y: rotatedVector.y,
      z: rotatedVector.z
    };
  }

  rotate(entityId, pitchDelta, yawDelta, rollDelta) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    // console.log('pitchDelta', pitchDelta, 'yawDelta', yawDelta, 'rollDelta', rollDelta);
    // console.log('performing rotation', pitchDelta, yawDelta, rollDelta)

    // Rotate around the x-axis for pitch
    if (pitchDelta !== 0) {
      this.game.physics.rotateBody(body, pitchDelta, { x: 1, y: 0, z: 0 });
    }
    // Rotate around the y-axis for yaw
    if (yawDelta !== 0) {
      this.game.physics.rotateBody(body, yawDelta, { x: 0, y: 1, z: 0 });
    }
    // Rotate around the z-axis for roll
    if (rollDelta !== 0) {
      this.game.physics.rotateBody(body, rollDelta, { x: 0, y: 0, z: 1 });
    }
  }

  update(entityId, dx, dy, dz) {
    const body = this.game.bodyMap[entityId];
    if (!body) return;

    /* Remark: "forward direction" is used for forward/backward movement relative to the entity's 3d rotation
    // console.log('performing movement', entityId, dx, dy, dz)
    // console.log('forwardDirection', forwardDirection)
    let forwardDirection = this.getForwardDirection(body);
    const force = {
      x: forwardDirection.z * dy * this.thrust + dz * this.thrust, // Forward/backward thrust along PhysX's x-axis
      y: forwardDirection.y * dy * this.thrust,                    // Up/Down thrust along PhysX's y-axis
      z: forwardDirection.x * dy * this.thrust + dx * this.thrust  // Left/Right thrust along PhysX's z-axis
    };
    */

    // use absolute movements, forwardDirection not needed
    const force = {
      x: dx * this.thrust, // Forward/backward thrust along PhysX's x-axis
      y: dy * this.thrust,                    // Up/Down thrust along PhysX's y-axis
      z: dz * this.thrust  // Left/Right thrust along PhysX's z-axis
    };

    // console.log('force', force)

    let bodyPosition = this.game.physics.getBodyPosition(body);
    this.game.physics.Body.applyForce(body, bodyPosition, force);
  }

}

export default AsteroidsMovementStrategy;

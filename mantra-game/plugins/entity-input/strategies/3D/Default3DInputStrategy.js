class ThreeDimensionalInputStrategy {
  constructor(plugin) {
    this.plugin = plugin;
  }

  init(game) {
    this.game = game;

    // check to see if entityInput system exists, if not throw error
    if (!game.systems.entityInput) {
      throw new Error('ThreeDimensionalInputStrategy requires an entityInput system to be registered! Please game.use(new EntityInput())');
    }

    this.defaultControlsMapping = {
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      SPACE: 'FIRE_BULLET',
      Q: 'MOVE_UP',
      E: 'MOVE_DOWN',
      Up: 'PITCH_UP',
      Down: 'PITCH_DOWN',
      Left: 'YAW_LEFT',
      Right: 'YAW_RIGHT',
      Z: 'ROLL_LEFT',
      C: 'ROLL_RIGHT'
    };

    game.systems.entityInput.strategies.push(this);

  }

  getForwardDirection(body) {
    let bodyRotation = this.game.physics.getBodyRotation(body);  // Assume getBodyRotation is a method in your entityMovement system
    console.log('initial bodyRotation', bodyRotation.x, bodyRotation.y, bodyRotation.z)
    // Assuming the body faces towards the negative y-axis when pitch, yaw, and roll are 0
    return {
      x: Math.sin(bodyRotation.y) * Math.cos(bodyRotation.x),
      y: -Math.cos(bodyRotation.y) * Math.cos(bodyRotation.x),
      z: Math.sin(bodyRotation.x)
    };
  }


  handleInputs(entityId, { controls = {}, mouse = {} }, sequenceNumber) {
    const plugin = this;
    const game = this.game;

    game.lastProcessedInput[entityId] = sequenceNumber;

    // Define movement speed for each axis and rotation speed
    const moveSpeed = 5;
    const rotateSpeed = 0.1; // Small value since it's typically in radians

    let entityMovementSystem = game.getSystem('entityMovement');

    const actions = Object.keys(controls).filter(key => controls[key]).map(key => plugin.defaultControlsMapping[key]);

    // Extract the entity data
    let entityData = game.getEntity(entityId);
    let body = game.bodyMap[entityId];
    if (!entityData || !entityData.position) {
      return;
    }

    // Movement
    let forwardDirection = this.getForwardDirection(body);

    console.log('input calc forward facing direction', forwardDirection.x, forwardDirection.y, forwardDirection.z)

    // Movement
    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, forwardDirection.x * moveSpeed, -forwardDirection.y * moveSpeed, forwardDirection.z * moveSpeed);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, forwardDirection.x * moveSpeed, forwardDirection.y * moveSpeed, -forwardDirection.z * moveSpeed);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0, 0);  // Assuming left/right movement is still along the global X axis
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0, 0);  // Assuming left/right movement is still along the global X axis
    if (actions.includes('MOVE_UP')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);  // Assuming up/down movement is still along the global Z axis
    if (actions.includes('MOVE_DOWN')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);  // Assuming up/down movement is still along the global Z axis

    // Rotation
    if (actions.includes('PITCH_UP')) entityMovementSystem.rotate(entityId, -rotateSpeed, 0, 0);
    if (actions.includes('PITCH_DOWN')) entityMovementSystem.rotate(entityId, rotateSpeed, 0, 0);
    if (actions.includes('YAW_LEFT')) entityMovementSystem.rotate(entityId, 0, -rotateSpeed, 0);
    if (actions.includes('YAW_RIGHT')) entityMovementSystem.rotate(entityId, 0, rotateSpeed, 0);
    if (actions.includes('ROLL_LEFT')) entityMovementSystem.rotate(entityId, 0, 0, -rotateSpeed);
    if (actions.includes('ROLL_RIGHT')) entityMovementSystem.rotate(entityId, 0, 0, rotateSpeed);

    // Firing mechanic can remain the same as in 2D
    if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
  }
}

export default ThreeDimensionalInputStrategy;
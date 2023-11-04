class ThreeDimensionalInputStrategy {
  constructor(plugin) {
    this.plugin = plugin;
  }

  init(game) {
    // Initialize 3D input handling if needed
  }

  handleInputs(entityId, { controls = {}, mouse = {} }, sequenceNumber) {
    const plugin = this.plugin;
    const game = plugin.game;

    game.lastProcessedInput[entityId] = sequenceNumber;

    // Define movement speed for each axis and rotation speed
    const moveSpeed = 5;
    const rotateSpeed = 0.1; // Small value since it's typically in radians

    let entityMovementSystem = game.getSystem('entityMovement');

    const actions = Object.keys(controls).filter(key => controls[key]).map(key => plugin.defaultControlsMapping[key]);

    // Extract the entity data
    let entityData = game.getEntity(entityId);
    if (!entityData || !entityData.position) {
      return;
    }

    // Movement
    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, 0, moveSpeed, 0);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, 0, -moveSpeed, 0);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0, 0);
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0, 0);
    if (actions.includes('MOVE_UP')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);
    if (actions.includes('MOVE_DOWN')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);

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
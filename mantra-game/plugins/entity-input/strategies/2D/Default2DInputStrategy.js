// DefaultTwoDimensionalInputStrategy.js - Marak Squires 2023
// This input strategy is suitable for most top-down 2D games
class DefaultTwoDimensionalInputStrategy {
  static id = 'default-2d-input-strategy';
  constructor(plugin) {
    this.id = DefaultTwoDimensionalInputStrategy.id;
    this.plugin = plugin;
  }

  init(game) {
    this.game = game;
    this.defaultControlsMapping = {
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      SPACE: 'FIRE_BULLET',
      //LEFT: 'ROTATE_LEFT',
      //RIGHT: 'ROTATE_RIGHT'
    };

    // Remark: Button / Input cooldown has been removed in favor of input pooling on gametick
    // the new approach is to pool all inputs for a given tick, and send them to the server
    // this implies a button cool down of 1 tick, which is the same as no cooldown
    // Remark: bulletCooldown should be a property of the bullet system, not input system
        // this.bulletCooldown = 1;
        // this.buttonCooldown = 1;
        // this.lastBulletFireTime = {};

    this.useMouseControls = false;
    
    // check to see if entityInput system exists, if not throw error
    if (!game.systems.entityInput) {
      throw new Error('DefaultTwoDimensionalInputStrategy requires an entityInput system to be registered! Please game.use(new EntityInput())');
    }

    game.systems.entityInput.strategies.push(this);
    // take the this.controlMappings and map them to the entityInput system
    game.systems.entityInput.controlMappings = {
      ...game.systems.entityInput.controlMappings,
      ...this.defaultControlsMapping
    };

  }

  handleInputs(entityId, { controls = {}, mouse = {} }, sequenceNumber) {
    const plugin = this;
    const game = this.game;

    game.lastProcessedInput[entityId] = sequenceNumber;

    const moveSpeed = 5;
    let entityMovementSystem = game.getSystem('entity-movement');

    const { position = { x: 0, y: 0 }, canvasPosition = { x: 0, y: 0 }, buttons = { LEFT: false, RIGHT: false, MIDDLE: false } } = mouse;

    const actions = Object.keys(controls).filter(key => controls[key]).map(key => plugin.defaultControlsMapping[key]);

    let entityData = game.getEntity(entityId);

    if (entityData && entityData.position && plugin.useMouseControls) {
      const canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const deltaX = position.x - (entityData.position.x + canvasCenter.x);
      const deltaY = position.y - (entityData.position.y + canvasCenter.y);
      const angle = Math.atan2(deltaY, deltaX);
      const angleDeg = angle * (180 / Math.PI);

      if (angleDeg >= -45 && angleDeg < 45) {
        actions.push('MOVE_RIGHT');
      } else if (angleDeg >= 45 && angleDeg < 135) {
        actions.push('MOVE_BACKWARD');
      } else if (angleDeg >= 135 || angleDeg < -135) {
        actions.push('MOVE_LEFT');
      } else if (angleDeg >= -135 && angleDeg < -45) {
        actions.push('MOVE_FORWARD');
      }
    }

    if (buttons.LEFT) actions.push('FIRE_BULLET');

    /* Remark: Removes in favor of input pooling on gametick
    if (typeof plugin.lastBulletFireTime[entityId] === 'undefined') plugin.lastBulletFireTime[entityId] = 0;
    if (Date.now() - plugin.lastBulletFireTime[entityId] <= plugin.bulletCooldown) {
      console.log('bullet cooldown', Date.now() - plugin.lastBulletFireTime[entityId]);
      return;
    };
    plugin.lastBulletFireTime[entityId] = Date.now();
    */
    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, 0, moveSpeed);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, 0, -moveSpeed);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0);
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0);

    if (actions.includes('ROTATE_LEFT')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);
    if (actions.includes('ROTATE_RIGHT')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);

    if (game.systems.bullet) {
      if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
    }
  }
}

export default DefaultTwoDimensionalInputStrategy;
// EntityInput.js - Marak Squires 2023
import Plugin from '../../Plugin.js';

class DefaultInputStrategy {
  constructor(plugin) {
    this.plugin = plugin;
  }

  init(game) {
  }

  handleInputs(entityId, { controls = {}, mouse = {} }, sequenceNumber) {
    const plugin = this.plugin;
    const game = plugin.game;

    game.lastProcessedInput[entityId] = sequenceNumber;

    const moveSpeed = 5;
    let entityMovementSystem = game.getSystem('entityMovement');

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
    if (typeof plugin.lastBulletFireTime[entityId] === 'undefined') plugin.lastBulletFireTime[entityId] = 0;
    if (Date.now() - plugin.lastBulletFireTime[entityId] <= plugin.bulletCooldown) return;
    plugin.lastBulletFireTime[entityId] = Date.now();

    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, 0, moveSpeed);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, 0, -moveSpeed);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0);
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0);
    if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
  }
}

class EntityInputPlugin extends Plugin {
  constructor(strategy) {
    super();
    this.name = 'EntityInputPlugin';
    this.bulletCooldown = 20;
    this.buttonCooldown = 20;
    this.lastBulletFireTime = {};
    this.useMouseControls = false;
    this.defaultControlsMapping = {
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      SPACE: 'FIRE_BULLET'
    };
    this.strategy = strategy || new DefaultInputStrategy(this);
  }

  init(game) {
    console.log('EntityInputPlugin.init()');
    this.game = game;
    this.game.systemsManager.addSystem('entityInput', this);
    this.strategy.init(game);
  }

  handleInputs(entityId, controls, sequenceNumber) {
    this.strategy.handleInputs(entityId, controls, sequenceNumber);
  }

  update() { }

  render() { }

  destroy() { }
}

export default EntityInputPlugin;

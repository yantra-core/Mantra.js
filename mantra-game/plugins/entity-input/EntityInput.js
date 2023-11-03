// EntityInput.js - Marak Squires 2023
import Plugin from '../../Plugin.js';

const defaultControlsMapping = {
  W: 'MOVE_FORWARD',
  S: 'MOVE_BACKWARD',
  A: 'MOVE_LEFT',
  D: 'MOVE_RIGHT',
  SPACE: 'FIRE_BULLET'
};

// handles input controller events and relays them to the game logic
class EntityInputPlugin extends Plugin {
  constructor() {
    super();
    this.name = 'EntityInputPlugin';
    this.bulletCooldown = 20; // Cooldown time in milliseconds
    this.buttonCooldown = 20; // Cooldown time in milliseconds
    this.lastBulletFireTime = {}; // Store the last fire time for each entity
    this.useMouseControls = false;

  }

  init(game) {
    console.log('EntityInputPlugin.init()');
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('entityInput', this);
  }

  update() { }

  render() { }

  destroy() { }

  handleInputs(entityId, { controls = {}, mouse = {} }, sequenceNumber) {// fix signature
    // console.log('running update in entity input plugin', deltaTime, snapshot);

    this.game.lastProcessedInput[entityId] = sequenceNumber;

    const moveSpeed = 5;

    let entityMovementSystem = this.game.getSystem('entityMovement')


    // Extract mouse position and button states
    const { position = { x: 0, y: 0 }, canvasPosition = { x: 0, y: 0 }, buttons = { LEFT: false, RIGHT: false, MIDDLE: false } } = mouse;

    const actions = Object.keys(controls).filter(key => controls[key]).map(key => defaultControlsMapping[key]);

    let entityData = this.game.getEntity(entityId);

    if (entityData.position) {


      // TODO: this should be moved to a separate plugin, per strategy pattern
      if (this.useMouseControls) {

        // Assuming your game's origin (0,0) is at the center of the canvas
        const canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Assuming mouse.canvasPosition gives coordinates relative to the canvas
        const deltaX = position.x - (entityData.position.x + canvasCenter.x);
        const deltaY = position.y - (entityData.position.y + canvasCenter.y);

        const angle = Math.atan2(deltaY, deltaX);  // atan2 returns angle in radians

        // Convert angle from radians to degrees
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

    }


    // Map left mouse click to FIRE_BULLET action
    if (buttons.LEFT) {
      actions.push('FIRE_BULLET');
    }

    if (buttons.RIGHT) {
      //actions.push('FIRE_BULLET');
    }


    if (typeof this.lastBulletFireTime[entityId] === 'undefined') {
      this.lastBulletFireTime[entityId] = 0;
    }

    if (Date.now() - this.lastBulletFireTime[entityId] <= this.bulletCooldown) {
      // console.log('waiting for cooldown')
      return;
    }

    this.lastBulletFireTime[entityId] = Date.now();

    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, 0, moveSpeed);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, 0, -moveSpeed);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0); // Might need to check these directions
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0);

    if (actions.includes('FIRE_BULLET')) {
      let Bullet = this.game.getSystem('bullet');
      Bullet.fireBullet(entityId);
    }

  }

}

export default EntityInputPlugin;
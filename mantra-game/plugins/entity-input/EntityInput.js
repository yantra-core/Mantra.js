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


  }

  init(game) {
    console.log('EntityInputPlugin.init()');
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('entityInput', this);
  }

  update () {}

  render() { }

  destroy() { }

  handleInputs(entityId, controls, sequenceNumber) {// fix signature
    // console.log('running update in entity input plugin', deltaTime, snapshot);

    this.game.lastProcessedInput[entityId] = sequenceNumber;

    const moveSpeed = 5;


    let entityMovementSystem = this.game.getSystem('entityMovement')

    //console.log('Entity Movement System:', entityMovementSystem);
    //console.log('Fire Bullet System:', this.game.getSystem('fireBullet'));

    const actions = Object.keys(controls).filter(key => controls[key]).map(key => defaultControlsMapping[key]);

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
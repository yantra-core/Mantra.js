// DefaultTwoDimensionalInputStrategy.js - Marak Squires 2023
// This input strategy is suitable for most top-down 2D games
class DefaultTwoDimensionalInputStrategy {
  static id = 'default-2d-input-strategy';
  constructor(plugin) {
    this.id = DefaultTwoDimensionalInputStrategy.id;
    this.plugin = plugin;
    this.isPressed = false;
    this.continuousActions = [];
  }

  init(game) {
    this.game = game;
    this.defaultControlsMapping = {
      W: 'MOVE_FORWARD',
      S: 'MOVE_BACKWARD',
      A: 'MOVE_LEFT',
      D: 'MOVE_RIGHT',
      SPACE: 'FIRE_BULLET',
      K: 'FIRE_BULLET',
      L: 'CAMERA_SHAKE',
      O: 'ZOOM_OUT',
      P: 'ZOOM_IN',
      U: 'SELECT_MENU',
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
    if (!game.systems['entity-input']) {
      throw new Error('DefaultTwoDimensionalInputStrategy requires an entityInput system to be registered! Please game.use(new EntityInput())');
    }

    game.systemsManager.addSystem(this.id, this);
    game.systems['entity-input'].strategies.push(this);
    // take the this.controlMappings and map them to the entityInput system
    game.systems['entity-input'].controlMappings = {
      ...game.systems['entity-input'].controlMappings,
      ...this.defaultControlsMapping
    };

  }

  detectAndSendControls(entityData, ev) {

    if (this.game.useMouseControls !== true) {
      return;
    }

    if (!this.isPressed) {
      return;
    }
    // console.log('pointerDown', entityData, ev);
    let currentPlayer = game.getEntity(game.currentPlayerId);

    if (currentPlayer && game.communicationClient) {
      // Get browser window dimensions
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      // console.log('currentPlayer', currentPlayer.position);
      // console.log("Event", ev);

      // Calculate deltas
      let deltaX = ev.x - (windowWidth / 2);
      let deltaY = ev.y - (windowHeight / 2);
      // console.log('deltaX', deltaX, 'deltaY', deltaY);

      // Calculate angle in degrees
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      // console.log('Angle:', angle);

      // Calculate actions based on the angle
      let actions = [];
      if (angle >= -22.5 && angle < 22.5) {
        actions.push('MOVE_RIGHT');
      } else if (angle >= 22.5 && angle < 67.5) {
        actions.push('MOVE_RIGHT', 'MOVE_BACKWARD');
      } else if (angle >= 67.5 && angle < 112.5) {
        actions.push('MOVE_BACKWARD');
      } else if (angle >= 112.5 && angle < 157.5) {
        actions.push('MOVE_LEFT', 'MOVE_BACKWARD');
      } else if (angle >= 157.5 || angle < -157.5) {
        actions.push('MOVE_LEFT');
      } else if (angle >= -157.5 && angle < -112.5) {
        actions.push('MOVE_LEFT', 'MOVE_FORWARD');
      } else if (angle >= -112.5 && angle < -67.5) {
        actions.push('MOVE_FORWARD');
      } else if (angle >= -67.5 && angle < -22.5) {
        actions.push('MOVE_RIGHT', 'MOVE_FORWARD');
      }

      this.continuousActions = actions;
      this.isPressed = true;
    }
  }

  update() {
    // If the input is pressed, keep applying the continuous actions
    if (this.isPressed) {
      let actions = this.continuousActions;
      this.handleInputs(this.game.currentPlayerId, { actions });
    }
  }

  handleInputs(entityId, { controls = {}, mouse = {}, actions = [] }, sequenceNumber) {
    const plugin = this;
    const game = this.game;

    game.lastProcessedInput[entityId] = sequenceNumber;

    // console.log('mmmm', mouse.buttons)
    // Determine if the mouse button is pressed or released
    if (mouse.buttons && mouse.buttons.LEFT === true) {
      this.isPressed = true; // Button is pressed
      if (mouse.event) {
        // Calculate continuous actions based on mouse event
        this.detectAndSendControls(entityId, mouse.event);
      }
    } 

    if (mouse.buttons && mouse.buttons.LEFT === false) {
      this.isPressed = false; // Button is released, stop continuous actions
      this.continuousActions = [];

    }

    // add any actions that were passed in to the continuousActions array, if not already present
    actions.forEach(action => {
      if (!this.continuousActions.includes(action)) {
        this.continuousActions.push(action);
      }
    });

    const moveSpeed = 5;
    let entityMovementSystem = game.getSystem('entity-movement');

    const { position = { x: 0, y: 0 }, canvasPosition = { x: 0, y: 0 }, buttons = { LEFT: false, RIGHT: false, MIDDLE: false } } = mouse;

    if (actions.length === 0) {
      // if no actions were manually sent, assume default controls
      actions = Object.keys(controls).filter(key => controls[key]).map(key => game.systems['entity-input'].controlMappings[key]);
    } else {
      // actions is already populated, use those actions as continuous action controls
    }

    if (actions.includes('MOVE_FORWARD')) entityMovementSystem.update(entityId, 0, moveSpeed);
    if (actions.includes('MOVE_BACKWARD')) entityMovementSystem.update(entityId, 0, -moveSpeed);
    if (actions.includes('MOVE_LEFT')) entityMovementSystem.update(entityId, -moveSpeed, 0, -1);
    if (actions.includes('MOVE_RIGHT')) entityMovementSystem.update(entityId, moveSpeed, 0, 1);

    if (actions.includes('ROTATE_LEFT')) entityMovementSystem.update(entityId, 0, 0, -moveSpeed);
    if (actions.includes('ROTATE_RIGHT')) entityMovementSystem.update(entityId, 0, 0, moveSpeed);

    if (actions.includes('ZOOM_IN')) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom + 0.05);
    }

    if (actions.includes('ZOOM_OUT')) {
      let currentZoom = game.data.camera.currentZoom || 1;
      game.setZoom(currentZoom - 0.05);
    }

    if (game.systems.bullet) {
      if (actions.includes('FIRE_BULLET')) game.getSystem('bullet').fireBullet(entityId);
    }
    if (game.systems.sword) {
      if (actions.includes('FIRE_BULLET')) {
        game.getSystem('sword').swingSword(entityId);
      } else {
        game.getSystem('sword').sheathSword(entityId);
      }
    }

    if (actions.includes('SELECT_MENU')) { }

    // camera shake
    if (actions.includes('CAMERA_SHAKE')) {
      game.shakeCamera();
    }

    // barrel roll
    if (actions.includes('BARREL_ROLL')) {
      if (typeof this.game.data.camera.rotation === 'number') {
        game.rotateCamera(360);
        // console.log("this.game.data.camera.rotation", this.game.data.camera.rotation)
      } else {
        // rotate the camera 360 degrees
        game.rotateCamera(360);
      }

    }

    // custom actions as anonymous functions
    // iterate all actions, if any are functions, run them
    actions.forEach(action => {
      if (typeof action === 'function') {
        action(game);
      }
    });

    // emit the actions for local processing ( sprite updates , sounds, etc )
    game.emit('entityInput::handleActions', entityId, actions, sequenceNumber);

  }
}

export default DefaultTwoDimensionalInputStrategy;
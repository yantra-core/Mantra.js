// Listens for events on parts

export default function partEventListeners(part, contraption) {

  if (part.type === 'Wire') {
    part.on('transmit', (signal) => {
      // set the tint of the entity to yellow
      // console.log('Wire transmit', part);
      // check to see if part has entities array, if so, update all entities
      if (Array.isArray(part.entities)) {
        part.entities.forEach(entityId => {
          this.game.updateEntity({ id: entityId, color: 0xffff00 });
        });
      }
    });
    part.on('off', () => {
      // set the tint of the entity to yellow
      //console.log('Wire stopTransmit', part);
      if (Array.isArray(part.entities)) {
        part.entities.forEach(entityId => {
          this.game.updateEntity({ id: entityId, color: 0xffffff });
        });
      }
    });
  }

  if (part.type === 'LEDLight') {
    part.on('on', () => {
      // set the tint of the entity to yellow
      // console.log('LEDLight on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('off', () => {
      // set the tint of the entity to yellow
      // console.log('LEDLight off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'MotionDetector') {
    part.on('on', () => {
      // set the tint of the entity to yellow
      // console.log('MotionDetector on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('off', () => {
      // set the tint of the entity to yellow
      // console.log('MotionDetector off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'Repeater') {
    part.on('repeat', () => {
      // set the tint of the entity to yellow
      // console.log('Repeater on', part);
      // TODO: should pulse? is not binary on / off state
      this.game.updateEntity({ id: part.entityId, color: 0xf00f00 });
    });
  }

  if (part.type === 'PressureSensor') {
    part.on('trigger', () => {
      // set the tint of the entity to yellow
      // console.log('PressureSensor on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
  }

  if (part.type === 'Button') {
    part.on('press', () => {
      // set the tint of the entity to yellow
      // console.log('Button on', part);
      this.game.updateEntity({ id: part.entityId, color: 0x9a9ccf });
    });
    part.on('release', () => {
      // set the tint of the entity to yellow
      // console.log('Button off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'Actuator') {
    part.on('activate', () => {
      // set the tint of the entity to yellow
      // console.log('Actuator on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });
    part.on('deactivate', () => {
      // set the tint of the entity to yellow
      // console.log('Actuator off', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });
  }

  if (part.type === 'Rover') {
    part.on('move', (position) => {
      // set the tint of the entity to yellow
      // console.log('Rover move', part);
      this.game.updateEntity({ id: part.entityId, position: position });
      // game.applyForce(part.entityId, part.props.velocity);
    });
  }

}


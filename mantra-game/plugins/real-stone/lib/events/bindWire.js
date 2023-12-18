export default function bindWireEvents (part, contraption) {
  let game = this.game;
  part.on('transmit', (signal) => {
    // set the tint of the entity to yellow
    // console.log('Wire transmit', part);
    // check to see if part has entities array, if so, update all entities
    if (Array.isArray(part.entities)) {
      part.entities.forEach(entityId => {
        game.updateEntity({ id: entityId, color: 0xffff00 });
      });
    }
  });
  part.on('off', () => {
    // set the tint of the entity to yellow
    //console.log('Wire stopTransmit', part);
    if (Array.isArray(part.entities)) {
      part.entities.forEach(entityId => {
        game.updateEntity({ id: entityId, color: 0xffffff });
      });
    }
  });

}
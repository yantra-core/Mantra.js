export default function bindLatchEvents (part, contraption) {
  let game = this.game;
  part.on('trigger', () => {
    // set the tint of the entity to yellow
    // console.log('PressureSensor on', part);
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.on('release', () => {
    // set the tint of the entity to yellow
    // console.log('PressureSensor off', part);
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });
}
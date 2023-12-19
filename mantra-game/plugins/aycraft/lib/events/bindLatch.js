export default function bindLatchEvents (part, contraption) {
  let game = this.game;

  part.on('engage', () => {
    // set the tint of the entity to yellow
    console.log('Latch on', part);
    this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.on('disengage', () => {
    // set the tint of the entity to yellow
    console.log('Latch off', part);
    this.game.updateEntity({ id: part.entityId, color: 0xffffff });
  });


}
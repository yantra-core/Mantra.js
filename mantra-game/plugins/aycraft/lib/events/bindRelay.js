
export default function bindRelayEvents(part, contraption) {
  let game = this.game;

  part.on('activate', () => {
    // set the tint of the entity to yellow
    console.log('Relay on', part);
    this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });

  part.on('deactivate', () => {
    // set the tint of the entity to yellow
    console.log('Relay on', part);
    this.game.updateEntity({ id: part.entityId, color: 0xffffff });
  });

}
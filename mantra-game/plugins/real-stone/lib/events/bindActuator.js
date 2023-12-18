export default function bindLatchEvents (part, contraption) {
  let game = this.game;

  part.on('pulse', () => {
    // set the tint of the entity to yellow
    // console.log('Actuator pulse', part);
    game.updateEntity({ id: part.entityId, color: 0xf00f00 });

    // remove the pulse after 300ms
    // TODO: remove timeout, use gameTick animation 
    setTimeout(() => {
      // blue hex color is 0x0000ff
      game.updateEntity({ id: part.entityId, color: 0xffffff });
    }, 300);

  });
  part.on('on', () => {
    // set the tint of the entity to yellow
    // console.log('Actuator on', part);
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.on('off', () => {
    // set the tint of the entity to yellow
    // console.log('Actuator off', part);
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });

}
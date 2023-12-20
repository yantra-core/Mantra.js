export default function bindLEDLightEvents (part, contraption) {
  let game = this.game;

  part.onAny((event, data) => {
    // we can see on and off events here
    // console.log(`LEDLight "${event}" "${data}"`);
  });

  part.on('activate', () => {
    // set the tint of the entity to yellow
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.on('deactivate', () => {
    try {
      game.updateEntity({ id: part.entityId, color: 0xffffff });
      } catch (err) {
      console.log('err', err)
    }
  });

}
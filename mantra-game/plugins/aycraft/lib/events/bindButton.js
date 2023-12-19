export default function bindButtonEvents (part, contraption) {
  let game = this.game;

  part.on('press', () => {
    // set the tint of the entity to yellow
    // console.log('Button on', part);
    game.updateEntity({ id: part.entityId, color: 0x9a9ccf });
  });
  part.on('release', () => {
    // set the tint of the entity to yellow
    // console.log('Button off', part);
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });

}
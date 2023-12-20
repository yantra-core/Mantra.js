export default function bindLatchEvents (part, contraption) {
  let game = this.game;
  part.on('motion', () => {
    // set the tint of the entity to yellow
    // console.log('MotionDetector on', part);
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
  part.on('still', () => {
    // set the tint of the entity to yellow
    // console.log('MotionDetector off', part);
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });
}
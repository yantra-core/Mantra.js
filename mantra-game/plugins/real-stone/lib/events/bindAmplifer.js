export default function bindAmpliferEvents (part, contraption) {
  let game = this.game;

  part.realStone.on('Amplifer::on', () => {
    // set the tint of the entity to yellow
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
 
  part.realStone.on('Amplifer::off', () => {
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });

}
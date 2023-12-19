export default function bindAmpliferEvents (part, contraption) {
  let game = this.game;

  part.on('activate', () => {
    // set the tint of the entity to yellow
    game.updateEntity({ id: part.entityId, color: 0xffff00 });
  });
 
  part.on('deactivate', () => {
    game.updateEntity({ id: part.entityId, color: 0xffffff });
  });

}
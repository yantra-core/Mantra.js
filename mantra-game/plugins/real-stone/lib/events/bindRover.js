export default function bindRoverEvents (part, contraption) {
  let game = this.game;
  part.on('move', (position) => {
    // set the tint of the entity to yellow
    // console.log('Rover move', part);
    game.updateEntity({ id: part.entityId, position: position });
    // game.applyForce(part.entityId, part.props.velocity);
  });

}
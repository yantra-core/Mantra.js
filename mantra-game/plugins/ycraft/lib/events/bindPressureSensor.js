// TODO: move this code into a Sutra

export default function bindLatchEvents (part, contraption) {
  let game = this.game;
  part.on('trigger', (signal) => {
    console.log('sssusu', signal)

    // check to see if the signal is from matching color block
    let collidedWith = signal.data.entity;

    // TODO: implement logic for color puzzle ( for now just
    // TODO: move this code into a Sutra
    if (  
      collidedWith.type === 'BLOCK'

      //collidedWith.type === 'PART' &&
      //collidedWith.name === 'Block'
      ) {

        console.log('collidedWith', collidedWith)

      }

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
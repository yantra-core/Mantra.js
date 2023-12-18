
export default function bindLatchEvents (part, contraption) {
  let game = this.game;

/*
    part.on('repeat', () => {
      // set the tint of the entity to yellow
      // console.log('Relay on', part);
      // TODO: should pulse? is not binary on / off state
      this.game.updateEntity({ id: part.entityId, color: 0xf00f00 });
    });
    */

    part.on('transmit', () => {
      // set the tint of the entity to yellow
      console.log('Relay on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffff00 });
    });

    part.on('off', () => {
      // set the tint of the entity to yellow
      console.log('Relay on', part);
      this.game.updateEntity({ id: part.entityId, color: 0xffffff });
    });

  }
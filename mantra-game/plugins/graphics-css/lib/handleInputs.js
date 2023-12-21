
export default function cssHandleInputs() {
  let game = this.game;
  //
  // Updates the player sprite based on the current input
  // Remark: Input and Movement are handled in EntityInput and EntityMovement plugins
  //
  game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {

    let player = game.getEntity(entityId);

    if (data && player) {
      
      game.components.inputs.set(entityId, data);
      //if (data.mouse.buttons.LEFT) {
        // game.components.inputs.set(entityId, data);
     // }
      //console.log('setting', entityId, 'inputs to', data)
      //player.inputs = data.controls;

      // console.log(data.mouse.position)
      if (data.controls) {
        this.updatePlayerSprite(entityId, data);
      }

    }
  });
}
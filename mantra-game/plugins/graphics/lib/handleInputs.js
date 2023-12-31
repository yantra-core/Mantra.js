// no longer being used?
export default function cssHandleInputs() {
  let game = this.game;
  //
  // Updates the player sprite based on the current input
  // Remark: Input and Movement are handled in EntityInput and EntityMovement plugins
  //
  // Spritesheet dimensions
  const spritesheetWidth = 672;
  const spritesheetHeight = 672;
  const cellSize = 48; // Size of each cell in the spritesheet
  const spriteSize = { width: 16, height: 16 }; // Actual size of the sprite
 
  game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
    // throw new Error('line')
    let player = game.getEntity(entityId);
    if (data && player) {
      if (data.controls) {
        game.updateSprite(entityId, data);
      }
    }
  });
}
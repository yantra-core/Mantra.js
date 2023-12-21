export default function cssHandleInputs () {
  let game = this.game;
  //
  // Updates the player sprite based on the current input
  // Remark: Input and Movement are handled in EntityInput and EntityMovement plugins
  //
  game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
    if (data) {
      let currentInputs = data.controls;
      if (game.tick % 5 !== 0) {
        return;
      }
      // check to see if we have a player entity
      let playerEntity = game.getEntity(entityId);
      if (!playerEntity) {
        return;
      }
      let graphic = playerEntity.graphics['graphics-css'];
      if (!graphic) {
        return;
      }
  
      let direction = 'right';
      if (currentInputs) {
        if (currentInputs.W) {
          direction = 'up';
        } else if (currentInputs.A) {
          direction = 'left';
        } else if (currentInputs.S) {
          direction = 'down';
        } else if (currentInputs.D) {
          direction = 'right';
        }
        // Assume there's a way to determine whether to use -0 or -1 suffix
        // For simplicity, let's alternate between -0 and -1
  
        // get current className from graphic
        let spriteClass = graphic.className;
  
        // check it spriteClass has "0" in it
        let spriteNumber = spriteClass.indexOf('0') > -1 ? 1 : 0;
  
  
        // let spriteNumber = Math.round(Math.random()); // Randomly choose 0 or 1
        //let spriteNumber = playerEntity.bit;
        spriteClass = `guy-${direction}-${spriteNumber}`;
  
        // First, clear previous sprite classes if any
        graphic.classList.remove('guy-down-0', 'guy-down-1', 'guy-up-0', 'guy-up-1', 'guy-right-0', 'guy-right-1', 'guy-left-0', 'guy-left-1');
  
        // Add the new sprite class
        graphic.classList.add(spriteClass);
  
      }
  
    }
  });
}
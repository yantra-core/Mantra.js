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
  
  const spriteSheetHandler = new game.SpriteSheet(spritesheetWidth, spritesheetHeight, cellSize, spriteSize);

  // Get sprite data for a specific cell
  const walkDown0 = [
    spriteSheetHandler.getCell(0, 0),
    spriteSheetHandler.getCell(1, 0)
  ];
  
  const walkRight0 = [
    spriteSheetHandler.getCell(2, 0),
    spriteSheetHandler.getCell(3, 0)
  ]
  const walkLeft0 = [
    spriteSheetHandler.getCell(4, 0),
    spriteSheetHandler.getCell(5, 0)
  ];
  
  const walkUp0 = [
    spriteSheetHandler.getCell(6, 0),
    spriteSheetHandler.getCell(7, 0)
  ];
  
  let anims = {};

  anims.walkUp = walkUp0;
  anims.walkDown = walkDown0;
  anims.walkLeft = walkLeft0;
  anims.walkRight = walkRight0;
  game.on('entityInput::handleInputs', (entityId, data, sequenceNumber) => {
    // console.log('event')
    let player = game.getEntity(entityId);

    if (data && player) {
      
      // why are component inputs being set here?
      // should be handled in EntityInput plugin
      // Remark: removed for now
      // game.components.inputs.set(entityId, data);
      //if (data.mouse.buttons.LEFT) {
        // game.components.inputs.set(entityId, data);
       // }
      //console.log('setting', entityId, 'inputs to', data)
      //player.inputs = data.controls;

      // console.log(data.mouse.position)
      if (data.controls) {
        // console.log('data.controls', data.controls)
        // TODO: make this generic for all graphic engines
        // simply apply a new graphic to the entity with updated sprite data
        // this.updatePlayerSprite(entityId, data);
        game.updateSprite(entityId, data, spriteSheetHandler, anims);
      }

    }
  });
}
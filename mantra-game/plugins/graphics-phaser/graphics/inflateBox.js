export default function inflategraphic(entityData) {

  // check to see if there is existing graphic on entity, if so, use that
  let graphic;

  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }

  if (!graphic) {
    // Create a new triangle if it doesn't exist
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    if (!entityData.color) {
      // defaults to white
      entityData.color = 0xffffff;
    }

    graphic.fillStyle(entityData.color, 1);
    graphic.currentFillColor = entityData.color;
    graphic.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  }

  // check to see if color is the same, if so, don't redraw
  let currentGraphicsColor = graphic.currentFillColor;
  let color = entityData.color || 0xff0000; // Use entityData.color or default to red
  //console.log('checking color', currentGraphicsColor, color)
  if (currentGraphicsColor !== color) {
    graphic.clear();
    // console.log('setting new color', color)
    graphic.fillStyle(color, 1);
    graphic.currentFillColor = color;
    graphic.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
  }

  // check to see if position is the same, if so, don't redraw
  let currentGraphicsPosition = { x: graphic.x, y: graphic.y };
  let position = entityData.position;

  // let adjustedX = entityData.position.x + this.game.width / 2;
  // let adjustedY = entityData.position.y + this.game.height / 2;

  graphic.setPosition(position.x, position.y);
  // TODO: conditional update of position, use float truncation
  /*  
  //console.log('checking', currentGraphicsPosition, position)
  if (typeof currentGraphicsPosition === 'undefined' || (currentGraphicsPosition.x !== position.x || currentGraphicsPosition.y !== position.y)) {
    if (entityData.type === 'BORDER') {
      //throw new Error('setting new position', position)
      console.log('setting new position', position)
    }
    //let adjustedX = entityData.position.x + this.game.width / 2;
    //let adjustedY = entityData.position.y + this.game.height / 2;
  }
  */

  return graphic;

}
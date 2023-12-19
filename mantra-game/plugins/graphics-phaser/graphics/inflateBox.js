import setCursorStyle from '../util/setCursorStyle.js';

const depthChart = [
  'background',
  'border',
  'wire',
  'part',
  'PLAYER',
  'BLOCK'
];

export default function inflategraphic(entityData) {

  let game = this.game;
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
    graphic.setDepth(9999)
    graphic.fillStyle(entityData.color, 1);
    graphic.currentFillColor = entityData.color;
    graphic.fillRect(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);

    // Add interactive property to enable input events
    const hitArea = new Phaser.Geom.Rectangle(-entityData.width / 2, -entityData.height / 2, entityData.width, entityData.height);
    graphic.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Add pointer events
    graphic.on('pointerover', () => {
      // console.log('pointerover', entityData.id, entityData.type, entityData)
      setCursorStyle(graphic, this.scene, 'pointer');
      // Get the full entity from the game and delegate based on part type
      let ent = game.getEntity(entityData.id);
      if (ent && ent.realStone && ent.realStone.part) {
        let partType = ent.realStone.part.type;
        if (partType === 'MotionDetector') {
          ent.realStone.part.onFn();
        }
      }
    });

    graphic.on('pointerout', () => {
      //setCursorStyle(graphic, this.scene, 'default');
    });

    graphic.on('pointerdown', () => {
      // set closed hand cursor
      // setCursorStyle(graphic, this.scene, 'grabbing');
      // Handle pointer down events
      let ent = game.getEntity(entityData.id);
      if (ent && ent.realStone && ent.realStone.part) {
        let partType = ent.realStone.part.type;
        if (partType === 'Button') {
          ent.realStone.part.press();
        }
        if (ent.realStone.part.toggle) {
          ent.realStone.part.toggle();
        }
      }
    });

    graphic.on('pointerup', () => {
      // Handle pointer up events
      let ent = game.getEntity(entityData.id);
      if (ent && ent.realStone && ent.realStone.part) {
        let partType = ent.realStone.part.type;
        if (partType === 'Button' && ent.realStone.part.release) {
          ent.realStone.part.release();
        }
      }
    });

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

  graphic.setPosition(position.x, position.y);

  if (entityData.rotation) {
    graphic.setRotation(entityData.rotation);
  }

  return graphic;

}
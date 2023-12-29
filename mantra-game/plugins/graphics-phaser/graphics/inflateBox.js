import setCursorStyle from '../util/setCursorStyle.js';

const depthChart = [
  'background',
  'border',
  'wire',
  'part',
  'TILE',
  'BLOCK',
  'PLAYER'
];

export default function inflategraphic(entityData) {

  let game = this.game;
  // check to see if there is existing graphic on entity, if so, use that
  let graphic;

  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }

  if (!graphic) {
    // console.log("COULD NOT FIND GRAPHICS FOR", entityData.id, entityData.type, entityData)
    if (entityData.texture) {
      // Use texture if available
      // console.log('texture', entityData.texture)
      graphic = this.scene.add.sprite(0, 0, entityData.texture);
      graphic.setDepth(entityData.position.z)
      entityData.graphic = graphic; // Store the reference in entityData for future updates
      if (entityData.color) {
        // Apply tint if color is also defined
        // graphic.setTint(entityData.color);
      }
    } else {
      // Fallback to color fill if no texture
      // console.log("FALLING BACK TO PIXEL TEXTURE", entityData.id, entityData.type, entityData)
      graphic = this.scene.add.sprite(0, 0, 'pixel');
      entityData.graphic = graphic; // Store the reference in entityData for future updates
      graphic.setTint(entityData.color);
    }

    // Add interactive property to enable input events

    // Create the hitArea as a Phaser.Geom.Rectangle
    // The hitArea is initially positioned at (0,0) with the size of the entity
    const hitArea = new Phaser.Geom.Rectangle(0, 0, entityData.width, entityData.height);

    // Log the hitArea for debugging purposes
    // console.log('hitArea', hitArea);

    // Set the graphic to be interactive and use the hitArea for interaction checks
    graphic.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

    // Set the size of the graphic
    // It's important to use displayWidth and displayHeight for scaling purposes
    graphic.displayWidth = entityData.width;
    graphic.displayHeight = entityData.height;

    // Add pointer events
    graphic.on('pointerover', () => {
      // console.log('pointerover', entityData.id, entityData.type, entityData)
      setCursorStyle(graphic, this.scene, 'pointer');
      // Get the full entity from the game and delegate based on part type
      let ent = game.getEntity(entityData.id);
      if (ent && ent.yCraft && ent.yCraft.part) {
        let partType = ent.yCraft.part.type;
        if (partType === 'MotionDetector') {
          ent.yCraft.part.onFn();
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
      if (ent && ent.yCraft && ent.yCraft.part) {
        let partType = ent.yCraft.part.type;
        if (partType === 'Button') {
          ent.yCraft.part.press();
        }
        if (ent.yCraft.part.toggle) {
          ent.yCraft.part.toggle();
        }
      }
    });

    graphic.on('pointerup', () => {
      // Handle pointer up events
      let ent = game.getEntity(entityData.id);
      if (ent && ent.yCraft && ent.yCraft.part) {
        let partType = ent.yCraft.part.type;
        if (partType === 'Button' && ent.yCraft.part.release) {
          ent.yCraft.part.release();
        }
      }
    });

    this.scene.add.existing(graphic);

  } else {

    //
    // Existing graphic
    //

    // check to see if color has changed, if so update the tint
    if (typeof entityData.color !== 'undefined') {
      // console.log('COLOR', entityData.color)
      graphic.setTint(entityData.color);
    }

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
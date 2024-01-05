import setCursorStyle from '../../util/setCursorStyle.js';


// TODO: remove, use Z coordinate instead
const depthChart = [
  'background',
  'border',
  'wire',
  'part',
  'TILE',
  'PLAYER',

  'BLOCK',
];

export default function createBox (entityData) {
  let graphic;
  let game = this.game;
  if (entityData.texture) {
    // Use texture if available
    // console.log('texture', entityData.texture)

    let texture = game.getTexture(entityData.texture);
    let textureUrl = texture.url;
    let spritePosition = texture.sprite || { x: 0, y: 0 };

    if (entityData.type === 'PLAYER' || entityData.type === 'BULLET') {
      console.log("UUUUUUU", texture)
      // texture.key = 'tile-block'
    }
    //console.log("GOT TEXTURE", texture, texture.key)
    graphic = this.scene.add.sprite(0, 0, texture.key);
    if (typeof texture.frames === 'object') {
      // get the texture from the sprite sheet
      //let t = this.scene.textures.get(texture.key);
      //let pos = texture.sprite;
      // get specific area from the texture by x / y
      //let frame = t.get(pos.x, pos.y, 16, 16);
      // set the graphic to frame texture
      // graphic.setTexture(frame);
    }

    let depth = depthChart.indexOf(entityData.type);
    graphic.setDepth(depth);
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

  // Create the hitArea as a Phaser.Geom.Rectangle
  // The hitArea is initially positioned at (0,0) with the size of the entity
  const hitArea = new Phaser.Geom.Rectangle(0, 0, entityData.width, entityData.height);

  // Log the hitArea for debugging purposes
  // console.log('hitArea', hitArea);

  if (entityData.style && entityData.style.display) {
    if (entityData.style.display === 'none') {
      graphic.setVisible(false);
    }
  }

  if (entityData.style && entityData.style.border) {
    // console.log('entityData.style.border', entityData.style.border)
    if (entityData.style.border) {
      // graphic.setStrokeStyle(entityData.style.border.width, entityData.style.border.color);
      // graphic.setStrokeStyle(2, 0x000000);
    }
  }

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

  graphic.on('pointerdown', (pointer) => {
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

    if (ent) {

      const pointerX = pointer.worldX;
      const pointerY = pointer.worldY;

      // Calculate the center of the graphic
      const centerX = graphic.x + graphic.displayWidth / 2;
      const centerY = graphic.y + graphic.displayHeight / 2;

      // Calculate the offset from the center
      let offsetX = pointerX - centerX;
      let offsetY = pointerY - centerY;

      offsetX = offsetX + (entityData.width / 2);
      offsetY = offsetY + (entityData.height / 2);

      const convertedEvent = {
        offsetX: offsetX,
        offsetY: offsetY
      };

      console.log('Converted Event', pointer, graphic, convertedEvent);
      game.emit('pointerDown', ent, convertedEvent);
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

  return graphic;
}
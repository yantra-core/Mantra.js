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

      let texture = game.getTexture(entityData.texture);
      let textureUrl = texture.url;
      let spritePosition = texture.sprite || { x: 0, y: 0 };

      graphic = this.scene.add.sprite(0, 0, texture.key);

      if (typeof texture.frames === 'object') {
       // get the texture from the sprite sheet
       let t = this.scene.textures.get(texture.key);
       let pos = texture.sprite;
       // get specific area from the texture by x / y
        let frame = t.get(pos.x, pos.y, 16, 16);
        // set the graphic to frame texture
        graphic.setTexture(frame);
      }

      graphic.setDepth(entityData.position.z);
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

    if (typeof entityData.texture !== 'undefined') {


      let texture = game.getTexture(entityData.texture);
      let textureUrl = texture.url;
      let spritePosition = texture.sprite || { x: 0, y: 0 };
      if (typeof entityData.texture.frame === 'number') {
        // graphic.setFrame(entityData.texture.frame);
      }

      if (typeof texture.frames === 'object') {
        // console.log('got back texture', spritePosition, texture, spritePosition, entityData)
        if (game.tick % 10 === 0) { // TODO: custom tick rate
          // shift first frame from array
          if (typeof entityData.frameIndex === 'undefined') {
            entityData.frameIndex = 0;
          }
          if (entityData.frameIndex >= texture.frames.length) {
            entityData.frameIndex = 0;
          }

          let frame = texture.frames[entityData.frameIndex];
          if (typeof frame !== 'undefined') {
            // console.log(frame)
            // set position on graphic based on frame.x and frame.y
            // graphic.setFrame(frame.frame);
            //graphic.setFrame(2);
            //console.log('frame', frame)
            // graphic.setFrame(entityData.frameIndex);
            // TODO: setFrame animation here
            entityData.frameIndex++;
            // add frame back to end of array
          }
        }
      }
    }

  }

  // check to see if position is the same, if so, don't redraw
  let currentGraphicsPosition = { x: graphic.x, y: graphic.y };
  let position = entityData.position;

  graphic.setPosition(position.x, position.y);

  if (entityData.rotation && typeof entityData.texture === 'undefined') {
    graphic.setRotation(entityData.rotation);
  }

  return graphic;

}
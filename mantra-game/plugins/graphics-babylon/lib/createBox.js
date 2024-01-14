export default function createBox(entityData) {
  let game = this.game;
  let box = BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: entityData.depth, depth: entityData.height }, this.scene);
  let material = new BABYLON.StandardMaterial("material", this.scene);

  // Add rotation if present
  if (entityData.rotation) {
    // Set rotation as needed
  }

  /*
  if (entityData.kind === 'BACKGROUND') {
    // set origin to bottom left
    entityData.position.x += entityData.width / 2;
    entityData.position.y += entityData.height / 2;
  }
  */

  if (typeof game.getTexture(entityData.texture) !== 'undefined') {
    let texture = game.getTexture(entityData.texture);
    let graphic = this.apply2DTexture(box, entityData);
    material = graphic.material;

    if (entityData.kind === 'building') {
      // Rotate the box by 30 degrees around the X-axis
      const rotationAngle = 30 * (Math.PI / 180); // Convert 30 degrees to radians
      box.rotation.x = rotationAngle;

      // Adjust the position of the box if needed
      const boxHeight = entityData.height;
      let adjustment = (boxHeight / 2) - (boxHeight / 2) * Math.cos(rotationAngle);
      entityData.position.z += adjustment;

      // TODO: Implement a method to tilt the texture by 30 degrees
      // This might require custom shaders or adjusting the mesh's UVs
    }

  } else if (entityData.color) {
    // Incoming color is int color value
    // Extract RGB components from the hexadecimal color value
    var red = (entityData.color >> 16) & 255;
    var green = (entityData.color >> 8) & 255;
    var blue = entityData.color & 255;
    // Set tint of graphic using the extracted RGB values
    // clear the existing material color
    material.diffuseColor = new BABYLON.Color3.FromInts(red, green, blue);
  }

  if (typeof entityData.style !== 'undefined') {
    if (typeof entityData.style.display !== 'undefined') {
      // console.log('entityData.style.display', entityData.style.display)
      if (entityData.style.display === 'none') {
        box.isVisible = false;
      }
    }
  }

  // set origin to bottom left
  // box.setPivotPoint(new BABYLON.Vector3(0, 0, 0));

  // Apply the material to the box
  box.material = material;

  // Ensure the box is actionable
  box.isPickable = true;

  // Create an action manager for the box
  box.actionManager = new BABYLON.ActionManager(this.scene);

  // Pointer over event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
    // console.log('pointerover', entityData.id, entityData.type, entityData);
    this.scene.getEngine().getRenderingCanvas().style.cursor = 'pointer';
  }));

  // Pointer out event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
    // console.log('pointerout', entityData.id, entityData.type, entityData)
    this.scene.getEngine().getRenderingCanvas().style.cursor = 'default';
    // Additional logic if needed
    // Get the full entity from the game and delegate based on part type
    let ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      let partType = ent.yCraft.part.type;
      if (partType === 'MotionDetector') {
        ent.yCraft.part.onFn();
      }
    }
  }));

  // Pointer down event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
    // console.log('pointerdown', entityData.id, entityData.type, entityData);
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
    // Logic for pointer down
  }));

  // Pointer up event
  box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, () => {
    // Logic for pointer up
    // console.log('pointerup', entityData.id, entityData.type, entityData)
    let ent = game.getEntity(entityData.id);
    if (ent && ent.yCraft && ent.yCraft.part) {
      let partType = ent.yCraft.part.type;
      if (partType === 'Button' && ent.yCraft.part.release) {
        ent.yCraft.part.release();
      }
    }
  }));

  return box;
}
export default function createBox(entityData) {
  let game = this.game;
  let box = BABYLON.MeshBuilder.CreateBox('default', { width: entityData.width, height: entityData.depth, depth: entityData.height }, this.scene);

  // Add rotation if present
  if (entityData.rotation) {
    // Set rotation as needed
  }
  // Create a material for the box
  let material = new BABYLON.StandardMaterial("material", this.scene);
  // console.log('game.getTexture(entityData.texture)', game.getTexture(entityData.texture))
  // Check if texture is available
  if (typeof game.getTexture(entityData.texture) !== 'undefined') {
    // Apply texture
    let texture = game.getTexture(entityData.texture);
    material.diffuseTexture = new BABYLON.Texture(texture.url, this.scene);
    material.diffuseTexture.wAng = -Math.PI / 2;
    // ensure transparency is enabled
    material.diffuseTexture.hasAlpha = true;
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
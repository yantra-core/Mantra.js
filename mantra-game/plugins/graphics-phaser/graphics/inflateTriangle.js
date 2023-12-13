export default function inflateTriangle(entityData) {

  if (!this.scene) {
    console.log('No scene yet, this should not happen.');
    return;
  }

  // check to see if there is existing graphic on entity, if so, use that
  let graphic;
  
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }

  // let graphic = entityData.graphic; // Assuming entityData.graphic holds the reference to the existing graphic object.

  if (!graphic) {
    // Create a new triangle if it doesn't exist
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
    graphic.clear();
  }

  // Update or set position, rotation, and color based on entityData
  let centerX = entityData.position.x;
  let centerY = entityData.position.y;
  let height = entityData.height || 64;
  let width = entityData.width || 64;

  let halfWidth = width / 2;
  let point1 = { x: centerX - halfWidth, y: centerY + (height / 2) };
  let point2 = { x: centerX + halfWidth, y: centerY + (height / 2) };
  let point3 = { x: centerX, y: centerY - (height / 2) };

  // Use entityData.color or default to red
  let color = entityData.color || 0xff0000;
  graphic.fillStyle(color, 1);
  graphic.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  graphic.setDepth(10);
  // console.log('entityData', entityData)
  if (typeof entityData.rotation !== 'undefined' && entityData.rotation !== null) {
    if (typeof entityData.rotation === 'object') {
      // transform 3d to 2.5d
      graphic.rotation = entityData.rotation.x;
    } else {
      graphic.rotation = entityData.rotation;
    }
  }
  // Optional: Update position if needed
  // graphic.setPosition(centerX, centerY);

  return graphic;
}
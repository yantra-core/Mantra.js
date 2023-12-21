export default function inflateCircle(entityData) {
  // check to see if there is existing graphic on entity, if so, use that
  let graphic;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }
  if (!graphic) {
    graphic = this.scene.add.graphics();
    entityData.graphic = graphic; // Store the reference in entityData for future updates
    this.scene.add.existing(graphic);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], graphic);
  } else {
    // Clear the existing triangle if it exists
    graphic.clear();
  }
  graphic.fillStyle(0xff0000, 1);
  graphic.fillCircle(0, 0, entityData.radius);
  graphic.setDepth(10);
  graphic.setPosition(entityData.position.x, entityData.position.y);
  return graphic;
}
export default function inflateText(entityData) {
  // Check to see if there is an existing text object on the entity, if so, use that
  let textObject;
  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    textObject = entityData.graphics['graphics-phaser'];
  }

  let textStyle = { font: '32px Arial', fill: '#f00fff' }

  // If there's no existing text object, create a new one
  if (!textObject) {
    textObject = this.scene.add.text(entityData.position.x, entityData.position.y, entityData.text, textStyle);
    textObject.setOrigin(0.5, 0); // Center text horizontally and anchor to the top
    textObject.setDepth(1001);
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-phaser'] = textObject; // Store the reference in entityData for future updates
    this.scene.add.existing(textObject);
    this.game.components.graphics.set([entityData.id, 'graphics-phaser'], textObject);
  } else {
    // Update the text only if it has changed
    if (textObject.text !== entityData.text) {
      textObject.setText(entityData.text);
    }
    // Update position in case it has changed
    textObject.setPosition(entityData.position.x, entityData.position.y);
  }
  return textObject;
}

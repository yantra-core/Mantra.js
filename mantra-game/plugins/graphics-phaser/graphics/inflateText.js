export default function inflateText(entityData) {
  // Check if there is an existing container with the text and background
  let container = entityData.graphics && entityData.graphics['graphics-phaser'];

  let textStyle = { font: '32px Arial', fill: '#f00fff' };

  // If there's no existing container, create a new one
  if (!container) {
    // Create text and background graphic
    const textObject = this.scene.add.text(0, 0, entityData.text, textStyle).setOrigin(0.5, 0.5);
    const backgroundGraphic = this.scene.add.graphics().fillStyle(0xcccccc, 1);
    
    backgroundGraphic.fillRect(-textObject.width / 2, -textObject.height / 2, textObject.displayWidth, textObject.displayHeight);

    // Create a container and add the text and background graphic to it
    container = this.scene.add.container(entityData.position.x, entityData.position.y, [backgroundGraphic, textObject]);
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-phaser'] = container;
  } else {
    // Update the text and background graphic if the text has changed
    const textObject = container.list[1]; // Assuming textObject is the second item in the container
    const backgroundGraphic = container.list[0]; // Assuming backgroundGraphic is the first item

    if (textObject.text !== entityData.text) {
      textObject.setText(entityData.text);
      backgroundGraphic.clear();
      backgroundGraphic.fillRect(-textObject.width / 2, -textObject.height / 2, textObject.width, textObject.height);
    }

    // Update container position
    container.setPosition(entityData.position.x, entityData.position.y + 30);
  }

  return container;
}

export default function inflateText(entityData) {
  // Check if there is an existing container with the text and background
  let container = entityData.graphics && entityData.graphics['graphics-phaser'];

  // set color to default white
  let textStyle = { font: '22px', fill: '#ffffff', padding: 3 };

  if (entityData.style) {
    // textStyle = entityData.style;
    if (entityData.style.fontSize) {
      // textStyle.fontSize = entityData.fontSize;
      textStyle.font = `${entityData.style.fontSize}`;
    }
    if (entityData.style.backgroundColor) {
      textStyle.backgroundColor = entityData.style.backgroundColor;
    }
  }

  textStyle.font = '12px monospace';

  // color fill
  if (entityData.color) {
    textStyle.fill = entityData.color;
  }
  
  // replaces <br> with \n
  entityData.text = entityData.text.replace(/<br\/>/g, '\n');

  // If there's no existing container, create a new one
  if (!container) {
    // Create text and background graphic
    const textObject = this.scene.add.text(0, 0, entityData.text, textStyle).setOrigin(0.5, 0.5);
    textObject.setAlpha(1);
    textObject.setDepth(9999);
    textObject.visible = true;
    // Create a container and add the text and background graphic to it
    container = this.scene.add.container(entityData.position.x, entityData.position.y, [/*backgroundGraphic,*/ textObject]);
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-phaser'] = container;
  } else {
    // Update the text and background graphic if the text has changed
    const textObject = container.list[1]; // Assuming textObject is the second item in the container
    //const backgroundGraphic = container.list[0]; // Assuming backgroundGraphic is the first item

    if (textObject.text !== entityData.text) {
      textObject.setText(entityData.text);
    }

    // Update container position
    container.setPosition(entityData.position.x, entityData.position.y);

  }


  return container;
}

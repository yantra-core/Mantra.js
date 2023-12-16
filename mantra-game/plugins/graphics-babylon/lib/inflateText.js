export default function inflateText(entityData, scene) {
  let plane, texture;

  // TODO: ensure this file won't be called each game tick, and only on update or create
  // we cannot dispose of the texture and plane each tick, or we will get CPU spikes

  if (entityData.graphics && entityData.graphics['graphics-babylon']) {
    // Dispose of existing texture and plane if they exist
    entityData.graphics['graphics-babylon'].texture.dispose();
    entityData.graphics['graphics-babylon'].plane.dispose();
  }

  const text = entityData.text || '';
  const font = 'bold 244px monospace';

  // Create a temporary canvas to measure text
  const tempCanvas = document.createElement('canvas');
  const context = tempCanvas.getContext('2d');
  context.font = font;
  const textSize = context.measureText(text);

  // Adjust texture size based on text size
  const textureWidth = Math.ceil(textSize.width) + 60;
  const textureHeight = 288; // Fixed height

  // Create new texture and plane with calculated dimensions
  texture = new BABYLON.DynamicTexture('dynamicTexture', { width: textureWidth, height: textureHeight }, scene, false);
  texture.hasAlpha = true;

  const material = new BABYLON.StandardMaterial('textMaterial', scene);
  material.diffuseTexture = texture;
  material.backFaceCulling = false;

  plane = new BABYLON.MeshBuilder.CreatePlane('signboard', { width: textureWidth / 10, height: textureHeight / 10 }, scene);
  plane.material = material;
  plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  // Clear texture and draw new text
  texture.getContext().clearRect(0, 0, textureWidth, textureHeight);
  const xPosition = 30; // Horizontal padding
  const yPosition = textureHeight / 2 + textSize.actualBoundingBoxAscent / 2 - 40; // Adjusted for vertical centering
  texture.drawText(text, xPosition, yPosition, font, 'purple', 'white', true, true);

  // Update entityData with new graphics
  entityData.graphics = { 'graphics-babylon': { plane, texture } };

  // Adjust plane position
  plane.position = new BABYLON.Vector3(entityData.position.x, entityData.position.y + 200, entityData.position.z);

  return plane;
}

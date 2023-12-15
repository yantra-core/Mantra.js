export default function inflateText(entityData, scene) {
  let plane, texture;

  if (entityData.graphics && entityData.graphics['graphics-babylon']) {
    // If the plane and text already exist, retrieve them
    plane = entityData.graphics['graphics-babylon'].plane;
    texture = entityData.graphics['graphics-babylon'].texture;
  } else {
    // Create a new plane and texture
    plane = new BABYLON.MeshBuilder.CreatePlane('signboard', { width: 120, height: 20 }, scene);
    texture = new BABYLON.DynamicTexture('dynamicTexture', { width: 512, height: 256 }, scene, false);
    texture.hasAlpha = true;

    const material = new BABYLON.StandardMaterial('textMaterial', scene);
    material.diffuseTexture = texture;
    material.backFaceCulling = false;

    plane.material = material;
    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    // Store the plane and texture in entityData for future use
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-babylon'] = { plane, texture };
  }

  // Draw or update text on the dynamic texture
  const text = entityData.text || '';
  const font = 'bold 128px monospace';
  const textSize = texture.getContext().measureText(text);
  const xPosition = (texture.getSize().width - textSize.width) / 2;
  const yPosition = (texture.getSize().height + 128 * 0.8) / 2; // Adjust for vertical centering
  texture.drawText(text, 0, yPosition, font, 'purple', 'white', true, true);

  // Adjust plane position
  plane.position = new BABYLON.Vector3(entityData.position.x, entityData.position.y + 200, entityData.position.z);
  return plane;
}
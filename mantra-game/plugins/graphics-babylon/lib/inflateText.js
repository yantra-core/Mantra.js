export default function inflateText(entityData) {
  const plane = BABYLON.MeshBuilder.CreatePlane('chatBubble', { width: entityData.width, height: entityData.height }, this.scene);

  const texture = new BABYLON.DynamicTexture('dynamic texture', { width: 512, height: 256 }, this.scene);
  const material = new BABYLON.StandardMaterial('Mat', this.scene);

  const text = 'HELLO WORLD';  // Or use entityData.text if it contains the message
  const font = 'bold 44px monospace';

  texture.drawText(text, null, 40, font, 'black', 'white', true, true);

  material.diffuseTexture = texture;
  plane.material = material;

  // Set the billboard mode so the plane always faces the camera
  plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  return plane;
}
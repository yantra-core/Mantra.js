export default function removeGraphic(entityId) {
  // Fetch the mesh from the 'graphics' component
  const mesh = this.game.components.graphics.get([entityId, 'graphics-three']);
  if (mesh) {
    this.scene.remove(mesh);
    // Remove the mesh from the 'graphics' component
    this.game.components.graphics.remove([entityId, 'graphics-three']);
  }
}

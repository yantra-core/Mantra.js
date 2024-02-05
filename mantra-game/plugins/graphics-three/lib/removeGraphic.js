function removeGraphic(entityId) {

  const mesh = this.game.components.graphics.get([entityId, 'graphics-three']);

  if (mesh) {

    if (mesh.parent) {
      mesh.parent.remove(mesh);
    }

    this.scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
    // mesh = undefined;
    this.game.components.graphics.remove([entityId, 'graphics-three']);

  }
}

export default removeGraphic;
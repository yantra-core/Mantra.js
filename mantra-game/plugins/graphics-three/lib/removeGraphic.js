function removeGraphic(entityId) {
  const group = this.game.components.graphics.get([entityId, 'graphics-three']);

  if (group) {
    // Recursively dispose of group children
    group.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          // If the material is an array of materials, dispose of each one
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });

    // Remove the group from its parent
    if (group.parent) {
      group.parent.remove(group);
    }

    // Alternatively, you can remove the group directly from the scene if it's directly added to it
    // this.scene.remove(group);

    // Remove the reference from your game components
    this.game.components.graphics.remove([entityId, 'graphics-three']);
  }
}

export default removeGraphic;

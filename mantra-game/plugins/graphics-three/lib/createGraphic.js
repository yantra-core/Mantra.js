export default function createGraphic(entityData) {
  let geometry, material, mesh;

  // Geometry setup based on entity type
  switch (entityData.type) {
    case 'BORDER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'BULLET':
      geometry = new THREE.SphereGeometry(entityData.radius, 32, 32);
      break;
    case 'PLAYER':
      geometry = new THREE.CylinderGeometry(0, entityData.width, entityData.height, 3);
      break;
    default:
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  // Initial material setup with wireframe and color
  material = new THREE.MeshBasicMaterial({
    color: entityData.color || 0xffffff, // Default to white if no color specified
    wireframe: true,
  });

  mesh = new THREE.Mesh(geometry, material);
  this.scene.add(mesh);

  // Setting position
  mesh.position.set(-entityData.position.x, entityData.z, -entityData.position.y);

  // Apply texture if available
  // applyTextureToMesh(entityData, mesh);

  this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);

  return mesh;
}


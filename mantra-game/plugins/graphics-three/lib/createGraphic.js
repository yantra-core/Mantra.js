export default function createGraphic(entityData) {
  let geometry, material, mesh;

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
      geometry = new THREE.BoxGeometry(entityData.width, entityData.width, entityData.width); // Default to a unit cube if no shape is specified
  }

  // Basic white material, replace with textures/materials as needed
  material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    wireframe: true // Set wireframe to true
  });

  mesh = new THREE.Mesh(geometry, material);

  this.scene.add(mesh); // Add the mesh to the scene
  // Store the mesh in the 'graphics' component
  this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);
  mesh.position.set(-entityData.position.x, 1, -entityData.position.y);


  return mesh;
}

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
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  let texture = this.game.getTexture(entityData.texture);
  // console.log('Texture', texture);

  if (texture) {
    // Load the texture using THREE.TextureLoader
    const textureLoader = new THREE.TextureLoader();
    const loadedTexture = textureLoader.load(texture.url);
    // console.log('loadedTexture', loadedTexture)
    // Apply the loaded texture to the material
    material = new THREE.MeshBasicMaterial({
      map: loadedTexture // Use the loaded texture
    });


  } else {
    material = new THREE.MeshBasicMaterial({
      wireframe: true,
    });

  }

  mesh = new THREE.Mesh(geometry, material);

  this.scene.add(mesh);
  this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);
  mesh.position.set(-entityData.position.x, entityData.z, -entityData.position.y);

  return mesh;
}

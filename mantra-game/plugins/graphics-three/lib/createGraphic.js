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


  // TODO: we also have entityData.color
  // we wish to use the color entirelys if no texture is available
  // if there is color + texture, we wish to use the color as a tint
  // Check if texture is available
  if (texture) {
    const textureLoader = new THREE.TextureLoader();
    const loadedTexture = textureLoader.load(texture.url);

    // Create a material with the texture
    material = new THREE.MeshBasicMaterial({
      map: loadedTexture
    });

    // If entityData.color is also available, apply it as a tint
    if (entityData.color) {
      const color = new THREE.Color(entityData.color);
      material.color.set(color);
      material.map = loadedTexture; // Reapply the texture to ensure tinting
    }

  } else {
    // If no texture, use entityData.color
    if (entityData.color) {
      material = new THREE.MeshBasicMaterial({
        color: entityData.color
      });
    } else {
      // Default case if no texture and no color
      material = new THREE.MeshBasicMaterial({
        wireframe: true,
      });
    }
  }

  mesh = new THREE.Mesh(geometry, material);


  this.scene.add(mesh);
  this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);
  mesh.position.set(-entityData.position.x, entityData.z, -entityData.position.y);

  return mesh;
}

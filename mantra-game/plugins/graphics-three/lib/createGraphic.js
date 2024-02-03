export default function createGraphic(entityData) {
  let geometry, material, mesh;
  // console.log('createGraphic', entityData)
  // Geometry setup based on entity type
  switch (entityData.type) {
    case 'BORDER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'BULLET':
      // geometry = new THREE.SphereGeometry(entityData.radius, 32, 32);
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);

      break;
    case 'PLAYER':
      //      geometry = new THREE.CylinderGeometry(0, entityData.width, entityData.height, 3);
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);

      break;
    case 'TILE':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;

    case 'not_implemented_TEXT':
      // Ensure you have the font data loaded
      const font = this.game.font; // Assuming you have a method to get the loaded font
      if (font) {
        // console.log('font', font);
        // font has isFont, type, and data
        /* TODO: this causes game to crash / not render? no error 
        geometry = new THREE.TextGeometry(entityData.text, {
          font: font,
          size: entityData.size || 1,
          height: entityData.height || 0.1,
          curveSegments: 12,
          bevelEnabled: false
        });
         */
      } else {
        console.warn("Font not loaded for text geometry");
        return;
      }
      break;
    default:
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  // Material setup - solid if color exists, wireframe otherwise
  material = new THREE.MeshBasicMaterial({
    color: entityData.color || 0xffffff, // Default to white if no color specified
    // wireframe: !entityData.color,
  });

  if (!geometry) return; // If geometry is not set (like missing font), exit early

  mesh = new THREE.Mesh(geometry, material);
  // set to invisible at first
  if (entityData.type !== "PLAYER") { // for now
    mesh.visible = false;
  }

  this.scene.add(mesh);

  // Setting position
  mesh.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);

  this.game.components.graphics.set([entityData.id, 'graphics-three'], mesh);

  return mesh;
}

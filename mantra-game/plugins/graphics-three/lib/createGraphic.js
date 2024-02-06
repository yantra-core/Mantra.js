export default function createGraphic(entityData) {
  let geometry, material, mesh;
  // console.log('createGraphic', entityData)
  // Geometry setup based on entity type

  if (entityData.destroyed === true) {
    // ignore, shouldn't have made it here, check upstream as well
    return;
  }


  // check to see if there is texture data or a model to use
  let texture = game.getTexture(entityData.texture);

  console.log("creating ent with text", texture)

  // Create a group to hold the entity's components
  let entityGroup;
  
  if (texture && texture.model) {
    entityGroup = texture.model;
    console.log("assigning text", texture)
    // set size of entityGroup
    // entityGroup.scale.set(entityData.width, entityData.depth, entityData.height);
    entityGroup.scale.set(1, 1, 1);

  } else {
    entityGroup = new THREE.Group();
  }
  

  switch (entityData.type) {
    case 'BORDER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;

    case 'PLAYER':
      //      geometry = new THREE.CylinderGeometry(0, entityData.width, entityData.height, 3);
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);


      break;
    case 'BULLET':
      // geometry = new THREE.SphereGeometry(entityData.radius, 32, 32);
      // console.log('entityData.width', entityData.radius, entityData.radius, entityData.radius)
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);

      break;

    case 'BLOCK':
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
      break;

    case 'TILE':
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
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

  // console.log('creating a new mesh', entityData, geometry, material)
  mesh = new THREE.Mesh(geometry, material);

  if (entityData.type === 'TEXT') {
    mesh.visible = false; // for now
  }

  console.log(entityGroup.position);
  console.log(entityGroup.scale);
  
  // TODO doesnt this only get set if we don't have a default model mesh?
  // Before adding the mesh, check if the entityGroup was just created (and doesn't contain a model from texture)
  if (!texture || !texture.model) {
    entityGroup.add(mesh);
  }
  
  entityGroup.traverse((child) => {
    child.visible = true;
  });

  this.scene.add(entityGroup);

  // Setting position
   entityGroup.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  //entityGroup.position.set(0, 0, 0);

  this.game.components.graphics.set([entityData.id, 'graphics-three'], entityGroup);
  entityGroup.visible = true;
  entityGroup.needsUpdate = true;
  //this.inflateTexture(entityData, entityGroup);

  return entityGroup;
}

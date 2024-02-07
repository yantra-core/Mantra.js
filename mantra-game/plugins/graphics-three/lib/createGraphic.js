export default function createGraphic(entityData) {
  // Early exit if entity is marked as destroyed
  if (entityData.destroyed === true) {
    console.log("Entity is destroyed, skipping creation.");
    return;
  }

  // Attempt to retrieve texture and model data
  // console.log("fetching texture", entityData, entityData.texture)
  let texture = game.getTexture(entityData.texture);
  // console.log("Creating entity with texture:", texture);

  // Define a variable to hold the main object for the entity (model or group)
  let entityObject;

  // Check if there is a model associated with the texture
  if (texture && texture.model) {
    //console.log("Using existing model for entity.");
    entityObject = processModel(texture.model);
    //console.log('entityObject after processModel()', entityObject);
  } else {
    // console.log("Creating new geometry for entity.");
    entityObject = createGeometryForEntity(entityData);
  }

  // Set entity position and add to the scene
  if (typeof entityData.position.z !== 'number') {
    entityData.position.z = 0;
  }

  // console.log('setting position of entityObject', entityObject, entityData.position);
  entityObject.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
  entityObject.visible = true; // Ensure the entity is visible
  this.scene.add(entityObject);

  // Save the entity object in the game's component system
  this.game.components.graphics.set([entityData.id, 'graphics-three'], entityObject);

  return entityObject;
}

function processModel(model) {
  const clonedModel = model.clone();
  clonedModel.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0xff0000, // Applying a red color for visibility
      });
    }
  });
  // Set model scale or other transformations if needed
  clonedModel.scale.set(1, 1, 1);
  return clonedModel;
}

function createGeometryForEntity(entityData) {
  let geometry, material, mesh;
  const entityGroup = new THREE.Group();

  // Define geometry based on entity type
  switch (entityData.type) {
    case 'BORDER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'PLAYER':
      geometry = new THREE.BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'BULLET':
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
      break;
    case 'BLOCK':
    case 'TILE':
    default:
      geometry = new THREE.BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  // Create material (color or texture)
  material = new THREE.MeshBasicMaterial({
    color: entityData.color || 0xffffff, // Default to white if no color specified
  });

  // Create mesh and add it to the group
  mesh = new THREE.Mesh(geometry, material);
  if (entityData.type === 'TEXT') {
    mesh.visible = false; // Hide text meshes for now
  }

  if (entityData.texture) {
    mesh.visible = false; // Hide mesh until texture is loaded
  }

  entityGroup.add(mesh);

  return entityGroup;
}


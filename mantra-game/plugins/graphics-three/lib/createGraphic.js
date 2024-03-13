import { MeshBasicMaterial, BoxGeometry, Mesh, Group, LineBasicMaterial, EdgesGeometry, LineSegments } from 'three';

export default function createGraphic(entityData) {
  // Early exit if entity is marked as destroyed
  if (entityData.destroyed === true) {
    console.log("Entity is destroyed, skipping creation.");
    return;
  }

  let game = this.game;
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
    //entityObject = createGeometryForEntity(entityData);

    //console.log('entityObject after processModel()', entityObject);
  } else {
    // console.log("Creating new geometry for entity.");


    
    entityObject = createGeometryForEntity.call(this, entityData);
  }

  // Set entity position and add to the scene
  if (typeof entityData.position.z !== 'number') {
    entityData.position.z = 0;
  }

  // console.log('setting position of entityObject', entityObject, entityData.position);
  entityObject.position.set(-entityData.position.x, entityData.position.z, -entityData.position.y);
 
  if (entityData.type === 'CONTAINER') {
    // console.log('entityData.type === CONTAINER', entityData);
    entityObject.visible = false; // Hide container entities
  } else {
    entityObject.visible = true; // Ensure the entity is visible
  }
  
  this.scene.add(entityObject);

  // Save the entity object in the game's component system
  this.game.components.graphics.set([entityData.id, 'graphics-three'], entityObject);

  return entityObject;
}

function processModel(model) {
  // const clonedModel = model.clone();
  const clonedModel = model;

  clonedModel.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshBasicMaterial({
        color: 0xff00ff, // Applying a red color for visibility
      });
    }
  });
  // Set model scale or other transformations if needed
  clonedModel.scale.set(0.2, 0.2, 0.2);
  return clonedModel;
}

function createGeometryForEntity(entityData) {
  let geometry, material, mesh;
  const entityGroup = new Group();

  if (entityData.type === 'TEXT') {
    mesh = this.inflateText(entityData, this.scene, this.game.font);
    entityGroup.add(mesh);

    return entityGroup;
  }

  // Define geometry based on entity type
  switch (entityData.type) {
    case 'BORDER':
      geometry = new BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'PLAYER':
      geometry = new BoxGeometry(entityData.width, 1, entityData.height);
      break;
    case 'BULLET':
      geometry = new BoxGeometry(entityData.width, entityData.depth, entityData.height);
      break;
    case 'BLOCK':
    case 'TILE':
    default:
      geometry = new BoxGeometry(entityData.width, entityData.depth, entityData.height);
  }

  // Create material (color or texture)
  material = new MeshBasicMaterial({
    color: entityData.color || 0xffffff, // Default to white if no color specified
  });

  // Create mesh and add it to the group
  mesh = new Mesh(geometry, material);
  if (entityData.type === 'TEXT') {
    mesh.visible = false; // Hide text meshes for now
  }

  // CSS style border support
  if (entityData.style && entityData.style.border) {
    // Extract border thickness and color from the style object
    const borderThickness = parseFloat(entityData.style.border.split(' ')[0]);
    const borderColor = entityData.style.border.split(' ')[1];
    
    // Create a border for the mesh
    const border = createBorderForMesh(mesh, borderThickness, borderColor);

    // Add the border to the group
    entityGroup.add(border);
  }

  if (entityData.texture) {
    mesh.visible = false; // Hide mesh until texture is loaded
  }

  entityGroup.add(mesh);

  return entityGroup;
}

function createBorderForMesh(mesh, thickness = 0.05, color = 0x000000) {
  // Create an EdgesGeometry from the original mesh's geometry
  const edgesGeometry = new EdgesGeometry(mesh.geometry);

  // Create a line material using the border's color and thickness
  const lineMaterial = new LineBasicMaterial({ color: color, linewidth: thickness });

  // Create a line segments mesh to represent the border
  const border = new LineSegments(edgesGeometry, lineMaterial);

  // Align the border with the original mesh
  border.position.copy(mesh.position);
  border.rotation.copy(mesh.rotation);
  border.scale.copy(mesh.scale);

  return border;
}
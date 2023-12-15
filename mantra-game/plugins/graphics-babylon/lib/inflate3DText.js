// import fontData from '../fonts/KenneyFuture.js';

// TODO: 3d fonts using MeshBuilder.CreateText and JSON font
// see: https://assets.babylonjs.com/fonts/Kenney%20Future%20Regular.json
export default function inflateText(entityData, scene) {
  // Define the font data JSON file URL (this should be replaced with your font data file URL)
  // Fetch and parse the font data
  console.log('fontDatafontData', fontData)
  // Define text options
  let textOptions = {
    text: entityData.text,
    fontData: fontData,
    size: 32, // Corresponds to '32px Arial' in Phaser
    resolution: 64, // Number of points used when tracing curves
    depth: 10, // Extrusion depth
    sideOrientation: BABYLON.Mesh.DOUBLESIDE // Side orientation
  };

  // Check if there is an existing text mesh, if so, update it
  if (entityData.graphics && entityData.graphics['graphics-babylon']) {
    let textMesh = entityData.graphics['graphics-babylon'];

    // Update the text only if it has changed
    if (textMesh.text !== entityData.text) {
      textMesh.dispose(); // Dispose the old mesh
      textMesh = BABYLON.MeshBuilder.CreateText('textMesh', textOptions, scene);
      entityData.graphics['graphics-babylon'] = textMesh;
    }

    // Update position in case it has changed
    textMesh.position.x = entityData.position.x;
    textMesh.position.y = entityData.position.y;
    textMesh.position.z = 1001; // Corresponds to setDepth in Phaser

    return textMesh;

  } else {
    // Create a new text mesh
    let textMesh = BABYLON.MeshBuilder.CreateText('textMesh', textOptions, scene);

    // Set mesh position
    textMesh.position.x = entityData.position.x;
    textMesh.position.y = entityData.position.y;
    textMesh.position.z = 1001; // Corresponds to setDepth in Phaser

    // Store the reference in entityData for future updates
    entityData.graphics = entityData.graphics || {};
    entityData.graphics['graphics-babylon'] = textMesh;

    return textMesh;
  }
}
// compass.js - WIP, not quite working as expected with camera
// see: BabylonGraphics.js
export default function createCompass() {
  let game = this.game;
  // Create a compass group
  var compass = new BABYLON.TransformNode("compass", this.scene);

  // Function to create an arrow
  const createArrow = (name, direction, color) => {
    // Line part of the arrow
    var line = BABYLON.MeshBuilder.CreateLines(name, { points: [BABYLON.Vector3.Zero(), direction] }, this.scene);
    line.color = color;

    // Arrowhead part of the arrow
    var arrowhead = BABYLON.MeshBuilder.CreateCylinder(name + "head", { diameter: 0.1, height: 0.2, direction: direction }, this.scene);
    arrowhead.position = direction;
    arrowhead.material = new BABYLON.StandardMaterial(name + "Mat", this.scene);
    arrowhead.material.diffuseColor = color;

    // Parenting
    line.parent = compass;
    arrowhead.parent = compass;
  };

  // Creating arrows for each axis
  createArrow("arrowX", new BABYLON.Vector3(1, 0, 0), new BABYLON.Color3(1, 0, 0)); // Red for X-axis
  createArrow("arrowY", new BABYLON.Vector3(0, 1, 0), new BABYLON.Color3(0, 1, 0)); // Green for Y-axis
  createArrow("arrowZ", new BABYLON.Vector3(0, 0, 1), new BABYLON.Color3(0, 0, 1)); // Blue for Z-axis


  // Function to create text label
  const createTextLabel = (text, position) => {
    var plane = BABYLON.Mesh.CreatePlane("textPlane", 1, this.scene);
    plane.position = position;

    var dynamicTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = text;
    textBlock.color = "white";
    textBlock.fontSize = 24;
    dynamicTexture.addControl(textBlock);

    plane.parent = compass;
  };

  // Creating text labels for each axis
  createTextLabel("X", new BABYLON.Vector3(1.2, 0, 0)); // Label for X-axis
  createTextLabel("Y", new BABYLON.Vector3(0, 1.2, 0)); // Label for Y-axis
  createTextLabel("Z", new BABYLON.Vector3(0, 0, 1.2)); // Label for Z-axis



  // Instead of attaching the compass to the utility layer, parent it to the camera
  console.log("activeCamera", game.camera)
  compass.parent = game.camera;

  // Position the compass in front of the camera
  compass.position = new BABYLON.Vector3(0, 0, 5); // Position in front of the camera, adjust the Z value as needed

  // You might not need to scale the compass if it's parented to the camera
  //compass.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);


  console.log('Created compass', compass);
}

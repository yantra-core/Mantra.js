import { TextGeometry } from '../../../vendor/three/examples/jsm/geometries/TextGeometry.js';
import { Vector3, MeshPhongMaterial, Mesh, Color } from 'three';

export default function inflateText(entityData, scene, font) {
  let text = entityData.text;
  let style = entityData.style || {}; // Ensure style exists to prevent errors

  // Default values
  let fontSize = 80; // Default font size
  let fontColor = 0xff0000; // Default font color (red)

  // Override default values if specific styles are provided
  if (style.fontSize) {
    fontSize = parseInt(style.fontSize, 10); // Convert fontSize from CSS style to integer
  }
  if (style.color) {
    fontColor = new Color(style.color).getHex(); // Convert CSS color string to Three.js color hex
  }

  let textGeo = new TextGeometry(text, {
    font: font,
    size: fontSize, // Use the fontSize from style or default
    height: 1, // Thickness of the text. Adjust as needed.
    curveSegments: 12, // How many curve segments to use for letters, more makes letters rounder.
    bevelEnabled: true, // Whether to use bevel edges.
    bevelThickness: 2, // How deep the bevel is.
    bevelSize: 1.5, // How far the bevel extends from the text outline.
    bevelOffset: 0,
    bevelSegments: 5 // Number of bevel segments.
  });

  let textMaterial = new MeshPhongMaterial({ 
    color: fontColor, // Use the fontColor from style or default
    specular: 0xffffff // Specular color of the material (for shininess). Adjust as needed.
  });

  let mesh = new Mesh(textGeo, textMaterial);

  mesh.rotation.y = Math.PI; // Math.PI radians equals 180 degrees

// Compute the geometry's bounding box to get its dimensions
textGeo.computeBoundingBox();
const boundingBox = textGeo.boundingBox;

// Calculate the offset to center the text
const offset = new Vector3();
offset.x = (boundingBox.max.x - boundingBox.min.x) / 2; // Center in X
offset.y = boundingBox.min.y; // Align bottom to origin in Y

// Move the mesh by the calculated offset
mesh.geometry.translate(-offset.x, -offset.y, 0);


  // Add the mesh to the scene if provided
  if (scene) {
    scene.add(mesh);
  }

  return mesh; // Return the text mesh in case you need to further manipulate it.
}

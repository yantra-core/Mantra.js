// TODO: connect this as gl-matrix-min.js renderer

function setupDebugDrawer() {
  canvas.width = 800;
  canvas.height = 600;

  // compute projection matrix
  mat4.lookAt(viewMatrix, [12, 15, 20], [0, 0, 0], [0, 1, 0])
  mat4.perspective(projectionMatrix, 45 * (Math.PI / 180), canvas.width / canvas.height, 0.01, 75);
  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  // setup debug drawer
  const context = canvas.getContext('2d');
  scene.setVisualizationParameter(PhysX.eSCALE, 1);
  scene.setVisualizationParameter(PhysX.eWORLD_AXES, 1);
  scene.setVisualizationParameter(PhysX.eACTOR_AXES, 1);
  scene.setVisualizationParameter(PhysX.eCOLLISION_SHAPES, 1);
}

function debugDraw(PhysX, scene) {
  if (!PhysX.NativeArrayHelpers) {
    return;
  }
  if (!canvas) {
    return;
  }
  canvas.width = canvas.width;    // clears the canvas

  const rb = scene.getRenderBuffer();
  for (let i = 0; i < rb.getNbLines(); i++) {
    const line = PhysX.NativeArrayHelpers.prototype.getDebugLineAt(rb.getLines(), i);
    const from = project(line.pos0.get_x(), line.pos0.get_y(), line.pos0.get_z());
    const to = project(line.pos1.get_x(), line.pos1.get_y(), line.pos1.get_z());
    drawLine(from, to, colors[line.get_color0()]);
  }
}

function drawLine(from, to, color) {
  const [r, g, b] = color;

  context.beginPath();
  context.strokeStyle = `rgb(${255 * r}, ${255 * g}, ${255 * b})`;
  context.moveTo(...from);
  context.lineTo(...to);
  context.stroke();
}


function project(x, y, z) {
  const result = vec4.transformMat4(tmpVec4, [x, y, z, 1], viewProjectionMatrix);
  const clipX = (result[0] / result[3]);
  const clipY = (result[1] / result[3]);
  return [(canvas.width / 2) * (1 + clipX), (canvas.height / 2) * (1 - clipY)];
}
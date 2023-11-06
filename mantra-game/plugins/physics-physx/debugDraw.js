// TODO: connect this as gl-matrix-min.js renderer
/*
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/3.4.2/gl-matrix-min.js"
    integrity="sha512-eV9ExyTa3b+YHr99IBTYpwk4wbgDMDlfW8uTxhywO8dWb810fGUSKDgHhEv1fAqmJT4jyYnt1iWWMW4FRxeQOQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
*/

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

/*

colors = {
        [PhysX.PxDebugColorEnum.eARGB_BLACK]: [0, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_RED]: [1, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_GREEN]: [0, 1, 0],
        [PhysX.PxDebugColorEnum.eARGB_BLUE]: [0, 0, 1],
        [PhysX.PxDebugColorEnum.eARGB_YELLOW]: [1, 1, 0],
        [PhysX.PxDebugColorEnum.eARGB_MAGENTA]: [1, 0, 1],
        [PhysX.PxDebugColorEnum.eARGB_CYAN]: [0, 1, 1],
        [PhysX.PxDebugColorEnum.eARGB_WHITE]: [1, 1, 1],
        [PhysX.PxDebugColorEnum.eARGB_GREY]: [0.5, 0.5, 0.5],
        [PhysX.PxDebugColorEnum.eARGB_DARKRED]: [0.5, 0, 0],
        [PhysX.PxDebugColorEnum.eARGB_DARKGREEN]: [0, 0.5, 0],
        [PhysX.PxDebugColorEnum.eARGB_DARKBLUE]: [0, 0, 0.5],
      };


      */
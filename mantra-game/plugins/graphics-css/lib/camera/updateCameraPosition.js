// Method to update camera position based on drag
export default function updateCameraPosition(dx, dy, isDragging) {
  let game = this.game;


  let draggingAllowed = true;

  if (typeof game.data.camera.draggingAllowed === 'boolean') {
    draggingAllowed = game.data.camera.draggingAllowed;
  }

  if (!draggingAllowed) {
    return;
  }

  // New throw is starting, cancel existing throw
  if (this.isDragging && !isDragging) {
    this.cancelThrow();
  }

  if (isDragging) {
    this.isDragging = true;
    // document.body.style.cursor = 'grabbing'; 
    // this.follow = false;
    if (typeof dx === 'number') {
      game.data.camera.offsetX += dx;
    }
    if (typeof dy === 'number') {
      game.data.camera.offsetY += dy;
    }
  }

  if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
    // console.log('THROWING', dx, dy)
    this.isThrowing = true;
    this.isDragging = false;
    // document.body.style.cursor = 'grabbing'; 


    if (Math.abs(dx) > 2) {
      this.dragInertia.x = dx * 1.6;
    }
    if (Math.abs(dy) > 2) {
      this.dragInertia.y = dy * 1.6;
    }
    requestAnimationFrame(this.applyThrow.bind(this));
  }

  if (!isDragging) {
    this.isDragging = false;
    // document.body.style.cursor = 'default'; 
  }
}

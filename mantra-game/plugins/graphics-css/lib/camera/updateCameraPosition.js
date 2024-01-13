// Method to update camera position based on drag
export default function updateCameraPosition(dx, dy, isDragging) {
  let game = this.game;

  // New throw is starting, cancel existing throw
  if (this.isDragging && !isDragging) {
    this.cancelThrow();
  }

  if (isDragging) {
    this.gameViewport.style.cursor = 'grabbing';
    this.isDragging = true;
    // this.follow = false;
    if (typeof dx === 'number') {
      game.viewportCenterXOffset += dx;
    }
    if (typeof dy === 'number') {
      game.viewportCenterYOffset += dy;
    }
  }

  if (this.isDragging && !isDragging && (dx !== 0 || dy !== 0)) {
    // console.log('THROWING', dx, dy)
    this.isThrowing = true;
    this.isDragging = false;

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
  }
}

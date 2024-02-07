export default function update() {

  let game = this.game;
  const currentPlayer = this.game.getEntity(game.currentPlayerId);

  // Current zoom level
  let currentZoom = game.data.camera.currentZoom;

  // Get browser window dimensions
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  let zoomFactor = this.game.data.camera.currentZoom;
  // console.log('zoomFactor', zoomFactor)

  if (typeof game.viewportCenterXOffset !== 'number') {
    game.viewportCenterXOffset = 0;
  }
  if (typeof game.viewportCenterYOffset !== 'number') {
    game.viewportCenterYOffset = 0;
  }

  // Update the camera position
  if (this.follow && currentPlayer && currentPlayer.position) {

    // If following a player, adjust the camera position based on the player's position and the calculated offset
    this.scene.cameraPosition.x = currentPlayer.position.x + game.viewportCenterXOffset;
    //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;

    let newY = currentPlayer.position.y + game.viewportCenterYOffset;
    //newY = newY / zoomFactor;
    if (game.data.camera.mode === 'platform') {
      // locks camera to not exceed bottom of screen for platform mode
      if (newY < windowHeight * 0.35) {
        this.scene.cameraPosition.y = newY;
      } else {
        this.scene.cameraPosition.y = windowHeight * 0.35;
      }
    } else {
      this.scene.cameraPosition.y = newY;
    }

    let adjustedPosition = {
      x: this.game.data.camera.position.x - (windowWidth / 2),
      y: this.game.data.camera.position.y - (windowHeight / 2),
    }

    adjustedPosition.x *= this.game.data.camera.currentZoom;
    adjustedPosition.y *= this.game.data.camera.currentZoom;
    // domY += game.viewportCenterYOffset / this.game.data.camera.currentZoom;

    adjustedPosition.y += game.viewportCenterYOffset / 2;

    //console.log('domX', domX, 'domY', domY)
    if (this.scene.renderDiv) {
      setTransform(this.scene.renderDiv, -adjustedPosition.x, -adjustedPosition.y, this.game.data.camera.currentZoom, 0);
    }


  } else {
    // If not following a player, use the calculated offsets directly
    this.scene.cameraPosition.x = game.viewportCenterXOffset;
    this.scene.cameraPosition.y = game.viewportCenterYOffset;
  }

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}

function setTransform(container, offsetX, offsetY, zoom, rotation) {
  // Retrieve the last applied values from the container's dataset
  const lastOffsetX = parseFloat(container.dataset.lastOffsetX) || 0;
  const lastOffsetY = parseFloat(container.dataset.lastOffsetY) || 0;
  const lastZoom = parseFloat(container.dataset.lastZoom) || 1;
  const lastRotation = parseFloat(container.dataset.lastRotation) || 0;

  // Check if the new values differ from the last applied values
  if (offsetX !== lastOffsetX || offsetY !== lastOffsetY || zoom !== lastZoom || rotation !== lastRotation) {
    // Apply the new transform only if there's a change
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`;
    // Update the container's dataset with the new values
    container.dataset.lastOffsetX = offsetX;
    container.dataset.lastOffsetY = offsetY;
    container.dataset.lastZoom = zoom;
    container.dataset.lastRotation = rotation;
  }
}

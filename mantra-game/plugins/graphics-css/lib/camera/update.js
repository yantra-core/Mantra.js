import zoom from "./zoom";

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


    //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;
    /*
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
    */


    //
    // If following the player is enabled, the camera position is always the player position
    //
    let follow = true;
    if (follow) {
      this.scene.cameraPosition.x = currentPlayer.position.x;
      this.scene.cameraPosition.y = currentPlayer.position.y;
    }

    //
    // If there are any view port offsets from dragging or scrolling
    // Adjust the camera position by these offsets
    //
    this.scene.cameraPosition.x += game.viewportCenterXOffset;
    this.scene.cameraPosition.y += game.viewportCenterYOffset;

    //
    // Find the center of the screen
    //
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    //
    // Create a new position to move the renderDiv in order to keep the camera centered
    // Based on current zoom settings
    //
    let adjustedPosition = {
      x: this.scene.cameraPosition.x - centerX,
      y: this.scene.cameraPosition.y - centerY
    };

    //
    // Apply the current zoom level to adjust the position
    //
    adjustedPosition.x *= this.game.data.camera.currentZoom;
    adjustedPosition.y *= this.game.data.camera.currentZoom;


    // TODO: now we need to recenter the adjusted position based on zoom
    // Calculate the size of the visible area in the game's world space at the current zoom level
    let visibleWidth = window.innerWidth / this.game.data.camera.currentZoom;
    let visibleHeight = window.innerHeight / this.game.data.camera.currentZoom;

    // Determine the offsets needed to center the viewport on the player in the game's world space
    let offsetX = (window.innerWidth - visibleWidth) / 2;
    let offsetY = (window.innerHeight - visibleHeight) / 2;
    offsetX = offsetX * this.game.data.camera.currentZoom;
    offsetY = offsetY * this.game.data.camera.currentZoom;
    adjustedPosition.y += offsetY;

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

import zoom from "./zoom.js";

export default function update() {

  let game = this.game;
  const currentPlayer = this.game.getEntity(game.currentPlayerId);

  // Current zoom level
  let currentZoom = game.data.camera.currentZoom;

  // Get browser window dimensions
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  // TODO: allow overrides if user has started to zoom
  if (game.data.camera.adaptiveZoom) {
    const baseWidth = game.config.width;
    const baseHeight = game.config.height;

    // Calculate the scale ratio
    let scaleX = windowWidth / baseWidth;
    let scaleY = windowHeight / baseHeight;

    // Use the smaller scale ratio to ensure the entire game is visible
    let scale = Math.min(scaleX, scaleY);

    // Set the game zoom level based on the scale
    // You might want to adjust the multiplier (e.g., 1, 1.5, etc.) based on your game's specific needs

    let scaleMultiplier = 2.5;

    if (typeof game.data.camera.scaleMultiplier === 'number') {
      scaleMultiplier = game.data.camera.scaleMultiplier;
    }

    game.setZoom(scale * scaleMultiplier); // The multiplier can be adjusted to suit the game's design
  }


  let zoomFactor = this.game.data.camera.currentZoom;
  // console.log('zoomFactor', zoomFactor)

  if (typeof game.data.camera.offsetX !== 'number') {
    game.data.camera.offsetX = 0;
  }
  if (typeof game.data.camera.offsetY !== 'number') {
    game.data.camera.offsetY = 0;
  }

  // Initialize offsets if they are not numbers
  if (typeof game.data.camera.offsetX !== 'number') {
    game.data.camera.offsetX = 0;
  }
  if (typeof game.data.camera.offsetY !== 'number') {
    game.data.camera.offsetY = 0;
  }

  // Determine the base position of the camera
  let baseX = 0, baseY = 0;

  // If following the player, set the base position to the player's position
  if (this.game.data.camera.mode === 'follow' && currentPlayer && currentPlayer.position) {
    baseX = currentPlayer.position.x;
    baseY = currentPlayer.position.y;
  }

  // Apply viewport offsets to the base position
  this.scene.cameraPosition.x = baseX + game.data.camera.offsetX;
  this.scene.cameraPosition.y = baseY + game.data.camera.offsetY;

  // Find the center of the screen
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  // Calculate the adjusted position for camera centering and zoom
  let adjustedPosition = {
    x: this.scene.cameraPosition.x - centerX,
    y: this.scene.cameraPosition.y - centerY
  };

  // Apply the current zoom level to adjust the position
  adjustedPosition.x *= this.game.data.camera.currentZoom;
  adjustedPosition.y *= this.game.data.camera.currentZoom;

  // Calculate the size of the visible area in the game's world space at the current zoom level
  let visibleWidth = window.innerWidth / this.game.data.camera.currentZoom;
  let visibleHeight = window.innerHeight / this.game.data.camera.currentZoom;

  // Determine the offsets needed to center the viewport in the game's world space
  let offsetX = (window.innerWidth - visibleWidth) / 2;
  let offsetY = (window.innerHeight - visibleHeight) / 2;

  // Apply zoom to offsets
  offsetX *= this.game.data.camera.currentZoom;
  offsetY *= this.game.data.camera.currentZoom;

  // Adjust the y position further by the offsetY to center vertically
  adjustedPosition.y += offsetY;

  // Update the transform of the renderDiv to adjust the camera view
  if (this.scene.renderDiv) {
    setTransform(this.scene.renderDiv, -adjustedPosition.x, -adjustedPosition.y, this.game.data.camera.currentZoom, 0);
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

  // Improved checks for NaN and finite numbers
  // We shouldn't get NaN at this stage; however it's better to not apply an invalid transform than to break the layout,
  // as subsequent calls may provide valid values. This issue came up in embed scenarios
  offsetX = Number.isFinite(offsetX) ? offsetX : lastOffsetX;
  offsetY = Number.isFinite(offsetY) ? offsetY : lastOffsetY;
  zoom = Number.isFinite(zoom) && zoom > 0 ? zoom : lastZoom; // Zoom should not be negative
  rotation = Number.isFinite(rotation) ? rotation : lastRotation;

  // Check if the new values differ from the last applied values
  if (offsetX !== lastOffsetX || offsetY !== lastOffsetY || zoom !== lastZoom || rotation !== lastRotation) {
    // Apply the new transform only if there's a change
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`;
    // Update the container's dataset with the new values
    container.dataset.lastOffsetX = offsetX.toString();
    container.dataset.lastOffsetY = offsetY.toString();
    container.dataset.lastZoom = zoom.toString();
    container.dataset.lastRotation = rotation.toString();
  }
}
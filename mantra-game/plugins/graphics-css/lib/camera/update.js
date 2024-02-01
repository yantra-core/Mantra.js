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

  // game.viewportCenterYOffset = 500;
  // console.log('game.viewportCenterYOffset ', game.viewportCenterYOffset )

  // console.log(zoomFactor, game.viewportCenterXOffset, game.viewportCenterYOffset)

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
    // this.scene.cameraPosition.y = newY;

  } else {
    // If not following a player, use the calculated offsets directly
    this.scene.cameraPosition.x = game.viewportCenterXOffset;
    this.scene.cameraPosition.y = game.viewportCenterYOffset;
  }

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}
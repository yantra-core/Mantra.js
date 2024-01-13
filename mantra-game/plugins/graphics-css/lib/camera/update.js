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
  //game.viewportCenterXOffset = (windowWidth / 20) / zoomFactor;
  //game.viewportCenterYOffset = (windowHeight / 2) / zoomFactor;
  if (typeof game.viewportCenterXOffset !== 'number') {
    game.viewportCenterXOffset = 0;
  }
  if (typeof game.viewportCenterYOffset !== 'number') {
    game.viewportCenterYOffset = 0;
  }

  // console.log(zoomFactor, game.viewportCenterXOffset, game.viewportCenterYOffset)

  // Update the camera position
  if (this.follow && currentPlayer && currentPlayer.position) {
    


    // If following a player, adjust the camera position based on the player's position and the calculated offset
    this.scene.cameraPosition.x = currentPlayer.position.x + game.viewportCenterXOffset;
    //this.scene.cameraPosition.x = this.scene.cameraPosition.x / zoomFactor;

    let newY = currentPlayer.position.y + game.viewportCenterYOffset;
    //newY = newY / zoomFactor;
    if (game.data.camera.mode === 'platformer') {
      // locks camera to not exceed bottom of screen for platformer mode
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

  // TODO adjust camera position based on current zoom level
  // coordinate system is both positive and negative, so we need to adjust for that
  // larger scale means smaller numbers
  // this.scene.cameraPosition.y  = this.scene.cameraPosition.y / currentZoom;
  // console.log(game.data.camera.currentZoom)

  // Update the camera's position in the game data
  this.game.data.camera.position = this.scene.cameraPosition;
}
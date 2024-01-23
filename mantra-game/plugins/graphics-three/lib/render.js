 // called as much as the client requires in order to render
export default function render(game, alpha) {
  let self = this;
  // Update the controls on each frame
  // this.controls.update();
  // Follow the player entity with the camera

  let fovEntities = new Map();
  let currentPlayer = this.game.data.currentPlayer;
  //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);
  let itemsInFov = game.getPlayerFieldOfView(currentPlayer, game.data.fieldOfView, false);

  for (let [eId, state] of this.game.entities.entries()) {
    //console.log('eId',eId, itemsInFov)
    if (game.useFoV && itemsInFov.indexOf(eId) === -1) {
      game.removeGraphic(eId);
      continue;
    }
    let ent = this.game.entities.get(eId);
    this.inflateGraphic(ent, alpha);
  }
  this.renderer.render(this.scene, this.camera);
}
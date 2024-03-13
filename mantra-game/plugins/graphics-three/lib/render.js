 // called as much as the client requires in order to render
export default function render(game, alpha) {
  let self = this;
  // Update the controls on each frame
  // this.controls.update();
  // Follow the player entity with the camera

  let fovEntities = new Map();
  let currentPlayer = this.game.data.currentPlayer;
  //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);


  if (this.game.config.useFoV) {

    let itemsInFov = game.getPlayerFieldOfView(currentPlayer, game.data.fieldOfView, false);
    // console.log('itemsInFov', itemsInFov)
  
    itemsInFov.forEach(eId => {
      let ent = this.game.entities.get(eId);
      if (ent) {
        this.inflateGraphic(ent, alpha);
      }
    });

  } else {
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateGraphic(ent, alpha);
    }
  }

  this.updateCamera();

  this.renderer.render(this.scene, this.camera);
}
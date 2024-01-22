export default function render(game, alpha) {
  // console.log('rendering', this.game.entities.size, 'entities')

  // render is called at the browser's frame rate (typically 60fps)
  let self = this;

  // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
  // This is not ideal and will yield low-entity count CSSGraphics performance
  // Best to remove camera follow for CSSGraphics if possible
  // We tried to only iterate changed entities, but this breaks camera follow
 
  let fovEntities = new Map();
  let currentPlayer = this.game.data.currentPlayer;
  //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);
  let itemsInFov = game.getPlayerFieldOfView(currentPlayer, 32, false);

  for (let [eId, state] of this.game.entities.entries()) {
    //console.log('eId',eId, itemsInFov)
    if (game.useFoV && itemsInFov.indexOf(eId) === -1) {
      game.removeGraphic(eId);
      continue;
    }
    let ent = this.game.entities.get(eId);
    this.inflateEntity(ent, alpha);
  }

}
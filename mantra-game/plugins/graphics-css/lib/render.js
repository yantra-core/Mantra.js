export default function render(game, alpha) {
  // console.log('rendering', this.game.entities.size, 'entities')

  // render is called at the browser's frame rate (typically 60fps)
  let self = this;

  // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
  // This is not ideal and will yield low-entity count CSSGraphics performance
  // Best to remove camera follow for CSSGraphics if possible
  // We tried to only iterate changed entities, but this breaks camera follow

  if (this.game.config.useFoV) {

    let fovEntities = new Map();
    let currentPlayer = this.game.data.currentPlayer;
    //let itemInFov = game.getPlayerFieldOfView(currentPlayer, 1000);
    let itemsInFov = game.getPlayerFieldOfView(currentPlayer, game.data.fieldOfView, false);
    // console.log('itemsInFov', itemsInFov)
    // TODO: we need a smart way to allow adding entities outside the field of view
    //       like UI components without having to iterate all entities  
    itemsInFov.forEach(eId => {
      let ent = this.game.entities.get(eId);
      if (ent) {
        this.inflateGraphic(ent, alpha);
      }
    });

  } else {


    // LOOP1 render loop ( cannot remove? )
    for (let [eId, state] of this.game.entities.entries()) {
      let ent = this.game.entities.get(eId);
      this.inflateGraphic(ent, alpha);
    }

  }

}



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

      // if game.config.entityEmitsViewportExitEvent is true, we need to check if the entity is in the viewport
      // Remark: This could be in a better location ( outside of graphics pipeline... )
      // This location implies CSSGraphics only for exit viewpor events, we'll want to fix that
      // More importantly, we didn't want to add to LOOP1 time complexity, so we added it here ( for now )

      // do not consider static entities for teleportation
      if (ent.isStatic !== true) {
        if (this.game.config.entityEmitsViewportExitEvent && ent && ent.position && ent.size) {
          let result = this.isEntityInViewport(ent, this.game.data.camera.currentZoom);
          if (result.inViewport) {
            // ent.emit('viewportEnter');
          } else {
            ent.screenPosition = result.adjustedPosition;
            ent.direction = result.direction;
            this.game.emit('entity::exited::viewport', ent);
          }
        }
      }

      this.inflateGraphic(ent, alpha);
    }

  }

}

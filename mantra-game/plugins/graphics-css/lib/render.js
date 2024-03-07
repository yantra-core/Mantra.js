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
      if (this.game.config.entityEmitsViewportExitEvent && ent && ent.position && ent.size) {
        let result = isEntityInViewport(ent, this.game.data.camera.currentZoom);
        // console.log(result)
        if (result.inViewport) {
          // ent.emit('viewportEnter');
        } else {
          //console.log('ent.emit', ent)
          ent.screenPosition = result.adjustedPosition;
          this.game.emit('entity::exited::viewport', ent);
        }
      }

      this.inflateGraphic(ent, alpha);
    }

  }

}
function isEntityInViewport(ent, zoomFactor) {
  let result = {};
  let inViewport = true;
  // Adjust the entity's position and size based on the zoom factor
  const adjustedPosition = {
    x: (ent.position.x * zoomFactor) + (window.innerWidth / 2),
    y: (ent.position.y * zoomFactor) + (window.innerHeight / 2)
  };
  const adjustedSize = {
    width: ent.size.width * zoomFactor,
    height: ent.size.height * zoomFactor
  };

  // Check if the adjusted entity position is within the viewport
  if (adjustedPosition.x + adjustedSize.width < 0) inViewport = false; // Left of viewport
  if (adjustedPosition.x > window.innerWidth) inViewport = false; // Right of viewport
  if (adjustedPosition.y + adjustedSize.height < 0) inViewport = false; // Above viewport
  if (adjustedPosition.y > window.innerHeight) inViewport = false; // Below viewport

  result.inViewport = inViewport;
  result.adjustedPosition = adjustedPosition;

  return result;
}


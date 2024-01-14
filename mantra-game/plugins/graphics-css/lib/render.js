export default function render(game, alpha) {
  // console.log('rendering', this.game.entities.size, 'entities')

  // render is called at the browser's frame rate (typically 60fps)
  let self = this;

  // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
  // This is not ideal and will yield low-entity count CSSGraphics performance
  // Best to remove camera follow for CSSGraphics if possible
  // We tried to only iterate changed entities, but this breaks camera follow
  /*
  for (let [eId, state] of this.game.changedEntities.entries()) {
    let ent = this.game.entities.get(eId);
    // console.log('rendering', ent)
    // do not re-inflate destroyed entities
    if (ent.destroyed !== true) {
      this.inflateEntity(ent, alpha);
    }
    // this.game.changedEntities.delete(eId);
  }
  */

  for (let [eId, state] of this.game.entities.entries()) {
    let ent = this.game.entities.get(eId);
    // console.log('rendering', ent)
    // do not re-inflate destroyed entities
    if (ent.destroyed !== true) {
      this.inflateEntity(ent, alpha);
    }
    // this.game.changedEntities.delete(eId);
  }

}
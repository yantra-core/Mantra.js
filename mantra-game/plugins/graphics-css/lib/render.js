export default function render(game, alpha) {
  // render is called at the browser's frame rate (typically 60fps)
  let self = this;
  if (this.game.changedEntities.size > 0) {
    // console.log('CHANGED', this.game.changedEntities)
  }
  // console.log('rendering', this.game.entities.size, 'entities')
  // Remark: In order for CSSCamera follow to work, we *must* iterate all entities
  // This is not ideal and will yield low-entity count CSSGraphics performance
  // Best to remove camera follow for CSSGraphics if possible
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
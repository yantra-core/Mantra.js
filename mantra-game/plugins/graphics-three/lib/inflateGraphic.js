export default function inflateEntity(entity, alpha) {

  if (entity.kind === 'building') {
    return; // for now
  }

  let graphic;
  if (entity.graphics && entity.graphics['graphics-three']) {
    graphic = entity.graphics['graphics-three'];
    if (entity.type !== 'BORDER') { // TODO: remove this
      this.updateGraphic(entity, alpha);
    }
  } else {
    graphic = this.createGraphic(entity);
    this.game.components.graphics.set([entity.id, 'graphics-three'], graphic);
  }

  if (!graphic) {
    return;
  }

  this.inflateTexture(entity, graphic);
  if (this.game.tick % 120 === 0) {
    // console.log('length', Object.keys(game.data.ents._).length)
  }

}
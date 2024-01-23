export default function inflateEntity(entity, alpha) {
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


}
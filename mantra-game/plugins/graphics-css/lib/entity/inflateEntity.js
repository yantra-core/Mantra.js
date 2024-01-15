export default function inflateEntity(entity, alpha) {
  // checks for existence of entity, performs update or create
  let graphic;
  if (entity.graphics && entity.graphics['graphics-css']) {
    graphic = this.updateGraphic(entity, alpha);
  } else {
    graphic = this.createGraphic(entity);
    this.game.components.graphics.set([entity.id, 'graphics-css'], graphic);
  }

  // TODO: don't send .destroyed=true ents?
  // after entity has been inflated, check to see if a texture should be applied
  // this will also run any animations on the entity.animations component
  if (!graphic) {
    // console.log('warning: no graphic', entity)
    return;
  }
  this.inflateTexture(entity, graphic);

}


export default function inflateEntity(entity, alpha) {
  // checks for existence of entity, performs update or create
  if (entity.graphics && entity.graphics['graphics-css']) {
    let graphic = entity.graphics['graphics-css'];
    this.updateGraphic(entity, alpha);

  } else {
    let graphic = this.createGraphic(entity);
    this.game.components.graphics.set([entity.id, 'graphics-css'], graphic);

  }
}


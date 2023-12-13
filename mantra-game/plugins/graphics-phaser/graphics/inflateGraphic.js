export default function inflateGraphic (entity) {
  let graphic;
  switch (entity.type) {
    case 'PLAYER':
      if (entity.shape === 'rectangle') {
        graphic = this.inflateBox(entity);
      } else {
        graphic = this.inflateTriangle(entity);
      }
      break;
    case 'BULLET':
      graphic = this.inflateCircle(entity);
      break;
      graphic = this.inflateTriangle(entity);
    default:
      graphic = this.inflateBox(entity); // TODO: createDefault()
  }
  this.game.components.graphics.set([entity.id, 'graphics-phaser'], graphic);
}
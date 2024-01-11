export default function removeGraphic(entityId) {
  let entity = this.game.getEntity(entityId);

  if (!entity || !entity.graphics || !entity.graphics['graphics-css']) {
    return;
  }

  let renderDiv = document.getElementById('css-render-div');
  if (renderDiv && renderDiv.contains(entity.graphics['graphics-css'])) {
    entity.graphics['graphics-css'].remove();
  }
}

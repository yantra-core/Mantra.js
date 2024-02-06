export default function unload () {

  // TODO: consolidate graphics pipeline unloading into SystemsManager
  // TODO: remove duplicated unload() code in BabylonGraphics

  this.game.graphics = this.game.graphics.filter(g => g.id !== this.id);
  delete this.game._plugins['CSSGraphics'];

  // unload the CSSCamera
  this.game.systemsManager.removeSystem('graphics-css-camera');

  // remove the wheel event listener
  // document.removeEventListener('wheel', this.cssMouseWheelZoom);
  this.mouseWheelEnabled = false;

  // iterate through all entities and remove existing css graphics
  for (let [eId, entity] of this.game.entities.entries()) {
    if (entity.graphics && entity.graphics['graphics-css']) {
      this.removeGraphic(eId);
      delete entity.graphics['graphics-css'];
    }
  }

  let div = document.getElementById('css-render-canvas');
  if (div) {
    div.remove();
  }

}
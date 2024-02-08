let minZoom = 0.1;
let maxZoom = 10;

export default function zoom(scale, transitionTime = '0s') {

  if (scale < minZoom) {
    scale = minZoom;
  }
  if (scale > maxZoom) {
    scale = maxZoom;
  }

  this.game.data.camera.currentZoom = scale;
  
}
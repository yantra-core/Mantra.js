export default function inflateGraphic(entity, alpha) {

  if (entity.kind === 'building') {
    return; // for now
  }

  if (entity.destroyed === true) {
    return;
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

}


/*
// Include the rolling animation logic// Include the rolling animation logic
if (graphic.isRolling && !graphic.rollCompleted) {
  graphic.rotation.x += 0.1; // Adjust the speed of rotation with this value
  console.log('graphic.rotation.x', graphic.rotation.x)
  // Check if the rotation has reached 0
  if (graphic.rotation.x >= 0) {
    console.log("ROLLING");

    graphic.rotation.x = 0; // Correct any overshoot
    graphic.isRolling = false;
    graphic.rollCompleted = true; // Stop the animation
  }
}
*/

// Include the fade-in animation logic with easing
/*
if (graphic.isFadingIn && !graphic.fadeCompleted) {
  graphic.progress += 0.05; // Increment progress. Adjust speed with this value.
  if (graphic.progress > 1) graphic.progress = 1; // Ensure progress doesn't exceed 1

  // Apply the easing function to the progress and then set the opacity
  graphic.material.opacity = easeInQuad(graphic.progress);

  // Check if the animation is complete
  if (graphic.progress === 1) {
    graphic.isFadingIn = false;
    graphic.fadeCompleted = true; // Stop the fade-in animation
  }
}
*/


function easeInQuad(t) {
  return t * t;
}
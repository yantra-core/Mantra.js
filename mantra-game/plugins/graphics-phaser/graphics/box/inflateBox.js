import updateBox from './updateBox.js';

export default function inflategraphic(entityData) {

  let game = this.game;
  // check to see if there is existing graphic on entity, if so, use that
  let graphic;

  if (entityData.graphics && entityData.graphics['graphics-phaser']) {
    graphic = entityData.graphics['graphics-phaser'];
  }

  if (!graphic) {
    graphic = this.createBox(entityData); // mutate graphic
    this.scene.add.existing(graphic);
  } else {
    // EXISTING GRAPHIC
    updateBox(entityData, graphic, game);
  }

  // check to see if position is the same, if so, don't redraw
  let currentGraphicsPosition = { x: graphic.x, y: graphic.y };
  let position = entityData.position;

  graphic.setPosition(position.x, position.y);

  if (entityData.rotation && typeof entityData.texture === 'undefined') {
    graphic.setRotation(entityData.rotation);
  }

  return graphic;

}
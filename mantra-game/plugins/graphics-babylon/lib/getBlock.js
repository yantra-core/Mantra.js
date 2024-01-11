export default function getBlock(entityData) {
  let game = this.game;
  let block = this.mantraPools.block.find(b => !b.isVisible);
  if (block) {
    block.isVisible = true;
    // set height and width
    block.scaling.x = entityData.width;
    block.scaling.z = entityData.height;
    block.scaling.y = entityData.width;
    // set position
    block.position = new BABYLON.Vector3(-entityData.position.x, 1, entityData.position.y);
    /* requires proper setOrigin()
    if (entityData.kind === 'BACKGROUND') {
      // set origin to bottom left
      entityData.position.x -= entityData.width / 2;
      entityData.position.y -= entityData.height / 2;
    }
    */

    // set material if game.getTexture(entityData.texture) is present
    if (game.getTexture(entityData.texture)) {
      this.apply2DTexture(block, entityData);
    } else {
      // console.log('missing block texture', entityData.texture)
    }

    return block;
  }

  return this.createBox(entityData);
  // Optional: Create new box if none are available
}
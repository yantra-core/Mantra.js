export default function apply2DTexture (graphic, entityData) {
  let material = new BABYLON.StandardMaterial("material", this.scene);
  let texture = game.getTexture(entityData.texture);
  let spritePosition = texture.sprite;

  material.diffuseTexture = new BABYLON.Texture(texture.url, this.scene);

  if (typeof spritePosition !== 'undefined') {
    // Assuming you know the sprite size and the total size of the sprite sheet
    const spriteWidth = 16 // Width of one sprite in pixels
    const spriteHeight = 16; // Height of one sprite in pixels
    const sheetWidth = 672; // Total width of the sprite sheet in pixels
    const sheetHeight = 672; // Total height of the sprite sheet in pixels
  
    // ensures positive values on sheet such that sheet starts at top left with 0,0 and spritePosition is positive
    spritePosition.x = Math.abs(spritePosition.x);
    spritePosition.y = Math.abs(spritePosition.y);
    console.log('spritePosition', spritePosition)
    // Calculate UV coordinates
    const u1 = spritePosition.x / sheetWidth;
    const v1 = spritePosition.y / sheetHeight;
    const u2 = (spritePosition.x + spriteWidth) / sheetWidth;
    const v2 = (spritePosition.y + spriteHeight) / sheetHeight;
  
    console.log('u1', u1, 'v1', v1, 'u2', u2, 'v2', v2)
    // Set the UV coordinates for the texture
    material.diffuseTexture.uScale = u2 + u1; // scaling U
    material.diffuseTexture.vScale = v2 + v1; // scaling V
    material.diffuseTexture.uOffset = u1; // offsetting U
    material.diffuseTexture.vOffset = v1; // offsetting V
  }


  graphic.material = material;
}
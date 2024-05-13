export default function inflateTexture(entityData, entityElement) {
  if (!entityData.texture) return;
  let game = this.game;

  let texture = game.getTexture(entityData.texture);
  if (!texture) {
    // console.warn('Warning: Texture not found', entityData.texture);
    return;
  }

  let { url: textureUrl, sprite: spritePosition = { x: 0, y: 0 }, frames, rate, playing = true } = texture;


  // Extract the current texture URL from the element's style
  let currentTextureUrl = entityElement.style.backgroundImage.slice(5, -2);

  // Extract the current sprite name from the data attribute
  let currentSpriteName = entityElement.getAttribute('data-texture-sprite');
  let initialTextureSet = entityElement.getAttribute('data-texture-set');
  let newSpriteName = entityData.texture.sprite;

  // Check if the texture or its sprite name has changed
  let isTextureChanged = currentTextureUrl !== textureUrl || currentSpriteName !== newSpriteName;

  // Set initial texture state only if no texture is applied or if the texture has changed
  if (initialTextureSet === null || isTextureChanged) {

    if (Array.isArray(frames) && frames.length > 0) {
      spritePosition = frames[0];
    } else if (typeof entityData.texture.frame === 'number') {
      spritePosition = frames[entityData.texture.frame];
    }

    // assign data attribute to prevent reapplying texture
    entityElement.setAttribute('data-texture-set', true);
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);

  }

  // Update frame index and position for animated sprites
  if (Array.isArray(frames) && playing) {

    if (typeof rate !== 'number') {
      rate = 30;
    }

    if (game.tick % rate === 0) { // uses configurable rate from texture.rate, see defaulAssets.js file

      let frameIndex = parseInt(entityElement.getAttribute('data-frame-index'), 10) || 0;

      // Increment frameIndex once per game tick
      frameIndex = (frameIndex + 1) % frames.length; 

      //console.log("frameIndex", frameIndex)
      let frame = frames[frameIndex];

      if (frame) {
        spritePosition = frame;
        // frameIndex = frameIndex >= frames.length - 1 ? 0 : frameIndex + 1;
        entityElement.setAttribute('data-texture-sprite', texture.sprite.name);
      }
      entityElement.setAttribute('data-frame-index', frameIndex);

      applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
    } else {
      //console.log('waiting')
    }
  } else {
    // TODO: better logic check here
    // Update the background size for non-animated textures
    // Remark: Removed 5/13/2024 - Appears not to be required?
    // applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
    // console.log('non-playing non-frame texture', entityData, entityElement)
  }

}

function applyTextureStyles(texture, element, textureUrl, spritePosition, entityData) {
  // console.log('applying texture styles', textureUrl, spritePosition, entityData, element)
  Object.assign(element.style, {
    background: `url('${textureUrl}') no-repeat ${spritePosition.x}px ${spritePosition.y}px`,
    border: 'none',
    zIndex: entityData.position.z,
    borderRadius: '0px',
    backgroundSize: (!texture.frames) ? `${entityData.width}px ${entityData.height}px` : ''
  });
}
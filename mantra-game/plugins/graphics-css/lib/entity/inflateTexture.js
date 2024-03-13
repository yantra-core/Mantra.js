export default function inflateTexture(entityData, entityElement) {
  if (!entityData.texture) return;
  let game = this.game;

  let texture = game.getTexture(entityData.texture);
  if (!texture) {
    // console.warn('Warning: Texture not found', entityData.texture);
    return;
  }


  let { url: textureUrl, sprite: spritePosition = { x: 0, y: 0 }, frames, rate, playing = true } = texture;

  //console.log('playing', playing)
  // Extract the current texture URL from the element's style
  let currentTextureUrl = entityElement.style.backgroundImage.slice(5, -2);

  // Extract the current sprite name from the data attribute
  let currentSpriteName = entityElement.getAttribute('data-texture-sprite');
  let newSpriteName = entityData.texture.sprite;

  // Check if the texture or its sprite name has changed
  let isTextureChanged = currentTextureUrl !== textureUrl || currentSpriteName !== newSpriteName;

  // Check if the element already has a texture applied
  let isTextureSet = entityElement.style.backgroundImage.includes(textureUrl);

  // Set initial texture state only if no texture is applied or if the texture has changed
  if (!isTextureSet || isTextureChanged) {
    if (Array.isArray(frames) && frames.length > 0) {
      spritePosition = frames[0];
    } else if (typeof entityData.texture.frame === 'number') {
      spritePosition = frames[entityData.texture.frame];
    }
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
  }

  // console.log("playing", entityData.type, playing, frames)
  // Update frame index and position for animated sprites
  if (Array.isArray(frames) && playing) {
    let frameIndex = parseInt(entityElement.getAttribute('data-frame-index'), 10) || 0;

    let frame = frames[frameIndex];

    if (typeof rate !== 'number') {
      rate = 30;
    }
    if (game.tick % rate === 0) { // uses configurable rate from texture.rate, see defaulAssets.js file
      if (frame) {
        spritePosition = frame;
        frameIndex = frameIndex >= frames.length - 1 ? 0 : frameIndex + 1;
        entityElement.setAttribute('data-texture-sprite', texture.sprite.name);
      }
      entityElement.setAttribute('data-frame-index', frameIndex);

      applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
    }
  } else {
    // Update the background size for non-animated textures
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
  }

}

function applyTextureStyles(texture, element, textureUrl, spritePosition, entityData) {
  Object.assign(element.style, {
    background: `url('${textureUrl}') no-repeat ${spritePosition.x}px ${spritePosition.y}px`,
    border: 'none',
    zIndex: entityData.position.z,
    borderRadius: '0px',
    backgroundSize: (!texture.frames) ? `${entityData.width}px ${entityData.height}px` : ''
  });
}
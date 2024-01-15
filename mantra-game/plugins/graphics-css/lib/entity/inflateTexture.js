export default function inflateTexture(entityData, entityElement) {
  if (!entityData.texture) return;

  let texture = game.getTexture(entityData.texture);
  if (!texture) {
    console.warn('Warning: Texture not found', entityData.texture);
    return;
  }

  let { url: textureUrl, sprite: spritePosition = { x: 0, y: 0 }, frames } = texture;

  // Check if the element already has a texture applied
  let isTextureSet = entityElement.style.backgroundImage.includes(textureUrl);

  // Set initial texture state only if no texture is applied
  if (!isTextureSet) {
    if (Array.isArray(frames) && frames.length > 0) {
      spritePosition = frames[0];
    } else if (typeof entityData.texture.frame === 'number') {
      spritePosition = frames[entityData.texture.frame];
    }
    applyTextureStyles(texture, entityElement, textureUrl, spritePosition, entityData);
  }

  // Update frame index and position for animated sprites
  if (Array.isArray(frames)) {
    let frameIndex = parseInt(entityElement.getAttribute('data-frame-index'), 10) || 0;

    if (game.tick % 30 === 0) {
      let frame = frames[frameIndex];
      if (frame) {
        spritePosition = frame;
        frameIndex = frameIndex >= frames.length - 1 ? 0 : frameIndex + 1;
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
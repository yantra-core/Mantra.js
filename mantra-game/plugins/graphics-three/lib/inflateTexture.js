export default function inflateTexture(entityData) {
  if (!entityData.texture) return;

  let game = this.game;
  let texture = game.getTexture(entityData.texture);
  if (!texture) {
    console.warn('Warning: Texture not found', entityData.texture);
    return;
  }

  let mesh = entityData.graphics['graphics-three'];
  if (!mesh) return; // Ensure the mesh exists

  return applyTextureToMesh(this.game, entityData, mesh)

  // TODO: add 2d sprite animation support
  let { url: textureUrl, sprite, frames, playing = true } = texture;

 // Function to handle sprite sheet and set appropriate UV mapping
 const handleSpriteSheet = (texture, spriteData) => {
  const tex = mesh.material.map;
  // console.log('tex', tex)
  if (tex && tex.image) {
    const textureWidth = tex.image.width;
    const textureHeight = tex.image.height;
    const uvs = {
      x: spriteData.x / textureWidth,
      y: spriteData.y / textureHeight,
      width: spriteData.width / textureWidth,
      height: spriteData.height / textureHeight
    };
    tex.repeat.set(uvs.width, uvs.height);
    tex.offset.set(uvs.x, 1 - uvs.y - uvs.height);
  }
};

  // Function to apply or update texture
  const applyOrUpdateTexture = (texUrl, spriteData) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texUrl, (loadedTexture) => {
      if (mesh.material.map && mesh.material.map.image.src === texUrl) {
        // Texture already exists, just update the sprite sheet
        if (spriteData) {
          handleSpriteSheet(loadedTexture, spriteData);
        }
      } else {
        // Apply new texture
        mesh.material.map = loadedTexture;
        mesh.material.needsUpdate = true;

        if (entityData.color) {
          const color = new THREE.Color(entityData.color);
          mesh.material.color.set(color);
        }

        if (spriteData) {
          // handleSpriteSheet(loadedTexture, spriteData);
        }
      }
    });
  };

  // Handle animated sprites
  if (Array.isArray(frames) && playing) {
    let frameIndex = entityData.texture.frame || 0;
    if (game.tick % 30 === 0) {
      let frame = frames[frameIndex];
      if (frame) {
        applyOrUpdateTexture(textureUrl, frame);
        frameIndex = (frameIndex >= frames.length - 1) ? 0 : frameIndex + 1;
        entityData.texture.frame = frameIndex;
      }
    }
  } else if (sprite) {
    // Handle static sprite sheets
    applyOrUpdateTexture(textureUrl, sprite);
  } else {
    // Handle simple textures without sprite sheets
    applyOrUpdateTexture(textureUrl);
  }
}


function applyTextureToMesh(game, entityData, mesh) {
  let texture = game.getTexture(entityData.texture);
  if (!texture) return;


  // check to see if the mesh has a texture already
  if (mesh.material.map) {
    return mesh;
  }

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(texture.url, (loadedTexture) => {
    if (texture.sprite) {
      const sprite = texture.sprite;
      const textureWidth = loadedTexture.image.width;
      const textureHeight = loadedTexture.image.height;
      sprite.width = sprite.width || 16; // Default sprite dimensions if not specified
      sprite.height = sprite.height || 16;

      const uvs = {
        x: -sprite.x / textureWidth,
        y: -sprite.y / textureHeight,
        width: sprite.width / textureWidth,
        height: sprite.height / textureHeight
      };

      loadedTexture.repeat.set(uvs.width, uvs.height);
      loadedTexture.offset.set(uvs.x, 1 - uvs.y - uvs.height);
    }

    mesh.material = new THREE.MeshBasicMaterial({
      map: loadedTexture
    });

    if (entityData.color) {
      const color = new THREE.Color(entityData.color);
      mesh.material.color.set(color);
    }
    mesh.material.needsUpdate = true;
  });
}

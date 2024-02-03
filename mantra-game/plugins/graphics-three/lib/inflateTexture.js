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


}

let texturePool = {};

async function applyTextureToMesh(game, entityData, mesh) {
  let texture = game.getTexture(entityData.texture);

  // No game texture found for entity, return mesh
  if (!texture) {
    mesh.visible = true;
    return mesh;
  }

  // If a game texture was found, but has no URL, no updates will be made, return mesh
  if (!texture.url) {
    mesh.visible = true;
    return mesh;
  }

  let cachedTexture = texturePool[texture.url];

  if (cachedTexture && cachedTexture.image && texture.sprite) {
    const sprite = texture.sprite;
    const textureWidth = cachedTexture.image.width;
    const textureHeight = cachedTexture.image.height;
    sprite.width = sprite.width || 16; // Default sprite dimensions if not specified
    sprite.height = sprite.height || 16;

    const uvs = {
      x: -sprite.x / textureWidth,
      y: -sprite.y / textureHeight,
      width: sprite.width / textureWidth,
      height: sprite.height / textureHeight
    };

    // create a clone of the cached texture
    let _cachedTexture = cachedTexture.clone();


    _cachedTexture.repeat.set(uvs.width, uvs.height);
    _cachedTexture.offset.set(uvs.x, 1 - uvs.y - uvs.height);

    mesh.material.map = _cachedTexture;
    mesh.material.needsUpdate = true;
    return mesh;
  }

  // If the texture is not cached yet, or it's a Promise (still loading), handle accordingly
  if (!cachedTexture || cachedTexture instanceof Promise) {
    if (!cachedTexture) {
      // If not cached, start loading and cache the Promise
      const textureLoader = new THREE.TextureLoader();
      // console.log("THREELOADER", textureLoader, texture.url)
      cachedTexture = texturePool[texture.url] = new Promise((resolve, reject) => {
        textureLoader.load(texture.url, resolve, undefined, reject);
      }).then(loadedTexture => {
        // Once loaded, update the cache with the actual texture and return it
        texturePool[texture.url] = loadedTexture;
        return loadedTexture;
      }).catch(error => {
        console.error('Error loading texture', texture.url, error);
        return null; // Handle errors appropriately
      });
    }
    // Await the Promise (either already existing or just created)
    cachedTexture = await cachedTexture;

  }

  // If after awaiting, the cachedTexture is null (due to error or other reasons), return
  if (!cachedTexture) {
    mesh.visible = true;
    return mesh;
  }

  // console.log("Using cached or freshly loaded texture");
  if (cachedTexture && cachedTexture.image && texture.sprite) {
    const sprite = texture.sprite;
    const textureWidth = cachedTexture.image.width;
    const textureHeight = cachedTexture.image.height;
    sprite.width = sprite.width || 16; // Default sprite dimensions if not specified
    sprite.height = sprite.height || 16;

    const uvs = {
      x: -sprite.x / textureWidth,
      y: -sprite.y / textureHeight,
      width: sprite.width / textureWidth,
      height: sprite.height / textureHeight
    };

    // create a clone of the cached texture
    let _spriteTexture = cachedTexture.clone();


    _spriteTexture.repeat.set(uvs.width, uvs.height);
    _spriteTexture.offset.set(uvs.x, 1 - uvs.y - uvs.height);


    mesh.material.map = _spriteTexture;
    mesh.material.needsUpdate = true;
  }



  // Apply the texture
  mesh.material.map = cachedTexture;
  mesh.material.needsUpdate = true;
  mesh.visible = true;

}

/*

// TODO: Better 2d sprite animation support
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

  */
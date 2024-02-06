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
  if (entityData.type === 'PLAYER') {
    // console.log('loaded player', entityData.type, texture.sprite, cachedTexture,  texture.url, texturePool[texture.url])
  }


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


  // Apply the texture
  mesh.material.map = cachedTexture;
  mesh.material.needsUpdate = true;
  mesh.visible = true;

}

async function loadTexture(url) {
  const textureLoader = new THREE.TextureLoader();
  try {
    return await new Promise((resolve, reject) => {
      textureLoader.load(url, resolve, undefined, reject);
    });
  } catch (error) {
    console.error('Error loading texture', url, error);
    return null;
  }
}

function customizeBoxUVs(geometry) {
  const uvAttribute = geometry.attributes.uv;
  const uvArray = uvAttribute.array;

  // Common UVs for all faces to cover the entire texture
  const commonUVs = [
    [0, 0], // Bottom left
    [1, 0], // Bottom right
    [1, 1], // Top right
    [0, 1]  // Top left
  ];

  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
    // Each face is two triangles, so 6 vertices in total
    const vertexIndices = [0, 1, 2, 2, 3, 0].map(v => v + faceIndex * 4);
    vertexIndices.forEach((vertexIndex, uvIndex) => {
      uvArray[vertexIndex * 2] = commonUVs[uvIndex % 4][0]; // U coordinate
      uvArray[vertexIndex * 2 + 1] = commonUVs[uvIndex % 4][1]; // V coordinate
    });
  }

  // Inform Three.js that the UVs have been updated
  uvAttribute.needsUpdate = true;
}

function getFaceUVs(texture, faceIndex) {
  // Calculate UVs based on the texture and which part of the texture you want to use for the face
  // This is a placeholder function, you need to implement the logic based on your texture layout and requirements
  // For example, you might divide the texture into sections and return UV coordinates for the section corresponding to the faceIndex
  const sectionWidth = 1 / 3; // Assuming 3x2 sections in the texture
  const sectionHeight = 1 / 2;
  const x = faceIndex % 3 * sectionWidth;
  const y = Math.floor(faceIndex / 3) * sectionHeight;

  return [
    [x, y + sectionHeight], // Bottom left
    [x + sectionWidth, y + sectionHeight], // Bottom right
    [x + sectionWidth, y], // Top right
    [x, y] // Top left
  ];
}


function customizeUVsForBox(faces) {
  // Customize UV mapping here based on your needs
  // This example divides the texture into quarters and applies each quarter to two faces of the box
  const uvCoordinates = [
    [0.5, 1], [0, 1], [0, 0.5], [0.5, 0.5], // First quarter
    [1, 1], [0.5, 1], [0.5, 0.5], [1, 0.5], // Second quarter
    // Add more for other faces, adjusting the texture coordinates accordingly
  ];

  faces.forEach((face, index) => {
    const uvIndex = Math.floor(index / 2); // Assuming two triangles per face
    const uvQuad = uvCoordinates[uvIndex];

    face.forEach((vertex, vertexIndex) => {
      const uv = uvQuad[vertexIndex];
      vertex.x = uv[0];
      vertex.y = uv[1];
    });
  });
}

/*
function customizeBoxUVs(geometry, textureWidth, textureHeight) {
  // Calculate the aspect ratio of the texture
  const textureAspectRatio = textureWidth / textureHeight;

  const uvAttribute = geometry.attributes.uv;
  const uvArray = uvAttribute.array;

  // Iterate over each face of the box
  for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      // Assuming each box face is a square, so aspect ratio is 1:1
      // If your box faces are not square, you would need to calculate the aspect ratio for each face

      // Calculate UV coordinates based on the aspect ratios
      let uMin, uMax, vMin, vMax;

      if (textureAspectRatio >= 1) {
          // Texture is wider than tall
          uMin = 0;
          uMax = 1;
          const scaleFactor = 1 / textureAspectRatio;
          vMin = (1 - scaleFactor) / 2; // Center vertically
          vMax = 1 - vMin;
      } else {
          // Texture is taller than wide
          vMin = 0;
          vMax = 1;
          const scaleFactor = textureAspectRatio;
          uMin = (1 - scaleFactor) / 2; // Center horizontally
          uMax = 1 - uMin;
      }

      // Apply calculated UVs to the current face
      // Each face is two triangles, so 6 vertices in total
      const vertexIndices = [0, 1, 2, 2, 3, 0].map(v => v + faceIndex * 4);
      const faceUVs = [
          [uMin, vMin], // Bottom left
          [uMax, vMin], // Bottom right
          [uMax, vMax], // Top right
          [uMin, vMax]  // Top left
      ];

      vertexIndices.forEach((vertexIndex, uvIndex) => {
          uvArray[vertexIndex * 2] = faceUVs[uvIndex % 4][0]; // U coordinate
          uvArray[vertexIndex * 2 + 1] = faceUVs[uvIndex % 4][1]; // V coordinate
      });
  }

*/

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
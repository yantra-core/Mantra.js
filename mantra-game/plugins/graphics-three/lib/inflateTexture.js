import { TextureLoader } from 'three';

export default async function inflateTexture(entityData) {
  if (!entityData.texture) return;

  let texture = this.game.getTexture(entityData.texture);
  if (!texture) {
    console.warn('Warning: Texture not found', entityData.texture);
    return;
  }

  // Retrieve the entity's graphic component, which could be a Mesh or a Group
  let entityGraphic = entityData.graphics['graphics-three'];
  if (!entityGraphic) return; // Ensure the entity graphic component exists

  // Apply texture to all meshes within the entity graphic component
  await applyTextureToEntityGraphic(this.game, entityData, entityGraphic);
}

async function applyTextureToEntityGraphic(game, entityData, entityGraphic) {
  let texture = game.getTexture(entityData.texture);

  if (!texture) {
    entityGraphic.visible = true; // No game texture found, ensure visibility and return
    return;
  }

  if (!texture.url) {
    entityGraphic.visible = true; // Texture has no URL, ensure visibility and return
    return;
  }

  let cachedTexture = await getCachedTexture(texture.url); // Load or get cached texture
  if (!cachedTexture) {
    entityGraphic.visible = true; // Texture failed to load, ensure visibility and return
    return;
  }

  // Traverse the entity graphic component and apply texture to all child meshes
  entityGraphic.traverse((child) => {
    if (child.isMesh) {
      applyTextureToMesh(child, cachedTexture, texture.sprite);
    }
  });
}

function applyTextureToMesh(mesh, cachedTexture, sprite) {
  // console.log("applyTextureToMesh", mesh, cachedTexture, sprite)
  if (sprite) {
    // Adjust UV mapping for sprites
    const textureWidth = cachedTexture.image.width;
    const textureHeight = cachedTexture.image.height;
    const uvs = calculateSpriteUVs(sprite, textureWidth, textureHeight);

    // Clone the cached texture to avoid altering the original cached texture
    let clonedTexture = cachedTexture.clone();
    clonedTexture.repeat.set(-uvs.width, uvs.height); // Flip texture on the X-axis by setting width to -uvs.width
    clonedTexture.offset.set(uvs.x + uvs.width, 1 - uvs.y - uvs.height); // Adjust offset for the flipped texture

    mesh.material.map = clonedTexture;
  } else {
    // For non-sprite textures that need to be flipped on the X-axis
    let clonedTexture = cachedTexture.clone();
    clonedTexture.repeat.set(-1, 1); // Flip texture on the X-axis
    clonedTexture.offset.set(1, 0); // Adjust offset for the flipped texture

    mesh.material.map = clonedTexture;
  }
  mesh.material.needsUpdate = true;
  mesh.visible = true;
}

function calculateSpriteUVs(sprite, textureWidth, textureHeight) {
  sprite.width = sprite.width || 16; // Default sprite width
  sprite.height = sprite.height || 16; // Default sprite height

  return {
    x: Math.abs(sprite.x) / textureWidth,
    y: Math.abs(sprite.y) / textureHeight,
    width: sprite.width / textureWidth,
    height: sprite.height / textureHeight
  };
}

async function getCachedTexture(url) {
  if (!texturePool[url]) {
    // If the texture is not in the pool, load and cache it
    texturePool[url] = loadTexture(url);
  }
  return texturePool[url];
}

async function loadTexture(url) {
  const textureLoader = new TextureLoader();
  try {
    return await new Promise((resolve, reject) => {
      textureLoader.load(url, resolve, undefined, reject);
    });
  } catch (error) {
    console.error('Error loading texture', url, error);
    delete texturePool[url]; // Remove failed load from cache
    return null;
  }
}

let texturePool = {}; // Texture cache

/*

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

*/
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
    const textureLoader = new TextureLoader();
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
          const color = new Color(entityData.color);
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
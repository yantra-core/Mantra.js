export default function preload(scene, game) {
  game.preloader.assets.forEach((asset) => {
    if (asset.type === 'spritesheet') {
      // Load the sprite sheet
      scene.load.spritesheet(asset.key, asset.url, {
        frameWidth: asset.frameWidth,
        frameHeight: asset.frameHeight,
      });
    } else if (asset.type === 'image') {
      // Load image assets
      scene.load.image(asset.key, asset.url);
    }
  });

  scene.load.on('complete', () => {
    game.preloader.assets.forEach((asset) => {
      if (asset.type === 'spritesheet') {
        createCustomFramesAndAnimations(scene, asset);
      }
    });
  });
}

function createCustomFramesAndAnimations(scene, asset) {
  for (let frameTagName in asset.frameTags) {
    let frameTag = asset.frameTags[frameTagName];
    let frames = frameTag.frames.map((frame, index) => {
      let frameKey = `${asset.key}-${frameTagName}-${index}`;
      console.log('scene.textures', scene.textures)
      scene.textures.get(asset.key).add(frameKey, 0, frame.x, frame.y, asset.frameWidth, asset.frameHeight);
      return { key: frameKey };
    });

    scene.anims.create({
      key: frameTagName,
      frames: frames,
      frameRate: 10,
      repeat: -1
    });
  }
}

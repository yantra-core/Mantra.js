export default function preload(scene, game) {

  // Mantra preloader should have already loaded all assets
  // Phaser preloader should hit the cache and load them from there
  game.preloader.assets.forEach((asset) => {
    if (asset.type === 'spritesheet') {
      // console.log('asset', asset)
      // console.log("asset.key, asset.url", asset.key, asset.url, asset)
      scene.load.spritesheet(asset.key, asset.url, {
        frameWidth: asset.frameWidth,// TODO: config
        frameHeight: asset.frameHeight,
        startFrame: 0, // TODO: config
        endFrame: 8
      });
    }
    if (asset.type === 'image') {
      scene.load.image(asset.key, asset.url);
    }
  });


}
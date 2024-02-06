export default class Preloader {
  constructor(game, { assets = [] } = {}) {
    this.assets = assets;
    this.totalAssetsSize = 0;
    this.loadedAssetsSize = 0;
    this.root = game.assetRoot;
    this.game = game;
  }

  getItem(key) {
    return this.assets.find(asset => asset.key === key);
  }

  addAsset(url, type, key, data = {}) {
    this.assets.push({ url, type, key, size: 0, frameWidth: data.frameWidth, frameHeight: data.frameHeight, frameTags: data.frameTags });
  }

  async loadAll() {
    let game = this.game;
    const loadPromises = this.assets.map(asset => this.loadAsset(asset));
    console.log('loading all assets', loadPromises.length)
    await Promise.all(loadPromises);
    game.emit('preloader::loaded');
  }

  async loadAsset(asset) {
    switch (asset.type) {
      case 'image':
        await this.loadImage(asset);
        asset.loaded = true;
        break;
      case 'spritesheet':
        await this.loadImage(asset);
        asset.loaded = true;
        break;

      // Other cases for different asset types
    }
  }

  async loadImage(asset) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.style.display = 'none'; // Hide the image
      img.onload = () => {
        document.body.appendChild(img); // Append to the DOM to ensure loading
        resolve();
      };
      img.onerror = () => {
        reject(`Failed to load image: ${asset.url}`);
      };
      img.src = this.root + asset.url;
    });
  }

  updateProgress(loadedSize, totalSize) {
    this.loadedAssetsSize += loadedSize;
    const progress = this.loadedAssetsSize / this.totalAssetsSize;
    game.emit('progress', progress);
  }
}

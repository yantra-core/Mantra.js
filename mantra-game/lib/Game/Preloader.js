import FBXLoader from "./Preloader/FBXLoader.js";

export default class Preloader {
  constructor(game, { assets = [] } = {}) {
    this.assets = assets;
    this.totalAssetsSize = 0;
    this.loadedAssetsSize = 0;
    this.root = game.assetRoot;
    this.game = game;
    this.loaders = {};
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
    await Promise.all(loadPromises);
    game.emit('preloader::loaded');
  }
  
  createLoader(name, handler){
    this.loaders[name] = handler;
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
      case 'model-fbx':
        let model = await this.loadModel(asset);
        asset.loaded = true;
        asset.loadedModel = model;
        break;
  
      // Other cases for different asset types
      default: 
        throw new Error('Unknown asset type: ' + asset.type);
      break;
    }
  }

  async loadModel (asset) {
    // assume three fbx ( for now )
    let model = FBXLoader(asset, this.root);
    return model;
  }

  async loadImage(asset) {
    // clonse asset
    // let asset = Object.assign({}, _asset);
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
      // only append root if asset.url is not an absolute url
      /* TODO: better handling of absolute urls
      if (!asset.url.includes('http')) {
        img.src = this.root + asset.url;
      } else {
        img.src = asset.url;
      }*/
      img.src = this.root + asset.url;
    });
  }

  updateProgress(loadedSize, totalSize) {
    this.loadedAssetsSize += loadedSize;
    const progress = this.loadedAssetsSize / this.totalAssetsSize;
    game.emit('progress', progress);
  }
}

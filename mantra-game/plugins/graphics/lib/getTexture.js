export default function getTexture(config) {
  let game = this.game;
  // returns the texture url for a given key
  // if no key is found, checks if the key is a url and returns it
  // this is useful in allowing parent APIs to still use urls as textures and bypass preloading
  // as to not require preloading of all textures

  let t;

  let assetName = config;

  // console.log('getTexture', config);

  if (typeof assetName === 'object') {
    // could be sprite sheet
    assetName = config.sheet || config.model;
  }

  // console.log('getting texture', config, assetName)

  t = game.preloader.getItem(assetName);

  if (typeof t === 'undefined') {
    return null;
  }

  if (t.loadedModel) {
    return {
      key: t.key,
      model: t.loadedModel
    };
  }

  // TODO: perform switch here based on type of entity

  if (config && typeof config.sprite !== 'undefined') {
    let spriteName = config.sprite;
    let frameIndex = 0;


    if (typeof config.frame === 'number') {
      frameIndex = config.frame;
    }

    // check to see if frameName is present in spritesheet
    if (t && t.frameTags && t.frameTags[spriteName]) {
      let sprite = t.frameTags[spriteName].frames[frameIndex];
      let rate =  t.frameTags[spriteName].rate || 30;
      sprite.name = spriteName;
      let url = game.assetRoot + t.url;
      return {
        key: t.key,
        url: url,
        // asset: t.frameTags[spriteName],
        frames: t.frameTags[spriteName].frames,
        sprite,
        rate: rate,
        playing: config.playing
      };
    }

    // sprite name is an object, check for x / y positions with width / height
    if (typeof spriteName === 'object') {
      // TODO: add check here for literal sprites unbound to a spritesheet
      let sprite = {};
      sprite.x = spriteName.x;
      sprite.y = spriteName.y;
      sprite.width = spriteName.width;
      sprite.height = spriteName.height;
      sprite.name = spriteName.name;
      let url = game.assetRoot + t.url;
      return {
        key: t.key,
        url: url,
        frames: [{ x: sprite.x, y: sprite.y }],
        sprite,
        rate: spriteName.rate || 30
      };
    }

  }

  if (t) {
    let url = game.assetRoot + t.url;
    // console.log('returning url', url)
    return {
      key: t.key,
      url: url
    };
  }
  return config;
}
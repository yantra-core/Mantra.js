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
    assetName = config.sheet;
  }

  t = game.preloader.getItem(assetName);

  if (config && typeof config.sprite !== 'undefined') {
    let spriteName = config.sprite;
    let frameIndex = 0;

    if (typeof config.frame === 'number') {
      frameIndex = config.frame;
    }

    // check to see if frameName is present in spritesheet
    if (t && t.frameTags && t.frameTags[spriteName]) {
      let sprite = t.frameTags[spriteName].frames[frameIndex];
      // t.frame = frame;
      return {
        key: t.key,
        url: t.url,
        // asset: t.frameTags[spriteName],
        frames: t.frameTags[spriteName].frames,
        sprite
      };
    }
  }

  if (t) {
    return {
      key: t.key,
      url: t.url
    };
  }
  return config;
}
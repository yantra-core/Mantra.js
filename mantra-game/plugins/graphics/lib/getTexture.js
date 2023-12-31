export default function getTexture(keyOrUrl) {
  let game = this.game;
  // returns the texture url for a given key
  // if no key is found, checks if the key is a url and returns it
  // this is useful in allowing parent APIs to still use urls as textures and bypass preloading
  // as to not require preloading of all textures

  let t;

  if (typeof keyOrUrl === 'object') {
    // could be sprite sheet
    keyOrUrl = keyOrUrl.sheet;
  }

  t = game.preloader.getItem(keyOrUrl);
  if (t) {
    return t.url;
  }
  return keyOrUrl;
}
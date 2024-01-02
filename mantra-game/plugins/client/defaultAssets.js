let defaultAssets = {
  'pixel': '/img/game/pixel.png',
  'pixel-black': '/img/game/pixel-black.png',
  'player': '/img/game/link-walk/sprite_0.png',
  'tile-block': '/img/game/tiles/tile-block.png',
  'tile-grass': '/img/game/tiles/tile-grass.png',
  'fire': '/img/game/env/loz_fire.png',
  'warp-to-platform': '/img/game/env/warp-to-platform.gif',
  'warp-to-music': '/img/game/env/warp-to-music.gif',
  'warp-to-ycraft': '/img/game/env/warp-to-ycraft.gif',
  'smb3-1-1': '/img/game/levels/smb3-1-1.png',
  '3d-homer': '/img/game/env/3d-homer.gif',
  'jogurt': {
    type: 'spritesheet',
    url: '/img/game/sheets/jogurt.png',
    frameWidth: 18,
    frameHeight: 24,
    frameTags: {
      walkDown: {
        frames: [
          { x: 0, y: 0 },
          { x: 0, y: -28 },
        ]
      },
      walkUp: {
        frames: [
          { x: -22, y: 0 },
          { x: -22, y: -28 },
        ]
      },
      walkLeft: {
        frames: [
          { x: -44, y: 0 },
          { x: -44, y: -28 },
        ]
      },
      walkRight: {
        frames: [
          { x: -70, y: -1 },
          { x: -70, y: -28 },
        ]
      },
    },
  },
  'loz_spritesheet': {
    type: 'spritesheet',
    url: '/img/game/sheets/loz_spritesheet.png',
    frameTags: {

      arrow: {
        frames: [
          { x: -16, y: -494 }
        ]
      },

      iceArrow: {
        frames: [
          { x: -160, y: -496 }
        ]
      },
      boomerang: {
        frames: [
          { x: -304, y: -496 },
          { x: -320, y: -496 },
          { x: -336, y: -496 },
          { x: -352, y: -496 },
          { x: -368, y: -496 },
          { x: -384, y: -496 },
        ]
      },
      bomb: {
        frames: [
          { x: -16, y: -544 },
          { x: -64, y: -544 },
          { x: -112, y: -544 },
          { x: -160, y: -544 },
        ]
      },

      lantern: {
        frames: [
          { x: -16, y: -512 }
        ]
      },

      fire: { 
        frames: [
          { x: -208, y: -544 },
          { x: -224, y: -544 }
        ]
      },
      sword: {
        frames: [
          { x: -448, y: -400 },
          { x: -496, y: -400 },
        ]
      },
    },
    frameWidth: 16,
    frameHeight: 16
  },
};

export default defaultAssets;


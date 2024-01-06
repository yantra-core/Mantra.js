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
  'planet-express-base': '/img/game/env/planet-express-base.png',
  'robot-arms-apartment': '/img/game/env/robot-arms-apartment.png',
  // '3d-homer': '/img/game/env/3d-homer.gif',
  'demon': '/img/game/npc/demon.gif',
  'garden': '/img/game/env/garden.png',
  'sutra-tree': '/img/game/logos/sutra-tree.png',
  'warp-to-home': '/img/game/env/warp-to-mantra-home.png',
  /*
  'raiden': {
    type: 'spritesheet',
    url: '/img/game/sheets/raiden.png',
    frameWidth: 32,
    frameHeight: 32,
    frameTags: {
      swing: {
        frames: [
          { x: 0, y: 0 },
          { x: 0, y: -32 },
        ]
      },
    },
  },
  */
  'jogurt': {
    type: 'spritesheet',
    url: '/img/game/sheets/jogurt.png',
    frameWidth: 20,
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


      ayyoKey: {
        frames: [
          { x: -640, y: -656 },
        ]
      },

      ayyoDoor: {
        frames: [
          { x: -656, y: -656 },
        ]
      },
      

      player: {
        frames: [
          { x: -592, y: -16 }
        ]
      },

      playerIdle: {
        frames: [
          { x: -16, y: -16 },
          { x: -64, y: -16 },

        ]
      },

      playerUp: {
        frames: [
          { x: -304, y: -16 },
          { x: -352, y: -16 },
        ]
      },


      playerDown: {
        frames: [
          { x: -16, y: -16 },
          { x: -64, y: -16 },
        ]
      },

      playerLeft: {
        frames: [
          { x: -208, y: -16 },
          { x: -256, y: -16 },
        ]
      },

      playerRight: {
        frames: [
          { x: -112, y: -16 },
          { x: -160, y: -16 },
        ]
      },

      playerDamage: {
        frames: [
          { x: -16, y: -592 },
          { x: -64, y: -592 },
          { x: -112, y: -592 },
          { x: -160, y: -592 },
          { x: -208, y: -592 },
          { x: -256, y: -592 },
          { x: -304, y: -592 },
          { x: -352, y: -592 },
          { x: -400, y: -592 },
          { x: -448, y: -592 },
          { x: -496, y: -592 },
        ]
      },

      playerRodDown: {
        frames: [
          { x: -496, y: -304 },
          { x: -544, y: -304 },
          { x: -592, y: -304 },
          { x: -640, y: -304 },
        ]
      },

      playerRodUp: {
        frames: [
          { x: -400, y: -352 },
          { x: -448, y: -352 },
          { x: -496, y: -352 },
          { x: -544, y: -352 },
        ]
      },

      playerRodLeft: {
        frames: [
          { x: -208, y: -352 },
          { x: -256, y: -352 },
          { x: -304, y: -352 },
          { x: -352, y: -352 },
        ]
      },

      playerRodRight: {
        frames: [
          { x: -16, y: -352 },
          { x: -64, y: -352 },
          { x: -112, y: -352 },
          { x: -160, y: -352 },
        ]
      },



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


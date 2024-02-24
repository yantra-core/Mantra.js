let defaultAssets = {
  /*
  'characterMedium': {
    type: 'model',
    url: '/game/models/characterMedium.fbx'
  },
  */
  'pixel': '/img/game/pixel.png',
  'pixel-black': '/img/game/pixel-black.png',
  'player': '/img/game/link-walk/sprite_0.png',
  'tile-block': '/img/game/tiles/tile-block.png',
  'tile-grass': '/img/game/tiles/tile-grass.png',
  'tile-bush': '/img/game/tiles/tile-bush.png',
  'tile-path-green': '/img/game/tiles/tile-path-green.png',
  'tile-path-brown': '/img/game/tiles/tile-path-brown.png',
  'tile-exit': '/img/game/tiles/tile-exit.png',
  'tile-entrance': '/img/game/tiles/tile-entrance.png',
  //'fire': '/img/game/env/loz_fire.png',
  // 'flare': '/img/game/particle/flare.png',
    //'planet-express-base': '/img/game/env/planet-express-base.png',
  // 'robot-arms-apartment': '/img/game/env/robot-arms-apartment.png',
  // '3d-homer': '/img/game/env/3d-homer.gif',
  'demon': '/img/game/npc/demon.gif',
  'warp-to-home': '/img/game/env/warp-to-mantra-home-256.png',
  'ayyo-key': '/img/game/env/ayyo-key-medium.png',
  'hexapod': '/img/game/npc/hexapod.png',
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
   'blackMage': {
    type: 'spritesheet',
    url: '/img/game/sheets/mage.png',
    frameTags: {
      mageLeft: {
        rate: 100,
        frames: [
          { x: 0, y: 0 },
          { x: -32, y: 0 },
          { x: -64, y: 0 },
        ]
      },
      playerRight: {
        frames: [
          { x: 0, y: -64 },
          { x: -32, y: -64 },
          { x: -64, y: -64 },
        ]
      },
      playerRightJump: {
        frames: [
          { x: 0, y: -192 },
        ]
      },
      playerLeftWalk: {
        rate: 16,
        frames: [
          { x: -96, y: 0 },
          { x: -128, y: 0 },
          { x: -160, y: 0 },
        ]
      },
      playerRightWalk: {
        rate: 16,
        frames: [
          { x: -96, y: -64 },
          { x: -128, y: -64 },
          { x: -160, y: -64 },
        ]
      },

      playerDownRight: {
        frames: [
          { x: -352, y: -64 },
        ]
      },

      playerDownLeft: {
        frames: [
          { x: -352, y: 0 },
        ]
      },

      mageJump: {
        rate: 100,
        frames: [
          { x: -192, y: 0 }
        ]
      }

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
        rate: 100,
        frames: [
          { x: -592, y: -16 },
          { x: -640, y: -16 },
          { x: -592, y: -16 },
          { x: -640, y: -16 },
          { x: -656, y: -16 },
          { x: -640, y: -16 },
          { x: -640, y: -16 },
          { x: -608, y: -16 },

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
        rate: 100,
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

      playerShoot: {
        frames: [
          { x: -16, y: -352 },
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
          /*
          { x: -544, y: -304 },
          { x: -592, y: -304 },
          { x: -640, y: -304 },
          */
        ]
      },

      playerRodUp: {
        frames: [
          { x: -400, y: -352 },
          /*
          { x: -448, y: -352 },
          { x: -496, y: -352 },
          { x: -544, y: -352 },
          */
        ]
      },

      playerRodLeft: {
        frames: [
          { x: -208, y: -352 },
          /*
          { x: -256, y: -352 },
          { x: -304, y: -352 },
          { x: -352, y: -352 },
          */
        ]
      },

      playerRodRight: {
        frames: [
          { x: -16, y: -352 },
          /*
          { x: -64, y: -352 },
          { x: -112, y: -352 },
          { x: -160, y: -352 },
          */
        ]
      },

      arrow: {
        frames: [
          { x: -16, y: -496 }
        ]
      },

      arrowA: {
        frames: [
          { x: 0, y: -496 }
        ]
      },

      arrowB: {
        frames: [
          { x: -32, y: -496 }
        ]
      },

      arrowC: {
        frames: [
          { x: -48, y: -496 }
        ]
      },

      arrowD: {
        frames: [
          { x: 0, y: -480 }
        ]
      },

      arrowE: {
        frames: [
          { x: -16, y: -480 }
        ]
      },

      arrowF: {
        frames: [
          { x: -32, y: -480 }
        ]
      },

      arrowG: {
        frames: [
          { x: -48, y: -480 }
        ]
      },

      arrowH: {
        frames: [
          { x: -160, y: -496 }
        ]
      },

      arrowI: {
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
        rate: 4,
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


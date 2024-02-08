export default {
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
  }
};
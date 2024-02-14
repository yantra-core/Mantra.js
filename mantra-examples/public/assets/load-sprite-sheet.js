let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'https://yantra.gg/mantra',
});

// TODO: better custom root handling
// url with no protocol will default relative to gameRoot
game.addAsset('/img/game/env/ayyo-key-medium.png', 'image', 'custom-key-texture');



let blackMage = {
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
}

// url with protocol will be absolute
game.addAsset('/img/game/sheets/mage.png', 'spritesheet', 'custom-black-mage', blackMage);

async function start () {
  await game.preloader.loadAll();
  await game.start();
  game.createBorder();
  game.setBackground('#000000');
  let entities = [];
  for (let i = 0; i < 66; i++) {
    let randomColor = game.randomColor();
    let randomFrameTagName = Object.keys(blackMage.frameTags)[Math.floor(Math.random() * Object.keys(blackMage.frameTags).length)];
    let customTexture = i % 2 === 0 ? 'custom-key-texture' : 'custom-bush-texture';
    let entity = game.createEntity({
      // color: randomColor,
      texture: {
        sheet: 'blackMage',
        sprite: randomFrameTagName,
      },
      size: {
        width: 32,
        height: 32
      },
      hasCollisionStart: true,
      position: {
        // random positions start from top left corner
        x: Math.random() * -game.width / 2,
        y: Math.random() * -game.height / 2
      }
    });
    entities.push(entity);
  }

  // simple logic to apply force to entities on each 100 ticks
  game.before('update', function () {
    if (game.tick % 100) {
      entities.forEach((entity) => {
        game.applyForce(entity.id, { x: 0.01, y: 0.01 });
      });
    }
  });

  window.game = game;
}
start();

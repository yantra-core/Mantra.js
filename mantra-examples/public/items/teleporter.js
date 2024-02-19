
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
  defaultPlayer: true,
  defaultMovement: true,
  plugins: ['Teleporter', 'Text', 'Block', 'Gamepad', 'GamepadGUI'],
});
game.start(function () {
  game.setZoom(3.5);

  game.build().Text().text('Teleport to position').width(200).position(-80, -20, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        position: { x: 0, y: 0, z: 0 }
      }
    })
    .position(-100, 0, 0)
    .createEntity();

  game.build().Text().text('Teleport to Plugin').width(200).position(-80, 70, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        plugin: 'Home'
      }
    })
    .position(-100, 50, 0)
    .createEntity();

  // block ref will contain the block.id
  let block = game.build().Block().name('a-block').position(0, 75).size(16).createEntity();
  // we can get ent by name later
  // let block = game.getEntityByName('a-block');

  game.build().Text().text('Teleport to Entity').width(200).position(120, 70, 0).createEntity();
  game.build()
    .Teleporter({
      destination: {
        entity: block.id
      }
    })
    .position(100, 50, 0).createEntity();

  game.build().Text().text('Teleport to function').width(200).position(120, -20, 0).createEntity();
  game.build()
    .Teleporter({
      // define custom teleportation behavior
      collisionStart: function (a, b, pair, context) {
        // can perform arbitrary logic here
        game.setPosition(context.target.id, {
          x: 0,
          y: 50,
          z: 0
        })
      },
    })
    .position(100, 0, 0)
    .createEntity();
});
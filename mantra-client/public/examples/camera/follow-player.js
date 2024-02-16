let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  /*
      GameConfig.camera can support a full-featured camera config or a simple string
      Set to 'follow' to enable the follow camera
  */
  camera: 'follow',
  plugins: ['Tile', 'Bullet', 'Boomerang', 'Gamepad', 'GamepadGUI'],
});
game.start(function () {

  //
  // Changes the camera mode on pointer up
  //
  game.on('pointerUp', function (event) {
    if (game.data.camera.mode === 'none') {
      game.data.camera.mode = 'follow';
    } else {
      game.data.camera.mode = 'none';
    }
    game.updateEntity(mode.id, {
      text: `Camera mode: ${game.data.camera.mode}`
    });
  });

  game.zoom(2.5);
  game.createPlayer();

  let tileMap = new game.TileMap({
    x: 0,
    y: 0,
    width: 16,
    height: 16
  });

  // file entire tilemap with grass
  // see TileSet examples for more information
  tileMap.fill(2);

  tileMap.seed(1234);

  game.systems.tile.createLayer(tileMap, 16, 16);

  // create text that says click to change camera mode
  game.createText({
    text: 'Click to change camera mode',
    size: {
      width: 500,
      height: 100
    },
    position: {
      x: 130,
      y: 0
    }
  });

  // show mode as text entity
  let mode = game.createText({
    name: 'mode',
    text: `Camera mode: ${game.data.camera.mode}`,
    size: {
      width: 500,
      height: 100
    },
    position: {
      x: 130,
      y: 50
    }
  });

});
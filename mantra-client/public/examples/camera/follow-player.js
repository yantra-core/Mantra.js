let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  defaultMovement: true,
  /*
      GameConfig.camera can support a full-featured camera config or a simple string
      Set to 'follow' to enable the follow camera
  */
  camera: 'follow',
  plugins: ['Text', 'Tile', 'Bullet', 'Boomerang', 'Gamepad', 'GamepadGUI'],
});
game.start(function () {

  //
  // Changes the camera mode on pointer up
  //

  let box = game.make().size(64).position(-200, 0).body(false).z(100).color('purple').pointerdown(function (box) {
    if (game.data.camera.mode === 'none') {
      game.data.camera.mode = 'follow';
      // set box to purple
      game.updateEntity(box.id, {
        color: 'purple'
      })
    } else {
      // set box to yellow
      game.updateEntity(box.id, {
        color: 'yellow'
      });
      game.data.camera.mode = 'none';
    }
    game.updateEntity(mode.id, {
      text: `Camera mode: ${game.data.camera.mode}`
    });
  }).createEntity();


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
  game.make().Text().text('Click Purple Box to change camera mode').size(500, 100).position(130, 0).createEntity();
  
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
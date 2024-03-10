let game = new MANTRA.Game({
  width: 400,
  height: 300,
  camera: 'follow',
  graphics: ['css'], // 'babylon', 'phaser', 'css', 'three'
  camera: 'follow',  
  plugins: [
    'Bullet',
    'Button',
    'Checkbox',
    'Container',
    'FlashMessage',
    'Player',
    'Radio',
    'RBush', // Required for Infinite Tiles
    'Select',
    'SwitchGraphics',
    'Tile',
    'TileMap'
  ]
});
window.game = game;
game.start(function () {
  // Utility function to convert the game mazes object into an array of options for the dropdown
  function getMazeOptions(mazes) {
    return Object.keys(mazes).map(key => ({ value: key, label: key }));
  }

  let container = game.make().Container()
    .position(0, 0, 1)
    .name('tilemap-container')
    .style({ display: 'none' })
    .createEntity();

  // Updated function to generate terrain using the new API
  function generateTerrain(type = 'AldousBroder', options = {}) {

    // Clear previous entities in the container
    let _container = game.getEntityByName('tilemap-container');
    if (_container && container.items) {
      container.items.forEach((eId) => {
        game.removeEntity(eId);
      });
    }

    // Set default options if not provided
    options = {
      width: 42, height: 12, depth: 1, mode: '2D', stackingMode: 'unique', seed: 1234,
      ...options
    };

    try {
      // Directly use the new generateTerrain function
      game.systems.tilemap.generateTerrain(type, options);
      console.log("Generated Terrain:", options);
    } catch (err) {
      game.systems.flash.showMessage({
        message: `Error generating terrain: ${err.message}. Try again.`,
        type: 'error',
        duration: 5000,
      });
    }
  }

  // Checkbox for "Go Infinite" toggle
  /*
  let goInfiniteCheckbox = game.make().Checkbox({
    options: [
      { value: true, label: 'Go Infinite' }
    ]
  })
    // .text('Go Infinite')
    .width(200)
    .height(50)
    .position(-153, 145, 11111)
    //.layout('left')
    .value(false)
    .afterUpdateEntity((context, event) => {
      game.systems.tile.proceduralGenerateMissingChunks = context.value;
      // Regenerate the map to apply the new setting
      let currentValue = game.getEntityByName('mazeSelector').value || 'AldousBroder';
      generateTerrain(currentValue);
    });
  goInfiniteCheckbox.createEntity();
  */
    /*
  // Radio buttons for 2D vs 3D mode
  let mode2DRadio = game.make().Radio()
    .name('mode')
    .text('2D')
    .position(10, 230, 1)
    .checked(true) // Default to 2D checked
    .change((isChecked) => {
      if (isChecked) {
        game.switchGraphics('css');
        stackingModeRadio.style({ display: 'none' }); // Hide stacking mode options
      }
    });
  mode2DRadio.createEntity();
  */
    /*
  let mode3DRadio = game.make().Radio()
    .name('mode')
    .text('3D')
    .position(60, 230, 1)
    .checked(false)
    .change((isChecked) => {
      if (isChecked) {
        game.switchGraphics('three');
        stackingModeRadio.style({ display: 'block' }); // Show stacking mode options
      }
    });
  mode3DRadio.createEntity();
  */
    /*
  // Radio buttons for selecting Stacking Mode (hidden by default)
  let stackingModeUniqueRadio = game.make().Radio()
    .name('stackingMode')
    .text('Unique')
    .position(10, 200, 1)
    .checked(true) // Default to 'Unique' checked
    .style({ display: 'none' }) // Hidden by default
    .change((isChecked) => {
      if (isChecked) {
        // Regenerate the map with 'Unique' stacking mode
        let currentValue = game.getEntityByName('mazeSelector').value || 'AldousBroder';
        generateTerrain(currentValue, { stackingMode: 'unique' });
      }
    });
  stackingModeUniqueRadio.createEntity();

  let stackingModeExtrudeRadio = game.make().Radio()
    .name('stackingMode')
    .text('Extrude')
    .position(60, 200, 1)
    .checked(false)
    .style({ display: 'none' }) // Hidden by default
    .change((isChecked) => {
      if (isChecked) {
        // Regenerate the map with 'Extrude' stacking mode
        let currentValue = game.getEntityByName('mazeSelector').value || 'AldousBroder';
        generateTerrain(currentValue, { stackingMode: 'extrude' });
      }
    });
  stackingModeExtrudeRadio.createEntity();
    */

  // Maze selection dropdown
  let mazeSelector = game.make().name('mazeSelector').Select();
  mazeSelector.meta({ options: getMazeOptions(game.mazes) });
  mazeSelector.position(-40, 130, 11111);
  mazeSelector.afterUpdateEntity((context, event) => {
    if (context && context.value !== undefined) {
      console.log('Selected Terrain:', context.value);
      generateTerrain(context.value);
    }
  });
  mazeSelector.createEntity();

  // Button to regenerate terrain
  let regenButton = game.make().Button()
    .text('Regenerate Terrain').style({ fontSize: '10px' })
    .height(30)
    .position(125, 95, 11111);
  regenButton.pointerdown(() => {
    let currentValue = game.getEntityByName('mazeSelector').value || 'AldousBroder';
    console.log('Regenerating Terrain:', currentValue);
    generateTerrain(currentValue);
  });
  regenButton.createEntity();

  // Player entity setup
  game.make().Player().position(0, 0, 16).meta({
    equippedItems: [{ plugin: 'bullet', method: 'fireBullet' }]
  }).createEntity();

  // Initial terrain generation
  generateTerrain();
});


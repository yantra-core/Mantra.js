
//
// Game and Clients
//
//import { Game } from '../mantra-game/Game.js';
import { Game } from '../mantra-game';
import plugins from '../mantra-game/plugins.js';
import worlds from '../mantra-worlds/index.js';

import GravityWell from '../mantra-game/plugins/gravitywell/GravityWell.js';
import Flame from '../mantra-game/plugins/flame/Flame.js';
import Lifetime from '../mantra-game/plugins/lifetime/Lifetime.js';
import GravityGardens from '../mantra-worlds/GravityGardens/GravityGardens.js';
import Boomerang from '../mantra-game/plugins/boomerang/Boomerang.js';
import Player from '../mantra-game/plugins/player/Player.js';
import Teleporter from '../mantra-game/plugins/teleporter/Teleporter.js';
import UnitSpawner from '../mantra-game/plugins/unit-spawner/UnitSpawner.js';
import Mouse from '../mantra-game/plugins/mouse/Mouse.js';
let game = new Game({
  width: 800,
  height: 600,
  plugins: ['Gamepad'],
  editor: true,
  graphics: ['none'], // 'three', 'babylon', 'css'
  gameRoot: '.',
  //defaultMovement: true,
  // defaultMouseMovement: false


  /*
  fps: 60,
  fieldOfView: 512,
  plugins: {},
  isClient: true,
  showLoadingScreen: true,
  minLoadTime: 220,
  mouse: true,
  gravity: {
    x: 0,
    y: 0
  },
  physics: 'matter', // 'matter', 'physx'
  graphics: ['css'], // 'ascii', 'three', 'babylon', 'css', 'phaser', 'ascii'
  collisions: true,
  gamepad: {
    useZoomSlider: false
  },
  sutra: true,
  camera: {
    follow: true,
    startingZoom: 1
  },
  defaultPlayer: false,
  */
});

//game.use(new plugins.SwitchGraphics());
//game.use(new plugins.Entity())

// game.gameConfig = TowerWorld;

window.game = game;
let home = new worlds.Platform();
home = new worlds.Home();

game.use(new plugins.Tower())
game.use(new plugins.UnitSpawner())
game.use(new plugins.Teleporter())
game.use(new plugins.Draggable())
game.use(new plugins.GravityWell())

game.use(new plugins.Player())
game.use(new plugins.Droppable())
game.use(new plugins.Block())
game.use(new plugins.RBush())
game.use(new plugins.Bullet())
game.use(new plugins.Tower())
game.use(new plugins.TileMap());
game.use(new plugins.TileSet());
game.use(new plugins.Flame());
game.use(new plugins.Label());
game.use(new plugins.Boomerang());
game.use(new plugins.Hexapod());
game.use(new plugins.Flash());

game.use(new plugins.Button());
game.use(new plugins.Select());
game.use(new plugins.Textarea());
game.use(new plugins.Input());
game.use(new plugins.Range());
game.use(new plugins.Checkbox());
game.use(new plugins.Iframe());
game.use(new plugins.Radio());
game.use(new plugins.Text());
game.use(new plugins.Image());
game.use(new plugins.Canvas());
game.use(new plugins.CSSGraphics());
game.use(new plugins.GravityWell());
game.use(new plugins.Code());
game.use(new plugins.Mouse());
   
game.use(new Mouse());
game.use(new plugins.Editor());
game.use(new Lifetime());

game.data.camera.mouseWheelZoomEnabled = true;

game.start(function () {
  game.reset();
  game.setZoom(1);

  // game.use(new plugins.ThreeGraphics());

  // game.use(new worlds.EatWorld());
  game.use(new worlds.Playground());


  //game.use(home);

  // game.make().Player().createEntity();

  // TODO: make this a helper
  // game.data.camera.mouseWheelZoomEnabled = true;
/*
  game.make().Image({
    width: 256,
    height: 256,
    src: 'https://yantra.gg/mantra/img/game/env/warp-to-mantra-home-256.png'
  }).createEntity();
  //game.use(new worlds.Maze())
  */
  // game.make().GravityWell().isStatic(true).createEntity();

  function isCanvasEmpty(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) { // Check the alpha channel; if any pixel is not fully transparent, the canvas is not empty
        return false;
      }
    }
    return true; // All pixels are fully transparent
  }

  function sliceCanvasToEnts(canvas, tileWidth, tileHeight) {
    const context = canvas.getContext('2d');
    const numRows = Math.ceil(canvas.height / tileHeight);
    const numCols = Math.ceil(canvas.width / tileWidth);

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Create a new canvas for each tile
        const tileCanvas = document.createElement('canvas');
        tileCanvas.width = tileWidth;
        tileCanvas.height = tileHeight;
        const tileContext = tileCanvas.getContext('2d');

        // Draw the image slice (from the main canvas) onto the tile canvas
        tileContext.drawImage(
          canvas,
          col * tileWidth, row * tileHeight, // Source x and y from the main canvas
          tileWidth, tileHeight, // Source width and height
          0, 0, // Destination x and y on the tile canvas
          tileWidth, tileHeight // Destination width and height on the tile canvas
        );

        let imgEnt = game.make().Image();
        // imgEnt.Hexapod();
        imgEnt.text(null);
        imgEnt.x(col * tileWidth);
        imgEnt.y(row * tileHeight);
        imgEnt.body(true);
        imgEnt.meta({
          imageData: tileCanvas
        })
        imgEnt.createEntity();

      }
    }
  }

  /*

  const image = document.getElementById('testImage');

  function processImage(image) {
    let ent = game.make().Canvas({
      meta: {
        imageData: image
      },
      style: {
        display: 'none'
      },
    }).width(image.width).height(image.height).createEntity();
    console.log('ahhhh ', ent)
    // get updated canvas component
    //let graphic = game.components.graphics.get(ent.id);
    //let canvas = graphic['graphics-css'].querySelector('canvas');
    // needs to be on the next tick to pickup graphics change
    // TODO: should be implement game.nextTick() and game.prevTick() to handle this
    // why not, ChronoControl.js
    setTimeout(function () {
      let updatedEnt = game.getEntity(ent.id);
      let graphic = updatedEnt.graphics['graphics-css'];
      let canvas = graphic.querySelector('canvas');

      console.log('updatedEnt', updatedEnt)
      sliceCanvasToEnts(canvas, 16, 16);
    }, 1)
    //

  }

  image.onload = function () {
    processImage(image);
  };

  // If the image is already loaded (e.g., cached by the browser), draw it immediately
  if (image.complete) {
    processImage(image);

  }

  */

  //game.use(new worlds.Music())
  //game.use(new worlds.Platform())
  //game.use(new worlds.YCraft())
  //game.use(new worlds.GravityGardens())
  // game.use(new worlds.Home())


  /*
    
  
  */
  // game.make().Flash().createEntity();

  //game.make().Player().createEntity();


  //game.make().Hexapod().repeat(22).offset(100, -22).createEntity();
  //game.make().Hexapod().repeat(22).offset(-22, 100).createEntity();

  // TODO: rename game.make() to game.make(), so we can use game.make() for building the game object
  // shortcuts to game.m() for make, game.b() for build

  // game.make().Player().createEntity();

  // game.m()     // make
  // game.m().b() // make and build
  // game.m().c() // create

  // game.m().Player()     // make player
  // game.m().Player().b() // make and build player
  // game.m().Player().c() // create player


  // game.make().RadialMenu().size(100).createEntity();
  // game.use(new plugins.RadialMenu());
  // game.use(new worlds.Music());
  /*
  //let f = game.make().Tower().Draggable().createEntity();
  game.make().Label({
    text: "Player 1",
    targetEntity: 1,
    offset: {
      x: 0,
      y: -100
    },
  }).createEntity();


  game.make().Flame().position(-100, 0).Label().text('hooo').createEntity();

  

  //game.use(new worlds.InfinityTower());

  /*
  let tileMap = game.make().TileMap({
    x: 0, // Remark: This will place tile map in TileMap units, not pixel
    y: 0, // Actual values will be x * 16, y * 16
    position: {
      x: -100,
      y: 0
    },
    tileMapWidth: 6,
    tileMapHeight: 4,
    tileSize: 16,
    data: [
      1, 5, 1, 1, 1, 1,
      1, 4, 2, 3, 4, 1,
      1, 4, 3, 2, 4, 1,
      1, 1, 1, 1, 5, 1,
    ]
  });

  console.log('ttt', tileMap)
  tileMap.createEntity();


  let tileSet = game.make().TileSet([
    { id: 0, texture: 'tile-block' },
    { id: 1, texture: 'tile-block' },
  ]).build();


  console.log("tileSet", tileSet.meta)

  let tileMap2 = game.make().TileMap({
    position: {
      x: 100,
      y: 0
    },
    tileSet: [
      { id: 0, texture: 'tile-block' },
      { id: 1, texture: 'tile-block' },
    ],
    x: 0, // Remark: This will place tile map in TileMap units, not pixel
    y: 0, // Actual values will be x * 16, y * 16
    width: 4,
    height: 4,
    tileSize: 16,
    data: [
      1, 1, 1, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 1, 1, 1,
    ]
  });

  console.log('ttt', tileMap2)
  tileMap2.createEntity();
  */

  /*
  //
  // Creating a TileMap can be done at the lowest-level using arrays of integers
  //
  let teleporterTile = game.make().Teleporter().build();
  let flameTile = game.make().Flame().build();
  let blockTile = game.make().Block().size(16).build();
  let exampleTileSet = [
    // voice
    { id: 0, kind: 'empty' },
    // wall
    { id: 1, kind: 'whatever', ...teleporterTile  },
    // etc
    { id: 2, kind: 'kind-is-optional', ...flameTile },
    { id: 3, kind: 'block', ...blockTile },
    { id: 4, kind: 'path-green' },
    // supports Entity Config
    { id: 5, kind: 'entrance', texture: 'tile-entrance' },
    { id: 6, kind: 'exit', texture: 'tile-exit', body: true, isStatic: true, isSensor: true }, // exit
  ];

  let tileSet = game.make().TileSet({
    tileSet: exampleTileSet
  }).build();

  let tileMap = game.make().TileMap({
    tileSet: tileSet.meta,
    position: {
      x: -400,
      y: 0
    },
    x: 2, // Remark: This will place tile map in TileMap units, not pixel
    y: 2, // Actual values will be x * 16, y * 16
    width: 4,
    height: 4,
    tileSize: 16,
    data: [
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
    ]
  });

  tileMap.createEntity();

  let tileMap2 = game.make().TileMap({
    position: {
      x: 200,
      y: 0
    },
    x: 2, // Remark: This will place tile map in TileMap units, not pixel
    y: 2, // Actual values will be x * 16, y * 16
    width: 4,
    height: 4,
    tileSize: 16,
    data: [
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
    ]
  });

  console.log('ttt', tileMap2)
  tileMap2.createEntity();
  */


  /*
  game.use(new Teleporter());
  //game.use(new plugins.Hexapod())
  game.use(new plugins.Block())
  game.use(new plugins.Text())
  game.use(new plugins.Hexapod())
  game.use(new plugins.Player())
  game.use(new plugins.Teleporter())
  game.use(new plugins.Boomerang())
  */
  /*
   function onDrop(context, event) {
     // update the position of the context entity to the dropTarget
     // mix the current colors if possible
     let colorA = context.color;
     let colorB = context.dropTarget.color;
     if (colorA && colorB) {
       console.log('colorA', colorA, 'colorB', colorB);
       let configA = game.make().color(colorA).build();
       let configB = game.make().color(colorB).build();
       let mixed = game.make().mix(configA).mix(configB).build();
       
       // check that ent exists
       let exists = game.exists(context.id);
       if (!exists) {
         // console.log('context entity does not exist');
         return;
       }
       game.updateEntity(context.id, {
         color: mixed.color,
         size: {
           width: context.size.width * 1.5,
           height: context.size.height * 1.5
         }
 
       });
     }
     game.updateEntity(context.id, {
       position: context.dropTarget.position
     });
     game.removeEntity(context.dropTarget.id);
   }
   */
  /*

  .Tower({
        fireRate: 100,
        bulletConfig: {
          texture: {
            sheet: 'loz_spritesheet',
            sprite: 'player',
          },
          velocity: {
            x: 0,
            y: 1
          },
        }
      })
      */


  //.createEntity();

  // .Droppable().onDrop(onDrop)
  // assume 24 color HSV wheel and generate all colors as int or hex whatever is easy
  /*
  for (let i = 0; i < 24; i++) {
    let conf = game.make().isStatic(false).Droppable().Draggable().position(-200 + i * 40, 0);
    conf.isSensor(true);
    console.log('conf', conf)
    // we need to generate color wheel here as int or hex
    //let color = ;
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    conf.color(color);
    conf.createEntity();
  }
  */


  /*
  droppable.pointerdown(function (context, event) {

    // fix the context ( entity ) to the pointer
    game.updateEntity(context.id, {
      update: function (entity) {
        // console.log('sup dating', game.data.mouse.position)
        //entity.position.x = event.x;
        //entity.position.y = event.y;
        game.updateEntity(entity.id, {
          position: game.data.mouse.worldPosition
        });
      }
    })
  });

  droppable.onDrop(function (context, event) {
    console.log('ddd', context.dropTarget);
  })

  droppable.pointermove(function (context, event) {
    // console.log("droppable.pointermove", context.size, context.position);

    // perform rbush search for context.position + range of context.size with small buffer
    let entsInFov = game.getPlayerFieldOfView(context, context.size.width, true);

    let selectedDropTarget = null;
    // go through all the entsInFov, pick the first which id is *not* context.id
    // and has a onDrop function
    // console.log(entsInFov)
    for (let i = 0; i < entsInFov.length; i++) {
      let ent = game.data.ents._[entsInFov[i].id]
      // console.log(ent)
      if (ent.id !== context.id && ent.onDrop && typeof ent.onDrop === 'function') {
        selectedDropTarget = ent;
        break;
      }
    }

    if (selectedDropTarget) {
      let ent = game.data.ents._[selectedDropTarget.id]
      context.dropTarget = ent;

      // TODO: add highlight to selectedDropTarget
      game.updateEntity(ent.id, {
        style: {
          border: '2px solid red'
        }
      })

      // console.log('selectedDropTarget', ent)
      context.dropTarget = ent;
      // ent.onDrop(context, event);
    }
  });


  droppable.pointerup(function (context, event) {
    // release the context ( entity ) from the pointer by clearing the update
    // TODO: this will remove all updates, we'll need to manage the wrapped fn.events array here
    //       it is already possible with current architecture, just need to implement it
    game.updateEntity(context.id, {
      update: null
    });


    if (context.dropTarget) {
      let ent = game.data.ents._[context.dropTarget.id]

      // TODO: add highlight to selectedDropTarget
      game.updateEntity(ent.id, {
        style: {
          border: '2px solid red'
        }
      })

      // console.log('selectedDropTarget', ent)
      ent.onDrop(context, event);
    }

  });
  */


  // game.use(new worlds.InfinityTower())

  //game.use(home);

  /*
    let config = game.make().Player();
    config.position(-40, 0)
    config.collisionStart(function(){
      console.log('breaks the teleport and this never fires');
    })
  
    console.log('config', config.config.collisionStart)
    let player = config.createEntity();
  
    game.setPlayerId(player.id);
  
    game.createEntity({
      position: {
        x: -60,
        y: 10
      },
      size: {
        width: 16,
        height: 16
      },
      collisionStart: function(){
        console.log('THIS CAUSES THE TELEPORTER TO STOP WORKING')
      }
      //collisionStart: true // this works
      // collisionStart: false  // this also breaks the teleporter expected, collision disabled
    })
  
    game.make().Teleporter().position(30, 10).createEntity();
  
  
    let blockConfig = game.make().Block().size(16).build();
    console.log('blockConfig', blockConfig)
    blockConfig.collisionStart = function(){
      // as soon as we add this teleporter event stops working
      console.log('testing')
    }
    game.createEntity(blockConfig)
  
  */


  // game.make().Block().clone(3).createEntity();
  //game.make().Teleporter().position(-100, 0, 0).createEntity();
  //game.make().Text().text('Teleport to position').width(200).position(0, 0, 0).createEntity();
  //game.make().Text().text('Teleport to function').width(200).position(0, 0, 0).createEntity();
  //game.make().Text().text('Teleport to Plugin').width(200).position(0, 0, 0).createEntity();

  //game.use(new GravityGardens());

  // game.use(new plugins.Border())
  //game.use(new GravityGardens());
  // //game.use(new GravityWell());
  /*
  game.use(new UnitSpawner());
  game.use(new Flame());
  */
  /*
   game.use(new Player());
   let player = game.make().Player().createEntity();
 
   game.setPlayerId(player.id);
 
   game.use(new Teleporter());
   game.setZoom(3.5);
 
   */
  /*
   game.make().Teleporter({
     destination: {
       position: {
         x: 20,
         y: 0
       }
     }
   })
   .position(-50, 50).size(32).createEntity();
 
 
   game.make().Teleporter({
     destination: {
       world: 'Home'
     }
   })
   .position(50, -50).size(32).createEntity();
 
   game.make().Teleporter({
     destination: function customTeleport (entity, gameState) {
       // console.log("CUSTOM TELEPORT");
       game.flashText('CUSTOM TELEPORT')
     }
   })
   .position(50, 50).size(32).createEntity();
   */
  // game.use(new GravityGardens());

  //game.createPlayer();
  /*
  let data = game.make()
    .GravityWell()      // build a GravityWell
    // .Flame()           // Now it's a GravityWell with Fire
    .position(20, 20) // Adjust component properties as needed
    .createEntity();  // Create the entity
    //let ent = game.make().fire().boomerang().position(100, 100).createEntity();
  */
  /*
  game.systems.blackhole.create({
    position: {
      x: -100,
      y: 0
    }
  });
  */

  /*
  game.make()
    .type('BLACKHOLE')
    .createEntity();


  */

  /*
  game.make()
    .type('BLACKHOLE')
    .createEntity();
    */

});
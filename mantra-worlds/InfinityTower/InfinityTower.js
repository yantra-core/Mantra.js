
export default class InfinityTower {
  static id = 'world-infinity-tower';
  static type = 'world';

  constructor() {
    this.id = InfinityTower.id;
  }

  preload(game) {
    game.use('Tower');
    game.use('Hexapod');
    game.use('Block');
    // game.use('Border', { autoBorder: true });
    game.use('Bullet');
    game.use('Boomerang');
    game.use('Tone');
    game.use('Tile');
    game.use('Collectable');
    game.use('RBush');
    game.use('UnitSpawner');
    game.use('Teleporter');
    game.use('Draggable');

  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {
    let game = this.game;
    game.reset();
    game.zoom(2.5);
    game.setGravity(0, 0, 0);
    game.createPlayer({
      texture: {
        sheet: 'loz_spritesheet',
        sprite: 'player',
      },
      position: {
        x: -100,
        y: 10,
        z: 1
      }
    });

    game.setBackground('#000000');


    //
    // Create initial Towers
    //
    //game.build().Tower().color('#d000ff').position(-200, -20).offset(50).repeat(5).createEntity();
    //game.build().Tower().color('purple').position(-175, -40).offset(50).repeat(4).createEntity();

    //game.build().Tower().Draggable().color('yellow').position(0, 140).createEntity();
    
    // let a = game.build().Tower().Draggable().color('yellow').position(-175, 140);



    function onDrop(context, event) {
      // update the position of the context entity to the dropTarget
      // mix the current colors if possible
      let colorA = context.color;
      let colorB = context.dropTarget.color;
      if (colorA && colorB) {
        console.log('colorA', colorA, 'colorB', colorB);
        let configA = game.build().color(colorA).build();
        let configB = game.build().color(colorB).build();
        let mixed = game.build().mix(configA).mix(configB).build();
        
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

          // increase size of entity by 1.5x
          /* Remark: why did this not work for CSSGraphics?
          */
        });
      }
      game.updateEntity(context.id, {
        position: context.dropTarget.position
      });
      game.removeEntity(context.dropTarget.id);
    }

    // assume 24 color HSV wheel and generate all colors as int or hex whatever is easy
    for (let i = 0; i < 24; i++) {
      let conf = game.build().Tower().Draggable().Droppable().onDrop(onDrop).position(-200 + i * 40, 0);
      conf.isSensor(true);
      // we need to generate color wheel here as int or hex
      //let color = ;
      let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      conf.color(color);
      conf.createEntity();
    }
    
    //
    // Left NPC Spawner
    //
    let hexapodConfigLeft = game.build().Hexapod().texture(null).radius(4).color('#007fff');
    hexapodConfigLeft.meta({
      maxUnits: 22
    });
    let unitSpawnerLeft = game.build().UnitSpawner({
      unitConfig: hexapodConfigLeft.config,
      sprayAngle: Math.PI
    }).texture(null).radius(1).color('red').position(-300, -800, 0).createEntity()

    //
    // Right NPC Spawner
    //
    let hexapodConfig = game.build().Hexapod().texture(null).radius(4).color('red');
    hexapodConfig.meta({
      maxUnits: 22
    });
    let unitSpawner = game.build().UnitSpawner({
      unitConfig: hexapodConfig.config,
    }).texture(null).radius(1).color('red').position(300, -800, 0).createEntity()

    //
    // End zone - create a solid red line that has collisionStart handler to destroy ents
    //
    let endzoneConfig = game.build().position(-80, 50, 0).color('red').isStatic(true).width(400).height(10);
    endzoneConfig.collisionStart(function (ent) {
      if (ent.type === 'HEXAPOD') {
        game.removeEntity(ent.id);
      }
    });
    endzoneConfig.createEntity();

    //
    // warp to Mantra Home World
    //
    game.build().Teleporter({
      destination: {
        world: 'Home'
      }
    }).size(64).position(-400, -100, 0).texture('warp-to-home').createEntity();
    game.createEntity({
      type: 'WARP',
      exit: {
        world: 'Home'
      },
      texture: 'warp-to-home',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: -400,
        y: -100,
        z: 0
      }
    });

    // text "Warp to Mantra"
    game.createEntity({
      type: 'TEXT',
      text: 'Warp To Mantra',
      body: false,
      // kind: 'dynamic',
      style: {
        padding: '2px',
        fontSize: '16px',
        color: '#ffffff',
        textAlign: 'center'
      },
      body: false,
      position: {
        x: -400,
        y: -120
      }
    });

  }

}
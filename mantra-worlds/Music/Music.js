class Home {
  static id = 'world-home';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Home.id;
  }

  init(game) {
    this.game = game;
    this.createWorld();
  }

  createWorld() {

    let game = this.game;


    game.setGravity(0, 4.3, 0);

    /*
    game.createEntity({
      type: 'PLATFORM',
      isStatic: true,
      width: 1000,
      height: 40,
      position: {
        x: 0,
        y: 200
      }
    });
    */

    /*
    game.createEntity({
      type: 'BLOCK',
      texture: 'tile-block',
      width: 32,
      height: 32,
      position: {
        x: -400,
        y: -150
      },
      friction: 1, 
      frictionAir: 1, 
      frictionStatic: 1
    });
    */

    game.createDefaultPlayer();

    game.use('Block')
    // game.use('Tile');
    game.use('Tone');

    game.use('Bullet')
    // game.use('Sword')

    game.use('Sutra')

    game.use('Border', { autoBorder: true })

    game.once('plugin::loaded::sutra', function(){

      let rules = game.createSutra();
      rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');
  
      game.setSutra(rules);
  
      rules.addCondition('playerTouchedWarpZone', (entity, gameState) => {
        if (entity.type === 'COLLISION') {
          // console.log('spawnUnitTouchedHomebase', entity)
          if (entity.bodyA.type === 'PLAYER' && entity.bodyB.type === 'WARP') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
          if (entity.bodyB.type === 'WARP' && entity.bodyA.type === 'PLAYER') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
        }
      });

      rules.addCondition('entityTouchedNote', (entity, gameState) => {
        if (entity.type === 'COLLISION') {
          // console.log('spawnUnitTouchedHomebase', entity)
          if (entity.bodyA.type === 'NOTE') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
          if (entity.bodyB.type === 'NOTE') {
            // console.log('spawnUnitTouchedHomebase', entity, gameState)
            return true;
          }
        }
      });

      rules
        .if('playerTouchedWarpZone')
        .then('switchWorld')

      rules.on('switchWorld', (entity) => {
        game.switchWorlds('Home');
        console.log('switchWorld', entity)
      });
 
      
      rules.on('damageEntity', (collision) => {
        let ent;
        if (collision.bodyA.type === 'FIRE') {
          ent = collision.bodyB;
        } else {
          ent = collision.bodyA;
        }
        console.log('damageEntity', ent)
        game.removeEntity(ent.id);
      });

      rules
        .if('entityTouchedNote')
        .then('playNote')

        // make this game::playNote
      rules.on('playNote', (collision) => {
        // collision.note = collision.note || 'C4';
        console.log('playNote.collision', collision.NOTE.kind, collision.NOTE.text)
        game.playNote(collision.NOTE.kind || collision.note);
      });

      console.log('created sutra', rules)

    });

    game.on('pointerDown', (entity) => {


      if (entity.type === 'NOTE') {
        game.playNote();
      }

      if (entity.type === 'FIRE') {
        game.playNote('G4');
      }

      console.log("PPPoiner down", entity)
      if (this.game.rules) {
        this.game.data.events = this.game.data.events || [];
        // console.log('adding collision to game.data.collisions', bodyA.myEntityId, entityA.type, bodyB.myEntityId, entityB.type, this.game.data.collisions.length)
        var eventContext = {
          type: 'POINTER',
          entity: entity,
        };
  
        // add entity onto the collision by type name
        //eventContext[entityA.type] = entityA;
        // eventContext[entityB.type] = entityB;
        this.game.data.events.push(eventContext);
      }

    });

    // warp to Platform level
    game.createEntity({
      type: 'WARP',
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: -600,
        y: 0
      }
    });

    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      color: 0xccff00,
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: 0,
        y: -200
      }
    });



    function createPianoRoll () {
      let keyCodes = game.systems['tone'].keyCodes;


      // for each key code object, create a new box entity with key code as text
      let i = 0;
      for (let tKey in keyCodes) {
        i++;
        let tKeyCode = keyCodes[tKey];
        let tEntity = game.createEntity({
          type: 'NOTE',
          kind: tKeyCode.toneCode,
          text: tKey,
          width: 64,
          height: 64,
          isStatic: true,
          position: {
            x: -300 + (i * 64),
            y: 200
          },
          //text: tKeyCode.keyName,
          //tone: tKeyCode.toneCode
        });
        console.log("tEntity", tEntity)
      }
      console.log("keyCodes", keyCodes)
      //game.use('GhostTyper');
      console.log(game.systems)
    }


    if (game.systems.tone) {
      createPianoRoll();
    } else{
      game.once('plugin::loaded::tone', function(){
        createPianoRoll();
      });
    }

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.use('StarField');
      game.createDefaultPlayer();
    });
    */



  }

  update() {
  }

  render() { }

  destroy() { }

}

export default Home;

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

import warpToWorld from "../sutras/warpToWorld.js";

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

    // Usage example
    const pianoConfig = {
      position: { x: -2200, y: 200 },
      width: 4096, // Total width for the piano
      height: 128 // Height of each key
    };
    createPiano(game, pianoConfig);
    // Usage example
    const drumKitConfig = {
      position: { x: 200, y: -200 } // Base position of the drum kit
    };
    createDrumKit(game, drumKitConfig);


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


    game.use('Block')
    // game.use('Tile');
    game.use('Tone');

    game.use('Bullet')
    // game.use('Sword')


    game.use('Border', { autoBorder: true })


    let rules = game.createSutra();
    rules.addCondition('isTile', (entity) => entity.type === 'BLOCK');

    let warp = warpToWorld(game);
    rules.use(warp, 'warpToWorld');


    game.setSutra(rules);



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

    /*
    // if touch note play sound
    game.createEntity({
      type: 'NOTE',
      kind: 'C4', // etc, a note as formatted for Tone.js library
      color: 0xccff00,
      width: 64,
      height: 64,
      isStatic: true,
      position: {
        x: 0,
        y: -200
      }
    });
    */

    /*

    function createPianoRoll() {
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
    } else {
      game.once('plugin::loaded::tone', function () {
        createPianoRoll();
      });
    }
    */

    /*
    game.systems.graphics.switchGraphics('BabylonGraphics', function(){
      game.use('StarField');
      game.createDefaultPlayer();
    });
    */


    game.createDefaultPlayer();

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

function createPiano(game, config) {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
  let xPosition = config.position.x;

  // Calculate key widths based on total width and number of white keys
  const totalWhiteKeys = 52; // 7 white keys per octave, 7.5 octaves
  const keyWidth = config.width / totalWhiteKeys;
  const blackKeyWidth = keyWidth / 2; // Black keys are usually narrower

  const keyHeight = config.height;

  for (let octave = 0; octave < 8; octave++) {
    whiteKeys.forEach((note, index) => {
      const key = note + octave;
      game.createEntity({
        type: 'NOTE',
        kind: key,
        color: 0xccff00, // White key color
        width: keyWidth,
        height: keyHeight,
        isStatic: true,
        position: {
          x: xPosition,
          y: config.position.y
        }
      });

      game.createEntity({
        type: 'TEXT',
        text: key,
        color: 0x000000,
        style: {
          fontSize: '16px',
          textAlign: 'center',
          zIndex: 999
        },
        body: false,
        position: {
          x: xPosition + keyWidth / 2,
          y: config.position.y + keyHeight / 3,
          z: 10
        }
      });

      xPosition += keyWidth;

      // Add black key after this white key, except after E and B
      if (note !== 'E' && note !== 'B') {
        const blackKey = blackKeys[index] + octave;
        game.createEntity({
          type: 'NOTE',
          kind: blackKey,
          color: 0xff0000, // Black key color
          width: blackKeyWidth,
          height: keyHeight,
          isStatic: true,
          style: {
            border: 'solid'
          },
          position: {
            x: xPosition - blackKeyWidth, // Position the black key in the middle of two white keys
            y: config.position.y - 20, // Slightly higher than white keys
            z: 10
          }
        });
      }
    });
  }

  // Add the last key (C8)
  game.createEntity({
    type: 'NOTE',
    kind: 'C8',
    color: 0xccff00,
    width: keyWidth,
    height: keyHeight,
    isStatic: true,
    position: {
      x: xPosition,
      y: config.position.y
    }
  });

  game.createEntity({
    type: 'TEXT',
    text: 'C8',
    color: 0x000000,
    style: {
      fontSize: '16px',
      textAlign: 'center'
    },
    body: false,
    position: {
      x: xPosition,
      y: config.position.y - 20,
      z: 64
    }
  });
}


function createDrumKit(game, config) {
  // Drum kit components with their properties
  const drumComponents = [
    { type: 'kick', color: 0x0000ff, width: 100, height: 100, position: { x: 0, y: 50 } },
    { type: 'snare', color: 0xff0000, width: 60, height: 60, position: { x: 0, y: -50 } },
    { type: 'hiHatClosed', color: 0x00ff00, width: 40, height: 40, position: { x: -60, y: -30 } },
    { type: 'hiHatOpen', color: 0x00ff00, width: 40, height: 40, position: { x: -60, y: 30 } },
    { type: 'tomLow', color: 0xffff00, width: 70, height: 70, position: { x: 70, y: -30 } },
    { type: 'tomHigh', color: 0xffff00, width: 50, height: 50, position: { x: 70, y: 30 } }
  ];

  drumComponents.forEach(drum => {
    // Adjust positions based on the config's base position
    const posX = config.position.x + drum.position.x;
    const posY = config.position.y + drum.position.y;

    game.createEntity({
      type: 'NOTE',
      kind: drum.type,
      color: drum.color,
      width: drum.width,
      height: drum.height,
      isStatic: true,
      position: {
        x: posX,
        y: posY
      }
    });

    game.createEntity({
      type: 'TEXT',
      text: drum.type,
      color: 0x000000,
      style: {
        fontSize: '16px',
        textAlign: 'center',
        zIndex: 999
      },
      body: false,
      position: {
        x: posX,
        y: posY - drum.height / 3,
        z: 999
      }
    });
  });
}


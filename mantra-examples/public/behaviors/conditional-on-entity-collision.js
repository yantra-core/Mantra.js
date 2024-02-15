// TODO: add flash on collision
let game = new MANTRA.Game({
  defaultMovement: true,
  plugins: ['Tone', 'Gamepad', 'GamepadGUI'], // rename VirtualGamepad
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
  gameRoot: 'http://192.168.1.80:7777/'
});

game.start(function () {
  game.setBackground('#000000');
  game.zoom(2.5);
  game.createPlayer();
  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire',
    },
    width: 16,
    height: 16,
    depth: 16,
    isStatic: true,
    position: {
      x: -80,
      y: -60,
      z: 16
    }
  });

  game.createEntity({
    type: 'FIRE',
    texture: {
      sheet: 'loz_spritesheet',
      sprite: 'fire',
    },
    width: 16,
    height: 16,
    depth: 16,
    isStatic: true,
    position: {
      x: 80,
      y: -60,
      z: 16
    }
  });

  // create text, do not walk into fire
  game.createText({
    width: 310,
    height: 50,
    color: 0xffffff,
    text: `Do not walk into the fire`,
    position: {
      x: 80,
      y: 0
    },
    style: {
      backgroundColor: 'black',
      fontSize: '14px',
    },
  })

  game.rules.addCondition('entityTouchedFire', (entity, gameState) => {
    if (entity.type === 'COLLISION' && entity.kind === 'START') {
      if (entity.bodyA.type === 'FIRE') {
        return true;
      }
      if (entity.bodyB.type === 'FIRE') {
        return true;
      }
    }
  });

  game.rules
   .if('entityTouchedFire')
   .then('playNote', {
     note: 'F#4'
   })
   .then('damageEntity');

  game.rules.on('playNote' , (event) => {
    game.playNote(event.note);
  })

  game.rules.on('damageEntity', (collision) => {
    let ent;
    if (collision.bodyA.type === 'FIRE') {
      ent = collision.bodyB;
    } else {
      ent = collision.bodyA;
    }
    // applyForce to the ent in opposite direction of current velocity
    game.applyForce(ent.id, {
      x: -ent.velocity.x * 5,
      y: -ent.velocity.y * 5
    });
  });

  // TODO: move pointerDown event into Sutra
  game.on('pointerDown', (entity, ev) => {
    if (entity.type === 'FIRE') {
      game.playNote('G4');
    }
  });



});
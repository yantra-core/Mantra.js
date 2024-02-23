// TODO: add flash on collision
let game = new MANTRA.Game({
  defaultMovement: true,
  plugins: ['Text', 'Flame', 'Tone', 'Gamepad'],
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three'
});

game.start(function () {

  // overrides default movement
  game.config.mouseMovementButton = 'LEFT';

  game.setBackground('#000000');
  game.zoom(2.5);
  game.createPlayer();
 
  // creates (3) flames
  game.make().Flame().position(-80, -60, 16).createEntity();
  game.make().Flame().position(80, -60, 16).createEntity();
  game.make().Flame().position(0, 60, 16).createEntity();

  // Create text instructions
  let text = game.make().Text().width(310).position(80, -40).text('Do not walk into the fire');
  text.style({
    backgroundColor: 'black',
    color: 'white',
    fontSize: '14px',
  });
  
  text.createEntity();

  // instructions to move, click mouse, or use WASD or USB Gamepad
  let inputText = game.make().Text().position(170, 20).text('Move with mouse, WASD, or USB Gamepad');
  inputText.width(600);
  inputText.style({
    backgroundColor: 'black',
    color: 'white',
    fontSize: '14px',
  });

  inputText.createEntity();

  /*
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
  */

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
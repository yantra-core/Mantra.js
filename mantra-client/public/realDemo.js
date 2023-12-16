
document.addEventListener('DOMContentLoaded', async (event) => {

  /*
  let roverLightSystem = RS.createContraption({
    powerRequired: false
  });

  // Create the buttons
  let button = new RS.Button(-150, -200, 0);
  let button2 = new RS.Button(150, -200, 0);

  // Create the LED lights
  let ledLight1 = new RS.LEDLight(-200, 250, 0);
  let ledLight2 = new RS.LEDLight(0, 250, 0);
  let ledLight3 = new RS.LEDLight(200, 250, 0);

  // Create the Rover
  let redRover = new RS.Rover(0, -200, 0, {
    color: 0xff0000,
    velocity: { x: -20, y: 0 }
  });

  // Create wires for each button
  let wire1 = new RS.Wire();
  let wire2 = new RS.Wire();

  // Connect the first button to the first and second LED lights
  button.connect(wire1);
  wire1.connect(ledLight1);
  wire1.connect(ledLight2);
  wire1.connect(ledLight3);

  // Connect the second button to the third LED light
  button2.connect(wire2);
  //wire2.connect(ledLight1);
  //wire2.connect(ledLight2);
  wire2.connect(ledLight3);

  // Add components to RealStone system
  roverLightSystem.addPart(button);
  roverLightSystem.addPart(button2);
  roverLightSystem.addPart(wire1);
  roverLightSystem.addPart(wire2);
  roverLightSystem.addPart(ledLight1);
  roverLightSystem.addPart(ledLight2);
  roverLightSystem.addPart(ledLight3);
  roverLightSystem.addPart(redRover);

  // Start moving the Rover
  redRover.startMoving();
  */

  //return realStoneSystem;

  let game = new MANTRA.Game({
    physics: 'matter', // enum, 'physx', 'matter
    collisions: true,
    graphics: ['phaser'], // array enum, 'babylon', 'phaser', 'css', 'three'
    camera: 'follow',
    options: {
      scriptRoot: './'
    }
  });
  game.start(function(){
    document.addEventListener('click', function (e) {
      // check to see if we are inside an input, textarea, button or submit
      // if so, disable inputs controls
      let target = e.target;
      let tagName = target.tagName.toLowerCase();
      let type = target.type;
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'button' || tagName === 'submit') {
        game.systems['entity-input'].disableInputs();
        game.systems['keyboard'].unbindAllEvents();
      } else {
        game.systems['entity-input'].setInputsActive();
        game.systems['keyboard'].bindInputControls();
      }
    });  
  });
  game.use('Bullet');
  window.game = game;

  /*
  */
  // disable inputs



});

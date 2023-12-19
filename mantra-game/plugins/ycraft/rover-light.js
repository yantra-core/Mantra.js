import { YCraft, Button, LEDLight, Wire, Rover } from '../../../../YCraft.js/index.js';

export default function buttonLight() {
  let yCraftSystem = new YCraft({
    powerRequired: false
  });

  // Create the buttons
  let button = new Button(-150, -200, 0);
  let button2 = new Button(150, -200, 0);

  // Create the LED lights
  let ledLight1 = new LEDLight(-200, 250, 0);
  let ledLight2 = new LEDLight(0, 250, 0);
  let ledLight3 = new LEDLight(200, 250, 0);

  // Create the Rover
  let redRover = new Rover(0, -200, 0, {
    color: 0xff0000,
    velocity: { x: -2, y: 0 }
  });

  // Create wires for each button
  let wire1 = new Wire();
  let wire2 = new Wire();

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

  // Add parts to YCraft system
  yCraftSystem.addPart(button);
  yCraftSystem.addPart(button2);
  yCraftSystem.addPart(wire1);
  yCraftSystem.addPart(wire2);
  yCraftSystem.addPart(ledLight1);
  yCraftSystem.addPart(ledLight2);
  yCraftSystem.addPart(ledLight3);
  yCraftSystem.addPart(redRover);

  // Start moving the Rover
  redRover.startMoving();

  return yCraftSystem;
}

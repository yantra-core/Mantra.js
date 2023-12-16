import { RealStone, Button, LEDLight, Wire, Rover } from '../../../../RealStone/index.js';

export default function buttonLight() {
  let realStoneSystem = new RealStone({
    powerRequired: false // default is false, set to true to enforce power requirements
  });

  // Create the button
  let button = new Button(0, -350, 0); // Positioned a bit below in the center

  // Create three LED lights and position them on the top row
  let ledLight1 = new LEDLight(-200, 250, 0); // First light
  let ledLight2 = new LEDLight(0, 250, 0); // Second light, in the middle
  let ledLight3 = new LEDLight(200, 250, 0); // Third light

  // Create wires to connect each LED light to the button
  let wire = new Wire();

  // Connect button to each wire, and each wire to corresponding LED light
  button.connect(wire);
  wire.connect(ledLight1);
  button.connect(wire);
  wire.connect(ledLight2);
  button.connect(wire);
  wire.connect(ledLight3);

  // Add components to RealStone system
  realStoneSystem.addPart(button);
  realStoneSystem.addPart(wire);
  realStoneSystem.addPart(ledLight1);
  realStoneSystem.addPart(ledLight2);
  realStoneSystem.addPart(ledLight3);

  // Simulate pressing the button
  // button.press();
  return realStoneSystem;
}

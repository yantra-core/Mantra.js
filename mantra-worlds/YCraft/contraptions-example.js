// import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from 'ycraft';
import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from '../../../YCraft.js/index.js'

export default function createColorPuzzle() {

  let exampleA = new YCraft(0, 0, 0, {
    description: "Simple Light",
    height: 100,
    width: 125
  });

  // Updated positions
  let button0 = new Button(25, 15, 0);
  let latch0 = new Latch(25, 65, 0);
  let light0 = new LEDLight(75, 15, 200, { wattage: 60, height: 250, width: 250 });

  button0.connect(light0);
  latch0.connect(light0);

  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);

  let exampleB = new YCraft(0, 140, 0, {
    description: "Wired Light",
    height: 120,
    width: 200
  });

  let wire1 = new Wire();
  let wire2 = new Wire();
  let button1 = new Button(25, 25, 0); // moved from (0, 0)
  let latch1 = new Latch(25, 75, 0);   // moved from (0, 37.5)
  let relay1 = new Relay(75, 50, 0);   // moved from (37.5, 18.75)
  let light1 = new LEDLight(125, 50, 100, { wattage: 60, height: 250, width: 250 }); // moved from (75, 18.75)

  button1.connect(wire1);
  latch1.connect(wire1);
  wire1.connect(relay1);
  relay1.connect(wire2);
  wire2.connect(light1);

  exampleB.addPart(light1);
  exampleB.addPart(button1);
  exampleB.addPart(latch1);
  exampleB.addPart(relay1);
  exampleB.addPart(wire1);
  exampleB.addPart(wire2);

  let examples = new YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);
  return examples;
}

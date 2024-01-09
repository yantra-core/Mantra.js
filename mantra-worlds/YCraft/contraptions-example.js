import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from 'ycraft';
//import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine, Rover } from '../../../YCraft.js/index.js'

export default function createColorPuzzle() {

  // simple light
  let exampleA = new YCraft(0, 0, 0, {
    description: "Simple Light",
    height: 100,
    width: 125
  });

  // Updated positions
  let button0 = new Button(25, 15, 0);
  let latch0 = new Latch(25, 65, 0);
  let light0 = new LEDLight(75, 15, 25, { wattage: 60, height: 250, width: 250 });

  button0.connect(light0);
  latch0.connect(light0);

  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);

  // wired light
  let exampleB = new YCraft(0, 140, 0, {
    description: "Wired Light",
    height: 120,
    width: 200
  });

  let wire1 = new Wire();
  let wire2 = new Wire();
  let button1 = new Button(25, 25, 1); // moved from (0, 0)
  let latch1 = new Latch(25, 75, 1);   // moved from (0, 37.5)
  let relay1 = new Relay(75, 50, 0);   // moved from (37.5, 18.75)
  let light1 = new LEDLight(125, 50, 25, { wattage: 60, height: 250, width: 250 }); // moved from (75, 18.75)

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


  // pressure sensor wire

  let exampleC = new YCraft(0, 280, 0, {
    description: "Pressure Sensor Wire",
    height: 120,
    width: 200
  });

  let pressureSensor = new PressureSensor(25, 25, 1);
  let wire3 = new Wire();
  let light2 = new LEDLight(125, 25, 25, { wattage: 60, height: 250, width: 250 });

  pressureSensor.connect(wire3);
  wire3.connect(light2);

  exampleC.addPart(pressureSensor);
  exampleC.addPart(wire3);
  exampleC.addPart(light2);


  /*
    const motionDetector = new MotionDetector(-150, -250, 0); // Position at top-left
  const pressureSensor = new PressureSensor(150, -250, 0); // Next to the Motion Detector
  const actuator = new Actuator(450, -250, 0); // Positioned appropriately
  const securityLight = new LEDLight(450, 0, 0, { wattage: 60 }); // Near bottom-right
  const manualOverrideButton = new Button(50, 450, 0); // Near bottom-left

  // Connect components to the Actuator
  motionDetector.connect(actuator);
  pressureSensor.connect(actuator);
  manualOverrideButton.connect(actuator);

  // Connect Actuator to the Security Light
  actuator.connect(securityLight);

  // Add parts to YCraft system
  yCraftSystem.addPart(motionDetector);
  yCraftSystem.addPart(pressureSensor);
  yCraftSystem.addPart(securityLight);
  yCraftSystem.addPart(manualOverrideButton);
  yCraftSystem.addPart(actuator);
  */

  // security system
  let exampleD = new YCraft(210, 140, 0, {
    description: "Security System",
    height: 120,
    width: 200
  });

  let motionDetector2 = new MotionDetector(25, 25, 0);
  let pressureSensor2 = new PressureSensor(25, 75, 0);
  let actuator2 = new Actuator(125, 50, 0);
  let light3 = new LEDLight(175, 50, 25, { wattage: 60, height: 250, width: 250 });
  let button2 = new Button(25, 125, 0);

  motionDetector2.connect(actuator2);
  pressureSensor2.connect(actuator2);
  button2.connect(actuator2);
  actuator2.connect(light3);

  exampleD.addPart(motionDetector2);
  exampleD.addPart(pressureSensor2);
  exampleD.addPart(actuator2);
  exampleD.addPart(light3);
  exampleD.addPart(button2);




  let examples = new YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);
  examples.addContraption(exampleC);
  examples.addContraption(exampleD);

  let rover = roverLight(-145, 145, 0);
  examples.addContraption(rover);
  return examples;
}

function roverLight(x, y, z) {

  let contraption = new YCraft(x, y, z, {
    description: "Rover Light",
    powerRequired: false
  });

  // Create the latchs
let latch = new Latch(25, 25, 2);
  let latch2 = new Latch(100, 25, 2);

  // Create the LED lights
  let ledLight1 = new LEDLight(0, 100, 1);
  let ledLight2 = new LEDLight(50, 100, 1);
  let ledLight3 = new LEDLight(100, 100, 1);

  // Create the Rover
  let redRover = new Rover(50, 25, 0, {
    color: 0xff0000,
    velocity: { x: -2, y: 0 }
  });

  // Create wires for each latch
  let wire1 = new Wire();
  let wire2 = new Wire();

  contraption.addPart(redRover);

  // Connect the first latch to the first and second LED lights
  latch.connect(wire1);
  wire1.connect(ledLight1);
  wire1.connect(ledLight2);
  wire1.connect(ledLight3);

  // Connect the second latch to the third LED light
  latch2.connect(wire2);
  //wire2.connect(ledLight1);
  //wire2.connect(ledLight2);
  wire2.connect(ledLight3);

  // Add parts to YCraft system
  contraption.addPart(latch);
  contraption.addPart(latch2);
  contraption.addPart(wire1);
  contraption.addPart(wire2);
  contraption.addPart(ledLight1);
  contraption.addPart(ledLight2);
  contraption.addPart(ledLight3);

  contraption.onAny((event, data) => {
    // console.log(event, data);
  });

  // Start moving the Rover
  // Since no collision system is being used, the Rover will move through the LED lights without triggering them
  redRover.start();
  return contraption;

}
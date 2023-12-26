import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from 'ycraft';
//import { YCraft, Button, Display, Latch, LEDLight, Relay, Wire, Actuator, MotionDetector, PressureSensor, VirtualMachine } from '../../../../YCraft.js/index.js';

export default function createColorPuzzle() {

  /*
  let pressureSensorRed = new PressureSensor(-150, -150, 0, {
    color: 0xff0000
  });
  let pressureSensorGreen = new PressureSensor(150, -150, 0, {
    color: 0x00ff00
  });
  */

  let exampleA = new YCraft(0, 150, 0, {
    description: "Simple Light",
    height: 350,
    width: 800
  });

  // TODO: new Box() ?
  let button0 = new Button(-100, -150, 0);
  let latch0 = new Latch(-100, 0, 0);
  let light0 = new LEDLight(100, -75, 200, { wattage: 60, height: 250, width: 250 });

  button0.connect(light0);
  latch0.connect(light0);

  exampleA.addPart(light0);
  exampleA.addPart(button0);
  exampleA.addPart(latch0);

  
  // TODO: render contraptions backgrounds in CSSGraphics, ect
  let exampleB = new YCraft(0, 600, 0, {
    description: "Wired Light",
    height: 400,
    width: 800
  });


  let wire1 = new Wire();
  let wire2 = new Wire();
  let button1 = new Button(-150, -150, 0);
  let latch1 = new Latch(-150, 0, 0);
  let relay1 = new Relay(0, -75, 0);
  let light1 = new LEDLight(150, -75, 800, { wattage: 60, height: 250, width: 250 });

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

  /*


  - [x] Wire
  - [x] Power Supply
  - [x] Relay
  - [x] Amplifier
  - [x] LED Light
  - [x] Button
  - [x] Latch
  - [x] Pressure Sensor
  - [x] Motion Detector
  - [x] Actuator
  - [x] Rover

*/





  /*
  let display = new Display(400, 200, 0);
  display.setText('Hello World');
  let vm = new VirtualMachine(-300, -300);

  vm.setImage(function(signal){
    // alert('got it')
    console.log('processing signal', signal)
    // TODO: check if object colliding with pressure sensor is block of correct color
    // TODO: move this into Sutra
    return signal;
  })

  pressureSensorRed.connect(vm);
  pressureSensorGreen.connect(vm);
  vm.connect(light);
  */
  // button0.connect(light);

  //exampleA.addPart(pressureSensorRed);
  //exampleA.addPart(pressureSensorGreen);


  let examples = new YCraft();
  examples.addContraption(exampleA);
  examples.addContraption(exampleB);

  return examples;

}

function createSecuritySystem() {
  const yCraftSystem = new YCraft();

  // Initialize and position components
  const motionDetector = new MotionDetector(-150, -150, 0);
  const pressureSensor = new PressureSensor(150, -150, 0);
  const actuator = new Actuator(450, -250, 0);
  const securityLight = new LEDLight(450, 0, 200, { wattage: 60 });
  const manualOverrideButton = new Button(50, 200, 0);

  // Initialize wires
  const wireFromMotionDetector = new Wire();
  const wireFromPressureSensor = new Wire();
  const wireFromButton = new Wire();
  const wireToLight = new Wire();

  // Connect components with wires
  motionDetector.connect(wireFromMotionDetector);
  wireFromMotionDetector.connect(actuator);

  pressureSensor.connect(wireFromPressureSensor);
  wireFromPressureSensor.connect(actuator);

  manualOverrideButton.connect(wireFromButton);
  wireFromButton.connect(actuator);

  actuator.connect(wireToLight);
  wireToLight.connect(securityLight);

  // Add components and wires to YCraft system
  yCraftSystem.addPart(motionDetector);
  yCraftSystem.addPart(pressureSensor);
  yCraftSystem.addPart(securityLight);
  yCraftSystem.addPart(manualOverrideButton);
  yCraftSystem.addPart(actuator);
  yCraftSystem.addPart(wireFromMotionDetector);
  yCraftSystem.addPart(wireFromPressureSensor);
  yCraftSystem.addPart(wireFromButton);
  yCraftSystem.addPart(wireToLight);

  // Simulate interactions
  // motionDetector.detectMotion(); // Simulate motion detection

  // Logging the system state
  console.log(yCraftSystem);

  return yCraftSystem;
}

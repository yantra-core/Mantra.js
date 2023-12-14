
import { RealStone, Amplifier, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor, Repeater } from '../../../../RealStone/index.js';


export default function createSecuritySystem () {

  const realStoneSystem = new RealStone();

  // Initialize components
 // Initialize and position components
 const motionDetector = new MotionDetector(0, 0, 0); // Position at top-left
 const signalAmplifier = new Amplifier(100, 50, 0); // Position a bit right
 const wire = new Wire(200, 100); // Further to the right
 const pressureSensor = new PressureSensor(300, 150, 0); // Moving downwards and right
 const securityLight = new LEDLight( 400, 200, 0, { wattage: 60 }); // Near bottom-right
 const manualOverrideButton = new Button(50, 450, 0); // Near bottom-left
 const signalRepeater = new Repeater(250, 250, 0); // Center

  // Connect components
  motionDetector.connect(signalAmplifier);
  signalAmplifier.connect(wire);
  wire.connect(signalRepeater);
  signalRepeater.connect(securityLight);
  pressureSensor.connect(securityLight);
  manualOverrideButton.connect(securityLight);
  
  // Add components to RealStone system
  realStoneSystem.addPart(motionDetector);
  realStoneSystem.addPart(signalAmplifier);
  realStoneSystem.addPart(wire);
  realStoneSystem.addPart(pressureSensor);
  realStoneSystem.addPart(securityLight);
  realStoneSystem.addPart(manualOverrideButton);
  realStoneSystem.addPart(signalRepeater);
  
  motionDetector.detectMotion(); // Simulate motion detection
  manualOverrideButton.press(); // Simulate manual override
  
  
  console.log(JSON.stringify(realStoneSystem.toJSON(), true, 2))
  //console.log(realStoneSystem)
  //console.log(realStoneSystem.toJSON().parts)

  return realStoneSystem;

}


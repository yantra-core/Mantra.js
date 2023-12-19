
import { AyCraft, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor, Relay } from '../../../../AyCraft.js/index.js';

export default function createSecuritySystem() {
  const ayCraftSystem = new AyCraft();

  // Initialize and position components
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

  // Add parts to AyCraft system
  ayCraftSystem.addPart(motionDetector);
  ayCraftSystem.addPart(pressureSensor);
  ayCraftSystem.addPart(securityLight);
  ayCraftSystem.addPart(manualOverrideButton);
  ayCraftSystem.addPart(actuator);

  // Simulate interactions
  motionDetector.detectMotion(); // Simulate motion detection
  // manualOverrideButton.press(); // Simulate manual override

  // Logging the system state
  console.log(ayCraftSystem);
  //console.log(JSON.stringify(ayCraftSystem.toJSON(), true, 2))

  return ayCraftSystem;
}

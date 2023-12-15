import { RealStone, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor } from '../../../../RealStone/index.js';

export default function createSecuritySystem() {
    const realStoneSystem = new RealStone();

    // Initialize and position components
    const motionDetector = new MotionDetector(-150, -250, 0);
    const pressureSensor = new PressureSensor(150, -250, 0);
    const actuator = new Actuator(450, -250, 0);
    const securityLight = new LEDLight(450, 0, 200, { wattage: 60 });
    const manualOverrideButton = new Button(50, 450, 0);

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

    // Add components and wires to RealStone system
    realStoneSystem.addPart(motionDetector);
    realStoneSystem.addPart(pressureSensor);
    realStoneSystem.addPart(securityLight);
    realStoneSystem.addPart(manualOverrideButton);
    realStoneSystem.addPart(actuator);
    realStoneSystem.addPart(wireFromMotionDetector);
    realStoneSystem.addPart(wireFromPressureSensor);
    realStoneSystem.addPart(wireFromButton);
    realStoneSystem.addPart(wireToLight);

    // Simulate interactions
    // motionDetector.detectMotion(); // Simulate motion detection

    // Logging the system state
    console.log(realStoneSystem);

    return realStoneSystem;
}

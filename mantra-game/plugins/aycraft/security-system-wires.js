import { AyCraft, Button, LEDLight, Wire, Actuator, MotionDetector, PressureSensor } from '../../../../AyCraft.js/index.js';

export default function createSecuritySystem() {
    const ayCraftSystem = new AyCraft();

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

    // Add components and wires to AyCraft system
    ayCraftSystem.addPart(motionDetector);
    ayCraftSystem.addPart(pressureSensor);
    ayCraftSystem.addPart(securityLight);
    ayCraftSystem.addPart(manualOverrideButton);
    ayCraftSystem.addPart(actuator);
    ayCraftSystem.addPart(wireFromMotionDetector);
    ayCraftSystem.addPart(wireFromPressureSensor);
    ayCraftSystem.addPart(wireFromButton);
    ayCraftSystem.addPart(wireToLight);

    // Simulate interactions
    // motionDetector.detectMotion(); // Simulate motion detection

    // Logging the system state
    console.log(ayCraftSystem);

    return ayCraftSystem;
}

import { AyCraft, Button, Latch, LEDLight, Wire, Rover } from '../../../../AyCraft.js/index.js';

function lightButton(x, y, z) {
  let contraption = new AyCraft(x, y, z);
  let button = new Button(0, -150, 0);
  let ledLight = new LEDLight(150, -150, 0);

  // Connect button directly to LED light
  button.connect(ledLight);

  // Add parts to AyCraft system
  contraption.addPart(button);
  contraption.addPart(ledLight);
  
  contraption.onAny((event, data) => {
    console.log(event, data);
  });

  return contraption;

}

export default lightButton;

// Uncomment the following line to run this example:
// lightButton().start(); 
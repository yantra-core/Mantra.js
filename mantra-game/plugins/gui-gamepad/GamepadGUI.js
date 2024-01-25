import ZoomSlider from "./lib/ZoomSlider.js";

let keyMap = {
  'up': 'KeyW',
  'down': 'KeyS',
  'left': 'KeyA',
  'right': 'KeyD'
};

class GamepadGUI {
  static id = 'gui-gamepad';
  constructor({ useZoomSlider = true } = {}) {
    this.id = GamepadGUI.id;
    this.hiding = false;
    this.moving = null;
    this.useZoomSlider = useZoomSlider;
    this.useZoomSlider = false;
    this.lastDirection = null; // Add this line
  }

  init(game) {
    this.game = game;
    if (this.useZoomSlider) {
      this.zoomSlider = new ZoomSlider(game);
      // this.zoomSlider.setValue(game.data.camera.currentZoom);
      this.zoomSlider.setValue(4.5);

      // Remark: why is this needed for slider, but not for gamepad?
      game.on('game::ready', () => {
        this.zoomSlider.slider.style.display = 'block';
      });

    }

    game.loadCSS('/plugins/GamepadGUI/gamepad.css');

    let controllerHolder = document.createElement('div');
    controllerHolder.style.position = 'fixed';
    controllerHolder.style.bottom = '0';
    //   touch-action: manipulation;

    controllerHolder.style.touchAction = 'manipulation';
    //   user-select: none;

    controllerHolder.style.userSelect = 'none';
    //controllerHolder.style.left = '0';

    controllerHolder.style.width = '100%';
    controllerHolder.style.height = '150px';
    controllerHolder.style.zIndex = '9999';
    this.createSNESGamepad(controllerHolder);
    document.body.appendChild(controllerHolder);

    // TODO: refactor DPAD to allow for continuous movement with mouse over, no click required
    let dpadArea = document.createElement('div');
    dpadArea.id = 'dpad-area';
    dpadArea.style.position = 'absolute';
    dpadArea.style.left = '2vmin'; // Adjust based on D-pad position
    dpadArea.style.bottom = '2.5vmin'; // Adjust based on D-pad position
    dpadArea.style.width = '35vmin'; // Match D-pad size
    dpadArea.style.height = '35vmin'; // Match D-pad size
    dpadArea.style.zIndex = '10000';
    // set color for debug
    //dpadArea.style.backgroundColor = 'yellow';
    controllerHolder.appendChild(dpadArea);

    let isPointerDown = false;

    dpadArea.addEventListener('pointerdown', (ev) => {
      isPointerDown = true;
      handleDpadInput(ev);
    });

    document.addEventListener('pointermove', (ev) => {
      if (isPointerDown) {
        handleDpadInput(ev);
      }
    });

    document.addEventListener('pointerup', (ev) => {
      isPointerDown = false;
      cancelDpadInput();
    });

    let that = this;

    function handleDpadInput(ev) {

      // Assume dpadArea is the element representing the D-pad area
      let dpadRect = dpadArea.getBoundingClientRect();
      let dpadCenterX = dpadRect.left + dpadRect.width / 2;
      let dpadCenterY = dpadRect.top + dpadRect.height / 2;

      let deltaX = ev.clientX - dpadCenterX;
      let deltaY = ev.clientY - dpadCenterY;

      // Determine the predominant direction based on the larger offset
      let direction;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      // Dispatch keydown events for the corresponding direction

      // document.dispatchEvent(new KeyboardEvent('keydown', { 'code': keyMap[direction] }));

      that.moving = direction;


      let newDirection = direction; // Store the new direction in a variable

      // Check if direction has changed
      if (that.lastDirection && that.lastDirection !== newDirection) {
        // Dispatch keyup event for the last direction
        document.dispatchEvent(new KeyboardEvent('keyup', { 'code': keyMap[that.lastDirection] }));
      }

      // Update lastDirection
      that.lastDirection = newDirection;

      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': keyMap[newDirection] }));

    }

    function cancelDpadInput() {
      if (that.lastDirection) {
        document.dispatchEvent(new KeyboardEvent('keyup', { 'code': keyMap[that.lastDirection] }));
        that.lastDirection = null; // Reset the last direction
      }
    }

    let controller = document.getElementById('snes-gamepad');

    controller.style.position = 'fixed';
    controller.style.left = '50%'; // Center horizontally
    controller.style.bottom = '0'; // Align at the bottom
    controller.style.transform = 'translateX(-50%)'; // Adjust for exact centering

    let select = document.getElementById('select');

    select.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyU' }));
    });
    select.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyU' }));
    });

    // tooltip text for select
    select.title = 'Open Editor Menu';

    // hidden ( for now )
    graphics.style.display = 'none';

    graphics.addEventListener('pointerdown', (ev) => {
      // show graphics menu
      // get graphicsSelector element
      // TOGGLE GRAPHICS SETTINGS
      let current = game.graphics[0].constructor.name;
      if (current === 'BabylonGraphics') {
        game.switchGraphics('CSSGraphics')

      } else if (current === 'CSSGraphics') {
        game.switchGraphics('BabylonGraphics')
      }
      //document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyG' }));
    });
    graphics.addEventListener('pointerup', (ev) => {
      //document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyG' }));
    });

    let start = document.getElementById('start');

    start.title = 'Warp to World';
    start.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyI' }));
      /*
        TODO: implement pause and rewind
        game.pause();
        game.rewind(500);
      */
    });
    start.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyI' }));
    });

    if (is_touch_enabled()) {
      // hide start and select buttons
      select.style.display = 'none';
      start.style.display = 'none';
    }

    // bind event for id dpad_up, dpad_down, etc
    let dpad_up = document.getElementById('up');
    let dpad_down = document.getElementById('down');
    let dpad_left = document.getElementById('left');
    let dpad_right = document.getElementById('right');

    let buttonY = document.getElementById('y');
    let buttonX = document.getElementById('x');

    buttonY.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyK' }));
    });

    buttonY.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyK' }));
    });

    buttonX.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyO' }));
    });

    buttonX.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyO' }));
    });

    let buttonB = document.getElementById('b');
    let buttonA = document.getElementById('a');

    buttonB.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'Space' }));
    });

    buttonB.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'Space' }));
    });

    buttonA.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyP' }));
    });

    buttonA.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyP' }));
    });

    if (false && !is_touch_enabled()) {
      let controller = document.getElementById('snes-gamepad');
      let controllerHeight = controller.offsetHeight;
      let slideOutPosition = '-' + controllerHeight + 'px'; // Negative value of the controller's height
      controller.style.bottom = slideOutPosition; // Move the controller outside the viewport
      this.hiding = true;
    }

  }

  // Remark: Update is called once per game loop
  update() {
    // TODO, send inputs
    // this.sendInputs();
  }


  // TODO: refactor this plugin to use sendInputs()
  sendInputs() {

    // Check if all controls are false
    const allFalse = Object.keys(controls).every(key => !controls[key]);


    // Send controls if they are not all false or if the last controls were not all false
    if (!allFalse) {
      this.lastControlsAllFalse = allFalse;
      if (this.game.communicationClient) {
        this.game.communicationClient.sendMessage('player_input', { controls });
      }
    }


  }

  /*
  let controls2 = {
    'DPAD_UP': yAxis < -deadzone, // Up
    'DPAD_DOWN': yAxis > deadzone,  // Down
    'DPAD_LEFT': xAxis < -deadzone, // Left
    'DPAD_RIGHT': xAxis > deadzone,  // Right
    // y button
    'BUTTON_Y': gamepad.buttons[1].pressed, // "Y" button
    // x button
    'BUTTON_X': gamepad.buttons[3].pressed, // "X" button
    // b button
    'BUTTON_B': gamepad.buttons[2].pressed, // "B" button
    // a button
    'BUTTON_A': gamepad.buttons[0].pressed, // "A" button
    // start button
    'BUTTON_START': gamepad.buttons[9].pressed, // "Start" button
    // select button
    'BUTTON_SELECT': gamepad.buttons[8].pressed, // "Select" button
    // left shoulder button
    'BUTTON_L1': gamepad.buttons[4].pressed, // "L1" button
    // right shoulder button
    'BUTTON_R1': gamepad.buttons[5].pressed, // "R1" button
    // left trigger button
    'BUTTON_L2': gamepad.buttons[6].pressed, // "L2" button
    // right trigger button
    'BUTTON_R2': gamepad.buttons[7].pressed, // "R2" button
    // left stick button
    'BUTTON_L3': gamepad.buttons[10].pressed, // "L3" button
    // right stick button
    'BUTTON_R3': gamepad.buttons[11].pressed, // "R3" button
  };
  */


  createSNESGamepad(parentElement) {

    let str = `
  
  
<article id="snes-gamepad" aria-label="SNES controller">

  <!-- removed ( for now )
  <button id="l" class="is3d">Top left<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>
  <button id="r" class="is3d">Top Right<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>
  -->
  
  <!-- frame -->
  <div class="face is3d"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  
  <!-- Letters and Text -->
  <h1>SUPER MANTRA</h1>
  <p>CSS ENTERTAINMENT SYSTEM</p>
  
  <p class="letter letter-x" aria-hidden="true">X</p>
  <p class="letter letter-y" aria-hidden="true">Y</p>
  <p class="letter letter-a" aria-hidden="true">A</p>
  <p class="letter letter-b" aria-hidden="true">B</p>
  <p class="letter-start" aria-hidden="true">START</p>
  <p class="letter-select" aria-hidden="true">SELECT</p>
  
  <!-- directional buttons + axis -->
  <div class="axis is3d"><div style="--z:1"></div><div style="--z:2"></div><div style="--z:3"></div><div style="--z:4"></div><div style="--z:5"></div><div style="--z:6"></div></div>
  
  <!-- Menu buttons (start/select) -->
  <button id="select" class="is3d">Select<div style="--z:1"></div><div style="--z:2"></div><div style="--z:3"></div><div style="--z:4"></div></button>

  <button id="graphics" class="is3d">Graphics<div style="--z:1"></div><div style="--z:2"></div><div style="--z:3"></div><div style="--z:4"></div></button>

  <button id="start" class="is3d">Start<div style="--z:1"></div><div style="--z:2"></div><div style="--z:3"></div><div style="--z:4"></div></button>
  <!-- Action buttons -->
  <div class="buttons">
    <button id="x" class="circle is3d">x<div></div><div></div><div></div><div></div></button>
    <button id="y" class="circle is3d">y<div></div><div></div><div></div><div></div></button>
    <button id="a" class="circle is3d">a<div></div><div></div><div></div><div></div></button>
    <button id="b" class="circle is3d">b<div></div><div></div><div></div><div></div></button>
  </div>
    
</article>

  
    `;

    parentElement.innerHTML = str;

  }

  render() { }

  destroy() { }

}

export default GamepadGUI;

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}



/*
game.on('entityInput::handleInputs', (entityId, input) => {
  if (input.controls && input.controls.J !== undefined) {
    if (input.controls.J === false) {
      console.log("FALSE")
    }
    // toggleModalOnKeyPress(input.controls.I);
  }
  if (input.controls && input.controls.K !== undefined) {
    if (input.controls.K === false) {
      // side down the controller
      //document.getElementById('snes-gamepad').style.display = 'block';
      
    } else {

      if (!this.hiding) {
        this.hiding = true;
        document.getElementById('snes-gamepad').style.display = 'none';
      } else {
        this.hiding = false;
        document.getElementById('snes-gamepad').style.display = 'block';
      }

    }
  }
});
*/

/*
let buttonL = document.getElementById('l');
let buttonR = document.getElementById('r');

buttonL.addEventListener('pointerdown', (ev) => {
 
 document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyJ' }));
});
buttonL.addEventListener('pointerup', (ev) => {
 document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyJ' }));
});
 
buttonR.addEventListener('pointerdown', (ev) => {
 let controller = document.getElementById('snes-gamepad');
 let controllerHeight = controller.offsetHeight;
 let slideOutPosition = '-' + controllerHeight + 'px'; // Position to slide out
 
 if (this.hiding) {
   // Slide in (show)
   controller.style.bottom = '0px';
   this.hiding = false;
 } else {
   // Slide out (hide)
   controller.style.bottom = slideOutPosition;
   this.hiding = true;
 }
});

   
buttonR.addEventListener('pointerup', (ev) => {
 //document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyK' }));
});

*/

// TODO: implement haptic feedback for buttons ( if available )
function triggerHapticFeedback() {
  if (navigator.vibrate) {
    // Vibration in milliseconds
    // This is a simple vibration; you can also create patterns
    navigator.vibrate(50);
    game.playNote('C4', 0.8);
  } else {
    // play low frequency tone
    game.playNote('C4');
  }
}
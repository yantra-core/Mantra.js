import ZoomSlider from "./lib/ZoomSlider.js";

let keyMap = {
  'up': 'KeyW',
  'down': 'KeyS',
  'left': 'KeyA',
  'right': 'KeyD'
};

class GamepadGUI {
  static id = 'gui-gamepad';
  constructor() {
    this.id = GamepadGUI.id;
    this.hiding = false;
    this.moving = null;
    this.lastDirection = null; // Add this line
  }

  init(game) {
    this.game = game;
    this.zoomSlider = new ZoomSlider(game);
    // this.zoomSlider.setValue(game.data.camera.currentZoom);
    this.zoomSlider.setValue(4.5);

    // Remark: why is this needed for slider, but not for gamepad?
    game.on('game::ready', () => {
      this.zoomSlider.slider.style.display = 'block';
    });

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

    let start = document.getElementById('start');

    start.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyI' }));
    });
    start.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyI' }));
    });

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

    if (false && !is_touch_enabled()) {
      let controller = document.getElementById('snes-gamepad');
      let controllerHeight = controller.offsetHeight;
      let slideOutPosition = '-' + controllerHeight + 'px'; // Negative value of the controller's height
      controller.style.bottom = slideOutPosition; // Move the controller outside the viewport
      this.hiding = true;
    }

    // use existing keyboard events
    // trigger keydown event with keycode of W, A, S, D
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

    /*
    dpad_up.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyW' }));
    });
    dpad_up.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyW' }));
    });

    dpad_down.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyS' }));
    });
    dpad_down.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyS' }));
    });

    dpad_left.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyA' }));
    });
    dpad_left.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyA' }));
    });

    dpad_right.addEventListener('pointerdown', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'code': 'KeyD' }));
    });
    dpad_right.addEventListener('pointerup', (ev) => {
      document.dispatchEvent(new KeyboardEvent('keyup', { 'code': 'KeyD' }));
    });
    */

  }

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




  update() {
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
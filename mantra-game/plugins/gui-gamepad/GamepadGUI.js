class GamepadGUI {
  static id = 'gui-gamepad';
  constructor(game) {
    this.game = game; // Store the reference to the game logic
    this.id = GamepadGUI.id;
  }

  init(game) {
    this.game = game;
    let controllerHolder = document.createElement('div');
    controllerHolder.style.position = 'absolute';
    controllerHolder.style.top = '0';
    controllerHolder.style.left = '0';
    controllerHolder.style.width = '100%';
    controllerHolder.style.height = '100%';
    controllerHolder.style.zIndex = '9999';
    this.createSNESGamepad(controllerHolder);
    console.log('controllerHolder', controllerHolder)
    document.body.appendChild(controllerHolder);
  }

  createSNESGamepad(parentElement) {

    let str = `
    
    <!-- Code to handle the camera angle -->
<input tabindex="-1" type="radio" name="cam" id="cam1" />
<input tabindex="-1" type="radio" name="cam" id="cam2" />
<input tabindex="-1" type="radio" name="cam" id="cam3" />
<input tabindex="-1" type="radio" name="cam" id="cam4" />
<input tabindex="-1" type="radio" name="cam" id="cam5" />
<input tabindex="-1" type="radio" name="cam" id="cam6" checked />
<input tabindex="-1" type="radio" name="cam" id="cam7" />
<input tabindex="-1" type="radio" name="cam" id="cam8" />
<input tabindex="-1" type="radio" name="cam" id="cam9" />

<div id="camera">
  <label for="cam1"></label>
  <label for="cam2"></label>
  <label for="cam3"></label>
  <label for="cam4"></label>
  <label for="cam5"></label>
  <label for="cam6"></label>
  <label for="cam7"></label>
  <label for="cam8"></label>
  <label for="cam9"></label>
</div>


<article id="snes-gamepad" aria-label="SNES controller">
  <!-- cord -->
  <div id="cord"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  
  <!-- Buttons on top-->
  <button id="l" class="is3d">Top left<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>
  <button id="r" class="is3d">Top Right<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></button>
  
  <!-- frame -->
  <div class="face is3d"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  
  <!-- Letters and Text -->
  <h1>SUPER NINTENDO</h1>
  <p>CSS ENTERTAINMENT SYSTEM</p>
  
  <p class="letter letter-x" aria-hidden="true">X</p>
  <p class="letter letter-y" aria-hidden="true">Y</p>
  <p class="letter letter-a" aria-hidden="true">A</p>
  <p class="letter letter-b" aria-hidden="true">B</p>
  <p class="letter-start" aria-hidden="true">START</p>
  <p class="letter-select" aria-hidden="true">SELECT</p>
  
  <!-- directional buttons + axis -->
  <button id="up">Up</button>
  <button id="left">Left</button>
  <button id="right">Right</button>
  <button id="down">Down</button>
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
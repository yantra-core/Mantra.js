// Graphics.js - Marak Squires 2023
import updateSprite from "./lib/updateSprite.js";
import getTexture from "./lib/getTexture.js";
import LoadingCircle from "./lib/LoadingCircle.js";
import switchGraphics from "./lib/switchGraphics.js";
import pingPosition from "./lib/pingPosition.js";

class Graphics {
  static id = 'graphics';
  static removable = false;

  constructor() {
    this.id = Graphics.id;
    this.updateSprite = updateSprite.bind(this);
    this.getTexture = getTexture.bind(this);
    this.switchGraphics = switchGraphics.bind(this);
    this.LoadingCircle = LoadingCircle;
  }

  init(game) {
    this.game = game; // Store the reference to the game logic
    this.game.systemsManager.addSystem('graphics', this);
    this.game.createGraphic = this.createGraphic.bind(this);
    this.game.removeGraphic = this.removeGraphic.bind(this);
    this.game.updateGraphic = this.updateGraphic.bind(this);
    this.game.getTexture = this.getTexture.bind(this);
    this.game.updateSprite = this.updateSprite.bind(this);
    this.game.switchGraphics = this.switchGraphics.bind(this);
    this.game.setBackground = this.setBackground.bind(this);
    this.game.pingPosition = pingPosition.bind(this);

    this.game.data.camera = this.game.data.camera || {
      position: {
        x: 0,
        y: 0
      },
      currentZoom: 1,
      minZoom: 0.1,
      maxZoom: 10,
    };

    if (this.game.isClient) {
      // Ensure the gameHolder div exists
      let gameHolder = document.getElementById('gameHolder');
      if (!gameHolder) {
        gameHolder = document.createElement('div');
        gameHolder.id = 'gameHolder';

        // always append as first element
        document.body.insertBefore(gameHolder, document.body.firstChild);

        // document.body.appendChild(gameHolder); // Append to the body or to a specific element as needed
      }

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera

    }

    game.flash = triggerItemPickupEffect;
    game.anime = triggerAnimeTextEffect;

  }

  update() { }


  // Remark: Graphics.createGraphic() currently isn't used as each Graphics Interface is responsible for creating its own graphics
  //         By iterating through game.entities Map in the interfaces .render() method
  createGraphic(entityData) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      // don't recreate same graphic if already exists on interface
      let ent = game.getEntity(entityData.id);
      if (ent && ent.graphics && ent.graphics[graphicsInterface.id]) {
        return;
      }
      let graphic = graphicsInterface.createGraphic(entityData);
      if (graphic) {
        game.components.graphics.set([entityData.id, graphicsInterface.id], graphic);
      } else {
      }
    });
  }

  removeGraphic(entityId) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.removeGraphic(entityId);
    });
  }

  updateGraphic(entityData, alpha) {
    let game = this.game;
    game.graphics.forEach(function (graphicsInterface) {
      graphicsInterface.updateGraphic(entityData, alpha);
    });
  }

  setBackground(style, effect) {
    let game = this.game;
    // assume style is CSS color, set body background
    document.body.style.background = style;
  }

}

export default Graphics;

/*


function downloadCanvasAsImage(canvasElement, filename) {
    // Ensure a filename is provided
    filename = filename || 'canvas_image.png';

    // Create an image URL from the canvas
    const imageURL = canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // Create a temporary link element and trigger the download
    let downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = filename;

    // Append the link to the body, click it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


*/

function triggerItemPickupEffect() {
  return;
  let effect = document.getElementById('itemPickupEffect');

  // Create the effect element if it doesn't exist
  if (!effect) {
    effect = document.createElement('div');
    effect.id = 'itemPickupEffect';
    document.body.appendChild(effect);

    // Apply initial styles
    Object.assign(effect.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      display: 'none',
      zIndex: '9999', // Ensure it's above other elements
    });
  }

  // Apply animation
  effect.style.display = 'block';
  effect.style.animation = 'glow 1s ease-out forwards';

  // Calculate shadow size relative to screen size
  const initialShadowSize = window.innerHeight * 0.25; // 45% from top and bottom for initial state
  const maxShadowSize = window.innerHeight * 0.5; // 90% from top and bottom for mid-animation state

  // Set up CSS animation keyframes if not already defined
  let styleSheet = document.getElementById('glowAnimation');
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = 'glowAnimation';
    document.head.appendChild(styleSheet);
  }

  // TODO: config color
  let color = '#ccc';

  styleSheet.innerHTML = `
    @keyframes glow {
      0% {
        box-shadow: 0 0 30px ${initialShadowSize}px ${color} inset;
        opacity: 1;
      }
      50% {
        box-shadow: 0 0 60px ${maxShadowSize}px ${color}  inset;
        opacity: 1;
      }
      100% {
        box-shadow: 0 0 30px ${initialShadowSize}px ${color}  inset;
        opacity: 0;
      }
    }
  `;

  // Reset the effect after it finishes
  setTimeout(() => {
    effect.style.display = 'none';
    effect.style.animation = 'none'; // Reset animation
  }, 2000); // Hide effect after 2 seconds
}



function triggerAnimeTextEffect(textMessage, options = {
  styles: {
    color: '#FF0', // Custom style overrides
    fontSize: '12rem',
  },
  animations: [
    { name: 'panIn', duration: '3s', timingFunction: 'ease-out' },

    // { name: 'rotate', duration: '5s', timingFunction: 'linear', delay: 3, iterationCount: 'infinite' },
    // Add more animations as needed
  ],
  totalDuration: 4000 // Total duration to keep the effect visible
}) {
  return;
  let textEffect = document.getElementById('animeTextEffect');

  // Create the text effect element if it doesn't exist
  if (!textEffect) {
    textEffect = document.createElement('div');
    textEffect.id = 'animeTextEffect';
    document.body.appendChild(textEffect);

    // Set default styles
    textEffect.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12rem;
      font-weight: bold;
      color: #FF0;
      text-shadow: 0 0 20px #FFF;
      opacity: 0;
      pointer-events: none;
      z-index: 9999; // Ensure it's above other elements
    `;
  }

  // Apply custom styles from options
  if (options && options.styles) {
    Object.assign(textEffect.style, options.styles);
  }

  // Set the text
  textEffect.textContent = textMessage;

  // Construct animation sequence based on options
  let animationSequence = '';
  if (options && options.animations) {
    options.animations.forEach((anim, index) => {
      animationSequence += `${anim.name} ${anim.duration} ${anim.timingFunction} ${anim.delay || 0}s ${anim.iterationCount || 'forwards'}`;
      if (index < options.animations.length - 1) {
        animationSequence += ', ';
      }
    });
  }

  textEffect.style.display = 'block';
  textEffect.style.animation = animationSequence;

  // Set up CSS animation keyframes if not already defined
  let styleSheet = document.getElementById('textAnimation');
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = 'textAnimation';
    document.head.appendChild(styleSheet);
  }

  let keyframes = `
    @keyframes panIn {
      0% { transform: translate(-50%, -150%) scale(0.5); opacity: 0; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes panOut {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, 150%) scale(0.5); opacity: 0; }
    }
    @keyframes swipeRight {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(50%, -50%) rotate(360deg); }
    }
    @keyframes rotate {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;

  styleSheet.innerHTML = keyframes;

  // Reset the effect after some time
  setTimeout(() => {
    // perform fadeout opacity instead of hiding immediately
    // TODO: fadeout, better animation text management
    textEffect.style.display = 'none';
    textEffect.style.animation = 'none'; // Reset animation
  }, options.totalDuration || 8000); // Use totalDuration from options or default to 8 seconds
}

//triggerAnimeTextEffect('test text yo')
// Example usage:
/*
triggerAnimeTextEffect('Level Cleared!', {
  styles: {
    color: '#FFF', // Custom style overrides
    fontSize: '10rem',
  },
  animations: [
    { name: 'panIn', duration: '3s', timingFunction: 'ease-out' },
    // { name: 'rotate', duration: '5s', timingFunction: 'linear', delay: 3, iterationCount: 'infinite' },
    // Add more animations as needed
  ],
  totalDuration: 8000 // Total duration to keep the effect visible
});
*/
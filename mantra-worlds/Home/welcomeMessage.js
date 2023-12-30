export default function welcomeMessage(game) {
  // calculate font size based on window size
  let fontSize = Math.floor(window.innerWidth / 15) + 'px';
  // calculate x / y based on window size
  let x = Math.floor(window.innerWidth / 2);
  let y = 110;

  if (is_touch_enabled()) {
    y = 30;
  }

  let typer = game.systems['typer-ghost'].createText({
    x: x, y: y, text: 'Welcome to Mantra\n my friend.',
    style: {
      color: 'white',
      fontSize: fontSize,
      width: '100%',
      position: 'absolute',
      textAlign: 'center',
      top: '0px', // Adjust this value to position the text lower or higher from the top
      left: '50%', // Center horizontally
      transform: 'translateX(-50%)', // Ensure exact centering
      lineHeight: '1',
      zIndex: '3000'

    },
    duration: 5000, removeDuration: 6000
  });

  setTimeout(function () {
    let moveMessage = 'Use WASD to move.';
    if (is_touch_enabled()) {
      moveMessage = 'Touch Gamepad to move.';
    }
    typer.updateText(moveMessage, 5000, 6000);

  }, 6000)

  setTimeout(function () {
    typer.updateText('Switch Worlds by pressing START', 5000, 6000);
  }, 12000)


  setTimeout(function () {
    typer.updateText('You can Switch Graphics by pressing SELECT', 5000, 6000);
  }, 18000)

}

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

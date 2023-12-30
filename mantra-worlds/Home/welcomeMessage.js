export default function welcomeMessage(game) {
  // calculate font size based on window size
  let fontSize = Math.floor(window.innerWidth / 15) + 'px';
  // calculate x / y based on window size
  let x = Math.floor(window.innerWidth / 2);
  let y = 110;

  if (is_touch_enabled()) {
    y = 30;
  }

  let typer = game.systems['typer-ghost'].createQueuedText({
    x: x, y: y,
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

  // Queueing additional messages
  typer.queueText('Welcome to Mantra Worlds', 5000, 2000);
  typer.queueText('Use WASD to move', 5000, 3000);
  typer.queueText('Press START to Switch Worlds', 5000, 2000);
  typer.queueText('Press SELECT to Switch Graphics', 5000, 2000);

  // Start processing the queue
  typer.processQueue();


}

function is_touch_enabled() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

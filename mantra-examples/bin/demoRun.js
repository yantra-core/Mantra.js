import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';

let homeUrl = 'http://yantra.gg/mantra';
homeUrl = 'http://192.168.1.80:7777/streams.html';


const Config = {
  followNewTab: true,
  fps: 25,
  ffmpeg_Path: '<path of ffmpeg_path>' || null,
  videoFrame: {
    width: 1024,
    height: 768,
  },
  videoCrf: 18,
  videoCodec: 'libx264',
  videoPreset: 'ultrafast',
  videoBitrate: 1000,
  autopad: {
    color: 'black' | '#35A5FF',
  },
  aspectRatio: '4:3',
};

async function checkForRunClicked(page) {
  const isRunClicked = await page.evaluate(() => {
    return document.body.getAttribute('data-action') === 'run-clicked';
  });
  return isRunClicked;
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}


async function captureVideo() {


  //  const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });

  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);

  await page.goto(homeUrl);

  const savePath = './demo.mp4';
  await recorder.start(savePath);

  /*
  await page.evaluate(() => {
    const mouseFollower = document.createElement('div');
    mouseFollower.setAttribute('style', 'position: absolute; width: 20px; height: 20px; border-radius: 5px; background: black; pointer-events: none; z-index: 10000;');
    document.body.appendChild(mouseFollower);

    document.addEventListener('mousemove', (e) => {
      mouseFollower.style.top = e.pageY + 'px';
      mouseFollower.style.left = e.pageX + 'px';
    });
  });
  */


  // Use a loop to periodically check
  while (!(await checkForRunClicked(page))) {
    await delay(100); // Check every second using the delay function
  }

  // get focus on the game
  // focus on the gameHolder div
  await page.evaluate(() => {
    document.getElementById('gameHolder').focus();
  });
  // Get the viewport size
  const viewport = await page.viewport();

  // Define the center position based on the viewport size
  let centerX = viewport.width / 2;
  let centerY = viewport.height / 2;
  let distance = 100; // Distance from the center to move the mouse in each direction

  // REMARK: this assumes game is 0,0 top left, it is not, game is 0,0 center
// Assuming game.radialSpread is defined and accessible

let radius = 100; // Radius of the radial spread
let totalPoints = 10;

// Generate positions in a radial pattern around the center
for (let i = 0; i < totalPoints; i++) {
  // Use the radialSpread function to calculate the position for each point
  let { x, y } = radialSpread(centerX, centerY, radius, totalPoints, i);

  // center to player? player is 16,16
  //x = x + 16;
  //y = y + 16;
  console.log(`Moving mouse to (${x}, ${y})`);
  await page.mouse.click(x, y, { button: 'right' });
  await page.mouse.click(x, y, { button: 'right' });

  await delay(50); // Adjust delay as needed
  await page.mouse.move(x, y);
  await delay(50); // Adjust delay as needed
  await page.mouse.click(x, y, { button: 'right' });
  await page.mouse.click(x, y, { button: 'right' });

  await delay(200); // Adjust delay as needed
}
await page.keyboard.press('D');

await page.keyboard.press('D');
await page.keyboard.press('A');
await page.keyboard.press('A');
await page.keyboard.press('S');
await page.keyboard.press('S');
await page.keyboard.press('D');
await page.keyboard.press('W');
await page.keyboard.press('W');
await page.keyboard.press('W');
await page.keyboard.press('A');


  // Once detected, perform the desired Puppeteer actions
  // For example, move the mouse or type something
  console.log('Run button clicked');
  /*
  await page.mouse.click(100, 100, { button: 'right' }); // Example: right click at the current mouse position

  console.log("Moving mouse to (100, 100)")
  await page.mouse.move(0, -100); // Example: move the mouse to coordinates (100, 100)
  console.log("Clicking mouse at (100, 100)")
  // right click
  await page.mouse.click(100, 100, { button: 'right' }); // Example: right click at the current mouse position
*/


  await page.waitForNavigation({ waitUntil: 'load' }); // This waits for the next page load

  // Stop recording
  await recorder.stop();
  await browser.close();
}

function clickOnGame() {
  const game = document.querySelector('canvas');
  game.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

captureVideo();


function radialSpread(centerX, centerY, distance, count, index) {
  let angle = (index / count) * 2 * Math.PI; // Evenly spaced angle
  let x = centerX + distance * Math.cos(angle); // Convert polar to Cartesian coordinates
  let y = centerY + distance * Math.sin(angle);
  return { x, y };
}
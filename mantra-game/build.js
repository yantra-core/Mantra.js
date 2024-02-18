import browserify from 'browserify';
import fs from 'fs';
import path from 'path';

const plugins = [
  './plugins/entity-movement/strategies/AsteroidsMovement.js',
  './plugins/behaviors/Behaviors.js',
  './plugins/sutra/Sutra.js',
  './plugins/ycraft/YCraft.js',
  './plugins/graphics-babylon/camera/BabylonCamera.js',
  './plugins/graphics-ascii/ASCIIGraphics.js',
  './plugins/graphics-babylon/BabylonGraphics.js',
  './plugins/block/Block.js',
  './plugins/tile/Tile.js',
  './plugins/platform/Platform.js',
  './plugins/player/Player.js',
  './plugins/gravitywell/GravityWell.js',
  './plugins/teleporter/Teleporter.js',
  './plugins/unit-spawner/UnitSpawner.js',
  './plugins/flame/Flame.js',
  './plugins/border/Border.js',
  './plugins/bomb/Bomb.js',
  './plugins/boomerang/Boomerang.js',
  './plugins/bullet/Bullet.js',
  './plugins/sword/Sword.js',
  './plugins/graphics-css/CSSGraphics.js',
  './plugins/graphics-css-3d/CSS3DGraphics.js',
  './plugins/client/Client.js',
  './plugins/chrono-control/ChronoControl.js',
  './plugins/collisions/Collisions.js',
  './plugins/gui-creator/Creator.js',
  './plugins/entity/Entity.js',
  './plugins/entity-input/EntityInput.js',
  './plugins/entity-movement/EntityMovement.js',
  './plugins/gamepad/Gamepad.js',
  './plugins/gui-gamepad/GamepadGUI.js',
  './plugins/graphics/Graphics.js',
  './plugins/health/Health.js',
  './plugins/timers/Timers.js',
  './plugins/rbush/RBush.js',
  './plugins/gui-controls/ControlsGUI.js',
  './plugins/loading-screen/LoadingScreen.js',
  './plugins/gui-entities/EntitiesGUI.js',
  './plugins/ping-time/PingTime.js',
  './plugins/gui-plugin-explorer/PluginExplorer.js',
  './plugins/snapshot-manager/SnapshotManager.js',
  './plugins/gui-plugins/PluginsGUI.js',
  './plugins/gui-ycraft/YCraftGUI.js',
  './plugins/gui-yantra/YantraGUI.js',
  './plugins/gui-sutra/SutraGUI.js',
  './plugins/gui-scoreboard/Scoreboard.js',
  './plugins/gui-editor/Editor.js',
  './plugins/gui-game-editor/GameEditorGui.js',
  './plugins/gui-inspector/Inspector.js',
  './plugins/gui-event-inspector/EventInspector.js',
  './plugins/snapshot-size/SnapshotSize.js',
  './plugins/schema/Schema.js',
  './plugins/current-fps/CurrentFPS.js',
  './plugins/keyboard/Keyboard.js',
  './plugins/collectable/Collectable.js',
  './plugins/lifetime/Lifetime.js',
  './plugins/client/LocalClient.js',
  './plugins/physics-matter/MatterPhysics.js',
  './plugins/physics-physx/PhysXPhysics.js',
  './plugins/mouse/Mouse.js',
  './plugins/graphics-phaser/PhaserGraphics.js',
  './plugins/graphics-phaser/PhaserCamera.js',
  './plugins/graphics-three/ThreeGraphics.js',
  './plugins/entity-movement/strategies/PongMovement.js',
  './plugins/starfield/StarField.js',
  './plugins/starfield/BabylonStarField.js',
  './plugins/entity-movement/strategies/FroggerMovement.js',
  './plugins/entity-movement/strategies/PacManMovement.js',
  './plugins/gui-midi/MidiGUI.js',
  './plugins/typer-floaty/FloatyTyper.js',
  './plugins/typer-ghost/GhostTyper.js',
  './plugins/midi/Midi.js',
  './plugins/tone/Tone.js',
  './plugins/nes/Nes.js',
  // 'MovementPong' is the same as 'PongMovement', so it's not repeated
  // 'MovementAsteroids' is the same as 'AsteroidsMovement', so it's not repeated
  './plugins/xstate/XState.js',
  // ... add other plugins if you have more
];

// Function to copy directory recursively
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? copyDirSync(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}


function getFileName(path) {
  const parts = path.split('/');
  return parts[parts.length - 1].replace('.js', '');
}

function logStep(plugin, message) {
  console.log(`[${getFileName(plugin)}] ${message}`);
}


/*
// Matter-js worker
const workerFile = './plugins/physics-matter/worker-matter.js'; // Adjust the path to your worker file

browserify(workerFile, { standalone: 'MatterWorker' }) // 'MatterWorker' can be any name, it's not used in workers but required by Browserify
  .transform('babelify', { presets: ['@babel/preset-env'] }) // Assuming you need Babel transformation for your worker
  .bundle()
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(`../mantra-client/public/worker-matter.js`)); // Adjust the output directory as needed
*/

// include additions files and dirs aside from the Plugin class file
const includeDirs = ['vendor'];

plugins.forEach(plugin => {
  logStep(plugin, 'Starting bundling');

  const b = browserify(plugin, { standalone: `PLUGINS.${getFileName(plugin)}` })
    .transform('babelify', { presets: ['@babel/preset-env'] }) // Ensure babelify uses the preset-env
    .bundle()
    .on('error', function (err) { console.error(err); }) // Add error handling to catch and log bundling errors
    .pipe(fs.createWriteStream(`../mantra-client/public/plugins/${getFileName(plugin)}.js`));
 
  // After bundling the plugin, copy its subdirectories
  const pluginDir = path.dirname(plugin);
  const destDir = `../mantra-client/public/plugins/${getFileName(plugin)}`;

  fs.readdirSync(pluginDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && includeDirs.includes(dirent.name))
    .forEach(dirent => {
      copyDirSync(path.join(pluginDir, dirent.name), path.join(destDir, dirent.name));
      logStep(plugin, `Copied subdirectory: ${dirent.name}`);
    });
});
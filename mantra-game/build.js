import browserify from 'browserify';
import fs from 'fs';
import path from 'path';

const plugins = [
  './plugins/entity-movement/strategies/AsteroidsMovement.js',
  './plugins/behaviors/Behaviors.js',
  './plugins/sutra/Sutra.js',
  './plugins/graphics-babylon/camera/BabylonCamera.js',
  './plugins/graphics-babylon/BabylonGraphics.js',
  './plugins/block/Block.js',
  './plugins/border/Border.js',
  './plugins/bullet/Bullet.js',
  './plugins/graphics-css/CSSGraphics.js',
  // Note: 'Camera' is the same as 'BabylonCamera', so it's not repeated
  './plugins/client/Client.js',
  './plugins/chrono-control/ChronoControl.js',
  './plugins/collisions/Collisions.js',
  './plugins/gui-creator/Creator.js',
  './plugins/entity/Entity.js',
  './plugins/entity-input/EntityInput.js',
  './plugins/entity-movement/EntityMovement.js',
  './plugins/gamepad/Gamepad.js',
  './plugins/graphics/Graphics.js',
  './plugins/health/Health.js',
  './plugins/timers/Timers.js',
  './plugins/gui-controls/ControlsGUI.js',
  './plugins/loading-screen/LoadingScreen.js',
  './plugins/gui-entities/EntitiesGUI.js',
  './plugins/ping-time/PingTime.js',
  './plugins/gui-plugin-explorer/PluginExplorer.js',
  './plugins/snapshot-manager/SnapshotManager.js',
  './plugins/gui-plugins/PluginsGUI.js',
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
  './plugins/lifetime/Lifetime.js',
  './plugins/client/LocalClient.js',
  './plugins/physics-matter/MatterPhysics.js',
  './plugins/physics-physx/PhysXPhysics.js',
  './plugins/mouse/Mouse.js',
  './plugins/graphics-phaser/PhaserGraphics.js',
  './plugins/graphics-phaser/PhaserCamera.js',
  './plugins/graphics-three/ThreeGraphics.js',
  './plugins/entity-movement/strategies/PongMovement.js',
  './plugins/world/pong/PongWorld.js',
  './plugins/world-tower/TowerWorld.js',
  './plugins/starfield/StarField.js',
  './plugins/starfield/BabylonStarField.js',
  './plugins/entity-movement/strategies/FroggerMovement.js',
  './plugins/entity-movement/strategies/PacManMovement.js',
  './plugins/gui-midi/MidiGUI.js',
  './plugins/midi/Midi.js',
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

plugins.forEach(plugin => {
  logStep(plugin, 'Starting bundling');

  const b = browserify(plugin, { standalone: `PLUGINS.${getFileName(plugin)}` })
    .transform('babelify')
    .bundle()
    .pipe(fs.createWriteStream(`../mantra-client/public/plugins/${getFileName(plugin)}.js`));

  // After bundling the plugin, copy its subdirectories
  const pluginDir = path.dirname(plugin);
  const destDir = `../mantra-client/public/plugins/${getFileName(plugin)}`;
  fs.readdirSync(pluginDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => {
      copyDirSync(path.join(pluginDir, dirent.name), path.join(destDir, dirent.name));
      logStep(plugin, `Copied subdirectory: ${dirent.name}`);
    });
});
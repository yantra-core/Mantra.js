import browserify from 'browserify';
import fs from 'fs';

const plugins = [
  './plugins/entity-movement/strategies/AsteroidsMovement.js',
  './plugins/behaviors/Behaviors.js',
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
  './plugins/gui-plugins/PluginsGUI.js',
  './plugins/gui-yantra/YantraGUI.js',
  './plugins/gui-sutra/SutraGUI.js',
  './plugins/gui-editor/Editor.js',
  './plugins/snapshot-size/SnapshotSize.js',
  './plugins/schema/Schema.js',
  './plugins/current-fps/CurrentFPS.js',
  './plugins/keyboard/Keyboard.js',
  './plugins/lifetime/Lifetime.js',
  './plugins/client/LocalClient.js',
  './plugins/physics-matter/MatterPhysics.js',
  './plugins/mouse/Mouse.js',
  './plugins/graphics-phaser/PhaserGraphics.js',
  './plugins/graphics-three/ThreeGraphics.js',
  './plugins/entity-movement/strategies/PongMovement.js',
  './plugins/world/pong/PongWorld.js',
  './plugins/starfield/StarField.js',
  './plugins/starfield/BabylonStarField.js',
  './plugins/entity-movement/strategies/FroggerMovement.js',
  './plugins/entity-movement/strategies/PacManMovement.js',
  // 'MovementPong' is the same as 'PongMovement', so it's not repeated
  // 'MovementAsteroids' is the same as 'AsteroidsMovement', so it's not repeated
  './plugins/xstate/XState.js',
  // ... add other plugins if you have more
];

function getFileName(path) {
  const parts = path.split('/');
  return parts[parts.length - 1].replace('.js', '');
}

function logStep(plugin, message) {
  console.log(`[${getFileName(plugin)}] ${message}`);
}

// Object to hold plugin metadata
const pluginsMetadata = {};


plugins.forEach(plugin => {
  logStep(plugin, 'Starting bundling');

  // Prepend 'mplugins_' to the standalone name
  const b = browserify(plugin, { standalone: `PLUGINS.${getFileName(plugin)}` })
    .transform('babelify')
    .bundle()
    .pipe(fs.createWriteStream(`../mantra-client/public/plugins/${getFileName(plugin)}.js`));

  // get the size of the .js file we are about to write
  const stats = fs.statSync(`../mantra-client/public/plugins/${getFileName(plugin)}.js`);
  const fileSizeInBytes = stats.size;
  const fileSizeInKilobytes = fileSizeInBytes / 1000.0;

  let meta = {};
  meta.size = fileSizeInKilobytes;
  console.log(plugin)


 // Collect metadata for each plugin
 pluginsMetadata[getFileName(plugin)] = {
  path: plugin,
  size: fileSizeInKilobytes
  // Add other metadata as needed
};

  const htmlContent = generateHtml(getFileName(plugin), plugin.id, meta);

  let pluginHtmlPath = `../mantra-client/public/plugins/${getFileName(plugin)}.html`;
  fs.writeFile(pluginHtmlPath, htmlContent, err => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`Created ${pluginHtmlPath}`);
    }
  });


});

// Function to generate HTML content
function generateHtml(pluginName, pluginId, meta = {}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mantra - Client Demo</title>
<script type="module" src="../../mantra.js"></script>
<link rel="stylesheet" href="../../mantra.css">
</head>

<body>
<script type="module" src="./${pluginName}.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', (event) => {
    let game = new MANTRA.Game({
      loadDefaultPlugins: false
    });
    let ${pluginName.toLowerCase()} = new window.PLUGINS.${pluginName}.default();
    // game is not required for plugins to work, except some plugins are still hard-coded to use it
    ${pluginName.toLowerCase()}.init(game);
    game.use('PluginExplorer');
    game.start(function(){
      let pluginInstance = game.systems[${pluginName.toLowerCase()}];
      let pluginClass = window.PLUGINS[${pluginName}].default;
      game.systems['gui-plugin-explorer'].drawPluginForm(pluginInstance, pluginClass)
    })
  });
</script>
<div id="gameHolder"></div>
<div style="margin-top: 30px; padding: 20px; background-color: #f7f7f7; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #333; font-weight: bold;">Powered by Yantra</h3>
    <h4 style="color: #555;">Mantra: Game Development Framework</h4>
    <p style="color: #666; line-height: 1.5;">
        This plugin, a standalone module of the Mantra game engine, can be seamlessly integrated into any web environment. Designed for versatility, it doesn't require the Mantra framework to function. Embed this plugin effortlessly into your webpage and unlock its full potential.
    </p>
    <p>
      The total uncompression size of this plugin is <strong>${meta.size} KB</strong>.
    </p>
    <div style="background-color: #e9e9e9; padding: 15px; border-radius: 8px; margin-top: 10px;">
        <p style="color: #333; margin-bottom: 5px;">Embedding Example:</p>
        <code style="display: block; color: #222; background-color: #f1f1f1; padding: 10px; border-radius: 5px; white-space: pre-wrap;">
&lt;script type="module" src="/plugins/${pluginName}.js"&gt;&lt;/script&gt;
&lt;script&gt;
  let ${pluginName.toLowerCase()} = new window.PLUGINS.${pluginName}.default();
  ${pluginName.toLowerCase()}.init();
&lt;/script&gt;
        </code>
    </div>
  
</div>

</p>
</body>

</html>`;
}

// ... [existing imports and plugin array]

// Function to generate the index HTML
function generateIndexHtml(plugins) {
  let tableRows = plugins.map(plugin => {
    const pluginName = getFileName(plugin);
    return `<tr>
      <td>${pluginName}</td>
      <td>${plugin}</td>
      <td><a href="../plugins/${pluginName}.html">Demo</a></td>
    </tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plugin Directory</title>
  <link rel="stylesheet" href="../mantra.css">
</head>
<body>
  <div class="gui-container">
  <table class="editor-table">
    <thead>
      <tr>
        <th>Plugin Name</th>
        <th>Plugin Source</th>
        <th>Plugin Demo</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
  </div>
</body>
</html>`;
}

// ... [existing plugin forEach loop]

// After generating individual plugin HTML files
fs.writeFile('../mantra-client/public/plugins/index.html', generateIndexHtml(plugins), err => {
  if (err) {
    console.error('Error writing index.html:', err);
  } else {
    console.log('Created index.html with plugin directory');
  }
});

// Function to write pluginsList.js file
function writePluginsListFile(metadata) {
  const content = `const pluginsList = ${JSON.stringify(metadata, null, 2)};\nexport default pluginsList;`;
  fs.writeFile('../mantra-game/plugins/gui-plugins/pluginsList.js', content, err => {
    if (err) {
      console.error('Error writing pluginsList.js:', err);
    } else {
      console.log('Created pluginsList.js');
    }
  });
}


// Write the pluginsList.js file after processing all plugins
writePluginsListFile(pluginsMetadata);

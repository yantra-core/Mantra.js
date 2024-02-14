let categories = [
  {
    title: 'Entity', // pink
    name: 'entity',
    color: '#e91e63',
    description: 'Entities are the main game objects.',
    image: 'placeholder-image.jpg',
    url: 'entity.html',
    tags: ['entity', 'system', 'components', 'entities', 'objects', 'instances', 'prefabs', 'instances', 'instances', 'instances']
  },

  {
    title: 'Physics', // purple
    name: 'physics',
    color: '#9c27b0',
    description: 'Interact with bodies, forces, gravity.',
    image: 'placeholder-image.jpg',
    url: 'physics.html',
    tags: ['physics', 'engine', 'motion', 'movement', 'gravity', 'force', 'velocity', 'mass', 'acceleration', 'inertia', 'friction']
  },

  {
    title: 'Lifecycle', // blue
    name: 'lifecycle',
    color: '#2196f3',
    description: 'Hook into game events.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle.html',
    tags: ['lifecycle', 'game', 'start', 'update', 'render', 'stop', 'pause', 'resume', 'load', 'unload', 'reset', 'restart', 'hook', 'event', 'before', 'after', 'middle']
  },

  {
    title: 'Items', // teal
    name: 'items',
    color: '#009688',
    description: 'Items can be collected and used.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    title: 'Textures', // green
    name: 'textures',
    color: '#4caf50',
    description: 'Change the appearance of entities.',
    image: 'placeholder-image.jpg',
    url: 'textures.html',
    tags: ['textures', 'images', 'graphics', 'assets', 'resources', 'files', 'loading', 'unloading', 'applying', 'updating', 'changing', 'modifying', 'replacing']
  },
  {
    title: 'Render', // blue
    name: 'render',
    color: '#2196f3',
    description: 'Render entities using RenderPlex pipeline.',
    image: 'placeholder-image.jpg',
    url: 'render.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    "title": "Assets",
    name: "assets",
    "color": "#795548", // brown
    "description": "Load and use custom game assets.",
    "image": "placeholder-image.jpg",
    "url": "assets.html",
    "tags": ["assets", "management", "loading", "unloading", "resources", "optimization", "storage", "caching", "streaming"]
  },
  {
    "title": "Audio & Sound",
    name: "audio",
    "color": "#00bcd4", // cyan
    "description": "Integrate and control audio elements for immersive game experiences.",
    "image": "placeholder-image.jpg",
    "url": "sound.html",
    "tags": ["audio", "sound", "music", "effects", "background music", "soundtrack", "volume", "playback", "midi", "tone"]
  },
  {
    "title": "Input Controls",
    "name": "inputs",
    "color": "#ff5722", // deep orange
    "description": "Mouse, Keyboard, Gamepad, Touch, and other input methods.",
    "image": "placeholder-image.jpg",
    "url": "inputs.html",
    "tags": ["gui", "controls", "interface", "user experience", "input", "navigation", "interaction", "gamepad", "keyboard", "mouse"]
  },
  /*
  {
    "title": "Game Logic",
    name: "logic",
    "color": "#673ab7", // deep purple
    "description": "Write custom logic for your games.",
    "image": "placeholder-image.jpg",
    "url": "game-logic-systems.html",
    "tags": ["logic", "systems", "scoring", "AI", "rules", "gameplay", "state management", "decision making", "behavior", "strategy"]
  },
  {
    title: 'Game Config', // red
    name: 'config',
    color: '#f44336',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Plugins', // orange
    name: 'plugins',
    color: '#ff9800',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  }
  */

];

//  assets   tags: ['assets', 'management', 'loading', 'resources', 'files', 'images', 'audio', 'video', 'fonts', 'scripts', 'data']

let examples = [];

let item_examples = [
  {
    title: 'Block',
    category: 'items',
    description: 'Blocks are can be split into smaller blocks.',
    image: 'placeholder-image.jpg',
    url: 'items/block.html',
    tags: ['block', 'item', 'inventory', 'building', 'construction', 'material', 'structure', 'obstacle', 'barrier', 'wall', 'floor']
  },
  {
    title: 'Bomb',
    category: 'items',
    description: 'Bombs can be thrown and explode after a set time.',
    image: 'placeholder-image.jpg',
    url: 'items/bomb.html',
    tags: ['bomb', 'item', 'inventory', 'explosive', 'damage', 'area', 'effect', 'blast', 'radius', 'timer', 'fuse']
  },
  {
    title: 'Bullet',
    category: 'items',
    description: 'Bullets shoot in a straight line and deal damage to entities they hit.',
    image: 'placeholder-image.jpg',
    url: 'items/bullet.html',
    tags: ['bullet', 'item', 'inventory', 'projectile', 'damage', 'range', 'speed', 'accuracy', 'penetration', 'piercing', 'shooting']
  },
  {
    title: 'Boomerang',
    category: 'items',
    description: 'Boomerangs can be thrown and return.',
    image: 'placeholder-image.jpg',
    url: 'items/boomerang.html',
    tags: ['boomerang', 'item', 'inventory', 'throwing', 'damage', 'return', 'range', 'speed', 'accuracy', 'penetration', 'piercing']
  },
  {
    title: 'Apply Force',
    category: 'physics',
    description: 'Apply a force to an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/apply-force.html',
    tags: ['apply', 'force', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Set Position',
    category: 'physics',
    description: 'Set the position of an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/set-position.html',
    tags: ['set', 'position', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Rotate',
    category: 'physics',
    description: 'Rotate an entity.',
    image: 'placeholder-image.jpg',
    url: 'physics/rotate.html',
    tags: ['rotate', 'entity', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  }
];

let entity_examples = [

  {
    title: 'Create Entity',
    category: 'entity',
    description: 'Create a new entity.',
    image: 'placeholder-image.jpg',
    url: 'entity/create-entity.html',
    tags: ['create', 'entity', 'scene', 'add', 'new', 'instance', 'object', 'prefab', 'clone', 'copy', 'duplicate']
  },
  {
    title: 'Remove Entity',
    category: 'entity',
    description: 'Remove an entity',
    image: 'placeholder-image.jpg',
    url: 'entity/remove-entity.html',
    tags: ['remove', 'entity', 'scene', 'delete', 'destroy', 'dispose', 'clear', 'purge', 'eliminate', 'exterminate']
  },
  {
    title: 'Update Entity',
    category: 'entity',
    description: 'Update an entity.',
    image: 'placeholder-image.jpg',
    url: 'entity/update-entity.html',
    tags: ['update', 'entity', 'scene', 'modify', 'change', 'edit', 'adjust', 'transform', 'position', 'rotation', 'scale']
  },
  {
    title: 'Get Entity',
    category: 'entity',
    description: 'Get an entity',
    image: 'placeholder-image.jpg',
    url: 'entity/get-entity.html',
    tags: ['get', 'entity', 'scene', 'find', 'search', 'locate', 'retrieve', 'fetch', 'obtain', 'acquire', 'detect']
  },
  {
    title: 'Entity Lifetime',
    category: 'entity',
    description: 'Set the time duration an entity will exist.',
    image: 'placeholder-image.jpg',
    url: 'entity/entity-lifetime.html',
    tags: ['entity', 'lifetime', 'duration', 'time', 'exist', 'live', 'survive', 'persist', 'endure', 'continue', 'remain']
  }

];


let lifecycle_examples = [
  {
    title: 'before.update',
    category: 'lifecycle',
    description: 'Run code before the update loop.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-update.html',
    tags: ['before', 'update', 'loop', 'game', 'run', 'execute', 'code', 'function', 'hook', 'event', 'event', 'event']
  },
  {
    title: 'after.update',
    category: 'lifecycle',
    description: 'Run code after the update loop.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-update.html',
    tags: ['after', 'update', 'loop', 'game', 'run', 'execute', 'code', 'function', 'hook', 'event', 'event', 'event']
  },
];

let texture_examples = [
  {
    title: 'Set Texture',
    category: 'textures',
    description: 'Set a texture on Entity.',
    image: 'placeholder-image.jpg',
    url: 'textures/set-texture.html',
    tags: ['load', 'texture', 'graphic', 'sprite', 'image', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  },
  {
    title: 'Update Texture',
    category: 'textures',
    description: 'Update a texture on Entity.',
    image: 'placeholder-image.jpg',
    url: 'textures/update-texture.html',
    tags: ['unload', 'texture', 'graphic', 'sprite', 'image', 'asset', 'resource', 'file', 'unload', 'unload', 'unload', 'unload', 'unload', 'unload']
  },
  {
    title: 'Sprite Sheets',
    category: 'textures',
    description: 'Sprite textures from a sprite sheet',
    image: 'placeholder-image.jpg',
    url: 'textures/sprite-sheets.html',
    tags: ['sprite', 'sheet', 'texture', 'graphic', 'sprite', 'image', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  },

];

let render_examples = [
  {
    title: 'CSS3 Graphics',
    category: 'render',
    description: 'Render entities using CSS3.',
    image: 'placeholder-image.jpg',
    url: 'render/css3.html',
    tags: ['css3', 'graphics', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    title: 'Babylon.js WebGPU',
    category: 'render',
    description: 'Render entities using Babylon.js WebGPU.',
    image: 'placeholder-image.jpg',
    url: 'render/babylon.html',
    tags: ['babylon.js', 'webgpu', 'graphics', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    title: "Three.js WebGL",
    category: 'render',
    description: 'Render entities using Three.js WebGL.',
    image: 'placeholder-image.jpg',
    url: 'render/three.html',
    tags: ['three.js', 'webgl', 'graphics', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  }
]

let asset_examples = [
  {
    title: 'Load Image',
    category: 'assets',
    description: 'Load an image asset.',
    image: 'placeholder-image.jpg',
    url: 'assets/load-image.html',
    tags: ['load', 'image', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  },
  {
    title: 'Load Sprite Sheet',
    category: 'assets',
    description: 'Load a sprite sheet asset.',
    image: 'placeholder-image.jpg',
    url: 'assets/load-sprite-sheet.html',
    tags: ['load', 'sprite', 'sheet', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  }
  /*
  {
    title: 'Load FBX Model',
    category: 'assets',
    description: 'Load an FBX model asset.',
    image: 'placeholder-image.jpg',
    url: 'assets/load-fbx-model.html',
    tags: ['load', 'fbx', 'model', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  },
  {
    title: 'Load Audio',
    category: 'assets',
    description: 'Load an audio asset.',
    image: 'placeholder-image.jpg',
    url: 'assets/load-audio.html',
    tags: ['load', 'audio', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load'
  }*/
]

let input_examples = [
  {
    title: 'Keyboard',
    category: 'inputs',
    description: 'Handle keyboard input.',
    image: 'placeholder-image.jpg',
    url: 'inputs/keyboard.html',
    tags: ['keyboard', 'input', 'controls', 'interface', 'user experience', 'input', 'navigation', 'interaction', 'gamepad', 'keyboard', 'mouse']
  },
  {
    title: 'Mouse',
    category: 'inputs',
    description: 'Handle mouse input.',
    image: 'placeholder-image.jpg',
    url: 'inputs/mouse.html',
    tags: ['mouse', 'input', 'controls', 'interface', 'user experience', 'input', 'navigation', 'interaction', 'gamepad', 'keyboard', 'mouse']
  },
  {
    title: 'Gamepad',
    category: 'inputs',
    description: 'Handle gamepad input.',
    image: 'placeholder-image.jpg',
    url: 'inputs/gamepad.html',
    tags: ['gamepad', 'input', 'controls', 'interface', 'user experience', 'input', 'navigation', 'interaction', 'gamepad', 'keyboard', 'mouse']
  },
  /*
  {
    title: 'Touch',
    category: 'inputs',
    description: 'Handle touch input.',
    image: 'placeholder-image.jpg',
    url: 'inputs/touch.html',
    tags: ['touch', 'input', 'controls', 'interface', 'user experience', 'input', 'navigation', 'interaction', 'gamepad', 'keyboard', 'mouse']
  }
  */
];

let audio_examples = [
  /*
  {
    title: 'Play Sound',
    category: 'audio',
    description: 'Play a sound.',
    image: 'placeholder-image.jpg',
    url: 'audio/play-sound.html',
    tags: ['play', 'sound', 'audio', 'music', 'effects', 'background music', 'soundtrack', 'volume', 'playback', 'midi', 'tone']
  },
  */
  {
    title: 'Play Tone',
    category: 'audio',
    description: 'Play a tone.',
    image: 'placeholder-image.jpg',
    url: 'audio/play-tone.html',
    tags: ['play', 'tone', 'audio', 'music', 'effects', 'background music', 'soundtrack', 'volume', 'playback', 'midi', 'tone']
  },
  {
    title: 'Virtual Piano',
    category: 'audio',
    description: 'Play a virtual piano.',
    image: 'placeholder-image.jpg',
    url: 'audio/virtual-piano.html',
    tags: ['virtual', 'piano', 'audio', 'music', 'effects', 'background music', 'soundtrack', 'volume', 'playback', 'midi', 'tone']
  }
];

// concat all arr to examples
examples = examples.concat(item_examples);
examples = examples.concat(entity_examples);
examples = examples.concat(lifecycle_examples);
examples = examples.concat(texture_examples);
examples = examples.concat(render_examples);
examples = examples.concat(asset_examples);
examples = examples.concat(input_examples);
examples = examples.concat(audio_examples);


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
    title: 'Behavior Trees', // deep purple
    name: 'behaviors',
    color: '#673ab7',
    description: 'Sutra Behavioral Trees for game logic.',
    image: 'placeholder-image.jpg',
    url: 'behaviors.html',
    tags: ['behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  {
    title: 'Items', // light blue
    name: 'items',
    color: '#03a9f4',
    description: 'Items can be collected and used.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    "title": "Collisions",
    "name": "collisions",
    "color": "#ff9800", // orange
    "description": "Detect and respond to collisions between entities.",
    "image": "placeholder-image.jpg",
    "url": "collisions.html",
    "tags": ["collisions", "detection", "response", "hit", "impact", "contact", "interaction", "overlap", "intersection", "touch", "crash"]
  },
  {
    title: 'Camera', // light green
    name: 'camera',
    color: '#8bc34a',
    description: 'Control the camera and view.',
    image: 'placeholder-image.jpg',
    url: 'camera.html',
    tags: ['camera', 'view', 'perspective', 'angle', 'zoom', 'pan', 'tilt', 'rotate', 'follow', 'look', 'focus', 'position']
  },
  {
    title: 'Textures', // amber
    name: 'textures',
    color: '#ffc107',
    description: 'Change the appearance of entities.',
    image: 'placeholder-image.jpg',
    url: 'textures.html',
    tags: ['textures', 'images', 'graphics', 'assets', 'resources', 'files', 'loading', 'unloading', 'applying', 'updating', 'changing', 'modifying', 'replacing']
  },
  {
    title: 'Render', // Deep Brown
    name: 'render',
    color: '#9e91a3',
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
  {
    "title": "Tiles",
    name: "tiles",
    "color": "#9e9e9e", // grey
    "description": "Create and manage tile-based maps.",
    "image": "placeholder-image.jpg",
    "url": "tilemaps.html",
    "tags": ["tilemaps", "maps", "levels", "worlds", "environments", "terrain", "landscapes", "scenery", "backgrounds", "landmarks", "geography"]
  },
  {
    "title": "Terrains",
    name: "terrain",
    "color": "#4caf50", // green
    "description": "Procedurally generate Mazes, Biomes, Terrains.",
    "image": "placeholder-image.jpg",
    "url": "terrain.html",
    "tags": ["terrain", "biomes", "mazes", "labyrinths", "environments", "worlds", "landscapes", "scenery", "backgrounds", "landmarks", "geography"]
  },
  {
    title: 'Game Config', // blue grey
    name: 'config',
    color: '#f44336',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Movement', // Yellow
    name: 'movement',
    color: '#ffeb3b',
    description: 'Movement systems for players and entities.',
    image: 'placeholder-image.jpg',
    url: 'movement.html',
    tags: ['movement', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Scenes', // Lime
    name: 'scenes',
    color: '#3f51b5',
    description: 'Manage scenes and transitions.',
    image: 'placeholder-image.jpg',
    url: 'scenes.html',
    tags: ['scenes', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  {
    title: 'Containers', // Lime
    name: 'containers',
    color: '#cddc39',
    description: 'Group entites into containers.',
    image: 'placeholder-image.jpg',
    url: 'containers.html',
    tags: ['containers', 'groups', 'layouts', 'arrangements', 'compositions', 'assemblies', 'collections', 'assemblages', 'aggregations']
  },
  {
    title: 'Game Lifecycle', // Pink A200
    name: 'lifecycle',
    color: '#ff4081',
    description: 'Hook into game events.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle.html',
    tags: ['lifecycle', 'game', 'start', 'update', 'render', 'stop', 'pause', 'resume', 'load', 'unload', 'reset', 'restart', 'hook', 'event', 'before', 'after', 'middle']
  },

];


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
    title: 'Plugins', // orange
    name: 'plugins',
    color: '#ff9800',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  }
  */
//  assets   tags: ['assets', 'management', 'loading', 'resources', 'files', 'images', 'audio', 'video', 'fonts', 'scripts', 'data']

let examples = [];

let physics_examples = [
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

// before.collisionStart, after.collisionStart
// before.collisionEnd,  after.collisionEnd
// before.collisionActive, after.collisionActive
// before.createEntity, after.createEntity
// before.removeEntity, after.removeEntity
// before.updateEntity, after.updateEntity
// before.createEntity, after.createEntity
let lifecycle_examples = [
  {
    title: 'before.update',
    category: 'lifecycle',
    description: 'Run code before the update loop.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-update.html',
    tags: ['before', 'update', 'loop', 'game', 'run', 'execute', 'code', 'function', 'hook', 'lifecycle', 'event', 'emitter']
  },
  {
    title: 'after.update',
    category: 'lifecycle',
    description: 'Run code after the update loop.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-update.html',
    tags: ['after', 'update', 'loop', 'game', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.createEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code before an entity is created.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-create-entity.html',
    tags: ['before', 'create', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.createEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code after an entity is created.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-create-entity.html',
    tags: ['after', 'create', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.removeEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code before an entity is removed.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-remove-entity.html',
    tags: ['before', 'remove', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.removeEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code after an entity is removed.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-remove-entity.html',
    tags: ['after', 'remove', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.updateEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code before an entity is updated.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-update-entity.html',
    tags: ['before', 'update', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.updateEntity',
    category: ['lifecycle', 'entity'],
    description: 'Run code after an entity is updated.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-update-entity.html',
    tags: ['after', 'update', 'entity', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.collisionStart',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code before a collision starts.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-collision-start.html',
    tags: ['before', 'collision', 'start', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.collisionStart',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code after a collision starts.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-collision-start.html',
    tags: ['after', 'collision', 'start', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.collisionEnd',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code before a collision ends.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-collision-end.html',
    tags: ['before', 'collision', 'end', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.collisionEnd',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code after a collision ends.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-collision-end.html',
    tags: ['after', 'collision', 'end', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'before.collisionActive',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code before a collision is active.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/before-collision-active.html',
    tags: ['before', 'collision', 'active', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  },
  {
    title: 'after.collisionActive',
    category: ['lifecycle', 'collisions', 'entity'],
    description: 'Run code after a collision is active.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle/after-collision-active.html',
    tags: ['after', 'collision', 'active', 'run', 'execute', 'code', 'function', 'hook', 'event', 'lifecycle', 'emitter']
  }
];

let texture_examples = [
  {
    title: 'Set Texture',
    category: ['textures', 'entity'],
    description: 'Set a texture on Entity.',
    image: 'placeholder-image.jpg',
    url: 'textures/set-texture.html',
    tags: ['load', 'texture', 'graphic', 'sprite', 'image', 'asset', 'resource', 'file', 'load', 'load', 'load', 'load', 'load', 'load']
  },
  {
    title: 'Update Texture',
    category: ['textures', 'entity'],
    description: 'Update a texture on Entity.',
    image: 'placeholder-image.jpg',
    url: 'textures/update-texture.html',
    tags: ['unload', 'texture', 'graphic', 'sprite', 'image', 'asset', 'resource', 'file', 'unload', 'unload', 'unload', 'unload', 'unload', 'unload']
  },
  {
    title: 'Sprite Sheets',
    category: ['textures', 'entity'],
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

let collision_examples = [
  {
    title: 'Collision Start',
    category: ['collisions', 'physics', 'entity'],
    description: 'Detect when a collision starts.',
    image: 'placeholder-image.jpg',
    url: 'collisions/collision-start.html',
    tags: ['collision', 'start', 'detect', 'event', 'hit', 'impact', 'contact', 'interaction', 'overlap', 'intersection', 'touch', 'crash']
  },
  {
    title: 'Collision Active',
    category: ['collisions', 'physics', 'entity'],
    description: 'Detect when a collision is active.',
    image: 'placeholder-image.jpg',
    url: 'collisions/collision-active.html',
    tags: ['collision', 'active', 'detect', 'event', 'hit', 'impact', 'contact', 'interaction', 'overlap', 'intersection', 'touch', 'crash']
  },
  {
    title: 'Collision End',
    category: ['collisions', 'physics', 'entity'],
    description: 'Detect when a collision ends.',
    image: 'placeholder-image.jpg',
    url: 'collisions/collision-end.html',
    tags: ['collision', 'end', 'detect', 'event', 'hit', 'impact', 'contact', 'interaction', 'overlap', 'intersection', 'touch', 'crash']
  }
];

let behaviors_examples = [
  /*
  {
    title: 'Conditional on Game State',
    category: 'behaviors',
    description: 'Run a behavior based on game state.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/conditional-on-game-state.html',
    tags: ['conditional', 'game', 'state', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  */
  {
    title: 'Entity State',
    category: ['behaviors', 'entity'],
    description: 'Run a behavior based on entity state.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/entity-state.html',
    tags: ['conditional', 'entity', 'state', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  {
    title: 'Game Tick',
    category: 'behaviors',
    description: 'Run a behavior based on game tick.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/game-tick.html',
    tags: ['conditional', 'game', 'tick', 'time', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  /* Remark: Not really needed, we have lifetime, could be better suited as new core api for timers on ticks, etc
  {
    title: 'Conditional on Entity Tick Time',
    category: ['behaviors', 'entity'],
    description: 'Run a behavior based on entity tick time.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/conditional-on-entity-tick-time.html',
    tags: ['conditional', 'entity', 'tick', 'time', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  */
  {
    title: 'Entity Collisions',
    category: ['behaviors', 'entity', 'collisions', 'physics'],
    description: 'Run a behavior based on entity collision.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/entity-collision.html',
    tags: ['conditional', 'entity', 'collision', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  {
    title: 'Keyboard Input',
    category: ['behaviors', 'inputs'],
    description: 'Run a behavior based on keyboard input.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/keyboard-input.html',
    tags: ['conditional', 'keyboard', 'input', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  /*
  {
    title: 'Mouse Input',
    category: ['behaviors', 'inputs'],
    description: 'Run a behavior based on mouse input.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/mouse-input.html',
    tags: ['conditional', 'mouse', 'input', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  },
  */
  {
    title: 'Gamepad Input',
    category: ['behaviors', 'inputs'],
    description: 'Run a behavior based on gamepad input.',
    image: 'placeholder-image.jpg',
    url: 'behaviors/gamepad-input.html',
    tags: ['conditional', 'gamepad', 'input', 'behavior', 'tree', 'sutra', 'AI', 'decision', 'making', 'strategy', 'state', 'management', 'rules', 'gameplay']
  }
];

let tiles_examples = [
  {
    title: 'TileMap Object',
    category: 'tiles',
    description: 'Create a tilemap from an array of integers.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/tilemap-object.html',
    tags: ['create', 'tilemap', 'array', 'integers', 'map', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },


  {
    title: 'TileMap Array',
    category: 'tiles',
    description: 'Create a tilemap from an array of integers.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/create-tilemap-from-array-of-integers.html',
    tags: ['create', 'tilemap', 'array', 'integers', 'map', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  /*
  {
    title: 'Tilemap from Tiled Editor JSON',
    category: 'tiles',
    description: 'Create a tilemap from Tiled Editor JSON.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/create-tilemap-from-tiled-editor-json.html',
    tags: ['create', 'tilemap', 'tiled', 'editor', 'json', 'map', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  */
  {
    title: 'TileSets',
    category: 'tiles',
    description: 'Create custom tilesets.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/custom-tilesets.html',
    tags: ['custom', 'tilesets', 'map', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  {
    title: 'Labyrinthos.js TileMaps',
    category: 'tiles',
    description: 'Create a tilemap from Labyrinthos.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/tilemap-from-labyrinthos.html',
    tags: ['tilemap', 'labyrinthos', 'map', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  {
    title: 'Tile Collisions',
    category: ['tiles', 'collisions'],
    description: 'Detect and respond to tile collisions.',
    image: 'placeholder-image.jpg',
    url: 'tilemaps/tile-collisions.html',
    tags: ['tile', 'collisions', 'detection', 'response', 'hit', 'impact', 'contact', 'interaction', 'overlap', 'intersection', 'touch', 'crash']
  }
];

let terrains_examples = [
  {
    title: 'Procedural Maze',
    category: 'terrain',
    description: 'Generate a procedural maze.',
    image: 'placeholder-image.jpg',
    url: 'terrain/procedural-maze.html',
    tags: ['procedural', 'maze', 'labyrinth', 'generate', 'create', 'make', 'build', 'construct', 'design', 'develop']
  },
  {
    title: 'Procedural Biome',
    category: 'terrain',
    description: 'Generate a procedural biome.',
    image: 'placeholder-image.jpg',
    url: 'terrain/procedural-biome.html',
    tags: ['procedural', 'biome', 'generate', 'create', 'make', 'build', 'construct', 'design', 'develop']
  },
  {
    title: 'Infinite Maze',
    category: 'terrain',
    description: 'Generate an infinite maze.',
    image: 'placeholder-image.jpg',
    url: 'terrain/infinite-maze.html',
    tags: ['infinite', 'maze', 'labyrinth', 'generate', 'create', 'make', 'build', 'construct', 'design', 'develop']
  },
  /*
  {
    title: 'L-Systems',
    category: 'terrain',
    description: 'Generate terrain using L-Systems.',
    image: 'placeholder-image.jpg',
    url: 'terrain/l-systems.html',
    tags: ['l-systems', 'terrain', 'generate', 'create', 'make', 'build', 'construct', 'design', 'develop']
  }
  */
];

let config_examples = [
  {
    title: 'GameConfig Object',
    category: 'config',
    description: 'Explore the GameConfig object.',
    image: 'placeholder-image.jpg',
    url: 'game-config/game-config-object.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Game Root',
    category: 'config',
    description: 'Change the default game root for assets and scripts',
    image: 'placeholder-image.jpg',
    url: 'game-config/game-root.html',
    tags: ['game', 'root', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Game Size',
    category: 'config',
    description: 'Change the default game size.',
    image: 'placeholder-image.jpg',
    url: 'game-config/game-size.html',
    tags: ['game', 'size', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Game Graphics',
    category: 'config',
    description: 'Change the default game graphic and rendering settings.',
    image: 'placeholder-image.jpg',
    url: 'game-config/game-graphics.html',
    tags: ['game', 'graphics', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Game Plugins',
    category: 'config',
    description: 'Use Plugins to extend game functionality.',
    image: 'placeholder-image.jpg',
    url: 'game-config/game-plugins.html',
    tags: ['game', 'plugins', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Field of View',
    category: ['config', 'entity'],
    description: 'Change the default game field of view.',
    image: 'placeholder-image.jpg',
    url: 'game-config/field-of-view.html',
    tags: ['field', 'of', 'view', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'FPS',
    category: 'config',
    description: 'Change the default game Frames Per Second.',
    image: 'placeholder-image.jpg',
    url: 'game-config/frames-per-second.html',
    tags: ['frames', 'per', 'second', 'fps', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
];

let movement_examples = [
  {
    title: 'Top Down Movement',
    category: 'movement',
    description: 'Top down movement system for players and entities.',
    image: 'placeholder-image.jpg',
    url: 'movement/top-down-movement.html',
    tags: ['top', 'down', 'movement', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  /*
  {
    title: 'Platform Movement',
    category: 'movement',
    description: 'Platform movement system for players and entities.',
    image: 'placeholder-image.jpg',
    url: 'movement/platform-movement.html',
    tags: ['platform', 'movement', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  */
  {
    title: 'Side Scroller Movement',
    category: 'movement',
    description: 'Side scroller movement system for players and entities.',
    image: 'placeholder-image.jpg',
    url: 'movement/side-scroller-movement.html',
    tags: ['side', 'scroller', 'movement', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  },
  {
    title: 'Jumping',
    category: 'movement',
    description: 'Jumping system for players and entities.',
    image: 'placeholder-image.jpg',
    url: 'movement/jumping.html',
    tags: ['jumping', 'physics', 'motion', 'movement', 'velocity', 'acceleration', 'inertia', 'friction', 'gravity']
  }
];

let container_examples = [
  {
    title: 'Group Entities',
    category: ['containers', 'entity'],
    description: 'Group entities together.',
    image: 'placeholder-image.jpg',
    url: 'containers/group-entities.html',
    tags: ['group', 'entities', 'group', 'layout', 'arrangement', 'composition', 'assembly', 'collection', 'assemblage', 'aggregation']
  },
  {
    title: 'Grid Layout',
    category: 'containers',
    description: 'Arrange entities in a grid layout.',
    image: 'placeholder-image.jpg',
    url: 'containers/grid-layout.html',
    tags: ['grid', 'layout', 'arrange', 'entities', 'group', 'layout', 'arrangement', 'composition', 'assembly', 'collection', 'assemblage', 'aggregation']
  },
  {
    title: 'Stack Layout',
    category: 'containers',
    description: 'Arrange entities in a stack layout.',
    image: 'placeholder-image.jpg',
    url: 'containers/stack-layout.html',
    tags: ['stack', 'layout', 'arrange', 'entities', 'group', 'layout', 'arrangement', 'composition', 'assembly', 'collection', 'assemblage', 'aggregation']
  }
];

let scenes_examples = [
  /*
  {
    title: 'Scene Transition',
    category: 'scenes',
    description: 'Transition between scenes.',
    image: 'placeholder-image.jpg',
    url: 'scenes/scene-transition.html',
    tags: ['scene', 'transition', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  */
  {
    title: 'Scene Loading',
    category: 'scenes',
    description: 'Load a scene.',
    image: 'placeholder-image.jpg',
    url: 'scenes/scene-loading.html',
    tags: ['scene', 'loading', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
  {
    title: 'Scene Unloading',
    category: 'scenes',
    description: 'Unload a scene.',
    image: 'placeholder-image.jpg',
    url: 'scenes/scene-unloading.html',
    tags: ['scene', 'unloading', 'levels', 'worlds', 'environments', 'terrain', 'landscapes', 'scenery', 'backgrounds', 'landmarks', 'geography']
  },
];

let camera_examples = [
  {
    title: 'Follow Player',
    category: 'camera',
    description: 'Follow the player with the camera.',
    image: 'placeholder-image.jpg',
    url: 'camera/follow-player.html',
    tags: ['follow', 'player', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  },
  {
    title: 'Camera Zoom',
    category: 'camera',
    description: 'Zoom the camera in and out.',
    image: 'placeholder-image.jpg',
    url: 'camera/camera-zoom.html',
    tags: ['zoom', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  },
  {
    title: 'Camera Shake',
    category: 'camera',
    description: 'Shake the camera.',
    image: 'placeholder-image.jpg',
    url: 'camera/camera-shake.html',
    tags: ['shake', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  },
  {
    title: 'Camera Move',
    category: 'camera',
    description: 'Move the camera.',
    image: 'placeholder-image.jpg',
    url: 'camera/camera-move.html',
    tags: ['move', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  },
  {
    title: 'Camera Position',
    category: 'camera',
    description: 'Set the camera position.',
    image: 'placeholder-image.jpg',
    url: 'camera/set-position.html',
    tags: ['set', 'position', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  },
  {
    title: 'Rotate Camera',
    category: 'camera',
    description: 'Rotate the camera.',
    image: 'placeholder-image.jpg',
    url: 'camera/rotate-camera.html',
    tags: ['rotate', 'camera', 'view', 'tracking', 'movement', 'position', 'rotation', 'scale']
  }
];

// concat all arr to examples
examples = examples.concat(item_examples);
examples = examples.concat(entity_examples);
examples = examples.concat(physics_examples);
examples = examples.concat(texture_examples);
examples = examples.concat(render_examples);
examples = examples.concat(asset_examples);
examples = examples.concat(input_examples);
examples = examples.concat(audio_examples);
examples = examples.concat(collision_examples);
examples = examples.concat(camera_examples);
examples = examples.concat(behaviors_examples);
examples = examples.concat(tiles_examples);
examples = examples.concat(terrains_examples);
examples = examples.concat(config_examples);
examples = examples.concat(movement_examples);
examples = examples.concat(container_examples);
examples = examples.concat(scenes_examples);
examples = examples.concat(lifecycle_examples);

// sort all the examples by title
examples.sort((a, b) => (a.title > b.title) ? 1 : -1);

// examples count
console.log('examples count:', examples.length)


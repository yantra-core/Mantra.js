

let categories = [
  {
    title: 'Physics', // purple
    color: '#9c27b0',
    description: 'Interact with bodies, forces, gravity.',
    image: 'placeholder-image.jpg',
    url: 'physics.html',
    tags: ['physics', 'engine', 'motion', 'movement', 'gravity', 'force', 'velocity', 'mass', 'acceleration', 'inertia', 'friction']
  },

  {
    title: 'Lifecycle', // blue
    color: '#2196f3',
    description: 'Hook into game events.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle.html',
    tags: ['lifecycle', 'game', 'start', 'update', 'render', 'stop', 'pause', 'resume', 'load', 'unload', 'reset', 'restart', 'hook', 'event', 'before', 'after', 'middle']
  },

  {
    title: 'Items', // teal
    color: '#009688',
    description: 'Items can be collected and used.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    title: 'Entity', // pink
    color: '#e91e63',
    description: 'Entities are the main game objects.',
    image: 'placeholder-image.jpg',
    url: 'entity.html',
    tags: ['entity', 'system', 'components', 'entities', 'objects', 'instances', 'prefabs', 'instances', 'instances', 'instances']
  },
  {
    title: 'Textures', // green
    color: '#4caf50',
    description: 'Change the appearance of entities.',
    image: 'placeholder-image.jpg',
    url: 'textures.html',
    tags: ['textures', 'images', 'graphics', 'assets', 'resources', 'files', 'loading', 'unloading', 'applying', 'updating', 'changing', 'modifying', 'replacing']
  },
  {
    title: 'Render', // blue
    color: '#2196f3',
    description: 'Render entities using RenderPlex pipeline.',
    image: 'placeholder-image.jpg',
    url: 'render.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },

  /*
  {
    title: 'Game Config', // red
    color: '#f44336',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Graphics', // blue
    color: '#2196f3',
    description: 'Explore examples featuring the graphics engine.',
    image: 'placeholder-image.jpg',
    url: 'graphics.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    title: 'Plugins', // orange
    color: '#ff9800',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  },
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

// concat all arr to examples
examples = examples.concat(item_examples);
examples = examples.concat(entity_examples);
examples = examples.concat(lifecycle_examples);
examples = examples.concat(texture_examples);
examples = examples.concat(render_examples);

import fs from 'fs';
import path from 'path';
// Directory where the HTML files will be saved
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// read the ./public/categories.js file and eval it
// let categories = eval(fs.readFileSync(path.join(__dirname, '/public/categories.js'), 'utf8'));

// Function to generate HTML content for each category
function generateCategoryHTML(category) {
  const categoryExamples = examples.filter(example => example.category === category.title.toLowerCase());
  let categoryHTML = `<div class="categories">`;

  categoryExamples.forEach(example => {
    categoryHTML += `
    <a class="staticExampleLink" href="${example.url}">
      <div class="category" style="background-color: ${category.color};">
        <span class="categoryExample">${category.title}</span>
        <p>${example.description}</p>
        <h3>${example.title}</h3>
      </div></a>`;
  });

  categoryHTML += `</div>`;
  return categoryHTML;
}

const outputDir = path.join(__dirname, 'public');
//let outputDir = __dirname;

let indexTemplate = fs.readFileSync(path.join(__dirname, '/_template.html'), 'utf8');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir, { recursive: true });
}
categories.forEach(category => {
  let str = new String(indexTemplate); // Assuming indexTemplate is your base HTML template string
  const categoryHTML = generateCategoryHTML(category);
  const filePath = path.join(outputDir, `${category.title.toLowerCase().replace(/\s+/g, '-')}.html`);
  
  let mantraGameDevFrameworksTags = [
    'javascript game development',
    'html5 game development',
    'webgl game development',
    'css game development',
    'css3 game development',
    'canvas game development',
    'web game development',
    'browser game development',
    'browser based game development',
    'browser games'
  ];

  str = str.replace('$$$categories$$$', categoryHTML);
  str = str.replace('$$$title$$$', 'Mantra - Examples - ' + category.title);

  // Combine category-specific tags with general game development tags and create a single keywords meta tag
  const combinedTags = [...category.tags, ...mantraGameDevFrameworksTags].join(', ');
  const metaKeywordsTag = `<meta name="keywords" content="${combinedTags}">`;
  // Create a description meta tag using the category description
  const metaDescriptionTag = `<meta name="description" content="${category.description}">`;
  // Insert meta tags into the template
  str = str.replace('$$$meta$$$', `${metaKeywordsTag}\n${metaDescriptionTag}`);

  // Generate simple html spans as tags for each tag in category.tags array
  const htmlTags = category.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n');
  str = str.replace('$$tags$$$', htmlTags);

  console.log(str); // For debugging, to see the final HTML string

  fs.writeFile(filePath, str, err => {
    if (err) {
      console.error(`Error writing file for category ${category.title}:`, err);
    } else {
      console.log(`File written for category ${category.title}: ${filePath}`);
    }
  });
});

// Function to generate HTML content for the main categories
function generateMainCategoriesHTML(categories) {
  let categoriesHTML = `<div class="categories">`;

  categories.forEach(category => {
    categoriesHTML += `
    <a class="staticExampleLink" href="${category.url}">
      <div class="category" style="background-color: ${category.color};">
        <span class="categoryExample">${category.title}</span>
        <p>${category.description}</p>
        <h3>${category.title}</h3>
      </div>
    </a>`;
  });

  categoriesHTML += `</div>`;
  return categoriesHTML;
}

// Generate the main categories HTML
const mainCategoriesHTML = generateMainCategoriesHTML(categories);
console.log("mainCategoriesHTML", mainCategoriesHTML)

// Create index.html content by replacing the placeholder with main categories HTML
let indexHTML = indexTemplate.replace('$$$categories$$$', mainCategoriesHTML);
indexHTML = indexHTML.replace('$$$title$$$', 'Mantra - Examples - Main Categories');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the index.html file
const indexPath = path.join(outputDir, 'index.html');
fs.writeFile(indexPath, indexHTML, err => {
  if (err) {
    console.error('Error writing index.html:', err);
  } else {
    console.log('index.html file written successfully.');
  }
});
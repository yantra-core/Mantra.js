let categories = [
  {
    title: 'Physics',
    description: 'Explore examples featuring the physics engine.',
    image: 'placeholder-image.jpg',
    url: 'physics.html',
    tags: ['physics', 'engine', 'motion', 'movement', 'gravity', 'force', 'velocity', 'mass', 'acceleration', 'inertia', 'friction']
  },
  {
    title: 'Graphics',
    description: 'Explore examples featuring the graphics engine.',
    image: 'placeholder-image.jpg',
    url: 'graphics.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  {
    title: 'Assets',
    description: 'Explore examples featuring the asset management system.',
    image: 'placeholder-image.jpg',
    url: 'assets.html',
    tags: ['assets', 'management', 'loading', 'resources', 'files', 'images', 'audio', 'video', 'fonts', 'scripts', 'data']
  },
  {
    title: 'Plugins',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  },
  {
    title: 'Game Config',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  {
    title: 'Items',
    description: 'Explore examples featuring the item system.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    title: 'Entity',
    description: 'Explore examples featuring the entity system.',
    image: 'placeholder-image.jpg',
    url: 'entity.html',
    tags: ['entity', 'system', 'components', 'entities', 'objects', 'instances', 'prefabs', 'instances', 'instances', 'instances']
  }
];

let examples = [
  {
    title: 'Block',
    category: 'items',
    description: 'Create a block item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/block.html',
    tags: ['block', 'item', 'inventory', 'building', 'construction', 'material', 'structure', 'obstacle', 'barrier', 'wall', 'floor']
  },
  {
    title: 'Bomb',
    category: 'items',
    description: 'Create a bomb item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/bomb.html',
    tags: ['bomb', 'item', 'inventory', 'explosive', 'damage', 'area', 'effect', 'blast', 'radius', 'timer', 'fuse']
  },
  {
    title: 'Bullet',
    category: 'items',
    description: 'Create a bullet item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/bullet.html',
    tags: ['bullet', 'item', 'inventory', 'projectile', 'damage', 'range', 'speed', 'accuracy', 'penetration', 'piercing', 'shooting']
  },
  {
    title: 'Boomerang',
    category: 'items',
    description: 'Create a boomerang item and add it to the inventory.',
    image: 'placeholder-image.jpg',
    url: 'items/boomerang.html',
    tags: ['boomerang', 'item', 'inventory', 'throwing', 'damage', 'return', 'range', 'speed', 'accuracy', 'penetration', 'piercing']
  },
  {
    title: 'Create Entity',
    category: 'entity',
    description: 'Create a new entity and add it to the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/create-entity.html',
    tags: ['create', 'entity', 'scene', 'add', 'new', 'instance', 'object', 'prefab', 'clone', 'copy', 'duplicate']
  },
  {
    title: 'Remove Entity',
    category: 'entity',
    description: 'Remove an entity from the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/remove-entity.html',
    tags: ['remove', 'entity', 'scene', 'delete', 'destroy', 'dispose', 'clear', 'purge', 'eliminate', 'exterminate']
  },
  {
    title: 'Update Entity',
    category: 'entity',
    description: 'Update an entity in the scene.',
    image: 'placeholder-image.jpg',
    url: 'entity/update-entity.html',
    tags: ['update', 'entity', 'scene', 'modify', 'change', 'edit', 'adjust', 'transform', 'position', 'rotation', 'scale']
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

// TODO: add logic here so when key is pressed, the search is performed based on the input value
// we should search on "categories" and "examples" arrays and display the results
// we should search on title, category, and the "tags" array

document.addEventListener('DOMContentLoaded', (event) => {
  const searchInput = document.getElementById('searchInput');
  const categoriesContainer = document.querySelector('.categories');

  searchInput.addEventListener('input', handleSearch);

  function handleSearch() {
    const keyword = searchInput.value.toLowerCase();
    const filteredCategories = categories.filter(category =>
      category.title.toLowerCase().includes(keyword) ||
      category.description.toLowerCase().includes(keyword) ||
      category.tags.some(tag => tag.toLowerCase().includes(keyword))
    );

    const filteredExamples = examples.filter(example =>
      example.title.toLowerCase().includes(keyword) ||
      example.category.toLowerCase().includes(keyword) ||
      example.description.toLowerCase().includes(keyword) ||
      example.tags.some(tag => tag.toLowerCase().includes(keyword))
    );

    updateDisplay(filteredCategories, filteredExamples);
  }

  function updateDisplay(categories, examples) {
    categoriesContainer.innerHTML = ''; // Clear the current content

    // Add filtered categories to the display
    categories.forEach(category => {
      categoriesContainer.innerHTML += `
    <div class="category">
      <img src="${category.image}" alt="${category.title}">
      <h3>${category.title}</h3>
      <p>${category.description}</p>
      <a href="${category.url}">View Category</a>
    </div>
  `;
    });

    // Optionally, add filtered examples to the display if needed
    // This part can be adjusted or expanded based on how you want to display examples
    examples.forEach(example => {
      categoriesContainer.innerHTML += `
    <div class="category">
      <img src="${example.image}" alt="${example.title}">
      <h3>${example.title}</h3>
      <p>${example.description}</p>
      <a href="${example.url}">View Example</a>
    </div>
  `;
    });
  }
});
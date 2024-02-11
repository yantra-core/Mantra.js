let categories = [
  {
    title: 'Physics', // purple
    color: '#9c27b0',
    description: 'Explore examples featuring the physics engine.',
    image: 'placeholder-image.jpg',
    url: 'physics.html',
    tags: ['physics', 'engine', 'motion', 'movement', 'gravity', 'force', 'velocity', 'mass', 'acceleration', 'inertia', 'friction']
  },
  /*
  {
    title: 'Graphics', // blue
    color: '#2196f3',
    description: 'Explore examples featuring the graphics engine.',
    image: 'placeholder-image.jpg',
    url: 'graphics.html',
    tags: ['graphics', 'engine', 'rendering', 'shaders', 'lighting', 'textures', 'materials', 'models', 'animation', 'effects']
  },
  */
 /*
  {
    title: 'Assets', // green
    color: '#4caf50',
    description: 'Explore examples featuring the asset management system.',
    image: 'placeholder-image.jpg',
    url: 'assets.html',
    tags: ['assets', 'management', 'loading', 'resources', 'files', 'images', 'audio', 'video', 'fonts', 'scripts', 'data']
  },
  */
 /*
  {
    title: 'Plugins', // orange
    color: '#ff9800',
    description: 'Explore examples featuring the plugin system.',
    image: 'placeholder-image.jpg',
    url: 'plugins.html',
    tags: ['plugins', 'system', 'modules', 'extensions', 'addons', 'features', 'components', 'interfaces', 'libraries', 'tools']
  },
  */
 /*
  {
    title: 'Game Config', // red
    color: '#f44336',
    description: 'Explore examples featuring the game configuration.',
    image: 'placeholder-image.jpg',
    url: 'game-config.html',
    tags: ['game', 'config', 'settings', 'options', 'preferences', 'parameters', 'variables', 'constants', 'properties', 'values']
  },
  */

  /*
  {
    title: 'Input', // yellow
  },
  */

  {
    title: 'Lifecycle', // blue
    color: '#2196f3',
    description: 'Explore examples featuring the game lifecycle.',
    image: 'placeholder-image.jpg',
    url: 'lifecycle.html',
    tags: ['lifecycle', 'game', 'start', 'update', 'render', 'stop', 'pause', 'resume', 'load', 'unload', 'reset', 'restart', 'hook', 'event', 'before', 'after', 'middle']
  },

  {
    title: 'Items', // teal
    color: '#009688',
    description: 'Explore examples featuring the item system.',
    image: 'placeholder-image.jpg',
    url: 'items.html',
    tags: ['items', 'system', 'inventory', 'equipment', 'consumables', 'loot', 'rewards', 'currencies', 'trading', 'crafting']
  },
  {
    title: 'Entity', // pink
    color: '#e91e63',
    description: 'Explore examples featuring the entity system.',
    image: 'placeholder-image.jpg',
    url: 'entity.html',
    tags: ['entity', 'system', 'components', 'entities', 'objects', 'instances', 'prefabs', 'instances', 'instances', 'instances']
  }
];

let examples = [];

let item_examples = [
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


// concat all arr to examples
examples = examples.concat(item_examples);
examples = examples.concat(entity_examples);
examples = examples.concat(lifecycle_examples);

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoriesContainer = document.querySelector('.categories');
  const exampleEmbedsContainer = document.querySelector('.exampleEmbeds');
  const exampleIframe = document.getElementById('example-embed');
  const codeEditor = document.querySelector('.code-editor'); // Assuming there's a code editor element with class 'code-editor'

  searchInput.addEventListener('input', handleSearch);

  // set the default push state to the root
  window.history.pushState({}, 'Mantra Examples', '/');

  window.addEventListener('popstate', function (event) {

    // Always clear the iframe and hide it
    exampleIframe.src = '';
    exampleEmbedsContainer.style.display = 'none';
  
    // Hide the code editor and clear it
    codeEditor.style.display = 'none';
    document.querySelector('.code-editor pre').textContent = '';
  
    // Always show the search container
    document.querySelector('.search-container').style.display = 'block';
  
    if (event.state) {
      const { type, title } = event.state;
      if (type === 'category') {
        // Display examples for this category
        const categoryExamples = filterExamples('', title);
        categoriesContainer.innerHTML = ''; // Clear the current content
        updateExamplesDisplay(categoryExamples);
      } else if (type === 'example') {
        // Load the example embed
        loadExampleEmbed({ title, url: event.state.url });
      }
    } else {
      // No state or root state, revert to initial categories display
      categoriesContainer.innerHTML = ''; // It's important to clear the content to reset the view
      updateCategoriesDisplay(categories);
    }
  
    // Always show categories container, but conditionally based on whether it's already populated
    if (!categoriesContainer.innerHTML.trim()) {
      updateCategoriesDisplay(categories);
    }
    categoriesContainer.style.display = 'flex'; // Show categories container
    exampleEmbedsContainer.style.display = 'none'; // Ensure example iframe container is hidden
  });
  

  function handleSearch() {
    const keyword = searchInput.value.toLowerCase();
    const filteredCategories = filterCategories(keyword);
    const filteredExamples = filterExamples(keyword);

    // Set embed src to empty string and hide
    exampleIframe.src = '';
    exampleEmbedsContainer.style.display = 'none';

    // Hide the code editor
    codeEditor.style.display = 'none';

    // show categories again
    categoriesContainer.style.display = 'flex';

    updateCategoriesDisplay(filteredCategories);
    updateExamplesDisplay(filteredExamples);

    // hide the example-embed
    // Remark: might not be needed, check pushState
    document.querySelector('#example-embed').style.display = 'none';
    // TODO: set src to empty?

  }

  function filterCategories(keyword) {
    return categories.filter(category =>
      category.title.toLowerCase().includes(keyword) ||
      category.description.toLowerCase().includes(keyword) ||
      category.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
  }

  function filterExamples(keyword, categoryFilter = null) {
    return examples.filter(example =>
      (!categoryFilter || example.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      (keyword === '' || example.title.toLowerCase().includes(keyword) ||
        example.description.toLowerCase().includes(keyword) ||
        example.tags.some(tag => tag.toLowerCase().includes(keyword)))
    );
  }

  function updateCategoriesDisplay(filteredCategories) {
    categoriesContainer.innerHTML = ''; // Clear the current content

    filteredCategories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category';
      //         <img class="categoryImage" src="${category.image}" alt="${category.title}">
      categoryElement.innerHTML = `
        <span class="categoryImage">${category.title}</span>
        <p>${category.description}</p>
        <h3>${category.title}</h3>
      `;
      //         <button class="view-category">View Category</button>

      // set the categoryElement background color to the category color
      categoryElement.style.backgroundColor = category.color;

      // get all .category elements
      categoryElement.addEventListener('click', () => {
        const categoryTitle = category.title; // Get the title of the clicked category
        console.log("categoryTitle", categoryTitle)

        // update url push state
        let categoryPath = category.url.replace('.html', '');
        window.history.pushState({ type: 'category', title: category.title }, categoryPath, `/${categoryPath}`);

        const categoryExamples = filterExamples('', categoryTitle); // Filter examples for this category
        console.log("categoryExamples", categoryExamples)
        categoriesContainer.innerHTML = ''; // Clear the current content to display only the relevant examples
        updateExamplesDisplay(categoryExamples); // Update the display with the filtered examples
      });


      categoriesContainer.appendChild(categoryElement);
    });
  }

  function updateExamplesDisplay(filteredExamples) {
    // Optionally clear the categories display or do something else as per requirement
    categoriesContainer.innerHTML = '';
    console.log('filteredExamples', filteredExamples)
    filteredExamples.forEach(example => {
      const exampleElement = document.createElement('div');
      exampleElement.className = 'category'; // Consider renaming the class for semantic clarity
      //         <img src="${example.image}" alt="${example.title}">
      exampleElement.innerHTML = `
        <span class="categoryExample">${example.category}</span>
        <p>${example.description}</p>
        <h3>${example.title}</h3>
      `;

      //         <a class="exampleLink" href="${example.url}">View Example</a>

      // assign the categoryExample background color to the category color
      const category = categories.find(category => category.title.toLowerCase() === example.category.toLowerCase());
      exampleElement.style.backgroundColor = category.color;
      categoriesContainer.appendChild(exampleElement);

      exampleElement.addEventListener('click', () => {
        
        // Use the category's title to prepend to the example's title in the URL
        const stateUrl = `${example.url.replace('.html', '')}`;
        window.history.pushState({ type: 'example', title: example.title, url: example.url }, example.title, stateUrl);

        loadExampleEmbed(example); // Load the example iframe
      });

    });

  }

  function loadExampleEmbed (example) {
    console.log("loadExampleEmbed", example)
    const exampleUrl = '/' + example.url; // Get the URL of the clicked example
    exampleIframe.src = exampleUrl;
    // alert(exampleUrl);
    // update url push state
    // window.history.pushState({}, example.title, `/${example.title}`);
    // show exampleIframe
    exampleIframe.style.display = 'block';
    categoriesContainer.style.display = 'none'; // Hide the categories container
    exampleEmbedsContainer.style.display = 'block'; // Show the example iframe container
    loadEditor(example);
  }
  
  updateCategoriesDisplay(categories);

});

let editor;
let loaded = false;

function loadEditor(example) {
  if (loaded) return;

  loaded = true;
  let exampleUrl = example.url;
  let exampleName = 'items/bullet';
  exampleName = exampleUrl.replace('.html', '');
  // set push state to the example name
  // window.history.pushState({}, exampleName, `/${exampleName}`);
  
  let jsSource = '/' + exampleName + '.js';
  console.log('loading remote source', jsSource)
  fetchAndDisplayCode();
  function fetchAndDisplayCode() {
    fetch(jsSource)
      .then(response => response.text())
      .then(code => {
        console.log(code)
        // inject the code into the script tag
        /*
        const script = document.createElement('script');
        script.textContent = code;
        document.body.appendChild(script);
        */

        // trigger DOMContentLoaded event to run the code
        // Warning: This may cause infinite loops if mutex is not used on demos page all events subscribed to DOMContentLoaded
        //document.dispatchEvent(new Event('DOMContentLoaded'));
        // Append the mantra.js script to the start of the string.
        //code = '<script src="mantra.js"><\/script>\n' + code;


        // Remove the very last line of the code example.
        code = code.trim().split('\n').slice(0, -1).join('\n');
        code = code.trim().split('\n').slice(0, -1).join('\n');

        // Set the code example to the pre element
        document.querySelector('.code-editor pre').textContent = code;
        // hide the code example
        // document.querySelector('.code-editor').style.display = 'none';
        // editor.setValue(code);

        // set the iframe src to bullet.html, sibling to this file
        // document.querySelector('#example-embed').src = './' + exampleName + '.html';

        // hide the search-container class
        document.querySelector('.search-container').style.display = 'none';

        // show code-editor
        document.querySelector('.code-editor').style.display = 'block';

      })
      .catch(error => {
        throw error;
        console.error('Error fetching the code example:', error);
      });
  }

}
